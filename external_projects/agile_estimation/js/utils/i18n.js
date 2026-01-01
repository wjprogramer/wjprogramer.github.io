/**
 * Internationalization (i18n) Manager
 * 管理多國語系
 */

import { storage } from './storage/index.js';

const LANG_KEY = 'language';
const DEFAULT_LANG = 'zh-TW';
const SUPPORTED_LANGS = ['zh-TW', 'zh-CN', 'en', 'ja'];

class I18nManager {
  constructor() {
    this.currentLang = DEFAULT_LANG;
    this.translations = {};
    this.listeners = [];
  }

  /**
   * 初始化語系
   */
  async init() {
    // 優先使用儲存的語言，否則使用瀏覽器語言
    const savedLang = storage.get(LANG_KEY);
    const browserLang = this.getBrowserLanguage();
    
    this.currentLang = savedLang || browserLang || DEFAULT_LANG;
    
    await this.loadTranslations(this.currentLang);
    this.applyTranslations();
    
    // 更新 HTML lang 屬性
    document.documentElement.lang = this.currentLang;
  }

  /**
   * 取得瀏覽器語言
   * @returns {string|null}
   */
  getBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    
    // 完全匹配
    if (SUPPORTED_LANGS.includes(browserLang)) {
      return browserLang;
    }
    
    // 語言碼匹配（例如 zh -> zh-TW, en-US -> en）
    const langCode = browserLang.split('-')[0];
    if (langCode === 'zh') {
      // 檢查是否為簡體中文
      if (browserLang.toLowerCase().includes('cn') || browserLang.toLowerCase().includes('hans')) {
        return 'zh-CN';
      }
      return 'zh-TW';
    }
    if (langCode === 'en') return 'en';
    if (langCode === 'ja') return 'ja';
    
    return null;
  }

  /**
   * 載入翻譯檔案
   * @param {string} lang - 語言代碼
   */
  async loadTranslations(lang) {
    try {
      // 使用動態 import 載入翻譯檔案
      const response = await fetch(`locales/${lang}.json`);
      if (!response.ok) throw new Error(`Failed to load ${lang}.json`);
      this.translations[lang] = await response.json();
    } catch (error) {
      console.error(`Error loading translations for ${lang}:`, error);
      // 如果載入失敗，嘗試載入預設語言
      if (lang !== DEFAULT_LANG) {
        await this.loadTranslations(DEFAULT_LANG);
        this.currentLang = DEFAULT_LANG;
      }
    }
  }

  /**
   * 取得翻譯文字
   * @param {string} key - 翻譯鍵
   * @param {Object} params - 替換參數
   * @returns {string} 翻譯後的文字
   */
  t(key, params = {}) {
    const translation = this.getNestedValue(this.translations[this.currentLang], key);
    
    if (!translation) {
      console.warn(`Translation not found: ${key}`);
      return key;
    }

    // 替換參數 {{param}}
    return translation.replace(/\{\{(\w+)\}\}/g, (match, param) => {
      return params[param] !== undefined ? params[param] : match;
    });
  }

  /**
   * 取得巢狀物件的值
   * @param {Object} obj - 物件
   * @param {string} path - 路徑（用 . 分隔）
   * @returns {*}
   */
  getNestedValue(obj, path) {
    if (!obj) return null;
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : null;
    }, obj);
  }

  /**
   * 套用翻譯到 DOM
   */
  applyTranslations() {
    // 找到所有有 data-i18n 屬性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.t(key);
      
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
      element.placeholder = this.t(key);
    });
  }

  /**
   * 設定語言
   * @param {string} lang - 語言代碼
   */
  async setLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) {
      console.warn(`Unsupported language: ${lang}`);
      return;
    }

    // 如果尚未載入該語言的翻譯，先載入
    if (!this.translations[lang]) {
      await this.loadTranslations(lang);
    }

    this.currentLang = lang;
    storage.set(LANG_KEY, lang);
    document.documentElement.lang = lang;
    this.applyTranslations();

    // 通知所有監聽者
    this.listeners.forEach(callback => callback(lang));
  }

  /**
   * 取得當前語言
   * @returns {string}
   */
  getLanguage() {
    return this.currentLang;
  }

  /**
   * 取得支援的語言列表
   * @returns {string[]}
   */
  getSupportedLanguages() {
    return [...SUPPORTED_LANGS];
  }

  /**
   * 監聽語言變化
   * @param {Function} callback - 回調函數
   * @returns {Function} 取消監聽的函數
   */
  onChange(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }
}

export const i18n = new I18nManager();

