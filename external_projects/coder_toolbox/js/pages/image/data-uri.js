/**
 * Data URI 轉換工具
 */
import { copyToClipboard } from '../../utils/clipboard.js';
import { showToast } from '../../components/toast.js';

/**
 * 渲染 Data URI 工具頁面
 */
export function renderDataUri() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="tool-panel glass fade-in-up">
      <div class="panel-header">
        <h2 class="panel-title">
          <span class="icon">🖼️</span>
          Data URI 轉換
        </h2>
      </div>

      <div class="input-group">
        <label class="input-label">上傳圖片或輸入 Data URI</label>
        <div style="margin-bottom: var(--spacing-md);">
          <input 
            type="file" 
            id="datauri-file" 
            accept="image/*"
            style="display: none;"
          >
          <label for="datauri-file" class="glass-btn" style="cursor: pointer; display: inline-flex;">
            <span class="material-icons-round">upload_file</span>
            選擇圖片
          </label>
        </div>
        <textarea 
          id="datauri-input" 
          class="glass-textarea" 
          placeholder="或直接貼上 Data URI (data:image/...)"
          style="min-height: 120px;"
        ></textarea>
      </div>

      <div class="options-row">
        <label class="glass-option active" data-mode="to-datauri">
          <input type="radio" name="datauri-mode" value="to-datauri" checked>
          <span class="material-icons-round">arrow_forward</span>
          圖片 → Data URI
        </label>
        <label class="glass-option" data-mode="from-datauri">
          <input type="radio" name="datauri-mode" value="from-datauri">
          <span class="material-icons-round">arrow_back</span>
          Data URI → 圖片
        </label>
      </div>

      <div class="action-buttons">
        <button id="datauri-convert" class="glass-btn primary lg">
          <span class="material-icons-round">sync_alt</span>
          轉換
        </button>
        <button id="datauri-clear" class="glass-btn lg">
          <span class="material-icons-round">delete_outline</span>
          清除
        </button>
        <button id="datauri-copy" class="glass-btn lg">
          <span class="material-icons-round">content_copy</span>
          複製結果
        </button>
      </div>

      <div class="input-group" id="datauri-output-container">
        <label class="input-label">輸出結果</label>
        <textarea 
          id="datauri-output" 
          class="glass-textarea" 
          placeholder="轉換結果將顯示在這裡..." 
          readonly
          style="min-height: 120px; font-family: var(--font-mono); font-size: var(--text-xs);"
        ></textarea>
        <div id="datauri-preview" style="margin-top: var(--spacing-md); text-align: center; display: none;">
          <img id="datauri-image" style="max-width: 100%; max-height: 400px; border-radius: var(--glass-radius-sm);" alt="預覽">
          <div style="margin-top: var(--spacing-sm);">
            <button id="datauri-download" class="glass-btn">
              <span class="material-icons-round">download</span>
              下載圖片
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // 綁定事件
  initDataUriEvents();
}

/**
 * 初始化事件
 */
function initDataUriEvents() {
  const fileInput = document.getElementById('datauri-file');
  const textInput = document.getElementById('datauri-input');
  const output = document.getElementById('datauri-output');
  const preview = document.getElementById('datauri-preview');
  const image = document.getElementById('datauri-image');
  const convertBtn = document.getElementById('datauri-convert');
  const clearBtn = document.getElementById('datauri-clear');
  const copyBtn = document.getElementById('datauri-copy');
  const downloadBtn = document.getElementById('datauri-download');

  // 檔案選擇
  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('請選擇圖片檔案', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      textInput.value = event.target.result;
      showToast('圖片已載入', 'success');
    };
    reader.onerror = () => {
      showToast('讀取檔案失敗', 'error');
    };
    reader.readAsDataURL(file);
  });

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

  // 轉換
  convertBtn?.addEventListener('click', () => {
    const mode = document.querySelector('input[name="datauri-mode"]:checked')?.value;
    const text = textInput?.value || '';

    if (!text.trim()) {
      showToast('請輸入內容或選擇圖片', 'warning');
      return;
    }

    try {
      if (mode === 'to-datauri') {
        // 如果輸入的是 Data URI，直接使用
        if (text.startsWith('data:')) {
          output.value = text;
          preview.style.display = 'none';
        } else {
          showToast('請選擇圖片檔案或輸入 Data URI', 'warning');
        }
      } else {
        // Data URI → 圖片
        if (text.startsWith('data:image/')) {
          output.value = text;
          image.src = text;
          preview.style.display = 'block';
        } else {
          showToast('無效的 Data URI', 'error');
        }
      }
      showToast('轉換成功！', 'success');
    } catch (e) {
      showToast(`轉換失敗：${e.message}`, 'error');
    }
  });

  // 清除
  clearBtn?.addEventListener('click', () => {
    fileInput.value = '';
    textInput.value = '';
    output.value = '';
    preview.style.display = 'none';
    showToast('已清除', 'info');
  });

  // 複製
  copyBtn?.addEventListener('click', () => {
    const text = output?.value;
    if (!text) {
      showToast('沒有可複製的內容', 'warning');
      return;
    }
    copyToClipboard(text);
  });

  // 下載
  downloadBtn?.addEventListener('click', () => {
    const dataUri = output?.value;
    if (!dataUri || !dataUri.startsWith('data:image/')) {
      showToast('沒有可下載的圖片', 'warning');
      return;
    }

    const link = document.createElement('a');
    link.download = 'image.png';
    link.href = dataUri;
    link.click();
    showToast('下載成功！', 'success');
  });
}

