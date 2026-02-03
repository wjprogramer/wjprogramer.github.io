// 留言模態框
import { t } from '../utils/i18n.js';
import { formatTime, updateTimeElement, initTimeUpdater } from '../utils/timeFormat.js';
import { iconoirIcons } from '../utils/iconoir.js';

export class CommentModal {
  constructor(itemId, category, item, onAddComment, onUpdateComment, onDeleteComment, isP2PMode = false, getItemCallback = null) {
    this.itemId = itemId;
    this.category = category;
    this.item = item;
    this.onAddComment = onAddComment;
    this.onUpdateComment = onUpdateComment;
    this.onDeleteComment = onDeleteComment;
    this.isP2PMode = isP2PMode;
    this.timeUpdaterCleanup = null;
    this.getItemCallback = getItemCallback; // 用於獲取最新的 item 資料
  }
  
  // 獲取最新的 item 資料
  getCurrentItem() {
    if (this.getItemCallback) {
      return this.getItemCallback(this.itemId, this.category);
    }
    return this.item;
  }

  show() {
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop comment-modal-backdrop';
    modal.innerHTML = `
      <div class="modal comment-modal" style="max-width: 600px; width: 90%; max-height: 80vh;">
        <div class="modal-header">
          <h3 class="modal-title">${t('retrospective.comments')}</h3>
          <button class="modal-close">×</button>
        </div>
        <div class="modal-body" style="max-height: calc(80vh - 140px); overflow-y: auto;">
          <div class="comment-modal-list" style="margin-bottom: var(--spacing-md);"></div>
          <div class="comment-modal-input-container">
            <textarea class="comment-modal-input" 
                      placeholder="${t('retrospective.commentPlaceholder')}"
                      style="
                        width: 100%;
                        min-height: 80px;
                        padding: var(--spacing-sm);
                        border: 1px solid var(--border-color);
                        border-radius: var(--radius-md);
                        font-family: inherit;
                        font-size: 0.875rem;
                        resize: vertical;
                        background: var(--bg-secondary);
                        color: var(--text-primary);
                      "></textarea>
            <div style="display: flex; justify-content: flex-end; gap: var(--spacing-xs); margin-top: var(--spacing-xs);">
              <button class="comment-modal-submit-btn btn btn-primary" style="padding: var(--spacing-xs) var(--spacing-md);">
                ${t('common.submit')}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    document.body.classList.add('modal-open');
    
    // 渲染留言列表
    this.renderCommentList(modal);
    
    // 初始化時間更新器（無論是否在 P2P 模式下，都需要更新相對時間）
    this.timeUpdaterCleanup = initTimeUpdater(modal, 30000);
    
    // 如果是在 P2P 模式下，定期檢查留言是否有更新（用於同步其他參與者的留言）
    if (this.isP2PMode) {
      let lastCommentCount = (this.item.comments || []).length;
      const checkUpdateInterval = setInterval(() => {
        const currentItem = this.getCurrentItem();
        if (currentItem) {
          const currentCommentCount = (currentItem.comments || []).length;
          if (currentCommentCount !== lastCommentCount) {
            // 留言數量改變，更新 item 並重新渲染
            this.item = currentItem;
            this.renderCommentList(modal);
            lastCommentCount = currentCommentCount;
          }
        }
      }, 1000); // 每秒檢查一次
      
      // 將清理函數擴展為同時清理時間更新器和檢查更新器
      const originalCleanup = this.timeUpdaterCleanup;
      this.timeUpdaterCleanup = () => {
        if (originalCleanup) {
          originalCleanup();
        }
        clearInterval(checkUpdateInterval);
      };
    }
    
    const closeModal = () => {
      // 清理時間更新器和檢查更新器
      if (this.timeUpdaterCleanup) {
        this.timeUpdaterCleanup();
        this.timeUpdaterCleanup = null;
      }
      
      modal.classList.add('closing');
      setTimeout(() => {
        modal.remove();
        if (!document.querySelector('.modal-backdrop')) {
          document.body.classList.remove('modal-open');
        }
      }, 300);
    };
    
    // 綁定關閉事件
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }
    
    // 點擊 backdrop 關閉 modal
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
    
    // 綁定提交事件
    const textarea = modal.querySelector('.comment-modal-input');
    const submitBtn = modal.querySelector('.comment-modal-submit-btn');
    
    if (!textarea || !submitBtn) {
      console.error('CommentModal: Missing textarea or submit button');
      return;
    }
    
    submitBtn.addEventListener('click', () => {
      const text = textarea.value.trim();
      if (text && this.onAddComment) {
        this.onAddComment(this.itemId, this.category, text);
        textarea.value = '';
        // 更新 item 資料並重新渲染留言列表
        setTimeout(() => {
          this.item = this.getCurrentItem();
          this.renderCommentList(modal);
        }, 100);
      }
    });
    
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const text = textarea.value.trim();
        if (text && this.onAddComment) {
          this.onAddComment(this.itemId, this.category, text);
          textarea.value = '';
          // 更新 item 資料並重新渲染留言列表
          setTimeout(() => {
            this.item = this.getCurrentItem();
            this.renderCommentList(modal);
          }, 100);
        }
      }
    });
    
    // 聚焦到輸入框
    setTimeout(() => {
      textarea.focus();
    }, 100);
  }
  
  renderCommentList(modal) {
    const commentList = modal.querySelector('.comment-modal-list');
    if (!commentList) return;
    
    const comments = this.item.comments || [];
    const allowAnonymous = (window.retroState?.hostMode?.retro?.allowAnonymous ?? window.retroState?.participantMode?.getRetro?.()?.allowAnonymous) ?? false;
    const showAuthor = !allowAnonymous;
    
    const globalState = window.retroState || {};
    const currentUserName = globalState.participantMode?.name ||
                            globalState.hostMode?.retro?.host?.name ||
                            'local-user';
    
    if (comments.length === 0) {
      commentList.innerHTML = `<div style="padding: var(--spacing-xl); text-align: center; color: var(--text-secondary); font-size: 0.875rem;">${t('retrospective.noComments')}</div>`;
      return;
    }
    
    commentList.innerHTML = comments.map(comment => {
      const isOwnComment = comment.author.name === currentUserName;
      const authorName = showAuthor
        ? (comment.author.isAnonymous ? t('retrospective.anonymous') : comment.author.name)
        : '';
      
      // 在非 P2P 模式下也允許顯示相對時間（如果時間在閾值內）
      const timeData = formatTime(comment.createdAt, false);
      const timeAttr = timeData.isRelative ? `data-timestamp="${comment.createdAt}" title="${timeData.absoluteTime}"` : '';
      
      return `
        <div class="comment-modal-item" data-comment-id="${comment.id}" style="
          padding: var(--spacing-md);
          margin-bottom: var(--spacing-md);
          background: var(--bg-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        ">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: var(--spacing-sm);">
            <div style="flex: 1;">
              <div style="display: flex; align-items: center; gap: var(--spacing-xs); margin-bottom: var(--spacing-xs);">
                ${showAuthor ? `<span style="font-weight: 500; font-size: 0.875rem; color: var(--text-primary);">${authorName}</span>` : ''}
                <span class="comment-modal-time" ${timeAttr} style="font-size: 0.75rem; color: var(--text-secondary);">${timeData.text}</span>
              </div>
              <div class="comment-modal-text" style="font-size: 0.875rem; color: var(--text-primary); line-height: 1.5; white-space: pre-wrap; word-break: break-word;">${this.escapeHtml(comment.text)}</div>
            </div>
            ${isOwnComment ? `
              <div style="display: flex; gap: var(--spacing-xs);">
                <button class="comment-modal-edit-btn" data-comment-id="${comment.id}" style="
                  padding: 4px;
                  border: none;
                  background: transparent;
                  color: var(--text-secondary);
                  cursor: pointer;
                  border-radius: var(--radius-sm);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 24px;
                  height: 24px;
                " title="${t('common.edit')}">${iconoirIcons.edit(2, 16)}</button>
                <button class="comment-modal-delete-btn" data-comment-id="${comment.id}" style="
                  padding: 4px;
                  border: none;
                  background: transparent;
                  color: var(--color-danger);
                  cursor: pointer;
                  border-radius: var(--radius-sm);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 24px;
                  height: 24px;
                " title="${t('common.delete')}">${iconoirIcons.trash(2, 16)}</button>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');
    
    // 綁定編輯和刪除按鈕事件
    commentList.querySelectorAll('.comment-modal-edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const commentId = btn.dataset.commentId;
        const comment = comments.find(c => c.id === commentId);
        if (comment) {
          this.startEditingComment(modal, commentId, comment.text);
        }
      });
    });
    
    commentList.querySelectorAll('.comment-modal-delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const commentId = btn.dataset.commentId;
        if (this.onDeleteComment) {
          this.onDeleteComment(this.itemId, commentId);
          // 更新 item 資料並重新渲染留言列表
          setTimeout(() => {
            this.item = this.getCurrentItem();
            this.renderCommentList(modal);
          }, 100);
        }
      });
    });
  }
  
  startEditingComment(modal, commentId, currentText) {
    const commentItem = modal.querySelector(`[data-comment-id="${commentId}"]`);
    if (!commentItem) return;
    
    const commentText = commentItem.querySelector('.comment-modal-text');
    if (!commentText) return;
    
    // 保存原始文本的父節點和樣式，以便恢復
    const textParent = commentText.parentNode;
    const originalText = commentText.textContent;
    
    // 創建編輯輸入框
    const textarea = document.createElement('textarea');
    textarea.value = currentText;
    textarea.style.cssText = 'width: 100%; min-height: 60px; padding: var(--spacing-sm); border: 1px solid var(--color-primary); border-radius: var(--radius-md); font-family: inherit; font-size: 0.875rem; resize: vertical; background: var(--bg-card); color: var(--text-primary);';
    
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = 'display: flex; justify-content: flex-end; gap: var(--spacing-xs); margin-top: var(--spacing-xs);';
    
    const saveBtn = document.createElement('button');
    saveBtn.textContent = t('common.save');
    saveBtn.className = 'btn btn-primary';
    saveBtn.style.cssText = 'padding: var(--spacing-xs) var(--spacing-sm);';
    saveBtn.addEventListener('click', () => {
      const newText = textarea.value.trim();
      if (newText && newText !== currentText && this.onUpdateComment) {
        this.onUpdateComment(this.itemId, commentId, newText);
        // 更新 item 資料並重新渲染留言列表
        setTimeout(() => {
          this.item = this.getCurrentItem();
          this.renderCommentList(modal);
        }, 100);
      } else {
        // 取消編輯，恢復原樣
        this.cancelEdit(commentItem, textParent, originalText, textarea, buttonContainer);
      }
    });
    
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = t('common.cancel');
    cancelBtn.className = 'btn btn-secondary';
    cancelBtn.style.cssText = 'padding: var(--spacing-xs) var(--spacing-sm);';
    cancelBtn.addEventListener('click', () => {
      this.cancelEdit(commentItem, textParent, originalText, textarea, buttonContainer);
    });
    
    buttonContainer.appendChild(cancelBtn);
    buttonContainer.appendChild(saveBtn);
    
    // 替換文字為輸入框
    textParent.replaceChild(textarea, commentText);
    commentItem.appendChild(buttonContainer);
    
    // 聚焦輸入框
    textarea.focus();
    textarea.select();
  }
  
  cancelEdit(commentItem, textParent, originalText, textarea, buttonContainer) {
    // 創建新的 commentText 元素來替換 textarea
    const newCommentText = document.createElement('div');
    newCommentText.className = 'comment-modal-text';
    newCommentText.style.cssText = 'font-size: 0.875rem; color: var(--text-primary); line-height: 1.5; white-space: pre-wrap; word-break: break-word;';
    newCommentText.textContent = originalText;
    
    // 替換 textarea 為新的 commentText
    textParent.replaceChild(newCommentText, textarea);
    buttonContainer.remove();
  }
  
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
