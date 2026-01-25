/**
 * 首頁
 */
import { t } from '../utils/i18n.js';
import { router } from '../router.js';
import { updateActiveNav } from '../components/navigation.js';

/**
 * 渲染首頁
 */
export function renderHome({ path, params }) {
  const app = document.getElementById('app');
  updateActiveNav();
  
  app.innerHTML = `
    <div class="home-page page-enter">
      <div class="container">
        <section class="hero">
          <h1 class="hero__title">Badminton Notes</h1>
          <p class="hero__description">
            系統化整理羽毛球相關知識，幫助加深對羽毛球的理解，並提升在球場上的表現
          </p>
          
          <div class="hero__actions">
            <a href="#/content" class="btn-neu btn-neu--primary">
              <span data-i18n="nav.content">開始探索</span>
              <span class="material-icons-round">arrow_forward</span>
            </a>
            <a href="#/learning-path" class="btn-neu">
              <span data-i18n="nav.learning-path">學習路徑</span>
            </a>
          </div>
        </section>
        
        <section class="features">
          <h2 class="features__title">主要功能</h2>
          <div class="features__grid">
            <div class="feature-card">
              <div class="feature-card__icon">
                <span class="material-icons-round">article</span>
              </div>
              <h3 class="feature-card__title">豐富內容</h3>
              <p class="feature-card__description">
                涵蓋基礎知識、技術教學、訓練方法等完整內容
              </p>
            </div>
            
            <div class="feature-card">
              <div class="feature-card__icon">
                <span class="material-icons-round">route</span>
              </div>
              <h3 class="feature-card__title">學習路徑</h3>
              <p class="feature-card__description">
                系統化的學習順序，幫助你循序漸進
              </p>
            </div>
            
            <div class="feature-card">
              <div class="feature-card__icon">
                <span class="material-icons-round">search</span>
              </div>
              <h3 class="feature-card__title">快速搜尋</h3>
              <p class="feature-card__description">
                快速找到你需要的內容
              </p>
            </div>
            
            <div class="feature-card">
              <div class="feature-card__icon">
                <span class="material-icons-round">favorite</span>
              </div>
              <h3 class="feature-card__title">收藏功能</h3>
              <p class="feature-card__description">
                收藏你喜歡的內容，方便隨時查看
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  `;
  
  // 更新 i18n
  updateI18n();
}

/**
 * 更新 i18n 文字
 */
function updateI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
}

