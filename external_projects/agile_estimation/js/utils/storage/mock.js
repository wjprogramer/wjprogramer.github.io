/**
 * Mock Storage
 * 用於測試的 Storage 實現，使用記憶體儲存而非 localStorage
 */

/**
 * @implements {IStorage}
 */
export class MockStorage {
  constructor() {
    /** @type {Map<string, any>} */
    this.data = new Map();
  }

  /**
   * 取得資料
   * @param {string} key - 鍵名
   * @param {*} defaultValue - 預設值
   * @returns {*} 儲存的值或預設值（深拷貝）
   */
  get(key, defaultValue = null) {
    if (this.data.has(key)) {
      const value = this.data.get(key);
      // 深拷貝以避免外部修改影響內部資料
      // 對於基本類型，JSON.parse(JSON.stringify()) 會直接返回原值
      // 對於物件和陣列，會創建新的副本
      try {
        return JSON.parse(JSON.stringify(value));
      } catch (error) {
        // 如果無法序列化（如包含函數、undefined 等），返回原值
        return value;
      }
    }
    return defaultValue;
  }

  /**
   * 儲存資料
   * @param {string} key - 鍵名
   * @param {*} value - 要儲存的值
   */
  set(key, value) {
    // 深拷貝以避免外部修改影響內部資料
    this.data.set(key, JSON.parse(JSON.stringify(value)));
  }

  /**
   * 刪除資料
   * @param {string} key - 鍵名
   */
  remove(key) {
    this.data.delete(key);
  }

  /**
   * 清除所有資料
   */
  clear() {
    this.data.clear();
  }

  /**
   * 取得所有資料（用於測試）
   * @returns {Object} 所有儲存的資料
   */
  getAll() {
    const result = {};
    for (const [key, value] of this.data.entries()) {
      result[key] = value;
    }
    return result;
  }

  /**
   * 取得資料數量（用於測試）
   * @returns {number} 資料數量
   */
  size() {
    return this.data.size;
  }
}

