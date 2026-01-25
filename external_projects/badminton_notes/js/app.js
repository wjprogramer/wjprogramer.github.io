/**
 * Badminton Notes - 應用程式入口
 */
import { router } from './router.js';
import { initTheme } from './utils/theme.js';
import { initI18n } from './utils/i18n.js';
import { renderHeader } from './components/header.js';
import { renderSidebar } from './components/navigation.js';

// 頁面模組
import { renderHome } from './pages/home.js';
import { renderContentList } from './pages/content-list.js';
import { renderContentDetail } from './pages/content-detail.js';
import { renderLearningPath, cleanupLearningPath } from './pages/learning-path.js';
import { renderFavorites } from './pages/favorites.js';
import { renderScoreboard } from './pages/scoreboard.js';
import { renderModelViewer, cleanupModelViewer } from './pages/model-viewer.js';

/**
 * 初始化應用程式
 */
function initApp() {
  console.log('Initializing app...');
  
  // 檢查必要元素
  const app = document.getElementById('app');
  if (!app) {
    throw new Error('App element not found');
  }
  
  // 初始化主題
  initTheme();
  console.log('Theme initialized');
  
  // 初始化多國化
  initI18n();
  console.log('i18n initialized');
  
  // 渲染 Header
  renderHeader();
  console.log('Header rendered');
  
  // 渲染 Sidebar
  renderSidebar();
  console.log('Sidebar rendered');
  
  // 註冊路由
  registerRoutes();
  console.log('Routes registered');
  
  // 處理初始路由（延遲執行確保所有模組已載入）
  setTimeout(() => {
    router.handleRoute();
    console.log('Initial route handled');
  }, 0);
}

/**
 * 註冊路由
 */
function registerRoutes() {
  router
    .register('/', renderHome)
    .register('/content', renderContentList)
    .register('/content/:id', renderContentDetail)
    .register('/learning-path', renderLearningPath, cleanupLearningPath)
    .register('/favorites', renderFavorites)
    .register('/scoreboard', renderScoreboard)
    .register('/scoreboard/match', renderScoreboard)
    .register('/model-viewer', renderModelViewer, cleanupModelViewer); // 提供清理函數
}

// 啟動應用程式
try {
  initApp();
} catch (error) {
  console.error('App initialization error:', error);
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = `
      <div class="error-page">
        <h1>初始化錯誤</h1>
        <p>${error.message}</p>
        <p>請檢查瀏覽器控制台以獲取更多資訊</p>
      </div>
    `;
  }
}

