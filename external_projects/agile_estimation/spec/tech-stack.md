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

**SPA 實作要點**：
- 單一 HTML 入口：`index.html`
- 路由管理：Hash-based 路由系統
- 頁面元件：每個路由對應一個頁面元件
- 狀態管理：全域狀態和本地狀態管理
- 生命週期：頁面元件的載入、更新、清理

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
- **第一階段**：不實作（只做簡易模式，不需要 WebRTC）
- **第二階段**：只支援 PeerJS 提供的免費信號伺服器（`0.peerjs.com`）
- **第四階段**：支援使用者輸入自建信號伺服器位址
- **實作方式**：PeerJS 支援自訂信號伺服器配置，可以動態設定 `host`、`port`、`path` 等參數

**信號伺服器選擇實作**：

```javascript
// js/utils/signaling-config.js
import { storage } from './storage.js';

export function getSignalingConfig() {
  const settings = storage.get('settings') || {};
  const signalingConfig = settings.signalingServer || {};
  
  // 如果啟用自訂信號伺服器
  if (signalingConfig.enabled) {
    return {
      host: signalingConfig.host,
      port: signalingConfig.port || 443,
      path: signalingConfig.path || '/',
      secure: signalingConfig.secure !== false
    };
  }
  
  // 預設使用免費信號伺服器
  return {
    host: '0.peerjs.com',
    port: 443,
    path: '/',
    secure: true
  };
}

export function saveSignalingConfig(config) {
  const settings = storage.get('settings') || {};
  settings.signalingServer = {
    enabled: true,
    host: config.host,
    port: config.port || 443,
    path: config.path || '/',
    secure: config.secure !== false
  };
  storage.set('settings', settings);
}

export function resetToDefaultSignaling() {
  const settings = storage.get('settings') || {};
  settings.signalingServer = {
    enabled: false,
    host: '0.peerjs.com',
    port: 443,
    path: '/',
    secure: true
  };
  storage.set('settings', settings);
}

// 驗證信號伺服器位址格式
export function validateSignalingConfig(config) {
  const errors = [];
  
  if (!config.host || config.host.trim() === '') {
    errors.push('Host 不能為空');
  }
  
  // 驗證 IP 或域名格式
  const hostRegex = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$|^(\d{1,3}\.){3}\d{1,3}$/;
  if (config.host && !hostRegex.test(config.host)) {
    errors.push('Host 格式不正確（應為 IP 或域名）');
  }
  
  // 驗證 Port
  const port = parseInt(config.port);
  if (isNaN(port) || port < 1 || port > 65535) {
    errors.push('Port 必須是 1-65535 之間的數字');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}
```

**使用範例**：

```javascript
// js/modes/host-client.js
import { getSignalingConfig } from '../utils/signaling-config.js';
import Peer from 'peerjs';

// 建立 Peer 連線時使用配置
const config = getSignalingConfig();
const peer = new Peer(meetingId, config);

// 或使用 Socket.io 自建信號伺服器
import io from 'socket.io-client';
const signalingConfig = getSignalingConfig();
const socket = io(`${signalingConfig.secure ? 'https' : 'http'}://${signalingConfig.host}:${signalingConfig.port}${signalingConfig.path}`);
```

#### 2. QR Code 生成與掃描

**QR Code 生成**：
- **選項：qrcode.js**
  - **CDN**：`https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js`
  - **用途**：Host 端生成會議 ID 的 QR Code
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
- **Host 端**：使用 `qrcode.js` 生成 QR Code
- **Client 端**：使用 `jsQR` + HTML5 Camera API 掃描 QR Code
- **備用方案**：提供手動輸入選項

#### 3. 其他工具庫（可選）

- **Chart.js**（可選）：統計圖表
  - CDN：`https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js`

---

## 專案結構

```
external_projects/agile_estimation/
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
│       ├── card.css              # 估點牌樣式
│       ├── button.css            # 按鈕樣式
│       ├── modal.css             # 模態框樣式
│       ├── header.css            # Header 樣式
│       ├── participant-list.css  # 參與者列表樣式
│       └── stats.css             # 統計面板樣式
├── js/
│   ├── app.js                    # 應用程式入口（SPA 初始化）
│   ├── router.js                 # Hash-based 路由管理
│   ├── pages/                    # 頁面元件（SPA 路由對應的頁面）
│   │   ├── home.js               # 首頁（模式選擇）
│   │   ├── solo.js               # 簡易模式頁面
│   │   ├── host.js               # Host 模式頁面
│   │   ├── join.js               # Client 加入會議頁面
│   │   ├── settings.js           # 設定頁面
│   │   └── history.js            # 歷史記錄頁面（可選）
│   ├── components/               # UI 元件（可重用的元件）
│   │   ├── Card.js               # 估點牌元件
│   │   ├── Button.js             # 按鈕元件
│   │   ├── Modal.js              # 模態框元件
│   │   ├── Header.js             # Header 元件
│   │   └── ParticipantList.js   # 參與者列表元件
│   ├── modes/                    # 模式實作（業務邏輯）
│   │   ├── SoloMode.js           # 簡易模式邏輯
│   │   └── HostClientMode.js     # 協作模式邏輯
│   ├── webrtc/                   # WebRTC 相關
│   │   ├── PeerManager.js        # P2P 連線管理
│   │   ├── Signaling.js           # 信號處理（如需要）
│   │   └── DataChannel.js        # 資料通道管理
│   ├── utils/                    # 工具函式
│   │   ├── storage.js            # localStorage 封裝
│   │   ├── theme.js              # 主題管理
│   │   ├── i18n.js               # 多國語系
│   │   ├── clipboard.js          # 剪貼簿操作（複製連結、會議 ID 等）
│   │   ├── qrcode.js             # QR Code 生成（封裝）
│   │   └── uuid.js               # UUID 生成（如需要）
│   └── data/                     # 資料
│       ├── card-sets.js          # 估點牌組定義
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
#/                    # 首頁（模式選擇）
#/solo                # 簡易模式
#/host                # Host 模式（建立會議室）
#/join/:meetingId     # Client 加入會議（例如：#/join/A3B7C9）
#/settings            # 設定頁面（主題、語言、信號伺服器等）
#/history             # 歷史記錄頁面（可選）
```

**路由範例**：
- `https://wjprogramer.github.io/external_projects/agile_estimation/#/` - 首頁
- `https://wjprogramer.github.io/external_projects/agile_estimation/#/solo` - 簡易模式
- `https://wjprogramer.github.io/external_projects/agile_estimation/#/host` - Host 模式
- `https://wjprogramer.github.io/external_projects/agile_estimation/#/join/A3B7C9` - 加入會議

**實作範例**：

```javascript
// js/router.js
class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.currentHandler = null;
    
    // 監聽 Hash 變化
    window.addEventListener("hashchange", () => this.handleRoute());
    window.addEventListener("load", () => this.handleRoute());
  }

  // 註冊路由
  register(path, handler) {
    this.routes.set(path, handler);
    return this;
  }

  // 導航到指定路由
  navigate(path) {
    window.location.hash = path;
  }

  // 處理路由變化
  handleRoute() {
    const hash = window.location.hash.slice(1) || "/";
    const [path, queryString] = hash.split("?");
    const params = new URLSearchParams(queryString);
    
    // 解析動態路由參數（如 /join/:meetingId）
    const matchedRoute = this.matchRoute(path);
    
    if (matchedRoute) {
      const { route, params: routeParams } = matchedRoute;
      const handler = this.routes.get(route);
      
      if (handler) {
        // 清理上一個路由
        if (this.currentHandler && this.currentHandler.cleanup) {
          this.currentHandler.cleanup();
        }
        
        this.currentRoute = path;
        this.currentHandler = handler;
        
        // 執行路由處理器
        handler({ 
          path, 
          params: { ...routeParams, ...Object.fromEntries(params) }
        });
      } else {
        this.handleNotFound(path);
      }
    } else {
      this.handleNotFound(path);
    }
  }

  // 匹配動態路由（如 /join/:meetingId）
  matchRoute(path) {
    for (const [route, handler] of this.routes.entries()) {
      const routeParts = route.split('/');
      const pathParts = path.split('/');
      
      if (routeParts.length !== pathParts.length) continue;
      
      const params = {};
      let matched = true;
      
      for (let i = 0; i < routeParts.length; i++) {
        if (routeParts[i].startsWith(':')) {
          // 動態參數
          const paramName = routeParts[i].slice(1);
          params[paramName] = pathParts[i];
        } else if (routeParts[i] !== pathParts[i]) {
          matched = false;
          break;
        }
      }
      
      if (matched) {
        return { route, params };
      }
    }
    
    return null;
  }

  // 404 處理
  handleNotFound(path) {
    const app = document.getElementById("app");
    app.innerHTML = `
      <div class="error-page">
        <h1>404</h1>
        <p>找不到頁面：${path}</p>
        <a href="#/">返回首頁</a>
      </div>
    `;
  }
}

// 匯出單例
export const router = new Router();
```

**使用範例**：

```javascript
// js/app.js
import { router } from './router.js';
import { renderHome } from './pages/home.js';
import { renderSolo } from './pages/solo.js';
import { renderHost } from './pages/host.js';
import { renderJoin } from './pages/join.js';
import { renderSettings } from './pages/settings.js';

// 註冊路由
router
  .register('/', renderHome)
  .register('/solo', renderSolo)
  .register('/host', renderHost)
  .register('/join/:meetingId', renderJoin)
  .register('/settings', renderSettings);

// 導航到指定路由
router.navigate('/solo');
router.navigate('/join/A3B7C9');
```

### 頁面元件實作

每個路由對應一個頁面元件，頁面元件負責：
- 渲染頁面內容
- 處理頁面邏輯
- 清理資源（當離開頁面時）

**頁面元件範例**：

```javascript
// js/pages/solo.js
export function renderSolo({ path, params }) {
  const app = document.getElementById("app");
  
  // 渲染頁面內容
  app.innerHTML = `
    <div class="solo-page">
      <h1>簡易模式</h1>
      <div class="card-selection" id="card-selection"></div>
      <button id="flip-btn">翻牌</button>
    </div>
  `;
  
  // 初始化頁面邏輯
  initSoloMode();
  
  // 返回清理函式（可選）
  return {
    cleanup: () => {
      // 清理事件監聽器、定時器等
      console.log('Cleaning up solo page');
    }
  };
}

function initSoloMode() {
  // 簡易模式的邏輯實作
  const cardSelection = document.getElementById('card-selection');
  const flipBtn = document.getElementById('flip-btn');
  
  // 初始化選牌功能
  // ...
}
```

**頁面元件生命週期**：

1. **載入**：路由匹配時，執行頁面元件的渲染函式
2. **初始化**：頁面元件初始化邏輯、事件監聽器等
3. **更新**：路由參數變化時，可以更新頁面內容
4. **清理**：離開頁面時，執行清理函式（移除事件監聽器、取消請求等）

### index.html 基本結構

SPA 的入口 HTML 檔案結構：

```html
<!DOCTYPE html>
<html lang="zh-TW" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>敏捷開發估點工具</title>
  
  <!-- CSS -->
  <link rel="stylesheet" href="css/variables.css">
  <link rel="stylesheet" href="css/reset.css">
  <link rel="stylesheet" href="css/main.css">
  <!-- ... 其他 CSS -->
</head>
<body>
  <!-- SPA 容器：所有頁面內容會動態載入到這裡 -->
  <div id="app"></div>
  
  <!-- 第三方函式庫（CDN） -->
  <script src="https://unpkg.com/peerjs@1.4.7/dist/peerjs.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js"></script>
  
  <!-- SPA 入口 -->
  <script type="module" src="js/app.js"></script>
</body>
</html>
```

**關鍵點**：
- 只有一個 `<div id="app">` 容器，所有頁面內容動態載入
- 使用 ES Modules（`type="module"`）載入 JavaScript
- 所有路由變化只更新 `#app` 的內容，不重新載入頁面

---

## WebRTC 架構設計

### 連線架構

**Star 架構（推薦）**：
- Host 作為中心節點
- 每個 Client 直接連線到 Host
- Host 管理所有連線
- 優點：連線數少（N-1 條連線），效能好
- 缺點：Host 負擔較重

**連線流程**：

1. **信號伺服器配置**：
   ```javascript
   // 從設定中讀取信號伺服器配置（預設或使用者自訂）
   function getSignalingConfig() {
     const customConfig = storage.get('signaling_config');
     
     if (customConfig && customConfig.enabled) {
       // 使用自訂信號伺服器
       return {
         host: customConfig.host,      // 例如：'192.168.1.100' 或 'signaling.example.com'
         port: customConfig.port || 443,
         path: customConfig.path || '/',
         secure: customConfig.secure !== false  // 預設 true（HTTPS/WSS）
       };
     } else {
       // 使用預設的免費信號伺服器
       return {
         host: '0.peerjs.com',
         port: 443,
         path: '/',
         secure: true
       };
     }
   }
   ```

2. **Host 建立會議室**：
   ```javascript
   const config = getSignalingConfig();
   const peer = new Peer(meetingId, config);
   ```

3. **Client 加入會議**：
   ```javascript
   const config = getSignalingConfig();
   const peer = new Peer(config);
   
   const conn = peer.connect(meetingId);
   ```

3. **資料交換**：
   ```javascript
   // Host 發送資料給所有 Client
   connections.forEach(conn => {
     conn.send(data);
   });
   
   // Client 發送資料給 Host
   conn.send(data);
   ```

### 資料同步協議

**訊息格式**：

```javascript
{
  type: 'ESTIMATE_START' | 'ESTIMATE_END' | 'FLIP_CARDS' | 'RESET' | 'ESTIMATE_SELECT' | 'PARTICIPANT_JOIN' | 'PARTICIPANT_LEAVE',
  data: {
    // 根據 type 不同而異
  },
  timestamp: 1234567890,
  from: 'peerId'
}
```

**訊息類型**：

1. **ESTIMATE_START**：Host 通知開始估點
2. **ESTIMATE_END**：Host 通知結束估點
3. **FLIP_CARDS**：Host 通知翻牌
4. **RESET**：Host 通知重置
5. **ESTIMATE_SELECT**：Client 通知選擇的牌
6. **PARTICIPANT_JOIN**：參與者加入
7. **PARTICIPANT_LEAVE**：參與者離開

---

## 資料儲存設計

### localStorage 命名空間

使用統一前綴：`agile_estimation_`

**儲存項目**：

1. **設定**：`agile_estimation_settings`**
   ```javascript
   {
     theme: 'dark' | 'light' | 'auto',
     language: 'zh-TW' | 'zh-CN' | 'en' | 'ja',
     defaultCardSet: 'Fibonacci' | 'T-Shirt' | 'PowerOf2',
     maxHistoryRecords: 100
   }
   ```

2. **歷史記錄**：`agile_estimation_history`**
   ```javascript
   [
     {
       id: 'uuid',
       timestamp: 1234567890,
       card: '13',
       cardSet: 'Fibonacci',
       mode: 'solo'
     },
     // ...
   ]
   ```

3. **黑名單**：`agile_estimation_blacklist`**
   ```javascript
   [
     'peerId1',
     'peerId2',
     // ...
   ]
   ```

### 資料管理工具

**storage.js**：封裝 localStorage 操作

```javascript
// js/utils/storage.js
const STORAGE_PREFIX = 'agile_estimation_';

export const storage = {
  get(key) {
    const data = localStorage.getItem(STORAGE_PREFIX + key);
    return data ? JSON.parse(data) : null;
  },
  
  set(key, value) {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  },
  
  remove(key) {
    localStorage.removeItem(STORAGE_PREFIX + key);
  },
  
  clear() {
    // 只清除本應用的資料
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  }
};
```

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
    'app.title': '敏捷開發估點工具',
    'mode.solo': '簡易模式',
    'mode.host': 'Host 模式',
    'mode.client': 'Client 模式',
    // ...
  },
  'en': {
    'app.title': 'Agile Estimation Tool',
    'mode.solo': 'Solo Mode',
    'mode.host': 'Host Mode',
    'mode.client': 'Client Mode',
    // ...
  },
  // ...
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

## 剪貼簿工具

### clipboard.js 實作

用於複製連結、會議 ID 等文字到剪貼簿。

**實作範例**：

```javascript
// js/utils/clipboard.js
export const clipboard = {
  // 複製文字到剪貼簿
  async copyText(text) {
    try {
      // 使用現代 Clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return { success: true };
      } else {
        // 降級方案：使用傳統方法
        return this.fallbackCopyText(text);
      }
    } catch (err) {
      console.error('複製失敗:', err);
      return { success: false, error: err.message };
    }
  },

  // 降級方案：使用 document.execCommand
  fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return { success: successful };
    } catch (err) {
      document.body.removeChild(textArea);
      return { success: false, error: err.message };
    }
  },

  // 生成加入會議的完整連結
  generateJoinUrl(meetingId) {
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}#/join/${meetingId}`;
  }
};
```

**使用範例**：

```javascript
// js/pages/host.js
import { clipboard } from '../utils/clipboard.js';
import { toast } from '../components/toast.js';  // Toast 通知元件

// 複製加入連結
async function copyJoinLink(meetingId) {
  const joinUrl = clipboard.generateJoinUrl(meetingId);
  const result = await clipboard.copyText(joinUrl);
  
  if (result.success) {
    toast.show('連結已複製到剪貼簿', 'success');
  } else {
    toast.show('複製失敗，請手動複製', 'error');
  }
}

// 複製會議 ID
async function copyMeetingId(meetingId) {
  const result = await clipboard.copyText(meetingId);
  
  if (result.success) {
    toast.show('會議 ID 已複製', 'success');
  } else {
    toast.show('複製失敗', 'error');
  }
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

### 部署流程

1. 開發完成後，推送到 GitHub
2. GitHub Pages 自動部署
3. 訪問：`https://wjprogramer.github.io/external_projects/agile_estimation/`

