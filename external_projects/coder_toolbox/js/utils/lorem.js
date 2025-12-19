/**
 * Lorem Ipsum 生成器工具
 */

/**
 * 預設 Lorem Ipsum 文字
 */
const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

/**
 * 生成隨機單詞
 * @param {number} count - 單詞數量
 * @returns {string[]}
 */
function getRandomWords(count) {
  const words = [];
  for (let i = 0; i < count; i++) {
    words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
  }
  return words;
}

/**
 * 生成 Lorem Ipsum 文字
 * @param {string} type - 類型 ('words' | 'sentences' | 'paragraphs')
 * @param {number} count - 數量
 * @param {boolean} startWithLorem - 是否以 "Lorem ipsum" 開頭
 * @returns {string}
 */
export function generateLorem(type = 'paragraphs', count = 1, startWithLorem = true) {
  switch (type) {
    case 'words':
      return generateWords(count, startWithLorem);
    case 'sentences':
      return generateSentences(count, startWithLorem);
    case 'paragraphs':
      return generateParagraphs(count, startWithLorem);
    default:
      return generateParagraphs(count, startWithLorem);
  }
}

/**
 * 生成單詞
 */
function generateWords(count, startWithLorem) {
  if (startWithLorem && count >= 2) {
    return 'Lorem ipsum ' + getRandomWords(count - 2).join(' ');
  }
  return getRandomWords(count).join(' ');
}

/**
 * 生成句子
 */
function generateSentences(count, startWithLorem) {
  const sentences = [];
  
  if (startWithLorem && count > 0) {
    sentences.push('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
    count--;
  }
  
  for (let i = 0; i < count; i++) {
    const wordCount = Math.floor(Math.random() * 15) + 8; // 8-22 個單詞
    const words = getRandomWords(wordCount);
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    sentences.push(words.join(' ') + '.');
  }
  
  return sentences.join(' ');
}

/**
 * 生成段落
 */
function generateParagraphs(count, startWithLorem) {
  const paragraphs = [];
  
  for (let i = 0; i < count; i++) {
    const sentenceCount = Math.floor(Math.random() * 4) + 3; // 3-6 個句子
    let paragraph;
    
    if (i === 0 && startWithLorem) {
      paragraph = generateSentences(sentenceCount, true);
    } else {
      paragraph = generateSentences(sentenceCount, false);
    }
    
    paragraphs.push(paragraph);
  }
  
  return paragraphs.join('\n\n');
}

/**
 * 生成隨機文字（中文）
 * @param {string} type - 類型 ('words' | 'sentences' | 'paragraphs')
 * @param {number} count - 數量
 * @returns {string}
 */
export function generateChineseLorem(type = 'paragraphs', count = 1) {
  const chineseWords = [
    '的', '一', '是', '在', '不', '了', '有', '和', '人', '這', '中', '大', '為', '上', '個', '國', '我', '以', '要', '他',
    '時', '來', '用', '們', '生', '到', '作', '地', '於', '出', '就', '分', '對', '成', '會', '可', '主', '發', '年', '動',
    '同', '工', '也', '能', '下', '過', '子', '說', '產', '種', '面', '而', '方', '後', '多', '定', '行', '學', '法', '所',
    '民', '得', '經', '十', '三', '之', '進', '著', '等', '部', '度', '家', '電', '力', '裡', '如', '水', '化', '高', '自',
    '理', '實', '物', '體', '本', '全', '加', '量', '兩', '長', '制', '機', '當', '使', '點', '從', '業', '本', '去', '把',
    '性', '好', '應', '開', '它', '合', '還', '因', '由', '其', '些', '然', '前', '外', '天', '政', '四', '日', '那', '社',
    '義', '事', '平', '形', '相', '全', '表', '間', '樣', '與', '關', '各', '重', '新', '線', '內', '數', '正', '心', '反',
    '你', '明', '看', '原', '又', '麼', '利', '比', '或', '但', '質', '氣', '第', '向', '道', '命', '此', '變', '條', '只',
    '沒', '結', '解', '問', '意', '建', '月', '公', '無', '系', '軍', '很', '情', '者', '最', '立', '代', '想', '已', '通',
    '並', '提', '直', '題', '黨', '程', '展', '五', '果', '料', '象', '員', '革', '位', '入', '常', '文', '總', '次', '品',
    '式', '活', '設', '及', '管', '特', '件', '長', '求', '老', '頭', '基', '資', '邊', '流', '路', '級', '少', '圖', '山',
    '統', '接', '知', '較', '將', '組', '見', '計', '別', '她', '手', '角', '期', '根', '論', '運', '農', '指', '幾', '九',
    '區', '強', '放', '決', '西', '被', '幹', '做', '必', '戰', '先', '回', '則', '任', '取', '據', '處', '隊', '南', '給',
    '色', '光', '門', '即', '保', '治', '北', '造', '百', '規', '熱', '領', '七', '海', '口', '東', '導', '器', '壓', '志',
    '世', '金', '增', '爭', '濟', '階', '油', '思', '術', '極', '交', '受', '聯', '什', '認', '六', '共', '權', '收', '證',
    '改', '清', '己', '美', '再', '採', '轉', '更', '單', '風', '切', '打', '白', '教', '速', '花', '帶', '安', '場', '身',
    '車', '例', '真', '務', '具', '萬', '每', '目', '至', '達', '走', '積', '示', '議', '聲', '報', '鬥', '完', '類', '離',
    '離', '字', '母', '細', '練', '縣', '屬', '照', '查', '半', '值', '且', '驗', '院', '商', '狀', '織', '須', '研', '界',
    '拉', '述', '律', '許', '確', '群', '增', '便', '習', '空', '列', '號', '題', '寫', '軍', '元', '助', '升', '王', '操',
    '熱', '甚', '至', '迅', '防', '何', '校', '古', '呢', '稻', '寧', '聽', '唯', '輸', '滑', '站', '另', '衛', '字', '鼓',
    '剛', '寫', '劉', '微', '略', '範', '供', '阿', '塊', '某', '功', '套', '友', '限', '項', '餘', '倒', '卷', '創', '律',
    '雨', '讓', '骨', '遠', '幫', '初', '皮', '播', '優', '占', '死', '毒', '圈', '偉', '季', '訓', '控', '激', '找', '叫',
    '雲', '互', '跟', '裂', '糧', '母', '練', '塞', '鋼', '頂', '策', '雙', '留', '誤', '礎', '吸', '阻', '故', '寸', '盾',
    '晚', '絲', '女', '散', '焊', '功', '株', '親', '院', '冷', '徹', '彈', '錯', '散', '商', '視', '藝', '滅', '版', '烈',
    '零', '室', '輕', '血', '倍', '缺', '厘', '泵', '察', '絕', '富', '城', '衝', '噴', '壤', '簡', '否', '柱', '李', '望',
    '盤', '磁', '雄', '似', '困', '鞏', '益', '洲', '脫', '投', '送', '奴', '側', '潤', '蓋', '揮', '距', '觸', '星', '松',
    '獲', '獨', '官', '混', '紀', '座', '依', '未', '突', '架', '寬', '冬', '興', '章', '濕', '偏', '紋', '執', '礦', '寨',
    '責', '閥', '熟', '吃', '穩', '奪', '硬', '價', '努', '翻', '奇', '甲', '預', '職', '評', '讀', '背', '協', '損', '棉',
    '侵', '灰', '雖', '矛', '厚', '羅', '泥', '辟', '告', '卵', '箱', '掌', '氧', '恩', '愛', '停', '曾', '溶', '營', '終',
    '綱', '孟', '錢', '待', '盡', '俄', '縮', '沙', '退', '陳', '討', '奮', '械', '胞', '幼', '哪', '剝', '迫', '旋', '征',
    '槽', '倒', '握', '擔', '仍', '呀', '載', '吧', '粗', '介', '鑽', '逐', '弱', '彎', '末', '陰', '薄', '芳', '搞', '宣',
    '延', '廷', '異', '巷', '弄', '插', '秧', '稻', '穗', '穀', '粒', '麥', '黍', '稷', '豆', '菽', '麻', '桑', '蠶', '絲',
    '棉', '絮', '紡', '織', '染', '繡', '縫', '補', '裁', '剪', '針', '線', '布', '帛', '綢', '緞', '錦', '繡', '絹', '紗',
    '羅', '綾', '緋', '緋', '緋', '緋', '緋', '緋', '緋', '緋', '緋', '緋', '緋', '緋', '緋', '緋', '緋', '緋', '緋', '緋'
  ];

  switch (type) {
    case 'words':
      return generateChineseWords(chineseWords, count);
    case 'sentences':
      return generateChineseSentences(chineseWords, count);
    case 'paragraphs':
      return generateChineseParagraphs(chineseWords, count);
    default:
      return generateChineseParagraphs(chineseWords, count);
  }
}

/**
 * 生成中文單詞
 */
function generateChineseWords(words, count) {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(words[Math.floor(Math.random() * words.length)]);
  }
  return result.join('');
}

/**
 * 生成中文句子
 */
function generateChineseSentences(words, count) {
  const sentences = [];
  for (let i = 0; i < count; i++) {
    const wordCount = Math.floor(Math.random() * 15) + 8;
    const sentence = [];
    for (let j = 0; j < wordCount; j++) {
      sentence.push(words[Math.floor(Math.random() * words.length)]);
    }
    sentences.push(sentence.join('') + '。');
  }
  return sentences.join(' ');
}

/**
 * 生成中文段落
 */
function generateChineseParagraphs(words, count) {
  const paragraphs = [];
  for (let i = 0; i < count; i++) {
    const sentenceCount = Math.floor(Math.random() * 4) + 3;
    const paragraph = [];
    for (let j = 0; j < sentenceCount; j++) {
      const wordCount = Math.floor(Math.random() * 15) + 8;
      const sentence = [];
      for (let k = 0; k < wordCount; k++) {
        sentence.push(words[Math.floor(Math.random() * words.length)]);
      }
      paragraph.push(sentence.join('') + '。');
    }
    paragraphs.push(paragraph.join(''));
  }
  return paragraphs.join('\n\n');
}

