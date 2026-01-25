// 句型「〜ことがある」 - 詳細內容

export const grammarPatternKotoGaAru = {
  id: 'grammar-pattern-koto-ga-aru',
  title: {
    'zh-TW': '句型「〜ことがある」',
    'en': 'Pattern "〜ことがある"'
  },
  category: {
    type: 'grammar',
    level: 'N3'
  },
  tags: ['grammar', 'verb'],
  description: {
    'zh-TW': '「〜ことがある」表示「有時...」「曾經...」',
    'en': '"〜ことがある" expresses "sometimes...", "have done... before"'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜ことがある」接在動詞的普通形後面，有兩種用法：1) 接動詞た形表示「曾經...」，2) 接動詞辭書形表示「有時...」。用於表達經驗或頻率。',
      'en':
        '"〜ことがある" is attached to the plain form of verbs and has two usages: 1) With verb た form to express "have done... before", 2) With verb dictionary form to express "sometimes...". Used to express experience or frequency.'
    },
    usage: {
      'zh-TW':
        '「〜ことがある」的用法：\n' +
        '1. 表示經驗：動詞た形＋ことがある（如「行ったことがある」）\n' +
        '2. 表示頻率：動詞辭書形＋ことがある（如「行くことがある」）\n' +
        '3. 否定形式：〜ことがない（如「行ったことがない」）',
      'en':
        'Usage of "〜ことがある":\n' +
        '1. Express experience: verb た form + ことがある (e.g., "行ったことがある")\n' +
        '2. Express frequency: verb dictionary form + ことがある (e.g., "行くことがある")\n' +
        '3. Negative form: 〜ことがない (e.g., "行ったことがない")'
    },
    examples: [
      {
        japanese: '<ruby>日<rt>に</rt></ruby><ruby>本<rt>ほん</rt></ruby>へ<ruby>行<rt>い</rt></ruby>ったことがあります。',
        zhTW: '曾經去過日本。',
        en: 'I have been to Japan before.',
        explanation: {
          'zh-TW': '「行ったことがある」表示「曾經去過」，動詞た形接ことがある表示經驗。',
          'en': '"行ったことがある" means "have been before", verb た form + ことがある expresses experience.'
        }
      },
      {
        japanese: '<ruby>日<rt>に</rt></ruby><ruby>本<rt>ほん</rt></ruby>へ<ruby>行<rt>い</rt></ruby>くことがあります。',
        zhTW: '有時去日本。',
        en: 'I sometimes go to Japan.',
        explanation: {
          'zh-TW': '「行くことがある」表示「有時去」，動詞辭書形接ことがある表示頻率。',
          'en': '"行くことがある" means "sometimes go", verb dictionary form + ことがある expresses frequency.'
        }
      },
      {
        japanese: '<ruby>食<rt>た</rt></ruby>べたことがありません。',
        zhTW: '從來沒有吃過。',
        en: 'I have never eaten it before.',
        explanation: {
          'zh-TW': '「食べたことがない」表示「從來沒有吃過」，否定形式。',
          'en': '"食べたことがない" means "have never eaten", negative form.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜ことがある」有兩種用法：經驗和頻率。\n' +
        '2. 表示經驗時：動詞た形＋ことがある（曾經...）\n' +
        '3. 表示頻率時：動詞辭書形＋ことがある（有時...）\n' +
        '4. 否定形式：〜ことがない（從來沒有...）',
      'en':
        'Learning tips:\n' +
        '1. "〜ことがある" has two usages: experience and frequency.\n' +
        '2. When expressing experience: verb た form + ことがある (have done... before)\n' +
        '3. When expressing frequency: verb dictionary form + ことがある (sometimes...)\n' +
        '4. Negative form: 〜ことがない (have never...)'
    }
  }
};

