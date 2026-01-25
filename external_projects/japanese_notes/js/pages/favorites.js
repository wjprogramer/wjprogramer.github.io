// 收藏頁

import { t, getLanguage, translateTag } from '../utils/i18n.js';
import { favorites } from '../utils/storage.js';
import { contentIndex } from '../data/index.js';

export function renderFavorites() {
  const mainContent = document.getElementById('main-content');
  if (!mainContent) return;

  const favoriteList = favorites.get();
  const currentLang = getLanguage();

  // 從 contentIndex 中找到對應的內容
  const favoriteItems = favoriteList
    .map(id => contentIndex.find(item => item.id === id))
    .filter(item => item !== undefined); // 過濾掉找不到的項目

  // 根據內容類型決定導航路徑
  function getContentPath(item) {
    if (item.category.type === 'vocabulary') {
      return `#/vocabulary/${item.id}`;
    } else if (item.category.type === 'kanji') {
      return `#/kanji/${item.id}`;
    } else if (item.id.startsWith('category-')) {
      return `#/categories/${item.id}`;
    } else {
      return `#/content/${item.id}`;
    }
  }

  mainContent.innerHTML = `
    <div class="page-enter">
      <div style="margin-bottom: var(--spacing-xl);">
        <h1 style="font-size: var(--text-3xl); margin-bottom: var(--spacing-md);">${t('favorites.title')}</h1>
        <p style="color: var(--text-secondary);">
          ${favoriteList.length === 0 ? '目前沒有收藏的內容' : `共有 ${favoriteItems.length} 個收藏`}
        </p>
      </div>
      
      ${favoriteItems.length === 0 ? `
        <div class="content-detail">
          <p style="text-align: center; color: var(--text-muted);">還沒有收藏任何內容</p>
        </div>
      ` : `
        <div class="content-grid">
          ${favoriteItems.map(item => `
            <a href="${getContentPath(item)}" class="content-card">
              <h2 class="content-card__title">${item.title[currentLang] || item.title['zh-TW']}</h2>
              ${item.japanese ? `<div class="content-card__japanese">${item.japanese}</div>` : ''}
              <p class="content-card__meta">${t('content.difficulty')}：${item.category.level}</p>
              <p style="color: var(--text-secondary); margin-top: var(--spacing-sm); font-size: var(--text-sm);">
                ${item.description[currentLang] || item.description['zh-TW']}
              </p>
              <div class="content-card__tags">
                ${(item.tags || []).map(tag => `<span class="tag">${translateTag(tag)}</span>`).join('')}
              </div>
            </a>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

