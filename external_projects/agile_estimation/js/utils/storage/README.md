# Storage 測試指南

本專案已支援 Storage 的 Mock 功能，讓測試可以與實際環境隔離。

## 架構

### 檔案結構

- `index.js`: 真實的 Storage 實作（使用 localStorage）
- `mock.js`: Mock Storage 實作（使用記憶體）
- `factory.js`: Storage 工廠函數
- `interface.js`: Storage 介面定義（JSDoc）
- `test-helpers.js`: 測試輔助函數

## 使用方式

### 在測試中使用 Mock Storage

```javascript
import { createMockStorage } from '../utils/storage/factory.js';

// 創建 Mock Storage 實例
const mockStorage = createMockStorage();

// 使用 Mock Storage 進行測試
mockStorage.set('test_key', 'test_value');
const value = mockStorage.get('test_key');
assert(value === 'test_value', '測試通過');
```

### Mock Storage 的特性

1. **記憶體儲存**: 使用 `Map` 儲存資料，不會影響 localStorage
2. **深拷貝保護**: `set()` 方法會自動深拷貝資料，避免外部修改影響內部
3. **完整 API**: 實作與 `RealStorage` 相同的介面（`get`, `set`, `remove`, `clear`）
4. **測試輔助方法**: 提供 `getAll()` 和 `size()` 方法方便測試

### 測試範例

```javascript
import { createMockStorage } from '../utils/storage/factory.js';

function testStorage() {
  const mockStorage = createMockStorage();
  
  // 測試基本功能
  mockStorage.set('key1', 'value1');
  assert(mockStorage.get('key1') === 'value1', '基本儲存');
  
  // 測試預設值
  assert(mockStorage.get('non_existent', 'default') === 'default', '預設值');
  
  // 測試深拷貝
  const obj = { a: 1 };
  mockStorage.set('obj', obj);
  obj.a = 999;
  assert(mockStorage.get('obj').a === 1, '深拷貝保護');
  
  // 測試清除
  mockStorage.clear();
  assert(mockStorage.size() === 0, '清除所有');
}
```

## 注意事項

### ES6 模組限制

由於 ES6 模組的特性，已導入的模組無法在運行時替換。這意味著：

1. **直接使用 storage 的模組**: 如果模組直接導入 `storage`（如 `history.js`），測試時仍會使用實際的 storage
2. **測試隔離**: 對於這類測試，建議在測試前後清理資料（如使用 `clearHistory()`）
3. **未來改進**: 可以考慮重構相關模組以接受 storage 作為參數（依賴注入）

### 測試隔離策略

1. **使用 Mock Storage**: 對於直接測試 storage 功能的測試，使用 `createMockStorage()`
2. **測試前後清理**: 對於使用實際 storage 的測試，在測試前後清理資料
3. **測試專用鍵名**: 使用測試專用的鍵名前綴，避免與實際資料衝突

## 向後兼容

- `storage` 導出仍然可用，預設使用 `RealStorage`
- 現有程式碼無需修改
- 生產環境行為完全不受影響

