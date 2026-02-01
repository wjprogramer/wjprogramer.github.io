// 參與者模式邏輯
import { PeerManager } from '../webrtc/PeerManager.js';
import { DataChannel } from '../webrtc/DataChannel.js';

export class ParticipantMode {
  constructor() {
    this.peerManager = new PeerManager();
    this.dataChannel = null;
    this.hostPeerId = null;
    this.name = null;
    this.retro = null;
    this.participants = [];
    this.onConnectedCallbacks = [];
    this.onDisconnectedCallbacks = [];
    this.onItemUpdateCallbacks = [];
    this.onStatusChangeCallbacks = [];
    this.onKickedCallbacks = [];
    this.onParticipantsUpdateCallbacks = [];
    this.hasReceivedSync = false; // 標記是否已收到 SYNC 訊息
    
    // 自動重連相關
    this.isReconnecting = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 10;
    this.reconnectLoopIntervalId = null;
    this.reconnectLoopIntervalMs = 5000; // 每 5 秒嘗試一次
    
    // 本地緩存未同步的變更
    this.pendingChanges = [];
    this.isConnected = false;

    /** 與 host 的連線狀態：'connected' | 'disconnected' | 'reconnecting' */
    this.connectionStatus = 'disconnected';
    this.onConnectionStatusChangeCallbacks = [];

    /** 心跳逾時偵測（host 關閉分頁時 PeerJS 可能不觸發 close，改由逾時判定斷線） */
    this.lastMessageFromHostAt = 0;
    this.heartbeatCheckIntervalId = null;
  }

  /** 心跳逾時時間（ms），需大於 host 的 HEARTBEAT_INTERVAL * 2 */
  static HEARTBEAT_TIMEOUT = 2000;

  /** 取得目前與 host 的連線狀態 */
  getConnectionStatus() {
    return this.connectionStatus;
  }

  /** 設定連線狀態並通知訂閱者 */
  setConnectionStatus(status) {
    if (this.connectionStatus === status) return;
    this.connectionStatus = status;
    this.onConnectionStatusChangeCallbacks.forEach(cb => cb(status));
  }

  /** 訂閱連線狀態變化（參與者 UI 用於顯示斷線/重連橫幅） */
  onConnectionStatusChange(callback) {
    this.onConnectionStatusChangeCallbacks.push(callback);
  }

  /** 是否為「連到 host 失敗」類錯誤（Peer 已開、但 connectToHost 失敗） */
  _isConnectionToHostFailed(err) {
    if (!err) return false;
    const msg = (err?.message || err?.type || String(err)).toLowerCase();
    return msg.includes('could not connect to peer') || msg.includes('peer-unavailable');
  }

  // 加入會議
  async joinMeeting(meetingId, hostPeerId, name, retroId = null) {
    this.name = name;
    this.hostPeerId = hostPeerId;
    this.expectedRetroId = retroId; // 保存期望的 retro id，用於驗證（從 URL 參數或第一次 SYNC 後設置）
    this.hasSentJoin = false; // 防止重複發送 JOIN 訊息
    this.isReconnecting = false;
    this.reconnectAttempts = 0;

    try {
      // 先初始化資料通道（在 init 之前，這樣可以監聽連線事件）
      this.dataChannel = new DataChannel(this.peerManager);
      this.setupDataChannel();
      
      // 監聽連線狀態（Peer 層級的連線）
      // 當連線建立後，發送加入訊息
      this.peerManager.onConnection(() => {
        // 連線建立後，發送加入訊息（只發送一次）
        if (!this.hasSentJoin) {
          this.hasSentJoin = true;
          setTimeout(() => {
            if (this.dataChannel) {
              this.dataChannel.send(DataChannel.MESSAGE_TYPES.JOIN, {
                name: this.name,
                expectedRetroId: this.expectedRetroId // 發送期望的 retro id，讓 host 驗證（重連時才有值）
              });
            }
          }, 100); // 稍微延遲，確保連線完全建立
        }
      });

      this.peerManager.onDisconnection(() => {
        this.isConnected = false;
        this.setConnectionStatus('disconnected');
        this.onDisconnectedCallbacks.forEach(cb => cb());
        if (this.hostPeerId) this.startReconnectLoop();
      });
      this.peerManager.onError((err) => {
        if (!this._isConnectionToHostFailed(err)) return;
        this.isConnected = false;
        this.setConnectionStatus('disconnected');
        if (this.hostPeerId) this.startReconnectLoop();
      });
      
      // 初始化 Peer（參與者模式）
      // 這會建立連線，觸發 onConnection 回調
      await this.peerManager.init(false, hostPeerId);
      
      // 如果連線已經建立但還沒發送 JOIN（onConnection 可能還沒觸發）
      // 等待一下確保資料通道已初始化
      setTimeout(() => {
        if (!this.hasSentJoin) {
          const connections = this.peerManager.getConnections();
          if (connections.length > 0 && this.dataChannel) {
            // 連線已經建立，立即發送 JOIN 訊息
            this.hasSentJoin = true;
            this.dataChannel.send(DataChannel.MESSAGE_TYPES.JOIN, {
              name: this.name
            });
          }
        }
      }, 500);

      return true;
    } catch (error) {
      console.error('Failed to join meeting:', error);
      throw error;
    }
  }

  // 設定資料通道
  setupDataChannel() {
    // 任一來自 host 的訊息都更新時間，用於心跳逾時偵測（host 關閉分頁時 PeerJS 可能不觸發 close）
    this.dataChannel.onAny(() => {
      this.lastMessageFromHostAt = Date.now();
    });

    // 處理狀態同步（這是連線成功的標誌）
    this.dataChannel.on(DataChannel.MESSAGE_TYPES.SYNC, (peerId, payload) => {
      // 驗證 retro id 是否匹配（只有在重連時才需要驗證）
      if (this.expectedRetroId && payload.retro && payload.retro.id !== this.expectedRetroId) {
        console.error('Retro ID mismatch! Expected:', this.expectedRetroId, 'Received:', payload.retro.id);
        // retro id 不匹配，觸發錯誤回調並斷開連線
        this.onKickedCallbacks.forEach(cb => cb('RETRO_ID_MISMATCH'));
        this.leave();
        return;
      }
      
      this.retro = payload.retro;
      this.participants = payload.participants || [];
      this.onParticipantsUpdateCallbacks.forEach(cb => cb());
      
      // 每次收到 SYNC 都表示已與 host 連線，更新連線狀態（含重連成功）
      this.isConnected = true;
      this.isReconnecting = false;
      this.reconnectAttempts = 0;
      this.lastMessageFromHostAt = Date.now();
      this.setConnectionStatus('connected');
      this.startHeartbeatCheck();
      
      // 第一次收到 SYNC 時，保存 retro id 並觸發連線成功回調
      if (!this.hasReceivedSync) {
        this.hasReceivedSync = true;
        
        // 保存 retro id，用於後續重連時的驗證
        // 如果已經有 expectedRetroId（從 URL 參數來的），就不需要再設置
        // 但如果沒有，就從 SYNC 訊息中取得
        if (!this.expectedRetroId && payload.retro && payload.retro.id) {
          this.expectedRetroId = payload.retro.id;
        }
        
        // 重連成功後，發送本地緩存的變更
        this.flushPendingChanges();
        
        this.onConnectedCallbacks.forEach(cb => cb());
      }
      
      this.onItemUpdateCallbacks.forEach(cb => cb());
    });

    // 處理參與者加入
    this.dataChannel.on(DataChannel.MESSAGE_TYPES.JOIN, (peerId, payload) => {
      this.participants = payload.participants || [];
      this.onParticipantsUpdateCallbacks.forEach(cb => cb());
    });

    // 處理參與者離開
    this.dataChannel.on(DataChannel.MESSAGE_TYPES.LEAVE, (peerId, payload) => {
      this.participants = payload.participants || [];
      this.onParticipantsUpdateCallbacks.forEach(cb => cb());
    });

    // 處理新增項目
    this.dataChannel.on(DataChannel.MESSAGE_TYPES.ADD_ITEM, (peerId, payload) => {
      const { category, item } = payload;
      if (this.retro && this.retro.items[category]) {
        this.retro.items[category].push(item);
        this.onItemUpdateCallbacks.forEach(cb => cb());
      }
    });

    // 處理更新項目
    this.dataChannel.on(DataChannel.MESSAGE_TYPES.UPDATE_ITEM, (peerId, payload) => {
      const { category, itemId, updates } = payload;
      if (this.retro && this.retro.items[category]) {
        const item = this.retro.items[category].find(item => item.id === itemId);
        if (item) {
          Object.assign(item, updates);
          this.onItemUpdateCallbacks.forEach(cb => cb());
        }
      }
    });

    // 處理刪除項目
    this.dataChannel.on(DataChannel.MESSAGE_TYPES.DELETE_ITEM, (peerId, payload) => {
      const { category, itemId } = payload;
      if (this.retro && this.retro.items[category]) {
        const index = this.retro.items[category].findIndex(item => item.id === itemId);
        if (index !== -1) {
          this.retro.items[category].splice(index, 1);
          this.onItemUpdateCallbacks.forEach(cb => cb());
        }
      }
    });

    // 處理投票
    this.dataChannel.on(DataChannel.MESSAGE_TYPES.VOTE, (peerId, payload) => {
      const { category, itemId, votes, voters } = payload;
      if (this.retro && this.retro.items[category]) {
        const item = this.retro.items[category].find(item => item.id === itemId);
        if (item) {
          item.votes = votes;
          item.voters = voters;
          this.onItemUpdateCallbacks.forEach(cb => cb());
        }
      }
    });

    // 處理 Emoji 反應
    this.dataChannel.on(DataChannel.MESSAGE_TYPES.REACTION, (peerId, payload) => {
      const { category, itemId, reactions } = payload;
      if (this.retro && this.retro.items[category]) {
        const item = this.retro.items[category].find(item => item.id === itemId);
        if (item) {
          item.reactions = reactions;
          this.onItemUpdateCallbacks.forEach(cb => cb());
        }
      }
    });

    // 處理狀態變化
    this.dataChannel.on(DataChannel.MESSAGE_TYPES.STATUS_CHANGE, (peerId, payload) => {
      if (this.retro) {
        this.retro.status = payload.status;
        this.onStatusChangeCallbacks.forEach(cb => cb(payload.status));
      }
    });

    // 處理被踢除
    this.dataChannel.on(DataChannel.MESSAGE_TYPES.KICK, (peerId, payload) => {
      this.onKickedCallbacks.forEach(cb => cb(payload.reason));
      this.leave();
    });
  }

  // 新增項目
  addItem(category, item) {
    if (!this.retro || !this.retro.items[category]) {
      return;
    }

    // 如果已連線，直接發送；否則加入緩存
    if (this.isConnected && this.dataChannel) {
      this.dataChannel.send(DataChannel.MESSAGE_TYPES.ADD_ITEM, {
        category,
        item
      });
    } else {
      // 加入本地緩存
      this.pendingChanges.push({
        type: DataChannel.MESSAGE_TYPES.ADD_ITEM,
        payload: { category, item },
        timestamp: Date.now()
      });
    }
  }

  // 更新項目
  updateItem(category, itemId, updates) {
    if (!this.retro || !this.retro.items[category]) {
      return;
    }

    // 如果已連線，直接發送；否則加入緩存
    if (this.isConnected && this.dataChannel) {
      this.dataChannel.send(DataChannel.MESSAGE_TYPES.UPDATE_ITEM, {
        category,
        itemId,
        updates
      });
    } else {
      // 加入本地緩存
      this.pendingChanges.push({
        type: DataChannel.MESSAGE_TYPES.UPDATE_ITEM,
        payload: { category, itemId, updates },
        timestamp: Date.now()
      });
    }
  }

  // 刪除項目
  deleteItem(category, itemId) {
    if (!this.retro || !this.retro.items[category]) {
      return;
    }

    // 如果已連線，直接發送；否則加入緩存
    if (this.isConnected && this.dataChannel) {
      this.dataChannel.send(DataChannel.MESSAGE_TYPES.DELETE_ITEM, {
        category,
        itemId
      });
    } else {
      // 加入本地緩存
      this.pendingChanges.push({
        type: DataChannel.MESSAGE_TYPES.DELETE_ITEM,
        payload: { category, itemId },
        timestamp: Date.now()
      });
    }
  }

  // 投票
  vote(category, itemId, vote) {
    if (!this.retro || !this.retro.items[category]) {
      return;
    }

    // 如果已連線，直接發送；否則加入緩存
    if (this.isConnected && this.dataChannel) {
      this.dataChannel.send(DataChannel.MESSAGE_TYPES.VOTE, {
        category,
        itemId,
        vote
      });
    } else {
      // 加入本地緩存
      this.pendingChanges.push({
        type: DataChannel.MESSAGE_TYPES.VOTE,
        payload: { category, itemId, vote },
        timestamp: Date.now()
      });
    }
  }

  // 添加/移除 Emoji 反應
  addReaction(category, itemId, emoji, remove = false) {
    if (!this.retro || !this.retro.items[category]) {
      return;
    }

    // 如果已連線，直接發送；否則加入緩存
    if (this.isConnected && this.dataChannel) {
      this.dataChannel.send(DataChannel.MESSAGE_TYPES.REACTION, {
        category,
        itemId,
        emoji,
        remove
      });
    } else {
      // 加入本地緩存
      this.pendingChanges.push({
        type: DataChannel.MESSAGE_TYPES.REACTION,
        payload: { category, itemId, emoji, remove },
        timestamp: Date.now()
      });
    }
  }

  /** 開始心跳逾時檢查：逾時未收到 host 訊息則視為斷線 */
  startHeartbeatCheck() {
    this.stopHeartbeatCheck();
    this.heartbeatCheckIntervalId = setInterval(() => {
      if (this.connectionStatus !== 'connected' || !this.isConnected) return;
      const elapsed = Date.now() - this.lastMessageFromHostAt;
      if (elapsed >= ParticipantMode.HEARTBEAT_TIMEOUT) {
        this.stopHeartbeatCheck();
        this.isConnected = false;
        this.isReconnecting = false;
        this.peerManager.destroy();
        this.setConnectionStatus('disconnected');
        this.onDisconnectedCallbacks.forEach(cb => cb());
        if (this.hostPeerId) this.startReconnectLoop();
      }
    }, 1500);
  }

  stopHeartbeatCheck() {
    if (this.heartbeatCheckIntervalId) {
      clearInterval(this.heartbeatCheckIntervalId);
      this.heartbeatCheckIntervalId = null;
    }
  }

  // 離開會議
  leave() {
    this.stopHeartbeatCheck();
    this.stopReconnectLoop();
    this.setConnectionStatus('disconnected');
    
    if (this.dataChannel) {
      this.dataChannel.send(DataChannel.MESSAGE_TYPES.LEAVE, {});
    }
    this.peerManager.destroy();
  }

  /** 啟動重連迴圈：每 N 秒嘗試一次，不依賴 catch 排程，失敗後仍會持續重試 */
  startReconnectLoop() {
    if (this.reconnectLoopIntervalId) return;
    this.setConnectionStatus('reconnecting');
    this.runOneReconnectAttempt();
    this.reconnectLoopIntervalId = setInterval(() => this.runOneReconnectAttempt(), this.reconnectLoopIntervalMs);
  }

  stopReconnectLoop() {
    if (this.reconnectLoopIntervalId) {
      clearInterval(this.reconnectLoopIntervalId);
      this.reconnectLoopIntervalId = null;
    }
    this.isReconnecting = false;
    this.reconnectAttempts = 0;
  }

  /** 執行單次重連（由迴圈呼叫，失敗不排程下一輪，由 setInterval 固定間隔再試） */
  async runOneReconnectAttempt() {
    if (this.peerManager.isPeerDisconnected()) {
      this.isReconnecting = false;
    }
    if (this.isReconnecting) return;
    if (this.connectionStatus === 'connected' && this.isConnected) return;
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      this.stopReconnectLoop();
      this.setConnectionStatus('disconnected');
      return;
    }
    this.isReconnecting = true;
    this.reconnectAttempts++;
    this.setConnectionStatus('reconnecting');
    try {
      if (!this.peerManager.peer || this.peerManager.peer.destroyed) {
        this.peerManager = new (await import('../webrtc/PeerManager.js')).PeerManager();
        this.dataChannel = new (await import('../webrtc/DataChannel.js')).DataChannel(this.peerManager);
        this.setupDataChannel();
        this.peerManager.onConnection(() => {
          if (!this.hasSentJoin && this.dataChannel) {
            this.hasSentJoin = true;
            setTimeout(() => {
              if (this.dataChannel) {
                this.dataChannel.send(DataChannel.MESSAGE_TYPES.JOIN, {
                  name: this.name,
                  expectedRetroId: this.expectedRetroId // 發送期望的 retro id，讓 host 驗證（重連時才有值）
                });
              }
            }, 100);
          }
        });
        this.peerManager.onDisconnection(() => {
          this.isConnected = false;
          this.setConnectionStatus('disconnected');
          this.onDisconnectedCallbacks.forEach(cb => cb());
          if (this.hostPeerId) this.startReconnectLoop();
        });
        this.peerManager.onError((err) => {
          if (!this._isConnectionToHostFailed(err)) return;
          this.isConnected = false;
          this.setConnectionStatus('disconnected');
          if (this.hostPeerId) this.startReconnectLoop();
        });
      }
      await this.peerManager.init(false, this.hostPeerId);
      const connections = this.peerManager.getConnections();
      if (connections.length === 0) {
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => reject(new Error('Reconnection timeout')), 5000);
          const connectionHandler = () => {
            clearTimeout(timeout);
            // 移除這個回調（避免重複觸發）
            const idx = this.peerManager.onConnectionCallbacks.indexOf(connectionHandler);
            if (idx > -1) this.peerManager.onConnectionCallbacks.splice(idx, 1);
            resolve();
          };
          this.peerManager.onConnection(connectionHandler);
        });
      }

      // 重新發送 JOIN 訊息
      this.hasSentJoin = false;
      setTimeout(() => {
        if (this.dataChannel) {
          this.dataChannel.send(DataChannel.MESSAGE_TYPES.JOIN, {
            name: this.name,
            expectedRetroId: this.expectedRetroId // 發送期望的 retro id，讓 host 驗證（重連時才有值）
          });
        }
      }, 100);
      this.stopReconnectLoop();
      this.isReconnecting = false;
    } catch (error) {
      console.error('Reconnection failed:', error);
      this.isReconnecting = false;
      try {
        if (this.peerManager) this.peerManager.destroy();
      } catch (e) {
        console.error('Error during destroy after reconnect fail:', e);
      }
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        this.stopReconnectLoop();
        this.setConnectionStatus('disconnected');
      }
    }
  }

  // 發送本地緩存的變更
  flushPendingChanges() {
    if (!this.isConnected || !this.dataChannel || this.pendingChanges.length === 0) return;

    // 依序發送緩存的變更
    this.pendingChanges.forEach(change => {
      try {
        this.dataChannel.send(change.type, change.payload);
      } catch (error) {
        console.error('Error sending pending change:', error);
      }
    });
    
    // 清空緩存
    this.pendingChanges = [];
  }

  // 註冊回調
  onConnected(callback) {
    this.onConnectedCallbacks.push(callback);
  }

  onDisconnected(callback) {
    this.onDisconnectedCallbacks.push(callback);
  }

  onItemUpdate(callback) {
    this.onItemUpdateCallbacks.push(callback);
  }

  onStatusChange(callback) {
    this.onStatusChangeCallbacks.push(callback);
  }

  onKicked(callback) {
    this.onKickedCallbacks.push(callback);
  }

  onParticipantsUpdate(callback) {
    this.onParticipantsUpdateCallbacks.push(callback);
  }

  // 取得回顧資料
  getRetro() {
    return this.retro;
  }

  // 取得參與者列表
  getParticipants() {
    return this.participants;
  }
}

