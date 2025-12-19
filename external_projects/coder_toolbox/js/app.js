/**
 * Coder Toolbox - 應用程式入口
 */
import { router } from './router.js';
import { initTheme } from './utils/theme.js';
import { renderHeader } from './components/header.js';
import { renderSidebar, updateSidebarActive } from './components/sidebar.js';

// 頁面模組
import { renderHome } from './pages/home.js';
import { renderBase64 } from './pages/encoding/base64.js';
import { renderUrlEncode } from './pages/encoding/url-encode.js';
import { renderHash } from './pages/encoding/hash.js';
import { renderUnicode } from './pages/encoding/unicode.js';
import { renderJsonFormatter } from './pages/code/json.js';
import { renderHtmlFormatter } from './pages/code/html-formatter.js';
import { renderCssFormatter } from './pages/code/css-formatter.js';
import { renderJsFormatter } from './pages/code/js-formatter.js';
import { renderQrCode } from './pages/image/qrcode.js';
import { renderDataUri } from './pages/image/data-uri.js';
import { renderDiff } from './pages/text/diff.js';
import { renderCase } from './pages/text/case.js';
import { renderCrontabGuru } from './pages/cron/guru.js';
import { renderColorConverter } from './pages/color/converter.js';
import { renderColorPalette } from './pages/color/palette.js';

/**
 * 初始化應用程式
 */
function initApp() {
  // 初始化主題
  initTheme();

  // 渲染 Header 和 Sidebar
  renderHeader();
  renderSidebar();

  // 註冊路由
  registerRoutes();

  // 路由變化時更新 Sidebar
  router.beforeEach = ({ path }) => {
    updateSidebarActive();
    return true;
  };

  console.log('🧰 Coder Toolbox initialized!');
}

/**
 * 註冊所有路由
 */
function registerRoutes() {
  router
    // 首頁
    .register('/', renderHome)
    
    // 編碼工具
    .register('/encoding/base64', renderBase64)
    .register('/encoding/url', renderUrlEncode)
    .register('/encoding/hash', renderHash)
    .register('/encoding/unicode', renderUnicode)
    
    // 程式碼工具
    .register('/code/json', renderJsonFormatter)
    .register('/code/html', renderHtmlFormatter)
    .register('/code/css', renderCssFormatter)
    .register('/code/js', renderJsFormatter)
    
    // 圖片工具
    .register('/image/qrcode', renderQrCode)
    .register('/image/datauri', renderDataUri)
    
    // 文字工具
    .register('/text/diff', renderDiff)
    .register('/text/case', renderCase)
    
    // 時間工具
    .register('/cron/guru', renderCrontabGuru)
    
    // 顏色工具
    .register('/color/converter', renderColorConverter)
    .register('/color/palette', renderColorPalette)
    
    // 關於頁面
    .register('/about', renderAbout);
}

/**
 * 渲染「即將推出」頁面
 * @param {string} toolName
 * @returns {Function}
 */
function renderComingSoon(toolName) {
  return () => {
    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = `
      <div class="tool-panel glass fade-in-up" style="text-align: center; padding: var(--spacing-2xl);">
        <div style="font-size: 64px; margin-bottom: var(--spacing-lg);">🚧</div>
        <h2 style="font-size: var(--text-2xl); margin-bottom: var(--spacing-md);">${toolName}</h2>
        <p style="color: var(--text-secondary); margin-bottom: var(--spacing-lg);">
          此功能即將推出，敬請期待！
        </p>
        <a href="#/" class="glass-btn primary">
          <span class="material-icons-round">home</span>
          返回首頁
        </a>
      </div>
    `;
  };
}

/**
 * 渲染關於頁面
 */
function renderAbout() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="tool-panel glass fade-in-up">
      <div class="panel-header">
        <h2 class="panel-title">
          <span class="icon">ℹ️</span>
          關於 Coder Toolbox
        </h2>
      </div>
      
      <div style="line-height: 1.8;">
        <p style="margin-bottom: var(--spacing-lg);">
          <strong>Coder Toolbox</strong> 是一個為程式開發者打造的線上工具箱，
          提供各種常用的編碼、加密、格式化等功能。
        </p>
        
        <h3 style="margin-bottom: var(--spacing-md);">✨ 特色</h3>
        <ul style="margin-bottom: var(--spacing-lg); padding-left: var(--spacing-lg);">
          <li style="margin-bottom: var(--spacing-sm);">🪟 Liquid Glass 現代化 UI 設計</li>
          <li style="margin-bottom: var(--spacing-sm);">🔒 所有處理都在瀏覽器端完成，保護您的隱私</li>
          <li style="margin-bottom: var(--spacing-sm);">📱 響應式設計，支援各種裝置</li>
          <li style="margin-bottom: var(--spacing-sm);">🌙 支援深色模式</li>
          <li style="margin-bottom: var(--spacing-sm);">⚡ 無需安裝，開啟即用</li>
        </ul>
        
        <h3 style="margin-bottom: var(--spacing-md);">🛠️ 可用工具</h3>
        <ul style="margin-bottom: var(--spacing-lg); padding-left: var(--spacing-lg);">
          <li style="margin-bottom: var(--spacing-sm);">Base64 編碼/解碼</li>
          <li style="margin-bottom: var(--spacing-sm);">URL 編碼/解碼</li>
          <li style="margin-bottom: var(--spacing-sm);">Hash 計算 (MD5, SHA-1, SHA-256, SHA-512)</li>
          <li style="margin-bottom: var(--spacing-sm);">Unicode / HTML 實體編碼</li>
          <li style="margin-bottom: var(--spacing-sm);">JSON 格式化/驗證</li>
          <li style="margin-bottom: var(--spacing-sm);">HTML 格式化/壓縮</li>
          <li style="margin-bottom: var(--spacing-sm);">CSS 格式化/壓縮</li>
          <li style="margin-bottom: var(--spacing-sm);">JavaScript 格式化/壓縮</li>
          <li style="margin-bottom: var(--spacing-sm);">QR Code 生成</li>
          <li style="margin-bottom: var(--spacing-sm);">Data URI 轉換</li>
          <li style="margin-bottom: var(--spacing-sm);">文字比較</li>
          <li style="margin-bottom: var(--spacing-sm);">大小寫轉換</li>
          <li style="margin-bottom: var(--spacing-sm);">Crontab Guru - Cron 表達式解析</li>
          <li style="margin-bottom: var(--spacing-sm);">色彩格式轉換 (HEX/RGB/HSL)</li>
          <li style="margin-bottom: var(--spacing-sm);">調色盤生成器</li>
        </ul>
        
        <h3 style="margin-bottom: var(--spacing-md);">📚 技術棧</h3>
        <p style="color: var(--text-secondary);">
          純 HTML + CSS + JavaScript，無框架依賴<br>
          使用 CryptoJS 進行加密運算<br>
          採用 Liquid Glass 設計風格
        </p>
      </div>
    </div>
  `;
}

// 啟動應用程式
initApp();

