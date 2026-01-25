// 回顧卡片元件
import { t } from '../utils/i18n.js';
import { iconoirIcons } from '../utils/iconoir.js';

export class RetroCard {
  constructor(item, category, index) {
    this.item = item;
    this.category = category;
    this.index = index;
  }

  render(isEditing = false, isNewItem = false, editingBy = null) {
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
    
    // 如果正在被其他人編輯，顯示編輯狀態並禁用點擊
    const isBeingEdited = editingBy !== null;
    const clickableClass = isBeingEdited ? '' : 'retro-card-clickable';
    const cursorStyle = isBeingEdited ? 'cursor: not-allowed;' : 'cursor: pointer;';
    
    // 渲染反應顯示
    const reactionsHtml = this.renderReactions();
    
    return `
      <div class="card  card-no-transform-hover ${animationClass} ${clickableClass}" style="margin-bottom: var(--spacing-md); ${animationStyle} ${cursorStyle}; position: relative;" ${isBeingEdited ? 'data-being-edited="true"' : ''} data-item-id="${this.item.id}" data-category="${this.category}">
        ${isBeingEdited ? `
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(255, 217, 61, 0.3); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; z-index: 10; pointer-events: none;">
            <div style="width: 48px; height: 48px; background: var(--color-warning); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
              <i class="iconoir-edit" style="font-size: 1.5rem; color: white;"></i>
            </div>
          </div>
        ` : ''}
        <div class="card-body">
          <p style="margin-bottom: var(--spacing-md); line-height: 1.6; white-space: pre-wrap;">${this.escapeHtml(this.item.text)}</p>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.875rem; color: var(--text-secondary);">
            <span>${authorName}</span>
          </div>
          ${reactionsHtml}
        </div>
        <!-- Hover 時顯示的「＋」按鈕（原本投票按鈕的位置） -->
        <div class="card-reaction-trigger" style="display: none; position: absolute; bottom: var(--spacing-md); right: var(--spacing-md); z-index: 5;">
          <button class="reaction-plus-btn" style="width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--border-color); background: var(--bg-card); color: var(--text-primary); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all var(--transition-base);">
            ${iconoirIcons.plus(2, 16)}
          </button>
        </div>
        <!-- 反應工具欄容器（會在 hover 到「＋」時顯示） -->
        <div class="reaction-toolbar-container"></div>
      </div>
    `;
  }

  renderReactions() {
    if (!this.item.reactions || Object.keys(this.item.reactions).length === 0) {
      return '';
    }
    
    // 獲取當前使用者的 peerId（P2P 模式）或用戶名（單人模式）
    const globalState = window.retroState || {};
    const currentPeerId = globalState.participantMode?.peerManager?.peerId || 
                         globalState.hostMode?.peerManager?.peerId ||
                         'local-user';
    
    const reactions = Object.entries(this.item.reactions)
      .filter(([emoji, data]) => data.count > 0)
      .map(([emoji, data]) => {
        const hasUserReaction = data.users && data.users.includes(currentPeerId);
        return {
          emoji,
          count: data.count,
          hasUserReaction
        };
      });
    
    if (reactions.length === 0) {
      return '';
    }
    
    return `
      <div class="reaction-display" style="margin-top: var(--spacing-md); padding-top: var(--spacing-md); border-top: 1px solid var(--border-color); display: flex; flex-wrap: wrap; gap: var(--spacing-xs);">
        ${reactions.map(reaction => `
          <button class="reaction-badge ${reaction.hasUserReaction ? 'reaction-badge-active' : ''}" 
                  data-emoji="${reaction.emoji}"
                  style="
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    padding: 4px 8px;
                    border-radius: var(--radius-md);
                    border: 1px solid ${reaction.hasUserReaction ? 'var(--color-primary)' : 'var(--border-color)'};
                    background: ${reaction.hasUserReaction ? 'var(--color-primary-light)' : 'var(--bg-card)'};
                    color: var(--text-primary);
                    font-size: 0.875rem;
                    cursor: pointer;
                    transition: all var(--transition-base);
                  "
                  title="${reaction.emoji} ${reaction.count}">
            <span style="font-size: 1rem;">${reaction.emoji}</span>
            <span style="font-weight: 500;">${reaction.count}</span>
          </button>
        `).join('')}
      </div>
    `;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

