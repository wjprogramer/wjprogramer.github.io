/**
 * 收藏頁
 */
import { t, getLanguage } from '../utils/i18n.js';
import { updateActiveNav } from '../components/navigation.js';
import { favorites } from '../utils/storage.js';
import { contentIndex } from '../data/index.js';
import { router } from '../router.js';
import { getCategoryType, getScenario, getTag } from '../utils/translations.js';

/**
 * 渲染收藏頁
 */
export function renderFavorites({ path, params }) {
  const app = document.getElementById('app');
  updateActiveNav();
  
  const favoriteIds = favorites.get();
  const favoriteItems = contentIndex.filter(item => favoriteIds.includes(item.id));
  
  app.innerHTML = `
    <div class="favorites-page page-enter">
      <div class="container">
        <h1 class="page-title" data-i18n="nav.favorites">收藏</h1>
        
        ${favoriteItems.length === 0 ? `
          <div class="empty-state">
            <span class="material-icons-round">favorite_border</span>
            <p data-i18n="favorites.empty">還沒有收藏任何內容</p>
            <a href="#/content" class="btn-neu btn-neu--primary">
              <span data-i18n="nav.content">瀏覽內容</span>
            </a>
          </div>
        ` : `
          <div class="content-grid">
            ${renderContentCards(favoriteItems)}
          </div>
        `}
      </div>
    </div>
  `;
  
  // 綁定事件
  bindFavoritesEvents();
  updateI18n();
  
  // 監聽語言切換事件，更新 category 和 tags 的翻譯
  const handleLanguageChange = () => {
    const favoriteItems = contentIndex.filter(item => favorites.has(item.id));
    const contentGrid = document.querySelector('.content-grid');
    if (contentGrid && favoriteItems.length > 0) {
      contentGrid.innerHTML = renderContentCards(favoriteItems);
      
      // 重新綁定卡片點擊事件
      const cards = document.querySelectorAll('.content-card');
      cards.forEach(card => {
        card.addEventListener('click', () => {
          const id = card.getAttribute('data-id');
          if (id) {
            router.navigate(`/content/${id}`);
          }
        });
      });
    }
  };
  
  // 移除舊的監聽器（如果存在）並添加新的
  window.removeEventListener('languageChanged', handleLanguageChange);
  window.addEventListener('languageChanged', handleLanguageChange);
}

/**
 * 渲染內容卡片
 */
function renderContentCards(items) {
  const lang = getLanguage();
  return items.map(item => `
    <div class="content-card" data-id="${item.id}">
      <h3 class="content-card__title">${getTitle(item)}</h3>
      <div class="content-card__meta">
        <span>${getCategoryType(item.category.type, lang)}</span>
        <span>•</span>
        <span>${item.category.scenario.map(s => getScenario(s, lang)).join(', ')}</span>
      </div>
      ${item.description ? `
        <p class="content-card__description">${getDescription(item)}</p>
      ` : ''}
        <div class="content-card__tags">
          ${item.tags.map(tag => `
            <span class="tag" data-tag="${tag}">${getTag(tag, lang)}</span>
          `).join('')}
        </div>
    </div>
  `).join('');
}

/**
 * 取得標題（多語言）
 */
function getTitle(item) {
  const lang = document.documentElement.getAttribute('lang') || 'zh-TW';
  return item.title[lang] || item.title['zh-TW'] || item.title['en'] || 'Untitled';
}

/**
 * 取得描述（多語言）
 */
function getDescription(item) {
  if (!item.description) return '';
  const lang = document.documentElement.getAttribute('lang') || 'zh-TW';
  return item.description[lang] || item.description['zh-TW'] || item.description['en'] || '';
}

/**
 * 綁定收藏頁事件
 */
function bindFavoritesEvents() {
  // 卡片點擊
  const cards = document.querySelectorAll('.content-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      if (id) {
        router.navigate(`/content/${id}`);
      }
    });
  });
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

