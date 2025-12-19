/**
 * LocalStorage 封裝
 */
const STORAGE_KEY = 'coder_toolbox_settings';

export const storage = {
  /**
   * 取得設定值
   * @param {string} key
   * @param {*} defaultValue
   * @returns {*}
   */
  get(key, defaultValue = null) {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return data[key] ?? defaultValue;
    } catch {
      return defaultValue;
    }
  },

  /**
   * 設定值
   * @param {string} key
   * @param {*} value
   */
  set(key, value) {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      data[key] = value;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Storage error:', e);
    }
  },

  /**
   * 移除設定
   * @param {string} key
   */
  remove(key) {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      delete data[key];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Storage error:', e);
    }
  },

  /**
   * 清除所有設定
   */
  clear() {
    localStorage.removeItem(STORAGE_KEY);
  }
};

