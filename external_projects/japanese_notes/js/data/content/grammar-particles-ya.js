// 助詞「や」 - 詳細內容

export const grammarParticlesYa = {
  id: 'grammar-particles-ya',
  title: {
    'zh-TW': '助詞「や」',
    'en': 'Particle "や"'
  },
  category: {
    type: 'grammar',
    level: 'N5'
  },
  tags: ['basic', 'grammar', 'particle'],
  description: {
    'zh-TW': '助詞「や」用於列舉，表示「...和...等等」',
    'en': 'The particle "や" is used for enumeration, meaning "...and...etc."'
  },
  content: {
    overview: {
      'zh-TW':
        '助詞「や」用於列舉多個項目，表示「...和...等等」，暗示還有其他項目未列出。與「と」不同，「や」表示「部分列舉」。',
      'en':
        'The particle "や" is used to enumerate multiple items, meaning "...and...etc.", implying there are other items not listed. Different from "と", "や" means "partial enumeration".'
    },
    usage: {
      'zh-TW':
        '「や」的用法：\n' +
        '1. 列舉項目：表示「...和...等等」（如「本やペン」）\n' +
        '2. 與「と」的區別：「と」表示全部列舉，「や」表示部分列舉\n' +
        '3. 通常列舉2-3個項目，暗示還有其他',
      'en':
        'Usage of "や":\n' +
        '1. Enumerate items: mean "...and...etc." (e.g., 「本やペン」)\n' +
        '2. Difference from "と": "と" means complete enumeration, "や" means partial enumeration\n' +
        '3. Usually enumerates 2-3 items, implying there are others'
    },
    examples: [
      {
        japanese: '<ruby>本<rt>ほん</rt></ruby>や<ruby>ペン<rt>ペン</rt></ruby>を<ruby>買<rt>か</rt></ruby>いました。',
        zhTW: '買了書和筆等等。',
        en: 'I bought books, pens, and so on.',
        explanation: {
          'zh-TW': '「や」列舉項目，暗示還有其他東西。',
          'en': '"や" enumerates items, implying there are other things.'
        }
      },
      {
        japanese: '<ruby>りんご<rt>りんご</rt></ruby>や<ruby>バナナ<rt>バナナ</rt></ruby>が<ruby>好<rt>す</rt></ruby>きです。',
        zhTW: '喜歡蘋果和香蕉等等。',
        en: 'I like apples, bananas, and so on.',
        explanation: {
          'zh-TW': '「や」列舉水果，暗示還喜歡其他水果。',
          'en': '"や" enumerates fruits, implying I like other fruits too.'
        }
      },
      {
        japanese: '<ruby>日<rt>にち</rt></ruby><ruby>曜<rt>よう</rt></ruby><ruby>日<rt>び</rt></ruby>や<ruby>月<rt>げつ</rt></ruby><ruby>曜<rt>よう</rt></ruby><ruby>日<rt>び</rt></ruby>に<ruby>休<rt>やす</rt></ruby>みます。',
        zhTW: '在星期日和星期一等等休息。',
        en: 'I rest on Sundays, Mondays, and so on.',
        explanation: {
          'zh-TW': '「や」列舉日期，暗示還有其他休息日。',
          'en': '"や" enumerates days, implying there are other rest days.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「や」和「と」的區別：「と」表示全部列舉，「や」表示部分列舉（還有其他）。\n' +
        '2. 「や」通常列舉2-3個項目就足夠，不需要列舉所有項目。\n' +
        '3. 在列舉的最後可以加上「など」來強調「等等」的意思。',
      'en':
        'Learning tips:\n' +
        '1. Difference between "や" and "と": "と" means complete enumeration, "や" means partial enumeration (there are others).\n' +
        '2. "や" usually enumerates 2-3 items, no need to list everything.\n' +
        '3. You can add "など" at the end of enumeration to emphasize "etc."'
    },
    relatedContent: [
      {
        id: 'grammar-particles-to',
        title: {
          'zh-TW': '助詞「と」',
          'en': 'Particle "と"'
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

