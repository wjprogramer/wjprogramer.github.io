/**
 * 主題管理
 */
import { storage } from './storage.js';

const THEME_KEY = 'theme';
const THEME_SYSTEM = 'system';

/**
 * 初始化主題
 */
export function initTheme() {
  const savedTheme = storage.get(THEME_KEY, THEME_SYSTEM);
  setTheme(savedTheme);
  
  // 監聽系統主題變化
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      if (getTheme() === THEME_SYSTEM) {
        applySystemTheme();
      }
    });
  }
}

/**
 * 設定主題
 * @param {'light' | 'dark' | 'system'} theme
 */
export function setTheme(theme) {
  storage.set(THEME_KEY, theme);
  
  if (theme === THEME_SYSTEM) {
    applySystemTheme();
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
}

/**
 * 取得當前主題
 * @returns {'light' | 'dark' | 'system'}
 */
export function getTheme() {
  return storage.get(THEME_KEY, THEME_SYSTEM);
}

/**
 * 應用系統主題
 */
function applySystemTheme() {
  if (window.matchMedia) {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
}

/**
 * 切換主題
 */
export function toggleTheme() {
  const current = getTheme();
  if (current === 'light') {
    setTheme('dark');
  } else if (current === 'dark') {
    setTheme(THEME_SYSTEM);
  } else {
    setTheme('light');
  }
}

