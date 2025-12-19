/**
 * QR Code 生成工具
 */
import { copyToClipboard } from '../../utils/clipboard.js';
import { showToast } from '../../components/toast.js';

/**
 * 渲染 QR Code 工具頁面
 */
export function renderQrCode() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="tool-panel glass fade-in-up">
      <div class="panel-header">
        <h2 class="panel-title">
          <span class="icon">📱</span>
          QR Code 生成器
        </h2>
      </div>

      <div class="input-group">
        <label class="input-label">輸入內容</label>
        <textarea 
          id="qrcode-input" 
          class="glass-textarea" 
          placeholder="輸入文字、網址或其他內容..."
        ></textarea>
      </div>

      <div class="options-row">
        <label class="glass-option active" data-size="200">
          <input type="radio" name="qrcode-size" value="200" checked>
          200x200
        </label>
        <label class="glass-option" data-size="300">
          <input type="radio" name="qrcode-size" value="300">
          300x300
        </label>
        <label class="glass-option" data-size="400">
          <input type="radio" name="qrcode-size" value="400">
          400x400
        </label>
      </div>

      <div class="action-buttons">
        <button id="qrcode-generate" class="glass-btn primary lg">
          <span class="material-icons-round">qr_code</span>
          生成 QR Code
        </button>
        <button id="qrcode-clear" class="glass-btn lg">
          <span class="material-icons-round">delete_outline</span>
          清除
        </button>
        <button id="qrcode-download" class="glass-btn lg" style="display: none;">
          <span class="material-icons-round">download</span>
          下載圖片
        </button>
      </div>

      <div class="input-group" id="qrcode-output-container" style="display: none;">
        <label class="input-label">QR Code 圖片</label>
        <div style="display: flex; justify-content: center; padding: var(--spacing-lg);">
          <div id="qrcode-canvas" class="glass" style="padding: var(--spacing-md); border-radius: var(--glass-radius-sm);"></div>
        </div>
      </div>
    </div>
  `;

  // 載入 QRCode.js 函式庫
  loadQrCodeLibrary().then(() => {
    initQrCodeEvents();
  });
}

/**
 * 載入 QRCode.js 函式庫
 */
function loadQrCodeLibrary() {
  return new Promise((resolve, reject) => {
    if (window.QRCode) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

/**
 * 初始化事件
 */
function initQrCodeEvents() {
  const input = document.getElementById('qrcode-input');
  const generateBtn = document.getElementById('qrcode-generate');
  const clearBtn = document.getElementById('qrcode-clear');
  const downloadBtn = document.getElementById('qrcode-download');
  const outputContainer = document.getElementById('qrcode-output-container');
  const canvas = document.getElementById('qrcode-canvas');

  // 選項切換
  document.querySelectorAll('.glass-option').forEach(option => {
    option.addEventListener('click', () => {
      const name = option.querySelector('input')?.name;
      document.querySelectorAll(`.glass-option input[name="${name}"]`).forEach(inp => {
        inp.closest('.glass-option').classList.remove('active');
      });
      option.classList.add('active');
      option.querySelector('input').checked = true;
    });
  });

  // 生成 QR Code
  generateBtn?.addEventListener('click', () => {
    const text = input?.value || '';
    const size = parseInt(document.querySelector('input[name="qrcode-size"]:checked')?.value || '200');

    if (!text.trim()) {
      showToast('請輸入內容', 'warning');
      return;
    }

    try {
      // 清除舊的 QR Code
      canvas.innerHTML = '';

      // 生成新的 QR Code
      new QRCode(canvas, {
        text: text,
        width: size,
        height: size,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      });

      outputContainer.style.display = 'block';
      downloadBtn.style.display = 'inline-flex';
      showToast('QR Code 生成成功！', 'success');
    } catch (e) {
      showToast(`生成失敗：${e.message}`, 'error');
    }
  });

  // 清除
  clearBtn?.addEventListener('click', () => {
    input.value = '';
    canvas.innerHTML = '';
    outputContainer.style.display = 'none';
    downloadBtn.style.display = 'none';
    showToast('已清除', 'info');
  });

  // 下載
  downloadBtn?.addEventListener('click', () => {
    const img = canvas.querySelector('img');
    if (!img) {
      showToast('沒有可下載的圖片', 'warning');
      return;
    }

    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = img.src;
    link.click();
    showToast('下載成功！', 'success');
  });
}

