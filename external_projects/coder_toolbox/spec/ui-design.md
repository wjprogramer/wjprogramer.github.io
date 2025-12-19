# UI 設計規格 - Liquid Glass 風格

## 設計理念

採用 Apple 2025 年發布的 **Liquid Glass** 設計語言，特點是：

- 🪟 **透明玻璃質感** - 半透明背景搭配模糊效果
- ✨ **流動光線** - 動態光澤與反射效果
- 🌊 **柔和圓角** - 大圓角膠囊形狀
- 💫 **微妙動畫** - 優雅的過渡與互動回饋
- 🎨 **動態背景** - 漸層色彩與浮動裝飾

---

## 色彩系統

### CSS 變數定義

```css
:root {
  /* ===== 玻璃效果 ===== */
  --glass-bg: rgba(255, 255, 255, 0.15);
  --glass-bg-hover: rgba(255, 255, 255, 0.25);
  --glass-border: rgba(255, 255, 255, 0.3);
  --glass-border-subtle: rgba(255, 255, 255, 0.15);
  --glass-shadow: rgba(0, 0, 0, 0.1);
  --glass-blur: 20px;
  --glass-radius: 24px;
  --glass-radius-sm: 16px;
  --glass-radius-lg: 32px;

  /* ===== 強調色 ===== */
  --accent-color: #007aff;
  --accent-hover: #0066d6;
  --accent-glow: rgba(0, 122, 255, 0.4);

  /* ===== 文字色 ===== */
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.8);
  --text-muted: rgba(255, 255, 255, 0.6);
  --text-placeholder: rgba(255, 255, 255, 0.5);

  /* ===== 狀態色 ===== */
  --success: #34c759;
  --success-glow: rgba(52, 199, 89, 0.4);
  --warning: #ff9f0a;
  --warning-glow: rgba(255, 159, 10, 0.4);
  --error: #ff3b30;
  --error-glow: rgba(255, 59, 48, 0.4);

  /* ===== 背景漸層 ===== */
  --bg-gradient-1: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  --bg-gradient-2: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  --bg-gradient-3: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);

  /* ===== 動畫 ===== */
  --transition-fast: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 深色模式

```css
[data-theme="dark"] {
  --glass-bg: rgba(0, 0, 0, 0.3);
  --glass-bg-hover: rgba(0, 0, 0, 0.4);
  --glass-border: rgba(255, 255, 255, 0.15);
  --glass-border-subtle: rgba(255, 255, 255, 0.08);
}
```

---

## 字型系統

```css
:root {
  --font-primary: "Noto Sans TC", -apple-system, BlinkMacSystemFont, sans-serif;
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

## 核心元件

### 1. Glass Container（玻璃容器）

基礎的玻璃效果容器，所有元件的基底。

```css
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border-radius: var(--glass-radius);
  border: 1px solid var(--glass-border);
  box-shadow:
    0 8px 32px var(--glass-shadow),
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    inset 0 -1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

/* 頂部光澤 */
.glass::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  pointer-events: none;
}

/* 流動光線（可選） */
.glass.shimmer::after {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 40%,
    rgba(255, 255, 255, 0.1) 45%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.1) 55%,
    transparent 60%
  );
  animation: shimmer 8s ease-in-out infinite;
  pointer-events: none;
}

@keyframes shimmer {
  0%,
  100% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
}
```

### 2. Glass Button（玻璃按鈕）

```css
.glass-btn {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: var(--glass-radius-sm);
  padding: 10px 16px;
  color: var(--text-primary);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: var(--transition-normal);
}

.glass-btn:hover {
  background: var(--glass-bg-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px var(--glass-shadow);
}

.glass-btn:active {
  transform: translateY(0) scale(0.98);
}

/* 主要按鈕 */
.glass-btn.primary {
  background: linear-gradient(135deg, var(--accent-color), #5856d6);
  border-color: transparent;
  box-shadow: 0 4px 16px var(--accent-glow);
}

.glass-btn.primary:hover {
  box-shadow: 0 8px 32px var(--accent-glow);
}
```

### 3. Glass Input（玻璃輸入框）

```css
.glass-input {
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border-subtle);
  border-radius: var(--glass-radius-sm);
  padding: 16px 20px;
  color: var(--text-primary);
  font-size: var(--text-base);
  font-family: var(--font-mono);
  transition: var(--transition-normal);
}

.glass-input::placeholder {
  color: var(--text-placeholder);
}

.glass-input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 4px var(--accent-glow);
}
```

### 4. Glass Card（玻璃卡片）

```css
.glass-card {
  padding: 24px;
  transition: var(--transition-slow);
}

.glass-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

/* 卡片圖標 */
.card-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.1)
  );
  border-radius: var(--glass-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  font-size: 28px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### 5. Glass Radio / Checkbox（玻璃選項）

```css
.glass-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid var(--glass-border-subtle);
  border-radius: var(--glass-radius-sm);
  cursor: pointer;
  transition: var(--transition-normal);
  color: var(--text-primary);
  font-size: var(--text-sm);
}

.glass-option:hover {
  background: rgba(255, 255, 255, 0.2);
}

.glass-option.active {
  background: var(--accent-color);
  border-color: var(--accent-color);
  box-shadow: 0 4px 12px var(--accent-glow);
}
```

---

## 頁面佈局

### 整體結構

```
┌─────────────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░ 動態漸層背景 ░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░░ + 浮動光球裝飾 ░░░░░░░░░░░░░░░░░░░░ │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 🪟  Header (玻璃效果)                    🌙  ℹ️    │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ ┌──────────┐ ┌───────────────────────────────────────┐ │
│ │ 🪟       │ │ 🪟                                    │ │
│ │ Sidebar  │ │       主內容區域 (玻璃效果)             │ │
│ │ (玻璃)   │ │                                       │ │
│ │          │ │                                       │ │
│ │ 📂 編碼  │ │                                       │ │
│ │ 📂 程式碼│ │                                       │ │
│ │ 📂 圖片  │ │                                       │ │
│ │          │ │                                       │ │
│ └──────────┘ └───────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 背景裝飾

```css
/* 動態漸層背景 */
body {
  background: var(--bg-gradient-1);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* 浮動光球裝飾 */
.bg-orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.6;
  animation: float 20s ease-in-out infinite;
  pointer-events: none;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(30px, -30px) scale(1.05);
  }
  50% {
    transform: translate(-20px, 20px) scale(0.95);
  }
  75% {
    transform: translate(20px, 30px) scale(1.02);
  }
}
```

---

## Header 導航欄

```
┌─────────────────────────────────────────────────────────┐
│ 🪟                                                      │
│  ☰  [Logo] Coder Toolbox                    🌙   ℹ️    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

- **高度**：64px
- **樣式**：`.glass` 玻璃效果
- **元素**：
  - 漢堡選單（移動端）
  - Logo + 網站名稱
  - 主題切換按鈕
  - 關於按鈕

---

## 側邊欄

```
┌────────────────┐
│ 🪟             │
│                │
│ 🔐 編碼工具    │
│   • Base64    │
│   • URL 編碼  │
│   • Hash      │
│                │
│ 📝 程式碼工具  │
│   • HTML      │
│   • CSS       │
│   • JS        │
│                │
│ 🖼️ 圖片工具    │
│   • QR Code   │
│                │
└────────────────┘
```

- **寬度**：280px（桌面）
- **樣式**：`.glass` 玻璃效果
- **行為**：
  - 桌面：常駐顯示
  - 移動：抽屜式，滑入滑出

---

## 工具頁面佈局

```
┌─────────────────────────────────────────────────────────┐
│ 🪟 工具面板                                             │
│ ┌─────────────────────────────────────────────────────┐ │
│ │  🔐 Base64 編碼 / 解碼                    📜 歷史  │ │
│ ├─────────────────────────────────────────────────────┤ │
│ │                                                     │ │
│ │  輸入                                               │ │
│ │  ┌─────────────────────────────────────────────┐   │ │
│ │  │ 🪟 玻璃輸入框                                │   │ │
│ │  │                                              │   │ │
│ │  └─────────────────────────────────────────────┘   │ │
│ │                                                     │ │
│ │  ┌───────────┐ ┌───────────┐                       │ │
│ │  │ ○ 編碼    │ │ ○ 解碼    │  (玻璃選項)           │ │
│ │  └───────────┘ └───────────┘                       │ │
│ │                                                     │ │
│ │       [ 🔄 轉換 ]  [ 🗑️ 清除 ]  [ 📋 複製 ]         │ │
│ │                                                     │ │
│ │  輸出                                               │ │
│ │  ┌─────────────────────────────────────────────┐   │ │
│ │  │ 🪟 玻璃輸出框                                │   │ │
│ │  │                                              │   │ │
│ │  └─────────────────────────────────────────────┘   │ │
│ │                                                     │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## 首頁設計

### Hero 區塊

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                    ✨ Coder Toolbox                     │
│                                                         │
│              一個實用的程式開發者工具箱                    │
│                                                         │
│           ┌─────────────────────────────┐              │
│           │ 🔍 搜尋工具...               │              │
│           └─────────────────────────────┘              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 工具卡片網格

```css
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}
```

```
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ 🪟              │ │ 🪟              │ │ 🪟              │
│    🔐           │ │    📝          │ │    🖼️           │
│                 │ │                 │ │                 │
│  編碼工具        │ │  程式碼工具      │ │  圖片工具        │
│                 │ │                 │ │                 │
│  Base64, URL,   │ │  HTML, CSS,    │ │  QR Code,      │
│  Hash, 加密     │ │  JS 格式化      │ │  Data URI      │
│                 │ │                 │ │                 │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

---

## 動畫效果

### 頁面載入動畫

```css
/* 淡入 + 上浮 */
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

.fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
}

/* 交錯動畫 */
.stagger-1 {
  animation-delay: 0.1s;
}
.stagger-2 {
  animation-delay: 0.2s;
}
.stagger-3 {
  animation-delay: 0.3s;
}
```

### 互動回饋

| 互動 | 動畫效果 |
| ---- | -------- |
| 按鈕懸停 | 上浮 2px + 陰影加深 |
| 按鈕點擊 | 縮放 0.98 |
| 卡片懸停 | 上浮 8px + 縮放 1.02 + 光線閃動 |
| 輸入框聚焦 | 邊框發光 + 光暈 |
| 側邊欄展開 | 滑入 + 遮罩淡入 |
| Toast 出現 | 從底部滑入 |

---

## Toast 通知

```css
.toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  padding: 14px 24px;
  color: var(--text-primary);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  opacity: 0;
  transition: var(--transition-normal);
  z-index: 1000;
}

.toast.show {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}
```

---

## 響應式斷點

```css
/* 移動端 */
@media (max-width: 599px) {
  :root {
    --glass-radius: 20px;
    --glass-radius-sm: 12px;
  }

  /* 側邊欄隱藏，抽屜式 */
  /* 單欄佈局 */
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
}
```

---

## 無障礙設計

- 所有互動元素具有適當的 `aria-label`
- 色彩對比度符合 WCAG 2.1 AA 標準（玻璃效果需確保文字可讀性）
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
