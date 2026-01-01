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
        transform: rotateY(180deg);
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
      
      /* Hover hint for flip */
      .reveal-card-wrapper:hover .reveal-card:not(.flipped) {
        transform: rotateY(15deg);
      }
      
      /* Hover hint for unflip */
      .reveal-card-wrapper:hover .reveal-card.flipped {
        transform: rotateY(165deg);
      }
      
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
}

/**
 * 返回選擇階段
 */
function goToSelectPhase() {
  isConfirmed = false;
  isRevealed = false;
  
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
  
  if (isRevealed) {
    // 翻回背面
    revealCard.classList.remove('flipped');
    isRevealed = false;
  } else {
    // 翻到正面
    revealCard.classList.add('flipped');
    isRevealed = true;
  }
  
  // 更新 UI
  updateRevealPhaseUI();
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
  
  // 切換到選擇階段
  selectPhase.classList.remove('hidden');
  revealPhase.classList.add('hidden');
}
