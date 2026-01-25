/**
 * 記分板頁面
 */
import { t } from '../utils/i18n.js';
import { updateActiveNav } from '../components/navigation.js';
import { storage } from '../utils/storage.js';
import { router } from '../router.js';

// 記分板狀態
let matchState = {
  // 比賽設定（比賽開始前可修改，開始後鎖定）
  mode: 'doubles', // 'singles', 'doubles', 'mixed'（預設：雙打）
  setsToWin: 2, // 需要贏幾局（例如：2 = 三局兩勝）（預設：2）
  pointsToWin: 21, // 每局需要幾分獲勝（預設：21）
  allowDeuce: true, // 是否允許 deuce（預設：true）
  maxDeucePoints: 30, // deuce 最高到幾分（預設：30，國際規則）
  initialScores: {
    teamA: 0, // 隊伍 A 的初始分數（用於不平衡比賽）
    teamB: 0  // 隊伍 B 的初始分數（用於不平衡比賽）
  },
  initialServer: 'teamA', // 初始發球方（'teamA' 或 'teamB'）
  
  // 比賽狀態
  matchStarted: false, // 比賽是否已開始
  swapDisplay: false, // 是否交換顯示位置（僅視覺，不影響數據）
  
  // 名稱設定（可隨時修改）
  usePlayerNames: false,
  playerNames: {
    teamA: ['', ''],
    teamB: ['', '']
  },
  playerAvatars: {
    teamA: [null, null], // 存儲圖片編號（1-22），null 表示未選擇
    teamB: [null, null]
  },
  teamNames: {
    teamA: '', // 空字串表示使用預設名稱
    teamB: ''  // 空字串表示使用預設名稱
  },
  
  // 比賽進行狀態
  currentSet: 1,
  sets: {
    teamA: 0,
    teamB: 0
  },
  scores: {
    teamA: 0,
    teamB: 0
  },
  scoreHistory: [], // 得分歷史 Stack，記錄每次得分（'teamA' 或 'teamB'）
  server: 'teamA', // 'teamA' or 'teamB'（當前發球方，根據得分歷史計算）
  serverPlayer: 0, // 0 = player1, 1 = player2 (雙打/混雙時使用)
  lastServerPlayer: {
    teamA: 0, // 追蹤每個隊伍上次發球的選手（用於發球權轉換時輪換）
    teamB: 0
  },
  
  // 計時器狀態
  timer: {
    startTime: null, // 比賽開始時間（timestamp）
    pausedTime: null, // 暫停開始時間（timestamp）
    totalPausedDuration: 0, // 累計暫停時間（毫秒）
    isPaused: false // 是否暫停中
  }
};

// 計時器相關變數
let timerInterval = null;

// 圖片選擇器相關變數
let avatarSelectorEscHandler = null;

/**
 * 取得選手頭像 HTML
 */
function getPlayerAvatarHTML(team, playerIndex) {
  const avatarNumber = matchState.playerAvatars[team][playerIndex];
  if (avatarNumber) {
    return `<img src="images/avatars/png/upstream_${avatarNumber}.png" alt="Avatar ${avatarNumber}" class="player-avatar">`;
  }
  return '<span class="material-icons-round">person</span>';
}

/**
 * 取得選手頭像路徑
 */
function getPlayerAvatarSrc(team, playerIndex) {
  const avatarNumber = matchState.playerAvatars[team][playerIndex];
  if (avatarNumber) {
    return `images/avatars/png/upstream_${avatarNumber}.png`;
  }
  return null;
}

/**
 * 綁定圖片選擇按鈕事件
 */
function bindAvatarSelectButtons() {
  document.querySelectorAll('.btn-neu--avatar-select').forEach(btn => {
    // 移除舊的事件監聽器
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    newBtn.addEventListener('click', (e) => {
      const team = e.target.closest('.btn-neu--avatar-select').getAttribute('data-team');
      const playerIndex = parseInt(e.target.closest('.btn-neu--avatar-select').getAttribute('data-player'));
      openAvatarSelector(team, playerIndex);
    });
  });
}

/**
 * 打開圖片選擇器
 */
function openAvatarSelector(team, playerIndex) {
  // 比賽開始後不能修改頭像
  if (matchState.matchStarted) return;
  
  // 創建選擇器覆蓋層
  const overlay = document.createElement('div');
  overlay.id = 'avatar-selector-overlay';
  overlay.className = 'avatar-selector-overlay';
  
  // 創建選擇器容器
  const container = document.createElement('div');
  container.className = 'avatar-selector-container';
  
  // 標題
  const title = document.createElement('h3');
  title.className = 'avatar-selector-title';
  title.textContent = t('scoreboard.player.avatar.select');
  
  // 圖片網格
  const grid = document.createElement('div');
  grid.className = 'avatar-selector-grid';
  
  // 生成 22 個頭像選項
  for (let i = 1; i <= 22; i++) {
    const avatarItem = document.createElement('div');
    avatarItem.className = 'avatar-selector-item';
    if (matchState.playerAvatars[team][playerIndex] === i) {
      avatarItem.classList.add('avatar-selector-item--selected');
    }
    
    const avatarImg = document.createElement('img');
    avatarImg.src = `images/avatars/png/upstream_${i}.png`;
    avatarImg.alt = `Avatar ${i}`;
    avatarImg.className = 'avatar-selector-img';
    
    avatarItem.appendChild(avatarImg);
    avatarItem.addEventListener('click', () => {
      selectAvatar(team, playerIndex, i);
      closeAvatarSelector();
    });
    
    grid.appendChild(avatarItem);
  }
  
  // 關閉按鈕
  const closeBtn = document.createElement('button');
  closeBtn.className = 'btn-neu avatar-selector-close';
  closeBtn.innerHTML = '<span class="material-icons-round">close</span>';
  closeBtn.addEventListener('click', closeAvatarSelector);
  
  // 無頭像選項
  const noAvatarBtn = document.createElement('button');
  noAvatarBtn.className = 'btn-neu avatar-selector-no-avatar';
  noAvatarBtn.innerHTML = '<span class="material-icons-round">person_off</span> <span>' + t('scoreboard.player.avatar.none') + '</span>';
  noAvatarBtn.addEventListener('click', () => {
    selectAvatar(team, playerIndex, null);
    closeAvatarSelector();
  });
  
  container.appendChild(title);
  container.appendChild(grid);
  container.appendChild(noAvatarBtn);
  container.appendChild(closeBtn);
  overlay.appendChild(container);
  
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  
  // 點擊遮罩關閉
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeAvatarSelector();
    }
  });
  
  // ESC 鍵關閉
  if (avatarSelectorEscHandler) {
    document.removeEventListener('keydown', avatarSelectorEscHandler);
  }
  avatarSelectorEscHandler = (e) => {
    if (e.key === 'Escape') {
      closeAvatarSelector();
    }
  };
  document.addEventListener('keydown', avatarSelectorEscHandler);
}

/**
 * 選擇頭像
 */
function selectAvatar(team, playerIndex, avatarNumber) {
  // 比賽開始後不能修改頭像
  if (matchState.matchStarted) return;
  
  matchState.playerAvatars[team][playerIndex] = avatarNumber;
  saveMatchState();
  
  // 更新所有相關的按鈕顯示
  document.querySelectorAll(`[data-team="${team}"][data-player="${playerIndex}"]`).forEach(btn => {
    btn.innerHTML = getPlayerAvatarHTML(team, playerIndex);
  });
}

/**
 * 關閉圖片選擇器
 */
function closeAvatarSelector() {
  const overlay = document.getElementById('avatar-selector-overlay');
  if (overlay) {
    overlay.remove();
    document.body.style.overflow = '';
    
    // 移除 ESC 鍵監聽器
    if (avatarSelectorEscHandler) {
      document.removeEventListener('keydown', avatarSelectorEscHandler);
      avatarSelectorEscHandler = null;
    }
  }
}

/**
 * 渲染記分板頁面
 */
export function renderScoreboard({ path, params }) {
  const app = document.getElementById('app');
  updateActiveNav();
  
  // 從 localStorage 載入狀態
  loadMatchState();
  
  // 根據路由決定顯示設定頁面還是比賽頁面
  const isMatchPage = path === '/scoreboard/match';
  
  // 如果訪問設定頁面但比賽已開始，重定向到比賽頁面
  if (!isMatchPage && matchState.matchStarted) {
    router.navigate('/scoreboard/match');
    return;
  }
  
  // 如果訪問比賽頁面但比賽未開始，重定向到設定頁面
  if (isMatchPage && !matchState.matchStarted) {
    router.navigate('/scoreboard');
    return;
  }
  
  app.innerHTML = `
    <div class="scoreboard-page page-enter">
      <div class="container">
        <h1 class="page-title" data-i18n="scoreboard.title">記分板</h1>
        
        <!-- 比賽設定（比賽開始前顯示） -->
        <div class="scoreboard-settings" id="scoreboard-settings" style="display: ${isMatchPage ? 'none' : 'block'}">
          <h2 class="scoreboard-settings__title" data-i18n="scoreboard.settings.title">比賽設定</h2>
          
          <!-- 比賽類型 -->
          <div class="scoreboard-settings-group">
            <label class="scoreboard-settings__label" data-i18n="scoreboard.settings.mode">組隊形式</label>
            <div class="scoreboard-mode-selector">
              <button class="btn-neu btn-neu--small ${matchState.mode === 'singles' ? 'btn-neu--selected' : ''}" 
                      data-mode="singles" data-i18n="scoreboard.mode.singles">單打</button>
              <button class="btn-neu btn-neu--small ${matchState.mode === 'doubles' ? 'btn-neu--selected' : ''}" 
                      data-mode="doubles" data-i18n="scoreboard.mode.doubles">雙打</button>
              <button class="btn-neu btn-neu--small ${matchState.mode === 'mixed' ? 'btn-neu--selected' : ''}" 
                      data-mode="mixed" data-i18n="scoreboard.mode.mixed">混雙</button>
            </div>
          </div>
          
          <!-- 需要贏幾局 -->
          <div class="scoreboard-settings-group">
            <label class="scoreboard-settings__label" data-i18n="scoreboard.settings.sets-to-win">需要贏幾局</label>
            <select class="scoreboard-settings__select" id="sets-to-win">
              <option value="1" ${matchState.setsToWin === 1 ? 'selected' : ''}>1 局</option>
              <option value="2" ${matchState.setsToWin === 2 ? 'selected' : ''}>2 局（三局兩勝）</option>
              <option value="3" ${matchState.setsToWin === 3 ? 'selected' : ''}>3 局（五局三勝）</option>
            </select>
          </div>
          
          <!-- 每局需要幾分 -->
          <div class="scoreboard-settings-group">
            <label class="scoreboard-settings__label" data-i18n="scoreboard.settings.points-to-win">每局需要幾分</label>
            <input type="number" class="scoreboard-settings__input" id="points-to-win" 
                   min="1" max="30" value="${matchState.pointsToWin}">
          </div>
          
          <!-- 允許 Deuce -->
          <div class="scoreboard-settings-group">
            <label class="checkbox-neu scoreboard-settings__checkbox">
              <input type="checkbox" id="allow-deuce" ${matchState.allowDeuce ? 'checked' : ''}>
              <span class="checkbox-neu__box"></span>
              <span class="checkbox-neu__label" data-i18n="scoreboard.settings.allow-deuce">允許 Deuce</span>
            </label>
          </div>
          
          <!-- Deuce 最高到幾分 -->
          <div class="scoreboard-settings-group" id="max-deuce-points-group" 
               style="display: ${matchState.allowDeuce ? 'block' : 'none'}">
            <label class="scoreboard-settings__label" data-i18n="scoreboard.settings.max-deuce-points">Deuce 最高到幾分</label>
            <input type="number" class="scoreboard-settings__input" id="max-deuce-points" 
                   min="21" max="50" value="${matchState.maxDeucePoints}">
          </div>
          
          <!-- 初始分數（用於不平衡比賽） -->
          <div class="scoreboard-settings-group">
            <label class="scoreboard-settings__label" data-i18n="scoreboard.settings.initial-scores">初始分數（讓分賽）</label>
            <div class="scoreboard-initial-scores">
              <div class="scoreboard-initial-score-item">
                <label class="scoreboard-initial-score-label" data-i18n="scoreboard.team.a">隊伍 A</label>
                <input type="number" class="scoreboard-settings__input" id="initial-score-team-a" 
                       min="0" max="30" value="${matchState.initialScores.teamA}">
              </div>
              <div class="scoreboard-initial-score-item">
                <label class="scoreboard-initial-score-label" data-i18n="scoreboard.team.b">隊伍 B</label>
                <input type="number" class="scoreboard-settings__input" id="initial-score-team-b" 
                       min="0" max="30" value="${matchState.initialScores.teamB}">
              </div>
            </div>
          </div>
          
          <!-- 初始發球方 -->
          <div class="scoreboard-settings-group">
            <label class="scoreboard-settings__label" data-i18n="scoreboard.settings.initial-server">初始發球方</label>
            <div class="scoreboard-mode-selector">
              <button class="btn-neu btn-neu--small ${matchState.initialServer === 'teamA' ? 'btn-neu--selected' : ''}" 
                      data-initial-server="teamA" data-i18n="scoreboard.team.a">隊伍 A</button>
              <button class="btn-neu btn-neu--small ${matchState.initialServer === 'teamB' ? 'btn-neu--selected' : ''}" 
                      data-initial-server="teamB" data-i18n="scoreboard.team.b">隊伍 B</button>
            </div>
          </div>
          
          <!-- 隊伍和選手名稱設定 -->
          <div class="scoreboard-settings-group">
            <label class="scoreboard-settings__label" data-i18n="scoreboard.settings.team-names">隊伍名稱</label>
            <div class="scoreboard-settings-team-names">
              <!-- 隊伍 A -->
              <div class="scoreboard-settings-team-group">
                <label class="scoreboard-settings-team-group-label" data-i18n="scoreboard.team.a">隊伍 A</label>
                <div class="scoreboard-settings-team-group-content">
                  <div class="scoreboard-settings-team-name-item">
                    <input type="text" class="scoreboard-settings__input" id="settings-team-a-name" 
                           data-team="teamA"
                           placeholder="${t('scoreboard.team.a')}" 
                           value="${matchState.teamNames.teamA || ''}"
                           ${matchState.matchStarted ? 'disabled' : ''}>
                  </div>
                  ${matchState.mode !== 'singles' ? `
                  <div class="scoreboard-settings-player-name-item">
                    <div class="scoreboard-settings-player-input-wrapper">
                      <input type="text" class="scoreboard-settings__input" id="settings-team-a-player1" 
                             data-team="teamA" data-player="0"
                             placeholder="${t('scoreboard.player.name.placeholder.player1.right')}" 
                             value="${matchState.playerNames.teamA[0] || ''}"
                             ${matchState.matchStarted ? 'disabled' : ''}>
                      <button type="button" class="btn-neu btn-neu--avatar-select" 
                              data-team="teamA" data-player="0"
                              title="${t('scoreboard.player.avatar.select')}"
                              ${matchState.matchStarted ? 'disabled' : ''}>
                        ${getPlayerAvatarHTML('teamA', 0)}
                      </button>
                    </div>
                  </div>
                  <div class="scoreboard-settings-player-name-item">
                    <div class="scoreboard-settings-player-input-wrapper">
                      <input type="text" class="scoreboard-settings__input" id="settings-team-a-player2" 
                             data-team="teamA" data-player="1"
                             placeholder="${t('scoreboard.player.name.placeholder.player2.left')}" 
                             value="${matchState.playerNames.teamA[1] || ''}"
                             ${matchState.matchStarted ? 'disabled' : ''}>
                      <button type="button" class="btn-neu btn-neu--avatar-select" 
                              data-team="teamA" data-player="1"
                              title="${t('scoreboard.player.avatar.select')}"
                              ${matchState.matchStarted ? 'disabled' : ''}>
                        ${getPlayerAvatarHTML('teamA', 1)}
                      </button>
                    </div>
                  </div>
                  ` : ''}
                </div>
              </div>
              
              <!-- 隊伍 B -->
              <div class="scoreboard-settings-team-group">
                <label class="scoreboard-settings-team-group-label" data-i18n="scoreboard.team.b">隊伍 B</label>
                <div class="scoreboard-settings-team-group-content">
                  <div class="scoreboard-settings-team-name-item">
                    <input type="text" class="scoreboard-settings__input" id="settings-team-b-name" 
                           data-team="teamB"
                           placeholder="${t('scoreboard.team.b')}" 
                           value="${matchState.teamNames.teamB || ''}"
                           ${matchState.matchStarted ? 'disabled' : ''}>
                  </div>
                  ${matchState.mode !== 'singles' ? `
                  <div class="scoreboard-settings-player-name-item">
                    <div class="scoreboard-settings-player-input-wrapper">
                      <input type="text" class="scoreboard-settings__input" id="settings-team-b-player1" 
                             data-team="teamB" data-player="0"
                             placeholder="${t('scoreboard.player.name.placeholder.player1.right')}" 
                             value="${matchState.playerNames.teamB[0] || ''}"
                             ${matchState.matchStarted ? 'disabled' : ''}>
                      <button type="button" class="btn-neu btn-neu--avatar-select" 
                              data-team="teamB" data-player="0"
                              title="${t('scoreboard.player.avatar.select')}"
                              ${matchState.matchStarted ? 'disabled' : ''}>
                        ${getPlayerAvatarHTML('teamB', 0)}
                      </button>
                    </div>
                  </div>
                  <div class="scoreboard-settings-player-name-item">
                    <div class="scoreboard-settings-player-input-wrapper">
                      <input type="text" class="scoreboard-settings__input" id="settings-team-b-player2" 
                             data-team="teamB" data-player="1"
                             placeholder="${t('scoreboard.player.name.placeholder.player2.left')}" 
                             value="${matchState.playerNames.teamB[1] || ''}"
                             ${matchState.matchStarted ? 'disabled' : ''}>
                      <button type="button" class="btn-neu btn-neu--avatar-select" 
                              data-team="teamB" data-player="1"
                              title="${t('scoreboard.player.avatar.select')}"
                              ${matchState.matchStarted ? 'disabled' : ''}>
                        ${getPlayerAvatarHTML('teamB', 1)}
                      </button>
                    </div>
                  </div>
                  ` : ''}
                </div>
              </div>
            </div>
          </div>
          
          <button class="btn-neu btn-neu--primary" id="btn-start-match" data-i18n="scoreboard.button.start-match">開始比賽</button>
        </div>
        
        <!-- 比賽進行中的控制（比賽開始後顯示） -->
        <div class="scoreboard-controls" id="scoreboard-controls" style="display: ${isMatchPage ? 'flex' : 'none'}">
          <!-- 計時器 -->
          <div class="scoreboard-timer">
            <div class="scoreboard-timer__display" id="scoreboard-timer-display">00:00:00</div>
            <button class="btn-neu btn-neu--small" id="btn-timer-toggle" aria-label="暫停/繼續">
              <span class="material-icons-round">pause</span>
            </button>
          </div>
          
          <div class="scoreboard-actions">
            <button class="btn-neu btn-neu--small" id="btn-swap-display" title="交換顯示位置">
              <span class="material-icons-round">swap_horiz</span>
            </button>
            <button class="btn-neu btn-neu--small" id="btn-new-set" data-i18n="scoreboard.button.new-set">新局</button>
            <button class="btn-neu btn-neu--small" id="btn-new-match" data-i18n="scoreboard.button.new-match">新比賽</button>
          </div>
        </div>
        
        
        <!-- 局數顯示（只在比賽頁面顯示） -->
        <div class="scoreboard-sets" style="display: ${isMatchPage ? 'block' : 'none'}">
          <div class="scoreboard-sets-info">
            <span class="scoreboard-set-number" id="scoreboard-set-number"></span>
            <span class="scoreboard-sets-won" id="scoreboard-sets-won"></span>
          </div>
        </div>
        
        <!-- 分數顯示（只在比賽頁面顯示） -->
        <div class="scoreboard-scores" id="scoreboard-scores" style="display: ${isMatchPage ? 'grid' : 'none'}">
          ${renderScoreCards()}
        </div>
        
        <!-- 獲勝提示遮罩 -->
        <div class="scoreboard-winner-overlay" id="scoreboard-winner-overlay" style="display: none;">
          <div class="scoreboard-winner-modal">
            <button class="scoreboard-winner-close" id="scoreboard-winner-close" aria-label="關閉">
              <span class="material-icons-round">close</span>
            </button>
            <div class="scoreboard-winner-content">
              <div class="scoreboard-winner-icon">
                <span class="material-icons-round">emoji_events</span>
              </div>
              <h2 class="scoreboard-winner-title" id="scoreboard-winner-title"></h2>
              <p class="scoreboard-winner-message" id="scoreboard-winner-message"></p>
              <div class="scoreboard-winner-actions">
                <button class="btn-neu btn-neu--primary" id="scoreboard-winner-new-match" data-i18n="scoreboard.button.new-match">新比賽</button>
                <button class="btn-neu" id="scoreboard-winner-close-btn" data-i18n="common.close">關閉</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // 綁定事件
  bindScoreboardEvents();
  updateI18n();
  updateSetInfo();
  
  // 如果比賽已開始，禁用設定相關的輸入
  if (isMatchPage) {
    disableMatchSettings();
  }
}

/**
 * 渲染分數卡片（根據顯示順序）
 */
function renderScoreCards() {
  const teams = matchState.swapDisplay ? ['teamB', 'teamA'] : ['teamA', 'teamB'];
  
  return teams.map(team => {
    const isTeamA = team === 'teamA';
    const teamClass = isTeamA ? 'scoreboard-team--a' : 'scoreboard-team--b';
    const servingClass = matchState.server === team ? 'scoreboard-team--serving' : '';
    const teamLabel = isTeamA ? t('scoreboard.team.a') : t('scoreboard.team.b');
    
    return `
      <div class="scoreboard-team ${teamClass} ${servingClass}" data-team="${team}">
        <div class="scoreboard-team__header">
          <h3 class="scoreboard-team__name">${getTeamNameDisplay(team)}</h3>
        </div>
        
        <!-- 隊伍和選手名稱輸入 -->
        <div class="scoreboard-team__inputs">
          ${!matchState.matchStarted ? `
            <!-- 比賽開始前：顯示為 input -->
            <div class="scoreboard-team__name-input">
              <input type="text" class="scoreboard-team__name-field" 
                     id="${team}-name" 
                     data-team="${team}"
                     placeholder="${teamLabel}" 
                     value="${matchState.teamNames[team] || ''}">
            </div>
          ` : ''}
          ${matchState.mode !== 'singles' ? `
            <div class="scoreboard-team__player-inputs ${matchState.matchStarted ? 'scoreboard-team__player-inputs--started' : ''}">
              ${(() => {
                let leftPlayerIndex, rightPlayerIndex;
                
                if (matchState.matchStarted) {
                  // 比賽開始後：根據發球方獲取顯示順序
                  if (isInitialState()) {
                    // 初始狀態：選手2在左邊，選手1在右邊
                    leftPlayerIndex = 1;
                    rightPlayerIndex = 0;
                  } else {
                    // 有得分後：根據發球方獲取顯示順序（發球方在左邊）
                    [leftPlayerIndex, rightPlayerIndex] = getPlayerDisplayOrder(team);
                  }
                } else {
                  // 比賽開始前：初始順序（選手2在左邊，選手1在右邊）
                  leftPlayerIndex = 1;
                  rightPlayerIndex = 0;
                }
                
                const leftPlayerName = matchState.playerNames[team][leftPlayerIndex];
                const rightPlayerName = matchState.playerNames[team][rightPlayerIndex];
                
                if (matchState.matchStarted) {
                  // 比賽開始後：顯示為 text（只顯示選手名稱，不包含隊伍名稱）
                  const leftPlayerDisplayName = (leftPlayerName && leftPlayerName.trim()) ? leftPlayerName : t(`scoreboard.player.name.player${leftPlayerIndex + 1}`);
                  const rightPlayerDisplayName = (rightPlayerName && rightPlayerName.trim()) ? rightPlayerName : t(`scoreboard.player.name.player${rightPlayerIndex + 1}`);
                  return `
                    <div class="scoreboard-team__player-display-wrapper">
                      <div class="scoreboard-team__player-display scoreboard-team__player-display--left">
                        ${getPlayerAvatarHTML(team, leftPlayerIndex)}
                        <span class="scoreboard-team__player-text">${leftPlayerDisplayName}</span>
                      </div>
                    </div>
                    <div class="scoreboard-team__player-display-wrapper">
                      <div class="scoreboard-team__player-display scoreboard-team__player-display--right">
                        ${getPlayerAvatarHTML(team, rightPlayerIndex)}
                        <span class="scoreboard-team__player-text">${rightPlayerDisplayName}</span>
                      </div>
                    </div>
                  `;
                } else {
                  // 比賽開始前：顯示為 input（初始順序：選手2在左邊，選手1在右邊）
                  return `
                    <div class="scoreboard-team__player-input-wrapper">
                      <input type="text" class="scoreboard-team__player-field" 
                             id="${team}-player2" 
                             data-team="${team}"
                             data-player="1"
                             placeholder="${t('scoreboard.player.name.placeholder.player2.left')}" 
                             value="${leftPlayerName}">
                      <button type="button" class="btn-neu btn-neu--avatar-select" 
                              data-team="${team}" data-player="1"
                              title="${t('scoreboard.player.avatar.select')}">
                        ${getPlayerAvatarHTML(team, 1)}
                      </button>
                    </div>
                    <div class="scoreboard-team__player-input-wrapper">
                      <input type="text" class="scoreboard-team__player-field" 
                             id="${team}-player1" 
                             data-team="${team}"
                             data-player="0"
                             placeholder="${t('scoreboard.player.name.placeholder.player1.right')}" 
                             value="${rightPlayerName}">
                      <button type="button" class="btn-neu btn-neu--avatar-select" 
                              data-team="${team}" data-player="0"
                              title="${t('scoreboard.player.avatar.select')}">
                        ${getPlayerAvatarHTML(team, 0)}
                      </button>
                    </div>
                  `;
                }
              })()}
            </div>
          ` : ''}
        </div>
        
        <div class="scoreboard-team__score">${matchState.scores[team]}</div>
        <div class="scoreboard-team__actions">
          ${(() => {
            const canAdd = matchState.matchStarted && !hasWinner();
            const canSubtract = matchState.matchStarted && !hasWinner() && canUndoScore(team);
            return `
              <button class="btn-neu btn-neu--score ${!canAdd ? 'btn-neu--disabled' : ''}" 
                      data-team="${team}" data-action="add" 
                      ${!canAdd ? 'disabled' : ''}
                      data-i18n="scoreboard.button.add">+1</button>
              <button class="btn-neu btn-neu--score btn-neu--score-subtract ${!canSubtract ? 'btn-neu--disabled' : ''}" 
                      data-team="${team}" data-action="subtract" 
                      ${!canSubtract ? 'disabled' : ''}
                      data-i18n="scoreboard.button.subtract">-1</button>
            `;
          })()}
        </div>
      </div>
    `;
  }).join('');
}

/**
 * 取得隊伍名稱（用於數據邏輯）
 */
function getTeamName(team) {
  // 優先使用自定義的隊伍名稱
  if (matchState.teamNames[team]) {
    const customName = matchState.teamNames[team].trim();
    if (customName) {
      return customName;
    }
  }
  
  // 使用預設名稱
  return t(`scoreboard.team.${team === 'teamA' ? 'a' : 'b'}`);
}

/**
 * 取得隊伍名稱顯示（用於 UI 顯示，包含發球 icon）
 */
function getTeamNameDisplay(team) {
  const isServing = matchState.server === team;
  const teamName = getTeamName(team);
  
  // 只顯示隊伍名稱，不顯示選手名稱
  return isServing ? `<span class="material-icons-round scoreboard-team__serve-icon">sports_tennis</span>${teamName}` : teamName;
}

/**
 * 計算該隊伍的選手位置（根據得分歷史）
 * 返回 [leftPlayerIndex, rightPlayerIndex]
 * 初始狀態：選手2在左邊，選手1在右邊
 * 發球權轉換時：發球方在左邊
 * 發球方得分時：選手位置輪換（左右互換），但發球者繼續在左邊發球
 */
function calculatePlayerPosition(team) {
  if (matchState.mode === 'singles') {
    return [0, 1]; // 單打模式不適用
  }
  
  // 為每個隊伍分別追蹤選手位置和連續得分次數
  let playerPositions = {
    teamA: { left: 1, right: 0 }, // 初始狀態：選手2在左邊，選手1在右邊
    teamB: { left: 1, right: 0 }  // 初始狀態：選手2在左邊，選手1在右邊
  };
  
  let consecutiveScores = {
    teamA: 0, // 連續得分次數
    teamB: 0
  };
  
  // 初始發球方
  let currentServer = matchState.initialServer || 'teamA';
  let currentServerPlayer = 0;
  let lastServerPlayer = {
    teamA: 0, // 初始發球方是 A，選手1發球
    teamB: 0  // B 初始沒有發過球
  };
  
  // 根據得分歷史計算選手位置
  for (let i = 0; i < matchState.scoreHistory.length; i++) {
    const scoringTeam = matchState.scoreHistory[i];
    
    if (currentServer !== scoringTeam) {
      // 發球權轉換到得分方
      currentServer = scoringTeam;
      // 重置連續得分次數
      consecutiveScores[scoringTeam] = 1;
      consecutiveScores[scoringTeam === 'teamA' ? 'teamB' : 'teamA'] = 0;
      
      // 雙打/混雙：發球權轉換時，輪換發球者
      if (matchState.mode !== 'singles') {
        // 輪換發球者（上次是 player1，這次是 player2；上次是 player2，這次是 player1）
        lastServerPlayer[scoringTeam] = lastServerPlayer[scoringTeam] === 0 ? 1 : 0;
        currentServerPlayer = lastServerPlayer[scoringTeam];
      }
      
      // 發球權轉換時：不改變位置，保持上一次的位置
      // 位置只在連續得分時才輪換
      // 發球選手會輪換，位置保持不變
      // 注意：羽球規則中，發球選手位置根據分數奇偶決定（奇數左邊、偶數右邊）
      // 但這裡我們保持位置不變，只在連續得分時輪換位置
    } else {
      // 發球方得分：連續得分次數增加
      consecutiveScores[scoringTeam]++;
      
      // 發球方連續得分：該隊伍的選手位置輪換（左右互換）
      // 每連續得分一次，位置輪換一次
      const temp = playerPositions[scoringTeam].left;
      playerPositions[scoringTeam].left = playerPositions[scoringTeam].right;
      playerPositions[scoringTeam].right = temp;
      
      // 發球方得分：不輪換發球者，由同一個人繼續發球
      // 更新 lastServerPlayer 以保持追蹤（發球者不變）
      if (matchState.mode !== 'singles') {
        lastServerPlayer[scoringTeam] = currentServerPlayer;
      }
    }
  }
  
  return [playerPositions[team].left, playerPositions[team].right];
}

/**
 * 取得選手的顯示順序（根據發球方）
 * 返回 [leftPlayerIndex, rightPlayerIndex]
 * 初始狀態：選手2在左邊，選手1在右邊
 * 發球方站左邊
 */
function getPlayerDisplayOrder(team) {
  return calculatePlayerPosition(team);
}

/**
 * 檢查是否為初始狀態（比賽剛開始，還沒有任何得分）
 */
function isInitialState() {
  return matchState.scoreHistory.length === 0;
}

/**
 * 根據得分歷史計算當前發球方
 */
function calculateServer() {
  // 初始發球方
  let currentServer = matchState.initialServer || 'teamA';
  let currentServerPlayer = 0;
  let lastServerPlayer = {
    teamA: 0,
    teamB: 0
  };
  
  // 根據得分歷史計算發球方
  for (let i = 0; i < matchState.scoreHistory.length; i++) {
    const scoringTeam = matchState.scoreHistory[i];
    
    if (currentServer !== scoringTeam) {
      // 發球權轉換到得分方
      currentServer = scoringTeam;
      // 雙打/混雙：發球權轉換時，輪換發球者
      if (matchState.mode !== 'singles') {
        lastServerPlayer[scoringTeam] = lastServerPlayer[scoringTeam] === 0 ? 1 : 0;
        currentServerPlayer = lastServerPlayer[scoringTeam];
      }
    } else {
      // 發球方得分：不輪換發球者，由同一個人繼續發球
      if (matchState.mode !== 'singles') {
        lastServerPlayer[scoringTeam] = currentServerPlayer;
      }
    }
  }
  
  return {
    server: currentServer,
    serverPlayer: currentServerPlayer,
    lastServerPlayer: lastServerPlayer
  };
}

/**
 * 取得發球指示器文字
 */
function getServerIndicator(team) {
  if (matchState.server !== team) {
    return '';
  }
  
  // 單打模式：只顯示「發球」
  if (matchState.mode === 'singles') {
    return t('scoreboard.server');
  }
  
  // 雙打/混雙模式：顯示具體是哪個選手發球
  if (matchState.usePlayerNames && matchState.playerNames[team][matchState.serverPlayer]) {
    const playerName = matchState.playerNames[team][matchState.serverPlayer];
    return `${playerName} ${t('scoreboard.server')}`;
  } else {
    // 沒有輸入名稱時，顯示「選手 1/2 發球」
    const playerNum = matchState.serverPlayer === 0 ? '1' : '2';
    return t(`scoreboard.player.name.team.${team === 'teamA' ? 'a' : 'b'}.player${playerNum}`) + ' ' + t('scoreboard.server');
  }
}

/**
 * 綁定記分板事件
 */
function bindScoreboardEvents() {
  // 模式選擇（只在比賽開始前有效）
  document.querySelectorAll('[data-mode]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (!matchState.matchStarted) {
        const mode = e.target.getAttribute('data-mode');
        changeMode(mode);
      }
    });
  });
  
  // 初始發球方選擇（只在比賽開始前有效）
  document.querySelectorAll('[data-initial-server]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (!matchState.matchStarted) {
        const server = e.target.getAttribute('data-initial-server');
        changeInitialServer(server);
      }
    });
  });
  
  // 比賽設定
  const setsToWinSelect = document.getElementById('sets-to-win');
  if (setsToWinSelect) {
    setsToWinSelect.addEventListener('change', (e) => {
      if (!matchState.matchStarted) {
        matchState.setsToWin = parseInt(e.target.value);
        saveMatchState();
      }
    });
  }
  
  const pointsToWinInput = document.getElementById('points-to-win');
  if (pointsToWinInput) {
    pointsToWinInput.addEventListener('change', (e) => {
      if (!matchState.matchStarted) {
        const value = parseInt(e.target.value);
        if (value >= 1 && value <= 30) {
          matchState.pointsToWin = value;
          // 如果允許 deuce，確保 maxDeucePoints 不小於 pointsToWin
          if (matchState.allowDeuce && matchState.maxDeucePoints < value) {
            matchState.maxDeucePoints = value;
            const maxDeuceInput = document.getElementById('max-deuce-points');
            if (maxDeuceInput) {
              maxDeuceInput.value = value;
            }
          }
          saveMatchState();
        }
      }
    });
  }
  
  const allowDeuceCheckbox = document.getElementById('allow-deuce');
  if (allowDeuceCheckbox) {
    allowDeuceCheckbox.addEventListener('change', (e) => {
      if (!matchState.matchStarted) {
        matchState.allowDeuce = e.target.checked;
        const maxDeuceGroup = document.getElementById('max-deuce-points-group');
        if (maxDeuceGroup) {
          maxDeuceGroup.style.display = e.target.checked ? 'block' : 'none';
        }
        saveMatchState();
      }
    });
  }
  
  const maxDeucePointsInput = document.getElementById('max-deuce-points');
  if (maxDeucePointsInput) {
    maxDeucePointsInput.addEventListener('change', (e) => {
      if (!matchState.matchStarted) {
        const value = parseInt(e.target.value);
        if (value >= matchState.pointsToWin && value <= 50) {
          matchState.maxDeucePoints = value;
          saveMatchState();
        }
      }
    });
  }
  
  // 初始分數輸入
  const initialScoreTeamA = document.getElementById('initial-score-team-a');
  if (initialScoreTeamA) {
    initialScoreTeamA.addEventListener('change', (e) => {
      if (!matchState.matchStarted) {
        const value = parseInt(e.target.value) || 0;
        if (value >= 0 && value <= 30) {
          matchState.initialScores.teamA = value;
          saveMatchState();
        }
      }
    });
  }
  
  const initialScoreTeamB = document.getElementById('initial-score-team-b');
  if (initialScoreTeamB) {
    initialScoreTeamB.addEventListener('change', (e) => {
      if (!matchState.matchStarted) {
        const value = parseInt(e.target.value) || 0;
        if (value >= 0 && value <= 30) {
          matchState.initialScores.teamB = value;
          saveMatchState();
        }
      }
    });
  }
  
  // 開始比賽按鈕
  const startMatchBtn = document.getElementById('btn-start-match');
  if (startMatchBtn) {
    startMatchBtn.addEventListener('click', () => {
      startMatch();
    });
  }
  
  // 綁定設定頁面的隊伍和選手名稱輸入事件
  bindSettingsTeamInputEvents();
  
  // 綁定比賽頁面的隊伍和選手名稱輸入事件
  bindTeamInputEvents();
  
  // 綁定分數按鈕事件
  bindScoreButtons();
  
  // 綁定圖片選擇按鈕事件
  bindAvatarSelectButtons();
  
  // 新局按鈕
  const btnNewSet = document.getElementById('btn-new-set');
  if (btnNewSet) {
    btnNewSet.addEventListener('click', () => {
      newSet();
    });
  }
  
  // 新比賽按鈕
  const btnNewMatch = document.getElementById('btn-new-match');
  if (btnNewMatch) {
    btnNewMatch.addEventListener('click', () => {
      newMatch();
    });
  }
  
  // 交換顯示位置按鈕
  const btnSwapDisplay = document.getElementById('btn-swap-display');
  if (btnSwapDisplay) {
    btnSwapDisplay.addEventListener('click', () => {
      swapDisplay();
    });
  }
  
  // 計時器暫停/繼續按鈕
  const btnTimerToggle = document.getElementById('btn-timer-toggle');
  if (btnTimerToggle) {
    btnTimerToggle.addEventListener('click', () => {
      toggleTimer();
    });
  }
  
  // 如果比賽已開始且未暫停，啟動計時器
  if (matchState.matchStarted && !matchState.timer.isPaused && matchState.timer.startTime) {
    startTimer();
  } else if (matchState.matchStarted && matchState.timer.isPaused) {
    // 如果比賽已開始但處於暫停狀態，更新計時器顯示
    updateTimerDisplay();
    updateTimerButton();
  }
}

/**
 * 更新模式按鈕狀態
 */
function updateModeButtons() {
  document.querySelectorAll('[data-mode]').forEach(btn => {
    const mode = btn.getAttribute('data-mode');
    if (mode === matchState.mode) {
      btn.classList.add('btn-neu--selected');
    } else {
      btn.classList.remove('btn-neu--selected');
    }
  });
}

/**
 * 改變比賽模式
 */
function changeMode(mode) {
  if (matchState.matchStarted) return; // 比賽開始後不能修改
  
  matchState.mode = mode;
  // 切換模式時，重置發球者為 player1
  matchState.serverPlayer = 0;
  matchState.lastServerPlayer.teamA = 0;
  matchState.lastServerPlayer.teamB = 0;
  saveMatchState();
  
  // 只更新按鈕狀態，不重新渲染整個頁面
  updateModeButtons();
}

/**
 * 改變初始發球方
 */
function changeInitialServer(server) {
  if (matchState.matchStarted) return; // 比賽開始後不能修改
  
  matchState.initialServer = server;
  saveMatchState();
  
  // 只更新按鈕狀態，不重新渲染整個頁面
  updateInitialServerButtons();
}

/**
 * 更新初始發球方按鈕狀態
 */
function updateInitialServerButtons() {
  document.querySelectorAll('[data-initial-server]').forEach(btn => {
    const server = btn.getAttribute('data-initial-server');
    if (server === matchState.initialServer) {
      btn.classList.add('btn-neu--selected');
    } else {
      btn.classList.remove('btn-neu--selected');
    }
  });
}

/**
 * 開始比賽
 */
function startMatch() {
  matchState.matchStarted = true;
  matchState.currentSet = 1;
  matchState.sets.teamA = 0;
  matchState.sets.teamB = 0;
  // 使用初始分數來初始化比賽分數
  matchState.scores.teamA = matchState.initialScores.teamA || 0;
  matchState.scores.teamB = matchState.initialScores.teamB || 0;
  matchState.scoreHistory = []; // 重置得分歷史
  // 使用設定的初始發球方
  matchState.serverPlayer = 0;
  matchState.lastServerPlayer.teamA = 0;
  matchState.lastServerPlayer.teamB = 0;
  // 根據得分歷史計算發球方（比賽開始沒有得分，所以就是初始發球方）
  const serverState = calculateServer();
  matchState.server = serverState.server;
  matchState.serverPlayer = serverState.serverPlayer;
  matchState.lastServerPlayer.teamA = serverState.lastServerPlayer.teamA;
  matchState.lastServerPlayer.teamB = serverState.lastServerPlayer.teamB;
  
  // 初始化計時器
  matchState.timer.startTime = Date.now();
  matchState.timer.pausedTime = null;
  matchState.timer.totalPausedDuration = 0;
  matchState.timer.isPaused = false;
  
  // 保存設定（作為下次的預設值）
  saveMatchSettings();
  saveMatchState();
  
  // 導航到比賽頁面
  router.navigate('/scoreboard/match');
  
  // 啟動計時器
  startTimer();
}

/**
 * 禁用比賽設定（比賽開始後）
 */
function disableMatchSettings() {
  const settings = document.getElementById('scoreboard-settings');
  if (settings) {
    settings.style.display = 'none';
  }
  const controls = document.getElementById('scoreboard-controls');
  if (controls) {
    controls.style.display = 'flex';
  }
}

/**
 * 更新分數
 */
function updateScore(team, action) {
  if (action === 'add') {
    matchState.scores[team]++;
    // 記錄得分歷史
    matchState.scoreHistory.push(team);
    
    // 根據得分歷史計算發球方
    const serverState = calculateServer();
    matchState.server = serverState.server;
    matchState.serverPlayer = serverState.serverPlayer;
    matchState.lastServerPlayer.teamA = serverState.lastServerPlayer.teamA;
    matchState.lastServerPlayer.teamB = serverState.lastServerPlayer.teamB;
  } else if (action === 'subtract') {
    // 檢查是否可以撤銷（必須是最後一次得分是該隊伍）
    if (matchState.scoreHistory.length > 0 && matchState.scoreHistory[matchState.scoreHistory.length - 1] === team) {
      matchState.scores[team]--;
      // 移除最後一次得分記錄
      matchState.scoreHistory.pop();
      
      // 根據剩餘的得分歷史重新計算發球方
      const serverState = calculateServer();
      matchState.server = serverState.server;
      matchState.serverPlayer = serverState.serverPlayer;
      matchState.lastServerPlayer.teamA = serverState.lastServerPlayer.teamA;
      matchState.lastServerPlayer.teamB = serverState.lastServerPlayer.teamB;
    } else {
      // 不能撤銷，直接返回
      return;
    }
  }
  
  // 檢查是否獲勝
  const winner = checkSetWinner();
  if (winner) {
    matchState.sets[winner]++;
    showWinner(winner);
    
    // 檢查是否整場比賽獲勝
    if (matchState.sets[winner] >= matchState.setsToWin) {
      setTimeout(() => {
        showMatchWinner(winner);
      }, 1000);
    } else {
      // 下一局
      setTimeout(() => {
        newSet();
      }, 2000);
    }
  } else {
    saveMatchState();
    updateScoreboard();
  }
}

/**
 * 檢查是否可以撤銷該隊伍的最後一次得分
 */
function canUndoScore(team) {
  return matchState.scoreHistory.length > 0 && 
         matchState.scoreHistory[matchState.scoreHistory.length - 1] === team;
}

/**
 * 檢查是否有獲勝者（局數獲勝或整場比賽獲勝）
 */
function hasWinner() {
  // 檢查是否有隊伍達到獲勝局數
  return matchState.sets.teamA >= matchState.setsToWin || 
         matchState.sets.teamB >= matchState.setsToWin;
}

/**
 * 檢查局數獲勝者
 */
function checkSetWinner() {
  const { teamA, teamB } = matchState.scores;
  const { pointsToWin, allowDeuce, maxDeucePoints } = matchState;
  
  // 不允許 deuce 的情況：先達到目標分數者獲勝
  if (!allowDeuce) {
    if (teamA >= pointsToWin) {
      return 'teamA';
    }
    if (teamB >= pointsToWin) {
      return 'teamB';
    }
    return null;
  }
  
  // 允許 deuce 的情況
  // 先達到目標分數且領先 2 分
  if (teamA >= pointsToWin && teamA - teamB >= 2) {
    return 'teamA';
  }
  if (teamB >= pointsToWin && teamB - teamA >= 2) {
    return 'teamB';
  }
  
  // 達到最大 deuce 分數者獲勝
  if (teamA === maxDeucePoints || teamB === maxDeucePoints) {
    return teamA === maxDeucePoints ? 'teamA' : 'teamB';
  }
  
  return null;
}

/**
 * 顯示獲勝者（單局）
 */
function showWinner(team) {
  const winnerEl = document.getElementById('scoreboard-winner');
  if (winnerEl) {
    winnerEl.textContent = `${getTeamName(team)} ${t('scoreboard.winner').replace('{team}', '')}`;
    winnerEl.style.display = 'block';
  }
}

/**
 * 顯示整場比賽獲勝者
 */
function showMatchWinner(team) {
  const overlay = document.getElementById('scoreboard-winner-overlay');
  const titleEl = document.getElementById('scoreboard-winner-title');
  const messageEl = document.getElementById('scoreboard-winner-message');
  
  if (overlay && titleEl && messageEl) {
    const teamName = getTeamName(team);
    titleEl.textContent = `${teamName} ${t('scoreboard.winner').replace('{team}', '')}`;
    messageEl.textContent = `${t('scoreboard.sets.won')}: ${matchState.sets.teamA} - ${matchState.sets.teamB}`;
    
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // 綁定關閉事件
    bindWinnerModalEvents();
    updateI18n();
  }
}

/**
 * 關閉獲勝提示框
 */
function closeWinnerModal() {
  const overlay = document.getElementById('scoreboard-winner-overlay');
  if (overlay) {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
    
    // 移除 ESC 鍵監聽器
    if (winnerModalEscHandler) {
      document.removeEventListener('keydown', winnerModalEscHandler);
      winnerModalEscHandler = null;
    }
  }
}

// ESC 鍵處理器（用於獲勝提示框）
let winnerModalEscHandler = null;

/**
 * 綁定獲勝提示框事件
 */
function bindWinnerModalEvents() {
  // 關閉按鈕
  const closeBtn = document.getElementById('scoreboard-winner-close');
  const closeBtn2 = document.getElementById('scoreboard-winner-close-btn');
  const newMatchBtn = document.getElementById('scoreboard-winner-new-match');
  const overlay = document.getElementById('scoreboard-winner-overlay');
  
  // 移除舊的事件監聽器（如果有的話）
  if (closeBtn) {
    const newCloseBtn = closeBtn.cloneNode(true);
    closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
    newCloseBtn.addEventListener('click', closeWinnerModal);
  }
  
  if (closeBtn2) {
    const newCloseBtn2 = closeBtn2.cloneNode(true);
    closeBtn2.parentNode.replaceChild(newCloseBtn2, closeBtn2);
    newCloseBtn2.addEventListener('click', closeWinnerModal);
  }
  
  if (newMatchBtn) {
    const newNewMatchBtn = newMatchBtn.cloneNode(true);
    newMatchBtn.parentNode.replaceChild(newNewMatchBtn, newMatchBtn);
    newNewMatchBtn.addEventListener('click', () => {
      closeWinnerModal();
      newMatch();
    });
  }
  
  // 點擊遮罩關閉（使用 once 確保只觸發一次）
  if (overlay) {
    const handleOverlayClick = (e) => {
      if (e.target === overlay) {
        closeWinnerModal();
      }
    };
    overlay.removeEventListener('click', handleOverlayClick);
    overlay.addEventListener('click', handleOverlayClick);
  }
  
  // ESC 鍵關閉
  if (winnerModalEscHandler) {
    document.removeEventListener('keydown', winnerModalEscHandler);
  }
  
  winnerModalEscHandler = (e) => {
    if (e.key === 'Escape' && overlay && overlay.style.display === 'flex') {
      closeWinnerModal();
    }
  };
  document.addEventListener('keydown', winnerModalEscHandler);
}

/**
 * 新局
 */
function newSet() {
  matchState.currentSet++;
  matchState.scores.teamA = 0;
  matchState.scores.teamB = 0;
  matchState.scoreHistory = []; // 重置得分歷史
  // 發球方輪換（簡化：第一局 A 發球，第二局 B 發球，第三局 A 發球）
  matchState.initialServer = matchState.currentSet % 2 === 1 ? 'teamA' : 'teamB';
  // 雙打/混雙：新局從 player1 開始發球
  if (matchState.mode !== 'singles') {
    matchState.serverPlayer = 0;
    matchState.lastServerPlayer.teamA = 0;
    matchState.lastServerPlayer.teamB = 0;
  }
  // 根據得分歷史計算發球方（新局沒有得分，所以就是初始發球方）
  const serverState = calculateServer();
  matchState.server = serverState.server;
  matchState.serverPlayer = serverState.serverPlayer;
  matchState.lastServerPlayer.teamA = serverState.lastServerPlayer.teamA;
  matchState.lastServerPlayer.teamB = serverState.lastServerPlayer.teamB;
  saveMatchState();
  updateScoreboard();
  
  const winnerEl = document.getElementById('scoreboard-winner');
  if (winnerEl) {
    winnerEl.style.display = 'none';
  }
}

/**
 * 新比賽
 */
function newMatch() {
  // 停止計時器
  stopTimer();
  
  matchState.matchStarted = false; // 重置比賽狀態，讓設定畫面顯示
  matchState.currentSet = 1;
  matchState.sets.teamA = 0;
  matchState.sets.teamB = 0;
  matchState.scores.teamA = 0;
  matchState.scores.teamB = 0;
  matchState.scoreHistory = []; // 重置得分歷史
  matchState.server = 'teamA';
  matchState.serverPlayer = 0;
  matchState.lastServerPlayer.teamA = 0;
  matchState.lastServerPlayer.teamB = 0;
  
  // 重置計時器
  matchState.timer.startTime = null;
  matchState.timer.pausedTime = null;
  matchState.timer.totalPausedDuration = 0;
  matchState.timer.isPaused = false;
  
  // 保留隊伍名稱和選手名稱設定
  saveMatchState();
  // 導航回設定頁面
  router.navigate('/scoreboard');
}

/**
 * 綁定設定頁面的隊伍和選手名稱輸入事件
 */
function bindSettingsTeamInputEvents() {
  // 設定頁面的隊伍名稱輸入
  document.querySelectorAll('#settings-team-a-name, #settings-team-b-name').forEach(input => {
    input.addEventListener('input', (e) => {
      if (matchState.matchStarted) return; // 比賽開始後不能修改
      const team = e.target.getAttribute('data-team');
      matchState.teamNames[team] = e.target.value;
      saveMatchState();
      // 如果比賽頁面已顯示，同步更新
      updateTeamNames();
    });
  });
  
  // 設定頁面的選手名稱輸入
  document.querySelectorAll('#settings-team-a-player1, #settings-team-a-player2, #settings-team-b-player1, #settings-team-b-player2').forEach(input => {
    input.addEventListener('input', (e) => {
      if (matchState.matchStarted) return; // 比賽開始後不能修改
      const team = e.target.getAttribute('data-team');
      const playerIndex = parseInt(e.target.getAttribute('data-player'));
      matchState.playerNames[team][playerIndex] = e.target.value;
      saveMatchState();
      // 如果比賽頁面已顯示，同步更新
      updateTeamNames();
    });
  });
  
}

/**
 * 綁定比賽頁面的隊伍和選手名稱輸入事件
 */
function bindTeamInputEvents() {
  // 隊伍名稱輸入（在 team card 內）
  document.querySelectorAll('.scoreboard-team__name-field').forEach(input => {
    // 移除舊的事件監聽器（如果有的話）
    const newInput = input.cloneNode(true);
    input.parentNode.replaceChild(newInput, input);
    
    newInput.addEventListener('input', (e) => {
      if (matchState.matchStarted) return; // 比賽開始後不能修改
      const team = e.target.getAttribute('data-team');
      matchState.teamNames[team] = e.target.value;
      saveMatchState();
      updateTeamNames();
      // 同步更新設定頁面的輸入框
      const settingsInput = document.getElementById(`settings-${team}-name`);
      if (settingsInput) {
        settingsInput.value = e.target.value;
      }
    });
  });
  
  // 選手名稱輸入（在 team card 內）
  document.querySelectorAll('.scoreboard-team__player-field').forEach(input => {
    // 移除舊的事件監聽器（如果有的話）
    const newInput = input.cloneNode(true);
    input.parentNode.replaceChild(newInput, input);
    
    newInput.addEventListener('input', (e) => {
      if (matchState.matchStarted) return; // 比賽開始後不能修改
      const team = e.target.getAttribute('data-team');
      const playerIndex = parseInt(e.target.getAttribute('data-player'));
      matchState.playerNames[team][playerIndex] = e.target.value;
      saveMatchState();
      updateTeamNames();
      // 同步更新設定頁面的輸入框
      const settingsInput = document.getElementById(`settings-${team}-player${playerIndex + 1}`);
      if (settingsInput) {
        settingsInput.value = e.target.value;
      }
    });
  });
  
}

/**
 * 綁定分數按鈕事件
 */
function bindScoreButtons() {
  // 分數按鈕（只在比賽開始後有效）
  document.querySelectorAll('[data-action]').forEach(btn => {
    // 移除舊的事件監聽器（如果有的話）
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    newBtn.addEventListener('click', (e) => {
      if (matchState.matchStarted) {
        const team = e.target.getAttribute('data-team');
        const action = e.target.getAttribute('data-action');
        updateScore(team, action);
      }
    });
  });
}

/**
 * 交換顯示位置
 */
function swapDisplay() {
  matchState.swapDisplay = !matchState.swapDisplay;
  saveMatchState();
  
  // 重新渲染分數卡片
  const scoresContainer = document.getElementById('scoreboard-scores');
  if (scoresContainer) {
    scoresContainer.innerHTML = renderScoreCards();
    
    // 重新綁定事件
    bindTeamInputEvents();
    bindScoreButtons();
    bindAvatarSelectButtons();
    
    // 更新發球標示
    updateServerIndicators();
  }
}

/**
 * 更新記分板顯示
 */
function updateScoreboard() {
  // 如果比賽已開始，需要重新渲染整個卡片以更新選手順序
  if (matchState.matchStarted) {
    const scoresContainer = document.getElementById('scoreboard-scores');
    if (scoresContainer) {
      scoresContainer.innerHTML = renderScoreCards();
      // 重新綁定分數按鈕事件
      bindScoreButtons();
    }
  }
  
  // 更新分數（根據實際的 team，不是顯示順序）
  document.querySelectorAll('.scoreboard-team').forEach(el => {
    const team = el.getAttribute('data-team');
    if (team) {
      const scoreEl = el.querySelector('.scoreboard-team__score');
      if (scoreEl) {
        scoreEl.textContent = matchState.scores[team];
      }
      
      // 更新隊伍名稱（包含發球 icon）
      const nameEl = el.querySelector('.scoreboard-team__name');
      if (nameEl) {
        nameEl.innerHTML = getTeamNameDisplay(team);
      }
    }
  });
  
  // 更新發球方
  document.querySelectorAll('.scoreboard-team').forEach(el => {
    el.classList.remove('scoreboard-team--serving');
  });
  const servingTeam = document.querySelector(`[data-team="${matchState.server}"]`);
  if (servingTeam) {
    servingTeam.classList.add('scoreboard-team--serving');
  }
  
  // 更新發球標示
  updateServerIndicators();
  
  // 更新按鈕狀態（根據得分歷史和比賽狀態）
  updateScoreButtons();
  
  updateSetInfo();
}

/**
 * 更新分數按鈕的啟用/禁用狀態
 */
function updateScoreButtons() {
  const hasWinner = matchState.sets.teamA >= matchState.setsToWin || 
                    matchState.sets.teamB >= matchState.setsToWin;
  
  document.querySelectorAll('[data-action]').forEach(btn => {
    const team = btn.getAttribute('data-team');
    const action = btn.getAttribute('data-action');
    
    if (action === 'add') {
      // +1 按鈕：比賽開始且沒有獲勝者時啟用
      const canAdd = matchState.matchStarted && !hasWinner;
      btn.disabled = !canAdd;
      if (canAdd) {
        btn.classList.remove('btn-neu--disabled');
      } else {
        btn.classList.add('btn-neu--disabled');
      }
    } else if (action === 'subtract') {
      // -1 按鈕：比賽開始、沒有獲勝者、且該隊伍是最後一次得分時啟用
      const canSubtract = matchState.matchStarted && !hasWinner && canUndoScore(team);
      btn.disabled = !canSubtract;
      if (canSubtract) {
        btn.classList.remove('btn-neu--disabled');
      } else {
        btn.classList.add('btn-neu--disabled');
      }
    }
  });
}

/**
 * 更新局數資訊
 */
function updateSetInfo() {
  const setNumberEl = document.getElementById('scoreboard-set-number');
  if (setNumberEl) {
    setNumberEl.textContent = t('scoreboard.set').replace('{n}', matchState.currentSet);
  }
  
  const setsWonEl = document.getElementById('scoreboard-sets-won');
  if (setsWonEl) {
    // 根據交換狀態決定顯示順序
    const team1 = matchState.swapDisplay ? 'teamB' : 'teamA';
    const team2 = matchState.swapDisplay ? 'teamA' : 'teamB';
    setsWonEl.textContent = `${t('scoreboard.sets.won')}: ${getTeamName(team1)} ${matchState.sets[team1]} - ${matchState.sets[team2]} ${getTeamName(team2)}`;
  }
}

/**
 * 更新發球標示（現在通過 getTeamNameDisplay 在名字前顯示 icon）
 */
function updateServerIndicators() {
  // 發球標示現在直接顯示在名字前面，只需要更新名字顯示即可
  updateTeamNames();
}

/**
 * 更新隊伍名稱顯示
 */
function updateTeamNames() {
  document.querySelectorAll('.scoreboard-team').forEach(el => {
    const team = el.getAttribute('data-team');
    if (team) {
      const nameEl = el.querySelector('.scoreboard-team__name');
      if (nameEl) {
        nameEl.innerHTML = getTeamNameDisplay(team);
      }
    }
  });
  
  updateSetInfo();
}


/**
 * 儲存比賽狀態
 */
function saveMatchState() {
  storage.set('scoreboard_match_state', matchState);
}

/**
 * 載入比賽狀態
 */
function loadMatchState() {
  const saved = storage.get('scoreboard_match_state');
  if (saved) {
    // 合併保存的狀態，但確保所有必要的欄位都存在
    matchState = {
      ...matchState,
      ...saved,
      // 確保比賽設定有預設值
      mode: saved.mode || 'doubles',
      setsToWin: saved.setsToWin || 2,
      pointsToWin: saved.pointsToWin || 21,
      allowDeuce: saved.allowDeuce !== undefined ? saved.allowDeuce : true,
      maxDeucePoints: saved.maxDeucePoints || 30,
      matchStarted: saved.matchStarted || false,
      swapDisplay: saved.swapDisplay || false,
      initialScores: saved.initialScores || { teamA: 0, teamB: 0 },
      initialServer: saved.initialServer || 'teamA',
      scoreHistory: saved.scoreHistory || [], // 確保得分歷史存在
      timer: saved.timer || {
        startTime: null,
        pausedTime: null,
        totalPausedDuration: 0,
        isPaused: false
      }
    };
  }
  
  // 確保 playerAvatars 存在
  if (!matchState.playerAvatars) {
    matchState.playerAvatars = { teamA: [null, null], teamB: [null, null] };
  }
  
  // 根據得分歷史計算發球方（確保載入的狀態是正確的）
  if (matchState.matchStarted) {
    const serverState = calculateServer();
    matchState.server = serverState.server;
    matchState.serverPlayer = serverState.serverPlayer;
    matchState.lastServerPlayer.teamA = serverState.lastServerPlayer.teamA;
    matchState.lastServerPlayer.teamB = serverState.lastServerPlayer.teamB;
  }
  
  // 載入比賽設定（作為預設值）
  loadMatchSettings();
}

/**
 * 載入比賽設定（作為預設值）
 */
function loadMatchSettings() {
  const saved = storage.get('scoreboard_match_settings');
  if (saved) {
    // 如果比賽還沒開始，使用保存的設定
    if (!matchState.matchStarted) {
      matchState.mode = saved.mode || matchState.mode;
      matchState.setsToWin = saved.setsToWin || matchState.setsToWin;
      matchState.pointsToWin = saved.pointsToWin || matchState.pointsToWin;
      matchState.allowDeuce = saved.allowDeuce !== undefined ? saved.allowDeuce : matchState.allowDeuce;
      matchState.maxDeucePoints = saved.maxDeucePoints || matchState.maxDeucePoints;
    }
  }
}

/**
 * 保存比賽設定（作為下次的預設值）
 */
function saveMatchSettings() {
  storage.set('scoreboard_match_settings', {
    mode: matchState.mode,
    setsToWin: matchState.setsToWin,
    pointsToWin: matchState.pointsToWin,
    allowDeuce: matchState.allowDeuce,
    maxDeucePoints: matchState.maxDeucePoints
  });
}

/**
 * 更新 i18n 文字
 */
function updateI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
}

/**
 * 格式化時間（毫秒轉換為 HH:MM:SS）
 */
function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 * 計算經過的時間（毫秒）
 */
function getElapsedTime() {
  if (!matchState.timer.startTime) {
    return 0;
  }
  
  const now = Date.now();
  let elapsed = now - matchState.timer.startTime;
  
  // 減去累計暫停時間
  elapsed -= matchState.timer.totalPausedDuration;
  
  // 如果當前正在暫停，減去當前暫停的時間
  if (matchState.timer.isPaused && matchState.timer.pausedTime) {
    elapsed -= (now - matchState.timer.pausedTime);
  }
  
  return Math.max(0, elapsed);
}

/**
 * 更新計時器顯示
 */
function updateTimerDisplay() {
  const timerDisplay = document.getElementById('scoreboard-timer-display');
  if (timerDisplay) {
    const elapsed = getElapsedTime();
    timerDisplay.textContent = formatTime(elapsed);
  }
}

/**
 * 啟動計時器
 */
function startTimer() {
  // 清除現有的計時器
  stopTimer();
  
  // 如果正在暫停，恢復計時
  if (matchState.timer.isPaused && matchState.timer.pausedTime) {
    const pauseDuration = Date.now() - matchState.timer.pausedTime;
    matchState.timer.totalPausedDuration += pauseDuration;
    matchState.timer.pausedTime = null;
    matchState.timer.isPaused = false;
    saveMatchState();
  }
  
  // 更新計時器按鈕狀態
  updateTimerButton();
  
  // 每秒更新一次顯示
  timerInterval = setInterval(() => {
    updateTimerDisplay();
  }, 1000);
  
  // 立即更新一次
  updateTimerDisplay();
}

/**
 * 停止計時器
 */
function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

/**
 * 暫停/繼續計時器
 */
function toggleTimer() {
  if (!matchState.matchStarted) {
    return;
  }
  
  if (matchState.timer.isPaused) {
    // 繼續計時
    if (matchState.timer.pausedTime) {
      const pauseDuration = Date.now() - matchState.timer.pausedTime;
      matchState.timer.totalPausedDuration += pauseDuration;
      matchState.timer.pausedTime = null;
    }
    matchState.timer.isPaused = false;
    saveMatchState();
    startTimer();
  } else {
    // 暫停計時
    matchState.timer.pausedTime = Date.now();
    matchState.timer.isPaused = true;
    saveMatchState();
    stopTimer();
    updateTimerButton();
  }
}

/**
 * 更新計時器按鈕狀態
 */
function updateTimerButton() {
  const btnTimerToggle = document.getElementById('btn-timer-toggle');
  if (btnTimerToggle) {
    const icon = btnTimerToggle.querySelector('.material-icons-round');
    
    if (matchState.timer.isPaused) {
      if (icon) icon.textContent = 'play_arrow';
      btnTimerToggle.setAttribute('aria-label', t('scoreboard.button.timer.resume') || '繼續');
    } else {
      if (icon) icon.textContent = 'pause';
      btnTimerToggle.setAttribute('aria-label', t('scoreboard.button.timer.pause') || '暫停');
    }
  }
}


