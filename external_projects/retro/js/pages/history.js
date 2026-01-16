// 歷史記錄頁面
import { t } from '../utils/i18n.js';
import { storage } from '../utils/storage/index.js';
import { Router } from '../router.js';
import { Toast } from '../components/Toast.js';
import { ExportModal } from '../components/ExportModal.js';

export class HistoryPage {
  constructor() {
    this.router = new Router();
    this.retrospectives = [];
  }

  async render(container) {
    // 先顯示 loading 狀態
    container.innerHTML = `
      <div class="page-container">
        <div class="main-content">
          <div class="container">
            <div style="margin-bottom: var(--spacing-lg);">
              <button class="btn btn-text" onclick="window.location.hash='/'">
                ← ${t('common.cancel')}
              </button>
            </div>
            <div class="card">
              <div class="card-header">
                <h2 class="card-title">${t('history.title')}</h2>
              </div>
              <div class="card-body" style="display: flex; justify-content: center; align-items: center; min-height: 300px;">
                <div style="text-align: center;">
                  <div class="loading" style="width: 40px; height: 40px; margin: 0 auto var(--spacing-md);"></div>
                  <p class="text-muted">${t('common.loading')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // 載入資料
    this.retrospectives = await storage.getRetrospectives();
    
    // 渲染實際內容
    container.innerHTML = `
      <div class="page-container">
        <div class="main-content">
          <div class="container">
            <div style="margin-bottom: var(--spacing-lg);">
              <button class="btn btn-text" onclick="window.location.hash='/'">
                ← ${t('common.cancel')}
              </button>
            </div>
            
            <div class="card">
              <div class="card-header">
                <h2 class="card-title">${t('history.title')}</h2>
              </div>
              <div class="card-body" id="history-list">
                ${this.renderHistoryList()}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    this.bindEvents();
  }

  renderHistoryList() {
    if (this.retrospectives.length === 0) {
      return `<p class="text-muted" style="text-align: center; padding: var(--spacing-2xl);">${t('history.noHistory')}</p>`;
    }
    
    return this.retrospectives.map((retro, index) => {
      const itemCount = (retro.items?.howDoYouFeel?.length || 0) + 
                       (retro.items?.whatWentWell?.length || 0) + 
                       (retro.items?.whatDidntGoWell?.length || 0) + 
                       (retro.items?.whatNeedsChange?.length || 0) + 
                       (retro.items?.shoutOuts?.length || 0);
      
      return `
        <div class="card card-enter" style="margin-bottom: var(--spacing-md); animation-delay: ${index * 0.1}s;" data-id="${retro.id}">
          <div class="card-body">
            <div style="display: flex; justify-content: space-between; align-items: start;">
              <div style="flex: 1;">
                <h3 style="margin-bottom: var(--spacing-sm);">${this.escapeHtml(retro.title || t('retrospective.title'))}</h3>
                <p class="text-muted" style="margin-bottom: var(--spacing-sm);">
                  ${t('history.date')}: ${retro.date}
                </p>
                <p class="text-muted" style="font-size: 0.875rem; margin-bottom: var(--spacing-sm);">
                  ${itemCount} ${itemCount === 1 ? (t('history.item') || '個項目') : (t('history.items') || '個項目')}
                </p>
                ${retro.description ? `<p class="text-muted" style="font-size: 0.875rem; margin-top: var(--spacing-sm);">${this.escapeHtml(retro.description)}</p>` : ''}
                ${retro.participants && retro.participants.length > 0 ? `
                  <p class="text-muted" style="font-size: 0.875rem; margin-top: var(--spacing-sm);">
                    ${t('history.participants')}: ${retro.participants.length}
                  </p>
                ` : ''}
              </div>
              <div style="display: flex; gap: var(--spacing-sm);">
                <button class="btn btn-primary btn-sm view-btn">${t('history.view')}</button>
                <button class="btn btn-accent btn-sm export-btn">${t('history.export')}</button>
                <button class="btn btn-danger btn-sm delete-btn">${t('history.delete')}</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  bindEvents() {
    const list = document.getElementById('history-list');
    
    list.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      if (!card) return;
      
      const id = card.dataset.id;
      const retro = this.retrospectives.find(r => r.id === id);
      if (!retro) return;
      
      if (e.target.classList.contains('view-btn')) {
        this.viewRetro(retro);
      } else if (e.target.classList.contains('export-btn')) {
        this.exportRetro(retro);
      } else if (e.target.classList.contains('delete-btn')) {
        this.deleteRetro(id).catch(err => console.error('Error deleting retro:', err));
      }
    });
  }

  viewRetro(retro) {
    this.router.navigate(`/retrospective/${retro.id}`);
  }

  exportRetro(retro) {
    const modal = new ExportModal(retro, retro.items || {
      howDoYouFeel: [],
      whatWentWell: [],
      whatDidntGoWell: [],
      whatNeedsChange: [],
      shoutOuts: []
    });
    modal.show();
  }

  async deleteRetro(id) {
    if (confirm(t('common.confirmDelete'))) {
      const result = await storage.deleteRetrospective(id);
      if (result) {
        Toast.success(t('common.success'));
        this.retrospectives = await storage.getRetrospectives();
        document.getElementById('history-list').innerHTML = this.renderHistoryList();
        this.bindEvents();
      } else {
        Toast.error(t('common.error'));
      }
    }
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  destroy() {
    // 清理資源
  }
}

