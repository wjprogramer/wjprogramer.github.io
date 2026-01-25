// 主題切換：只支援 light / dark 兩種模式

import { storage } from './storage.js';

const THEME_KEY = 'theme';
const DEFAULT_THEME = 'light';

export function initTheme() {
  const savedTheme = storage.get(THEME_KEY, DEFAULT_THEME);
  setTheme(savedTheme);
}

export function setTheme(theme) {
  const normalized = theme === 'dark' ? 'dark' : 'light';
  storage.set(THEME_KEY, normalized);
  document.documentElement.setAttribute('data-theme', normalized);
}

export function getTheme() {
  return storage.get(THEME_KEY, DEFAULT_THEME);
}

export function toggleTheme() {
  const current = getTheme();
  if (current === 'light') {
    setTheme('dark');
  } else {
    setTheme('light');
  }
}
