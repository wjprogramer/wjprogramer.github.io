// localStorage 實作
const NAMESPACE = 'retro_';

export class LocalStorage {
  // 取得設定
  getSettings() {
    try {
      const data = localStorage.getItem(`${NAMESPACE}settings`);
      return data ? JSON.parse(data) : this.getDefaultSettings();
    } catch (error) {
      console.error('Error reading settings:', error);
      return this.getDefaultSettings();
    }
  }

  // 儲存設定（合併現有設定，避免覆蓋）
  saveSettings(settings) {
    try {
      // 先讀取現有設定
      const existingSettings = this.getSettings();
      // 合併設定（新設定覆蓋舊設定）
      const mergedSettings = { ...existingSettings, ...settings };
      localStorage.setItem(`${NAMESPACE}settings`, JSON.stringify(mergedSettings));
      return true;
    } catch (error) {
      console.error('Error saving settings:', error);
      return false;
    }
  }

  // 預設設定
  getDefaultSettings() {
    return {
      theme: 'auto',
      language: 'zh-TW',
      googleDriveEnabled: false,
      googleDriveFileId: null,
      lastUserName: null,
      maxHistoryRecords: 100
    };
  }

  // 取得所有回顧記錄
  getRetrospectives() {
    try {
      const data = localStorage.getItem(`${NAMESPACE}retrospectives`);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading retrospectives:', error);
      return [];
    }
  }

  // 儲存回顧記錄
  saveRetrospectives(retrospectives) {
    try {
      localStorage.setItem(`${NAMESPACE}retrospectives`, JSON.stringify(retrospectives));
      return true;
    } catch (error) {
      console.error('Error saving retrospectives:', error);
      return false;
    }
  }

  // 新增回顧記錄
  addRetrospective(retrospective) {
    const retrospectives = this.getRetrospectives();
    retrospectives.push(retrospective);
    this.saveRetrospectives(retrospectives);
    return retrospective;
  }

  // 更新回顧記錄
  updateRetrospective(id, updates) {
    const retrospectives = this.getRetrospectives();
    const index = retrospectives.findIndex(r => r.id === id);
    if (index !== -1) {
      retrospectives[index] = { ...retrospectives[index], ...updates };
      this.saveRetrospectives(retrospectives);
      return retrospectives[index];
    }
    return null;
  }

  // 刪除回顧記錄
  deleteRetrospective(id) {
    const retrospectives = this.getRetrospectives();
    const filtered = retrospectives.filter(r => r.id !== id);
    this.saveRetrospectives(filtered);
    return filtered.length < retrospectives.length;
  }

  // 取得黑名單
  getBlacklist() {
    try {
      const data = localStorage.getItem(`${NAMESPACE}blacklist`);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading blacklist:', error);
      return [];
    }
  }

  // 儲存黑名單
  saveBlacklist(blacklist) {
    try {
      localStorage.setItem(`${NAMESPACE}blacklist`, JSON.stringify(blacklist));
      return true;
    } catch (error) {
      console.error('Error saving blacklist:', error);
      return false;
    }
  }

  // 清除所有資料
  clearAll() {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(NAMESPACE)) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }

  // 清除歷史記錄
  clearHistory() {
    try {
      localStorage.removeItem(`${NAMESPACE}retrospectives`);
      return true;
    } catch (error) {
      console.error('Error clearing history:', error);
      return false;
    }
  }
}

