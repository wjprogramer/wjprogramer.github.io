/**
 * History Page
 * 歷史記錄頁面
 */

import { i18n } from '../utils/i18n.js';
import { theme } from '../utils/theme.js';
import { getHistory, clearHistory, removeHistory, formatTime, toggleStar, getStarredCount } from '../data/history.js';
import { toastSuccess, showToast, toastError } from '../components/toast.js';
import { CARD_SET } from '../components/card.js';
import { router } from '../router.js';

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
    
    <main class="page history-page">
      <div class="container">
        ${history.length > 0 ? `
          <div class="history-header">
            <div>
              <p class="text-muted">共 ${history.length} 筆記錄${getStarredCount() > 0 ? `，${getStarredCount()} 筆已標記` : ''}</p>
              <p class="history-hint" data-i18n="history.limitHint">最多可保存 10 筆記錄，已標記的記錄不會被自動刪除</p>
            </div>
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
    
    <!-- 確認 Modal (清除全部) -->
    <div class="modal-backdrop" id="confirm-modal">
      <div class="modal confirm-modal-danger">
        <div class="modal-header">
          <h3 data-i18n="common.confirm">確認</h3>
          <button class="btn btn-ghost btn-icon" id="confirm-modal-close">×</button>
        </div>
        <div class="modal-body">
          <p data-i18n="history.clearConfirm">確定要清除所有歷史記錄嗎？</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" id="confirm-cancel">
            <span data-i18n="common.cancel">取消</span>
          </button>
          <button class="btn btn-danger" id="confirm-ok">
            <span data-i18n="common.confirm">確認</span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- 確認 Modal (單筆刪除) -->
    <div class="modal-backdrop" id="delete-confirm-modal">
      <div class="modal confirm-modal-danger">
        <div class="modal-header">
          <h3 data-i18n="common.confirm">確認</h3>
          <button class="btn btn-ghost btn-icon" id="delete-confirm-modal-close">×</button>
        </div>
        <div class="modal-body">
          <p data-i18n="history.deleteConfirm">確定要刪除此筆歷史記錄嗎？此操作無法復原。</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" id="delete-confirm-cancel">
            <span data-i18n="common.cancel">取消</span>
          </button>
          <button class="btn btn-danger" id="delete-confirm-ok">
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
        gap: var(--spacing-md);
      }
      
      .history-hint {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        margin-top: var(--spacing-xs);
        line-height: 1.4;
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
      
      .history-item.has-details {
        cursor: pointer;
      }
      
      .history-item:hover {
        border-color: var(--color-primary);
      }
      
      .history-value {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs);
      }
      
      .history-issue-title {
        font-weight: 600;
        color: var(--color-primary);
        font-size: var(--font-size-sm);
      }
      
      .history-card-label {
        font-size: var(--font-size-lg);
      }
      
      .history-participants {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-xs);
      }
      
      .history-actions {
        display: flex;
        gap: var(--spacing-sm);
        align-items: center;
      }
      
      .history-view-details {
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
      
      .history-view-details:hover {
        background: var(--color-primary);
        color: white;
      }
      
      .history-star {
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
        font-size: 20px;
      }
      
      .history-star:hover {
        background: var(--color-bg-tertiary);
        transform: scale(1.1);
      }
      
      .history-star.starred {
        color: #ffd700;
      }
      
      .history-star.starred:hover {
        background: var(--color-bg-tertiary);
        color: #ffed4e;
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
        padding: var(--spacing-lg);
      }
      
      .modal-body p {
        margin: 0;
        color: var(--color-text-primary);
        line-height: 1.6;
      }
      
      .modal-footer {
        display: flex;
        gap: var(--spacing-md);
        justify-content: flex-end;
        padding: var(--spacing-lg);
        border-top: 1px solid var(--color-border);
      }
      
      .modal-footer .btn {
        min-width: 80px;
      }
      
      .confirm-modal-danger .modal-footer .btn-danger {
        background: var(--color-error);
        border-color: var(--color-error);
        color: white;
      }
      
      .confirm-modal-danger .modal-footer .btn-danger:hover:not(:disabled) {
        background: var(--color-error);
        color: white;
        opacity: 0.9;
      }
      
      .modal-header h3 {
        margin: 0;
        font-size: var(--font-size-xl);
        font-weight: 600;
        color: var(--color-text-primary);
      }
      
      .modal-header .btn-ghost.btn-icon {
        width: 32px;
        height: 32px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font-size-xl);
        line-height: 1;
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
  // 判斷顯示的卡片值
  let displayValue = record.value;
  let displayLabel = record.value;
  
  // 會議記錄包含多個 issue
  if (record.issues && Array.isArray(record.issues) && record.issues.length > 0) {
    // 顯示最後一個完成的 issue 的最終決定，或第一個 issue 的第一輪結果
    const completedIssues = record.issues.filter(i => i.finalDecision);
    if (completedIssues.length > 0) {
      const lastIssue = completedIssues[completedIssues.length - 1];
      displayValue = lastIssue.finalDecision;
      displayLabel = lastIssue.finalDecision;
    } else if (record.issues[0].rounds && record.issues[0].rounds.length > 0) {
      // 顯示第一個 issue 的第一輪結果的平均值（簡化顯示）
      displayValue = '-';
      displayLabel = '進行中';
    } else {
      displayValue = '-';
      displayLabel = '-';
    }
  } else if (record.value) {
    const card = CARD_SET.find(c => c.value === record.value);
    if (card) {
      displayLabel = card.label;
    }
  } else {
    displayValue = '-';
    displayLabel = '-';
  }
  
  const card = CARD_SET.find(c => c.value === displayValue) || { label: displayLabel };
  const modeText = getModeText(record.mode);
  const timeText = formatTime(record.timestamp);
  
  // 判斷是否有詳細資料
  const hasDetails = record.meetingId || (record.issues && record.issues.length > 0) || record.value;
  
  // 顯示會議資訊
  let issueInfo = '';
  if (record.issues && Array.isArray(record.issues)) {
    const issueCount = record.issues.length;
    const completedCount = record.issues.filter(i => i.finalDecision).length;
    if (issueCount > 0) {
      const displayName = record.meetingName || record.meetingId || '-';
      issueInfo = `<span class="history-issue-title">${escapeHtml(displayName)} (${completedCount}/${issueCount} Issues)</span>`;
    }
  }
  
  return `
    <div class="history-item ${hasDetails ? 'has-details' : ''}" data-id="${record.id}">
      <div class="history-card">
        <span class="history-card-value">${card.label}</span>
      </div>
      <div class="history-info">
        <div class="history-value">
          ${issueInfo}
          <span class="history-card-label">${card.label}</span>
        </div>
        <div class="history-meta">
          <span class="history-mode">${modeText}</span>
          <span class="history-time">${timeText}</span>
          ${record.participants ? `<span class="history-participants">👥 ${record.participants}</span>` : ''}
        </div>
      </div>
      <div class="history-actions">
        <button class="history-star ${record.starred === true ? 'starred' : ''}" data-id="${record.id}" title="${record.starred === true ? i18n.t('history.unstar') : i18n.t('history.star')}">
          ${record.starred === true ? '⭐' : '☆'}
        </button>
        ${hasDetails ? `
          <button class="history-view-details" data-id="${record.id}" title="查看詳細資料">
            👁️
          </button>
        ` : ''}
        <button class="history-delete" data-id="${record.id}" title="刪除">
          🗑️
        </button>
      </div>
    </div>
  `;
}

/**
 * HTML 跳脫
 */
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
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
  
  // Star/Unstar 按鈕
  document.querySelectorAll('.history-star').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const newStarred = toggleStar(id);
      
      if (newStarred === false && !btn.classList.contains('starred')) {
        // 達到上限
        toastError(i18n.t('history.maxStarredReached', { max: 9 }));
        return;
      }
      
      // 更新 UI
      if (newStarred) {
        btn.classList.add('starred');
        btn.innerHTML = '⭐';
        btn.title = i18n.t('history.unstar');
        toastSuccess(i18n.t('history.starred'));
      } else {
        btn.classList.remove('starred');
        btn.innerHTML = '☆';
        btn.title = i18n.t('history.star');
        toastSuccess(i18n.t('history.unstarred'));
      }
    });
  });
  
  // 查看詳細資料 - 導航到詳細頁面
  document.querySelectorAll('.history-view-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      router.navigate(`/history/${id}`);
    });
  });
  
  // 點擊 history item 也可以查看詳細資料（如果有）
  document.querySelectorAll('.history-item.has-details').forEach(item => {
    item.addEventListener('click', (e) => {
      // 如果點擊的是按鈕，不觸發
      if (e.target.closest('button')) return;
      const id = item.dataset.id;
      router.navigate(`/history/${id}`);
    });
  })
  
  // 單筆刪除
  const deleteConfirmModal = document.getElementById('delete-confirm-modal');
  const deleteConfirmCancel = document.getElementById('delete-confirm-cancel');
  const deleteConfirmOk = document.getElementById('delete-confirm-ok');
  const deleteConfirmModalClose = document.getElementById('delete-confirm-modal-close');
  let deleteTargetId = null;
  
  document.querySelectorAll('.history-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      deleteTargetId = id;
      if (deleteConfirmModal) {
        deleteConfirmModal.classList.add('active');
      }
    });
  });
  
  // 定義關閉函數
  const closeDeleteConfirmModal = () => {
    if (deleteConfirmModal) {
      deleteConfirmModal.classList.remove('active');
    }
    deleteTargetId = null;
  };
  
  if (deleteConfirmCancel) {
    deleteConfirmCancel.addEventListener('click', closeDeleteConfirmModal);
  }
  
  if (deleteConfirmModalClose) {
    deleteConfirmModalClose.addEventListener('click', closeDeleteConfirmModal);
  }
  
  if (deleteConfirmOk) {
    deleteConfirmOk.addEventListener('click', () => {
      if (deleteTargetId) {
        removeHistory(deleteTargetId);
        
        // 移除 DOM 元素
        const item = document.querySelector(`.history-item[data-id="${deleteTargetId}"]`);
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
        
        toastSuccess(i18n.t('history.deleted'));
        deleteTargetId = null;
      }
      if (deleteConfirmModal) {
        deleteConfirmModal.classList.remove('active');
      }
    });
  }
  
  // 刪除確認 Modal 背景點擊關閉
  if (deleteConfirmModal) {
    deleteConfirmModal.addEventListener('click', (e) => {
      if (e.target === deleteConfirmModal) {
        closeDeleteConfirmModal();
      }
    });
  }
  
  // 按 ESC 鍵取消刪除確認
  const handleEsc = (e) => {
    if (e.key === 'Escape' && deleteConfirmModal && deleteConfirmModal.classList.contains('active')) {
      closeDeleteConfirmModal();
    }
  };
  document.addEventListener('keydown', handleEsc);
  
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
        renderHistory(); // 重新渲染以更新語言
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


