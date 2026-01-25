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
    document.body.classList.add('modal-open'); // 標記 modal 已打開
    
    // 套用翻譯（如果有使用 data-i18n）
    applyTranslations();
    
    let isClosing = false; // 防止重複關閉
    let cleanupTimeout = null;
    let animationEndHandler = null;
    
    const cleanup = () => {
      // 清理所有事件監聽器和 timeout
      if (animationEndHandler) {
        modal.removeEventListener('animationend', animationEndHandler);
      }
      if (cleanupTimeout) {
        clearTimeout(cleanupTimeout);
        cleanupTimeout = null;
      }
      
      // 移除元素
      if (modal.parentNode) {
        modal.remove();
      }
      // 如果沒有其他 modal，移除標記
      if (!document.querySelector('.modal-backdrop')) {
        document.body.classList.remove('modal-open');
      }
    };
    
    const closeModal = () => {
      // 如果已經在關閉過程中，直接返回
      if (isClosing) return;
      isClosing = true;
      
      // 移除所有事件監聽器，防止重複觸發
      modal.querySelector('.modal-close').removeEventListener('click', handleCloseClick);
      modal.querySelector('.cancel-btn').removeEventListener('click', handleCancelClick);
      modal.querySelector('.confirm-btn').removeEventListener('click', handleConfirmClick);
      modal.removeEventListener('click', handleBackdropClick);
      document.removeEventListener('keydown', handleEsc);
      
      // 定義動畫結束處理函數
      animationEndHandler = (e) => {
        // 只處理 backdrop 的 fadeOut 動畫結束事件
        if (e.target === modal && e.animationName === 'fadeOut') {
          cleanup();
        }
      };
      
      // 監聽動畫結束事件
      modal.addEventListener('animationend', animationEndHandler);
      
      // 使用 requestAnimationFrame 確保瀏覽器準備好渲染動畫
      requestAnimationFrame(() => {
        // 確保元素還在 DOM 中
        if (!modal.parentNode) {
          cleanup();
          return;
        }
        
        const modalElement = modal.querySelector('.modal');
        
        // 同時對 backdrop 和 modal 添加 closing class
        modal.classList.add('closing');
        if (modalElement) {
          modalElement.classList.add('closing');
        }
        
        // Fallback: 如果動畫沒有觸發（不應該發生），350ms 後強制清理
        cleanupTimeout = setTimeout(() => {
          if (isClosing && modal.parentNode) {
            cleanup();
          }
        }, 350);
      });
    };
    
    // 定義事件處理函數
    const handleCloseClick = () => {
      this.onCancel();
      closeModal();
    };
    
    const handleCancelClick = () => {
      this.onCancel();
      closeModal();
    };
    
    const handleConfirmClick = () => {
      this.onConfirm();
      closeModal();
    };
    
    const handleBackdropClick = (e) => {
      if (e.target === modal) {
        this.onCancel();
        closeModal();
      }
    };
    
    const handleEsc = (e) => {
      if (e.key === 'Escape' && !isClosing) {
        this.onCancel();
        closeModal();
      }
    };
    
    // 綁定事件監聽器
    modal.querySelector('.modal-close').addEventListener('click', handleCloseClick);
    modal.querySelector('.cancel-btn').addEventListener('click', handleCancelClick);
    modal.querySelector('.confirm-btn').addEventListener('click', handleConfirmClick);
    modal.addEventListener('click', handleBackdropClick);
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
