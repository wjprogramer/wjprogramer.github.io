// 多國語系系統
import { translations } from '../data/i18n.js';
import { storage } from './storage/index.js';

let currentLanguage = 'zh-TW';

// 初始化 i18n
export async function initI18n() {
  const settings = storage.getSettings();
  const lang = settings?.language || detectBrowserLanguage();
  setLanguage(lang);
}

// 偵測瀏覽器語言
function detectBrowserLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;
  
  if (browserLang.startsWith('zh')) {
    return 'zh-TW';
  } else if (browserLang.startsWith('ja')) {
    return 'ja';
  } else {
    return 'en';
  }
}

// 套用翻譯到 DOM
export function applyTranslations() {
  // 找到所有有 data-i18n 屬性的元素
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = t(key);
    
    // 檢查是否有 data-i18n-attr 指定要翻譯的屬性
    const attr = element.getAttribute('data-i18n-attr');
    if (attr) {
      element.setAttribute(attr, translation);
    } else {
      element.textContent = translation;
    }
  });

  // 處理 placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    element.placeholder = t(key);
  });
}

// 設定語言
export function setLanguage(lang) {
  if (!translations[lang]) {
    lang = 'zh-TW'; // 預設語言
  }
  
  currentLanguage = lang;
  
  // 更新 HTML lang 屬性
  document.documentElement.setAttribute('lang', lang);
  
  // 儲存語言偏好
  const settings = storage.getSettings() || {};
  settings.language = lang;
  storage.saveSettings(settings);
  
  // 套用翻譯到 DOM（無縫切換）
  applyTranslations();
  
  // 觸發語言變化事件
  window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: lang } }));
}

// 取得翻譯文字
export function t(key, params = {}) {
  const keys = key.split('.');
  let value = translations[currentLanguage];
  
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key; // 找不到翻譯，返回 key
    }
  }
  
  if (typeof value !== 'string') {
    return key;
  }
  
  // 替換參數
  if (params && Object.keys(params).length > 0) {
    return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
      return params[paramKey] || match;
    });
  }
  
  return value || key;
}

// 取得當前語言
export function getCurrentLanguage() {
  return currentLanguage;
}

