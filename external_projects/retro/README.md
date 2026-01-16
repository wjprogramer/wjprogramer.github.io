# Retro (檢討) - 團隊回顧工具

## 專案概述

Retro 是一個專為團隊設計的敏捷回顧（Retrospective）Web App，旨在幫助團隊進行有效的檢討會議，追蹤改進項目，並促進團隊持續成長。

**專案名稱來源**：
- 「Retro」是「Retrospective（回顧）」的簡稱
- 簡潔好記，符合敏捷開發的術語習慣

## 核心目標

- ✅ 支援團隊進行敏捷回顧會議
- ✅ 提供匿名與實名兩種模式，保護參與者隱私
- ✅ 支援 P2P 協作，無需後端伺服器
- ✅ 可追蹤歷史回顧記錄
- ✅ 支援多種匯出格式（Markdown、圖片等）
- ✅ **SPA（Single Page Application）架構**，流暢的使用者體驗
- ✅ 純前端實作，無需自架後端
- ✅ 支援 Desktop 與 Mobile Web
- ✅ 部署於 GitHub Pages

---

## 功能模式

### 模式一：房主模式（Host Mode）

**適用場景**：建立回顧會議室、管理會議流程

**功能**：
- 建立回顧會議室（生成會議 ID）
- 設定會議主題與描述
- 選擇是否允許匿名參與
- 管理參與者（最多 15 人）
- 控制會議流程（開始/結束回顧）
- 查看所有參與者的回顧內容
- 匯出回顧結果
- 追蹤歷史回顧記錄

### 模式二：參與者模式（Participant Mode）

**適用場景**：加入回顧會議、提出回顧意見

**功能**：
- 透過會議 ID 或 QR Code 加入會議
- 提出問題點（What went wrong）
- 提出做得好的地方（What went well）
- 提出改進建議（Action items）
- 對他人的意見進行投票
- 選擇每則留言是否匿名（在房主允許匿名的情況下）
- 查看回顧結果

---

## 技術需求

### 前端技術

- **HTML5** - 頁面結構
- **CSS3** - 樣式與動畫（支援 RWD）
- **JavaScript (ES6+)** - 邏輯與互動
- **ES Modules** - 模組化程式碼組織

### 部署環境

- **GitHub Pages** - 靜態網站託管
- 無後端伺服器
- 無資料庫

### 資料儲存

- **localStorage** - 本地資料儲存（未連結 Google Drive 時）
- **Google Drive API** - 雲端儲存（可選，需使用者授權）
- 使用命名空間避免與其他頁面衝突

---

## 功能需求

### 核心功能

1. **會議室管理系統**
   - 建立會議室（生成唯一會議 ID）
   - 設定會議主題、描述、日期
   - 選擇是否允許匿名參與
   - 參與者管理（最多 15 人）
   - 參與者名稱不能重複

2. **回顧內容系統**
   - 問題點（What went wrong）
   - 做得好的地方（What went well）
   - 改進建議（Action items）
   - 每則留言可選擇是否匿名（在房主允許匿名的情況下）

3. **投票系統**
   - 對他人的意見進行投票
   - 顯示投票數與投票者（可選匿名）

4. **匯出功能**
   - Markdown 格式
   - 圖片格式（PNG/JPG）
   - PDF 格式（可選）

5. **追蹤功能**
   - 記錄歷史回顧會議
   - 追蹤改進項目的執行狀態
   - 顯示回顧趨勢

6. **主題系統**
   - Dark Mode / Light Mode
   - 預設跟隨瀏覽器系統主題（`prefers-color-scheme`）
   - 可手動切換

7. **多國語系**
   - 支援語言：
     - 繁體中文（zh-TW）
     - English（en）
     - 日本語（ja）
   - 預設語言跟隨瀏覽器設定
   - 可手動切換語言

8. **響應式設計（RWD）**
   - Desktop（≥1024px）
   - Tablet（768px - 1023px）
   - Mobile（<768px）
   - 觸控優化

9. **使用者認證（可選）**
   - 使用者可選擇是否登入
   - 登入後可連結 Google Drive
   - 未登入或未連結 Google Drive 時使用 localStorage

10. **P2P 協作**
    - 使用 WebRTC 進行 P2P 連線
    - 每間房最多 15 人
    - 參與者不一定要登入

---

## 資料儲存設計

### localStorage 命名空間

使用統一前綴避免衝突：`retro_`

**儲存項目**：

1. `retro_settings`
   - 主題模式（dark/light/auto）
   - 語言設定
   - Google Drive 連結狀態
   - 其他使用者偏好

2. `retro_retrospectives`
   - 回顧會議記錄
   - 格式：`[{id, meetingId, title, date, participants, items, ...}, ...]`

3. `retro_user_data`
   - 使用者資料（如果登入）
   - Google Drive 檔案 ID（如果連結）

### Google Drive 儲存（可選）

**儲存項目**：
- 回顧會議記錄（JSON 格式）
- 匯出的檔案（Markdown、圖片等）

---

## GitHub Pages 限制與解決方案

### 限制

1. **靜態網站**：無法執行伺服器端程式碼
2. **無資料庫**：無法使用傳統資料庫
3. **CORS 限制**：跨域請求有限制

### 解決方案

1. **純前端實作**：所有邏輯在前端完成
2. **本地儲存**：使用 localStorage 儲存資料
3. **雲端儲存**：可選連結 Google Drive API
4. **P2P 連線**：使用 WebRTC 不依賴伺服器

---

## 專案結構（規劃）

```
external_projects/retro/
├── index.html                    # SPA 主入口頁面（單一 HTML 檔案）
├── README.md                     # 專案說明（本文件）
├── spec/                         # 規格文件目錄
│   ├── features.md               # 功能需求詳述
│   ├── tech-stack.md             # 技術架構詳述
│   ├── ui-design.md              # UI/UX 設計規格
│   └── data-structure.md         # 資料結構設計
├── css/                          # 樣式檔案
│   ├── variables.css             # CSS 變數
│   ├── reset.css                 # CSS Reset
│   ├── main.css                  # 主樣式
│   ├── themes/                   # 主題樣式
│   │   ├── light.css
│   │   └── dark.css
│   └── components/               # 元件樣式
│       ├── card.css
│       ├── button.css
│       ├── modal.css
│       └── ...
├── js/                           # JavaScript 檔案
│   ├── app.js                    # SPA 應用程式入口
│   ├── router.js                 # Hash-based 路由管理
│   ├── pages/                    # 頁面元件（SPA 路由對應的頁面）
│   │   ├── home.js               # 首頁
│   │   ├── host.js               # 房主頁面
│   │   ├── join.js               # 參與者加入頁面
│   │   ├── retrospective.js     # 回顧會議頁面
│   │   ├── history.js            # 歷史記錄頁面
│   │   └── settings.js           # 設定頁面
│   ├── components/               # UI 元件（可重用元件）
│   │   ├── RetroCard.js          # 回顧卡片元件
│   │   ├── VoteButton.js         # 投票按鈕元件
│   │   ├── ExportModal.js        # 匯出模態框
│   │   └── ...
│   ├── modes/                    # 模式實作（業務邏輯）
│   │   ├── HostMode.js           # 房主模式邏輯
│   │   └── ParticipantMode.js    # 參與者模式邏輯
│   ├── webrtc/                   # WebRTC 相關
│   │   ├── PeerManager.js        # P2P 連線管理
│   │   └── DataChannel.js        # 資料通道管理
│   ├── utils/                    # 工具函式
│   │   ├── storage.js            # Storage 封裝（localStorage + Google Drive）
│   │   ├── theme.js              # 主題管理
│   │   ├── i18n.js               # 多國語系
│   │   ├── export.js             # 匯出功能
│   │   └── ...
│   └── data/                     # 資料
│       └── i18n.js              # 多國語系文字
└── assets/                       # 靜態資源
    └── images/
        └── logo.svg
```

---

## 開發階段規劃

### 第一階段：基礎架構 + 單人模式（MVP）

**實作範圍**：基礎架構與單人回顧功能

- [ ] 專案結構建立（純 HTML/CSS/JS，無建置流程）
- [ ] 基礎 UI 元件（按鈕、卡片、模態框）
- [ ] 主題系統（Dark/Light Mode）
- [ ] 多國語系系統（繁體中文、English）
- [ ] 單人回顧功能（建立回顧、新增項目、匯出）
- [ ] 資料儲存（localStorage）
- [ ] RWD 實作

**技術選型**：
- 純 HTML/CSS/JS，無建置流程
- 使用 CDN 載入第三方庫（如需要）
- ES Modules 模組化

### 第二階段：P2P 協作模式

- [ ] P2P 連線功能（WebRTC）
- [ ] 房主模式（建立會議室、管理參與者）
- [ ] 參與者模式（加入會議、提出意見）
- [ ] 匿名功能（房主設定、參與者選擇）
- [ ] 投票功能
- [ ] 參與者名稱重複檢查

### 第三階段：追蹤與進階功能

- [ ] 歷史記錄功能
- [ ] 改進項目追蹤
- [ ] Google Drive 整合（可選）
- [ ] 使用者認證（可選）
- [ ] 多種匯出格式

### 第四階段：優化與增強

- [ ] 動畫效果優化
- [ ] 效能優化
- [ ] 離線支援（PWA）
- [ ] 多國語系擴展（日文）

---

## 可行性確認

### ✅ 可行項目

1. **回顧功能**：完全可行，純前端實作
2. **P2P 協作**：使用 WebRTC，技術成熟
3. **匿名功能**：前端邏輯控制，完全可行
4. **匯出功能**：使用前端庫生成 Markdown/圖片，完全可行
5. **追蹤功能**：使用 localStorage 或 Google Drive，完全可行
6. **主題系統**：完全可行
7. **多國語系**：完全可行
8. **RWD**：完全可行

### ⚠️ 需要注意的項目

1. **資料量限制**：
   - localStorage 有大小限制（通常 5-10MB）
   - 需要實作資料清理機制
   - 考慮資料匯出/匯入功能

2. **P2P 連線穩定性**：
   - WebRTC 連線可能不穩定
   - 需要實作重連機制
   - 某些企業防火牆可能阻擋 WebRTC

3. **Google Drive API**：
   - 需要使用者授權
   - 有 API 配額限制
   - 需要處理授權過期情況

---

## 參考資源

### Retrospective 工具參考

- [TeleRetro](https://app.teleretro.com/) - 參考功能設計
- [Retrospective 方法論](https://www.atlassian.com/agile/retrospectives)

### 設計參考

- 現代化 Web App UI 設計
- 協作工具介面設計
- 卡片式佈局設計

---

## 下一步

1. 檢視並確認規格文件
2. 選擇 UI 風格（見 `spec/ui-design.md`）
3. 開始實作第一階段（基礎架構 + 單人模式）

