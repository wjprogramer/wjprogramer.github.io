// Emoji Picker 元件
export class EmojiPicker {
  constructor(onSelect) {
    this.onSelect = onSelect;
    this.categories = {
      '常用': ['👍', '❤️', '😂', '😮', '😢', '🔥', '🎉', '🚀', '😎', '👏', '💯', '✨'],
      '表情': ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓'],
      '手勢': ['👋', '🤚', '🖐', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '👇', '☝️', '👎', '✊', '👊', '🤛', '🤜', '🙌', '👐', '🤲', '🤝', '🙏'],
      '慶祝': ['🎉', '🎊', '🎈', '🎁', '🎀', '🏆', '🥇', '🥈', '🥉', '🎖', '🏅', '🎗', '🎫', '🎟', '🎪', '🎭', '🎨', '🎬', '🎤', '🎧', '🎼', '🎹', '🥁', '🎷', '🎺', '🎸', '🎻', '🎲', '🎯', '🎳', '🎮', '🎰', '🧩'],
      '符號': ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '✨', '⭐', '🌟', '💫', '💥', '💢', '💯', '💤', '💨', '💦', '💧', '☀️', '🌙', '⚡', '☄️', '🌈', '☂️', '☔', '⛄', '❄️', '☃️']
    };
    
    // Emoji 關鍵字映射（用於搜尋）
    this.emojiKeywords = {
      '👍': ['讚', '好', 'good', 'thumbs', 'up', 'like'],
      '❤️': ['愛', '心', 'love', 'heart', 'red'],
      '😂': ['笑', '哭', 'laugh', 'cry', 'tears', 'joy'],
      '😮': ['驚訝', 'surprise', 'wow', 'oh'],
      '😢': ['哭', '難過', 'sad', 'cry', 'tears'],
      '🔥': ['火', '熱', 'fire', 'hot', 'flame'],
      '🎉': ['慶祝', 'party', 'celebration', 'confetti'],
      '🚀': ['火箭', 'rocket', 'launch', 'fast'],
      '😎': ['酷', 'cool', 'sunglasses', 'shades'],
      '👏': ['拍手', 'clap', 'applause', 'hands'],
      '💯': ['100', '滿分', 'perfect', 'hundred'],
      '✨': ['星星', '閃', 'sparkle', 'star', 'shine'],
      '😀': ['笑', '開心', 'happy', 'smile', 'grin'],
      '😃': ['笑', '開心', 'happy', 'smile', 'big'],
      '😄': ['笑', '開心', 'happy', 'smile', 'laugh'],
      '😁': ['笑', '開心', 'happy', 'smile', 'grin'],
      '😆': ['笑', '開心', 'happy', 'laugh', 'squint'],
      '😅': ['笑', '開心', 'sweat', 'nervous'],
      '🤣': ['笑', '開心', 'laugh', 'floor', 'rolling'],
      '😊': ['笑', '開心', 'happy', 'smile', 'blush'],
      '😇': ['天使', 'angel', 'halo', 'innocent'],
      '🙂': ['笑', '開心', 'smile', 'slight'],
      '🙃': ['倒', 'upside', 'down', 'flip'],
      '😉': ['眨眼', 'wink', 'eye'],
      '😌': ['放鬆', 'relieved', 'peaceful'],
      '😍': ['愛', 'heart', 'eyes', 'love'],
      '🥰': ['愛', 'love', 'smile', 'hearts'],
      '😘': ['親', 'kiss', 'love', 'heart'],
      '😗': ['親', 'kiss', 'whistle'],
      '😙': ['親', 'kiss', 'smile', 'eyes'],
      '😚': ['親', 'kiss', 'closed', 'eyes'],
      '😋': ['好吃', 'yum', 'delicious', 'tongue'],
      '😛': ['舌頭', 'tongue', 'playful'],
      '😝': ['舌頭', 'tongue', 'silly', 'playful'],
      '😜': ['眨眼', 'tongue', 'wink', 'playful'],
      '🤪': ['瘋狂', 'crazy', 'zany', 'goofy'],
      '🤨': ['懷疑', 'suspicious', 'raised', 'eyebrow'],
      '🧐': ['思考', 'think', 'monocle', 'investigate'],
      '🤓': ['書呆子', 'nerd', 'glasses', 'geek'],
      '🤩': ['星星眼', 'star', 'eyes', 'excited'],
      '🥳': ['慶祝', 'party', 'celebration', 'hat'],
      '😏': ['狡猾', 'smirk', 'smug'],
      '😒': ['無聊', 'unamused', 'bored'],
      '😞': ['失望', 'disappointed', 'sad'],
      '😔': ['難過', 'sad', 'pensive', 'down'],
      '😟': ['擔心', 'worried', 'concerned'],
      '😕': ['困惑', 'confused', 'uneasy'],
      '🙁': ['難過', 'sad', 'slight', 'frown'],
      '☹️': ['難過', 'sad', 'frown'],
      '😣': ['痛苦', 'persevere', 'struggle'],
      '😖': ['困惑', 'confounded', 'frustrated'],
      '😫': ['累', 'tired', 'weary', 'exhausted'],
      '😩': ['累', 'tired', 'weary'],
      '🥺': ['可憐', 'pleading', 'puppy', 'eyes'],
      '😭': ['大哭', 'sob', 'cry', 'tears'],
      '😤': ['生氣', 'triumph', 'proud', 'huff'],
      '😠': ['生氣', 'angry', 'mad', 'annoyed'],
      '😡': ['生氣', 'angry', 'mad', 'rage'],
      '🤬': ['罵', 'swearing', 'cursing', 'angry'],
      '🤯': ['爆炸', 'exploding', 'head', 'mind'],
      '😳': ['臉紅', 'flushed', 'embarrassed', 'blush'],
      '🥵': ['熱', 'hot', 'sweating', 'fever'],
      '🥶': ['冷', 'cold', 'freezing', 'ice'],
      '😱': ['驚嚇', 'scream', 'fear', 'shocked'],
      '😨': ['害怕', 'fearful', 'scared', 'worried'],
      '😰': ['擔心', 'anxious', 'sweat', 'nervous'],
      '😥': ['失望', 'disappointed', 'relieved', 'sad'],
      '😓': ['流汗', 'sweat', 'nervous', 'anxious'],
      '👋': ['揮手', 'wave', 'hello', 'goodbye'],
      '🤚': ['手', 'hand', 'raised', 'back'],
      '🖐': ['手', 'hand', 'fingers', 'splayed'],
      '✋': ['手', 'hand', 'stop', 'raised'],
      '🖖': ['手', 'hand', 'vulcan', 'salute'],
      '👌': ['ok', '好', 'okay', 'perfect'],
      '🤌': ['手', 'hand', 'pinched', 'fingers'],
      '🤏': ['小', 'small', 'pinch', 'hand'],
      '✌️': ['勝利', 'victory', 'peace', 'two'],
      '🤞': ['交叉', 'crossed', 'fingers', 'luck'],
      '🤟': ['愛', 'love', 'you', 'gesture'],
      '🤘': ['搖滾', 'rock', 'on', 'horns'],
      '🤙': ['電話', 'call', 'me', 'hand'],
      '👈': ['左', 'left', 'point', 'finger'],
      '👉': ['右', 'right', 'point', 'finger'],
      '👆': ['上', 'up', 'point', 'finger'],
      '👇': ['下', 'down', 'point', 'finger'],
      '☝️': ['上', 'up', 'point', 'index'],
      '👎': ['不', 'no', 'thumbs', 'down'],
      '✊': ['拳頭', 'fist', 'punch', 'power'],
      '👊': ['拳頭', 'fist', 'punch', 'bump'],
      '🤛': ['拳頭', 'fist', 'left', 'bump'],
      '🤜': ['拳頭', 'fist', 'right', 'bump'],
      '🙌': ['舉手', 'raise', 'hands', 'celebration'],
      '👐': ['手', 'hands', 'open', 'palms'],
      '🤲': ['手', 'hands', 'palms', 'together'],
      '🤝': ['握手', 'handshake', 'deal', 'agreement'],
      '🙏': ['拜', 'pray', 'please', 'thanks'],
      '🎊': ['慶祝', 'party', 'confetti', 'ball'],
      '🎈': ['氣球', 'balloon', 'party', 'birthday'],
      '🎁': ['禮物', 'gift', 'present', 'box'],
      '🎀': ['蝴蝶結', 'ribbon', 'bow'],
      '🏆': ['獎盃', 'trophy', 'cup', 'win'],
      '🥇': ['金牌', 'gold', 'medal', 'first'],
      '🥈': ['銀牌', 'silver', 'medal', 'second'],
      '🥉': ['銅牌', 'bronze', 'medal', 'third'],
      '🎖': ['獎章', 'medal', 'military'],
      '🏅': ['獎牌', 'medal', 'sports'],
      '🎗': ['絲帶', 'ribbon', 'awareness'],
      '🎫': ['票', 'ticket', 'admission'],
      '🎟': ['票', 'ticket', 'admission'],
      '🎪': ['馬戲', 'circus', 'tent'],
      '🎭': ['面具', 'mask', 'theater', 'drama'],
      '🎨': ['畫', 'art', 'palette', 'paint'],
      '🎬': ['電影', 'movie', 'clapper', 'film'],
      '🎤': ['麥克風', 'microphone', 'mic', 'sing'],
      '🎧': ['耳機', 'headphones', 'music', 'listen'],
      '🎼': ['樂譜', 'music', 'score', 'sheet'],
      '🎹': ['鋼琴', 'piano', 'keyboard', 'music'],
      '🥁': ['鼓', 'drum', 'music'],
      '🎷': ['薩克斯', 'saxophone', 'sax', 'music'],
      '🎺': ['喇叭', 'trumpet', 'horn', 'music'],
      '🎸': ['吉他', 'guitar', 'music', 'rock'],
      '🎻': ['小提琴', 'violin', 'music', 'string'],
      '🎲': ['骰子', 'dice', 'game', 'random'],
      '🎯': ['靶', 'target', 'dart', 'bullseye'],
      '🎳': ['保齡球', 'bowling', 'game'],
      '🎮': ['遊戲', 'game', 'controller', 'video'],
      '🎰': ['老虎機', 'slot', 'machine', 'casino'],
      '🧩': ['拼圖', 'puzzle', 'piece', 'jigsaw'],
      '🧡': ['橘', 'orange', 'heart'],
      '💛': ['黃', 'yellow', 'heart'],
      '💚': ['綠', 'green', 'heart'],
      '💙': ['藍', 'blue', 'heart'],
      '💜': ['紫', 'purple', 'heart'],
      '🖤': ['黑', 'black', 'heart'],
      '🤍': ['白', 'white', 'heart'],
      '🤎': ['棕', 'brown', 'heart'],
      '💔': ['破碎', 'broken', 'heart', 'sad'],
      '❣️': ['感嘆', 'exclamation', 'heart'],
      '💕': ['兩顆', 'two', 'hearts', 'love'],
      '💞': ['旋轉', 'revolving', 'hearts'],
      '💓': ['跳動', 'beating', 'heart'],
      '💗': ['成長', 'growing', 'heart'],
      '💖': ['閃亮', 'sparkling', 'heart'],
      '💘': ['箭', 'cupid', 'arrow', 'heart'],
      '💝': ['禮物', 'heart', 'gift', 'box'],
      '💟': ['裝飾', 'heart', 'decoration'],
      '⭐': ['星星', 'star', 'white'],
      '🌟': ['星星', 'star', 'glowing'],
      '💫': ['星星', 'dizzy', 'star'],
      '💥': ['爆炸', 'explosion', 'collision'],
      '💢': ['生氣', 'anger', 'symbol'],
      '💤': ['睡覺', 'sleep', 'zzz', 'tired'],
      '💨': ['風', 'wind', 'dash', 'fast'],
      '💦': ['汗', 'sweat', 'droplets'],
      '💧': ['水滴', 'droplet', 'water', 'rain'],
      '☀️': ['太陽', 'sun', 'sunny', 'bright'],
      '🌙': ['月亮', 'moon', 'crescent'],
      '⚡': ['閃電', 'lightning', 'bolt', 'electric'],
      '☄️': ['彗星', 'comet', 'space'],
      '🌈': ['彩虹', 'rainbow', 'colorful'],
      '☂️': ['傘', 'umbrella', 'rain'],
      '☔': ['雨', 'umbrella', 'rain', 'drops'],
      '⛄': ['雪人', 'snowman', 'snow'],
      '❄️': ['雪', 'snowflake', 'snow', 'winter'],
      '☃️': ['雪人', 'snowman', 'snow']
    };
  }

  render(searchQuery = '') {
    const query = searchQuery.toLowerCase().trim();
    
    return `
      <div class="emoji-picker">
        <div class="emoji-picker-header">
          <input type="text" class="emoji-picker-search" placeholder="搜尋 emoji..." value="${this.escapeHtml(searchQuery)}" />
        </div>
        <div class="emoji-picker-content">
          ${this.renderContent(searchQuery)}
        </div>
      </div>
    `;
  }
  
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  bindEvents(element) {
    const emojiItems = element.querySelectorAll('.emoji-item');
    emojiItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const emoji = item.dataset.emoji;
        if (this.onSelect) {
          this.onSelect(emoji);
        }
      });
    });

    // 搜尋功能
    const searchInput = element.querySelector('.emoji-picker-search');
    const contentContainer = element.querySelector('.emoji-picker-content');
    if (searchInput && contentContainer) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        // 重新渲染內容區域
        contentContainer.innerHTML = this.renderContent(query);
        // 重新綁定事件
        this.bindEmojiItems(contentContainer);
      });
    }
  }
  
  renderContent(searchQuery = '') {
    const query = searchQuery.toLowerCase().trim();
    let filteredCategories = {};
    
    if (query) {
      // 搜尋模式：過濾所有 emoji
      const allEmojis = [];
      Object.values(this.categories).forEach(emojis => {
        allEmojis.push(...emojis);
      });
      
      // 使用 Set 去重，避免同一個 emoji 在多個分類中重複出現
      const uniqueEmojis = [...new Set(allEmojis)];
      
      const filteredEmojis = uniqueEmojis.filter(emoji => {
        // 直接匹配 emoji 字符
        if (emoji.includes(query)) return true;
        
        // 匹配關鍵字
        const keywords = this.emojiKeywords[emoji] || [];
        return keywords.some(keyword => keyword.toLowerCase().includes(query));
      });
      
      if (filteredEmojis.length > 0) {
        filteredCategories['搜尋結果'] = filteredEmojis;
      }
    } else {
      // 正常模式：顯示所有分類
      filteredCategories = this.categories;
    }
    
    return Object.keys(filteredCategories).length === 0 ? `
      <div style="padding: var(--spacing-xl); text-align: center; color: var(--text-secondary);">
        找不到符合的 emoji
      </div>
    ` : Object.entries(filteredCategories).map(([categoryName, emojis]) => `
      <div class="emoji-category">
        <div class="emoji-category-title">${categoryName}</div>
        <div class="emoji-grid">
          ${emojis.map(emoji => `
            <button class="emoji-item" data-emoji="${emoji}">${emoji}</button>
          `).join('')}
        </div>
      </div>
    `).join('');
  }
  
  bindEmojiItems(container) {
    const emojiItems = container.querySelectorAll('.emoji-item');
    emojiItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const emoji = item.dataset.emoji;
        if (this.onSelect) {
          this.onSelect(emoji);
        }
      });
    });
  }
}
