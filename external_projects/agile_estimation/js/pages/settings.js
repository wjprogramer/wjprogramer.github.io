/**
 * Settings Page
 * 設定頁面 - 管理應用程式設定和資料
 */

import { i18n } from '../utils/i18n.js';
import { theme } from '../utils/theme.js';
import { storage } from '../utils/storage/index.js';
import { showToast, toastSuccess, toastError } from '../components/toast.js';
import { clearHistory } from '../data/history.js';

/**
 * 渲染設定頁面
 */
export function renderSettings() {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <header class="header">
      <div class="container header-content">
        <a href="#/" class="btn btn-ghost" id="back-btn">
          ← <span data-i18n="common.back">返回</span>
        </a>
        <div class="logo" data-i18n="settings.title">設定</div>
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
    
    <main class="page settings-page">
      <div class="container">
        <!-- 外觀設定 -->
        <div class="settings-section">
          <h2 data-i18n="settings.appearance">外觀</h2>
          
          <div class="settings-group">
            <div class="setting-item">
              <label for="theme-select" data-i18n="settings.theme">主題</label>
              <p class="setting-desc" data-i18n="settings.themeDesc">選擇顯示主題</p>
              <select id="theme-select" class="form-select">
                <option value="auto" data-i18n="settings.themeSystem">跟隨系統</option>
                <option value="dark" data-i18n="settings.themeDark">深色</option>
                <option value="light" data-i18n="settings.themeLight">淺色</option>
              </select>
            </div>
            
            <div class="setting-item">
              <label for="language-select" data-i18n="settings.language">語言</label>
              <p class="setting-desc" data-i18n="settings.languageDesc">選擇顯示語言</p>
              <select id="language-select" class="form-select">
                <option value="zh-TW">繁體中文</option>
                <option value="zh-CN">简体中文</option>
                <option value="en">English</option>
                <option value="ja">日本語</option>
              </select>
            </div>
          </div>
        </div>
        
        <!-- 資料管理 -->
        <div class="settings-section">
          <h2 data-i18n="settings.data">資料</h2>
          
          <div class="settings-group">
            <div class="setting-item">
              <label data-i18n="settings.clearHistory">清除歷史記錄</label>
              <p class="setting-desc" data-i18n="settings.clearHistoryDesc">刪除所有估點歷史記錄</p>
              <button class="btn btn-secondary" id="clear-history-btn">
                <span data-i18n="settings.clearHistory">清除歷史記錄</span>
              </button>
            </div>
            
            <div class="setting-item">
              <label data-i18n="settings.clearAllData">清除全部資料</label>
              <p class="setting-desc" data-i18n="settings.clearAllDataDesc">刪除所有應用程式資料（設定、歷史記錄、黑名單等）</p>
              <button class="btn btn-danger" id="clear-all-data-btn">
                <span data-i18n="settings.clearAllData">清除全部資料</span>
              </button>
            </div>
          </div>
        </div>
        
        <!-- 關於 -->
        <div class="settings-section">
          <h2 data-i18n="settings.about">關於</h2>
          <div class="settings-group">
            <div class="setting-item">
              <p class="setting-desc">
                <span data-i18n="settings.version">版本</span>: 1.0.0
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    <style>
      .settings-page {
        padding: var(--spacing-lg) 0;
      }
      
      .settings-section {
        background: var(--color-bg-secondary);
        border-radius: var(--radius-lg);
        padding: var(--spacing-lg);
        margin-bottom: var(--spacing-lg);
      }
      
      .settings-section h2 {
        font-size: var(--font-size-lg);
        font-weight: 600;
        margin-bottom: var(--spacing-md);
        color: var(--color-text-primary);
      }
      
      .settings-group {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
      }
      
      .setting-item {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs);
      }
      
      .setting-item label {
        font-weight: 500;
        color: var(--color-text-primary);
      }
      
      .setting-desc {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        margin: 0;
      }
      
      .form-select {
        width: 100%;
        padding: var(--spacing-sm) var(--spacing-md);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: var(--color-bg-primary);
        color: var(--color-text-primary);
        font-size: var(--font-size-base);
        cursor: pointer;
      }
      
      .form-select:focus {
        outline: none;
        border-color: var(--color-primary);
      }
      
      .btn-danger {
        background: var(--color-error);
        color: white;
        border: none;
      }
      
      .btn-danger:hover {
        background: var(--color-error-dark, #c53030);
      }
      
      @media (max-width: 767px) {
        .settings-section {
          padding: var(--spacing-md);
        }
      }
    </style>
  `;
  
  // 套用翻譯
  i18n.applyTranslations();
  
  // 載入當前設定
  loadSettings();
  
  // 設定事件監聽
  setupEventListeners();
  
  // 返回清理函數
  return () => {
    // 清理工作（如果需要）
  };
}

/**
 * 載入當前設定
 */
function loadSettings() {
  const settings = storage.get('settings', {});
  
  // 載入主題設定
  const themeSelect = document.getElementById('theme-select');
  if (themeSelect) {
    themeSelect.value = settings.theme || 'auto';
  }
  
  // 載入語言設定
  const languageSelect = document.getElementById('language-select');
  if (languageSelect) {
    languageSelect.value = settings.language || i18n.getLanguage() || 'zh-TW';
  }
}

/**
 * 設定事件監聽
 */
function setupEventListeners() {
  // 主題切換按鈕
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const newTheme = theme.toggle();
      themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
      
      // 更新下拉選單
      const themeSelect = document.getElementById('theme-select');
      if (themeSelect) {
        themeSelect.value = newTheme;
      }
    });
  }
  
  // 語言切換按鈕（循環切換：zh-TW -> zh-CN -> en -> ja -> zh-TW）
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', async () => {
      const currentLang = i18n.getLanguage();
      const languages = ['zh-TW', 'zh-CN', 'en', 'ja'];
      const currentIndex = languages.indexOf(currentLang);
      const nextIndex = (currentIndex + 1) % languages.length;
      const newLang = languages[nextIndex];
      
      await i18n.setLanguage(newLang);
      
      // 更新下拉選單
      const languageSelect = document.getElementById('language-select');
      if (languageSelect) {
        languageSelect.value = newLang;
      }
    });
  }
  
  // 主題下拉選單
  const themeSelect = document.getElementById('theme-select');
  if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
      const newTheme = e.target.value;
      theme.setTheme(newTheme);
      
      // 更新按鈕圖示
      if (themeToggle) {
        themeToggle.textContent = theme.isDark() ? '☀️' : '🌙';
      }
      
      // 儲存設定
      const settings = storage.get('settings', {});
      settings.theme = newTheme;
      storage.set('settings', settings);
    });
  }
  
  // 語言下拉選單
  const languageSelect = document.getElementById('language-select');
  if (languageSelect) {
    languageSelect.addEventListener('change', async (e) => {
      const newLang = e.target.value;
      await i18n.setLanguage(newLang);
      
      // 儲存設定
      const settings = storage.get('settings', {});
      settings.language = newLang;
      storage.set('settings', settings);
    });
  }
  
  // 清除歷史記錄
  const clearHistoryBtn = document.getElementById('clear-history-btn');
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', async () => {
      const confirmed = await showConfirmModal({
        title: i18n.t('common.confirm'),
        message: i18n.t('history.clearConfirm'),
        type: 'danger',
        confirmText: 'common.confirm',
        cancelText: 'common.cancel'
      });
      if (confirmed) {
        clearHistory();
        toastSuccess(i18n.t('history.clearAll'));
      }
    });
  }
  
  // 清除全部資料
  const clearAllDataBtn = document.getElementById('clear-all-data-btn');
  if (clearAllDataBtn) {
    clearAllDataBtn.addEventListener('click', async () => {
      const confirmed = await showConfirmModal({
        title: i18n.t('common.confirm'),
        message: i18n.t('settings.clearAllDataConfirm'),
        type: 'danger',
        confirmText: 'common.confirm',
        cancelText: 'common.cancel'
      });
      if (confirmed) {
        // 清除所有資料
        storage.clear();
        
        // 重置主題為系統預設
        // 先移除 theme key，然後根據系統偏好設定主題（不儲存）
        storage.remove('theme'); // 確保 theme key 被清除
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        theme.setTheme(systemPrefersDark ? 'dark' : 'light', false); // 不儲存，讓系統自動判斷
        
        // 重置語言為預設值
        i18n.setLanguage('zh-TW');
        
        toastSuccess(i18n.t('settings.clearAllDataSuccess'));
        
        // 重新載入頁面以套用預設設定
        // 重新載入後，theme.init() 會根據系統偏好自動設定主題
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    });
  }
}

/**
 * 顯示確認 Modal
 * @param {Object} options - 選項
 * @param {string} options.title - 標題（或翻譯 key）
 * @param {string} options.message - 訊息（或翻譯 key）
 * @param {Function} options.onConfirm - 確認後的回調函數
 * @param {string} options.type - 類型：'warning' | 'danger' | 'info'（預設 'warning'）
 * @param {string} options.confirmText - 確認按鈕文字（或翻譯 key，預設 'common.confirm'）
 * @param {string} options.cancelText - 取消按鈕文字（或翻譯 key，預設 'common.cancel'）
 * @returns {Promise<boolean>} 返回 Promise，true 表示確認，false 表示取消
 */
function showConfirmModal({ title, message, onConfirm, type = 'warning', confirmText = 'common.confirm', cancelText = 'common.cancel' }) {
  return new Promise((resolve) => {
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop active';
    
    // 根據類型設定樣式
    const typeClass = `confirm-modal-${type}`;
    const confirmBtnClass = type === 'danger' ? 'btn-danger' : type === 'warning' ? 'btn-warning' : 'btn-primary';
    
    // 處理翻譯鍵
    const titleText = typeof title === 'string' && (title.includes('.') && !title.includes(' ')) 
      ? i18n.t(title) 
      : escapeHtml(title);
    const messageText = typeof message === 'string' && (message.includes('.') && !message.includes(' ')) 
      ? i18n.t(message) 
      : escapeHtml(message);
    
    modal.innerHTML = `
      <div class="modal ${typeClass}">
        <div class="modal-header">
          <h3>${titleText}</h3>
          <button class="btn btn-ghost btn-icon" id="close-confirm-modal">×</button>
        </div>
        <div class="modal-body">
          <p>${messageText}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" id="cancel-confirm-btn">${i18n.t(cancelText)}</button>
          <button class="btn ${confirmBtnClass}" id="confirm-confirm-btn">${i18n.t(confirmText)}</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // 關閉按鈕
    const closeBtn = modal.querySelector('#close-confirm-modal');
    const cancelBtn = modal.querySelector('#cancel-confirm-btn');
    const confirmBtn = modal.querySelector('#confirm-confirm-btn');
    
    const closeModal = () => {
      modal.classList.remove('active');
      setTimeout(() => {
        document.body.removeChild(modal);
      }, 300);
    };
    
    const handleCancel = () => {
      closeModal();
      resolve(false);
    };
    
    const handleConfirm = () => {
      closeModal();
      if (onConfirm) onConfirm();
      resolve(true);
    };
    
    closeBtn.addEventListener('click', handleCancel);
    cancelBtn.addEventListener('click', handleCancel);
    confirmBtn.addEventListener('click', handleConfirm);
    
    // 點擊背景關閉
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        handleCancel();
      }
    });
    
    // 按 ESC 鍵取消
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        handleCancel();
        document.removeEventListener('keydown', handleEsc);
      }
    };
    document.addEventListener('keydown', handleEsc);
    
    // 聚焦確認按鈕（危險操作聚焦取消按鈕）
    setTimeout(() => {
      if (type === 'danger') {
        cancelBtn.focus();
      } else {
        confirmBtn.focus();
      }
    }, 100);
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

