/**
 * Toast 通知元件
 */

let toastTimeout = null;

/**
 * 顯示 Toast 通知
 * @param {string} message - 訊息內容
 * @param {'success' | 'error' | 'warning' | 'info'} [type='success'] - 類型
 * @param {number} [duration=2500] - 顯示時間（毫秒）
 */
export function showToast(message, type = 'success', duration = 2500) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  // 清除之前的 Toast
  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  // 移除現有的 Toast
  const existingToast = container.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }

  // 圖標對應
  const icons = {
    success: 'check_circle',
    error: 'error',
    warning: 'warning',
    info: 'info'
  };

  // 建立 Toast 元素
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="material-icons-round">${icons[type] || icons.info}</span>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  // 觸發動畫
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // 自動隱藏
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/**
 * HTML 轉義
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

