/**
 * WebRTC Mocks
 * Mock 實作用於測試
 */

import { ConnectionState, EstimationState, MessageType } from './peer-manager.js';

/**
 * Mock Peer Factory
 */
export class MockPeerFactory {
  constructor() {
    this.peers = new Map(); // id -> MockPeer
    this.nextClientId = 1; // 用於生成唯一的 Client peer ID
    // 設置全局引用以便 MockPeer 和 MockDataConnection 訪問
    if (typeof window !== 'undefined') {
      window.__mockPeerFactory__ = this;
    }
  }
  
  createPeer(id, options = {}) {
    // 如果 id 是 undefined，生成一個唯一的 ID（用於 Client）
    if (id === undefined || id === null) {
      id = `mock-client-${this.nextClientId++}`;
    }
    const peer = new MockPeer(id, options, this);
    this.peers.set(id, peer);
    return peer;
  }
  
  getPeer(id) {
    return this.peers.get(id);
  }
  
  clear() {
    this.peers.clear();
  }
}

/**
 * Mock Peer
 */
class MockPeer {
  constructor(id, options = {}, factory = null) {
    this.id = id;
    this.options = options;
    this.eventHandlers = new Map();
    this.connections = new Map(); // peerId -> MockDataConnection
    this.isOpen = false;
    this.isDestroyed = false;
    this.factory = factory;
    
    // 自動觸發 open 事件（模擬非同步開啟）
    // 使用 setTimeout 確保事件監聽器已經註冊
    setTimeout(() => {
      if (!this.isDestroyed) {
        this.simulateOpen();
      }
    }, 10);
  }
  
  on(event, callback) {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event).push(callback);
  }
  
  emit(event, ...args) {
    if (this.eventHandlers.has(event)) {
      this.eventHandlers.get(event).forEach(callback => {
        try {
          callback(...args);
        } catch (err) {
          console.error('MockPeer event handler error:', err);
        }
      });
    }
  }
  
  connect(peerId, options = {}) {
    const factory = this.factory || (typeof window !== 'undefined' ? window.__mockPeerFactory__ : null);
    if (!factory) {
      throw new Error('MockPeerFactory not available');
    }
    
    const targetPeer = factory.getPeer(peerId);
    if (!targetPeer) {
      throw new Error(`Peer ${peerId} not found`);
    }
    
    const conn = new MockDataConnection(this.id, peerId, options, factory);
    this.connections.set(peerId, conn);
    
    // 先創建對端的連接（在觸發 open 事件之前）
    let targetConn = null;
    if (targetPeer.eventHandlers.has('connection')) {
      targetConn = new MockDataConnection(peerId, this.id, options, factory);
      targetPeer.connections.set(this.id, targetConn);
      targetPeer.emit('connection', targetConn);
    }
    
    // 模擬非同步連線
    setTimeout(() => {
      // 觸發 conn 的 open 事件（這會設置 conn.isOpen = true）
      conn.emit('open');
      
      // 觸發 targetConn 的 open 事件（這會設置 targetConn.isOpen = true）
      if (targetConn) {
        setTimeout(() => {
          targetConn.emit('open');
        }, 10);
      }
    }, 10);
    
    return conn;
  }
  
  destroy() {
    this.isDestroyed = true;
    this.connections.forEach(conn => conn.close());
    this.connections.clear();
    this.eventHandlers.clear();
  }
  
  // 模擬 peer 開啟
  simulateOpen() {
    if (!this.isOpen && !this.isDestroyed) {
      this.isOpen = true;
      this.emit('open', this.id);
    }
  }
  
  // 模擬 peer 錯誤
  simulateError(error) {
    this.emit('error', error);
  }
  
  // 模擬 peer 斷線
  simulateDisconnect() {
    this.isOpen = false;
    this.emit('disconnected');
  }
}

/**
 * Mock Data Connection
 */
class MockDataConnection {
  constructor(fromPeerId, toPeerId, options = {}, factory = null) {
    this.fromPeerId = fromPeerId;
    this.toPeerId = toPeerId;
    this.peer = toPeerId;
    this.options = options;
    this.eventHandlers = new Map();
    this.isOpen = false;
    this.isClosed = false;
    this.sentMessages = [];
    this.factory = factory;
  }
  
  on(event, callback) {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event).push(callback);
  }
  
  emit(event, ...args) {
    // 當 open 事件被觸發時，設置 isOpen 為 true
    if (event === 'open') {
      this.isOpen = true;
    }
    
    if (this.eventHandlers.has(event)) {
      this.eventHandlers.get(event).forEach(callback => {
        try {
          callback(...args);
        } catch (err) {
          console.error('MockDataConnection event handler error:', err);
        }
      });
    }
  }
  
  send(data) {
    // 如果連接已關閉，靜默失敗（不拋出錯誤）
    // 這在清理資源時很有用，因為連接可能已經被關閉
    if (this.isClosed) {
      return;
    }
    
    this.sentMessages.push({
      timestamp: Date.now(),
      data,
      to: this.toPeerId
    });
    
    // 模擬訊息傳遞到對端
    const factory = this.factory || (typeof window !== 'undefined' ? window.__mockPeerFactory__ : null);
    if (factory) {
      const targetPeer = factory.getPeer(this.toPeerId);
      if (targetPeer) {
        // 查找對端的連接：從 targetPeer 的 connections 中查找，key 是 this.fromPeerId
        const targetConn = targetPeer.connections.get(this.fromPeerId);
        if (targetConn && !targetConn.isClosed) {
          // 如果 targetConn 還沒有 isOpen，先觸發 open 事件
          if (!targetConn.isOpen) {
            targetConn.emit('open');
          }
          // 延遲發送消息，確保事件處理器已經註冊
          setTimeout(() => {
            targetConn.emit('data', data);
          }, 10);
        } else {
          // 調試：如果找不到連接，嘗試通過所有連接查找
          console.warn(`[MockDataConnection] 找不到對端連接: fromPeerId=${this.fromPeerId}, toPeerId=${this.toPeerId}, targetPeer.id=${targetPeer.id}`);
          console.warn(`[MockDataConnection] targetPeer.connections keys:`, Array.from(targetPeer.connections.keys()));
          // 嘗試通過 toPeerId 查找（反向查找）
          for (const [key, conn] of targetPeer.connections.entries()) {
            if (conn.toPeerId === this.fromPeerId) {
              console.log(`[MockDataConnection] 找到反向連接: key=${key}`);
              if (!conn.isClosed) {
                if (!conn.isOpen) {
                  conn.emit('open');
                }
                setTimeout(() => {
                  conn.emit('data', data);
                }, 10);
                return;
              }
            }
          }
        }
      } else {
        console.warn(`[MockDataConnection] 找不到目標 Peer: toPeerId=${this.toPeerId}`);
      }
    }
  }
  
  close() {
    if (!this.isClosed) {
      this.isClosed = true;
      this.emit('close');
      
      // 通知對端
      const factory = this.factory || (typeof window !== 'undefined' ? window.__mockPeerFactory__ : null);
      if (factory) {
        const targetPeer = factory.getPeer(this.toPeerId);
        if (targetPeer) {
          const targetConn = targetPeer.connections.get(this.fromPeerId);
          if (targetConn) {
            targetConn.isClosed = true;
            targetConn.emit('close');
          }
        }
      }
    }
  }
}

/**
 * Mock Host Manager
 */
export class MockHostManager {
  constructor(peerFactory = null) {
    this.peerFactory = peerFactory;
    this.state = ConnectionState.DISCONNECTED;
    this.estimationState = EstimationState.WAITING;
    this.meetingId = null;
    this.hostName = 'Host';
    this.currentIssue = null;
    this.participants = new Map();
    this.connections = new Map();
    this.blacklist = [];
    
    // 回調
    this.onStateChange = null;
    this.onParticipantJoin = null;
    this.onParticipantLeave = null;
    this.onParticipantUpdate = null;
    this.onCardSelect = null;
    this.onError = null;
    
    this._peer = null;
  }
  
  async createMeeting(meetingName = null) {
    this.meetingId = this._generateMeetingId();
    this.state = ConnectionState.CONNECTING;
    this._notifyStateChange();
    
    if (this.peerFactory) {
      this._peer = this.peerFactory.createPeer(`agile-est-${this.meetingId}`);
      this._peer.on('connection', (conn) => {
        this._handleConnection(conn);
      });
      
      // 模擬非同步開啟
      setTimeout(() => {
        this._peer.simulateOpen();
        this.state = ConnectionState.CONNECTED;
        this._notifyStateChange();
      }, 10);
    }
    
    return Promise.resolve(this.meetingId);
  }
  
  closeMeeting() {
    if (this._peer) {
      this._peer.destroy();
      this._peer = null;
    }
    this.participants.clear();
    this.connections.clear();
    this.state = ConnectionState.DISCONNECTED;
    this._notifyStateChange();
  }
  
  startEstimation(issueInfo) {
    this.currentIssue = issueInfo;
    this.estimationState = EstimationState.SELECTING;
    // 模擬廣播訊息
    this._broadcast({
      type: MessageType.START_ESTIMATION,
      issueInfo
    });
  }
  
  flipCards(hostResult = null) {
    this.estimationState = EstimationState.REVEALED;
    
    const results = Array.from(this.participants.values()).map(p => ({
      name: p.name,
      card: p.selectedCard
    }));
    
    if (hostResult && hostResult.name) {
      results.push({
        name: hostResult.name,
        card: hostResult.card
      });
    }
    
    this._broadcast({
      type: MessageType.FLIP_CARDS,
      results
    });
    
    return results;
  }
  
  resetRound() {
    this.estimationState = EstimationState.WAITING;
    this.currentIssue = null;
    this.participants.forEach(p => {
      p.selectedCard = null;
    });
    this._broadcast({
      type: MessageType.RESET_ROUND
    });
  }
  
  getParticipants() {
    return Array.from(this.participants.values());
  }
  
  kickParticipant(peerId) {
    const conn = this.connections.get(peerId);
    if (conn) {
      conn.send({
        type: MessageType.KICK,
        reason: 'kicked_by_host'
      });
      conn.close();
    }
    this._removeParticipant(peerId);
  }
  
  _handleConnection(conn) {
    const peerId = conn.fromPeerId || conn.peer;
    this.connections.set(peerId, conn);
    
    conn.on('open', () => {
      // 連線已開啟
    });
    
    conn.on('data', (data) => {
      this._handleMessage(conn, data);
    });
    
    conn.on('close', () => {
      this._removeParticipant(peerId);
    });
  }
  
  _handleMessage(conn, data) {
    const peerId = conn.fromPeerId || conn.peer;
    
    switch (data.type) {
      case MessageType.JOIN:
        this._handleJoin(conn, data);
        break;
      case MessageType.CARD_SELECT:
        this._handleCardSelect(conn, data);
        break;
      case MessageType.LEAVE:
        this._removeParticipant(peerId);
        break;
    }
  }
  
  _handleJoin(conn, data) {
    const peerId = conn.fromPeerId || conn.peer;
    const { name } = data;
    
    if (this.blacklist.includes(peerId)) {
      conn.send({
        type: MessageType.JOIN_REJECT,
        reason: 'blacklisted'
      });
      conn.close();
      return;
    }
    
    if (this.participants.size >= 15) {
      conn.send({
        type: MessageType.JOIN_REJECT,
        reason: 'full'
      });
      conn.close();
      return;
    }
    
    const participant = {
      peerId,
      name,
      estimationState: this.estimationState === EstimationState.SELECTING 
        ? EstimationState.SELECTING 
        : EstimationState.WAITING,
      selectedCard: null
    };
    
    this.participants.set(peerId, participant);
    
    conn.send({
      type: MessageType.JOIN_ACK,
      meetingId: this.meetingId,
      estimationState: this.estimationState,
      currentIssue: this.estimationState === EstimationState.SELECTING ? this.currentIssue : null
    });
    
    if (this.onParticipantJoin) {
      this.onParticipantJoin(participant);
    }
    this._notifyParticipantUpdate();
  }
  
  _handleCardSelect(conn, data) {
    const peerId = conn.fromPeerId || conn.peer;
    const participant = this.participants.get(peerId);
    
    if (participant) {
      participant.selectedCard = data.card;
      participant.estimationState = EstimationState.SELECTED;
      
      if (this.onCardSelect) {
        this.onCardSelect(participant);
      }
      this._notifyParticipantUpdate();
    }
  }
  
  _removeParticipant(peerId) {
    const participant = this.participants.get(peerId);
    if (participant) {
      this.participants.delete(peerId);
      this.connections.delete(peerId);
      
      if (this.onParticipantLeave) {
        this.onParticipantLeave(participant);
      }
      this._notifyParticipantUpdate();
    }
  }
  
  _broadcast(message) {
    this.connections.forEach(conn => {
      if (!conn.isClosed) {
        conn.send(message);
      }
    });
  }
  
  _notifyStateChange() {
    if (this.onStateChange) {
      this.onStateChange(this.state);
    }
  }
  
  _notifyParticipantUpdate() {
    if (this.onParticipantUpdate) {
      this.onParticipantUpdate(this.getParticipants());
    }
  }
  
  _generateMeetingId() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let id = '';
    for (let i = 0; i < 6; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}

/**
 * Mock Client Manager
 */
export class MockClientManager {
  constructor(peerFactory = null) {
    this.peerFactory = peerFactory;
    this.state = ConnectionState.DISCONNECTED;
    this.estimationState = EstimationState.WAITING;
    this.meetingId = null;
    this.clientName = '';
    this.currentIssue = null;
    this.selectedCard = null;
    
    // 回調
    this.onStateChange = null;
    this.onEstimationStart = null;
    this.onFlipCards = null;
    this.onResetRound = null;
    this.onParticipantUpdate = null;
    this.onKicked = null;
    this.onMeetingClosed = null;
    this.onError = null;
    
    this._peer = null;
    this._connection = null;
  }
  
  async joinMeeting(meetingId, name) {
    this.meetingId = meetingId;
    this.clientName = name;
    this.state = ConnectionState.CONNECTING;
    this._notifyStateChange();
    
    if (this.peerFactory) {
      this._peer = this.peerFactory.createPeer(`client-${Date.now()}`);
      
      // 模擬非同步開啟
      setTimeout(() => {
        this._peer.simulateOpen();
        
        // 連接到 host
        const hostPeerId = `agile-est-${meetingId}`;
        this._connection = this._peer.connect(hostPeerId);
        
        this._connection.on('open', () => {
          // 發送加入訊息
          this._connection.send({
            type: MessageType.JOIN,
            name: this.clientName
          });
        });
        
        this._connection.on('data', (data) => {
          this._handleMessage(data);
        });
        
        this._connection.on('close', () => {
          this.state = ConnectionState.DISCONNECTED;
          this._notifyStateChange();
        });
      }, 10);
    }
    
    return Promise.resolve();
  }
  
  leaveMeeting() {
    if (this._connection) {
      this._connection.send({
        type: MessageType.LEAVE
      });
      this._connection.close();
      this._connection = null;
    }
    if (this._peer) {
      this._peer.destroy();
      this._peer = null;
    }
    this.state = ConnectionState.DISCONNECTED;
    this._notifyStateChange();
  }
  
  selectCard(card) {
    if (this._connection && !this._connection.isClosed) {
      this.selectedCard = card;
      this.estimationState = EstimationState.SELECTED;
      this._connection.send({
        type: MessageType.CARD_SELECT,
        card
      });
    }
  }
  
  _handleMessage(data) {
    switch (data.type) {
      case MessageType.JOIN_ACK:
        this.state = ConnectionState.CONNECTED;
        this._notifyStateChange();
        
        if (data.estimationState === EstimationState.SELECTING && data.currentIssue) {
          this.estimationState = EstimationState.SELECTING;
          this.currentIssue = data.currentIssue;
          if (this.onEstimationStart) {
            this.onEstimationStart(data.currentIssue);
          }
        }
        break;
        
      case MessageType.START_ESTIMATION:
        this.estimationState = EstimationState.SELECTING;
        this.currentIssue = data.issueInfo;
        if (this.onEstimationStart) {
          this.onEstimationStart(data.issueInfo);
        }
        break;
        
      case MessageType.FLIP_CARDS:
        this.estimationState = EstimationState.REVEALED;
        if (this.onFlipCards) {
          this.onFlipCards(data.results);
        }
        break;
        
      case MessageType.RESET_ROUND:
        this.estimationState = EstimationState.WAITING;
        this.selectedCard = null;
        this.currentIssue = null;
        if (this.onResetRound) {
          this.onResetRound();
        }
        break;
        
      case MessageType.KICK:
        if (this.onKicked) {
          this.onKicked(data.reason);
        }
        break;
        
      case MessageType.LEAVE:
        if (data.reason === 'meeting_closed') {
          if (this.onMeetingClosed) {
            this.onMeetingClosed();
          }
        } else {
          if (this.onError) {
            this.onError(new Error('Left meeting'));
          }
        }
        break;
    }
  }
  
  _notifyStateChange() {
    if (this.onStateChange) {
      this.onStateChange(this.state);
    }
  }
}

