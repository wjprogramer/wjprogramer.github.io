// 助詞「だけ」 - 詳細內容

export const grammarParticlesDake = {
  id: 'grammar-particles-dake',
  title: {
    'zh-TW': '助詞「だけ」',
    'en': 'Particle "だけ"'
  },
  category: {
    type: 'grammar',
    level: 'N4'
  },
  tags: ['grammar', 'particle'],
  description: {
    'zh-TW': '助詞「だけ」用於表示「只有...」「僅僅...」',
    'en': 'The particle "だけ" is used to mean "only..." or "just..."'
  },
  content: {
    overview: {
      'zh-TW':
        '助詞「だけ」用於表示「只有...」「僅僅...」的意思，強調限定範圍。與「しか」不同，「だけ」用於肯定句，表示「只有這個，沒有其他」。',
      'en':
        'The particle "だけ" is used to mean "only..." or "just...", emphasizing limitation. Different from "しか", "だけ" is used in affirmative sentences, meaning "only this, nothing else".'
    },
    usage: {
      'zh-TW':
        '「だけ」的用法：\n' +
        '1. 表示限定：只有...（如「これだけ」）\n' +
        '2. 表示程度：僅僅...（如「少しだけ」）\n' +
        '3. 與「しか」的區別：「だけ」用於肯定句，「しか」用於否定句',
      'en':
        'Usage of "だけ":\n' +
        '1. Indicate limitation: only... (e.g., 「これだけ」)\n' +
        '2. Indicate degree: just... (e.g., 「少しだけ」)\n' +
        '3. Difference from "しか": "だけ" is used in affirmative sentences, "しか" in negative sentences'
    },
    examples: [
      {
        japanese: '<ruby>私<rt>わたし</rt></ruby>は<ruby>本<rt>ほん</rt></ruby>だけ<ruby>買<rt>か</rt></ruby>いました。',
        zhTW: '我只買了書。',
        en: 'I only bought books.',
        explanation: {
          'zh-TW': '「だけ」表示限定，「只有書，沒有其他」。',
          'en': '"だけ" indicates limitation, "only books, nothing else".'
        }
      },
      {
        japanese: '<ruby>少<rt>すこ</rt></ruby>しだけ<ruby>食<rt>た</rt></ruby>べます。',
        zhTW: '只吃一點點。',
        en: 'I eat just a little.',
        explanation: {
          'zh-TW': '「だけ」表示程度，「僅僅一點點」。',
          'en': '"だけ" indicates degree, "just a little".'
        }
      },
      {
        japanese: '<ruby>今<rt>いま</rt></ruby>日<rt>きょう</rt></ruby>だけ<ruby>休<rt>やす</rt></ruby>みます。',
        zhTW: '只有今天休息。',
        en: 'I rest only today.',
        explanation: {
          'zh-TW': '「だけ」表示限定，「只有今天，其他日子不休息」。',
          'en': '"だけ" indicates limitation, "only today, other days not resting".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「だけ」用於肯定句，表示「只有這個，沒有其他」。\n' +
        '2. 「だけ」和「しか」的區別：「だけ」用於肯定句，「しか」用於否定句（如「これしかない」）。\n' +
        '3. 「だけ」可以接在名詞、動詞、形容詞等後面。',
      'en':
        'Learning tips:\n' +
        '1. "だけ" is used in affirmative sentences, meaning "only this, nothing else".\n' +
        '2. Difference between "だけ" and "しか": "だけ" is used in affirmative sentences, "しか" in negative sentences (e.g., "これしかない").\n' +
        '3. "だけ" can be attached to nouns, verbs, adjectives, etc.'
    },
    relatedContent: [
      {
        id: 'grammar-particles-shika',
        title: {
          'zh-TW': '助詞「しか」',
          'en': 'Particle "しか"'
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


