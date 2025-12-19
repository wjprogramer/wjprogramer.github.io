/**
 * Unicode / HTML 實體編碼工具
 */
import { copyToClipboard } from '../../utils/clipboard.js';
import { showToast } from '../../components/toast.js';

/**
 * 渲染 Unicode 編碼工具頁面
 */
export function renderUnicode() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="tool-panel glass fade-in-up">
      <div class="panel-header">
        <h2 class="panel-title">
          <span class="icon">🔤</span>
          Unicode / HTML 實體編碼
        </h2>
      </div>

      <div class="input-group">
        <label class="input-label">輸入文字</label>
        <textarea 
          id="unicode-input" 
          class="glass-textarea" 
          placeholder="在此輸入要編碼的文字..."
        ></textarea>
      </div>

      <div class="options-row">
        <label class="glass-option active" data-mode="unicode">
          <input type="radio" name="unicode-mode" value="unicode" checked>
          Unicode 轉義 (\\uXXXX)
        </label>
        <label class="glass-option" data-mode="html-decimal">
          <input type="radio" name="unicode-mode" value="html-decimal">
          HTML 十進位 (&#1234;)
        </label>
        <label class="glass-option" data-mode="html-hex">
          <input type="radio" name="unicode-mode" value="html-hex">
          HTML 十六進位 (&#x4E2D;)
        </label>
      </div>

      <div class="options-row">
        <label class="glass-option active" data-action="encode">
          <input type="radio" name="unicode-action" value="encode" checked>
          <span class="material-icons-round">arrow_forward</span>
          編碼
        </label>
        <label class="glass-option" data-action="decode">
          <input type="radio" name="unicode-action" value="decode">
          <span class="material-icons-round">arrow_back</span>
          解碼
        </label>
      </div>

      <div class="action-buttons">
        <button id="unicode-convert" class="glass-btn primary lg">
          <span class="material-icons-round">sync_alt</span>
          轉換
        </button>
        <button id="unicode-clear" class="glass-btn lg">
          <span class="material-icons-round">delete_outline</span>
          清除
        </button>
        <button id="unicode-copy" class="glass-btn lg">
          <span class="material-icons-round">content_copy</span>
          複製結果
        </button>
      </div>

      <div class="input-group">
        <label class="input-label">輸出結果</label>
        <textarea 
          id="unicode-output" 
          class="glass-textarea" 
          placeholder="轉換結果將顯示在這裡..." 
          readonly
          style="font-family: var(--font-mono);"
        ></textarea>
      </div>
    </div>
  `;

  // 綁定事件
  initUnicodeEvents();
}

/**
 * 初始化事件
 */
function initUnicodeEvents() {
  const input = document.getElementById('unicode-input');
  const output = document.getElementById('unicode-output');
  const convertBtn = document.getElementById('unicode-convert');
  const clearBtn = document.getElementById('unicode-clear');
  const copyBtn = document.getElementById('unicode-copy');

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
    const mode = document.querySelector('input[name="unicode-mode"]:checked')?.value;
    const action = document.querySelector('input[name="unicode-action"]:checked')?.value;
    const text = input?.value || '';

    if (!text.trim()) {
      showToast('請輸入內容', 'warning');
      return;
    }

    try {
      if (action === 'encode') {
        output.value = encodeUnicode(text, mode);
      } else {
        output.value = decodeUnicode(text, mode);
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
}

/**
 * 編碼 Unicode
 */
function encodeUnicode(text, mode) {
  let result = '';
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const code = char.charCodeAt(0);
    
    if (mode === 'unicode') {
      // Unicode 轉義: \uXXXX
      if (code > 0x7F) {
        result += '\\u' + code.toString(16).toUpperCase().padStart(4, '0');
      } else {
        result += char;
      }
    } else if (mode === 'html-decimal') {
      // HTML 十進位: &#1234;
      if (code > 127) {
        result += '&#' + code + ';';
      } else {
        result += char;
      }
    } else if (mode === 'html-hex') {
      // HTML 十六進位: &#x4E2D;
      if (code > 127) {
        result += '&#x' + code.toString(16).toUpperCase() + ';';
      } else {
        result += char;
      }
    }
  }
  
  return result;
}

/**
 * 解碼 Unicode
 */
function decodeUnicode(text, mode) {
  if (mode === 'unicode') {
    // 解碼 \uXXXX
    return text.replace(/\\u([0-9A-Fa-f]{4})/g, (match, hex) => {
      return String.fromCharCode(parseInt(hex, 16));
    });
  } else if (mode === 'html-decimal') {
    // 解碼 &#1234;
    return text.replace(/&#(\d+);/g, (match, dec) => {
      return String.fromCharCode(parseInt(dec, 10));
    });
  } else if (mode === 'html-hex') {
    // 解碼 &#x4E2D;
    return text.replace(/&#x([0-9A-Fa-f]+);/gi, (match, hex) => {
      return String.fromCharCode(parseInt(hex, 16));
    });
  }
  
  return text;
}

