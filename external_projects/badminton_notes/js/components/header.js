/**
 * Header 元件
 */
import { toggleTheme, getTheme } from '../utils/theme.js';
import { t, getLanguage, setLanguage } from '../utils/i18n.js';
import { router } from '../router.js';
import { toggleSidebar } from './navigation.js';

/**
 * 渲染 Header
 */
export function renderHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const currentTheme = getTheme();
  const currentLang = getLanguage();
  
  header.innerHTML = `
    <div class="header__logo" id="logo-link" style="cursor: pointer;">
      <span class="material-icons-round">sports_tennis</span>
    </div>
    
    <div class="header__actions">
      <button class="header__btn" id="search-toggle" aria-label="搜尋">
        <span class="material-icons-round">search</span>
      </button>
      
      <div class="header__btn lang-selector-wrapper" id="lang-selector">
        <button class="lang-selector__button" id="lang-select-button" aria-label="選擇語言">
          <span class="material-icons-round">language</span>
        </button>
        <div class="lang-selector__dropdown" id="lang-select-dropdown">
          <button class="lang-selector__option ${currentLang === 'zh-TW' ? 'lang-selector__option--selected' : ''}" data-lang="zh-TW">
            繁中
          </button>
          <button class="lang-selector__option ${currentLang === 'en' ? 'lang-selector__option--selected' : ''}" data-lang="en">
            EN
          </button>
          <button class="lang-selector__option ${currentLang === 'ja' ? 'lang-selector__option--selected' : ''}" data-lang="ja">
            日本語
          </button>
        </div>
      </div>
      
      <button class="header__btn" id="theme-toggle" aria-label="切換主題">
        <span class="material-icons-round" id="theme-icon">${getThemeIcon(currentTheme)}</span>
      </button>
      
      <button class="header__btn header__menu-toggle" id="menu-toggle" aria-label="選單">
        <span class="material-icons-round">menu</span>
      </button>
    </div>
  `;

  // 綁定事件
  bindHeaderEvents();
  updateI18n();
}

/**
 * 取得主題圖標
 */
function getThemeIcon(theme) {
  if (theme === 'system') {
    return 'brightness_auto';
  }
  return theme === 'dark' ? 'light_mode' : 'dark_mode';
}

/**
 * 綁定 Header 事件
 */
function bindHeaderEvents() {
  // Logo 點擊跳轉回首頁
  const logoLink = document.getElementById('logo-link');
  if (logoLink) {
    logoLink.addEventListener('click', () => {
      router.navigate('/');
    });
  }

  // 主題切換
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      toggleTheme();
      updateThemeIcon();
    });
  }

  // 語言選擇器
  const langSelector = document.getElementById('lang-selector');
  const langSelectDropdown = document.getElementById('lang-select-dropdown');
  const langOptions = document.querySelectorAll('.lang-selector__option');
  
  if (langSelector && langSelectDropdown) {
    // 切換下拉選單（整個 lang-selector 都可以點擊）
    langSelector.addEventListener('click', (e) => {
      // 如果點擊的是選項，不處理（由選項自己的事件處理）
      if (e.target.closest('.lang-selector__option')) {
        return;
      }
      
      e.stopPropagation();
      const isOpen = langSelectDropdown.classList.contains('lang-selector__dropdown--open');
      closeAllDropdowns();
      if (!isOpen) {
        langSelectDropdown.classList.add('lang-selector__dropdown--open');
        langSelector.classList.add('lang-selector-wrapper--open');
      }
    });
    
    // 選擇語言
    langOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const lang = option.getAttribute('data-lang');
        if (lang) {
          setLanguage(lang);
          updateI18n();
          renderHeader(); // 重新渲染以更新文字
        }
        closeAllDropdowns();
      });
    });
    
    // 點擊外部關閉下拉選單
    document.addEventListener('click', (e) => {
      if (!langSelector.contains(e.target)) {
        closeAllDropdowns();
      }
    });
  }
  
  /**
   * 關閉所有下拉選單
   */
  function closeAllDropdowns() {
    if (langSelectDropdown) {
      langSelectDropdown.classList.remove('lang-selector__dropdown--open');
    }
    if (langSelector) {
      langSelector.classList.remove('lang-selector-wrapper--open');
    }
  }

  // 選單切換（手機版）
  const menuToggle = document.getElementById('menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      toggleSidebar();
    });
  }

  // 搜尋切換
  const searchToggle = document.getElementById('search-toggle');
  if (searchToggle) {
    searchToggle.addEventListener('click', () => {
      const currentPath = window.location.hash.slice(1) || '/';
      const isOnContentPage = currentPath.startsWith('/content');
      
      if (isOnContentPage) {
        // 如果已經在內容頁面，直接聚焦搜尋框
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
          searchInput.focus();
        }
      } else {
        // 如果不在內容頁面，導航到內容頁面並聚焦搜尋框
        router.navigate('/content');
        // 等待頁面渲染完成後聚焦搜尋框
        setTimeout(() => {
          const searchInput = document.getElementById('search-input');
          if (searchInput) {
            searchInput.focus();
          }
        }, 100);
      }
    });
  }
}

/**
 * 更新主題圖標
 */
function updateThemeIcon() {
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    themeIcon.textContent = getThemeIcon(getTheme());
  }
}

/**
 * 更新 i18n 文字
 */
function updateI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
}


