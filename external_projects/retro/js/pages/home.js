// 首頁（模式選擇）
import { t } from '../utils/i18n.js';
import { Router } from '../router.js';
import { Header } from '../components/Header.js';

export class HomePage {
  constructor() {
    this.router = new Router();
  }

  async render(container) {
    // 渲染 Header
    const header = new Header({
      showThemeToggle: true,
      showSettings: true,
      title: t('app.title')
    });
    
    container.innerHTML = `
      ${header.render()}
      <div class="page-container">
        <div class="main-content">
          <div class="container">
            <div style="text-align: center; padding: var(--spacing-2xl) 0;">
              <h1>${t('home.title')}</h1>
              <p class="text-muted" style="font-size: 1.25rem; margin-bottom: var(--spacing-2xl);">
                ${t('home.subtitle')}
              </p>
              
              <div class="card-grid" style="max-width: 900px; margin: 0 auto;">
                <div class="card card-interactive" data-mode="host">
                  <div class="card-header">
                    <h3 class="card-title">${t('home.hostMode')}</h3>
                  </div>
                  <div class="card-body">
                    <p>${t('home.hostModeDesc')}</p>
                  </div>
                </div>
                
                <div class="card card-interactive" data-mode="participant">
                  <div class="card-header">
                    <h3 class="card-title">${t('home.participantMode')}</h3>
                  </div>
                  <div class="card-body">
                    <p>${t('home.participantModeDesc')}</p>
                  </div>
                </div>
                
                <div class="card card-interactive" data-mode="solo">
                  <div class="card-header">
                    <h3 class="card-title">${t('home.soloMode')}</h3>
                  </div>
                  <div class="card-body">
                    <p>${t('home.soloModeDesc')}</p>
                  </div>
                </div>
                
                <div class="card card-interactive" data-mode="history">
                  <div class="card-header">
                    <h3 class="card-title">${t('history.title')}</h3>
                  </div>
                  <div class="card-body">
                    <p>${t('history.viewHistory') || '查看過往的回顧記錄'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // 綁定 Header 事件
    header.bindEvents(container);

    // 添加卡片出現動畫
    const cards = container.querySelectorAll('.card');
    cards.forEach((card, index) => {
      card.classList.add('card-enter');
      card.style.animationDelay = `${index * 0.1}s`;
    });

    // 綁定點擊事件
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const mode = card.dataset.mode;
        if (mode === 'host') {
          this.router.navigate('/host');
        } else if (mode === 'participant') {
          this.router.navigate('/join');
        } else if (mode === 'solo') {
          this.router.navigate('/retro');
        } else if (mode === 'history') {
          this.router.navigate('/history');
        }
      });
    });
  }

  destroy() {
    // 清理資源
  }
}

