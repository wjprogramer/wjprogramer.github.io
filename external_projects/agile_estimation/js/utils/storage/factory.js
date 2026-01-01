/**
 * Storage Factory
 * 創建 Storage 實例的工廠函數
 */

import { RealStorage } from './index.js';
import { MockStorage } from './mock.js';

/**
 * @typedef {import('./interface.js').IStorage} IStorage
 */

/**
 * 創建真實的 Storage（使用 localStorage）
 * @returns {IStorage} 真實的 Storage 實例
 */
export function createRealStorage() {
  return new RealStorage();
}

/**
 * 創建 Mock Storage（用於測試）
 * @returns {IStorage} Mock Storage 實例
 */
export function createMockStorage() {
  return new MockStorage();
}

/**
 * 創建默認的 Storage（生產環境使用）
 * @returns {IStorage} 默認的 Storage 實例
 */
export function createDefaultStorage() {
  return createRealStorage();
}

