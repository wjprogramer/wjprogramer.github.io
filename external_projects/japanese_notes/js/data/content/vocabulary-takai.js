// 高い - 詳細內容（更新）

export const vocabularyTakai = {
  id: 'vocabulary-takai',
  title: {
    'zh-TW': '高い',
    'en': '高い'
  },
  japanese: '<ruby>高<rt>たか</rt></ruby>い',
  category: {
    type: 'vocabulary',
    level: 'N5'
  },
  tags: ['basic', 'vocabulary', 'i-adjective'],
  meaning: {
    'zh-TW': '高的、貴的',
    'en': 'high, expensive'
  },
  content: {
    overview: {
      'zh-TW': '「高い」是い形容詞，有兩個意思：1. 高的（高度）2. 貴的（價格）。根據上下文可以區分。與「低い」「安い」相對。',
      'en': '"高い" is an い-adjective with two meanings: 1. high (height) 2. expensive (price). The meaning can be distinguished by context. It is the opposite of "低い" and "安い".'
    },
    examples: [
      {
        japanese: '<ruby>高<rt>たか</rt></ruby>い<ruby>山<rt>やま</rt></ruby>です。',
        reading: 'たかいやまです。',
        zhTW: '是高山。',
        en: 'It is a high mountain.',
        explanation: {
          'zh-TW': '這裡「高い」表示高度高。',
          'en': 'Here "高い" means high in height.'
        }
      },
      {
        japanese: 'この<ruby>本<rt>ほん</rt></ruby>は<ruby>高<rt>たか</rt></ruby>いです。',
        reading: 'このほんはたかいです。',
        zhTW: '這本書很貴。',
        en: 'This book is expensive.',
        explanation: {
          'zh-TW': '這裡「高い」表示價格貴。',
          'en': 'Here "高い" means expensive.'
        }
      },
      {
        japanese: 'とても<ruby>高<rt>たか</rt></ruby>いです。',
        reading: 'とてもたかいです。',
        zhTW: '非常高/貴。',
        en: 'It is very high/expensive.'
      }
    ],
    relatedWords: [
      {
        id: 'vocabulary-hikui',
        title: {
          'zh-TW': '低い',
          'en': '低い'
        }
      },
      {
        id: 'vocabulary-yasui',
        title: {
          'zh-TW': '安い',
          'en': '安い'
        }
      }
    ]
  }
};
