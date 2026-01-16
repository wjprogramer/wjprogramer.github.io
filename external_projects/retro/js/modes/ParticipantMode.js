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
  }

  // 加入會議
  async joinMeeting(meetingId, hostPeerId, name) {
    this.name = name;
    this.hostPeerId = hostPeerId;
    this.hasSentJoin = false; // 防止重複發送 JOIN 訊息

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
            this.dataChannel.send(DataChannel.MESSAGE_TYPES.JOIN, {
              name: this.name
            });
          }, 100); // 稍微延遲，確保連線完全建立
        }
      });

      this.peerManager.onDisconnection(() => {
        this.onDisconnectedCallbacks.forEach(cb => cb());
      });
      
      // 初始化 Peer（參與者模式）
      // 這會建立連線，觸發 onConnection 回調
      await this.peerManager.init(false, hostPeerId);
      
      // 如果連線已經建立但還沒發送 JOIN（onConnection 可能還沒觸發）
      // 等待一下確保資料通道已初始化
      setTimeout(() => {
        if (!this.hasSentJoin) {
          const connections = this.peerManager.getConnections();
          if (connections.length > 0) {
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
      this.retro = payload.retro;
      this.participants = payload.participants || [];
      
      // 第一次收到 SYNC 時，觸發連線成功回調
      if (!this.hasReceivedSync) {
        this.hasReceivedSync = true;
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

    this.dataChannel.send(DataChannel.MESSAGE_TYPES.ADD_ITEM, {
      category,
      item
    });
  }

  // 更新項目
  updateItem(category, itemId, updates) {
    if (!this.retro || !this.retro.items[category]) {
      return;
    }

    this.dataChannel.send(DataChannel.MESSAGE_TYPES.UPDATE_ITEM, {
      category,
      itemId,
      updates
    });
  }

  // 刪除項目
  deleteItem(category, itemId) {
    if (!this.retro || !this.retro.items[category]) {
      return;
    }

    this.dataChannel.send(DataChannel.MESSAGE_TYPES.DELETE_ITEM, {
      category,
      itemId
    });
  }

  // 投票
  vote(category, itemId, vote) {
    if (!this.retro || !this.retro.items[category]) {
      return;
    }

    this.dataChannel.send(DataChannel.MESSAGE_TYPES.VOTE, {
      category,
      itemId,
      vote
    });
  }

  // 離開會議
  leave() {
    this.dataChannel.send(DataChannel.MESSAGE_TYPES.LEAVE, {});
    this.peerManager.destroy();
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

