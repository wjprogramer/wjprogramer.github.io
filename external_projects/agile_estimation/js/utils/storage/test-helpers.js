/**
 * Storage Test Helpers
 * 測試用的 Storage 輔助函數
 */

import { createMockStorage } from './factory.js';
import { storage } from './index.js';

/**
 * 創建一個使用 Mock Storage 的測試環境
 * @returns {Object} 包含 mockStorage 和 restore 函數
 */
export function createTestStorage() {
  const mockStorage = createMockStorage();
  const originalStorage = storage;
  
  // 替換 storage 的方法（注意：這只影響當前模組的引用）
  // 由於其他模組已經導入了 storage，我們需要一個不同的方法
  
  return {
    mockStorage,
    /**
     * 恢復原始 storage（如果需要）
     */
    restore() {
      // 注意：由於 ES6 模組的特性，我們無法直接替換已導入的 storage
      // 這個函數主要是為了 API 一致性
    }
  };
}

/**
 * 在測試中使用 Mock Storage 執行函數
 * @param {Function} testFn - 測試函數，接收 mockStorage 作為參數
 * @returns {*} 測試函數的返回值
 */
export function withMockStorage(testFn) {
  const mockStorage = createMockStorage();
  return testFn(mockStorage);
}

