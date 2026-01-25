# UI 設計規劃

## 設計理念

採用**和風 + 極簡禪意**設計風格，結合日本傳統美學與現代極簡主義，打造寧靜、優雅、專注閱讀的日文學習平台：

- 🎌 **和風美學** - 和紙紋理背景、柔和色彩、自然元素
- 🧘 **極簡禪意** - 大量留白、去除多餘裝飾、專注內容
- 📖 **閱讀優化** - 內容區域清晰易讀，不影響學習體驗
- 🌸 **文化氛圍** - 少量日式裝飾元素（櫻花、雲朵、波浪）
- 💫 **日文友好** - 針對日文字體和排版優化
- 🌊 **柔和過渡** - 流暢但克制的動畫與互動回饋
- 🎯 **寧靜優雅** - 營造平靜、專注的學習氛圍

> **設計風格**：採用「方案 B：和風 + 極簡禪意」  
> **其他風格選項**：詳細的日式設計風格說明請參考 [日式 UI 設計風格選項](./ui-design-japanese-styles.md)

---

## 色彩系統

### CSS 變數定義

```css
:root {
  /* ===== 和風 + 極簡禪意 - Light Mode ===== */

  /* ===== 基礎色（和紙色背景） ===== */
  --bg-primary: #fef9f4; /* 和紙色（わししょく） */
  --bg-secondary: #fff8f0; /* 淡和紙色 */
  --bg-tertiary: #f5f0eb; /* 極淡米色 */

  /* ===== 文字色（墨色系） ===== */
  --text-primary: #5a4a3a; /* 墨色（すみいろ） */
  --text-secondary: #6b5d4f;
  --text-muted: #8b7d6f;
  --text-placeholder: #a89b8d;

  /* ===== 強調色（和風配色） ===== */
  --accent-color: #8b7355; /* 茶色（ちゃいろ）- 極簡禪意主色 */
  --accent-hover: #9b8365;
  --accent-active: #7b6345;
  --accent-light: #e8e0d6; /* 淡茶色 */

  /* ===== 和風輔助色 ===== */
  --wafu-sakura: #ffb3d9; /* 櫻花色（さくらいろ）- 少量裝飾用 */
  --wafu-mizu: #a8d8ea; /* 水色（みずいろ）- 次要元素 */
  --wafu-matcha: #b8d4a6; /* 抹茶色（まっちゃいろ）- 自然元素 */
  --wafu-washi: #fef9f4; /* 和紙色（わししょく） */

  /* ===== 邊框色（極簡細線） ===== */
  --border-color: #e0d8d0; /* 淡米色邊框 */
  --border-hover: #d4c4b0;
  --border-subtle: #f0e8e0; /* 極淡邊框，用於分隔 */

  /* ===== 陰影（極簡，減少使用） ===== */
  --shadow-sm: 0 1px 2px 0 rgba(90, 74, 58, 0.05);
  --shadow-md: 0 2px 4px 0 rgba(90, 74, 58, 0.08);
  --shadow-lg: 0 4px 8px 0 rgba(90, 74, 58, 0.1);
  --shadow-none: none; /* 極簡風格，多數情況不使用陰影 */

  /* ===== 圓角（極簡，小圓角） ===== */
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 8px;
  --radius-xl: 12px;

  /* ===== 內容區域（極簡設計） ===== */
  --content-bg: #ffffff; /* 內容區使用純白，與和紙背景形成對比 */
  --content-text: #5a4a3a;
  --content-text-secondary: #6b5d4f;
  --content-border: #e0d8d0;

  /* ===== 狀態色（和風調和） ===== */
  --success: #7fb069; /* 柔和的綠色 */
  --warning: #d4a574; /* 柔和的橙色 */
  --error: #c97a7a; /* 柔和的紅色 */
  --info: #8ba8c4; /* 柔和的水色 */

  /* ===== 動畫（柔和但克制） ===== */
  --transition-fast: 0.2s ease-out;
  --transition-normal: 0.3s ease-out;
  --transition-slow: 0.5s ease-out;

  /* ===== 留白（極簡禪意 - 大量留白） ===== */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 32px;
  --spacing-xl: 48px;
  --spacing-2xl: 64px;
}

/* 深色模式（和風 + 極簡禪意） */
[data-theme="dark"] {
  /* ===== 基礎色（深色和紙色） ===== */
  --bg-primary: #2a2520; /* 深色和紙色 */
  --bg-secondary: #3a342f;
  --bg-tertiary: #4a443f;

  /* ===== 文字色（淺色墨色） ===== */
  --text-primary: #e8e0d6; /* 淺墨色 */
  --text-secondary: #d8d0c6;
  --text-muted: #c8c0b6;
  --text-placeholder: #b8b0a6;

  /* ===== 強調色（深色模式茶色） ===== */
  --accent-color: #c4a574; /* 淺茶色 */
  --accent-hover: #d4b584;
  --accent-active: #b49564;
  --accent-light: #3a342f;

  /* ===== 和風輔助色（深色模式） ===== */
  --wafu-sakura: #d98fb3; /* 深色櫻花色 */
  --wafu-mizu: #7ab8d0; /* 深色水色 */
  --wafu-matcha: #9bb88a; /* 深色抹茶色 */
  --wafu-washi: #2a2520;

  /* ===== 邊框色 ===== */
  --border-color: #4a443f;
  --border-hover: #5a544f;
  --border-subtle: #3a342f;

  /* ===== 陰影（深色模式，極簡） ===== */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-md: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
  --shadow-none: none;

  /* ===== 內容區域 ===== */
  --content-bg: #3a342f;
  --content-text: #e8e0d6;
  --content-text-secondary: #d8d0c6;
  --content-border: #4a443f;

  /* ===== 狀態色（深色模式） ===== */
  --success: #8fc079;
  --warning: #e4b584;
  --error: #d98a8a;
  --info: #9bb8d4;
}
```

---

## 字型系統

```css
:root {
  /* 日文友好字型（和風風格） */
  --font-primary: "Noto Sans JP", "Noto Serif JP", "Noto Sans TC", -apple-system,
    BlinkMacSystemFont, sans-serif;
  --font-serif: "Noto Serif JP", "Noto Serif TC", serif; /* 傳統和風字體 */
  --font-mono: "JetBrains Mono", "Fira Code", "Consolas", monospace;

  /* 字型大小 */
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 32px;
  --text-4xl: 48px;

  /* 字重 */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* 日文特殊設定 */
  --japanese-font-size: 1.1em; /* 日文稍大一點 */
  --japanese-line-height: 1.8; /* 日文行高較大 */
}
```

---

## 頁面佈局

### 整體結構

```text
┌─────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 🪟  Header (固定頂部)        🌙  🌐  🔍  ⭐    │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ ┌──────────┐ ┌───────────────────────────────────────┐ │
│ │          │ │                                       │ │
│ │ Nav      │ │       主內容區域                        │ │
│ │ (側邊欄) │ │   (內容區域：清晰易讀)                    │ │
│ │          │ │                                       │ │
│ │ 📂 文法  │ │                                       │ │
│ │ 📂 單字  │ │                                       │ │
│ │ 📂 漢字  │ │                                       │ │
│ │          │ │                                       │ │
│ └──────────┘ └───────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 核心元件

### 1. 內容卡片 (Content Card)

```css
.content-card {
  /* 極簡設計：無陰影，細邊框 */
  background: var(--content-bg);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  transition: var(--transition-normal);
  cursor: pointer;
  /* 極簡風格：不使用陰影 */
}

.content-card:hover {
  /* 極簡互動：僅改變邊框顏色 */
  border-color: var(--accent-color);
  background: var(--bg-secondary);
}

.content-card__title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: 8px;
}

.content-card__japanese {
  font-size: var(--japanese-font-size);
  line-height: var(--japanese-line-height);
  color: var(--text-primary);
  margin-bottom: 8px;
}

.content-card__meta {
  display: flex;
  gap: 12px;
  font-size: var(--text-sm);
  color: var(--text-muted);
}

.content-card__tags {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
}
```

### 2. 內容詳情區域 (Content Detail)

```css
.content-detail {
  /* 極簡設計：大量留白，無陰影 */
  background: var(--content-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  color: var(--content-text);
  line-height: 2; /* 閱讀友好，增加行高 */
  /* 極簡風格：不使用陰影 */
  border-top: 1px solid var(--border-subtle);
}

.content-detail__title {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  margin-bottom: 16px;
  color: var(--content-text);
}

.content-detail__japanese {
  font-size: calc(var(--japanese-font-size) * 1.2);
  line-height: var(--japanese-line-height);
  margin-bottom: 24px;
  padding: 16px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--accent-color);
}

.content-detail__meta {
  display: flex;
  gap: 16px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--content-border);
  margin-bottom: 32px;
  font-size: var(--text-sm);
  color: var(--content-text-secondary);
}

.content-detail__section {
  margin-bottom: 48px;
}

.content-detail__section-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  margin-bottom: var(--spacing-md);
  margin-top: var(--spacing-xl); /* 極簡：大量留白 */
  color: var(--content-text);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--border-subtle); /* 極簡：細分隔線 */
}
```

### 3. 標籤 (Tag)

```css
.tag {
  /* 極簡標籤：細邊框，無背景 */
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-xs) var(--spacing-md);
  background: transparent;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-weight: var(--font-normal); /* 極簡：正常字重 */
  color: var(--text-secondary);
  transition: var(--transition-fast);
}

.tag:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
  background: var(--accent-light);
}

.tag--category {
  /* 分類標籤：使用茶色 */
  background: var(--accent-color);
  border-color: var(--accent-color);
  color: white;
}

.tag--category:hover {
  background: var(--accent-hover);
  border-color: var(--accent-hover);
}
```

### 4. 搜尋框 (Search Box)

```css
.search-box {
  position: relative;
  width: 100%;
  max-width: 600px;
}

.search-box__input {
  width: 100%;
  background: var(--content-bg);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: var(--spacing-md) var(--spacing-md) var(--spacing-md) 48px;
  color: var(--text-primary);
  font-size: var(--text-base);
  transition: var(--transition-normal);
}

.search-box__input:focus {
  outline: none;
  border-color: var(--accent-color);
  /* 極簡：不使用 box-shadow，僅改變邊框 */
}

.search-box__icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
}
```

### 5. 按鈕 (Button)

```css
.btn {
  /* 極簡按鈕：細邊框，無陰影 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-sm);
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  transition: var(--transition-normal);
  cursor: pointer;
  border: 1px solid var(--border-subtle);
}

.btn--primary {
  background: var(--accent-color);
  color: white;
  border-color: var(--accent-color);
}

.btn--primary:hover {
  background: var(--accent-hover);
  border-color: var(--accent-hover);
  /* 極簡：不使用 transform 和 shadow */
}

.btn--secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
}

.btn--secondary:hover {
  background: var(--bg-secondary);
  border-color: var(--accent-color);
  color: var(--accent-color);
}
```

---

## 響應式設計

### 斷點

```css
/* 移動端 */
@media (max-width: 599px) {
  :root {
    --radius-lg: 8px;
    --radius-xl: 12px;
  }

  /* 單欄佈局 */
  /* 側邊欄改為抽屜式 */
}

/* 平板 */
@media (min-width: 600px) and (max-width: 959px) {
  /* 可收合側邊欄 */
}

/* 桌面 */
@media (min-width: 960px) {
  /* 完整雙欄佈局 */
}

/* 大螢幕 */
@media (min-width: 1280px) {
  /* 最大寬度限制 */
  .content-detail {
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

---

## 動畫效果

### 頁面轉場

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-enter {
  animation: fadeInUp 0.4s ease-out forwards;
}
```

### 互動回饋

| 互動     | 動畫效果            |
| -------- | ------------------- |
| 按鈕懸停 | 上浮 1px + 陰影加深 |
| 按鈕點擊 | 縮放 0.98           |
| 卡片懸停 | 上浮 2px + 陰影加深 |
| 標籤點擊 | 縮放 1.05           |
| 內容載入 | 淡入 + 上浮         |

---

## 日文特殊處理

### 日文字體優化

```css
.japanese-text {
  font-family: "Noto Sans JP", sans-serif;
  font-size: var(--japanese-font-size);
  line-height: var(--japanese-line-height);
  letter-spacing: 0.05em;
}

/* 假名標註 */
.furigana {
  font-size: 0.6em;
  vertical-align: super;
  color: var(--text-muted);
}
```

### 日文排版

```css
/* 日文段落 */
.japanese-paragraph {
  text-align: justify;
  text-justify: inter-ideograph;
  line-height: 1.8;
}

/* 日文例句（和風 + 極簡） */
.japanese-example {
  padding: var(--spacing-md);
  background: var(--bg-washi); /* 使用和紙色背景 */
  border-left: 2px solid var(--accent-color); /* 極簡：細邊框 */
  border-radius: var(--radius-sm);
  margin: var(--spacing-md) 0;
}
```

---

## 和風設計元素

### 和紙紋理背景（主要背景）

```css
/* 主要背景使用和紙紋理 */
body {
  background-color: var(--bg-washi);
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 20px,
    rgba(255, 255, 255, 0.03) 20px,
    rgba(255, 255, 255, 0.03) 40px
  );
  background-size: 40px 40px;
  min-height: 100vh;
}

/* 和紙紋理容器 */
.washi-background {
  background-color: var(--bg-washi);
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 20px,
    rgba(255, 255, 255, 0.05) 20px,
    rgba(255, 255, 255, 0.05) 40px
  );
  background-size: 40px 40px;
}
```

### 櫻花裝飾元素（少量使用）

```css
/* 極簡：僅在特殊區域使用，低調裝飾 */
.sakura-decoration {
  position: relative;
}

.sakura-decoration::before {
  content: "🌸";
  position: absolute;
  top: -8px;
  right: -8px;
  font-size: 16px; /* 極簡：較小尺寸 */
  opacity: 0.15; /* 極簡：更低透明度 */
  animation: sakuraFloat 6s ease-in-out infinite; /* 極簡：更慢的動畫 */
  pointer-events: none;
}

@keyframes sakuraFloat {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.15;
  }
  50% {
    transform: translateY(-8px) rotate(3deg);
    opacity: 0.2;
  }
}

/* 雲朵裝飾（極簡風格） */
.cloud-decoration {
  position: relative;
}

.cloud-decoration::after {
  content: "☁";
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  opacity: 0.1; /* 極簡：極低透明度 */
  pointer-events: none;
}
```

### 日式圓形標籤

```css
.tag-japanese {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--japanese-sakura);
  color: white;
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
}
```

### 波浪分隔線（極簡風格）

```css
/* 極簡：細線分隔，不使用波浪 */
.wave-divider {
  position: relative;
  height: 1px;
  margin: var(--spacing-xl) 0;
  background: var(--border-subtle);
}

/* 可選：極簡波浪（低調） */
.wave-divider--subtle::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--wafu-mizu) 20%,
    var(--wafu-mizu) 80%,
    transparent 100%
  );
  opacity: 0.2; /* 極簡：極低透明度 */
}
```

### 極簡分隔線

```css
/* 極簡禪意：細線分隔 */
.divider {
  height: 1px;
  background: var(--border-subtle);
  border: none;
  margin: var(--spacing-xl) 0;
}

.divider--spacious {
  margin: var(--spacing-2xl) 0; /* 極簡：大量留白 */
}
```

---

## 無障礙設計

- 所有互動元素具有適當的 `aria-label`
- 色彩對比度符合 WCAG 2.1 AA 標準
- 支援鍵盤導航（Tab / Enter / Escape）
- 焦點狀態明顯可見
- 減少動畫選項 `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
