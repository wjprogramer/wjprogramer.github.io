# 資料結構設計

## 目錄

1. [localStorage 資料結構](#localstorage-資料結構)
2. [Google Drive 資料結構](#google-drive-資料結構)
3. [WebRTC 訊息格式](#webrtc-訊息格式)
4. [資料驗證規則](#資料驗證規則)

---

## localStorage 資料結構

### 命名空間

使用統一前綴：`retro_`

### 1. 設定資料（`retro_settings`）

**用途**：儲存使用者設定

**資料結構**：
```javascript
{
  theme: 'dark' | 'light' | 'auto',        // 主題模式
  language: 'zh-TW' | 'en' | 'ja',        // 語言設定
  googleDriveEnabled: boolean,             // 是否啟用 Google Drive
  googleDriveFileId: string | null,       // Google Drive 檔案 ID
  lastUserName: string | null,            // 上次使用的使用者名稱
  maxHistoryRecords: number               // 最大歷史記錄數（預設：100）
}
```

**範例**：
```javascript
{
  theme: 'auto',
  language: 'zh-TW',
  googleDriveEnabled: false,
  googleDriveFileId: null,
  lastUserName: 'John Doe',
  maxHistoryRecords: 100
}
```

### 2. 回顧記錄（`retro_retrospectives`）

**用途**：儲存所有回顧會議記錄

**資料結構**：
```javascript
[
  {
    id: string,                            // UUID v4
    meetingId: string,                     // 會議 ID（6-8 位）
    title: string,                         // 會議主題
    description: string | null,            // 會議描述
    date: string,                          // ISO 日期字串（YYYY-MM-DD）
    createdAt: number,                     // 建立時間戳記
    updatedAt: number,                     // 更新時間戳記
    allowAnonymous: boolean,               // 是否允許匿名
    host: {
      peerId: string,                      // 房主 Peer ID
      name: string                         // 房主名稱
    },
    participants: [                        // 參與者列表
      {
        peerId: string,                    // 參與者 Peer ID
        name: string,                      // 參與者名稱
        joinedAt: number,                  // 加入時間戳記
        leftAt: number | null              // 離開時間戳記（如果已離開）
      }
    ],
    items: {
      wentWrong: [                         // 問題點
        {
          id: string,                      // UUID v4
          text: string,                     // 內容文字
          author: {
            peerId: string,                // 作者 Peer ID
            name: string | 'anonymous',    // 作者名稱（匿名時為 'anonymous'）
            isAnonymous: boolean           // 是否匿名
          },
          createdAt: number,               // 建立時間戳記
          updatedAt: number,               // 更新時間戳記
          votes: number,                  // 投票數
          voters: string[]                // 投票者 Peer ID 列表
        }
      ],
      wentWell: [                          // 做得好的地方
        // 同上結構
      ],
      actionItems: [                       // 改進建議
        // 同上結構
      ]
    },
    status: 'preparing' | 'collecting' | 'discussing' | 'completed',  // 會議狀態
    exportedAt: number | null             // 匯出時間戳記（如果已匯出）
  }
]
```

**範例**：
```javascript
[
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    meetingId: 'A3B7C9',
    title: 'Sprint 1 Retrospective',
    description: 'First sprint retrospective meeting',
    date: '2024-01-15',
    createdAt: 1705276800000,
    updatedAt: 1705276800000,
    allowAnonymous: true,
    host: {
      peerId: 'host-peer-123',
      name: 'John Doe'
    },
    participants: [
      {
        peerId: 'participant-peer-456',
        name: 'Jane Smith',
        joinedAt: 1705276801000,
        leftAt: null
      }
    ],
    items: {
      wentWrong: [
        {
          id: 'item-123',
          text: 'Deployment process is too slow',
          author: {
            peerId: 'participant-peer-456',
            name: 'Jane Smith',
            isAnonymous: false
          },
          createdAt: 1705276802000,
          updatedAt: 1705276802000,
          votes: 3,
          voters: ['participant-peer-456', 'participant-peer-789', 'host-peer-123']
        },
        {
          id: 'item-124',
          text: 'Lack of documentation',
          author: {
            peerId: 'participant-peer-789',
            name: 'anonymous',
            isAnonymous: true
          },
          createdAt: 1705276803000,
          updatedAt: 1705276803000,
          votes: 2,
          voters: ['participant-peer-456', 'host-peer-123']
        }
      ],
      wentWell: [
        {
          id: 'item-125',
          text: 'Team communication improved',
          author: {
            peerId: 'host-peer-123',
            name: 'John Doe',
            isAnonymous: false
          },
          createdAt: 1705276804000,
          updatedAt: 1705276804000,
          votes: 5,
          voters: ['host-peer-123', 'participant-peer-456', 'participant-peer-789', 'participant-peer-101', 'participant-peer-102']
        }
      ],
      actionItems: [
        {
          id: 'item-126',
          text: 'Automate deployment process',
          author: {
            peerId: 'participant-peer-456',
            name: 'Jane Smith',
            isAnonymous: false
          },
          createdAt: 1705276805000,
          updatedAt: 1705276805000,
          votes: 4,
          voters: ['participant-peer-456', 'participant-peer-789', 'host-peer-123', 'participant-peer-101']
        }
      ]
    },
    status: 'completed',
    exportedAt: 1705276806000
  }
]
```

### 3. 使用者資料（`retro_user_data`）

**用途**：儲存使用者相關資料

**資料結構**：
```javascript
{
  name: string | null,                     // 使用者名稱
  lastMeetingId: string | null,            // 上次加入的會議 ID
  googleAccount: {                         // Google 帳號資訊（如果登入）
    email: string,
    name: string,
    picture: string | null
  } | null
}
```

**範例**：
```javascript
{
  name: 'John Doe',
  lastMeetingId: 'A3B7C9',
  googleAccount: null
}
```

### 4. 黑名單（`retro_blacklist`）

**用途**：儲存被踢除的參與者 Peer ID（僅房主使用）

**資料結構**：
```javascript
[
  {
    peerId: string,                        // 被踢除的 Peer ID
    name: string,                          // 參與者名稱
    bannedAt: number,                      // 加入黑名單的時間戳記
    reason: string | null                  // 原因（可選）
  }
]
```

**範例**：
```javascript
[
  {
    peerId: 'participant-peer-999',
    name: 'Spam User',
    bannedAt: 1705276800000,
    reason: 'Inappropriate content'
  }
]
```

---

## Google Drive 資料結構

### 檔案結構

**檔案名稱**：`retro-data.json`

**檔案格式**：與 localStorage 的 `retro_retrospectives` 相同

**用途**：當使用者連結 Google Drive 時，將回顧記錄同步到 Google Drive

**資料結構**：
```javascript
{
  version: string,                         // 資料格式版本（如 '1.0.0'）
  lastSyncAt: number,                     // 最後同步時間戳記
  retrospectives: [                        // 回顧記錄列表（與 localStorage 相同）
    // 與 localStorage 的 retro_retrospectives 相同結構
  ]
}
```

**範例**：
```javascript
{
  version: '1.0.0',
  lastSyncAt: 1705276800000,
  retrospectives: [
    // ... 回顧記錄
  ]
}
```

---

## WebRTC 訊息格式

### 訊息基本結構

```javascript
{
  type: string,                            // 訊息類型
  data: object,                           // 訊息資料
  timestamp: number,                       // 時間戳記
  from: string                            // 發送者 Peer ID
}
```

### 訊息類型

#### 1. PARTICIPANT_JOIN（參與者加入）

**發送者**：參與者 → 房主

**資料結構**：
```javascript
{
  type: 'PARTICIPANT_JOIN',
  data: {
    name: string,                          // 參與者名稱
    peerId: string                         // 參與者 Peer ID
  },
  timestamp: number,
  from: string
}
```

**範例**：
```javascript
{
  type: 'PARTICIPANT_JOIN',
  data: {
    name: 'Jane Smith',
    peerId: 'participant-peer-456'
  },
  timestamp: 1705276800000,
  from: 'participant-peer-456'
}
```

#### 2. PARTICIPANT_LEAVE（參與者離開）

**發送者**：參與者 → 房主

**資料結構**：
```javascript
{
  type: 'PARTICIPANT_LEAVE',
  data: {
    peerId: string                         // 參與者 Peer ID
  },
  timestamp: number,
  from: string
}
```

#### 3. RETRO_START（開始回顧）

**發送者**：房主 → 所有參與者

**資料結構**：
```javascript
{
  type: 'RETRO_START',
  data: {
    meetingId: string,                    // 會議 ID
    title: string,                         // 會議主題
    description: string | null,           // 會議描述
    allowAnonymous: boolean               // 是否允許匿名
  },
  timestamp: number,
  from: string
}
```

#### 4. RETRO_END（結束回顧）

**發送者**：房主 → 所有參與者

**資料結構**：
```javascript
{
  type: 'RETRO_END',
  data: {
    meetingId: string                     // 會議 ID
  },
  timestamp: number,
  from: string
}
```

#### 5. ITEM_ADD（新增回顧項目）

**發送者**：參與者 → 房主 → 所有參與者

**資料結構**：
```javascript
{
  type: 'ITEM_ADD',
  data: {
    id: string,                           // 項目 ID（UUID v4）
    category: 'wentWrong' | 'wentWell' | 'actionItems',  // 分類
    text: string,                         // 內容文字
    author: {
      peerId: string,                     // 作者 Peer ID
      name: string,                        // 作者名稱
      isAnonymous: boolean                // 是否匿名
    }
  },
  timestamp: number,
  from: string
}
```

**範例**：
```javascript
{
  type: 'ITEM_ADD',
  data: {
    id: 'item-123',
    category: 'wentWrong',
    text: 'Deployment process is too slow',
    author: {
      peerId: 'participant-peer-456',
      name: 'Jane Smith',
      isAnonymous: false
    }
  },
  timestamp: 1705276800000,
  from: 'participant-peer-456'
}
```

#### 6. ITEM_UPDATE（更新回顧項目）

**發送者**：參與者 → 房主 → 所有參與者

**資料結構**：
```javascript
{
  type: 'ITEM_UPDATE',
  data: {
    id: string,                           // 項目 ID
    text: string                          // 更新後的內容文字
  },
  timestamp: number,
  from: string
}
```

#### 7. ITEM_DELETE（刪除回顧項目）

**發送者**：參與者 → 房主 → 所有參與者

**資料結構**：
```javascript
{
  type: 'ITEM_DELETE',
  data: {
    id: string                            // 項目 ID
  },
  timestamp: number,
  from: string
}
```

#### 8. VOTE（投票）

**發送者**：參與者 → 房主 → 所有參與者

**資料結構**：
```javascript
{
  type: 'VOTE',
  data: {
    itemId: string,                       // 項目 ID
    action: 'add' | 'remove',            // 投票動作（新增/移除）
    voterPeerId: string                   // 投票者 Peer ID
  },
  timestamp: number,
  from: string
}
```

**範例**：
```javascript
{
  type: 'VOTE',
  data: {
    itemId: 'item-123',
    action: 'add',
    voterPeerId: 'participant-peer-456'
  },
  timestamp: 1705276800000,
  from: 'participant-peer-456'
}
```

#### 9. SYNC_STATE（同步狀態）

**發送者**：房主 → 參與者（當參與者加入時）

**資料結構**：
```javascript
{
  type: 'SYNC_STATE',
  data: {
    meetingId: string,                    // 會議 ID
    title: string,                        // 會議主題
    description: string | null,           // 會議描述
    allowAnonymous: boolean,              // 是否允許匿名
    status: 'preparing' | 'collecting' | 'discussing' | 'completed',  // 會議狀態
    participants: [                       // 參與者列表
      // 與資料結構中的 participants 相同
    ],
    items: {                              // 回顧項目
      wentWrong: [...],
      wentWell: [...],
      actionItems: [...]
    }
  },
  timestamp: number,
  from: string
}
```

---

## 資料驗證規則

### 1. 會議 ID 驗證

- **長度**：6-8 位
- **格式**：數字 + 字母混合
- **排除字元**：避免混淆字元（0/O, 1/I）
- **唯一性**：在同一時間內必須唯一

### 2. 使用者名稱驗證

- **長度**：1-50 字元
- **格式**：允許中文、英文、數字、空格、常見標點符號
- **唯一性**：在同一會議室內必須唯一
- **排除**：不能為空、不能只包含空格

### 3. 回顧內容驗證

- **長度**：1-1000 字元
- **格式**：允許中文、英文、數字、常見標點符號、換行
- **排除**：不能為空、不能只包含空格

### 4. 日期驗證

- **格式**：ISO 日期字串（YYYY-MM-DD）
- **範圍**：不能是未來日期（可選）

### 5. 投票驗證

- **投票者**：必須是已加入的參與者
- **項目**：必須是存在的回顧項目
- **重複投票**：同一參與者對同一項目只能投票一次

---

## 資料遷移

### 版本管理

**資料格式版本**：`1.0.0`

**未來版本變更**：
- 當資料結構變更時，需要實作遷移邏輯
- 版本號遵循語義化版本規範

### 遷移邏輯

```javascript
// js/utils/migration.js
export function migrateData(data, fromVersion, toVersion) {
  // 實作資料遷移邏輯
  // 例如：從 1.0.0 遷移到 1.1.0
  if (fromVersion === '1.0.0' && toVersion === '1.1.0') {
    // 遷移邏輯
  }
  return data;
}
```

---

## 資料備份與還原

### 備份功能

**用途**：匯出所有資料為 JSON 檔案

**格式**：
```javascript
{
  version: string,
  exportedAt: number,
  settings: {...},
  retrospectives: [...],
  userData: {...}
}
```

### 還原功能

**用途**：從 JSON 檔案還原資料

**驗證**：
- 檢查版本號
- 驗證資料格式
- 確認資料完整性

---

## 資料清理

### 自動清理

**規則**：
- 超過最大歷史記錄數時，刪除最舊的記錄
- 預設最大記錄數：100

### 手動清理

**功能**：
- 使用者可以手動刪除歷史記錄
- 使用者可以清除全部資料

---

## 資料同步（Google Drive）

### 同步策略

**單向同步**：
- 從 Google Drive 讀取資料
- 將本地資料寫入 Google Drive
- 衝突解決：以最新時間戳記為準

### 同步時機

- 連結 Google Drive 時：立即同步
- 建立新回顧時：立即同步
- 更新回顧時：立即同步
- 手動同步：使用者可以手動觸發同步

### 衝突處理

**策略**：
- 比較時間戳記，以最新的為準
- 如果時間戳記相同，以本地資料為準
- 顯示衝突提示給使用者

---

## 下一步

1. **實作資料驗證**：實作所有驗證規則
2. **實作資料遷移**：實作版本遷移邏輯
3. **實作備份還原**：實作資料備份與還原功能
4. **實作同步**：實作 Google Drive 同步功能

