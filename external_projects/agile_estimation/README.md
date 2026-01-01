# 敏捷開發估點工具 (Agile Estimation Tool)

## 專案概述

一個專為敏捷開發團隊設計的估點工具 Web App，旨在簡化傳統估點流程，減少實體牌的使用和繁瑣的計算、紀錄工作。

## 核心目標

- ✅ 取代傳統實體估點牌
- ✅ 簡化估點流程，節省時間
- ✅ 支援單人與多人協作模式
- ✅ **SPA（Single Page Application）架構**，流暢的使用者體驗
- ✅ 純前端實作，無需自架後端
- ✅ 支援 Desktop 與 Mobile Web
- ✅ 部署於 GitHub Pages

---

## 功能模式

### 模式一：簡易模式（Solo Mode）

**適用場景**：個人快速估點、單人練習

**功能**：
- 選擇估點牌（Fibonacci、T-Shirt Size、Power of 2 等）
- 翻牌顯示結果
- 記錄估點歷史（儲存於 localStorage）
- 簡單統計（平均、最高、最低）

### 模式二：協作模式（Host-Client Mode）

**適用場景**：團隊協作估點、遠端估點會議

**架構**：
- **Host**：一台裝置作為主機，管理整個估點會議
- **Client**：其他裝置透過 P2P 連線加入會議

**Host 功能**：
- 建立會議室（生成會議 ID）
- 管理參與者（最多 15 人）
- 踢除參與者
- 黑名單管理
- 控制估點流程（開始/結束估點、翻牌）
- 查看所有參與者的估點結果
- 統計與分析
- 記錄估點歷史（儲存於 localStorage）

**Client 功能**：
- 透過會議 ID 加入會議
- 選擇估點牌
- 查看自己的估點結果
- 查看翻牌後的統計結果
- 記錄估點歷史（儲存於 localStorage）

**技術限制說明**：
- 使用 WebRTC 進行 P2P 連線
- **信號交換**（Signaling）可選擇：
  - **預設**：使用 PeerJS 提供的免費信號伺服器
  - **自訂**：使用者可以輸入自己架設的信號伺服器位址（IP/域名）
- 資料同步透過 WebRTC DataChannel
- ⚠️ **注意**：使用免費信號伺服器時，可能會有連線不穩定的情況
- ⚠️ **注意**：某些企業防火牆可能阻擋 WebRTC 連線
- ✅ **優點**：進階使用者可以選擇自建信號伺服器，獲得更好的控制和隱私

**技術方案**：
採用 P2P（WebRTC）架構，支援使用免費信號伺服器或自建信號伺服器。其他技術方案詳見 [`spec/collaboration-approaches.md`](spec/collaboration-approaches.md)。

---

## 技術需求

### 前端技術

- **HTML5** - 頁面結構
- **CSS3** - 樣式與動畫（支援 RWD）
- **JavaScript (ES6+)** - 邏輯與互動
- **ES Modules** - 模組化程式碼組織
- **WebRTC** - P2P 連線（協作模式）
- **PeerJS** 或類似庫 - WebRTC 封裝與信號服務

### 部署環境

- **GitHub Pages** - 靜態網站託管
- 無後端伺服器
- 無資料庫

### 資料儲存

- **localStorage** - 本地資料儲存
- 使用命名空間避免與其他頁面衝突
- 儲存內容：
  - 使用者偏好設定（主題、語言）
  - 估點歷史記錄（簡易模式與協作模式）
  - 黑名單列表（Host 模式）

---

## 功能需求

### 核心功能

1. **估點牌系統**
   - **第一版**：固定使用 Modified Fibonacci（修改版費氏數列）
     - 牌值：0, 1/2, 1, 2, 3, 5, 8, 13, 20, 40, 100, ∞, ?, ☕
     - 說明：Planning Poker 常用牌組，最接近真實 Planning Poker
   - **未來功能**：其他牌組選擇（標準 Fibonacci、T-Shirt Size、Power of 2、自訂牌組）
   - 牌面設計：正面顯示數字/文字，背面為問號或隱藏

2. **主題系統**
   - Dark Mode / Light Mode
   - 預設跟隨瀏覽器系統主題（`prefers-color-scheme`）
   - 可手動切換

3. **多國語系**
   - 支援語言：
     - 繁體中文（zh-TW）
     - 簡體中文（zh-CN）
     - English（en）
     - 日文（ja）（可選）
   - 預設語言跟隨瀏覽器設定
   - 可手動切換語言

4. **響應式設計（RWD）**
   - Desktop（≥1024px）
   - Tablet（768px - 1023px）
   - Mobile（<768px）
   - 觸控優化

### 簡易模式功能

1. **選牌介面**
   - 顯示可選的估點牌
   - 點擊選擇牌
   - 顯示已選擇的牌

2. **翻牌功能**
   - 翻轉顯示結果
   - 動畫效果

3. **歷史記錄**
   - 儲存每次估點記錄
   - 顯示歷史列表
   - 清除歷史功能

### 協作模式功能

1. **Host 端**
   - 建立會議室（生成會議 ID）
   - **自動生成 QR Code**，讓 Client 掃描即可加入會議
   - 顯示會議 ID（QR Code + 文字，可複製）
   - **複製連結**：一鍵複製完整加入連結，方便分享給 Client
   - 參與者列表（顯示名稱、狀態）
   - **使用者名稱記憶**：自動帶入上次使用的名稱
   - **Host 參與估點**：Host 可以選擇是否參與估點（選擇牌）
   - **多輪估點控制**：每個 Issue 可進行多輪估點，直到達成共識
   - 估點控制面板（開始估點、結束估點、翻牌、下一輪估點、完成估點）
   - **極端值分析**：自動識別最高和最低估點值（原因由團隊口頭討論）
   - **Host 最終決定權**：Host 可以選擇最終的估點值（不一定要使用統計結果）
   - 統計面板（顯示所有參與者的估點結果、平均、分佈圖、極端值）
   - 參與者管理（踢除、黑名單）
   - 記錄估點歷史（包含所有參與者的估點結果、多輪記錄）

2. **Client 端**
   - **掃描 QR Code 加入**（推薦，自動填入會議 ID）
   - 或手動輸入會議 ID 加入
   - **使用者名稱記憶**：自動帶入上次使用的名稱
   - 選擇估點牌
   - 顯示自己的估點狀態
   - 查看翻牌後的統計結果
   - 記錄估點歷史（包含自己的估點結果與統計資訊、多輪記錄）

3. **連線管理**
   - 自動重連機制
   - 連線狀態顯示
   - 錯誤處理與提示

---

## 資料儲存設計

### localStorage 命名空間

使用統一前綴避免衝突：`agile_estimation_`

**儲存項目**：

1. `agile_estimation_settings`
   - 主題模式（dark/light/auto）
   - 語言設定
   - 預設估點牌組

2. `agile_estimation_history`
   - 簡易模式與協作模式的估點歷史
   - 格式：`[{timestamp, card, mode, meetingId?, roundId?, participants?}, ...]`

3. `agile_estimation_blacklist`
   - Host 模式的黑名單
   - 格式：`[peerId1, peerId2, ...]`

---

## GitHub Pages 限制與解決方案

### 限制

1. **靜態網站**：無法執行伺服器端程式碼
2. **無 WebSocket 支援**：無法建立持久連線
3. **CORS 限制**：跨域請求有限制

### 解決方案

1. **P2P 連線**：使用 WebRTC 進行點對點連線，不依賴伺服器
2. **信號服務**：使用第三方信號伺服器（如 PeerJS 提供的免費服務）
3. **資料同步**：透過 WebRTC DataChannel 進行資料交換
4. **本地儲存**：使用 localStorage 儲存資料

### 注意事項

- ⚠️ 信號伺服器依賴第三方服務，可能會有連線不穩定的情況
- ⚠️ 某些企業防火牆可能阻擋 WebRTC 連線
- ⚠️ 建議在說明文件中提醒使用者可能的連線問題

---

## 專案結構（規劃）

```
external_projects/agile_estimation/
├── index.html                    # SPA 主入口頁面（單一 HTML 檔案）
├── README.md                     # 專案說明（本文件）
├── spec/                         # 規格文件目錄
│   ├── features.md               # 功能需求詳述
│   ├── tech-stack.md             # 技術架構詳述
│   ├── ui-design.md              # UI/UX 設計規格
│   ├── data-structure.md         # 資料結構設計
│   └── collaboration-approaches.md # 協作模式技術方案分析
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
│   │   ├── solo.js               # 簡易模式頁面
│   │   ├── host.js               # Host 模式頁面
│   │   ├── join.js               # Client 加入會議頁面
│   │   └── settings.js           # 設定頁面
│   ├── components/               # UI 元件（可重用元件）
│   │   ├── card.js
│   │   ├── button.js
│   │   └── ...
│   ├── modes/                    # 模式實作
│   │   ├── solo.js               # 簡易模式
│   │   └── host-client.js        # 協作模式
│   ├── webrtc/                   # WebRTC 相關
│   │   ├── peer-manager.js       # P2P 連線管理
│   │   └── signaling.js          # 信號處理
│   ├── utils/                    # 工具函式
│   │   ├── storage.js            # localStorage 封裝
│   │   ├── theme.js              # 主題管理
│   │   ├── i18n.js               # 多國語系
│   │   ├── clipboard.js          # 剪貼簿操作（複製連結、會議 ID）
│   │   └── qrcode.js             # QR Code 生成
│   └── data/                     # 資料
│       └── card-sets.js          # 估點牌組定義
└── assets/                       # 靜態資源
    └── images/
        └── logo.svg
```

---

## 開發階段規劃

### 第一階段：基礎架構 + 簡易模式（MVP）

**實作範圍**：只實作簡易模式，協作模式在第二階段

- [x] 專案結構建立（純 HTML/CSS/JS，無建置流程）
- [x] 基礎 UI 元件（按鈕、卡片、模態框）
- [x] **寶可夢卡片風格實作**：
  - 完整全息效果（Holographic effect）
  - 3D 立體效果與傾斜效果（Tilt effect）
  - 翻轉動畫
- [x] 主題系統（Dark/Light Mode）
- [x] 多國語系系統（繁體中文、English）
- [x] 簡易模式實作（選牌、翻牌）
  - 固定使用 Modified Fibonacci 牌組
  - 單輪估點（多輪估點功能之後實作）
- [x] 歷史記錄功能（簡易模式）
- [x] RWD 實作

**技術選型**：
- 純 HTML/CSS/JS，無建置流程
- 使用 CDN 載入第三方庫（如需要）
- ES Modules 模組化

### 第二階段：協作模式

- [x] WebRTC 整合（PeerJS）
- [x] Host 端功能實作
- [x] Client 端功能實作
- [x] 連線管理與錯誤處理
- [x] 參與者管理（踢除、黑名單）
- [x] 使用者名稱記憶（Host 和 Client 自動帶入上次使用的名稱）
- [x] Host 參與估點（Host 可以選擇是否參與估點）
- [x] 信號伺服器：只支援免費信號伺服器（自訂功能之後實作）
- [x] 設定頁面（包含清除全部資料功能）

### 第三階段：多輪估點與進階功能

- [ ] 多輪估點功能
- [ ] 極端值分析（高亮顯示，原因由團隊口頭討論）
- [ ] Issue 管理
- [ ] QR Code 掃描（Client 端）
- [ ] 統計圖表（視覺化）
- [ ] Host 最終決定權（Host 可以選擇最終的估點值）
- [ ] 多國語系擴展：簡體中文（zh-CN）、日文（ja）

### 第四階段：優化與增強

- [ ] 動畫效果優化
- [ ] 效能優化
- [ ] 離線支援（PWA）
- [ ] 自動重連機制
- [ ] 自訂信號伺服器功能

### 第五階段：擴展功能（未來）

- [ ] 其他估點牌組選擇（標準 Fibonacci、T-Shirt Size、Power of 2）
- [ ] 自訂估點牌組功能
- [ ] 多國語系擴展：新增世界上常用語言（前十種，如：西班牙文、法文、德文、葡萄牙文、俄文、韓文、義大利文、阿拉伯文、印尼文、越南文等）

---

## 可行性確認

### ✅ 可行項目

1. **簡易模式**：完全可行，純前端實作
2. **主題系統**：完全可行
3. **多國語系**：完全可行
4. **RWD**：完全可行
5. **localStorage 儲存**：完全可行

### ⚠️ 需要注意的項目

1. **P2P 連線（協作模式）**：
   - **技術上可行**：使用 WebRTC + PeerJS
   - **限制**：
     - 依賴第三方信號伺服器（PeerJS 提供免費服務，但可能不穩定）
     - 某些企業防火牆可能阻擋 WebRTC
     - 需要 STUN/TURN 伺服器（PeerJS 有提供，但可能需要額外配置）
   - **建議**：
     - 在文件中說明可能的連線問題
     - 提供連線狀態指示
     - 實作自動重連機制
     - 考慮提供備用方案（如使用 URL 參數手動傳遞會議 ID）

2. **15 人上限**：
   - **技術上可行**：WebRTC 支援多點連線（Mesh 或 Star 架構）
   - **限制**：
     - Mesh 架構（全對全連線）在 15 人時會有 105 條連線，可能造成效能問題
     - 建議使用 Star 架構（Host 作為中心節點），Host 與每個 Client 建立連線
   - **建議**：實作 Star 架構，Host 管理所有連線

---

## 參考資源

### 競品參考

- **[Planning Poker Online](https://planningpokeronline.com/)** - 線上 Scrum Poker 工具
  - 提供即時投票和估點功能
  - 支援多種整合（Jira、GitHub、Azure DevOps 等）
  - 提供免費和付費方案

---

## 下一步

1. 檢視並確認規格文件
2. 選擇 UI 風格（見 `spec/ui-design.md`）
3. 開始實作第一階段（基礎架構 + 簡易模式）

