// Navigation 元件

import { router } from '../router.js';
import { t } from '../utils/i18n.js';

export function renderNavigation() {
  const navigation = document.getElementById('navigation');
  if (!navigation) return;

  const currentPath = router.getCurrentPath();
  const isContentPage = currentPath === '/content' || currentPath.startsWith('/content/');
  const isVocabularyPage = currentPath === '/vocabulary' || currentPath.startsWith('/vocabulary/');
  const isKanjiPage = currentPath === '/kanji' || currentPath.startsWith('/kanji/');

  navigation.innerHTML = `
    <nav class="navigation__menu">
      <a href="#/" class="navigation__item" data-route="/">
        <span class="navigation__item-icon">🏠</span>
        <span data-i18n="nav.home">${t('nav.home')}</span>
      </a>
      <a href="#/content" class="navigation__item" data-route="/content">
        <span class="navigation__item-icon">📚</span>
        <span data-i18n="nav.content">${t('nav.content')}</span>
      </a>
      <a href="#/vocabulary" class="navigation__item" data-route="/vocabulary">
        <span class="navigation__item-icon">📝</span>
        <span data-i18n="nav.vocabulary">${t('nav.vocabulary')}</span>
      </a>
      <a href="#/categories" class="navigation__item" data-route="/categories">
        <span class="navigation__item-icon">📂</span>
        <span data-i18n="nav.categories">${t('nav.categories')}</span>
      </a>
      <a href="#/kanji" class="navigation__item" data-route="/kanji">
        <span class="navigation__item-icon">🈳</span>
        <span data-i18n="nav.kanji">${t('nav.kanji')}</span>
      </a>
      <a href="#/learning-path" class="navigation__item" data-route="/learning-path">
        <span class="navigation__item-icon">🗺️</span>
        <span data-i18n="nav.learning-path">${t('nav.learning-path')}</span>
      </a>
      <a href="#/favorites" class="navigation__item" data-route="/favorites">
        <span class="navigation__item-icon">⭐</span>
        <span data-i18n="nav.favorites">${t('nav.favorites')}</span>
      </a>
    </nav>
  `;

  // 更新 i18n（只更新文字部分，保留圖標）
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  // 更新 active 狀態
  updateActiveState();

  // 響應式：手機版選單切換
  setupMobileMenu();
  
  // 處理視窗大小改變
  handleResize();
}

/**
 * 只更新 navigation 的 active 狀態，不重新渲染整個 sidebar
 */
export function updateActiveState() {
  const navigation = document.getElementById('navigation');
  if (!navigation) return;

  const currentPath = router.getCurrentPath();
  const isContentPage = currentPath === '/content' || currentPath.startsWith('/content/');
  const isVocabularyPage = currentPath === '/vocabulary' || currentPath.startsWith('/vocabulary/');
  const isKanjiPage = currentPath === '/kanji' || currentPath.startsWith('/kanji/');
  const isCategoriesPage = currentPath === '/categories' || currentPath.startsWith('/categories/');

  // 移除所有 active 狀態
  const items = navigation.querySelectorAll('.navigation__item');
  items.forEach(item => {
    item.classList.remove('navigation__item--active');
  });

  // 根據當前路由添加 active 狀態
  items.forEach(item => {
    const route = item.getAttribute('data-route');
    if (!route) return;

    let shouldBeActive = false;
    
    if (route === '/') {
      shouldBeActive = currentPath === '/';
    } else if (route === '/content') {
      shouldBeActive = isContentPage;
    } else if (route === '/vocabulary') {
      shouldBeActive = isVocabularyPage;
    } else if (route === '/kanji') {
      shouldBeActive = isKanjiPage;
    } else if (route === '/categories') {
      shouldBeActive = isCategoriesPage;
    } else {
      shouldBeActive = currentPath === route;
    }

    if (shouldBeActive) {
      item.classList.add('navigation__item--active');
    }
  });
}

function handleResize() {
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const navigation = document.getElementById('navigation');
      const overlay = document.querySelector('.navigation-overlay');
      
      if (window.innerWidth >= 960) {
        // 寬螢幕：關閉 mobile menu，恢復正常顯示
        if (navigation) {
          navigation.classList.remove('navigation--open');
        }
        if (overlay) {
          overlay.classList.remove('navigation-overlay--active');
        }
        document.body.style.overflow = '';
      } else {
        // 窄螢幕：確保 overlay 存在
        setupMobileMenu();
      }
    }, 100);
  });
}

function setupMobileMenu() {
  // 如果視窗寬度小於 960px，添加選單切換功能
  if (window.innerWidth < 960) {
    const navigation = document.getElementById('navigation');
    
    // 檢查是否已經有 overlay，避免重複創建
    let overlay = document.querySelector('.navigation-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'navigation-overlay';
      document.body.appendChild(overlay);
    }

    // 點擊 overlay 關閉選單
    overlay.addEventListener('click', () => {
      navigation.classList.remove('navigation--open');
      overlay.classList.remove('navigation-overlay--active');
      document.body.style.overflow = '';
    });

    // 點擊 navigation 內的連結時關閉選單
    navigation.addEventListener('click', (e) => {
      if (e.target.closest('.navigation__item')) {
        navigation.classList.remove('navigation--open');
        overlay.classList.remove('navigation-overlay--active');
        document.body.style.overflow = '';
      }
    });
  }
}

