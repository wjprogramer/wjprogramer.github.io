/**
 * Base64 編碼/解碼工具
 */
import { copyToClipboard } from '../../utils/clipboard.js';
import { showToast } from '../../components/toast.js';

/**
 * 渲染 Base64 工具頁面
 */
export function renderBase64() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="tool-panel glass fade-in-up">
      <div class="panel-header">
        <h2 class="panel-title">
          <span class="icon">🔐</span>
          Base64 編碼 / 解碼
        </h2>
      </div>

      <div class="input-group">
        <label class="input-label">輸入文字</label>
        <textarea 
          id="base64-input" 
          class="glass-textarea" 
          placeholder="在此輸入要編碼或解碼的文字..."
        ></textarea>
      </div>

      <div class="options-row">
        <label class="glass-option active" data-mode="encode">
          <input type="radio" name="base64-mode" value="encode" checked>
          <span class="material-icons-round">arrow_forward</span>
          編碼 (Text → Base64)
        </label>
        <label class="glass-option" data-mode="decode">
          <input type="radio" name="base64-mode" value="decode">
          <span class="material-icons-round">arrow_back</span>
          解碼 (Base64 → Text)
        </label>
      </div>

      <div class="action-buttons">
        <button id="base64-convert" class="glass-btn primary lg">
          <span class="material-icons-round">sync_alt</span>
          轉換
        </button>
        <button id="base64-clear" class="glass-btn lg">
          <span class="material-icons-round">delete_outline</span>
          清除
        </button>
        <button id="base64-copy" class="glass-btn lg">
          <span class="material-icons-round">content_copy</span>
          複製結果
        </button>
      </div>

      <div class="input-group">
        <label class="input-label">輸出結果</label>
        <textarea 
          id="base64-output" 
          class="glass-textarea" 
          placeholder="轉換結果將顯示在這裡..." 
          readonly
        ></textarea>
      </div>
    </div>
  `;

  // 綁定事件
  initBase64Events();
}

/**
 * 初始化事件
 */
function initBase64Events() {
  const input = document.getElementById('base64-input');
  const output = document.getElementById('base64-output');
  const convertBtn = document.getElementById('base64-convert');
  const clearBtn = document.getElementById('base64-clear');
  const copyBtn = document.getElementById('base64-copy');
  const options = document.querySelectorAll('.glass-option');

  // 選項切換
  options.forEach(option => {
    option.addEventListener('click', () => {
      options.forEach(o => o.classList.remove('active'));
      option.classList.add('active');
      option.querySelector('input').checked = true;
    });
  });

  // 轉換
  convertBtn?.addEventListener('click', () => {
    const mode = document.querySelector('input[name="base64-mode"]:checked')?.value;
    const text = input?.value || '';

    if (!text.trim()) {
      showToast('請輸入內容', 'warning');
      return;
    }

    try {
      if (mode === 'encode') {
        // 編碼：支援 UTF-8
        output.value = btoa(unescape(encodeURIComponent(text)));
      } else {
        // 解碼：支援 UTF-8
        output.value = decodeURIComponent(escape(atob(text)));
      }
      showToast('轉換成功！', 'success');
    } catch (e) {
      output.value = '';
      showToast(`轉換失敗：${e.message}`, 'error');
    }
  });

  // 清除
  clearBtn?.addEventListener('click', () => {
    input.value = '';
    output.value = '';
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

  // 即時轉換（輸入時）
  input?.addEventListener('input', debounce(() => {
    if (input.value.trim()) {
      convertBtn?.click();
    }
  }, 500));
}

/**
 * 防抖函式
 */
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

