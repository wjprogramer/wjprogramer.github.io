# 技術架構規劃

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
- ✅ 使用 CDN 載入第三方函式庫（如需要）
- ✅ Hash-based SPA 路由

---

## 專案結構

```text
japanese_notes/
├── index.html                    # SPA 入口
├── css/
│   ├── variables.css             # CSS 變數（含 Light/Dark）
│   ├── reset.css                 # CSS Reset
│   ├── main.css                  # 主樣式
│   ├── components/
│   │   ├── header.css
│   │   ├── navigation.css
│   │   ├── content-card.css
│   │   ├── content-detail.css
│   │   └── search.css
│   └── themes/
│       └── dark.css              # 深色主題（如需要）
├── js/
│   ├── app.js                    # 應用程式入口
│   ├── router.js                 # Hash-based 路由器
│   ├── i18n.js                   # 多國化處理
│   ├── components/
│   │   ├── header.js
│   │   ├── navigation.js
│   │   ├── search.js
│   │   └── favorites.js
│   ├── pages/
│   │   ├── home.js
│   │   ├── content-list.js
│   │   ├── content-detail.js
│   │   ├── learning-path.js
│   │   └── favorites.js
│   ├── utils/
│   │   ├── storage.js            # localStorage 封裝
│   │   ├── theme.js               # 主題切換（支援系統設定）
│   │   └── search.js              # 搜尋功能
│   └── data/
│       ├── content/              # 內容資料（JSON）
│       │   ├── grammar/
│       │   ├── vocabulary/
│       │   ├── kanji/
│       │   └── ...
│       ├── index.json            # 內容索引
│       ├── tags.json              # 標籤資料
│       └── learning-paths.json   # 學習路徑
└── assets/
    └── images/                   # 圖片資源
```

---

## SPA 路由設計

### Hash-based 路由

由於部署在 GitHub Pages 子目錄（`/external_projects/japanese_notes/`），使用 Hash 路由避免伺服器配置問題。

### 路由配置

```javascript
// js/router.js
class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.beforeEach = null;

    window.addEventListener("hashchange", () => this.handleRoute());
    window.addEventListener("load", () => this.handleRoute());
  }

  register(path, handler) {
    this.routes.set(path, handler);
    return this;
  }

  navigate(path) {
    window.location.hash = path;
  }

  getCurrentPath() {
    return window.location.hash.slice(1) || "/";
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || "/";
    const [path, queryString] = hash.split("?");
    const params = new URLSearchParams(queryString);

    if (this.beforeEach) {
      const shouldContinue = this.beforeEach({ path, params });
      if (shouldContinue === false) return;
    }

    const handler = this.routes.get(path);

    if (handler) {
      this.currentRoute = path;
      handler({ path, params });
    } else {
      this.handleNotFound(path);
    }
  }

  handleNotFound(path) {
    // 404 處理
  }
}

export const router = new Router();
```

### 路由註冊

```javascript
// js/app.js
import { router } from "./router.js";
import { renderHome } from "./pages/home.js";
import { renderContentList } from "./pages/content-list.js";
import { renderContentDetail } from "./pages/content-detail.js";
import { renderLearningPath } from "./pages/learning-path.js";
import { renderFavorites } from "./pages/favorites.js";

router
  .register("/", renderHome)
  .register("/content", renderContentList)
  .register("/content/:id", renderContentDetail)
  .register("/learning-path", renderLearningPath)
  .register("/favorites", renderFavorites);
```

### URL 格式範例

```text
首頁:
https://wjprogramer.github.io/external_projects/japanese_notes/#/

內容列表:
https://wjprogramer.github.io/external_projects/japanese_notes/#/content

內容詳情:
https://wjprogramer.github.io/external_projects/japanese_notes/#/content/grammar-particles

學習路徑:
https://wjprogramer.github.io/external_projects/japanese_notes/#/learning-path

收藏:
https://wjprogramer.github.io/external_projects/japanese_notes/#/favorites
```

---

## 多國化 (i18n) 方案

### 語言支援

- 繁體中文 (zh-TW)
- 英文 (en)

### i18n 實作

```javascript
// js/utils/i18n.js
const translations = {
  "zh-TW": {
    "nav.home": "首頁",
    "nav.content": "內容",
    "nav.learning-path": "學習路徑",
    "nav.favorites": "收藏",
    // ... 更多翻譯
  },
  en: {
    "nav.home": "Home",
    "nav.content": "Content",
    "nav.learning-path": "Learning Path",
    "nav.favorites": "Favorites",
    // ...
  },
};

let currentLang = "zh-TW";

export function setLanguage(lang) {
  currentLang = lang;
  storage.set("language", lang);
  updateUI();
}

export function t(key) {
  return translations[currentLang]?.[key] || key;
}

export function getLanguage() {
  return currentLang;
}

function updateUI() {
  // 更新所有文字內容
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });
}
```

### 內容多語言

內容資料本身已包含多語言版本，直接根據當前語言顯示對應版本。

---

## 主題切換方案

### 支援模式

- Light 模式
- Dark 模式
- 跟隨系統設定

### 實作

```javascript
// js/utils/theme.js
import { storage } from "./storage.js";

const THEME_KEY = "theme";
const THEME_SYSTEM = "system";

export function initTheme() {
  const savedTheme = storage.get(THEME_KEY, THEME_SYSTEM);
  setTheme(savedTheme);

  // 監聽系統主題變化
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", () => {
      if (getTheme() === THEME_SYSTEM) {
        applySystemTheme();
      }
    });
  }
}

export function setTheme(theme) {
  storage.set(THEME_KEY, theme);

  if (theme === THEME_SYSTEM) {
    applySystemTheme();
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }
}

export function getTheme() {
  return storage.get(THEME_KEY, THEME_SYSTEM);
}

function applySystemTheme() {
  if (window.matchMedia) {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

export function toggleTheme() {
  const current = getTheme();
  if (current === "light") {
    setTheme("dark");
  } else if (current === "dark") {
    setTheme(THEME_SYSTEM);
  } else {
    setTheme("light");
  }
}
```

---

## 狀態管理

### localStorage 使用

```javascript
// js/utils/storage.js
const STORAGE_KEY = "japanese_notes_settings";

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

  remove(key) {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      delete data[key];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Storage error:", e);
    }
  },
};

// 收藏功能專用
export const favorites = {
  get() {
    return storage.get("favorites", []);
  },

  add(id) {
    const list = this.get();
    if (!list.includes(id)) {
      list.push(id);
      storage.set("favorites", list);
    }
  },

  remove(id) {
    const list = this.get();
    const index = list.indexOf(id);
    if (index > -1) {
      list.splice(index, 1);
      storage.set("favorites", list);
    }
  },

  has(id) {
    return this.get().includes(id);
  },
};
```

---

## 搜尋功能

### 實作方式

```javascript
// js/utils/search.js
import { contentIndex } from "../data/index.js";

export function searchContent(query, options = {}) {
  const { category, tags, level } = options;
  const lowerQuery = query.toLowerCase();

  return contentIndex.filter((item) => {
    // 標題搜尋（支援日文、中文、英文）
    const titleMatch = Object.values(item.title).some((title) =>
      title.toLowerCase().includes(lowerQuery)
    );

    // 內容搜尋（簡化版，實際可能需要全文索引）
    const contentMatch = item.description
      ? Object.values(item.description).some((desc) =>
          desc.toLowerCase().includes(lowerQuery)
        )
      : false;

    // 標籤搜尋
    const tagMatch = item.tags.some((tag) =>
      tag.toLowerCase().includes(lowerQuery)
    );

    const matchesQuery = titleMatch || contentMatch || tagMatch;

    // 分類篩選
    const matchesCategory = !category || item.category.type === category;

    // 標籤篩選
    const matchesTags =
      !tags || tags.length === 0 || tags.some((tag) => item.tags.includes(tag));

    // 難度等級篩選
    const matchesLevel = !level || item.level === level;

    return matchesQuery && matchesCategory && matchesTags && matchesLevel;
  });
}
```

---

## 內容載入

### 內容索引

```javascript
// js/data/index.js
// 內容索引，用於快速搜尋和列表顯示
export const contentIndex = [
  {
    id: "grammar-particles",
    title: {
      "zh-TW": "助詞",
      en: "Particles",
    },
    category: {
      type: "grammar",
      level: "N5",
    },
    tags: ["基礎", "文法", "助詞"],
    description: {
      "zh-TW": "日文助詞是連接單詞的重要語法元素...",
      en: "Japanese particles are important grammatical elements...",
    },
  },
  // ... 更多內容
];
```

### 內容載入器

```javascript
// js/utils/content-loader.js
export async function loadContent(id) {
  // 根據 ID 決定載入哪個檔案
  const category = getCategoryFromId(id);
  const response = await fetch(`data/content/${category}/${id}.json`);
  return await response.json();
}
```

---

## 第三方函式庫（如需要）

### Markdown 渲染

```html
<!-- 如需要 Markdown 支援 -->
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
```

### 日文輸入法（如需要）

- 可使用瀏覽器原生 IME
- 或整合第三方日文輸入法庫

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
- localStorage
- CSS Grid / Flexbox

---

## 部署

### GitHub Pages 直接部署

無需任何建置步驟，直接 push 到 GitHub 即可。

```bash
git add .
git commit -m "Update japanese notes"
git push origin main
```

### 訪問路徑

```text
https://wjprogramer.github.io/external_projects/japanese_notes/
```
