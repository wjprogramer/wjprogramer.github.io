# UI 設計規劃 - Neumorphism 風格

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

## 核心元件

### 1. 內容卡片 (Content Card) - Neumorphism

```css
.content-card {
  background: var(--neu-bg);
  border-radius: var(--neu-radius);
  padding: 24px;
  box-shadow: var(--neu-shadow-convex);
  transition: var(--transition-normal);
  cursor: pointer;
  border: none;
}

.content-card:hover {
  box-shadow: var(--neu-shadow-convex-hover);
  transform: translateY(-2px);
}

.content-card:active {
  box-shadow: var(--neu-shadow-pressed);
  transform: translateY(0);
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

### 2. 內容詳情區域 (Content Detail) - Neumorphism

```css
.content-detail {
  background: var(--content-bg);
  border-radius: var(--neu-radius-lg);
  padding: 48px;
  color: var(--content-text);
  line-height: 1.8;
  box-shadow: var(--neu-shadow-convex);
}

.content-detail__title {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  margin-bottom: 16px;
  color: var(--content-text);
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

### 3. 標籤 (Tag) - Neumorphism

```css
.tag {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  background: var(--neu-bg);
  border: none;
  border-radius: var(--neu-radius-sm);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  color: var(--text-primary);
  box-shadow: var(--neu-shadow-convex);
  transition: var(--transition-fast);
  cursor: pointer;
}

.tag:hover {
  box-shadow: var(--neu-shadow-convex-hover);
  transform: translateY(-1px);
}

.tag:active {
  box-shadow: var(--neu-shadow-pressed);
}

.tag--category {
  background: var(--accent-color);
  color: white;
  box-shadow: var(--accent-shadow-convex);
}

.tag--category:hover {
  background: var(--accent-hover);
  box-shadow: 
    12px 12px 24px rgba(91, 155, 213, 0.4),
    -12px -12px 24px rgba(255, 255, 255, 0.9);
}
```

### 4. 按鈕 (Button) - Neumorphism

```css
.btn-neu {
  background: var(--neu-bg);
  border: none;
  border-radius: var(--neu-radius-sm);
  padding: 12px 24px;
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--text-primary);
  box-shadow: var(--neu-shadow-convex);
  transition: var(--transition-normal);
  cursor: pointer;
}

.btn-neu:hover {
  box-shadow: var(--neu-shadow-convex-hover);
  transform: translateY(-2px);
}

.btn-neu:active {
  box-shadow: var(--neu-shadow-pressed);
  transform: translateY(0);
}

.btn-neu--primary {
  background: var(--accent-color);
  color: white;
  box-shadow: var(--accent-shadow-convex);
}

.btn-neu--primary:hover {
  background: var(--accent-hover);
  box-shadow: 
    12px 12px 24px rgba(91, 155, 213, 0.4),
    -12px -12px 24px rgba(255, 255, 255, 0.9);
}

.btn-neu--primary:active {
  box-shadow: 
    inset 4px 4px 8px rgba(61, 123, 168, 0.5),
    inset -4px -4px 8px rgba(91, 155, 213, 0.3);
}
```

### 5. 搜尋框 (Search Box) - Neumorphism

```css
.search-box {
  position: relative;
  width: 100%;
  max-width: 600px;
}

.search-box__input {
  width: 100%;
  background: var(--neu-bg);
  border: none;
  border-radius: var(--neu-radius-sm);
  padding: 12px 16px 12px 48px;
  color: var(--text-primary);
  font-size: var(--text-base);
  box-shadow: var(--neu-shadow-concave);
  transition: var(--transition-normal);
}

.search-box__input::placeholder {
  color: var(--text-placeholder);
}

.search-box__input:focus {
  outline: none;
  box-shadow: 
    var(--neu-shadow-concave),
    0 0 0 3px rgba(91, 155, 213, 0.2);
}

.search-box__icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
}
```

### 6. 輸入框 (Input) - Neumorphism

```css
.input-neu {
  width: 100%;
  background: var(--neu-bg);
  border: none;
  border-radius: var(--neu-radius-sm);
  padding: 12px 16px;
  color: var(--text-primary);
  font-size: var(--text-base);
  box-shadow: var(--neu-shadow-concave);
  transition: var(--transition-normal);
}

.input-neu::placeholder {
  color: var(--text-placeholder);
}

.input-neu:focus {
  outline: none;
  box-shadow: 
    var(--neu-shadow-concave),
    0 0 0 3px rgba(91, 155, 213, 0.2);
}
```

---

## 背景設計

### 基礎背景

```css
body {
  background: var(--neu-bg);
  min-height: 100vh;
  font-family: var(--font-primary);
  color: var(--text-primary);
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

| 互動 | 動畫效果 |
| ---- | -------- |
| 按鈕懸停 | 陰影加深 + 上浮 2px |
| 按鈕點擊 | 內凹陰影 + 按下效果 |
| 卡片懸停 | 陰影加深 + 上浮 2px |
| 標籤點擊 | 內凹陰影 |
| 輸入框聚焦 | 內凹陰影 + 焦點光暈 |

---

## 響應式設計

### 斷點

```css
/* 移動端 */
@media (max-width: 599px) {
  :root {
    --neu-radius: 16px;
    --neu-radius-sm: 10px;
  }
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
  .content-detail {
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

---

## 無障礙設計

- 所有互動元素具有適當的 `aria-label`
- 色彩對比度符合 WCAG 2.1 AA 標準
- 支援鍵盤導航（Tab / Enter / Escape）
- 焦點狀態明顯可見（內凹效果 + 光暈）
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

