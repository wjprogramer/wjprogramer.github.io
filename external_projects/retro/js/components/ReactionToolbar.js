// 反應工具欄元件
import { iconoirIcons } from '../utils/iconoir.js';

export class ReactionToolbar {
  constructor(itemId, category, onReaction, onMoreEmoji, onMoreOptions) {
    this.itemId = itemId;
    this.category = category;
    this.onReaction = onReaction; // 點擊 emoji 時的回調
    this.onMoreEmoji = onMoreEmoji; // 點擊「更多 emoji」時的回調
    this.onMoreOptions = onMoreOptions; // 點擊「更多選項」時的回調
  }

  render() {
    // 五個預設 emoji
    const defaultEmojis = ['🚀', '😎', '🎉', '❤️', '👍'];
    
    return `
      <div class="reaction-toolbar" data-item-id="${this.itemId}" data-category="${this.category}">
        <div class="reaction-toolbar-content">
          ${defaultEmojis.map(emoji => `
            <button class="reaction-emoji-btn" data-emoji="${emoji}" title="${emoji}">
              ${emoji}
            </button>
          `).join('')}
          <button class="reaction-more-emoji-btn" title="更多 emoji">
            <span style="font-size: 1.2rem;">✨</span>
            <span style="font-size: 0.75rem; margin-left: 4px;">more reactions</span>
          </button>
          <button class="reaction-comment-btn" title="留言" style="display: none;">
            ${iconoirIcons.chatBubble(2, 18)}
          </button>
          <button class="reaction-more-options-btn" title="更多選項">
            ${iconoirIcons.dotsCircle(2, 18)}
          </button>
        </div>
        <div class="reaction-more-options-menu" style="display: none;">
          <button class="reaction-delete-btn" title="刪除">
            ${iconoirIcons.trash(2, 16)} 刪除
          </button>
        </div>
      </div>
    `;
  }

  bindEvents(element) {
    // 點擊 emoji 按鈕
    const emojiButtons = element.querySelectorAll('.reaction-emoji-btn');
    emojiButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const emoji = btn.dataset.emoji;
        if (this.onReaction) {
          this.onReaction(this.itemId, this.category, emoji);
        }
      });
    });

    // 點擊「更多 emoji」按鈕
    const moreEmojiBtn = element.querySelector('.reaction-more-emoji-btn');
    if (moreEmojiBtn) {
      moreEmojiBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.onMoreEmoji) {
          this.onMoreEmoji(this.itemId, this.category, element);
        }
      });
    }

    // 點擊「更多選項」按鈕
    const moreOptionsBtn = element.querySelector('.reaction-more-options-btn');
    const moreOptionsMenu = element.querySelector('.reaction-more-options-menu');
    if (moreOptionsBtn && moreOptionsMenu) {
      moreOptionsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // 切換顯示/隱藏選項選單
        const isVisible = moreOptionsMenu.style.display !== 'none';
        moreOptionsMenu.style.display = isVisible ? 'none' : 'block';
        
        if (this.onMoreOptions) {
          this.onMoreOptions(this.itemId, this.category, !isVisible);
        }
      });
    }

    // 點擊刪除按鈕（事件由外部綁定）
    const deleteBtn = element.querySelector('.reaction-delete-btn');
    if (deleteBtn) {
      // 刪除按鈕的事件由外部綁定，這裡不做處理
    }
  }
}
