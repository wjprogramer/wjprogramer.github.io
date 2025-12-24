/**
 * 色彩格式轉換工具
 */
import {
  hexToRgb,
  rgbToHex,
  hexToHsl,
  hslToHex,
  rgbToHsl,
  hslToRgb,
  parseRgb,
  parseHsl,
  formatRgb,
  formatHsl,
  isValidHex,
  isValidRgb,
  isValidHsl
} from '../../utils/color-converter.js';
import { copyToClipboard } from '../../utils/clipboard.js';
import { showToast } from '../../components/toast.js';

/**
 * 渲染色彩格式轉換頁面
 */
export function renderColorConverter() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="tool-panel glass fade-in-up">
      <div class="panel-header">
        <h2 class="panel-title">
          <span class="icon">🎨</span>
          色彩格式轉換
        </h2>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: var(--spacing-md); margin-bottom: var(--spacing-lg);">
        <!-- HEX -->
        <div class="input-group">
          <label class="input-label">HEX</label>
          <div style="display: flex; gap: var(--spacing-sm); align-items: center;">
            <input 
              type="text" 
              id="color-hex" 
              class="glass-input" 
              placeholder="#FF5733"
              style="flex: 1; font-family: var(--font-mono);"
            >
            <input 
              type="color" 
              id="color-picker" 
              style="width: 50px; height: 40px; border-radius: var(--glass-radius-xs); cursor: pointer; border: 1px solid var(--glass-border);"
            >
          </div>
        </div>

        <!-- RGB -->
        <div class="input-group">
          <label class="input-label">RGB</label>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: var(--spacing-xs);">
            <input 
              type="number" 
              id="color-r" 
              class="glass-input" 
              placeholder="R"
              min="0"
              max="255"
              style="font-family: var(--font-mono);"
            >
            <input 
              type="number" 
              id="color-g" 
              class="glass-input" 
              placeholder="G"
              min="0"
              max="255"
              style="font-family: var(--font-mono);"
            >
            <input 
              type="number" 
              id="color-b" 
              class="glass-input" 
              placeholder="B"
              min="0"
              max="255"
              style="font-family: var(--font-mono);"
            >
          </div>
        </div>

        <!-- HSL -->
        <div class="input-group">
          <label class="input-label">HSL</label>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: var(--spacing-xs);">
            <input 
              type="number" 
              id="color-h" 
              class="glass-input" 
              placeholder="H"
              min="0"
              max="360"
              style="font-family: var(--font-mono);"
            >
            <input 
              type="number" 
              id="color-s" 
              class="glass-input" 
              placeholder="S"
              min="0"
              max="100"
              style="font-family: var(--font-mono);"
            >
            <input 
              type="number" 
              id="color-l" 
              class="glass-input" 
              placeholder="L"
              min="0"
              max="100"
              style="font-family: var(--font-mono);"
            >
          </div>
        </div>
      </div>

      <!-- 顏色預覽 -->
      <div class="input-group">
        <label class="input-label">顏色預覽</label>
        <div class="glass" style="padding: var(--spacing-lg); border-radius: var(--glass-radius-sm); text-align: center;">
          <div 
            id="color-preview" 
            style="width: 100%; height: 120px; border-radius: var(--glass-radius-sm); margin-bottom: var(--spacing-md); border: 2px solid var(--glass-border); transition: var(--transition-normal);"
          ></div>
          <div style="display: flex; gap: var(--spacing-sm); justify-content: center; flex-wrap: wrap;">
            <button id="copy-hex" class="glass-btn">
              <span class="material-icons-round">content_copy</span>
              複製 HEX
            </button>
            <button id="copy-rgb" class="glass-btn">
              <span class="material-icons-round">content_copy</span>
              複製 RGB
            </button>
            <button id="copy-hsl" class="glass-btn">
              <span class="material-icons-round">content_copy</span>
              複製 HSL
            </button>
          </div>
        </div>
      </div>

      <!-- 詳細資訊 -->
      <div class="input-group" id="color-info" style="display: none;">
        <label class="input-label">詳細資訊</label>
        <div class="glass" style="padding: var(--spacing-md); border-radius: var(--glass-radius-sm);">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-md); font-size: var(--text-sm);">
            <div>
              <div style="color: var(--text-secondary); margin-bottom: var(--spacing-xs);">HEX</div>
              <div id="info-hex" style="font-family: var(--font-mono); font-weight: var(--font-medium);"></div>
            </div>
            <div>
              <div style="color: var(--text-secondary); margin-bottom: var(--spacing-xs);">RGB</div>
              <div id="info-rgb" style="font-family: var(--font-mono); font-weight: var(--font-medium);"></div>
            </div>
            <div>
              <div style="color: var(--text-secondary); margin-bottom: var(--spacing-xs);">HSL</div>
              <div id="info-hsl" style="font-family: var(--font-mono); font-weight: var(--font-medium);"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <button id="color-clear" class="glass-btn lg">
          <span class="material-icons-round">delete_outline</span>
          清除
        </button>
      </div>
    </div>
  `;

  // 綁定事件
  initColorConverterEvents();
}

/**
 * 初始化事件
 */
function initColorConverterEvents() {
  const hexInput = document.getElementById('color-hex');
  const rInput = document.getElementById('color-r');
  const gInput = document.getElementById('color-g');
  const bInput = document.getElementById('color-b');
  const hInput = document.getElementById('color-h');
  const sInput = document.getElementById('color-s');
  const lInput = document.getElementById('color-l');
  const colorPicker = document.getElementById('color-picker');
  const preview = document.getElementById('color-preview');
  const infoDiv = document.getElementById('color-info');
  const infoHex = document.getElementById('info-hex');
  const infoRgb = document.getElementById('info-rgb');
  const infoHsl = document.getElementById('info-hsl');
  const copyHexBtn = document.getElementById('copy-hex');
  const copyRgbBtn = document.getElementById('copy-rgb');
  const copyHslBtn = document.getElementById('copy-hsl');
  const clearBtn = document.getElementById('color-clear');

  let currentColor = { hex: '#FF5733', rgb: { r: 255, g: 87, b: 51 }, hsl: { h: 9, s: 100, l: 60 } };

  // HEX 輸入
  hexInput?.addEventListener('input', () => {
    const hex = hexInput.value.trim();
    if (!hex) return;

    if (!isValidHex(hex)) {
      return;
    }

    const rgb = hexToRgb(hex);
    if (!rgb) return;

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    updateColor({ hex, rgb, hsl });
  });

  // RGB 輸入
  [rInput, gInput, bInput].forEach((input, index) => {
    input?.addEventListener('input', () => {
      const r = parseInt(rInput.value) || 0;
      const g = parseInt(gInput.value) || 0;
      const b = parseInt(bInput.value) || 0;

      if (!isValidRgb(r, g, b)) return;

      const hex = rgbToHex(r, g, b);
      const hsl = rgbToHsl(r, g, b);
      updateColor({ hex, rgb: { r, g, b }, hsl });
    });
  });

  // HSL 輸入
  [hInput, sInput, lInput].forEach((input) => {
    input?.addEventListener('input', () => {
      const h = parseInt(hInput.value) || 0;
      const s = parseInt(sInput.value) || 0;
      const l = parseInt(lInput.value) || 0;

      if (!isValidHsl(h, s, l)) return;

      const hex = hslToHex(h, s, l);
      const rgb = hslToRgb(h, s, l);
      updateColor({ hex, rgb, hsl: { h, s, l } });
    });
  });

  // 顏色選擇器
  colorPicker?.addEventListener('input', (e) => {
    const hex = e.target.value;
    hexInput.value = hex;
    const rgb = hexToRgb(hex);
    if (!rgb) return;
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    updateColor({ hex, rgb, hsl });
  });

  // 更新顏色
  function updateColor(color) {
    currentColor = color;

    // 更新輸入框
    hexInput.value = color.hex;
    rInput.value = color.rgb.r;
    gInput.value = color.rgb.g;
    bInput.value = color.rgb.b;
    hInput.value = color.hsl.h;
    sInput.value = color.hsl.s;
    lInput.value = color.hsl.l;
    colorPicker.value = color.hex;

    // 更新預覽
    preview.style.backgroundColor = color.hex;

    // 更新詳細資訊
    infoHex.textContent = color.hex.toUpperCase();
    infoRgb.textContent = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
    infoHsl.textContent = `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`;
    infoDiv.style.display = 'block';
  }

  // 複製 HEX
  copyHexBtn?.addEventListener('click', () => {
    copyToClipboard(currentColor.hex.toUpperCase(), 'HEX 已複製');
  });

  // 複製 RGB
  copyRgbBtn?.addEventListener('click', () => {
    const rgb = `rgb(${currentColor.rgb.r}, ${currentColor.rgb.g}, ${currentColor.rgb.b})`;
    copyToClipboard(rgb, 'RGB 已複製');
  });

  // 複製 HSL
  copyHslBtn?.addEventListener('click', () => {
    const hsl = `hsl(${currentColor.hsl.h}, ${currentColor.hsl.s}%, ${currentColor.hsl.l}%)`;
    copyToClipboard(hsl, 'HSL 已複製');
  });

  // 清除
  clearBtn?.addEventListener('click', () => {
    hexInput.value = '';
    rInput.value = '';
    gInput.value = '';
    bInput.value = '';
    hInput.value = '';
    sInput.value = '';
    lInput.value = '';
    preview.style.backgroundColor = 'transparent';
    infoDiv.style.display = 'none';
    showToast('已清除', 'info');
  });

  // 初始化預設顏色
  updateColor(currentColor);
}


