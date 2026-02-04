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
    const allowAnonymous = (window.retroState?.hostMode?.retro?.allowAnonymous ?? window.retroState?.participantMode?.getRetro?.()?.allowAnonymous) ?? false;
    const showAuthor = !allowAnonymous;
    const authorName = showAuthor
      ? (this.item.author?.isAnonymous ? t('retrospective.anonymous') : (this.item.author?.name || 'Unknown'))
      : '';
    
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
    
    // 渲染留言 UI
    const commentsHtml = this.renderComments(showAuthor);
    
    return `
      <div class="card  card-no-transform-hover ${animationClass} ${clickableClass}" style="margin-bottom: var(--spacing-md); ${animationStyle} ${cursorStyle}; position: relative;" ${isBeingEdited ? 'data-being-edited="true"' : ''} data-item-id="${this.item.id}" data-category="${this.category}" draggable="true">
        ${isBeingEdited ? `
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(255, 217, 61, 0.3); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; z-index: 10; pointer-events: none;">
            <div style="width: 48px; height: 48px; background: var(--color-warning); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
              <i class="iconoir-edit" style="font-size: 1.5rem; color: white;"></i>
            </div>
          </div>
        ` : ''}
        ${commentsHtml}
        <div class="card-body">
          <p style="margin-bottom: var(--spacing-md); line-height: 1.6; white-space: pre-wrap;">${this.escapeHtml(this.item.text)}</p>
          ${showAuthor ? `
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.875rem; color: var(--text-secondary);">
            <span>${authorName}</span>
          </div>
          ` : ''}
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
    
    // 以使用者名稱判斷（重整後 peerId 會變，用名稱可避免同一人重複給 emoji）
    const globalState = window.retroState || {};
    const currentUserName = globalState.participantMode?.name ||
                            globalState.hostMode?.retro?.host?.name ||
                            'local-user';
    
    const reactions = Object.entries(this.item.reactions)
      .filter(([emoji, data]) => data.count > 0)
      .map(([emoji, data]) => {
        const hasUserReaction = data.users && data.users.includes(currentUserName);
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

  renderComments(showAuthor) {
    const comments = this.item.comments || [];
    const commentCount = comments.length;
    
    // 如果留言數量為 0，不顯示留言區塊
    if (commentCount === 0) {
      return '';
    }
    
    // 留言按鈕顯示在右上角（小的 icon，相對於右下角的 + 號）
    const commentButtonHtml = `
      <!-- 留言按鈕（右上角） -->
      <div class="comment-toggle-btn-container" style="
        position: absolute;
        top: var(--spacing-sm);
        right: var(--spacing-sm);
        z-index: 5;
        padding: 2px 4px 0 0;
      ">
        <button class="comment-toggle-btn" 
                data-item-id="${this.item.id}"
                style="
                  width: 24px;
                  height: 24px;
                  padding: 0;
                  border: none;
                  background: transparent;
                  color: var(--text-secondary);
                  cursor: pointer;
                  transition: all var(--transition-base);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
                title="${commentCount} ${t('retrospective.comments')}">
          ${iconoirIcons.chatBubble(2, 16)}
          ${commentCount > 0 ? `<span style="position: absolute; top: -4px; right: -4px; background: var(--color-primary); color: white; border-radius: 50%; width: 14px; height: 14px; font-size: 0.625rem; display: flex; align-items: center; justify-content: center; font-weight: 600;">${commentCount}</span>` : ''}
        </button>
      </div>
    `;
    
    return commentButtonHtml;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

