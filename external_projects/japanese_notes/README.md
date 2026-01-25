# 日文筆記專案

一個結構化的日文學習筆記網站，採用 SPA 架構，支援響應式設計和亮暗主題切換。

## 專案特色

- 📱 **響應式設計 (RWD)** - 適配各種裝置尺寸
- 🎨 **亮暗主題** - 支援系統設定自動切換
- 🌐 **多國化 (i18n)** - 支援繁體中文、英文
- 📚 **結構化內容** - 文法、單字、漢字分類整理
- 🔍 **搜尋功能** - 支援日文、中文、英文搜尋
- ⭐ **收藏功能** - 使用 localStorage 儲存收藏內容

## 技術架構

- **純前端方案** - HTML5 + CSS3 + JavaScript (ES6+)
- **SPA 路由** - Hash-based 路由系統
- **模組化設計** - ES Modules
- **無建置步驟** - 直接部署到 GitHub Pages

## 專案結構

```
japanese_notes/
├── index.html                    # SPA 入口
├── css/                          # 樣式檔案
│   ├── variables.css             # CSS 變數（含 Light/Dark）
│   ├── reset.css                 # CSS Reset
│   ├── main.css                  # 主樣式
│   └── components/               # 元件樣式
├── js/                           # JavaScript 檔案
│   ├── app.js                    # 應用程式入口
│   ├── router.js                 # 路由系統
│   ├── components/               # UI 元件
│   ├── pages/                    # 頁面元件
│   ├── utils/                    # 工具函式
│   └── data/                     # 內容資料
└── docs/                         # 規格文件
    ├── project-planning.md       # 專案規劃
    ├── tech-stack.md             # 技術架構
    ├── ui-design.md              # UI 設計
    ├── rwd-planning.md           # RWD 規劃
    ├── content-structure.md      # 內容架構
    └── page-structure.md         # 頁面結構
```

## 規格文件

詳細規格請參考 `docs/` 資料夾：

- [專案規劃](./docs/project-planning.md) - 專案目標、開發階段、功能需求
- [技術架構](./docs/tech-stack.md) - 技術選型、專案結構、路由設計
- [UI 設計](./docs/ui-design.md) - 設計理念、色彩系統、核心元件
- [RWD 規劃](./docs/rwd-planning.md) - 響應式設計、斷點規劃、觸控優化
- [內容架構](./docs/content-structure.md) - 內容組織、結構模板、格式範例
- [頁面結構](./docs/page-structure.md) - 頁面規劃、導航結構、互動設計

## 開發狀態

### 已完成

- [x] 專案規劃文件
- [x] 技術架構規劃
- [x] UI 設計規劃
- [x] RWD 規劃
- [x] 內容架構規劃
- [x] 頁面結構規劃

### 待開發

- [ ] 專案初始化
- [ ] 基礎架構搭建
- [ ] 功能開發
- [ ] 內容整理與輸入

## 部署

專案部署在 GitHub Pages：

```
https://wjprogramer.github.io/external_projects/japanese_notes/
```

## 授權

本專案為個人學習專案。
