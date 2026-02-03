// Emoji Picker 元件
import { t } from '../utils/i18n.js';

export class EmojiPicker {
  constructor(onSelect) {
    this.onSelect = onSelect;
    // 使用英文 key 作為分類的 key，以便映射到翻譯
    this.categories = {
      'common': ['👍', '❤️', '😂', '😮', '😢', '🔥', '🎉', '🚀', '😎', '👏', '💯', '✨', '✅', '❌', '⭐', '💡', '🎯', '🚨'],
      'faces': ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤢', '🤮', '🤧', '🥴', '😵', '😵‍💫', '🤠', '🥸', '😷', '🤒', '🤕'],
      'gestures': ['👋', '🤚', '🖐', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '👇', '☝️', '👎', '✊', '👊', '🤛', '🤜', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💪', '🦾', '🦿', '🦵', '🦶'],
      'celebration': ['🎉', '🎊', '🎈', '🎁', '🎀', '🏆', '🥇', '🥈', '🥉', '🎖', '🏅', '🎗', '🎫', '🎟', '🎪', '🎭', '🎨', '🎬', '🎤', '🎧', '🎼', '🎹', '🥁', '🎷', '🎺', '🎸', '🎻', '🎲', '🎯', '🎳', '🎮', '🎰', '🧩', '🃏', '🀄', '🎴'],
      'symbols': ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '✨', '⭐', '🌟', '💫', '💥', '💢', '💯', '💤', '💨', '💦', '💧', '☀️', '🌙', '⚡', '☄️', '🌈', '☂️', '☔', '⛄', '❄️', '☃️', '✅', '❌', '❓', '❔', '❗', '❕', '💡', '🔔', '🔕', '🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '⚫', '⚪', '🟤'],
      'animals': ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗', '🕷', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🦬', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩', '🦮', '🐕‍🦺', '🐈', '🐈‍⬛', '🪶', '🦃', '🦤', '🦚', '🦜', '🦢', '🦩', '🕊', '🐇', '🦝', '🦨', '🦡', '🦫', '🦦', '🦥', '🐁', '🐀', '🐿', '🦔'],
      'food': ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶', '🌽', '🥕', '🥔', '🍠', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🥞', '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔', '🍟', '🍕', '🥪', '🥙', '🧆', '🌮', '🌯', '🥗', '🥘', '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🦪', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🥮', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪', '🌰', '🥜', '🍯', '🥛', '🍼', '☕', '🍵', '🧃', '🥤', '🍶', '🍺', '🍻', '🥂', '🍷', '🥃', '🍸', '🍹', '🧉', '🍾', '🧊'],
      'transport': ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚', '🚛', '🚜', '🛵', '🚲', '🛴', '🛹', '🛼', '🚁', '🛸', '✈️', '🛩', '🛫', '🛬', '🪂', '💺', '🚀', '🚤', '🛥', '🛳', '⛴', '🚢', '⚓', '⛽', '🚧', '🚦', '🚥', '🗺', '🗿', '🗽', '🗼', '🏰', '🏯', '🏟', '🎡', '🎢', '🎠', '⛲', '⛱', '🏖', '🏝', '🏜', '🌋', '⛰', '🏔', '🗻', '🏕', '⛺', '🏠', '🏡', '🏘', '🏚', '🏗', '🏭', '🏢', '🏬', '🏣', '🏤', '🏥', '🏦', '🏨', '🏪', '🏫', '🏩', '💒', '🏛', '⛪', '🕌', '🕍', '🛕', '🕋', '⛩', '🛤', '🛣', '🗾', '🎑', '🏞', '🌅', '🌄', '🌠', '🎇', '🎆', '🌇', '🌆', '🏙', '🌃', '🌌', '🌉', '🌁'],
      'objects': ['⌚', '📱', '📲', '💻', '⌨️', '🖥', '🖨', '🖱', '🖲', '🕹', '🗜', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽', '🎞', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙', '🎚', '🎛', '⏱', '⏲', '⏰', '🕰', '⌛', '⏳', '📡', '🔋', '🔌', '💡', '🔦', '🕯', '🧯', '🛢', '💸', '💵', '💴', '💶', '💷', '💰', '💳', '💎', '⚖️', '🛠', '🔨', '⚒', '🛠', '⛏', '🔩', '⚙️', '🧰', '🧲', '🔫', '💣', '🧨', '🪓', '🔪', '🗡', '⚔️', '🛡', '🚬', '⚰️', '🪦', '⚱️', '🏺', '🔮', '📿', '🧿', '💈', '⚗️', '🔭', '🔬', '🕳', '🩹', '🩺', '💊', '💉', '🩸', '🧬', '🦠', '🧫', '🧪', '🌡', '🧹', '🪠', '🧺', '🧻', '🚽', '🚿', '🛁', '🛀', '🧼', '🪥', '🪒', '🧴', '🧷', '🧹', '🪣', '🧽', '🪣', '🧯', '🛒', '🚬', '⚰️', '🪦', '⚱️', '🗿', '🪧', '🪪'],
      'flags': ['🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '⚫', '⚪', '🟤', '🔶', '🔷', '🔸', '🔹', '🔺', '🔻', '💠', '🔘', '🔳', '🔲', '▪️', '▫️', '◾', '◽', '◼️', '◻️', '🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '⬛', '⬜', '🟫', '🔈', '🔇', '🔉', '🔊', '🔔', '🔕', '📣', '📢', '💬', '💭', '🗯', '♠️', '♣️', '♥️', '♦️', '🃏', '🎴', '🀄', '🎭', '🖼', '🎨', '🧩', '♟', '♞', '♝', '♜', '♛', '♚', '♕', '♔', '♖', '♗', '♘', '♙'],
      'arrows': ['⬆️', '↗️', '➡️', '↘️', '⬇️', '↙️', '⬅️', '↖️', '↕️', '↔️', '↩️', '↪️', '⤴️', '⤵️', '🔃', '🔄', '🔙', '🔚', '🔛', '🔜', '🔝'],
      'time': ['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛', '🕜', '🕝', '🕞', '🕟', '🕠', '🕡', '🕢', '🕣', '🕤', '🕥', '🕦', '🕧', '⌚', '⏰', '⏱', '⏲', '🕰', '⌛', '⏳', '📅', '📆', '🗓']
    };
    
    // 分類 key 到翻譯 key 的映射
    this.categoryKeyMap = {
      'common': 'emoji.categories.common',
      'faces': 'emoji.categories.faces',
      'gestures': 'emoji.categories.gestures',
      'celebration': 'emoji.categories.celebration',
      'symbols': 'emoji.categories.symbols',
      'animals': 'emoji.categories.animals',
      'food': 'emoji.categories.food',
      'transport': 'emoji.categories.transport',
      'objects': 'emoji.categories.objects',
      'flags': 'emoji.categories.flags',
      'arrows': 'emoji.categories.arrows',
      'time': 'emoji.categories.time',
      'searchResults': 'emoji.categories.searchResults'
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
      '☃️': ['雪人', 'snowman', 'snow'],
      // 常用新增
      '✅': ['對', '正確', 'check', 'correct', 'yes', 'ok'],
      '❌': ['錯', '錯誤', 'cross', 'wrong', 'no', 'cancel'],
      '💡': ['燈泡', '想法', 'idea', 'light', 'bulb'],
      '🚨': ['警報', '緊急', 'alarm', 'emergency', 'warning'],
      // 表情新增
      '🤢': ['噁心', 'nauseated', 'sick'],
      '🤮': ['嘔吐', 'vomit', 'sick'],
      '🤧': ['打噴嚏', 'sneeze', 'sick'],
      '🥴': ['頭暈', 'dizzy', 'woozy'],
      '😵': ['暈', 'dizzy', 'faint'],
      '😵‍💫': ['暈', 'dizzy', 'spiral'],
      '🤠': ['牛仔', 'cowboy', 'hat'],
      '🥸': ['偽裝', 'disguise', 'fake'],
      '😷': ['口罩', 'mask', 'sick'],
      '🤒': ['發燒', 'fever', 'sick'],
      '🤕': ['受傷', 'injured', 'bandage'],
      // 手勢新增
      '✍️': ['寫', 'write', 'pen'],
      '💪': ['肌肉', 'strong', 'muscle', 'power'],
      '🦾': ['機械手臂', 'mechanical', 'arm'],
      '🦿': ['機械腿', 'mechanical', 'leg'],
      '🦵': ['腿', 'leg'],
      '🦶': ['腳', 'foot'],
      // 符號新增
      '❓': ['問號', 'question', 'mark'],
      '❔': ['問號', 'question', 'white'],
      '❗': ['驚嘆號', 'exclamation', 'mark'],
      '❕': ['驚嘆號', 'exclamation', 'white'],
      '🔔': ['鈴鐺', 'bell', 'notification'],
      '🔕': ['靜音', 'mute', 'bell', 'off'],
      // 動物關鍵字（常用動物）
      '🐶': ['狗', 'dog', 'puppy'],
      '🐱': ['貓', 'cat', 'kitten'],
      '🐭': ['老鼠', 'mouse', 'rat'],
      '🐹': ['倉鼠', 'hamster'],
      '🐰': ['兔子', 'rabbit', 'bunny'],
      '🦊': ['狐狸', 'fox'],
      '🐻': ['熊', 'bear'],
      '🐼': ['熊貓', 'panda'],
      '🐨': ['無尾熊', 'koala'],
      '🐯': ['老虎', 'tiger'],
      '🦁': ['獅子', 'lion'],
      '🐮': ['牛', 'cow'],
      '🐷': ['豬', 'pig'],
      '🐸': ['青蛙', 'frog'],
      '🐵': ['猴子', 'monkey'],
      '🐔': ['雞', 'chicken', 'rooster'],
      '🐧': ['企鵝', 'penguin'],
      '🐦': ['鳥', 'bird'],
      '🦆': ['鴨子', 'duck'],
      '🦅': ['老鷹', 'eagle'],
      '🦉': ['貓頭鷹', 'owl'],
      '🐺': ['狼', 'wolf'],
      '🐴': ['馬', 'horse'],
      '🦄': ['獨角獸', 'unicorn'],
      '🐝': ['蜜蜂', 'bee'],
      '🦋': ['蝴蝶', 'butterfly'],
      '🐢': ['烏龜', 'turtle'],
      '🐍': ['蛇', 'snake'],
      '🐙': ['章魚', 'octopus'],
      '🦑': ['魷魚', 'squid'],
      '🦐': ['蝦', 'shrimp'],
      '🦀': ['螃蟹', 'crab'],
      '🐟': ['魚', 'fish'],
      '🐬': ['海豚', 'dolphin'],
      '🐳': ['鯨魚', 'whale'],
      '🦈': ['鯊魚', 'shark'],
      '🐘': ['大象', 'elephant'],
      '🦒': ['長頸鹿', 'giraffe'],
      '🦘': ['袋鼠', 'kangaroo'],
      '🐕': ['狗', 'dog'],
      '🐈': ['貓', 'cat'],
      // 食物關鍵字（常用食物）
      '🍎': ['蘋果', 'apple', 'red'],
      '🍊': ['橘子', 'orange'],
      '🍋': ['檸檬', 'lemon'],
      '🍌': ['香蕉', 'banana'],
      '🍉': ['西瓜', 'watermelon'],
      '🍇': ['葡萄', 'grape'],
      '🍓': ['草莓', 'strawberry'],
      '🍑': ['桃子', 'peach'],
      '🍅': ['番茄', 'tomato'],
      '🥑': ['酪梨', 'avocado'],
      '🥦': ['花椰菜', 'broccoli'],
      '🌽': ['玉米', 'corn'],
      '🥕': ['紅蘿蔔', 'carrot'],
      '🥔': ['馬鈴薯', 'potato'],
      '🍞': ['麵包', 'bread'],
      '🥐': ['可頌', 'croissant'],
      '🧀': ['起司', 'cheese'],
      '🥚': ['蛋', 'egg'],
      '🍳': ['煎蛋', 'fried', 'egg'],
      '🥓': ['培根', 'bacon'],
      '🍔': ['漢堡', 'hamburger', 'burger'],
      '🍕': ['披薩', 'pizza'],
      '🌭': ['熱狗', 'hotdog'],
      '🌮': ['墨西哥捲', 'taco'],
      '🌯': ['捲餅', 'burrito'],
      '🍜': ['拉麵', 'ramen', 'noodle'],
      '🍱': ['便當', 'bento', 'box'],
      '🍣': ['壽司', 'sushi'],
      '🍙': ['飯糰', 'rice', 'ball'],
      '🍰': ['蛋糕', 'cake'],
      '🎂': ['生日蛋糕', 'birthday', 'cake'],
      '🍪': ['餅乾', 'cookie'],
      '🍫': ['巧克力', 'chocolate'],
      '🍬': ['糖果', 'candy'],
      '🍭': ['棒棒糖', 'lollipop'],
      '🍦': ['冰淇淋', 'ice', 'cream'],
      '☕': ['咖啡', 'coffee'],
      '🍵': ['茶', 'tea'],
      '🥤': ['飲料', 'drink', 'cup'],
      '🍺': ['啤酒', 'beer'],
      '🍷': ['紅酒', 'wine'],
      '🥂': ['香檳', 'champagne'],
      // 交通工具關鍵字
      '🚗': ['車', 'car', 'auto'],
      '🚕': ['計程車', 'taxi'],
      '🚙': ['休旅車', 'suv'],
      '🚌': ['公車', 'bus'],
      '🚑': ['救護車', 'ambulance'],
      '🚒': ['消防車', 'fire', 'truck'],
      '🚚': ['卡車', 'truck'],
      '🚲': ['腳踏車', 'bicycle', 'bike'],
      '🛵': ['機車', 'scooter'],
      '✈️': ['飛機', 'airplane', 'plane'],
      '🚀': ['火箭', 'rocket'],
      '🚢': ['船', 'ship', 'boat'],
      '⛵': ['帆船', 'sailboat'],
      '🏠': ['房子', 'house', 'home'],
      '🏢': ['辦公大樓', 'office', 'building'],
      '🏥': ['醫院', 'hospital'],
      '🏦': ['銀行', 'bank'],
      '🏪': ['便利商店', 'convenience', 'store'],
      '🏫': ['學校', 'school'],
      '🏰': ['城堡', 'castle'],
      '🗼': ['東京鐵塔', 'tower'],
      '🗽': ['自由女神', 'statue', 'liberty'],
      '⛰': ['山', 'mountain'],
      '🏔': ['雪山', 'snow', 'mountain'],
      '🌋': ['火山', 'volcano'],
      '🏖': ['海灘', 'beach'],
      '⛺': ['帳篷', 'tent', 'camping'],
      '🌅': ['日出', 'sunrise'],
      '🌄': ['日出', 'sunrise', 'mountain'],
      '🌆': ['城市', 'city', 'skyline'],
      '🌃': ['夜景', 'night', 'city'],
      '🌉': ['橋', 'bridge'],
      // 物件關鍵字
      '⌚': ['手錶', 'watch', 'time'],
      '📱': ['手機', 'phone', 'mobile'],
      '💻': ['筆電', 'laptop', 'computer'],
      '⌨️': ['鍵盤', 'keyboard'],
      '🖥': ['電腦', 'computer', 'desktop'],
      '📷': ['相機', 'camera'],
      '📹': ['攝影機', 'video', 'camera'],
      '📺': ['電視', 'tv', 'television'],
      '📻': ['收音機', 'radio'],
      '⏰': ['鬧鐘', 'alarm', 'clock'],
      '⌛': ['沙漏', 'hourglass', 'time'],
      '⏳': ['沙漏', 'hourglass', 'running'],
      '💡': ['燈泡', 'light', 'bulb', 'idea'],
      '🔦': ['手電筒', 'flashlight'],
      '🕯': ['蠟燭', 'candle'],
      '💰': ['錢', 'money', 'bag'],
      '💳': ['信用卡', 'credit', 'card'],
      '💎': ['鑽石', 'diamond', 'gem'],
      '🔒': ['鎖', 'lock'],
      '🔓': ['解鎖', 'unlock'],
      '🔑': ['鑰匙', 'key'],
      '🔨': ['錘子', 'hammer'],
      '🔧': ['扳手', 'wrench', 'tool'],
      '⚙️': ['齒輪', 'gear'],
      '📞': ['電話', 'phone', 'call'],
      '☎️': ['電話', 'phone', 'telephone'],
      '📡': ['衛星', 'satellite', 'dish'],
      '🔋': ['電池', 'battery'],
      '🔌': ['插頭', 'plug'],
      '💊': ['藥', 'pill', 'medicine'],
      '💉': ['針筒', 'syringe', 'injection'],
      '🩹': ['ok繃', 'bandage', 'plaster'],
      '🩺': ['聽診器', 'stethoscope'],
      '🚪': ['門', 'door'],
      '🪑': ['椅子', 'chair'],
      '🛏': ['床', 'bed'],
      '🚿': ['淋浴', 'shower'],
      '🛁': ['浴缸', 'bathtub'],
      '🚽': ['馬桶', 'toilet'],
      '🧹': ['掃把', 'broom'],
      '🧺': ['籃子', 'basket'],
      '🧻': ['衛生紙', 'toilet', 'paper'],
      // 標誌關鍵字
      '🔴': ['紅', 'red', 'circle'],
      '🟠': ['橘', 'orange', 'circle'],
      '🟡': ['黃', 'yellow', 'circle'],
      '🟢': ['綠', 'green', 'circle'],
      '🔵': ['藍', 'blue', 'circle'],
      '🟣': ['紫', 'purple', 'circle'],
      '⚫': ['黑', 'black', 'circle'],
      '⚪': ['白', 'white', 'circle'],
      '🟤': ['棕', 'brown', 'circle'],
      '♠️': ['黑桃', 'spade'],
      '♣️': ['梅花', 'club'],
      '♥️': ['紅心', 'heart'],
      '♦️': ['方塊', 'diamond'],
      // 箭頭關鍵字
      '⬆️': ['上', 'up', 'arrow'],
      '➡️': ['右', 'right', 'arrow'],
      '⬇️': ['下', 'down', 'arrow'],
      '⬅️': ['左', 'left', 'arrow'],
      '↕️': ['上下', 'up', 'down'],
      '↔️': ['左右', 'left', 'right'],
      '🔄': ['重新整理', 'refresh', 'reload'],
      '🔙': ['返回', 'back'],
      '🔚': ['結束', 'end'],
      '🔛': ['進行中', 'on'],
      '🔜': ['即將', 'soon'],
      '🔝': ['頂部', 'top'],
      // 時間關鍵字
      '🕐': ['一點', 'one', 'o\'clock'],
      '🕑': ['兩點', 'two', 'o\'clock'],
      '🕒': ['三點', 'three', 'o\'clock'],
      '🕓': ['四點', 'four', 'o\'clock'],
      '🕔': ['五點', 'five', 'o\'clock'],
      '🕕': ['六點', 'six', 'o\'clock'],
      '🕖': ['七點', 'seven', 'o\'clock'],
      '🕗': ['八點', 'eight', 'o\'clock'],
      '🕘': ['九點', 'nine', 'o\'clock'],
      '🕙': ['十點', 'ten', 'o\'clock'],
      '🕚': ['十一點', 'eleven', 'o\'clock'],
      '🕛': ['十二點', 'twelve', 'o\'clock'],
      '📅': ['日曆', 'calendar'],
      '📆': ['日曆', 'calendar', 'tear'],
      '🗓': ['日曆', 'calendar', 'spiral']
    };
  }

  render(searchQuery = '') {
    const query = searchQuery.toLowerCase().trim();
    
    return `
      <div class="emoji-picker">
        <div class="emoji-picker-header">
          <input type="text" class="emoji-picker-search" placeholder="${t('emoji.searchPlaceholder')}" value="${this.escapeHtml(searchQuery)}" />
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
        filteredCategories['searchResults'] = filteredEmojis;
      }
    } else {
      // 正常模式：顯示所有分類
      filteredCategories = this.categories;
    }
    
    // 取得分類的翻譯名稱
    const getCategoryName = (categoryKey) => {
      const translationKey = this.categoryKeyMap[categoryKey];
      return translationKey ? t(translationKey) : categoryKey;
    };
    
    return Object.keys(filteredCategories).length === 0 ? `
      <div style="padding: var(--spacing-xl); text-align: center; color: var(--text-secondary);">
        ${t('emoji.noResults')}
      </div>
    ` : Object.entries(filteredCategories).map(([categoryKey, emojis]) => `
      <div class="emoji-category">
        <div class="emoji-category-title">${getCategoryName(categoryKey)}</div>
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
