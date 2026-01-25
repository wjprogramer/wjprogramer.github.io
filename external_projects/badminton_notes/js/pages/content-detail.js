/**
 * 內容詳情頁
 */
import { t, getLanguage } from '../utils/i18n.js';
import { updateActiveNav } from '../components/navigation.js';
import { favorites } from '../utils/storage.js';
import { router } from '../router.js';
import { loadContent } from '../data/content-loader.js';
import { getCategoryType, getScenario } from '../utils/translations.js';
import { getVideoInfo, getYouTubeEmbedUrl } from '../data/videos.js';

/**
 * 渲染內容詳情頁
 */
export async function renderContentDetail({ path, params, route }) {
  const app = document.getElementById('app');
  updateActiveNav();
  
  // 處理 params（可能是 URLSearchParams 或普通物件）
  const contentId = (params instanceof URLSearchParams ? params.get('id') : params.id);
  
  if (!contentId) {
    router.navigate('/content');
    return;
  }
  
  // 載入內容資料
  const content = await loadContent(contentId);
  
  if (!content) {
    router.navigate('/content');
    return;
  }
  
  const isFavorite = favorites.has(contentId);
  
  app.innerHTML = `
    <div class="content-detail-page page-enter">
      <div class="content-detail">
        <div class="content-detail__header">
          <button class="btn-neu btn-neu--small" onclick="history.back()">
            <span class="material-icons-round">arrow_back</span>
            <span data-i18n="common.back">返回</span>
          </button>
          
          <button class="btn-neu btn-neu--small" id="favorite-btn">
            <span class="material-icons-round">${isFavorite ? 'favorite' : 'favorite_border'}</span>
            <span data-i18n="${isFavorite ? 'favorites.remove' : 'favorites.add'}">${isFavorite ? '移除收藏' : '加入收藏'}</span>
          </button>
        </div>
        
        <h1 class="content-detail__title">${getTitle(content)}</h1>
        
        <div class="content-detail__meta" id="content-detail-meta">
          <span class="tag tag--category">${getCategoryType(content.category.type, getLanguage())}</span>
          <span>${content.category.scenario.map(s => getScenario(s, getLanguage())).join(' • ')}</span>
        </div>
        
        <div class="content-detail__body">
          ${renderContentSections(content.content.sections)}
        </div>
      </div>
    </div>
  `;
  
  // 綁定事件
  bindContentDetailEvents(contentId);
  updateI18n();
  
  // 監聽語言切換事件，更新所有內容的翻譯
  const handleLanguageChange = async () => {
    // 重新載入內容以獲取最新的 content 物件
    const currentContent = await loadContent(contentId);
    if (!currentContent) return;
    
    const lang = getLanguage();
    
    // 更新標題
    const titleEl = document.querySelector('.content-detail__title');
    if (titleEl) {
      titleEl.textContent = getTitle(currentContent);
    }
    
    // 更新 meta 資訊
    const metaEl = document.getElementById('content-detail-meta');
    if (metaEl) {
      metaEl.innerHTML = `
        <span class="tag tag--category">${getCategoryType(currentContent.category.type, lang)}</span>
        <span>${currentContent.category.scenario.map(s => getScenario(s, lang)).join(' • ')}</span>
      `;
    }
    
    // 更新內容主體
    const bodyEl = document.querySelector('.content-detail__body');
    if (bodyEl) {
      bodyEl.innerHTML = renderContentSections(currentContent.content.sections);
    }
    
    // 更新 i18n 文字（按鈕等）
    updateI18n();
  };
  
  // 移除舊的監聽器（如果存在）並添加新的
  window.removeEventListener('languageChanged', handleLanguageChange);
  window.addEventListener('languageChanged', handleLanguageChange);
}

/**
 * 取得標題（多語言）
 */
function getTitle(content) {
  const lang = getLanguage();
  return content.title[lang] || content.title['zh-TW'] || content.title['en'] || 'Untitled';
}

/**
 * 取得多語言文字
 */
function getText(obj, lang) {
  if (typeof obj === 'string') return obj;
  if (!obj) return '';
  return obj[lang] || obj['zh-TW'] || obj['en'] || '';
}

/**
 * 渲染內容區塊
 */
function renderContentSections(sections) {
  if (!sections || !Array.isArray(sections)) return '';
  
  const lang = getLanguage();
  
  return sections.map(section => {
    switch (section.type) {
      case 'text':
        const title = getText(section.title, lang);
        const content = getText(section.content, lang);
        // 使用 marked 解析 markdown
        const htmlContent = typeof marked !== 'undefined' 
          ? marked.parse(content) 
          : content.replace(/\n/g, '<br>');
        return `
          <div class="content-detail__section">
            <h2 class="content-detail__section-title">${title}</h2>
            <div class="content-detail__section-content">
              ${htmlContent}
            </div>
          </div>
        `;
      case 'image':
        const alt = getText(section.alt, lang);
        return `
          <div class="content-detail__section">
            <img src="${section.src}" alt="${alt}">
          </div>
        `;
      case 'video':
        const videoTitle = getText(section.title, lang);
        return `
          <div class="content-detail__section">
            <h2 class="content-detail__section-title">${videoTitle}</h2>
            <div class="video-container">
              <iframe src="${section.src}" frameborder="0" allowfullscreen></iframe>
            </div>
          </div>
        `;
      case 'youtube':
        const youtubeVideoInfo = getVideoInfo(section.videoId);
        if (!youtubeVideoInfo) return '';
        
        const youtubeTitle = getText(section.title, lang) || getText(youtubeVideoInfo.title, lang);
        const youtubeDescription = getText(youtubeVideoInfo.description, lang);
        
        return `
          <div class="content-detail__section content-detail__section--youtube">
            <h2 class="content-detail__section-title">${youtubeTitle}</h2>
            ${youtubeDescription ? `<p class="content-detail__video-description">${youtubeDescription}</p>` : ''}
            <div class="video-container">
              <iframe 
                src="${youtubeVideoInfo.embedUrl}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
              </iframe>
            </div>
          </div>
        `;
      default:
        return '';
    }
  }).join('');
}

/**
 * 綁定內容詳情事件
 */
function bindContentDetailEvents(contentId) {
  // 收藏按鈕
  const favoriteBtn = document.getElementById('favorite-btn');
  if (favoriteBtn) {
    favoriteBtn.addEventListener('click', () => {
      favorites.toggle(contentId);
      updateFavoriteButton(favoriteBtn, contentId);
    });
  }
}

/**
 * 更新收藏按鈕狀態
 */
function updateFavoriteButton(button, contentId) {
  const isFavorite = favorites.has(contentId);
  const icon = button.querySelector('.material-icons-round');
  const text = button.querySelector('span:last-child');
  
  if (icon) {
    icon.textContent = isFavorite ? 'favorite' : 'favorite_border';
  }
  
  if (text) {
    const key = isFavorite ? 'favorites.remove' : 'favorites.add';
    text.setAttribute('data-i18n', key);
    text.textContent = t(key);
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
}

