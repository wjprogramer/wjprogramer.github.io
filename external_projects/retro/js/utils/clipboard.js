// 剪貼簿操作
import { Toast } from '../components/Toast.js';
import { t } from './i18n.js';

export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      Toast.success(t('common.copied'));
      return true;
    } else {
      // 降級方案
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      Toast.success(t('common.copied'));
      return true;
    }
  } catch (error) {
    console.error('Failed to copy:', error);
    Toast.error(t('common.error'));
    return false;
  }
}

