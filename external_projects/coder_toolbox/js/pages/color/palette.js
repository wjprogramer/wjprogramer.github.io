/**
 * 調色盤生成工具
 */
import { generatePalette, generateGradient, generateRandomPalette } from '../../utils/color-palette.js';
import { isValidHex } from '../../utils/color-converter.js';
import { copyToClipboard } from '../../utils/clipboard.js';
import { showToast } from '../../components/toast.js';

/**
 * 調色盤類型
 */
const PALETTE_TYPES = [
  { id: 'monochromatic', name: '單色調', icon: '🎨' },
  { id: 'complementary', name: '互補色', icon: '🔄' },
  { id: 'triadic', name: '三色調', icon: '🔺' },
  { id: 'tetradic', name: '四色調', icon: '⬜' },
  { id: 'analogous', name: '類似色', icon: '🌈' },
  { id: 'split-complementary', name: '分離互補色', icon: '🔀' }
];

/**
 * 渲染調色盤生成頁面
 */
export function renderColorPalette() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="tool-panel glass fade-in-up">
      <div class="panel-header">
        <h2 class="panel-title">
          <span class="icon">🎨</span>
          調色盤生成器
        </h2>
      </div>

      <div class="input-group">
        <label class="input-label">基礎顏色</label>
        <div style="display: flex; gap: var(--spacing-sm); align-items: center;">
          <input 
            type="text" 
            id="palette-base-color" 
            class="glass-input" 
            placeholder="#FF5733"
            style="flex: 1; font-family: var(--font-mono);"
            value="#007AFF"
          >
          <input 
            type="color" 
            id="palette-color-picker" 
            value="#007AFF"
            style="width: 50px; height: 40px; border-radius: var(--glass-radius-xs); cursor: pointer; border: 1px solid var(--glass-border);"
          >
          <button id="palette-random" class="glass-btn" title="隨機顏色">
            <span class="material-icons-round">shuffle</span>
          </button>
        </div>
      </div>

      <div class="input-group">
        <label class="input-label">調色盤類型</label>
        <div class="options-row" style="flex-wrap: wrap;">
          ${PALETTE_TYPES.map((type, index) => `
            <label class="glass-option ${index === 0 ? 'active' : ''}" data-type="${type.id}">
              <input type="radio" name="palette-type" value="${type.id}" ${index === 0 ? 'checked' : ''}>
              <span style="font-size: 20px;">${type.icon}</span>
              ${type.name}
            </label>
          `).join('')}
        </div>
      </div>

      <div class="action-buttons">
        <button id="palette-generate" class="glass-btn primary lg">
          <span class="material-icons-round">palette</span>
          生成調色盤
        </button>
        <button id="palette-clear" class="glass-btn lg">
          <span class="material-icons-round">delete_outline</span>
          清除
        </button>
      </div>

      <div class="input-group" id="palette-result" style="display: none;">
        <label class="input-label">調色盤結果</label>
        <div id="palette-colors" class="glass" style="padding: var(--spacing-md); border-radius: var(--glass-radius-sm);"></div>
      </div>

      <!-- 漸層生成器 -->
      <div class="input-group" style="margin-top: var(--spacing-xl);">
        <div class="panel-header" style="margin-bottom: var(--spacing-md);">
          <h3 class="panel-title" style="font-size: var(--text-lg);">
            <span class="icon">🌈</span>
            漸層生成器
          </h3>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-md); margin-bottom: var(--spacing-md);">
          <div>
            <label class="input-label">起始顏色</label>
            <div style="display: flex; gap: var(--spacing-sm); align-items: center;">
              <input 
                type="text" 
                id="gradient-start" 
                class="glass-input" 
                placeholder="#FF5733"
                style="flex: 1; font-family: var(--font-mono);"
                value="#FF5733"
              >
              <input 
                type="color" 
                id="gradient-start-picker" 
                value="#FF5733"
                style="width: 50px; height: 40px; border-radius: var(--glass-radius-xs); cursor: pointer; border: 1px solid var(--glass-border);"
              >
            </div>
          </div>
          <div>
            <label class="input-label">結束顏色</label>
            <div style="display: flex; gap: var(--spacing-sm); align-items: center;">
              <input 
                type="text" 
                id="gradient-end" 
                class="glass-input" 
                placeholder="#33FF57"
                style="flex: 1; font-family: var(--font-mono);"
                value="#33FF57"
              >
              <input 
                type="color" 
                id="gradient-end-picker" 
                value="#33FF57"
                style="width: 50px; height: 40px; border-radius: var(--glass-radius-xs); cursor: pointer; border: 1px solid var(--glass-border);"
              >
            </div>
          </div>
        </div>

        <div class="input-group">
          <label class="input-label">步數</label>
          <input 
            type="number" 
            id="gradient-steps" 
            class="glass-input" 
            value="10"
            min="2"
            max="50"
            style="font-family: var(--font-mono);"
          >
        </div>

        <div class="action-buttons">
          <button id="gradient-generate" class="glass-btn primary">
            <span class="material-icons-round">gradient</span>
            生成漸層
          </button>
        </div>

        <div class="input-group" id="gradient-result" style="display: none; margin-top: var(--spacing-md);">
          <label class="input-label">漸層結果</label>
          <div id="gradient-colors" class="glass" style="padding: var(--spacing-md); border-radius: var(--glass-radius-sm);"></div>
        </div>
      </div>

      <!-- 隨機調色盤 -->
      <div class="input-group" style="margin-top: var(--spacing-xl);">
        <div class="panel-header" style="margin-bottom: var(--spacing-md);">
          <h3 class="panel-title" style="font-size: var(--text-lg);">
            <span class="icon">🎲</span>
            隨機調色盤
          </h3>
        </div>

        <div class="input-group">
          <label class="input-label">顏色數量</label>
          <input 
            type="number" 
            id="random-count" 
            class="glass-input" 
            value="5"
            min="2"
            max="20"
            style="font-family: var(--font-mono);"
          >
        </div>

        <div class="action-buttons">
          <button id="random-generate" class="glass-btn primary">
            <span class="material-icons-round">casino</span>
            生成隨機調色盤
          </button>
        </div>

        <div class="input-group" id="random-result" style="display: none; margin-top: var(--spacing-md);">
          <label class="input-label">隨機調色盤</label>
          <div id="random-colors" class="glass" style="padding: var(--spacing-md); border-radius: var(--glass-radius-sm);"></div>
        </div>
      </div>
    </div>
  `;

  // 綁定事件
  initColorPaletteEvents();
}

/**
 * 初始化事件
 */
function initColorPaletteEvents() {
  const baseColorInput = document.getElementById('palette-base-color');
  const colorPicker = document.getElementById('palette-color-picker');
  const randomColorBtn = document.getElementById('palette-random');
  const generateBtn = document.getElementById('palette-generate');
  const clearBtn = document.getElementById('palette-clear');
  const resultDiv = document.getElementById('palette-result');
  const colorsDiv = document.getElementById('palette-colors');

  const gradientStart = document.getElementById('gradient-start');
  const gradientStartPicker = document.getElementById('gradient-start-picker');
  const gradientEnd = document.getElementById('gradient-end');
  const gradientEndPicker = document.getElementById('gradient-end-picker');
  const gradientSteps = document.getElementById('gradient-steps');
  const gradientGenerateBtn = document.getElementById('gradient-generate');
  const gradientResultDiv = document.getElementById('gradient-result');
  const gradientColorsDiv = document.getElementById('gradient-colors');

  const randomCount = document.getElementById('random-count');
  const randomGenerateBtn = document.getElementById('random-generate');
  const randomResultDiv = document.getElementById('random-result');
  const randomColorsDiv = document.getElementById('random-colors');

  // 調色盤類型選擇
  document.querySelectorAll('.glass-option[data-type]').forEach(option => {
    option.addEventListener('click', () => {
      document.querySelectorAll('.glass-option[data-type]').forEach(o => o.classList.remove('active'));
      option.classList.add('active');
      option.querySelector('input').checked = true;
    });
  });

  // 顏色選擇器同步
  colorPicker?.addEventListener('input', (e) => {
    baseColorInput.value = e.target.value;
  });

  baseColorInput?.addEventListener('input', () => {
    const hex = baseColorInput.value.trim();
    if (isValidHex(hex)) {
      colorPicker.value = hex.startsWith('#') ? hex : `#${hex}`;
    }
  });

  // 隨機顏色
  randomColorBtn?.addEventListener('click', () => {
    const randomHex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
    baseColorInput.value = randomHex;
    colorPicker.value = randomHex;
    showToast('已生成隨機顏色', 'info');
  });

  // 生成調色盤
  generateBtn?.addEventListener('click', () => {
    const hex = baseColorInput.value.trim();
    if (!hex || !isValidHex(hex)) {
      showToast('請輸入有效的 HEX 顏色', 'warning');
      return;
    }

    const type = document.querySelector('input[name="palette-type"]:checked')?.value || 'monochromatic';
    const palette = generatePalette(hex, type);

    if (palette.length === 0) {
      showToast('生成失敗', 'error');
      return;
    }

    displayPalette(palette, colorsDiv);
    resultDiv.style.display = 'block';
    showToast('調色盤生成成功！', 'success');
  });

  // 漸層顏色選擇器同步
  gradientStartPicker?.addEventListener('input', (e) => {
    gradientStart.value = e.target.value;
  });

  gradientEndPicker?.addEventListener('input', (e) => {
    gradientEnd.value = e.target.value;
  });

  gradientStart?.addEventListener('input', () => {
    const hex = gradientStart.value.trim();
    if (isValidHex(hex)) {
      gradientStartPicker.value = hex.startsWith('#') ? hex : `#${hex}`;
    }
  });

  gradientEnd?.addEventListener('input', () => {
    const hex = gradientEnd.value.trim();
    if (isValidHex(hex)) {
      gradientEndPicker.value = hex.startsWith('#') ? hex : `#${hex}`;
    }
  });

  // 生成漸層
  gradientGenerateBtn?.addEventListener('click', () => {
    const start = gradientStart.value.trim();
    const end = gradientEnd.value.trim();
    const steps = parseInt(gradientSteps.value) || 10;

    if (!isValidHex(start) || !isValidHex(end)) {
      showToast('請輸入有效的 HEX 顏色', 'warning');
      return;
    }

    const gradient = generateGradient(start, end, steps);
    displayGradient(gradient, gradientColorsDiv);
    gradientResultDiv.style.display = 'block';
    showToast('漸層生成成功！', 'success');
  });

  // 生成隨機調色盤
  randomGenerateBtn?.addEventListener('click', () => {
    const count = parseInt(randomCount.value) || 5;
    const palette = generateRandomPalette(count);
    displayPalette(palette, randomColorsDiv, false);
    randomResultDiv.style.display = 'block';
    showToast('隨機調色盤生成成功！', 'success');
  });

  // 清除
  clearBtn?.addEventListener('click', () => {
    baseColorInput.value = '#007AFF';
    colorPicker.value = '#007AFF';
    resultDiv.style.display = 'none';
    showToast('已清除', 'info');
  });
}

/**
 * 顯示調色盤
 */
function displayPalette(palette, container, showName = true) {
  container.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: var(--spacing-md);">
      ${palette.map((color, index) => `
        <div class="glass" style="padding: var(--spacing-sm); border-radius: var(--glass-radius-sm); text-align: center; cursor: pointer; transition: var(--transition-normal);" 
             data-color="${color.hex}"
             onmouseover="this.style.transform='scale(1.05)'"
             onmouseout="this.style.transform='scale(1)'">
          <div 
            style="width: 100%; height: 80px; border-radius: var(--glass-radius-xs); margin-bottom: var(--spacing-xs); border: 2px solid var(--glass-border); background: ${color.hex};"
          ></div>
          ${showName ? `<div style="font-size: var(--text-xs); color: var(--text-secondary); margin-bottom: var(--spacing-xs);">${color.name || ''}</div>` : ''}
          <div style="font-family: var(--font-mono); font-size: var(--text-xs); font-weight: var(--font-medium); margin-bottom: var(--spacing-xs);">${color.hex}</div>
          <button class="glass-btn sm copy-color-btn" data-hex="${color.hex}" data-rgb="${color.rgb}" data-hsl="${color.hsl || ''}" style="width: 100%;">
            <span class="material-icons-round" style="font-size: 16px;">content_copy</span>
          </button>
        </div>
      `).join('')}
    </div>
  `;

  // 綁定複製按鈕
  container.querySelectorAll('.copy-color-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const hex = btn.getAttribute('data-hex');
      copyToClipboard(hex, '顏色已複製');
    });
  });

  // 點擊顏色卡片複製
  container.querySelectorAll('[data-color]').forEach(card => {
    card.addEventListener('click', () => {
      const hex = card.getAttribute('data-color');
      copyToClipboard(hex, '顏色已複製');
    });
  });
}

/**
 * 顯示漸層
 */
function displayGradient(gradient, container) {
  container.innerHTML = `
    <div style="display: flex; gap: 2px; margin-bottom: var(--spacing-md); border-radius: var(--glass-radius-xs); overflow: hidden;">
      ${gradient.map(color => `
        <div 
          style="flex: 1; height: 60px; background: ${color.hex}; cursor: pointer; transition: var(--transition-normal);"
          data-color="${color.hex}"
          onmouseover="this.style.transform='scaleY(1.2)'"
          onmouseout="this.style.transform='scaleY(1)'"
        ></div>
      `).join('')}
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: var(--spacing-sm);">
      ${gradient.map((color, index) => `
        <div class="glass" style="padding: var(--spacing-sm); border-radius: var(--glass-radius-xs); text-align: center; cursor: pointer;" data-color="${color.hex}">
          <div 
            style="width: 100%; height: 40px; border-radius: 4px; margin-bottom: var(--spacing-xs); border: 1px solid var(--glass-border); background: ${color.hex};"
          ></div>
          <div style="font-family: var(--font-mono); font-size: var(--text-xs);">${color.hex}</div>
        </div>
      `).join('')}
    </div>
  `;

  // 點擊複製
  container.querySelectorAll('[data-color]').forEach(el => {
    el.addEventListener('click', () => {
      const hex = el.getAttribute('data-color');
      copyToClipboard(hex, '顏色已複製');
    });
  });
}


