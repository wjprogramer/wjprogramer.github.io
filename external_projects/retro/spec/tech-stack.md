# 技術架構規格

## 技術選型

### 應用程式架構

- **SPA（Single Page Application）** - 單頁應用架構
  - **核心概念**：整個應用程式只有一個 HTML 檔案（`index.html`），所有頁面切換在客戶端完成
  - **路由方式**：使用 Hash-based 路由（`#/path`），適合 GitHub Pages 靜態部署
  - **頁面切換**：透過 JavaScript 動態更新 DOM，無需重新載入頁面
  - **狀態管理**：使用 JavaScript 物件和 localStorage 管理應用程式狀態

**SPA 優點**：
- ✅ **流暢的使用者體驗**：頁面切換無需重新載入，過渡動畫流暢
- ✅ **快速響應**：減少伺服器請求，所有邏輯在客戶端執行
- ✅ **適合 GitHub Pages**：靜態網站託管，無需伺服器端配置
- ✅ **離線能力**：可以實作 PWA，支援離線使用
- ✅ **狀態保持**：頁面切換時保持應用程式狀態

### 核心技術

- **HTML5** - 頁面結構
- **CSS3** - 樣式與動畫（支援 RWD）
- **JavaScript (ES6+)** - 邏輯與互動
- **ES Modules** - 模組化程式碼組織
- **Hash-based Router** - 客戶端路由管理

### 建置方式

**第一階段（MVP）**：
- **純 HTML/CSS/JS**：無需建置流程（無 Vite、Webpack 等）
- **直接部署**：檔案可直接部署到 GitHub Pages
- **CDN 載入**：第三方函式庫透過 CDN 載入（如需要）
- **ES Modules**：使用原生 ES Modules，現代瀏覽器直接支援

**優點**：
- ✅ 簡單直接，無需複雜的建置配置
- ✅ 快速開發，修改後直接刷新瀏覽器即可看到效果
- ✅ 適合 GitHub Pages 靜態部署
- ✅ 減少依賴，降低複雜度

**注意事項**：
- 需要現代瀏覽器支援 ES Modules
- 第三方庫建議使用 CDN 載入，避免版本管理問題

### 第三方函式庫

#### 1. WebRTC 相關

**選項 A：PeerJS（推薦）**
- **優點**：
  - 簡單易用的 API
  - 提供免費的信號伺服器
  - 良好的文件與社群支援
- **缺點**：
  - 依賴第三方信號伺服器（可能不穩定）
  - 免費版有連線數限制
- **CDN**：`https://unpkg.com/peerjs@1.4.7/dist/peerjs.min.js`

**選項 B：原生 WebRTC API**
- **優點**：
  - 不依賴第三方庫
  - 完全控制
- **缺點**：
  - 需要自己實作信號交換
  - 實作複雜度高
- **建議**：不採用，實作複雜度過高

**決定**：使用 **PeerJS**，實作簡單且提供信號服務

**信號伺服器選擇**：
- **第一階段**：不實作（只做單人模式，不需要 WebRTC）
- **第二階段**：只支援 PeerJS 提供的免費信號伺服器（`0.peerjs.com`）
- **未來**：可選支援使用者輸入自建信號伺服器位址

#### 2. QR Code 生成與掃描

**QR Code 生成**：
- **選項：qrcode.js**
  - **CDN**：`https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js`
  - **用途**：房主端生成會議 ID 的 QR Code
  - **功能**：將連線 URL 轉換為 QR Code 圖片

**QR Code 掃描**：
- **選項 A：HTML5 Camera API + jsQR**（推薦）
  - **jsQR CDN**：`https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js`
  - **優點**：純前端實作，無需額外依賴
  - **功能**：使用手機相機掃描 QR Code
  - **實作**：
    - 使用 `getUserMedia()` API 取得相機權限
    - 使用 `jsQR` 解析 QR Code
    - 解析 URL 中的會議 ID
- **選項 B：原生相機掃描**（備用）
  - 使用手機原生相機 App 掃描
  - 掃描後自動開啟瀏覽器並導航到 URL
  - 需要手動輸入會議 ID（如果原生 App 不支援自動開啟）

**決定**：
- **房主端**：使用 `qrcode.js` 生成 QR Code
- **參與者端**：使用 `jsQR` + HTML5 Camera API 掃描 QR Code
- **備用方案**：提供手動輸入選項

#### 3. Google Drive API

**用途**：可選的雲端儲存功能

**實作方式**：
- 使用 Google Drive API v3
- 需要使用者授權（OAuth 2.0）
- 儲存 JSON 格式的回顧記錄
- 支援讀取、寫入、刪除操作

**API 限制**：
- 每日配額限制
- 需要處理授權過期情況
- 需要處理 API 錯誤

**CDN**：使用 Google API Client Library
- `https://apis.google.com/js/api.js`

#### 4. 匯出功能庫

**Markdown 匯出**：
- 使用原生 JavaScript 生成 Markdown 文字
- 無需第三方庫

**圖片匯出**：
- **選項：html2canvas**
  - **CDN**：`https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js`
  - **用途**：將 HTML 內容轉換為圖片
  - **功能**：生成 PNG/JPG 格式的圖片

**PDF 匯出**（可選）：
- **選項：jsPDF**
  - **CDN**：`https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js`
  - **用途**：生成 PDF 文件
  - **功能**：將內容轉換為 PDF 格式

#### 5. 其他工具庫（可選）

- **Chart.js**（可選）：統計圖表
  - CDN：`https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js`

---

## 專案結構

```
external_projects/retro/
├── index.html                    # SPA 入口
├── README.md                     # 專案說明
├── spec/                         # 規格文件
│   ├── features.md
│   ├── tech-stack.md
│   ├── ui-design.md
│   └── data-structure.md
├── css/
│   ├── variables.css             # CSS 變數（顏色、字體等）
│   ├── reset.css                 # CSS Reset
│   ├── main.css                  # 主樣式
│   ├── themes/                   # 主題樣式
│   │   ├── light.css
│   │   └── dark.css
│   └── components/               # 元件樣式
│       ├── card.css              # 回顧卡片樣式
│       ├── button.css            # 按鈕樣式
│       ├── modal.css             # 模態框樣式
│       ├── header.css            # Header 樣式
│       └── participant-list.css  # 參與者列表樣式
├── js/
│   ├── app.js                    # 應用程式入口（SPA 初始化）
│   ├── router.js                 # Hash-based 路由管理
│   ├── pages/                    # 頁面元件（SPA 路由對應的頁面）
│   │   ├── home.js               # 首頁（模式選擇）
│   │   ├── host.js               # 房主模式頁面
│   │   ├── join.js               # 參與者加入會議頁面
│   │   ├── retrospective.js      # 回顧會議頁面
│   │   ├── history.js            # 歷史記錄頁面
│   │   └── settings.js           # 設定頁面
│   ├── components/               # UI 元件（可重用的元件）
│   │   ├── RetroCard.js          # 回顧卡片元件
│   │   ├── VoteButton.js         # 投票按鈕元件
│   │   ├── ExportModal.js        # 匯出模態框
│   │   └── ParticipantList.js   # 參與者列表元件
│   ├── modes/                    # 模式實作（業務邏輯）
│   │   ├── HostMode.js           # 房主模式邏輯
│   │   └── ParticipantMode.js   # 參與者模式邏輯
│   ├── webrtc/                   # WebRTC 相關
│   │   ├── PeerManager.js        # P2P 連線管理
│   │   └── DataChannel.js        # 資料通道管理
│   ├── utils/                    # 工具函式
│   │   ├── storage/              # Storage 模組
│   │   │   ├── index.js          # Storage 工廠（localStorage + Google Drive）
│   │   │   ├── localStorage.js   # localStorage 實作
│   │   │   └── googleDrive.js    # Google Drive 實作
│   │   ├── theme.js              # 主題管理
│   │   ├── i18n.js               # 多國語系
│   │   ├── export.js             # 匯出功能
│   │   └── clipboard.js          # 剪貼簿操作
│   └── data/                     # 資料
│       └── i18n.js               # 多國語系文字
└── assets/                       # 靜態資源
    └── images/
        └── logo.svg
```

---

## SPA 路由設計

### Hash-based 路由

由於部署在 GitHub Pages 子目錄，使用 Hash 路由避免伺服器配置問題。

**為什麼使用 Hash 路由**：
- GitHub Pages 是靜態網站，不支援伺服器端路由
- Hash 路由（`#/path`）完全在客戶端處理，無需伺服器配置
- 所有路由變化不會觸發頁面重新載入
- 適合 SPA 架構

**路由定義**：

```
#/                          # 首頁（模式選擇）
#/host                      # 房主模式（建立會議室）
#/join/:meetingId          # 參與者加入會議（例如：#/join/A3B7C9）
#/retrospective/:meetingId  # 回顧會議頁面
#/history                   # 歷史記錄頁面
#/settings                  # 設定頁面
```

**路由範例**：
- `https://wjprogramer.github.io/external_projects/retro/#/` - 首頁
- `https://wjprogramer.github.io/external_projects/retro/#/host` - 房主模式
- `https://wjprogramer.github.io/external_projects/retro/#/join/A3B7C9` - 加入會議
- `https://wjprogramer.github.io/external_projects/retro/#/retrospective/A3B7C9` - 回顧會議

---

## WebRTC 架構設計

### 連線架構

**Star 架構（推薦）**：
- 房主作為中心節點
- 每個參與者直接連線到房主
- 房主管理所有連線
- 優點：連線數少（N-1 條連線），效能好
- 缺點：房主負擔較重

**連線流程**：

1. **信號伺服器配置**：
   ```javascript
   // 預設使用免費信號伺服器
   const config = {
     host: '0.peerjs.com',
     port: 443,
     path: '/',
     secure: true
   };
   ```

2. **房主建立會議室**：
   ```javascript
   const peer = new Peer(meetingId, config);
   ```

3. **參與者加入會議**：
   ```javascript
   const peer = new Peer(config);
   const conn = peer.connect(meetingId);
   ```

4. **資料交換**：
   ```javascript
   // 房主發送資料給所有參與者
   connections.forEach(conn => {
     conn.send(data);
   });
   
   // 參與者發送資料給房主
   conn.send(data);
   ```

### 資料同步協議

**訊息格式**：

```javascript
{
  type: 'RETRO_START' | 'RETRO_END' | 'ITEM_ADD' | 'ITEM_UPDATE' | 'ITEM_DELETE' | 'VOTE' | 'PARTICIPANT_JOIN' | 'PARTICIPANT_LEAVE',
  data: {
    // 根據 type 不同而異
  },
  timestamp: 1234567890,
  from: 'peerId'
}
```

**訊息類型**：

1. **RETRO_START**：房主通知開始回顧
2. **RETRO_END**：房主通知結束回顧
3. **ITEM_ADD**：參與者新增回顧項目
4. **ITEM_UPDATE**：參與者更新回顧項目
5. **ITEM_DELETE**：參與者刪除回顧項目
6. **VOTE**：參與者投票
7. **PARTICIPANT_JOIN**：參與者加入
8. **PARTICIPANT_LEAVE**：參與者離開

---

## 資料儲存設計

### Storage 抽象層

為了支援 localStorage 和 Google Drive 兩種儲存方式，實作 Storage 抽象層：

```javascript
// js/utils/storage/index.js
export class Storage {
  constructor(adapter) {
    this.adapter = adapter;
  }
  
  async get(key) {
    return await this.adapter.get(key);
  }
  
  async set(key, value) {
    return await this.adapter.set(key, value);
  }
  
  async remove(key) {
    return await this.adapter.remove(key);
  }
  
  async clear() {
    return await this.adapter.clear();
  }
}

// 工廠函數
export function createStorage(type = 'localStorage') {
  if (type === 'googleDrive') {
    return new Storage(new GoogleDriveAdapter());
  } else {
    return new Storage(new LocalStorageAdapter());
  }
}
```

### localStorage 命名空間

使用統一前綴：`retro_`

**儲存項目**：

1. **設定**：`retro_settings`
   ```javascript
   {
     theme: 'dark' | 'light' | 'auto',
     language: 'zh-TW' | 'en' | 'ja',
     googleDriveEnabled: false,
     googleDriveFileId: null
   }
   ```

2. **回顧記錄**：`retro_retrospectives`
   ```javascript
   [
     {
       id: 'uuid',
       meetingId: 'A3B7C9',
       title: 'Sprint 1 Retrospective',
       description: '...',
       date: '2024-01-01',
       participants: [...],
       items: [...],
       votes: {...}
     },
     // ...
   ]
   ```

3. **使用者資料**：`retro_user_data`
   ```javascript
   {
     name: 'John Doe',
     lastMeetingId: 'A3B7C9'
   }
   ```

### Google Drive 儲存

**檔案結構**：
- 單一 JSON 檔案儲存所有回顧記錄
- 檔案名稱：`retro-data.json`
- 格式：與 localStorage 相同

**實作方式**：
- 使用 Google Drive API v3
- 需要使用者授權
- 支援讀取、寫入、刪除操作

---

## 主題系統實作

### CSS 變數設計

```css
/* css/variables.css */
:root {
  /* Light Theme */
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f5f5f5;
  --color-text-primary: #333333;
  --color-text-secondary: #666666;
  --color-accent: #007bff;
  --color-card-bg: #ffffff;
  --color-card-shadow: rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] {
  --color-bg-primary: #1a1a1a;
  --color-bg-secondary: #2d2d2d;
  --color-text-primary: #ffffff;
  --color-text-secondary: #cccccc;
  --color-accent: #4da6ff;
  --color-card-bg: #2d2d2d;
  --color-card-shadow: rgba(0, 0, 0, 0.3);
}
```

### JavaScript 主題管理

```javascript
// js/utils/theme.js
export const theme = {
  init() {
    const savedTheme = storage.get('settings')?.theme || 'auto';
    this.setTheme(savedTheme);
    
    // 監聽系統主題變化
    if (savedTheme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        this.applyTheme(e.matches ? 'dark' : 'light');
      });
    }
  },
  
  setTheme(theme) {
    storage.set('settings', { ...storage.get('settings'), theme });
    
    if (theme === 'auto') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.applyTheme(isDark ? 'dark' : 'light');
    } else {
      this.applyTheme(theme);
    }
  },
  
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }
};
```

---

## 多國語系實作

### 語系資料結構

```javascript
// js/data/i18n.js
export const i18n = {
  'zh-TW': {
    'app.title': 'Retro - 團隊回顧工具',
    'mode.host': '房主模式',
    'mode.participant': '參與者模式',
    'retro.wentWrong': '問題點',
    'retro.wentWell': '做得好的地方',
    'retro.actionItems': '改進建議',
    // ...
  },
  'en': {
    'app.title': 'Retro - Team Retrospective Tool',
    'mode.host': 'Host Mode',
    'mode.participant': 'Participant Mode',
    'retro.wentWrong': 'What went wrong',
    'retro.wentWell': 'What went well',
    'retro.actionItems': 'Action items',
    // ...
  },
  'ja': {
    'app.title': 'Retro - チーム振り返りツール',
    'mode.host': 'ホストモード',
    'mode.participant': '参加者モード',
    'retro.wentWrong': '問題点',
    'retro.wentWell': '良かった点',
    'retro.actionItems': '改善提案',
    // ...
  }
};
```

### 語系管理工具

```javascript
// js/utils/i18n.js
import { i18n } from '../data/i18n.js';

export const i18nManager = {
  currentLang: 'zh-TW',
  
  init() {
    const savedLang = storage.get('settings')?.language;
    const browserLang = navigator.language || navigator.userLanguage;
    
    // 決定預設語言
    if (savedLang) {
      this.setLanguage(savedLang);
    } else if (i18n[browserLang]) {
      this.setLanguage(browserLang);
    } else if (i18n[browserLang.split('-')[0]]) {
      this.setLanguage(browserLang.split('-')[0]);
    } else {
      this.setLanguage('en');
    }
  },
  
  setLanguage(lang) {
    if (!i18n[lang]) return;
    this.currentLang = lang;
    storage.set('settings', { ...storage.get('settings'), language: lang });
    this.updateTexts();
  },
  
  t(key) {
    return i18n[this.currentLang]?.[key] || key;
  },
  
  updateTexts() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = this.t(key);
    });
  }
};
```

---

## 匯出功能實作

### Markdown 匯出

```javascript
// js/utils/export.js
export function exportToMarkdown(retrospective) {
  let markdown = `# ${retrospective.title}\n\n`;
  markdown += `**日期**：${retrospective.date}\n\n`;
  markdown += `**參與者**：${retrospective.participants.join(', ')}\n\n`;
  
  // 問題點
  markdown += `## 問題點\n\n`;
  retrospective.items.wentWrong.forEach(item => {
    markdown += `- ${item.text} (投票: ${item.votes})\n`;
  });
  
  // 做得好的地方
  markdown += `\n## 做得好的地方\n\n`;
  retrospective.items.wentWell.forEach(item => {
    markdown += `- ${item.text} (投票: ${item.votes})\n`;
  });
  
  // 改進建議
  markdown += `\n## 改進建議\n\n`;
  retrospective.items.actionItems.forEach(item => {
    markdown += `- ${item.text} (投票: ${item.votes})\n`;
  });
  
  return markdown;
}
```

### 圖片匯出

```javascript
// js/utils/export.js
import html2canvas from 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';

export async function exportToImage(element, filename = 'retro.png') {
  const canvas = await html2canvas(element);
  const dataUrl = canvas.toDataURL('image/png');
  
  // 下載圖片
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}
```

---

## 效能優化

### 1. 程式碼分割

- 使用 ES Modules 動態載入
- 按需載入模式相關程式碼

### 2. 資源優化

- 圖片使用 SVG 或 WebP
- CSS 壓縮
- JavaScript 壓縮（部署時）

### 3. 快取策略

- localStorage 快取設定
- 避免重複計算

### 4. 動畫優化

- 使用 CSS Transform 而非改變位置
- 使用 `will-change` 提示瀏覽器
- 避免觸發重排（reflow）

---

## 瀏覽器相容性

### 最低要求

- Chrome/Edge：最新 2 個版本
- Firefox：最新 2 個版本
- Safari：最新 2 個版本
- Mobile Safari：iOS 14+
- Chrome Mobile：Android 8+

### 功能檢測

```javascript
// 檢測 WebRTC 支援
if (!window.RTCPeerConnection && !window.webkitRTCPeerConnection) {
  // 不支援 WebRTC，隱藏協作模式
}

// 檢測 localStorage 支援
if (!window.localStorage) {
  // 提示使用者升級瀏覽器
}
```

---

## 安全性考量

### 1. XSS 防護

- 避免使用 `innerHTML`，使用 `textContent`
- 如必須使用 `innerHTML`，進行內容清理

### 2. 資料驗證

- 驗證使用者輸入（會議 ID、名稱等）
- 限制輸入長度與格式

### 3. 連線安全

- 使用 HTTPS（GitHub Pages 預設提供）
- WebRTC 使用安全傳輸

### 4. Google Drive API 安全

- 使用 OAuth 2.0 授權
- 處理授權過期情況
- 不儲存敏感資訊

---

## 部署考量

### GitHub Pages 限制

1. **靜態檔案**：只能部署靜態檔案
2. **無後端**：無法執行伺服器端程式碼
3. **CORS**：跨域請求有限制

### 解決方案

1. **純前端實作**：所有邏輯在前端完成
2. **P2P 連線**：使用 WebRTC 不依賴伺服器
3. **CDN 載入**：第三方庫使用 CDN
4. **Google Drive API**：使用 Google 提供的 API，無需自架後端

### 部署流程

1. 開發完成後，推送到 GitHub
2. GitHub Pages 自動部署
3. 訪問：`https://wjprogramer.github.io/external_projects/retro/`

