// 計數詞 - 詳細內容

export const vocabularyCounting = {
  id: 'category-counting',
  title: {
    'zh-TW': '計數詞',
    'en': 'Counters'
  },
  category: {
    type: 'vocabulary',
    level: 'N5'
  },
  tags: ['basic', 'vocabulary', 'counting', 'numbers', 'topic-category'],
  description: {
    'zh-TW': '日語中的計數詞（助數詞）',
    'en': 'Counters (助數詞) in Japanese'
  },
  content: {
    overview: {
      'zh-TW':
        '日語中的計數詞（助數詞）用於計算不同種類的物品。不同的物品需要使用不同的計數詞，例如：本（細長物品）、枚（扁平物品）、個（一般物品）、匹（小動物）、台（機器）等。了解計數詞對於正確表達數量很重要。',
      'en':
        'Counters (助數詞) in Japanese are used to count different types of items. Different items require different counters, such as: 本 (long thin objects), 枚 (flat objects), 個 (general objects), 匹 (small animals), 台 (machines), etc. Understanding counters is important for correctly expressing quantities.'
    },
    usage: {
      'zh-TW':
        '計數詞的用法：\n' +
        '1. 基本形式：數字＋計數詞（如「3本」「5枚」）\n' +
        '2. 與名詞搭配：名詞＋數字＋計數詞（如「ペン3本」）\n' +
        '3. 注意數字讀音的變化：1本（いっぽん）、3本（さんぼん）、6本（ろっぽん）等',
      'en':
        'Usage of counters:\n' +
        '1. Basic form: number + counter (e.g., "3本", "5枚")\n' +
        '2. With nouns: noun + number + counter (e.g., "ペン3本")\n' +
        '3. Note changes in number pronunciation: 1本 (いっぽん), 3本 (さんぼん), 6本 (ろっぽん), etc.'
    },
    examples: [
      {
        japanese: '<ruby>ペン<rt>ペン</rt></ruby>を<ruby>3<rt>さん</rt></ruby><ruby>本<rt>ぼん</rt></ruby><ruby>買<rt>か</rt></ruby>いました。',
        zhTW: '買了3支筆。',
        en: 'I bought 3 pens.',
        explanation: {
          'zh-TW': '「本」用於計算細長的物品，如筆、瓶子、樹木等。',
          'en': '"本" is used to count long thin objects, such as pens, bottles, trees, etc.'
        }
      },
      {
        japanese: '<ruby>切<rt>きっ</rt></ruby><ruby>手<rt>て</rt></ruby>を<ruby>5<rt>ご</rt></ruby><ruby>枚<rt>まい</rt></ruby><ruby>持<rt>も</rt></ruby>っています。',
        zhTW: '有5張票。',
        en: 'I have 5 tickets.',
        explanation: {
          'zh-TW': '「枚」用於計算扁平的物品，如紙張、票、盤子等。',
          'en': '"枚" is used to count flat objects, such as paper, tickets, plates, etc.'
        }
      },
      {
        japanese: '<ruby>猫<rt>ねこ</rt></ruby>が<ruby>2<rt>に</rt></ruby><ruby>匹<rt>ひき</rt></ruby>います。',
        zhTW: '有2隻貓。',
        en: 'There are 2 cats.',
        explanation: {
          'zh-TW': '「匹」用於計算小動物，如貓、狗、魚等。',
          'en': '"匹" is used to count small animals, such as cats, dogs, fish, etc.'
        }
      }
    ],
    vocabulary: [
      {
        japanese: '<ruby>本<rt>ほん</rt></ruby>',
        zhTW: '本（細長物品）',
        en: '本 (long thin objects)',
        notes: {
          'zh-TW': '用於筆、瓶子、樹木、傘等',
          'en': 'For pens, bottles, trees, umbrellas, etc.'
        }
      },
      {
        japanese: '<ruby>枚<rt>まい</rt></ruby>',
        zhTW: '枚（扁平物品）',
        en: '枚 (flat objects)',
        notes: {
          'zh-TW': '用於紙張、票、盤子、衣服等',
          'en': 'For paper, tickets, plates, clothes, etc.'
        }
      },
      {
        japanese: '<ruby>個<rt>こ</rt></ruby>',
        zhTW: '個（一般物品）',
        en: '個 (general objects)',
        notes: {
          'zh-TW': '用於一般的小物品，如蘋果、球、雞蛋等',
          'en': 'For general small objects, such as apples, balls, eggs, etc.'
        }
      },
      {
        japanese: '<ruby>匹<rt>ひき</rt></ruby>',
        zhTW: '匹（小動物）',
        en: '匹 (small animals)',
        notes: {
          'zh-TW': '用於貓、狗、魚、蟲等小動物',
          'en': 'For small animals such as cats, dogs, fish, insects, etc.'
        }
      },
      {
        japanese: '<ruby>台<rt>だい</rt></ruby>',
        zhTW: '台（機器、車輛）',
        en: '台 (machines, vehicles)',
        notes: {
          'zh-TW': '用於車、電腦、電視、洗衣機等',
          'en': 'For cars, computers, TVs, washing machines, etc.'
        }
      },
      {
        japanese: '<ruby>人<rt>にん</rt></ruby>',
        zhTW: '人（人數）',
        en: '人 (people)',
        notes: {
          'zh-TW': '用於計算人數，注意1人和2人的讀音特殊',
          'en': 'For counting people, note special readings for 1人 and 2人'
        }
      },
      {
        japanese: '<ruby>冊<rt>さつ</rt></ruby>',
        zhTW: '冊（書籍）',
        en: '冊 (books)',
        notes: {
          'zh-TW': '用於計算書本、雜誌等',
          'en': 'For counting books, magazines, etc.'
        }
      },
      {
        japanese: '<ruby>杯<rt>はい</rt></ruby>',
        zhTW: '杯（飲料、液體）',
        en: '杯 (drinks, liquids)',
        notes: {
          'zh-TW': '用於計算飲料、湯等液體',
          'en': 'For counting drinks, soup, and other liquids'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 記住常用計數詞及其對應的物品類型。\n' +
        '2. 注意數字讀音在計數詞前的變化（如1本→いっぽん、3本→さんぼん）。\n' +
        '3. 特殊讀音：1人（ひとり）、2人（ふたり）、4人（よにん）。\n' +
        '4. 日常對話中最常用的是「個」，可以作為通用計數詞。',
      'en':
        'Learning tips:\n' +
        '1. Remember common counters and their corresponding item types.\n' +
        '2. Note changes in number pronunciation before counters (e.g., 1本→いっぽん, 3本→さんぼん).\n' +
        '3. Special readings: 1人 (ひとり), 2人 (ふたり), 4人 (よにん).\n' +
        '4. "個" is the most commonly used in daily conversation and can serve as a general counter.'
    }
  }
};

