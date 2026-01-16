// P2P 連線管理
export class PeerManager {
  constructor() {
    this.peer = null;
    this.peerId = null;
    this.connections = new Map();
    this.isHost = false;
    this.onConnectionCallbacks = [];
    this.onDisconnectionCallbacks = [];
    this.onErrorCallbacks = [];
  }

  // 初始化 Peer（房主或參與者）
  async init(isHost = false, hostPeerId = null) {
    this.isHost = isHost;
    
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

  // 建立 Peer
  createPeer(isHost, hostPeerId, resolve, reject) {
    let isResolved = false;
    let isRejected = false;
    let timeout = null;

    try {
      // 檢查 Peer 是否可用
      if (typeof window === 'undefined' || !window.Peer) {
        reject(new Error('PeerJS 未載入，請重新整理頁面'));
        return;
      }

      const config = {
        host: '0.peerjs.com',
        port: 443,
        path: '/',
        secure: true,
        debug: 1 // 啟用除錯模式
      };

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
        console.log('Peer ID:', id);
        
        if (isHost) {
          resolve(id);
        } else if (hostPeerId) {
          this.connectToHost(hostPeerId).then(resolve).catch(reject);
        } else {
          resolve(id);
        }
      });

      this.peer.on('connection', (conn) => {
        this.handleConnection(conn);
      });

      this.peer.on('error', (err) => {
        if (isResolved || isRejected) {
          // 如果已經 resolve 或 reject，只記錄錯誤但不再次 reject
          console.error('Peer error after initialization:', err);
          this.onErrorCallbacks.forEach(cb => cb(err));
          return;
        }
        
        if (timeout) {
          clearTimeout(timeout);
        }
        
        isRejected = true;
        console.error('Peer error:', err);
        console.error('Peer error details:', {
          type: err?.type,
          message: err?.message,
          toString: err?.toString?.()
        });
        
        // 處理常見錯誤
        let errorMessage = 'Peer 連線錯誤';
        
        // PeerJS 錯誤物件可能有 type 屬性
        if (err && typeof err === 'object') {
          if (err.type === 'peer-unavailable') {
            errorMessage = 'Peer ID 不可用，請嘗試其他 ID';
          } else if (err.type === 'network') {
            errorMessage = '網路連線錯誤，請檢查網路設定';
          } else if (err.type === 'server-error') {
            errorMessage = 'PeerJS 伺服器錯誤，請稍後再試';
          } else if (err.type === 'socket-error' || err.type === 'socket-closed') {
            errorMessage = 'PeerJS 連線中斷，請檢查網路連線';
          } else if (err.type === 'browser-incompatible') {
            errorMessage = '瀏覽器不相容，請使用 Chrome、Firefox 或 Edge';
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
        console.log('Peer disconnected');
        if (!this.peer.destroyed) {
          this.peer.reconnect();
        }
      });
    } catch (error) {
      if (timeout) {
        clearTimeout(timeout);
      }
      isRejected = true;
      console.error('Failed to create Peer:', error);
      reject(new Error('無法建立 Peer 連線：' + (error.message || '未知錯誤')));
    }
  }

  // 連線到房主（參與者使用）
  async connectToHost(hostPeerId) {
    return new Promise((resolve, reject) => {
      if (!this.peer) {
        reject(new Error('Peer not initialized'));
        return;
      }

      const conn = this.peer.connect(hostPeerId, {
        reliable: true
      });

      if (!conn) {
        reject(new Error('Failed to create connection'));
        return;
      }

      conn.on('open', () => {
        this.handleConnection(conn);
        resolve(conn);
      });

      conn.on('error', (err) => {
        reject(err);
      });
    });
  }

  // 處理連線
  handleConnection(conn) {
    const peerId = conn.peer;
    this.connections.set(peerId, conn);

    conn.on('data', (data) => {
      this.handleMessage(peerId, data);
    });

    conn.on('close', () => {
      this.connections.delete(peerId);
      this.onDisconnectionCallbacks.forEach(cb => cb(peerId));
    });

    conn.on('error', (err) => {
      console.error('Connection error:', err);
      this.connections.delete(peerId);
      this.onDisconnectionCallbacks.forEach(cb => cb(peerId));
    });

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
}

