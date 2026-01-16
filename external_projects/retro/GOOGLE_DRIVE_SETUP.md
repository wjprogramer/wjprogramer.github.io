# Google Drive 整合設定說明

## 前置需求

1. Google Cloud Console 帳號
2. 建立 OAuth 2.0 憑證

## 設定步驟

### 1. 建立 Google Cloud 專案

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 建立新專案或選擇現有專案

### 2. 啟用 Google Drive API

1. 在專案中，前往「API 和服務」>「程式庫」
2. 搜尋「Google Drive API」
3. 點擊「啟用」

### 3. 建立 OAuth 2.0 憑證

1. 前往「API 和服務」>「憑證」
2. 點擊「建立憑證」>「OAuth 用戶端 ID」
3. 應用程式類型選擇「網頁應用程式」
4. 設定授權的 JavaScript 來源：
   - 如果是 GitHub Pages：`https://yourusername.github.io`
   - 如果是本地開發：`http://localhost:8000`
5. 設定授權的重新導向 URI（如果需要）：
   - `https://yourusername.github.io`
   - `http://localhost:8000`
6. 建立後，複製「用戶端 ID」

### 4. 設定 Client ID

1. 開啟 `js/utils/googleAuth.js`
2. 將 `YOUR_GOOGLE_CLIENT_ID_HERE` 替換為你的 Client ID：

```javascript
const GOOGLE_CLIENT_ID = '你的-Client-ID-這裡';
```

### 5. 設定授權範圍

Google Drive API 需要以下範圍：
- `https://www.googleapis.com/auth/drive.file` - 存取使用者建立的檔案

這些範圍已經在程式碼中設定好了。

## 使用方式

1. 前往設定頁面
2. 點擊「登入 Google 帳號」按鈕
3. 授權應用程式存取 Google Drive
4. 連結成功後，資料會自動同步到 Google Drive

## 測試使用者設定

在應用程式驗證完成前，應用程式處於「測試」狀態，需要將使用者加入測試人員名單：

### 添加測試使用者

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 選擇你的專案
3. 前往「API 和服務」>「OAuth 同意畫面」
4. 在「測試使用者」區塊，點擊「+ 新增使用者」
5. 輸入要添加的 Google 帳號（例如：`your-email@gmail.com`）
6. 點擊「新增」並「儲存」

### 測試階段限制

- 最多可添加 100 位測試使用者
- 只有被添加的測試使用者可以使用應用程式
- 若需要公開使用，需要提交應用程式驗證（免費，但需審核）

## 注意事項

- 檔案會儲存在 Google Drive 的「應用程式資料資料夾」中，使用者無法直接看到
- 資料會自動同步，無需手動操作
- 可以隨時取消連結，切換回 localStorage
