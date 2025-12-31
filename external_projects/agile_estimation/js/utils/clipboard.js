/**
 * Clipboard Utility
 * 剪貼簿操作工具
 */

import { toastSuccess, toastError } from '../components/toast.js';
import { i18n } from './i18n.js';

/**
 * 複製文字到剪貼簿
 * @param {string} text - 要複製的文字
 * @param {boolean} showToast - 是否顯示 Toast 通知
 * @returns {Promise<boolean>} 是否複製成功
 */
export async function copyToClipboard(text, showToast = true) {
  try {
    // 優先使用 Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      if (showToast) {
        toastSuccess(i18n.t('common.copied'));
      }
      return true;
    }
    
    // Fallback: 使用 execCommand
    return fallbackCopyToClipboard(text, showToast);
  } catch (err) {
    console.error('Clipboard API failed:', err);
    // 嘗試 fallback
    return fallbackCopyToClipboard(text, showToast);
  }
}

/**
 * Fallback 複製方法
 * @param {string} text - 要複製的文字
 * @param {boolean} showToast - 是否顯示 Toast 通知
 * @returns {boolean} 是否複製成功
 */
function fallbackCopyToClipboard(text, showToast) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  textarea.style.top = '-9999px';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  
  try {
    textarea.focus();
    textarea.select();
    const success = document.execCommand('copy');
    
    if (success && showToast) {
      toastSuccess(i18n.t('common.copied'));
    } else if (!success && showToast) {
      toastError(i18n.t('common.copyFailed'));
    }
    
    return success;
  } catch (err) {
    console.error('Fallback copy failed:', err);
    if (showToast) {
      toastError(i18n.t('common.copyFailed'));
    }
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
}

/**
 * 生成加入連結
 * @param {string} meetingId - 會議 ID
 * @returns {string} 完整的加入連結
 */
export function generateJoinUrl(meetingId) {
  const baseUrl = window.location.origin + window.location.pathname;
  // 移除 index.html（如果有的話）
  const cleanBaseUrl = baseUrl.replace(/index\.html$/, '');
  return `${cleanBaseUrl}#/join/${meetingId}`;
}

/**
 * 複製加入連結
 * @param {string} meetingId - 會議 ID
 * @returns {Promise<boolean>} 是否複製成功
 */
export async function copyJoinUrl(meetingId) {
  const url = generateJoinUrl(meetingId);
  return copyToClipboard(url);
}

/**
 * 複製會議 ID
 * @param {string} meetingId - 會議 ID
 * @returns {Promise<boolean>} 是否複製成功
 */
export async function copyMeetingId(meetingId) {
  return copyToClipboard(meetingId);
}

