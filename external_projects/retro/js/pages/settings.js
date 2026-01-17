// 設定頁面
import { t, applyTranslations } from '../utils/i18n.js';
import { setTheme, getCurrentTheme, getThemeSetting } from '../utils/theme.js';
import { setLanguage, getCurrentLanguage } from '../utils/i18n.js';
import { storage } from '../utils/storage/index.js';
import { Toast } from '../components/Toast.js';
import { ConfirmModal } from '../components/ConfirmModal.js';
import { Router } from '../router.js';

export class SettingsPage {
  constructor(params = {}, query = '') {
    this.router = new Router();
    this.eventHandlers = [];
    this.container = null; // 儲存 container 引用
    this.isDestroyed = false; // 追蹤頁面是否已被銷毀
  }

  async render(container) {
    // 重置標記
    this.isDestroyed = false;
    this.container = container; // 儲存 container 引用
    
    // 立即從 localStorage 讀取主題和語言（不等待 Google Drive）
    const currentTheme = await getCurrentTheme();
    const themeSetting = await getThemeSetting();
    const currentLang = getCurrentLanguage();
    
    // 立即渲染頁面（不等待 Google Drive 資料）
    container.innerHTML = `
      <div class="page-container">
        <div class="main-content">
          <div class="container">
            <div style="margin-bottom: var(--spacing-lg);">
              <button class="btn btn-text" onclick="window.location.hash='/'">
                ← <span data-i18n="common.cancel"></span>
              </button>
            </div>
            
            <div class="card" style="margin-bottom: var(--spacing-lg);">
              <div class="card-header">
                <h2 class="card-title" data-i18n="settings.title"></h2>
              </div>
              <div class="card-body">
                <div style="margin-bottom: var(--spacing-lg);">
                  <label style="display: block; margin-bottom: var(--spacing-sm); font-weight: 500;" data-i18n="settings.theme"></label>
                  <select id="theme-select" style="width: 100%; padding: var(--spacing-md); border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                    <option value="light" ${currentTheme === 'light' ? 'selected' : ''} data-i18n="settings.themeLight"></option>
                    <option value="dark" ${currentTheme === 'dark' ? 'selected' : ''} data-i18n="settings.themeDark"></option>
                    <option value="auto" ${themeSetting === 'auto' ? 'selected' : ''} data-i18n="settings.themeAuto"></option>
                  </select>
                </div>
                
                <div style="margin-bottom: var(--spacing-lg);">
                  <label style="display: block; margin-bottom: var(--spacing-sm); font-weight: 500;" data-i18n="settings.language"></label>
                  <select id="language-select" style="width: 100%; padding: var(--spacing-md); border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                    <option value="zh-TW" ${currentLang === 'zh-TW' ? 'selected' : ''}>繁體中文</option>
                    <option value="en" ${currentLang === 'en' ? 'selected' : ''}>English</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div class="card" style="margin-bottom: var(--spacing-lg);">
              <div class="card-header">
                <h3 class="card-title" data-i18n="settings.googleDrive"></h3>
              </div>
              <div class="card-body" id="google-drive-section">
                <div style="display: flex; justify-content: center; align-items: center; min-height: 60px;">
                  <div style="text-align: center;">
                    <div class="loading" style="width: 24px; height: 24px; margin: 0 auto var(--spacing-sm);"></div>
                    <p class="text-muted" style="font-size: 0.875rem;">${t('common.loading')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="card" style="margin-bottom: var(--spacing-lg);">
              <div class="card-header">
                <h3 class="card-title" data-i18n="settings.clearData"></h3>
              </div>
              <div class="card-body">
                <p class="text-muted" style="margin-bottom: var(--spacing-sm); font-size: 0.875rem; color: var(--text-secondary);" data-i18n="settings.clearDataNote"></p>
                <p class="text-muted" style="margin-bottom: var(--spacing-md);" data-i18n="common.confirmClear"></p>
                <button class="btn btn-danger" id="clear-history-btn" data-i18n="settings.clearHistory"></button>
                <button class="btn btn-danger" id="clear-all-btn" style="margin-left: var(--spacing-md);" data-i18n="settings.clearData"></button>
              </div>
            </div>
            
            <div class="card">
              <div class="card-header">
                <h3 class="card-title" data-i18n="settings.about"></h3>
              </div>
              <div class="card-body">
                <p class="text-muted">
                  Retro - 團隊回顧工具<br>
                  <span data-i18n="settings.version"></span>: 1.0.0
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // 套用翻譯
    applyTranslations();
    
    // 綁定事件（主題和語言可以立即使用）
    this.bindEvents();
    
    // 非同步載入 Google Drive 連接狀態（不阻塞頁面）
    this.loadGoogleDriveStatus();
    
    // 監聽 Google Drive 初始化完成事件（當背景初始化完成時自動更新狀態）
    this.googleDriveInitHandler = () => {
      console.log('SettingsPage: Google Drive initialization completed, updating status...');
      this.loadGoogleDriveStatus();
    };
    window.addEventListener('googleDriveInitComplete', this.googleDriveInitHandler);
  }

  // 非同步載入 Google Drive 連接狀態
  async loadGoogleDriveStatus() {
    // 檢查頁面是否已被銷毀（用戶可能已經切換到其他頁面）
    if (this.isDestroyed || !this.container) {
      return; // 如果頁面已被銷毀，不更新 DOM
    }
    
    try {
      const isGoogleDriveConnected = storage.isUsingGoogleDrive();
      
      // 更新 Google Drive 區塊
      const googleDriveSection = document.getElementById('google-drive-section');
      // 檢查元素是否存在且還在我們的 container 中
      if (googleDriveSection && this.container.contains(googleDriveSection)) {
        googleDriveSection.innerHTML = `
          <div style="margin-bottom: var(--spacing-md);">
            <p class="text-muted" style="margin-bottom: var(--spacing-md);">
              ${isGoogleDriveConnected ? t('settings.googleDriveConnected') : t('settings.googleDriveNotConnected')}
            </p>
            ${isGoogleDriveConnected ? `
              <button class="btn btn-secondary" id="google-drive-disconnect-btn" data-i18n="settings.googleDriveDisconnect"></button>
            ` : `
              <button class="btn btn-primary" id="google-drive-connect-btn" data-i18n="settings.googleDriveSignIn"></button>
            `}
          </div>
        `;
        
        // 套用翻譯（重要：更新 HTML 後需要重新套用翻譯）
        applyTranslations();
        
        // 重新綁定 Google Drive 按鈕事件
        this.bindGoogleDriveEvents();
      }
    } catch (error) {
      console.error('Error loading Google Drive status:', error);
      
      // 檢查頁面是否已被銷毀
      if (this.isDestroyed || !this.container) {
        return;
      }
      
      // 如果載入失敗，顯示錯誤狀態
      const googleDriveSection = document.getElementById('google-drive-section');
      // 檢查元素是否存在且還在我們的 container 中
      if (googleDriveSection && this.container.contains(googleDriveSection)) {
        googleDriveSection.innerHTML = `
          <div style="margin-bottom: var(--spacing-md);">
            <p class="text-muted" style="margin-bottom: var(--spacing-md); color: var(--color-danger);">
              ${t('common.error')}: ${error.message || '無法載入 Google Drive 狀態'}
            </p>
            <button class="btn btn-primary" id="google-drive-connect-btn" data-i18n="settings.googleDriveSignIn"></button>
          </div>
        `;
        
        // 套用翻譯
        applyTranslations();
        
        this.bindGoogleDriveEvents();
      }
    }
  }

  // 綁定 Google Drive 按鈕事件（獨立方法，方便重新綁定）
  bindGoogleDriveEvents() {
    // Google Drive 連結
    const connectBtn = document.getElementById('google-drive-connect-btn');
    if (connectBtn) {
      // 移除舊的事件監聽器（如果有的話）
      const newConnectBtn = connectBtn.cloneNode(true);
      connectBtn.parentNode.replaceChild(newConnectBtn, connectBtn);
      
      newConnectBtn.addEventListener('click', async () => {
        try {
          newConnectBtn.disabled = true;
          newConnectBtn.textContent = t('common.loading');
          
          const result = await storage.signInToGoogleDrive();
          if (result.success) {
            Toast.success(t('settings.googleDriveConnected'));
            // 只更新 Google Drive 區塊，不重新渲染整個頁面
            await this.loadGoogleDriveStatus();
          } else {
            Toast.error(result.error || t('common.error'));
            newConnectBtn.disabled = false;
            newConnectBtn.textContent = t('settings.googleDriveSignIn');
          }
        } catch (error) {
          console.error('Error connecting to Google Drive:', error);
          Toast.error(error.message || t('common.error'));
          newConnectBtn.disabled = false;
          newConnectBtn.textContent = t('settings.googleDriveSignIn');
        }
      });
    }

    // Google Drive 取消連結
    const disconnectBtn = document.getElementById('google-drive-disconnect-btn');
    if (disconnectBtn) {
      // 移除舊的事件監聽器（如果有的話）
      const newDisconnectBtn = disconnectBtn.cloneNode(true);
      disconnectBtn.parentNode.replaceChild(newDisconnectBtn, disconnectBtn);
      
      newDisconnectBtn.addEventListener('click', async () => {
        const modal = new ConfirmModal({
          title: t('settings.googleDriveDisconnect'),
          message: '確定要取消連結 Google Drive 嗎？',
          confirmText: t('settings.googleDriveDisconnect'),
          cancelText: t('common.cancel'),
          confirmButtonClass: 'btn-secondary',
          onConfirm: async () => {
            storage.signOutFromGoogleDrive();
            Toast.success(t('settings.googleDriveNotConnected'));
            // 只更新 Google Drive 區塊，不重新渲染整個頁面
            await this.loadGoogleDriveStatus();
          }
        });
        modal.show();
      });
    }
  }


  bindEvents() {
    // 主題切換
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
      const themeHandler = async (e) => {
        await setTheme(e.target.value);
        Toast.success(t('common.success'));
        // 主題切換不需要重新渲染，CSS 變數會自動更新
      };
      themeSelect.addEventListener('change', themeHandler);
    }
    
    // 語言切換
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
      const languageHandler = async (e) => {
        setLanguage(e.target.value);
        // setLanguage 內部已經調用 applyTranslations()，無需重新渲染
        Toast.success(t('common.success'));
      };
      languageSelect.addEventListener('change', languageHandler);
    }
    
    // 清除歷史記錄
    const clearHistoryBtn = document.getElementById('clear-history-btn');
    if (clearHistoryBtn) {
      clearHistoryBtn.addEventListener('click', async () => {
        const modal = new ConfirmModal({
          title: t('settings.clearHistory'),
          message: t('common.confirmClear'),
          confirmText: t('settings.clearHistory'),
          cancelText: t('common.cancel'),
          confirmButtonClass: 'btn-danger',
          onConfirm: async () => {
            const result = await storage.clearHistory();
            if (result) {
              Toast.success(t('common.success'));
            } else {
              Toast.error(t('common.error'));
            }
          }
        });
        modal.show();
      });
    }
    
    // 清除所有資料
    const clearAllBtn = document.getElementById('clear-all-btn');
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', async () => {
        const modal = new ConfirmModal({
          title: t('settings.clearData'),
          message: t('common.confirmClear'),
          confirmText: t('settings.clearData'),
          cancelText: t('common.cancel'),
          confirmButtonClass: 'btn-danger',
          onConfirm: async () => {
            const result = await storage.clearAll();
            if (result) {
              Toast.success(t('common.success'));
              setTimeout(() => {
                window.location.hash = '/';
                window.location.reload();
              }, 1000);
            } else {
              Toast.error(t('common.error'));
            }
          }
        });
        modal.show();
      });
    }
  }

  destroy() {
    // 標記頁面已被銷毀，防止非同步操作完成後更新 DOM
    this.isDestroyed = true;
    this.container = null;
    
    // 移除 Google Drive 初始化完成事件監聽器
    if (this.googleDriveInitHandler) {
      window.removeEventListener('googleDriveInitComplete', this.googleDriveInitHandler);
      this.googleDriveInitHandler = null;
    }
  }
}

