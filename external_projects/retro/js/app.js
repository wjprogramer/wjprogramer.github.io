// SPA 應用程式入口
import { Router } from './router.js';
import { initTheme } from './utils/theme.js';
import { initI18n } from './utils/i18n.js';
import { storage } from './utils/storage/index.js';

// 初始化全域狀態
window.retroState = {
  hostMode: null,
  participantMode: null,
  peerManager: null,
  dataChannel: null,
  currentMeetingId: null,
  currentUserName: null,
};

class App {
  constructor() {
    this.router = new Router();
    this.init().catch(err => {
      console.error('App initialization failed:', err);
    });
  }

  async init() {
    try {
      // 檢查 PeerJS 是否載入（非阻塞，最多等待 1 秒）
      // PeerJS 在 HTML 中預先載入，通常應該已經載入完成
      if (typeof window !== 'undefined' && window.Peer) {
        console.log('PeerJS loaded successfully');
      } else {
        // 只等待最多 1 秒（10 次嘗試），不阻塞頁面載入
        let attempts = 0;
        while (attempts < 10 && (typeof window === 'undefined' || !window.Peer)) {
          await new Promise(resolve => setTimeout(resolve, 100));
          attempts++;
        }
        if (typeof window !== 'undefined' && window.Peer) {
          console.log('PeerJS loaded after waiting');
        } else {
          console.warn('PeerJS not loaded yet, will retry when needed');
        }
      }
      
      // 初始化主題系統
      await initTheme();
      
      // 初始化多國語系
      await initI18n();
      
      // 初始化路由（等待路由註冊完成）
      await this.router.init();
      
      // 監聽路由變化
      window.addEventListener('hashchange', () => {
        this.router.handleRoute().catch(err => {
          console.error('Route handling failed:', err);
        });
      });
      
      // 初始路由處理（立即顯示頁面，不等待 Google Drive）
      await this.router.handleRoute();
      
      // Google Drive 初始化改為非阻塞（在背景執行，不阻塞頁面載入）
      // 注意：先從 localStorage 讀取（因為 Google Drive 可能還沒初始化）
      const settings = storage.localStorage.getSettings();
      console.log('App init: googleDriveEnabled =', settings.googleDriveEnabled);
      if (settings.googleDriveEnabled) {
        // 非阻塞初始化 Google Drive（不 await，讓頁面先顯示）
        this.initGoogleDriveInBackground().catch(err => {
          console.error('Background Google Drive initialization failed:', err);
        });
      }
    } catch (error) {
      console.error('Failed to initialize app:', error);
      // 顯示錯誤訊息給用戶
      const app = document.getElementById('app');
      if (app) {
        app.innerHTML = `
          <div style="padding: 2rem; text-align: center;">
            <h1>載入錯誤</h1>
            <p>應用程式初始化失敗，請重新整理頁面。</p>
            <p style="color: #999; font-size: 0.875rem;">${error.message}</p>
          </div>
        `;
      }
    }
  }

  // 在背景初始化 Google Drive（非阻塞）
  async initGoogleDriveInBackground() {
    try {
      console.log('App init: Initializing Google Drive in background...');
      await storage.initGoogleDrive();
      console.log('App init: Google Drive initialized, checking isUsingGoogleDrive...');
      // 檢查是否仍然登入
      const isUsing = storage.isUsingGoogleDrive();
      console.log('App init: isUsingGoogleDrive =', isUsing);
      if (isUsing) {
        console.log('App init: Google Drive 已連結');
      } else {
        console.log('App init: Google Drive 未連結，更新設定');
        // 如果未登入，只更新 googleDriveEnabled 欄位
        await storage.saveSettings({ googleDriveEnabled: false });
      }
      
      // 觸發事件通知 Google Drive 初始化完成
      window.dispatchEvent(new CustomEvent('googleDriveInitComplete', {
        detail: { isConnected: isUsing }
      }));
    } catch (error) {
      console.error('App init: Google Drive 初始化失敗:', error);
      // 只更新 googleDriveEnabled 欄位，避免覆蓋其他設定
      await storage.saveSettings({ googleDriveEnabled: false });
      
      // 觸發事件通知 Google Drive 初始化失敗
      window.dispatchEvent(new CustomEvent('googleDriveInitComplete', {
        detail: { isConnected: false, error: error.message }
      }));
    }
  }
}

// 等待 DOM 載入完成後啟動應用程式
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new App();
  });
} else {
  new App();
}

