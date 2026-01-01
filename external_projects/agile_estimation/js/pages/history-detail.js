/**
 * History Detail Page
 * 歷史記錄詳細資料頁面
 */

import { i18n } from '../utils/i18n.js';
import { theme } from '../utils/theme.js';
import { getHistory } from '../data/history.js';
import { CARD_SET } from '../components/card.js';
import { router } from '../router.js';

/**
 * 渲染歷史記錄詳細資料頁面
 * @param {Object} params - 路由參數
 */
export function renderHistoryDetail(params = {}) {
  const history = getHistory();
  const record = history.find(r => r.id === params.id);
  
  if (!record) {
    // 如果找不到記錄，導航回歷史列表
    router.navigate('/history');
    return;
  }
  
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <header class="header">
      <div class="container header-content">
        <a href="#/history" class="btn btn-ghost" id="back-btn">
          ← <span data-i18n="common.back">返回</span>
        </a>
        <div class="logo" data-i18n="history.details">詳細資料</div>
        <div class="header-actions">
          <div class="lang-dropdown-container">
            <button class="btn btn-ghost btn-icon" id="lang-toggle" title="切換語言">
              🌐
            </button>
            <div class="lang-dropdown hidden" id="lang-dropdown">
              <button class="lang-option" data-lang="zh-TW">繁體中文</button>
              <button class="lang-option" data-lang="zh-CN">简体中文</button>
              <button class="lang-option" data-lang="en">English</button>
              <button class="lang-option" data-lang="ja">日本語</button>
            </div>
          </div>
          <button class="btn btn-ghost btn-icon" id="theme-toggle" title="切換主題">
            ${theme.isDark() ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
    
    <main class="page history-detail-page">
      <div class="container">
        ${generateDetailsHTML(record)}
      </div>
    </main>
    
    <style>
      .history-detail-page {
        min-height: calc(100vh - 80px);
        padding: var(--spacing-lg) 0;
      }
      
      .details-section {
        margin-bottom: var(--spacing-lg);
        padding: var(--spacing-lg);
        background: var(--color-bg-secondary);
        border-radius: var(--radius-lg);
      }
      
      .details-section-title {
        font-size: var(--font-size-xl);
        font-weight: 600;
        margin-bottom: var(--spacing-lg);
        color: var(--color-text-primary);
        border-bottom: 2px solid var(--color-primary);
        padding-bottom: var(--spacing-sm);
      }
      
      .details-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--spacing-lg);
      }
      
      .details-item {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs);
      }
      
      .details-label {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        font-weight: 500;
      }
      
      .details-value {
        font-size: var(--font-size-base);
        color: var(--color-text-primary);
        word-break: break-word;
      }
      
      .details-results-list {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
      }
      
      .details-result-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-md);
        background: var(--color-bg-primary);
        border-radius: var(--radius-md);
        border: 1px solid var(--color-border);
      }
      
      .details-result-name {
        font-weight: 500;
        color: var(--color-text-primary);
      }
      
      .details-result-value {
        font-family: var(--font-display);
        font-size: var(--font-size-xl);
        font-weight: 700;
        color: var(--color-primary-light);
      }
      
      .details-rounds-list {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
      }
      
      .details-round-item {
        padding: var(--spacing-lg);
        background: var(--color-bg-primary);
        border-radius: var(--radius-md);
        border-left: 4px solid var(--color-primary);
        border: 1px solid var(--color-border);
        border-left: 4px solid var(--color-primary);
      }
      
      .details-round-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--spacing-md);
      }
      
      .details-round-number {
        font-size: var(--font-size-lg);
        font-weight: 600;
        color: var(--color-primary);
      }
      
      .details-round-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-md);
      }
      
      .details-round-stat {
        text-align: center;
        padding: var(--spacing-md);
        background: var(--color-bg-secondary);
        border-radius: var(--radius-md);
      }
      
      .details-round-stat-label {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-xs);
      }
      
      .details-round-stat-value {
        font-family: var(--font-display);
        font-size: var(--font-size-2xl);
        font-weight: 700;
        color: var(--color-primary-light);
      }
      
      @media (max-width: 767px) {
        .details-grid {
          grid-template-columns: 1fr;
        }
        
        .details-round-stats {
          grid-template-columns: 1fr;
        }
      }
    </style>
  `;
  
  // 套用翻譯
  i18n.applyTranslations();
  
  // 設定事件監聽
  setupEventListeners();
}

/**
 * 生成詳細資料 HTML
 * @param {Object} record - 歷史記錄
 * @returns {string} HTML 字串
 */
function generateDetailsHTML(record) {
  let html = '';
  
  // 基本資訊
  html += `
    <div class="details-section">
      <div class="details-section-title" data-i18n="history.basicInfo">基本資訊</div>
      <div class="details-grid">
        <div class="details-item">
          <div class="details-label" data-i18n="history.mode">模式</div>
          <div class="details-value">${getModeText(record.mode)}</div>
        </div>
        <div class="details-item">
          <div class="details-label" data-i18n="history.time">時間</div>
          <div class="details-value">${new Date(record.timestamp).toLocaleString('zh-TW')}</div>
        </div>
        ${record.meetingName ? `
          <div class="details-item" style="grid-column: 1 / -1;">
            <div class="details-label">會議名稱</div>
            <div class="details-value">${escapeHtml(record.meetingName)}</div>
          </div>
        ` : ''}
        ${record.meetingId ? `
          <div class="details-item">
            <div class="details-label" data-i18n="history.meetingId">會議 ID</div>
            <div class="details-value">${escapeHtml(record.meetingId)}</div>
          </div>
        ` : ''}
        ${record.participants ? `
          <div class="details-item">
            <div class="details-label" data-i18n="history.participants">參與者數量</div>
            <div class="details-value">${record.participants}</div>
          </div>
        ` : ''}
        ${record.startedAt ? `
          <div class="details-item">
            <div class="details-label">開始時間</div>
            <div class="details-value">${new Date(record.startedAt).toLocaleString('zh-TW')}</div>
          </div>
        ` : ''}
        ${record.completedAt ? `
          <div class="details-item">
            <div class="details-label">結束時間</div>
            <div class="details-value">${new Date(record.completedAt).toLocaleString('zh-TW')}</div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
  
  // 會議記錄：多個 Issue
  if (record.issues && Array.isArray(record.issues) && record.issues.length > 0) {
    html += `
      <div class="details-section">
        <div class="details-section-title">會議 Issue (${record.issues.length})</div>
        ${record.issues.map((issue, issueIndex) => {
          return generateIssueDetailsHTML(issue, issueIndex);
        }).join('')}
      </div>
    `;
    return html;
  }
  
  // Solo/Client 模式：單一估點值
  if (record.value) {
    const card = CARD_SET.find(c => c.value === record.value);
    html += `
      <div class="details-section">
        <div class="details-section-title" data-i18n="history.estimationValue">估點值</div>
        <div class="details-value" style="font-size: var(--font-size-3xl); text-align: center; padding: var(--spacing-xl); font-family: var(--font-display); color: var(--color-primary-light);">
          ${card ? card.label : record.value}
        </div>
      </div>
    `;
  }
  
  return html;
}

/**
 * 生成單個 Issue 的詳細資料 HTML
 * @param {Object} issue - Issue 資料
 * @param {number} issueIndex - Issue 索引
 * @returns {string} HTML 字串
 */
function generateIssueDetailsHTML(issue, issueIndex) {
  const isCompleted = issue.finalDecision !== null && issue.finalDecision !== undefined;
  const statusText = isCompleted ? '已完成' : '未完成';
  const statusColor = isCompleted ? 'var(--color-success)' : 'var(--color-warning)';
  
  let html = `
    <div class="details-issue-item" style="margin-bottom: var(--spacing-xl); padding: var(--spacing-lg); background: var(--color-bg-primary); border-radius: var(--radius-md); border: 2px solid var(--color-primary);">
      <div class="details-issue-header" style="margin-bottom: var(--spacing-md); padding-bottom: var(--spacing-sm); border-bottom: 2px solid var(--color-border);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-xs);">
          <h3 style="margin: 0; color: var(--color-text-primary);">
            Issue ${issueIndex + 1}: ${escapeHtml(issue.issueTitle || '未命名 Issue')}
          </h3>
          <span style="padding: var(--spacing-xs) var(--spacing-sm); background: ${statusColor}; color: white; border-radius: var(--radius-sm); font-size: var(--font-size-sm); font-weight: 600;">
            ${statusText}
          </span>
        </div>
        ${issue.issueDescription ? `
          <p style="margin: var(--spacing-sm) 0 0 0; color: var(--color-text-secondary);">
            ${escapeHtml(issue.issueDescription)}
          </p>
        ` : ''}
      </div>
  `;
  
  // Issue 的輪次（如果有）
  if (issue.rounds && Array.isArray(issue.rounds) && issue.rounds.length > 0) {
    // 提取所有參與者名稱
    const allParticipants = new Set();
    issue.rounds.forEach(round => {
      if (round.results && Array.isArray(round.results)) {
        round.results.forEach(r => {
          if (r.name) {
            allParticipants.add(r.name);
          }
        });
      }
    });
    const participantList = Array.from(allParticipants).sort();
    
    html += `
      <div class="details-rounds-list">
        ${issue.rounds.map((round, roundIndex) => {
          const numericResults = round.results
            ? round.results
                .filter(r => r.card && !isNaN(parseFloat(r.card)))
                .map(r => parseFloat(r.card))
            : [];
          
          let average = '-';
          let highest = '-';
          let lowest = '-';
          
          if (numericResults.length > 0) {
            average = (numericResults.reduce((a, b) => a + b, 0) / numericResults.length).toFixed(1);
            highest = Math.max(...numericResults);
            lowest = Math.min(...numericResults);
          }
          
          const roundResultsMap = new Map();
          if (round.results && Array.isArray(round.results)) {
            round.results.forEach(r => {
              roundResultsMap.set(r.name, r.card);
            });
          }
          
          return `
            <div class="details-round-item">
              <div class="details-round-header">
                <span class="details-round-number">${i18n.t('host.roundNumber')} ${round.roundNumber || roundIndex + 1}</span>
              </div>
              <div class="details-round-stats">
                <div class="details-round-stat">
                  <div class="details-round-stat-label" data-i18n="host.stats.average">平均</div>
                  <div class="details-round-stat-value">${average}</div>
                </div>
                <div class="details-round-stat">
                  <div class="details-round-stat-label" data-i18n="host.stats.highest">最高</div>
                  <div class="details-round-stat-value">${highest}</div>
                </div>
                <div class="details-round-stat">
                  <div class="details-round-stat-label" data-i18n="host.stats.lowest">最低</div>
                  <div class="details-round-stat-value">${lowest}</div>
                </div>
              </div>
              <div class="details-results-list" style="margin-top: var(--spacing-md);">
                ${participantList.map(name => {
                  const cardValue = roundResultsMap.get(name);
                  const card = cardValue ? CARD_SET.find(c => c.value === cardValue) : null;
                  return `
                    <div class="details-result-item">
                      <span class="details-result-name">${escapeHtml(name)}</span>
                      <span class="details-result-value">${card ? card.label : (cardValue || '-')}</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  } else {
    // 沒有輪次（issue 尚未開始估點）
    html += `
      <div style="padding: var(--spacing-lg); text-align: center; color: var(--color-text-secondary);">
        <p>此 Issue 尚未開始估點</p>
      </div>
    `;
  }
  
  // 最終決定
  if (issue.finalDecision !== null && issue.finalDecision !== undefined) {
    const card = CARD_SET.find(c => c.value === issue.finalDecision);
    html += `
      <div style="margin-top: var(--spacing-md); padding: var(--spacing-md); background: var(--color-primary-light); border-radius: var(--radius-md);">
        <div style="font-weight: 600; margin-bottom: var(--spacing-xs); color: var(--color-text-primary);" data-i18n="host.finalDecision">最終決定</div>
        <div style="font-size: var(--font-size-xl); font-weight: 700; font-family: var(--font-display); color: var(--color-primary);">
          ${card ? card.label : issue.finalDecision}
        </div>
      </div>
    `;
  }
  
  if (issue.completedAt) {
    html += `
      <div style="margin-top: var(--spacing-sm); font-size: var(--font-size-sm); color: var(--color-text-secondary);">
        完成時間: ${new Date(issue.completedAt).toLocaleString('zh-TW')}
      </div>
    `;
  }
  
  html += `</div>`;
  return html;
}

/**
 * HTML 跳脫
 */
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * 取得模式文字
 */
function getModeText(mode) {
  const modeMap = {
    solo: '🎴 ' + i18n.t('history.solo'),
    host: '🏠 ' + i18n.t('history.host'),
    client: '👤 ' + i18n.t('history.client')
  };
  return modeMap[mode] || mode;
}

/**
 * 設定事件監聽
 */
function setupEventListeners() {
  // 主題切換
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const newTheme = theme.toggle();
      themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
  }
  
  // 語言切換 Dropdown
  const langToggle = document.getElementById('lang-toggle');
  const langDropdown = document.getElementById('lang-dropdown');
  
  if (langToggle && langDropdown) {
    langToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('hidden');
      updateLangDropdownSelection();
    });
    
    langDropdown.querySelectorAll('.lang-option').forEach(option => {
      option.addEventListener('click', async (e) => {
        e.stopPropagation();
        const lang = option.dataset.lang;
        await i18n.setLanguage(lang);
        langDropdown.classList.add('hidden');
        // 重新渲染頁面以更新語言
        const currentHash = window.location.hash;
        const match = currentHash.match(/#\/history\/(.+)/);
        if (match) {
          router.navigate(`/history/${match[1]}`);
        }
      });
    });
    
    document.addEventListener('click', (e) => {
      if (!langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
        langDropdown.classList.add('hidden');
      }
    });
  }
  
  function updateLangDropdownSelection() {
    const currentLang = i18n.getLanguage();
    if (langDropdown) {
      langDropdown.querySelectorAll('.lang-option').forEach(option => {
        if (option.dataset.lang === currentLang) {
          option.classList.add('active');
        } else {
          option.classList.remove('active');
        }
      });
    }
  }
}


