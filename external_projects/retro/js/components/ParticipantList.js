// 參與者列表元件
import { t } from '../utils/i18n.js';
import { iconoirIcons } from '../utils/iconoir.js';

export class ParticipantList {
  constructor(participants, isHost = false, onKick = null, host = null) {
    this.participants = participants;
    this.isHost = isHost;
    this.onKick = onKick;
    this.host = host; // { name }，顯示在列表最上方且不可踢除
  }

  render() {
    const hasHost = this.host && this.host.name;
    const hasParticipants = this.participants.length > 0;
    if (!hasHost && !hasParticipants) {
      return '<p class="text-muted">尚無參與者</p>';
    }

    const hostHtml = hasHost ? this.renderHostRow() : '';
    const participantsHtml = this.participants.map((p, i) => this.renderParticipant(p, i)).join('');
    return `
      <div class="participant-list">
        ${hostHtml}
        ${participantsHtml}
      </div>
    `;
  }

  renderHostRow() {
    const name = this.host.name || '';
    const initials = name ? name.charAt(0).toUpperCase() : 'H';
    return `
      <div class="participant-item participant-item-host" style="animation-delay: 0s;">
        <div class="participant-info">
          <div class="participant-avatar">${initials}</div>
          <div class="participant-details">
            <div class="participant-name">${this.escapeHtml(name)}</div>
            <div class="participant-status">
              <span class="status-dot connected"></span>
              ${t('host.hostLabel')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderParticipant(participant, index) {
    const isConnected = !participant.leftAt;
    const initials = participant.name.charAt(0).toUpperCase();
    
    return `
      <div class="participant-item" style="animation-delay: ${(this.host ? index + 1 : index) * 0.1}s;">
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

