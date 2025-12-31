/**
 * History Page
 * 歷史記錄頁面
 */

import { i18n } from '../utils/i18n.js';
import { theme } from '../utils/theme.js';
import { getHistory, clearHistory, removeHistory, formatTime } from '../data/history.js';
import { toastSuccess, showToast } from '../components/toast.js';
import { CARD_SET } from '../components/card.js';

/**
 * 渲染歷史記錄頁面
 */
export function renderHistory() {
  const app = document.getElementById('app');
  const history = getHistory();
  
  app.innerHTML = `
    <header class="header">
      <div class="container header-content">
        <a href="#/" class="btn btn-ghost" id="back-btn">
          ← <span data-i18n="common.back">返回</span>
        </a>
        <div class="logo" data-i18n="history.title">歷史記錄</div>
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
    
    <main class="page history-page">
      <div class="container">
        ${history.length > 0 ? `
          <div class="history-header">
            <p class="text-muted">共 ${history.length} 筆記錄</p>
            <button class="btn btn-secondary" id="clear-all-btn">
              <span data-i18n="history.clearAll">清除全部</span>
            </button>
          </div>
          
          <div class="history-list">
            ${history.map(record => renderHistoryItem(record)).join('')}
          </div>
        ` : `
          <div class="history-empty">
            <div class="empty-icon">📋</div>
            <p class="text-muted" data-i18n="history.empty">尚無歷史記錄</p>
            <a href="#/solo" class="btn btn-primary mt-lg">
              <span data-i18n="home.soloMode">開始估點</span>
            </a>
          </div>
        `}
      </div>
    </main>
    
    <!-- 確認 Modal -->
    <div class="modal-backdrop" id="confirm-modal">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title" data-i18n="common.confirm">確認</h3>
          <button class="modal-close" id="confirm-modal-close">✕</button>
        </div>
        <div class="modal-body">
          <p data-i18n="history.clearConfirm">確定要清除所有歷史記錄嗎？</p>
        </div>
        <div class="modal-actions">
          <button class="btn btn-secondary" id="confirm-cancel">
            <span data-i18n="common.cancel">取消</span>
          </button>
          <button class="btn btn-primary" id="confirm-ok" style="background: var(--color-error);">
            <span data-i18n="common.confirm">確認</span>
          </button>
        </div>
      </div>
    </div>
    
    <style>
      .history-page {
        min-height: calc(100vh - 80px);
      }
      
      .history-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--spacing-md) 0;
        border-bottom: 1px solid var(--color-border);
        margin-bottom: var(--spacing-lg);
      }
      
      .history-list {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
      }
      
      .history-item {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        padding: var(--spacing-md);
        background: var(--color-bg-secondary);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        transition: all var(--transition-fast);
      }
      
      .history-item:hover {
        border-color: var(--color-primary);
      }
      
      .history-card {
        width: 50px;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--card-bg);
        border: 2px solid var(--color-primary);
        border-radius: var(--radius-md);
        flex-shrink: 0;
      }
      
      .history-card-value {
        font-family: var(--font-display);
        font-size: var(--font-size-xl);
        font-weight: 700;
        color: var(--color-primary-light);
      }
      
      .history-info {
        flex: 1;
        min-width: 0;
      }
      
      .history-value {
        font-size: var(--font-size-lg);
        font-weight: 600;
        margin-bottom: var(--spacing-xs);
      }
      
      .history-meta {
        display: flex;
        gap: var(--spacing-md);
        font-size: var(--font-size-sm);
        color: var(--color-text-muted);
      }
      
      .history-mode {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-xs);
        padding: 2px 8px;
        background: var(--color-bg-tertiary);
        border-radius: var(--radius-full);
        font-size: var(--font-size-xs);
      }
      
      .history-delete {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: none;
        color: var(--color-text-muted);
        cursor: pointer;
        border-radius: var(--radius-md);
        transition: all var(--transition-fast);
        flex-shrink: 0;
      }
      
      .history-delete:hover {
        background: var(--color-error);
        color: white;
      }
      
      .history-empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: var(--spacing-2xl);
        text-align: center;
      }
      
      .empty-icon {
        font-size: 4rem;
        margin-bottom: var(--spacing-lg);
        opacity: 0.5;
      }
      
      .modal-body {
        padding: var(--spacing-lg) 0;
      }
      
      .modal-actions {
        display: flex;
        gap: var(--spacing-md);
        justify-content: flex-end;
      }
      
      @media (max-width: 767px) {
        .history-meta {
          flex-direction: column;
          gap: var(--spacing-xs);
        }
      }
    </style>
  `;

  // 套用翻譯
  i18n.applyTranslations();
  
  // 設定事件監聽
  setupEventListeners();
}

/**
 * 渲染單筆歷史記錄
 */
function renderHistoryItem(record) {
  const card = CARD_SET.find(c => c.value === record.value) || { label: record.value };
  const modeText = getModeText(record.mode);
  const timeText = formatTime(record.timestamp);
  
  return `
    <div class="history-item" data-id="${record.id}">
      <div class="history-card">
        <span class="history-card-value">${card.label}</span>
      </div>
      <div class="history-info">
        <div class="history-value">${card.label}</div>
        <div class="history-meta">
          <span class="history-mode">${modeText}</span>
          <span class="history-time">${timeText}</span>
        </div>
      </div>
      <button class="history-delete" data-id="${record.id}" title="刪除">
        🗑️
      </button>
    </div>
  `;
}

/**
 * 取得模式文字
 */
function getModeText(mode) {
  const modeMap = {
    solo: '🎴 ' + i18n.t('history.solo'),
    host: '🏠 ' + i18n.t('history.host'),
    client: '👤 ' + i18n.t('history.client')
  };
  return modeMap[mode] || mode;
}

/**
 * 設定事件監聯
 */
function setupEventListeners() {
  // 清除全部按鈕
  const clearAllBtn = document.getElementById('clear-all-btn');
  const confirmModal = document.getElementById('confirm-modal');
  const confirmCancel = document.getElementById('confirm-cancel');
  const confirmOk = document.getElementById('confirm-ok');
  const confirmModalClose = document.getElementById('confirm-modal-close');
  
  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      confirmModal.classList.add('active');
    });
  }
  
  if (confirmCancel) {
    confirmCancel.addEventListener('click', () => {
      confirmModal.classList.remove('active');
    });
  }
  
  if (confirmModalClose) {
    confirmModalClose.addEventListener('click', () => {
      confirmModal.classList.remove('active');
    });
  }
  
  if (confirmOk) {
    confirmOk.addEventListener('click', () => {
      clearHistory();
      confirmModal.classList.remove('active');
      toastSuccess(i18n.t('history.clearAll'));
      renderHistory(); // 重新渲染頁面
    });
  }
  
  // 單筆刪除
  document.querySelectorAll('.history-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      removeHistory(id);
      
      // 移除 DOM 元素
      const item = document.querySelector(`.history-item[data-id="${id}"]`);
      if (item) {
        item.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => {
          item.remove();
          
          // 檢查是否還有記錄
          const remaining = document.querySelectorAll('.history-item');
          if (remaining.length === 0) {
            renderHistory(); // 重新渲染顯示空狀態
          }
        }, 300);
      }
    });
  });
  
  // Modal 背景點擊關閉
  if (confirmModal) {
    confirmModal.addEventListener('click', (e) => {
      if (e.target === confirmModal) {
        confirmModal.classList.remove('active');
      }
    });
  }
  
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
      renderHistory(); // 重新渲染以更新語言
    });
  }
}

