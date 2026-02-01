// 資料通道管理
export class DataChannel {
  constructor(peerManager) {
    this.peerManager = peerManager;
    this.messageHandlers = new Map();
    this.anyMessageHandlers = []; // 任一訊息都會觸發（參與者用於心跳逾時偵測）
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
    this.anyMessageHandlers.forEach(h => h(peerId, message));
    if (this.messageHandlers.has(type)) {
      const handlers = this.messageHandlers.get(type);
      handlers.forEach(handler => handler(peerId, payload, timestamp));
    }
  }

  // 註冊「任一訊息」處理器（參與者用於更新最後收到 host 訊息的時間）
  onAny(handler) {
    this.anyMessageHandlers.push(handler);
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
    REACTION: 'REACTION', // Emoji 反應
    STATUS_CHANGE: 'STATUS_CHANGE',
    SYNC: 'SYNC',
    KICK: 'KICK',
    EDIT_START: 'EDIT_START', // 開始編輯
    EDIT_END: 'EDIT_END', // 結束編輯
    HEARTBEAT: 'HEARTBEAT' // 心跳（host 定期發送，參與者用於偵測 host 離線）
  };
}

