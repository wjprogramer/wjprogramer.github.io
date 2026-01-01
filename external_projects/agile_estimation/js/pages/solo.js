/**
 * Solo Mode Page
 * 簡易模式 - 選牌、翻牌
 */

import { i18n } from '../utils/i18n.js';
import { theme } from '../utils/theme.js';
import { 
  CARD_SET, 
  createSelectableCardHTML, 
  initCardTiltEffect,
  setupCardSelection 
} from '../components/card.js';
import { showToast, toastSuccess } from '../components/toast.js';
import { addHistory } from '../data/history.js';

// 模組狀態
let selectedCard = null;
let isConfirmed = false;  // 是否已確認選擇（進入翻牌階段）
let isRevealed = false;   // 是否已翻牌（顯示正面）
let gyroscopeHandler = null;  // 陀螺儀事件處理器
let hoverHandler = null;  // 滑鼠 hover 事件處理器

/**
 * 渲染簡易模式頁面
 */
export function renderSolo() {
  selectedCard = null;
  isConfirmed = false;
  isRevealed = false;
  
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <header class="header">
      <div class="container header-content">
        <a href="#/" class="btn btn-ghost" id="back-btn">
          ← <span data-i18n="common.back">返回</span>
        </a>
        <div class="logo" data-i18n="solo.title">簡易模式</div>
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
    
    <main class="page solo-page">
      <div class="container">
        <!-- 選擇階段 -->
        <div id="select-phase">
          <div class="solo-instruction text-center">
            <p class="text-secondary" data-i18n="solo.instruction">選擇一張牌，然後點擊確認</p>
          </div>
          
          <div class="cards-container" id="cards-container">
            <div class="cards-grid">
              ${CARD_SET.map(card => createSelectableCardHTML(card, false)).join('')}
            </div>
          </div>
          
          <div class="solo-actions">
            <div class="selected-display" id="selected-display">
              <span class="text-muted" data-i18n="solo.selectCard">請選擇一張牌</span>
            </div>
            
            <div class="action-buttons">
              <button class="btn btn-primary btn-lg hidden" id="confirm-btn">
                <span data-i18n="solo.confirm">確定</span>
              </button>
            </div>
          </div>
        </div>
        
        <!-- 翻牌階段（含結果顯示） -->
        <div id="reveal-phase" class="hidden">
          <div class="reveal-container">
            <div class="reveal-instruction text-center">
              <p class="text-secondary" id="reveal-instruction-text" data-i18n="solo.readyToReveal">準備好要翻牌了嗎？</p>
            </div>
            
            <div class="reveal-card-wrapper" id="reveal-card-wrapper">
              <!-- 卡片會在這裡顯示 -->
            </div>
            
            <div class="reveal-actions" id="reveal-actions">
              <button class="btn btn-secondary btn-lg" id="back-to-select-btn">
                <span data-i18n="solo.backToSelect">重新選擇</span>
              </button>
              <button class="btn btn-primary btn-lg" id="flip-btn">
                <span data-i18n="solo.flip">翻牌</span>
              </button>
            </div>
            
            <!-- 翻牌後顯示的按鈕 -->
            <div class="result-actions hidden" id="result-actions">
              <button class="btn btn-secondary btn-lg" id="save-history-btn">
                <span data-i18n="solo.saveToHistory">儲存到歷史</span>
              </button>
              <button class="btn btn-primary btn-lg" id="new-round-btn">
                <span data-i18n="solo.newRound">新的一輪</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    <style>
      .solo-page {
        display: flex;
        flex-direction: column;
        min-height: calc(100vh - 80px);
      }
      
      .solo-instruction,
      .reveal-instruction {
        padding: var(--spacing-lg) 0;
      }
      
      .cards-container {
        flex: 1;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding: var(--spacing-md) 0;
        padding-bottom: 180px;
      }
      
      .solo-actions {
        position: sticky;
        bottom: 0;
        background: var(--color-bg-primary);
        padding: var(--spacing-lg) 0;
        border-top: 1px solid var(--color-border);
      }
      
      .selected-display {
        text-align: center;
        margin-bottom: var(--spacing-md);
        font-size: var(--font-size-lg);
        min-height: 28px;
      }
      
      .selected-value {
        font-family: var(--font-display);
        font-size: var(--font-size-2xl);
        font-weight: 700;
        color: var(--color-primary-light);
      }
      
      .action-buttons {
        display: flex;
        gap: var(--spacing-md);
        justify-content: center;
      }
      
      /* Reveal Phase Styles */
      .reveal-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: calc(100vh - 200px);
        padding: var(--spacing-xl);
      }
      
      .reveal-card-wrapper {
        width: 180px;
        height: 252px;
        margin: var(--spacing-xl) 0;
        perspective: 1000px;
      }
      
      .reveal-card {
        width: 100%;
        height: 100%;
        position: relative;
        transform-style: preserve-3d;
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
      }
      
      .reveal-card.flipped {
        transform: perspective(1000px) rotateY(180deg);
      }
      
      /* 當使用陀螺儀或 hover 時，只在傾斜時移除 transition，翻牌時保留 */
      .reveal-card.interactive {
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      /* 當卡片正在傾斜時，移除 transition 以獲得即時響應 */
      .reveal-card.interactive.tilting {
        transition: none;
      }
      
      /* 當卡片正在翻牌時，確保 transition 生效，並且 hover 效果不會干擾 */
      .reveal-card.interactive.flipping {
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important;
      }
      
      .reveal-card .card-face {
        position: absolute;
        inset: 0;
        backface-visibility: hidden;
        border-radius: var(--card-border-radius);
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--card-bg);
        border: var(--card-border);
        box-shadow: var(--card-shadow-hover);
        overflow: hidden;
      }
      
      .reveal-card .card-front {
        transform: rotateY(180deg);
      }
      
      .reveal-card .card-back {
        transform: rotateY(0deg);
      }
      
      .reveal-card .card-value {
        font-family: var(--font-display);
        font-size: 3.5rem;
        font-weight: 700;
        color: var(--color-text-primary);
      }
      
      .reveal-card .card-front .card-value {
        background: linear-gradient(135deg, var(--color-primary-light), var(--color-accent));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .reveal-card .card-holo {
        position: absolute;
        inset: 0;
        border-radius: var(--card-border-radius);
        background: conic-gradient(
          from 0deg,
          var(--holo-color-1),
          var(--holo-color-2),
          var(--holo-color-3),
          var(--holo-color-4),
          var(--holo-color-5),
          var(--holo-color-6),
          var(--holo-color-1)
        );
        opacity: 0.2;
        mix-blend-mode: color-dodge;
        animation: holoRotate 4s linear infinite;
      }
      
      /* Card back pattern */
      .reveal-card .card-back {
        background: 
          repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(99, 102, 241, 0.1) 10px,
            rgba(99, 102, 241, 0.1) 20px
          ),
          var(--card-bg);
      }
      
      .reveal-card .card-back .card-value {
        opacity: 0.6;
      }
      
      .reveal-actions,
      .result-actions {
        display: flex;
        gap: var(--spacing-md);
        justify-content: center;
        margin-top: var(--spacing-lg);
        min-height: 60px; /* 固定最小高度，避免按鈕切換時高度跳動 */
        align-items: center;
      }
      
      /* 移除原本的 hover hint，因為現在由 JavaScript 控制 */
      
      .hidden {
        display: none !important;
      }
      
      /* Revealed state instruction */
      .reveal-instruction .revealed-text {
        color: var(--color-primary-light);
        font-weight: 500;
      }
      
      .click-hint {
        font-size: var(--font-size-sm);
        color: var(--color-text-muted);
        margin-top: var(--spacing-xs);
      }
      
      @media (max-width: 767px) {
        .action-buttons,
        .reveal-actions,
        .result-actions {
          flex-direction: column;
          width: 100%;
          max-width: 300px;
          margin: 0 auto;
        }
        
        .action-buttons .btn,
        .reveal-actions .btn,
        .result-actions .btn {
          width: 100%;
        }
        
        .reveal-card-wrapper {
          width: 150px;
          height: 210px;
        }
        
        .reveal-card .card-value {
          font-size: 2.5rem;
        }
      }
    </style>
  `;

  // 套用翻譯
  i18n.applyTranslations();
  
  // 初始化卡片效果
  const cardsContainer = document.getElementById('cards-container');
  initCardTiltEffect(cardsContainer);
  
  // 設定事件監聽
  setupEventListeners();
  
  // 返回清理函數
  return () => {
    selectedCard = null;
    isConfirmed = false;
    isRevealed = false;
  };
}

/**
 * 設定事件監聽
 */
function setupEventListeners() {
  const cardsContainer = document.getElementById('cards-container');
  const selectedDisplay = document.getElementById('selected-display');
  const confirmBtn = document.getElementById('confirm-btn');
  const backToSelectBtn = document.getElementById('back-to-select-btn');
  const flipBtn = document.getElementById('flip-btn');
  const saveHistoryBtn = document.getElementById('save-history-btn');
  const newRoundBtn = document.getElementById('new-round-btn');
  
  // 卡片選擇
  setupCardSelection(cardsContainer, (value) => {
    selectedCard = value;
    const card = CARD_SET.find(c => c.value === value);
    
    selectedDisplay.innerHTML = `
      <span data-i18n="solo.selectedCard">已選擇</span>: 
      <span class="selected-value">${card.label}</span>
    `;
    i18n.applyTranslations();
    
    confirmBtn.classList.remove('hidden');
  });
  
  // 確認選擇按鈕 -> 進入翻牌階段
  confirmBtn.addEventListener('click', () => {
    if (!selectedCard) {
      showToast(i18n.t('solo.noCardSelected'), 'warning');
      return;
    }
    
    goToRevealPhase();
  });
  
  // 返回選擇階段
  backToSelectBtn.addEventListener('click', () => {
    goToSelectPhase();
  });
  
  // 翻牌按鈕
  flipBtn.addEventListener('click', () => {
    toggleFlip();
  });
  
  // 翻牌區域點擊可以翻牌/翻回
  const revealCardWrapper = document.getElementById('reveal-card-wrapper');
  revealCardWrapper.addEventListener('click', () => {
    toggleFlip();
  });
  
  // 儲存到歷史
  saveHistoryBtn.addEventListener('click', () => {
    if (selectedCard) {
      addHistory({
        value: selectedCard,
        mode: 'solo'
      });
      toastSuccess(i18n.t('solo.saved'));
      saveHistoryBtn.disabled = true;
      saveHistoryBtn.textContent = '✓ ' + i18n.t('solo.saved');
    }
  });
  
  // 新一輪
  newRoundBtn.addEventListener('click', () => {
    resetAndStartNew();
  });
  
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
}

/**
 * 進入翻牌階段
 */
function goToRevealPhase() {
  isConfirmed = true;
  isRevealed = false;
  
  const selectPhase = document.getElementById('select-phase');
  const revealPhase = document.getElementById('reveal-phase');
  const revealCardWrapper = document.getElementById('reveal-card-wrapper');
  
  const card = CARD_SET.find(c => c.value === selectedCard);
  
  // 渲染卡片（背面朝上）
  revealCardWrapper.innerHTML = `
    <div class="reveal-card" id="reveal-card">
      <div class="card-face card-front">
        <div class="card-holo"></div>
        <div class="card-content">
          <span class="card-value">${card.label}</span>
        </div>
      </div>
      <div class="card-face card-back">
        <div class="card-content">
          <span class="card-value">?</span>
        </div>
      </div>
    </div>
  `;
  
  // 更新 UI 狀態
  updateRevealPhaseUI();
  
  // 切換階段
  selectPhase.classList.add('hidden');
  revealPhase.classList.remove('hidden');
  
  // 初始化卡片互動效果（陀螺儀或 hover）
  initRevealCardInteraction();
}

/**
 * 返回選擇階段
 */
function goToSelectPhase() {
  isConfirmed = false;
  isRevealed = false;
  
  // 清理互動效果
  cleanupRevealCardInteraction();
  
  const selectPhase = document.getElementById('select-phase');
  const revealPhase = document.getElementById('reveal-phase');
  
  selectPhase.classList.remove('hidden');
  revealPhase.classList.add('hidden');
}

/**
 * 切換翻牌狀態
 */
function toggleFlip() {
  const revealCard = document.getElementById('reveal-card');
  
  // 標記為正在翻牌，這會暫時禁用 hover/陀螺儀效果
  revealCard.classList.add('flipping');
  revealCard.classList.remove('tilting');
  
  // 清除當前的 transform，讓 CSS 類別控制翻牌動畫
  revealCard.style.transform = '';
  
  if (isRevealed) {
    // 翻回背面
    revealCard.classList.remove('flipped');
    isRevealed = false;
  } else {
    // 翻到正面
    revealCard.classList.add('flipped');
    isRevealed = true;
  }
  
  // 監聽翻牌動畫完成
  const handleTransitionEnd = (e) => {
    // 確保是 transform 的 transition 結束
    if (e.propertyName === 'transform') {
      revealCard.classList.remove('flipping');
      revealCard.removeEventListener('transitionend', handleTransitionEnd);
      
      // 更新傾斜效果的基礎角度（動畫完成後）
      updateTiltBaseAngle();
    }
  };
  
  revealCard.addEventListener('transitionend', handleTransitionEnd, { once: true });
  
  // 更新 UI
  updateRevealPhaseUI();
}

/**
 * 更新傾斜效果的基礎角度（根據翻牌狀態）
 */
function updateTiltBaseAngle() {
  const revealCard = document.getElementById('reveal-card');
  if (!revealCard) return;
  
  // 如果卡片有互動效果，需要更新基礎角度
  if (revealCard.classList.contains('interactive')) {
    // 如果沒有正在傾斜，清除 inline style 讓 CSS transition 生效
    if (!revealCard.classList.contains('tilting')) {
      // 清除 transform，讓 CSS 類別控制翻牌動畫
      revealCard.style.transform = '';
    } else {
      // 如果正在傾斜，需要更新基礎角度但保持傾斜
      // 實際的傾斜角度會在下一次事件觸發時更新
      const isFlipped = revealCard.classList.contains('flipped');
      const baseRotateY = isFlipped ? 180 : 0;
      
      // 嘗試從現有的 transform 中提取傾斜角度
      const currentTransform = revealCard.style.transform;
      let rotateX = 0;
      let rotateY = 0;
      
      if (currentTransform) {
        const rotateXMatch = currentTransform.match(/rotateX\(([^)]+)\)/);
        const rotateYMatch = currentTransform.match(/rotateY\(([^)]+)\)/);
        if (rotateXMatch) rotateX = parseFloat(rotateXMatch[1]) || 0;
        if (rotateYMatch) {
          const totalRotateY = parseFloat(rotateYMatch[1]) || 0;
          // 從總角度中提取純傾斜角度（減去之前的基礎角度）
          const prevBaseRotateY = isFlipped ? 0 : 180;
          rotateY = totalRotateY - prevBaseRotateY;
        }
      }
      
      // 套用新的基礎角度和傾斜角度
      revealCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${baseRotateY + rotateY}deg)`;
    }
  }
}

/**
 * 更新翻牌階段的 UI
 */
function updateRevealPhaseUI() {
  const instructionText = document.getElementById('reveal-instruction-text');
  const revealActions = document.getElementById('reveal-actions');
  const resultActions = document.getElementById('result-actions');
  const flipBtn = document.getElementById('flip-btn');
  const saveHistoryBtn = document.getElementById('save-history-btn');
  
  if (isRevealed) {
    // 已翻開狀態
    const card = CARD_SET.find(c => c.value === selectedCard);
    instructionText.innerHTML = `
      <span class="revealed-text" data-i18n="solo.yourChoice">你的選擇</span>: 
      <span class="selected-value">${card.label}</span>
      <div class="click-hint" data-i18n="solo.clickToHide">點擊卡片可翻回背面</div>
    `;
    
    // 顯示結果按鈕，隱藏翻牌按鈕
    revealActions.classList.add('hidden');
    resultActions.classList.remove('hidden');
    
    // 重設儲存按鈕狀態
    saveHistoryBtn.disabled = false;
    saveHistoryBtn.innerHTML = `<span data-i18n="solo.saveToHistory">儲存到歷史</span>`;
  } else {
    // 未翻開狀態
    instructionText.innerHTML = `<span data-i18n="solo.readyToReveal">準備好要翻牌了嗎？</span>`;
    
    // 顯示翻牌按鈕，隱藏結果按鈕
    revealActions.classList.remove('hidden');
    resultActions.classList.add('hidden');
  }
  
  i18n.applyTranslations();
}

/**
 * 重設並開始新一輪
 */
function resetAndStartNew() {
  selectedCard = null;
  isConfirmed = false;
  isRevealed = false;
  
  const selectPhase = document.getElementById('select-phase');
  const revealPhase = document.getElementById('reveal-phase');
  const selectedDisplay = document.getElementById('selected-display');
  const confirmBtn = document.getElementById('confirm-btn');
  const cardsContainer = document.getElementById('cards-container');
  
  // 重設顯示
  selectedDisplay.innerHTML = `<span class="text-muted" data-i18n="solo.selectCard">請選擇一張牌</span>`;
  i18n.applyTranslations();
  
  confirmBtn.classList.add('hidden');
  
  // 移除所有卡片的選擇狀態
  cardsContainer.querySelectorAll('.card').forEach(card => {
    card.classList.remove('selected');
  });
  
  // 清理互動效果
  cleanupRevealCardInteraction();
  
  // 切換到選擇階段
  selectPhase.classList.remove('hidden');
  revealPhase.classList.add('hidden');
}

/**
 * 檢測是否支援陀螺儀
 * @returns {boolean} 是否支援陀螺儀
 */
function isGyroscopeSupported() {
  return 'DeviceOrientationEvent' in window && 
         typeof DeviceOrientationEvent.requestPermission === 'function';
}

/**
 * 請求陀螺儀權限（iOS 13+）
 * @returns {Promise<boolean>} 是否獲得權限
 */
async function requestGyroscopePermission() {
  try {
    if (isGyroscopeSupported()) {
      const permission = await DeviceOrientationEvent.requestPermission();
      return permission === 'granted';
    }
    return true; // 非 iOS 13+ 不需要權限
  } catch (error) {
    console.warn('陀螺儀權限請求失敗:', error);
    return false;
  }
}

/**
 * 檢測是否有滑鼠輸入裝置
 * @returns {Promise<boolean>} 是否有滑鼠輸入
 */
function hasMouseInput() {
  return new Promise((resolve) => {
    // 方法 1: 使用 Media Query 檢測精確指標（滑鼠）
    if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
      resolve(true);
      return;
    }
    
    // 方法 2: 檢測是否為觸控裝置
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // 如果沒有觸控支援，假設有滑鼠
    if (!isTouchDevice) {
      resolve(true);
      return;
    }
    
    // 方法 3: 如果有觸控支援，等待一小段時間看是否有滑鼠移動
    // 這適用於混合裝置（如 Surface）
    let hasMouseMoved = false;
    const mouseMoveHandler = () => {
      hasMouseMoved = true;
    };
    
    window.addEventListener('mousemove', mouseMoveHandler, { once: true, passive: true });
    
    // 等待 200ms 檢測是否有滑鼠移動
    setTimeout(() => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      resolve(hasMouseMoved);
    }, 200);
  });
}

/**
 * 初始化翻牌階段的卡片互動效果
 */
async function initRevealCardInteraction() {
  const revealCard = document.getElementById('reveal-card');
  const revealCardWrapper = document.getElementById('reveal-card-wrapper');
  
  if (!revealCard || !revealCardWrapper) return;
  
  // 優先檢測是否有滑鼠輸入（滑鼠優先）
  const hasMouse = await hasMouseInput();
  
  if (hasMouse) {
    // 偵測到滑鼠，優先使用 hover 效果
    initHoverTilt(revealCardWrapper, revealCard);
  } else {
    // 沒有滑鼠，檢測是否支援陀螺儀
    const hasGyroscope = 'DeviceOrientationEvent' in window;
    
    if (hasGyroscope) {
      // 嘗試請求權限（iOS 13+）
      const hasPermission = await requestGyroscopePermission();
      
      if (hasPermission) {
        // 使用陀螺儀效果
        initGyroscopeTilt(revealCard);
      } else {
        // 權限被拒絕，使用 hover 效果作為備用
        initHoverTilt(revealCardWrapper, revealCard);
      }
    } else {
      // 不支援陀螺儀，使用 hover 效果
      initHoverTilt(revealCardWrapper, revealCard);
    }
  }
}

/**
 * 初始化陀螺儀傾斜效果
 * @param {HTMLElement} card - 卡片元素
 */
function initGyroscopeTilt(card) {
  // 清理之前的處理器
  if (gyroscopeHandler) {
    window.removeEventListener('deviceorientation', gyroscopeHandler);
  }
  
  // 標記為互動模式
  card.classList.add('interactive');
  
  gyroscopeHandler = (event) => {
    // 如果正在翻牌，不更新 transform
    if (card.classList.contains('flipping')) {
      return;
    }
    
    // 取得裝置傾斜角度
    // beta: 前後傾斜（-180 到 180）
    // gamma: 左右傾斜（-90 到 90）
    const beta = event.beta || 0;   // 前後傾斜
    const gamma = event.gamma || 0; // 左右傾斜
    
    // 限制傾斜角度範圍（最大 15 度）
    // 將 beta 和 gamma 映射到 -15 到 15 度之間
    const maxTilt = 15;
    const rotateX = Math.max(-maxTilt, Math.min(maxTilt, beta * 0.15));
    const rotateY = Math.max(-maxTilt, Math.min(maxTilt, gamma * 0.15));
    
    // 標記為正在傾斜，移除 transition
    card.classList.add('tilting');
    
    // 套用 3D 傾斜效果
    // 注意：翻牌狀態下需要保留 rotateY(180deg)，所以需要調整
    const isFlipped = card.classList.contains('flipped');
    const baseRotateY = isFlipped ? 180 : 0;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${baseRotateY + rotateY}deg)`;
  };
  
  window.addEventListener('deviceorientation', gyroscopeHandler);
}

/**
 * 初始化滑鼠 hover 傾斜效果
 * @param {HTMLElement} wrapper - 卡片容器元素
 * @param {HTMLElement} card - 卡片元素
 */
function initHoverTilt(wrapper, card) {
  // 清理之前的處理器
  if (hoverHandler) {
    wrapper.removeEventListener('mousemove', hoverHandler);
    wrapper.removeEventListener('mouseleave', hoverHandler);
  }
  
  // 標記為互動模式
  card.classList.add('interactive');
  
  const handleMouseMove = (e) => {
    // 如果正在翻牌，不更新 transform
    if (card.classList.contains('flipping')) {
      return;
    }
    
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // 計算旋轉角度（最大 15 度）
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    // 標記為正在傾斜，移除 transition
    card.classList.add('tilting');
    
    // 套用 3D 傾斜效果
    // 注意：翻牌狀態下需要保留 rotateY(180deg)，所以需要調整
    const isFlipped = card.classList.contains('flipped');
    const baseRotateY = isFlipped ? 180 : 0;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${baseRotateY + rotateY}deg)`;
  };
  
  const handleMouseLeave = () => {
    // 移除傾斜標記，恢復 transition
    card.classList.remove('tilting');
    
    // 重設為原始狀態
    const isFlipped = card.classList.contains('flipped');
    const baseRotateY = isFlipped ? 180 : 0;
    card.style.transform = `perspective(1000px) rotateY(${baseRotateY}deg)`;
  };
  
  hoverHandler = handleMouseMove;
  
  wrapper.addEventListener('mousemove', handleMouseMove);
  wrapper.addEventListener('mouseleave', handleMouseLeave);
}

/**
 * 清理翻牌階段的卡片互動效果
 */
function cleanupRevealCardInteraction() {
  // 清理陀螺儀事件
  if (gyroscopeHandler) {
    window.removeEventListener('deviceorientation', gyroscopeHandler);
    gyroscopeHandler = null;
  }
  
  // 清理 hover 事件
  const revealCardWrapper = document.getElementById('reveal-card-wrapper');
  if (revealCardWrapper && hoverHandler) {
    revealCardWrapper.removeEventListener('mousemove', hoverHandler);
    revealCardWrapper.removeEventListener('mouseleave', hoverHandler);
    hoverHandler = null;
  }
  
  // 重設卡片變換和類別
  const revealCard = document.getElementById('reveal-card');
  if (revealCard) {
    revealCard.classList.remove('interactive', 'tilting', 'flipping');
    const isFlipped = revealCard.classList.contains('flipped');
    const baseRotateY = isFlipped ? 180 : 0;
    revealCard.style.transform = `perspective(1000px) rotateY(${baseRotateY}deg)`;
  }
}
