/**
 * 大小寫轉換工具
 */
import { copyToClipboard } from '../../utils/clipboard.js';
import { showToast } from '../../components/toast.js';

/**
 * 渲染大小寫轉換工具頁面
 */
export function renderCase() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="tool-panel glass fade-in-up">
      <div class="panel-header">
        <h2 class="panel-title">
          <span class="icon">🔤</span>
          大小寫轉換
        </h2>
      </div>

      <div class="input-group">
        <label class="input-label">輸入文字</label>
        <textarea 
          id="case-input" 
          class="glass-textarea" 
          placeholder="輸入要轉換的文字..."
        ></textarea>
      </div>

      <div class="options-row">
        <label class="glass-option active" data-case="upper">
          <input type="radio" name="case-type" value="upper" checked>
          全大寫
        </label>
        <label class="glass-option" data-case="lower">
          <input type="radio" name="case-type" value="lower">
          全小寫
        </label>
        <label class="glass-option" data-case="title">
          <input type="radio" name="case-type" value="title">
          標題大小寫
        </label>
        <label class="glass-option" data-case="sentence">
          <input type="radio" name="case-type" value="sentence">
          句子大小寫
        </label>
      </div>

      <div class="options-row">
        <label class="glass-option active" data-case="camel">
          <input type="radio" name="case-type" value="camel">
          camelCase
        </label>
        <label class="glass-option" data-case="pascal">
          <input type="radio" name="case-type" value="pascal">
          PascalCase
        </label>
        <label class="glass-option" data-case="snake">
          <input type="radio" name="case-type" value="snake">
          snake_case
        </label>
        <label class="glass-option" data-case="kebab">
          <input type="radio" name="case-type" value="kebab">
          kebab-case
        </label>
      </div>

      <div class="action-buttons">
        <button id="case-convert" class="glass-btn primary lg">
          <span class="material-icons-round">transform</span>
          轉換
        </button>
        <button id="case-clear" class="glass-btn lg">
          <span class="material-icons-round">delete_outline</span>
          清除
        </button>
        <button id="case-copy" class="glass-btn lg">
          <span class="material-icons-round">content_copy</span>
          複製結果
        </button>
      </div>

      <div class="input-group">
        <label class="input-label">輸出結果</label>
        <textarea 
          id="case-output" 
          class="glass-textarea" 
          placeholder="轉換結果將顯示在這裡..." 
          readonly
        ></textarea>
      </div>
    </div>
  `;

  // 綁定事件
  initCaseEvents();
}

/**
 * 初始化事件
 */
function initCaseEvents() {
  const input = document.getElementById('case-input');
  const output = document.getElementById('case-output');
  const convertBtn = document.getElementById('case-convert');
  const clearBtn = document.getElementById('case-clear');
  const copyBtn = document.getElementById('case-copy');

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
    const caseType = document.querySelector('input[name="case-type"]:checked')?.value;
    const text = input?.value || '';

    if (!text.trim()) {
      showToast('請輸入文字', 'warning');
      return;
    }

    try {
      output.value = convertCase(text, caseType);
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
 * 轉換大小寫
 */
function convertCase(text, caseType) {
  switch (caseType) {
    case 'upper':
      return text.toUpperCase();
    
    case 'lower':
      return text.toLowerCase();
    
    case 'title':
      return text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
    
    case 'sentence':
      return text.toLowerCase().replace(/^[a-z]|\.\s+[a-z]/g, char => char.toUpperCase());
    
    case 'camel':
      return text
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
        .replace(/^[A-Z]/, char => char.toLowerCase());
    
    case 'pascal':
      return text
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
        .replace(/^[a-z]/, char => char.toUpperCase());
    
    case 'snake':
      return text
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .replace(/[^a-zA-Z0-9]+/g, '_')
        .toLowerCase()
        .replace(/^_+|_+$/g, '');
    
    case 'kebab':
      return text
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .toLowerCase()
        .replace(/^-+|-+$/g, '');
    
    default:
      return text;
  }
}

