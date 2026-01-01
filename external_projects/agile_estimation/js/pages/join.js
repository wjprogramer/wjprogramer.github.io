/**
 * Join Mode Page
 * 加入房間頁面 - 輸入會議 ID 和名稱加入估點會議
 */

import { i18n } from '../utils/i18n.js';
import { theme } from '../utils/theme.js';
import { storage } from '../utils/storage/index.js';
import { ClientManager, ConnectionState, EstimationState } from '../webrtc/peer-manager.js';
import { 
  CARD_SET, 
  createSelectableCardHTML, 
  initCardTiltEffect,
  setupCardSelection 
} from '../components/card.js';
import { showToast, toastSuccess, toastError, toastWarning } from '../components/toast.js';
import { addHistory, getHistory } from '../data/history.js';

// 模組狀態
let clientManager = null;
let meetingIdFromUrl = null;
let pendingCardSelection = null; // 待確認的卡片選擇

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
          <div class="lang-dropdown-container">
            <button class="btn btn-ghost btn-icon" id="lang-toggle" title="切換語言">
              🌐
            </button>
            <div class="lang-dropdown hidden" id="lang-dropdown">
              <button class="lang-option" data-lang="zh-TW">繁體中文</button>
              <button class="lang-option" data-lang="zh-CN">简体中文</button>
              <button class="lang-option" data-lang="en">English</button>
              <button class="lang-option" data-lang="ja">日本語</button>
            </div>
          </div>
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
              <div class="input-with-button">
                <input 
                  type="text" 
                  id="meeting-id-input" 
                  class="form-input" 
                  placeholder="XXXXXX"
                  maxlength="6"
                  autocomplete="off"
                  value="${meetingIdFromUrl || ''}"
                >
                <button class="btn btn-secondary" id="scan-qr-btn" type="button">
                  📷 <span data-i18n="join.scanQR">掃描 QR Code</span>
                </button>
              </div>
            </div>
            
            <div class="form-group">
              <label for="name-input" data-i18n="join.name">你的名稱</label>
              <input 
                type="text" 
                id="name-input" 
                class="form-input" 
                maxlength="30"
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
            <!-- 當前 Issue 資訊 -->
            <div id="current-issue-info" class="current-issue-info hidden">
              <div class="current-issue-header">
                <h4>
                  <span data-i18n="join.currentIssue">當前 Issue</span>: 
                  <span id="current-issue-title" class="issue-title-display">-</span>
                </h4>
              </div>
              <p class="issue-description" id="current-issue-description"></p>
            </div>
            
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
            
            <div class="confirm-selection hidden" id="confirm-selection">
              <button class="btn btn-primary btn-lg btn-block" id="confirm-card-btn">
                <span data-i18n="common.confirm">確定</span>
              </button>
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
            
            <!-- 統計圖表 -->
            <div class="chart-container">
              <canvas id="estimation-chart"></canvas>
            </div>
            
            <!-- 極端值分析 -->
            <div id="extreme-values-section" class="extreme-values-section hidden"></div>
          </div>
          
          <!-- 會議結束畫面 -->
          <div id="meeting-ended-phase" class="meeting-content hidden">
            <div class="meeting-ended-content">
              <div class="meeting-ended-icon">🎉</div>
              <h2 data-i18n="join.meetingEnded">會議已結束</h2>
              <p class="meeting-ended-thanks" data-i18n="join.thanksForParticipation">感謝您的參與！</p>
              
              <div class="meeting-summary" id="meeting-summary">
                <!-- 會議摘要會在這裡顯示 -->
              </div>
              
              <div class="meeting-ended-actions">
                <button class="btn btn-primary btn-lg" id="back-to-home-btn">
                  <span data-i18n="common.backToHome">返回首頁</span>
                </button>
              </div>
            </div>
          </div>
          
          <!-- 離開按鈕 -->
          <div class="leave-section" id="leave-section">
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
      
      .input-with-button {
        display: flex;
        gap: var(--spacing-sm);
      }
      
      .input-with-button .form-input {
        flex: 1;
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
      
      /* QR Code 掃描 Modal */
      .scan-container {
        position: relative;
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
        background: #000;
        border-radius: var(--radius-md);
        overflow: hidden;
      }
      
      #scan-video {
        width: 100%;
        height: auto;
        display: block;
      }
      
      .scan-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .scan-frame {
        width: 250px;
        height: 250px;
        border: 3px solid var(--color-primary);
        border-radius: var(--radius-md);
        box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
      }
      
      .scan-hint {
        text-align: center;
        margin-top: var(--spacing-md);
        color: var(--color-text-secondary);
        font-size: var(--font-size-sm);
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
      
      /* 當前 Issue 資訊 */
      .current-issue-info {
        margin-bottom: var(--spacing-lg);
        padding: var(--spacing-md);
        background: var(--color-bg-secondary);
        border-radius: var(--radius-md);
        border: 2px solid var(--color-primary);
      }
      
      .current-issue-header {
        margin-bottom: var(--spacing-sm);
      }
      
      .current-issue-header h4 {
        margin: 0;
        color: var(--color-text-primary);
        font-size: var(--font-size-lg);
      }
      
      .issue-title-display {
        color: var(--color-primary);
        font-weight: 600;
        margin-left: var(--spacing-sm);
      }
      
      .issue-description {
        color: var(--color-text-secondary);
        font-size: var(--font-size-sm);
        margin: 0;
        margin-top: var(--spacing-xs);
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
      
      .confirm-selection {
        margin-top: var(--spacing-md);
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
        background: var(--color-primary-light);
      }
      
      .result-card-item.extreme-highest {
        border: 2px solid var(--color-error);
        background: rgba(239, 68, 68, 0.1);
      }
      
      .result-card-item.extreme-lowest {
        border: 2px solid var(--color-info, #3b82f6);
        background: rgba(59, 130, 246, 0.1);
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
      
      /* 統計圖表 */
      .chart-container {
        margin-top: var(--spacing-lg);
        padding: var(--spacing-lg);
        background: var(--color-bg-secondary);
        border-radius: var(--radius-md);
        height: 300px;
      }
      
      /* 極端值分析 */
      .extreme-values-section {
        margin-top: var(--spacing-lg);
        padding: var(--spacing-lg);
        background: var(--color-bg-secondary);
        border-radius: var(--radius-md);
      }
      
      .extreme-values-section h4 {
        margin-bottom: var(--spacing-md);
        color: var(--color-text-primary);
      }
      
      .extreme-group {
        margin-bottom: var(--spacing-md);
      }
      
      .extreme-label {
        display: block;
        font-weight: 600;
        margin-bottom: var(--spacing-xs);
        color: var(--color-text-primary);
      }
      
      .extreme-participants {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-sm);
      }
      
      .extreme-participant {
        padding: var(--spacing-xs) var(--spacing-sm);
        background: var(--color-bg-primary);
        border-radius: var(--radius-sm);
        font-size: var(--font-size-sm);
        color: var(--color-text-primary);
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
      
      /* 會議結束畫面 */
      .meeting-ended-content {
        text-align: center;
        padding: var(--spacing-2xl) var(--spacing-lg);
      }
      
      .meeting-ended-icon {
        font-size: 5rem;
        margin-bottom: var(--spacing-lg);
        animation: bounce 1s ease-in-out;
      }
      
      .meeting-ended-content h2 {
        font-size: var(--font-size-3xl);
        margin-bottom: var(--spacing-md);
        color: var(--color-text-primary);
      }
      
      .meeting-ended-thanks {
        font-size: var(--font-size-lg);
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-xl);
      }
      
      .meeting-summary {
        background: var(--color-bg-secondary);
        border-radius: var(--radius-lg);
        padding: var(--spacing-lg);
        margin-bottom: var(--spacing-xl);
        text-align: left;
      }
      
      .summary-stats {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-lg);
      }
      
      .summary-stat-item {
        text-align: center;
        padding: var(--spacing-md);
        background: var(--color-bg-primary);
        border-radius: var(--radius-md);
      }
      
      .summary-stat-label {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-xs);
      }
      
      .summary-stat-value {
        font-family: var(--font-display);
        font-size: var(--font-size-2xl);
        font-weight: 700;
        color: var(--color-primary-light);
      }
      
      .summary-empty {
        text-align: center;
        padding: var(--spacing-lg);
        color: var(--color-text-muted);
      }
      
      .summary-history h4 {
        margin-bottom: var(--spacing-md);
        color: var(--color-text-primary);
      }
      
      .history-list {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
      }
      
      .history-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-sm) var(--spacing-md);
        background: var(--color-bg-primary);
        border-radius: var(--radius-md);
        font-size: var(--font-size-sm);
      }
      
      .history-round {
        color: var(--color-text-secondary);
        font-weight: 500;
      }
      
      .history-value {
        font-family: var(--font-display);
        font-size: var(--font-size-lg);
        font-weight: 700;
        color: var(--color-primary-light);
      }
      
      .history-time {
        color: var(--color-text-muted);
        font-size: var(--font-size-xs);
      }
      
      .meeting-ended-actions {
        margin-top: var(--spacing-xl);
      }
      
      @keyframes bounce {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-20px);
        }
      }
      
      @media (max-width: 767px) {
        .results-stats {
          grid-template-columns: 1fr;
        }
        
        .summary-stats {
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
  
  // 語言切換 Dropdown
  const langToggle = document.getElementById('lang-toggle');
  const langDropdown = document.getElementById('lang-dropdown');
  
  if (langToggle && langDropdown) {
    langToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('hidden');
      updateLangDropdownSelection();
    });
    
    langDropdown.querySelectorAll('.lang-option').forEach(option => {
      option.addEventListener('click', async (e) => {
        e.stopPropagation();
        const lang = option.dataset.lang;
        await i18n.setLanguage(lang);
        langDropdown.classList.add('hidden');
      });
    });
    
    document.addEventListener('click', (e) => {
      if (!langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
        langDropdown.classList.add('hidden');
      }
    });
  }
  
  function updateLangDropdownSelection() {
    const currentLang = i18n.getLanguage();
    if (langDropdown) {
      langDropdown.querySelectorAll('.lang-option').forEach(option => {
        if (option.dataset.lang === currentLang) {
          option.classList.add('active');
        } else {
          option.classList.remove('active');
        }
      });
    }
  }
  
  // 會議 ID 輸入 - 自動大寫
  const meetingIdInput = document.getElementById('meeting-id-input');
  if (meetingIdInput) {
    meetingIdInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    });
  }
  
  // QR Code 掃描按鈕
  document.getElementById('scan-qr-btn')?.addEventListener('click', () => {
    startQRCodeScan();
  });
  
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
    const errorMessage = err.message || '';
    if (errorMessage.includes('blacklisted') || errorMessage === 'blacklisted') {
      errorKey = 'join.blacklisted';
    } else if (errorMessage.includes('full') || errorMessage === 'full') {
      errorKey = 'join.errors.meetingFull';
    } else if (errorMessage.includes('名稱已被使用') || errorMessage.includes('duplicate_name') || errorMessage.includes('already in use')) {
      errorKey = 'join.errors.duplicateName';
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
  
  clientManager.onEstimationStart = (issueInfo) => {
    console.log('Estimation started', issueInfo);
    updateCurrentIssueDisplay(issueInfo);
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
  
  clientManager.onMeetingClosed = () => {
    console.log('Meeting closed by host');
    // 顯示會議結束畫面
    showMeetingEndedScreen();
  };
  
  clientManager.onError = (err) => {
    console.error('Client error:', err);
    // 只有在非正常結束的情況下才顯示錯誤
    if (err.message === 'Meeting closed by host') {
      // 正常結束應該由 onMeetingClosed 處理，這裡不應該執行
      // 但如果回調沒有設置，這裡作為後備處理
      showMeetingEndedScreen();
    } else {
      toastError(i18n.t('join.errors.connectionFailed'));
    }
  };
}

/**
 * 更新當前 Issue 顯示
 * @param {Object|null} issueInfo - Issue 資訊 { title, description }
 */
function updateCurrentIssueDisplay(issueInfo) {
  const currentIssueInfo = document.getElementById('current-issue-info');
  const issueTitleDisplay = document.getElementById('current-issue-title');
  const issueDescription = document.getElementById('current-issue-description');
  
  if (issueInfo && issueInfo.title) {
    if (currentIssueInfo) {
      currentIssueInfo.classList.remove('hidden');
    }
    if (issueTitleDisplay) {
      issueTitleDisplay.textContent = issueInfo.title;
    }
    if (issueDescription) {
      issueDescription.textContent = issueInfo.description || '-';
    }
  } else {
    if (currentIssueInfo) {
      currentIssueInfo.classList.add('hidden');
    }
  }
}

/**
 * 設定卡片選擇處理
 */
function setupCardSelectionHandler(container) {
  // 預選卡片（不立即發送）
  setupCardSelection(container, (value) => {
    if (clientManager.estimationState !== EstimationState.SELECTING) {
      return;
    }
    
    // 儲存待確認的選擇
    pendingCardSelection = value;
    
    // 更新顯示
    const card = CARD_SET.find(c => c.value === value);
    const selectedDisplay = document.getElementById('selected-display');
    if (selectedDisplay) {
      selectedDisplay.innerHTML = `
        <span data-i18n="join.pendingSelection">預選</span>: 
        <span class="selected-value">${card.label}</span>
      `;
      i18n.applyTranslations();
    }
    
    // 顯示確定按鈕
    const confirmSelection = document.getElementById('confirm-selection');
    if (confirmSelection) {
      confirmSelection.classList.remove('hidden');
    }
  });
  
  // 確定按鈕
  const confirmBtn = document.getElementById('confirm-card-btn');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      if (pendingCardSelection === null) {
        return;
      }
      
      if (clientManager.estimationState !== EstimationState.SELECTING) {
        return;
      }
      
      // 真正選擇卡片並發送給 Host
      clientManager.selectCard(pendingCardSelection);
      
      // 更新顯示
      const card = CARD_SET.find(c => c.value === pendingCardSelection);
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
      
      // 隱藏確定按鈕
      const confirmSelection = document.getElementById('confirm-selection');
      if (confirmSelection) {
        confirmSelection.classList.add('hidden');
      }
      
      // 切換到等待翻牌階段
      updateMeetingPhase();
      
      // 清除待確認選擇
      pendingCardSelection = null;
    });
  }
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
  
  // 隱藏確定按鈕
  const confirmSelection = document.getElementById('confirm-selection');
  if (confirmSelection) {
    confirmSelection.classList.add('hidden');
  }
  
  // 清除待確認選擇
  pendingCardSelection = null;
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
  const meetingEndedPhase = document.getElementById('meeting-ended-phase');
  const leaveSection = document.getElementById('leave-section');
  
  // 隱藏所有階段
  waitingPhase?.classList.add('hidden');
  selectingPhase?.classList.add('hidden');
  waitingFlipPhase?.classList.add('hidden');
  resultsPhase?.classList.add('hidden');
  meetingEndedPhase?.classList.add('hidden');
  
  // 根據狀態顯示相應階段
  switch (clientManager.estimationState) {
    case EstimationState.WAITING:
      waitingPhase?.classList.remove('hidden');
      if (leaveSection) leaveSection.classList.remove('hidden');
      break;
      
    case EstimationState.SELECTING:
      selectingPhase?.classList.remove('hidden');
      if (leaveSection) leaveSection.classList.remove('hidden');
      break;
      
    case EstimationState.SELECTED:
      waitingFlipPhase?.classList.remove('hidden');
      if (leaveSection) leaveSection.classList.remove('hidden');
      break;
      
    case EstimationState.REVEALED:
      resultsPhase?.classList.remove('hidden');
      if (leaveSection) leaveSection.classList.remove('hidden');
      break;
  }
}

/**
 * 顯示會議結束畫面
 */
function showMeetingEndedScreen() {
  // 隱藏所有其他階段
  const waitingPhase = document.getElementById('waiting-phase');
  const selectingPhase = document.getElementById('selecting-phase');
  const waitingFlipPhase = document.getElementById('waiting-flip-phase');
  const resultsPhase = document.getElementById('results-phase');
  const meetingEndedPhase = document.getElementById('meeting-ended-phase');
  const leaveSection = document.getElementById('leave-section');
  
  waitingPhase?.classList.add('hidden');
  selectingPhase?.classList.add('hidden');
  waitingFlipPhase?.classList.add('hidden');
  resultsPhase?.classList.add('hidden');
  if (leaveSection) leaveSection.classList.add('hidden');
  
  // 顯示結束畫面
  if (meetingEndedPhase) {
    meetingEndedPhase.classList.remove('hidden');
  }
  
  // 收集並顯示會議摘要
  displayMeetingSummary();
  
  // 綁定返回首頁按鈕
  const backToHomeBtn = document.getElementById('back-to-home-btn');
  if (backToHomeBtn) {
    backToHomeBtn.onclick = () => {
      window.location.hash = '#/';
    };
  }
}

/**
 * 顯示會議摘要
 */
function displayMeetingSummary() {
  const summaryContainer = document.getElementById('meeting-summary');
  if (!summaryContainer) return;
  
  // 取得本次會議的所有歷史記錄
  const allHistory = getHistory();
  const meetingHistory = allHistory.filter(h => 
    h.mode === 'client' && h.meetingId === clientManager.meetingId
  );
  
  if (meetingHistory.length === 0) {
    summaryContainer.innerHTML = `
      <div class="summary-empty">
        <p data-i18n="join.noEstimationHistory">本次會議沒有估點記錄</p>
      </div>
    `;
    i18n.applyTranslations();
    return;
  }
  
  // 統計資訊
  const totalRounds = meetingHistory.length;
  const myValues = meetingHistory
    .filter(h => h.value !== null && !isNaN(parseFloat(h.value)))
    .map(h => parseFloat(h.value));
  
  let averageValue = '-';
  if (myValues.length > 0) {
    averageValue = (myValues.reduce((a, b) => a + b, 0) / myValues.length).toFixed(1);
  }
  
  // 顯示摘要
  summaryContainer.innerHTML = `
    <div class="summary-stats">
      <div class="summary-stat-item">
        <div class="summary-stat-label" data-i18n="join.totalRounds">總輪次</div>
        <div class="summary-stat-value">${totalRounds}</div>
      </div>
      <div class="summary-stat-item">
        <div class="summary-stat-label" data-i18n="join.myAverage">我的平均</div>
        <div class="summary-stat-value">${averageValue}</div>
      </div>
    </div>
    <div class="summary-history">
      <h4 data-i18n="join.estimationHistory">估點歷史</h4>
      <div class="history-list">
        ${meetingHistory.map((h, index) => {
          const date = new Date(h.timestamp);
          const timeStr = date.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' });
          return `
            <div class="history-item">
              <span class="history-round">${i18n.t('host.roundNumber')} ${index + 1}</span>
              <span class="history-value">${h.value || '-'}</span>
              <span class="history-time">${timeStr}</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
  
  i18n.applyTranslations();
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
let chartInstance = null; // Chart.js 實例

function displayResults(results) {
  const resultsStats = document.getElementById('results-stats');
  const resultsCards = document.getElementById('results-cards');
  const extremeValuesSection = document.getElementById('extreme-values-section');
  
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
  
  // 識別極端值
  const extremeValues = identifyExtremeValues(results, numericResults, highest, lowest);
  
  // 顯示個別結果（高亮極端值）
  if (resultsCards) {
    resultsCards.innerHTML = results.map(r => {
      const isYou = r.name === clientManager.name;
      const isHighest = extremeValues.highest.some(ev => ev.name === r.name);
      const isLowest = extremeValues.lowest.some(ev => ev.name === r.name);
      const extremeClass = isHighest ? 'extreme-highest' : isLowest ? 'extreme-lowest' : '';
      const youClass = isYou ? 'is-you' : '';
      
      return `
        <div class="result-card-item ${youClass} ${extremeClass}">
          <div class="result-card-name">${escapeHtml(r.name)}${isYou ? ` (${i18n.t('join.you')})` : ''}</div>
          <div class="result-card-value ${r.card ? '' : 'no-select'}">${r.card || '-'}</div>
        </div>
      `;
    }).join('');
  }
  
  // 顯示統計圖表
  displayChart(results, numericResults);
  
  // 顯示極端值分析
  if (extremeValues.highest.length > 0 || extremeValues.lowest.length > 0) {
    if (extremeValuesSection) {
      extremeValuesSection.classList.remove('hidden');
      extremeValuesSection.innerHTML = `
        <h4 data-i18n="host.extremeValues">極端值</h4>
        ${extremeValues.highest.length > 0 ? `
          <div class="extreme-group">
            <span class="extreme-label" data-i18n="host.highestValue">最高值</span>
            <div class="extreme-participants">
              ${extremeValues.highest.map(ev => `
                <span class="extreme-participant">${escapeHtml(ev.name)}: ${ev.card}</span>
              `).join('')}
            </div>
          </div>
        ` : ''}
        ${extremeValues.lowest.length > 0 ? `
          <div class="extreme-group">
            <span class="extreme-label" data-i18n="host.lowestValue">最低值</span>
            <div class="extreme-participants">
              ${extremeValues.lowest.map(ev => `
                <span class="extreme-participant">${escapeHtml(ev.name)}: ${ev.card}</span>
              `).join('')}
            </div>
          </div>
        ` : ''}
      `;
      i18n.applyTranslations();
    }
  } else {
    if (extremeValuesSection) {
      extremeValuesSection.classList.add('hidden');
    }
  }
  
  i18n.applyTranslations();
}

/**
 * 識別極端值
 */
function identifyExtremeValues(results, numericResults, highest, lowest) {
  const extremeValues = {
    highest: [],
    lowest: []
  };
  
  if (numericResults.length === 0) return extremeValues;
  
  // 找出最高值
  results.forEach(r => {
    if (r.card && parseFloat(r.card) === highest) {
      extremeValues.highest.push({ name: r.name, card: r.card });
    }
  });
  
  // 找出最低值
  results.forEach(r => {
    if (r.card && parseFloat(r.card) === lowest) {
      extremeValues.lowest.push({ name: r.name, card: r.card });
    }
  });
  
  return extremeValues;
}

/**
 * 顯示統計圖表
 */
function displayChart(results, numericResults) {
  const chartCanvas = document.getElementById('estimation-chart');
  if (!chartCanvas || typeof Chart === 'undefined') return;

  if (chartInstance) {
    chartInstance.destroy();
  }

  const cardValues = CARD_SET.filter(c => typeof c.value === 'number').map(c => c.value);
  const counts = {};
  cardValues.forEach(val => counts[val] = 0);

  results.forEach(r => {
    if (typeof r.card === 'number' || (typeof r.card === 'string' && !isNaN(parseFloat(r.card)))) {
      const value = parseFloat(r.card);
      if (counts[value] !== undefined) {
        counts[value]++;
      }
    }
  });

  const labels = Object.keys(counts).sort((a, b) => parseFloat(a) - parseFloat(b));
  const data = labels.map(label => counts[label]);

  const isDark = theme.isDark();
  const textColor = isDark ? '#e2e8f0' : '#1a1a2e';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const barBackgroundColor = isDark ? 'rgba(99, 102, 241, 0.5)' : 'rgba(99, 102, 241, 0.3)';
  const barBorderColor = isDark ? 'rgba(99, 102, 241, 1)' : 'rgba(99, 102, 241, 0.8)';

  chartInstance = new Chart(chartCanvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: i18n.t('host.chart.distribution'),
        data: data,
        backgroundColor: barBackgroundColor,
        borderColor: barBorderColor,
        borderWidth: 2,
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)',
          titleColor: isDark ? '#fff' : '#000',
          bodyColor: isDark ? '#fff' : '#000',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          borderWidth: 1
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1, color: textColor },
          grid: { color: gridColor }
        },
        x: {
          ticks: { color: textColor },
          grid: { color: gridColor }
        }
      }
    }
  });
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

/**
 * 開始 QR Code 掃描
 */
let scanningStream = null;
let scanningVideo = null;

function startQRCodeScan() {
  if (typeof jsQR === 'undefined') {
    toastError(i18n.t('join.scanFailed'));
    return;
  }
  
  // 檢查是否支援相機
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    toastError(i18n.t('join.cameraNotSupported'));
    return;
  }
  
  // 建立掃描 Modal
  const modal = document.createElement('div');
  modal.className = 'modal-backdrop active';
  modal.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h3 data-i18n="join.scanQR">掃描 QR Code</h3>
        <button class="btn btn-ghost btn-icon" id="close-scan-modal">×</button>
      </div>
      <div class="modal-body">
        <div class="scan-container">
          <video id="scan-video" autoplay playsinline></video>
          <div class="scan-overlay">
            <div class="scan-frame"></div>
          </div>
        </div>
        <p class="scan-hint" data-i18n="join.scanning">掃描中...</p>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  i18n.applyTranslations();
  
  const video = document.getElementById('scan-video');
  scanningVideo = video;
  
  // 請求相機權限
  navigator.mediaDevices.getUserMedia({ 
    video: { 
      facingMode: 'environment' // 使用後置相機
    } 
  }).then(stream => {
    scanningStream = stream;
    video.srcObject = stream;
    
    // 開始掃描
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    function scanFrame() {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        
        if (code) {
          // 找到 QR Code，解析 URL
          const url = code.data;
          const match = url.match(/#\/join\/([A-Z0-9]+)/i);
          
          if (match && match[1]) {
            const meetingId = match[1].toUpperCase();
            document.getElementById('meeting-id-input').value = meetingId;
            stopQRCodeScan(modal);
            toastSuccess(i18n.t('join.scanSuccess', { meetingId }));
            return;
          }
        }
      }
      
      requestAnimationFrame(scanFrame);
    }
    
    video.addEventListener('loadedmetadata', () => {
      scanFrame();
    });
    
  }).catch(err => {
    console.error('Camera error:', err);
    if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
      toastError(i18n.t('join.cameraPermissionDenied'));
    } else {
      toastError(i18n.t('join.scanFailed'));
    }
    modal.remove();
  });
  
  // 關閉按鈕
  document.getElementById('close-scan-modal')?.addEventListener('click', () => {
    stopQRCodeScan(modal);
  });
  
  // 點擊背景關閉
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      stopQRCodeScan(modal);
    }
  });
}

/**
 * 停止 QR Code 掃描
 */
function stopQRCodeScan(modal) {
  if (scanningStream) {
    scanningStream.getTracks().forEach(track => track.stop());
    scanningStream = null;
  }
  
  if (scanningVideo) {
    scanningVideo.srcObject = null;
    scanningVideo = null;
  }
  
  if (modal) {
    modal.remove();
  }
}

