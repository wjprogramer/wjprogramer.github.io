# 記分板工具規格書

## 概述

記分板工具是一個實用的羽毛球比賽記分功能，讓使用者可以在練習或比賽中方便地記錄分數、局數和發球方。工具支援單打、雙打和混雙三種比賽模式，並符合專案的 Neumorphism 設計風格。

---

## 功能需求

### 核心功能

1. **比賽模式選擇**
   - 單打（1 vs 1）
   - 雙打（2 vs 2）
   - 混雙（2 vs 2，男女混搭）

2. **選手名稱管理**（可選）
   - 使用者可選擇是否輸入選手名稱
   - 如果選擇輸入：
     - 單打模式：輸入 2 個選手名稱（隊伍 A、隊伍 B）
     - 雙打/混雙模式：輸入 4 個選手名稱（隊伍 A 的 2 人、隊伍 B 的 2 人）
   - 如果選擇不輸入：使用預設名稱（隊伍 A、隊伍 B）
   - 名稱輸入框可在比賽開始前或比賽中隨時編輯
   - 名稱會顯示在分數顯示區域和歷史記錄中

3. **分數記錄**
   - 顯示雙方當前分數
   - 支援加分操作（+1 分）
   - 支援減分操作（-1 分，可選）
   - 分數範圍：0-30（標準羽毛球規則）

4. **局數顯示**
   - 顯示當前局數（第 1 局、第 2 局、第 3 局）
   - 顯示雙方已贏得的局數
   - 自動判斷勝負（先贏 2 局者獲勝）

5. **發球方指示**
   - 顯示當前發球方
   - 根據分數自動切換發球方（羽毛球規則）
   - 視覺化標示發球方

6. **比賽控制**
   - 開始新比賽
   - 重置當前局
   - 重置整場比賽
   - 暫停/繼續（可選）

7. **歷史記錄**（可選）
   - 記錄最近幾場比賽結果
   - 使用 localStorage 儲存
   - 顯示比賽日期、模式、比分

### 進階功能（未來擴展）

1. **計時功能**
   - 比賽總時長
   - 每局時長
   - 暫停時間統計

2. **統計數據**
   - 勝率統計
   - 平均每局得分
   - 最長連勝記錄

3. **分享功能**
   - 生成比賽結果截圖
   - 分享比賽結果連結

---

## UI/UX 設計

### 設計風格

遵循專案的 **Neumorphism** 設計風格：

- 🎨 柔軟陰影效果
- 📦 立體卡片設計
- 🌊 大圓角元素
- 💫 流暢的過渡動畫
- 🎯 清晰的視覺層次

### 版面佈局

#### 桌面版（寬螢幕）

```text
┌─────────────────────────────────────────┐
│           記分板工具標題                    │
├─────────────────────────────────────────┤
│                                          │
│  ┌──────────────┐  ┌──────────────┐    │
│  │  比賽模式選擇  │  │  比賽控制    │    │
│  │  [單打][雙打] │  │  [重置][新局]│    │
│  └──────────────┘  └──────────────┘    │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │  選手名稱設定（可選）              │  │
│  │  [✓] 輸入選手名稱                 │  │
│  │  隊伍 A: [______]  隊伍 B: [______]│  │
│  │  （雙打/混雙時顯示 4 個輸入框）    │  │
│  └──────────────────────────────────┘  │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │        局數顯示區域                │  │
│  │  第 1 局  │  已贏局數: A 0 - 0 B  │  │
│  └──────────────────────────────────┘  │
│                                          │
│  ┌──────────────┐  ┌──────────────┐    │
│  │   隊伍 A      │  │   隊伍 B      │    │
│  │  [編輯名稱]   │  │  [編輯名稱]   │    │
│  │  選手名稱     │  │  選手名稱     │    │
│  │   [發球]      │  │               │    │
│  │               │  │               │    │
│  │     15       │  │      8        │    │
│  │               │  │               │    │
│  │  [+1]  [-1]  │  │  [+1]  [-1]  │    │
│  └──────────────┘  └──────────────┘    │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │        歷史記錄（可選）             │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

#### 行動版（窄螢幕）

```text
┌─────────────────┐
│  記分板工具標題   │
├─────────────────┤
│                 │
│  [模式選擇]      │
│  [單打][雙打]    │
│                 │
│  [✓] 輸入名稱   │
│  A: [____]      │
│  B: [____]      │
│                 │
│  第 1 局        │
│  A 0 - 0 B      │
│                 │
│  ┌─────┐ ┌─────┐│
│  │  A  │ │  B  ││
│  │[發球]│ │     ││
│  │     │ │     ││
│  │  15 │ │   8 ││
│  │     │ │     ││
│  │[+1] │ │[+1] ││
│  │[-1] │ │[-1] ││
│  └─────┘ └─────┘│
│                 │
│  [重置][新局]    │
└─────────────────┘
```

### 視覺元素設計

#### 分數顯示

- **大號數字**：使用大號字體（48-72px）顯示分數
- **選手名稱顯示**：如果輸入選手名稱，在分數上方顯示名稱；否則顯示「隊伍 A/B」
- **發球指示器**：在發球方顯示「發球」標籤或圖示
- **高亮效果**：當前發球方使用不同的背景色或邊框
- **名稱編輯**：每個隊伍區域提供「編輯名稱」按鈕，可隨時修改

#### 按鈕設計

- **加分按鈕**：主要操作按鈕，使用凸起效果
- **減分按鈕**：次要操作按鈕，較小尺寸
- **控制按鈕**：重置、新局等，使用標準 Neumorphism 按鈕樣式

#### 狀態指示

- **獲勝狀態**：當一方獲勝時，顯示獲勝動畫或高亮
- **局數切換**：切換局數時有平滑過渡動畫
- **發球切換**：發球方切換時有視覺提示

---

## 技術實現

### 檔案結構

```text
js/
├── pages/
│   └── scoreboard.js          # 記分板頁面主邏輯
├── components/
│   └── scoreboard/
│       ├── score-display.js    # 分數顯示元件
│       ├── game-control.js     # 比賽控制元件
│       └── match-history.js    # 歷史記錄元件
└── utils/
    └── scoreboard-rules.js     # 記分規則邏輯
```

### 路由註冊

```javascript
// js/app.js
import { renderScoreboard } from './pages/scoreboard.js';

function registerRoutes() {
  router
    .register('/', renderHome)
    .register('/content', renderContentList)
    .register('/content/:id', renderContentDetail)
    .register('/learning-path', renderLearningPath)
    .register('/favorites', renderFavorites)
    .register('/scoreboard', renderScoreboard); // 新增記分板路由
}
```

### 側邊欄導航

在 `js/components/navigation.js` 中新增記分板導航項目：

```javascript
<a href="#/scoreboard" class="nav-item" data-route="/scoreboard">
  <span class="material-icons-round nav-item__icon">score</span>
  <span data-i18n="nav.scoreboard">記分板</span>
</a>
```

### 記分規則邏輯

#### 羽毛球記分規則

1. **發球權切換規則**
   - 每局開始時，由發球方先發球
   - 發球方得分時，繼續發球
   - 接球方得分時，獲得發球權
   - 雙打/混雙：發球方兩人輪流發球

2. **局數規則**
   - 每局先得 21 分者獲勝
   - 若比分為 20-20，需領先 2 分才能獲勝
   - 若比分為 29-29，先得 30 分者獲勝
   - 先贏 2 局者獲勝（三局兩勝）

3. **換場規則**
   - 每局結束後換場
   - 第三局（決勝局）在 11 分時換場

### 數據存儲

使用 `localStorage` 儲存：

```javascript
// 儲存當前比賽狀態
localStorage.setItem('scoreboard_current_match', JSON.stringify({
  mode: 'singles', // 'singles', 'doubles', 'mixed'
  usePlayerNames: true, // 是否使用選手名稱
  playerNames: {
    teamA: ['選手 A1', '選手 A2'], // 單打時只有第一個元素有效
    teamB: ['選手 B1', '選手 B2']  // 單打時只有第一個元素有效
  },
  currentSet: 1,
  sets: {
    teamA: 0,
    teamB: 0
  },
  scores: {
    teamA: 0,
    teamB: 0
  },
  server: 'teamA', // 'teamA' or 'teamB'
  startedAt: Date.now()
}));

// 儲存歷史記錄（最近 10 場）
const history = JSON.parse(localStorage.getItem('scoreboard_history') || '[]');
history.unshift({
  mode: 'singles',
  playerNames: {
    teamA: ['選手 A1', '選手 A2'],
    teamB: ['選手 B1', '選手 B2']
  },
  sets: { teamA: 2, teamB: 1 },
  scores: [
    { teamA: 21, teamB: 15 },
    { teamA: 18, teamB: 21 },
    { teamA: 21, teamB: 19 }
  ],
  winner: 'teamA',
  date: Date.now()
});
if (history.length > 10) history.pop();
localStorage.setItem('scoreboard_history', JSON.stringify(history));
```

---

## 多國化支援

### 翻譯鍵值

在 `js/utils/i18n.js` 中新增：

```javascript
const translations = {
  'zh-TW': {
    'nav.scoreboard': '記分板',
    'scoreboard.title': '記分板',
    'scoreboard.mode.singles': '單打',
    'scoreboard.mode.doubles': '雙打',
    'scoreboard.mode.mixed': '混雙',
    'scoreboard.team.a': '隊伍 A',
    'scoreboard.team.b': '隊伍 B',
    'scoreboard.player.name': '選手名稱',
    'scoreboard.player.name.team.a': '隊伍 A 選手',
    'scoreboard.player.name.team.b': '隊伍 B 選手',
    'scoreboard.player.name.team.a.player1': '隊伍 A 選手 1',
    'scoreboard.player.name.team.a.player2': '隊伍 A 選手 2',
    'scoreboard.player.name.team.b.player1': '隊伍 B 選手 1',
    'scoreboard.player.name.team.b.player2': '隊伍 B 選手 2',
    'scoreboard.player.name.enable': '輸入選手名稱',
    'scoreboard.player.name.edit': '編輯名稱',
    'scoreboard.player.name.placeholder': '輸入選手名稱',
    'scoreboard.server': '發球',
    'scoreboard.set': '第 {n} 局',
    'scoreboard.sets.won': '已贏局數',
    'scoreboard.button.add': '+1',
    'scoreboard.button.subtract': '-1',
    'scoreboard.button.reset': '重置',
    'scoreboard.button.new-set': '新局',
    'scoreboard.button.new-match': '新比賽',
    'scoreboard.winner': '{team} 獲勝！',
    'scoreboard.history': '歷史記錄',
    'scoreboard.history.empty': '尚無歷史記錄'
  },
  'en': {
    'nav.scoreboard': 'Scoreboard',
    'scoreboard.title': 'Scoreboard',
    'scoreboard.mode.singles': 'Singles',
    'scoreboard.mode.doubles': 'Doubles',
    'scoreboard.mode.mixed': 'Mixed Doubles',
    'scoreboard.team.a': 'Team A',
    'scoreboard.team.b': 'Team B',
    'scoreboard.player.name': 'Player Name',
    'scoreboard.player.name.team.a': 'Team A Player',
    'scoreboard.player.name.team.b': 'Team B Player',
    'scoreboard.player.name.team.a.player1': 'Team A Player 1',
    'scoreboard.player.name.team.a.player2': 'Team A Player 2',
    'scoreboard.player.name.team.b.player1': 'Team B Player 1',
    'scoreboard.player.name.team.b.player2': 'Team B Player 2',
    'scoreboard.player.name.enable': 'Enter Player Names',
    'scoreboard.player.name.edit': 'Edit Name',
    'scoreboard.player.name.placeholder': 'Enter player name',
    'scoreboard.server': 'Serving',
    'scoreboard.set': 'Set {n}',
    'scoreboard.sets.won': 'Sets Won',
    'scoreboard.button.add': '+1',
    'scoreboard.button.subtract': '-1',
    'scoreboard.button.reset': 'Reset',
    'scoreboard.button.new-set': 'New Set',
    'scoreboard.button.new-match': 'New Match',
    'scoreboard.winner': '{team} Wins!',
    'scoreboard.history': 'Match History',
    'scoreboard.history.empty': 'No match history'
  },
  'ja': {
    'nav.scoreboard': 'スコアボード',
    'scoreboard.title': 'スコアボード',
    'scoreboard.mode.singles': 'シングルス',
    'scoreboard.mode.doubles': 'ダブルス',
    'scoreboard.mode.mixed': 'ミックスダブルス',
    'scoreboard.team.a': 'チーム A',
    'scoreboard.team.b': 'チーム B',
    'scoreboard.player.name': '選手名',
    'scoreboard.player.name.team.a': 'チーム A 選手',
    'scoreboard.player.name.team.b': 'チーム B 選手',
    'scoreboard.player.name.team.a.player1': 'チーム A 選手 1',
    'scoreboard.player.name.team.a.player2': 'チーム A 選手 2',
    'scoreboard.player.name.team.b.player1': 'チーム B 選手 1',
    'scoreboard.player.name.team.b.player2': 'チーム B 選手 2',
    'scoreboard.player.name.enable': '選手名を入力',
    'scoreboard.player.name.edit': '名前を編集',
    'scoreboard.player.name.placeholder': '選手名を入力',
    'scoreboard.server': 'サーブ',
    'scoreboard.set': '第 {n} セット',
    'scoreboard.sets.won': '獲得セット',
    'scoreboard.button.add': '+1',
    'scoreboard.button.subtract': '-1',
    'scoreboard.button.reset': 'リセット',
    'scoreboard.button.new-set': '新セット',
    'scoreboard.button.new-match': '新試合',
    'scoreboard.winner': '{team} の勝利！',
    'scoreboard.history': '試合履歴',
    'scoreboard.history.empty': '試合履歴がありません'
  }
};
```

---

## 響應式設計（RWD）

### 斷點設定

- **寬螢幕**（> 960px）：並排顯示兩隊分數
- **平板**（768px - 960px）：並排顯示，但按鈕較小
- **手機**（< 768px）：垂直堆疊顯示

### 觸控優化

- 按鈕尺寸至少 44x44px（符合觸控標準）
- 加分按鈕使用較大尺寸，易於點擊
- 支援滑動手勢（可選）

---

## 使用場景

### 場景一：練習賽記分

使用者在練習時，可以快速開啟記分板，記錄練習賽的分數，無需使用紙筆或手機 APP。

### 場景二：正式比賽

在正式比賽中，記分板可以作為輔助工具，幫助記錄分數和局數，特別是在沒有專業記分員的情況下。

### 場景三：教學示範

教練可以使用記分板進行教學示範，讓學員更清楚地了解比賽進程和記分規則。

---

## 功能優先級

### Phase 1：核心功能（必須）

- [x] 比賽模式選擇（單打、雙打、混雙）
- [x] 選手名稱管理（可選輸入）
- [x] 分數記錄（加分、減分）
- [x] 局數顯示和切換
- [x] 發球方指示
- [x] 基本比賽控制（重置、新局）
- [x] 自動判斷勝負
- [x] 多國化支援
- [x] 響應式設計

### Phase 2：增強功能（重要）

- [ ] 歷史記錄功能
- [ ] 比賽結果儲存
- [ ] 獲勝動畫效果
- [ ] 音效回饋（可選）

### Phase 3：進階功能（未來）

- [ ] 計時功能
- [ ] 統計數據
- [ ] 分享功能
- [ ] 匯出比賽記錄

---

## 技術考量

### 性能優化

- 使用 `requestAnimationFrame` 處理動畫
- 避免頻繁的 DOM 操作
- 使用事件委派減少事件監聽器

### 無障礙設計

- 使用語義化 HTML
- 提供 ARIA 標籤
- 鍵盤導航支援
- 螢幕閱讀器友善

### 瀏覽器相容性

- 支援現代瀏覽器（Chrome、Firefox、Safari、Edge）
- 使用標準 ES6+ 語法
- 不依賴第三方框架

---

## 測試需求

### 功能測試

- [ ] 分數加減功能正常
- [ ] 發球權切換正確
- [ ] 局數切換正確
- [ ] 勝負判斷正確
- [ ] 重置功能正常
- [ ] 模式切換正常

### UI 測試

- [ ] 不同螢幕尺寸顯示正常
- [ ] 深色/淺色主題切換正常
- [ ] 多國語言切換正常
- [ ] 動畫效果流暢

### 邊界測試

- [ ] 分數達到 30 分時的處理
- [ ] 比分 20-20 時的處理
- [ ] 比分 29-29 時的處理
- [ ] 快速連續點擊的處理

---

## 備註

- 記分板工具為純前端實現，無需後端支援
- 所有數據儲存在瀏覽器 localStorage 中
- 符合 BWF（世界羽球聯合會）官方記分規則
- 設計風格與專案整體保持一致

---

**最後更新：** 2024年
