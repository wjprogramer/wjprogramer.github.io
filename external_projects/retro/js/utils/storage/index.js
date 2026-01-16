// Storage 工廠
import { LocalStorage } from './localStorage.js';
import { GoogleDriveStorage } from './googleDrive.js';

class StorageManager {
  constructor() {
    this.localStorage = new LocalStorage();
    this.googleDrive = new GoogleDriveStorage();
    this.currentStorage = this.localStorage; // 預設使用 localStorage
  }

  // 初始化 Google Drive
  async initGoogleDrive() {
    const result = await this.googleDrive.init();
    
    // 如果初始化成功且已登入，切換到 Google Drive storage
    if (result && this.googleDrive.isAuthenticated()) {
      console.log('StorageManager: Switching to Google Drive storage');
      this.currentStorage = this.googleDrive;
    } else {
      console.log('StorageManager: Not switching to Google Drive, result:', result, 'isAuthenticated:', this.googleDrive.isAuthenticated());
    }
    
    return result;
  }

  // 登入 Google 帳號並切換到 Google Drive
  async signInToGoogleDrive() {
    const result = await this.googleDrive.signIn();
    if (result.success) {
      this.currentStorage = this.googleDrive;
      // 更新設定（同時保存到 localStorage 和 Google Drive，確保重整後能讀取）
      const settings = await this.getSettings();
      settings.googleDriveEnabled = true;
      // 先保存到 localStorage（作為備份，確保重整後能讀取）
      this.localStorage.saveSettings(settings);
      // 再保存到 Google Drive
      await this.saveSettings(settings);
      return result;
    }
    return result;
  }

  // 登出 Google 帳號並切換回 localStorage
  signOutFromGoogleDrive() {
    this.googleDrive.signOut();
    this.currentStorage = this.localStorage;
    // 更新設定
    const settings = this.localStorage.getSettings();
    settings.googleDriveEnabled = false;
    settings.googleDriveFileId = null;
    this.localStorage.saveSettings(settings);
  }

  // 檢查是否使用 Google Drive
  isUsingGoogleDrive() {
    const isCurrent = this.currentStorage === this.googleDrive;
    const isAuth = this.googleDrive.isAuthenticated();
    console.log('isUsingGoogleDrive: currentStorage === googleDrive:', isCurrent, 'isAuthenticated:', isAuth);
    return isCurrent && isAuth;
  }

  // 取得當前儲存實例
  getCurrentStorage() {
    return this.currentStorage;
  }

  // 代理所有方法到當前儲存實例
  async getSettings() {
    if (this.isUsingGoogleDrive()) {
      return await this.currentStorage.getSettings();
    }
    return Promise.resolve(this.currentStorage.getSettings());
  }

  async saveSettings(settings) {
    if (this.isUsingGoogleDrive()) {
      return await this.currentStorage.saveSettings(settings);
    }
    return Promise.resolve(this.currentStorage.saveSettings(settings));
  }

  async getRetrospectives() {
    if (this.isUsingGoogleDrive()) {
      return await this.currentStorage.getRetrospectives();
    }
    return Promise.resolve(this.currentStorage.getRetrospectives());
  }

  async saveRetrospectives(retrospectives) {
    if (this.isUsingGoogleDrive()) {
      return await this.currentStorage.saveRetrospectives(retrospectives);
    }
    return Promise.resolve(this.currentStorage.saveRetrospectives(retrospectives));
  }

  async addRetrospective(retrospective) {
    if (this.isUsingGoogleDrive()) {
      return await this.currentStorage.addRetrospective(retrospective);
    }
    return Promise.resolve(this.currentStorage.addRetrospective(retrospective));
  }

  async updateRetrospective(id, updates) {
    if (this.isUsingGoogleDrive()) {
      return await this.currentStorage.updateRetrospective(id, updates);
    }
    return Promise.resolve(this.currentStorage.updateRetrospective(id, updates));
  }

  async deleteRetrospective(id) {
    if (this.isUsingGoogleDrive()) {
      return await this.currentStorage.deleteRetrospective(id);
    }
    return Promise.resolve(this.currentStorage.deleteRetrospective(id));
  }

  async getBlacklist() {
    if (this.isUsingGoogleDrive()) {
      return await this.currentStorage.getBlacklist();
    }
    return Promise.resolve(this.currentStorage.getBlacklist());
  }

  async saveBlacklist(blacklist) {
    if (this.isUsingGoogleDrive()) {
      return await this.currentStorage.saveBlacklist(blacklist);
    }
    return Promise.resolve(this.currentStorage.saveBlacklist(blacklist));
  }

  async clearAll() {
    if (this.isUsingGoogleDrive()) {
      return await this.currentStorage.clearAll();
    }
    return Promise.resolve(this.currentStorage.clearAll());
  }

  async clearHistory() {
    if (this.isUsingGoogleDrive()) {
      return await this.currentStorage.clearHistory();
    }
    return Promise.resolve(this.currentStorage.clearHistory());
  }

  // 同步資料（已移除，localStorage 和 Google Drive 資料分開管理）
  // 注意：localStorage 和 Google Drive 的資料是獨立的，不會互相同步
  async syncData() {
    // 此功能已移除，因為 localStorage 和 Google Drive 的資料應該分開管理
    console.warn('syncData() 已移除，localStorage 和 Google Drive 資料是分開的');
    return Promise.resolve();
  }
}

export const storage = new StorageManager();

