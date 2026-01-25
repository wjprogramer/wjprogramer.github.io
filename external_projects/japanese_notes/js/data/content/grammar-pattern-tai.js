// 句型「〜たい」 - 詳細內容

export const grammarPatternTai = {
  id: 'grammar-pattern-tai',
  title: {
    'zh-TW': '句型「〜たい」',
    'en': 'Pattern "〜たい"'
  },
  category: {
    type: 'grammar',
    level: 'N5'
  },
  tags: ['basic', 'grammar'],
  description: {
    'zh-TW': '「〜たい」表示「想要...」的願望',
    'en': '"〜たい" expresses the desire "want to..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜たい」接在動詞的「ます形」詞幹後面，表示「想要...」的願望。這是表達個人願望的常用句型。',
      'en':
        '"〜たい" is attached to the stem of a verb in ます form to express the desire "want to...". This is a common pattern for expressing personal wishes.'
    },
    usage: {
      'zh-TW':
        '「〜たい」的用法：\n' +
        '1. 表示願望：想要...（如「食べたい」「行きたい」）\n' +
        '2. 變化：たい形可以像形容詞一樣變化（如「食べたくない」「食べたかった」）\n' +
        '3. 注意：たい形通常用於第一人稱，第三人稱時需要加上「〜たいと言っている」等',
      'en':
        'Usage of "〜たい":\n' +
        '1. Express desire: want to... (e.g., 「食べたい」「行きたい」)\n' +
        '2. Conjugation: たい form can be conjugated like an adjective (e.g., 「食べたくない」「食べたかった」)\n' +
        '3. Note: たい form is usually used for first person; for third person, add "〜たいと言っている" etc.'
    },
    examples: [
      {
        japanese: '<ruby>日<rt>に</rt></ruby><ruby>本<rt>ほん</rt></ruby>の<ruby>料<rt>りょう</rt></ruby><ruby>理<rt>り</rt></ruby>を<ruby>食<rt>た</rt></ruby>べたいです。',
        zhTW: '想吃日本料理。',
        en: 'I want to eat Japanese food.',
        explanation: {
          'zh-TW': '「食べたい」表示「想要吃」的願望。',
          'en': '"食べたい" expresses the desire "want to eat".'
        }
      },
      {
        japanese: '<ruby>東<rt>とう</rt></ruby><ruby>京<rt>きょう</rt></ruby>へ<ruby>行<rt>い</rt></ruby>きたいです。',
        zhTW: '想去東京。',
        en: 'I want to go to Tokyo.',
        explanation: {
          'zh-TW': '「行きたい」表示「想要去」的願望。',
          'en': '"行きたい" expresses the desire "want to go".'
        }
      },
      {
        japanese: '<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>みたくないです。',
        zhTW: '不想讀書。',
        en: 'I don\'t want to read a book.',
        explanation: {
          'zh-TW': '「たい形」的否定形是「たくない」。',
          'en': 'The negative form of たい form is "たくない".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜たい」接在動詞「ます形」的詞幹後面（去掉「ます」）。\n' +
        '2. 「たい形」可以像形容詞一樣變化：たい、たくない、たかった、たくなかった。\n' +
        '3. 注意「たい形」通常用於第一人稱，第三人稱時需要加上「と言っている」等表達。',
      'en':
        'Learning tips:\n' +
        '1. "〜たい" is attached to the stem of a verb in ます form (remove "ます").\n' +
        '2. たい form can be conjugated like an adjective: たい, たくない, たかった, たくなかった.\n' +
        '3. Note that たい form is usually used for first person; for third person, add expressions like "と言っている".'
    },
    relatedContent: [
      {
        id: 'grammar-verb-te-form',
        title: {
          'zh-TW': '動詞て形',
          'en': 'Verb て Form'
        }
      },
      {
        id: 'grammar-pattern-nakereba-naranai',
        title: {
          'zh-TW': '句型「〜なければならない」',
          'en': 'Pattern "〜なければならない"'
        }
      }
    ]
  }
};

