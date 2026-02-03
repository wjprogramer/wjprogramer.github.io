// 時間格式化工具
// 用於顯示相對時間和絕對時間，支援動態更新
import { t } from './i18n.js';

const RELATIVE_TIME_THRESHOLD = 60 * 60 * 1000; // 1 小時（毫秒）

/**
 * 格式化時間戳記為相對時間或絕對時間
 * @param {number} timestamp - 時間戳記（毫秒）
 * @param {boolean} forceAbsolute - 是否強制顯示絕對時間（非 P2P 模式）
 * @returns {{text: string, isRelative: boolean, absoluteTime: string}}
 */
export function formatTime(timestamp, forceAbsolute = false) {
  const now = Date.now();
  const diff = now - timestamp;
  
  // 計算絕對時間（用於顯示和 tooltip）
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateHours = String(date.getHours()).padStart(2, '0');
  const dateMinutes = String(date.getMinutes()).padStart(2, '0');
  const absoluteTime = `${year}-${month}-${day} ${dateHours}:${dateMinutes}`;
  
  // 如果強制絕對時間或超過閾值，顯示絕對時間
  if (forceAbsolute || diff > RELATIVE_TIME_THRESHOLD) {
    return {
      text: absoluteTime,
      isRelative: false,
      absoluteTime
    };
  }
  
  // 顯示相對時間
  const seconds = Math.floor(diff / 1000);
  const diffMinutes = Math.floor(seconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const days = Math.floor(diffHours / 24);
  
  let relativeText = '';
  if (days > 0) {
    relativeText = t('time.daysAgo', { days });
  } else if (diffHours > 0) {
    relativeText = t('time.hoursAgo', { hours: diffHours });
  } else if (diffMinutes > 0) {
    relativeText = t('time.minutesAgo', { minutes: diffMinutes });
  } else {
    relativeText = t('time.justNow');
  }
  
  return {
    text: relativeText,
    isRelative: true,
    absoluteTime
  };
}

/**
 * 更新時間顯示元素（只更新文字內容，不重新 render）
 * @param {HTMLElement} element - 時間顯示元素
 * @param {number} timestamp - 時間戳記（毫秒）
 * @param {boolean} forceAbsolute - 是否強制顯示絕對時間
 */
export function updateTimeElement(element, timestamp, forceAbsolute = false) {
  const timeData = formatTime(timestamp, forceAbsolute);
  element.textContent = timeData.text;
  
  if (timeData.isRelative) {
    element.setAttribute('title', timeData.absoluteTime);
    element.setAttribute('data-timestamp', timestamp.toString());
  } else {
    element.removeAttribute('title');
    element.removeAttribute('data-timestamp');
  }
}

/**
 * 初始化時間更新器（P2P 模式下定期更新相對時間）
 * @param {HTMLElement} container - 包含時間元素的容器
 * @param {number} interval - 更新間隔（毫秒），預設 30 秒
 * @returns {Function} 清理函數，用於停止更新
 */
export function initTimeUpdater(container, interval = 30000) {
  let updateIntervalId = null;
  
  const updateAllTimes = () => {
    const timeElements = container.querySelectorAll('[data-timestamp]');
    timeElements.forEach(element => {
      const timestamp = parseInt(element.getAttribute('data-timestamp'), 10);
      if (!isNaN(timestamp)) {
        updateTimeElement(element, timestamp, false);
      }
    });
  };
  
  // 立即更新一次
  updateAllTimes();
  
  // 定期更新
  updateIntervalId = setInterval(updateAllTimes, interval);
  
  // 返回清理函數
  return () => {
    if (updateIntervalId) {
      clearInterval(updateIntervalId);
      updateIntervalId = null;
    }
  };
}
