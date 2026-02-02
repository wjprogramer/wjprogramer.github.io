// 首頁（模式選擇）
import { t } from '../utils/i18n.js';
import { Router } from '../router.js';
import { Header } from '../components/Header.js';
import { storage } from '../utils/storage/index.js';

export class HomePage {
  constructor(params = {}, query = '') {
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
                <div class="card card-interactive home-card" data-mode="host">
                  <div class="home-card-overlay"></div>
                  <div class="home-card-emoji">🏕️</div>
                  <div class="card-header">
                    <h3 class="card-title">${t('home.hostMode')}</h3>
                  </div>
                  <div class="card-body">
                    <p>${t('home.hostModeDesc')}</p>
                  </div>
                </div>
                
                <div class="card card-interactive home-card" data-mode="participant">
                  <div class="home-card-overlay"></div>
                  <div class="home-card-emoji">👥</div>
                  <div class="card-header">
                    <h3 class="card-title">${t('home.participantMode')}</h3>
                  </div>
                  <div class="card-body">
                    <p>${t('home.participantModeDesc')}</p>
                  </div>
                </div>
                
                <div class="card card-interactive home-card" data-mode="solo">
                  <div class="home-card-overlay"></div>
                  <div class="home-card-emoji">🧘</div>
                  <div class="card-header">
                    <h3 class="card-title">${t('home.soloMode')}</h3>
                  </div>
                  <div class="card-body">
                    <p>${t('home.soloModeDesc')}</p>
                  </div>
                </div>
                
                <div class="card card-interactive home-card" data-mode="history">
                  <div class="home-card-overlay"></div>
                  <div class="home-card-emoji">📚</div>
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
          // 單人模式：先創建回顧記錄並獲取 id，然後導航到 /retrospective/{id}
          this.createSoloRetroAndNavigate();
        } else if (mode === 'history') {
          this.router.navigate('/history');
        }
      });
    });
  }

  // 創建單人模式回顧並導航
  async createSoloRetroAndNavigate() {
    try {
      // 先從本地端檢查是否有未完成的單人回顧（同步，最快）
      const localRetrospectives = storage.localStorage.getRetrospectives();
      const existingSoloRetro = localRetrospectives.find(r => 
        !r.meetingId && 
        (r.status === 'collecting' || r.status === 'preparing')
      );
      
      let soloId;
      
      if (existingSoloRetro) {
        // 如果有未完成的單人回顧，使用它的 id
        soloId = existingSoloRetro.id;
      } else {
        // 如果沒有，創建新的回顧記錄
        const newRetro = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          meetingId: null,
          title: '單人回顧',
          description: null,
          date: new Date().toISOString().split('T')[0],
          createdAt: Date.now(),
          updatedAt: Date.now(),
          allowAnonymous: false,
          host: { name: 'You' },
          participants: [],
          items: {
            howDoYouFeel: [],
            whatWentWell: [],
            whatDidntGoWell: [],
            whatNeedsChange: [],
            shoutOuts: []
          },
          status: 'collecting'
        };
        
        // 先保存到本地端（同步，不會卡住）
        localRetrospectives.push(newRetro);
        storage.localStorage.saveRetrospectives(localRetrospectives);
        
        // 如果 Google Drive 已連結且已初始化，也在背景保存到雲端（不阻塞）
        if (storage.isUsingGoogleDrive()) {
          storage.googleDrive.saveRetrospectives(localRetrospectives).catch(error => {
            console.error('Error saving to cloud:', error);
          });
        }
        
        soloId = newRetro.id;
      }
      
      // 導航到回顧頁面，帶上 id（使用 path，符合 RESTful 風格）
      this.router.navigate(`/retrospective/${soloId}`);
    } catch (error) {
      console.error('Error creating solo retro:', error);
      // 如果出錯，至少導航到單人模式頁面（不帶 id，讓頁面自己處理）
      this.router.navigate('/retro');
    }
  }

  destroy() {
    // 清理資源
  }
}

