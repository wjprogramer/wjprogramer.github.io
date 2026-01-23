// 歷史記錄頁面
import { t } from '../utils/i18n.js';
import { storage } from '../utils/storage/index.js';
import { Router } from '../router.js';
import { Toast } from '../components/Toast.js';
import { ExportModal } from '../components/ExportModal.js';
import { ConfirmModal } from '../components/ConfirmModal.js';
import { iconoirIcons } from '../utils/iconoir.js';

export class HistoryPage {
  constructor(params = {}, query = '') {
    this.router = new Router();
    this.retrospectives = [];
    this.isDestroyed = false; // 追蹤頁面是否已被銷毀
    this.renderContainer = null; // 追蹤當前渲染的 container
    this.googleDriveInitHandler = null; // Google Drive 初始化完成事件處理器
  }

  async render(container) {
    // 重置標記
    this.isDestroyed = false;
    this.renderContainer = container;
    
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
    
    // 載入資料：同時載入本地端和雲端（如果已登入 Google）
    await this.loadRetrospectives();
    
    // 檢查頁面是否已被銷毀（用戶可能已經切換到其他頁面）
    if (this.isDestroyed || this.renderContainer !== container) {
      return; // 如果頁面已被銷毀或 container 已改變，不更新 DOM
    }
    
    // 再次檢查 container 是否還包含我們的 loading 元素（額外安全檢查）
    const loadingElement = container.querySelector('.loading');
    if (!loadingElement) {
      // container 已經被其他頁面使用，不更新
      return;
    }
    
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
            
            <div class="card card-no-hover">
              <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
                <h2 class="card-title">${t('history.title')}</h2>
                <div id="clear-buttons-container">${this.renderClearButtons()}</div>
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
    
    // 監聽 Google Drive 初始化完成事件（當背景初始化完成時自動重新載入歷史記錄）
    this.googleDriveInitHandler = async (event) => {
      const { isConnected } = event.detail || {};
      console.log('HistoryPage: Google Drive initialization completed, isConnected:', isConnected);
      
      // 如果 Google Drive 已連結，重新載入歷史記錄（包括雲端資料）
      if (isConnected) {
        // 檢查頁面是否已被銷毀
        if (this.isDestroyed || !this.renderContainer) {
          return;
        }
        
        // 檢查 history-list 元素是否還存在
        const historyList = document.getElementById('history-list');
        if (!historyList || !this.renderContainer.contains(historyList)) {
          return;
        }
        
        // 重新載入歷史記錄（包括雲端資料）
        await this.loadRetrospectives();
        
        // 再次檢查頁面是否已被銷毀
        if (this.isDestroyed || !this.renderContainer) {
          return;
        }
        
        // 更新歷史記錄列表
        const updatedHistoryList = document.getElementById('history-list');
        if (updatedHistoryList && this.renderContainer.contains(updatedHistoryList)) {
          updatedHistoryList.innerHTML = this.renderHistoryList();
          // 更新清空按鈕
          const clearButtonsContainer = document.getElementById('clear-buttons-container');
          if (clearButtonsContainer) {
            clearButtonsContainer.innerHTML = this.renderClearButtons();
          }
          this.bindEvents();
        }
      }
    };
    window.addEventListener('googleDriveInitComplete', this.googleDriveInitHandler);
  }

  // 載入回顧記錄（同時載入本地端和雲端）
  async loadRetrospectives() {
    const localRetrospectives = storage.localStorage.getRetrospectives();
    const isGoogleDriveConnected = storage.isUsingGoogleDrive();
    
    // 如果已連結 Google Drive，同時載入雲端資料
    if (isGoogleDriveConnected) {
      try {
        const cloudRetrospectives = await storage.googleDrive.getRetrospectives();
        
        // 合併本地端和雲端資料，並標記來源
        const localWithSource = localRetrospectives.map(r => ({ ...r, _source: 'local' }));
        const cloudWithSource = cloudRetrospectives.map(r => ({ ...r, _source: 'cloud' }));
        
        // 合併並去重（如果同一個 ID 在兩邊都存在，優先顯示雲端的）
        // 先處理本地端，再處理雲端，這樣雲端會覆蓋本地端
        const uniqueMap = new Map();
        
        // 先加入本地端
        localWithSource.forEach(retro => {
          uniqueMap.set(retro.id, retro);
        });
        
        // 再加入雲端（會覆蓋同 ID 的本地端）
        cloudWithSource.forEach(retro => {
          uniqueMap.set(retro.id, retro);
        });
        
        this.retrospectives = Array.from(uniqueMap.values());
      } catch (error) {
        console.error('Error loading cloud retrospectives:', error);
        // 如果載入雲端失敗，只顯示本地端資料
        this.retrospectives = localRetrospectives.map(r => ({ ...r, _source: 'local' }));
      }
    } else {
      // 沒有連結 Google Drive，只顯示本地端資料（不標記來源）
      this.retrospectives = localRetrospectives;
    }
    
    // 按建立時間排序（最新的在前），不分本地端和遠端
    this.retrospectives.sort((a, b) => {
      // 優先使用 createdAt，如果沒有則使用 updatedAt
      const timeA = new Date(a.createdAt || a.updatedAt || 0).getTime();
      const timeB = new Date(b.createdAt || b.updatedAt || 0).getTime();
      return timeB - timeA; // 從新到舊
    });
  }

  renderClearButtons() {
    const isGoogleDriveConnected = storage.isUsingGoogleDrive();
    const hasLocal = this.retrospectives.some(r => !r._source || r._source === 'local');
    const hasCloud = this.retrospectives.some(r => r._source === 'cloud');
    
    // 如果沒有資料且未連結 Google Drive，不顯示按鈕
    if (this.retrospectives.length === 0 && !isGoogleDriveConnected) {
      return '';
    }
    
    let buttons = '';
    // 如果有本地端資料或未連結 Google Drive，顯示清空本地端按鈕
    if (hasLocal || (!isGoogleDriveConnected && this.retrospectives.length > 0)) {
      buttons += `
        <button class="btn btn-danger btn-sm" id="clear-local-btn" style="padding: var(--spacing-sm) var(--spacing-md); font-size: 0.875rem; display: inline-flex; align-items: center; gap: var(--spacing-xs);">
          ${iconoirIcons.trash(2.5, 16)} 清空本地端
        </button>
      `;
    }
    // 如果已連結 Google Drive 且有雲端資料，顯示清空雲端按鈕
    if (isGoogleDriveConnected && (hasCloud || this.retrospectives.length > 0)) {
      buttons += `
        <button class="btn btn-danger btn-sm" id="clear-cloud-btn" style="padding: var(--spacing-sm) var(--spacing-md); font-size: 0.875rem; ${buttons ? 'margin-left: var(--spacing-sm);' : ''} display: inline-flex; align-items: center; gap: var(--spacing-xs);">
          ${iconoirIcons.trash(2.5, 16)} 清空雲端
        </button>
      `;
    }
    
    if (!buttons) {
      return '';
    }
    
    return `<div style="display: flex; gap: var(--spacing-sm);">${buttons}</div>`;
  }

  renderHistoryList() {
    if (this.retrospectives.length === 0) {
      return `<p class="text-muted" style="text-align: center; padding: var(--spacing-2xl);">${t('history.noHistory')}</p>`;
    }
    
    const isGoogleDriveConnected = storage.isUsingGoogleDrive();
    
    return this.retrospectives.map((retro, index) => {
      const itemCount = (retro.items?.howDoYouFeel?.length || 0) + 
                       (retro.items?.whatWentWell?.length || 0) + 
                       (retro.items?.whatDidntGoWell?.length || 0) + 
                       (retro.items?.whatNeedsChange?.length || 0) + 
                       (retro.items?.shoutOuts?.length || 0);
      
      // 只有在已連結 Google Drive 時才顯示來源 icon
      const sourceIcon = isGoogleDriveConnected && retro._source ? 
        (retro._source === 'cloud' ? 
          '<span title="雲端資料" style="display: inline-flex; align-items: center; margin-left: var(--spacing-xs); color: var(--color-primary); font-size: 1rem;">☁️</span>' :
          '<span title="本地端資料" style="display: inline-flex; align-items: center; margin-left: var(--spacing-xs); color: var(--text-secondary); font-size: 1rem;">💾</span>'
        ) : '';
      
      return `
        <div class="card card-enter" style="margin-bottom: var(--spacing-md); animation-delay: ${index * 0.1}s;" data-id="${retro.id}" data-source="${retro._source || 'local'}">
          <div class="card-body">
            <div style="display: flex; justify-content: space-between; align-items: start;">
              <div style="flex: 1;">
                <h3 style="margin-bottom: var(--spacing-sm); display: flex; align-items: center;">
                  ${this.escapeHtml(retro.title || t('retrospective.title'))}
                  ${sourceIcon}
                </h3>
                <p class="text-muted" style="margin-bottom: var(--spacing-sm);">
                  ${retro.createdAt ? `
                    <span style="margin-left: var(--spacing-sm); font-size: 0.875rem;">
                      ${this.formatDateTime(retro.createdAt)}
                    </span>
                  ` : ''}
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
                <button class="btn btn-outline-primary btn-sm view-btn" title="${t('history.view')}" style="width: 40px; height: 40px; padding: 0; min-width: 40px; min-height: 40px;">
                  ${iconoirIcons.eye(2.5)}
                </button>
                <button class="btn btn-outline-accent btn-sm export-btn" title="${t('history.export')}" style="width: 40px; height: 40px; padding: 0; min-width: 40px; min-height: 40px;">
                  ${iconoirIcons.download(2.5)}
                </button>
                <button class="btn btn-outline-danger btn-sm delete-btn" title="${t('history.delete')}" style="width: 40px; height: 40px; padding: 0; min-width: 40px; min-height: 40px;">
                  ${iconoirIcons.trash(2.5)}
                </button>
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
    
    // 清空本地端按鈕
    const clearLocalBtn = document.getElementById('clear-local-btn');
    if (clearLocalBtn) {
      clearLocalBtn.addEventListener('click', () => {
        this.clearLocalHistory();
      });
    }
    
    // 清空雲端按鈕
    const clearCloudBtn = document.getElementById('clear-cloud-btn');
    if (clearCloudBtn) {
      clearCloudBtn.addEventListener('click', () => {
        this.clearCloudHistory();
      });
    }
  }

  viewRetro(retro) {
    // 加上 from=history 參數，讓回顧頁面知道是從歷史記錄頁面來的
    this.router.navigate(`/retrospective/${retro.id}?from=history`);
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
    const retro = this.retrospectives.find(r => r.id === id);
    if (!retro) return;
    
    const modal = new ConfirmModal({
      title: t('common.confirm'),
      message: t('common.confirmDelete'),
      confirmText: t('common.delete'),
      cancelText: t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      onConfirm: async () => {
        // 根據來源決定從哪裡刪除
        const isGoogleDriveConnected = storage.isUsingGoogleDrive();
        let result = false;
        
        if (retro._source === 'cloud' && isGoogleDriveConnected) {
          // 從雲端刪除
          result = await storage.googleDrive.deleteRetrospective(id);
        } else {
          // 從本地端刪除
          result = storage.localStorage.deleteRetrospective(id);
        }
        
        // 檢查頁面是否已被銷毀（用戶可能已經切換到其他頁面）
        if (this.isDestroyed || !this.renderContainer) {
          return; // 如果頁面已被銷毀，不更新 DOM
        }
        
        // 檢查 history-list 元素是否還存在（額外安全檢查）
        const historyList = document.getElementById('history-list');
        if (!historyList || !this.renderContainer.contains(historyList)) {
          return; // 元素不存在或不在我們的 container 中，不更新
        }
        
        if (result) {
          Toast.success(t('common.success'));
          // 重新載入資料
          await this.loadRetrospectives();
          
          // 再次檢查頁面是否已被銷毀
          if (this.isDestroyed || !this.renderContainer) {
            return;
          }
          
          const updatedHistoryList = document.getElementById('history-list');
          if (updatedHistoryList && this.renderContainer.contains(updatedHistoryList)) {
            updatedHistoryList.innerHTML = this.renderHistoryList();
            // 更新清空按鈕
            const clearButtonsContainer = document.getElementById('clear-buttons-container');
            if (clearButtonsContainer) {
              clearButtonsContainer.innerHTML = this.renderClearButtons();
            }
            this.bindEvents();
          }
        } else {
          Toast.error(t('common.error'));
        }
      }
    });
    
    modal.show();
  }

  async clearLocalHistory() {
    const modal = new ConfirmModal({
      title: t('common.confirm'),
      message: '確定要清空所有本地端歷史紀錄嗎？此操作無法復原。',
      confirmText: t('common.confirm'),
      cancelText: t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      onConfirm: async () => {
        try {
          storage.localStorage.clearHistory();
          Toast.success('已清空本地端歷史紀錄');
          
          // 重新載入資料
          await this.loadRetrospectives();
          
          // 檢查頁面是否已被銷毀
          if (this.isDestroyed || !this.renderContainer) {
            return;
          }
          
          // 更新 UI
          const historyList = document.getElementById('history-list');
          if (historyList && this.renderContainer.contains(historyList)) {
            historyList.innerHTML = this.renderHistoryList();
          }
          
          // 更新清空按鈕
          const clearButtonsContainer = document.getElementById('clear-buttons-container');
          if (clearButtonsContainer) {
            clearButtonsContainer.innerHTML = this.renderClearButtons();
          }
          
          this.bindEvents();
        } catch (error) {
          console.error('Error clearing local history:', error);
          Toast.error('清空本地端歷史紀錄失敗');
        }
      }
    });
    
    modal.show();
  }

  async clearCloudHistory() {
    const modal = new ConfirmModal({
      title: t('common.confirm'),
      message: '確定要清空所有雲端歷史紀錄嗎？此操作無法復原。',
      confirmText: t('common.confirm'),
      cancelText: t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      onConfirm: async () => {
        try {
          if (!storage.isUsingGoogleDrive()) {
            Toast.error('未連結 Google Drive');
            return;
          }
          
          await storage.googleDrive.clearHistory();
          Toast.success('已清空雲端歷史紀錄');
          
          // 重新載入資料
          await this.loadRetrospectives();
          
          // 檢查頁面是否已被銷毀
          if (this.isDestroyed || !this.renderContainer) {
            return;
          }
          
          // 更新 UI
          const historyList = document.getElementById('history-list');
          if (historyList && this.renderContainer.contains(historyList)) {
            historyList.innerHTML = this.renderHistoryList();
          }
          
          // 更新清空按鈕
          const clearButtonsContainer = document.getElementById('clear-buttons-container');
          if (clearButtonsContainer) {
            clearButtonsContainer.innerHTML = this.renderClearButtons();
          }
          
          this.bindEvents();
        } catch (error) {
          console.error('Error clearing cloud history:', error);
          Toast.error('清空雲端歷史紀錄失敗');
        }
      }
    });
    
    modal.show();
  }

  formatDateTime(timestamp) {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  destroy() {
    // 標記頁面已被銷毀，防止非同步操作完成後更新 DOM
    this.isDestroyed = true;
    this.renderContainer = null;
    
    // 移除 Google Drive 初始化完成事件監聽器
    if (this.googleDriveInitHandler) {
      window.removeEventListener('googleDriveInitComplete', this.googleDriveInitHandler);
      this.googleDriveInitHandler = null;
    }
  }
}

