/**
 * Lorem Ipsum 生成器
 */
import { generateLorem, generateChineseLorem } from '../../utils/lorem.js';
import { copyToClipboard } from '../../utils/clipboard.js';
import { showToast } from '../../components/toast.js';

/**
 * 渲染 Lorem Ipsum 生成器頁面
 */
export function renderLorem() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="tool-panel glass fade-in-up">
      <div class="panel-header">
        <h2 class="panel-title">
          <span class="icon">📝</span>
          Lorem Ipsum 假文產生器
        </h2>
      </div>

      <div class="input-group">
        <label class="input-label">語言</label>
        <div class="options-row">
          <label class="glass-option active" data-lang="latin">
            <input type="radio" name="lorem-lang" value="latin" checked>
            <span>🇬🇧</span>
            Latin (英文)
          </label>
          <label class="glass-option" data-lang="chinese">
            <input type="radio" name="lorem-lang" value="chinese">
            <span>🇹🇼</span>
            中文
          </label>
        </div>
      </div>

      <div class="input-group">
        <label class="input-label">類型</label>
        <div class="options-row">
          <label class="glass-option active" data-type="paragraphs">
            <input type="radio" name="lorem-type" value="paragraphs" checked>
            <span class="material-icons-round">article</span>
            段落
          </label>
          <label class="glass-option" data-type="sentences">
            <input type="radio" name="lorem-type" value="sentences">
            <span class="material-icons-round">format_quote</span>
            句子
          </label>
          <label class="glass-option" data-type="words">
            <input type="radio" name="lorem-type" value="words">
            <span class="material-icons-round">text_fields</span>
            單詞
          </label>
        </div>
      </div>

      <div class="input-group">
        <label class="input-label">數量</label>
        <input 
          type="number" 
          id="lorem-count" 
          class="glass-input" 
          value="3"
          min="1"
          max="50"
          style="font-family: var(--font-mono);"
        >
      </div>

      <div class="input-group" id="lorem-start-option" style="display: none;">
        <label class="glass-option active" style="justify-content: flex-start;">
          <input type="checkbox" id="lorem-start-with" checked>
          <span>以 "Lorem ipsum" 開頭（僅限 Latin）</span>
        </label>
      </div>

      <div class="action-buttons">
        <button id="lorem-generate-btn" class="glass-btn primary lg">
          <span class="material-icons-round">auto_fix_high</span>
          生成假文
        </button>
        <button id="lorem-clear-btn" class="glass-btn lg">
          <span class="material-icons-round">delete_outline</span>
          清除
        </button>
      </div>

      <div class="input-group" id="lorem-result" style="display: none;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-sm);">
          <label class="input-label" style="margin: 0;">生成的假文</label>
          <button id="lorem-copy-btn" class="glass-btn sm">
            <span class="material-icons-round" style="font-size: 16px;">content_copy</span>
            複製
          </button>
        </div>
        <textarea 
          id="lorem-output" 
          class="glass-textarea" 
          readonly
          style="min-height: 300px; font-family: var(--font-mono); font-size: var(--text-sm); line-height: 1.8;"
        ></textarea>
      </div>

      <!-- 快速範例 -->
      <div class="input-group" style="margin-top: var(--spacing-xl);">
        <div class="panel-header" style="margin-bottom: var(--spacing-md);">
          <h3 class="panel-title" style="font-size: var(--text-lg);">
            <span class="icon">⚡</span>
            快速範例
          </h3>
        </div>

        <div class="options-row" style="flex-wrap: wrap;">
          <button class="glass-btn example-btn" data-lang="latin" data-type="paragraphs" data-count="1">
            1 段 Latin
          </button>
          <button class="glass-btn example-btn" data-lang="latin" data-type="paragraphs" data-count="3">
            3 段 Latin
          </button>
          <button class="glass-btn example-btn" data-lang="latin" data-type="sentences" data-count="5">
            5 句 Latin
          </button>
          <button class="glass-btn example-btn" data-lang="latin" data-type="words" data-count="10">
            10 個單詞
          </button>
          <button class="glass-btn example-btn" data-lang="chinese" data-type="paragraphs" data-count="2">
            2 段中文
          </button>
          <button class="glass-btn example-btn" data-lang="chinese" data-type="sentences" data-count="5">
            5 句中文
          </button>
        </div>
      </div>
    </div>
  `;

  // 綁定事件
  initLoremEvents();
}

/**
 * 初始化事件
 */
function initLoremEvents() {
  const langRadios = document.querySelectorAll('input[name="lorem-lang"]');
  const typeRadios = document.querySelectorAll('input[name="lorem-type"]');
  const countInput = document.getElementById('lorem-count');
  const startWithCheckbox = document.getElementById('lorem-start-with');
  const startOptionDiv = document.getElementById('lorem-start-option');
  const generateBtn = document.getElementById('lorem-generate-btn');
  const resultDiv = document.getElementById('lorem-result');
  const outputTextarea = document.getElementById('lorem-output');

  // 語言切換
  langRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.glass-option[data-lang]').forEach(opt => {
        opt.classList.remove('active');
      });
      document.querySelector(`.glass-option[data-lang="${radio.value}"]`)?.classList.add('active');
      
      // 只有 Latin 才顯示 "以 Lorem ipsum 開頭" 選項
      if (radio.value === 'latin') {
        startOptionDiv.style.display = 'block';
      } else {
        startOptionDiv.style.display = 'none';
      }
    });
  });

  // 類型切換
  typeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.glass-option[data-type]').forEach(opt => {
        opt.classList.remove('active');
      });
      document.querySelector(`.glass-option[data-type="${radio.value}"]`)?.classList.add('active');
    });
  });

  // 生成假文
  generateBtn?.addEventListener('click', () => {
    const lang = document.querySelector('input[name="lorem-lang"]:checked')?.value || 'latin';
    const type = document.querySelector('input[name="lorem-type"]:checked')?.value || 'paragraphs';
    const count = parseInt(countInput?.value) || 1;
    const startWithLorem = lang === 'latin' && startWithCheckbox?.checked;

    if (count < 1 || count > 50) {
      showToast('數量應在 1-50 之間', 'warning');
      return;
    }

    let text;
    if (lang === 'chinese') {
      text = generateChineseLorem(type, count);
    } else {
      text = generateLorem(type, count, startWithLorem);
    }

    outputTextarea.value = text;
    resultDiv.style.display = 'block';
    showToast('假文生成成功！', 'success');
  });

  // 快速範例
  document.querySelectorAll('.example-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      const type = btn.getAttribute('data-type');
      const count = parseInt(btn.getAttribute('data-count'));

      // 設定選項
      document.querySelector(`input[name="lorem-lang"][value="${lang}"]`).checked = true;
      document.querySelector(`input[name="lorem-lang"][value="${lang}"]`).dispatchEvent(new Event('change'));
      
      document.querySelector(`input[name="lorem-type"][value="${type}"]`).checked = true;
      document.querySelector(`input[name="lorem-type"][value="${type}"]`).dispatchEvent(new Event('change'));
      
      countInput.value = count;

      // 生成
      generateBtn.click();
    });
  });

  // 複製
  document.getElementById('lorem-copy-btn')?.addEventListener('click', () => {
    const text = outputTextarea?.value;
    if (text) {
      copyToClipboard(text, '假文已複製');
    }
  });

  // 清除
  document.getElementById('lorem-clear-btn')?.addEventListener('click', () => {
    outputTextarea.value = '';
    resultDiv.style.display = 'none';
    showToast('已清除', 'info');
  });
}

