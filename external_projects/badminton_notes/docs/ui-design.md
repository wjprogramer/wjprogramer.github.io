# UI 設計規劃 - Neumorphism 風格

> **注意**：此文件已更新為 Neumorphism 設計風格。詳細的 Neumorphism 元件設計請參考 [ui-design-neumorphism.md](./ui-design-neumorphism.md)

## 設計理念

採用 **Neumorphism（新擬態）** 設計風格，參考 [Dribbble - Cloud Storage App Beyond Neumorphism](https://dribbble.com/shots/14161168-Cloud-Storage-App-Beyond-Neumorphism)，打造柔和、立體、現代的視覺體驗：

- 🎨 **柔軟陰影** - 內凹和外凸效果，創造立體感
- 🎯 **低對比度** - 柔和的色彩，舒適的視覺體驗
- 📦 **3D 立體感** - 按鈕和卡片具有立體質感
- 🌫️ **簡約優雅** - 極簡設計，去除多餘裝飾
- 🌊 **柔和圓角** - 大圓角設計，親和力強
- 📖 **閱讀優化** - 內容區域清晰易讀，不影響閱讀體驗
- 💫 **流暢動畫** - 柔和的過渡與互動回饋

---

## 色彩系統

### CSS 變數定義

```css
:root {
  /* ===== Neumorphism 基礎色 ===== */
  /* Light Mode - 淺色背景 */
  --neu-bg: #e0e5ec;
  --neu-bg-light: #f5f7fa;
  --neu-bg-dark: #d1d9e6;
  
  /* 陰影顏色 */
  --neu-shadow-light: #ffffff;
  --neu-shadow-dark: #a3b1c6;
  
  /* ===== Neumorphism 效果 ===== */
  --neu-radius: 20px;
  --neu-radius-sm: 12px;
  --neu-radius-lg: 28px;
  
  /* 外凸陰影（凸起效果） */
  --neu-shadow-convex: 
    8px 8px 16px var(--neu-shadow-dark),
    -8px -8px 16px var(--neu-shadow-light);
  
  /* 內凹陰影（凹陷效果） */
  --neu-shadow-concave: 
    inset 8px 8px 16px var(--neu-shadow-dark),
    inset -8px -8px 16px var(--neu-shadow-light);
  
  /* 懸停時的外凸陰影（更明顯） */
  --neu-shadow-convex-hover: 
    12px 12px 24px var(--neu-shadow-dark),
    -12px -12px 24px var(--neu-shadow-light);
  
  /* 按下時的內凹陰影 */
  --neu-shadow-pressed: 
    inset 4px 4px 8px var(--neu-shadow-dark),
    inset -4px -4px 8px var(--neu-shadow-light);

  /* ===== 強調色 ===== */
  --accent-color: #5b9bd5;
  --accent-hover: #4a8bc2;
  --accent-active: #3d7ba8;
  
  /* 強調色的 Neumorphism 效果 */
  --accent-shadow-convex: 
    8px 8px 16px rgba(91, 155, 213, 0.3),
    -8px -8px 16px rgba(255, 255, 255, 0.8);

  /* ===== 文字色 ===== */
  --text-primary: #2d3748;
  --text-secondary: #4a5568;
  --text-muted: #718096;
  --text-placeholder: #a0aec0;

  /* ===== 內容區域 ===== */
  --content-bg: #ffffff;
  --content-text: #1a202c;
  --content-text-secondary: #4a5568;
  --content-border: #e2e8f0;

  /* ===== 狀態色 ===== */
  --success: #48bb78;
  --warning: #ed8936;
  --error: #f56565;
  --info: #4299e1;

  /* ===== 動畫 ===== */
  --transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 深色模式 */
[data-theme="dark"] {
  --neu-bg: #2d3748;
  --neu-bg-light: #374151;
  --neu-bg-dark: #1f2937;
  
  --neu-shadow-light: rgba(255, 255, 255, 0.1);
  --neu-shadow-dark: rgba(0, 0, 0, 0.5);
  
  --text-primary: #f7fafc;
  --text-secondary: #e2e8f0;
  --text-muted: #cbd5e0;
  --text-placeholder: #a0aec0;
  
  --content-bg: #1a202c;
  --content-text: #f7fafc;
  --content-text-secondary: #e2e8f0;
  --content-border: #2d3748;
  
  --accent-color: #63b3ed;
  --accent-hover: #4299e1;
  --accent-active: #3182ce;
}
```

---

## 字型系統

```css
:root {
  --font-primary: "Noto Sans TC", "Noto Sans SC", "Noto Sans JP", -apple-system, BlinkMacSystemFont, sans-serif;
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
}
```

---

## 頁面佈局

### 整體結構

```text
┌─────────────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░ 動態漸層背景 ░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░░ + 浮動光球裝飾 ░░░░░░░░░░░░░░░░░░░░░░ │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 🪟  Header (玻璃效果)        🌙  🌐  🔍  ⭐    │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ ┌──────────┐ ┌───────────────────────────────────────┐ │
│ │ 🪟       │ │ 🪟                                    │ │
│ │ Nav      │ │       主內容區域                        │ │
│ │ (玻璃)   │ │   (內容區域：不透明背景，易讀)            │ │
│ │          │ │                                       │ │
│ │ 📂 基礎  │ │                                       │ │
│ │ 📂 技術  │ │                                       │ │
│ │ 📂 訓練  │ │                                       │ │
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
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border-radius: var(--glass-radius);
  border: 1px solid var(--glass-border);
  padding: 24px;
  transition: var(--transition-normal);
  cursor: pointer;
}

.content-card:hover {
  transform: translateY(-4px) scale(1.02);
  background: var(--glass-bg-hover);
  box-shadow: 
    0 12px 40px var(--glass-shadow),
    0 0 20px var(--accent-glow);
  border-color: var(--accent-color);
}

.content-card__title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
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
}
```

### 2. 內容詳情區域 (Content Detail)

```css
.content-detail {
  background: var(--content-bg);
  border-radius: var(--glass-radius-lg);
  padding: 48px;
  color: var(--content-text);
  line-height: 1.8;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.content-detail__title {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  margin-bottom: 16px;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px var(--accent-glow);
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
  margin-bottom: 16px;
  color: var(--content-text);
}
```

### 3. 標籤 (Tag)

```css
.tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  color: var(--text-primary);
  transition: var(--transition-fast);
  position: relative;
  overflow: hidden;
}

.tag::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.tag:hover::before {
  left: 100%;
}

.tag:hover {
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 10px var(--accent-glow);
  transform: scale(1.05);
}

.tag--category {
  background: var(--accent-gradient);
  border-color: var(--accent-color);
  box-shadow: 0 0 15px var(--accent-glow);
}

.tag--category:hover {
  box-shadow: 0 0 25px var(--accent-glow);
  transform: scale(1.1);
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
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--glass-radius-sm);
  padding: 12px 16px 12px 48px;
  color: var(--text-primary);
  font-size: var(--text-base);
  transition: var(--transition-normal);
}

.search-box__input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 
    0 0 0 4px var(--accent-glow),
    0 0 20px var(--accent-glow),
    inset 0 0 10px rgba(255, 0, 110, 0.1);
  background: rgba(255, 255, 255, 0.25);
}

.search-box__icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
}
```

---

## 響應式設計

### 斷點

```css
/* 移動端 */
@media (max-width: 599px) {
  :root {
    --glass-radius: 20px;
    --glass-radius-sm: 12px;
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

### 動態漸層背景

```css
@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

body {
  background: var(--bg-gradient-animated);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}
```

### 霓虹發光效果

```css
@keyframes neonGlow {
  0%, 100% {
    box-shadow: 
      0 0 5px var(--accent-color),
      0 0 10px var(--accent-color),
      0 0 15px var(--accent-color);
  }
  50% {
    box-shadow: 
      0 0 10px var(--accent-color),
      0 0 20px var(--accent-color),
      0 0 30px var(--accent-color),
      0 0 40px var(--accent-color);
  }
}

.neon-glow {
  animation: neonGlow 2s ease-in-out infinite;
}
```

### 流動光線效果

```css
@keyframes shimmer {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
}

.shimmer-effect::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 70%
  );
  animation: shimmer 3s infinite;
  pointer-events: none;
}
```

### 互動回饋

| 互動 | 動畫效果 |
| ---- | -------- |
| 按鈕懸停 | 上浮 2px + 霓虹發光 + 縮放 1.05 |
| 按鈕點擊 | 縮放 0.95 + 發光脈衝 |
| 卡片懸停 | 上浮 4px + 光線閃動 + 發光邊框 |
| 標籤點擊 | 縮放 1.1 + 發光效果 |
| 內容載入 | 淡入 + 上浮 + 漸層顯現 |
| 輸入框聚焦 | 發光邊框 + 內部光暈 |

---

## 潮流元素

### 1. 漸層按鈕

```css
.btn-gradient {
  background: var(--accent-gradient);
  border: none;
  color: white;
  font-weight: var(--font-semibold);
  padding: 12px 24px;
  border-radius: var(--glass-radius-sm);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--transition-normal);
}

.btn-gradient::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.btn-gradient:hover::before {
  left: 100%;
}

.btn-gradient:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 25px var(--accent-glow);
}
```

### 2. 發光邊框卡片

```css
.glow-card {
  position: relative;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border-radius: var(--glass-radius);
  padding: 24px;
  border: 1px solid var(--glass-border);
}

.glow-card::after {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: var(--glass-radius);
  padding: 2px;
  background: var(--accent-gradient);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s;
}

.glow-card:hover::after {
  opacity: 1;
  animation: neonGlow 2s ease-in-out infinite;
}
```

### 3. 動態浮動裝飾

```css
.floating-orb {
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent-color), transparent);
  filter: blur(60px);
  opacity: 0.3;
  animation: float 20s ease-in-out infinite;
  pointer-events: none;
  z-index: -1;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(100px, -100px) scale(1.2);
  }
  50% {
    transform: translate(-50px, 50px) scale(0.8);
  }
  75% {
    transform: translate(50px, 100px) scale(1.1);
  }
}
```

### 4. 漸層文字

```css
.gradient-text {
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: var(--font-bold);
}
```

---

## 無障礙設計

- 所有互動元素具有適當的 `aria-label`
- 色彩對比度符合 WCAG 2.1 AA 標準
- 支援鍵盤導航（Tab / Enter / Escape）
- 焦點狀態明顯可見（光暈效果）
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
