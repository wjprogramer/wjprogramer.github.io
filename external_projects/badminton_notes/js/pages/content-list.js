/**
 * 內容列表頁
 */
import { t, getLanguage } from '../utils/i18n.js';
import { updateActiveNav } from '../components/navigation.js';
import { contentIndex } from '../data/index.js';
import { searchContent } from '../utils/search.js';
import { router } from '../router.js';
import { getCategoryType, getScenario, getTag } from '../utils/translations.js';
import { favorites } from '../utils/storage.js';

/**
 * 渲染內容列表頁
 */
export function renderContentList({ path, params }) {
  const app = document.getElementById('app');
  updateActiveNav();
  
  // 處理 params（可能是 URLSearchParams 或普通物件）
  const searchQuery = (params instanceof URLSearchParams ? params.get('search') : params.search) || '';
  const category = (params instanceof URLSearchParams ? params.get('category') : params.category) || '';
  const scenario = (params instanceof URLSearchParams ? params.get('scenario') : params.scenario) || '';
  
  // 搜尋和篩選內容
  let filteredContent = contentIndex;
  
  if (searchQuery) {
    filteredContent = searchContent(searchQuery, { category, scenario });
  } else if (category || scenario) {
    filteredContent = contentIndex.filter(item => {
      const matchesCategory = !category || item.category.type === category;
      const matchesScenario = !scenario || item.category.scenario.includes(scenario);
      return matchesCategory && matchesScenario;
    });
  }
  
  app.innerHTML = `
    <div class="content-list-page page-enter">
      <div class="container">
        <div class="content-list__header">
          <h1 class="content-list__title" data-i18n="nav.content">內容</h1>
          
          <div class="content-list__filters">
            <div class="search-box">
              <span class="material-icons-round search-box__icon">search</span>
              <input 
                type="text" 
                class="search-box__input" 
                id="search-input"
                placeholder="${t('search.placeholder')}"
                value="${searchQuery}"
              >
            </div>
          </div>
        </div>
        
        <div class="content-grid" id="content-grid">
          ${renderContentCards(filteredContent)}
        </div>
        
        ${filteredContent.length === 0 ? `
          <div class="empty-state">
            <span class="material-icons-round">inbox</span>
            <p>沒有找到相關內容</p>
          </div>
        ` : ''}
      </div>
    </div>
  `;
  
  // 綁定事件
  bindContentListEvents();
  updateI18n();
  
  // 監聽語言切換事件，更新 category 和 tags 的翻譯
  const handleLanguageChange = () => {
    // 更新 i18n 文字（包括 placeholder）
    updateI18n();
    
    const contentGrid = document.getElementById('content-grid');
    if (contentGrid) {
      const currentHash = window.location.hash.slice(1) || '/';
      const [path, queryString] = currentHash.split('?');
      const params = new URLSearchParams(queryString);
      const searchQuery = params.get('search') || '';
      const category = params.get('category') || '';
      const scenario = params.get('scenario') || '';
      
      // 重新篩選內容
      let filteredContent = contentIndex;
      if (searchQuery) {
        filteredContent = searchContent(searchQuery, { category, scenario });
      } else if (category || scenario) {
        filteredContent = contentIndex.filter(item => {
          const matchesCategory = !category || item.category.type === category;
          const matchesScenario = !scenario || item.category.scenario.includes(scenario);
          return matchesCategory && matchesScenario;
        });
      }
      
      contentGrid.innerHTML = renderContentCards(filteredContent);
      
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
  
  // 監聽收藏狀態改變事件，更新收藏圖標
  const handleFavoritesChange = () => {
    const contentGrid = document.getElementById('content-grid');
    if (contentGrid) {
      // 重新渲染所有卡片以更新收藏圖標
      const currentHash = window.location.hash.slice(1) || '/';
      const [path, queryString] = currentHash.split('?');
      const params = new URLSearchParams(queryString);
      const searchQuery = params.get('search') || '';
      const category = params.get('category') || '';
      const scenario = params.get('scenario') || '';
      
      // 重新篩選內容
      let filteredContent = contentIndex;
      if (searchQuery) {
        filteredContent = searchContent(searchQuery, { category, scenario });
      } else if (category || scenario) {
        filteredContent = contentIndex.filter(item => {
          const matchesCategory = !category || item.category.type === category;
          const matchesScenario = !scenario || item.category.scenario.includes(scenario);
          return matchesCategory && matchesScenario;
        });
      }
      
      contentGrid.innerHTML = renderContentCards(filteredContent);
      
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
  window.removeEventListener('favoritesChanged', handleFavoritesChange);
  window.addEventListener('favoritesChanged', handleFavoritesChange);
}

/**
 * 渲染內容卡片
 */
function renderContentCards(items) {
  const lang = getLanguage();
  return items.map(item => {
    const isFavorite = favorites.has(item.id);
    return `
      <div class="content-card" data-id="${item.id}">
        <div class="content-card__header">
          <h3 class="content-card__title">${getTitle(item)}</h3>
          ${isFavorite ? `
            <span class="content-card__favorite-icon" title="已收藏">
              <span class="material-icons-round">favorite</span>
            </span>
          ` : ''}
        </div>
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
    `;
  }).join('');
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
 * 綁定內容列表事件
 */
function bindContentListEvents() {
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
  
  // 搜尋輸入
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        const query = e.target.value.trim();
        
        // 從當前 hash 中解析路徑和參數
        const currentHash = window.location.hash.slice(1) || '/';
        const [path, queryString] = currentHash.split('?');
        const params = new URLSearchParams(queryString);
        
        // 更新搜尋參數
        if (query) {
          params.set('search', query);
        } else {
          params.delete('search');
        }
        
        // 構建新的 hash
        const newHash = params.toString() 
          ? `${path}?${params.toString()}`
          : path;
        
        // 使用 replaceState 更新 URL 而不觸發 hashchange
        // 這樣可以避免頁面重新渲染，然後手動更新搜尋結果
        const currentUrl = window.location.href.split('#')[0];
        history.replaceState(null, '', `${currentUrl}#${newHash}`);
        
        // 手動更新搜尋結果，避免整個頁面重新渲染
        updateSearchResults(query, params);
      }, 300);
    });
  }
}

/**
 * 更新搜尋結果（不重新渲染整個頁面）
 */
function updateSearchResults(query, params) {
  const category = params.get('category') || '';
  const scenario = params.get('scenario') || '';
  
  // 搜尋和篩選內容
  let filteredContent = contentIndex;
  
  if (query) {
    filteredContent = searchContent(query, { category, scenario });
  } else if (category || scenario) {
    filteredContent = contentIndex.filter(item => {
      const matchesCategory = !category || item.category.type === category;
      const matchesScenario = !scenario || item.category.scenario.includes(scenario);
      return matchesCategory && matchesScenario;
    });
  }
  
  // 只更新內容網格，不重新渲染整個頁面
  const contentGrid = document.getElementById('content-grid');
  if (contentGrid) {
    contentGrid.innerHTML = renderContentCards(filteredContent);
    
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
  
  // 更新空狀態
  const emptyState = document.querySelector('.empty-state');
  if (filteredContent.length === 0) {
    if (!emptyState) {
      const container = document.querySelector('.content-list-page .container');
      if (container) {
        const emptyStateEl = document.createElement('div');
        emptyStateEl.className = 'empty-state';
        emptyStateEl.innerHTML = `
          <span class="material-icons-round">inbox</span>
          <p>${t('common.no-results') || '沒有找到相關內容'}</p>
        `;
        container.appendChild(emptyStateEl);
      }
    }
  } else {
    if (emptyState) {
      emptyState.remove();
    }
  }
}

/**
 * 更新 i18n 文字
 */
function updateI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  
  // 更新搜尋框的 placeholder
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.placeholder = t('search.placeholder');
  }
}

