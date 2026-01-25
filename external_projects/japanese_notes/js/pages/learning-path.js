// 學習路徑頁

import { t } from '../utils/i18n.js';

export function renderLearningPath() {
  const mainContent = document.getElementById('main-content');
  if (!mainContent) return;

  mainContent.innerHTML = `
    <div class="page-enter">
      <div class="content-detail">
        <h1 class="content-detail__title">${t('learning-path.title')}</h1>
        <p style="color: var(--text-secondary); margin-bottom: var(--spacing-xl);">
          學習路徑頁面（待實作）
        </p>
      </div>
    </div>
  `;
}

