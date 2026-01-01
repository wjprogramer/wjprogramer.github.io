/**
 * Host Mode Page
 * 主持人模式 - 建立會議室、管理參與者、控制估點流程
 */

import { i18n } from '../utils/i18n.js';
import { theme } from '../utils/theme.js';
import { storage } from '../utils/storage.js';
import { HostManager, ConnectionState, EstimationState } from '../webrtc/peer-manager.js';
import { copyJoinUrl, copyMeetingId, generateJoinUrl } from '../utils/clipboard.js';
import { generateMeetingQRCode } from '../utils/qrcode.js';
import { showToast, toastSuccess, toastError, toastWarning } from '../components/toast.js';
import { addHistory } from '../data/history.js';
import { 
  CARD_SET, 
  createSelectableCardHTML, 
  initCardTiltEffect,
  setupCardSelection 
} from '../components/card.js';

// 模組狀態
let hostManager = null;
let currentResults = null;
let hostName = 'Host';
let hostParticipates = true; // Host 是否參與估點
let hostSelectedCard = null; // Host 選擇的卡片

/**
 * 渲染 Host 模式頁面
 */
export function renderHost() {
  hostManager = new HostManager();
  currentResults = null;
  
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <header class="header">
      <div class="container header-content">
        <a href="#/" class="btn btn-ghost" id="back-btn">
          ← <span data-i18n="common.back">返回</span>
        </a>
        <div class="logo" data-i18n="host.title">建立房間</div>
        <div class="header-actions">
          <button class="btn btn-ghost btn-icon" id="lang-toggle" title="切換語言">
            🌐
          </button>
          <button class="btn btn-ghost btn-icon" id="theme-toggle" title="切換主題">
            ${theme.isDark() ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
    
    <main class="page host-page">
      <div class="container">
        <!-- 設定表單階段 -->
        <div id="setup-phase" class="phase-container">
          <div class="setup-card">
            <h2 data-i18n="host.title">建立房間</h2>
            
            <div class="form-group">
              <label for="host-name-input" data-i18n="host.hostName">主持人名稱</label>
              <input 
                type="text" 
                id="host-name-input" 
                class="form-input" 
                placeholder="輸入主持人名稱"
                data-i18n-placeholder="host.hostNamePlaceholder"
                maxlength="20"
                autocomplete="off"
              >
            </div>
            
            <div class="form-group">
              <label class="checkbox-label">
                <input 
                  type="checkbox" 
                  id="participate-checkbox"
                  checked
                >
                <span data-i18n="host.participateInEstimation">參與估點</span>
              </label>
              <p class="form-hint" data-i18n="host.participateInEstimationDesc">主持人是否參與估點（選擇牌）</p>
            </div>
            
            <button class="btn btn-primary btn-lg btn-block" id="create-meeting-btn">
              <span data-i18n="host.createMeeting">建立會議室</span>
            </button>
          </div>
        </div>
        
        <!-- 建立中狀態 -->
        <div id="creating-phase" class="phase-container hidden">
          <div class="loading-container">
            <div class="loading-spinner large"></div>
            <p class="text-secondary" data-i18n="host.creating">建立會議室中...</p>
          </div>
        </div>
        
        <!-- 會議室已建立狀態 -->
        <div id="meeting-phase" class="phase-container hidden">
          <!-- 會議資訊區 -->
          <div class="meeting-info-section">
            <div class="meeting-info-card">
              <div class="meeting-id-display">
                <span class="meeting-id-label" data-i18n="host.meetingId">會議 ID</span>
                <span class="meeting-id-value" id="meeting-id">------</span>
              </div>
              
              <div class="meeting-actions">
                <button class="btn btn-secondary" id="copy-link-btn">
                  📋 <span data-i18n="host.copyLink">複製連結</span>
                </button>
                <button class="btn btn-ghost" id="copy-id-btn">
                  <span data-i18n="host.copyId">複製 ID</span>
                </button>
              </div>
              
              <div class="qr-section">
                <p class="qr-label" data-i18n="host.qrCode">掃描 QR Code 加入</p>
                <div class="qr-container" id="qr-container">
                  <!-- QR Code 會在這裡生成 -->
                </div>
              </div>
            </div>
          </div>
          
          <!-- 參與者區 -->
          <div class="participants-section">
            <div class="section-header">
              <h3>
                <span data-i18n="host.participants">參與者</span>
                (<span id="participant-count">0</span><span data-i18n="host.participantCount">人</span>)
              </h3>
            </div>
            
            <div class="participants-list" id="participants-list">
              <div class="empty-state" id="no-participants">
                <p data-i18n="host.waitingForParticipants">等待參與者加入...</p>
              </div>
            </div>
          </div>
          
          <!-- 控制面板 -->
          <div class="control-section">
            <!-- Host 選擇卡片區域（如果 Host 參與估點） -->
            <div id="host-card-selection" class="host-card-selection hidden">
              <div class="host-selection-header">
                <h4>${hostName} <span data-i18n="join.selectCard">請選擇一張牌</span></h4>
              </div>
              <div class="host-cards-container" id="host-cards-container">
                <!-- Host 選擇卡片會在這裡動態生成 -->
              </div>
            </div>
            
            <div class="control-buttons" id="control-buttons">
              <button class="btn btn-primary btn-lg" id="start-btn" disabled>
                <span data-i18n="host.startEstimation">開始估點</span>
              </button>
              <button class="btn btn-primary btn-lg hidden" id="flip-btn">
                <span data-i18n="host.flipCards">翻牌</span>
              </button>
              <button class="btn btn-secondary btn-lg hidden" id="new-round-btn">
                <span data-i18n="host.newRound">新的一輪</span>
              </button>
            </div>
          </div>
          
          <!-- 結果區 -->
          <div class="results-section hidden" id="results-section">
            <div class="section-header">
              <h3 data-i18n="host.stats.title">估點結果</h3>
            </div>
            
            <div class="results-stats" id="results-stats">
              <!-- 統計資訊會在這裡顯示 -->
            </div>
            
            <div class="results-cards" id="results-cards">
              <!-- 結果卡片會在這裡顯示 -->
            </div>
          </div>
          
          <!-- 結束會議按鈕 -->
          <div class="close-meeting-section">
            <button class="btn btn-ghost btn-danger" id="close-meeting-btn">
              <span data-i18n="host.closeMeeting">結束會議</span>
            </button>
          </div>
        </div>
      </div>
    </main>
    
    <style>
      .host-page {
        min-height: calc(100vh - 80px);
        padding: var(--spacing-lg) 0;
      }
      
      .phase-container {
        max-width: 800px;
        margin: 0 auto;
      }
      
      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 300px;
        gap: var(--spacing-lg);
      }
      
      .loading-spinner.large {
        width: 60px;
        height: 60px;
      }
      
      /* 設定表單 */
      .setup-card {
        background: var(--color-bg-secondary);
        border-radius: var(--radius-lg);
        padding: var(--spacing-xl);
        max-width: 500px;
        margin: 0 auto;
      }
      
      .setup-card h2 {
        margin-bottom: var(--spacing-lg);
        text-align: center;
      }
      
      .form-group {
        margin-bottom: var(--spacing-lg);
      }
      
      .form-group label {
        display: block;
        margin-bottom: var(--spacing-xs);
        font-weight: 500;
        color: var(--color-text-primary);
      }
      
      .form-input {
        width: 100%;
        padding: var(--spacing-sm) var(--spacing-md);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: var(--color-bg-primary);
        color: var(--color-text-primary);
        font-size: var(--font-size-base);
      }
      
      .form-input:focus {
        outline: none;
        border-color: var(--color-primary);
      }
      
      .checkbox-label {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        cursor: pointer;
      }
      
      .checkbox-label input[type="checkbox"] {
        width: 18px;
        height: 18px;
        cursor: pointer;
      }
      
      .form-hint {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        margin-top: var(--spacing-xs);
      }
      
      /* Host 選擇卡片區域 */
      .host-card-selection {
        margin-bottom: var(--spacing-lg);
        padding: var(--spacing-lg);
        background: var(--color-bg-secondary);
        border-radius: var(--radius-lg);
      }
      
      .host-selection-header {
        margin-bottom: var(--spacing-md);
      }
      
      .host-selection-header h4 {
        font-size: var(--font-size-lg);
        font-weight: 600;
        color: var(--color-text-primary);
      }
      
      .host-cards-container {
        margin-top: var(--spacing-md);
      }
      
      /* 會議資訊區 */
      .meeting-info-section {
        margin-bottom: var(--spacing-xl);
      }
      
      .meeting-info-card {
        background: var(--color-bg-secondary);
        border-radius: var(--radius-lg);
        padding: var(--spacing-xl);
        text-align: center;
      }
      
      .meeting-id-display {
        margin-bottom: var(--spacing-lg);
      }
      
      .meeting-id-label {
        display: block;
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-xs);
      }
      
      .meeting-id-value {
        display: block;
        font-family: var(--font-display);
        font-size: 2.5rem;
        font-weight: 700;
        letter-spacing: 0.2em;
        color: var(--color-primary-light);
      }
      
      .meeting-actions {
        display: flex;
        gap: var(--spacing-md);
        justify-content: center;
        margin-bottom: var(--spacing-lg);
      }
      
      .qr-section {
        padding-top: var(--spacing-lg);
        border-top: 1px solid var(--color-border);
      }
      
      .qr-label {
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-md);
      }
      
      .qr-container {
        display: flex;
        justify-content: center;
        min-height: 200px;
        align-items: center;
        padding: var(--spacing-md);
        background: white;
        border-radius: var(--radius-md);
        width: fit-content;
        margin: 0 auto;
      }
      
      /* Dark mode 下確保白色背景可見 */
      [data-theme="dark"] .qr-container {
        background: white;
      }
      
      /* 參與者區 */
      .participants-section {
        margin-bottom: var(--spacing-xl);
      }
      
      .section-header {
        margin-bottom: var(--spacing-md);
      }
      
      .section-header h3 {
        font-size: var(--font-size-lg);
        font-weight: 600;
      }
      
      .participants-list {
        background: var(--color-bg-secondary);
        border-radius: var(--radius-lg);
        padding: var(--spacing-md);
        min-height: 100px;
      }
      
      .empty-state {
        text-align: center;
        padding: var(--spacing-xl);
        color: var(--color-text-muted);
      }
      
      .participant-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--spacing-md);
        background: var(--color-bg-primary);
        border-radius: var(--radius-md);
        margin-bottom: var(--spacing-sm);
      }
      
      .participant-item:last-child {
        margin-bottom: 0;
      }
      
      .participant-info {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
      }
      
      .participant-name {
        font-weight: 500;
      }
      
      .participant-status {
        font-size: var(--font-size-sm);
        padding: var(--spacing-xs) var(--spacing-sm);
        border-radius: var(--radius-sm);
        background: var(--color-bg-tertiary);
      }
      
      .participant-status.selected {
        background: var(--color-success);
        color: white;
      }
      
      .participant-status.selecting {
        background: var(--color-warning);
        color: white;
      }
      
      .participant-card {
        font-family: var(--font-display);
        font-size: var(--font-size-xl);
        font-weight: 700;
        color: var(--color-primary-light);
        min-width: 50px;
        text-align: center;
      }
      
      .participant-card.hidden-card {
        color: var(--color-text-muted);
      }
      
      .participant-actions {
        display: flex;
        gap: var(--spacing-xs);
      }
      
      .participant-actions .btn {
        padding: var(--spacing-xs) var(--spacing-sm);
        font-size: var(--font-size-sm);
      }
      
      /* 控制面板 */
      .control-section {
        margin-bottom: var(--spacing-xl);
      }
      
      .control-buttons {
        display: flex;
        gap: var(--spacing-md);
        justify-content: center;
        flex-wrap: wrap;
      }
      
      /* 結果區 */
      .results-section {
        margin-bottom: var(--spacing-xl);
      }
      
      .results-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-lg);
      }
      
      .stat-card {
        background: var(--color-bg-secondary);
        border-radius: var(--radius-md);
        padding: var(--spacing-md);
        text-align: center;
      }
      
      .stat-label {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-xs);
      }
      
      .stat-value {
        font-family: var(--font-display);
        font-size: var(--font-size-2xl);
        font-weight: 700;
        color: var(--color-primary-light);
      }
      
      .results-cards {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-md);
        justify-content: center;
      }
      
      .result-card-item {
        background: var(--color-bg-secondary);
        border-radius: var(--radius-md);
        padding: var(--spacing-md);
        text-align: center;
        min-width: 100px;
      }
      
      .result-card-name {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-xs);
      }
      
      .result-card-value {
        font-family: var(--font-display);
        font-size: var(--font-size-xl);
        font-weight: 700;
        color: var(--color-primary-light);
      }
      
      .result-card-value.no-select {
        color: var(--color-text-muted);
      }
      
      /* 結束會議 */
      .close-meeting-section {
        text-align: center;
        padding-top: var(--spacing-xl);
        border-top: 1px solid var(--color-border);
      }
      
      .btn-danger {
        color: var(--color-error);
      }
      
      .btn-danger:hover {
        background: var(--color-error);
        color: white;
      }
      
      @media (max-width: 767px) {
        .meeting-id-value {
          font-size: 2rem;
        }
        
        .meeting-actions {
          flex-direction: column;
        }
        
        .control-buttons {
          flex-direction: column;
        }
        
        .control-buttons .btn {
          width: 100%;
        }
        
        .results-stats {
          grid-template-columns: 1fr;
        }
      }
    </style>
  `;

  // 套用翻譯
  i18n.applyTranslations();
  
  // 載入上次使用的 Host 名稱
  loadHostName();
  
  // 設定事件監聽
  setupEventListeners();
  
  // 返回清理函數
  return () => {
    if (hostManager) {
      hostManager.closeMeeting();
      hostManager = null;
    }
    currentResults = null;
  };
}

/**
 * 載入上次使用的 Host 名稱
 */
function loadHostName() {
  const settings = storage.get('settings', {});
  const lastHostName = settings.lastHostName || '';
  const hostNameInput = document.getElementById('host-name-input');
  if (hostNameInput && lastHostName) {
    hostNameInput.value = lastHostName;
  }
}

/**
 * 設定事件監聽
 */
function setupEventListeners() {
  // 建立會議室按鈕
  document.getElementById('create-meeting-btn')?.addEventListener('click', () => {
    const hostNameInput = document.getElementById('host-name-input');
    const hostName = hostNameInput?.value.trim() || 'Host';
    
    // 儲存 Host 名稱
    const settings = storage.get('settings', {});
    settings.lastHostName = hostName;
    storage.set('settings', settings);
    
    // 隱藏設定表單，顯示建立中狀態
    document.getElementById('setup-phase').classList.add('hidden');
    document.getElementById('creating-phase').classList.remove('hidden');
    
    // 開始建立會議室
    createMeeting(hostName);
  });
  
  // 主題切換
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const newTheme = theme.toggle();
      themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
      
      // 更新 QR Code 主題
      const meetingId = document.getElementById('meeting-id').textContent;
      if (meetingId && meetingId !== '------') {
        const qrContainer = document.getElementById('qr-container');
        generateMeetingQRCode(qrContainer, meetingId);
      }
    });
  }
  
  // 語言切換
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', async () => {
      const currentLang = i18n.getLanguage();
      const newLang = currentLang === 'zh-TW' ? 'en' : 'zh-TW';
      await i18n.setLanguage(newLang);
    });
  }
  
  // 複製連結
  document.getElementById('copy-link-btn')?.addEventListener('click', () => {
    const meetingId = document.getElementById('meeting-id').textContent;
    if (meetingId && meetingId !== '------') {
      copyJoinUrl(meetingId);
    }
  });
  
  // 複製 ID
  document.getElementById('copy-id-btn')?.addEventListener('click', () => {
    const meetingId = document.getElementById('meeting-id').textContent;
    if (meetingId && meetingId !== '------') {
      copyMeetingId(meetingId);
    }
  });
  
  // 開始估點
  document.getElementById('start-btn')?.addEventListener('click', () => {
    startEstimation();
  });
  
  // 翻牌
  document.getElementById('flip-btn')?.addEventListener('click', () => {
    flipCards();
  });
  
  // 新的一輪
  document.getElementById('new-round-btn')?.addEventListener('click', () => {
    newRound();
  });
  
  // 結束會議
  document.getElementById('close-meeting-btn')?.addEventListener('click', () => {
    closeMeeting();
  });
  
  // 返回按鈕 - 確認是否結束會議
  document.getElementById('back-btn')?.addEventListener('click', (e) => {
    if (hostManager && hostManager.state === ConnectionState.CONNECTED) {
      e.preventDefault();
      if (confirm(i18n.t('host.closeMeetingConfirm'))) {
        hostManager.closeMeeting();
        window.location.hash = '#/';
      }
    }
  });
}

/**
 * 建立會議室
 * @param {string} name - Host 名稱
 */
async function createMeeting(name) {
  try {
    hostName = name || 'Host';
    
    // 讀取 Host 是否參與估點
    const participateCheckbox = document.getElementById('participate-checkbox');
    hostParticipates = participateCheckbox ? participateCheckbox.checked : true;
    hostSelectedCard = null;
    
    // 設定回調
    hostManager.onStateChange = (state) => {
      console.log('Host state changed:', state);
    };
    
    hostManager.onParticipantJoin = (participant) => {
      console.log('Participant joined:', participant);
      toastSuccess(`${participant.name} ${i18n.t('join.connected')}`);
      updateParticipantsList();
      updateControlButtons();
    };
    
    hostManager.onParticipantLeave = (participant) => {
      console.log('Participant left:', participant);
      toastWarning(`${participant.name} ${i18n.t('join.disconnected')}`);
      updateParticipantsList();
      updateControlButtons();
    };
    
    hostManager.onParticipantUpdate = (participants) => {
      updateParticipantsList();
      updateControlButtons();
    };
    
    hostManager.onCardSelect = (participant) => {
      updateParticipantsList();
      updateControlButtons();
    };
    
    hostManager.onError = (err) => {
      console.error('Host error:', err);
      toastError(i18n.t('host.errors.connectionError'));
    };
    
    // 建立會議室
    const meetingId = await hostManager.createMeeting();
    
    // 更新 UI
    document.getElementById('creating-phase').classList.add('hidden');
    document.getElementById('meeting-phase').classList.remove('hidden');
    document.getElementById('meeting-id').textContent = meetingId;
    
    // 生成 QR Code
    const qrContainer = document.getElementById('qr-container');
    await generateMeetingQRCode(qrContainer, meetingId);
    
    // 初始化控制按鈕狀態
    updateControlButtons();
    
    toastSuccess(i18n.t('host.created'));
    
  } catch (err) {
    console.error('Failed to create meeting:', err);
    toastError(i18n.t('host.errors.createFailed'));
    
    // 顯示錯誤狀態
    document.getElementById('creating-phase').innerHTML = `
      <div class="error-container">
        <p class="text-error">${i18n.t('host.errors.createFailed')}</p>
        <button class="btn btn-primary" onclick="location.reload()">重試</button>
      </div>
    `;
  }
}

/**
 * 更新參與者列表
 */
function updateParticipantsList() {
  const participantsList = document.getElementById('participants-list');
  const participantCount = document.getElementById('participant-count');
  
  if (!participantsList || !participantCount) return;
  
  const participants = hostManager.getParticipants();
  participantCount.textContent = participants.length;
  
  if (participants.length === 0) {
    participantsList.innerHTML = `
      <div class="empty-state">
        <p data-i18n="host.waitingForParticipants">等待參與者加入...</p>
      </div>
    `;
    i18n.applyTranslations();
    return;
  }
  
  participantsList.innerHTML = participants.map(p => {
    const statusClass = p.estimationState === EstimationState.SELECTED ? 'selected' : 
                       p.estimationState === EstimationState.SELECTING ? 'selecting' : '';
    const statusText = i18n.t(`host.status.${p.estimationState}`);
    
    // 卡片顯示
    let cardDisplay = '';
    if (hostManager.estimationState === EstimationState.REVEALED) {
      cardDisplay = p.selectedCard 
        ? `<span class="participant-card">${p.selectedCard}</span>`
        : `<span class="participant-card no-select">-</span>`;
    } else if (p.estimationState === EstimationState.SELECTED) {
      cardDisplay = `<span class="participant-card hidden-card">?</span>`;
    }
    
    return `
      <div class="participant-item" data-peer-id="${p.peerId}">
        <div class="participant-info">
          <span class="participant-name">${escapeHtml(p.name)}</span>
          <span class="participant-status ${statusClass}">${statusText}</span>
        </div>
        ${cardDisplay}
        <div class="participant-actions">
          <button class="btn btn-ghost btn-sm kick-btn" data-peer-id="${p.peerId}">
            ${i18n.t('host.kick')}
          </button>
        </div>
      </div>
    `;
  }).join('');
  
  // 綁定踢除按鈕事件
  participantsList.querySelectorAll('.kick-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const peerId = e.target.dataset.peerId;
      if (confirm(i18n.t('host.kickConfirm'))) {
        hostManager.kickParticipant(peerId, false);
      }
    });
  });
}

/**
 * 更新控制按鈕狀態
 */
function updateControlButtons() {
  const startBtn = document.getElementById('start-btn');
  const flipBtn = document.getElementById('flip-btn');
  const newRoundBtn = document.getElementById('new-round-btn');
  const resultsSection = document.getElementById('results-section');
  const hostCardSelection = document.getElementById('host-card-selection');
  
  // 防護：確保元素存在
  if (!startBtn || !flipBtn || !newRoundBtn || !resultsSection) return;
  
  const participants = hostManager.getParticipants();
  const hasParticipants = participants.length > 0;
  const allClientsSelected = participants.every(p => p.estimationState === EstimationState.SELECTED);
  
  // 檢查是否所有人都已選擇（包括 Host，如果 Host 參與）
  const allSelected = hostParticipates 
    ? (allClientsSelected && hostSelectedCard !== null)
    : allClientsSelected;
  
  switch (hostManager.estimationState) {
    case EstimationState.WAITING:
      startBtn.classList.remove('hidden');
      startBtn.disabled = !hasParticipants;
      flipBtn.classList.add('hidden');
      newRoundBtn.classList.add('hidden');
      resultsSection.classList.add('hidden');
      if (hostCardSelection) hostCardSelection.classList.add('hidden');
      break;
      
    case EstimationState.SELECTING:
      startBtn.classList.add('hidden');
      flipBtn.classList.remove('hidden');
      flipBtn.disabled = !allSelected; // 只有所有人都選擇了才能翻牌
      newRoundBtn.classList.add('hidden');
      resultsSection.classList.add('hidden');
      // 如果 Host 參與估點，顯示 Host 選擇卡片區域
      if (hostCardSelection) {
        if (hostParticipates) {
          hostCardSelection.classList.remove('hidden');
        } else {
          hostCardSelection.classList.add('hidden');
        }
      }
      break;
      
    case EstimationState.REVEALED:
      startBtn.classList.add('hidden');
      flipBtn.classList.add('hidden');
      newRoundBtn.classList.remove('hidden');
      resultsSection.classList.remove('hidden');
      if (hostCardSelection) hostCardSelection.classList.add('hidden');
      break;
  }
}

/**
 * 開始估點
 */
function startEstimation() {
  hostManager.startEstimation();
  hostSelectedCard = null; // 重置 Host 選擇
  
  // 如果 Host 參與估點，初始化 Host 選擇卡片 UI
  if (hostParticipates) {
    initHostCardSelection();
  }
  
  updateParticipantsList();
  updateControlButtons();
  toastSuccess(i18n.t('host.startEstimation'));
}

/**
 * 初始化 Host 選擇卡片 UI
 */
function initHostCardSelection() {
  const hostCardsContainer = document.getElementById('host-cards-container');
  if (!hostCardsContainer) return;
  
  hostCardsContainer.innerHTML = '';
  
  // 生成卡片 HTML
  const cardsHTML = CARD_SET.map(card => createSelectableCardHTML(card)).join('');
  hostCardsContainer.innerHTML = `<div class="cards-grid">${cardsHTML}</div>`;
  
  // 初始化卡片傾斜效果
  initCardTiltEffect(hostCardsContainer);
  
  // 設定卡片選擇事件
  setupCardSelection(hostCardsContainer, (card) => {
    hostSelectedCard = card;
    updateControlButtons();
  });
}

/**
 * 翻牌
 */
function flipCards() {
  // 如果 Host 參與估點，將 Host 的選擇加入結果
  if (hostParticipates && hostSelectedCard !== null) {
    // 在翻牌前，將 Host 的選擇加入到參與者結果中
    // 注意：這需要在 HostManager 中處理，或者我們在這裡手動添加
  }
  
  currentResults = hostManager.flipCards();
  
  // 如果 Host 參與估點，添加 Host 的結果
  if (hostParticipates && hostSelectedCard !== null) {
    currentResults.push({
      id: 'host',
      name: hostName,
      card: hostSelectedCard
    });
  }
  
  updateParticipantsList();
  updateControlButtons();
  displayResults(currentResults);
  
  // 儲存到歷史
  saveToHistory(currentResults);
}

/**
 * 新的一輪
 */
function newRound() {
  hostManager.resetRound();
  currentResults = null;
  hostSelectedCard = null; // 重置 Host 選擇
  updateParticipantsList();
  updateControlButtons();
}

/**
 * 結束會議
 */
function closeMeeting() {
  if (confirm(i18n.t('host.closeMeetingConfirm'))) {
    hostManager.closeMeeting();
    window.location.hash = '#/';
  }
}

/**
 * 顯示結果
 */
function displayResults(results) {
  const resultsStats = document.getElementById('results-stats');
  const resultsCards = document.getElementById('results-cards');
  
  // 計算統計
  const numericResults = results
    .filter(r => r.card && !isNaN(parseFloat(r.card)))
    .map(r => parseFloat(r.card));
  
  let average = '-';
  let highest = '-';
  let lowest = '-';
  
  if (numericResults.length > 0) {
    average = (numericResults.reduce((a, b) => a + b, 0) / numericResults.length).toFixed(1);
    highest = Math.max(...numericResults);
    lowest = Math.min(...numericResults);
  }
  
  // 顯示統計
  resultsStats.innerHTML = `
    <div class="stat-card">
      <div class="stat-label" data-i18n="host.stats.average">平均</div>
      <div class="stat-value">${average}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label" data-i18n="host.stats.highest">最高</div>
      <div class="stat-value">${highest}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label" data-i18n="host.stats.lowest">最低</div>
      <div class="stat-value">${lowest}</div>
    </div>
  `;
  
  // 顯示個別結果
  resultsCards.innerHTML = results.map(r => `
    <div class="result-card-item">
      <div class="result-card-name">${escapeHtml(r.name)}</div>
      <div class="result-card-value ${r.card ? '' : 'no-select'}">${r.card || '-'}</div>
    </div>
  `).join('');
  
  i18n.applyTranslations();
}

/**
 * 儲存到歷史
 */
function saveToHistory(results) {
  const meetingId = document.getElementById('meeting-id').textContent;
  
  addHistory({
    mode: 'host',
    meetingId,
    results: results.map(r => ({
      name: r.name,
      card: r.card
    })),
    participants: results.length
  });
}

/**
 * HTML 跳脫
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

