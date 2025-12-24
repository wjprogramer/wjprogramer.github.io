/**
 * JWT 解析/生成工具
 */
import { parseJwt, generateJwt, formatJson, checkJwtExpiry, formatTimestamp } from '../../utils/jwt.js';
import { copyToClipboard } from '../../utils/clipboard.js';
import { showToast } from '../../components/toast.js';

/**
 * 渲染 JWT 工具頁面
 */
export function renderJwt() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="tool-panel glass fade-in-up">
      <div class="panel-header">
        <h2 class="panel-title">
          <span class="icon">🔐</span>
          JWT 解析/生成
        </h2>
      </div>

      <div class="options-row" style="margin-bottom: var(--spacing-lg);">
        <label class="glass-option active" data-mode="parse">
          <input type="radio" name="jwt-mode" value="parse" checked>
          <span class="material-icons-round">code</span>
          解析 Token
        </label>
        <label class="glass-option" data-mode="generate">
          <input type="radio" name="jwt-mode" value="generate">
          <span class="material-icons-round">add_circle</span>
          生成 Token
        </label>
      </div>

      <!-- 解析模式 -->
      <div id="jwt-parse-mode">
        <div class="input-group">
          <label class="input-label">JWT Token</label>
          <textarea 
            id="jwt-token-input" 
            class="glass-textarea" 
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
            style="min-height: 120px; font-family: var(--font-mono); font-size: var(--text-sm);"
          ></textarea>
        </div>

        <div class="action-buttons">
          <button id="jwt-parse-btn" class="glass-btn primary lg">
            <span class="material-icons-round">search</span>
            解析 Token
          </button>
          <button id="jwt-clear-parse" class="glass-btn lg">
            <span class="material-icons-round">delete_outline</span>
            清除
          </button>
        </div>

        <div id="jwt-parse-result" style="display: none;">
          <div class="input-group">
            <label class="input-label">解析結果</label>
            
            <div class="glass" style="padding: var(--spacing-md); border-radius: var(--glass-radius-sm); margin-bottom: var(--spacing-md);">
              <div style="display: flex; align-items: center; gap: var(--spacing-sm); margin-bottom: var(--spacing-sm);">
                <span id="jwt-validity-icon" style="font-size: 24px;"></span>
                <span id="jwt-validity-text" style="font-weight: var(--font-semibold);"></span>
              </div>
              <div id="jwt-error" style="color: var(--error); display: none;"></div>
              <div id="jwt-expiry-info" style="display: none; margin-top: var(--spacing-sm); padding-top: var(--spacing-sm); border-top: 1px solid var(--glass-border-subtle);">
                <div style="font-size: var(--text-sm); color: var(--text-secondary);">
                  <div>過期時間：<span id="jwt-expires-at"></span></div>
                  <div id="jwt-remaining-time" style="margin-top: var(--spacing-xs);"></div>
                </div>
              </div>
            </div>

            <div class="input-group">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-sm);">
                <label class="input-label" style="margin: 0;">Header</label>
                <button id="jwt-copy-header" class="glass-btn sm">
                  <span class="material-icons-round" style="font-size: 16px;">content_copy</span>
                </button>
              </div>
              <textarea 
                id="jwt-header-output" 
                class="glass-textarea" 
                readonly
                style="min-height: 100px; font-family: var(--font-mono); font-size: var(--text-sm);"
              ></textarea>
            </div>

            <div class="input-group">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-sm);">
                <label class="input-label" style="margin: 0;">Payload</label>
                <button id="jwt-copy-payload" class="glass-btn sm">
                  <span class="material-icons-round" style="font-size: 16px;">content_copy</span>
                </button>
              </div>
              <textarea 
                id="jwt-payload-output" 
                class="glass-textarea" 
                readonly
                style="min-height: 150px; font-family: var(--font-mono); font-size: var(--text-sm);"
              ></textarea>
            </div>

            <div class="input-group">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-sm);">
                <label class="input-label" style="margin: 0;">Signature</label>
                <button id="jwt-copy-signature" class="glass-btn sm">
                  <span class="material-icons-round" style="font-size: 16px;">content_copy</span>
                </button>
              </div>
              <input 
                type="text" 
                id="jwt-signature-output" 
                class="glass-input" 
                readonly
                style="font-family: var(--font-mono); font-size: var(--text-sm);"
              >
            </div>
          </div>
        </div>
      </div>

      <!-- 生成模式 -->
      <div id="jwt-generate-mode" style="display: none;">
        <div class="input-group">
          <label class="input-label">Payload (JSON)</label>
          <textarea 
            id="jwt-payload-input" 
            class="glass-textarea" 
            placeholder='{"sub": "1234567890", "name": "John Doe", "iat": 1516239022}'
            style="min-height: 150px; font-family: var(--font-mono); font-size: var(--text-sm);"
          ></textarea>
        </div>

        <div class="input-group">
          <label class="input-label">Header (JSON，可選)</label>
          <textarea 
            id="jwt-header-input" 
            class="glass-textarea" 
            placeholder='{"alg": "HS256", "typ": "JWT"}'
            style="min-height: 100px; font-family: var(--font-mono); font-size: var(--text-sm);"
          ></textarea>
        </div>

        <div class="action-buttons">
          <button id="jwt-generate-btn" class="glass-btn primary lg">
            <span class="material-icons-round">add_circle</span>
            生成 Token
          </button>
          <button id="jwt-clear-generate" class="glass-btn lg">
            <span class="material-icons-round">delete_outline</span>
            清除
          </button>
        </div>

        <div id="jwt-generate-result" style="display: none;">
          <div class="input-group">
            <label class="input-label">生成的 Token</label>
            <div style="display: flex; gap: var(--spacing-sm); align-items: center;">
              <textarea 
                id="jwt-token-output" 
                class="glass-textarea" 
                readonly
                style="flex: 1; min-height: 100px; font-family: var(--font-mono); font-size: var(--text-sm);"
              ></textarea>
              <button id="jwt-copy-token" class="glass-btn">
                <span class="material-icons-round">content_copy</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // 綁定事件
  initJwtEvents();
}

/**
 * 初始化事件
 */
function initJwtEvents() {
  // 模式切換
  document.querySelectorAll('input[name="jwt-mode"]').forEach(radio => {
    radio.addEventListener('change', () => {
      const mode = radio.value;
      const parseMode = document.getElementById('jwt-parse-mode');
      const generateMode = document.getElementById('jwt-generate-mode');
      
      document.querySelectorAll('.glass-option[data-mode]').forEach(opt => {
        opt.classList.remove('active');
      });
      document.querySelector(`.glass-option[data-mode="${mode}"]`)?.classList.add('active');
      
      if (mode === 'parse') {
        parseMode.style.display = 'block';
        generateMode.style.display = 'none';
      } else {
        parseMode.style.display = 'none';
        generateMode.style.display = 'block';
      }
    });
  });

  // 解析 Token
  const parseBtn = document.getElementById('jwt-parse-btn');
  const tokenInput = document.getElementById('jwt-token-input');
  const parseResult = document.getElementById('jwt-parse-result');
  const headerOutput = document.getElementById('jwt-header-output');
  const payloadOutput = document.getElementById('jwt-payload-output');
  const signatureOutput = document.getElementById('jwt-signature-output');
  const validityIcon = document.getElementById('jwt-validity-icon');
  const validityText = document.getElementById('jwt-validity-text');
  const errorDiv = document.getElementById('jwt-error');
  const expiryInfo = document.getElementById('jwt-expiry-info');
  const expiresAt = document.getElementById('jwt-expires-at');
  const remainingTime = document.getElementById('jwt-remaining-time');

  parseBtn?.addEventListener('click', () => {
    const token = tokenInput?.value.trim();
    if (!token) {
      showToast('請輸入 JWT Token', 'warning');
      return;
    }

    const result = parseJwt(token);
    parseResult.style.display = 'block';

    if (result.isValid) {
      validityIcon.textContent = '✅';
      validityText.textContent = 'Token 格式有效';
      validityText.style.color = 'var(--success)';
      errorDiv.style.display = 'none';

      headerOutput.value = formatJson(result.header);
      payloadOutput.value = formatJson(result.payload);
      signatureOutput.value = result.signature;

      // 檢查過期時間
      if (result.payload.exp) {
        const expiry = checkJwtExpiry(result.payload);
        expiryInfo.style.display = 'block';
        expiresAt.textContent = formatTimestamp(result.payload.exp);
        
        if (expiry.isExpired) {
          remainingTime.textContent = '已過期';
          remainingTime.style.color = 'var(--error)';
        } else {
          remainingTime.textContent = `剩餘時間：${expiry.remainingTime}`;
          remainingTime.style.color = 'var(--success)';
        }
      } else {
        expiryInfo.style.display = 'none';
      }
    } else {
      validityIcon.textContent = '❌';
      validityText.textContent = 'Token 格式無效';
      validityText.style.color = 'var(--error)';
      errorDiv.textContent = result.error || '未知錯誤';
      errorDiv.style.display = 'block';
      expiryInfo.style.display = 'none';

      headerOutput.value = result.header ? formatJson(result.header) : '';
      payloadOutput.value = result.payload ? formatJson(result.payload) : '';
      signatureOutput.value = result.signature || '';
    }
  });

  // 生成 Token
  const generateBtn = document.getElementById('jwt-generate-btn');
  const payloadInput = document.getElementById('jwt-payload-input');
  const headerInput = document.getElementById('jwt-header-input');
  const generateResult = document.getElementById('jwt-generate-result');
  const tokenOutput = document.getElementById('jwt-token-output');

  generateBtn?.addEventListener('click', () => {
    const payloadStr = payloadInput?.value.trim();
    if (!payloadStr) {
      showToast('請輸入 Payload', 'warning');
      return;
    }

    try {
      const payload = JSON.parse(payloadStr);
      let header = {};
      
      if (headerInput?.value.trim()) {
        try {
          header = JSON.parse(headerInput.value.trim());
        } catch (e) {
          showToast('Header JSON 格式錯誤', 'error');
          return;
        }
      }

      const token = generateJwt(payload, header);
      tokenOutput.value = token;
      generateResult.style.display = 'block';
      showToast('Token 生成成功！', 'success');
    } catch (e) {
      showToast('Payload JSON 格式錯誤', 'error');
    }
  });

  // 複製功能
  document.getElementById('jwt-copy-header')?.addEventListener('click', () => {
    copyToClipboard(headerOutput.value, 'Header 已複製');
  });

  document.getElementById('jwt-copy-payload')?.addEventListener('click', () => {
    copyToClipboard(payloadOutput.value, 'Payload 已複製');
  });

  document.getElementById('jwt-copy-signature')?.addEventListener('click', () => {
    copyToClipboard(signatureOutput.value, 'Signature 已複製');
  });

  document.getElementById('jwt-copy-token')?.addEventListener('click', () => {
    copyToClipboard(tokenOutput.value, 'Token 已複製');
  });

  // 清除功能
  document.getElementById('jwt-clear-parse')?.addEventListener('click', () => {
    tokenInput.value = '';
    parseResult.style.display = 'none';
    showToast('已清除', 'info');
  });

  document.getElementById('jwt-clear-generate')?.addEventListener('click', () => {
    payloadInput.value = '';
    headerInput.value = '';
    generateResult.style.display = 'none';
    showToast('已清除', 'info');
  });
}


