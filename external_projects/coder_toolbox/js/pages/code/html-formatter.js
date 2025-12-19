/**
 * HTML 格式化工具
 */
import { copyToClipboard } from '../../utils/clipboard.js';
import { showToast } from '../../components/toast.js';

/**
 * 渲染 HTML 格式化工具頁面
 */
export function renderHtmlFormatter() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="tool-panel glass fade-in-up">
      <div class="panel-header">
        <h2 class="panel-title">
          <span class="icon">📄</span>
          HTML 格式化 / 壓縮
        </h2>
      </div>

      <div class="input-group">
        <label class="input-label">輸入 HTML</label>
        <textarea 
          id="html-input" 
          class="glass-textarea" 
          placeholder="<div><p>Hello World</p></div>"
          style="min-height: 200px;"
        ></textarea>
      </div>

      <div class="options-row">
        <label class="glass-option active" data-mode="beautify">
          <input type="radio" name="html-mode" value="beautify" checked>
          <span class="material-icons-round">format_align_left</span>
          美化
        </label>
        <label class="glass-option" data-mode="minify">
          <input type="radio" name="html-mode" value="minify">
          <span class="material-icons-round">compress</span>
          壓縮
        </label>
      </div>

      <div class="options-row" id="beautify-options">
        <label class="glass-option active" data-indent="2">
          <input type="radio" name="html-indent" value="2" checked>
          2 空格
        </label>
        <label class="glass-option" data-indent="4">
          <input type="radio" name="html-indent" value="4">
          4 空格
        </label>
        <label class="glass-option" data-indent="tab">
          <input type="radio" name="html-indent" value="tab">
          Tab
        </label>
      </div>

      <div class="action-buttons">
        <button id="html-format" class="glass-btn primary lg">
          <span class="material-icons-round">auto_fix_high</span>
          格式化
        </button>
        <button id="html-clear" class="glass-btn lg">
          <span class="material-icons-round">delete_outline</span>
          清除
        </button>
        <button id="html-copy" class="glass-btn lg">
          <span class="material-icons-round">content_copy</span>
          複製
        </button>
      </div>

      <div class="input-group">
        <label class="input-label">輸出結果</label>
        <textarea 
          id="html-output" 
          class="glass-textarea" 
          placeholder="格式化結果將顯示在這裡..." 
          readonly
          style="min-height: 200px; font-family: var(--font-mono);"
        ></textarea>
      </div>
    </div>
  `;

  // 綁定事件
  initHtmlEvents();
}

/**
 * 初始化事件
 */
function initHtmlEvents() {
  const input = document.getElementById('html-input');
  const output = document.getElementById('html-output');
  const formatBtn = document.getElementById('html-format');
  const clearBtn = document.getElementById('html-clear');
  const copyBtn = document.getElementById('html-copy');
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
      if (name === 'html-mode') {
        const mode = option.querySelector('input').value;
        beautifyOptions.style.display = mode === 'beautify' ? 'flex' : 'none';
      }
    });
  });

  // 格式化
  formatBtn?.addEventListener('click', () => {
    const mode = document.querySelector('input[name="html-mode"]:checked')?.value;
    const indentValue = document.querySelector('input[name="html-indent"]:checked')?.value;
    const text = input?.value || '';

    if (!text.trim()) {
      showToast('請輸入 HTML', 'warning');
      return;
    }

    try {
      if (mode === 'beautify') {
        output.value = beautifyHtml(text, indentValue);
      } else {
        output.value = minifyHtml(text);
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
 * 美化 HTML
 */
function beautifyHtml(html, indent) {
  let formatted = '';
  let indentLevel = 0;
  const indentChar = indent === 'tab' ? '\t' : ' '.repeat(parseInt(indent) || 2);
  
  // 移除多餘空白
  html = html.replace(/>\s+</g, '><');
  
  // 簡單的格式化邏輯
  html = html.replace(/></g, '>\n<');
  const lines = html.split('\n');
  
  for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    
    // 減少縮排
    if (line.startsWith('</')) {
      indentLevel = Math.max(0, indentLevel - 1);
    }
    
    formatted += indentChar.repeat(indentLevel) + line + '\n';
    
    // 增加縮排
    if (line.startsWith('<') && !line.startsWith('</') && !line.endsWith('/>')) {
      indentLevel++;
    }
  }
  
  return formatted.trim();
}

/**
 * 壓縮 HTML
 */
function minifyHtml(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '') // 移除註解
    .replace(/>\s+</g, '><')         // 移除標籤間空白
    .replace(/\s+/g, ' ')             // 合併空白
    .replace(/\s*>\s*/g, '>')         // 移除 > 前後空白
    .replace(/\s*<\s*/g, '<')         // 移除 < 前後空白
    .trim();
}

