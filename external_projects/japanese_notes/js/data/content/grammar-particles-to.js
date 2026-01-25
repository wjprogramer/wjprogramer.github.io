// 助詞「と」 - 詳細內容

export const grammarParticlesTo = {
  id: 'grammar-particles-to',
  title: {
    'zh-TW': '助詞「と」',
    'en': 'Particle "と"'
  },
  category: {
    type: 'grammar',
    level: 'N5'
  },
  tags: ['basic', 'grammar', 'particle'],
  description: {
    'zh-TW': '助詞「と」用於表示「和、與」，以及引用、條件等',
    'en': 'The particle "と" is used to mean "and, with", as well as quotation, condition, etc.'
  },
  content: {
    overview: {
      'zh-TW':
        '助詞「と」有多種用法，最常用的是表示「和、與」，連接兩個名詞。此外還可以用於引用、表示條件等。',
      'en':
        'The particle "と" has multiple uses. The most common is to mean "and, with", connecting two nouns. It can also be used for quotation and to indicate conditions.'
    },
    usage: {
      'zh-TW':
        '「と」的用法：\n' +
        '1. 表示「和、與」：連接兩個名詞（如「本とペン」）\n' +
        '2. 表示「和...一起」：與某人一起（如「友達と行く」）\n' +
        '3. 表示引用：說、想等（如「〜と言う」「〜と思う」）\n' +
        '4. 表示條件：如果（如「雨が降ると」）',
      'en':
        'Usage of "と":\n' +
        '1. Mean "and, with": connect two nouns (e.g., 「本とペン」)\n' +
        '2. Mean "together with": with someone (e.g., 「友達と行く」)\n' +
        '3. Indicate quotation: say, think, etc. (e.g., 「〜と言う」「〜と思う」)\n' +
        '4. Indicate condition: if (e.g., 「雨が降ると」)'
    },
    examples: [
      {
        japanese: '<ruby>本<rt>ほん</rt></ruby>と<ruby>ペン<rt>ペン</rt></ruby>を<ruby>買<rt>か</rt></ruby>いました。',
        zhTW: '買了書和筆。',
        en: 'I bought a book and a pen.',
        explanation: {
          'zh-TW': '「と」連接兩個名詞，表示「和」。',
          'en': '"と" connects two nouns, meaning "and".'
        }
      },
      {
        japanese: '<ruby>友<rt>とも</rt></ruby><ruby>達<rt>だち</rt></ruby>と<ruby>映<rt>えい</rt></ruby><ruby>画<rt>が</rt></ruby>を<ruby>見<rt>み</rt></ruby>ます。',
        zhTW: '和朋友一起看電影。',
        en: 'I watch a movie with my friend.',
        explanation: {
          'zh-TW': '「と」表示「和...一起」。',
          'en': '"と" means "together with".'
        }
      },
      {
        japanese: '<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>ると<ruby>家<rt>いえ</rt></ruby>に<ruby>帰<rt>かえ</rt></ruby>ります。',
        zhTW: '如果下雨就回家。',
        en: 'If it rains, I will go home.',
        explanation: {
          'zh-TW': '「と」表示條件，「如果...就...」。',
          'en': '"と" indicates a condition, "if...then...".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「と」連接名詞時，表示「和、與」，與「や」不同，「と」表示「全部列舉」。\n' +
        '2. 表示「和...一起」時，「と」後面通常接動詞。\n' +
        '3. 表示引用時，「と」後面接「言う」「思う」等動詞。',
      'en':
        'Learning tips:\n' +
        '1. When "と" connects nouns, it means "and, with", different from "や". "と" means "complete enumeration".\n' +
        '2. When meaning "together with", "と" is usually followed by a verb.\n' +
        '3. When indicating quotation, "と" is followed by verbs like "言う" or "思う".'
    },
    relatedContent: [
      {
        id: 'grammar-particles-ya',
        title: {
          'zh-TW': '助詞「や」',
          'en': 'Particle "や"'
        }
      },
      {
        id: 'grammar-particles-mo',
        title: {
          'zh-TW': '助詞「も」',
          'en': 'Particle "も"'
        }
      }
    ]
  }
};

