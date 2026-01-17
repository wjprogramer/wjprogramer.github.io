# TODO 功能清單

本文件記錄未來計劃實作的功能與改進項目。

## 功能開發

### 1. 專案管理功能
- [ ] **選擇專案**
  - 在建立會議時可以選擇已存在的專案
  - 顯示專案列表（下拉選單或卡片選擇）
  - 支援快速搜尋專案
  
- [ ] **建立專案**
  - 新增「建立專案」功能
  - 專案基本資訊：名稱、描述、顏色標籤
  - 專案建立後可立即用於會議
  
- [ ] **管理專案**
  - 專案列表頁面
  - 編輯專案資訊
  - 刪除專案（需確認）
  - 專案統計資訊（會議次數、參與者等）

**相關檔案：**
- `js/pages/home.js` - 首頁，可能需要添加專案選擇 UI
- `js/pages/project.js` - 需要新增專案管理頁面
- `js/utils/storage/` - 需要添加專案資料的儲存邏輯
- `spec/data-structure.md` - 需要定義專案資料結構

---

### 2. Item 留言功能
- [ ] **針對個別 item 留言**
  - 每個 item 可以有多筆留言
  - 留言顯示：作者、時間、內容
  - 支援編輯和刪除自己的留言
  
- [ ] **留言 UI**
  - Item 卡片上顯示留言數量
  - 點擊展開留言列表
  - 留言輸入框（支援多行文字）
  - 留言時間顯示（相對時間，如「2 分鐘前」）
  
- [ ] **留言同步**
  - P2P 模式下即時同步留言
  - 留言變更通知所有參與者
  - 支援留言的即時更新

**相關檔案：**
- `js/components/RetroCard.js` - 需要添加留言 UI
- `js/modes/HostMode.js` - 需要處理留言的同步邏輯
- `js/modes/ParticipantMode.js` - 需要處理留言的同步邏輯
- `js/webrtc/DataChannel.js` - 需要添加留言相關的訊息類型
- `spec/data-structure.md` - 需要定義留言資料結構

---

### 3. 投票改為 Emoji 反應
- [ ] **Emoji 選擇器**
  - 替換現有的投票按鈕為 emoji 反應按鈕
  - 支援多種 emoji（👍, ❤️, 😂, 😮, 😢, 🔥 等）
  - 可以選擇多個 emoji（不同於單一投票）
  
- [ ] **Emoji 顯示**
  - Item 卡片上顯示所有 emoji 反應
  - 顯示每個 emoji 的數量
  - 顯示當前使用者已選擇的 emoji（高亮顯示）
  
- [ ] **Emoji 互動**
  - 點擊 emoji 添加反應
  - 再次點擊相同 emoji 移除反應
  - 支援同時選擇多個不同的 emoji
  
- [ ] **資料結構調整**
  - 將 `votes` 和 `voters` 改為 `reactions` 結構
  - `reactions` 格式：`{ emoji: string, count: number, users: string[] }`

**相關檔案：**
- `js/components/VoteButton.js` - 需要改為 EmojiReactionButton
- `js/components/RetroCard.js` - 需要更新顯示邏輯
- `js/modes/HostMode.js` - 需要更新投票處理邏輯為 emoji 反應
- `js/modes/ParticipantMode.js` - 需要更新投票處理邏輯為 emoji 反應
- `js/webrtc/DataChannel.js` - 需要更新訊息類型（VOTE → REACTION）
- `spec/data-structure.md` - 需要更新資料結構定義

---

## 技術考量

### 專案管理
- 專案資料需要儲存在 localStorage 和 Google Drive
- 專案與會議的關聯關係（一個專案可以有多個會議）
- 專案選擇 UI 的設計（下拉選單 vs 卡片選擇）

### Item 留言
- 留言資料結構設計（巢狀在 item 中）
- 留言的即時同步機制
- 留言的編輯/刪除權限控制
- 大量留言的效能考量（是否需要分頁）

### Emoji 反應
- Emoji 選擇器的 UI/UX 設計
- 常用 emoji 列表的定義
- 反應資料的儲存格式
- 向後兼容性（舊的投票資料如何遷移）

---

## 優先順序建議

1. **Emoji 反應** - 功能相對獨立，影響範圍較小
2. **Item 留言** - 需要考慮資料結構和同步機制
3. **專案管理** - 功能較複雜，需要較多規劃

---

## 備註

- 所有功能實作前需要更新 `spec/data-structure.md` 定義資料結構
- 需要考慮向後兼容性（現有資料的遷移）
- P2P 模式下的即時同步需要確保資料一致性
- UI 設計需要參考 `spec/ui-design.md` 的設計規範
