// 房主模式邏輯
import { PeerManager } from '../webrtc/PeerManager.js';
import { DataChannel } from '../webrtc/DataChannel.js';
import { storage } from '../utils/storage/index.js';

export class HostMode {
  constructor() {
    this.peerManager = new PeerManager();
    this.dataChannel = null;
    this.meetingId = null;
    this.retro = null;
    this.participants = new Map();
    this.maxParticipants = 15;
    this.onParticipantJoinCallbacks = [];
    this.onParticipantLeaveCallbacks = [];
    this.onItemUpdateCallbacks = [];
    this.onStatusChangeCallbacks = [];
    this.saveTimeout = null; // 用於 debounce 自動保存
  }

  // 建立會議室
  async createMeeting(title, description, date, allowAnonymous) {
    // 生成會議 ID
    this.meetingId = this.generateMeetingId();
    
    // 建立回顧資料
    this.retro = {
      id: this.generateId(),
      meetingId: this.meetingId,
      title,
      description,
      date,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      allowAnonymous,
      host: {
        peerId: null, // 將在 Peer 初始化後設定
        name: 'Host'
      },
      participants: [],
      items: {
        howDoYouFeel: [],
        whatWentWell: [],
        whatDidntGoWell: [],
        whatNeedsChange: [],
        shoutOuts: []
      },
      status: 'collecting' // 開房後直接開始收集階段
    };

    // 初始化 Peer（房主模式）- 使用會議 ID 作為 Peer ID
    try {
      const peerId = await this.peerManager.init(true, this.meetingId);
      this.retro.host.peerId = peerId;
      
      // 初始化資料通道
      this.dataChannel = new DataChannel(this.peerManager);
      this.setupDataChannel();
      
      return {
        meetingId: this.meetingId,
        peerId: peerId,
        retro: this.retro
      };
    } catch (error) {
      console.error('Failed to create meeting:', error);
      throw error;
    }
  }

  // 設定資料通道
  setupDataChannel() {
    // 處理參與者加入
    this.dataChannel.on(DataChannel.MESSAGE_TYPES.JOIN, (peerId, payload) => {
      this.handleParticipantJoin(peerId, payload);
    });

    // 處理參與者離開
    this.dataChannel.on(DataChannel.MESSAGE_TYPES.LEAVE, (peerId) => {
      this.handleParticipantLeave(peerId);
    });

    // 處理新增項目
    this.dataChannel.on(DataChannel.MESSAGE_TYPES.ADD_ITEM, (peerId, payload) => {
      this.handleAddItem(peerId, payload);
    });

    // 處理更新項目｀
    this.dataChannel.on(DataChannel.MESSAGE_TYPES.UPDATE_ITEM, (peerId, payload) => {
      this.handleUpdateItem(peerId, payload);
    });

    // 處理刪除項目
    this.dataChannel.on(DataChannel.MESSAGE_TYPES.DELETE_ITEM, (peerId, payload) => {
      this.handleDeleteItem(peerId, payload);
    });

    // 處理投票｀
    this.dataChannel.on(DataChannel.MESSAGE_TYPES.VOTE, (peerId, payload) => {
      this.handleVote(peerId, payload);
    });

    // 監聽連線
    this.peerManager.onConnection(async (peerId, conn) => {
      // 檢查人數限制
      if (this.participants.size >= this.maxParticipants - 1) {
        // 拒絕連線
        this.dataChannel.send(DataChannel.MESSAGE_TYPES.KICK, {
          reason: 'MAX_PARTICIPANTS'
        }, peerId);
        this.peerManager.disconnect(peerId);
        return;
      }

      // 檢查黑名單
      const blacklist = await storage.getBlacklist();
      if (Array.isArray(blacklist) && blacklist.includes(peerId)) {
        this.dataChannel.send(DataChannel.MESSAGE_TYPES.KICK, {
          reason: 'BLACKLISTED'
        }, peerId);
        this.peerManager.disconnect(peerId);
        return;
      }

      // 等待一下，確保 JOIN 訊息已經發送
      // 然後發送當前狀態（即使還沒收到 JOIN，先讓 client 知道連線成功）
      setTimeout(() => {
        this.syncState(peerId);
      }, 200);
    });

    // 監聽斷線
    this.peerManager.onDisconnection((peerId) => {
      this.handleParticipantLeave(peerId);
    });
  }

  // 處理參與者加入
  handleParticipantJoin(peerId, payload) {
    const { name } = payload;
    
    // 檢查是否已經處理過這個參與者（防止重複處理）
    if (this.participants.has(peerId)) {
      console.log('Participant already joined, ignoring duplicate JOIN message:', peerId);
      // 即使已經加入，也發送一次 SYNC 確保狀態同步
      this.syncState(peerId);
      return;
    }
    
    // 檢查名稱重複
    if (this.isNameDuplicate(name)) {
      this.dataChannel.send(DataChannel.MESSAGE_TYPES.KICK, {
        reason: 'NAME_DUPLICATE'
      }, peerId);
      this.peerManager.disconnect(peerId);
      return;
    }

    const participant = {
      peerId,
      name,
      joinedAt: Date.now(),
      leftAt: null
    };

    this.participants.set(peerId, participant);
        this.retro.participants.push(participant);
        this.retro.updatedAt = Date.now();

        // 廣播給所有參與者
        this.dataChannel.send(DataChannel.MESSAGE_TYPES.JOIN, {
          peerId,
          name,
          participants: Array.from(this.participants.values())
        });

        // 發送完整狀態給新加入的參與者（確保他們收到 SYNC 訊息）
        this.syncState(peerId);

        this.onParticipantJoinCallbacks.forEach(cb => cb(participant));
        
        // 自動保存
        this.autoSave();
  }

  // 處理參與者離開
  handleParticipantLeave(peerId) {
    const participant = this.participants.get(peerId);
    if (participant) {
      participant.leftAt = Date.now();
      this.participants.delete(peerId);
      this.retro.updatedAt = Date.now();

      // 廣播給所有參與者
      this.dataChannel.send(DataChannel.MESSAGE_TYPES.LEAVE, {
        peerId,
        participants: Array.from(this.participants.values())
      });

      this.onParticipantLeaveCallbacks.forEach(cb => cb(participant));
      
      // 自動保存
      this.autoSave();
    }
  }

  // 處理新增項目
  handleAddItem(peerId, payload) {
    const { category, item } = payload;
    if (!this.retro.items[category]) {
      return;
    }

    this.retro.items[category].push(item);
    this.retro.updatedAt = Date.now();

    // 廣播給所有參與者
    this.dataChannel.send(DataChannel.MESSAGE_TYPES.ADD_ITEM, {
      category,
      item
    });

    this.onItemUpdateCallbacks.forEach(cb => cb());
    
    // 自動保存
    this.autoSave();
  }

  // 處理更新項目
  handleUpdateItem(peerId, payload) {
    const { category, itemId, updates } = payload;
    const items = this.retro.items[category];
    if (!items) return;

    const index = items.findIndex(item => item.id === itemId);
    if (index !== -1) {
      items[index] = { ...items[index], ...updates };
      this.retro.updatedAt = Date.now();

      // 廣播給所有參與者
      this.dataChannel.send(DataChannel.MESSAGE_TYPES.UPDATE_ITEM, {
        category,
        itemId,
        updates
      });

      this.onItemUpdateCallbacks.forEach(cb => cb());
      
      // 自動保存
      this.autoSave();
    }
  }

  // 處理刪除項目
  handleDeleteItem(peerId, payload) {
    const { category, itemId } = payload;
    const items = this.retro.items[category];
    if (!items) return;

    const index = items.findIndex(item => item.id === itemId);
    if (index !== -1) {
      items.splice(index, 1);
      this.retro.updatedAt = Date.now();

      // 廣播給所有參與者
      this.dataChannel.send(DataChannel.MESSAGE_TYPES.DELETE_ITEM, {
        category,
        itemId
      });

      this.onItemUpdateCallbacks.forEach(cb => cb());
      
      // 自動保存
      this.autoSave();
    }
  }

  // 處理投票
  handleVote(peerId, payload) {
    const { category, itemId, vote } = payload;
    const items = this.retro.items[category];
    if (!items) return;

    const item = items.find(item => item.id === itemId);
    if (!item) return;

    if (vote) {
      // 投票
      if (!item.voters.includes(peerId)) {
        item.votes = (item.votes || 0) + 1;
        item.voters.push(peerId);
      }
    } else {
      // 取消投票
      const index = item.voters.indexOf(peerId);
      if (index !== -1) {
        item.votes = Math.max(0, (item.votes || 0) - 1);
        item.voters.splice(index, 1);
      }
    }

    this.retro.updatedAt = Date.now();

    // 廣播給所有參與者
    this.dataChannel.send(DataChannel.MESSAGE_TYPES.VOTE, {
      category,
      itemId,
      votes: item.votes,
      voters: item.voters
    });

    this.onItemUpdateCallbacks.forEach(cb => cb());
    
    // 自動保存
    this.autoSave();
  }

  // 同步狀態給新加入的參與者
  syncState(peerId) {
    this.dataChannel.send(DataChannel.MESSAGE_TYPES.SYNC, {
      retro: this.retro,
      participants: Array.from(this.participants.values())
    }, peerId);
  }

  // 變更狀態
  changeStatus(status) {
    this.retro.status = status;
    this.retro.updatedAt = Date.now();

    this.dataChannel.send(DataChannel.MESSAGE_TYPES.STATUS_CHANGE, {
      status
    });

    this.onStatusChangeCallbacks.forEach(cb => cb(status));
    
    // 自動保存
    this.autoSave();
  }

  // 踢除參與者
  async kickParticipant(peerId) {
    const participant = this.participants.get(peerId);
    if (participant) {
      // 加入黑名單
      const blacklist = await storage.getBlacklist();
      const safeBlacklist = Array.isArray(blacklist) ? blacklist : [];
      if (!safeBlacklist.includes(peerId)) {
        safeBlacklist.push(peerId);
        await storage.saveBlacklist(safeBlacklist);
      }

      // 發送踢除訊息
      this.dataChannel.send(DataChannel.MESSAGE_TYPES.KICK, {
        reason: 'KICKED_BY_HOST'
      }, peerId);

      // 斷開連線
      this.peerManager.disconnect(peerId);
      this.handleParticipantLeave(peerId);
    }
  }

  // 檢查名稱重複
  isNameDuplicate(name) {
    // 檢查房主名稱
    if (this.retro.host.name === name) {
      return true;
    }

    // 檢查參與者名稱
    for (const participant of this.participants.values()) {
      if (participant.name === name) {
        return true;
      }
    }

    return false;
  }

  // 生成會議 ID
  generateMeetingId() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // 避免混淆字元
    let id = '';
    for (let i = 0; i < 6; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  // 生成 ID
  generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // 註冊回調
  onParticipantJoin(callback) {
    this.onParticipantJoinCallbacks.push(callback);
  }

  onParticipantLeave(callback) {
    this.onParticipantLeaveCallbacks.push(callback);
  }

  onItemUpdate(callback) {
    this.onItemUpdateCallbacks.push(callback);
  }

  onStatusChange(callback) {
    this.onStatusChangeCallbacks.push(callback);
  }

  // 取得參與者列表
  getParticipants() {
    return Array.from(this.participants.values());
  }

  // 自動保存 retro（使用 debounce 避免頻繁保存）
  async autoSave() {
    // 清除之前的 timeout
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    
    // 延遲 1 秒後保存（debounce）
    this.saveTimeout = setTimeout(async () => {
      try {
        const retrospectives = await storage.getRetrospectives();
        const index = retrospectives.findIndex(r => r.id === this.retro.id || r.meetingId === this.retro.meetingId);
        
        if (index !== -1) {
          // 更新現有記錄
          retrospectives[index] = this.retro;
        } else {
          // 新增記錄
          retrospectives.push(this.retro);
        }
        
        await storage.saveRetrospectives(retrospectives);
        console.log('Auto-saved retro to storage');
      } catch (error) {
        console.error('Error auto-saving retro:', error);
        // 保存失敗不影響功能，只記錄錯誤
      }
    }, 1000); // 1 秒 debounce
  }

  // 結束會議
  async endMeeting() {
    // 清除 debounce timeout
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
      this.saveTimeout = null;
    }
    
    // 立即儲存回顧記錄
    const retrospectives = await storage.getRetrospectives();
    const index = retrospectives.findIndex(r => r.id === this.retro.id || r.meetingId === this.retro.meetingId);
    
    if (index !== -1) {
      retrospectives[index] = this.retro;
    } else {
      retrospectives.push(this.retro);
    }
    
    await storage.saveRetrospectives(retrospectives);

    // 斷開所有連線
    this.peerManager.disconnectAll();
    this.peerManager.destroy();
  }
}

