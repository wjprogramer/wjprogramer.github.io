# 專案規劃

## 專案目標

建立一個羽毛球相關的筆記網站，以 SPA 形式呈現。

## 技術需求

- SPA (Single Page Application)
- Light/Dark 模式切換（支援系統設定）
- 多國化 (i18n)：繁體中文、簡體中文、英文、日文

## 開發階段

### 階段一：內容規劃 ✅ 完成

- [x] 建立專案資料夾
- [x] 建立內容發想文件
- [x] 討論並確定內容方向
- [x] 整理內容架構
- [x] 規劃頁面結構

### 階段二：設計規劃 ✅ 完成

- [x] UI/UX 設計（Neumorphism 風格）
- [x] 色彩方案（Light/Dark）
- [x] 版面規劃
- [x] 互動流程

### 階段三：技術選型 ✅ 完成

- [x] 前端框架選擇（純前端，無框架）
- [x] 路由方案（Hash-based SPA）
- [x] 狀態管理（localStorage）
- [x] i18n 方案（自建多國化系統）
- [x] 主題切換方案（支援系統設定）

### 階段四：開發實作

- [ ] 專案初始化
- [ ] 基礎架構搭建
- [ ] 功能開發
- [ ] 內容整理與輸入

### 階段五：測試與優化

- [ ] 功能測試
- [ ] 效能優化
- [ ] **響應式測試（RWD）** - 詳見 [RWD 規劃](./rwd-planning.md)
- [ ] 瀏覽器相容性測試

## 已確定事項

- [x] **專案名稱**：badminton-notes
- [x] **多國化語言**：繁體中文、簡體中文、英文、日文
- [x] **內容格式**：JSON（主要）+ Markdown（如需要），內容 hardcode
- [x] **功能需求**：
  - [x] 搜尋功能
  - [x] 標籤分類
  - [x] 收藏功能（localStorage）
  - [ ] 使用者筆記（不需要）
  - [ ] 進度追蹤（不需要）
- [x] **頁面結構**：已規劃（詳見 [頁面結構規劃](./page-structure.md)）
- [x] **內容格式**：已規劃（詳見 [內容格式規劃](./content-format.md)）
- [x] **設計風格**：Neumorphism（新擬態）（詳見 [UI 設計規劃 - Neumorphism](./ui-design-neumorphism.md)）

詳細規劃請參考：

- [內容發想](./content-brainstorming.md)
- [內容架構規劃](./content-structure.md)
- [頁面結構規劃](./page-structure.md)
- [內容格式規劃](./content-format.md)
- [UI 設計規劃 - Neumorphism](./ui-design-neumorphism.md)
- [響應式網頁設計規劃 (RWD)](./rwd-planning.md)
- [技術架構規劃](./tech-stack.md)
