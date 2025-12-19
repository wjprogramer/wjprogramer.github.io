/**
 * 剪貼簿操作
 */
import { showToast } from '../components/toast.js';

/**
 * 複製文字到剪貼簿
 * @param {string} text - 要複製的文字
 * @param {string} [successMsg='已複製到剪貼簿'] - 成功訊息
 * @returns {Promise<boolean>}
 */
export async function copyToClipboard(text, successMsg = '已複製到剪貼簿') {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    
    showToast(successMsg, 'success');
    return true;
  } catch (e) {
    console.error('Copy failed:', e);
    showToast('複製失敗', 'error');
    return false;
  }
}

