/**
 * Toast Notification Component
 */

const TOAST_DURATION = 3000;

/**
 * 顯示 Toast 通知
 * @param {string} message - 訊息內容
 * @param {string} type - 類型：success, error, warning, info
 * @param {number} duration - 顯示時間（毫秒）
 */
export function showToast(message, type = 'info', duration = TOAST_DURATION) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type} toast-enter`;
  
  // 圖示
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || icons.info}</span>
    <span class="toast-message">${message}</span>
  `;

  container.appendChild(toast);

  // 自動移除
  setTimeout(() => {
    toast.classList.remove('toast-enter');
    toast.classList.add('toast-exit');
    
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
}

/**
 * 成功提示
 * @param {string} message - 訊息內容
 */
export function toastSuccess(message) {
  showToast(message, 'success');
}

/**
 * 錯誤提示
 * @param {string} message - 訊息內容
 */
export function toastError(message) {
  showToast(message, 'error');
}

/**
 * 警告提示
 * @param {string} message - 訊息內容
 */
export function toastWarning(message) {
  showToast(message, 'warning');
}

/**
 * 資訊提示
 * @param {string} message - 訊息內容
 */
export function toastInfo(message) {
  showToast(message, 'info');
}

