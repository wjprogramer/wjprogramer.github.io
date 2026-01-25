// localStorage 封裝

const STORAGE_KEY = 'japanese_notes_settings';

export const storage = {
  get(key, defaultValue = null) {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return data[key] ?? defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      data[key] = value;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Storage error:', e);
    }
  },

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

// 收藏功能專用
export const favorites = {
  get() {
    return storage.get('favorites', []);
  },

  add(id) {
    const list = this.get();
    if (!list.includes(id)) {
      list.push(id);
      storage.set('favorites', list);
    }
  },

  remove(id) {
    const list = this.get();
    const index = list.indexOf(id);
    if (index > -1) {
      list.splice(index, 1);
      storage.set('favorites', list);
    }
  },

  has(id) {
    return this.get().includes(id);
  }
};

