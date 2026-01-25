// 助詞「ほど」 - 詳細內容

export const grammarParticlesHodo = {
  id: 'grammar-particles-hodo',
  title: {
    'zh-TW': '助詞「ほど」',
    'en': 'Particle "ほど"'
  },
  category: {
    type: 'grammar',
    level: 'N4'
  },
  tags: ['grammar', 'particle'],
  description: {
    'zh-TW': '助詞「ほど」用於表示程度、比較等',
    'en': 'The particle "ほど" is used to indicate degree, comparison, etc.'
  },
  content: {
    overview: {
      'zh-TW':
        '助詞「ほど」有多種用法，主要用於表示程度、比較等。在否定句中表示「沒有比...更...」，在肯定句中表示「到...的程度」。',
      'en':
        'The particle "ほど" has multiple uses, mainly to indicate degree, comparison, etc. In negative sentences, it means "not as...as...", and in affirmative sentences, it means "to the extent of...".'
    },
    usage: {
      'zh-TW':
        '「ほど」的用法：\n' +
        '1. 表示程度（否定句）：沒有比...更...（如「東京ほど大きくない」）\n' +
        '2. 表示程度（肯定句）：到...的程度（如「死ぬほど疲れた」）\n' +
        '3. 表示大約：大約...（如「1時間ほど」）',
      'en':
        'Usage of "ほど":\n' +
        '1. Indicate degree (negative): not as...as... (e.g., 「東京ほど大きくない」)\n' +
        '2. Indicate degree (affirmative): to the extent of... (e.g., 「死ぬほど疲れた」)\n' +
        '3. Indicate approximation: about... (e.g., 「1時間ほど」)'
    },
    examples: [
      {
        japanese: '<ruby>大阪<rt>おおさか</rt></ruby>は<ruby>東京<rt>とうきょう</rt></ruby>ほど<ruby>大<rt>おお</rt></ruby>きくないです。',
        zhTW: '大阪沒有東京那麼大。',
        en: 'Osaka is not as big as Tokyo.',
        explanation: {
          'zh-TW': '「ほど」與否定形連用，表示「沒有比...更...」。',
          'en': '"ほど" used with negative form means "not as...as...".'
        }
      },
      {
        japanese: '<ruby>死<rt>し</rt></ruby>ぬほど<ruby>疲<rt>つか</rt></ruby>れました。',
        zhTW: '累得要死。',
        en: 'I am extremely tired.',
        explanation: {
          'zh-TW': '「ほど」表示程度，「到死的程度」，即「非常累」。',
          'en': '"ほど" indicates degree, "to the extent of death", meaning "extremely tired".'
        }
      },
      {
        japanese: '<ruby>1<rt>いち</rt></ruby><ruby>時間<rt>じかん</rt></ruby>ほど<ruby>待<rt>ま</rt></ruby>ちました。',
        zhTW: '等了約1小時。',
        en: 'I waited for about one hour.',
        explanation: {
          'zh-TW': '「ほど」表示大約，「約1小時」。',
          'en': '"ほど" indicates approximation, "about one hour".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「ほど」在否定句中表示「沒有比...更...」，與「より」相對。\n' +
        '2. 「ほど」在肯定句中表示「到...的程度」，常用於誇張表達。\n' +
        '3. 「ほど」也可以表示大約的時間或數量。',
      'en':
        'Learning tips:\n' +
        '1. "ほど" in negative sentences means "not as...as...", opposite to "より".\n' +
        '2. "ほど" in affirmative sentences means "to the extent of...", often used for exaggeration.\n' +
        '3. "ほど" can also indicate approximate time or quantity.'
    },
    relatedContent: [
      {
        id: 'grammar-particles-yori',
        title: {
          'zh-TW': '助詞「より」',
          'en': 'Particle "より"'
        }
      },
      {
        id: 'grammar-particles-kara',
        title: {
          'zh-TW': '助詞「から」',
          'en': 'Particle "から"'
        }
      }
    ]
  }
};


