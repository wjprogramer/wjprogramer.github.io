/**
 * 文字比較工具
 */
import { copyToClipboard } from '../../utils/clipboard.js';
import { showToast } from '../../components/toast.js';

/**
 * 渲染文字比較工具頁面
 */
export function renderDiff() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="tool-panel glass fade-in-up">
      <div class="panel-header">
        <h2 class="panel-title">
          <span class="icon">🔍</span>
          文字比較
        </h2>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-md); margin-bottom: var(--spacing-lg);">
        <div class="input-group">
          <label class="input-label">文字 A</label>
          <textarea 
            id="diff-input-a" 
            class="glass-textarea" 
            placeholder="輸入第一段文字..."
            style="min-height: 200px;"
          ></textarea>
        </div>
        <div class="input-group">
          <label class="input-label">文字 B</label>
          <textarea 
            id="diff-input-b" 
            class="glass-textarea" 
            placeholder="輸入第二段文字..."
            style="min-height: 200px;"
          ></textarea>
        </div>
      </div>

      <div class="action-buttons">
        <button id="diff-compare" class="glass-btn primary lg">
          <span class="material-icons-round">compare</span>
          比較
        </button>
        <button id="diff-clear" class="glass-btn lg">
          <span class="material-icons-round">delete_outline</span>
          清除
        </button>
      </div>

      <div class="input-group" id="diff-result-container" style="display: none;">
        <label class="input-label">比較結果</label>
        <div id="diff-result" class="glass" style="padding: var(--spacing-md); min-height: 200px; font-family: var(--font-mono); font-size: var(--text-sm); line-height: 1.8;"></div>
      </div>
    </div>
  `;

  // 綁定事件
  initDiffEvents();
}

/**
 * 初始化事件
 */
function initDiffEvents() {
  const inputA = document.getElementById('diff-input-a');
  const inputB = document.getElementById('diff-input-b');
  const compareBtn = document.getElementById('diff-compare');
  const clearBtn = document.getElementById('diff-clear');
  const resultContainer = document.getElementById('diff-result-container');
  const result = document.getElementById('diff-result');

  // 比較
  compareBtn?.addEventListener('click', () => {
    const textA = inputA?.value || '';
    const textB = inputB?.value || '';

    if (!textA.trim() && !textB.trim()) {
      showToast('請輸入要比較的文字', 'warning');
      return;
    }

    try {
      const diffResult = compareText(textA, textB);
      result.innerHTML = diffResult;
      resultContainer.style.display = 'block';
      showToast('比較完成！', 'success');
    } catch (e) {
      showToast(`比較失敗：${e.message}`, 'error');
    }
  });

  // 清除
  clearBtn?.addEventListener('click', () => {
    inputA.value = '';
    inputB.value = '';
    result.innerHTML = '';
    resultContainer.style.display = 'none';
    showToast('已清除', 'info');
  });
}

/**
 * 比較文字
 */
function compareText(textA, textB) {
  const linesA = textA.split('\n');
  const linesB = textB.split('\n');
  const maxLines = Math.max(linesA.length, linesB.length);
  
  let html = '';
  let stats = {
    same: 0,
    different: 0,
    onlyA: 0,
    onlyB: 0
  };

  for (let i = 0; i < maxLines; i++) {
    const lineA = linesA[i] || '';
    const lineB = linesB[i] || '';
    
    if (lineA === lineB) {
      html += `<div style="color: var(--success); padding: 2px 0;">✓ ${escapeHtml(lineA || '(空行)')}</div>`;
      stats.same++;
    } else if (lineA && lineB) {
      html += `<div style="color: var(--error); padding: 2px 0;">✗ A: ${escapeHtml(lineA)}</div>`;
      html += `<div style="color: var(--error); padding: 2px 0;">  B: ${escapeHtml(lineB)}</div>`;
      stats.different++;
    } else if (lineA) {
      html += `<div style="color: var(--warning); padding: 2px 0;">- A: ${escapeHtml(lineA)}</div>`;
      stats.onlyA++;
    } else if (lineB) {
      html += `<div style="color: var(--warning); padding: 2px 0;">+ B: ${escapeHtml(lineB)}</div>`;
      stats.onlyB++;
    }
  }

  // 統計資訊
  const statsHtml = `
    <div style="margin-top: var(--spacing-md); padding-top: var(--spacing-md); border-top: 1px solid var(--glass-border-subtle);">
      <div style="display: flex; gap: var(--spacing-lg); flex-wrap: wrap; font-size: var(--text-xs);">
        <span style="color: var(--success);">相同: ${stats.same}</span>
        <span style="color: var(--error);">不同: ${stats.different}</span>
        <span style="color: var(--warning);">僅 A: ${stats.onlyA}</span>
        <span style="color: var(--warning);">僅 B: ${stats.onlyB}</span>
      </div>
    </div>
  `;

  return html + statsHtml;
}

/**
 * HTML 轉義
 */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

