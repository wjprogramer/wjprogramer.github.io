/**
 * History Data Management
 */

import { storage } from '../utils/storage.js';

const HISTORY_KEY = 'history';
const MAX_HISTORY_ITEMS = 100;

/**
 * 取得歷史記錄
 * @returns {Array} 歷史記錄陣列
 */
export function getHistory() {
  return storage.get(HISTORY_KEY, []);
}

/**
 * 新增歷史記錄
 * @param {Object} record - 記錄資料
 * @param {string} record.value - 估點值
 * @param {string} record.mode - 模式（solo, host, client）
 * @param {string} record.issue - Issue 名稱（可選）
 * @param {number} record.round - 輪次（可選）
 */
export function addHistory(record) {
  const history = getHistory();
  
  const newRecord = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    value: record.value,
    mode: record.mode || 'solo',
    issue: record.issue || null,
    round: record.round || 1
  };
  
  // 新記錄加到最前面
  history.unshift(newRecord);
  
  // 限制最大數量
  if (history.length > MAX_HISTORY_ITEMS) {
    history.splice(MAX_HISTORY_ITEMS);
  }
  
  storage.set(HISTORY_KEY, history);
  return newRecord;
}

/**
 * 刪除單筆歷史記錄
 * @param {string} id - 記錄 ID
 */
export function removeHistory(id) {
  const history = getHistory();
  const filtered = history.filter(record => record.id !== id);
  storage.set(HISTORY_KEY, filtered);
}

/**
 * 清除所有歷史記錄
 */
export function clearHistory() {
  storage.set(HISTORY_KEY, []);
}

/**
 * 格式化時間顯示
 * @param {string} isoString - ISO 時間字串
 * @returns {string} 格式化後的時間
 */
export function formatTime(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) {
    return '剛才';
  } else if (diffMins < 60) {
    return `${diffMins} 分鐘前`;
  } else if (diffHours < 24) {
    return `${diffHours} 小時前`;
  } else if (diffDays < 7) {
    return `${diffDays} 天前`;
  } else {
    return date.toLocaleDateString();
  }
}

