// 參與者列表元件
import { t } from '../utils/i18n.js';
import { iconoirIcons } from '../utils/iconoir.js';

export class ParticipantList {
  constructor(participants, isHost = false, onKick = null) {
    this.participants = participants;
    this.isHost = isHost;
    this.onKick = onKick;
  }

  render() {
    if (this.participants.length === 0) {
      return '<p class="text-muted">尚無參與者</p>';
    }

    return `
      <div class="participant-list">
        ${this.participants.map((participant, index) => this.renderParticipant(participant, index)).join('')}
      </div>
    `;
  }

  renderParticipant(participant, index) {
    const isConnected = !participant.leftAt;
    const initials = participant.name.charAt(0).toUpperCase();
    
    return `
      <div class="participant-item" style="animation-delay: ${index * 0.1}s;">
        <div class="participant-info">
          <div class="participant-avatar">${initials}</div>
          <div class="participant-details">
            <div class="participant-name">${this.escapeHtml(participant.name)}</div>
            <div class="participant-status">
              <span class="status-dot ${isConnected ? 'connected' : 'disconnected'}"></span>
              ${isConnected ? '已連線' : '已斷線'}
            </div>
          </div>
        </div>
        ${this.isHost && isConnected ? `
          <div class="participant-actions">
            <button class="btn btn-danger btn-sm kick-btn" data-peer-id="${participant.peerId}" title="${t('common.delete')}">
              ${iconoirIcons.trash(2, 18)}
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }

  bindEvents(container) {
    if (this.isHost && this.onKick) {
      container.querySelectorAll('.kick-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const peerId = btn.dataset.peerId;
          // 確認邏輯由外部回調處理
          this.onKick(peerId);
        });
      });
    }
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

