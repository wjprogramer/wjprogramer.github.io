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
  async createMeeting(title, description, date, allowAnonymous, hostName = null) {
    // 生成會議 ID
    this.meetingId = this.generateMeetingId();
    
    // 如果沒有提供 hostName，嘗試從設置中獲取
    if (!hostName) {
      const settings = await storage.getSettings() || {};
      hostName = settings.lastUserName || 'Host';
    }
    
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
        name: hostName // 使用實際的使用者名稱
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

    // 處理編輯狀態（轉發給所有參與者）
    this.dataChannel.on(DataChannel.MESSAGE_TYPES.EDIT_START, (peerId, payload) => {
      // 轉發給所有參與者（不包括發送者）
      const message = {
        type: DataChannel.MESSAGE_TYPES.EDIT_START,
        payload,
        timestamp: Date.now()
      };
      this.peerManager.broadcast(message);
    });

    this.dataChannel.on(DataChannel.MESSAGE_TYPES.EDIT_END, (peerId, payload) => {
      // 轉發給所有參與者（不包括發送者）
      const message = {
        type: DataChannel.MESSAGE_TYPES.EDIT_END,
        payload,
        timestamp: Date.now()
      };
      this.peerManager.broadcast(message);
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
    const { name, expectedRetroId } = payload;
    
    // 驗證 retro id 是否匹配（如果參與者提供了期望的 retro id，表示這是重連）
    if (expectedRetroId && expectedRetroId !== this.retro.id) {
      console.error('Retro ID mismatch! Participant expected:', expectedRetroId, 'Host has:', this.retro.id);
      // retro id 不匹配，拒絕連線（可能是 host 用相同 peer id 建立了新的 retro）
      this.dataChannel.send(DataChannel.MESSAGE_TYPES.KICK, {
        reason: 'RETRO_ID_MISMATCH'
      }, peerId);
      this.peerManager.disconnect(peerId);
      return;
    }
    
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

  // 恢復會議（重整後使用）
  async restoreMeeting(retroId, peerId) {
    // 從儲存中載入會議資料
    const retrospectives = await storage.getRetrospectives();
    const savedRetro = retrospectives.find(r => r.id === retroId);
    
    if (!savedRetro) {
      throw new Error('找不到會議記錄');
    }
    
    // 驗證 peer ID 和 meeting ID 是否匹配
    // 如果提供的 peerId 與保存的 meetingId 不匹配，可能是 host 想要用相同的 peer ID 建立新會議
    // 這種情況下，我們應該拒絕恢復，因為這會導致參與者連到錯誤的會議
    if (savedRetro.meetingId && peerId !== savedRetro.meetingId) {
      console.warn('Peer ID mismatch! Saved meetingId:', savedRetro.meetingId, 'Provided peerId:', peerId);
      // 如果 peer ID 不匹配，但這是恢復操作，我們應該使用保存的 meetingId
      // 因為恢復時，我們應該使用相同的 peer ID（即 meetingId）
      console.log('Using saved meetingId as peerId for restoration');
      peerId = savedRetro.meetingId;
    }
    
    // 恢復會議資料
    this.retro = savedRetro;
    this.meetingId = savedRetro.meetingId;
    
    // 使用相同的 peer ID（meetingId）重新初始化 Peer
    try {
      const restoredPeerId = await this.peerManager.init(true, peerId);
      this.retro.host.peerId = restoredPeerId;
      
      // 重新初始化資料通道
      this.dataChannel = new DataChannel(this.peerManager);
      this.setupDataChannel();
      
      // 恢復參與者列表（從 retro.participants）
      // 注意：恢復時，參與者可能還沒重新連線，所以先清空
      // 當參與者重新連線時，會通過 handleParticipantJoin 重新加入
      this.participants.clear();
      // 清空 retro.participants，因為參與者需要重新加入
      this.retro.participants = [];
      
      console.log('Host meeting restored:', {
        retroId: this.retro.id,
        meetingId: this.meetingId,
        peerId: restoredPeerId,
        participants: this.participants.size
      });
      
      return {
        meetingId: this.meetingId,
        peerId: restoredPeerId,
        retro: this.retro
      };
    } catch (error) {
      console.error('Failed to restore meeting:', error);
      throw error;
    }
  }

  // 保存會議記錄（公開方法，供外部調用）
  async saveRetro() {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
      this.saveTimeout = null;
    }
    
    try {
      const retrospectives = await storage.getRetrospectives();
      const index = retrospectives.findIndex(r => r.id === this.retro.id || r.meetingId === this.retro.meetingId);
      
      if (index !== -1) {
        retrospectives[index] = this.retro;
      } else {
        retrospectives.push(this.retro);
      }
      
      await storage.saveRetrospectives(retrospectives);
      console.log('Saved retro to storage');
    } catch (error) {
      console.error('Error saving retro:', error);
      throw error;
    }
  }

  // 結束會議
  async endMeeting() {
    // 清除 debounce timeout
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
      this.saveTimeout = null;
    }
    
    // 立即儲存回顧記錄
    await this.saveRetro();

    // 斷開所有連線
    this.peerManager.disconnectAll();
    this.peerManager.destroy();
  }
}

