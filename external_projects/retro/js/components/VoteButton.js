// 投票按鈕元件
import { t } from '../utils/i18n.js';

export class VoteButton {
  constructor(item, category, index, onVote) {
    this.item = item;
    this.category = category;
    this.index = index;
    this.onVote = onVote;
    this.hasVoted = false;
  }

  render() {
    const voteCount = this.item.votes || 0;
    // 檢查當前使用者是否已投票（需要從全域狀態取得 peerId）
    const globalState = window.retroState || {};
    const currentPeerId = globalState.participantMode?.peerManager?.peerId || 
                         globalState.hostMode?.peerManager?.peerId;
    const hasVoted = this.item.voters && currentPeerId && this.item.voters.includes(currentPeerId);
    
    return `
      <button class="vote-btn ${hasVoted ? 'voted' : ''}" 
              data-item-id="${this.item.id}" 
              data-category="${this.category}"
              style="
                width: 48px;
                height: 48px;
                border-radius: 50%;
                border: 2px solid ${hasVoted ? 'var(--color-primary)' : 'var(--border-color)'};
                background: ${hasVoted ? 'var(--color-primary)' : 'transparent'};
                color: ${hasVoted ? 'white' : 'var(--text-secondary)'};
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all var(--transition-base);
                font-weight: 600;
                gap: 2px;
              ">
        <span style="font-size: 1.25rem;">👍</span>
        <span style="font-size: 0.75rem;">${voteCount}</span>
      </button>
    `;
  }

  bindEvents(element) {
    element.addEventListener('click', () => {
      this.handleVote();
    });

    element.addEventListener('mouseenter', () => {
      if (!this.hasVoted) {
        element.style.transform = 'scale(1.1)';
      }
    });

    element.addEventListener('mouseleave', () => {
      element.style.transform = 'scale(1)';
    });
  }

  handleVote() {
    // 檢查當前使用者是否已投票
    const globalState = window.retroState || {};
    const currentPeerId = globalState.participantMode?.peerManager?.peerId || 
                         globalState.hostMode?.peerManager?.peerId;
    const hasVoted = this.item.voters && currentPeerId && this.item.voters.includes(currentPeerId);
    
    this.onVote(this.category, this.item.id, !hasVoted);
    
    // 動畫效果
    const element = document.querySelector(`[data-item-id="${this.item.id}"]`);
    if (element) {
      element.style.animation = 'votePulse 0.4s var(--transition-bounce)';
      setTimeout(() => {
        element.style.animation = '';
      }, 400);
    }
  }
}

// 添加投票動畫樣式
const style = document.createElement('style');
style.textContent = `
  @keyframes votePulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;
document.head.appendChild(style);

