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
      // 檢查 PeerJS 是否載入
      if (typeof window !== 'undefined' && window.Peer) {
        console.log('PeerJS loaded successfully');
      } else {
        console.warn('PeerJS not loaded yet, waiting...');
        // 等待最多 5 秒
        let attempts = 0;
        while (attempts < 50 && (typeof window === 'undefined' || !window.Peer)) {
          await new Promise(resolve => setTimeout(resolve, 100));
          attempts++;
        }
        if (typeof window === 'undefined' || !window.Peer) {
          console.error('PeerJS failed to load after 5 seconds');
        } else {
          console.log('PeerJS loaded after waiting');
        }
      }
      
      // 初始化主題系統
      await initTheme();
      
      // 初始化多國語系
      await initI18n();
      
      // 檢查是否已連結 Google Drive，如果是則初始化
      // 注意：先從 localStorage 讀取（因為 Google Drive 可能還沒初始化）
      const settings = storage.localStorage.getSettings();
      console.log('App init: googleDriveEnabled =', settings.googleDriveEnabled);
      if (settings.googleDriveEnabled) {
        try {
          console.log('App init: Initializing Google Drive...');
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
        } catch (error) {
          console.error('App init: Google Drive 初始化失敗:', error);
          // 只更新 googleDriveEnabled 欄位，避免覆蓋其他設定
          await storage.saveSettings({ googleDriveEnabled: false });
        }
      }
      
      // 初始化路由（等待路由註冊完成）
      await this.router.init();
      
      // 監聽路由變化
      window.addEventListener('hashchange', () => {
        this.router.handleRoute().catch(err => {
          console.error('Route handling failed:', err);
        });
      });
      
      // 初始路由處理
      await this.router.handleRoute();
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
}

// 等待 DOM 載入完成後啟動應用程式
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new App();
  });
} else {
  new App();
}

