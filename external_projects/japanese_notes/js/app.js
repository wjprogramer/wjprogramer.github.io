// 應用程式入口

import { router } from './router.js';
import { initTheme } from './utils/theme.js';
import { initI18n } from './utils/i18n.js';
import { renderHeader } from './components/header.js';
import { renderNavigation, updateActiveState } from './components/navigation.js';
import { renderHome } from './pages/home.js';
import { renderContentList } from './pages/content-list.js';
import { renderContentDetail } from './pages/content-detail.js';
import { renderVocabularyList } from './pages/vocabulary-list.js';
import { renderKanjiList } from './pages/kanji-list.js';
import { renderCategoriesList } from './pages/categories-list.js';
import { renderLearningPath } from './pages/learning-path.js';
import { renderFavorites } from './pages/favorites.js';

// 初始化應用程式
async function init() {
  // 初始化主題
  initTheme();

  // 初始化多國化
  initI18n();

  // 渲染 Header
  renderHeader();

  // 渲染 Navigation
  renderNavigation();

  // 註冊路由
  router
    .register('/', renderHome)
    .register('/content', renderContentList)
    .register('/content/:id', renderContentDetail)
    .register('/vocabulary', renderVocabularyList)
    .register('/vocabulary/:id', renderContentDetail)
    .register('/kanji', renderKanjiList)
    .register('/kanji/:id', renderContentDetail)
    .register('/categories', renderCategoriesList)
    .register('/categories/:id', renderContentDetail)
    .register('/learning-path', renderLearningPath)
    .register('/favorites', renderFavorites);

  // 監聽路由變化，只更新 navigation 的 active 狀態（不重新渲染整個 sidebar）
  window.addEventListener('hashchange', () => {
    updateActiveState();
  });

  // 處理 404
  router.setNotFoundHandler(() => {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
      <div class="content-detail">
        <h1>404 - 頁面不存在</h1>
        <p>找不到您要尋找的頁面。</p>
        <a href="#/" class="btn btn--primary">返回首頁</a>
      </div>
    `;
  });

  // 設定 Footer 年份
  const footerYearEl = document.getElementById('footer-year');
  if (footerYearEl) {
    footerYearEl.textContent = new Date().getFullYear();
  }
}

// 當 DOM 載入完成後初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

