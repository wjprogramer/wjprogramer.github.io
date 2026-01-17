// Google Drive 儲存實作
import { signInWithGoogle, tryRestoreGoogleSignIn, signOutFromGoogle, isSignedIn, getAccessToken, getUserInfo, initGoogleAPI } from '../googleAuth.js';

const DRIVE_FILE_NAME = 'retro-data.json';
const DRIVE_FILE_MIME_TYPE = 'application/json';

export class GoogleDriveStorage {
  constructor() {
    this.fileId = null;
    this.initialized = false;
  }

  // 初始化 Google Drive
  async init() {
    if (this.initialized) {
      // 如果已經初始化，檢查是否仍然登入
      if (isSignedIn()) {
        console.log('Google Drive: Already signed in');
        return true;
      }
      // 嘗試恢復登入狀態
      try {
        console.log('Google Drive: Attempting to restore sign-in...');
        const restored = await tryRestoreGoogleSignIn();
        if (restored && isSignedIn()) {
          console.log('Google Drive: Sign-in restored successfully');
          return true;
        } else {
          console.log('Google Drive: Sign-in restore failed or token invalid');
        }
      } catch (error) {
        console.error('Error restoring Google sign-in:', error);
      }
      return false;
    }
    
    try {
      await initGoogleAPI();
      this.initialized = true;
      console.log('Google Drive: API initialized');
      
      // 嘗試恢復登入狀態（必須在 initGoogleAPI 之後）
      try {
        console.log('Google Drive: Attempting to restore sign-in after init...');
        const restored = await tryRestoreGoogleSignIn();
        if (restored && isSignedIn()) {
          console.log('Google Drive: Sign-in restored successfully after init');
          return true;
        } else {
          console.log('Google Drive: Sign-in restore failed after init, restored:', restored, 'isSignedIn:', isSignedIn());
        }
      } catch (error) {
        console.error('Error restoring Google sign-in:', error);
        // 恢復失敗是正常的（用戶可能還沒登入過），繼續初始化
      }
      
      return true;
    } catch (error) {
      console.error('Error initializing Google Drive:', error);
      return false;
    }
  }

  // 登入 Google 帳號
  async signIn() {
    try {
      await this.init();
      const result = await signInWithGoogle();
      const userInfo = await getUserInfo();
      return {
        success: true,
        user: userInfo
      };
    } catch (error) {
      console.error('Error signing in:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // 登出 Google 帳號
  signOut() {
    signOutFromGoogle();
    this.fileId = null;
  }

  // 檢查是否已登入
  isAuthenticated() {
    return isSignedIn();
  }

  // 取得或建立檔案
  async getOrCreateFile() {
    if (!isSignedIn()) {
      throw new Error('未登入 Google 帳號');
    }

    // 如果已經有 fileId，直接返回（避免重複查詢）
    if (this.fileId) {
      return this.fileId;
    }

    // 先嘗試尋找現有檔案
    try {
      const response = await gapi.client.drive.files.list({
        q: `name='${DRIVE_FILE_NAME}' and trashed=false`,
        fields: 'files(id, name)',
        spaces: 'appDataFolder' // 使用 appDataFolder 確保檔案私有
      });

      if (response.result.files && response.result.files.length > 0) {
        this.fileId = response.result.files[0].id;
        return this.fileId;
      }
    } catch (error) {
      console.error('Error searching for file:', error);
      // 如果是範圍不足的錯誤，重新請求授權
      if (error.status === 403 && error.body && error.body.includes('insufficientScopes')) {
        throw new Error('授權範圍不足，請重新登入並授權所有必要的權限');
      }
    }

    // 如果找不到，建立新檔案
    try {
      const fileMetadata = {
        name: DRIVE_FILE_NAME,
        parents: ['appDataFolder'] // 使用 appDataFolder 確保檔案私有
      };

      const response = await gapi.client.drive.files.create({
        resource: fileMetadata,
        fields: 'id'
      });

      this.fileId = response.result.id;
      return this.fileId;
    } catch (error) {
      console.error('Error creating file:', error);
      // 如果是範圍不足的錯誤，重新請求授權
      if (error.status === 403 && error.body && error.body.includes('insufficientScopes')) {
        throw new Error('授權範圍不足，請重新登入並授權所有必要的權限');
      }
      throw error;
    }
  }

  // 讀取檔案內容
  async readFile() {
    if (!isSignedIn()) {
      throw new Error('未登入 Google 帳號');
    }

    try {
      await this.getOrCreateFile();
      
      const response = await gapi.client.drive.files.get({
        fileId: this.fileId,
        alt: 'media'
      });

      if (response.body) {
        return JSON.parse(response.body);
      }
      return this.getDefaultData();
    } catch (error) {
      // 如果檔案不存在或為空，返回預設值
      if (error.status === 404 || error.status === 400 || error.status === 403) {
        return this.getDefaultData();
      }
      console.error('Error reading file:', error);
      throw error;
    }
  }

  // 寫入檔案內容
  async writeFile(data) {
    if (!isSignedIn()) {
      throw new Error('未登入 Google 帳號');
    }

    try {
      await this.getOrCreateFile();
      
      const fileContent = JSON.stringify(data, null, 2);
      const accessToken = getAccessToken();
      
      // 使用 fetch API 上傳檔案內容
      const response = await fetch(
        `https://www.googleapis.com/upload/drive/v3/files/${this.fileId}?uploadType=media`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': DRIVE_FILE_MIME_TYPE
          },
          body: fileContent
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error('Error writing file:', error);
      throw error;
    }
  }

  // 取得預設資料結構
  getDefaultData() {
    return {
      retrospectives: [],
      settings: {
        theme: 'auto',
        language: 'zh-TW',
        googleDriveEnabled: true,
        googleDriveFileId: this.fileId,
        lastUserName: null,
        maxHistoryRecords: 100
      }
    };
  }

  // 取得設定
  async getSettings() {
    try {
      const data = await this.readFile();
      return data.settings || this.getDefaultData().settings;
    } catch (error) {
      console.error('Error getting settings:', error);
      return this.getDefaultData().settings;
    }
  }

  // 儲存設定
  async saveSettings(settings) {
    try {
      const data = await this.readFile();
      data.settings = { ...data.settings, ...settings };
      await this.writeFile(data);
      return true;
    } catch (error) {
      console.error('Error saving settings:', error);
      return false;
    }
  }

  // 取得所有回顧記錄
  async getRetrospectives() {
    try {
      const data = await this.readFile();
      return data.retrospectives || [];
    } catch (error) {
      console.error('Error getting retrospectives:', error);
      return [];
    }
  }

  // 儲存回顧記錄
  async saveRetrospectives(retrospectives) {
    try {
      // 讀取完整資料（包含 settings 等）
      const data = await this.readFile();
      data.retrospectives = retrospectives;
      // 直接寫入，不需要再次讀取
      await this.writeFile(data);
      return true;
    } catch (error) {
      console.error('Error saving retrospectives:', error);
      return false;
    }
  }

  // 新增回顧記錄
  async addRetrospective(retrospective) {
    try {
      // 只讀取一次完整資料
      const data = await this.readFile();
      const retrospectives = data.retrospectives || [];
      retrospectives.push(retrospective);
      // 直接寫入，避免在 saveRetrospectives 中再次讀取
      data.retrospectives = retrospectives;
      await this.writeFile(data);
      return retrospective;
    } catch (error) {
      console.error('Error adding retrospective:', error);
      throw error;
    }
  }

  // 更新回顧記錄
  async updateRetrospective(id, updates) {
    try {
      // 只讀取一次完整資料
      const data = await this.readFile();
      const retrospectives = data.retrospectives || [];
      const index = retrospectives.findIndex(r => r.id === id);
      if (index !== -1) {
        retrospectives[index] = { ...retrospectives[index], ...updates };
        // 直接寫入，避免在 saveRetrospectives 中再次讀取
        data.retrospectives = retrospectives;
        await this.writeFile(data);
        return retrospectives[index];
      }
      return null;
    } catch (error) {
      console.error('Error updating retrospective:', error);
      throw error;
    }
  }

  // 刪除回顧記錄
  async deleteRetrospective(id) {
    try {
      // 只讀取一次完整資料
      const data = await this.readFile();
      const retrospectives = data.retrospectives || [];
      const originalLength = retrospectives.length;
      const filtered = retrospectives.filter(r => r.id !== id);
      
      // 如果沒有找到要刪除的項目，返回 false
      if (filtered.length === originalLength) {
        return false;
      }
      
      // 更新資料並直接寫入，避免在 saveRetrospectives 中再次讀取
      data.retrospectives = filtered;
      await this.writeFile(data);
      return true;
    } catch (error) {
      console.error('Error deleting retrospective:', error);
      return false;
    }
  }

  // 取得黑名單
  async getBlacklist() {
    try {
      const data = await this.readFile();
      return data.blacklist || [];
    } catch (error) {
      console.error('Error getting blacklist:', error);
      return [];
    }
  }

  // 儲存黑名單
  async saveBlacklist(blacklist) {
    try {
      const data = await this.readFile();
      data.blacklist = blacklist;
      await this.writeFile(data);
      return true;
    } catch (error) {
      console.error('Error saving blacklist:', error);
      return false;
    }
  }

  // 清除所有資料
  async clearAll() {
    try {
      const defaultData = this.getDefaultData();
      await this.writeFile(defaultData);
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }

  // 清除歷史記錄
  async clearHistory() {
    try {
      const data = await this.readFile();
      data.retrospectives = [];
      await this.writeFile(data);
      return true;
    } catch (error) {
      console.error('Error clearing history:', error);
      return false;
    }
  }
}
