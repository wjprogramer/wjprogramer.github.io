/**
 * Header 元件
 */
import { toggleTheme, getTheme } from '../utils/theme.js';
import { toggleSidebar } from './sidebar.js';

/**
 * 渲染 Header
 */
export function renderHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const currentTheme = getTheme();
  const themeIcon = currentTheme === 'dark' ? 'light_mode' : 'dark_mode';

  header.innerHTML = `
    <button class="header-menu-btn" id="menu-btn" aria-label="開啟選單">
      <span class="material-icons-round">menu</span>
    </button>
    
    <a href="#/" class="header-logo">
      <div class="logo-icon">
        <span class="material-icons-round">construction</span>
      </div>
      <span class="logo-text">Coder Toolbox</span>
    </a>
    
    <nav class="header-nav">
      <button class="glass-btn icon-only" id="theme-btn" aria-label="切換主題">
        <span class="material-icons-round">${themeIcon}</span>
      </button>
      <a href="#/about" class="glass-btn">
        <span class="material-icons-round">info</span>
        <span class="btn-text">關於</span>
      </a>
    </nav>
  `;

  // 綁定事件
  initHeaderEvents();
}

/**
 * 初始化 Header 事件
 */
function initHeaderEvents() {
  // 主題切換
  const themeBtn = document.getElementById('theme-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }

  // 漢堡選單
  const menuBtn = document.getElementById('menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', toggleSidebar);
  }
}

