/**
 * WebRTC Peer Manager
 * 使用 PeerJS 管理 P2P 連線
 */

import { storage } from '../utils/storage.js';

// 訊息類型
export const MessageType = {
  // 連線相關
  JOIN: 'join',                    // Client 加入會議
  JOIN_ACK: 'join_ack',            // Host 確認加入
  JOIN_REJECT: 'join_reject',      // Host 拒絕加入
  LEAVE: 'leave',                  // 參與者離開
  KICK: 'kick',                    // Host 踢除參與者
  
  // 估點相關
  START_ESTIMATION: 'start_estimation',  // 開始估點
  CARD_SELECT: 'card_select',            // 選擇卡片
  FLIP_CARDS: 'flip_cards',              // 翻牌
  RESET_ROUND: 'reset_round',            // 重置當前輪次
  
  // 狀態同步
  SYNC_STATE: 'sync_state',        // 同步狀態
  PARTICIPANT_UPDATE: 'participant_update', // 參與者更新
  
  // 心跳
  PING: 'ping',
  PONG: 'pong'
};

// 連線狀態
export const ConnectionState = {
  DISCONNECTED: 'disconnected',
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  ERROR: 'error'
};

// 估點狀態
export const EstimationState = {
  WAITING: 'waiting',       // 等待開始
  SELECTING: 'selecting',   // 選擇中
  SELECTED: 'selected',     // 已選擇
  REVEALED: 'revealed'      // 已翻牌
};

/**
 * 生成會議 ID
 * @returns {string} 6 位數字字母混合 ID
 */
export function generateMeetingId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // 排除容易混淆的 0,O,1,I
  let id = '';
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

/**
 * Host 管理器
 * 管理 Host 端的 P2P 連線
 */
export class HostManager {
  constructor() {
    this.peer = null;
    this.meetingId = null;
    this.connections = new Map(); // peerId -> { conn, participant }
    this.participants = new Map(); // peerId -> participant data
    this.state = ConnectionState.DISCONNECTED;
    this.estimationState = EstimationState.WAITING;
    this.blacklist = storage.get('blacklist') || [];
    
    // 回調函數
    this.onStateChange = null;
    this.onParticipantJoin = null;
    this.onParticipantLeave = null;
    this.onParticipantUpdate = null;
    this.onCardSelect = null;
    this.onError = null;
  }
  
  /**
   * 建立會議室
   * @returns {Promise<string>} 會議 ID
   */
  async createMeeting() {
    return new Promise((resolve, reject) => {
      this.meetingId = generateMeetingId();
      this.state = ConnectionState.CONNECTING;
      this._notifyStateChange();
      
      // 建立 Peer（使用會議 ID 作為 Peer ID）
      this.peer = new Peer(`agile-est-${this.meetingId}`, {
        debug: 1
      });
      
      this.peer.on('open', (id) => {
        console.log('Host peer opened:', id);
        this.state = ConnectionState.CONNECTED;
        this._notifyStateChange();
        resolve(this.meetingId);
      });
      
      this.peer.on('connection', (conn) => {
        this._handleConnection(conn);
      });
      
      this.peer.on('error', (err) => {
        console.error('Host peer error:', err);
        this.state = ConnectionState.ERROR;
        this._notifyStateChange();
        if (this.onError) {
          this.onError(err);
        }
        reject(err);
      });
      
      this.peer.on('disconnected', () => {
        console.log('Host peer disconnected');
        this.state = ConnectionState.DISCONNECTED;
        this._notifyStateChange();
      });
    });
  }
  
  /**
   * 處理新連線
   * @param {DataConnection} conn - PeerJS 連線
   */
  _handleConnection(conn) {
    console.log('New connection from:', conn.peer);
    
    conn.on('open', () => {
      console.log('Connection opened:', conn.peer);
    });
    
    conn.on('data', (data) => {
      this._handleMessage(conn, data);
    });
    
    conn.on('close', () => {
      console.log('Connection closed:', conn.peer);
      this._removeParticipant(conn.peer);
    });
    
    conn.on('error', (err) => {
      console.error('Connection error:', conn.peer, err);
    });
  }
  
  /**
   * 處理訊息
   * @param {DataConnection} conn - 連線
   * @param {Object} data - 訊息資料
   */
  _handleMessage(conn, data) {
    console.log('Received message:', data);
    
    switch (data.type) {
      case MessageType.JOIN:
        this._handleJoin(conn, data);
        break;
        
      case MessageType.CARD_SELECT:
        this._handleCardSelect(conn, data);
        break;
        
      case MessageType.LEAVE:
        this._removeParticipant(conn.peer);
        break;
        
      case MessageType.PONG:
        // 心跳回應
        break;
        
      default:
        console.warn('Unknown message type:', data.type);
    }
  }
  
  /**
   * 處理加入請求
   * @param {DataConnection} conn - 連線
   * @param {Object} data - 加入資料
   */
  _handleJoin(conn, data) {
    const { name } = data;
    
    // 檢查黑名單
    if (this.blacklist.includes(conn.peer)) {
      conn.send({
        type: MessageType.JOIN_REJECT,
        reason: 'blacklisted'
      });
      conn.close();
      return;
    }
    
    // 檢查人數上限
    if (this.participants.size >= 15) {
      conn.send({
        type: MessageType.JOIN_REJECT,
        reason: 'full'
      });
      conn.close();
      return;
    }
    
    // 檢查名稱是否有效
    if (!name || name.trim().length === 0) {
      conn.send({
        type: MessageType.JOIN_REJECT,
        reason: 'invalid_name'
      });
      conn.close();
      return;
    }
    
    // 建立參與者資料
    const participant = {
      peerId: conn.peer,
      name: name.trim(),
      connectionState: ConnectionState.CONNECTED,
      estimationState: this.estimationState === EstimationState.SELECTING 
        ? EstimationState.SELECTING 
        : EstimationState.WAITING,
      selectedCard: null,
      joinedAt: Date.now()
    };
    
    // 儲存連線和參與者資料
    this.connections.set(conn.peer, { conn, participant });
    this.participants.set(conn.peer, participant);
    
    // 發送確認訊息
    conn.send({
      type: MessageType.JOIN_ACK,
      meetingId: this.meetingId,
      estimationState: this.estimationState,
      participants: this._getParticipantsArray()
    });
    
    // 通知其他參與者
    this._broadcastParticipantUpdate();
    
    // 觸發回調
    if (this.onParticipantJoin) {
      this.onParticipantJoin(participant);
    }
  }
  
  /**
   * 處理卡片選擇
   * @param {DataConnection} conn - 連線
   * @param {Object} data - 選擇資料
   */
  _handleCardSelect(conn, data) {
    const participant = this.participants.get(conn.peer);
    if (!participant) return;
    
    participant.selectedCard = data.card;
    participant.estimationState = EstimationState.SELECTED;
    
    // 通知其他參與者（不透露選擇內容）
    this._broadcastParticipantUpdate();
    
    // 觸發回調
    if (this.onCardSelect) {
      this.onCardSelect(participant);
    }
  }
  
  /**
   * 移除參與者
   * @param {string} peerId - Peer ID
   */
  _removeParticipant(peerId) {
    const connData = this.connections.get(peerId);
    if (connData) {
      const { participant } = connData;
      
      this.connections.delete(peerId);
      this.participants.delete(peerId);
      
      // 通知其他參與者
      this._broadcastParticipantUpdate();
      
      // 觸發回調
      if (this.onParticipantLeave) {
        this.onParticipantLeave(participant);
      }
    }
  }
  
  /**
   * 踢除參與者
   * @param {string} peerId - Peer ID
   * @param {boolean} addToBlacklist - 是否加入黑名單
   */
  kickParticipant(peerId, addToBlacklist = false) {
    const connData = this.connections.get(peerId);
    if (connData) {
      const { conn } = connData;
      
      // 發送踢除訊息
      conn.send({
        type: MessageType.KICK,
        reason: addToBlacklist ? 'blacklisted' : 'kicked'
      });
      
      // 關閉連線
      setTimeout(() => {
        conn.close();
      }, 100);
      
      // 加入黑名單
      if (addToBlacklist) {
        this.blacklist.push(peerId);
        storage.set('blacklist', this.blacklist);
      }
      
      this._removeParticipant(peerId);
    }
  }
  
  /**
   * 開始估點
   */
  startEstimation() {
    this.estimationState = EstimationState.SELECTING;
    
    // 重置所有參與者的選擇
    for (const participant of this.participants.values()) {
      participant.selectedCard = null;
      participant.estimationState = EstimationState.SELECTING;
    }
    
    // 廣播開始估點訊息
    this._broadcast({
      type: MessageType.START_ESTIMATION
    });
    
    this._broadcastParticipantUpdate();
  }
  
  /**
   * 翻牌
   * @returns {Array} 所有參與者的估點結果
   */
  flipCards() {
    this.estimationState = EstimationState.REVEALED;
    
    // 更新所有參與者狀態
    for (const participant of this.participants.values()) {
      participant.estimationState = EstimationState.REVEALED;
    }
    
    // 收集結果
    const results = this._getParticipantsArray().map(p => ({
      name: p.name,
      card: p.selectedCard
    }));
    
    // 廣播翻牌訊息
    this._broadcast({
      type: MessageType.FLIP_CARDS,
      results
    });
    
    this._broadcastParticipantUpdate();
    
    return results;
  }
  
  /**
   * 重置當前輪次
   */
  resetRound() {
    this.estimationState = EstimationState.WAITING;
    
    // 重置所有參與者
    for (const participant of this.participants.values()) {
      participant.selectedCard = null;
      participant.estimationState = EstimationState.WAITING;
    }
    
    // 廣播重置訊息
    this._broadcast({
      type: MessageType.RESET_ROUND
    });
    
    this._broadcastParticipantUpdate();
  }
  
  /**
   * 廣播訊息給所有參與者
   * @param {Object} message - 訊息
   */
  _broadcast(message) {
    for (const { conn } of this.connections.values()) {
      try {
        conn.send(message);
      } catch (err) {
        console.error('Broadcast error:', err);
      }
    }
  }
  
  /**
   * 廣播參與者更新
   */
  _broadcastParticipantUpdate() {
    const participants = this._getParticipantsArray();
    
    this._broadcast({
      type: MessageType.PARTICIPANT_UPDATE,
      participants: participants.map(p => ({
        ...p,
        // 未翻牌時不透露選擇內容
        selectedCard: this.estimationState === EstimationState.REVEALED ? p.selectedCard : null,
        hasSelected: p.selectedCard !== null
      }))
    });
    
    // 觸發回調
    if (this.onParticipantUpdate) {
      this.onParticipantUpdate(participants);
    }
  }
  
  /**
   * 取得參與者陣列
   * @returns {Array} 參與者陣列
   */
  _getParticipantsArray() {
    return Array.from(this.participants.values());
  }
  
  /**
   * 取得參與者列表
   * @returns {Array} 參與者列表
   */
  getParticipants() {
    return this._getParticipantsArray();
  }
  
  /**
   * 通知狀態變更
   */
  _notifyStateChange() {
    if (this.onStateChange) {
      this.onStateChange(this.state);
    }
  }
  
  /**
   * 關閉會議
   */
  closeMeeting() {
    // 發送關閉訊息給所有參與者
    this._broadcast({
      type: MessageType.LEAVE,
      reason: 'meeting_closed'
    });
    
    // 關閉所有連線
    for (const { conn } of this.connections.values()) {
      conn.close();
    }
    
    // 清理
    this.connections.clear();
    this.participants.clear();
    
    // 關閉 Peer
    if (this.peer) {
      this.peer.destroy();
      this.peer = null;
    }
    
    this.meetingId = null;
    this.state = ConnectionState.DISCONNECTED;
    this.estimationState = EstimationState.WAITING;
    this._notifyStateChange();
  }
}

/**
 * Client 管理器
 * 管理 Client 端的 P2P 連線
 */
export class ClientManager {
  constructor() {
    this.peer = null;
    this.connection = null;
    this.meetingId = null;
    this.name = null;
    this.state = ConnectionState.DISCONNECTED;
    this.estimationState = EstimationState.WAITING;
    this.selectedCard = null;
    this.participants = [];
    
    // 回調函數
    this.onStateChange = null;
    this.onEstimationStart = null;
    this.onFlipCards = null;
    this.onResetRound = null;
    this.onParticipantUpdate = null;
    this.onKicked = null;
    this.onError = null;
  }
  
  /**
   * 加入會議
   * @param {string} meetingId - 會議 ID
   * @param {string} name - 參與者名稱
   * @returns {Promise<void>}
   */
  async joinMeeting(meetingId, name) {
    return new Promise((resolve, reject) => {
      this.meetingId = meetingId.toUpperCase();
      this.name = name;
      this.state = ConnectionState.CONNECTING;
      this._notifyStateChange();
      
      // 建立 Peer
      this.peer = new Peer({
        debug: 1
      });
      
      this.peer.on('open', (id) => {
        console.log('Client peer opened:', id);
        
        // 連線到 Host
        const hostPeerId = `agile-est-${this.meetingId}`;
        this.connection = this.peer.connect(hostPeerId, {
          reliable: true
        });
        
        this.connection.on('open', () => {
          console.log('Connected to host');
          
          // 發送加入請求
          this.connection.send({
            type: MessageType.JOIN,
            name: this.name
          });
        });
        
        this.connection.on('data', (data) => {
          this._handleMessage(data, resolve, reject);
        });
        
        this.connection.on('close', () => {
          console.log('Connection to host closed');
          this.state = ConnectionState.DISCONNECTED;
          this._notifyStateChange();
        });
        
        this.connection.on('error', (err) => {
          console.error('Connection error:', err);
          this.state = ConnectionState.ERROR;
          this._notifyStateChange();
          if (this.onError) {
            this.onError(err);
          }
          reject(err);
        });
      });
      
      this.peer.on('error', (err) => {
        console.error('Client peer error:', err);
        this.state = ConnectionState.ERROR;
        this._notifyStateChange();
        if (this.onError) {
          this.onError(err);
        }
        reject(err);
      });
      
      // 連線超時
      setTimeout(() => {
        if (this.state === ConnectionState.CONNECTING) {
          this.state = ConnectionState.ERROR;
          this._notifyStateChange();
          reject(new Error('Connection timeout'));
        }
      }, 15000);
    });
  }
  
  /**
   * 處理訊息
   * @param {Object} data - 訊息資料
   * @param {Function} resolve - Promise resolve
   * @param {Function} reject - Promise reject
   */
  _handleMessage(data, resolve, reject) {
    console.log('Received message:', data);
    
    switch (data.type) {
      case MessageType.JOIN_ACK:
        this.state = ConnectionState.CONNECTED;
        this.estimationState = data.estimationState || EstimationState.WAITING;
        this.participants = data.participants || [];
        this._notifyStateChange();
        if (resolve) resolve();
        break;
        
      case MessageType.JOIN_REJECT:
        this.state = ConnectionState.ERROR;
        this._notifyStateChange();
        if (reject) reject(new Error(data.reason));
        break;
        
      case MessageType.START_ESTIMATION:
        this.estimationState = EstimationState.SELECTING;
        this.selectedCard = null;
        if (this.onEstimationStart) {
          this.onEstimationStart();
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
        if (this.onResetRound) {
          this.onResetRound();
        }
        break;
        
      case MessageType.PARTICIPANT_UPDATE:
        this.participants = data.participants || [];
        if (this.onParticipantUpdate) {
          this.onParticipantUpdate(this.participants);
        }
        break;
        
      case MessageType.KICK:
        this.state = ConnectionState.DISCONNECTED;
        this._notifyStateChange();
        if (this.onKicked) {
          this.onKicked(data.reason);
        }
        this.leaveMeeting();
        break;
        
      case MessageType.LEAVE:
        if (data.reason === 'meeting_closed') {
          this.state = ConnectionState.DISCONNECTED;
          this._notifyStateChange();
          if (this.onError) {
            this.onError(new Error('Meeting closed by host'));
          }
        }
        break;
        
      case MessageType.PING:
        this.connection.send({ type: MessageType.PONG });
        break;
        
      default:
        console.warn('Unknown message type:', data.type);
    }
  }
  
  /**
   * 選擇卡片
   * @param {string} card - 卡片值
   */
  selectCard(card) {
    if (this.estimationState !== EstimationState.SELECTING) {
      console.warn('Cannot select card in current state:', this.estimationState);
      return;
    }
    
    this.selectedCard = card;
    this.estimationState = EstimationState.SELECTED;
    
    // 發送選擇訊息
    if (this.connection) {
      this.connection.send({
        type: MessageType.CARD_SELECT,
        card
      });
    }
  }
  
  /**
   * 通知狀態變更
   */
  _notifyStateChange() {
    if (this.onStateChange) {
      this.onStateChange(this.state);
    }
  }
  
  /**
   * 離開會議
   */
  leaveMeeting() {
    // 發送離開訊息
    if (this.connection) {
      try {
        this.connection.send({
          type: MessageType.LEAVE
        });
      } catch (err) {
        console.error('Leave error:', err);
      }
      this.connection.close();
      this.connection = null;
    }
    
    // 關閉 Peer
    if (this.peer) {
      this.peer.destroy();
      this.peer = null;
    }
    
    this.meetingId = null;
    this.name = null;
    this.selectedCard = null;
    this.participants = [];
    this.state = ConnectionState.DISCONNECTED;
    this.estimationState = EstimationState.WAITING;
    this._notifyStateChange();
  }
}

