// 助詞「より」 - 詳細內容

export const grammarParticlesYori = {
  id: 'grammar-particles-yori',
  title: {
    'zh-TW': '助詞「より」',
    'en': 'Particle "より"'
  },
  category: {
    type: 'grammar',
    level: 'N4'
  },
  tags: ['grammar', 'particle'],
  description: {
    'zh-TW': '助詞「より」用於表示比較基準，意思是「比...」',
    'en': 'The particle "より" is used to indicate a standard of comparison, meaning "than..."'
  },
  content: {
    overview: {
      'zh-TW':
        '助詞「より」用於表示比較的基準，意思是「比...」。通常與形容詞的比較級一起使用，構成「AはBより...」的句型，表示「A比B...」。',
      'en':
        'The particle "より" is used to indicate a standard of comparison, meaning "than...". Usually used together with comparative forms of adjectives, forming the pattern "AはBより..." meaning "A is ... than B".'
    },
    usage: {
      'zh-TW':
        '「より」的用法：\n' +
        '1. 表示比較：比...（如「東京は大阪より大きい」）\n' +
        '2. 表示起點：從...（如「9時より開始」）\n' +
        '3. 表示選擇：與其...不如...（如「行くより帰る」）',
      'en':
        'Usage of "より":\n' +
        '1. Indicate comparison: than... (e.g., 「東京は大阪より大きい」)\n' +
        '2. Indicate starting point: from... (e.g., 「9時より開始」)\n' +
        '3. Indicate choice: rather than... (e.g., 「行くより帰る」)'
    },
    examples: [
      {
        japanese: '<ruby>東京<rt>とうきょう</rt></ruby>は<ruby>大阪<rt>おおさか</rt></ruby>より<ruby>大<rt>おお</rt></ruby>きいです。',
        zhTW: '東京比大阪大。',
        en: 'Tokyo is bigger than Osaka.',
        explanation: {
          'zh-TW': '「より」表示比較基準，「比大阪」。',
          'en': '"より" indicates the standard of comparison, "than Osaka".'
        }
      },
      {
        japanese: '<ruby>私<rt>わたし</rt></ruby>は<ruby>魚<rt>さかな</rt></ruby>より<ruby>肉<rt>にく</rt></ruby>が<ruby>好<rt>す</rt></ruby>きです。',
        zhTW: '我喜歡肉勝過魚。',
        en: 'I like meat more than fish.',
        explanation: {
          'zh-TW': '「より」表示比較，「比魚更喜歡肉」。',
          'en': '"より" indicates comparison, "like meat more than fish".'
        }
      },
      {
        japanese: '<ruby>会<rt>かい</rt></ruby><ruby>議<rt>ぎ</rt></ruby>は<ruby>9<rt>きゅう</rt></ruby><ruby>時<rt>じ</rt></ruby>より<ruby>始<rt>はじ</rt></ruby>まります。',
        zhTW: '會議從9點開始。',
        en: 'The meeting starts from 9 o\'clock.',
        explanation: {
          'zh-TW': '「より」表示起點，「從9點」。',
          'en': '"より" indicates the starting point, "from 9 o\'clock".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「より」最常用的用法是表示比較，構成「AはBより...」的句型。\n' +
        '2. 表示起點時，「より」與「から」意思相近，但「より」更正式。\n' +
        '3. 注意「より」和「ほど」的區別：「より」用於肯定句，「ほど」用於否定句。',
      'en':
        'Learning tips:\n' +
        '1. The most common use of "より" is to indicate comparison, forming the pattern "AはBより...".\n' +
        '2. When indicating starting point, "より" is similar to "から" but more formal.\n' +
        '3. Note the difference between "より" and "ほど": "より" is used in affirmative sentences, "ほど" in negative sentences.'
    },
    relatedContent: [
      {
        id: 'grammar-particles-kara',
        title: {
          'zh-TW': '助詞「から」',
          'en': 'Particle "から"'
        }
      },
      {
        id: 'grammar-particles-hodo',
        title: {
          'zh-TW': '助詞「ほど」',
          'en': 'Particle "ほど"'
        }
      }
    ]
  }
};


