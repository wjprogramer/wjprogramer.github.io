// 一 - 詳細內容（數字）

export const vocabularyIchi = {
  id: 'vocabulary-ichi',
  title: {
    'zh-TW': '一',
    'en': '一'
  },
  japanese: '<ruby>一<rt>いち</rt></ruby>',
  category: {
    type: 'vocabulary',
    level: 'N5'
  },
  tags: ['basic', 'vocabulary', 'number'],
  meaning: {
    'zh-TW': '一、一個',
    'en': 'one'
  },
  content: {
    overview: {
      'zh-TW': '「一」是數字1。日文的數字系統有音讀和訓讀兩種讀法。',
      'en': '"一" is the number 1. Japanese numbers have both 音讀 and 訓讀.'
    },
    examples: [
      {
        japanese: '<ruby>一<rt>ひと</rt></ruby>つ',
        zhTW: '一個',
        en: 'one (thing)',
        explanation: {
          'zh-TW': '訓讀「ひとつ」用於計數物品。',
          'en': '訓讀 "ひとつ" is used for counting things.'
        }
      },
      {
        japanese: '<ruby>一<rt>ひと</rt></ruby><ruby>人<rt>り</rt></ruby>',
        zhTW: '一個人',
        en: 'one person',
        explanation: {
          'zh-TW': '「一人」讀作「ひとり」，用於計數人數。',
          'en': '"一人" (ひとり) is used for counting people.'
        }
      },
      {
        japanese: '<ruby>一<rt>いち</rt></ruby><ruby>時<rt>じ</rt></ruby><ruby>間<rt>かん</rt></ruby>',
        zhTW: '一小時',
        en: 'one hour'
      }
    ],
    relatedWords: [
      {
        id: 'kanji-hon',
        title: {
          'zh-TW': '本',
          'en': '本'
        }
      }
    ]
  }
};

