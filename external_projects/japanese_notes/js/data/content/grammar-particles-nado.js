// 助詞「など」 - 詳細內容

export const grammarParticlesNado = {
  id: 'grammar-particles-nado',
  title: {
    'zh-TW': '助詞「など」',
    'en': 'Particle "など"'
  },
  category: {
    type: 'grammar',
    level: 'N4'
  },
  tags: ['grammar', 'particle'],
  description: {
    'zh-TW': '助詞「など」用於列舉，表示「...等等」',
    'en': 'The particle "など" is used for enumeration, meaning "...etc."'
  },
  content: {
    overview: {
      'zh-TW':
        '助詞「など」用於列舉多個項目，表示「...等等」，暗示還有其他項目未列出。與「や」類似，但「など」更強調「等等」的意思。',
      'en':
        'The particle "など" is used to enumerate multiple items, meaning "...etc.", implying there are other items not listed. Similar to "や", but "など" emphasizes "etc." more.'
    },
    usage: {
      'zh-TW':
        '「など」的用法：\n' +
        '1. 列舉項目：...等等（如「本やペンなど」）\n' +
        '2. 舉例說明：例如...（如「りんごなどが好き」）\n' +
        '3. 謙遜表達：...之類的（如「私など」）',
      'en':
        'Usage of "など":\n' +
        '1. Enumerate items: ...etc. (e.g., 「本やペンなど」)\n' +
        '2. Give examples: such as... (e.g., 「りんごなどが好き」)\n' +
        '3. Humble expression: the likes of... (e.g., 「私など」)'
    },
    examples: [
      {
        japanese: '<ruby>本<rt>ほん</rt></ruby>や<ruby>ペン<rt>ペン</rt></ruby>などを<ruby>買<rt>か</rt></ruby>いました。',
        zhTW: '買了書和筆等等。',
        en: 'I bought books, pens, and so on.',
        explanation: {
          'zh-TW': '「など」與「や」一起使用，表示「等等」。',
          'en': '"など" used together with "や" means "etc."'
        }
      },
      {
        japanese: '<ruby>りんご<rt>りんご</rt></ruby>や<ruby>バナナ<rt>バナナ</rt></ruby>などが<ruby>好<rt>す</rt></ruby>きです。',
        zhTW: '喜歡蘋果、香蕉等等。',
        en: 'I like apples, bananas, and so on.',
        explanation: {
          'zh-TW': '「など」列舉水果，表示還有其他喜歡的水果。',
          'en': '"など" enumerates fruits, indicating there are other fruits I like.'
        }
      },
      {
        japanese: '<ruby>私<rt>わたし</rt></ruby>など<ruby>分<rt>わ</rt></ruby>かりません。',
        zhTW: '像我這樣的人不懂。',
        en: 'Someone like me doesn\'t understand.',
        explanation: {
          'zh-TW': '「など」用於謙遜表達，「像我這樣的人」。',
          'en': '"など" is used for humble expression, "someone like me".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「など」可以單獨使用，也可以與「や」一起使用。\n' +
        '2. 「など」用於謙遜表達時，表示「像我這樣的人」，有自謙的意思。\n' +
        '3. 「など」和「や」的區別：「や」列舉項目，「など」強調「等等」。',
      'en':
        'Learning tips:\n' +
        '1. "など" can be used alone or together with "や".\n' +
        '2. When "など" is used for humble expression, it means "someone like me", showing modesty.\n' +
        '3. Difference between "など" and "や": "や" enumerates items, "など" emphasizes "etc."'
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
        id: 'grammar-particles-to',
        title: {
          'zh-TW': '助詞「と」',
          'en': 'Particle "と"'
        }
      }
    ]
  }
};


