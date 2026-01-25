// 內容列表頁

import { t, getLanguage, translateTag } from '../utils/i18n.js';
import { router } from '../router.js';
import { filteredContentIndex } from '../data/index.js';

export function renderContentList({ params }) {
  const mainContent = document.getElementById('main-content');
  if (!mainContent) return;

  const currentLang = getLanguage();
  
  // 分類內容（排除單字和漢字）
  const kanaItems = filteredContentIndex.filter(item => item.category.type === 'kana');
  const grammarItems = filteredContentIndex.filter(item => item.category.type === 'grammar');
  const goshuItems = filteredContentIndex.filter(item => item.category.type === 'goshu');

  // 檢查是否有分類參數
  const category = params?.get('category');

  mainContent.innerHTML = `
    <div class="page-enter">
      <div style="margin-bottom: var(--spacing-xl);">
        <h1 style="font-size: var(--text-3xl); margin-bottom: var(--spacing-md);">${t('content.title')}</h1>
      </div>
      
      ${kanaItems.length > 0 ? `
        <section id="category-kana" style="margin-bottom: var(--spacing-2xl);">
          <h2 style="font-size: var(--text-2xl); margin-bottom: var(--spacing-lg); color: var(--text-primary);">${t('content.category.kana')}</h2>
          <div class="content-grid">
            ${kanaItems.map(item => `
              <a href="#/content/${item.id}" class="content-card">
                <h2 class="content-card__title">${item.title[currentLang] || item.title['zh-TW']}</h2>
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
      
      ${grammarItems.length > 0 ? `
        <section id="category-grammar" style="margin-bottom: var(--spacing-2xl);">
          <h2 style="font-size: var(--text-2xl); margin-bottom: var(--spacing-lg); color: var(--text-primary);">${t('content.category.grammar')}</h2>
          <div class="content-grid">
            ${grammarItems.map(item => `
              <a href="#/content/${item.id}" class="content-card">
                <h2 class="content-card__title">${item.title[currentLang] || item.title['zh-TW']}</h2>
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
      
      ${goshuItems.length > 0 ? `
        <section id="category-goshu" style="margin-bottom: var(--spacing-2xl);">
          <h2 style="font-size: var(--text-2xl); margin-bottom: var(--spacing-lg); color: var(--text-primary);">${t('content.category.goshu')}</h2>
          <div class="content-grid">
            ${goshuItems.map(item => `
              <a href="#/content/${item.id}" class="content-card">
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

  // 如果有分類參數，自動滾動到對應的分類區塊
  if (category) {
    requestAnimationFrame(() => {
      const targetSection = document.getElementById(`category-${category}`);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
}

