/**
 * Cron 執行時間計算器
 */
import { parseCronExpression, matchesCronField } from './cron-parser.js';

/**
 * 計算下一次執行時間
 * @param {string} expression - Cron 表達式
 * @param {Date} [fromDate] - 起始時間（預設為現在）
 * @returns {Date|null}
 */
export function getNextExecution(expression, fromDate = new Date()) {
  const parsed = parseCronExpression(expression);
  if (!parsed.isValid) {
    return null;
  }

  const { fields } = parsed;
  let current = new Date(fromDate);
  
  // 從下一分鐘開始
  current.setSeconds(0, 0);
  current.setMinutes(current.getMinutes() + 1);

  // 最多嘗試 8 年（處理每年執行一次的情況）
  const maxAttempts = 8 * 365 * 24 * 60;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const minute = current.getMinutes();
    const hour = current.getHours();
    const day = current.getDate();
    const month = current.getMonth() + 1; // JavaScript 月份是 0-11
    let weekday = current.getDay(); // 0 = 週日

    // 檢查月份
    if (!matchesCronField(fields.month, month, 1, 12)) {
      current = nextMonth(current);
      attempts++;
      continue;
    }

    // 檢查日期
    if (!matchesCronField(fields.day, day, 1, 31)) {
      current = nextDay(current);
      attempts++;
      continue;
    }

    // 檢查星期（matchesCronField 已處理 0 和 7 都代表週日的情況）
    if (!matchesCronField(fields.weekday, weekday, 0, 7)) {
      current = nextDay(current);
      attempts++;
      continue;
    }

    // 檢查小時
    if (!matchesCronField(fields.hour, hour, 0, 23)) {
      current = nextHour(current);
      attempts++;
      continue;
    }

    // 檢查分鐘
    if (!matchesCronField(fields.minute, minute, 0, 59)) {
      current = nextMinute(current);
      attempts++;
      continue;
    }

    // 所有欄位都匹配
    return current;
  }

  return null; // 找不到匹配的時間
}

/**
 * 計算未來 N 次執行時間
 * @param {string} expression - Cron 表達式
 * @param {number} count - 執行次數
 * @param {Date} [fromDate] - 起始時間
 * @returns {Date[]}
 */
export function getFutureExecutions(expression, count = 10, fromDate = new Date()) {
  const executions = [];
  let current = fromDate;

  for (let i = 0; i < count; i++) {
    const next = getNextExecution(expression, current);
    if (!next) break;
    
    executions.push(next);
    current = new Date(next.getTime() + 1000); // 從下一秒開始
  }

  return executions;
}

/**
 * 格式化日期時間
 * @param {Date} date
 * @returns {string}
 */
export function formatDateTime(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

/**
 * 取得相對時間描述
 * @param {Date} date
 * @returns {string}
 */
export function getRelativeTime(date) {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return '今天';
  if (days === 1) return '明天';
  if (days === 2) return '後天';
  if (days === -1) return '昨天';
  if (days > 0 && days < 7) return `${days} 天後`;
  if (days < 0 && days > -7) return `${Math.abs(days)} 天前`;
  
  const weekdayNames = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
  return weekdayNames[date.getDay()];
}

// 輔助函式：下一個分鐘
function nextMinute(date) {
  const next = new Date(date);
  next.setMinutes(next.getMinutes() + 1);
  return next;
}

// 輔助函式：下一個小時
function nextHour(date) {
  const next = new Date(date);
  next.setHours(next.getHours() + 1);
  next.setMinutes(0);
  return next;
}

// 輔助函式：下一天
function nextDay(date) {
  const next = new Date(date);
  next.setDate(next.getDate() + 1);
  next.setHours(0);
  next.setMinutes(0);
  return next;
}

// 輔助函式：下一個月
function nextMonth(date) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + 1);
  next.setDate(1);
  next.setHours(0);
  next.setMinutes(0);
  return next;
}

