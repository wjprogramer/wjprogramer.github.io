# 資料結構設計

## 概述

本文檔定義了應用程式中使用的所有資料結構，包括 localStorage 儲存格式、WebRTC 訊息格式等。

---

## localStorage 資料結構

### 命名空間

所有資料使用統一前綴：`agile_estimation_`

### 1. 設定資料（`agile_estimation_settings`）

**用途**：儲存使用者偏好設定

**結構**：
```javascript
{
  theme: 'dark' | 'light' | 'auto',        // 主題模式
  language: 'zh-TW' | 'zh-CN' | 'en' | 'ja',  // 語言設定
  defaultCardSet: 'ModifiedFibonacci',  // 第一版固定使用 Modified Fibonacci（未來可擴展其他牌組）
  maxHistoryRecords: 10,                  // 歷史記錄最大數量（已改為固定 10 筆）
  soundEnabled: true,                      // 音效開關（可選）
  animationsEnabled: true,                 // 動畫開關（可選）
  signalingServer: {                       // 信號伺服器設定（可選）
    enabled: false,                         // 是否使用自訂信號伺服器
    host: '0.peerjs.com',                   // 信號伺服器 Host（IP 或域名）
    port: 443,                              // 信號伺服器 Port
    path: '/',                              // 信號伺服器 Path
    secure: true                            // 是否使用 HTTPS/WSS
  },
  lastHostName: null | string,             // 上次 Host 使用的名稱
  lastClientName: null | string            // 上次 Client 使用的名稱
}
```

**預設值**：
```javascript
{
  theme: 'auto',
  language: 'zh-TW',  // 或根據瀏覽器語言自動判斷
  defaultCardSet: 'ModifiedFibonacci',  // 第一版固定使用 Modified Fibonacci
  maxHistoryRecords: 100,
  soundEnabled: true,
  animationsEnabled: true,
  signalingServer: {
    enabled: false,  // 預設使用免費信號伺服器
    host: '0.peerjs.com',
    port: 443,
    path: '/',
    secure: true
  },
  lastHostName: null,
  lastClientName: null
}
```

**存取方式**：
```javascript
import { storage } from './utils/storage/index.js';

// 讀取設定
const settings = storage.get('settings') || defaultSettings;

// 更新設定
storage.set('settings', {
  ...settings,
  theme: 'dark'
});
```

---

### 2. 歷史記錄（`agile_estimation_history`）

**用途**：儲存簡易模式與協作模式的估點歷史記錄

**結構**：
```javascript
[
  // 簡易模式記錄
  {
    id: 'timestamp-string',           // 唯一識別碼（時間戳字串）
    timestamp: '2024-01-01T00:00:00.000Z',  // ISO 時間字串
    value: '13',                      // 選擇的牌值
    mode: 'solo',                     // 模式：'solo'
    issue: null,                      // Issue 名稱（可選，簡易模式通常為 null）
    round: 1,                         // 輪次（可選，簡易模式通常為 1）
    starred: false                    // 是否已標記（star），避免被自動刪除
  },
  // 協作模式 - Host 端單輪記錄
  {
    id: 'timestamp-string',
    timestamp: '2024-01-01T00:00:00.000Z',
    value: null,                      // Host 單輪記錄通常為 null（使用 results）
    mode: 'host',
    meetingId: 'A3B7C9',             // 會議 ID
    results: [                        // 單輪的所有參與者結果
      { name: 'Host', card: '13' },
      { name: 'John', card: '8' },
      { name: 'Jane', card: '13' }
    ],
    participants: 3,                   // 參與者數量
    issue: null,                      // Issue 名稱（可選）
    round: 1,                         // 輪次
    starred: false                    // 是否已標記（star），避免被自動刪除
  },
  // 協作模式 - Host 端 Issue 完成記錄
  {
    id: 'timestamp-string',
    timestamp: '2024-01-01T00:00:00.000Z',
    value: null,                      // Issue 完成記錄使用 finalDecision
    mode: 'host',
    meetingId: 'A3B7C9',
    issueId: 'issue-123',             // Issue ID
    issueTitle: '實作登入功能',        // Issue 標題
    issueDescription: '使用者可以透過帳號密碼登入',  // Issue 描述
    rounds: [                         // 所有輪次的完整資料
      {
        round: 1,
        results: [
          { name: 'Host', card: '13' },
          { name: 'John', card: '8' }
        ]
      },
      {
        round: 2,
        results: [
          { name: 'Host', card: '8' },
          { name: 'John', card: '8' }
        ]
      }
    ],
    finalDecision: '8',               // 最終決定
    completedAt: '2024-01-01T00:05:00.000Z',  // 完成時間
    participants: 2                    // 參與者數量
  },
  // 協作模式 - Client 端記錄
  {
    id: 'timestamp-string',
    timestamp: '2024-01-01T00:00:00.000Z',
    value: '13',                      // Client 選擇的牌值
    mode: 'client',
    meetingId: 'A3B7C9',             // 會議 ID
    participants: 3,                  // 參與者數量
    starred: false                    // 是否已標記（star），避免被自動刪除
  }
]
```

**欄位說明**：

- **通用欄位**：
  - `id`: 唯一識別碼（時間戳字串）
  - `timestamp`: ISO 時間字串
  - `mode`: 模式（'solo', 'host', 'client'）
  - `value`: 估點值（solo/client 模式，或單輪記錄時可能為 null）
  - `issue`: Issue 名稱（可選）
  - `round`: 輪次（可選）
  - `starred`: 是否已標記（布林值，預設為 `false`），標記的記錄不會被自動刪除

- **協作模式欄位**：
  - `meetingId`: 會議 ID
  - `results`: 單輪的所有參與者結果陣列（host 模式單輪記錄）
  - `participants`: 參與者數量

- **Issue 完成記錄欄位**（host 模式，舊格式）：
  - `issueId`: Issue ID
  - `issueTitle`: Issue 標題
  - `issueDescription`: Issue 描述
  - `rounds`: 所有輪次的完整資料陣列
  - `finalDecision`: 最終決定
  - `completedAt`: 完成時間（ISO 時間字串）

- **會議記錄欄位**（host 模式，新格式 - 一個會議包含多個 issue）：
  - `meetingId`: 會議 ID
  - `meetingName`: 會議名稱（可選，如果留空則使用會議 ID）
  - `participants`: 參與者數量
  - `startedAt`: 會議開始時間（ISO 時間字串）
  - `completedAt`: 會議結束時間（最後一個 issue 完成的時間，ISO 時間字串）
  - `starred`: 是否已標記（布林值，預設為 `false`），標記的記錄不會被自動刪除
  - `issues`: Issue 陣列，每個 Issue 包含：
    - `issueId`: Issue ID
    - `issueTitle`: Issue 標題
    - `issueDescription`: Issue 描述
    - `rounds`: 所有輪次的完整資料陣列
      - `roundNumber`: 輪次編號
      - `results`: 該輪次的所有參與者結果 `[{name, card}, ...]`
      - `completedAt`: 該輪次完成時間（ISO 時間字串）
      - `finalDecision`: 該輪次的最終決定（如果有）
    - `finalDecision`: Issue 的最終決定
    - `completedAt`: Issue 完成時間（ISO 時間字串）

**數據結構說明**：
- 新格式（會議記錄）：同一個會議中的所有 issue 和多輪投票會合併為一筆歷史記錄
- 舊格式（單一 issue 記錄）：向後兼容，仍可正常顯示
- **儲存時機**：
  - 當建立會議時，會立即建立並儲存會議記錄
  - 在會議進行中，任何資料變更都會即時更新會議記錄：
    - 建立 issue 時
    - 開始估點時
    - 翻牌時（更新輪次結果）
    - 新的一輪時
    - 完成 issue 時
    - 參與者加入/離開時（更新參與者數量）
  - 會議結束時，會標記 `completedAt` 時間

**詳細資料查看**：
- 歷史記錄頁面支援點擊查看詳細資料
- 有詳細資料的記錄會顯示「查看詳細資料」按鈕（👁️）
- 詳細資料頁面會顯示：
  - 基本資訊（模式、時間、會議 ID、參與者數量）
  - Issue 資訊（標題、描述、最終決定、完成時間）
  - 單輪結果（統計資訊、所有參與者結果）
  - 所有輪次（多輪估點的完整資料）

**重新開啟會議**：
- 從歷史記錄詳細頁面可以重新開啟已結束的會議
- 重新開啟時會保留所有 Issue 的內容和歷史估點記錄：
  - Issue 標題和描述
  - 所有輪次的估點結果（包含每個參與者在每輪的選擇）
  - 最終決定（作為參考）
- Issue 狀態會重置為「未開始」，允許繼續或重新估點
- 會議完成時間會清除，允許重新進行估點

**限制**：
- 最多儲存 10 筆記錄（固定限制）
- 最多可以標記（star）9 筆記錄
- 超過限制時，優先刪除未標記（starred = false）的記錄
- 如果所有記錄都已標記，則刪除最舊的標記記錄
- 標記的記錄可以避免被自動刪除，但手動刪除不受限制

**存取方式**：

**簡易模式記錄**：
```javascript
// 讀取歷史記錄
const history = storage.get('history') || [];

// 新增簡易模式記錄
const newRecord = {
  id: generateUUID(),
  timestamp: Math.floor(Date.now() / 1000),
  card: '13',
  cardSet: 'Fibonacci',
  mode: 'solo',
  note: ''
};

history.push(newRecord);
```

**協作模式 - Host 端記錄**：
```javascript
// 新增 Host 端記錄（翻牌後）
const newRecord = {
  id: generateUUID(),
  timestamp: Math.floor(Date.now() / 1000),
  meetingId: 'A3B7C9',
  roundId: 'round-123',
  cardSet: 'Fibonacci',
  mode: 'host',
  participants: [
    { peerId: 'client-1', name: 'John', card: '13' },
    { peerId: 'client-2', name: 'Jane', card: '8' }
  ],
  stats: {
    average: 8.5,
    max: 13,
    min: 3,
    distribution: { '8': 1, '13': 1 }
  }
};

history.push(newRecord);
```

**協作模式 - Client 端記錄**：
```javascript
// 新增 Client 端記錄（收到 STATS_UPDATE 後）
const newRecord = {
  id: generateUUID(),
  timestamp: Math.floor(Date.now() / 1000),
  meetingId: 'A3B7C9',
  roundId: 'round-123',
  cardSet: 'Fibonacci',
  mode: 'client',
  myCard: '13',
  myName: 'John Doe',
  stats: {
    average: 8.5,
    max: 13,
    min: 3,
    distribution: { '8': 1, '13': 1 }
  }
};

history.push(newRecord);
```

**限制記錄數量**：
```javascript
// 限制記錄數量（最多 10 筆）
const MAX_HISTORY_ITEMS = 10;
const MAX_STARRED_ITEMS = 9;

function enforceMaxHistoryItems(history) {
  if (history.length <= MAX_HISTORY_ITEMS) {
    return;
  }
  
  // 分離 star 和未 star 的記錄
  const starred = history.filter(r => r.starred === true);
  const unstarred = history.filter(r => !r.starred);
  
  // 如果 star 的記錄超過限制，保留最舊的 star 記錄
  if (starred.length > MAX_HISTORY_ITEMS) {
    starred.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const toRemove = starred.slice(MAX_HISTORY_ITEMS);
    toRemove.forEach(r => {
      const index = history.findIndex(h => h.id === r.id);
      if (index >= 0) history.splice(index, 1);
    });
  } else {
    // 刪除未 star 的記錄，直到總數不超過限制
    unstarred.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    while (history.length > MAX_HISTORY_ITEMS && unstarred.length > 0) {
      const toRemove = unstarred.shift();
      const index = history.findIndex(h => h.id === toRemove.id);
      if (index >= 0) history.splice(index, 1);
    }
  }
}

storage.set('history', history);
```

**標記（Star）功能**：
```javascript
// 切換標記狀態
function toggleStar(id) {
  const history = getHistory();
  const record = history.find(r => r.id === id);
  
  if (!record) {
    return false;
  }
  
  // 如果要 star，檢查是否已達到上限（最多 9 個）
  if (!record.starred) {
    const starredCount = history.filter(r => r.starred === true).length;
    if (starredCount >= MAX_STARRED_ITEMS) {
      return false; // 已達到上限
    }
  }
  
  // 切換 star 狀態
  record.starred = !record.starred;
  storage.set('history', history);
  return record.starred;
}
```

---

### 3. 黑名單（`agile_estimation_blacklist`）

**用途**：儲存 Host 模式的黑名單（Peer ID 列表）

**結構**：
```javascript
[
  'peer-id-1',
  'peer-id-2',
  // ...
]
```

**說明**：
- 僅在 Host 模式下使用
- 儲存被加入黑名單的 Peer ID
- 黑名單中的 Peer ID 無法再次加入會議

**存取方式**：
```javascript
// 讀取黑名單
const blacklist = storage.get('blacklist') || [];

// 加入黑名單
if (!blacklist.includes(peerId)) {
  blacklist.push(peerId);
  storage.set('blacklist', blacklist);
}

// 檢查是否在黑名單中
const isBlacklisted = blacklist.includes(peerId);

// 移除黑名單
const updatedBlacklist = blacklist.filter(id => id !== peerId);
storage.set('blacklist', updatedBlacklist);
```

---

## WebRTC 訊息格式

### 訊息基本結構

所有透過 WebRTC DataChannel 傳送的訊息都遵循以下格式：

```javascript
{
  type: string,        // 訊息類型
  data: object,        // 訊息資料
  timestamp: number,   // Unix 時間戳記（毫秒）
  from: string         // 發送者 Peer ID
}
```

### 訊息類型定義

#### 1. ESTIMATE_START

**發送者**：Host

**用途**：通知所有 Client 開始估點

**結構**：
```javascript
{
  type: 'ESTIMATE_START',
  data: {
    meetingId: 'A3B7C9',
    issueId: 'story-123',  // Issue ID
    roundId: 'round-123',      // 本輪估點的 ID
    roundNumber: 1,            // 第幾輪（從 1 開始）
    cardSet: 'Fibonacci'       // 使用的估點牌組
  },
  timestamp: 1234567890000,
  from: 'host-peer-id'
}
```

---

#### 2. ESTIMATE_END

**發送者**：Host

**用途**：通知所有 Client 結束估點（停止接受新的選擇）

**結構**：
```javascript
{
  type: 'ESTIMATE_END',
  data: {
    meetingId: 'A3B7C9',
    issueId: 'story-123',
    roundId: 'round-123'
  },
  timestamp: 1234567890000,
  from: 'host-peer-id'
}
```

---

#### 3. FLIP_CARDS

**發送者**：Host

**用途**：通知所有 Client 翻牌，顯示結果

**結構**：
```javascript
{
  type: 'FLIP_CARDS',
  data: {
    meetingId: 'A3B7C9',
    issueId: 'story-123',
    roundId: 'round-123'
  },
  timestamp: 1234567890000,
  from: 'host-peer-id'
}
```

---

#### 4. RESET

**發送者**：Host

**用途**：通知所有 Client 重置，準備新的 Issue

**結構**：
```javascript
{
  type: 'RESET',
  data: {
    meetingId: 'A3B7C9'
  },
  timestamp: 1234567890000,
  from: 'host-peer-id'
}
```

---

#### 5. ESTIMATE_SELECT

**發送者**：Client

**用途**：Client 通知 Host 自己選擇的牌

**結構**：
```javascript
{
  type: 'ESTIMATE_SELECT',
  data: {
    card: '13',
    cardSet: 'Fibonacci',
    issueId: 'story-123',
    roundId: 'round-123'
  },
  timestamp: 1234567890000,
  from: 'client-peer-id'
}
```

---

#### 6. PARTICIPANT_JOIN

**發送者**：Client → Host（自動發送）

**用途**：Client 加入會議時，通知 Host

**結構**：
```javascript
{
  type: 'PARTICIPANT_JOIN',
  data: {
    name: 'John Doe',
    peerId: 'client-peer-id'
  },
  timestamp: 1234567890000,
  from: 'client-peer-id'
}
```

---

#### 7. PARTICIPANT_LEAVE

**發送者**：Client → Host（自動發送）或 Host 偵測

**用途**：參與者離開會議時通知

**結構**：
```javascript
{
  type: 'PARTICIPANT_LEAVE',
  data: {
    peerId: 'client-peer-id',
    reason: 'disconnected' | 'kicked' | 'left'  // 離開原因
  },
  timestamp: 1234567890000,
  from: 'client-peer-id'  // 或 'host-peer-id'（如果是被踢除）
}
```

---

#### 8. PARTICIPANT_UPDATE

**發送者**：Host → Client

**用途**：Host 廣播參與者狀態更新（如估點結果）

**結構**：
```javascript
{
  type: 'PARTICIPANT_UPDATE',
  data: {
    participants: [
      {
        peerId: 'client-peer-id-1',
        name: 'John Doe',
        status: 'connected' | 'disconnected',
        estimateStatus: 'selected' | 'not-selected',
        card: '13',  // 翻牌後顯示
        cardSet: 'Fibonacci'
      },
      // ...
    ]
  },
  timestamp: 1234567890000,
  from: 'host-peer-id'
}
```

---

#### 9. STATS_UPDATE

**發送者**：Host → Client

**用途**：Host 廣播統計結果（翻牌後）

**結構**：
```javascript
{
  type: 'STATS_UPDATE',
  data: {
    issueId: 'story-123',  // Issue ID
    roundId: 'round-123',      // 輪次 ID
    roundNumber: 1,            // 第幾輪（從 1 開始）
    stats: {
      average: 8.5,            // 平均估點值（如果是數字）
      max: 13,                  // 最高估點值
      min: 3,                   // 最低估點值
      distribution: {           // 分佈（可選）
        '3': 2,
        '5': 3,
        '8': 4,
        '13': 1
      }
    },
    extremes: {                 // 極端值資訊
      max: {
        value: 13,
        participants: [         // 選擇最高值的參與者
          {
            peerId: 'client-peer-id-1',
            name: 'John Doe',
            reason: null        // 原因（初始為 null，等待輸入）
          }
        ]
      },
      min: {
        value: 3,
        participants: [         // 選擇最低值的參與者
          {
            peerId: 'client-peer-id-2',
            name: 'Jane Smith',
            reason: null
          }
        ]
      }
    },
    participants: [
      {
        peerId: 'client-peer-id-1',
        name: 'John Doe',
        card: '13'
      },
      // ...
    ]
  },
  timestamp: 1234567890000,
  from: 'host-peer-id'
}
```

<!-- 
注意：極端值原因說明功能不實作於軟體層面，
因為這是實務上由團隊口頭討論的事項。
系統只會自動識別並高亮顯示極端值，不需要輸入原因。
-->

---

#### 12. NEXT_ROUND

**發送者**：Host → Client

**用途**：Host 決定進行下一輪估點

**結構**：
```javascript
{
  type: 'NEXT_ROUND',
  data: {
    issueId: 'story-123',
    previousRoundId: 'round-123',
    newRoundId: 'round-124',
    roundNumber: 2  // 第幾輪
  },
  timestamp: 1234567890000,
  from: 'host-peer-id'
}
```

---

#### 13. ESTIMATE_COMPLETE

**發送者**：Host → Client

**用途**：Host 完成當前 Issue 的估點

**結構**：
```javascript
{
  type: 'ESTIMATE_COMPLETE',
  data: {
    issueId: 'story-123',
    finalRoundId: 'round-123',
    finalEstimate: '13',  // 最終估點值（可能是平均值或共識值）
    totalRounds: 2,        // 總共進行了幾輪
    participants: [
      {
        peerId: 'client-peer-id-1',
        name: 'John Doe',
        finalCard: '13'
      },
      // ...
    ]
  },
  timestamp: 1234567890000,
  from: 'host-peer-id'
}
```

---

#### 14. ERROR

**發送者**：Host 或 Client

**用途**：傳送錯誤訊息

**結構**：
```javascript
{
  type: 'ERROR',
  data: {
    code: 'BLACKLISTED' | 'ROOM_FULL' | 'INVALID_CARD' | 'UNKNOWN',
    message: '錯誤訊息描述'
  },
  timestamp: 1234567890000,
  from: 'host-peer-id' | 'client-peer-id'
}
```

---

## 估點牌組資料結構

### 牌組定義

**檔案位置**：`js/data/card-sets.js`

**第一版實作**：只實作 Modified Fibonacci 牌組，其他牌組為未來功能。

**結構**：
```javascript
// 第一版：只實作 ModifiedFibonacci
export const cardSets = {
  // 未來功能：標準 Fibonacci
  Fibonacci: {
    id: 'Fibonacci',
    name: {
      'zh-TW': 'Fibonacci',
      'en': 'Fibonacci'
    },
    description: {
      'zh-TW': '標準費氏數列',
      'en': 'Standard Fibonacci sequence'
    },
    cards: [
      { value: '0', label: '0' },
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '5', label: '5' },
      { value: '8', label: '8' },
      { value: '13', label: '13' },
      { value: '21', label: '21' },
      { value: '34', label: '34' },
      { value: '55', label: '55' },
      { value: '89', label: '89' },
      { value: '?', label: '?' }
    ]
  },
  'ModifiedFibonacci': {
    id: 'ModifiedFibonacci',
    name: {
      'zh-TW': '修改版費氏數列',
      'en': 'Modified Fibonacci'
    },
    description: {
      'zh-TW': 'Planning Poker 常用牌組，包含半點和特殊符號',
      'en': 'Commonly used in Planning Poker, includes half points and special symbols'
    },
    cards: [
      { value: '0', label: '0' },
      { value: '1/2', label: '1/2' },
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '5', label: '5' },
      { value: '8', label: '8' },
      { value: '13', label: '13' },
      { value: '20', label: '20' },
      { value: '40', label: '40' },
      { value: '100', label: '100' },
      { value: '∞', label: '∞' },
      { value: '?', label: '?' },
      { value: '☕', label: '☕' }
    ]
  },
  // 未來功能：T-Shirt Size
  'T-Shirt': {
    id: 'T-Shirt',
    name: {
      'zh-TW': 'T-Shirt Size',
      'en': 'T-Shirt Size'
    },
    cards: [
      { value: 'XS', label: 'XS' },
      { value: 'S', label: 'S' },
      { value: 'M', label: 'M' },
      { value: 'L', label: 'L' },
      { value: 'XL', label: 'XL' },
      { value: 'XXL', label: 'XXL' },
      { value: '?', label: '?' }
    ]
  },
  // 未來功能：Power of 2
  'PowerOf2': {
    id: 'PowerOf2',
    name: {
      'zh-TW': 'Power of 2',
      'en': 'Power of 2'
    },
    cards: [
      { value: '0', label: '0' },
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '4', label: '4' },
      { value: '8', label: '8' },
      { value: '16', label: '16' },
      { value: '32', label: '32' },
      { value: '?', label: '?' }
    ]
  }
};
```

### 特殊符號說明

**Modified Fibonacci 牌組中的特殊符號**：

- **∞（無限）**：
  - 意義：任務太大，無法估點，需要拆分
  - 使用場景：當任務過於複雜或範圍不明確時
  - 處理方式：Host 應該將任務拆分為更小的 Issue

- **?（問號）**：
  - 意義：不確定、需要更多資訊
  - 使用場景：對任務理解不足，無法給出估點
  - 處理方式：需要討論澄清任務需求

- **☕（咖啡）**：
  - 意義：需要休息、需要討論，或任務定義不清楚
  - 使用場景：團隊需要暫停討論，或任務需要重新定義
  - 處理方式：暫停估點，進行討論或休息

**統計處理**：
- 特殊符號（∞, ?, ☕）不參與數值統計（平均、最高、最低）
- 但會顯示在參與者列表中
- Host 可以根據特殊符號的出現決定是否需要討論或拆分任務

---

## 參與者資料結構

### Host 端參與者列表

**記憶體中的資料結構**：
```javascript
const participants = new Map();  // key: peerId, value: participant object

// participant object
{
  peerId: 'client-peer-id',
  name: 'John Doe',
  connection: DataChannel,  // WebRTC DataChannel
  status: 'connected' | 'disconnected',
  estimateStatus: 'not-selected' | 'selected',
  card: null | '13',  // 選擇的牌（翻牌後顯示）
  cardSet: null | 'Fibonacci',
  joinedAt: 1234567890000,  // 加入時間
  lastActivity: 1234567890000  // 最後活動時間
}
```

---

## 會議室資料結構

### Host 端會議室狀態

**記憶體中的資料結構**：
```javascript
const meetingRoom = {
  meetingId: 'A3B7C9',
  hostPeerId: 'host-peer-id',
  hostPeer: Peer,  // PeerJS Peer 實例
  participants: Map,  // 參與者 Map
  currentIssue: {
    issueId: 'story-123',
    title: 'Issue #123',  // Issue 標題（可選）
    description: '...',         // Issue 描述（可選）
    status: 'estimating' | 'completed',  // 狀態
    createdAt: 1234567890000,
    completedAt: null | 1234567890000,
    finalEstimate: null | '13',  // 最終估點值
    rounds: [                     // 所有輪次的記錄
      {
        roundId: 'round-123',
        roundNumber: 1,
        status: 'idle' | 'estimating' | 'flipped' | 'ended',
        startedAt: 1234567890000,
        endedAt: null | 1234567890000,
        cardSet: 'Fibonacci',
        participants: [
          {
            peerId: 'client-peer-id-1',
            name: 'John Doe',
            card: '13'
          },
          // ...
        ],
        stats: {
          average: 8.5,
          max: 13,
          min: 3,
          distribution: { /* ... */ }
        },
        extremes: {
          max: {
            value: 13,
            participants: [
              {
                peerId: 'client-peer-id-1',
                name: 'John Doe',
                reason: null | '我認為...'
              }
            ]
          },
          min: {
            value: 3,
            participants: [
              {
                peerId: 'client-peer-id-2',
                name: 'Jane Smith',
                reason: null | '我認為...'
              }
            ]
          }
        }
      }
    ]
  },
  maxParticipants: 15,
  createdAt: 1234567890000
};
```

---

## 統計資料結構

### 統計結果

**結構**：
```javascript
{
  roundId: 'round-123',
  totalParticipants: 10,
  selectedCount: 8,  // 已選擇的人數
  average: 8.5,      // 平均估點值（僅數字牌組）
  max: 13,           // 最高估點值
  min: 3,            // 最低估點值
  median: 8,         // 中位數（可選）
  distribution: {    // 分佈
    '3': 1,
    '5': 2,
    '8': 4,
    '13': 1
  },
  consensus: 'high' | 'medium' | 'low',  // 共識度（可選）
  participants: [
    {
      peerId: 'client-peer-id-1',
      name: 'John Doe',
      card: '13'
    },
    // ...
  ]
}
```

---

## 工具函式

### UUID 生成

```javascript
// js/utils/uuid.js
export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
```

### 會議 ID 生成

```javascript
// js/utils/meeting-id.js
const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';  // 排除容易混淆的字元

export function generateMeetingId(length = 6) {
  let id = '';
  for (let i = 0; i < length; i++) {
    id += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return id;
}
```

---

## 資料驗證

### 訊息驗證

所有接收到的 WebRTC 訊息都應該進行驗證：

```javascript
function validateMessage(message) {
  if (!message || typeof message !== 'object') {
    return false;
  }
  
  if (!message.type || typeof message.type !== 'string') {
    return false;
  }
  
  if (!message.data || typeof message.data !== 'object') {
    return false;
  }
  
  if (typeof message.timestamp !== 'number') {
    return false;
  }
  
  if (!message.from || typeof message.from !== 'string') {
    return false;
  }
  
  return true;
}
```

---

## 資料清理

### 定期清理

- 歷史記錄：超過最大數量時自動刪除最舊的記錄
- 黑名單：可選功能，定期清理過期的黑名單項目（如需要）

### 清除所有資料

提供「清除所有資料」功能，清除所有 localStorage 資料：

**清除的資料項目**：
- 設定資料（`agile_estimation_settings`）：包含主題、語言、信號伺服器設定、使用者名稱等
- 歷史記錄（`agile_estimation_history`）：所有估點歷史記錄
- 黑名單（`agile_estimation_blacklist`）：Host 模式的黑名單

**實作方式**：
```javascript
function clearAllData() {
  // 清除所有 agile_estimation_ 前綴的資料
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('agile_estimation_')) {
      localStorage.removeItem(key);
    }
  });
  
  // 或使用 storage.clear()（如果實作了清除所有前綴資料的功能）
  // storage.clear();
}
```

**注意事項**：
- 此操作不可復原，請謹慎使用
- 清除後會重置為預設設定
- 需要確認對話框避免誤操作

