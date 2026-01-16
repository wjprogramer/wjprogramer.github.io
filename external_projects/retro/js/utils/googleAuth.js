// Google OAuth 2.0 認證
// 需要在 Google Cloud Console 設定 OAuth 2.0 憑證
// 並將 Client ID 設定在環境變數或配置中

let gapiLoaded = false;
let gisLoaded = false;
let tokenClient = null;

// Google API Client ID（需要替換為你的 Client ID）
// 可以在 Google Cloud Console 建立 OAuth 2.0 憑證後取得
// 注意：需要在 Google Cloud Console 設定授權的 JavaScript 來源（如 https://yourdomain.github.io）
const GOOGLE_CLIENT_ID = '721204833689-bmj88gocbjevi9ksfcthbmog3lt6e886.apps.googleusercontent.com';

// 等待 Google API 載入
export function loadGoogleAPI() {
  return new Promise((resolve, reject) => {
    if (gapiLoaded && gisLoaded) {
      resolve();
      return;
    }

    // 載入 Google API Client Library
    if (typeof gapi !== 'undefined' && !gapiLoaded) {
      gapi.load('client', {
        callback: () => {
          gapiLoaded = true;
          if (gisLoaded) resolve();
        },
        onerror: reject
      });
    } else if (typeof gapi === 'undefined') {
      // 如果 gapi 還沒載入，等待一下再試
      setTimeout(() => loadGoogleAPI().then(resolve).catch(reject), 100);
      return;
    } else {
      gapiLoaded = true;
    }

    // 載入 Google Identity Services
    if (typeof google !== 'undefined' && !gisLoaded) {
      gisLoaded = true;
      if (gapiLoaded) resolve();
    } else if (typeof google === 'undefined') {
      // 如果 google 還沒載入，等待一下再試
      setTimeout(() => {
        if (typeof google !== 'undefined') {
          gisLoaded = true;
        }
        if (gapiLoaded && gisLoaded) resolve();
      }, 100);
    }
  });
}

// 初始化 Google API
export async function initGoogleAPI() {
  await loadGoogleAPI();
  
  if (typeof gapi === 'undefined') {
    throw new Error('Google API Client Library 未載入');
  }

  // 初始化 Google API Client
  await gapi.client.init({
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
  });
}

// 保存 token 到 localStorage
function saveTokenToStorage(token) {
  try {
    localStorage.setItem('google_drive_token', JSON.stringify({
      access_token: token.access_token,
      expires_at: Date.now() + (token.expires_in * 1000)
    }));
  } catch (error) {
    console.error('Error saving token to storage:', error);
  }
}

// 從 localStorage 恢復 token
function restoreTokenFromStorage() {
  try {
    const tokenData = localStorage.getItem('google_drive_token');
    if (!tokenData) return null;
    
    const token = JSON.parse(tokenData);
    
    // 檢查 token 是否過期（提前 1 分鐘過期，避免邊界情況）
    // 注意：Google OAuth token 通常有效期是 1 小時
    if (token.expires_at < (Date.now() + 1 * 60 * 1000)) {
      // Token 已過期或即將過期，清除它
      localStorage.removeItem('google_drive_token');
      return null;
    }
    
    return token;
  } catch (error) {
    console.error('Error restoring token from storage:', error);
    return null;
  }
}

// 清除保存的 token
function clearTokenFromStorage() {
  try {
    localStorage.removeItem('google_drive_token');
  } catch (error) {
    console.error('Error clearing token from storage:', error);
  }
}

// 嘗試恢復 Google 登入狀態
export async function tryRestoreGoogleSignIn() {
  try {
    // 先嘗試從 localStorage 恢復 token
    const savedToken = restoreTokenFromStorage();
    console.log('tryRestoreGoogleSignIn: savedToken found:', !!savedToken);
    
    if (savedToken) {
      // 確保 gapi 已初始化
      if (typeof gapi === 'undefined' || !gapi.client) {
        console.log('tryRestoreGoogleSignIn: gapi.client not ready, waiting...');
        // 等待 gapi 初始化
        let attempts = 0;
        while (attempts < 50 && (typeof gapi === 'undefined' || !gapi.client)) {
          await new Promise(resolve => setTimeout(resolve, 100));
          attempts++;
        }
        
        if (typeof gapi === 'undefined' || !gapi.client) {
          console.error('tryRestoreGoogleSignIn: gapi.client still not ready after waiting');
          return null;
        }
      }
      
      console.log('tryRestoreGoogleSignIn: Setting token to gapi.client');
      gapi.client.setToken({
        access_token: savedToken.access_token
      });
      
      // 驗證 token 是否設定成功
      const token = gapi.client.getToken();
      if (token && token.access_token) {
        console.log('tryRestoreGoogleSignIn: Token restored successfully');
        return {
          accessToken: savedToken.access_token,
          expiresIn: Math.floor((savedToken.expires_at - Date.now()) / 1000)
        };
      } else {
        console.error('tryRestoreGoogleSignIn: Token not set correctly');
      }
    } else {
      console.log('tryRestoreGoogleSignIn: No saved token found');
    }
    
    return null;
  } catch (error) {
    console.error('Error restoring Google sign-in:', error);
    return null;
  }
}

// 登入 Google 帳號
export function signInWithGoogle() {
  return new Promise((resolve, reject) => {
    if (typeof google === 'undefined') {
      reject(new Error('Google Identity Services 未載入'));
      return;
    }

    if (!tokenClient) {
      tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/drive.appdata', // 只使用 appDataFolder，不會存取使用者的其他檔案
        callback: (response) => {
          if (response.error) {
            reject(new Error(response.error));
            return;
          }
          
          // 設定 access token
          if (typeof gapi !== 'undefined' && gapi.client) {
            const token = {
              access_token: response.access_token
            };
            gapi.client.setToken(token);
            
            // 保存 token 到 localStorage
            saveTokenToStorage({
              access_token: response.access_token,
              expires_in: response.expires_in || 3600 // 預設 1 小時
            });
          }
          
          resolve({
            accessToken: response.access_token,
            expiresIn: response.expires_in
          });
        }
      });
    }

    tokenClient.requestAccessToken();
  });
}

// 登出 Google 帳號
export function signOutFromGoogle() {
  if (typeof google !== 'undefined' && gapi.client.getToken()) {
    const token = gapi.client.getToken();
    if (token) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken('');
    }
  }
  // 清除保存的 token
  clearTokenFromStorage();
}

// 檢查是否已登入
export function isSignedIn() {
  try {
    if (typeof gapi === 'undefined' || !gapi.client) {
      return false;
    }
    const token = gapi.client.getToken();
    return token !== null && token !== undefined;
  } catch (error) {
    console.error('Error checking sign-in status:', error);
    return false;
  }
}

// 取得當前 access token
export function getAccessToken() {
  const token = gapi.client.getToken();
  return token ? token.access_token : null;
}

// 取得使用者資訊
export async function getUserInfo() {
  try {
    // 使用 Google People API 或直接從 token 取得資訊
    // 注意：需要啟用 People API 或使用其他方式取得使用者資訊
    // 這裡先返回基本資訊
    const token = gapi.client.getToken();
    if (!token) {
      return null;
    }
    
    // 可以透過 token 解析或使用其他 API 取得使用者資訊
    // 暫時返回 null，實際使用時可以實作
    return {
      id: null,
      email: null,
      name: null,
      picture: null
    };
  } catch (error) {
    console.error('Error getting user info:', error);
    return null;
  }
}
