/**
 * 多國化處理
 */
import { storage } from './storage.js';

// 重新導出 translations.js 中的函數
export { getCategoryType, getScenario, getTag } from './translations.js';

const translations = {
  'zh-TW': {
    'nav.home': '首頁',
    'nav.content': '內容',
    'nav.learning-path': '學習路徑',
    'nav.favorites': '收藏',
    'nav.scoreboard': '記分板',
    'nav.model-viewer': '3D 模型',
    'nav.search': '搜尋',
    'theme.light': '淺色',
    'theme.dark': '深色',
    'theme.system': '系統',
    'common.loading': '載入中...',
    'common.error': '發生錯誤',
    'common.back': '返回',
    'common.close': '關閉',
    'common.start': '開始學習',
    'search.placeholder': '搜尋內容...',
    'model-viewer.title': '3D 模型展示',
    'model-viewer.loading': '載入中...',
    'model-viewer.error': '載入失敗',
    'model-viewer.prev': '上一個',
    'model-viewer.next': '下一個',
    'model-viewer.instructions': '使用滑鼠拖曳旋轉視角，滾輪縮放',
    'model-viewer.wireframe': 'Wireframe',
    'model-viewer.bones': 'Show Bones',
    'model-viewer.load-animation': '載入動畫',
    'model-viewer.loading-animation': '載入動畫中...',
    'model-viewer.error-animation': '動畫載入失敗',
    'favorites.empty': '還沒有收藏任何內容',
    'favorites.add': '加入收藏',
    'favorites.remove': '移除收藏',
    'content.video.channel': '頻道',
    'content.video.watchOnYouTube': '在 YouTube 上觀看',
    'scoreboard.title': '記分板',
    'scoreboard.mode.singles': '單打',
    'scoreboard.mode.doubles': '雙打',
    'scoreboard.mode.mixed': '混雙',
    'scoreboard.team.a': '隊伍 A',
    'scoreboard.team.b': '隊伍 B',
    'scoreboard.player.name': '選手名稱',
    'scoreboard.player.name.team.a': '隊伍 A 選手',
    'scoreboard.player.name.team.b': '隊伍 B 選手',
    'scoreboard.player.name.team.a.player1': '隊伍 A 選手 1',
    'scoreboard.player.name.team.a.player2': '隊伍 A 選手 2',
    'scoreboard.player.name.team.b.player1': '隊伍 B 選手 1',
    'scoreboard.player.name.team.b.player2': '隊伍 B 選手 2',
    'scoreboard.player.name.player1': '選手1',
    'scoreboard.player.name.player2': '選手2',
    'scoreboard.player.name.enable': '輸入選手名稱',
    'scoreboard.player.name.edit': '編輯名稱',
    'scoreboard.player.name.placeholder': '輸入選手名稱',
    'scoreboard.player.name.placeholder.player1': '輸入選手1名稱',
    'scoreboard.player.name.placeholder.player2': '輸入選手2名稱',
    'scoreboard.player.name.placeholder.player1.right': '輸入選手1名稱 （站右邊）',
    'scoreboard.player.name.placeholder.player2.left': '輸入選手2名稱 （站左邊）',
    'scoreboard.server': '發球',
    'scoreboard.set': '第 {n} 局',
    'scoreboard.sets.won': '已贏局數',
    'scoreboard.button.add': '+1',
    'scoreboard.button.subtract': '-1',
    'scoreboard.button.reset': '重置',
    'scoreboard.button.new-set': '新局',
    'scoreboard.button.new-match': '新比賽',
    'scoreboard.button.start-match': '開始比賽',
    'scoreboard.button.timer.pause': '暫停',
    'scoreboard.button.timer.resume': '繼續',
    'scoreboard.settings.title': '比賽設定',
    'scoreboard.settings.mode': '組隊形式',
    'scoreboard.settings.sets-to-win': '需要贏幾局',
    'scoreboard.settings.points-to-win': '每局需要幾分',
    'scoreboard.settings.allow-deuce': '允許 Deuce',
    'scoreboard.settings.max-deuce-points': 'Deuce 最高到幾分',
    'scoreboard.settings.initial-scores': '初始分數（讓分賽）',
    'scoreboard.settings.initial-server': '初始發球方',
    'scoreboard.settings.team-names': '隊伍名稱',
    'scoreboard.settings.player-names': '選手名稱',
    'scoreboard.settings.player.position.right': '（站右邊）',
    'scoreboard.settings.player.position.left': '（站左邊）',
    'scoreboard.player.avatar.select': '選擇頭像',
    'scoreboard.player.avatar.none': '不使用頭像',
    'scoreboard.settings.sets-to-win.option': '{n} 局',
    'scoreboard.winner': '{team} 獲勝！',
    'scoreboard.history': '歷史記錄',
    'scoreboard.history.empty': '尚無歷史記錄'
  },
  'en': {
    'nav.home': 'Home',
    'nav.content': 'Content',
    'nav.learning-path': 'Learning Path',
    'nav.favorites': 'Favorites',
    'nav.scoreboard': 'Scoreboard',
    'nav.search': 'Search',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.system': 'System',
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.back': 'Back',
    'common.close': 'Close',
    'common.start': 'Start Learning',
    'search.placeholder': 'Search content...',
    'model-viewer.title': '3D Model Viewer',
    'model-viewer.loading': 'Loading...',
    'model-viewer.error': 'Failed to load',
    'model-viewer.prev': 'Previous',
    'model-viewer.next': 'Next',
    'model-viewer.instructions': 'Drag to rotate, scroll to zoom',
    'favorites.empty': 'No favorites yet',
    'favorites.add': 'Add to favorites',
    'favorites.remove': 'Remove from favorites',
    'content.video.channel': 'Channel',
    'content.video.watchOnYouTube': 'Watch on YouTube',
    'scoreboard.title': 'Scoreboard',
    'scoreboard.mode.singles': 'Singles',
    'scoreboard.mode.doubles': 'Doubles',
    'scoreboard.mode.mixed': 'Mixed Doubles',
    'scoreboard.team.a': 'Team A',
    'scoreboard.team.b': 'Team B',
    'scoreboard.player.name': 'Player Name',
    'scoreboard.player.name.team.a': 'Team A Player',
    'scoreboard.player.name.team.b': 'Team B Player',
    'scoreboard.player.name.team.a.player1': 'Team A Player 1',
    'scoreboard.player.name.team.a.player2': 'Team A Player 2',
    'scoreboard.player.name.team.b.player1': 'Team B Player 1',
    'scoreboard.player.name.team.b.player2': 'Team B Player 2',
    'scoreboard.player.name.player1': 'Player 1',
    'scoreboard.player.name.player2': 'Player 2',
    'scoreboard.player.name.enable': 'Enter Player Names',
    'scoreboard.player.name.edit': 'Edit Name',
    'scoreboard.player.name.placeholder': 'Enter player name',
    'scoreboard.player.name.placeholder.player1': 'Enter Player 1 Name',
    'scoreboard.player.name.placeholder.player2': 'Enter Player 2 Name',
    'scoreboard.player.name.placeholder.player1.right': 'Enter Player 1 Name (Right Side)',
    'scoreboard.player.name.placeholder.player2.left': 'Enter Player 2 Name (Left Side)',
    'scoreboard.server': 'Serving',
    'scoreboard.set': 'Set {n}',
    'scoreboard.sets.won': 'Sets Won',
    'scoreboard.button.add': '+1',
    'scoreboard.button.subtract': '-1',
    'scoreboard.button.reset': 'Reset',
    'scoreboard.button.new-set': 'New Set',
    'scoreboard.button.new-match': 'New Match',
    'scoreboard.button.start-match': 'Start Match',
    'scoreboard.button.timer.pause': 'Pause',
    'scoreboard.button.timer.resume': 'Resume',
    'scoreboard.settings.title': 'Match Settings',
    'scoreboard.settings.mode': 'Team Format',
    'scoreboard.settings.sets-to-win': 'Sets to Win',
    'scoreboard.settings.points-to-win': 'Points to Win per Set',
    'scoreboard.settings.allow-deuce': 'Allow Deuce',
    'scoreboard.settings.max-deuce-points': 'Max Deuce Points',
    'scoreboard.settings.initial-scores': 'Initial Scores (Handicap)',
    'scoreboard.settings.initial-server': 'Initial Server',
    'scoreboard.settings.team-names': 'Team Names',
    'scoreboard.settings.player-names': 'Player Names',
    'scoreboard.settings.player.position.right': '(Right Side)',
    'scoreboard.settings.player.position.left': '(Left Side)',
    'scoreboard.player.avatar.select': 'Select Avatar',
    'scoreboard.player.avatar.none': 'No Avatar',
    'scoreboard.settings.sets-to-win.option': '{n} Sets',
    'scoreboard.winner': '{team} Wins!',
    'scoreboard.history': 'Match History',
    'scoreboard.history.empty': 'No match history'
  },
  'ja': {
    'nav.home': 'ホーム',
    'nav.content': 'コンテンツ',
    'nav.learning-path': '学習パス',
    'nav.favorites': 'お気に入り',
    'nav.scoreboard': 'スコアボード',
    'nav.model-viewer': '3D モデル',
    'nav.search': '検索',
    'theme.light': 'ライト',
    'theme.dark': 'ダーク',
    'theme.system': 'システム',
    'common.loading': '読み込み中...',
    'common.error': 'エラーが発生しました',
    'common.back': '戻る',
    'common.close': '閉じる',
    'common.start': '学習を開始',
    'search.placeholder': 'コンテンツを検索...',
    'model-viewer.title': '3D モデルビューア',
    'model-viewer.loading': '読み込み中...',
    'model-viewer.error': '読み込み失敗',
    'model-viewer.prev': '前へ',
    'model-viewer.next': '次へ',
    'model-viewer.instructions': 'ドラッグで回転、スクロールでズーム',
    'model-viewer.wireframe': 'ワイヤーフレーム',
    'model-viewer.bones': 'ボーン表示',
    'model-viewer.load-animation': 'アニメーション読み込み',
    'model-viewer.loading-animation': 'アニメーション読み込み中...',
    'model-viewer.error-animation': 'アニメーション読み込み失敗',
    'favorites.empty': 'お気に入りはまだありません',
    'favorites.add': 'お気に入りに追加',
    'favorites.remove': 'お気に入りから削除',
    'content.video.channel': 'チャンネル',
    'content.video.watchOnYouTube': 'YouTubeで視聴',
    'scoreboard.title': 'スコアボード',
    'scoreboard.mode.singles': 'シングルス',
    'scoreboard.mode.doubles': 'ダブルス',
    'scoreboard.mode.mixed': 'ミックスダブルス',
    'scoreboard.team.a': 'チーム A',
    'scoreboard.team.b': 'チーム B',
    'scoreboard.player.name': '選手名',
    'scoreboard.player.name.team.a': 'チーム A 選手',
    'scoreboard.player.name.team.b': 'チーム B 選手',
    'scoreboard.player.name.team.a.player1': 'チーム A 選手 1',
    'scoreboard.player.name.team.a.player2': 'チーム A 選手 2',
    'scoreboard.player.name.team.b.player1': 'チーム B 選手 1',
    'scoreboard.player.name.team.b.player2': 'チーム B 選手 2',
    'scoreboard.player.name.player1': '選手1',
    'scoreboard.player.name.player2': '選手2',
    'scoreboard.player.name.enable': '選手名を入力',
    'scoreboard.player.name.edit': '名前を編集',
    'scoreboard.player.name.placeholder': '選手名を入力',
    'scoreboard.player.name.placeholder.player1': '選手1名を入力',
    'scoreboard.player.name.placeholder.player2': '選手2名を入力',
    'scoreboard.player.name.placeholder.player1.right': '選手1名を入力 （右側）',
    'scoreboard.player.name.placeholder.player2.left': '選手2名を入力 （左側）',
    'scoreboard.server': 'サーブ',
    'scoreboard.set': '第 {n} セット',
    'scoreboard.sets.won': '獲得セット',
    'scoreboard.button.add': '+1',
    'scoreboard.button.subtract': '-1',
    'scoreboard.button.reset': 'リセット',
    'scoreboard.button.new-set': '新セット',
    'scoreboard.button.new-match': '新試合',
    'scoreboard.button.start-match': '試合開始',
    'scoreboard.button.timer.pause': '一時停止',
    'scoreboard.button.timer.resume': '再開',
    'scoreboard.settings.title': '試合設定',
    'scoreboard.settings.mode': 'チーム形式',
    'scoreboard.settings.sets-to-win': '獲得セット数',
    'scoreboard.settings.points-to-win': 'セットごとの得点',
    'scoreboard.settings.allow-deuce': 'デュースを許可',
    'scoreboard.settings.max-deuce-points': 'デュース最大得点',
    'scoreboard.settings.initial-scores': '初期スコア（ハンディキャップ）',
    'scoreboard.settings.initial-server': '初期サーバー',
    'scoreboard.settings.team-names': 'チーム名',
    'scoreboard.settings.player-names': '選手名',
    'scoreboard.settings.player.position.right': '（右側）',
    'scoreboard.settings.player.position.left': '（左側）',
    'scoreboard.player.avatar.select': 'アバターを選択',
    'scoreboard.player.avatar.none': 'アバターなし',
    'scoreboard.settings.sets-to-win.option': '{n} セット',
    'scoreboard.winner': '{team} の勝利！',
    'scoreboard.history': '試合履歴',
    'scoreboard.history.empty': '試合履歴がありません'
  }
};

let currentLang = 'zh-TW';

/**
 * 初始化多國化
 */
export function initI18n() {
  const savedLang = storage.get('language', 'zh-TW');
  setLanguage(savedLang);
}

/**
 * 設定語言
 * @param {string} lang
 */
export function setLanguage(lang) {
  if (translations[lang]) {
    currentLang = lang;
    storage.set('language', lang);
    document.documentElement.setAttribute('lang', lang);
    updateUI();
  }
}

/**
 * 取得翻譯
 * @param {string} key
 * @returns {string}
 */
export function t(key) {
  return translations[currentLang]?.[key] || key;
}

/**
 * 取得當前語言
 * @returns {string}
 */
export function getLanguage() {
  return currentLang;
}

/**
 * 更新 UI 文字
 */
function updateUI() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  
  // 觸發自定義事件，讓頁面可以重新渲染以更新 category 和 tags
  window.dispatchEvent(new CustomEvent('languageChanged', { 
    detail: { language: currentLang } 
  }));
}

