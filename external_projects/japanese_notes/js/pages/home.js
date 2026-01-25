// 首頁

import { t } from '../utils/i18n.js';

export function renderHome() {
  const mainContent = document.getElementById('main-content');
  if (!mainContent) return;

  mainContent.innerHTML = `
    <div class="page-enter">
      <div class="content-detail">
        <h1 class="content-detail__title">${t('home.title')}</h1>
        <p style="font-size: var(--text-lg); color: var(--text-secondary); margin-bottom: var(--spacing-xl);">
          ${t('home.subtitle')}
        </p>
        
        <div class="content-grid" style="margin-top: var(--spacing-xl);">
          <a href="#/content?category=kana" class="content-card">
            <h2 class="content-card__title">${t('home.card.kana.title')}</h2>
            <p class="content-card__meta">${t('home.card.kana.description')}</p>
          </a>
          
          <a href="#/content?category=grammar" class="content-card">
            <h2 class="content-card__title">${t('home.card.grammar.title')}</h2>
            <p class="content-card__meta">${t('home.card.grammar.description')}</p>
          </a>
          
          <a href="#/content?category=goshu" class="content-card">
            <h2 class="content-card__title">${t('home.card.goshu.title')}</h2>
            <p class="content-card__meta">${t('home.card.goshu.description')}</p>
          </a>
          
          <a href="#/vocabulary" class="content-card">
            <h2 class="content-card__title">${t('home.card.vocabulary.title')}</h2>
            <p class="content-card__meta">${t('home.card.vocabulary.description')}</p>
          </a>
          
          <a href="#/kanji" class="content-card">
            <h2 class="content-card__title">${t('home.card.kanji.title')}</h2>
            <p class="content-card__meta">${t('home.card.kanji.description')}</p>
          </a>
        </div>
      </div>
    </div>
  `;
}

