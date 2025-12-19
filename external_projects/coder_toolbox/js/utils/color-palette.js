/**
 * 調色盤生成工具
 */
import { hexToHsl, hslToHex, hslToRgb, hexToRgb, rgbToHex } from './color-converter.js';

/**
 * 生成調色盤
 * @param {string} baseColor - 基礎顏色（HEX）
 * @param {string} type - 調色盤類型
 * @returns {Array<{hex: string, rgb: string, hsl: string, name: string}>}
 */
export function generatePalette(baseColor, type = 'monochromatic') {
  const hsl = hexToHsl(baseColor);
  if (!hsl) return [];

  switch (type) {
    case 'monochromatic':
      return generateMonochromatic(hsl);
    case 'complementary':
      return generateComplementary(hsl);
    case 'triadic':
      return generateTriadic(hsl);
    case 'tetradic':
      return generateTetradic(hsl);
    case 'analogous':
      return generateAnalogous(hsl);
    case 'split-complementary':
      return generateSplitComplementary(hsl);
    default:
      return generateMonochromatic(hsl);
  }
}

/**
 * 單色調色盤（不同亮度）
 */
function generateMonochromatic(hsl) {
  const colors = [];
  const steps = [90, 80, 70, 60, 50, 40, 30, 20, 10];
  
  for (const lightness of steps) {
    const hex = hslToHex(hsl.h, hsl.s, lightness);
    const rgb = hslToRgb(hsl.h, hsl.s, lightness);
    colors.push({
      hex,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${lightness}%)`,
      name: `L${lightness}`
    });
  }
  
  return colors;
}

/**
 * 互補色調色盤
 */
function generateComplementary(hsl) {
  const h1 = hsl.h;
  const h2 = (h1 + 180) % 360;
  
  return [
    {
      hex: hslToHex(h1, hsl.s, hsl.l),
      rgb: formatRgbFromHsl(h1, hsl.s, hsl.l),
      hsl: `hsl(${h1}, ${hsl.s}%, ${hsl.l}%)`,
      name: '主色'
    },
    {
      hex: hslToHex(h2, hsl.s, hsl.l),
      rgb: formatRgbFromHsl(h2, hsl.s, hsl.l),
      hsl: `hsl(${h2}, ${hsl.s}%, ${hsl.l}%)`,
      name: '互補色'
    }
  ];
}

/**
 * 三色調色盤
 */
function generateTriadic(hsl) {
  const h1 = hsl.h;
  const h2 = (h1 + 120) % 360;
  const h3 = (h1 + 240) % 360;
  
  return [
    {
      hex: hslToHex(h1, hsl.s, hsl.l),
      rgb: formatRgbFromHsl(h1, hsl.s, hsl.l),
      hsl: `hsl(${h1}, ${hsl.s}%, ${hsl.l}%)`,
      name: '主色'
    },
    {
      hex: hslToHex(h2, hsl.s, hsl.l),
      rgb: formatRgbFromHsl(h2, hsl.s, hsl.l),
      hsl: `hsl(${h2}, ${hsl.s}%, ${hsl.l}%)`,
      name: '色相+120°'
    },
    {
      hex: hslToHex(h3, hsl.s, hsl.l),
      rgb: formatRgbFromHsl(h3, hsl.s, hsl.l),
      hsl: `hsl(${h3}, ${hsl.s}%, ${hsl.l}%)`,
      name: '色相+240°'
    }
  ];
}

/**
 * 四色調色盤
 */
function generateTetradic(hsl) {
  const h1 = hsl.h;
  const h2 = (h1 + 90) % 360;
  const h3 = (h1 + 180) % 360;
  const h4 = (h1 + 270) % 360;
  
  return [
    {
      hex: hslToHex(h1, hsl.s, hsl.l),
      rgb: formatRgbFromHsl(h1, hsl.s, hsl.l),
      hsl: `hsl(${h1}, ${hsl.s}%, ${hsl.l}%)`,
      name: '主色'
    },
    {
      hex: hslToHex(h2, hsl.s, hsl.l),
      rgb: formatRgbFromHsl(h2, hsl.s, hsl.l),
      hsl: `hsl(${h2}, ${hsl.s}%, ${hsl.l}%)`,
      name: '色相+90°'
    },
    {
      hex: hslToHex(h3, hsl.s, hsl.l),
      rgb: formatRgbFromHsl(h3, hsl.s, hsl.l),
      hsl: `hsl(${h3}, ${hsl.s}%, ${hsl.l}%)`,
      name: '色相+180°'
    },
    {
      hex: hslToHex(h4, hsl.s, hsl.l),
      rgb: formatRgbFromHsl(h4, hsl.s, hsl.l),
      hsl: `hsl(${h4}, ${hsl.s}%, ${hsl.l}%)`,
      name: '色相+270°'
    }
  ];
}

/**
 * 類似色調色盤
 */
function generateAnalogous(hsl) {
  const colors = [];
  const baseH = hsl.h;
  
  for (let i = -2; i <= 2; i++) {
    const h = (baseH + i * 30 + 360) % 360;
    const hex = hslToHex(h, hsl.s, hsl.l);
    const rgb = hslToRgb(h, hsl.s, hsl.l);
    colors.push({
      hex,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${h}, ${hsl.s}%, ${hsl.l}%)`,
      name: i === 0 ? '主色' : `色相${i > 0 ? '+' : ''}${i * 30}°`
    });
  }
  
  return colors;
}

/**
 * 分離互補色調色盤
 */
function generateSplitComplementary(hsl) {
  const h1 = hsl.h;
  const h2 = (h1 + 150) % 360;
  const h3 = (h1 + 210) % 360;
  
  return [
    {
      hex: hslToHex(h1, hsl.s, hsl.l),
      rgb: formatRgbFromHsl(h1, hsl.s, hsl.l),
      hsl: `hsl(${h1}, ${hsl.s}%, ${hsl.l}%)`,
      name: '主色'
    },
    {
      hex: hslToHex(h2, hsl.s, hsl.l),
      rgb: formatRgbFromHsl(h2, hsl.s, hsl.l),
      hsl: `hsl(${h2}, ${hsl.s}%, ${hsl.l}%)`,
      name: '色相+150°'
    },
    {
      hex: hslToHex(h3, hsl.s, hsl.l),
      rgb: formatRgbFromHsl(h3, hsl.s, hsl.l),
      hsl: `hsl(${h3}, ${hsl.s}%, ${hsl.l}%)`,
      name: '色相+210°'
    }
  ];
}

/**
 * 格式化 RGB 從 HSL
 */
function formatRgbFromHsl(h, s, l) {
  const rgb = hslToRgb(h, s, l);
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

/**
 * 生成漸層調色盤
 * @param {string} startColor - 起始顏色（HEX）
 * @param {string} endColor - 結束顏色（HEX）
 * @param {number} steps - 步數
 * @returns {Array<{hex: string, rgb: string}>}
 */
export function generateGradient(startColor, endColor, steps = 10) {
  const startRgb = hexToRgb(startColor);
  const endRgb = hexToRgb(endColor);
  
  if (!startRgb || !endRgb) return [];
  
  const colors = [];
  
  for (let i = 0; i < steps; i++) {
    const ratio = i / (steps - 1);
    const r = Math.round(startRgb.r + (endRgb.r - startRgb.r) * ratio);
    const g = Math.round(startRgb.g + (endRgb.g - startRgb.g) * ratio);
    const b = Math.round(startRgb.b + (endRgb.b - startRgb.b) * ratio);
    
    const hex = rgbToHex(r, g, b);
    colors.push({
      hex,
      rgb: `rgb(${r}, ${g}, ${b})`
    });
  }
  
  return colors;
}

/**
 * 生成隨機調色盤
 * @param {number} count - 顏色數量
 * @returns {Array<{hex: string, rgb: string, hsl: string}>}
 */
export function generateRandomPalette(count = 5) {
  const colors = [];
  
  for (let i = 0; i < count; i++) {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 40) + 60; // 60-100%
    const l = Math.floor(Math.random() * 30) + 50; // 50-80%
    
    const hex = hslToHex(h, s, l);
    const rgb = hslToRgb(h, s, l);
    
    colors.push({
      hex,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${h}, ${s}%, ${l}%)`
    });
  }
  
  return colors;
}

