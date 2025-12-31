/**
 * QR Code Utility
 * QR Code 生成工具
 * 使用 qrcodejs 庫 (https://github.com/davidshimjs/qrcodejs)
 */

import { generateJoinUrl } from './clipboard.js';

/**
 * 生成 QR Code
 * @param {HTMLElement} container - 容器元素
 * @param {string} text - 要編碼的文字
 * @param {Object} options - 選項
 * @returns {QRCode|null}
 */
export function generateQRCode(container, text, options = {}) {
  const defaultOptions = {
    width: 180,
    height: 180,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: 2 // QRCode.CorrectLevel.M
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  // 清空容器
  container.innerHTML = '';
  
  // 使用 QRCode.js 生成 QR Code
  if (typeof QRCode !== 'undefined') {
    try {
      const qrcode = new QRCode(container, {
        text: text,
        width: mergedOptions.width,
        height: mergedOptions.height,
        colorDark: mergedOptions.colorDark,
        colorLight: mergedOptions.colorLight,
        correctLevel: mergedOptions.correctLevel
      });
      
      // 設定樣式
      const canvas = container.querySelector('canvas');
      const img = container.querySelector('img');
      
      if (canvas) {
        canvas.style.borderRadius = '8px';
        canvas.style.display = 'block';
        canvas.style.margin = '0 auto';
      }
      
      if (img) {
        img.style.borderRadius = '8px';
        img.style.display = 'block';
        img.style.margin = '0 auto';
      }
      
      return qrcode;
    } catch (err) {
      console.error('QRCode generation failed:', err);
      container.innerHTML = `<p class="text-error">QR Code 生成失敗</p>`;
      return null;
    }
  } else {
    console.error('QRCode library not loaded');
    container.innerHTML = `<p class="text-error">QR Code 庫未載入</p>`;
    return null;
  }
}

/**
 * 生成會議加入 QR Code
 * @param {HTMLElement} container - 容器元素
 * @param {string} meetingId - 會議 ID
 * @param {Object} options - 選項
 * @returns {QRCode|null}
 */
export function generateMeetingQRCode(container, meetingId, options = {}) {
  const joinUrl = generateJoinUrl(meetingId);
  
  // 根據主題調整顏色
  const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
  const themeOptions = isDarkTheme
    ? { colorDark: '#1e1e2e', colorLight: '#e2e8f0' }
    : { colorDark: '#1a1a2e', colorLight: '#ffffff' };
  
  return generateQRCode(container, joinUrl, { ...themeOptions, ...options });
}

/**
 * 更新 QR Code 主題
 * @param {HTMLElement} container - 容器元素
 * @param {string} meetingId - 會議 ID
 */
export function updateQRCodeTheme(container, meetingId) {
  return generateMeetingQRCode(container, meetingId);
}
