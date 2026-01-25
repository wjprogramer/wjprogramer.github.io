// 助詞「しか」 - 詳細內容

export const grammarParticlesShika = {
  id: 'grammar-particles-shika',
  title: {
    'zh-TW': '助詞「しか」',
    'en': 'Particle "しか"'
  },
  category: {
    type: 'grammar',
    level: 'N4'
  },
  tags: ['grammar', 'particle'],
  description: {
    'zh-TW': '助詞「しか」用於表示「只有...」，必須與否定形連用',
    'en': 'The particle "しか" is used to mean "only...", and must be used with negative form'
  },
  content: {
    overview: {
      'zh-TW':
        '助詞「しか」用於表示「只有...」的意思，但必須與否定形連用，構成「〜しか〜ない」的句型。與「だけ」不同，「しか」強調「只有這個，沒有其他」的語氣更強。',
      'en':
        'The particle "しか" is used to mean "only...", but must be used with negative form, forming the pattern "〜しか〜ない". Different from "だけ", "しか" has a stronger tone of "only this, nothing else".'
    },
    usage: {
      'zh-TW':
        '「しか」的用法：\n' +
        '1. 表示限定：只有...（如「これしかない」）\n' +
        '2. 必須與否定形連用：〜しか〜ない\n' +
        '3. 與「だけ」的區別：「しか」用於否定句，語氣更強',
      'en':
        'Usage of "しか":\n' +
        '1. Indicate limitation: only... (e.g., 「これしかない」)\n' +
        '2. Must be used with negative form: 〜しか〜ない\n' +
        '3. Difference from "だけ": "しか" is used in negative sentences, with stronger tone'
    },
    examples: [
      {
        japanese: '<ruby>私<rt>わたし</rt></ruby>は<ruby>本<rt>ほん</rt></ruby>しか<ruby>買<rt>か</rt></ruby>いませんでした。',
        zhTW: '我只買了書。',
        en: 'I only bought books.',
        explanation: {
          'zh-TW': '「しか」與否定形連用，表示「只有書，沒有其他」。',
          'en': '"しか" used with negative form means "only books, nothing else".'
        }
      },
      {
        japanese: '<ruby>時<rt>じ</rt></ruby><ruby>間<rt>かん</rt></ruby>が<ruby>少<rt>すこ</rt></ruby>ししかありません。',
        zhTW: '只有一點時間。',
        en: 'I have only a little time.',
        explanation: {
          'zh-TW': '「しか」與否定形連用，表示「只有一點，沒有更多」。',
          'en': '"しか" used with negative form means "only a little, no more".'
        }
      },
      {
        japanese: '<ruby>今<rt>いま</rt></ruby>日<rt>きょう</rt></ruby>しか<ruby>休<rt>やす</rt></ruby>めません。',
        zhTW: '只有今天能休息。',
        en: 'I can rest only today.',
        explanation: {
          'zh-TW': '「しか」與否定形連用，表示「只有今天，其他日子不能休息」。',
          'en': '"しか" used with negative form means "only today, other days cannot rest".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「しか」必須與否定形連用，構成「〜しか〜ない」的句型。\n' +
        '2. 「しか」和「だけ」的區別：「しか」用於否定句，語氣更強；「だけ」用於肯定句。\n' +
        '3. 「しか」可以接在名詞、動詞、形容詞等後面，但後面必須接否定形。',
      'en':
        'Learning tips:\n' +
        '1. "しか" must be used with negative form, forming the pattern "〜しか〜ない".\n' +
        '2. Difference between "しか" and "だけ": "しか" is used in negative sentences with stronger tone; "だけ" is used in affirmative sentences.\n' +
        '3. "しか" can be attached to nouns, verbs, adjectives, etc., but must be followed by negative form.'
    },
    relatedContent: [
      {
        id: 'grammar-particles-dake',
        title: {
          'zh-TW': '助詞「だけ」',
          'en': 'Particle "だけ"'
        }
      },
      {
        id: 'grammar-verb-nai-form',
        title: {
          'zh-TW': '動詞ない形',
          'en': 'Verb ない Form'
        }
      }
    ]
  }
};


