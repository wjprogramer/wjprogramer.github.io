// Header 元件

import { toggleTheme } from '../utils/theme.js';
import { setLanguage, getLanguage, t } from '../utils/i18n.js';
import { router } from '../router.js';

export function renderHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const currentLang = getLanguage();
  const nextLang = currentLang === 'zh-TW' ? 'en' : 'zh-TW';

  header.innerHTML = `
    <div class="header__left">
      <button class="header__menu-toggle" aria-label="${t('header.menu')}" title="${t('header.menu')}" id="menu-toggle">
        <span>☰</span>
      </button>
      <div class="header__logo">日文筆記</div>
    </div>
    <div class="header__actions">
      <button class="header__action-btn" aria-label="${t('header.theme')}" title="${t('header.theme')}" id="theme-toggle">
        <span>🌙</span>
      </button>
      <button class="header__action-btn" aria-label="${t('header.language')}" title="${t('header.language')}" id="language-toggle">
        <span>${nextLang === 'en' ? 'EN' : '中'}</span>
      </button>
    </div>
  `;

  // 主題切換
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      toggleTheme();
      updateThemeIcon();
    });
    updateThemeIcon();
  }

  // 語言切換
  const languageToggle = document.getElementById('language-toggle');
  if (languageToggle) {
    languageToggle.addEventListener('click', () => {
      const currentLang = getLanguage();
      const nextLang = currentLang === 'zh-TW' ? 'en' : 'zh-TW';
      setLanguage(nextLang);
      renderHeader(); // 重新渲染 header
      // 重新渲染當前頁面以更新內容語言
      router.handleRoute();
    });
  }

  // 選單切換（窄螢幕）
  const menuToggle = document.getElementById('menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      toggleNavigation();
    });
  }
}

function toggleNavigation() {
  const navigation = document.getElementById('navigation');
  const overlay = document.querySelector('.navigation-overlay');
  
  if (!navigation) return;

  const isOpen = navigation.classList.contains('navigation--open');
  
  if (isOpen) {
    // 關閉
    navigation.classList.remove('navigation--open');
    if (overlay) {
      overlay.classList.remove('navigation-overlay--active');
    }
    document.body.style.overflow = '';
  } else {
    // 打開
    navigation.classList.add('navigation--open');
    if (overlay) {
      overlay.classList.add('navigation-overlay--active');
    }
    document.body.style.overflow = 'hidden';
  }
}

function updateThemeIcon() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const currentTheme = document.documentElement.getAttribute('data-theme');
  const icon = themeToggle.querySelector('span');
  if (icon) {
    icon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
  }
}

