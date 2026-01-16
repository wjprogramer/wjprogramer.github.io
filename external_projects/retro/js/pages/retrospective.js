// 回顧會議頁面（單人模式 + P2P 模式）
import { t } from '../utils/i18n.js';
import { storage } from '../utils/storage/index.js';
import { RetroCard } from '../components/RetroCard.js';
import { VoteButton } from '../components/VoteButton.js';
import { ExportModal } from '../components/ExportModal.js';
import { Toast } from '../components/Toast.js';
import { Router } from '../router.js';
import { copyToClipboard } from '../utils/clipboard.js';
import { ParticipantList } from '../components/ParticipantList.js';

export class RetrospectivePage {
  constructor(params = {}) {
    this.meetingId = params.meetingId;
    this.router = new Router();
    this.currentRetro = null;
    this.items = {
      howDoYouFeel: [],
      whatWentWell: [],
      whatDidntGoWell: [],
      whatNeedsChange: [],
      shoutOuts: []
    };
    this.isP2PMode = false;
    this.participantMode = null;
    this.hostMode = null;
    this.editingCategory = null; // 追蹤正在新增項目的欄位
    this.editingItemId = null; // 追蹤正在編輯的項目 ID
    this.categories = ['howDoYouFeel', 'whatWentWell', 'whatDidntGoWell', 'whatNeedsChange', 'shoutOuts'];
    this.renderedItemIds = new Set(); // 追蹤已經渲染過的項目 ID，用於判斷是否需要動畫
  }

  async render(container) {
    // 檢查是否為 P2P 模式（有 meetingId 且不是從 localStorage 載入的）
    if (this.meetingId) {
      // 嘗試從全域狀態取得 P2P 模式實例
      const globalState = window.retroState || {};
      if (globalState.participantMode && globalState.meetingId === this.meetingId) {
        this.participantMode = globalState.participantMode;
        this.isP2PMode = true;
        this.currentRetro = this.participantMode.getRetro();
      } else if (globalState.hostMode && globalState.meetingId === this.meetingId) {
        this.hostMode = globalState.hostMode;
        this.isP2PMode = true;
        this.currentRetro = this.hostMode.retro;
      } else {
        // 載入歷史記錄
        this.currentRetro = await this.loadRetro(this.meetingId);
      }
    } else {
      // 單人模式：初始化新的回顧
      this.currentRetro = this.createNewRetro();
    }

    if (this.currentRetro) {
      this.items = this.currentRetro.items || this.items;
      // 初始化時，將所有已存在的項目標記為已渲染（避免初始載入時所有卡片都有動畫）
      this.categories.forEach(category => {
        const items = this.items[category] || [];
        items.forEach(item => {
          this.renderedItemIds.add(item.id);
        });
      });
    }

    // 如果是 P2P 模式，註冊更新回調
    if (this.isP2PMode && this.participantMode) {
      this.participantMode.onItemUpdate(() => {
        this.currentRetro = this.participantMode.getRetro();
        if (this.currentRetro) {
          this.items = this.currentRetro.items || this.items;
          this.renderItems();
        }
      });
    } else if (this.isP2PMode && this.hostMode) {
      this.hostMode.onItemUpdate(() => {
        this.currentRetro = this.hostMode.retro;
        if (this.currentRetro) {
          this.items = this.currentRetro.items || this.items;
          this.renderItems();
        }
      });
      
      // 註冊參與者加入/離開回調（host 模式）
      this.hostMode.onParticipantJoin((participant) => {
        this.updateParticipantsList();
        Toast.info(`${participant.name} 已加入`);
      });
      
      this.hostMode.onParticipantLeave((participant) => {
        this.updateParticipantsList();
        Toast.info(`${participant.name} 已離開`);
      });
    }

    // 檢查是否為 host 模式
    const isHost = this.isP2PMode && this.hostMode;
    const joinLink = this.meetingId ? `${window.location.origin}${window.location.pathname}#/join/${this.meetingId}` : null;
    
    container.innerHTML = `
      <div class="page-container">
        <div class="main-content">
          <div class="container" style="max-width: 1600px;">
            <div style="margin-bottom: var(--spacing-lg); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--spacing-md);">
              <button class="btn btn-text" onclick="window.location.hash='/'">
                ← ${t('common.cancel')}
              </button>
              
              <div style="display: flex; gap: var(--spacing-sm); align-items: center;">
                ${isHost && joinLink ? `
                  <button class="btn btn-secondary" id="share-link-btn" title="分享連結">
                    <i class="iconoir-link"></i>
                  </button>
                  <button class="btn btn-secondary" id="show-qr-btn" title="顯示 QR Code">
                    <i class="iconoir-qr-code"></i>
                  </button>
                ` : ''}
                <button class="btn btn-accent" id="export-btn">
                  ${t('retrospective.export')}
                </button>
              </div>
            </div>
            
            ${isHost && joinLink ? `
              <div id="share-section" class="card" style="margin-bottom: var(--spacing-lg); display: block;">
                <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
                  <h3 class="card-title" style="margin: 0;">分享會議</h3>
                  <button class="btn btn-text" id="close-share-btn" style="padding: 0; min-width: auto;">
                    <i class="iconoir-cancel"></i>
                  </button>
                </div>
                <div class="card-body">
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-md); margin-bottom: var(--spacing-md);">
                    <div>
                      <label style="display: block; margin-bottom: var(--spacing-sm); font-weight: 500; font-size: 0.875rem;">
                        ${t('host.meetingId')}
                      </label>
                      <div style="display: flex; gap: var(--spacing-sm);">
                        <input type="text" id="meeting-id-display" readonly value="${this.meetingId}"
                          style="flex: 1; padding: var(--spacing-sm); border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-secondary); font-size: 0.875rem;">
                        <button class="btn btn-secondary" id="copy-id-btn" style="padding: var(--spacing-sm) var(--spacing-md); font-size: 0.875rem;">${t('host.copyId')}</button>
                      </div>
                    </div>
                    
                    <div>
                      <label style="display: block; margin-bottom: var(--spacing-sm); font-weight: 500; font-size: 0.875rem;">
                        加入連結
                      </label>
                      <div style="display: flex; gap: var(--spacing-sm);">
                        <input type="text" id="join-link-display" readonly value="${joinLink}"
                          style="flex: 1; padding: var(--spacing-sm); border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-secondary); font-size: 0.75rem;">
                        <button class="btn btn-secondary" id="copy-link-btn" style="padding: var(--spacing-sm) var(--spacing-md); font-size: 0.875rem;">${t('host.copyLink')}</button>
                      </div>
                    </div>
                  </div>
                  
                  <div style="text-align: center;">
                    <label style="display: block; margin-bottom: var(--spacing-sm); font-weight: 500; font-size: 0.875rem;">
                      ${t('host.qrCode')}
                    </label>
                    <div id="qr-code-container" style="display: inline-block; background: white; padding: var(--spacing-sm); border-radius: var(--radius-md);"></div>
                  </div>
                </div>
              </div>
            ` : ''}
            
            <div style="display: grid; grid-template-columns: ${isHost ? '1fr 300px' : '1fr'}; gap: var(--spacing-lg); margin-bottom: var(--spacing-lg);">
              <div class="card">
                <div class="card-header">
                  <h2 class="card-title">${this.currentRetro?.title || t('retrospective.title')}</h2>
                  ${this.currentRetro?.description ? `<p class="text-muted">${this.currentRetro.description}</p>` : ''}
                </div>
              </div>
              
              ${isHost ? `
                <div class="card" style="max-height: 400px; overflow-y: auto;">
                  <div class="card-header">
                    <h3 class="card-title" style="font-size: 1rem; margin: 0;">${t('host.participants')}</h3>
                  </div>
                  <div class="card-body">
                    <div id="participants-list"></div>
                  </div>
                </div>
              ` : ''}
            </div>
            
            <style>
              @media (max-width: 1024px) {
                .retrospective-page-header {
                  grid-template-columns: 1fr !important;
                }
              }
            </style>
            
            <div id="retro-columns-container" class="retro-columns" style="width: 100%; overflow-x: auto;">
              ${this.renderColumns()}
            </div>
          </div>
        </div>
      </div>
    `;
    
    // 添加欄位式佈局樣式
    this.addColumnStyles();
    
    // 渲染項目列表
    this.renderItems();
    
    // 如果是 host 模式，更新參與者列表並生成 QR Code
    if (this.isP2PMode && this.hostMode) {
      this.updateParticipantsList();
      // 預設顯示 QR Code
      this.generateQRCode();
    }
    
    // 綁定事件
    this.bindEvents();
  }

  renderColumns() {
    return this.categories.map(category => `
      <div class="retro-column" data-category="${category}">
        <div class="retro-column-header">
          <h3 class="retro-column-title">${t(`retrospective.${category}`)}</h3>
          <button class="retro-add-btn" data-category="${category}" ${this.isP2PMode && this.currentRetro?.status !== 'collecting' ? 'disabled' : ''}>
            <i class="iconoir-plus"></i>
          </button>
        </div>
        <div class="retro-column-items" data-items="${category}"></div>
      </div>
    `).join('');
  }

  addColumnStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .retro-columns {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: var(--spacing-lg);
        margin-bottom: var(--spacing-lg);
        min-width: 1200px;
      }
      
      .retro-column {
        background: var(--bg-card);
        border-radius: var(--radius-lg);
        padding: var(--spacing-md);
        border: 1px solid var(--border-color);
        display: flex;
        flex-direction: column;
        min-height: 400px;
      }
      
      .retro-column-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--spacing-md);
        padding-bottom: var(--spacing-md);
        border-bottom: 1px solid var(--divider-color);
      }
      
      .retro-column-title {
        font-size: 1rem;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0;
        flex: 1;
      }
      
      .retro-add-btn {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 2px solid var(--color-primary);
        background: transparent;
        color: var(--color-primary);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all var(--transition-base);
        flex-shrink: 0;
        padding: 0;
      }
      
      .retro-add-btn i {
        font-size: 1.25rem;
        display: block;
      }
      
      .retro-add-btn:hover:not(:disabled) {
        background: var(--color-primary);
        color: white;
        transform: scale(1.1);
      }
      
      .retro-add-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      .retro-column-items {
        flex: 1;
        overflow-y: auto;
        min-height: 0;
      }
      
      .retro-column-items .card {
        margin-bottom: var(--spacing-md);
        padding: var(--spacing-md);
      }
      
      .retro-column-items .card:last-child {
        margin-bottom: 0;
      }
      
      .retro-item-input {
        width: 100%;
        min-height: 80px;
        padding: var(--spacing-md);
        border: 2px solid var(--color-primary);
        border-radius: var(--radius-md);
        font-family: inherit;
        font-size: 0.875rem;
        resize: vertical;
        margin-bottom: var(--spacing-sm);
      }
      
      .retro-item-input:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
      }
      
      .retro-item-actions {
        display: flex;
        gap: var(--spacing-sm);
        margin-bottom: var(--spacing-md);
      }
      
      .retro-item-edit-input {
        width: 100%;
        min-height: 80px;
        padding: var(--spacing-md);
        border: 2px solid var(--color-primary);
        border-radius: var(--radius-md);
        font-family: inherit;
        font-size: 0.875rem;
        resize: vertical;
        margin-bottom: var(--spacing-sm);
      }
      
      .retro-item-edit-input:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
      }
      
      .retro-card-clickable:hover {
        background: var(--bg-secondary);
      }
      
      @media (max-width: 1400px) {
        .retro-columns {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      
      @media (max-width: 900px) {
        .retro-columns {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      
      @media (max-width: 600px) {
        .retro-columns {
          grid-template-columns: 1fr;
        }
      }
    `;
    document.head.appendChild(style);
  }

  renderItems() {
    this.categories.forEach(category => {
      const container = document.querySelector(`[data-items="${category}"]`);
      if (!container) return;
      
      const items = this.items[category] || [];
      
      let html = '';
      
      // 渲染現有項目
      items.forEach((item, index) => {
        const card = new RetroCard(item, category, index);
        const isEditing = this.editingItemId === item.id;
        // 只有新項目（不在已渲染列表中的）才需要動畫
        const isNewItem = !this.renderedItemIds.has(item.id);
        let cardHtml = card.render(isEditing, isNewItem);
        
        // 如果是新項目，延遲標記為已渲染（等動畫播放完成）
        if (isNewItem) {
          // 動畫時長是 0.6 秒，延遲 0.7 秒後標記，確保動畫完成
          setTimeout(() => {
            this.renderedItemIds.add(item.id);
          }, 700);
        } else {
          // 如果不是新項目，立即標記（避免重複標記）
          this.renderedItemIds.add(item.id);
        }
        
        // 如果是 P2P 模式，添加投票按鈕
        if (this.isP2PMode) {
          const voteBtn = new VoteButton(item, category, index, (cat, itemId, vote) => {
            this.handleVote(cat, itemId, vote);
          });
          const lastDivIndex = cardHtml.lastIndexOf('</div>');
          if (lastDivIndex !== -1) {
            cardHtml = cardHtml.substring(0, lastDivIndex) + 
                       '<div style="display: flex; justify-content: flex-end; margin-top: var(--spacing-md);">' + 
                       voteBtn.render() + 
                       '</div>' + 
                       cardHtml.substring(lastDivIndex);
          }
        }
        
        html += `<div data-item-id="${item.id}" data-item-index="${index}">${cardHtml}</div>`;
      });
      
      // 如果正在新增項目，顯示輸入框
      if (this.editingCategory === category) {
        html += `
          <div class="retro-item-input-container">
            <textarea class="retro-item-input" 
              placeholder="${t('retrospective.itemTextPlaceholder')}" 
              data-category="${category}"
            ></textarea>
          </div>
        `;
      }
      
      container.innerHTML = html || `<p class="text-muted" style="text-align: center; padding: var(--spacing-xl); font-size: 0.875rem;">${t('retrospective.noItems')}</p>`;
      
      // 綁定卡片事件
      items.forEach((item, index) => {
        const cardElement = container.querySelector(`[data-item-id="${item.id}"]`);
        if (cardElement) {
          this.bindCardEvents(cardElement, item, index, category);
          
          // 綁定投票按鈕事件
          if (this.isP2PMode) {
            const voteBtn = cardElement.querySelector('.vote-btn');
            if (voteBtn) {
              const voteButton = new VoteButton(item, category, index, (cat, itemId, vote) => {
                this.handleVote(cat, itemId, vote);
              });
              voteButton.bindEvents(voteBtn);
            }
          }
        }
      });
      
      // 如果正在新增項目，自動聚焦輸入框並綁定事件
      if (this.editingCategory === category) {
        const textarea = container.querySelector('.retro-item-input');
        if (textarea) {
          textarea.focus();
          
          // 自動保存機制：失去焦點時保存
          let saveTimeout = null;
          
          textarea.addEventListener('blur', () => {
            // 延遲一點執行，讓其他事件先處理（比如點擊其他按鈕）
            setTimeout(() => {
              this.autoSaveNewItem(category);
            }, 200);
          });
          
          // 輸入時使用 debounce 自動保存
          textarea.addEventListener('input', () => {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
              // 只在有內容時自動保存
              if (textarea.value.trim()) {
                this.autoSaveNewItem(category, false); // false 表示不關閉編輯狀態
              }
            }, 1000); // 1秒後自動保存
          });
          
          // Enter + Ctrl/Cmd 快速保存並關閉
          textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
              e.preventDefault();
              this.autoSaveNewItem(category, true); // true 表示保存後關閉
            }
            // Escape 取消（如果為空）
            if (e.key === 'Escape') {
              e.preventDefault();
              if (!textarea.value.trim()) {
                this.cancelAddingItem();
              }
            }
          });
        }
      }
    });
  }

  bindCardEvents(cardElement, item, index, category) {
    const deleteBtn = cardElement.querySelector('.delete-btn');
    const cardClickable = cardElement.querySelector('.retro-card-clickable');
    
    // 點擊卡片進入編輯模式
    if (cardClickable) {
      cardClickable.addEventListener('click', (e) => {
        // 如果點擊的是 delete 按鈕，不觸發編輯
        if (e.target.closest('.delete-btn')) {
          return;
        }
        // 如果點擊的是投票按鈕，不觸發編輯
        if (e.target.closest('.vote-btn')) {
          return;
        }
        this.startEditingItem(item.id, category).catch(err => console.error('Error starting edit:', err));
      });
    }
    
    // 編輯輸入框自動保存
    const editTextarea = cardElement.querySelector('.retro-item-edit-input');
    if (editTextarea) {
      let saveTimeout = null;
      const originalValue = editTextarea.value;
      
      // 失去焦點時自動保存
      editTextarea.addEventListener('blur', async () => {
        // 延遲一點執行，讓其他事件先處理
        setTimeout(async () => {
          await this.autoSaveEditItem(item.id, index, category, originalValue);
        }, 200);
      });
      
      // 輸入時使用 debounce 自動保存
      editTextarea.addEventListener('input', () => {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(async () => {
          // 只在有內容時自動保存
          if (editTextarea.value.trim()) {
            await this.autoSaveEditItem(item.id, index, category, originalValue, false);
          }
        }, 1000); // 1秒後自動保存
      });
      
      // Enter + Ctrl/Cmd 快速保存並關閉
      editTextarea.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          await this.autoSaveEditItem(item.id, index, category, originalValue, true);
        }
        // Escape 取消編輯（如果內容未改變或為空）
        if (e.key === 'Escape') {
          e.preventDefault();
          if (!editTextarea.value.trim() || editTextarea.value === originalValue) {
            this.cancelEditingItem();
          }
        }
      });
    }
    
    // 刪除按鈕
    if (deleteBtn) {
      deleteBtn.addEventListener('click', async (e) => {
        e.stopPropagation(); // 阻止觸發卡片點擊事件
        await this.deleteItem(index, category);
      });
    }
  }
  
  async startEditingItem(itemId, category) {
    // 如果正在新增項目，先保存
    if (this.editingCategory) {
      await this.autoSaveNewItem(this.editingCategory, true);
    }
    // 如果正在編輯其他項目，先取消
    if (this.editingItemId && this.editingItemId !== itemId) {
      this.cancelEditingItem();
    }
    this.editingItemId = itemId;
    this.renderItems();
    
    // 聚焦到編輯輸入框
    setTimeout(() => {
      const textarea = document.querySelector('.retro-item-edit-input');
      if (textarea) {
        textarea.focus();
        textarea.select(); // 選中所有文字
      }
    }, 0);
  }
  
  cancelEditingItem() {
    this.editingItemId = null;
    this.renderItems();
  }
  
  async autoSaveEditItem(itemId, index, category, originalValue, closeAfterSave = true) {
    const textarea = document.querySelector('.retro-item-edit-input');
    if (!textarea) return;
    
    const text = textarea.value.trim();
    
    // 如果內容為空，自動刪除項目
    if (!text) {
      if (closeAfterSave) {
        await this.deleteItem(index, category);
        this.cancelEditingItem();
      }
      return;
    }
    
    // 如果內容沒有改變，不需要保存
    if (text === originalValue.trim()) {
      if (closeAfterSave) {
        this.cancelEditingItem();
      }
      return;
    }
    
    // 如果有內容且改變了，保存項目
    await this.updateItem(index, text, category);
    
    // 如果指定關閉，則關閉編輯狀態
    if (closeAfterSave) {
      this.cancelEditingItem();
    }
  }
  
  // 保留舊方法以備不時之需（但現在應該不會被調用）
  async saveEditItem(itemId, index, category) {
    const textarea = document.querySelector('.retro-item-edit-input');
    if (!textarea) return;
    const originalValue = textarea.value;
    await this.autoSaveEditItem(itemId, index, category, originalValue, true);
  }

  bindEvents() {
    // 新增項目按鈕（每個欄位的 + 按鈕）
    document.querySelectorAll('.retro-add-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        this.startAddingItem(category);
      });
    });
    
    // 匯出
    const exportBtn = document.getElementById('export-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        this.showExportModal();
      });
    }
    
    // 分享功能（host 模式）
    if (this.isP2PMode && this.hostMode) {
      const shareLinkBtn = document.getElementById('share-link-btn');
      const showQrBtn = document.getElementById('show-qr-btn');
      const shareSection = document.getElementById('share-section');
      const closeShareBtn = document.getElementById('close-share-btn');
      const copyIdBtn = document.getElementById('copy-id-btn');
      const copyLinkBtn = document.getElementById('copy-link-btn');
      
      // 顯示/隱藏分享區塊
      if (shareLinkBtn && shareSection) {
        shareLinkBtn.addEventListener('click', () => {
          const isHidden = shareSection.style.display === 'none' || !shareSection.style.display;
          shareSection.style.display = isHidden ? 'block' : 'none';
          if (isHidden) {
            this.generateQRCode();
          }
        });
      }
      
      if (showQrBtn && shareSection) {
        showQrBtn.addEventListener('click', () => {
          const isHidden = shareSection.style.display === 'none' || !shareSection.style.display;
          shareSection.style.display = isHidden ? 'block' : 'none';
          // 如果顯示分享區塊，生成 QR Code
          if (isHidden) {
            this.generateQRCode();
          }
        });
      }
      
      if (closeShareBtn && shareSection) {
        closeShareBtn.addEventListener('click', () => {
          shareSection.style.display = 'none';
        });
      }
      
      // 複製會議 ID
      if (copyIdBtn) {
        copyIdBtn.addEventListener('click', () => {
          const meetingId = document.getElementById('meeting-id-display')?.value;
          if (meetingId) {
            copyToClipboard(meetingId);
          }
        });
      }
      
      // 複製連結
      if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', () => {
          const joinLink = document.getElementById('join-link-display')?.value;
          if (joinLink) {
            copyToClipboard(joinLink);
          }
        });
      }
    }
  }
  
  // 生成 QR Code
  async generateQRCode() {
    const joinLink = this.meetingId ? `${window.location.origin}${window.location.pathname}#/join/${this.meetingId}` : null;
    if (!joinLink) return;
    
    // 檢查 QRCode 是否可用
    if (typeof QRCode === 'undefined') {
      try {
        // 嘗試載入 QRCode 庫
        await this.loadQRCodeLibrary();
        
        // 再次檢查
        if (typeof QRCode === 'undefined') {
          console.error('QRCode library failed to load');
          Toast.error('無法載入 QRCode 庫，請重新整理頁面');
          return;
        }
      } catch (error) {
        console.error('Failed to load QRCode:', error);
        Toast.error(error.message || '無法載入 QRCode 庫，請重新整理頁面');
        return;
      }
    }
    
    // 使用 qrcodejs 的方式（和敏捷估點一樣）
    const container = document.getElementById('qr-code-container');
    if (!container) {
      console.error('QR Code container not found');
      return;
    }
    
    // 清空容器
    container.innerHTML = '';
    
    const size = Math.min(300, window.innerWidth - 64);
    
    try {
      // 使用 qrcodejs 的 API（和敏捷估點一樣）
      const qrcode = new QRCode(container, {
        text: joinLink,
        width: size,
        height: size,
        colorDark: '#000000',
        colorLight: '#FFFFFF',
        correctLevel: QRCode.CorrectLevel.M
      });
      
      // 設定樣式
      const canvas = container.querySelector('canvas');
      const img = container.querySelector('img');
      
      if (canvas) {
        canvas.style.borderRadius = '8px';
        canvas.style.display = 'block';
        canvas.style.margin = '0 auto';
      }
      
      if (img) {
        img.style.borderRadius = '8px';
        img.style.display = 'block';
        img.style.margin = '0 auto';
      }
    } catch (error) {
      console.error('QR Code generation error:', error);
      Toast.error('QR Code 生成失敗');
    }
  }
  
  loadQRCodeLibrary() {
    return new Promise((resolve, reject) => {
      // 如果 QRCode 已經可用，直接 resolve
      if (typeof QRCode !== 'undefined') {
        resolve();
        return;
      }
      
      // 檢查是否已經有 script 標籤在載入
      const existingScript = document.querySelector('script[src*="qrcode"]');
      if (existingScript) {
        // 等待載入完成
        let attempts = 0;
        const maxAttempts = 100; // 最多等待 10 秒（因為可能還在載入中）
        const checkQRCode = setInterval(() => {
          attempts++;
          if (typeof QRCode !== 'undefined') {
            clearInterval(checkQRCode);
            resolve();
          } else if (attempts >= maxAttempts) {
            clearInterval(checkQRCode);
            reject(new Error('QRCode 載入超時，請重新整理頁面'));
          }
        }, 100);
        return;
      }
      
      // 如果都沒有，動態載入（使用 qrcodejs，和敏捷估點一樣）
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js';
      
      // 設定超時
      const timeout = setTimeout(() => {
        script.remove();
        reject(new Error('QRCode 載入超時，請檢查網路連線'));
      }, 30000); // 30 秒超時
      
      script.onload = () => {
        clearTimeout(timeout);
        // 等待 QRCode 可用
        let attempts = 0;
        const maxAttempts = 50; // 最多等待 5 秒
        const checkQRCode = setInterval(() => {
          attempts++;
          if (typeof QRCode !== 'undefined') {
            clearInterval(checkQRCode);
            resolve();
          } else if (attempts >= maxAttempts) {
            clearInterval(checkQRCode);
            reject(new Error('QRCode 載入後不可用'));
          }
        }, 100);
      };
      
      script.onerror = (error) => {
        clearTimeout(timeout);
        console.error('Failed to load QRCode script:', error);
        reject(new Error('無法載入 QRCode 庫，請檢查網路連線'));
      };
      
      document.head.appendChild(script);
    });
  }
  
  startAddingItem(category) {
    // 如果正在編輯項目，先取消編輯
    if (this.editingItemId) {
      this.cancelEditingItem();
    }
    // 如果正在新增其他欄位的項目，先自動保存
    if (this.editingCategory && this.editingCategory !== category) {
      this.autoSaveNewItem(this.editingCategory, true); // true 表示保存後關閉
    }
    this.editingCategory = category;
    this.renderItems();
  }
  
  cancelAddingItem() {
    this.editingCategory = null;
    this.renderItems();
  }
  
  async autoSaveNewItem(category, closeAfterSave = true) {
    const container = document.querySelector(`[data-items="${category}"]`);
    if (!container) return;
    
    const textarea = container.querySelector('.retro-item-input');
    
    if (!textarea) return;
    
    const text = textarea.value.trim();
    
    // 如果內容為空，自動刪除/取消
    if (!text) {
      if (closeAfterSave) {
        this.cancelAddingItem();
      }
      return;
    }
    
    // 如果有內容，保存項目
    // 根據 retro.allowAnonymous 決定是否匿名（全部匿名或全部不匿名）
    const isAnonymous = this.currentRetro?.allowAnonymous || false;
    await this.addItem(category, text, isAnonymous);
    
    // 如果指定關閉，則關閉編輯狀態
    if (closeAfterSave) {
      this.cancelAddingItem();
    } else {
      // 不關閉時，清空輸入框準備下一個項目
      textarea.value = '';
      textarea.focus();
    }
  }
  
  // 保留舊方法以備不時之需（但現在應該不會被調用）
  saveNewItem(category, autoSave = false) {
    this.autoSaveNewItem(category, true);
  }

  showAddItemModal() {
    // 注意：此方法已不再使用，因為現在使用直接新增的方式
    // 保留作為備用
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">${t('retrospective.addItem')}</h3>
          <button class="modal-close">×</button>
        </div>
        <div class="modal-body">
          <div style="margin-bottom: var(--spacing-md);">
            <label style="display: block; margin-bottom: var(--spacing-sm); font-weight: 500;">
              ${t('retrospective.itemText')}
            </label>
            <textarea id="item-text" 
              placeholder="${t('retrospective.itemTextPlaceholder')}" 
              style="width: 100%; min-height: 120px; padding: var(--spacing-md); border: 1px solid var(--border-color); border-radius: var(--radius-md); font-family: inherit; resize: vertical;"
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary cancel-btn">${t('common.cancel')}</button>
          <button class="btn btn-primary save-btn">${t('common.save')}</button>
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
    modal.querySelector('.save-btn').addEventListener('click', async () => {
      const text = document.getElementById('item-text').value.trim();
      if (text) {
        // 注意：showAddItemModal 已經不再使用，因為現在使用直接新增的方式
        // 這裡保留作為備用，但需要指定 category
        closeModal();
      }
    });
    
    // 點擊背景關閉
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  async addItem(category, text, isAnonymous = false) {
    // 根據 retro.allowAnonymous 決定是否匿名（全部匿名或全部不匿名）
    const shouldBeAnonymous = this.currentRetro?.allowAnonymous || false;
    
    const newItem = {
      id: this.generateId(),
      text: text,
      author: {
        name: this.isP2PMode ? (this.participantMode?.name || 'Participant') : 'You',
        isAnonymous: shouldBeAnonymous // 統一使用 retro.allowAnonymous 設定
      },
      createdAt: Date.now(),
      updatedAt: Date.now(),
      votes: 0,
      voters: []
    };
    
    if (this.isP2PMode && this.participantMode) {
      // P2P 模式：透過資料通道發送
      this.participantMode.addItem(category, newItem);
    } else if (this.isP2PMode && this.hostMode) {
      // 房主模式：直接新增並廣播
      const peerId = this.hostMode.peerManager?.peerId;
      if (peerId) {
        this.hostMode.handleAddItem(peerId, {
          category: category,
          item: newItem
        });
      }
    } else {
      // 單人模式：直接新增
      this.items[category].push(newItem);
      await this.saveRetro();
    }
    
    this.renderItems();
    // 移除成功通知，避免頻繁顯示
  }
  
  handleVote(category, itemId, vote) {
    if (this.isP2PMode && this.participantMode) {
      this.participantMode.vote(category, itemId, vote);
    } else if (this.isP2PMode && this.hostMode) {
      // 房主也可以投票
      const peerId = this.hostMode.peerManager?.peerId;
      if (peerId) {
        this.hostMode.handleVote(peerId, {
          category,
          itemId,
          vote
        });
      }
    }
  }

  editItem(item, index, category) {
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">${t('retrospective.editItem')}</h3>
          <button class="modal-close">×</button>
        </div>
        <div class="modal-body">
          <div style="margin-bottom: var(--spacing-md);">
            <label style="display: block; margin-bottom: var(--spacing-sm); font-weight: 500;">
              ${t('retrospective.itemText')}
            </label>
            <textarea id="item-text" 
              style="width: 100%; min-height: 120px; padding: var(--spacing-md); border: 1px solid var(--border-color); border-radius: var(--radius-md); font-family: inherit; resize: vertical;"
            >${item.text}</textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary cancel-btn">${t('common.cancel')}</button>
          <button class="btn btn-primary save-btn">${t('common.save')}</button>
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
    modal.querySelector('.save-btn').addEventListener('click', async () => {
      const text = document.getElementById('item-text').value.trim();
      if (text) {
        await this.updateItem(index, text, category);
        closeModal();
      }
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  async updateItem(index, text, category) {
    const item = this.items[category][index];
    
    if (this.isP2PMode && this.participantMode) {
      this.participantMode.updateItem(category, item.id, { text, updatedAt: Date.now() });
    } else if (this.isP2PMode && this.hostMode) {
      const peerId = this.hostMode.peerManager?.peerId;
      if (peerId) {
        this.hostMode.handleUpdateItem(peerId, {
          category: category,
          itemId: item.id,
          updates: { text, updatedAt: Date.now() }
        });
      }
    } else {
      item.text = text;
      item.updatedAt = Date.now();
      await this.saveRetro();
    }
    
    this.renderItems();
    // 移除成功通知，避免頻繁顯示
  }

  async deleteItem(index, category) {
    if (confirm(t('common.confirmDelete'))) {
      const item = this.items[category][index];
      
      if (this.isP2PMode && this.participantMode) {
        this.participantMode.deleteItem(category, item.id);
      } else if (this.isP2PMode && this.hostMode) {
        const peerId = this.hostMode.peerManager?.peerId;
        if (peerId) {
          this.hostMode.handleDeleteItem(peerId, {
            category: category,
            itemId: item.id
          });
        }
      } else {
        this.items[category].splice(index, 1);
        await this.saveRetro();
      }
      
      this.renderItems();
      // 移除成功通知，避免頻繁顯示
    }
  }

  showExportModal() {
    const modal = new ExportModal(this.currentRetro, this.items);
    modal.show();
  }

  createNewRetro() {
    return {
      id: this.generateId(),
      meetingId: null,
      title: t('retrospective.title'),
      description: null,
      date: new Date().toISOString().split('T')[0],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      allowAnonymous: false,
      host: { name: 'You' },
      participants: [],
      items: {
        howDoYouFeel: [],
        whatWentWell: [],
        whatDidntGoWell: [],
        whatNeedsChange: [],
        shoutOuts: []
      },
      status: 'collecting'
    };
  }

  async loadRetro(meetingId) {
    const retrospectives = await storage.getRetrospectives();
    return retrospectives.find(r => r.meetingId === meetingId || r.id === meetingId);
  }

  async saveRetro() {
    if (this.currentRetro) {
      this.currentRetro.items = this.items;
      this.currentRetro.updatedAt = Date.now();
      
      const retrospectives = await storage.getRetrospectives();
      const index = retrospectives.findIndex(r => r.id === this.currentRetro.id);
      
      if (index !== -1) {
        retrospectives[index] = this.currentRetro;
      } else {
        retrospectives.push(this.currentRetro);
      }
      
      await storage.saveRetrospectives(retrospectives);
    }
  }

  generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // 更新參與者列表（host 模式）
  updateParticipantsList() {
    if (!this.isP2PMode || !this.hostMode) return;
    
    const participants = this.hostMode.getParticipants();
    const container = document.getElementById('participants-list');
    
    if (!container) return;
    
    const list = new ParticipantList(participants, true, async (peerId) => {
      if (confirm('確定要踢除此參與者嗎？')) {
        await this.hostMode.kickParticipant(peerId);
        this.updateParticipantsList();
      }
    });
    
    container.innerHTML = list.render();
    list.bindEvents(container);
  }

  destroy() {
    // 清理資源
  }
}

