/**
 * Host Mode Page
 * 主持人模式 - 建立會議室、管理參與者、控制估點流程
 */

import { i18n } from '../utils/i18n.js';
import { theme } from '../utils/theme.js';
import { storage } from '../utils/storage/index.js';
import { HostManager, ConnectionState, EstimationState } from '../webrtc/peer-manager.js';
import { copyJoinUrl, copyMeetingId, generateJoinUrl } from '../utils/clipboard.js';
import { generateMeetingQRCode } from '../utils/qrcode.js';
import { showToast, toastSuccess, toastError, toastWarning } from '../components/toast.js';
import { addHistory, getHistory } from '../data/history.js';
import { 
  CARD_SET, 
  createSelectableCardHTML, 
  initCardTiltEffect,
  setupCardSelection 
} from '../components/card.js';

// 模組狀態
let hostManager = null;
let currentResults = null;
let hostName = 'Host';
let meetingName = ''; // 會議名稱
let hostParticipates = true; // Host 是否參與估點
let hostSelectedCard = null; // Host 選擇的卡片
let issues = []; // 所有 Issue 列表 [{ id, title, description, status, rounds: [] }]
let currentIssue = null; // 當前選中的 Issue { id, title, description, status, rounds: [] }
let currentRound = 1; // 當前輪次
let finalDecision = null; // Host 的最終決定

/**
 * 渲染 Host 模式頁面
 */
export function renderHost() {
  hostManager = new HostManager();
  currentResults = null;
  
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <header class="header">
      <div class="container header-content">
        <a href="#/" class="btn btn-ghost" id="back-btn">
          ← <span data-i18n="common.back">返回</span>
        </a>
        <div class="logo" id="page-title" data-i18n="host.title">建立房間</div>
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
    
    <main class="page host-page">
      <div class="container">
        <!-- 設定表單階段 -->
        <div id="setup-phase" class="phase-container">
          <div class="setup-card">
            <h2 data-i18n="host.title">建立房間</h2>
            
            <div class="form-group">
              <label for="host-name-input" data-i18n="host.hostName">主持人名稱</label>
              <input 
                type="text" 
                id="host-name-input" 
                class="form-input" 
                placeholder="輸入主持人名稱"
                data-i18n-placeholder="host.hostNamePlaceholder"
                maxlength="30"
                autocomplete="off"
              >
            </div>
            
            <div class="form-group">
              <label for="meeting-name-input" data-i18n="host.meetingName">會議名稱</label>
              <input 
                type="text" 
                id="meeting-name-input" 
                class="form-input" 
                placeholder="輸入會議名稱（選填）"
                data-i18n-placeholder="host.meetingNamePlaceholder"
                maxlength="50"
                autocomplete="off"
              >
              <p class="form-hint" data-i18n="host.meetingNameHint">留空將使用會議 ID 作為預設名稱，後續仍可修改</p>
            </div>
            
            <div class="form-group">
              <label class="checkbox-label">
                <input 
                  type="checkbox" 
                  id="participate-checkbox"
                  checked
                >
                <span data-i18n="host.participateInEstimation">參與估點</span>
              </label>
              <p class="form-hint" data-i18n="host.participateInEstimationDesc">主持人是否參與估點（選擇牌）</p>
            </div>
            
            <button class="btn btn-primary btn-lg btn-block" id="create-meeting-btn">
              <span data-i18n="host.createMeeting">建立會議室</span>
            </button>
          </div>
        </div>
        
        <!-- 建立中狀態 -->
        <div id="creating-phase" class="phase-container hidden">
          <div class="loading-container">
            <div class="loading-spinner large"></div>
            <p class="text-secondary" data-i18n="host.creating">建立會議室中...</p>
          </div>
        </div>
        
        <!-- 會議室已建立狀態 -->
        <div id="meeting-phase" class="phase-container hidden">
          <!-- 會議資訊區 -->
          <div class="meeting-info-section">
            <div class="meeting-info-card">
              <div id="meeting-name-display" class="meeting-name-display">
                <div style="display: flex; align-items: center; justify-content: center; gap: var(--spacing-sm);">
                  <span class="meeting-name-value" id="meeting-name">-</span>
                  <button class="btn btn-ghost btn-sm" id="rename-meeting-btn" title="重新命名會議">
                    ✏️
                  </button>
                </div>
              </div>
              <div class="meeting-id-display">
                <span class="meeting-id-label" data-i18n="host.meetingId">會議 ID</span>
                <span class="meeting-id-value" id="meeting-id">------</span>
              </div>
              
              <div class="meeting-actions">
                <button class="btn btn-secondary" id="copy-link-btn">
                  📋 <span data-i18n="host.copyLink">複製連結</span>
                </button>
                <button class="btn btn-ghost" id="copy-id-btn">
                  <span data-i18n="host.copyId">複製 ID</span>
                </button>
              </div>
              
              <div class="qr-section">
                <p class="qr-label" data-i18n="host.qrCode">掃描 QR Code 加入</p>
                <div class="qr-container" id="qr-container">
                  <!-- QR Code 會在這裡生成 -->
                </div>
              </div>
            </div>
          </div>
          
          <!-- Issue 管理區 -->
          <div class="issue-section">
            <div class="section-header">
              <h3>
                <span data-i18n="host.issues">Issue 管理</span>
              </h3>
              <button class="btn btn-secondary btn-sm" id="create-issue-btn">
                <span data-i18n="host.createIssue">建立 Issue</span>
              </button>
            </div>
            
            <!-- Issue 列表 -->
            <div id="issues-list" class="issues-list">
              <div class="empty-state" id="no-issues">
                <p data-i18n="host.noIssues">尚未建立任何 Issue</p>
              </div>
            </div>
            
          </div>
          
          <!-- 參與者區 -->
          <div class="participants-section">
            <div class="section-header">
              <h3>
                <span data-i18n="host.participants">參與者</span>
                (<span id="participant-count">0</span>/15<span data-i18n="host.participantCount">人</span>)
              </h3>
            </div>
            
            <div class="participants-list" id="participants-list">
              <div class="empty-state" id="no-participants">
                <p data-i18n="host.waitingForParticipants">等待參與者加入...</p>
              </div>
            </div>
          </div>
          
          <!-- 控制面板 -->
          <div class="control-section">
            <!-- Host 選擇卡片區域（如果 Host 參與估點） -->
            <div id="host-card-selection" class="host-card-selection hidden">
              <div class="host-selection-header">
                <h4>${hostName} <span data-i18n="join.selectCard">請選擇一張牌</span></h4>
              </div>
              <div class="host-cards-container" id="host-cards-container">
                <!-- Host 選擇卡片會在這裡動態生成 -->
              </div>
            </div>
            
            <div class="control-buttons" id="control-buttons">
              <button class="btn btn-primary btn-lg" id="start-btn" disabled>
                <span data-i18n="host.startEstimation">開始估點</span>
              </button>
              <button class="btn btn-primary btn-lg hidden" id="flip-btn">
                <span data-i18n="host.flipCards">翻牌</span>
              </button>
              <button class="btn btn-secondary btn-lg hidden" id="new-round-btn">
                <span data-i18n="host.newRound">新的一輪</span>
              </button>
            </div>
          </div>
          
          <!-- 結果區 -->
          <div class="results-section hidden" id="results-section">
            <!-- 單人模式：卡片翻牌顯示 -->
            <div id="solo-reveal-container" class="solo-reveal-container hidden">
              <div class="reveal-card-wrapper" id="host-reveal-card-wrapper">
                <!-- 卡片會在這裡顯示 -->
              </div>
            </div>
            
            <!-- 多人模式：統計結果顯示 -->
            <div id="multi-results-container" class="multi-results-container hidden">
              <div class="section-header">
                <h3 data-i18n="host.stats.title">估點結果</h3>
              </div>
              
              <div class="results-stats" id="results-stats">
                <!-- 統計資訊會在這裡顯示 -->
              </div>
              
              <div class="results-cards" id="results-cards">
                <!-- 結果卡片會在這裡顯示 -->
              </div>
              
              <!-- 統計圖表 -->
              <div id="chart-container" class="chart-container hidden">
                <canvas id="results-chart"></canvas>
              </div>
              
              <!-- 極端值分析 -->
              <div id="extreme-values-section" class="extreme-values-section hidden">
                <h4 data-i18n="host.extremeValues">極端值</h4>
                <div id="extreme-values-display"></div>
              </div>
              
              <!-- Host 最終決定 -->
              <div id="final-decision-section" class="final-decision-section hidden">
                <h4 data-i18n="host.finalDecision">最終決定</h4>
                <div id="final-decision-options"></div>
              </div>
            </div>
          </div>
          
          <!-- 結束會議按鈕 -->
          <div class="close-meeting-section">
            <button class="btn btn-danger" id="close-meeting-btn">
              <span data-i18n="host.closeMeeting">結束會議</span>
            </button>
          </div>
        </div>
      </div>
    </main>
    
    <style>
      .host-page {
        min-height: calc(100vh - 80px);
        padding: var(--spacing-lg) 0;
      }
      
      .phase-container {
        max-width: 800px;
        margin: 0 auto;
      }
      
      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 300px;
        gap: var(--spacing-lg);
      }
      
      .loading-spinner.large {
        width: 60px;
        height: 60px;
      }
      
      /* 設定表單 */
      .setup-card {
        background: var(--color-bg-card);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: var(--spacing-xl);
        max-width: 500px;
        margin: 0 auto;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }
      
      .setup-card h2 {
        margin-bottom: var(--spacing-lg);
        text-align: center;
      }
      
      .setup-card .btn-block {
        width: 100%;
        display: block;
      }
      
      .setup-card .btn {
        text-align: center;
      }
      
      .form-group {
        margin-bottom: var(--spacing-lg);
      }
      
      .form-group label {
        display: block;
        margin-bottom: var(--spacing-xs);
        font-weight: 500;
        color: var(--color-text-primary);
      }
      
      .form-input {
        width: 100%;
        padding: var(--spacing-sm) var(--spacing-md);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: var(--color-bg-primary);
        color: var(--color-text-primary);
        font-size: var(--font-size-base);
      }
      
      .form-input:focus {
        outline: none;
        border-color: var(--color-primary);
      }
      
      .checkbox-label {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        cursor: pointer;
      }
      
      .checkbox-label input[type="checkbox"] {
        width: 18px;
        height: 18px;
        cursor: pointer;
      }
      
      .form-hint {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        margin-top: var(--spacing-xs);
      }
      
      /* Host 選擇卡片區域 */
      .host-card-selection {
        margin-bottom: var(--spacing-lg);
        padding: var(--spacing-lg);
        background: var(--color-bg-card);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }
      
      .host-selection-header {
        margin-bottom: var(--spacing-md);
      }
      
      .host-selection-header h4 {
        font-size: var(--font-size-lg);
        font-weight: 600;
        color: var(--color-text-primary);
      }
      
      .host-cards-container {
        margin-top: var(--spacing-md);
        padding: 0 var(--spacing-md);
      }
      
      /* 會議資訊區 */
      .meeting-info-section {
        margin-bottom: var(--spacing-xl);
      }
      
      .meeting-info-card {
        background: var(--color-bg-card);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: var(--spacing-xl);
        text-align: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }
      
      .meeting-name-display {
        margin-bottom: var(--spacing-md);
        padding-bottom: var(--spacing-md);
        border-bottom: 1px solid var(--color-border);
      }
      
      .meeting-name-value {
        display: block;
        font-size: var(--font-size-xl);
        font-weight: 600;
        color: var(--color-text-primary);
      }
      
      .meeting-id-display {
        margin-bottom: var(--spacing-lg);
      }
      
      .meeting-id-label {
        display: block;
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-xs);
      }
      
      .meeting-id-value {
        display: block;
        font-family: var(--font-display);
        font-size: 2.5rem;
        font-weight: 700;
        letter-spacing: 0.2em;
        color: var(--color-primary-light);
      }
      
      .meeting-actions {
        display: flex;
        gap: var(--spacing-md);
        justify-content: center;
        margin-bottom: var(--spacing-lg);
      }
      
      .qr-section {
        padding-top: var(--spacing-lg);
        border-top: 1px solid var(--color-border);
      }
      
      .qr-label {
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-md);
      }
      
      .qr-container {
        display: flex;
        justify-content: center;
        min-height: 200px;
        align-items: center;
        padding: var(--spacing-md);
        background: white;
        border-radius: var(--radius-md);
        width: fit-content;
        margin: 0 auto;
      }
      
      /* Dark mode 下確保白色背景可見 */
      [data-theme="dark"] .qr-container {
        background: white;
      }
      
      /* Issue 管理區 */
      .issue-section {
        margin-bottom: var(--spacing-xl);
        background: var(--color-bg-card);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: var(--spacing-lg);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }
      
      .issue-section .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--spacing-md);
      }
      
      .issue-title-display {
        color: var(--color-primary);
        font-weight: 600;
        margin-left: var(--spacing-sm);
      }
      
      .issue-info {
        padding-top: var(--spacing-md);
        border-top: 1px solid var(--color-border);
      }
      
      .issue-description {
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-sm);
      }
      
      .issue-round-info {
        font-size: var(--font-size-sm);
        color: var(--color-text-muted);
      }
      
      /* Issue 列表 */
      .issues-list {
        margin-bottom: var(--spacing-lg);
      }
      
      .issue-item {
        background: var(--color-bg-primary);
        border: 2px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: var(--spacing-md);
        margin-bottom: var(--spacing-sm);
        cursor: pointer;
        transition: all var(--transition-base);
      }
      
      .issue-item:not(.selected):hover {
        border-color: var(--color-primary);
        background: var(--color-bg-secondary);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
      }
      
      .issue-item.selected {
        border-color: var(--color-success);
        background: rgba(34, 197, 94, 0.15);
        color: var(--color-text-primary);
        box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
        cursor: default;
      }
      
      .issue-item.selected .issue-item-title {
        color: var(--color-success);
        font-weight: 600;
      }
      
      .issue-item.selected:hover {
        transform: none;
        box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
        opacity: 0.95;
      }
      
      .issue-item.selected .select-issue-btn {
        opacity: 0.6;
        cursor: not-allowed;
        pointer-events: none;
      }
      
      .issue-item-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--spacing-xs);
      }
      
      .issue-title-wrapper {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        flex: 1;
      }
      
      .issue-item-title {
        font-size: var(--font-size-lg);
        font-weight: 600;
        color: var(--color-text-primary);
        margin: 0;
      }
      
      .rename-issue-btn {
        opacity: 0;
        transition: opacity var(--transition-base);
        padding: var(--spacing-xs);
        min-width: auto;
        width: auto;
        height: auto;
      }
      
      .issue-item:hover .rename-issue-btn {
        opacity: 1;
      }
      
      .issue-item.selected .rename-issue-btn {
        opacity: 0.6;
      }
      
      .issue-status-badge {
        padding: var(--spacing-xs) var(--spacing-sm);
        border-radius: var(--radius-sm);
        font-size: var(--font-size-xs);
        font-weight: 600;
      }
      
      .issue-status-badge.not-started {
        background: var(--color-bg-tertiary);
        color: var(--color-text-secondary);
      }
      
      .issue-status-badge.in-progress {
        background: var(--color-warning);
        color: white;
      }
      
      .issue-status-badge.completed {
        background: var(--color-success);
        color: white;
      }
      
      .issue-item-description {
        color: var(--color-text-secondary);
        font-size: var(--font-size-sm);
        margin: var(--spacing-xs) 0;
      }
      
      .issue-item-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: var(--spacing-sm);
      }
      
      .issue-item-rounds {
        font-size: var(--font-size-sm);
        color: var(--color-text-muted);
      }
      
      .issue-item-result {
        margin-top: var(--spacing-sm);
        padding-top: var(--spacing-sm);
        border-top: 1px solid var(--color-border);
      }
      
      .result-stats-mini {
        display: flex;
        gap: var(--spacing-md);
        flex-wrap: wrap;
        margin-bottom: var(--spacing-xs);
      }
      
      .stat-mini {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        font-size: var(--font-size-sm);
      }
      
      .stat-label-mini {
        color: var(--color-text-secondary);
        font-weight: 500;
      }
      
      .stat-value-mini {
        color: var(--color-primary);
        font-weight: 600;
        font-family: var(--font-display);
      }
      
      .final-decision-mini {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        margin-top: var(--spacing-xs);
        padding: var(--spacing-xs) var(--spacing-sm);
        background: var(--color-primary-light);
        border-radius: var(--radius-sm);
        font-size: var(--font-size-sm);
      }
      
      .final-decision-label {
        color: var(--color-text-secondary);
        font-weight: 500;
      }
      
      .final-decision-value {
        color: var(--color-primary);
        font-weight: 700;
        font-family: var(--font-display);
        font-size: var(--font-size-base);
      }
      
      
      /* 參與者區 */
      .participants-section {
        margin-bottom: var(--spacing-xl);
      }
      
      .section-header {
        margin-bottom: var(--spacing-md);
      }
      
      .section-header h3 {
        font-size: var(--font-size-lg);
        font-weight: 600;
      }
      
      .participants-list {
        background: var(--color-bg-card);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: var(--spacing-md);
        min-height: 100px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }
      
      .empty-state {
        text-align: center;
        padding: var(--spacing-xl);
        color: var(--color-text-muted);
      }
      
      .participant-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--spacing-md);
        background: var(--color-bg-primary);
        border-radius: var(--radius-md);
        margin-bottom: var(--spacing-sm);
      }
      
      .participant-item:last-child {
        margin-bottom: 0;
      }
      
      .participant-info {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
      }
      
      .participant-name {
        font-weight: 500;
      }
      
      .participant-status {
        font-size: var(--font-size-sm);
        padding: var(--spacing-xs) var(--spacing-sm);
        border-radius: var(--radius-sm);
        background: var(--color-bg-tertiary);
      }
      
      .participant-status.selected {
        background: var(--color-success);
        color: white;
      }
      
      .participant-status.selecting {
        background: var(--color-warning);
        color: white;
      }
      
      .participant-card {
        font-family: var(--font-display);
        font-size: var(--font-size-xl);
        font-weight: 700;
        color: var(--color-primary-light);
        min-width: 50px;
        text-align: center;
      }
      
      .participant-card.hidden-card {
        color: var(--color-text-muted);
      }
      
      .participant-actions {
        display: flex;
        gap: var(--spacing-xs);
      }
      
      .participant-actions .btn {
        padding: var(--spacing-xs) var(--spacing-sm);
        font-size: var(--font-size-sm);
      }
      
      /* 控制面板 */
      .control-section {
        margin-bottom: var(--spacing-xl);
      }
      
      .control-buttons {
        display: flex;
        gap: var(--spacing-md);
        justify-content: center;
        flex-wrap: wrap;
      }
      
      /* 結果區 */
      .results-section {
        margin-bottom: var(--spacing-xl);
      }
      
      .results-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-lg);
      }
      
      .stat-card {
        background: var(--color-bg-card);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: var(--spacing-md);
        text-align: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      }
      
      .stat-label {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-xs);
      }
      
      .stat-value {
        font-family: var(--font-display);
        font-size: var(--font-size-2xl);
        font-weight: 700;
        color: var(--color-primary-light);
      }
      
      .results-cards {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-md);
        justify-content: center;
      }
      
      /* 單人模式卡片翻牌顯示 */
      .solo-reveal-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: var(--spacing-xl);
        min-height: 400px;
      }
      
      .reveal-card-wrapper {
        width: 180px;
        height: 252px;
        margin: var(--spacing-xl) 0;
        perspective: 1000px;
      }
      
      .reveal-card {
        width: 100%;
        height: 100%;
        position: relative;
        transform-style: preserve-3d;
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .reveal-card.flipped {
        transform: rotateY(180deg);
      }
      
      .reveal-card .card-face {
        position: absolute;
        inset: 0;
        backface-visibility: hidden;
        border-radius: var(--card-border-radius);
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--card-bg);
        border: var(--card-border);
        box-shadow: var(--card-shadow-hover);
        overflow: hidden;
      }
      
      .reveal-card .card-front {
        transform: rotateY(180deg);
      }
      
      .reveal-card .card-back {
        transform: rotateY(0deg);
      }
      
      .reveal-card .card-value {
        font-family: var(--font-display);
        font-size: 3.5rem;
        font-weight: 700;
        color: var(--color-text-primary);
      }
      
      .reveal-card .card-front .card-value {
        background: linear-gradient(135deg, var(--color-primary-light), var(--color-accent));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .reveal-card .card-holo {
        position: absolute;
        inset: 0;
        border-radius: var(--card-border-radius);
        background: conic-gradient(
          from 0deg,
          var(--holo-color-1),
          var(--holo-color-2),
          var(--holo-color-3),
          var(--holo-color-4),
          var(--holo-color-5),
          var(--holo-color-6),
          var(--holo-color-1)
        );
        opacity: 0.2;
        mix-blend-mode: color-dodge;
        animation: holoRotate 4s linear infinite;
      }
      
      /* Card back pattern */
      .reveal-card .card-back {
        background: 
          repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(99, 102, 241, 0.1) 10px,
            rgba(99, 102, 241, 0.1) 20px
          ),
          var(--card-bg);
      }
      
      .reveal-card .card-back .card-value {
        opacity: 0.6;
      }
      
      .solo-no-card {
        text-align: center;
        padding: var(--spacing-xl);
        color: var(--color-text-secondary);
      }
      
      @media (max-width: 767px) {
        .reveal-card-wrapper {
          width: 150px;
          height: 210px;
        }
        
        .reveal-card .card-value {
          font-size: 2.5rem;
        }
      }
      
      .result-card-item {
        background: var(--color-bg-card);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: var(--spacing-md);
        text-align: center;
        min-width: 100px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      }
      
      .result-card-name {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-xs);
      }
      
      .result-card-value {
        font-family: var(--font-display);
        font-size: var(--font-size-xl);
        font-weight: 700;
        color: var(--color-primary-light);
      }
      
      .result-card-value.no-select {
        color: var(--color-text-muted);
      }
      
      .btn.warning {
        background: var(--color-warning);
        border-color: var(--color-warning);
      }
      
      .btn.warning:hover:not(:disabled) {
        background: var(--color-warning);
        opacity: 0.9;
      }
      
      .result-card-item.extreme-highest {
        border: 2px solid var(--color-error);
        background: rgba(239, 68, 68, 0.1);
      }
      
      .result-card-item.extreme-lowest {
        border: 2px solid var(--color-primary);
        background: rgba(99, 102, 241, 0.1);
      }
      
      /* 極端值分析 */
      .extreme-values-section {
        margin-top: var(--spacing-lg);
        padding: var(--spacing-lg);
        background: var(--color-bg-card);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }
      
      .extreme-values-section h4 {
        margin-bottom: var(--spacing-md);
        color: var(--color-text-primary);
      }
      
      .extreme-group {
        margin-bottom: var(--spacing-md);
      }
      
      .extreme-label {
        display: block;
        font-weight: 600;
        margin-bottom: var(--spacing-xs);
        color: var(--color-text-primary);
      }
      
      .extreme-participants {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-sm);
      }
      
      .extreme-participant {
        padding: var(--spacing-xs) var(--spacing-sm);
        background: var(--color-bg-tertiary);
        border-radius: var(--radius-sm);
        font-size: var(--font-size-sm);
      }
      
      /* Host 最終決定 */
      .final-decision-section {
        margin-top: var(--spacing-lg);
        padding: var(--spacing-lg);
        background: var(--color-bg-card);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }
      
      .final-decision-section h4 {
        margin-bottom: var(--spacing-sm);
        color: var(--color-text-primary);
      }
      
      .final-decision-desc {
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-md);
        font-size: var(--font-size-sm);
      }
      
      .final-decision-options {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-sm);
        margin-bottom: var(--spacing-md);
      }
      
      .final-value-btn {
        min-width: 60px;
      }
      
      .custom-value-input-container {
        display: flex;
        gap: var(--spacing-sm);
        margin-top: var(--spacing-md);
      }
      
      .custom-value-input-container .form-input {
        flex: 1;
      }
      
      .final-decision-display {
        margin-top: var(--spacing-md);
        padding: var(--spacing-md);
        background: var(--color-bg-primary);
        border-radius: var(--radius-md);
        color: var(--color-text-primary);
      }
      
      .final-decision-display strong {
        color: var(--color-primary);
      }
      
      #final-decision-value {
        font-size: var(--font-size-lg);
        font-weight: 600;
        color: var(--color-primary);
      }
      
      /* Modal 樣式 */
      .modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--spacing-md);
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all var(--transition-base);
      }
      
      .modal-backdrop.active {
        opacity: 1;
        visibility: visible;
      }
      
      .modal {
        background: var(--color-bg-card);
        border-radius: var(--radius-lg);
        max-width: 500px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      }
      
      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-lg);
        border-bottom: 1px solid var(--color-border);
      }
      
      .modal-header h3 {
        margin: 0;
        font-size: var(--font-size-xl);
        font-weight: 600;
        color: var(--color-text-primary);
      }
      
      .modal-header .btn-ghost.btn-icon {
        width: 32px;
        height: 32px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font-size-xl);
        line-height: 1;
      }
      
      .modal-body {
        padding: var(--spacing-lg);
      }
      
      .modal-body p {
        margin: 0;
        color: var(--color-text-primary);
        line-height: 1.6;
      }
      
      .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: var(--spacing-md);
        padding: var(--spacing-lg);
        border-top: 1px solid var(--color-border);
      }
      
      .modal-footer .btn {
        min-width: 80px;
      }
      
      textarea.form-input {
        resize: vertical;
        min-height: 80px;
      }
      
      /* 統計圖表 */
      .chart-container {
        margin-top: var(--spacing-lg);
        padding: var(--spacing-lg);
        background: var(--color-bg-card);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        height: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }
      
      #results-chart {
        max-height: 300px;
      }
      
      /* 結束會議 */
      .close-meeting-section {
        text-align: center;
        padding-top: var(--spacing-xl);
        border-top: 1px solid var(--color-border);
      }
      
      .btn-danger {
        background: var(--color-error);
        border-color: var(--color-error);
        color: white;
      }
      
      .btn-danger:hover:not(:disabled) {
        background: var(--color-error);
        color: white;
        opacity: 0.9;
      }
      
      @media (max-width: 767px) {
        .meeting-id-value {
          font-size: 2rem;
        }
        
        .meeting-actions {
          flex-direction: column;
        }
        
        .control-buttons {
          flex-direction: column;
        }
        
        .control-buttons .btn {
          width: 100%;
        }
        
        .results-stats {
          grid-template-columns: 1fr;
        }
      }
    </style>
  `;

  // 套用翻譯
  i18n.applyTranslations();
  
  // 載入上次使用的 Host 名稱
  loadHostName();
  
  // 初始化 Issue 列表
  updateIssuesList();
  
  // 檢查是否有恢復會議的資料
  const restoreDataStr = sessionStorage.getItem('restoreMeetingData');
  if (restoreDataStr) {
    try {
      const restoreData = JSON.parse(restoreDataStr);
      sessionStorage.removeItem('restoreMeetingData'); // 清除，避免重複使用
      
      // 自動恢復會議
      restoreMeeting(restoreData);
      return cleanup;
    } catch (err) {
      console.error('Failed to restore meeting:', err);
      // 如果恢復失敗，繼續正常流程
    }
  }
  
  // 設定事件監聽
  setupEventListeners();
  
  // 返回清理函數
  return () => {
    if (hostManager) {
      hostManager.closeMeeting();
      hostManager = null;
    }
    currentResults = null;
  };
}

/**
 * 載入上次使用的 Host 名稱
 */
function loadHostName() {
  const settings = storage.get('settings', {});
  const lastHostName = settings.lastHostName || '';
  const hostNameInput = document.getElementById('host-name-input');
  if (hostNameInput && lastHostName) {
    hostNameInput.value = lastHostName;
  }
}

/**
 * 設定事件監聽
 */
function setupEventListeners() {
  // 建立會議室按鈕
  document.getElementById('create-meeting-btn')?.addEventListener('click', () => {
    const hostNameInput = document.getElementById('host-name-input');
    const hostName = hostNameInput?.value.trim() || 'Host';
    
    // 儲存 Host 名稱
    const settings = storage.get('settings', {});
    settings.lastHostName = hostName;
    storage.set('settings', settings);
    
    // 隱藏設定表單，顯示建立中狀態
    document.getElementById('setup-phase').classList.add('hidden');
    document.getElementById('creating-phase').classList.remove('hidden');
    
    // 開始建立會議室
    createMeeting(hostName);
  });
  
  // 主題切換
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const newTheme = theme.toggle();
      themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
      
      // 更新 QR Code 主題
      const meetingId = document.getElementById('meeting-id').textContent;
      if (meetingId && meetingId !== '------') {
        const qrContainer = document.getElementById('qr-container');
        generateMeetingQRCode(qrContainer, meetingId);
      }
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
    langDropdown.querySelectorAll('.lang-option').forEach(option => {
      if (option.dataset.lang === currentLang) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });
  }
  
  // 複製連結
  document.getElementById('copy-link-btn')?.addEventListener('click', () => {
    const meetingId = document.getElementById('meeting-id').textContent;
    if (meetingId && meetingId !== '------') {
      copyJoinUrl(meetingId);
    }
  });
  
  // 複製 ID
  document.getElementById('copy-id-btn')?.addEventListener('click', () => {
    const meetingId = document.getElementById('meeting-id').textContent;
    if (meetingId && meetingId !== '------') {
      copyMeetingId(meetingId);
    }
  });
  
  // 重新命名會議按鈕
  document.getElementById('rename-meeting-btn')?.addEventListener('click', () => {
    showRenameMeetingModal();
  });
  
  // 開始估點
  document.getElementById('start-btn')?.addEventListener('click', () => {
    startEstimation();
  });
  
  // 翻牌
  document.getElementById('flip-btn')?.addEventListener('click', () => {
    flipCards();
  });
  
  // 新的一輪
  document.getElementById('new-round-btn')?.addEventListener('click', () => {
    newRound();
  });
  
  // 建立 Issue
  document.getElementById('create-issue-btn')?.addEventListener('click', () => {
    showCreateIssueModal();
  });
  
  // 結束會議
  document.getElementById('close-meeting-btn')?.addEventListener('click', () => {
    closeMeeting();
  });
  
  // 返回按鈕 - 確認是否結束會議
  document.getElementById('back-btn')?.addEventListener('click', async (e) => {
    if (hostManager && hostManager.state === ConnectionState.CONNECTED) {
      e.preventDefault();
      const confirmed = await showConfirmModal({
        title: i18n.t('common.confirm'),
        message: i18n.t('host.closeMeetingConfirm'),
        type: 'danger',
        confirmText: 'common.confirm',
        cancelText: 'common.cancel'
      });
      if (confirmed) {
        hostManager.closeMeeting();
        window.location.hash = '#/';
      }
    }
  });
}

/**
 * 建立會議室
 * @param {string} name - Host 名稱
 */
async function createMeeting(name) {
  try {
    hostName = name || 'Host';
    
    // 讀取會議名稱
    const meetingNameInput = document.getElementById('meeting-name-input');
    meetingName = meetingNameInput ? meetingNameInput.value.trim() : '';
    
    // 更新 HostManager 的 hostName（用於檢查名稱重複）
    hostManager.hostName = hostName;
    
    // 讀取 Host 是否參與估點
    const participateCheckbox = document.getElementById('participate-checkbox');
    hostParticipates = participateCheckbox ? participateCheckbox.checked : true;
    
    // 重置所有狀態（清除上一次會議的資料）
    hostSelectedCard = null;
    currentResults = null;
    issues = [];
    currentIssue = null;
    currentRound = 1;
    finalDecision = null;
    
    // 設定回調
    hostManager.onStateChange = (state) => {
      console.log('Host state changed:', state);
    };
    
    hostManager.onParticipantJoin = (participant) => {
      console.log('Participant joined:', participant);
      toastSuccess(`${participant.name} ${i18n.t('join.connected')}`);
      updateParticipantsList();
      updateControlButtons();
      // 更新會議記錄（參與者加入時更新參與者數量）
      saveMeetingToHistory();
    };
    
    hostManager.onParticipantLeave = (participant) => {
      console.log('Participant left:', participant);
      toastWarning(`${participant.name} ${i18n.t('join.disconnected')}`);
      updateParticipantsList();
      updateControlButtons();
      // 更新會議記錄（參與者離開時更新參與者數量）
      saveMeetingToHistory();
    };
    
    hostManager.onParticipantUpdate = (participants) => {
      updateParticipantsList();
      updateControlButtons();
      // 更新會議記錄（參與者更新時更新參與者數量）
      saveMeetingToHistory();
    };
    
    hostManager.onCardSelect = (participant) => {
      updateParticipantsList();
      updateControlButtons();
    };
    
    hostManager.onError = (err) => {
      console.error('Host error:', err);
      toastError(i18n.t('host.errors.connectionError'));
    };
    
    // 建立會議室
    const meetingId = await hostManager.createMeeting();
    
    // 如果沒有輸入會議名稱，預設使用會議 ID
    if (!meetingName || meetingName.trim() === '') {
      meetingName = meetingId;
    }
    
    // 更新 UI
    document.getElementById('creating-phase').classList.add('hidden');
    document.getElementById('meeting-phase').classList.remove('hidden');
    document.getElementById('meeting-id').textContent = meetingId;
    
    // 建立會議記錄（在建立會議時就儲存）
    saveMeetingToHistory();
    
    // 顯示會議名稱（始終顯示，預設為會議 ID）
    const meetingNameDisplay = document.getElementById('meeting-name-display');
    const meetingNameValue = document.getElementById('meeting-name');
    if (meetingNameDisplay && meetingNameValue) {
      meetingNameValue.textContent = meetingName;
      meetingNameDisplay.classList.remove('hidden');
    }
    
    // 生成 QR Code
    const qrContainer = document.getElementById('qr-container');
    await generateMeetingQRCode(qrContainer, meetingId);
    
    // 初始化控制按鈕狀態
    updateControlButtons();
    
    // 更新 Issue 列表和顯示（確保不顯示舊資料）
    updateIssuesList();
    updateIssueDisplay();
    
    // 隱藏結果區域（確保不顯示舊的結果）
    const resultsSection = document.getElementById('results-section');
    if (resultsSection) {
      resultsSection.classList.add('hidden');
    }
    
    // 更新頁面標題
    updatePageTitle();
    
    toastSuccess(i18n.t('host.created'));
    
  } catch (err) {
    console.error('Failed to create meeting:', err);
    toastError(i18n.t('host.errors.createFailed'));
    
    // 顯示錯誤狀態
    document.getElementById('creating-phase').innerHTML = `
      <div class="error-container">
        <p class="text-error">${i18n.t('host.errors.createFailed')}</p>
        <button class="btn btn-primary" onclick="location.reload()">重試</button>
      </div>
    `;
  }
}

/**
 * 從歷史記錄恢復會議
 * @param {Object} restoreData - 恢復資料 { meetingId, meetingName, issues: [] }
 */
async function restoreMeeting(restoreData) {
  try {
    hostName = 'Host'; // 預設名稱，可以從設定中讀取
    
    // 更新 HostManager 的 hostName
    hostManager.hostName = hostName;
    
    // 讀取 Host 是否參與估點（預設為 true）
    hostParticipates = true;
    
    // 恢復會議名稱（如果沒有則使用會議 ID）
    const restoredMeetingId = restoreData.meetingId;
    meetingName = restoreData.meetingName || restoredMeetingId || '';
    
    // 恢復 Issue 列表
    issues = restoreData.issues || [];
    currentIssue = null;
    currentRound = 1;
    finalDecision = null;
    hostSelectedCard = null;
    currentResults = null;
    
    // 設定回調
    hostManager.onStateChange = (state) => {
      console.log('Host state changed:', state);
    };
    
    hostManager.onParticipantJoin = (participant) => {
      console.log('Participant joined:', participant);
      toastSuccess(`${participant.name} ${i18n.t('join.connected')}`);
      updateParticipantsList();
      updateControlButtons();
      saveMeetingToHistory();
    };
    
    hostManager.onParticipantLeave = (participant) => {
      console.log('Participant left:', participant);
      toastWarning(`${participant.name} ${i18n.t('join.disconnected')}`);
      updateParticipantsList();
      updateControlButtons();
      saveMeetingToHistory();
    };
    
    hostManager.onParticipantUpdate = (participants) => {
      updateParticipantsList();
      updateControlButtons();
      saveMeetingToHistory();
    };
    
    hostManager.onCardSelect = (participant) => {
      updateParticipantsList();
      updateControlButtons();
    };
    
    hostManager.onError = (err) => {
      console.error('Host error:', err);
      toastError(i18n.t('host.errors.connectionError'));
    };
    
    // 建立新會議（會生成新的 meetingId）
    const newMeetingId = await hostManager.createMeeting();
    
    // 更新 UI
    document.getElementById('setup-phase').classList.add('hidden');
    document.getElementById('creating-phase').classList.add('hidden');
    document.getElementById('meeting-phase').classList.remove('hidden');
    document.getElementById('meeting-id').textContent = newMeetingId;
    
    // 建立會議記錄（使用恢復的會議名稱）
    saveMeetingToHistory();
    
    // 顯示會議名稱（始終顯示，如果沒有則使用會議 ID）
    const meetingNameDisplay = document.getElementById('meeting-name-display');
    const meetingNameValue = document.getElementById('meeting-name');
    if (meetingNameDisplay && meetingNameValue) {
      // 如果沒有會議名稱，使用會議 ID 作為預設值
      if (!meetingName || meetingName.trim() === '') {
        meetingName = newMeetingId;
      }
      meetingNameValue.textContent = meetingName;
      meetingNameDisplay.classList.remove('hidden');
    }
    
    // 生成 QR Code
    const qrContainer = document.getElementById('qr-container');
    await generateMeetingQRCode(qrContainer, newMeetingId);
    
    // 更新 Issue 列表
    updateIssuesList();
    updateIssueDisplay();
    
    // 初始化控制按鈕狀態
    updateControlButtons();
    
    // 隱藏結果區域
    const resultsSection = document.getElementById('results-section');
    if (resultsSection) {
      resultsSection.classList.add('hidden');
    }
    
    // 更新頁面標題
    updatePageTitle();
    
    toastSuccess(i18n.t('host.meetingRestored'));
    
  } catch (err) {
    console.error('Failed to restore meeting:', err);
    toastError(i18n.t('host.errors.restoreFailed'));
    
    // 如果恢復失敗，顯示設定表單
    document.getElementById('setup-phase').classList.remove('hidden');
    document.getElementById('creating-phase').classList.add('hidden');
    document.getElementById('meeting-phase').classList.add('hidden');
  }
}

/**
 * 更新參與者列表
 */
function updateParticipantsList() {
  const participantsList = document.getElementById('participants-list');
  const participantCount = document.getElementById('participant-count');
  
  if (!participantsList || !participantCount) return;
  
  const participants = hostManager.getParticipants();
  participantCount.textContent = `${participants.length}/15`;
  
  if (participants.length === 0) {
    participantsList.innerHTML = `
      <div class="empty-state">
        <p data-i18n="host.waitingForParticipants">等待參與者加入...</p>
      </div>
    `;
    i18n.applyTranslations();
    return;
  }
  
  participantsList.innerHTML = participants.map(p => {
    const statusClass = p.estimationState === EstimationState.SELECTED ? 'selected' : 
                       p.estimationState === EstimationState.SELECTING ? 'selecting' : '';
    const statusText = i18n.t(`host.status.${p.estimationState}`);
    
    // 卡片顯示
    let cardDisplay = '';
    if (hostManager.estimationState === EstimationState.REVEALED) {
      cardDisplay = p.selectedCard 
        ? `<span class="participant-card">${p.selectedCard}</span>`
        : `<span class="participant-card no-select">-</span>`;
    } else if (p.estimationState === EstimationState.SELECTED) {
      cardDisplay = `<span class="participant-card hidden-card">?</span>`;
    }
    
    return `
      <div class="participant-item" data-peer-id="${p.peerId}">
        <div class="participant-info">
          <span class="participant-name">${escapeHtml(p.name)}</span>
          <span class="participant-status ${statusClass}">${statusText}</span>
        </div>
        ${cardDisplay}
        <div class="participant-actions">
          <button class="btn btn-ghost btn-sm kick-btn" data-peer-id="${p.peerId}">
            ${i18n.t('host.kick')}
          </button>
        </div>
      </div>
    `;
  }).join('');
  
  // 綁定踢除按鈕事件
  participantsList.querySelectorAll('.kick-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const peerId = e.target.dataset.peerId;
      const confirmed = await showConfirmModal({
        title: i18n.t('common.confirm'),
        message: i18n.t('host.kickConfirm'),
        type: 'warning',
        confirmText: 'common.confirm',
        cancelText: 'common.cancel'
      });
      if (confirmed) {
        hostManager.kickParticipant(peerId, false);
      }
    });
  });
}

/**
 * 更新控制按鈕狀態
 */
function updateControlButtons() {
  const startBtn = document.getElementById('start-btn');
  const flipBtn = document.getElementById('flip-btn');
  const newRoundBtn = document.getElementById('new-round-btn');
  const resultsSection = document.getElementById('results-section');
  const hostCardSelection = document.getElementById('host-card-selection');
  
  // 防護：確保元素存在
  if (!startBtn || !flipBtn || !newRoundBtn || !resultsSection) return;
  
  const participants = hostManager.getParticipants();
  const hasParticipants = participants.length > 0;
  const allClientsSelected = participants.every(p => p.estimationState === EstimationState.SELECTED);
  
  // 檢查是否所有人都已選擇（包括 Host，如果 Host 參與）
  const allSelected = hostParticipates 
    ? (allClientsSelected && hostSelectedCard !== null)
    : allClientsSelected;
  
  // 檢查是否至少有一個人已選擇（包括 Host，如果 Host 參與）
  const hasAnySelection = hostParticipates
    ? (participants.some(p => p.estimationState === EstimationState.SELECTED) || hostSelectedCard !== null)
    : participants.some(p => p.estimationState === EstimationState.SELECTED);
  
  // 找出未選取的人
  const unselectedParticipants = [];
  participants.forEach(p => {
    if (p.estimationState !== EstimationState.SELECTED) {
      unselectedParticipants.push(p.name);
    }
  });
  if (hostParticipates && hostSelectedCard === null) {
    unselectedParticipants.push(hostName);
  }
  
  switch (hostManager.estimationState) {
    case EstimationState.WAITING:
      startBtn.classList.remove('hidden');
      startBtn.disabled = !hasParticipants;
      flipBtn.classList.add('hidden');
      newRoundBtn.classList.add('hidden');
      resultsSection.classList.add('hidden');
      if (hostCardSelection) hostCardSelection.classList.add('hidden');
      break;
      
    case EstimationState.SELECTING:
      startBtn.classList.add('hidden');
      flipBtn.classList.remove('hidden');
      // 只要至少有一個人選擇就可以翻牌
      flipBtn.disabled = !hasAnySelection;
      // 如果有人未選取，添加警告樣式
      if (!allSelected && hasAnySelection) {
        flipBtn.classList.add('warning');
        flipBtn.title = i18n.t('host.flipCardsWithUnselected', { count: unselectedParticipants.length });
      } else {
        flipBtn.classList.remove('warning');
        flipBtn.title = '';
      }
      newRoundBtn.classList.add('hidden');
      resultsSection.classList.add('hidden');
      // 如果 Host 參與估點，顯示 Host 選擇卡片區域
      if (hostCardSelection) {
        if (hostParticipates) {
          hostCardSelection.classList.remove('hidden');
        } else {
          hostCardSelection.classList.add('hidden');
        }
      }
      break;
      
    case EstimationState.REVEALED:
      startBtn.classList.add('hidden');
      flipBtn.classList.add('hidden');
      newRoundBtn.classList.remove('hidden');
      // 檢查輪次限制（最多 5 輪）
      newRoundBtn.disabled = currentRound >= 5;
      resultsSection.classList.remove('hidden');
      if (hostCardSelection) hostCardSelection.classList.add('hidden');
      break;
  }
}

/**
 * 開始估點
 */
function startEstimation() {
  // 檢查是否有參與者
  const participants = hostManager.getParticipants();
  if (participants.length === 0) {
    toastError(i18n.t('host.messages.noParticipants'));
    return;
  }
  
  // 如果沒有 Issue，自動建立一個未命名的 Issue
  if (!currentIssue) {
    if (issues.length === 0) {
      // 建立未命名的 Issue
      const untitledName = i18n.t('host.untitledIssue');
      createIssue(untitledName, '');
      // createIssue 會自動選擇新建立的 Issue
      if (!currentIssue) {
        // 如果還是沒有選擇，手動選擇第一個 Issue
        currentIssue = issues[0];
        updateIssuesList();
        updateIssueDisplay();
      }
    } else {
      // 有 Issue 但沒有選擇，提示選擇
      toastError(i18n.t('host.messages.selectIssueFirst'));
      return;
    }
  }
  
  // 更新 Issue 狀態為進行中
  if (currentIssue.status === 'notStarted') {
    currentIssue.status = 'inProgress';
    updateIssuesList();
  }
  
  // 傳遞 Issue 資訊給 HostManager
  const issueInfo = {
    title: currentIssue.title,
    description: currentIssue.description || ''
  };
  hostManager.startEstimation(issueInfo);
  hostSelectedCard = null; // 重置 Host 選擇
  
  // 如果 Host 參與估點，初始化 Host 選擇卡片 UI
  if (hostParticipates) {
    initHostCardSelection();
  }
  
  updateParticipantsList();
  updateControlButtons();
  
  // 更新會議記錄（開始估點時更新 issue 資訊）
  saveMeetingToHistory();
  
  toastSuccess(i18n.t('host.startEstimation'));
}

/**
 * 初始化 Host 選擇卡片 UI
 */
function initHostCardSelection() {
  const hostCardsContainer = document.getElementById('host-cards-container');
  if (!hostCardsContainer) return;
  
  hostCardsContainer.innerHTML = '';
  
  // 生成卡片 HTML
  const cardsHTML = CARD_SET.map(card => createSelectableCardHTML(card)).join('');
  hostCardsContainer.innerHTML = `<div class="cards-grid">${cardsHTML}</div>`;
  
  // 初始化卡片傾斜效果
  initCardTiltEffect(hostCardsContainer);
  
  // 設定卡片選擇事件
  setupCardSelection(hostCardsContainer, (card) => {
    hostSelectedCard = card;
    updateControlButtons();
  });
}

/**
 * 翻牌
 */
function flipCards() {
  // 檢查未選取的人
  const participants = hostManager.getParticipants();
  const unselectedParticipants = [];
  
  participants.forEach(p => {
    if (p.estimationState !== EstimationState.SELECTED) {
      unselectedParticipants.push(p.name);
    }
  });
  if (hostParticipates && hostSelectedCard === null) {
    unselectedParticipants.push(hostName);
  }
  
  // 如果有未選取的人，顯示提示訊息
  if (unselectedParticipants.length > 0) {
    showUnselectedWarningModal(unselectedParticipants, () => {
      performFlipCards();
    });
  } else {
    performFlipCards();
  }
}

/**
 * 執行翻牌操作
 */
function performFlipCards() {
  // 準備 Host 的結果（如果參與估點，包括未選取的情況）
  const hostResult = hostParticipates
    ? { name: hostName, card: hostSelectedCard }  // card 可能是 null（未選取）
    : null;
  
  // 翻牌並廣播（包含 Host 的結果）
  currentResults = hostManager.flipCards(hostResult);
  
  updateParticipantsList();
  updateControlButtons();
  
  // 檢查是否只有 host 一個人參與
  const participants = hostManager.getParticipants();
  const isSoloMode = participants.length === 0 && hostParticipates && hostSelectedCard !== null;
  
  if (isSoloMode) {
    // 單人模式：顯示卡片翻牌動畫
    displaySoloReveal(currentResults);
  } else {
    // 多人模式：顯示統計結果
    displayResults(currentResults);
  }
  
  // 更新會議記錄（翻牌時更新輪次結果）
  saveMeetingToHistory();
}

/**
 * 顯示重新命名會議的 Modal
 */
function showRenameMeetingModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-backdrop active';
  modal.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h3 data-i18n="host.renameMeeting">重新命名會議</h3>
        <button class="btn btn-ghost btn-icon" id="close-rename-meeting-modal">×</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="rename-meeting-input" data-i18n="host.meetingName">會議名稱</label>
          <input 
            type="text" 
            id="rename-meeting-input" 
            class="form-input" 
            placeholder="輸入會議名稱（選填）"
            data-i18n-placeholder="host.meetingNamePlaceholder"
            maxlength="50"
            value="${escapeHtml(meetingName || '')}"
            autocomplete="off"
          >
          <p class="form-hint" data-i18n="host.meetingNameHint">留空將使用會議 ID 作為預設名稱，後續仍可修改</p>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" id="cancel-rename-meeting-btn" data-i18n="common.cancel">取消</button>
        <button class="btn btn-primary" id="confirm-rename-meeting-btn" data-i18n="common.confirm">確認</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  i18n.applyTranslations();
  
  // 關閉按鈕
  const closeBtn = modal.querySelector('#close-rename-meeting-modal');
  const cancelBtn = modal.querySelector('#cancel-rename-meeting-btn');
  const confirmBtn = modal.querySelector('#confirm-rename-meeting-btn');
  const input = modal.querySelector('#rename-meeting-input');
  
  const closeModal = () => {
    modal.classList.remove('active');
    setTimeout(() => {
      document.body.removeChild(modal);
    }, 300);
  };
  
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  confirmBtn.addEventListener('click', () => {
    const newName = input.value.trim();
    renameMeeting(newName);
    closeModal();
  });
  
  // 聚焦輸入框
  setTimeout(() => {
    input.focus();
    input.select();
  }, 100);
  
  // 按 Enter 鍵確認
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      confirmBtn.click();
    }
  });
  
  // 按 ESC 鍵取消
  const handleEsc = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleEsc);
    }
  };
  document.addEventListener('keydown', handleEsc);
}

/**
 * 重新命名會議
 * @param {string} newName - 新的會議名稱
 */
function renameMeeting(newName) {
  // 如果新名稱為空，使用會議 ID 作為預設值
  if (!newName || newName.trim() === '') {
    const meetingIdElement = document.getElementById('meeting-id');
    meetingName = meetingIdElement ? meetingIdElement.textContent : '';
  } else {
    meetingName = newName;
  }
  
  // 更新 UI（始終顯示）
  const meetingNameDisplay = document.getElementById('meeting-name-display');
  const meetingNameValue = document.getElementById('meeting-name');
  if (meetingNameDisplay && meetingNameValue) {
    meetingNameValue.textContent = meetingName;
    meetingNameDisplay.classList.remove('hidden');
  }
  
  // 更新會議記錄
  saveMeetingToHistory();
  
  // 更新頁面標題
  updatePageTitle();
  
  toastSuccess(i18n.t('host.meetingRenamed'));
}

/**
 * 顯示確認 Modal
 * @param {Object} options - 選項
 * @param {string} options.title - 標題（或翻譯 key）
 * @param {string} options.message - 訊息（或翻譯 key）
 * @param {Function} options.onConfirm - 確認後的回調函數
 * @param {string} options.type - 類型：'warning' | 'danger' | 'info'（預設 'warning'）
 * @param {string} options.confirmText - 確認按鈕文字（或翻譯 key，預設 'common.confirm'）
 * @param {string} options.cancelText - 取消按鈕文字（或翻譯 key，預設 'common.cancel'）
 * @returns {Promise<boolean>} 返回 Promise，true 表示確認，false 表示取消
 */
function showConfirmModal({ title, message, onConfirm, type = 'warning', confirmText = 'common.confirm', cancelText = 'common.cancel' }) {
  return new Promise((resolve) => {
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop active';
    
    // 根據類型設定樣式
    const typeClass = `confirm-modal-${type}`;
    const confirmBtnClass = type === 'danger' ? 'btn-danger' : type === 'warning' ? 'btn-warning' : 'btn-primary';
    
    // 處理翻譯鍵
    const titleText = typeof title === 'string' && (title.includes('.') && !title.includes(' ')) 
      ? i18n.t(title) 
      : escapeHtml(title);
    const messageText = typeof message === 'string' && (message.includes('.') && !message.includes(' ')) 
      ? i18n.t(message) 
      : escapeHtml(message);
    
    modal.innerHTML = `
      <div class="modal ${typeClass}">
        <div class="modal-header">
          <h3>${titleText}</h3>
          <button class="btn btn-ghost btn-icon" id="close-confirm-modal">×</button>
        </div>
        <div class="modal-body">
          <p>${messageText}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" id="cancel-confirm-btn">${i18n.t(cancelText)}</button>
          <button class="btn ${confirmBtnClass}" id="confirm-confirm-btn">${i18n.t(confirmText)}</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // 關閉按鈕
    const closeBtn = modal.querySelector('#close-confirm-modal');
    const cancelBtn = modal.querySelector('#cancel-confirm-btn');
    const confirmBtn = modal.querySelector('#confirm-confirm-btn');
    
    const closeModal = () => {
      modal.classList.remove('active');
      setTimeout(() => {
        document.body.removeChild(modal);
      }, 300);
    };
    
    const handleCancel = () => {
      closeModal();
      resolve(false);
    };
    
    const handleConfirm = () => {
      closeModal();
      if (onConfirm) onConfirm();
      resolve(true);
    };
    
    closeBtn.addEventListener('click', handleCancel);
    cancelBtn.addEventListener('click', handleCancel);
    confirmBtn.addEventListener('click', handleConfirm);
    
    // 點擊背景關閉
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        handleCancel();
      }
    });
    
    // 按 ESC 鍵取消
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        handleCancel();
        document.removeEventListener('keydown', handleEsc);
      }
    };
    document.addEventListener('keydown', handleEsc);
    
    // 聚焦確認按鈕（危險操作聚焦取消按鈕）
    setTimeout(() => {
      if (type === 'danger') {
        cancelBtn.focus();
      } else {
        confirmBtn.focus();
      }
    }, 100);
  });
}

/**
 * 顯示未選取參與者的警告 Modal
 * @param {Array<string>} unselectedNames - 未選取的參與者名稱列表
 * @param {Function} onConfirm - 確認後的回調函數
 */
function showUnselectedWarningModal(unselectedNames, onConfirm) {
  const modal = document.createElement('div');
  modal.className = 'modal-backdrop active';
  modal.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h3 data-i18n="host.unselectedWarning.title">有參與者尚未選取</h3>
        <button class="btn btn-ghost btn-icon" id="close-unselected-modal">×</button>
      </div>
      <div class="modal-body">
        <p data-i18n="host.unselectedWarning.message">以下參與者尚未選取卡片：</p>
        <ul style="margin: var(--spacing-md) 0; padding-left: var(--spacing-lg);">
          ${unselectedNames.map(name => `<li>${escapeHtml(name)}</li>`).join('')}
        </ul>
        <p style="margin-top: var(--spacing-md); color: var(--color-text-muted);" data-i18n="host.unselectedWarning.note">未選取的參與者將不會計入統計計算，但仍會記錄為未選取狀態。</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" id="cancel-unselected-btn" data-i18n="common.cancel">取消</button>
        <button class="btn btn-primary" id="confirm-unselected-btn" data-i18n="host.unselectedWarning.confirmFlip">仍要翻牌</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  i18n.applyTranslations();
  
  // 關閉按鈕
  const closeBtn = modal.querySelector('#close-unselected-modal');
  const cancelBtn = modal.querySelector('#cancel-unselected-btn');
  const confirmBtn = modal.querySelector('#confirm-unselected-btn');
  
  const closeModal = () => {
    modal.classList.remove('active');
    setTimeout(() => {
      document.body.removeChild(modal);
    }, 300);
  };
  
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  confirmBtn.addEventListener('click', () => {
    closeModal();
    if (onConfirm) onConfirm();
  });
  
  // 點擊背景關閉
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // 按 ESC 鍵取消
  const handleEsc = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleEsc);
    }
  };
  document.addEventListener('keydown', handleEsc);
}

/**
 * 新的一輪
 */
function newRound() {
  if (!currentIssue) {
    toastError('請先建立 Issue');
    return;
  }
  
  // 檢查輪次限制（最多 5 輪）
  if (currentRound >= 5) {
    toastError(i18n.t('host.messages.maxRoundsReached', { max: 5 }));
    return;
  }
  
  // 記錄當前輪次的結果
  if (currentResults) {
    const roundData = {
      roundNumber: currentRound,
      results: [...currentResults],
      completedAt: new Date().toISOString()
    };
    currentIssue.rounds.push(roundData);
  }
  
  // 增加輪次
  currentRound++;
  currentResults = null;
  hostSelectedCard = null;
  finalDecision = null;
  
  // 重置估點狀態
  hostManager.resetRound();
  updateParticipantsList();
  updateControlButtons();
  updateIssueDisplay();
  
  // 更新會議記錄（新的一輪時更新輪次）
  saveMeetingToHistory();
  
  toastSuccess(i18n.t('host.newRound'));
}

/**
 * 結束會議
 */
async function closeMeeting() {
  const confirmed = await showConfirmModal({
    title: i18n.t('common.confirm'),
    message: i18n.t('host.closeMeetingConfirm'),
    type: 'danger',
    confirmText: 'common.confirm',
    cancelText: 'common.cancel'
  });
  
  if (confirmed) {
    // 更新會議記錄（標記為已完成）
    const meetingIdElement = document.getElementById('meeting-id');
    if (meetingIdElement) {
      const meetingId = meetingIdElement.textContent;
      if (meetingId && meetingId !== '------') {
        const history = getHistory();
        const meetingRecord = history.find(r => r.meetingId === meetingId && r.mode === 'host' && r.issues);
        if (meetingRecord) {
          meetingRecord.completedAt = new Date().toISOString();
          storage.set('history', history);
        }
      }
    }
    
    // 最後一次更新會議記錄（確保所有資料都是最新的）
    saveMeetingToHistory();
    
    hostManager.closeMeeting();
    window.location.hash = '#/';
  }
}

/**
 * 顯示結果
 */
function displayResults(results) {
  const resultsSection = document.getElementById('results-section');
  const soloRevealContainer = document.getElementById('solo-reveal-container');
  const multiResultsContainer = document.getElementById('multi-results-container');
  
  // 隱藏單人模式容器，顯示多人模式容器
  if (soloRevealContainer) soloRevealContainer.classList.add('hidden');
  if (multiResultsContainer) multiResultsContainer.classList.remove('hidden');
  if (resultsSection) resultsSection.classList.remove('hidden');
  
  const resultsStats = document.getElementById('results-stats');
  const resultsCards = document.getElementById('results-cards');
  const extremeValuesSection = document.getElementById('extreme-values-section');
  const finalDecisionSection = document.getElementById('final-decision-section');
  
  // 計算統計
  const numericResults = results
    .filter(r => r.card && !isNaN(parseFloat(r.card)))
    .map(r => parseFloat(r.card));
  
  let average = '-';
  let highest = '-';
  let lowest = '-';
  
  if (numericResults.length > 0) {
    average = (numericResults.reduce((a, b) => a + b, 0) / numericResults.length).toFixed(1);
    highest = Math.max(...numericResults);
    lowest = Math.min(...numericResults);
  }
  
  // 顯示統計
  resultsStats.innerHTML = `
    <div class="stat-card">
      <div class="stat-label" data-i18n="host.stats.average">平均</div>
      <div class="stat-value">${average}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label" data-i18n="host.stats.highest">最高</div>
      <div class="stat-value">${highest}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label" data-i18n="host.stats.lowest">最低</div>
      <div class="stat-value">${lowest}</div>
    </div>
  `;
  
  // 識別極端值
  const extremeValues = identifyExtremeValues(results, numericResults, highest, lowest);
  
  // 顯示個別結果（高亮極端值）
  resultsCards.innerHTML = results.map(r => {
    const isHighest = extremeValues.highest.some(ev => ev.name === r.name);
    const isLowest = extremeValues.lowest.some(ev => ev.name === r.name);
    const extremeClass = isHighest ? 'extreme-highest' : isLowest ? 'extreme-lowest' : '';
    
    return `
      <div class="result-card-item ${extremeClass}" data-participant-name="${escapeHtml(r.name)}" data-card-value="${r.card || ''}">
        <div class="result-card-name">${escapeHtml(r.name)}</div>
        <div class="result-card-value ${r.card ? '' : 'no-select'}">${r.card || '-'}</div>
      </div>
    `;
  }).join('');
  
  // 顯示統計圖表
  displayChart(results, numericResults);
  
  // 顯示極端值分析
  if (extremeValues.highest.length > 0 || extremeValues.lowest.length > 0) {
    if (extremeValuesSection) {
      extremeValuesSection.classList.remove('hidden');
      extremeValuesSection.innerHTML = `
        <h4 data-i18n="host.extremeValues">極端值</h4>
        ${extremeValues.highest.length > 0 ? `
          <div class="extreme-group">
            <span class="extreme-label" data-i18n="host.highestValue">最高值</span>
            <div class="extreme-participants">
              ${extremeValues.highest.map(ev => `
                <span class="extreme-participant">${escapeHtml(ev.name)}: ${ev.card}</span>
              `).join('')}
            </div>
          </div>
        ` : ''}
        ${extremeValues.lowest.length > 0 ? `
          <div class="extreme-group">
            <span class="extreme-label" data-i18n="host.lowestValue">最低值</span>
            <div class="extreme-participants">
              ${extremeValues.lowest.map(ev => `
                <span class="extreme-participant">${escapeHtml(ev.name)}: ${ev.card}</span>
              `).join('')}
            </div>
          </div>
        ` : ''}
      `;
      i18n.applyTranslations();
    }
  } else {
    if (extremeValuesSection) {
      extremeValuesSection.classList.add('hidden');
    }
  }
  
  // 顯示 Host 最終決定權
  if (finalDecisionSection) {
    finalDecisionSection.classList.remove('hidden');
    displayFinalDecisionOptions(results, finalDecisionSection, average, numericResults);
  }
  
  i18n.applyTranslations();
}

/**
 * 顯示單人模式的卡片翻牌動畫（類似簡易模式）
 * @param {Array} results - 結果陣列（應該只有 host 自己的結果）
 */
function displaySoloReveal(results) {
  const resultsSection = document.getElementById('results-section');
  const soloRevealContainer = document.getElementById('solo-reveal-container');
  const multiResultsContainer = document.getElementById('multi-results-container');
  const revealCardWrapper = document.getElementById('host-reveal-card-wrapper');
  
  if (!resultsSection || !soloRevealContainer || !multiResultsContainer || !revealCardWrapper) return;
  
  // 隱藏多人模式容器，顯示單人模式容器
  multiResultsContainer.classList.add('hidden');
  soloRevealContainer.classList.remove('hidden');
  resultsSection.classList.remove('hidden');
  
  // 找到 host 的結果
  const hostResult = results.find(r => r.name === hostName);
  if (!hostResult || !hostResult.card) {
    // 如果沒有選擇卡片，顯示提示
    revealCardWrapper.innerHTML = `
      <div class="solo-no-card">
        <p data-i18n="solo.noCardSelected">未選擇卡片</p>
      </div>
    `;
    i18n.applyTranslations();
    return;
  }
  
  // 找到對應的卡片
  const card = CARD_SET.find(c => c.value === hostResult.card);
  if (!card) return;
  
  // 渲染卡片（背面朝上）
  revealCardWrapper.innerHTML = `
    <div class="reveal-card" id="host-reveal-card">
      <div class="card-face card-front">
        <div class="card-holo"></div>
        <div class="card-content">
          <span class="card-value">${card.label}</span>
        </div>
      </div>
      <div class="card-face card-back">
        <div class="card-content">
          <span class="card-value">?</span>
        </div>
      </div>
    </div>
  `;
  
  // 觸發翻牌動畫
  setTimeout(() => {
    const revealCard = document.getElementById('host-reveal-card');
    if (revealCard) {
      revealCard.classList.add('flipped');
    }
  }, 300);
  
  i18n.applyTranslations();
}

/**
 * 識別極端值
 */
function identifyExtremeValues(results, numericResults, highest, lowest) {
  const extremeValues = {
    highest: [],
    lowest: []
  };
  
  if (numericResults.length === 0) return extremeValues;
  
  // 找出最高值
  results.forEach(r => {
    if (r.card && parseFloat(r.card) === highest) {
      extremeValues.highest.push({ name: r.name, card: r.card });
    }
  });
  
  // 找出最低值
  results.forEach(r => {
    if (r.card && parseFloat(r.card) === lowest) {
      extremeValues.lowest.push({ name: r.name, card: r.card });
    }
  });
  
  return extremeValues;
}

/**
 * 找出最接近平均值的牌組內的值
 * @param {number} average - 平均值
 * @returns {string|null} 最接近的牌組值，如果沒有數字值則返回 null
 */
function findClosestCardValue(average) {
  if (average === '-' || isNaN(parseFloat(average))) {
    return null;
  }
  
  const avgNum = parseFloat(average);
  
  // 只考慮數字值的牌組
  const numericCards = CARD_SET.filter(card => {
    const value = card.value;
    // 排除特殊符號，只考慮可以轉換為數字的
    if (value === '1/2') return true; // 特殊處理 1/2
    return !isNaN(parseFloat(value));
  });
  
  if (numericCards.length === 0) {
    return null;
  }
  
  let closestCard = null;
  let minDistance = Infinity;
  
  numericCards.forEach(card => {
    let cardValue;
    if (card.value === '1/2') {
      cardValue = 0.5;
    } else {
      cardValue = parseFloat(card.value);
    }
    
    const distance = Math.abs(cardValue - avgNum);
    // 如果距離更小，或者距離相同但值更大（選擇較大的值），則更新
    const currentClosestValue = closestCard ? (closestCard.value === '1/2' ? 0.5 : parseFloat(closestCard.value)) : -Infinity;
    if (distance < minDistance || (distance === minDistance && cardValue > currentClosestValue)) {
      minDistance = distance;
      closestCard = card;
    }
  });
  
  return closestCard ? closestCard.value : null;
}

/**
 * 顯示 Host 最終決定選項
 * @param {Array} results - 估點結果
 * @param {HTMLElement} container - 容器元素
 * @param {string|number} average - 平均值
 * @param {Array} numericResults - 數字結果陣列
 */
function displayFinalDecisionOptions(results, container, average, numericResults) {
  // 收集所有唯一的估點值
  const uniqueValues = [...new Set(results.map(r => r.card).filter(c => c))];
  
  // 計算平均值和最接近的牌組值
  const averageValue = average !== '-' && !isNaN(parseFloat(average)) ? parseFloat(average).toFixed(1) : null;
  const closestCardValue = findClosestCardValue(average);
  
  // 找出最接近的牌組值的標籤
  const closestCardLabel = closestCardValue ? CARD_SET.find(c => c.value === closestCardValue)?.label || closestCardValue : null;
  
  // 建立選項列表，按照優先順序：平均 > 最接近平均 > 使用者選項
  // 使用 Set 來追蹤已顯示的值，避免重複
  const displayedValues = new Set();
  const options = [];
  
  // 建立值到選擇者的映射（用於 tooltip）
  const valueToParticipants = new Map();
  results.forEach(r => {
    if (r.card) {
      if (!valueToParticipants.has(r.card)) {
        valueToParticipants.set(r.card, []);
      }
      valueToParticipants.get(r.card).push(r.name);
    }
  });
  
  // 取得選擇者的 tooltip 文字
  const getParticipantsTooltip = (value) => {
    const participants = valueToParticipants.get(value);
    if (!participants || participants.length === 0) {
      return '';
    }
    return participants.join(', ');
  };
  
  // 1. 優先顯示平均值（如果存在且有效）
  if (averageValue) {
    displayedValues.add(averageValue);
    const avgTooltip = i18n.t('host.averageValue');
    options.push(`
      <button class="btn btn-primary final-value-btn" data-value="${averageValue}" title="${avgTooltip}">
        <span data-i18n="host.stats.average">平均</span>: ${averageValue}
      </button>
    `);
  }
  
  // 2. 顯示最接近平均的牌組值（如果存在且與平均值不同）
  if (closestCardValue && closestCardLabel) {
    // 檢查是否與平均值相同（需要比較數值）
    const avgNum = averageValue ? parseFloat(averageValue) : null;
    const closestNum = closestCardValue === '1/2' ? 0.5 : parseFloat(closestCardValue);
    const isSameAsAverage = avgNum !== null && Math.abs(avgNum - closestNum) < 0.01;
    
    if (!isSameAsAverage && !displayedValues.has(closestCardValue)) {
      displayedValues.add(closestCardValue);
      
      // 建立 tooltip：最接近平均 + 選擇者（如果有）
      const closestTooltip = i18n.t('host.closestCardValueTooltip');
      const participantsTooltip = getParticipantsTooltip(closestCardValue);
      const finalTooltip = participantsTooltip 
        ? `${closestTooltip} (${i18n.t('host.selectedBy')}: ${participantsTooltip})`
        : closestTooltip;
      
      options.push(`
        <button class="btn btn-primary final-value-btn" data-value="${closestCardValue}" title="${finalTooltip}">
          ${closestCardLabel}
        </button>
      `);
    }
  }
  
  // 3. 顯示使用者選項（排除已顯示的值）
  // 需要比較數值，而不只是字符串，因為平均值可能是 "100.0"，而使用者選項是 "100"
  uniqueValues.forEach(value => {
    // 檢查是否已顯示（比較字符串和數值）
    let isDuplicate = false;
    
    // 先檢查字符串是否相同
    if (displayedValues.has(value)) {
      isDuplicate = true;
    } else {
      // 檢查數值是否相同
      const valueNum = value === '1/2' ? 0.5 : parseFloat(value);
      if (!isNaN(valueNum)) {
        for (const displayed of displayedValues) {
          const displayedNum = displayed === '1/2' ? 0.5 : parseFloat(displayed);
          if (!isNaN(displayedNum) && Math.abs(valueNum - displayedNum) < 0.01) {
            isDuplicate = true;
            break;
          }
        }
      }
    }
    
    if (!isDuplicate) {
      displayedValues.add(value);
      const participantsTooltip = getParticipantsTooltip(value);
      const buttonTitle = participantsTooltip || '';
      options.push(`
        <button class="btn btn-secondary final-value-btn" data-value="${value}" ${buttonTitle ? `title="${buttonTitle}"` : ''}>
          ${value}
        </button>
      `);
    }
  });
  
  container.innerHTML = `
    <h4 data-i18n="host.finalDecision">最終決定</h4>
    <p class="final-decision-desc" data-i18n="host.selectFinalValue">選擇最終估點值</p>
    <div class="final-decision-options">
      ${options.join('')}
      <button class="btn btn-ghost final-value-btn custom-value-btn" data-i18n="host.customValue">自訂值</button>
    </div>
    <div id="custom-value-input-container" class="custom-value-input-container hidden">
      <input 
        type="text" 
        id="custom-value-input" 
        class="form-input" 
        placeholder="輸入自訂估點值"
        maxlength="20"
      >
      <button class="btn btn-primary" id="confirm-custom-value-btn">確認</button>
    </div>
    ${finalDecision ? `
      <div class="final-decision-display">
        <strong>已選擇：</strong><span id="final-decision-value">${finalDecision}</span>
      </div>
    ` : ''}
  `;
  
  i18n.applyTranslations();
  
  // 綁定事件
  container.querySelectorAll('.final-value-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (e.target.classList.contains('custom-value-btn')) {
        // 顯示自訂值輸入框
        const customInputContainer = document.getElementById('custom-value-input-container');
        if (customInputContainer) {
          customInputContainer.classList.remove('hidden');
          document.getElementById('custom-value-input')?.focus();
        }
      } else {
        const value = e.target.dataset.value;
        setFinalDecision(value);
      }
    });
  });
  
  // 確認自訂值
  document.getElementById('confirm-custom-value-btn')?.addEventListener('click', () => {
    const customValue = document.getElementById('custom-value-input')?.value.trim();
    if (customValue) {
      setFinalDecision(customValue);
      document.getElementById('custom-value-input-container')?.classList.add('hidden');
    }
  });
}

/**
 * 設定最終決定（並自動完成估點）
 */
function setFinalDecision(value) {
  if (!currentIssue) {
    toastError(i18n.t('host.messages.createIssueFirst'));
    return;
  }
  
  if (!currentResults) {
    toastError(i18n.t('host.messages.startEstimationFirst'));
    return;
  }
  
  finalDecision = value;
  
  // 記錄當前輪次的結果
  const roundData = {
    roundNumber: currentRound,
    results: currentResults,
    finalDecision: finalDecision,
    completedAt: new Date().toISOString()
  };
  
  currentIssue.rounds.push(roundData);
  
  // 更新 Issue 狀態為已完成
  currentIssue.status = 'completed';
  currentIssue.finalDecision = finalDecision;
  
  // 儲存到歷史
  saveIssueToHistory();
  
  // 重置估點狀態
  currentResults = null;
  currentRound = 1;
  finalDecision = null;
  hostSelectedCard = null;
  
  hostManager.resetRound();
  updateParticipantsList();
  updateControlButtons();
  updateIssuesList();
  updateIssueDisplay();
  
  toastSuccess(i18n.t('host.messages.issueCompleted', { title: currentIssue.title }));
}

/**
 * 儲存到歷史
 */

/**
 * HTML 跳脫
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * 顯示統計圖表
 */
let chartInstance = null;

function displayChart(results, numericResults) {
  const chartContainer = document.getElementById('chart-container');
  const chartCanvas = document.getElementById('results-chart');
  
  if (!chartContainer || !chartCanvas || typeof Chart === 'undefined') {
    return;
  }
  
  // 如果只有非數字結果，不顯示圖表
  if (numericResults.length === 0) {
    chartContainer.classList.add('hidden');
    return;
  }
  
  chartContainer.classList.remove('hidden');
  
  // 銷毀舊的圖表實例
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  // 計算分佈
  const distribution = {};
  results.forEach(r => {
    if (r.card) {
      distribution[r.card] = (distribution[r.card] || 0) + 1;
    }
  });
  
  const labels = Object.keys(distribution).sort((a, b) => {
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    if (!isNaN(aNum) && !isNaN(bNum)) {
      return aNum - bNum;
    }
    return a.localeCompare(b);
  });
  
  const data = labels.map(label => distribution[label]);
  
  // 取得主題顏色
  const isDark = theme.isDark();
  const backgroundColor = isDark 
    ? 'rgba(99, 102, 241, 0.5)'
    : 'rgba(99, 102, 241, 0.3)';
  const borderColor = isDark
    ? 'rgba(99, 102, 241, 1)'
    : 'rgba(99, 102, 241, 0.8)';
  
  // 建立圖表
  chartInstance = new Chart(chartCanvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: i18n.t('host.chart.distribution'),
        data: data,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 2,
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)',
          titleColor: isDark ? '#fff' : '#000',
          bodyColor: isDark ? '#fff' : '#000',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          borderWidth: 1
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            color: isDark ? '#e2e8f0' : '#1a1a2e'
          },
          grid: {
            color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          }
        },
        x: {
          ticks: {
            color: isDark ? '#e2e8f0' : '#1a1a2e'
          },
          grid: {
            color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          }
        }
      }
    }
  });
}

/**
 * 顯示建立 Issue 的 Modal
 */
function showCreateIssueModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-backdrop active';
  modal.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h3 data-i18n="host.createIssue">建立 Issue</h3>
        <button class="btn btn-ghost btn-icon" id="close-issue-modal">×</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="issue-title-input" data-i18n="host.issueTitle">Issue 標題</label>
          <input 
            type="text" 
            id="issue-title-input" 
            class="form-input" 
            placeholder="輸入 Issue 標題"
            data-i18n-placeholder="host.issueTitlePlaceholder"
            maxlength="100"
            required
          >
        </div>
        <div class="form-group">
          <label for="issue-description-input" data-i18n="host.issueDescription">Issue 描述</label>
          <textarea 
            id="issue-description-input" 
            class="form-input" 
            placeholder="輸入 Issue 描述（選填）"
            data-i18n-placeholder="host.issueDescriptionPlaceholder"
            rows="3"
            maxlength="500"
          ></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" id="cancel-issue-btn" data-i18n="common.cancel">取消</button>
        <button class="btn btn-primary" id="confirm-issue-btn" data-i18n="host.createIssue">建立 Issue</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  i18n.applyTranslations();
  
  // 事件監聽
  document.getElementById('close-issue-modal')?.addEventListener('click', () => {
    modal.remove();
  });
  
  document.getElementById('cancel-issue-btn')?.addEventListener('click', () => {
    modal.remove();
  });
  
  const confirmIssue = () => {
    const title = document.getElementById('issue-title-input').value.trim();
    if (!title) {
      toastError(i18n.t('host.messages.enterIssueTitle'));
      return;
    }
    
    const description = document.getElementById('issue-description-input').value.trim();
    createIssue(title, description);
    modal.remove();
  };
  
  document.getElementById('confirm-issue-btn')?.addEventListener('click', confirmIssue);
  
  // 聚焦到標題輸入框
  const titleInput = document.getElementById('issue-title-input');
  const descriptionInput = document.getElementById('issue-description-input');
  
  setTimeout(() => {
    titleInput?.focus();
  }, 100);
  
  // 按 Enter 鍵確認（在標題輸入框時）
  titleInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      confirmIssue();
    }
  });
  
  // 在描述 textarea 中，Shift+Enter 換行，Enter 確認
  descriptionInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      confirmIssue();
    }
  });
  
  // 按 ESC 鍵取消
  const handleEsc = (e) => {
    if (e.key === 'Escape') {
      modal.remove();
      document.removeEventListener('keydown', handleEsc);
    }
  };
  document.addEventListener('keydown', handleEsc);
}

/**
 * 建立 Issue
 */
/**
 * 建立 Issue
 * @param {string} title - Issue 標題
 * @param {string} description - Issue 描述
 * @param {boolean} autoSelect - 是否自動選擇新建立的 Issue（預設 true）
 */
function createIssue(title, description = '', autoSelect = true) {
  // 檢查 issue 數量限制（最多 10 個）
  if (issues.length >= 10) {
    toastError(i18n.t('host.messages.maxIssuesReached', { max: 10 }));
    return;
  }
  
  const newIssue = {
    id: `issue-${Date.now()}`,
    title,
    description,
    status: 'notStarted', // notStarted, inProgress, completed
    rounds: [],
    createdAt: new Date().toISOString()
  };
  
  issues.push(newIssue);
  storage.set('issues', issues);
  
  // 更新會議記錄（新增 issue）
  saveMeetingToHistory();
  
  // 如果自動選擇，選擇新建立的 Issue
  if (autoSelect) {
    // 如果當前有 issue 正在進行估點，不應該切換到新 issue
    // 但用戶要求可以在估點進行中建立新 issue，所以我們不切換 currentIssue
    if (currentIssue && hostManager.estimationState !== EstimationState.WAITING) {
      // 當前 issue 正在進行估點，保持 currentIssue 不變
      // 新 issue 應該是 notStarted 狀態
      updateIssueStatus(newIssue.id);
    } else {
      // 沒有正在進行的估點，可以選擇新 issue
      currentIssue = newIssue;
      currentRound = 1;
      finalDecision = null;
      currentResults = null;
      hostSelectedCard = null;
      updateIssueStatus(newIssue.id);
      updateIssueDisplay();
      updateControlButtons();
    }
  } else {
    // 不自動選擇時，也要更新狀態
    updateIssueStatus(newIssue.id);
  }
  
  // 更新所有 issue 的狀態（確保狀態正確）
  issues.forEach(issue => {
    updateIssueStatus(issue.id);
  });
  
  updateIssuesList();
  toastSuccess(i18n.t('host.messages.issueCreated', { title }));
}

/**
 * 選擇 Issue
 */
async function selectIssue(issueId) {
  const issue = issues.find(i => i.id === issueId);
  if (!issue) return;
  
  // 如果已經是當前選中的 Issue，不執行任何操作
  if (currentIssue && currentIssue.id === issueId) {
    return;
  }
  
  // 如果當前有正在進行的估點，先完成或重置
  if (currentIssue && currentIssue.status === 'inProgress') {
    const confirmed = await showConfirmModal({
      title: i18n.t('common.confirm'),
      message: i18n.t('host.messages.switchIssueConfirm'),
      type: 'warning',
      confirmText: 'common.confirm',
      cancelText: 'common.cancel'
    });
    if (!confirmed) {
      return;
    }
    // 重置當前估點狀態
    hostManager.resetRound();
    currentResults = null;
    hostSelectedCard = null;
    finalDecision = null;
    currentRound = 1;
  }
  
  currentIssue = issue;
  currentRound = issue.rounds.length > 0 ? issue.rounds.length + 1 : 1;
  finalDecision = null;
  currentResults = null;
  hostSelectedCard = null;
  
  // 更新 Issue 狀態
  updateIssueStatus(issueId);
  updateIssuesList();
  updateIssueDisplay();
  updateControlButtons();
  
  toastSuccess(i18n.t('host.messages.issueSelected', { title: issue.title }));
}

/**
 * 更新 Issue 狀態
 */
function updateIssueStatus(issueId) {
  const issue = issues.find(i => i.id === issueId);
  if (!issue) return;
  
  // 根據是否有 rounds 和 finalDecision 來判斷狀態
  if (issue.rounds.length > 0 && issue.finalDecision) {
    issue.status = 'completed';
  } else if (currentIssue && currentIssue.id === issueId && hostManager.estimationState !== EstimationState.WAITING) {
    issue.status = 'inProgress';
  } else {
    issue.status = 'notStarted';
  }
}

/**
 * 更新 Issue 列表顯示
 */
function updateIssuesList() {
  const issuesList = document.getElementById('issues-list');
  const noIssues = document.getElementById('no-issues');
  const createIssueBtn = document.getElementById('create-issue-btn');
  
  if (!issuesList) return;
  
  // 更新「建立 Issue」按鈕狀態（最多 10 個）
  if (createIssueBtn) {
    createIssueBtn.disabled = issues.length >= 10;
  }
  
  if (issues.length === 0) {
    if (noIssues) {
      noIssues.classList.remove('hidden');
    }
    issuesList.innerHTML = '';
    return;
  }
  
  if (noIssues) {
    noIssues.classList.add('hidden');
  }
  
  issuesList.innerHTML = issues.map(issue => {
    const statusClass = issue.status === 'completed' ? 'completed' : 
                       issue.status === 'inProgress' ? 'in-progress' : 'not-started';
    const statusText = i18n.t(`host.issueStatus.${issue.status}`);
    const isSelected = currentIssue && currentIssue.id === issue.id;
    
    // 計算最後一輪的結果統計
    const lastRoundResult = getLastRoundResult(issue);
    
    return `
      <div class="issue-item ${isSelected ? 'selected' : ''}" data-issue-id="${issue.id}">
        <div class="issue-item-header">
          <div class="issue-title-wrapper">
            <h4 class="issue-item-title">
              ${escapeHtml(issue.title)}
            </h4>
            <button class="btn btn-ghost btn-icon btn-sm rename-issue-btn" data-issue-id="${issue.id}" title="${i18n.t('host.renameIssue')}">
              ✏️
            </button>
          </div>
          <span class="issue-status-badge ${statusClass}">${statusText}</span>
        </div>
        ${issue.description ? `<p class="issue-item-description">${escapeHtml(issue.description)}</p>` : ''}
        ${isSelected && currentRound ? `
          <p class="issue-round-info" style="margin-top: var(--spacing-xs); font-size: var(--font-size-sm); color: var(--color-text-secondary);">
            <span data-i18n="host.roundNumber">輪次</span>: <span>${currentRound}</span>
          </p>
        ` : ''}
        ${lastRoundResult ? `
          <div class="issue-item-result">
            <div class="result-stats-mini">
              ${lastRoundResult.average !== '-' ? `
                <span class="stat-mini">
                  <span class="stat-label-mini" data-i18n="host.stats.average">平均</span>
                  <span class="stat-value-mini">${lastRoundResult.average}</span>
                </span>
              ` : ''}
              ${lastRoundResult.highest !== '-' ? `
                <span class="stat-mini">
                  <span class="stat-label-mini" data-i18n="host.stats.highest">最高</span>
                  <span class="stat-value-mini">${lastRoundResult.highest}</span>
                </span>
              ` : ''}
              ${lastRoundResult.lowest !== '-' ? `
                <span class="stat-mini">
                  <span class="stat-label-mini" data-i18n="host.stats.lowest">最低</span>
                  <span class="stat-value-mini">${lastRoundResult.lowest}</span>
                </span>
              ` : ''}
            </div>
            ${issue.finalDecision ? `
              <div class="final-decision-mini">
                <span class="final-decision-label" data-i18n="host.finalDecision">最終決定</span>
                <span class="final-decision-value">${escapeHtml(issue.finalDecision)}</span>
              </div>
            ` : ''}
          </div>
        ` : ''}
        <div class="issue-item-footer">
          <span class="issue-item-rounds">${issue.rounds.length} ${i18n.t('host.roundNumber')}</span>
          <button class="btn btn-primary btn-sm select-issue-btn" data-issue-id="${issue.id}">
            ${isSelected ? i18n.t('host.currentIssue') : i18n.t('host.selectIssue')}
          </button>
        </div>
      </div>
    `;
  }).join('');
  
  i18n.applyTranslations();
  
  // 綁定選擇 Issue 按鈕事件
  // 只為按鈕綁定事件，避免事件冒泡導致重複觸發
  issuesList.querySelectorAll('.select-issue-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // 阻止事件冒泡
      const issueId = btn.dataset.issueId;
      if (issueId) {
        selectIssue(issueId);
      }
    });
  });
  
  // 為整個 issue-item 綁定事件（點擊空白區域也可以選擇）
  issuesList.querySelectorAll('.issue-item').forEach(item => {
    item.addEventListener('click', (e) => {
      // 如果點擊的是按鈕，不處理（由按鈕的事件處理）
      if (e.target.closest('.select-issue-btn') || e.target.closest('.rename-issue-btn')) {
        return;
      }
      // 如果已經是選中的 Issue，不處理
      if (item.classList.contains('selected')) {
        return;
      }
      const issueId = item.dataset.issueId;
      if (issueId) {
        selectIssue(issueId);
      }
    });
  });
  
  // 綁定重新命名按鈕事件
  issuesList.querySelectorAll('.rename-issue-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // 阻止事件冒泡
      const issueId = btn.dataset.issueId;
      if (issueId) {
        showRenameIssueModal(issueId);
      }
    });
  });
}

/**
 * 顯示重新命名 Issue 的 Modal
 * @param {string} issueId - Issue ID
 */
function showRenameIssueModal(issueId) {
  const issue = issues.find(i => i.id === issueId);
  if (!issue) return;
  
  // 建立 Modal
  const modal = document.createElement('div');
  modal.className = 'modal-backdrop active';
  modal.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h3 data-i18n="host.renameIssue">重新命名 Issue</h3>
        <button class="btn btn-ghost btn-icon" id="close-rename-modal">✕</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="rename-issue-title-input" data-i18n="host.issueTitle">Issue 標題</label>
          <input 
            type="text" 
            id="rename-issue-title-input" 
            class="form-input" 
            placeholder="輸入 Issue 標題"
            data-i18n-placeholder="host.issueTitlePlaceholder"
            value="${escapeHtml(issue.title)}"
            maxlength="100"
            required
          >
        </div>
        <div class="form-group">
          <label for="rename-issue-description-input" data-i18n="host.issueDescription">Issue 描述</label>
          <textarea 
            id="rename-issue-description-input" 
            class="form-input" 
            placeholder="輸入 Issue 描述（選填）"
            data-i18n-placeholder="host.issueDescriptionPlaceholder"
            rows="3"
            maxlength="500"
          >${escapeHtml(issue.description || '')}</textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" id="cancel-rename-btn" data-i18n="common.cancel">取消</button>
        <button class="btn btn-primary" id="confirm-rename-btn" data-i18n="common.confirm">確認</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  i18n.applyTranslations();
  
  // 事件監聽
  document.getElementById('close-rename-modal')?.addEventListener('click', () => {
    modal.remove();
  });
  
  document.getElementById('cancel-rename-btn')?.addEventListener('click', () => {
    modal.remove();
  });
  
  const confirmRename = () => {
    const newTitle = document.getElementById('rename-issue-title-input').value.trim();
    if (!newTitle) {
      toastError(i18n.t('host.messages.enterIssueTitle'));
      return;
    }
    
    const newDescription = document.getElementById('rename-issue-description-input').value.trim();
    renameIssue(issueId, newTitle, newDescription);
    modal.remove();
  };
  
  document.getElementById('confirm-rename-btn')?.addEventListener('click', confirmRename);
  
  // 聚焦到標題輸入框並選取所有文字
  const titleInput = document.getElementById('rename-issue-title-input');
  const descriptionInput = document.getElementById('rename-issue-description-input');
  
  setTimeout(() => {
    if (titleInput) {
      titleInput.focus();
      titleInput.select();
    }
  }, 100);
  
  // 按 Enter 鍵確認（在標題輸入框時）
  titleInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      confirmRename();
    }
  });
  
  // 在描述 textarea 中，Shift+Enter 換行，Enter 確認
  descriptionInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      confirmRename();
    }
  });
  
  // 按 ESC 鍵取消
  const handleEsc = (e) => {
    if (e.key === 'Escape') {
      modal.remove();
      document.removeEventListener('keydown', handleEsc);
    }
  };
  document.addEventListener('keydown', handleEsc);
}

/**
 * 重新命名 Issue
 * @param {string} issueId - Issue ID
 * @param {string} newTitle - 新標題
 * @param {string} newDescription - 新描述（可選）
 */
function renameIssue(issueId, newTitle, newDescription = '') {
  const issue = issues.find(i => i.id === issueId);
  if (!issue) return;
  
  const oldTitle = issue.title;
  issue.title = newTitle;
  issue.description = newDescription || '';
  storage.set('issues', issues);
  
  // 如果這是當前選中的 Issue，更新顯示
  if (currentIssue && currentIssue.id === issueId) {
    currentIssue.title = newTitle;
    currentIssue.description = newDescription || '';
    updateIssueDisplay();
  }
  
  updateIssuesList();
  toastSuccess(i18n.t('host.messages.issueRenamed', { oldTitle, newTitle }));
}

/**
 * 取得 Issue 最後一輪的結果統計
 * @param {Object} issue - Issue 物件
 * @returns {Object|null} 統計結果 { average, highest, lowest } 或 null
 */
function getLastRoundResult(issue) {
  if (!issue.rounds || issue.rounds.length === 0) {
    return null;
  }
  
  // 取得最後一輪
  const lastRound = issue.rounds[issue.rounds.length - 1];
  if (!lastRound.results || lastRound.results.length === 0) {
    return null;
  }
  
  // 計算統計
  const numericResults = lastRound.results
    .filter(r => r.card && !isNaN(parseFloat(r.card)))
    .map(r => parseFloat(r.card));
  
  if (numericResults.length === 0) {
    return {
      average: '-',
      highest: '-',
      lowest: '-'
    };
  }
  
  const average = (numericResults.reduce((a, b) => a + b, 0) / numericResults.length).toFixed(1);
  const highest = Math.max(...numericResults);
  const lowest = Math.min(...numericResults);
  
  return {
    average,
    highest,
    lowest
  };
}

/**
 * 更新頁面標題
 */
function updatePageTitle() {
  const pageTitle = document.getElementById('page-title');
  if (!pageTitle) return;
  
  const meetingPhase = document.getElementById('meeting-phase');
  if (meetingPhase && !meetingPhase.classList.contains('hidden')) {
    // 會議已建立，顯示「會議室」作為標題
    pageTitle.setAttribute('data-i18n', 'host.meetingRoom');
    pageTitle.textContent = i18n.t('host.meetingRoom');
  } else {
    // 尚未建立會議，顯示預設標題
    pageTitle.setAttribute('data-i18n', 'host.title');
    pageTitle.textContent = i18n.t('host.title');
  }
}

/**
 * 更新 Issue 顯示
 * 現在只更新 issues 列表中的 selected 狀態
 */
function updateIssueDisplay() {
  // 更新 issues 列表，確保 selected 狀態正確
  updateIssuesList();
}

/**
 * 儲存或更新會議記錄到歷史
 * 在會議建立和任何資料變更時調用
 */
function saveMeetingToHistory() {
  const meetingIdElement = document.getElementById('meeting-id');
  if (!meetingIdElement) return;
  
  const meetingId = meetingIdElement.textContent;
  if (!meetingId || meetingId === '------') return;
  
  const participants = hostManager ? hostManager.getParticipants().length : 0;
  const now = new Date().toISOString();
  
  // 準備所有 issue 的資料
  const issuesData = issues.map(issue => {
    // 如果當前 issue 有未保存的輪次結果，先保存
    let issueRounds = [...issue.rounds];
    if (issue.id === currentIssue?.id && currentResults) {
      const roundData = {
        roundNumber: currentRound,
        results: currentResults.map(r => ({
          name: r.name,
          card: r.card
        })),
        completedAt: now
      };
      // 如果該輪次還沒保存，添加到 rounds
      const existingRound = issueRounds.find(r => r.roundNumber === currentRound);
      if (!existingRound) {
        issueRounds.push(roundData);
      }
    }
    
    return {
      issueId: issue.id,
      issueTitle: issue.title,
      issueDescription: issue.description || null,
      rounds: issueRounds,
      finalDecision: issue.finalDecision || null,
      completedAt: issue.status === 'completed' ? (issue.completedAt || now) : null
    };
  });
  
  // 使用 addHistory 來更新會議記錄
  // 如果會議記錄不存在，會自動建立
  addHistory({
    mode: 'host',
    meetingId,
    meetingName: meetingName || null,
    participants: participants,
    // 傳遞所有 issue 資料（通過一個特殊的標記來表示這是完整更新）
    issues: issuesData,
    // 如果會議還在進行中，completedAt 為 null
    completedAt: null
  });
}

/**
 * 儲存 Issue 到歷史（完成時）
 */
function saveIssueToHistory() {
  if (!currentIssue) return;
  
  // 更新當前 issue 的完成狀態
  if (currentIssue.status !== 'completed') {
    currentIssue.status = 'completed';
    currentIssue.completedAt = new Date().toISOString();
    currentIssue.finalDecision = finalDecision;
    updateIssuesList();
  }
  
  // 更新會議記錄
  saveMeetingToHistory();
}


