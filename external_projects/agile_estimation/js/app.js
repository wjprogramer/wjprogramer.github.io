/**
 * Agile Estimation App
 * Main Entry Point
 */

import { router } from './router.js';
import { theme } from './utils/theme.js';
import { i18n } from './utils/i18n.js';
import { renderHome } from './pages/home.js';
import { renderSolo } from './pages/solo.js';
import { renderHistory } from './pages/history.js';
import { renderHistoryDetail } from './pages/history-detail.js';
import { renderHost } from './pages/host.js';
import { renderJoin } from './pages/join.js';
import { renderSettings } from './pages/settings.js';
import { renderTest } from './pages/test.js';

/**
 * 初始化應用程式
 */
async function initApp() {
  try {
    // 初始化主題
    theme.init();
    
    // 初始化語系
    await i18n.init();
    
    // 註冊路由
    router
      .register('/', renderHome)
      .register('/solo', renderSolo)
      .register('/host', renderHost)
      .register('/join', renderJoin)
      .register('/join/:id', ({ params }) => renderJoin(params))
      .register('/history', renderHistory)
      .register('/history/:id', ({ params }) => renderHistoryDetail(params))
      .register('/settings', renderSettings)
      .register('/test', renderTest);
    
    // 初始化路由（在所有路由註冊完成後）
    router.init();
    
    // 移除載入畫面
    removeLoadingScreen();
    
    console.log('🎴 Agile Estimation App initialized');
  } catch (error) {
    console.error('Failed to initialize app:', error);
    showErrorScreen(error);
  }
}

/**
 * 移除載入畫面
 */
function removeLoadingScreen() {
  const loadingScreen = document.querySelector('.loading-screen');
  if (loadingScreen) {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.remove();
    }, 300);
  }
}

/**
 * 顯示錯誤畫面
 */
function showErrorScreen(error) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="error-screen">
      <h1>😵 發生錯誤</h1>
      <p>應用程式載入失敗，請重新整理頁面。</p>
      <p class="error-detail">${error.message}</p>
      <button onclick="location.reload()" class="btn btn-primary">重新整理</button>
    </div>
    <style>
      .error-screen {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 2rem;
        text-align: center;
      }
      .error-detail {
        color: var(--color-text-muted);
        font-size: var(--font-size-sm);
        margin-top: 1rem;
      }
    </style>
  `;
}

// 啟動應用程式
initApp();

