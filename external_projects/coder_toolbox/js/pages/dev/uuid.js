/**
 * UUID 生成器
 */
import { generateUuidV4, generateUuidV1, generateShortUuid, generateMultipleUuids, isValidUuid } from '../../utils/uuid.js';
import { copyToClipboard } from '../../utils/clipboard.js';
import { showToast } from '../../components/toast.js';

/**
 * 渲染 UUID 生成器頁面
 */
export function renderUuid() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="tool-panel glass fade-in-up">
      <div class="panel-header">
        <h2 class="panel-title">
          <span class="icon">🆔</span>
          UUID 生成器
        </h2>
      </div>

      <div class="input-group">
        <label class="input-label">UUID 版本</label>
        <div class="options-row">
          <label class="glass-option active" data-version="v4">
            <input type="radio" name="uuid-version" value="v4" checked>
            <span class="material-icons-round">shuffle</span>
            UUID v4 (隨機)
          </label>
          <label class="glass-option" data-version="v1">
            <input type="radio" name="uuid-version" value="v1">
            <span class="material-icons-round">schedule</span>
            UUID v1 (時間戳)
          </label>
          <label class="glass-option" data-version="short">
            <input type="radio" name="uuid-version" value="short">
            <span class="material-icons-round">text_fields</span>
            短 UUID (無連字號)
          </label>
        </div>
      </div>

      <div class="input-group">
        <label class="input-label">生成數量</label>
        <input 
          type="number" 
          id="uuid-count" 
          class="glass-input" 
          value="1"
          min="1"
          max="100"
          style="font-family: var(--font-mono);"
        >
      </div>

      <div class="action-buttons">
        <button id="uuid-generate-btn" class="glass-btn primary lg">
          <span class="material-icons-round">add_circle</span>
          生成 UUID
        </button>
        <button id="uuid-clear-btn" class="glass-btn lg">
          <span class="material-icons-round">delete_outline</span>
          清除
        </button>
      </div>

      <div class="input-group" id="uuid-result" style="display: none;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-sm);">
          <label class="input-label" style="margin: 0;">生成的 UUID</label>
          <button id="uuid-copy-all-btn" class="glass-btn sm">
            <span class="material-icons-round" style="font-size: 16px;">content_copy</span>
            複製全部
          </button>
        </div>
        <div id="uuid-list" class="glass" style="padding: var(--spacing-md); border-radius: var(--glass-radius-sm); max-height: 400px; overflow-y: auto;"></div>
      </div>

      <!-- UUID 驗證工具 -->
      <div class="input-group" style="margin-top: var(--spacing-xl);">
        <div class="panel-header" style="margin-bottom: var(--spacing-md);">
          <h3 class="panel-title" style="font-size: var(--text-lg);">
            <span class="icon">✓</span>
            UUID 驗證工具
          </h3>
        </div>

        <div class="input-group">
          <label class="input-label">輸入 UUID</label>
          <input 
            type="text" 
            id="uuid-validate-input" 
            class="glass-input" 
            placeholder="550e8400-e29b-41d4-a716-446655440000"
            style="font-family: var(--font-mono);"
          >
        </div>

        <div class="action-buttons">
          <button id="uuid-validate-btn" class="glass-btn primary">
            <span class="material-icons-round">check_circle</span>
            驗證 UUID
          </button>
        </div>

        <div id="uuid-validate-result" style="display: none; margin-top: var(--spacing-md);">
          <div class="glass" style="padding: var(--spacing-md); border-radius: var(--glass-radius-sm);">
            <div id="uuid-validate-status" style="display: flex; align-items: center; gap: var(--spacing-sm);">
              <span id="uuid-validate-icon" style="font-size: 24px;"></span>
              <span id="uuid-validate-text" style="font-weight: var(--font-semibold);"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // 綁定事件
  initUuidEvents();
}

/**
 * 初始化事件
 */
function initUuidEvents() {
  // 版本選擇
  document.querySelectorAll('input[name="uuid-version"]').forEach(radio => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.glass-option[data-version]').forEach(opt => {
        opt.classList.remove('active');
      });
      document.querySelector(`.glass-option[data-version="${radio.value}"]`)?.classList.add('active');
    });
  });

  // 生成 UUID
  const generateBtn = document.getElementById('uuid-generate-btn');
  const countInput = document.getElementById('uuid-count');
  const resultDiv = document.getElementById('uuid-result');
  const listDiv = document.getElementById('uuid-list');

  generateBtn?.addEventListener('click', () => {
    const version = document.querySelector('input[name="uuid-version"]:checked')?.value || 'v4';
    const count = parseInt(countInput?.value) || 1;

    if (count < 1 || count > 100) {
      showToast('數量應在 1-100 之間', 'warning');
      return;
    }

    const uuids = generateMultipleUuids(count, version);
    displayUuidList(uuids, listDiv);
    resultDiv.style.display = 'block';
    showToast(`已生成 ${count} 個 UUID`, 'success');
  });

  // 驗證 UUID
  const validateBtn = document.getElementById('uuid-validate-btn');
  const validateInput = document.getElementById('uuid-validate-input');
  const validateResult = document.getElementById('uuid-validate-result');
  const validateIcon = document.getElementById('uuid-validate-icon');
  const validateText = document.getElementById('uuid-validate-text');

  validateBtn?.addEventListener('click', () => {
    const uuid = validateInput?.value.trim();
    if (!uuid) {
      showToast('請輸入 UUID', 'warning');
      return;
    }

    const isValid = isValidUuid(uuid);
    validateResult.style.display = 'block';

    if (isValid) {
      validateIcon.textContent = '✅';
      validateText.textContent = 'UUID 格式有效';
      validateText.style.color = 'var(--success)';
    } else {
      validateIcon.textContent = '❌';
      validateText.textContent = 'UUID 格式無效';
      validateText.style.color = 'var(--error)';
    }
  });

  // 複製全部
  document.getElementById('uuid-copy-all-btn')?.addEventListener('click', () => {
    const uuids = Array.from(listDiv.querySelectorAll('.uuid-item')).map(item => 
      item.querySelector('.uuid-value')?.textContent
    ).filter(Boolean).join('\n');
    
    if (uuids) {
      copyToClipboard(uuids, '已複製所有 UUID');
    }
  });

  // 清除
  document.getElementById('uuid-clear-btn')?.addEventListener('click', () => {
    listDiv.innerHTML = '';
    resultDiv.style.display = 'none';
    showToast('已清除', 'info');
  });
}

/**
 * 顯示 UUID 列表
 */
function displayUuidList(uuids, container) {
  container.innerHTML = uuids.map((uuid, index) => `
    <div class="uuid-item glass" style="padding: var(--spacing-sm); border-radius: var(--glass-radius-xs); margin-bottom: var(--spacing-xs); display: flex; align-items: center; justify-content: space-between; gap: var(--spacing-sm);">
      <div style="flex: 1; display: flex; align-items: center; gap: var(--spacing-sm);">
        <span style="color: var(--text-secondary); font-size: var(--text-sm); min-width: 30px;">${index + 1}.</span>
        <span class="uuid-value" style="font-family: var(--font-mono); font-size: var(--text-sm); flex: 1;">${uuid}</span>
      </div>
      <button class="glass-btn sm copy-uuid-btn" data-uuid="${uuid}">
        <span class="material-icons-round" style="font-size: 16px;">content_copy</span>
      </button>
    </div>
  `).join('');

  // 綁定複製按鈕
  container.querySelectorAll('.copy-uuid-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const uuid = btn.getAttribute('data-uuid');
      copyToClipboard(uuid, 'UUID 已複製');
    });
  });

  // 點擊 UUID 項目複製
  container.querySelectorAll('.uuid-item').forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('.copy-uuid-btn')) return;
      const uuid = item.querySelector('.uuid-value')?.textContent;
      if (uuid) {
        copyToClipboard(uuid, 'UUID 已複製');
      }
    });
  });
}


