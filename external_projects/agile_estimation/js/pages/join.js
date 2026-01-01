/**
 * Join Mode Page
 * 加入房間頁面 - 輸入會議 ID 和名稱加入估點會議
 */

import { i18n } from '../utils/i18n.js';
import { theme } from '../utils/theme.js';
import { storage } from '../utils/storage.js';
import { ClientManager, ConnectionState, EstimationState } from '../webrtc/peer-manager.js';
import { 
  CARD_SET, 
  createSelectableCardHTML, 
  initCardTiltEffect,
  setupCardSelection 
} from '../components/card.js';
import { showToast, toastSuccess, toastError, toastWarning } from '../components/toast.js';
import { addHistory } from '../data/history.js';

// 模組狀態
let clientManager = null;
let meetingIdFromUrl = null;

/**
 * 渲染加入頁面
 * @param {Object} params - 路由參數
 */
export function renderJoin(params = {}) {
  clientManager = new ClientManager();
  meetingIdFromUrl = params.id || null;
  
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <header class="header">
      <div class="container header-content">
        <a href="#/" class="btn btn-ghost" id="back-btn">
          ← <span data-i18n="common.back">返回</span>
        </a>
        <div class="logo" data-i18n="join.title">加入房間</div>
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
    
    <main class="page join-page">
      <div class="container">
        <!-- 加入表單階段 -->
        <div id="join-form-phase" class="phase-container">
          <div class="join-form-card">
            <h2 data-i18n="join.title">加入房間</h2>
            
            <div class="form-group">
              <label for="meeting-id-input" data-i18n="join.meetingId">會議 ID</label>
              <input 
                type="text" 
                id="meeting-id-input" 
                class="form-input" 
                placeholder="XXXXXX"
                maxlength="6"
                autocomplete="off"
                value="${meetingIdFromUrl || ''}"
              >
            </div>
            
            <div class="form-group">
              <label for="name-input" data-i18n="join.name">你的名稱</label>
              <input 
                type="text" 
                id="name-input" 
                class="form-input" 
                maxlength="20"
                autocomplete="off"
              >
            </div>
            
            <button class="btn btn-primary btn-lg btn-block" id="join-btn">
              <span data-i18n="join.join">加入</span>
            </button>
            
            <div class="join-status hidden" id="join-status">
              <div class="loading-spinner"></div>
              <span data-i18n="join.joining">加入中...</span>
            </div>
          </div>
        </div>
        
        <!-- 會議中階段 -->
        <div id="meeting-phase" class="phase-container hidden">
          <!-- 連線狀態 -->
          <div class="connection-status" id="connection-status">
            <span class="status-dot connected"></span>
            <span data-i18n="join.connected">已連線</span>
          </div>
          
          <!-- 等待開始 -->
          <div id="waiting-phase" class="meeting-content">
            <div class="waiting-message">
              <div class="waiting-icon">⏳</div>
              <p data-i18n="join.waitingForHost">等待主持人開始估點...</p>
            </div>
            
            <div class="participants-preview" id="participants-preview">
              <!-- 參與者預覽會在這裡顯示 -->
            </div>
          </div>
          
          <!-- 選擇卡片 -->
          <div id="selecting-phase" class="meeting-content hidden">
            <div class="selecting-instruction">
              <p data-i18n="join.selectCard">請選擇一張牌</p>
            </div>
            
            <div class="cards-container" id="cards-container">
              <div class="cards-grid">
                ${CARD_SET.map(card => createSelectableCardHTML(card, false)).join('')}
              </div>
            </div>
            
            <div class="selected-display" id="selected-display">
              <span class="text-muted" data-i18n="join.selectCard">請選擇一張牌</span>
            </div>
          </div>
          
          <!-- 等待翻牌 -->
          <div id="waiting-flip-phase" class="meeting-content hidden">
            <div class="waiting-message">
              <div class="waiting-icon">🎴</div>
              <p data-i18n="join.waitingForFlip">等待主持人翻牌...</p>
              <div class="your-selection" id="your-selection">
                <span data-i18n="join.selectedCard">你選擇了</span>: 
                <span class="selected-value" id="your-selected-card">-</span>
              </div>
            </div>
          </div>
          
          <!-- 結果顯示 -->
          <div id="results-phase" class="meeting-content hidden">
            <div class="results-header">
              <h3 data-i18n="host.stats.title">估點結果</h3>
            </div>
            
            <div class="results-stats" id="results-stats">
              <!-- 統計資訊會在這裡顯示 -->
            </div>
            
            <div class="results-cards" id="results-cards">
              <!-- 結果卡片會在這裡顯示 -->
            </div>
          </div>
          
          <!-- 離開按鈕 -->
          <div class="leave-section">
            <button class="btn btn-ghost btn-danger" id="leave-btn">
              <span data-i18n="join.leaveMeeting">離開會議</span>
            </button>
          </div>
        </div>
      </div>
    </main>
    
    <style>
      .join-page {
        min-height: calc(100vh - 80px);
        padding: var(--spacing-lg) 0;
      }
      
      .phase-container {
        max-width: 600px;
        margin: 0 auto;
      }
      
      /* 加入表單 */
      .join-form-card {
        background: var(--color-bg-secondary);
        border-radius: var(--radius-lg);
        padding: var(--spacing-xl);
      }
      
      .join-form-card h2 {
        text-align: center;
        margin-bottom: var(--spacing-xl);
      }
      
      .form-group {
        margin-bottom: var(--spacing-lg);
      }
      
      .form-group label {
        display: block;
        margin-bottom: var(--spacing-sm);
        font-weight: 500;
      }
      
      .form-input {
        width: 100%;
        padding: var(--spacing-md);
        border: 2px solid var(--color-border);
        border-radius: var(--radius-md);
        background: var(--color-bg-primary);
        color: var(--color-text-primary);
        font-size: var(--font-size-lg);
        transition: border-color var(--transition-base);
      }
      
      .form-input:focus {
        outline: none;
        border-color: var(--color-primary);
      }
      
      #meeting-id-input {
        font-family: var(--font-display);
        letter-spacing: 0.2em;
        text-transform: uppercase;
        text-align: center;
      }
      
      .btn-block {
        width: 100%;
        margin-top: var(--spacing-lg);
      }
      
      .join-status {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-md);
        margin-top: var(--spacing-lg);
        color: var(--color-text-secondary);
      }
      
      /* 連線狀態 */
      .connection-status {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        justify-content: center;
        padding: var(--spacing-sm);
        margin-bottom: var(--spacing-lg);
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
      }
      
      .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--color-text-muted);
      }
      
      .status-dot.connected {
        background: var(--color-success);
      }
      
      .status-dot.disconnected {
        background: var(--color-error);
      }
      
      /* 會議內容 */
      .meeting-content {
        min-height: 400px;
      }
      
      /* 等待狀態 */
      .waiting-message {
        text-align: center;
        padding: var(--spacing-2xl);
      }
      
      .waiting-icon {
        font-size: 4rem;
        margin-bottom: var(--spacing-lg);
      }
      
      .waiting-message p {
        font-size: var(--font-size-lg);
        color: var(--color-text-secondary);
      }
      
      .your-selection {
        margin-top: var(--spacing-lg);
        font-size: var(--font-size-lg);
      }
      
      .your-selection .selected-value {
        font-family: var(--font-display);
        font-size: var(--font-size-2xl);
        font-weight: 700;
        color: var(--color-primary-light);
      }
      
      /* 參與者預覽 */
      .participants-preview {
        margin-top: var(--spacing-xl);
        padding: var(--spacing-md);
        background: var(--color-bg-secondary);
        border-radius: var(--radius-md);
      }
      
      .participants-preview-title {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-sm);
      }
      
      .participants-preview-list {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-sm);
      }
      
      .participant-badge {
        padding: var(--spacing-xs) var(--spacing-sm);
        background: var(--color-bg-tertiary);
        border-radius: var(--radius-sm);
        font-size: var(--font-size-sm);
      }
      
      /* 選擇卡片 */
      .selecting-instruction {
        text-align: center;
        padding: var(--spacing-lg) 0;
      }
      
      .selecting-instruction p {
        font-size: var(--font-size-lg);
        color: var(--color-text-secondary);
      }
      
      .cards-container {
        padding: var(--spacing-md) 0;
        padding-bottom: 100px;
      }
      
      .selected-display {
        position: sticky;
        bottom: 0;
        background: var(--color-bg-primary);
        padding: var(--spacing-lg);
        border-top: 1px solid var(--color-border);
        text-align: center;
        font-size: var(--font-size-lg);
      }
      
      .selected-display .selected-value {
        font-family: var(--font-display);
        font-size: var(--font-size-2xl);
        font-weight: 700;
        color: var(--color-primary-light);
      }
      
      /* 結果 */
      .results-header {
        text-align: center;
        margin-bottom: var(--spacing-lg);
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
        min-width: 80px;
      }
      
      .result-card-item.is-you {
        border: 2px solid var(--color-primary);
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
      
      /* 離開 */
      .leave-section {
        text-align: center;
        padding-top: var(--spacing-xl);
        margin-top: var(--spacing-xl);
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
        .results-stats {
          grid-template-columns: 1fr;
        }
      }
    </style>
  `;

  // 套用翻譯
  i18n.applyTranslations();
  
  // 設定事件監聯
  // 載入上次使用的 Client 名稱
  loadClientName();
  
  setupEventListeners();
  
  // 如果有 URL 參數中的會議 ID，聚焦到名稱輸入框
  if (meetingIdFromUrl) {
    document.getElementById('name-input')?.focus();
  } else {
    document.getElementById('meeting-id-input')?.focus();
  }
  
  // 返回清理函數
  return () => {
    if (clientManager) {
      clientManager.leaveMeeting();
      clientManager = null;
    }
    meetingIdFromUrl = null;
  };
}

/**
 * 載入上次使用的 Client 名稱
 */
function loadClientName() {
  const settings = storage.get('settings', {});
  const lastClientName = settings.lastClientName || '';
  const nameInput = document.getElementById('name-input');
  if (nameInput && lastClientName) {
    nameInput.value = lastClientName;
  }
}

/**
 * 設定事件監聽
 */
function setupEventListeners() {
  // 主題切換
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const newTheme = theme.toggle();
      themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
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
  
  // 會議 ID 輸入 - 自動大寫
  const meetingIdInput = document.getElementById('meeting-id-input');
  if (meetingIdInput) {
    meetingIdInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    });
  }
  
  // 加入按鈕
  document.getElementById('join-btn')?.addEventListener('click', joinMeeting);
  
  // Enter 鍵加入
  document.getElementById('name-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      joinMeeting();
    }
  });
  
  // 離開會議
  document.getElementById('leave-btn')?.addEventListener('click', () => {
    if (confirm(i18n.t('join.leaveConfirm'))) {
      clientManager.leaveMeeting();
      window.location.hash = '#/';
    }
  });
  
  // 返回按鈕
  document.getElementById('back-btn')?.addEventListener('click', (e) => {
    if (clientManager && clientManager.state === ConnectionState.CONNECTED) {
      e.preventDefault();
      if (confirm(i18n.t('join.leaveConfirm'))) {
        clientManager.leaveMeeting();
        window.location.hash = '#/';
      }
    }
  });
}

/**
 * 加入會議
 */
async function joinMeeting() {
  const meetingIdInput = document.getElementById('meeting-id-input');
  const nameInput = document.getElementById('name-input');
  const joinBtn = document.getElementById('join-btn');
  const joinStatus = document.getElementById('join-status');
  
  const meetingId = meetingIdInput.value.trim().toUpperCase();
  const name = nameInput.value.trim();
  
  // 驗證
  if (!meetingId || meetingId.length !== 6) {
    toastError(i18n.t('join.errors.invalidMeetingId'));
    meetingIdInput.focus();
    return;
  }
  
  if (!name) {
    toastError(i18n.t('join.errors.invalidName'));
    nameInput.focus();
    return;
  }
  
  // 顯示加入中狀態
  joinBtn.disabled = true;
  joinStatus.classList.remove('hidden');
  
  try {
    // 設定回調
    setupClientCallbacks();
    
    // 加入會議
    await clientManager.joinMeeting(meetingId, name);
    
    // 儲存 Client 名稱
    const settings = storage.get('settings', {});
    settings.lastClientName = name;
    storage.set('settings', settings);
    
    // 切換到會議階段
    document.getElementById('join-form-phase').classList.add('hidden');
    document.getElementById('meeting-phase').classList.remove('hidden');
    
    toastSuccess(i18n.t('join.connected'));
    
    // 初始化卡片效果
    const cardsContainer = document.getElementById('cards-container');
    if (cardsContainer) {
      initCardTiltEffect(cardsContainer);
      setupCardSelectionHandler(cardsContainer);
    }
    
    // 更新參與者預覽
    updateParticipantsPreview();
    
    // 根據當前估點狀態顯示相應階段
    updateMeetingPhase();
    
  } catch (err) {
    console.error('Failed to join meeting:', err);
    
    let errorKey = 'join.errors.connectionFailed';
    if (err.message === 'blacklisted') {
      errorKey = 'join.blacklisted';
    } else if (err.message === 'full') {
      errorKey = 'join.errors.meetingFull';
    } else if (err.message === 'invalid_name') {
      errorKey = 'join.errors.invalidName';
    } else if (err.message === 'Connection timeout') {
      errorKey = 'join.errors.connectionTimeout';
    } else if (err.type === 'peer-unavailable') {
      errorKey = 'join.errors.meetingNotFound';
    }
    
    toastError(i18n.t(errorKey));
    
    joinBtn.disabled = false;
    joinStatus.classList.add('hidden');
  }
}

/**
 * 設定 Client 回調
 */
function setupClientCallbacks() {
  clientManager.onStateChange = (state) => {
    console.log('Client state changed:', state);
    updateConnectionStatus(state);
  };
  
  clientManager.onEstimationStart = () => {
    console.log('Estimation started');
    updateMeetingPhase();
  };
  
  clientManager.onFlipCards = (results) => {
    console.log('Cards flipped:', results);
    displayResults(results);
    updateMeetingPhase();
    
    // 儲存到歷史
    saveToHistory(results);
  };
  
  clientManager.onResetRound = () => {
    console.log('Round reset');
    // 重置卡片選擇狀態
    resetCardSelection();
    updateMeetingPhase();
  };
  
  clientManager.onParticipantUpdate = (participants) => {
    console.log('Participants updated:', participants);
    updateParticipantsPreview();
  };
  
  clientManager.onKicked = (reason) => {
    console.log('Kicked:', reason);
    const message = reason === 'blacklisted' 
      ? i18n.t('join.blacklisted')
      : i18n.t('join.kicked');
    toastError(message);
    window.location.hash = '#/';
  };
  
  clientManager.onError = (err) => {
    console.error('Client error:', err);
    if (err.message === 'Meeting closed by host') {
      toastWarning(i18n.t('join.meetingClosed'));
      window.location.hash = '#/';
    } else {
      toastError(i18n.t('join.errors.connectionFailed'));
    }
  };
}

/**
 * 設定卡片選擇處理
 */
function setupCardSelectionHandler(container) {
  setupCardSelection(container, (value) => {
    if (clientManager.estimationState !== EstimationState.SELECTING) {
      return;
    }
    
    // 選擇卡片
    clientManager.selectCard(value);
    
    // 更新顯示
    const card = CARD_SET.find(c => c.value === value);
    const selectedDisplay = document.getElementById('selected-display');
    if (selectedDisplay) {
      selectedDisplay.innerHTML = `
        <span data-i18n="join.selectedCard">你選擇了</span>: 
        <span class="selected-value">${card.label}</span>
      `;
      i18n.applyTranslations();
    }
    
    // 更新等待翻牌階段的顯示
    const yourSelectedCard = document.getElementById('your-selected-card');
    if (yourSelectedCard) {
      yourSelectedCard.textContent = card.label;
    }
    
    // 切換到等待翻牌階段
    updateMeetingPhase();
  });
}

/**
 * 重置卡片選擇
 */
function resetCardSelection() {
  const cardsContainer = document.getElementById('cards-container');
  if (cardsContainer) {
    cardsContainer.querySelectorAll('.card').forEach(card => {
      card.classList.remove('selected');
    });
  }
  
  const selectedDisplay = document.getElementById('selected-display');
  if (selectedDisplay) {
    selectedDisplay.innerHTML = `<span class="text-muted" data-i18n="join.selectCard">請選擇一張牌</span>`;
    i18n.applyTranslations();
  }
}

/**
 * 更新連線狀態顯示
 */
function updateConnectionStatus(state) {
  const statusElement = document.getElementById('connection-status');
  if (!statusElement) return;
  
  const dot = statusElement.querySelector('.status-dot');
  const text = statusElement.querySelector('span:last-child');
  
  if (state === ConnectionState.CONNECTED) {
    dot.className = 'status-dot connected';
    text.setAttribute('data-i18n', 'join.connected');
    text.textContent = i18n.t('join.connected');
  } else {
    dot.className = 'status-dot disconnected';
    text.setAttribute('data-i18n', 'join.disconnected');
    text.textContent = i18n.t('join.disconnected');
  }
}

/**
 * 更新會議階段顯示
 */
function updateMeetingPhase() {
  const waitingPhase = document.getElementById('waiting-phase');
  const selectingPhase = document.getElementById('selecting-phase');
  const waitingFlipPhase = document.getElementById('waiting-flip-phase');
  const resultsPhase = document.getElementById('results-phase');
  
  // 隱藏所有階段
  waitingPhase?.classList.add('hidden');
  selectingPhase?.classList.add('hidden');
  waitingFlipPhase?.classList.add('hidden');
  resultsPhase?.classList.add('hidden');
  
  // 根據狀態顯示相應階段
  switch (clientManager.estimationState) {
    case EstimationState.WAITING:
      waitingPhase?.classList.remove('hidden');
      break;
      
    case EstimationState.SELECTING:
      selectingPhase?.classList.remove('hidden');
      break;
      
    case EstimationState.SELECTED:
      waitingFlipPhase?.classList.remove('hidden');
      break;
      
    case EstimationState.REVEALED:
      resultsPhase?.classList.remove('hidden');
      break;
  }
}

/**
 * 更新參與者預覽
 */
function updateParticipantsPreview() {
  const previewContainer = document.getElementById('participants-preview');
  if (!previewContainer) return;
  
  const participants = clientManager.participants || [];
  
  if (participants.length === 0) {
    previewContainer.innerHTML = '';
    return;
  }
  
  previewContainer.innerHTML = `
    <div class="participants-preview-title">${i18n.t('host.participants')} (${participants.length})</div>
    <div class="participants-preview-list">
      ${participants.map(p => `
        <span class="participant-badge ${p.hasSelected ? 'selected' : ''}">${escapeHtml(p.name)}</span>
      `).join('')}
    </div>
  `;
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
  if (resultsStats) {
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
  }
  
  // 顯示個別結果
  if (resultsCards) {
    resultsCards.innerHTML = results.map(r => {
      const isYou = r.name === clientManager.name;
      return `
        <div class="result-card-item ${isYou ? 'is-you' : ''}">
          <div class="result-card-name">${escapeHtml(r.name)}${isYou ? ' (你)' : ''}</div>
          <div class="result-card-value ${r.card ? '' : 'no-select'}">${r.card || '-'}</div>
        </div>
      `;
    }).join('');
  }
  
  i18n.applyTranslations();
}

/**
 * 儲存到歷史
 */
function saveToHistory(results) {
  const myResult = results.find(r => r.name === clientManager.name);
  
  addHistory({
    mode: 'client',
    meetingId: clientManager.meetingId,
    value: myResult?.card || null,
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

