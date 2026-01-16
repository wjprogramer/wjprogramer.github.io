// 回顧卡片元件
import { t } from '../utils/i18n.js';

export class RetroCard {
  constructor(item, category, index) {
    this.item = item;
    this.category = category;
    this.index = index;
  }

  render(isEditing = false, isNewItem = false) {
    const authorName = this.item.author?.isAnonymous 
      ? t('retrospective.anonymous') 
      : (this.item.author?.name || 'Unknown');
    
    // 只有新項目才添加動畫類別和延遲
    const animationClass = isNewItem ? 'card-enter' : '';
    const animationStyle = isNewItem ? `animation-delay: ${this.index * 0.1}s;` : '';
    
    if (isEditing) {
      // 在 textarea 中不需要 escape，直接使用原始文字
      return `
        <div class="card ${animationClass}" style="margin-bottom: var(--spacing-md); ${animationStyle}">
          <div class="card-body">
            <textarea class="retro-item-edit-input" style="width: 100%; min-height: 80px; padding: var(--spacing-md); border: 2px solid var(--color-primary); border-radius: var(--radius-md); font-family: inherit; font-size: 0.875rem; resize: vertical;">${this.item.text}</textarea>
          </div>
        </div>
      `;
    }
    
    return `
      <div class="card ${animationClass} retro-card-clickable" style="margin-bottom: var(--spacing-md); ${animationStyle} cursor: pointer;">
        <div class="card-body">
          <p style="margin-bottom: var(--spacing-md); line-height: 1.6; white-space: pre-wrap;">${this.escapeHtml(this.item.text)}</p>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.875rem; color: var(--text-secondary);">
            <span>${authorName}</span>
            <div style="display: flex; gap: var(--spacing-md); align-items: center;">
              <span>${this.item.votes || 0} ${t('retrospective.votes')}</span>
              <button class="btn btn-text delete-btn" style="padding: 4px 8px; font-size: 0.875rem; color: var(--color-danger);" title="${t('common.delete')}">
                <i class="iconoir-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

