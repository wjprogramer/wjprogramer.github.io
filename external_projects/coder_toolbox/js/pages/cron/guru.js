/**
 * Crontab Guru 工具頁面
 */
import { parseCronExpression } from '../../utils/cron-parser.js';
import { generateHumanReadable } from '../../utils/cron-human-readable.js';
import { getNextExecution, getFutureExecutions, formatDateTime, getRelativeTime } from '../../utils/cron-scheduler.js';
import { copyToClipboard } from '../../utils/clipboard.js';
import { showToast } from '../../components/toast.js';

/**
 * 常用範例
 */
const EXAMPLES = [
  { name: '每分鐘', expression: '* * * * *' },
  { name: '每小時', expression: '0 * * * *' },
  { name: '每天', expression: '0 0 * * *' },
  { name: '每週', expression: '0 0 * * 0' },
  { name: '每月', expression: '0 0 1 * *' },
  { name: '工作日', expression: '0 9 * * 1-5' },
  { name: '每 5 分鐘', expression: '*/5 * * * *' },
  { name: '每 2 小時', expression: '0 */2 * * *' }
];

/**
 * 渲染 Crontab Guru 頁面
 */
export function renderCrontabGuru() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="tool-panel glass fade-in-up">
      <div class="panel-header">
        <h2 class="panel-title">
          <span class="icon">⏰</span>
          Crontab Guru
        </h2>
      </div>

      <div class="input-group">
        <label class="input-label">Cron 表達式</label>
        <div style="display: flex; gap: var(--spacing-sm); align-items: center;">
          <input 
            type="text" 
            id="cron-input" 
            class="glass-input" 
            placeholder="0 9 * * 1-5"
            style="flex: 1; font-family: var(--font-mono);"
          >
          <button id="cron-random" class="glass-btn" title="隨機生成">
            <span class="material-icons-round">shuffle</span>
          </button>
          <button id="cron-copy" class="glass-btn" title="複製">
            <span class="material-icons-round">content_copy</span>
          </button>
        </div>
      </div>

      <div id="cron-error" style="display: none; margin-bottom: var(--spacing-md);">
        <div class="glass" style="padding: var(--spacing-md); border-color: var(--error); border-radius: var(--glass-radius-sm);">
          <div style="color: var(--error); display: flex; align-items: center; gap: var(--spacing-sm);">
            <span class="material-icons-round">error</span>
            <span id="cron-error-text"></span>
          </div>
        </div>
      </div>

      <div id="cron-result" style="display: none;">
        <div class="input-group">
          <label class="input-label">人類可讀解釋</label>
          <div class="glass" style="padding: var(--spacing-lg); border-radius: var(--glass-radius-sm); text-align: center;">
            <div style="font-size: var(--text-xl); font-weight: var(--font-semibold); color: var(--text-primary);">
              "<span id="cron-human-readable"></span>"
            </div>
          </div>
        </div>

        <div class="input-group">
          <label class="input-label">下一次執行時間</label>
          <div class="glass" style="padding: var(--spacing-md); border-radius: var(--glass-radius-sm);">
            <div style="font-size: var(--text-lg); font-weight: var(--font-medium); color: var(--accent-color);">
              <span id="cron-next-time"></span>
            </div>
            <div style="font-size: var(--text-sm); color: var(--text-secondary); margin-top: var(--spacing-xs);">
              <span id="cron-next-relative"></span>
            </div>
          </div>
        </div>

        <div class="input-group">
          <label class="input-label">未來執行時間（前 10 次）</label>
          <div class="glass" style="padding: var(--spacing-md); border-radius: var(--glass-radius-sm); max-height: 300px; overflow-y: auto;">
            <div id="cron-future-list" style="font-family: var(--font-mono); font-size: var(--text-sm); line-height: 2;"></div>
          </div>
        </div>
      </div>

      <div class="input-group" style="margin-top: var(--spacing-lg);">
        <label class="input-label">常用範例</label>
        <div class="options-row" style="flex-wrap: wrap;">
          ${EXAMPLES.map(ex => `
            <button class="glass-btn example-btn" data-expression="${ex.expression}">
              ${ex.name}
            </button>
          `).join('')}
        </div>
      </div>

      <div class="input-group" style="margin-top: var(--spacing-lg);">
        <label class="input-label">語法說明</label>
        <div class="glass" style="padding: var(--spacing-md); border-radius: var(--glass-radius-sm);">
          <table style="width: 100%; border-collapse: collapse; font-size: var(--text-sm);">
            <thead>
              <tr style="border-bottom: 1px solid var(--glass-border-subtle);">
                <th style="padding: var(--spacing-sm); text-align: left; color: var(--text-secondary);">欄位</th>
                <th style="padding: var(--spacing-sm); text-align: left; color: var(--text-secondary);">允許值</th>
                <th style="padding: var(--spacing-sm); text-align: left; color: var(--text-secondary);">特殊符號</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: var(--spacing-sm);">分鐘</td>
                <td style="padding: var(--spacing-sm); font-family: var(--font-mono);">0-59</td>
                <td style="padding: var(--spacing-sm); font-family: var(--font-mono);">* , - /</td>
              </tr>
              <tr>
                <td style="padding: var(--spacing-sm);">小時</td>
                <td style="padding: var(--spacing-sm); font-family: var(--font-mono);">0-23</td>
                <td style="padding: var(--spacing-sm); font-family: var(--font-mono);">* , - /</td>
              </tr>
              <tr>
                <td style="padding: var(--spacing-sm);">日期</td>
                <td style="padding: var(--spacing-sm); font-family: var(--font-mono);">1-31</td>
                <td style="padding: var(--spacing-sm); font-family: var(--font-mono);">* , - / ? L W</td>
              </tr>
              <tr>
                <td style="padding: var(--spacing-sm);">月份</td>
                <td style="padding: var(--spacing-sm); font-family: var(--font-mono);">1-12 或 JAN-DEC</td>
                <td style="padding: var(--spacing-sm); font-family: var(--font-mono);">* , - /</td>
              </tr>
              <tr>
                <td style="padding: var(--spacing-sm);">星期</td>
                <td style="padding: var(--spacing-sm); font-family: var(--font-mono);">0-7 或 SUN-SAT</td>
                <td style="padding: var(--spacing-sm); font-family: var(--font-mono);">* , - / ? L #</td>
              </tr>
            </tbody>
          </table>
          <div style="margin-top: var(--spacing-md); padding-top: var(--spacing-md); border-top: 1px solid var(--glass-border-subtle); font-size: var(--text-xs); color: var(--text-secondary);">
            <div><strong>*</strong> - 任何值</div>
            <div><strong>,</strong> - 值列表分隔符（例如：1,3,5）</div>
            <div><strong>-</strong> - 範圍（例如：1-5）</div>
            <div><strong>/</strong> - 步進值（例如：*/5 每 5 分鐘）</div>
          </div>
        </div>
      </div>
    </div>
  `;

  // 綁定事件
  initCrontabGuruEvents();
}

/**
 * 初始化事件
 */
function initCrontabGuruEvents() {
  const input = document.getElementById('cron-input');
  const errorDiv = document.getElementById('cron-error');
  const errorText = document.getElementById('cron-error-text');
  const resultDiv = document.getElementById('cron-result');
  const humanReadable = document.getElementById('cron-human-readable');
  const nextTime = document.getElementById('cron-next-time');
  const nextRelative = document.getElementById('cron-next-relative');
  const futureList = document.getElementById('cron-future-list');
  const randomBtn = document.getElementById('cron-random');
  const copyBtn = document.getElementById('cron-copy');

  // 即時解析
  let debounceTimer = null;
  input?.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      parseAndDisplay();
    }, 300);
  });

  // 隨機生成
  randomBtn?.addEventListener('click', () => {
    const examples = [
      '0 9 * * *',
      '0 9 * * 1-5',
      '*/5 * * * *',
      '0 0 1 * *',
      '0 0 * * 0',
      '0 9-17 * * 1-5',
      '0 0 1,15 * *',
      '0 */2 * * *',
      '30 14 * * *',
      '0 0 * * 1'
    ];
    const random = examples[Math.floor(Math.random() * examples.length)];
    input.value = random;
    parseAndDisplay();
    showToast('已生成隨機範例', 'info');
  });

  // 複製
  copyBtn?.addEventListener('click', () => {
    const text = input?.value;
    if (!text) {
      showToast('沒有可複製的內容', 'warning');
      return;
    }
    copyToClipboard(text);
  });

  // 常用範例
  document.querySelectorAll('.example-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const expression = btn.getAttribute('data-expression');
      input.value = expression;
      parseAndDisplay();
    });
  });

  /**
   * 解析並顯示結果
   */
  function parseAndDisplay() {
    const expression = input?.value || '';
    
    if (!expression.trim()) {
      errorDiv.style.display = 'none';
      resultDiv.style.display = 'none';
      return;
    }

    const parsed = parseCronExpression(expression);

    if (!parsed.isValid) {
      errorDiv.style.display = 'block';
      errorText.textContent = parsed.errors.join('；');
      resultDiv.style.display = 'none';
      return;
    }

    errorDiv.style.display = 'none';
    resultDiv.style.display = 'block';

    // 人類可讀解釋
    const humanReadableText = generateHumanReadable(expression);
    humanReadable.textContent = humanReadableText;

    // 下一次執行時間
    const next = getNextExecution(expression);
    if (next) {
      nextTime.textContent = formatDateTime(next);
      nextRelative.textContent = getRelativeTime(next);
    } else {
      nextTime.textContent = '無法計算';
      nextRelative.textContent = '';
    }

    // 未來執行時間列表
    const futures = getFutureExecutions(expression, 10);
    if (futures.length > 0) {
      futureList.innerHTML = futures.map((date, index) => {
        const relative = getRelativeTime(date);
        return `
          <div style="padding: var(--spacing-xs) 0; border-bottom: 1px solid var(--glass-border-subtle);">
            <span style="color: var(--text-muted);">${index + 1}.</span>
            <span style="margin-left: var(--spacing-sm);">${formatDateTime(date)}</span>
            <span style="margin-left: var(--spacing-sm); color: var(--text-secondary);">(${relative})</span>
          </div>
        `;
      }).join('');
    } else {
      futureList.innerHTML = '<div style="color: var(--text-secondary);">無法計算未來執行時間</div>';
    }
  }
}

