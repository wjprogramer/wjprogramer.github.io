/**
 * Hash 計算工具
 * 使用 CryptoJS 函式庫
 */
import { copyToClipboard } from '../../utils/clipboard.js';
import { showToast } from '../../components/toast.js';

/**
 * 渲染 Hash 計算工具頁面
 */
export function renderHash() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="tool-panel glass fade-in-up">
      <div class="panel-header">
        <h2 class="panel-title">
          <span class="icon">#️⃣</span>
          Hash 雜湊計算
        </h2>
      </div>

      <div class="input-group">
        <label class="input-label">輸入文字</label>
        <textarea 
          id="hash-input" 
          class="glass-textarea" 
          placeholder="在此輸入要計算雜湊的文字..."
        ></textarea>
      </div>

      <div class="options-row">
        <label class="glass-option active" data-algo="MD5">
          <input type="radio" name="hash-algo" value="MD5" checked>
          MD5
        </label>
        <label class="glass-option" data-algo="SHA1">
          <input type="radio" name="hash-algo" value="SHA1">
          SHA-1
        </label>
        <label class="glass-option" data-algo="SHA256">
          <input type="radio" name="hash-algo" value="SHA256">
          SHA-256
        </label>
        <label class="glass-option" data-algo="SHA512">
          <input type="radio" name="hash-algo" value="SHA512">
          SHA-512
        </label>
      </div>

      <div class="options-row">
        <label class="glass-option active" data-case="lower">
          <input type="radio" name="hash-case" value="lower" checked>
          小寫
        </label>
        <label class="glass-option" data-case="upper">
          <input type="radio" name="hash-case" value="upper">
          大寫
        </label>
      </div>

      <div class="action-buttons">
        <button id="hash-calculate" class="glass-btn primary lg">
          <span class="material-icons-round">calculate</span>
          計算
        </button>
        <button id="hash-clear" class="glass-btn lg">
          <span class="material-icons-round">delete_outline</span>
          清除
        </button>
        <button id="hash-copy" class="glass-btn lg">
          <span class="material-icons-round">content_copy</span>
          複製結果
        </button>
      </div>

      <div class="input-group">
        <label class="input-label">雜湊結果</label>
        <textarea 
          id="hash-output" 
          class="glass-textarea" 
          placeholder="計算結果將顯示在這裡..." 
          readonly
          style="font-family: var(--font-mono); word-break: break-all;"
        ></textarea>
      </div>

      <div id="hash-all-results" class="hash-results" style="margin-top: var(--spacing-lg);"></div>
    </div>
  `;

  // 綁定事件
  initHashEvents();
}

/**
 * 初始化事件
 */
function initHashEvents() {
  const input = document.getElementById('hash-input');
  const output = document.getElementById('hash-output');
  const resultsContainer = document.getElementById('hash-all-results');
  const calculateBtn = document.getElementById('hash-calculate');
  const clearBtn = document.getElementById('hash-clear');
  const copyBtn = document.getElementById('hash-copy');

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

  // 計算
  calculateBtn?.addEventListener('click', () => {
    const algo = document.querySelector('input[name="hash-algo"]:checked')?.value;
    const caseType = document.querySelector('input[name="hash-case"]:checked')?.value;
    const text = input?.value || '';

    if (!text.trim()) {
      showToast('請輸入內容', 'warning');
      return;
    }

    // 檢查 CryptoJS 是否載入
    if (typeof CryptoJS === 'undefined') {
      showToast('加密函式庫未載入', 'error');
      return;
    }

    try {
      let hash = '';
      
      switch (algo) {
        case 'MD5':
          hash = CryptoJS.MD5(text).toString();
          break;
        case 'SHA1':
          hash = CryptoJS.SHA1(text).toString();
          break;
        case 'SHA256':
          hash = CryptoJS.SHA256(text).toString();
          break;
        case 'SHA512':
          hash = CryptoJS.SHA512(text).toString();
          break;
        default:
          hash = CryptoJS.MD5(text).toString();
      }

      output.value = caseType === 'upper' ? hash.toUpperCase() : hash.toLowerCase();
      
      // 顯示所有演算法結果
      showAllHashes(text, caseType, resultsContainer);
      
      showToast('計算完成！', 'success');
    } catch (e) {
      output.value = '';
      showToast(`計算失敗：${e.message}`, 'error');
    }
  });

  // 清除
  clearBtn?.addEventListener('click', () => {
    input.value = '';
    output.value = '';
    resultsContainer.innerHTML = '';
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
 * 顯示所有演算法的雜湊結果
 */
function showAllHashes(text, caseType, container) {
  if (!container || typeof CryptoJS === 'undefined') return;

  const algorithms = [
    { name: 'MD5', fn: CryptoJS.MD5 },
    { name: 'SHA-1', fn: CryptoJS.SHA1 },
    { name: 'SHA-256', fn: CryptoJS.SHA256 },
    { name: 'SHA-512', fn: CryptoJS.SHA512 }
  ];

  let html = '<div style="display: grid; gap: var(--spacing-sm);">';
  
  algorithms.forEach(algo => {
    let hash = algo.fn(text).toString();
    hash = caseType === 'upper' ? hash.toUpperCase() : hash.toLowerCase();
    
    html += `
      <div class="glass" style="padding: var(--spacing-md); border-radius: var(--glass-radius-sm);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-xs);">
          <strong style="font-size: var(--text-sm); color: var(--text-secondary);">${algo.name}</strong>
          <button class="glass-btn sm copy-hash-btn" data-hash="${hash}">
            <span class="material-icons-round">content_copy</span>
          </button>
        </div>
        <code style="font-size: var(--text-xs); word-break: break-all; color: var(--text-primary);">${hash}</code>
      </div>
    `;
  });

  html += '</div>';
  container.innerHTML = html;

  // 綁定複製按鈕
  container.querySelectorAll('.copy-hash-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const hash = btn.getAttribute('data-hash');
      copyToClipboard(hash);
    });
  });
}

