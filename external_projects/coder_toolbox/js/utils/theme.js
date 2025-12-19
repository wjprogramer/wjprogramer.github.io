/**
 * 主題管理
 */
import { storage } from './storage.js';

/**
 * 初始化主題
 */
export function initTheme() {
  const savedTheme = storage.get('theme', 'light');
  setTheme(savedTheme);
}

/**
 * 設定主題
 * @param {'light' | 'dark'} theme
 */
export function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  storage.set('theme', theme);
  
  // 更新主題按鈕圖標
  const themeBtn = document.getElementById('theme-btn');
  if (themeBtn) {
    const icon = themeBtn.querySelector('.material-icons-round');
    if (icon) {
      icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
    }
  }
}

/**
 * 切換主題
 */
export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  setTheme(next);
}

/**
 * 取得當前主題
 * @returns {'light' | 'dark'}
 */
export function getTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light';
}

