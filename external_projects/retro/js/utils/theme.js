// 主題管理
import { storage } from './storage/index.js';

const THEME_KEY = 'retro_settings';

// 立即初始化主題（同步讀取 localStorage，避免等待異步操作）
export function initThemeSync() {
  try {
    // 直接從 localStorage 讀取，不等待 Google Drive
    const NAMESPACE = 'retro_';
    const data = localStorage.getItem(`${NAMESPACE}settings`);
    const settings = data ? JSON.parse(data) : null;
    let theme = settings?.theme || 'auto';
    
    // 如果主題是 auto，偵測系統主題
    if (theme === 'auto') {
      theme = detectSystemTheme();
    }
    
    applyTheme(theme);
  } catch (error) {
    console.error('Failed to init theme sync:', error);
    // 如果載入失敗，使用預設主題
    applyTheme(detectSystemTheme());
  }
}

// 初始化主題（完整版本，包含監聽系統主題變化）
export async function initTheme() {
  try {
    // 先同步套用主題（避免閃爍）
    initThemeSync();
    
    // 記錄同步載入的主題設定（從 localStorage 直接讀取，是最新的）
    const NAMESPACE = 'retro_';
    const syncData = localStorage.getItem(`${NAMESPACE}settings`);
    const syncSettings = syncData ? JSON.parse(syncData) : null;
    const syncThemeSetting = syncSettings?.theme || 'auto';
    
    // 然後異步載入完整設定（可能來自 Google Drive）
    const settings = await storage.getSettings();
    const asyncThemeSetting = settings?.theme || 'auto';
    
    // 優先使用 localStorage 中的主題設定（因為它是最新的）
    // 只有在 localStorage 中沒有明確設定（或為 'auto'）時，才使用異步載入的設定
    const finalThemeSetting = (syncThemeSetting && syncThemeSetting !== 'auto') ? syncThemeSetting : asyncThemeSetting;
    
    let finalTheme = finalThemeSetting;
    // 如果主題是 auto，偵測系統主題
    if (finalTheme === 'auto') {
      finalTheme = detectSystemTheme();
    }
    
    // 檢查當前套用的主題是否與最終主題一致
    // 如果不一致，才更新（避免不必要的重新套用）
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme !== finalTheme) {
      applyTheme(finalTheme);
    }
    
    // 監聽系統主題變化（只有在主題設定為 'auto' 時）
    if (finalThemeSetting === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      // 移除舊的監聽器（如果有的話，避免重複監聽）
      if (window._themeMediaQueryListener) {
        mediaQuery.removeEventListener('change', window._themeMediaQueryListener);
      }
      // 添加新的監聽器
      window._themeMediaQueryListener = (e) => {
        applyTheme(e.matches ? 'dark' : 'light');
      };
      mediaQuery.addEventListener('change', window._themeMediaQueryListener);
    } else {
      // 如果主題不是 'auto'，移除監聽器（如果有的話）
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      if (window._themeMediaQueryListener) {
        mediaQuery.removeEventListener('change', window._themeMediaQueryListener);
        window._themeMediaQueryListener = null;
      }
    }
  } catch (error) {
    console.error('Failed to init theme:', error);
    // 如果載入失敗，使用預設主題
    applyTheme(detectSystemTheme());
  }
}

// 偵測系統主題
function detectSystemTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

// 套用主題
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  
  // 載入對應的主題 CSS（如果還沒載入）
  if (theme === 'dark') {
    loadDarkTheme();
  }
}

// 載入 Dark 主題 CSS
function loadDarkTheme() {
  const linkId = 'dark-theme-css';
  if (!document.getElementById(linkId)) {
    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = 'css/themes/dark.css';
    document.head.appendChild(link);
  }
}

// 切換主題
export async function toggleTheme() {
  try {
    const settings = await storage.getSettings();
    const currentTheme = settings?.theme || 'auto';
    
    let newTheme;
    if (currentTheme === 'auto') {
      newTheme = detectSystemTheme() === 'light' ? 'dark' : 'light';
    } else if (currentTheme === 'light') {
      newTheme = 'dark';
    } else {
      newTheme = 'light';
    }
    
    await setTheme(newTheme);
  } catch (error) {
    console.error('Failed to toggle theme:', error);
  }
}

// 設定主題
export async function setTheme(theme) {
  try {
    const settings = await storage.getSettings() || {};
    settings.theme = theme;
    await storage.saveSettings(settings);
    
    if (theme === 'auto') {
      theme = detectSystemTheme();
    }
    
    applyTheme(theme);
    
    // 觸發主題變化事件
    window.dispatchEvent(new CustomEvent('themechange', { 
      detail: { theme, actualTheme: theme } 
    }));
  } catch (error) {
    console.error('Failed to set theme:', error);
    // 即使儲存失敗，也先套用主題
    if (theme === 'auto') {
      theme = detectSystemTheme();
    }
    applyTheme(theme);
  }
}

// 取得當前主題（實際套用的主題）
export async function getCurrentTheme() {
  try {
    const settings = await storage.getSettings();
    const theme = settings?.theme || 'auto';
    
    if (theme === 'auto') {
      return detectSystemTheme();
    }
    
    return theme;
  } catch (error) {
    console.error('Failed to get current theme:', error);
    return detectSystemTheme();
  }
}

// 取得主題設定（auto/light/dark）
export async function getThemeSetting() {
  try {
    const settings = await storage.getSettings();
    return settings?.theme || 'auto';
  } catch (error) {
    console.error('Failed to get theme setting:', error);
    return 'auto';
  }
}

