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
  maxHistoryRecords: 100,                  // 歷史記錄最大數量
  soundEnabled: true,                      // 音效開關（可選）
  animationsEnabled: true,                 // 動畫開關（可選）
  signalingServer: {                       // 信號伺服器設定（可選）
    enabled: false,                         // 是否使用自訂信號伺服器
    host: '0.peerjs.com',                   // 信號伺服器 Host（IP 或域名）
    port: 443,                              // 信號伺服器 Port
    path: '/',                              // 信號伺服器 Path
    secure: true                            // 是否使用 HTTPS/WSS
  }
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
  }
}
```

**存取方式**：
```javascript
import { storage } from './utils/storage.js';

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
    id: 'uuid-v4',                    // 唯一識別碼
    timestamp: 1234567890,             // Unix 時間戳記（秒）
    card: '13',                       // 選擇的牌值
    cardSet: 'Fibonacci',             // 使用的估點牌組
    mode: 'solo',                     // 模式：'solo'
    note: 'Issue #123'           // 備註（可選）
  },
  // 協作模式 - Host 端記錄
  {
    id: 'uuid-v4',
    timestamp: 1234567890,
    meetingId: 'A3B7C9',             // 會議 ID
    roundId: 'round-123',             // 輪次 ID
    cardSet: 'Fibonacci',
    mode: 'host',                     // 模式：'host'
    participants: [                   // 所有參與者的估點結果
      {
        peerId: 'client-peer-id-1',
        name: 'John Doe',
        card: '13'
      },
      {
        peerId: 'client-peer-id-2',
        name: 'Jane Smith',
        card: '8'
      }
      // ...
    ],
    stats: {                           // 統計資訊
      average: 8.5,
      max: 13,
      min: 3,
      distribution: {
        '3': 1,
        '5': 2,
        '8': 4,
        '13': 1
      }
    }
  },
  // 協作模式 - Client 端記錄
  {
    id: 'uuid-v4',
    timestamp: 1234567890,
    meetingId: 'A3B7C9',
    roundId: 'round-123',
    cardSet: 'Fibonacci',
    mode: 'client',                   // 模式：'client'
    myCard: '13',                     // 自己的估點
    myName: 'John Doe',               // 自己的名稱
    stats: {                          // 統計資訊（從 Host 接收）
      average: 8.5,
      max: 13,
      min: 3,
      distribution: {
        '3': 1,
        '5': 2,
        '8': 4,
        '13': 1
      }
    }
  },
  // ...
]
```

**限制**：
- 最多儲存 100 筆記錄（可透過設定調整）
- 超過限制時，刪除最舊的記錄

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
// 限制記錄數量
const maxRecords = storage.get('settings')?.maxHistoryRecords || 100;
if (history.length > maxRecords) {
  history.shift(); // 刪除最舊的記錄
}

storage.set('history', history);
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

```javascript
function clearAllData() {
  storage.clear();  // 清除所有 agile_estimation_ 前綴的資料
}
```

