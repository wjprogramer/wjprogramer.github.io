/**
 * Home Page
 */

import { i18n } from '../utils/i18n.js';
import { theme } from '../utils/theme.js';
import { router } from '../router.js';

/**
 * 渲染首頁
 */
export function renderHome() {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <header class="header">
      <div class="container header-content">
        <div class="logo" data-i18n="app.name">敏捷估點</div>
        <div class="header-actions">
          <button class="btn btn-ghost btn-icon" id="lang-toggle" title="切換語言">
            🌐
          </button>
          <button class="btn btn-ghost btn-icon" id="theme-toggle" title="切換主題">
            ${theme.isDark() ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
    
    <main class="page">
      <div class="container">
        <div class="home-hero text-center">
          <h1 class="home-title" data-i18n="home.title">敏捷估點</h1>
          <p class="home-subtitle text-secondary" data-i18n="home.subtitle">讓估點更簡單、更有趣</p>
        </div>
        
        <div class="home-menu">
          <a href="#/solo" class="menu-card">
            <div class="menu-card-icon">🎴</div>
            <div class="menu-card-content">
              <h3 class="menu-card-title" data-i18n="home.soloMode">簡易模式</h3>
              <p class="menu-card-desc text-muted" data-i18n="home.soloModeDesc">單人選牌、翻牌練習</p>
            </div>
            <span class="menu-card-arrow">→</span>
          </a>
          
          <a href="#/host" class="menu-card">
            <div class="menu-card-icon">🏠</div>
            <div class="menu-card-content">
              <h3 class="menu-card-title" data-i18n="home.hostMode">建立房間</h3>
              <p class="menu-card-desc text-muted" data-i18n="home.hostModeDesc">建立估點房間，邀請團隊成員</p>
            </div>
            <span class="menu-card-arrow">→</span>
          </a>
          
          <a href="#/join" class="menu-card">
            <div class="menu-card-icon">🚪</div>
            <div class="menu-card-content">
              <h3 class="menu-card-title" data-i18n="home.joinMode">加入房間</h3>
              <p class="menu-card-desc text-muted" data-i18n="home.joinModeDesc">加入現有的估點房間</p>
            </div>
            <span class="menu-card-arrow">→</span>
          </a>
          
          <a href="#/history" class="menu-card">
            <div class="menu-card-icon">📋</div>
            <div class="menu-card-content">
              <h3 class="menu-card-title" data-i18n="home.history">歷史記錄</h3>
              <p class="menu-card-desc text-muted" data-i18n="home.historyDesc">查看過去的估點記錄</p>
            </div>
            <span class="menu-card-arrow">→</span>
          </a>
          
          <a href="#/settings" class="menu-card">
            <div class="menu-card-icon">⚙️</div>
            <div class="menu-card-content">
              <h3 class="menu-card-title" data-i18n="settings.title">設定</h3>
              <p class="menu-card-desc text-muted">管理應用程式設定和資料</p>
            </div>
            <span class="menu-card-arrow">→</span>
          </a>
        </div>
      </div>
    </main>
    
    <style>
      .home-hero {
        padding: var(--spacing-2xl) 0;
      }
      
      .home-title {
        font-size: clamp(2.5rem, 8vw, 4rem);
        background: linear-gradient(135deg, var(--color-primary-light), var(--color-accent));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: var(--spacing-md);
      }
      
      .home-subtitle {
        font-size: var(--font-size-xl);
      }
      
      .home-menu {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
        max-width: 500px;
        margin: 0 auto;
      }
      
      .menu-card {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        padding: var(--spacing-lg);
        background: var(--color-bg-secondary);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-xl);
        text-decoration: none;
        color: inherit;
        transition: all var(--transition-base);
        cursor: pointer;
      }
      
      .menu-card:hover {
        transform: translateY(-2px);
        border-color: var(--color-primary);
        box-shadow: 0 10px 30px rgba(99, 102, 241, 0.15);
      }
      
      .menu-card-disabled {
        opacity: 0.6;
        cursor: not-allowed;
        pointer-events: none;
      }
      
      .menu-card-icon {
        font-size: 2.5rem;
        flex-shrink: 0;
      }
      
      .menu-card-content {
        flex: 1;
        position: relative;
      }
      
      .menu-card-title {
        font-size: var(--font-size-lg);
        margin-bottom: var(--spacing-xs);
      }
      
      .menu-card-desc {
        font-size: var(--font-size-sm);
        margin: 0;
      }
      
      .menu-card-arrow {
        font-size: var(--font-size-xl);
        color: var(--color-text-muted);
        transition: transform var(--transition-fast);
      }
      
      .menu-card:hover .menu-card-arrow {
        transform: translateX(4px);
        color: var(--color-primary);
      }
      
      .coming-soon-badge {
        display: inline-block;
        font-size: var(--font-size-xs);
        padding: 2px 8px;
        background: var(--color-accent);
        color: white;
        border-radius: var(--radius-full);
        margin-top: var(--spacing-xs);
      }
      
      @media (max-width: 767px) {
        .home-hero {
          padding: var(--spacing-xl) 0;
        }
        
        .menu-card {
          padding: var(--spacing-md);
        }
        
        .menu-card-icon {
          font-size: 2rem;
        }
      }
    </style>
  `;

  // 套用翻譯
  i18n.applyTranslations();
  
  // 設定事件監聽
  setupEventListeners();
}

/**
 * 設定事件監聽
 */
function setupEventListeners() {
  // 主題切換
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const newTheme = theme.toggle();
      themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
  }
  
  // 語言切換
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', async () => {
      const currentLang = i18n.getLanguage();
      const newLang = currentLang === 'zh-TW' ? 'en' : 'zh-TW';
      await i18n.setLanguage(newLang);
    });
  }
}

