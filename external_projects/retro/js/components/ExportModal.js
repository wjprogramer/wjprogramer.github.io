// 匯出模態框
import { t } from '../utils/i18n.js';
import { exportToMarkdown } from '../utils/export.js';

export class ExportModal {
  constructor(retro, items) {
    this.retro = retro;
    this.items = items;
  }

  show() {
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">${t('retrospective.export')}</h3>
          <button class="modal-close">×</button>
        </div>
        <div class="modal-body">
          <div style="margin-bottom: var(--spacing-md);">
            <label style="display: block; margin-bottom: var(--spacing-sm); font-weight: 500;">
              匯出格式
            </label>
            <select id="export-format" style="width: 100%; padding: var(--spacing-md); border: 1px solid var(--border-color); border-radius: var(--radius-md);">
              <option value="markdown">Markdown</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary cancel-btn">${t('common.cancel')}</button>
          <button class="btn btn-primary export-btn">${t('retrospective.export')}</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeModal = () => {
      modal.classList.add('closing');
      setTimeout(() => modal.remove(), 300);
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.cancel-btn').addEventListener('click', closeModal);
    modal.querySelector('.export-btn').addEventListener('click', () => {
      const format = document.getElementById('export-format').value;
      this.export(format);
      closeModal();
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  export(format) {
    if (format === 'markdown') {
      const markdown = exportToMarkdown(this.retro, this.items);
      this.downloadFile(markdown, `${this.retro.title || 'retrospective'}.md`, 'text/markdown');
    }
  }

  downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

