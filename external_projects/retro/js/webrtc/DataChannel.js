// 資料通道管理
export class DataChannel {
  constructor(peerManager) {
    this.peerManager = peerManager;
    this.messageHandlers = new Map();
    this.setupMessageHandler();
  }

  // 設定訊息處理器
  setupMessageHandler() {
    this.peerManager.onMessage((peerId, data) => {
      try {
        const message = typeof data === 'string' ? JSON.parse(data) : data;
        this.handleMessage(peerId, message);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    });
  }

  // 處理訊息
  handleMessage(peerId, message) {
    const { type, payload, timestamp } = message;
    
    if (this.messageHandlers.has(type)) {
      const handlers = this.messageHandlers.get(type);
      handlers.forEach(handler => handler(peerId, payload, timestamp));
    }
  }

  // 註冊訊息處理器
  on(type, handler) {
    if (!this.messageHandlers.has(type)) {
      this.messageHandlers.set(type, []);
    }
    this.messageHandlers.get(type).push(handler);
  }

  // 發送訊息
  send(type, payload, targetPeerId = null) {
    const message = {
      type,
      payload,
      timestamp: Date.now()
    };

    if (targetPeerId) {
      // 發送給特定 Peer
      this.peerManager.send(targetPeerId, message);
    } else if (this.peerManager.isHost) {
      // 房主廣播給所有參與者
      this.peerManager.broadcast(message);
    } else {
      // 參與者發送給房主
      const hostConnections = this.peerManager.getConnections();
      if (hostConnections.length > 0) {
        this.peerManager.send(hostConnections[0], message);
      }
    }
  }

  // 訊息類型定義
  static MESSAGE_TYPES = {
    JOIN: 'JOIN',
    LEAVE: 'LEAVE',
    ADD_ITEM: 'ADD_ITEM',
    UPDATE_ITEM: 'UPDATE_ITEM',
    DELETE_ITEM: 'DELETE_ITEM',
    VOTE: 'VOTE',
    STATUS_CHANGE: 'STATUS_CHANGE',
    SYNC: 'SYNC',
    KICK: 'KICK'
  };
}

