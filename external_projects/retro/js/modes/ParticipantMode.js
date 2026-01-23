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
    this.hasReceivedSync = false; // 標記是否已收到 SYNC 訊息
    
    // 自動重連相關
    this.isReconnecting = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 10; // 最多重試 10 次
    this.reconnectDelay = 1000; // 初始延遲 1 秒
    this.reconnectTimeout = null;
    
    // 本地緩存未同步的變更
    this.pendingChanges = [];
    this.isConnected = false;
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
        this.onDisconnectedCallbacks.forEach(cb => cb());
        
        // 啟動自動重連（只有在非手動離開時才重連）
        if (!this.isReconnecting && this.hostPeerId) {
          this.startAutoReconnect();
        }
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
      
      // 第一次收到 SYNC 時，保存 retro id 並觸發連線成功回調
      if (!this.hasReceivedSync) {
        this.hasReceivedSync = true;
        this.isConnected = true;
        this.isReconnecting = false;
        this.reconnectAttempts = 0;
        
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
    });

    // 處理參與者離開
    this.dataChannel.on(DataChannel.MESSAGE_TYPES.LEAVE, (peerId, payload) => {
      this.participants = payload.participants || [];
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

  // 離開會議
  leave() {
    // 停止自動重連
    this.stopAutoReconnect();
    
    if (this.dataChannel) {
      this.dataChannel.send(DataChannel.MESSAGE_TYPES.LEAVE, {});
    }
    this.peerManager.destroy();
  }

  // 啟動自動重連
  startAutoReconnect() {
    if (this.isReconnecting) {
      return; // 已經在重連中
    }
    
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log('Max reconnect attempts reached');
      return;
    }
    
    this.isReconnecting = true;
    this.reconnectAttempts++;
    
    // 計算延遲（指數退避：1s, 2s, 4s, 8s...，最多 10 秒）
    const delay = Math.min(this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1), 10000);
    
    console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts}) in ${delay}ms...`);
    
    this.reconnectTimeout = setTimeout(async () => {
      try {
        // 如果 peerManager 已經被銷毀，需要重新創建
        if (this.peerManager.peer && this.peerManager.peer.destroyed) {
          this.peerManager = new (await import('../webrtc/PeerManager.js')).PeerManager();
          this.dataChannel = new (await import('../webrtc/DataChannel.js')).DataChannel(this.peerManager);
          this.setupDataChannel();
          
          // 重新註冊事件監聽器
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
            this.onDisconnectedCallbacks.forEach(cb => cb());
            if (!this.isReconnecting && this.hostPeerId) {
              this.startAutoReconnect();
            }
          });
        }
        
        // 重新初始化 Peer 並連線
        await this.peerManager.init(false, this.hostPeerId);
        
        // 等待連線建立（最多等待 5 秒）
        // 檢查是否已經有連線
        const connections = this.peerManager.getConnections();
        if (connections.length > 0) {
          // 已經有連線，直接繼續
          console.log('Connection already established');
        } else {
          // 等待連線建立
          await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
              reject(new Error('Reconnection timeout'));
            }, 5000);
            
            const connectionHandler = () => {
              clearTimeout(timeout);
              // 移除這個回調（避免重複觸發）
              const index = this.peerManager.onConnectionCallbacks.indexOf(connectionHandler);
              if (index > -1) {
                this.peerManager.onConnectionCallbacks.splice(index, 1);
              }
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
        
        console.log('Reconnected successfully');
        this.isReconnecting = false;
      } catch (error) {
        console.error('Reconnection failed:', error);
        // 繼續重試
        this.isReconnecting = false;
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          this.startAutoReconnect();
        } else {
          console.error('Max reconnect attempts reached, giving up');
        }
      }
    }, delay);
  }

  // 停止自動重連
  stopAutoReconnect() {
    this.isReconnecting = false;
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    this.reconnectAttempts = 0;
  }

  // 發送本地緩存的變更
  flushPendingChanges() {
    if (!this.isConnected || !this.dataChannel || this.pendingChanges.length === 0) {
      return;
    }
    
    console.log(`Flushing ${this.pendingChanges.length} pending changes...`);
    
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
    console.log('Pending changes flushed');
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

  // 取得回顧資料
  getRetro() {
    return this.retro;
  }

  // 取得參與者列表
  getParticipants() {
    return this.participants;
  }
}

