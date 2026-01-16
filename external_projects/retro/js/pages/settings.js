// 設定頁面
import { t, applyTranslations } from '../utils/i18n.js';
import { setTheme, getCurrentTheme, getThemeSetting } from '../utils/theme.js';
import { setLanguage, getCurrentLanguage } from '../utils/i18n.js';
import { storage } from '../utils/storage/index.js';
import { Toast } from '../components/Toast.js';
import { Router } from '../router.js';

export class SettingsPage {
  constructor() {
    this.router = new Router();
    this.eventHandlers = [];
    this.container = null; // 儲存 container 引用
  }

  async render(container) {
    this.container = container; // 儲存 container 引用
    
    // 先顯示 loading 狀態
    container.innerHTML = `
      <div class="page-container">
        <div class="main-content">
          <div class="container">
            <div style="display: flex; justify-content: center; align-items: center; min-height: 400px;">
              <div style="text-align: center;">
                <div class="loading" style="width: 40px; height: 40px; margin: 0 auto var(--spacing-md);"></div>
                <p class="text-muted">${t('common.loading')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // 載入資料
    const currentTheme = await getCurrentTheme();
    const themeSetting = await getThemeSetting();
    const currentLang = getCurrentLanguage();
    const settings = await storage.getSettings();
    const isGoogleDriveConnected = storage.isUsingGoogleDrive();
    
    // 渲染實際內容
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
              <div class="card-body">
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
              </div>
            </div>
            
            <div class="card" style="margin-bottom: var(--spacing-lg);">
              <div class="card-header">
                <h3 class="card-title" data-i18n="settings.clearData"></h3>
              </div>
              <div class="card-body">
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
    
    this.bindEvents();
  }


  bindEvents() {
    // 主題切換
    const themeSelect = document.getElementById('theme-select');
    const themeHandler = async (e) => {
      await setTheme(e.target.value);
      Toast.success(t('common.success'));
      // 主題切換不需要重新渲染，CSS 變數會自動更新
    };
    themeSelect.addEventListener('change', themeHandler);
    
    // 語言切換
    const languageSelect = document.getElementById('language-select');
    const languageHandler = async (e) => {
      setLanguage(e.target.value);
      // setLanguage 內部已經調用 applyTranslations()，無需重新渲染
      Toast.success(t('common.success'));
    };
    languageSelect.addEventListener('change', languageHandler);
    
    // 清除歷史記錄
    document.getElementById('clear-history-btn').addEventListener('click', async () => {
      if (confirm(t('common.confirmClear'))) {
        const result = await storage.clearHistory();
        if (result) {
          Toast.success(t('common.success'));
        } else {
          Toast.error(t('common.error'));
        }
      }
    });
    
    // 清除所有資料
    document.getElementById('clear-all-btn').addEventListener('click', async () => {
      if (confirm(t('common.confirmClear'))) {
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

    // Google Drive 連結
    const connectBtn = document.getElementById('google-drive-connect-btn');
    if (connectBtn) {
      connectBtn.addEventListener('click', async () => {
        try {
          connectBtn.disabled = true;
          connectBtn.textContent = t('common.loading');
          
          const result = await storage.signInToGoogleDrive();
          if (result.success) {
            Toast.success(t('settings.googleDriveConnected'));
            // 注意：不再自動同步，localStorage 和 Google Drive 資料是分開的
            // 重新渲染頁面
            if (this.container) {
              await this.render(this.container);
            } else {
              // 如果 container 不存在，重新載入頁面
              window.location.reload();
            }
          } else {
            Toast.error(result.error || t('common.error'));
            connectBtn.disabled = false;
            connectBtn.textContent = t('settings.googleDriveSignIn');
          }
        } catch (error) {
          console.error('Error connecting to Google Drive:', error);
          Toast.error(error.message || t('common.error'));
          connectBtn.disabled = false;
          connectBtn.textContent = t('settings.googleDriveSignIn');
        }
      });
    }

    // Google Drive 取消連結
    const disconnectBtn = document.getElementById('google-drive-disconnect-btn');
    if (disconnectBtn) {
      disconnectBtn.addEventListener('click', async () => {
        if (confirm('確定要取消連結 Google Drive 嗎？')) {
          storage.signOutFromGoogleDrive();
          Toast.success(t('settings.googleDriveNotConnected'));
          // 重新渲染頁面
          if (this.container) {
            await this.render(this.container);
          } else {
            // 如果 container 不存在，重新載入頁面
            window.location.reload();
          }
        }
      });
    }

    // Google Drive 同步按鈕已移除
    // localStorage 和 Google Drive 的資料是分開的，不會互相同步
    const syncBtn = document.getElementById('google-drive-sync-btn');
    if (syncBtn) {
      // 隱藏同步按鈕，因為資料是分開管理的
      syncBtn.style.display = 'none';
    }
  }

  destroy() {
    // 清理資源
  }
}

