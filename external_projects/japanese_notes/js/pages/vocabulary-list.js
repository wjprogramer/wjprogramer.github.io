// 單字列表頁

import { t, getLanguage, translateTag } from '../utils/i18n.js';
import { router } from '../router.js';
import { vocabularyIndex } from '../data/index.js';

export function renderVocabularyList() {
  const mainContent = document.getElementById('main-content');
  if (!mainContent) return;

  const currentLang = getLanguage();

  // 排除主題單字（id 以 category- 開頭或包含 topic-category 標籤）
  const wordItems = vocabularyIndex.filter(item => {
    const tags = item.tags || [];
    return !item.id.startsWith('category-') && !tags.includes('topic-category');
  });
  
  mainContent.innerHTML = `
    <div class="page-enter">
      <div style="margin-bottom: var(--spacing-xl);">
        <h1 style="font-size: var(--text-3xl); margin-bottom: var(--spacing-md);">${t('content.category.vocabulary')}</h1>
      </div>
      
      ${wordItems.length > 0 ? `
        <section style="margin-bottom: var(--spacing-2xl);">
          <div class="content-grid">
            ${wordItems.map(item => `
              <a href="#/vocabulary/${item.id}" class="content-card">
                <h2 class="content-card__title">${item.title[currentLang] || item.title['zh-TW']}</h2>
                ${item.japanese ? `<div class="content-card__japanese">${item.japanese}</div>` : ''}
                <p class="content-card__meta">${t('content.difficulty')}：${item.category.level}</p>
                <p style="color: var(--text-secondary); margin-top: var(--spacing-sm); font-size: var(--text-sm);">
                  ${item.description[currentLang] || item.description['zh-TW']}
                </p>
                <div class="content-card__tags">
                  ${item.tags.map(tag => `<span class="tag">${translateTag(tag)}</span>`).join('')}
                </div>
              </a>
            `).join('')}
          </div>
        </section>
      ` : ''}
    </div>
  `;
}

