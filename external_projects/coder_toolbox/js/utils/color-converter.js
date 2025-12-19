/**
 * 色彩格式轉換工具
 */

/**
 * HEX 轉 RGB
 * @param {string} hex - HEX 顏色（例如：#FF5733 或 FF5733）
 * @returns {{r: number, g: number, b: number}|null}
 */
export function hexToRgb(hex) {
  // 移除 # 符號
  hex = hex.replace('#', '');
  
  // 處理 3 位數 HEX（例如：#F53 -> #FF5533）
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  
  if (hex.length !== 6) {
    return null;
  }
  
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return null;
  }
  
  return { r, g, b };
}

/**
 * RGB 轉 HEX
 * @param {number} r - 紅色 (0-255)
 * @param {number} g - 綠色 (0-255)
 * @param {number} b - 藍色 (0-255)
 * @param {boolean} [includeHash=true] - 是否包含 # 符號
 * @returns {string}
 */
export function rgbToHex(r, g, b, includeHash = true) {
  r = Math.max(0, Math.min(255, Math.round(r)));
  g = Math.max(0, Math.min(255, Math.round(g)));
  b = Math.max(0, Math.min(255, Math.round(b)));
  
  const hex = [r, g, b]
    .map(x => x.toString(16).padStart(2, '0').toUpperCase())
    .join('');
  
  return includeHash ? `#${hex}` : hex;
}

/**
 * RGB 轉 HSL
 * @param {number} r - 紅色 (0-255)
 * @param {number} g - 綠色 (0-255)
 * @param {number} b - 藍色 (0-255)
 * @returns {{h: number, s: number, l: number}}
 */
export function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0; // 無色
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

/**
 * HSL 轉 RGB
 * @param {number} h - 色相 (0-360)
 * @param {number} s - 飽和度 (0-100)
 * @param {number} l - 亮度 (0-100)
 * @returns {{r: number, g: number, b: number}}
 */
export function hslToRgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  
  let r, g, b;
  
  if (s === 0) {
    r = g = b = l; // 無色
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

/**
 * HEX 轉 HSL
 * @param {string} hex - HEX 顏色
 * @returns {{h: number, s: number, l: number}|null}
 */
export function hexToHsl(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
}

/**
 * HSL 轉 HEX
 * @param {number} h - 色相 (0-360)
 * @param {number} s - 飽和度 (0-100)
 * @param {number} l - 亮度 (0-100)
 * @param {boolean} [includeHash=true] - 是否包含 # 符號
 * @returns {string}
 */
export function hslToHex(h, s, l, includeHash = true) {
  const rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b, includeHash);
}

/**
 * 解析 RGB 字串
 * @param {string} rgbStr - RGB 字串（例如：rgb(255, 87, 51) 或 255, 87, 51）
 * @returns {{r: number, g: number, b: number}|null}
 */
export function parseRgb(rgbStr) {
  const match = rgbStr.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (!match) return null;
  
  const r = parseInt(match[1]);
  const g = parseInt(match[2]);
  const b = parseInt(match[3]);
  
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    return null;
  }
  
  return { r, g, b };
}

/**
 * 解析 HSL 字串
 * @param {string} hslStr - HSL 字串（例如：hsl(9, 100%, 60%) 或 9, 100, 60）
 * @returns {{h: number, s: number, l: number}|null}
 */
export function parseHsl(hslStr) {
  const match = hslStr.match(/(\d+)\s*,\s*(\d+)\s*%?\s*,\s*(\d+)\s*%?/);
  if (!match) return null;
  
  const h = parseInt(match[1]);
  const s = parseInt(match[2]);
  const l = parseInt(match[3]);
  
  if (h < 0 || h > 360 || s < 0 || s > 100 || l < 0 || l > 100) {
    return null;
  }
  
  return { h, s, l };
}

/**
 * 格式化 RGB 字串
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @param {string} [format='rgb'] - 'rgb' 或 'rgb()'
 * @returns {string}
 */
export function formatRgb(r, g, b, format = 'rgb') {
  if (format === 'rgb()') {
    return `rgb(${r}, ${g}, ${b})`;
  }
  return `${r}, ${g}, ${b}`;
}

/**
 * 格式化 HSL 字串
 * @param {number} h
 * @param {number} s
 * @param {number} l
 * @param {string} [format='hsl'] - 'hsl' 或 'hsl()'
 * @returns {string}
 */
export function formatHsl(h, s, l, format = 'hsl') {
  if (format === 'hsl()') {
    return `hsl(${h}, ${s}%, ${l}%)`;
  }
  return `${h}, ${s}, ${l}`;
}

/**
 * 驗證 HEX 顏色
 * @param {string} hex
 * @returns {boolean}
 */
export function isValidHex(hex) {
  return /^#?[0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?$/.test(hex);
}

/**
 * 驗證 RGB 值
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns {boolean}
 */
export function isValidRgb(r, g, b) {
  return r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255;
}

/**
 * 驗證 HSL 值
 * @param {number} h
 * @param {number} s
 * @param {number} l
 * @returns {boolean}
 */
export function isValidHsl(h, s, l) {
  return h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100;
}

