/**
 * 條碼與 QR Code 生成器
 */
import { copyToClipboard } from '../../utils/clipboard.js';
import { showToast } from '../../components/toast.js';

/**
 * 條碼類型選項
 */
const BARCODE_TYPES = [
  { id: 'CODE128', name: 'CODE-128', description: '最常用的條碼格式，支援 ASCII 字元' },
  { id: 'CODE39', name: 'CODE-39', description: '標準條碼格式' },
  { id: 'EAN13', name: 'EAN-13', description: '歐洲商品編號（13 位）' },
  { id: 'EAN8', name: 'EAN-8', description: '歐洲商品編號（8 位）' },
  { id: 'UPC', name: 'UPC-A', description: '美國商品編號（12 位）' },
  { id: 'ITF14', name: 'ITF-14', description: '交錯式 2 of 5（14 位）' },
  { id: 'codabar', name: 'Codabar', description: '庫德巴條碼' }
];

/**
 * QR Code 容錯等級
 */
const QR_ERROR_LEVELS = [
  { id: 'L', name: 'L（低）', description: '約 7% 的碼字可被恢復' },
  { id: 'M', name: 'M（中）', description: '約 15% 的碼字可被恢復' },
  { id: 'Q', name: 'Q（高）', description: '約 25% 的碼字可被恢復' },
  { id: 'H', name: 'H（最高）', description: '約 30% 的碼字可被恢復' }
];

/**
 * 渲染條碼與 QR Code 生成器頁面
 */
export function renderBarcodeGenerator() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="tool-panel glass fade-in-up">
      <div class="panel-header">
        <h2 class="panel-title">
          <span class="icon">📊</span>
          條碼與 QR Code 生成器
        </h2>
      </div>

      <!-- 標籤切換 -->
      <div class="options-row" style="margin-bottom: var(--spacing-lg);">
        <label class="glass-option active" data-tab="barcode">
          <input type="radio" name="generator-tab" value="barcode" checked>
          <span class="material-icons-round">qr_code_scanner</span>
          生成條碼
        </label>
        <label class="glass-option" data-tab="qrcode">
          <input type="radio" name="generator-tab" value="qrcode">
          <span class="material-icons-round">qr_code</span>
          生成 QR Code
        </label>
      </div>

      <!-- 條碼生成器 -->
      <div id="barcode-tab" class="tab-content">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-lg);">
          <!-- 左側：輸入和設定 -->
          <div>
            <div class="input-group">
              <label class="input-label">條碼內容</label>
              <textarea 
                id="barcode-input" 
                class="glass-textarea" 
                placeholder="請輸入條碼內容，通常是數字或英文字元"
                style="min-height: 100px; font-family: var(--font-mono);"
              >1234567890ABC</textarea>
            </div>

            <div class="input-group">
              <label class="input-label">條碼類型</label>
              <select id="barcode-type" class="glass-input" style="font-family: var(--font-mono);">
                ${BARCODE_TYPES.map(type => `
                  <option value="${type.id}">${type.name} - ${type.description}</option>
                `).join('')}
              </select>
            </div>

            <div class="input-group">
              <label class="input-label">基本設定</label>
              <div class="glass" style="padding: var(--spacing-md); border-radius: var(--glass-radius-sm);">
                <div style="display: grid; gap: var(--spacing-md);">
                  <div>
                    <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--text-secondary); font-size: var(--text-sm);">
                      條形高度: <span id="barcode-height-value">100</span>px
                    </label>
                    <input 
                      type="range" 
                      id="barcode-height" 
                      min="50" 
                      max="500" 
                      value="100"
                      class="glass-slider"
                      style="width: 100%;"
                    >
                  </div>
                  <div>
                    <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--text-secondary); font-size: var(--text-sm);">
                      條形寬度: <span id="barcode-width-value">2</span>px
                    </label>
                    <input 
                      type="range" 
                      id="barcode-width" 
                      min="1" 
                      max="10" 
                      value="2"
                      class="glass-slider"
                      style="width: 100%;"
                    >
                  </div>
                  <div>
                    <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--text-secondary); font-size: var(--text-sm);">
                      上下邊距: <span id="barcode-margin-v-value">15</span>px
                    </label>
                    <input 
                      type="range" 
                      id="barcode-margin-v" 
                      min="0" 
                      max="100" 
                      value="15"
                      class="glass-slider"
                      style="width: 100%;"
                    >
                  </div>
                  <div>
                    <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--text-secondary); font-size: var(--text-sm);">
                      左右邊距: <span id="barcode-margin-h-value">15</span>px
                    </label>
                    <input 
                      type="range" 
                      id="barcode-margin-h" 
                      min="0" 
                      max="100" 
                      value="15"
                      class="glass-slider"
                      style="width: 100%;"
                    >
                  </div>
                  <div>
                    <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--text-secondary); font-size: var(--text-sm);">
                      字元大小: <span id="barcode-font-size-value">24</span>px
                    </label>
                    <input 
                      type="range" 
                      id="barcode-font-size" 
                      min="10" 
                      max="50" 
                      value="24"
                      class="glass-slider"
                      style="width: 100%;"
                    >
                  </div>
                  <div>
                    <label class="glass-option" style="justify-content: flex-start;">
                      <input type="checkbox" id="barcode-show-text" checked>
                      <span>顯示底部文字</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="input-group">
              <label class="input-label">進階設定</label>
              <div class="glass" style="padding: var(--spacing-md); border-radius: var(--glass-radius-sm);">
                <div style="display: grid; gap: var(--spacing-md);">
                  <div>
                    <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--text-secondary); font-size: var(--text-sm);">前景色</label>
                    <div style="display: flex; gap: var(--spacing-sm); align-items: center;">
                      <input 
                        type="color" 
                        id="barcode-fg-color" 
                        value="#000000"
                        style="width: 60px; height: 40px; border-radius: var(--glass-radius-xs); cursor: pointer; border: 1px solid var(--glass-border);"
                      >
                      <input 
                        type="text" 
                        id="barcode-fg-color-text" 
                        value="#000000"
                        class="glass-input"
                        style="flex: 1; font-family: var(--font-mono);"
                      >
                    </div>
                  </div>
                  <div>
                    <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--text-secondary); font-size: var(--text-sm);">背景色</label>
                    <div style="display: flex; gap: var(--spacing-sm); align-items: center;">
                      <input 
                        type="color" 
                        id="barcode-bg-color" 
                        value="#FFFFFF"
                        style="width: 60px; height: 40px; border-radius: var(--glass-radius-xs); cursor: pointer; border: 1px solid var(--glass-border);"
                      >
                      <input 
                        type="text" 
                        id="barcode-bg-color-text" 
                        value="#FFFFFF"
                        class="glass-input"
                        style="flex: 1; font-family: var(--font-mono);"
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="action-buttons">
              <button id="barcode-generate-btn" class="glass-btn primary lg">
                <span class="material-icons-round">qr_code_scanner</span>
                生成條碼
              </button>
              <button id="barcode-clear-btn" class="glass-btn lg">
                <span class="material-icons-round">delete_outline</span>
                清除
              </button>
            </div>
          </div>

          <!-- 右側：預覽和下載 -->
          <div>
            <div class="input-group">
              <label class="input-label">條碼預覽</label>
              <div class="glass" style="padding: var(--spacing-lg); border-radius: var(--glass-radius-sm); text-align: center; min-height: 200px; display: flex; align-items: center; justify-content: center;">
                <div id="barcode-preview" style="width: 100%;"></div>
              </div>
            </div>

            <div class="action-buttons" id="barcode-download-btns" style="display: none;">
              <button id="barcode-download-png" class="glass-btn">
                <span class="material-icons-round">download</span>
                下載 PNG
              </button>
              <button id="barcode-download-svg" class="glass-btn">
                <span class="material-icons-round">download</span>
                下載 SVG
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- QR Code 生成器 -->
      <div id="qrcode-tab" class="tab-content" style="display: none;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-lg);">
          <!-- 左側：輸入和設定 -->
          <div>
            <div class="input-group">
              <label class="input-label">QR Code 內容</label>
              <textarea 
                id="qrcode-input" 
                class="glass-textarea" 
                placeholder="輸入文字、網址或其他內容..."
                style="min-height: 100px; font-family: var(--font-mono);"
              >https://example.com</textarea>
            </div>

            <div class="input-group">
              <label class="input-label">基本設定</label>
              <div class="glass" style="padding: var(--spacing-md); border-radius: var(--glass-radius-sm);">
                <div style="display: grid; gap: var(--spacing-md);">
                  <div>
                    <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--text-secondary); font-size: var(--text-sm);">
                      尺寸: <span id="qrcode-size-value">300</span>px
                    </label>
                    <input 
                      type="range" 
                      id="qrcode-size" 
                      min="100" 
                      max="2000" 
                      value="300"
                      class="glass-slider"
                      style="width: 100%;"
                    >
                  </div>
                  <div>
                    <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--text-secondary); font-size: var(--text-sm);">容錯等級</label>
                    <select id="qrcode-error-level" class="glass-input" style="font-family: var(--font-mono);">
                      ${QR_ERROR_LEVELS.map(level => `
                        <option value="${level.id}">${level.name} - ${level.description}</option>
                      `).join('')}
                    </select>
                  </div>
                  <div>
                    <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--text-secondary); font-size: var(--text-sm);">
                      邊距: <span id="qrcode-margin-value">20</span>px
                    </label>
                    <input 
                      type="range" 
                      id="qrcode-margin" 
                      min="0" 
                      max="100" 
                      value="20"
                      class="glass-slider"
                      style="width: 100%;"
                    >
                  </div>
                  <div>
                    <label class="glass-option" style="justify-content: flex-start;">
                      <input type="checkbox" id="qrcode-show-border" checked>
                      <span>顯示邊框</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="input-group">
              <label class="input-label">進階設定</label>
              <div class="glass" style="padding: var(--spacing-md); border-radius: var(--glass-radius-sm);">
                <div style="display: grid; gap: var(--spacing-md);">
                  <div>
                    <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--text-secondary); font-size: var(--text-sm);">前景色</label>
                    <div style="display: flex; gap: var(--spacing-sm); align-items: center;">
                      <input 
                        type="color" 
                        id="qrcode-fg-color" 
                        value="#000000"
                        style="width: 60px; height: 40px; border-radius: var(--glass-radius-xs); cursor: pointer; border: 1px solid var(--glass-border);"
                      >
                      <input 
                        type="text" 
                        id="qrcode-fg-color-text" 
                        value="#000000"
                        class="glass-input"
                        style="flex: 1; font-family: var(--font-mono);"
                      >
                    </div>
                  </div>
                  <div>
                    <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--text-secondary); font-size: var(--text-sm);">背景色</label>
                    <div style="display: flex; gap: var(--spacing-sm); align-items: center;">
                      <input 
                        type="color" 
                        id="qrcode-bg-color" 
                        value="#FFFFFF"
                        style="width: 60px; height: 40px; border-radius: var(--glass-radius-xs); cursor: pointer; border: 1px solid var(--glass-border);"
                      >
                      <input 
                        type="text" 
                        id="qrcode-bg-color-text" 
                        value="#FFFFFF"
                        class="glass-input"
                        style="flex: 1; font-family: var(--font-mono);"
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="action-buttons">
              <button id="qrcode-generate-btn" class="glass-btn primary lg">
                <span class="material-icons-round">qr_code</span>
                生成 QR Code
              </button>
              <button id="qrcode-clear-btn" class="glass-btn lg">
                <span class="material-icons-round">delete_outline</span>
                清除
              </button>
            </div>
          </div>

          <!-- 右側：預覽和下載 -->
          <div>
            <div class="input-group">
              <label class="input-label">QR Code 預覽</label>
              <div class="glass" style="padding: var(--spacing-lg); border-radius: var(--glass-radius-sm); text-align: center; min-height: 300px; display: flex; align-items: center; justify-content: center;">
                <canvas id="qrcode-preview"></canvas>
              </div>
            </div>

            <div class="action-buttons" id="qrcode-download-btns" style="display: none;">
              <button id="qrcode-download-png" class="glass-btn">
                <span class="material-icons-round">download</span>
                下載 PNG
              </button>
              <button id="qrcode-download-svg" class="glass-btn">
                <span class="material-icons-round">download</span>
                下載 SVG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // 初始化事件（函式庫已在 HTML 中載入）
  // 使用 setTimeout 確保 DOM 完全渲染
  setTimeout(() => {
    initBarcodeGeneratorEvents();
  }, 100);
}

/**
 * 載入 JsBarcode 函式庫
 */
function loadJsBarcode() {
  return new Promise((resolve, reject) => {
    if (window.JsBarcode) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

/**
 * 載入 QRCode 函式庫
 */
function loadQrCode() {
  return new Promise((resolve, reject) => {
    if (window.QRCode) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

/**
 * 初始化事件
 */
function initBarcodeGeneratorEvents() {
  // 標籤切換 - 使用 label 點擊事件
  document.querySelectorAll('.glass-option[data-tab]').forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const tab = option.getAttribute('data-tab');
      const radio = option.querySelector('input[type="radio"]');
      
      if (radio && !radio.checked) {
        radio.checked = true;
        // 觸發 change 事件
        const changeEvent = new Event('change', { bubbles: true });
        radio.dispatchEvent(changeEvent);
      }
    });
  });

  // 標籤切換 - radio change 事件
  document.querySelectorAll('input[name="generator-tab"]').forEach(radio => {
    radio.addEventListener('change', () => {
      const tab = radio.value;
      document.querySelectorAll('.glass-option[data-tab]').forEach(opt => {
        opt.classList.remove('active');
      });
      const activeOption = document.querySelector(`.glass-option[data-tab="${tab}"]`);
      if (activeOption) {
        activeOption.classList.add('active');
      }

      const barcodeTab = document.getElementById('barcode-tab');
      const qrcodeTab = document.getElementById('qrcode-tab');
      
      if (barcodeTab && qrcodeTab) {
        barcodeTab.style.display = tab === 'barcode' ? 'block' : 'none';
        qrcodeTab.style.display = tab === 'qrcode' ? 'block' : 'none';
      }
    });
  });

  // 條碼生成器事件
  initBarcodeEvents();

  // QR Code 生成器事件
  initQrCodeEvents();
}

/**
 * 初始化條碼事件
 */
function initBarcodeEvents() {
  const input = document.getElementById('barcode-input');
  const typeSelect = document.getElementById('barcode-type');
  const heightSlider = document.getElementById('barcode-height');
  const widthSlider = document.getElementById('barcode-width');
  const marginVSlider = document.getElementById('barcode-margin-v');
  const marginHSlider = document.getElementById('barcode-margin-h');
  const fontSizeSlider = document.getElementById('barcode-font-size');
  const showTextCheckbox = document.getElementById('barcode-show-text');
  const fgColorPicker = document.getElementById('barcode-fg-color');
  const fgColorText = document.getElementById('barcode-fg-color-text');
  const bgColorPicker = document.getElementById('barcode-bg-color');
  const bgColorText = document.getElementById('barcode-bg-color-text');
  const generateBtn = document.getElementById('barcode-generate-btn');
  const clearBtn = document.getElementById('barcode-clear-btn');
  const preview = document.getElementById('barcode-preview');
  const downloadBtns = document.getElementById('barcode-download-btns');
  const downloadPngBtn = document.getElementById('barcode-download-png');
  const downloadSvgBtn = document.getElementById('barcode-download-svg');

  // 滑桿值更新
  heightSlider?.addEventListener('input', (e) => {
    document.getElementById('barcode-height-value').textContent = e.target.value;
  });
  widthSlider?.addEventListener('input', (e) => {
    document.getElementById('barcode-width-value').textContent = e.target.value;
  });
  marginVSlider?.addEventListener('input', (e) => {
    document.getElementById('barcode-margin-v-value').textContent = e.target.value;
  });
  marginHSlider?.addEventListener('input', (e) => {
    document.getElementById('barcode-margin-h-value').textContent = e.target.value;
  });
  fontSizeSlider?.addEventListener('input', (e) => {
    document.getElementById('barcode-font-size-value').textContent = e.target.value;
  });

  // 顏色選擇器同步
  fgColorPicker?.addEventListener('input', (e) => {
    fgColorText.value = e.target.value;
  });
  fgColorText?.addEventListener('input', (e) => {
    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
      fgColorPicker.value = e.target.value;
    }
  });
  bgColorPicker?.addEventListener('input', (e) => {
    bgColorText.value = e.target.value;
  });
  bgColorText?.addEventListener('input', (e) => {
    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
      bgColorPicker.value = e.target.value;
    }
  });

  // 生成條碼
  generateBtn?.addEventListener('click', () => {
    const content = input?.value.trim();
    if (!content) {
      showToast('請輸入條碼內容', 'warning');
      return;
    }

    // 檢查 JsBarcode 是否載入
    if (!window.JsBarcode) {
      showToast('條碼函式庫尚未載入，請稍候再試', 'error');
      console.error('JsBarcode 未載入');
      return;
    }

    try {
      preview.innerHTML = '<svg id="barcode-svg"></svg>';
      const svg = preview.querySelector('#barcode-svg');

      if (!svg) {
        showToast('無法建立 SVG 元素', 'error');
        return;
      }

      // 使用 JsBarcode 生成條碼
      window.JsBarcode(svg, content, {
        format: typeSelect.value,
        height: parseInt(heightSlider.value) || 100,
        width: parseInt(widthSlider.value) || 2,
        margin: parseInt(marginVSlider.value) || 15,
        marginLeft: parseInt(marginHSlider.value) || 15,
        marginRight: parseInt(marginHSlider.value) || 15,
        fontSize: parseInt(fontSizeSlider.value) || 24,
        displayValue: showTextCheckbox.checked,
        background: bgColorPicker.value || '#FFFFFF',
        lineColor: fgColorPicker.value || '#000000',
        font: 'Arial'
      });

      downloadBtns.style.display = 'flex';
      showToast('條碼生成成功！', 'success');
    } catch (e) {
      console.error('條碼生成錯誤:', e);
      showToast(`生成失敗：${e.message || '未知錯誤'}`, 'error');
    }
  });

  // 下載 PNG
  downloadPngBtn?.addEventListener('click', () => {
    const svg = preview.querySelector('#barcode-svg');
    if (!svg) {
      showToast('沒有可下載的條碼', 'warning');
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'barcode.png';
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        showToast('下載成功！', 'success');
      });
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  });

  // 下載 SVG
  downloadSvgBtn?.addEventListener('click', () => {
    const svg = preview.querySelector('#barcode-svg');
    if (!svg) {
      showToast('沒有可下載的條碼', 'warning');
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'barcode.svg';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
    showToast('下載成功！', 'success');
  });

  // 清除
  clearBtn?.addEventListener('click', () => {
    input.value = '';
    preview.innerHTML = '';
    downloadBtns.style.display = 'none';
    showToast('已清除', 'info');
  });
}

/**
 * 初始化 QR Code 事件
 */
function initQrCodeEvents() {
  const input = document.getElementById('qrcode-input');
  const sizeSlider = document.getElementById('qrcode-size');
  const errorLevelSelect = document.getElementById('qrcode-error-level');
  const marginSlider = document.getElementById('qrcode-margin');
  const showBorderCheckbox = document.getElementById('qrcode-show-border');
  const fgColorPicker = document.getElementById('qrcode-fg-color');
  const fgColorText = document.getElementById('qrcode-fg-color-text');
  const bgColorPicker = document.getElementById('qrcode-bg-color');
  const bgColorText = document.getElementById('qrcode-bg-color-text');
  const generateBtn = document.getElementById('qrcode-generate-btn');
  const clearBtn = document.getElementById('qrcode-clear-btn');
  const canvas = document.getElementById('qrcode-preview');
  const downloadBtns = document.getElementById('qrcode-download-btns');
  const downloadPngBtn = document.getElementById('qrcode-download-png');
  const downloadSvgBtn = document.getElementById('qrcode-download-svg');

  // 滑桿值更新
  sizeSlider?.addEventListener('input', (e) => {
    document.getElementById('qrcode-size-value').textContent = e.target.value;
  });
  marginSlider?.addEventListener('input', (e) => {
    document.getElementById('qrcode-margin-value').textContent = e.target.value;
  });

  // 顏色選擇器同步
  fgColorPicker?.addEventListener('input', (e) => {
    fgColorText.value = e.target.value;
  });
  fgColorText?.addEventListener('input', (e) => {
    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
      fgColorPicker.value = e.target.value;
    }
  });
  bgColorPicker?.addEventListener('input', (e) => {
    bgColorText.value = e.target.value;
  });
  bgColorText?.addEventListener('input', (e) => {
    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
      bgColorPicker.value = e.target.value;
    }
  });

  // 生成 QR Code
  generateBtn?.addEventListener('click', async () => {
    const content = input?.value.trim();
    if (!content) {
      showToast('請輸入 QR Code 內容', 'warning');
      return;
    }

    // 檢查 QRCode 是否載入
    if (!window.QRCode) {
      showToast('QR Code 函式庫尚未載入，請稍候再試', 'error');
      console.error('QRCode 未載入');
      return;
    }

    if (!canvas) {
      showToast('無法找到 Canvas 元素', 'error');
      return;
    }

    try {
      const size = parseInt(sizeSlider.value) || 300;
      const margin = parseInt(marginSlider.value) || 20;
      const errorLevel = errorLevelSelect.value || 'M';
      const fgColor = fgColorPicker.value || '#000000';
      const bgColor = bgColorPicker.value || '#FFFFFF';

      await window.QRCode.toCanvas(canvas, content, {
        width: size,
        margin: margin,
        color: {
          dark: fgColor,
          light: bgColor
        },
        errorCorrectionLevel: errorLevel
      });

      downloadBtns.style.display = 'flex';
      showToast('QR Code 生成成功！', 'success');
    } catch (e) {
      console.error('QR Code 生成錯誤:', e);
      showToast(`生成失敗：${e.message || '未知錯誤'}`, 'error');
    }
  });

  // 下載 PNG
  downloadPngBtn?.addEventListener('click', () => {
    if (!canvas || !canvas.toDataURL) {
      showToast('沒有可下載的 QR Code', 'warning');
      return;
    }

    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('下載成功！', 'success');
  });

  // 下載 SVG
  downloadSvgBtn?.addEventListener('click', async () => {
    const content = input?.value.trim();
    if (!content) {
      showToast('請輸入 QR Code 內容', 'warning');
      return;
    }

    try {
      const size = parseInt(sizeSlider.value);
      const margin = parseInt(marginSlider.value);
      const errorLevel = errorLevelSelect.value;
      const fgColor = fgColorPicker.value.replace('#', '');
      const bgColor = bgColorPicker.value.replace('#', '');

      const svg = await window.QRCode.toString(content, {
        type: 'svg',
        width: size,
        margin: margin,
        color: {
          dark: `#${fgColor}`,
          light: `#${bgColor}`
        },
        errorCorrectionLevel: errorLevel
      });

      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'qrcode.svg';
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      showToast('下載成功！', 'success');
    } catch (e) {
      showToast(`下載失敗：${e.message}`, 'error');
    }
  });

  // 清除
  clearBtn?.addEventListener('click', () => {
    input.value = '';
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    downloadBtns.style.display = 'none';
    showToast('已清除', 'info');
  });
}

