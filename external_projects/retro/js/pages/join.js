// 參與者加入頁面
import { t } from '../utils/i18n.js';
import { Router } from '../router.js';
import { ParticipantMode } from '../modes/ParticipantMode.js';
import { Toast } from '../components/Toast.js';
import { storage } from '../utils/storage/index.js';

export class JoinPage {
  constructor(params = {}) {
    this.router = new Router();
    this.meetingId = params.meetingId || '';
    this.participantMode = null;
    this.videoStream = null;
    this.scanning = false;
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
            
            <div class="card">
              <div class="card-header">
                <h2 class="card-title">${t('join.title')}</h2>
              </div>
              <div class="card-body">
                <div style="margin-bottom: var(--spacing-lg); text-align: center;">
                  <button class="btn btn-primary" id="scan-qr-btn" style="margin-bottom: var(--spacing-md);">
                    ${t('join.scanQR')}
                  </button>
                  <p class="text-muted">${t('join.or')}</p>
                </div>
                
                <div style="margin-bottom: var(--spacing-md);">
                  <label style="display: block; margin-bottom: var(--spacing-sm); font-weight: 500;">
                    ${t('join.enterMeetingId')}
                  </label>
                  <input type="text" id="meeting-id-input" 
                    placeholder="${t('join.meetingIdPlaceholder')}" 
                    value="${this.meetingId}"
                    style="width: 100%; padding: var(--spacing-md); border: 1px solid var(--border-color); border-radius: var(--radius-md);"
                    maxlength="8">
                </div>
                
                <div style="margin-bottom: var(--spacing-lg);">
                  <label style="display: block; margin-bottom: var(--spacing-sm); font-weight: 500;">
                    ${t('join.participantName')} *
                  </label>
                  <input type="text" id="participant-name-input" 
                    placeholder="${t('join.participantNamePlaceholder')}" 
                    style="width: 100%; padding: var(--spacing-md); border: 1px solid var(--border-color); border-radius: var(--radius-md);"
                    required>
                </div>
                
                <button class="btn btn-primary" id="join-btn" style="width: 100%;">
                  ${t('join.join')}
                </button>
                
                <div id="qr-scanner" style="display: none; margin-top: var(--spacing-lg);">
                  <video id="qr-video" style="width: 100%; max-width: 400px; border-radius: var(--radius-md);"></video>
                  <canvas id="qr-canvas" style="display: none;"></canvas>
                  <button class="btn btn-secondary" id="stop-scan-btn" style="margin-top: var(--spacing-md);">
                    停止掃描
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    this.bindEvents();
  }

  bindEvents() {
    // 掃描 QR Code
    document.getElementById('scan-qr-btn').addEventListener('click', () => {
      this.startQRScan();
    });
    
    // 停止掃描
    document.getElementById('stop-scan-btn')?.addEventListener('click', () => {
      this.stopQRScan();
    });
    
    // 加入會議
    document.getElementById('join-btn').addEventListener('click', () => {
      this.joinMeeting();
    });
    
    // Enter 鍵加入
    document.getElementById('participant-name-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.joinMeeting();
      }
    });
  }

  async startQRScan() {
    try {
      // 載入 jsQR
      await this.loadJSQR();
      
      const scanner = document.getElementById('qr-scanner');
      const video = document.getElementById('qr-video');
      const canvas = document.getElementById('qr-canvas');
      const ctx = canvas.getContext('2d');
      
      scanner.style.display = 'block';
      this.scanning = true;
      
      // 請求相機權限
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      this.videoStream = stream;
      video.srcObject = stream;
      video.play();
      
      // 掃描 QR Code
      const scan = () => {
        if (!this.scanning) return;
        
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          
          if (code) {
            this.handleQRCode(code.data);
            return;
          }
        }
        
        requestAnimationFrame(scan);
      };
      
      scan();
    } catch (error) {
      console.error('QR Scan error:', error);
      Toast.error('無法啟動相機，請使用手動輸入');
      this.stopQRScan();
    }
  }

  stopQRScan() {
    this.scanning = false;
    
    if (this.videoStream) {
      this.videoStream.getTracks().forEach(track => track.stop());
      this.videoStream = null;
    }
    
    document.getElementById('qr-scanner').style.display = 'none';
  }

  handleQRCode(data) {
    this.stopQRScan();
    
    // 解析 URL 中的會議 ID
    try {
      const url = new URL(data);
      const hash = url.hash;
      const match = hash.match(/\/join\/([A-Z0-9]+)/);
      if (match) {
        this.meetingId = match[1];
        document.getElementById('meeting-id-input').value = this.meetingId;
        Toast.success('QR Code 掃描成功');
      } else {
        Toast.error('無效的 QR Code');
      }
    } catch (error) {
      // 如果不是 URL，直接當作會議 ID
      this.meetingId = data;
      document.getElementById('meeting-id-input').value = this.meetingId;
      Toast.success('QR Code 掃描成功');
    }
  }

  loadJSQR() {
    return new Promise((resolve, reject) => {
      if (typeof jsQR !== 'undefined') {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async joinMeeting() {
    const meetingId = document.getElementById('meeting-id-input').value.trim().toUpperCase();
    const name = document.getElementById('participant-name-input').value.trim();
    
    if (!meetingId) {
      Toast.error('請輸入會議 ID');
      return;
    }
    
    if (!name) {
      Toast.error(t('join.nameRequired'));
      return;
    }
    
    // 取得 UI 元素
    const joinBtn = document.getElementById('join-btn');
    const meetingIdInput = document.getElementById('meeting-id-input');
    const nameInput = document.getElementById('participant-name-input');
    
    // 顯示載入狀態
    const originalBtnText = joinBtn.textContent;
    joinBtn.disabled = true;
    joinBtn.textContent = '連線中...';
    joinBtn.style.opacity = '0.6';
    meetingIdInput.disabled = true;
    nameInput.disabled = true;
    
    // 顯示連線狀態訊息
    const statusDiv = document.createElement('div');
    statusDiv.id = 'join-status';
    statusDiv.style.cssText = 'margin-top: var(--spacing-md); padding: var(--spacing-md); background: var(--bg-secondary); border-radius: var(--radius-md); text-align: center;';
    statusDiv.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; gap: var(--spacing-sm);"><div class="loading-spinner" style="width: 16px; height: 16px; border: 2px solid var(--border-color); border-top-color: var(--primary-color); border-radius: 50%; animation: spin 1s linear infinite;"></div><span>正在連線到會議室...</span></div>';
    joinBtn.parentElement.appendChild(statusDiv);
    
    // 添加 spinner 動畫（如果還沒有）
    if (!document.querySelector('style[data-spinner]')) {
      const style = document.createElement('style');
      style.setAttribute('data-spinner', 'true');
      style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
      document.head.appendChild(style);
    }
    
    try {
      // 在簡化版本中，會議 ID 就是房主的 Peer ID
      const hostPeerId = meetingId;
      
      this.participantMode = new ParticipantMode();
      
      let isConnected = false;
      let hasReceivedSync = false;
      
      // 註冊回調
      this.participantMode.onConnected(() => {
        isConnected = true;
        const statusDiv = document.getElementById('join-status');
        if (statusDiv) {
          statusDiv.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; gap: var(--spacing-sm);"><span style="color: var(--success-color);">✓</span><span>連線成功，等待同步資料...</span></div>';
        }
      });
      
      // 監聽資料同步
      this.participantMode.onItemUpdate(() => {
        if (!hasReceivedSync && this.participantMode.getRetro()) {
          hasReceivedSync = true;
          const statusDiv = document.getElementById('join-status');
          if (statusDiv) {
            statusDiv.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; gap: var(--spacing-sm);"><span style="color: var(--success-color);">✓</span><span>資料同步完成，正在進入會議室...</span></div>';
          }
          
          // 延遲一下讓用戶看到訊息，然後導航
          setTimeout(() => {
            Toast.success('連線成功');
            this.router.navigate(`/retrospective/${meetingId}`);
          }, 500);
        }
      });
      
      this.participantMode.onDisconnected(() => {
        if (!hasReceivedSync) {
          this.resetJoinUI(joinBtn, meetingIdInput, nameInput, originalBtnText);
          Toast.warning('連線已斷開');
        }
      });
      
      this.participantMode.onKicked((reason) => {
        // 清理連接
        if (this.participantMode) {
          this.participantMode.leave();
          this.participantMode = null;
        }
        
        let message = '您已被踢除';
        let shouldNavigate = true;
        
        if (reason === 'NAME_DUPLICATE') {
          message = t('join.nameDuplicate') || '此名稱已被使用，請選擇其他名稱';
          shouldNavigate = false;
          // 名稱重複時，保留會議 ID，只清空名稱輸入框
          this.resetJoinUI(joinBtn, meetingIdInput, nameInput, originalBtnText, true);
          // 聚焦到名稱輸入框，方便重新輸入
          setTimeout(() => {
            if (nameInput) {
              nameInput.focus();
              nameInput.select();
            }
          }, 100);
        } else if (reason === 'MAX_PARTICIPANTS') {
          message = '會議室已滿';
          this.resetJoinUI(joinBtn, meetingIdInput, nameInput, originalBtnText);
        } else if (reason === 'BLACKLISTED') {
          message = '您已被加入黑名單';
          this.resetJoinUI(joinBtn, meetingIdInput, nameInput, originalBtnText);
        } else {
          this.resetJoinUI(joinBtn, meetingIdInput, nameInput, originalBtnText);
        }
        
        Toast.error(message);
        
        // 只有非名稱重複的情況才導航到首頁
        if (shouldNavigate) {
          this.router.navigate('/');
        }
      });
      
      await this.participantMode.joinMeeting(meetingId, hostPeerId, name);
      
      // 儲存到全域狀態（供 retrospective 頁面使用）
      if (!window.retroState) {
        window.retroState = {};
      }
      window.retroState.participantMode = this.participantMode;
      window.retroState.meetingId = meetingId;
      
      // 儲存使用者名稱
      const settings = await storage.getSettings() || {};
      settings.lastUserName = name;
      await storage.saveSettings(settings);
      
      // 如果 10 秒內還沒收到同步，顯示提示
      setTimeout(() => {
        if (!hasReceivedSync && isConnected) {
          const statusDiv = document.getElementById('join-status');
          if (statusDiv) {
            statusDiv.innerHTML = '<div style="color: var(--warning-color);">等待房主回應中...</div>';
          }
        } else if (!isConnected) {
          this.resetJoinUI(joinBtn, meetingIdInput, nameInput, originalBtnText);
          Toast.error('連線超時，請檢查會議 ID 是否正確');
        }
      }, 10000);
      
    } catch (error) {
      console.error('Failed to join meeting:', error);
      this.resetJoinUI(joinBtn, meetingIdInput, nameInput, originalBtnText);
      Toast.error(t('join.connectionFailed') || '連線失敗，請重試');
    }
  }
  
  resetJoinUI(joinBtn, meetingIdInput, nameInput, originalBtnText, keepMeetingId = false) {
    joinBtn.disabled = false;
    joinBtn.textContent = originalBtnText;
    joinBtn.style.opacity = '1';
    meetingIdInput.disabled = false;
    nameInput.disabled = false;
    
    // 如果 keepMeetingId 為 true，不清空會議 ID
    if (!keepMeetingId && meetingIdInput) {
      meetingIdInput.value = '';
    }
    
    // 清空名稱輸入框
    if (nameInput) {
      nameInput.value = '';
    }
    
    const statusDiv = document.getElementById('join-status');
    if (statusDiv) {
      statusDiv.remove();
    }
  }

  destroy() {
    this.stopQRScan();
    // 注意：不要在這裡調用 participantMode.leave()
    // 因為導航到回顧頁面時也會調用 destroy()，但連接還在進行中
    // participantMode 會被傳遞到 retrospective 頁面使用
    // 只有在用戶真正離開會議時才應該調用 leave()
  }
}
