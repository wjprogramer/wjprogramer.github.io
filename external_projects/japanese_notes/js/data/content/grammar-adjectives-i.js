// い形容詞 - 詳細內容

export const grammarAdjectivesI = {
  id: 'grammar-adjectives-i',
  title: {
    'zh-TW': 'い形容詞',
    'en': 'I-Adjectives'
  },
  category: {
    type: 'grammar',
    level: 'N5'
  },
  tags: ['basic', 'grammar', 'adjective'],
  description: {
    'zh-TW': 'い形容詞是以「い」結尾的形容詞，如「高い」「新しい」',
    'en': 'い-adjectives end with "い", such as "高い" (high) and "新しい" (new)'
  },
  content: {
    overview: {
      'zh-TW': 'い形容詞（い形容詞）是以「い」結尾的形容詞，可以直接修飾名詞，也可以單獨使用。這是日文中最常見的形容詞類型。',
      'en': 'い-adjectives (い形容詞) are adjectives ending with "い". They can directly modify nouns or be used alone. This is the most common type of adjective in Japanese.'
    },
    usage: {
      'zh-TW': '使用方式：\n1. 直接修飾名詞：高い山（高山）\n2. 接「です」表示禮貌：高いです（很高）\n3. 接「くて」連接形容詞：高くて大きい（又高又大）',
      'en': 'Usage:\n1. Directly modify nouns: 高い山 (high mountain)\n2. Follow with "です" for politeness: 高いです (is high)\n3. Follow with "くて" to connect adjectives: 高くて大きい (high and big)'
    },
    examples: [
      {
        japanese: 'この<ruby>山<rt>やま</rt></ruby>は<ruby>高<rt>たか</rt></ruby>いです。',
        reading: 'このやまはたかいです。',
        zhTW: '這座山很高。',
        en: 'This mountain is high.',
        explanation: {
          'zh-TW': '「高い」是い形容詞，後面接「です」表示禮貌。',
          'en': '"高い" is an い-adjective, followed by "です" to show politeness.'
        }
      },
      {
        japanese: '<ruby>新<rt>あたら</rt></ruby>しい<ruby>本<rt>ほん</rt></ruby>を<ruby>買<rt>か</rt></ruby>いました。',
        reading: 'あたらしいほんをかいました。',
        zhTW: '買了新書。',
        en: 'I bought a new book.',
        explanation: {
          'zh-TW': '「新しい」直接修飾名詞「本」。',
          'en': '"新しい" directly modifies the noun "本".'
        }
      },
      {
        japanese: 'この<ruby>部<rt>へ</rt></ruby><ruby>屋<rt>や</rt></ruby>は<ruby>広<rt>ひろ</rt></ruby>くて<ruby>明<rt>あか</rt></ruby>るいです。',
        reading: 'このへやはひろくてあかるいです。',
        zhTW: '這個房間又寬敞又明亮。',
        en: 'This room is spacious and bright.',
        explanation: {
          'zh-TW': '「広い」變成「広くて」來連接另一個形容詞。',
          'en': '"広い" becomes "広くて" to connect with another adjective.'
        }
      }
    ],
    commonAdjectives: [
      {
        japanese: '<ruby>高<rt>たか</rt></ruby>い',
        meaning: {
          'zh-TW': '高的、貴的',
          'en': 'high, expensive'
        }
      },
      {
        japanese: '<ruby>低<rt>ひく</rt></ruby>い',
        meaning: {
          'zh-TW': '低的',
          'en': 'low'
        }
      },
      {
        japanese: '<ruby>新<rt>あたら</rt></ruby>しい',
        meaning: {
          'zh-TW': '新的',
          'en': 'new'
        }
      },
      {
        japanese: '<ruby>古<rt>ふる</rt></ruby>い',
        meaning: {
          'zh-TW': '舊的',
          'en': 'old'
        }
      },
      {
        japanese: '<ruby>大<rt>おお</rt></ruby>きい',
        meaning: {
          'zh-TW': '大的',
          'en': 'big'
        }
      },
      {
        japanese: '<ruby>小<rt>ちい</rt></ruby>さい',
        meaning: {
          'zh-TW': '小的',
          'en': 'small'
        }
      }
    ],
    relatedContent: [
      {
        id: 'grammar-adjectives-na',
        title: {
          'zh-TW': 'な形容詞',
          'en': 'Na-Adjectives'
        }
      }
    ]
  }
};

