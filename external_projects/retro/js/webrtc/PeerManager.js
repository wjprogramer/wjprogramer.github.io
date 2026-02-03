// P2P 連線管理
import { t } from '../utils/i18n.js';

export class PeerManager {
  constructor() {
    this.peer = null;
    this.peerId = null;
    this.connections = new Map();
    this.isHost = false;
    this._isDestroying = false;
    /** 參與者：連到 host 失敗（Could not connect to peer），視同斷線 */
    this._connectionToHostFailed = false;
    this.onConnectionCallbacks = [];
    this.onDisconnectionCallbacks = [];
    this.onErrorCallbacks = [];
  }

  // 初始化 Peer（房主或參與者）
  async init(isHost = false, hostPeerId = null) {
    this.isHost = isHost;
    if (!isHost && hostPeerId) this.hostPeerIdForDisconnection = hostPeerId;
    
    return new Promise((resolve, reject) => {
      // 先檢查 window.Peer 是否可用
      if (typeof window !== 'undefined' && window.Peer) {
        this.createPeer(isHost, hostPeerId, resolve, reject);
        return;
      }
      
      // 如果不可用，嘗試載入
      this.loadPeerJS()
        .then(() => {
          // 再次確認 Peer 類別是否可用
          if (typeof window === 'undefined' || !window.Peer) {
            reject(new Error('PeerJS 載入完成但 Peer 類別不可用，請重新整理頁面'));
            return;
          }
          this.createPeer(isHost, hostPeerId, resolve, reject);
        })
        .catch((error) => {
          console.error('Failed to load PeerJS:', error);
          let errorMessage = '無法載入 PeerJS 庫';
          if (error.message) {
            errorMessage = error.message;
          } else if (error.type === 'error' && error.target && error.target.tagName === 'SCRIPT') {
            errorMessage = '無法載入 PeerJS 庫，請檢查網路連線或 CDN 是否可用';
          }
          reject(new Error(errorMessage));
        });
    });
  }

  // 載入 PeerJS（如果還沒載入）
  loadPeerJS() {
    return new Promise((resolve, reject) => {
      // 如果 window.Peer 已經可用，直接 resolve
      if (typeof window !== 'undefined' && window.Peer) {
        resolve();
        return;
      }
      
      // 檢查是否已經有 script 標籤在載入
      if (document.querySelector('script[src*="peerjs"]')) {
        // 等待載入完成
        let attempts = 0;
        const maxAttempts = 50; // 最多等待 5 秒（50 * 100ms）
        
        const checkPeer = setInterval(() => {
          attempts++;
          if (typeof window !== 'undefined' && window.Peer) {
            clearInterval(checkPeer);
            resolve();
          } else if (attempts >= maxAttempts) {
            clearInterval(checkPeer);
            reject(new Error('PeerJS 載入超時，請重新整理頁面'));
          }
        }, 100);
        
        return;
      }
      
      // 如果都沒有，嘗試動態載入（通常不會執行到這裡，因為 HTML 中已經預載入）
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js';
      
      // 設定超時，避免無限等待
      const timeout = setTimeout(() => {
        script.remove();
        reject(new Error('PeerJS 載入超時，請檢查網路連線'));
      }, 30000); // 30 秒超時
      
      script.onload = () => {
        clearTimeout(timeout);
        // 等待 Peer 類別可用
        setTimeout(() => {
          if (typeof window !== 'undefined' && window.Peer) {
            resolve();
          } else {
            reject(new Error('PeerJS 載入後 Peer 類別不可用'));
          }
        }, 100);
      };
      
      script.onerror = (error) => {
        clearTimeout(timeout);
        console.error('Failed to load PeerJS script:', error);
        // 嘗試使用備用 CDN
        const fallbackScript = document.createElement('script');
        fallbackScript.src = 'https://cdn.jsdelivr.net/npm/peerjs@1.5.4/dist/peerjs.min.js';
        
        const fallbackTimeout = setTimeout(() => {
          fallbackScript.remove();
          reject(new Error('無法載入 PeerJS 庫，請檢查網路連線'));
        }, 30000);
        
        fallbackScript.onload = () => {
          clearTimeout(fallbackTimeout);
          setTimeout(() => {
            if (typeof window !== 'undefined' && window.Peer) {
              resolve();
            } else {
              reject(new Error('PeerJS 載入後 Peer 類別不可用'));
            }
          }, 100);
        };
        
        fallbackScript.onerror = () => {
          clearTimeout(fallbackTimeout);
          reject(new Error('無法載入 PeerJS 庫，請檢查網路連線或 CDN 是否可用'));
        };
        
        document.head.appendChild(fallbackScript);
      };
      
      document.head.appendChild(script);
    });
  }

  /** 是否為「連到 host 失敗」類錯誤（Peer 已開、但 connectToHost 失敗） */
  _isConnectionToHostFailed(err) {
    if (!err) return false;
    const msg = (err.message || err.type || String(err)).toLowerCase();
    return msg.includes('could not connect to peer') || msg.includes('peer-unavailable');
  }

  /** 建立 Peer */
  createPeer(isHost, hostPeerId, resolve, reject) {
    this._isDestroying = false;
    let isResolved = false;
    let isRejected = false;
    let timeout = null;

    try {
      // 檢查 Peer 是否可用
      if (typeof window === 'undefined' || !window.Peer) {
        reject(new Error('PeerJS 未載入，請重新整理頁面'));
        return;
      }

      // 免費 TURN 服務器配置
      // 使用多個免費 TURN 服務器以提高連接成功率
      const iceServers = [
        // Google STUN 服務器（免費，但只有 STUN，沒有 TURN）
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' },
        { urls: 'stun:stun3.l.google.com:19302' },
        { urls: 'stun:stun4.l.google.com:19302' },
        // PeerJS 自己的 STUN 服務器
        { urls: 'stun:0.peerjs.com:3478' },
        // OpenRelay 免費 TURN 服務器（無需認證）
        { urls: 'turn:openrelay.metered.ca:80', username: 'openrelayproject', credential: 'openrelayproject' },
        { urls: 'turn:openrelay.metered.ca:443', username: 'openrelayproject', credential: 'openrelayproject' },
        { urls: 'turn:openrelay.metered.ca:443?transport=tcp', username: 'openrelayproject', credential: 'openrelayproject' },
        // Metered.ca 免費 TURN 服務器（需要註冊，但這裡使用公開的測試帳號）
        // 注意：這些服務器可能有使用限制，建議註冊自己的帳號
        { urls: 'turn:a.relay.metered.ca:80', username: 'a179b4b11b08b18b9a8b8b8b', credential: 'a179b4b11b08b18b9a8b8b8b' },
        { urls: 'turn:a.relay.metered.ca:80?transport=tcp', username: 'a179b4b11b08b18b9a8b8b8b', credential: 'a179b4b11b08b18b9a8b8b8b' },
        { urls: 'turn:a.relay.metered.ca:443', username: 'a179b4b11b08b18b9a8b8b8b', credential: 'a179b4b11b08b18b9a8b8b8b' },
        { urls: 'turn:a.relay.metered.ca:443?transport=tcp', username: 'a179b4b11b08b18b9a8b8b8b', credential: 'a179b4b11b08b18b9a8b8b8b' },
      ];

      // PeerJS 1.5.4 支持通過 rtcConfig.iceServers 設置自定義 ICE servers
      // 根據測試結果，config.rtcConfig.iceServers 是最可靠的方式
      const config = {
        host: '0.peerjs.com',
        port: 443,
        path: '/',
        secure: true,
        debug: 1, // 啟用除錯模式
        // 使用 rtcConfig.iceServers 設置自定義 ICE servers（包含 TURN 服務器）
        rtcConfig: {
          iceServers: iceServers
        }
      };
      
      console.log('[PeerManager] Setting custom ICE servers via rtcConfig.iceServers');
      console.log('[PeerManager] ICE servers count:', iceServers.length);

      if (isHost) {
        // 房主：使用指定的 ID（會議 ID）建立 Peer
        const peerId = hostPeerId || undefined; // 如果提供 ID，使用它；否則讓 PeerJS 自動生成
        this.peer = new window.Peer(peerId, config);
      } else {
        // 參與者：建立 Peer 並連線到房主
        this.peer = new window.Peer(config);
      }

      // 設定超時，避免無限等待
      timeout = setTimeout(() => {
        if (!isResolved && !isRejected && this.peer && !this.peerId) {
          isRejected = true;
          console.error('Peer initialization timeout');
          if (this.peer && !this.peer.destroyed) {
            this.peer.destroy();
          }
          reject(new Error('Peer 初始化超時，請檢查網路連線或稍後再試'));
        }
      }, 30000); // 30 秒超時

      this.peer.on('open', (id) => {
        if (isRejected) {
          return; // 如果已經 reject，不要 resolve
        }
        
        if (timeout) {
          clearTimeout(timeout);
        }
        
        isResolved = true;
        this.peerId = id;
        console.log('[PeerManager] Peer opened with ID:', id);

        if (isHost) {
          resolve(id);
        } else if (hostPeerId) {
          console.log('[PeerManager] Initiating connection to host:', hostPeerId);
          this.connectToHost(hostPeerId).then(resolve).catch(reject);
        } else {
          resolve(id);
        }
      });

      this.peer.on('connection', (conn) => {
        console.log('[PeerManager] Incoming connection from:', conn.peer);
        this.handleConnection(conn);
      });

      this.peer.on('error', (err) => {
        if (isResolved || isRejected) {
          // 如果已經 resolve 或 reject，只記錄錯誤但不再次 reject
          console.error('Peer error after initialization:', err);
          this.onErrorCallbacks.forEach(cb => cb(err));
          // 「Could not connect to peer」代表 Peer 已開、但連到 host 失敗，應觸發斷線回調讓參與者重連
          if (this._isConnectionToHostFailed(err) && this.hostPeerIdForDisconnection) {
            this._connectionToHostFailed = true;
            this.onDisconnectionCallbacks.forEach(cb => cb(this.hostPeerIdForDisconnection));
          }
          return;
        }
        
        if (timeout) {
          clearTimeout(timeout);
        }
        
        isRejected = true;
        console.error('Peer error:', err);

        let errorMessage = t('peerError.default');

        if (err && typeof err === 'object') {
          if (err.type === 'peer-unavailable') {
            errorMessage = t('peerError.peerUnavailable');
          } else if (err.type === 'network') {
            errorMessage = t('peerError.network');
          } else if (err.type === 'server-error') {
            errorMessage = t('peerError.serverError');
          } else if (err.type === 'socket-error' || err.type === 'socket-closed') {
            errorMessage = t('peerError.socketError');
          } else if (err.type === 'browser-incompatible') {
            errorMessage = t('peerError.browserIncompatible');
          } else if (err.message) {
            errorMessage = err.message;
          } else if (err.toString && typeof err.toString === 'function') {
            const errStr = err.toString();
            if (errStr !== '[object Object]') {
              errorMessage = errStr;
            }
          }
        } else if (err && typeof err === 'string') {
          errorMessage = err;
        }
        
        this.onErrorCallbacks.forEach(cb => cb(err));
        reject(new Error(errorMessage));
      });

      this.peer.on('disconnected', () => {
        if (this._isDestroying) return;
        // 參與者重連由 ParticipantMode.startReconnectLoop() 處理（destroy + 新 PeerManager + init），
        // 此處呼叫 peer.reconnect() 會在 destroy 時觸發、導致 WebSocket id=null 錯誤
        if (!this.isHost && this.peer && !this.peer.destroyed) return;
        if (this.peer && !this.peer.destroyed) {
          this.peer.reconnect();
        }
      });
    } catch (error) {
      if (timeout) {
        clearTimeout(timeout);
      }
      isRejected = true;
      console.error('Failed to create Peer:', error);
      reject(new Error(t('peerError.initFailed') + (error.message || '未知錯誤')));
    }
  }

  // 連線到房主（參與者使用）
  async connectToHost(hostPeerId) {
    return new Promise((resolve, reject) => {
      try {
        if (!this.peer) {
          console.error('[PeerManager] Peer not initialized');
          reject(new Error('Peer not initialized'));
          return;
        }

        console.log('[PeerManager] Connecting to host:', hostPeerId);
        console.log('[PeerManager] Peer state:', this.peer.open ? 'open' : 'not open', 'destroyed:', this.peer.destroyed);
        
        const conn = this.peer.connect(hostPeerId, {
          reliable: true
        });

        if (!conn) {
          console.error('[PeerManager] Failed to create connection object');
          reject(new Error('Failed to create connection'));
          return;
        }

        console.log('[PeerManager] Connection object created, waiting for open event...');

        let isResolved = false;
        let isRejected = false;

        // 設置連接超時（15 秒）
        const timeout = setTimeout(() => {
          if (!isResolved && !isRejected) {
            isRejected = true;
            console.error('[PeerManager] Connection timeout after 15s');
            if (conn && !conn.open) {
              try {
                conn.close();
              } catch (e) {
                console.error('[PeerManager] Error closing connection:', e);
              }
            }
            reject(new Error('連線超時，請檢查會議 ID 是否正確或房主是否在線'));
          }
        }, 15000);

        conn.on('open', () => {
          if (isRejected) return;
          if (isResolved) return;
          isResolved = true;
          console.log('[PeerManager] Connection opened successfully');
          clearTimeout(timeout);
          this.handleConnection(conn);
          resolve(conn);
        });

        conn.on('error', (err) => {
          if (isResolved) return;
          if (isRejected) return;
          isRejected = true;
          console.error('[PeerManager] Connection error:', err);
          console.error('[PeerManager] Error details:', JSON.stringify(err, Object.getOwnPropertyNames(err)));
          clearTimeout(timeout);
          reject(err);
        });

        conn.on('close', () => {
          console.log('[PeerManager] Connection closed, open state:', conn.open);
          // 只有在連接未打開且未 resolve 時才 reject
          if (!conn.open && !isResolved && !isRejected) {
            isRejected = true;
            clearTimeout(timeout);
            reject(new Error('連線已關閉，請檢查會議 ID 是否正確或房主是否在線'));
          }
        });

        // 監聽連接狀態變化
        conn.on('iceStateChange', (state) => {
          console.log('[PeerManager] ICE state changed:', state);
        });
      } catch (error) {
        console.error('[PeerManager] Exception in connectToHost:', error);
        reject(error);
      }
    });
  }

  // 獲取 ICE 服務器配置
  getICEServers() {
    return [
      // Google STUN 服務器（免費，但只有 STUN，沒有 TURN）
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun2.l.google.com:19302' },
      { urls: 'stun:stun3.l.google.com:19302' },
      { urls: 'stun:stun4.l.google.com:19302' },
      // PeerJS 自己的 STUN 服務器
      { urls: 'stun:0.peerjs.com:3478' },
      // OpenRelay 免費 TURN 服務器（無需認證）
      { urls: 'turn:openrelay.metered.ca:80', username: 'openrelayproject', credential: 'openrelayproject' },
      { urls: 'turn:openrelay.metered.ca:443', username: 'openrelayproject', credential: 'openrelayproject' },
      { urls: 'turn:openrelay.metered.ca:443?transport=tcp', username: 'openrelayproject', credential: 'openrelayproject' },
      // Metered.ca 免費 TURN 服務器
      // 注意：這些服務器可能有使用限制，建議註冊自己的帳號獲取更好的穩定性
      { urls: 'turn:a.relay.metered.ca:80', username: 'a179b4b11b08b18b9a8b8b8b', credential: 'a179b4b11b08b18b9a8b8b8b' },
      { urls: 'turn:a.relay.metered.ca:80?transport=tcp', username: 'a179b4b11b08b18b9a8b8b8b', credential: 'a179b4b11b08b18b9a8b8b8b' },
      { urls: 'turn:a.relay.metered.ca:443', username: 'a179b4b11b08b18b9a8b8b8b', credential: 'a179b4b11b08b18b9a8b8b8b' },
      { urls: 'turn:a.relay.metered.ca:443?transport=tcp', username: 'a179b4b11b08b18b9a8b8b8b', credential: 'a179b4b11b08b18b9a8b8b8b' },
    ];
  }

  // 處理連線
  handleConnection(conn) {
    console.log('[PeerManager] handleConnection called for peer:', conn.peer, 'open:', conn.open);
    this._connectionToHostFailed = false;
    const peerId = conn.peer;
    this.connections.set(peerId, conn);

    // 嘗試為連接設置自定義 ICE servers
    // 注意：RTCPeerConnection.setConfiguration() 只能在連接建立前調用
    // 如果連接已經建立，我們只能檢查當前配置
    if (conn.peerConnection) {
      try {
        const pc = conn.peerConnection;
        const currentConfig = pc.getConfiguration();
        
        console.log('[PeerManager] Current ICE servers configuration for peer:', peerId);
        console.log('[PeerManager] ICE servers count:', currentConfig.iceServers?.length || 0);
        
        if (currentConfig.iceServers && currentConfig.iceServers.length > 0) {
          console.log('[PeerManager] ICE servers:', currentConfig.iceServers.map(s => ({
            urls: s.urls,
            hasCredential: !!s.credential
          })));
          
          // 檢查是否有 TURN 服務器
          const hasTurn = currentConfig.iceServers.some(s => {
            const urls = Array.isArray(s.urls) ? s.urls : [s.urls];
            return urls.some(url => url.startsWith('turn:'));
          });
          
          if (hasTurn) {
            console.log('[PeerManager] ✅ TURN 服務器已配置');
          } else {
            console.warn('[PeerManager] ⚠️ 未檢測到 TURN 服務器，可能無法穿透對稱型 NAT');
          }
        } else {
          console.warn('[PeerManager] ⚠️ 未檢測到 ICE servers 配置');
        }
        
        // 注意：setConfiguration() 只能在連接建立前調用
        // 如果連接已經建立，這個調用會失敗，這是正常的
        if (pc.connectionState === 'new' || pc.connectionState === 'connecting') {
          try {
            const customIceServers = this.getICEServers();
            const mergedIceServers = [
              ...(currentConfig.iceServers || []),
              ...customIceServers
            ];
            
            pc.setConfiguration({
              ...currentConfig,
              iceServers: mergedIceServers
            });
            
            console.log('[PeerManager] ✅ 成功更新 ICE servers 配置');
            console.log('[PeerManager] 新的 ICE servers count:', mergedIceServers.length);
          } catch (error) {
            console.warn('[PeerManager] ⚠️ 無法更新 ICE servers（連接可能已建立）:', error.message);
          }
        } else {
          console.log('[PeerManager] ℹ️ 連接狀態:', pc.connectionState, '- 無法更新 ICE servers');
        }
      } catch (error) {
        console.warn('[PeerManager] ⚠️ 檢查 ICE servers 配置時出錯:', error);
      }
    }

    // 監聽連接打開事件
    if (!conn.open) {
      conn.on('open', () => {
        console.log('[PeerManager] Connection opened in handleConnection for peer:', peerId);
      });
    } else {
      console.log('[PeerManager] Connection already open for peer:', peerId);
    }

    conn.on('data', (data) => {
      this.handleMessage(peerId, data);
    });

    conn.on('close', () => {
      console.log('[PeerManager] Connection closed for peer:', peerId);
      this.connections.delete(peerId);
      this.onDisconnectionCallbacks.forEach(cb => cb(peerId));
    });

    conn.on('error', (err) => {
      console.error('[PeerManager] Connection error for peer:', peerId, err);
      this.connections.delete(peerId);
      this.onDisconnectionCallbacks.forEach(cb => cb(peerId));
    });

    // 監聽 ICE 狀態變化
    if (conn.peerConnection) {
      conn.peerConnection.addEventListener('iceconnectionstatechange', () => {
        console.log('[PeerManager] ICE connection state changed for peer:', peerId, 'state:', conn.peerConnection.iceConnectionState);
      });
      
      conn.peerConnection.addEventListener('connectionstatechange', () => {
        console.log('[PeerManager] Connection state changed for peer:', peerId, 'state:', conn.peerConnection.connectionState);
      });
    }

    this.onConnectionCallbacks.forEach(cb => cb(peerId, conn));
  }

  // 處理訊息
  handleMessage(peerId, data) {
    // 由 DataChannel 處理
    if (this.onMessageCallback) {
      this.onMessageCallback(peerId, data);
    }
  }

  // 廣播訊息（房主使用）
  broadcast(message) {
    const messageStr = JSON.stringify(message);
    this.connections.forEach((conn, peerId) => {
      if (conn.open) {
        conn.send(messageStr);
      }
    });
  }

  // 發送訊息給特定 Peer
  send(peerId, message) {
    const conn = this.connections.get(peerId);
    if (conn && conn.open) {
      conn.send(JSON.stringify(message));
    }
  }

  // 註冊連線回調
  onConnection(callback) {
    this.onConnectionCallbacks.push(callback);
  }

  // 註冊斷線回調
  onDisconnection(callback) {
    this.onDisconnectionCallbacks.push(callback);
  }

  // 註冊錯誤回調
  onError(callback) {
    this.onErrorCallbacks.push(callback);
  }

  // 註冊訊息回調
  onMessage(callback) {
    this.onMessageCallback = callback;
  }

  // 斷開連線
  disconnect(peerId) {
    const conn = this.connections.get(peerId);
    if (conn) {
      conn.close();
      this.connections.delete(peerId);
    }
  }

  // 斷開所有連線
  disconnectAll() {
    this.connections.forEach((conn) => {
      conn.close();
    });
    this.connections.clear();
  }

  // 關閉 Peer
  destroy() {
    this._isDestroying = true;
    this._connectionToHostFailed = false;
    this.disconnectAll();
    if (this.peer && !this.peer.destroyed) {
      this.peer.destroy();
    }
    this.peer = null;
    this.peerId = null;
  }

  // 取得連線列表
  getConnections() {
    return Array.from(this.connections.keys());
  }

  // 取得連線數量
  getConnectionCount() {
    return this.connections.size;
  }

  /**
   * 是否處於「斷線」狀態：無 peer、已銷毀、與 signaling 斷開、或「連到 host 失敗」。
   * 「Could not connect to peer」時會設 _connectionToHostFailed，此處也回傳 true。
   */
  isPeerDisconnected() {
    if (this._connectionToHostFailed) return true;
    if (!this.peer) return true;
    if (this.peer.destroyed) return true;
    return this.peer.disconnected === true;
  }
}

