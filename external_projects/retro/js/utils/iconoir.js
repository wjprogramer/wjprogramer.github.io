// Iconoir SVG 圖標輔助函數（帶 stroke-width 控制）
// 使用 inline SVG 以支援自訂 stroke-width

/**
 * 生成 Iconoir 圖標的 SVG
 * @param {string} iconName - 圖標名稱
 * @param {number} strokeWidth - 線條粗細，預設 2.5
 * @param {number} size - 圖標大小，預設 20
 * @returns {string} SVG HTML 字串
 */
export function getIconoirIcon(iconName, strokeWidth = 2.5, size = 20) {
  const icons = {
    eye: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" stroke-width="${strokeWidth}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 13C6.6 5 17.4 5 21 13" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 17C10.3431 17 9 15.6569 9 14C9 12.3431 10.3431 11 12 11C13.6569 11 15 12.3431 15 14C15 15.6569 13.6569 17 12 17Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    download: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" stroke-width="${strokeWidth}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 20L18 20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 4V16M12 16L15.5 12.5M12 16L8.5 12.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    trash: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" stroke-width="${strokeWidth}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    edit: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" stroke-width="${strokeWidth}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8945 3.39052 18.6756 4.17157L19.8284 5.32437C20.6095 6.10542 20.6095 7.37577 19.8284 8.15682L18.3484 9.63682M14.3632 5.65156L4.74749 15.2673C4.41534 15.5994 4.21079 16.0376 4.16993 16.5054L3.92738 19.2459C3.87255 19.8659 4.37348 20.3668 4.99351 20.312L7.73397 20.0694C8.20172 20.0286 8.63988 19.824 8.97203 19.4919L18.5878 9.87619M14.3632 5.65156L18.5878 9.87619" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    link: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" stroke-width="${strokeWidth}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 17H7C4.23858 17 2 14.7614 2 12C2 9.23858 4.23858 7 7 7H9M15 17H17C19.7614 17 22 14.7614 22 12C22 9.23858 19.7614 7 17 7H15M8 12H16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    qrCode: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" stroke-width="${strokeWidth}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7V3H7M21 7V3H17M7 21H3V17M17 21H21V17M7 3H17M7 21H17M3 12H21M12 3V21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 7H10V10H7V7Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 7H17V10H14V7Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 14H10V17H7V14Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    cancel: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" stroke-width="${strokeWidth}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    plus: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" stroke-width="${strokeWidth}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5V19M5 12H19" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  };

  return icons[iconName] || '';
}

/**
 * 便捷函數：快速獲取常用圖標
 */
export const iconoirIcons = {
  eye: (strokeWidth = 2.5, size = 20) => getIconoirIcon('eye', strokeWidth, size),
  download: (strokeWidth = 2.5, size = 20) => getIconoirIcon('download', strokeWidth, size),
  trash: (strokeWidth = 2.5, size = 20) => getIconoirIcon('trash', strokeWidth, size),
  edit: (strokeWidth = 2.5, size = 20) => getIconoirIcon('edit', strokeWidth, size),
  link: (strokeWidth = 2.5, size = 20) => getIconoirIcon('link', strokeWidth, size),
  qrCode: (strokeWidth = 2.5, size = 20) => getIconoirIcon('qrCode', strokeWidth, size),
  cancel: (strokeWidth = 2.5, size = 20) => getIconoirIcon('cancel', strokeWidth, size),
  plus: (strokeWidth = 2.5, size = 20) => getIconoirIcon('plus', strokeWidth, size)
};
