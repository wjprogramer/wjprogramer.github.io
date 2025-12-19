# 技術架構規格

## 技術選型

### 純前端方案（無 Node.js）

- **HTML5** - 頁面結構
- **CSS3** - 樣式與動畫
- **JavaScript (ES6+)** - 邏輯與互動
- **ES Modules** - 模組化程式碼組織

### 特點

- ✅ 無需建置步驟
- ✅ 直接部署到 GitHub Pages
- ✅ 無 Node.js 依賴
- ✅ 使用 CDN 載入第三方函式庫
- ✅ Hash-based SPA 路由

---

## 專案結構

```
external_projects/coder_toolbox/
├── index.html                    # SPA 入口
├── css/
│   ├── variables.css             # CSS 變數
│   ├── reset.css                 # CSS Reset
│   ├── main.css                  # 主樣式
│   ├── components/
│   │   ├── header.css
│   │   ├── sidebar.css
│   │   ├── tool-page.css
│   │   └── buttons.css
│   └── themes/
│       └── dark.css              # 深色主題
├── js/
│   ├── app.js                    # 應用程式入口
│   ├── router.js                 # Hash-based 路由器
│   ├── components/
│   │   ├── header.js
│   │   ├── sidebar.js
│   │   └── toast.js
│   ├── pages/
│   │   ├── home.js
│   │   ├── code/
│   │   │   ├── html-formatter.js
│   │   │   ├── css-formatter.js
│   │   │   └── js-formatter.js
│   │   ├── encoding/
│   │   │   ├── base64.js
│   │   │   ├── unicode.js
│   │   │   ├── url-encode.js
│   │   │   ├── hash.js
│   │   │   └── encrypt.js
│   │   ├── image/
│   │   │   ├── data-uri.js
│   │   │   ├── png-to-ico.js
│   │   │   └── qrcode.js
│   │   └── network/
│   │       └── cidr-to-ip.js
│   ├── utils/
│   │   ├── clipboard.js          # 剪貼簿操作
│   │   ├── storage.js            # localStorage 封裝
│   │   └── theme.js              # 主題切換
│   └── data/
│       └── tools.js              # 工具列表資料
├── assets/
│   └── images/
│       └── logo.svg
└── favicon.ico
```

---

## SPA 路由設計

### Hash-based 路由

由於部署在 GitHub Pages 子目錄（`/external_projects/coder_toolbox/`），使用 Hash 路由避免伺服器配置問題。

```javascript
// js/router.js
class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;

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

    // 解析查詢參數
    const params = new URLSearchParams(queryString);

    // 查找匹配的路由
    const handler = this.routes.get(path);

    if (handler) {
      this.currentRoute = path;
      handler({ path, params });
    } else {
      // 404 處理
      this.handleNotFound(path);
    }
  }

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

### 路由配置

```javascript
// js/app.js
import { router } from "./router.js";
import { renderHome } from "./pages/home.js";
import { renderBase64 } from "./pages/encoding/base64.js";
import { renderUrlEncode } from "./pages/encoding/url-encode.js";
import { renderHash } from "./pages/encoding/hash.js";
import { renderHtmlFormatter } from "./pages/code/html-formatter.js";
// ... 其他頁面

// 註冊路由
router
  .register("/", renderHome)
  // 編碼工具
  .register("/encoding/base64", renderBase64)
  .register("/encoding/url", renderUrlEncode)
  .register("/encoding/unicode", renderUnicode)
  .register("/encoding/hash", renderHash)
  .register("/encoding/encrypt", renderEncrypt)
  // 程式碼工具
  .register("/code/html", renderHtmlFormatter)
  .register("/code/css", renderCssFormatter)
  .register("/code/js", renderJsFormatter)
  // 圖片工具
  .register("/image/datauri", renderDataUri)
  .register("/image/ico", renderPngToIco)
  .register("/image/qrcode", renderQrCode)
  // 網路工具
  .register("/network/cidr", renderCidrToIp);
```

### URL 格式範例

```
主網站首頁:
https://wjprogramer.github.io/

工具箱入口:
https://wjprogramer.github.io/external_projects/coder_toolbox/

工具箱首頁:
https://wjprogramer.github.io/external_projects/coder_toolbox/#/

Base64 工具:
https://wjprogramer.github.io/external_projects/coder_toolbox/#/encoding/base64

Hash 計算:
https://wjprogramer.github.io/external_projects/coder_toolbox/#/encoding/hash
```

---

## 第三方函式庫（CDN）

使用 CDN 載入，無需 npm install。

### 核心函式庫

```html
<!-- index.html -->
<head>
  <!-- CryptoJS - 加密/雜湊 -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js"></script>

  <!-- js-beautify - 程式碼格式化 -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.11/beautify.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.11/beautify-html.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.11/beautify-css.min.js"></script>

  <!-- QRCode.js - 二維碼生成 -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>

  <!-- Terser - JS 壓縮（可選，較大） -->
  <!-- 考慮改用簡化版或略過此功能 -->
</head>
```

### 可選函式庫

```html
<!-- highlight.js - 語法高亮 -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"
/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap"
  rel="stylesheet"
/>

<!-- Material Icons -->
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet"
/>
```

---

## 頁面元件模式

### 基本頁面模板

```javascript
// js/pages/encoding/base64.js

export function renderBase64({ path, params }) {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="tool-page">
      <header class="tool-header">
        <h1>Base64 編碼 / 解碼</h1>
        <p class="tool-desc">支援文字與 Base64 的相互轉換</p>
      </header>

      <div class="tool-content">
        <div class="input-section">
          <label for="input">輸入</label>
          <textarea id="input" placeholder="輸入文字或 Base64..."></textarea>
        </div>

        <div class="options-section">
          <label>
            <input type="radio" name="mode" value="encode" checked>
            編碼 (Text → Base64)
          </label>
          <label>
            <input type="radio" name="mode" value="decode">
            解碼 (Base64 → Text)
          </label>
        </div>

        <div class="actions-section">
          <button id="btn-convert" class="btn btn-primary">
            <span class="material-icons">sync_alt</span>
            轉換
          </button>
          <button id="btn-clear" class="btn btn-secondary">
            <span class="material-icons">delete</span>
            清除
          </button>
          <button id="btn-copy" class="btn btn-secondary">
            <span class="material-icons">content_copy</span>
            複製結果
          </button>
        </div>

        <div class="output-section">
          <label for="output">輸出</label>
          <textarea id="output" readonly></textarea>
        </div>
      </div>
    </div>
  `;

  // 綁定事件
  initBase64Events();
}

function initBase64Events() {
  const input = document.getElementById("input");
  const output = document.getElementById("output");
  const btnConvert = document.getElementById("btn-convert");
  const btnClear = document.getElementById("btn-clear");
  const btnCopy = document.getElementById("btn-copy");

  btnConvert.addEventListener("click", () => {
    const mode = document.querySelector('input[name="mode"]:checked').value;
    const text = input.value;

    try {
      if (mode === "encode") {
        output.value = btoa(unescape(encodeURIComponent(text)));
      } else {
        output.value = decodeURIComponent(escape(atob(text)));
      }
    } catch (e) {
      output.value = `錯誤：${e.message}`;
    }
  });

  btnClear.addEventListener("click", () => {
    input.value = "";
    output.value = "";
  });

  btnCopy.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(output.value);
      showToast("已複製到剪貼簿！");
    } catch (e) {
      showToast("複製失敗", "error");
    }
  });
}
```

---

## 狀態管理

使用 localStorage 儲存用戶偏好設定。

```javascript
// js/utils/storage.js

const STORAGE_KEY = "coder_toolbox_settings";

export const storage = {
  get(key, defaultValue = null) {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return data[key] ?? defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      data[key] = value;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Storage error:", e);
    }
  },

  // 預設設定
  defaults: {
    theme: "light",
    sidebarCollapsed: false,
    recentTools: [],
    favoriteTools: [],
  },
};
```

---

## 主題切換

```javascript
// js/utils/theme.js
import { storage } from "./storage.js";

export function initTheme() {
  const savedTheme = storage.get("theme", "light");
  setTheme(savedTheme);
}

export function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  storage.set("theme", theme);
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  setTheme(next);
}
```

---

## index.html 入口

```html
<!DOCTYPE html>
<html lang="zh-TW" data-theme="light">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Coder Toolbox - 程式開發者工具箱</title>

    <!-- Favicon -->
    <link rel="icon" href="favicon.ico" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />

    <!-- Styles -->
    <link rel="stylesheet" href="css/variables.css" />
    <link rel="stylesheet" href="css/reset.css" />
    <link rel="stylesheet" href="css/main.css" />
    <link rel="stylesheet" href="css/components/header.css" />
    <link rel="stylesheet" href="css/components/sidebar.css" />
    <link rel="stylesheet" href="css/components/tool-page.css" />
    <link rel="stylesheet" href="css/components/buttons.css" />
    <link rel="stylesheet" href="css/themes/dark.css" />

    <!-- Third-party Libraries -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.11/beautify.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.11/beautify-html.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.11/beautify-css.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
  </head>
  <body>
    <!-- Header -->
    <header class="app-header" id="header">
      <!-- 由 JS 渲染 -->
    </header>

    <!-- Sidebar -->
    <aside class="app-sidebar" id="sidebar">
      <!-- 由 JS 渲染 -->
    </aside>

    <!-- Main Content -->
    <main class="app-main" id="app">
      <!-- 由路由渲染 -->
    </main>

    <!-- Toast Container -->
    <div class="toast-container" id="toast-container"></div>

    <!-- App Entry -->
    <script type="module" src="js/app.js"></script>
  </body>
</html>
```

---

## 部署

### GitHub Pages 直接部署

無需任何建置步驟，直接 push 到 GitHub 即可。

```bash
# 直接提交程式碼
git add .
git commit -m "Update coder toolbox"
git push origin main
```

### 訪問路徑

```
https://wjprogramer.github.io/external_projects/coder_toolbox/
```

---

## 瀏覽器相容性

### 目標瀏覽器

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### 使用的現代特性

- ES Modules (`<script type="module">`)
- CSS Custom Properties (CSS 變數)
- Async/Await
- Fetch API
- Navigator.clipboard API
- localStorage
