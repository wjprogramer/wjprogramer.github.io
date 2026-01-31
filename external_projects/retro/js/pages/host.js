// 房主頁面
import { t } from '../utils/i18n.js';
import { Router } from '../router.js';
import { HostMode } from '../modes/HostMode.js';
import { copyToClipboard } from '../utils/clipboard.js';
import { Toast } from '../components/Toast.js';
import { ParticipantList } from '../components/ParticipantList.js';

export class HostPage {
  constructor(params = {}, query = '') {
    this.router = new Router();
    this.hostMode = null;
    this.meetingId = null;
    this.peerId = null;
    this.qrCodeCanvas = null;
  }

  async render(container) {
    container.innerHTML = `
      <div class="page-container">
        <div class="main-content">
          <div class="container">
            <div style="margin-bottom: var(--spacing-lg);">
              <button class="btn btn-text" onclick="window.location.hash='/'">
                ← ${t('common.cancel')}
              </button>
            </div>
            
            <div id="create-meeting-form" class="card" style="margin-bottom: var(--spacing-lg);">
              <div class="card-header">
                <h2 class="card-title">${t('host.title')}</h2>
              </div>
              <div class="card-body">
                <div style="margin-bottom: var(--spacing-md);">
                  <label style="display: block; margin-bottom: var(--spacing-sm); font-weight: 500;">
                    ${t('host.hostName')} *
                  </label>
                  <input type="text" id="host-name-input" 
                    placeholder="${t('host.hostNamePlaceholder')}" 
                    style="width: 100%; padding: var(--spacing-md); border: 1px solid var(--border-color); border-radius: var(--radius-md);"
                    required>
                </div>
                
                <div style="margin-bottom: var(--spacing-md);">
                  <label style="display: block; margin-bottom: var(--spacing-sm); font-weight: 500;">
                    ${t('host.meetingTitle')} *
                  </label>
                  <input type="text" id="meeting-title" 
                    placeholder="${t('host.meetingTitlePlaceholder')}" 
                    style="width: 100%; padding: var(--spacing-md); border: 1px solid var(--border-color); border-radius: var(--radius-md);"
                    required>
                </div>
                
                <div style="margin-bottom: var(--spacing-md);">
                  <label style="display: block; margin-bottom: var(--spacing-sm); font-weight: 500;">
                    ${t('host.meetingDesc')}
                  </label>
                  <textarea id="meeting-desc" 
                    placeholder="${t('host.meetingDescPlaceholder')}" 
                    style="width: 100%; min-height: 80px; padding: var(--spacing-md); border: 1px solid var(--border-color); border-radius: var(--radius-md); font-family: inherit; resize: vertical;"
                  ></textarea>
                </div>
                
                <div style="margin-bottom: var(--spacing-md);">
                  <label style="display: block; margin-bottom: var(--spacing-sm); font-weight: 500;">
                    ${t('host.meetingDate')}
                  </label>
                  <input type="date" id="meeting-date" 
                    value="${new Date().toISOString().split('T')[0]}"
                    style="width: 100%; padding: var(--spacing-md); border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                </div>
                
                <div style="margin-bottom: var(--spacing-lg);">
                  <label style="display: flex; align-items: center; gap: var(--spacing-sm); cursor: pointer;">
                    <input type="checkbox" id="allow-anonymous" checked>
                    <span>${t('host.allowAnonymous')}</span>
                  </label>
                </div>
                
                <button class="btn btn-primary" id="create-meeting-btn">
                  ${t('host.createMeeting')}
                </button>
              </div>
            </div>
            
            <div id="meeting-room" class="card" style="display: none;">
              <div class="card-header">
                <h2 class="card-title" id="meeting-room-title"></h2>
              </div>
              <div class="card-body">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-lg); margin-bottom: var(--spacing-lg);">
                  <div>
                    <label style="display: block; margin-bottom: var(--spacing-sm); font-weight: 500;">
                      ${t('host.meetingId')}
                    </label>
                    <div style="display: flex; gap: var(--spacing-sm);">
                      <input type="text" id="meeting-id-display" readonly
                        style="flex: 1; padding: var(--spacing-md); border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-secondary); color: var(--text-primary);">
                      <button class="btn btn-secondary" id="copy-id-btn">${t('host.copyId')}</button>
                    </div>
                  </div>
                  
                  <div>
                    <label style="display: block; margin-bottom: var(--spacing-sm); font-weight: 500;">
                      加入連結
                    </label>
                    <div style="display: flex; gap: var(--spacing-sm);">
                      <input type="text" id="join-link-display" readonly
                        style="flex: 1; padding: var(--spacing-md); border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-secondary); color: var(--text-primary); font-size: 0.875rem;">
                      <button class="btn btn-secondary" id="copy-link-btn">${t('host.copyLink')}</button>
                    </div>
                  </div>
                </div>
                
                <div style="text-align: center; margin-bottom: var(--spacing-lg);">
                  <label style="display: block; margin-bottom: var(--spacing-sm); font-weight: 500;">
                    ${t('host.qrCode')}
                  </label>
                  <div id="qr-code-container" style="display: inline-block; background: white; padding: var(--spacing-md); border-radius: var(--radius-md);"></div>
                </div>
                
                <div id="participants-section" style="margin-bottom: var(--spacing-lg);">
                  <h3 style="margin-bottom: var(--spacing-md);">${t('host.participants')}</h3>
                  <div id="participants-list"></div>
                </div>
                
                <div style="display: flex; gap: var(--spacing-md); justify-content: flex-end;">
                  <button class="btn btn-danger" id="end-meeting-btn">${t('host.endMeeting')}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    this.bindEvents();
    this.prefillHostName();
  }

  async prefillHostName() {
    const input = document.getElementById('host-name-input');
    if (!input) return;
    try {
      const { storage } = await import('../utils/storage/index.js');
      const settings = await storage.getSettings() || {};
      if (settings.lastUserName) {
        input.value = settings.lastUserName;
      }
    } catch (_) {}
  }

  bindEvents() {
    // 建立會議室
    document.getElementById('create-meeting-btn').addEventListener('click', () => {
      this.createMeeting();
    });
    
    // 複製會議 ID
    document.getElementById('copy-id-btn')?.addEventListener('click', () => {
      const meetingId = document.getElementById('meeting-id-display').value;
      copyToClipboard(meetingId);
    });
    
    // 複製連結
    document.getElementById('copy-link-btn')?.addEventListener('click', () => {
      const link = document.getElementById('join-link-display').value;
      copyToClipboard(link);
    });
    
    // 結束會議
    document.getElementById('end-meeting-btn')?.addEventListener('click', () => {
      if (confirm('確定要結束會議嗎？')) {
        this.endMeeting();
      }
    });
  }

  async createMeeting() {
    const hostName = document.getElementById('host-name-input').value.trim();
    const title = document.getElementById('meeting-title').value.trim();
    const description = document.getElementById('meeting-desc').value.trim();
    const date = document.getElementById('meeting-date').value;
    const allowAnonymous = document.getElementById('allow-anonymous').checked;
    
    if (!hostName) {
      Toast.error(t('host.hostNameRequired'));
      return;
    }
    
    if (!title) {
      Toast.error('請輸入會議主題');
      return;
    }
    
    // 先檢查 PeerJS 是否可用
    if (typeof window === 'undefined' || !window.Peer) {
      Toast.error('PeerJS 未載入，請重新整理頁面');
      console.error('PeerJS not available. window.Peer:', typeof window !== 'undefined' ? window.Peer : 'window undefined');
      return;
    }
    
    // 檢查是否已連接 Google Drive，如果是則顯示 loading
    const { storage } = await import('../utils/storage/index.js');
    const isUsingGoogleDrive = storage.isUsingGoogleDrive();
    let loadingOverlay = null;
    
    if (isUsingGoogleDrive) {
      // 顯示全屏 loading overlay
      loadingOverlay = document.createElement('div');
      loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        flex-direction: column;
        gap: var(--spacing-md);
      `;
      loadingOverlay.innerHTML = `
        <div class="loading" style="width: 40px; height: 40px;"></div>
        <p style="color: white; font-size: 1rem;">正在建立會議室...</p>
      `;
      document.body.appendChild(loadingOverlay);
      
      // 禁用建立按鈕防止重複點擊
      const createBtn = document.getElementById('create-meeting-btn');
      if (createBtn) {
        createBtn.disabled = true;
        createBtn.style.opacity = '0.6';
        createBtn.style.cursor = 'not-allowed';
      }
    }
    
    const removeLoading = () => {
      if (loadingOverlay) {
        loadingOverlay.remove();
      }
      const createBtn = document.getElementById('create-meeting-btn');
      if (createBtn) {
        createBtn.disabled = false;
        createBtn.style.opacity = '1';
        createBtn.style.cursor = 'pointer';
      }
    };
    
    try {
      this.hostMode = new HostMode();
      
      // 註冊回調（只在 host 頁面時更新 UI）
      this.hostMode.onParticipantJoin((participant) => {
        // 檢查是否還在 host 頁面（DOM 元素是否存在）
        if (document.getElementById('participants-list')) {
          this.updateParticipantsList();
        }
        Toast.info(`${participant.name} 已加入`);
      });
      
      this.hostMode.onParticipantLeave((participant) => {
        // 檢查是否還在 host 頁面（DOM 元素是否存在）
        if (document.getElementById('participants-list')) {
          this.updateParticipantsList();
        }
        Toast.info(`${participant.name} 已離開`);
      });
      
      const result = await this.hostMode.createMeeting(title, description, date, allowAnonymous, hostName);
      this.meetingId = result.meetingId;
      this.peerId = result.peerId;
      const retroId = result.retro.id; // 會議的 id（用於恢復資料）
      
      // 儲存房主名稱供下次預填
      const settings = await storage.getSettings() || {};
      settings.lastUserName = hostName;
      await storage.saveSettings(settings);
      
      // 儲存到全域狀態（供 retrospective 頁面使用）
      if (!window.retroState) {
        window.retroState = {};
      }
      window.retroState.hostMode = this.hostMode;
      window.retroState.meetingId = this.meetingId;
      
      // 立即保存會議記錄（以便重整後恢復）
      try {
        await this.hostMode.saveRetro();
      } catch (error) {
        console.error('Error saving retro on create:', error);
        // 即使保存失敗也繼續，至少全域狀態中有資料
      }
      
      // 移除 loading（如果有的話）
      removeLoading();
      
      // 開房後直接導航到回顧頁面
      // URL 格式：/retrospective/{retroId}?meetingId={peerId}&mode=host
      // retroId: 會議的 id（用於恢復資料）
      // meetingId: peer id（用於 WebRTC 連線）
      // mode: 標記為 host 模式，避免重整時被誤判為 participant
      Toast.success('會議室建立成功');
      this.router.navigate(`/retrospective/${retroId}?meetingId=${this.meetingId}&mode=host`);
    } catch (error) {
      // 移除 loading（如果有的話）
      removeLoading();
      
      console.error('Failed to create meeting:', error);
      console.error('Error details:', {
        message: error.message,
        type: error.type,
        target: error.target,
        stack: error.stack,
        error: error
      });
      
      // 檢查 PeerJS 是否可用
      if (typeof window === 'undefined' || !window.Peer) {
        Toast.error('PeerJS 未載入，請重新整理頁面');
        return;
      }
      
      // 提供更詳細的錯誤訊息
      let errorMessage = '建立會議室失敗，請重試';
      
      // 處理 Event 物件（可能是 script 載入錯誤）
      if (error && error.type === 'error' && error.target) {
        if (error.target.tagName === 'SCRIPT') {
          errorMessage = '無法載入必要的資源，請檢查網路連線或重新整理頁面';
        } else {
          errorMessage = '連線錯誤，請檢查網路設定';
        }
      } else if (error && error.message) {
        errorMessage = error.message;
      } else if (error && typeof error.toString === 'function') {
        errorMessage = error.toString();
      }
      
      Toast.error(errorMessage);
    }
  }

  async generateQRCode(text) {
    // 檢查 QRCode 是否可用
    if (typeof QRCode === 'undefined') {
      try {
        // 嘗試載入 QRCode 庫
        await this.loadQRCodeLibrary();
        
        // 再次檢查
        if (typeof QRCode === 'undefined') {
          console.error('QRCode library failed to load');
          Toast.error('無法載入 QRCode 庫，請重新整理頁面');
          return;
        }
      } catch (error) {
        console.error('Failed to load QRCode:', error);
        Toast.error(error.message || '無法載入 QRCode 庫，請重新整理頁面');
        return;
      }
    }
    
    // 使用 qrcodejs 的方式（和敏捷估點一樣）
    const container = document.getElementById('qr-code-container');
    if (!container) {
      console.error('QR Code container not found');
      return;
    }
    
    // 清空容器
    container.innerHTML = '';
    
    const size = Math.min(300, window.innerWidth - 64);
    
    try {
      // 使用 qrcodejs 的 API（和敏捷估點一樣）
      const qrcode = new QRCode(container, {
        text: text,
        width: size,
        height: size,
        colorDark: '#000000',
        colorLight: '#FFFFFF',
        correctLevel: QRCode.CorrectLevel.M
      });
      
      // 設定樣式
      const canvas = container.querySelector('canvas');
      const img = container.querySelector('img');
      
      if (canvas) {
        canvas.style.borderRadius = '8px';
        canvas.style.display = 'block';
        canvas.style.margin = '0 auto';
      }
      
      if (img) {
        img.style.borderRadius = '8px';
        img.style.display = 'block';
        img.style.margin = '0 auto';
      }
    } catch (error) {
      console.error('QR Code generation error:', error);
      Toast.error('QR Code 生成失敗');
    }
  }

  loadQRCodeLibrary() {
    return new Promise((resolve, reject) => {
      // 如果 QRCode 已經可用，直接 resolve
      if (typeof QRCode !== 'undefined') {
        resolve();
        return;
      }
      
      // 檢查是否已經有 script 標籤在載入
      const existingScript = document.querySelector('script[src*="qrcode"]');
      if (existingScript) {
        // 等待載入完成
        let attempts = 0;
        const maxAttempts = 100; // 最多等待 10 秒（因為可能還在載入中）
        const checkQRCode = setInterval(() => {
          attempts++;
          if (typeof QRCode !== 'undefined') {
            clearInterval(checkQRCode);
            resolve();
          } else if (attempts >= maxAttempts) {
            clearInterval(checkQRCode);
            reject(new Error('QRCode 載入超時，請重新整理頁面'));
          }
        }, 100);
        return;
      }
      
      // 如果都沒有，動態載入（使用 qrcodejs，和敏捷估點一樣）
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js';
      
      // 設定超時
      const timeout = setTimeout(() => {
        script.remove();
        reject(new Error('QRCode 載入超時，請檢查網路連線'));
      }, 30000); // 30 秒超時
      
      script.onload = () => {
        clearTimeout(timeout);
        // 等待 QRCode 可用
        let attempts = 0;
        const maxAttempts = 50; // 最多等待 5 秒
        const checkQRCode = setInterval(() => {
          attempts++;
          if (typeof QRCode !== 'undefined') {
            clearInterval(checkQRCode);
            resolve();
          } else if (attempts >= maxAttempts) {
            clearInterval(checkQRCode);
            reject(new Error('QRCode 載入後不可用'));
          }
        }, 100);
      };
      
      script.onerror = (error) => {
        clearTimeout(timeout);
        console.error('Failed to load QRCode script:', error);
        reject(new Error('無法載入 QRCode 庫，請檢查網路連線'));
      };
      
      document.head.appendChild(script);
    });
  }

  updateParticipantsList() {
    if (!this.hostMode) return;
    
    const participants = this.hostMode.getParticipants();
    const container = document.getElementById('participants-list');
    
    // 如果元素不存在，說明已經導航到其他頁面，不需要更新
    if (!container) {
      return;
    }
    
    const list = new ParticipantList(participants, true, async (peerId) => {
      await this.hostMode.kickParticipant(peerId);
      this.updateParticipantsList();
    });
    
    container.innerHTML = list.render();
    list.bindEvents(container);
  }


  endMeeting() {
    if (this.hostMode) {
      this.hostMode.endMeeting();
      Toast.success('會議已結束');
      this.router.navigate('/');
    }
  }

  destroy() {
    // 注意：不要在這裡調用 endMeeting()
    // 因為導航到回顧頁面時也會調用 destroy()，但會議還在進行中
    // 只有在用戶明確點擊「結束會議」時才應該調用 endMeeting()
    // 這裡只清理頁面相關的資源，不清理 hostMode（它會被 retrospective 頁面使用）
  }
}
