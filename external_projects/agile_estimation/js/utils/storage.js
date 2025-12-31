/**
 * Storage Utility
 * 使用 localStorage 儲存資料，帶有命名空間前綴避免衝突
 */

const STORAGE_PREFIX = 'agile_estimation_';

export const storage = {
  /**
   * 取得資料
   * @param {string} key - 鍵名
   * @param {*} defaultValue - 預設值
   * @returns {*} 儲存的值或預設值
   */
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(STORAGE_PREFIX + key);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (error) {
      console.error(`Error reading from storage: ${key}`, error);
      return defaultValue;
    }
  },

  /**
   * 儲存資料
   * @param {string} key - 鍵名
   * @param {*} value - 要儲存的值
   */
  set(key, value) {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to storage: ${key}`, error);
    }
  },

  /**
   * 刪除資料
   * @param {string} key - 鍵名
   */
  remove(key) {
    try {
      localStorage.removeItem(STORAGE_PREFIX + key);
    } catch (error) {
      console.error(`Error removing from storage: ${key}`, error);
    }
  },

  /**
   * 清除所有本應用程式的資料
   */
  clear() {
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(STORAGE_PREFIX)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Error clearing storage', error);
    }
  }
};

