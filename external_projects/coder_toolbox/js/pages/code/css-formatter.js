/**
 * CSS 格式化工具
 */
import { copyToClipboard } from '../../utils/clipboard.js';
import { showToast } from '../../components/toast.js';

/**
 * 渲染 CSS 格式化工具頁面
 */
export function renderCssFormatter() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="tool-panel glass fade-in-up">
      <div class="panel-header">
        <h2 class="panel-title">
          <span class="icon">🎨</span>
          CSS 格式化 / 壓縮
        </h2>
      </div>

      <div class="input-group">
        <label class="input-label">輸入 CSS</label>
        <textarea 
          id="css-input" 
          class="glass-textarea" 
          placeholder=".container { color: red; }"
          style="min-height: 200px;"
        ></textarea>
      </div>

      <div class="options-row">
        <label class="glass-option active" data-mode="beautify">
          <input type="radio" name="css-mode" value="beautify" checked>
          <span class="material-icons-round">format_align_left</span>
          美化
        </label>
        <label class="glass-option" data-mode="minify">
          <input type="radio" name="css-mode" value="minify">
          <span class="material-icons-round">compress</span>
          壓縮
        </label>
      </div>

      <div class="options-row" id="beautify-options">
        <label class="glass-option active" data-indent="2">
          <input type="radio" name="css-indent" value="2" checked>
          2 空格
        </label>
        <label class="glass-option" data-indent="4">
          <input type="radio" name="css-indent" value="4">
          4 空格
        </label>
        <label class="glass-option" data-indent="tab">
          <input type="radio" name="css-indent" value="tab">
          Tab
        </label>
      </div>

      <div class="action-buttons">
        <button id="css-format" class="glass-btn primary lg">
          <span class="material-icons-round">auto_fix_high</span>
          格式化
        </button>
        <button id="css-clear" class="glass-btn lg">
          <span class="material-icons-round">delete_outline</span>
          清除
        </button>
        <button id="css-copy" class="glass-btn lg">
          <span class="material-icons-round">content_copy</span>
          複製
        </button>
      </div>

      <div class="input-group">
        <label class="input-label">輸出結果</label>
        <textarea 
          id="css-output" 
          class="glass-textarea" 
          placeholder="格式化結果將顯示在這裡..." 
          readonly
          style="min-height: 200px; font-family: var(--font-mono);"
        ></textarea>
      </div>
    </div>
  `;

  // 綁定事件
  initCssEvents();
}

/**
 * 初始化事件
 */
function initCssEvents() {
  const input = document.getElementById('css-input');
  const output = document.getElementById('css-output');
  const formatBtn = document.getElementById('css-format');
  const clearBtn = document.getElementById('css-clear');
  const copyBtn = document.getElementById('css-copy');
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
      if (name === 'css-mode') {
        const mode = option.querySelector('input').value;
        beautifyOptions.style.display = mode === 'beautify' ? 'flex' : 'none';
      }
    });
  });

  // 格式化
  formatBtn?.addEventListener('click', () => {
    const mode = document.querySelector('input[name="css-mode"]:checked')?.value;
    const indentValue = document.querySelector('input[name="css-indent"]:checked')?.value;
    const text = input?.value || '';

    if (!text.trim()) {
      showToast('請輸入 CSS', 'warning');
      return;
    }

    try {
      if (mode === 'beautify') {
        output.value = beautifyCss(text, indentValue);
      } else {
        output.value = minifyCss(text);
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
 * 美化 CSS
 */
function beautifyCss(css, indent) {
  const indentChar = indent === 'tab' ? '\t' : ' '.repeat(parseInt(indent) || 2);
  let formatted = '';
  let indentLevel = 0;
  let inRule = false;
  
  // 移除多餘空白和換行
  css = css.replace(/\/\*[\s\S]*?\*\//g, ''); // 移除註解
  css = css.replace(/\s+/g, ' ').trim();
  
  for (let i = 0; i < css.length; i++) {
    const char = css[i];
    const nextChar = css[i + 1];
    
    if (char === '{') {
      formatted += ' {\n';
      indentLevel++;
      inRule = true;
    } else if (char === '}') {
      indentLevel = Math.max(0, indentLevel - 1);
      formatted += '\n' + indentChar.repeat(indentLevel) + '}';
      inRule = false;
    } else if (char === ';' && inRule) {
      formatted += ';\n' + indentChar.repeat(indentLevel);
    } else if (char === ':') {
      formatted += ': ';
    } else if (char === ' ' && (nextChar === ':' || nextChar === ';' || nextChar === '{' || nextChar === '}')) {
      // 跳過多餘空白
      continue;
    } else {
      formatted += char;
    }
  }
  
  // 清理多餘換行
  formatted = formatted.replace(/\n\s*\n/g, '\n');
  
  return formatted.trim();
}

/**
 * 壓縮 CSS
 */
function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // 移除註解
    .replace(/\s+/g, ' ')              // 合併空白
    .replace(/\s*{\s*/g, '{')          // 移除 { 前後空白
    .replace(/\s*}\s*/g, '}')          // 移除 } 前後空白
    .replace(/\s*:\s*/g, ':')          // 移除 : 前後空白
    .replace(/\s*;\s*/g, ';')          // 移除 ; 前後空白
    .replace(/\s*,\s*/g, ',')          // 移除 , 前後空白
    .trim();
}

