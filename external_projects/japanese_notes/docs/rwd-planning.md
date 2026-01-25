# 響應式網頁設計 (RWD) 規劃

## 設計原則

- **Mobile First**：優先設計行動裝置，再擴展到桌面
- **彈性佈局**：使用 Flexbox 和 Grid 實現彈性佈局
- **彈性圖片**：圖片自動適應容器大小
- **觸控友好**：行動裝置上的按鈕和連結要有足夠的點擊區域
- **效能優化**：針對不同裝置載入適當的資源

---

## 斷點規劃

### 標準斷點

```css
/* 行動裝置（手機） */
@media (max-width: 599px) {
  /* 單欄佈局 */
}

/* 小型平板 */
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

### 詳細斷點定義

| 裝置類型     | 寬度範圍       | 主要特徵               |
| ------------ | -------------- | ---------------------- |
| 手機（直向） | 320px - 599px  | 單欄佈局、抽屜式導航   |
| 手機（橫向） | 600px - 767px  | 單欄佈局、可收合側邊欄 |
| 平板         | 768px - 959px  | 可收合側邊欄、兩欄內容 |
| 桌面         | 960px - 1279px | 完整雙欄佈局           |
| 大螢幕       | 1280px+        | 最大寬度限制、居中顯示 |

---

## 佈局規劃

### 1. Header（導航列）

#### 桌面版（960px+）

```css
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  height: 64px;
  position: sticky;
  top: 0;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  z-index: 100;
}

.header__logo {
  font-size: var(--text-xl);
}

.header__nav {
  display: flex;
  gap: 24px;
}

.header__actions {
  display: flex;
  gap: 16px;
  align-items: center;
}
```

#### 平板版（600px - 959px）

```css
@media (max-width: 959px) {
  .header {
    padding: 12px 24px;
  }

  .header__nav {
    gap: 16px;
  }
}
```

#### 手機版（< 600px）

```css
@media (max-width: 599px) {
  .header {
    padding: 12px 16px;
    height: 56px;
  }

  .header__logo {
    font-size: var(--text-lg);
  }

  .header__nav {
    display: none; /* 改為抽屜式選單 */
  }

  .header__menu-toggle {
    display: block; /* 顯示漢堡選單按鈕 */
  }
}
```

### 2. 側邊欄（Navigation）

#### 桌面版（960px+）

```css
.sidebar {
  width: 280px;
  position: fixed;
  left: 0;
  top: 64px;
  height: calc(100vh - 64px);
  overflow-y: auto;
  padding: 24px;
  background: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
}
```

#### 平板版（600px - 959px）

```css
@media (max-width: 959px) {
  .sidebar {
    width: 240px;
    transform: translateX(-100%);
    transition: transform 0.3s;
    z-index: 99;
  }

  .sidebar--open {
    transform: translateX(0);
  }
}
```

#### 手機版（< 600px）

```css
@media (max-width: 599px) {
  .sidebar {
    width: 280px;
    transform: translateX(-100%);
    z-index: 1000;
    box-shadow: var(--shadow-lg);
  }

  .sidebar-overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
  }

  .sidebar-overlay--active {
    opacity: 1;
    pointer-events: all;
  }
}
```

### 3. 主內容區域

#### 桌面版（960px+）

```css
.main-content {
  margin-left: 280px;
  padding: 32px;
  max-width: 1200px;
}
```

#### 平板版（600px - 959px）

```css
@media (max-width: 959px) {
  .main-content {
    margin-left: 0;
    padding: 24px;
  }
}
```

#### 手機版（< 600px）

```css
@media (max-width: 599px) {
  .main-content {
    padding: 16px;
  }
}
```

### 4. 內容卡片網格

#### 桌面版（960px+）

```css
.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}
```

#### 平板版（600px - 959px）

```css
@media (max-width: 959px) {
  .content-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }
}
```

#### 手機版（< 600px）

```css
@media (max-width: 599px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
```

### 5. 內容詳情頁

#### 桌面版（960px+）

```css
.content-detail {
  max-width: 900px;
  margin: 0 auto;
  padding: 48px;
}
```

#### 平板版（600px - 959px）

```css
@media (max-width: 959px) {
  .content-detail {
    padding: 32px 24px;
  }
}
```

#### 手機版（< 600px）

```css
@media (max-width: 599px) {
  .content-detail {
    padding: 24px 16px;
  }

  .content-detail__title {
    font-size: var(--text-2xl);
  }

  .content-detail__japanese {
    font-size: var(--japanese-font-size);
  }
}
```

---

## 觸控優化

### 觸控目標大小

```css
/* 最小觸控目標：44x44px（iOS 建議）或 48x48px（Material Design） */
.btn,
.tag,
.nav-item {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 16px;
}

@media (max-width: 599px) {
  .btn,
  .tag {
    min-height: 48px;
    padding: 14px 20px;
  }
}
```

### 觸控回饋

```css
@media (hover: none) and (pointer: coarse) {
  /* 觸控裝置 */
  .btn:active {
    transform: scale(0.98);
  }

  .content-card:active {
    transform: scale(0.98);
  }
}
```

---

## 圖片響應式

### 彈性圖片

```css
img {
  max-width: 100%;
  height: auto;
  display: block;
}

.content-detail img {
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  margin: 24px 0;
}

@media (max-width: 599px) {
  .content-detail img {
    margin: 16px 0;
  }
}
```

### 響應式圖片（srcset）

```html
<img
  src="image-small.jpg"
  srcset="image-small.jpg 320w, image-medium.jpg 768w, image-large.jpg 1200w"
  sizes="(max-width: 599px) 100vw, (max-width: 959px) 80vw, 900px"
  alt="描述"
/>
```

---

## 字型響應式

### 字型大小調整

```css
:root {
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 32px;
  --text-4xl: 48px;

  --japanese-font-size: 1.1em;
}

@media (max-width: 959px) {
  :root {
    --text-2xl: 22px;
    --text-3xl: 28px;
    --text-4xl: 40px;
  }
}

@media (max-width: 599px) {
  :root {
    --text-base: 15px;
    --text-lg: 17px;
    --text-xl: 19px;
    --text-2xl: 20px;
    --text-3xl: 24px;
    --text-4xl: 32px;

    --japanese-font-size: 1em;
  }
}
```

---

## 表格響應式

### 水平滾動

```css
.table-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

@media (max-width: 599px) {
  table {
    min-width: 600px;
  }
}
```

### 卡片式表格（手機版）

```css
@media (max-width: 599px) {
  .table-card {
    display: block;
  }

  .table-card tr {
    display: block;
    margin-bottom: 16px;
    box-shadow: var(--shadow-md);
    border-radius: var(--radius-lg);
    padding: 16px;
  }

  .table-card td {
    display: block;
    text-align: right;
    padding: 8px 0;
  }

  .table-card td::before {
    content: attr(data-label);
    float: left;
    font-weight: var(--font-semibold);
  }
}
```

---

## 表單響應式

### 輸入框

```css
.form-group {
  margin-bottom: 24px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
}

@media (max-width: 599px) {
  .form-input {
    padding: 14px 16px;
    font-size: 16px; /* 防止 iOS 自動縮放 */
  }
}
```

### 按鈕組

```css
.button-group {
  display: flex;
  gap: 12px;
}

@media (max-width: 599px) {
  .button-group {
    flex-direction: column;
  }

  .button-group .btn {
    width: 100%;
  }
}
```

---

## 搜尋框響應式

```css
.search-box {
  max-width: 600px;
  width: 100%;
}

@media (max-width: 959px) {
  .search-box {
    max-width: 100%;
  }
}

@media (max-width: 599px) {
  .search-box__input {
    font-size: 16px; /* 防止 iOS 自動縮放 */
  }
}
```

---

## 導航選單響應式

### 桌面版：水平導航

```css
.nav-menu {
  display: flex;
  gap: 24px;
  list-style: none;
}
```

### 手機版：抽屜式選單

```css
@media (max-width: 599px) {
  .nav-menu {
    position: fixed;
    top: 56px;
    left: 0;
    width: 280px;
    height: calc(100vh - 56px);
    background: var(--bg-primary);
    box-shadow: var(--shadow-lg);
    flex-direction: column;
    padding: 24px;
    transform: translateX(-100%);
    transition: transform 0.3s;
    z-index: 1000;
  }

  .nav-menu--open {
    transform: translateX(0);
  }
}
```

---

## 效能優化

### 圖片延遲載入

```html
<img src="placeholder.jpg" data-src="image.jpg" loading="lazy" alt="描述" />
```

### 條件載入

```javascript
// 根據螢幕大小載入不同的內容
if (window.innerWidth >= 960) {
  // 載入桌面版特定內容
} else {
  // 載入行動版特定內容
}
```

---

## 測試檢查清單

### 裝置測試

- [ ] iPhone SE (375px)
- [ ] iPhone 12/13 (390px)
- [ ] iPhone 12/13 Pro Max (428px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)
- [ ] 桌面 (1280px+)

### 功能測試

- [ ] 導航選單在手機上正常運作
- [ ] 所有按鈕和連結有足夠的觸控區域
- [ ] 圖片正確縮放
- [ ] 文字大小適中，易於閱讀
- [ ] 日文字體正確顯示
- [ ] 表格在小螢幕上可正常使用
- [ ] 表單輸入正常（防止 iOS 自動縮放）
- [ ] 主題切換正常運作

### 瀏覽器測試

- [ ] Chrome（桌面 + 行動）
- [ ] Safari（桌面 + iOS）
- [ ] Firefox（桌面 + 行動）
- [ ] Edge（桌面）

---

## 實作優先順序

1. **基礎響應式佈局** - Flexbox/Grid 佈局
2. **導航選單** - 抽屜式選單
3. **內容卡片網格** - 響應式網格
4. **觸控優化** - 觸控目標大小
5. **圖片響應式** - 彈性圖片和 srcset
6. **字型調整** - 響應式字型大小（含日文）
7. **表單優化** - 防止 iOS 自動縮放
