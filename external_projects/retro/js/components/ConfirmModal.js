// 確認對話框元件
import { t, applyTranslations } from '../utils/i18n.js';

export class ConfirmModal {
  constructor(options = {}) {
    this.title = options.title || t('common.confirm');
    this.message = options.message || t('common.confirmDelete');
    this.confirmText = options.confirmText || t('common.confirm');
    this.cancelText = options.cancelText || t('common.cancel');
    this.confirmButtonClass = options.confirmButtonClass || 'btn-danger';
    this.onConfirm = options.onConfirm || (() => {});
    this.onCancel = options.onCancel || (() => {});
  }

  show() {
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">${this.title}</h3>
          <button class="modal-close" aria-label="${t('common.close')}" type="button">×</button>
        </div>
        <div class="modal-body">
          <p style="margin: 0; line-height: 1.6;">${this.message}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary cancel-btn">${this.cancelText}</button>
          <button class="btn ${this.confirmButtonClass} confirm-btn">${this.confirmText}</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // 套用翻譯（如果有使用 data-i18n）
    applyTranslations();
    
    const closeModal = () => {
      modal.classList.add('closing');
      setTimeout(() => {
        modal.remove();
      }, 300);
    };
    
    // 關閉按鈕
    modal.querySelector('.modal-close').addEventListener('click', () => {
      this.onCancel();
      closeModal();
    });
    
    // 取消按鈕
    modal.querySelector('.cancel-btn').addEventListener('click', () => {
      this.onCancel();
      closeModal();
    });
    
    // 確認按鈕
    modal.querySelector('.confirm-btn').addEventListener('click', () => {
      this.onConfirm();
      closeModal();
    });
    
    // 點擊背景關閉
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.onCancel();
        closeModal();
      }
    });
    
    // ESC 鍵關閉
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        this.onCancel();
        closeModal();
        document.removeEventListener('keydown', handleEsc);
      }
    };
    document.addEventListener('keydown', handleEsc);
    
    // 聚焦到確認按鈕（可選）
    setTimeout(() => {
      const confirmBtn = modal.querySelector('.confirm-btn');
      if (confirmBtn) {
        confirmBtn.focus();
      }
    }, 100);
  }
}
