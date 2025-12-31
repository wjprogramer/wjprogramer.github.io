# UI/UX 設計規格

## 設計原則

1. **簡潔明瞭**：介面簡潔，功能清晰
2. **易於使用**：減少操作步驟，提高效率
3. **視覺層次**：重要資訊突出顯示
4. **一致性**：保持設計風格一致
5. **無障礙**：符合基本無障礙標準

---

## 設計風格：寶可夢卡片風格（Pokemon Card Style）

**已選定風格**：寶可夢卡片風格（Pokemon Card Style）

**設計特點**：
- **寶可夢卡片視覺效果**：參考真實寶可夢卡片的設計風格
- **全息效果（Holographic）**：卡片具有全息/彩虹光澤效果
- **3D 立體感**：卡片有明顯的立體感和深度
- **豐富的動畫效果**：懸停、翻轉等互動動畫
- **遊戲化元素**：活潑、有趣的視覺體驗
- **鮮豔配色**：色彩豐富，視覺吸引力強

**參考資源**：
- [Pokemon Cards CSS - GitHub](https://github.com/simeydotme/pokemon-cards-css) - 寶可夢卡片全息效果 CSS 實作參考
- [Demo 展示](https://poke-holo.simey.me/) - 實際效果展示

**視覺元素**：
- **卡片**：
  - 3D 立體效果，明顯陰影和深度
  - 全息/彩虹光澤效果（Holographic effect）
  - 圓角 12-16px
  - 懸停時有傾斜效果（Tilt effect）
  - 翻轉時有流暢的 3D 翻轉動畫
- **按鈕**：
  - 圓角 12px
  - 漸層背景或實色
  - 懸停時 3D 提升效果
  - 點擊時有按壓動畫
- **字體**：
  - 無襯線字體，字重較大
  - 數字和符號使用較粗的字重，突出顯示
- **圖示**：
  - 填充圖示風格
  - 色彩豐富，與卡片風格一致

**配色方案**：
- **Light Mode**：
  - 主色：`#FF6B6B`（紅色）
  - 次要色：`#4ECDC4`（青色）
  - 背景：`#FFF5E6`（溫暖的米色）
  - 卡片背景：`#FFFFFF`（白色，帶全息效果）
  - 文字：`#2C3E50`（深藍灰色）
  - 強調色：`#FFE66D`（黃色）
  - 全息效果：彩虹漸層（紅、橙、黃、綠、藍、紫）
- **Dark Mode**：
  - 主色：`#FF8787`（亮紅色）
  - 次要色：`#6EDCD4`（亮青色）
  - 背景：`#1A1A2E`（深藍色）
  - 卡片背景：`#16213E`（深藍灰色，帶全息效果）
  - 文字：`#EEEEEE`（淺灰色）
  - 強調色：`#FFED4E`（亮黃色）
  - 全息效果：彩虹漸層（在深色背景下更明顯）

**適用場景**：
- 適合年輕團隊、創意工作坊
- 增加估點過程的趣味性
- 提升使用者參與度和互動體驗

---

## 共同設計元素

### 1. 估點牌設計（寶可夢卡片風格）

**基本結構**：
- **寶可夢卡片風格**：參考真實寶可夢卡片的視覺設計
- **全息效果**：使用 CSS 漸層、混合模式和濾鏡模擬全息/彩虹光澤
- **3D 立體感**：明顯的陰影、深度和立體效果
- 正面：顯示數字/文字，帶全息效果
- 背面：顯示問號或隱藏，帶全息效果
- 翻轉動畫：流暢的 3D 翻轉效果（Y 軸旋轉）

**尺寸**：
- Desktop：120x160px（接近標準卡片比例）
- Tablet：100x140px
- Mobile：80x120px

**視覺效果**：
- **全息效果（Holographic）**：
  - 使用 CSS 漸層模擬彩虹光澤
  - 懸停或移動時，光澤會隨角度變化
  - 使用 `background: linear-gradient()` 和 `mix-blend-mode` 實現
  - 參考：[Pokemon Cards CSS](https://github.com/simeydotme/pokemon-cards-css)
- **3D 效果**：
  - 明顯的陰影（`box-shadow`）
  - 懸停時傾斜效果（`transform: perspective()` + `rotateX/rotateY`）
  - 深度感（`transform: translateZ()`）

**狀態**：
- **預設**：
  - 灰色/白色背景，帶全息效果
  - 深色文字，清晰易讀
  - 輕微的 3D 立體感
- **懸停**：
  - 輕微放大（`scale(1.05)`）
  - 3D 傾斜效果（Tilt effect）
  - 全息效果增強
  - 陰影加深
- **已選擇**：
  - 主色背景，白色文字
  - 明顯邊框（2-3px）
  - 全息效果更明顯
  - 3D 提升效果（`translateY(-4px)`）
- **已翻牌**：
  - 顯示結果
  - 流暢的 3D 翻轉動畫
  - 翻轉後保持全息效果

**技術實作參考**：
- 參考 [Pokemon Cards CSS](https://github.com/simeydotme/pokemon-cards-css) 的全息效果實作
- 使用 CSS `background`、`filter`、`mix-blend-mode` 等屬性
- 使用 `transform` 和 `perspective` 實現 3D 效果
- 使用 JavaScript 監聽滑鼠/觸控移動，動態調整全息效果角度
- **Tilt Effect**：
  - Desktop：監聽 `mousemove` 事件，根據滑鼠位置調整卡片傾斜角度
  - Mobile：監聽 `touchmove` 事件，根據觸控位置調整卡片傾斜角度
  - **重要**：Mobile 上也要完整保留 Tilt effect，不需要降級或簡化

### 2. 按鈕設計（寶可夢卡片風格）

**類型**：
- **主要按鈕**：
  - 漸層背景或實色，白色文字
  - 帶有輕微的全息效果或光澤
  - 3D 立體感（明顯陰影）
- **次要按鈕**：
  - 透明背景，主色邊框和文字
  - 邊框帶有光澤效果
- **危險按鈕**：
  - 紅色漸層背景，白色文字
  - 明顯的 3D 效果
- **文字按鈕**：
  - 無背景，主色文字
  - 懸停時有輕微背景色

**尺寸**：
- 高度：44px（Mobile 觸控優化）
- 內距：16px 24px
- 圓角：12px（符合寶可夢卡片風格）

**狀態**：
- **預設**：
  - 正常狀態，帶有 3D 立體感
  - 輕微的全息效果或光澤
- **懸停**：
  - 3D 提升效果（`translateY(-2px)`）
  - 陰影加深
  - 全息效果增強
  - 輕微放大（`scale(1.02)`）
- **點擊**：
  - 按下效果（`translateY(1px)`）
  - 陰影減弱
- **禁用**：
  - 降低透明度和飽和度
  - 移除 3D 效果
  - 不可點擊

### 3. 模態框設計（寶可夢卡片風格）

**結構**：
- 半透明背景遮罩（`rgba(0, 0, 0, 0.6)`，較深以突出卡片）
- 中央卡片式內容區（帶有寶可夢卡片風格的視覺效果）
- 關閉按鈕（右上角，帶有 3D 效果）

**視覺效果**：
- 內容區帶有輕微的全息效果或光澤
- 3D 立體感（明顯陰影）
- 圓角 16px（符合寶可夢卡片風格）

**尺寸**：
- Desktop：最大寬度 600px
- Mobile：全螢幕或接近全螢幕

**動畫**：
- 出現：淡入 + 從下往上滑入 + 輕微縮放（`scale(0.95)` → `scale(1)`）
- 消失：淡出 + 往下滑出 + 輕微縮小
- 時長：0.3-0.4 秒

### 4. 參與者列表設計

**項目結構**：
- 頭像/圖示（左側）
- 名稱（中間）
- 狀態指示（右側）
- 操作按鈕（如踢除）

**狀態指示**：
- 已連線：綠色圓點
- 已斷線：灰色圓點
- 已選擇：藍色圓點
- 未選擇：白色圓點

### 5. 統計面板設計

**結構**：
- 標題
- 參與者列表與估點值
- 統計數字（平均、最高、最低）
- 分佈圖（可選）

**視覺化**：
- 長條圖：顯示估點值分佈
- 圓餅圖：顯示估點值比例（可選）

---

## 響應式設計

### 斷點定義

- **Mobile**：< 768px
- **Tablet**：768px - 1023px
- **Desktop**：≥ 1024px

### 佈局設計

#### Mobile（< 768px）

- **單欄佈局**：所有內容垂直排列
- **估點牌**：2-3 列網格，每列 2-3 張牌
- **按鈕**：全寬或接近全寬
- **導航**：底部導航欄或漢堡選單
- **字體大小**：至少 16px（避免自動縮放）

#### Tablet（768px - 1023px）

- **雙欄佈局**：部分內容可並排顯示
- **估點牌**：3-4 列網格
- **按鈕**：適中寬度
- **導航**：頂部導航欄

#### Desktop（≥ 1024px）

- **多欄佈局**：充分利用空間
- **估點牌**：4-5 列網格
- **側邊欄**：可選的側邊欄顯示統計或設定
- **導航**：頂部導航欄

---

## 動畫設計

### 1. 翻牌動畫（寶可夢卡片風格）

**效果**：3D 翻轉（Y 軸旋轉 180 度），模擬真實卡片翻轉

**時長**：0.6-0.8 秒（流暢的翻轉動畫）

**動畫曲線**：`cubic-bezier(0.4, 0, 0.2, 1)` 或 `ease-in-out`

**實作**：
```css
.card-flip {
  transform-style: preserve-3d;
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  perspective: 1000px;
}

.card-front,
.card-back {
  backface-visibility: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
}

.card-back {
  transform: rotateY(180deg);
}

.card-flip.flipped {
  transform: rotateY(180deg);
}
```

**全息效果**：
- 翻轉過程中，全息效果會隨角度變化
- 使用 JavaScript 動態調整漸層角度
- 參考：[Pokemon Cards CSS](https://github.com/simeydotme/pokemon-cards-css) 的實作方式

### 2. 按鈕點擊動畫

**效果**：輕微縮放（0.95 倍）

**時長**：0.1 秒

**實作**：
```css
.button:active {
  transform: scale(0.95);
}
```

### 3. 頁面切換動畫

**效果**：淡入淡出

**時長**：0.3 秒

**實作**：
```css
.page-transition {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### 4. 載入動畫

**效果**：旋轉的載入圖示或骨架屏

**時長**：持續直到載入完成

---

## 無障礙設計

### 1. 鍵盤導航

- 所有互動元素可透過 Tab 鍵導航
- 使用 Enter 或 Space 鍵觸發操作
- 清晰的焦點指示器

### 2. ARIA 標籤

- 為互動元素添加 `aria-label`
- 為狀態元素添加 `aria-live`
- 為模態框添加 `role="dialog"`

### 3. 顏色對比度

- 文字與背景對比度至少 4.5:1（WCAG AA）
- 大文字（18pt+）對比度至少 3:1

### 4. 觸控目標

- 所有可點擊元素至少 44x44px
- 元素間距足夠，避免誤觸

---

## 字體選擇

### 推薦字體

1. **中文**：
   - Noto Sans TC（繁體中文）
   - Noto Sans SC（簡體中文）

2. **英文**：
   - Inter
   - Roboto
   - System Font Stack

3. **等寬字體**（如需要）：
   - JetBrains Mono
   - Fira Code

### 字體大小

- **標題 1**：32px（Desktop）/ 24px（Mobile）
- **標題 2**：24px（Desktop）/ 20px（Mobile）
- **標題 3**：20px（Desktop）/ 18px（Mobile）
- **正文**：16px
- **小字**：14px
- **極小字**：12px

---

## 圖示系統

### 推薦圖示庫

1. **Material Icons**（推薦）
   - CDN：`https://fonts.googleapis.com/icon?family=Material+Icons+Round`
   - 風格：圓角設計，現代感

2. **Font Awesome**
   - CDN：`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`
   - 風格：多樣化圖示

3. **Heroicons**
   - SVG 圖示，可自訂顏色

### 圖示使用

- 使用語義化圖示（如「設定」使用齒輪圖示）
- 保持圖示大小一致
- 與文字對齊良好

---

## 設計交付物

### 1. 設計稿（可選）

- Figma 或 Sketch 設計稿
- 包含主要頁面與元件

### 2. 設計系統文件

- 顏色規範
- 字體規範
- 元件規範
- 間距規範

### 3. 動畫規範

- 動畫時長
- 動畫曲線
- 動畫效果說明

---

## 設計參考資源

### 寶可夢卡片效果參考

- **[Pokemon Cards CSS - GitHub](https://github.com/simeydotme/pokemon-cards-css)**
  - 完整的寶可夢卡片全息效果 CSS 實作
  - 包含多種全息效果（Holographic effects）
  - 使用 CSS Transforms、Gradients、Blend-modes 和 Filters
  - 提供實際的程式碼範例和實作方式

- **[Demo 展示](https://poke-holo.simey.me/)**
  - 實際效果展示
  - 可以查看不同角度的全息效果

### 技術要點

**全息效果實作**：
- 使用 CSS `linear-gradient` 創建彩虹漸層
- 使用 `mix-blend-mode` 實現混合效果
- 使用 `filter` 添加光澤和模糊效果
- 使用 JavaScript 監聽滑鼠/觸控移動，動態調整漸層角度

**3D 效果實作**：
- 使用 `transform: perspective()` 創建 3D 空間
- 使用 `transform: rotateX/rotateY` 實現傾斜效果
- 使用 `transform: translateZ` 創建深度感
- 使用 `box-shadow` 增強立體感

---

## 下一步

1. **確認設計細節**：確認估點牌、按鈕等元件的具體設計
2. **參考實作**：參考 [Pokemon Cards CSS](https://github.com/simeydotme/pokemon-cards-css) 的實作方式
3. **開始實作**：根據寶可夢卡片風格開始實作 UI

