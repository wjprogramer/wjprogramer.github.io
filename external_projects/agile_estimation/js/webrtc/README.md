# WebRTC 模組 - 依賴注入與測試

本模組已重構為支持依賴注入（Dependency Injection），方便進行單元測試。

## 架構

### Interface 定義
- `interfaces.js`: 定義了 `IHostManager` 和 `IClientManager` 的 TypeScript 風格 JSDoc 註解

### 實作
- `peer-manager.js`: `HostManager` 和 `ClientManager` 的真實實作
- `peer-factory.js`: `RealPeerFactory` - 創建真實的 PeerJS 實例

### Mock 實作
- `mocks.js`: 
  - `MockPeerFactory`: Mock Peer Factory
  - `MockHostManager`: Mock Host Manager（可選，用於完全模擬）
  - `MockClientManager`: Mock Client Manager（可選，用於完全模擬）

### 測試輔助
- `test-helpers.js`: 測試輔助函數（`createTestHostManager`, `createTestClientManager`, `wait`, `waitFor`）

**注意**: WebRTC 相關測試已整合到 `js/pages/test.js` 中，請在該文件中查看完整的測試案例。

## 使用方式

### 生產環境（默認）

```javascript
import { HostManager, ClientManager } from './webrtc/peer-manager.js';

// 使用默認的 RealPeerFactory（真實 PeerJS）
const hostManager = new HostManager('Host Name');
const clientManager = new ClientManager();
```

### 測試環境（使用 Mock）

```javascript
import { HostManager } from './webrtc/peer-manager.js';
import { MockPeerFactory } from './webrtc/mocks.js';
import { createTestHostManager } from './webrtc/test-helpers.js';

// 方式 1: 使用 test-helpers（推薦）
const { hostManager, peerFactory } = createTestHostManager('Host Name');

// 方式 2: 手動注入
const peerFactory = new MockPeerFactory();
const hostManager = new HostManager('Host Name', { peerFactory });
```

## 測試範例

### 基本測試

```javascript
import { createTestHostManager, createTestClientManager, wait } from './webrtc/test-helpers.js';

test('Host 建立會議', async () => {
  const { hostManager } = createTestHostManager('Host');
  const meetingId = await hostManager.createMeeting();
  await wait(20); // 等待非同步操作
  
  expect(meetingId).toBeTruthy();
  expect(hostManager.state).toBe('connected');
});
```

### 多參與者測試

```javascript
test('多個 Client 加入會議', async () => {
  const { hostManager, peerFactory } = createTestHostManager('Host');
  const meetingId = await hostManager.createMeeting();
  await wait(20);
  
  const { clientManager: client1 } = createTestClientManager({ peerFactory });
  const { clientManager: client2 } = createTestClientManager({ peerFactory });
  
  await client1.joinMeeting(meetingId, 'Client1');
  await wait(20);
  await client2.joinMeeting(meetingId, 'Client2');
  await wait(20);
  
  const participants = hostManager.getParticipants();
  expect(participants.length).toBe(2);
});
```

### 翻牌功能測試

```javascript
test('部分參與者未選取時可以翻牌', async () => {
  const { hostManager, peerFactory } = createTestHostManager('Host');
  const meetingId = await hostManager.createMeeting();
  await wait(20);
  
  const { clientManager } = createTestClientManager({ peerFactory });
  await clientManager.joinMeeting(meetingId, 'Client1');
  await wait(20);
  
  hostManager.startEstimation({ title: 'Test Issue' });
  await wait(20);
  
  // 只有 Client1 選取
  clientManager.selectCard('8');
  await wait(20);
  
  // 可以翻牌（即使只有一個人選取）
  const results = hostManager.flipCards();
  await wait(20);
  
  expect(results.length).toBe(1);
  expect(results[0].card).toBe('8');
});
```

## Mock 功能

### MockPeerFactory

- `createPeer(id, options)`: 創建 Mock Peer
- `getPeer(id)`: 取得已創建的 Peer
- `clear()`: 清除所有 Peer

### MockPeer

- `simulateOpen()`: 模擬 Peer 開啟
- `simulateError(error)`: 模擬錯誤
- `simulateDisconnect()`: 模擬斷線

### MockDataConnection

- `send(data)`: 發送訊息（會自動傳遞到對端）
- `close()`: 關閉連線
- `sentMessages`: 已發送的訊息列表（用於測試）

## 注意事項

1. **非同步操作**: Mock 操作是模擬非同步的，需要使用 `wait()` 或 `waitFor()` 等待操作完成
2. **Peer Factory 共享**: 多個 Manager 需要共享同一個 `peerFactory` 才能互相連線
3. **事件處理**: Mock 的事件處理是同步的，但連線建立是模擬非同步的（使用 `setTimeout`）

## 向後兼容

現有的代碼（`host.js`、`join.js`）無需修改，因為：
- `HostManager` 和 `ClientManager` 的構造函數參數是可選的
- 如果不提供 `peerFactory`，會使用默認的 `RealPeerFactory`
- 生產環境的行為完全不受影響

