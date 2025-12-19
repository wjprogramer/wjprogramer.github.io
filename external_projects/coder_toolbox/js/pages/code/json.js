/**
 * JSON 格式化工具
 */
import { copyToClipboard } from '../../utils/clipboard.js';
import { showToast } from '../../components/toast.js';

/**
 * 渲染 JSON 格式化工具頁面
 */
export function renderJsonFormatter() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="tool-panel glass fade-in-up">
      <div class="panel-header">
        <h2 class="panel-title">
          <span class="icon">📋</span>
          JSON 格式化
        </h2>
      </div>

      <div class="input-group">
        <label class="input-label">輸入 JSON</label>
        <textarea 
          id="json-input" 
          class="glass-textarea" 
          placeholder='{"name": "example", "value": 123}'
          style="min-height: 200px;"
        ></textarea>
      </div>

      <div class="options-row">
        <label class="glass-option active" data-mode="beautify">
          <input type="radio" name="json-mode" value="beautify" checked>
          <span class="material-icons-round">format_align_left</span>
          美化
        </label>
        <label class="glass-option" data-mode="minify">
          <input type="radio" name="json-mode" value="minify">
          <span class="material-icons-round">compress</span>
          壓縮
        </label>
      </div>

      <div class="options-row">
        <label class="glass-option active" data-indent="2">
          <input type="radio" name="json-indent" value="2" checked>
          2 空格
        </label>
        <label class="glass-option" data-indent="4">
          <input type="radio" name="json-indent" value="4">
          4 空格
        </label>
        <label class="glass-option" data-indent="tab">
          <input type="radio" name="json-indent" value="tab">
          Tab
        </label>
      </div>

      <div class="action-buttons">
        <button id="json-format" class="glass-btn primary lg">
          <span class="material-icons-round">auto_fix_high</span>
          格式化
        </button>
        <button id="json-validate" class="glass-btn lg">
          <span class="material-icons-round">check_circle</span>
          驗證
        </button>
        <button id="json-clear" class="glass-btn lg">
          <span class="material-icons-round">delete_outline</span>
          清除
        </button>
        <button id="json-copy" class="glass-btn lg">
          <span class="material-icons-round">content_copy</span>
          複製
        </button>
      </div>

      <div class="input-group">
        <label class="input-label">輸出結果</label>
        <textarea 
          id="json-output" 
          class="glass-textarea" 
          placeholder="格式化結果將顯示在這裡..." 
          readonly
          style="min-height: 200px;"
        ></textarea>
      </div>

      <div id="json-info" style="margin-top: var(--spacing-md);"></div>
    </div>
  `;

  // 綁定事件
  initJsonEvents();
}

/**
 * 初始化事件
 */
function initJsonEvents() {
  const input = document.getElementById('json-input');
  const output = document.getElementById('json-output');
  const infoContainer = document.getElementById('json-info');
  const formatBtn = document.getElementById('json-format');
  const validateBtn = document.getElementById('json-validate');
  const clearBtn = document.getElementById('json-clear');
  const copyBtn = document.getElementById('json-copy');

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

  // 格式化
  formatBtn?.addEventListener('click', () => {
    const mode = document.querySelector('input[name="json-mode"]:checked')?.value;
    const indentValue = document.querySelector('input[name="json-indent"]:checked')?.value;
    const text = input?.value || '';

    if (!text.trim()) {
      showToast('請輸入 JSON', 'warning');
      return;
    }

    try {
      const parsed = JSON.parse(text);
      
      if (mode === 'beautify') {
        const indent = indentValue === 'tab' ? '\t' : parseInt(indentValue);
        output.value = JSON.stringify(parsed, null, indent);
      } else {
        output.value = JSON.stringify(parsed);
      }
      
      // 顯示 JSON 資訊
      showJsonInfo(parsed, infoContainer);
      
      showToast('格式化成功！', 'success');
    } catch (e) {
      output.value = '';
      infoContainer.innerHTML = '';
      showToast(`JSON 語法錯誤：${e.message}`, 'error');
    }
  });

  // 驗證
  validateBtn?.addEventListener('click', () => {
    const text = input?.value || '';

    if (!text.trim()) {
      showToast('請輸入 JSON', 'warning');
      return;
    }

    try {
      const parsed = JSON.parse(text);
      showJsonInfo(parsed, infoContainer);
      showToast('✓ JSON 格式正確！', 'success');
    } catch (e) {
      infoContainer.innerHTML = `
        <div class="glass" style="padding: var(--spacing-md); border-radius: var(--glass-radius-sm); border-color: var(--error);">
          <div style="color: var(--error); display: flex; align-items: center; gap: var(--spacing-sm);">
            <span class="material-icons-round">error</span>
            <span>JSON 語法錯誤</span>
          </div>
          <code style="display: block; margin-top: var(--spacing-sm); font-size: var(--text-sm); color: var(--text-secondary);">
            ${escapeHtml(e.message)}
          </code>
        </div>
      `;
      showToast('JSON 格式錯誤', 'error');
    }
  });

  // 清除
  clearBtn?.addEventListener('click', () => {
    input.value = '';
    output.value = '';
    infoContainer.innerHTML = '';
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
 * 顯示 JSON 資訊
 */
function showJsonInfo(data, container) {
  if (!container) return;

  const type = Array.isArray(data) ? 'Array' : typeof data;
  const keys = typeof data === 'object' && data !== null ? Object.keys(data) : [];
  const size = JSON.stringify(data).length;

  container.innerHTML = `
    <div class="glass" style="padding: var(--spacing-md); border-radius: var(--glass-radius-sm);">
      <div style="display: flex; gap: var(--spacing-lg); flex-wrap: wrap;">
        <div>
          <span style="color: var(--text-muted); font-size: var(--text-sm);">類型</span>
          <div style="font-weight: var(--font-semibold);">${type}</div>
        </div>
        ${type === 'object' || type === 'Array' ? `
          <div>
            <span style="color: var(--text-muted); font-size: var(--text-sm);">
              ${Array.isArray(data) ? '元素數量' : '屬性數量'}
            </span>
            <div style="font-weight: var(--font-semibold);">${Array.isArray(data) ? data.length : keys.length}</div>
          </div>
        ` : ''}
        <div>
          <span style="color: var(--text-muted); font-size: var(--text-sm);">大小</span>
          <div style="font-weight: var(--font-semibold);">${formatBytes(size)}</div>
        </div>
      </div>
    </div>
  `;
}

/**
 * 格式化位元組
 */
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * HTML 轉義
 */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

