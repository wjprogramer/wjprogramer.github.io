/**
 * localStorage 封裝
 */
const STORAGE_KEY = 'badminton_notes_settings';

export const storage = {
  /**
   * 取得值
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
   * 移除值
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
  }
};

/**
 * 收藏功能
 */
export const favorites = {
  /**
   * 取得收藏列表
   * @returns {string[]}
   */
  get() {
    return storage.get('favorites', []);
  },

  /**
   * 加入收藏
   * @param {string} id
   */
  add(id) {
    const list = this.get();
    if (!list.includes(id)) {
      list.push(id);
      storage.set('favorites', list);
      // 觸發收藏狀態改變事件
      window.dispatchEvent(new CustomEvent('favoritesChanged', { 
        detail: { id, isFavorite: true } 
      }));
    }
  },

  /**
   * 移除收藏
   * @param {string} id
   */
  remove(id) {
    const list = this.get();
    const index = list.indexOf(id);
    if (index > -1) {
      list.splice(index, 1);
      storage.set('favorites', list);
      // 觸發收藏狀態改變事件
      window.dispatchEvent(new CustomEvent('favoritesChanged', { 
        detail: { id, isFavorite: false } 
      }));
    }
  },

  /**
   * 檢查是否收藏
   * @param {string} id
   * @returns {boolean}
   */
  has(id) {
    return this.get().includes(id);
  },

  /**
   * 切換收藏狀態
   * @param {string} id
   */
  toggle(id) {
    if (this.has(id)) {
      this.remove(id);
    } else {
      this.add(id);
    }
  }
};
