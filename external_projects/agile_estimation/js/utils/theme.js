/**
 * Theme Manager
 * 管理深色/淺色主題切換
 */

import { storage } from './storage.js';

const THEME_KEY = 'theme';
const DARK = 'dark';
const LIGHT = 'light';

class ThemeManager {
  constructor() {
    this.currentTheme = null;
    this.listeners = [];
  }

  /**
   * 初始化主題
   */
  init() {
    // 優先使用儲存的主題，否則使用系統偏好
    const savedTheme = storage.get(THEME_KEY);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    this.currentTheme = savedTheme || (systemPrefersDark ? DARK : LIGHT);
    this.applyTheme(this.currentTheme);

    // 監聽系統主題變化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // 只有在沒有手動設定主題時才跟隨系統
      if (!storage.get(THEME_KEY)) {
        this.setTheme(e.matches ? DARK : LIGHT, false);
      }
    });
  }

  /**
   * 套用主題到 DOM
   * @param {string} theme - 主題名稱
   */
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // 更新 meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === DARK ? '#1a1a2e' : '#f8fafc');
    }
  }

  /**
   * 設定主題
   * @param {string} theme - 主題名稱
   * @param {boolean} save - 是否儲存到 localStorage
   */
  setTheme(theme, save = true) {
    this.currentTheme = theme;
    this.applyTheme(theme);
    
    if (save) {
      storage.set(THEME_KEY, theme);
    }

    // 通知所有監聽者
    this.listeners.forEach(callback => callback(theme));
  }

  /**
   * 切換主題
   */
  toggle() {
    const newTheme = this.currentTheme === DARK ? LIGHT : DARK;
    this.setTheme(newTheme);
    return newTheme;
  }

  /**
   * 取得當前主題
   * @returns {string} 當前主題
   */
  getTheme() {
    return this.currentTheme;
  }

  /**
   * 是否為深色主題
   * @returns {boolean}
   */
  isDark() {
    return this.currentTheme === DARK;
  }

  /**
   * 監聽主題變化
   * @param {Function} callback - 回調函數
   * @returns {Function} 取消監聽的函數
   */
  onChange(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  /**
   * 重設為系統主題
   */
  resetToSystem() {
    storage.remove(THEME_KEY);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setTheme(systemPrefersDark ? DARK : LIGHT, false);
  }
}

export const theme = new ThemeManager();

