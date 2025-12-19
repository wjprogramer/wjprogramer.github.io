/**
 * JavaScript 格式化工具
 */
import { copyToClipboard } from '../../utils/clipboard.js';
import { showToast } from '../../components/toast.js';

/**
 * 渲染 JavaScript 格式化工具頁面
 */
export function renderJsFormatter() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="tool-panel glass fade-in-up">
      <div class="panel-header">
        <h2 class="panel-title">
          <span class="icon">⚡</span>
          JavaScript 格式化 / 壓縮
        </h2>
      </div>

      <div class="input-group">
        <label class="input-label">輸入 JavaScript</label>
        <textarea 
          id="js-input" 
          class="glass-textarea" 
          placeholder="function hello() { console.log('Hello'); }"
          style="min-height: 200px;"
        ></textarea>
      </div>

      <div class="options-row">
        <label class="glass-option active" data-mode="beautify">
          <input type="radio" name="js-mode" value="beautify" checked>
          <span class="material-icons-round">format_align_left</span>
          美化
        </label>
        <label class="glass-option" data-mode="minify">
          <input type="radio" name="js-mode" value="minify">
          <span class="material-icons-round">compress</span>
          壓縮
        </label>
      </div>

      <div class="options-row" id="beautify-options">
        <label class="glass-option active" data-indent="2">
          <input type="radio" name="js-indent" value="2" checked>
          2 空格
        </label>
        <label class="glass-option" data-indent="4">
          <input type="radio" name="js-indent" value="4">
          4 空格
        </label>
        <label class="glass-option" data-indent="tab">
          <input type="radio" name="js-indent" value="tab">
          Tab
        </label>
      </div>

      <div class="action-buttons">
        <button id="js-format" class="glass-btn primary lg">
          <span class="material-icons-round">auto_fix_high</span>
          格式化
        </button>
        <button id="js-clear" class="glass-btn lg">
          <span class="material-icons-round">delete_outline</span>
          清除
        </button>
        <button id="js-copy" class="glass-btn lg">
          <span class="material-icons-round">content_copy</span>
          複製
        </button>
      </div>

      <div class="input-group">
        <label class="input-label">輸出結果</label>
        <textarea 
          id="js-output" 
          class="glass-textarea" 
          placeholder="格式化結果將顯示在這裡..." 
          readonly
          style="min-height: 200px; font-family: var(--font-mono);"
        ></textarea>
      </div>
    </div>
  `;

  // 綁定事件
  initJsEvents();
}

/**
 * 初始化事件
 */
function initJsEvents() {
  const input = document.getElementById('js-input');
  const output = document.getElementById('js-output');
  const formatBtn = document.getElementById('js-format');
  const clearBtn = document.getElementById('js-clear');
  const copyBtn = document.getElementById('js-copy');
  const beautifyOptions = document.getElementById('beautify-options');

  // 選項切換
  document.querySelectorAll('.glass-option').forEach(option => {
    option.addEventListener('click', () => {
      const name = option.querySelector('input')?.name;
      document.querySelectorAll(`.glass-option input[name="${name}"]`).forEach(inp => {
        inp.closest('.glass-option').classList.remove('active');
      });
      option.classList.add('active');
      option.querySelector('input').checked = true;
      
      // 顯示/隱藏美化選項
      if (name === 'js-mode') {
        const mode = option.querySelector('input').value;
        beautifyOptions.style.display = mode === 'beautify' ? 'flex' : 'none';
      }
    });
  });

  // 格式化
  formatBtn?.addEventListener('click', () => {
    const mode = document.querySelector('input[name="js-mode"]:checked')?.value;
    const indentValue = document.querySelector('input[name="js-indent"]:checked')?.value;
    const text = input?.value || '';

    if (!text.trim()) {
      showToast('請輸入 JavaScript', 'warning');
      return;
    }

    try {
      if (mode === 'beautify') {
        output.value = beautifyJs(text, indentValue);
      } else {
        output.value = minifyJs(text);
      }
      showToast('格式化成功！', 'success');
    } catch (e) {
      output.value = '';
      showToast(`格式化失敗：${e.message}`, 'error');
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
 * 美化 JavaScript
 */
function beautifyJs(code, indent) {
  const indentChar = indent === 'tab' ? '\t' : ' '.repeat(parseInt(indent) || 2);
  let formatted = '';
  let indentLevel = 0;
  let inString = false;
  let stringChar = '';
  let i = 0;
  
  while (i < code.length) {
    const char = code[i];
    const prevChar = code[i - 1];
    const nextChar = code[i + 1];
    
    // 處理字串
    if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
        stringChar = '';
      }
      formatted += char;
      i++;
      continue;
    }
    
    if (inString) {
      formatted += char;
      i++;
      continue;
    }
    
    // 處理註解
    if (char === '/' && nextChar === '/') {
      while (i < code.length && code[i] !== '\n') {
        formatted += code[i];
        i++;
      }
      formatted += '\n' + indentChar.repeat(indentLevel);
      i++;
      continue;
    }
    
    if (char === '/' && nextChar === '*') {
      while (i < code.length && !(code[i] === '*' && code[i + 1] === '/')) {
        formatted += code[i];
        i++;
      }
      if (i < code.length) {
        formatted += '*/';
        i += 2;
      }
      continue;
    }
    
    // 處理大括號
    if (char === '{') {
      formatted += ' {\n';
      indentLevel++;
      formatted += indentChar.repeat(indentLevel);
    } else if (char === '}') {
      indentLevel = Math.max(0, indentLevel - 1);
      formatted += '\n' + indentChar.repeat(indentLevel) + '}';
    } else if (char === ';') {
      formatted += ';';
      if (nextChar && nextChar !== '}' && nextChar !== '\n') {
        formatted += '\n' + indentChar.repeat(indentLevel);
      }
    } else if (char === '\n') {
      // 跳過原始換行
    } else if (char === ' ' && (prevChar === ' ' || prevChar === '\n' || prevChar === '\t')) {
      // 跳過多餘空白
    } else {
      formatted += char;
    }
    
    i++;
  }
  
  // 清理多餘空白行
  formatted = formatted.replace(/\n\s*\n/g, '\n');
  
  return formatted.trim();
}

/**
 * 壓縮 JavaScript
 */
function minifyJs(code) {
  // 簡單的壓縮邏輯
  return code
    .replace(/\/\*[\s\S]*?\*\//g, '')  // 移除多行註解
    .replace(/\/\/.*/g, '')            // 移除單行註解
    .replace(/\s+/g, ' ')               // 合併空白
    .replace(/\s*{\s*/g, '{')           // 移除 { 前後空白
    .replace(/\s*}\s*/g, '}')           // 移除 } 前後空白
    .replace(/\s*;\s*/g, ';')           // 移除 ; 前後空白
    .replace(/\s*,\s*/g, ',')           // 移除 , 前後空白
    .replace(/\s*\(\s*/g, '(')          // 移除 ( 前後空白
    .replace(/\s*\)\s*/g, ')')          // 移除 ) 前後空白
    .trim();
}

