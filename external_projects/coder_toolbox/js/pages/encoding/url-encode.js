/**
 * URL 編碼/解碼工具
 */
import { copyToClipboard } from '../../utils/clipboard.js';
import { showToast } from '../../components/toast.js';

/**
 * 渲染 URL 編碼工具頁面
 */
export function renderUrlEncode() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="tool-panel glass fade-in-up">
      <div class="panel-header">
        <h2 class="panel-title">
          <span class="icon">🔗</span>
          URL 編碼 / 解碼
        </h2>
      </div>

      <div class="input-group">
        <label class="input-label">輸入文字或 URL</label>
        <textarea 
          id="url-input" 
          class="glass-textarea" 
          placeholder="在此輸入要編碼或解碼的內容..."
        ></textarea>
      </div>

      <div class="options-row">
        <label class="glass-option active" data-mode="encode">
          <input type="radio" name="url-mode" value="encode" checked>
          <span class="material-icons-round">arrow_forward</span>
          編碼
        </label>
        <label class="glass-option" data-mode="decode">
          <input type="radio" name="url-mode" value="decode">
          <span class="material-icons-round">arrow_back</span>
          解碼
        </label>
      </div>

      <div class="options-row">
        <label class="glass-option active" data-type="component">
          <input type="radio" name="url-type" value="component" checked>
          encodeURIComponent
        </label>
        <label class="glass-option" data-type="uri">
          <input type="radio" name="url-type" value="uri">
          encodeURI
        </label>
      </div>

      <div class="action-buttons">
        <button id="url-convert" class="glass-btn primary lg">
          <span class="material-icons-round">sync_alt</span>
          轉換
        </button>
        <button id="url-clear" class="glass-btn lg">
          <span class="material-icons-round">delete_outline</span>
          清除
        </button>
        <button id="url-copy" class="glass-btn lg">
          <span class="material-icons-round">content_copy</span>
          複製結果
        </button>
      </div>

      <div class="input-group">
        <label class="input-label">輸出結果</label>
        <textarea 
          id="url-output" 
          class="glass-textarea" 
          placeholder="轉換結果將顯示在這裡..." 
          readonly
        ></textarea>
      </div>
    </div>
  `;

  // 綁定事件
  initUrlEncodeEvents();
}

/**
 * 初始化事件
 */
function initUrlEncodeEvents() {
  const input = document.getElementById('url-input');
  const output = document.getElementById('url-output');
  const convertBtn = document.getElementById('url-convert');
  const clearBtn = document.getElementById('url-clear');
  const copyBtn = document.getElementById('url-copy');

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
    const mode = document.querySelector('input[name="url-mode"]:checked')?.value;
    const type = document.querySelector('input[name="url-type"]:checked')?.value;
    const text = input?.value || '';

    if (!text.trim()) {
      showToast('請輸入內容', 'warning');
      return;
    }

    try {
      if (mode === 'encode') {
        output.value = type === 'component' 
          ? encodeURIComponent(text)
          : encodeURI(text);
      } else {
        output.value = type === 'component'
          ? decodeURIComponent(text)
          : decodeURI(text);
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

