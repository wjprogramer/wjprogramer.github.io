/**
 * History Data Management
 */

import { storage as defaultStorage } from '../utils/storage/index.js';

const HISTORY_KEY = 'history';
const MAX_HISTORY_ITEMS = 10;
const MAX_STARRED_ITEMS = 9;

// 內部 storage 實例，默認使用實際的 storage，測試時可以替換
let storage = defaultStorage;

/**
 * 設置 storage 實例（主要用於測試）
 * @param {Object} storageInstance - Storage 實例
 */
export function setStorage(storageInstance) {
  storage = storageInstance;
}

/**
 * 重置 storage 為默認實例（主要用於測試後恢復）
 */
export function resetStorage() {
  storage = defaultStorage;
}

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
 * @param {string} record.value - 估點值（solo/client 模式）
 * @param {string} record.mode - 模式（solo, host, client）
 * @param {string} record.meetingId - 會議 ID（host/client 模式）
 * @param {Array} record.results - 所有參與者的結果（host 模式，單輪）
 * @param {number} record.participants - 參與者數量
 * @param {string} record.issueId - Issue ID（host 模式）
 * @param {string} record.issueTitle - Issue 標題（host 模式）
 * @param {string} record.issueDescription - Issue 描述（host 模式）
 * @param {number} record.roundNumber - 輪次編號（host 模式，翻牌時）
 * @param {Array} record.rounds - 所有輪次的資料（host 模式，Issue 完成時）
 * @param {string} record.finalDecision - 最終決定（host 模式，Issue 完成時）
 * @param {string} record.completedAt - 完成時間（host 模式，Issue 完成時）
 */
export function addHistory(record) {
  const history = getHistory();
  
  // Host 模式使用會議記錄結構
  if (record.mode === 'host' && record.meetingId) {
    return addOrUpdateMeetingHistory(record);
  }
  
  // Solo/Client 模式
  const newRecord = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    value: record.value || null,
    mode: record.mode || 'solo',
    meetingId: record.meetingId || null,
    participants: record.participants || null,
    starred: false
  };
  
  // 新記錄加到最前面
  history.unshift(newRecord);
  
  // 限制最大數量，優先刪除未 star 的記錄
  enforceMaxHistoryItems(history);
  
  storage.set(HISTORY_KEY, history);
  return newRecord;
}

/**
 * 新增或更新會議歷史記錄（一個會議包含多個 issue）
 * @param {Object} record - 記錄資料
 * @returns {Object} 更新後的記錄
 */
function addOrUpdateMeetingHistory(record) {
  const history = getHistory();
  const meetingId = record.meetingId;
  const now = new Date().toISOString();
  
  // 查找是否已存在該會議的記錄
  let meetingRecord = history.find(r => r.meetingId === meetingId && r.mode === 'host' && r.issues);
  
  if (meetingRecord) {
    // 更新會議名稱（如果有提供）
    if (record.meetingName !== undefined) {
      meetingRecord.meetingName = record.meetingName || null;
    }
    
    // 如果提供了完整的 issues 陣列，完全替換所有 issues（完整更新）
    if (record.issues && Array.isArray(record.issues)) {
      meetingRecord.issues = record.issues;
      // 更新參與者數量（如果有提供）
      if (record.participants !== undefined) {
        meetingRecord.participants = record.participants;
      }
      // 更新完成時間（如果提供）
      if (record.completedAt !== undefined) {
        meetingRecord.completedAt = record.completedAt;
      }
      storage.set(HISTORY_KEY, history);
      return meetingRecord;
    }
    
    // 更新現有記錄
    if (record.issueId && record.issueTitle) {
      // 完成一個 issue
      const existingIssueIndex = meetingRecord.issues.findIndex(i => i.issueId === record.issueId);
      
      if (existingIssueIndex >= 0) {
        // 更新現有 issue
        meetingRecord.issues[existingIssueIndex] = {
          issueId: record.issueId,
          issueTitle: record.issueTitle,
          issueDescription: record.issueDescription || null,
          rounds: record.rounds || [],
          finalDecision: record.finalDecision || null,
          completedAt: record.completedAt || now
        };
      } else {
        // 新增 issue
        meetingRecord.issues.push({
          issueId: record.issueId,
          issueTitle: record.issueTitle,
          issueDescription: record.issueDescription || null,
          rounds: record.rounds || [],
          finalDecision: record.finalDecision || null,
          completedAt: record.completedAt || now
        });
      }
      
      // 更新會議完成時間
      meetingRecord.completedAt = record.completedAt || now;
    } else if (record.results && record.issueId) {
      // 更新當前 issue 的當前輪次結果（翻牌時）
      const issueIndex = meetingRecord.issues.findIndex(i => i.issueId === record.issueId);
      
      if (issueIndex >= 0) {
        // 找到 issue，更新或新增輪次
        const issue = meetingRecord.issues[issueIndex];
        const roundNumber = record.roundNumber || (issue.rounds.length + 1);
        
        // 查找是否已存在該輪次
        const existingRoundIndex = issue.rounds.findIndex(r => r.roundNumber === roundNumber);
        
        if (existingRoundIndex >= 0) {
          // 更新現有輪次的結果
          issue.rounds[existingRoundIndex].results = record.results.map(r => ({
            name: r.name,
            card: r.card
          }));
          if (!issue.rounds[existingRoundIndex].completedAt) {
            issue.rounds[existingRoundIndex].completedAt = now;
          }
        } else {
          // 新增一輪
          issue.rounds.push({
            roundNumber,
            results: record.results.map(r => ({
              name: r.name,
              card: r.card
            })),
            completedAt: now
          });
        }
      } else {
        // Issue 不存在，建立新 issue（不應該發生，但為了安全）
        meetingRecord.issues.push({
          issueId: record.issueId,
          issueTitle: record.issueTitle || '未命名 Issue',
          issueDescription: record.issueDescription || null,
          rounds: [{
            roundNumber: 1,
            results: record.results.map(r => ({
              name: r.name,
              card: r.card
            })),
            completedAt: now
          }],
          finalDecision: null,
          completedAt: null
        });
      }
    }
    
    // 更新參與者數量（如果有提供）
    if (record.participants !== undefined) {
      meetingRecord.participants = record.participants;
    }
    
    storage.set(HISTORY_KEY, history);
    return meetingRecord;
  } else {
    // 建立新會議記錄
    const newRecord = {
      id: Date.now().toString(),
      timestamp: now,
      mode: 'host',
      meetingId: meetingId,
      meetingName: record.meetingName || null,
      participants: record.participants !== undefined ? record.participants : null,
      startedAt: now,
      completedAt: record.completedAt || null,
      issues: record.issues || [],
      starred: false
    };
    
    if (record.issueId && record.issueTitle) {
      // 完成一個 issue
      newRecord.issues.push({
        issueId: record.issueId,
        issueTitle: record.issueTitle,
        issueDescription: record.issueDescription || null,
        rounds: record.rounds || [],
        finalDecision: record.finalDecision || null,
        completedAt: record.completedAt || now
      });
      newRecord.completedAt = record.completedAt || now;
    } else if (record.results && record.issueId) {
      // 單輪結果
      newRecord.issues.push({
        issueId: record.issueId,
        issueTitle: record.issueTitle || '未命名 Issue',
        issueDescription: record.issueDescription || null,
        rounds: [{
          roundNumber: record.roundNumber || 1,
          results: record.results.map(r => ({
            name: r.name,
            card: r.card
          })),
          completedAt: now
        }],
        finalDecision: null,
        completedAt: null
      });
    }
    
    // 新記錄加到最前面
    history.unshift(newRecord);
    
    // 限制最大數量，優先刪除未 star 的記錄
    enforceMaxHistoryItems(history);
    
    storage.set(HISTORY_KEY, history);
    return newRecord;
  }
}

/**
 * 強制執行最大歷史記錄數量限制
 * 優先刪除未 star 的記錄
 * @param {Array} history - 歷史記錄陣列（會直接修改）
 */
function enforceMaxHistoryItems(history) {
  if (history.length <= MAX_HISTORY_ITEMS) {
    return;
  }
  
  // 分離 star 和未 star 的記錄
  const starred = history.filter(r => r.starred === true);
  const unstarred = history.filter(r => !r.starred);
  
  // 如果 star 的記錄超過限制，保留最舊的 star 記錄
  if (starred.length > MAX_HISTORY_ITEMS) {
    // 按時間排序，保留最新的
    starred.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    // 只保留前 MAX_HISTORY_ITEMS 個
    const toRemove = starred.slice(MAX_HISTORY_ITEMS);
    toRemove.forEach(r => {
      const index = history.findIndex(h => h.id === r.id);
      if (index >= 0) history.splice(index, 1);
    });
  } else {
    // 刪除未 star 的記錄，直到總數不超過限制
    unstarred.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)); // 最舊的優先刪除
    while (history.length > MAX_HISTORY_ITEMS && unstarred.length > 0) {
      const toRemove = unstarred.shift();
      const index = history.findIndex(h => h.id === toRemove.id);
      if (index >= 0) history.splice(index, 1);
    }
  }
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
 * 切換歷史記錄的 star 狀態
 * @param {string} id - 記錄 ID
 * @returns {boolean} 新的 star 狀態，如果達到上限則返回 false
 */
export function toggleStar(id) {
  const history = getHistory();
  const record = history.find(r => r.id === id);
  
  if (!record) {
    return false;
  }
  
  // 如果要 star，檢查是否已達到上限
  if (!record.starred) {
    const starredCount = history.filter(r => r.starred === true).length;
    if (starredCount >= MAX_STARRED_ITEMS) {
      return false; // 已達到上限
    }
  }
  
  // 切換 star 狀態
  record.starred = !record.starred;
  storage.set(HISTORY_KEY, history);
  return record.starred;
}

/**
 * 取得已 star 的記錄數量
 * @returns {number} star 的記錄數量
 */
export function getStarredCount() {
  const history = getHistory();
  return history.filter(r => r.starred === true).length;
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

