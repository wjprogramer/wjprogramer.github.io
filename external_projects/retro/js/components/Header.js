// Header 組件
import { t } from '../utils/i18n.js';
import { toggleTheme, getCurrentTheme } from '../utils/theme.js';
import { Router } from '../router.js';

export class Header {
  constructor(options = {}) {
    this.showThemeToggle = options.showThemeToggle !== false;
    this.showSettings = options.showSettings !== false;
    this.title = options.title || t('app.title');
    this.router = new Router();
  }

  render() {
    const currentTheme = getCurrentTheme();
    const themeIconClass = currentTheme === 'dark' ? 'iconoir-sun-light' : 'iconoir-half-moon';
    
    return `
      <header class="header">
        <div class="header-content">
          <h1 class="header-title" style="cursor: pointer;" onclick="window.location.hash='/'">
            ${this.title}
          </h1>
          <div class="header-actions">
            ${this.showThemeToggle ? `
              <button class="btn btn-text theme-toggle-btn" id="theme-toggle" 
                      title="${currentTheme === 'dark' ? t('settings.themeLight') : t('settings.themeDark')}"
                      style="
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 1.25rem;
                        border: 1px solid var(--border-color);
                        background: var(--bg-secondary);
                        transition: all var(--transition-base);
                      ">
                <span class="${themeIconClass}"></span>
              </button>
            ` : ''}
            ${this.showSettings ? `
              <button class="btn btn-text" id="settings-btn" 
                      title="${t('settings.title')}"
                      onclick="window.location.hash='/settings'"
                      style="
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 1.25rem;
                        border: 1px solid var(--border-color);
                        background: var(--bg-secondary);
                        transition: all var(--transition-base);
                      ">
                <span class="iconoir-settings"></span>
              </button>
            ` : ''}
          </div>
        </div>
      </header>
    `;
  }

  bindEvents(container) {
    if (this.showThemeToggle) {
      const themeBtn = container.querySelector('#theme-toggle');
      if (themeBtn) {
        const updateThemeIcon = async () => {
          const currentTheme = await getCurrentTheme();
          const iconSpan = themeBtn.querySelector('span');
          if (iconSpan) {
            iconSpan.className = currentTheme === 'dark' ? 'iconoir-sun-light' : 'iconoir-half-moon';
          }
          themeBtn.title = currentTheme === 'dark' ? t('settings.themeLight') : t('settings.themeDark');
        };
        
        themeBtn.addEventListener('click', async () => {
          await toggleTheme().catch(err => console.error('Failed to toggle theme:', err));
          // 稍微延遲更新，確保主題已切換
          setTimeout(() => updateThemeIcon().catch(err => console.error('Failed to update theme icon:', err)), 100);
        });
        
        // 監聽主題變化事件（如果有的話）
        window.addEventListener('themechange', () => {
          updateThemeIcon().catch(err => console.error('Failed to update theme icon:', err));
        });
        
        // 初始化圖示
        updateThemeIcon().catch(err => console.error('Failed to update theme icon:', err));
      }
    }
  }
}

