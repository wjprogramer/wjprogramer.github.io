// 句型「〜ということ」 - 詳細內容

export const grammarPatternToIuKoto = {
  id: 'grammar-pattern-to-iu-koto',
  title: {
    'zh-TW': '句型「〜ということ」',
    'en': 'Pattern "〜ということ"'
  },
  category: {
    type: 'grammar',
    level: 'N2'
  },
  tags: ['grammar'],
  description: {
    'zh-TW': '「〜ということ」表示「...這件事」「...這個事實」',
    'en': '"〜ということ" expresses "...this matter", "...this fact"'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜ということ」接在名詞、動詞、形容詞的普通形後面，表示「...這件事」「...這個事實」的意思。用於說明、解釋，語氣較正式，多用於書面語。',
      'en':
        '"〜ということ" is attached to the plain form of nouns, verbs, and adjectives to express "...this matter" or "...this fact". Used for explanation, with a formal tone, mostly used in written language.'
    },
    usage: {
      'zh-TW':
        '「〜ということ」的用法：\n' +
        '1. 表示說明：...這件事（如「行くということ」）\n' +
        '2. 表示解釋：...這個事實（如「難しいということ」）\n' +
        '3. 接續方式：\n' +
        '   - 名詞：名詞＋ということ\n' +
        '   - 動詞：普通形＋ということ\n' +
        '   - い形容詞：普通形＋ということ\n' +
        '   - な形容詞：な形容詞＋ということ',
      'en':
        'Usage of "〜ということ":\n' +
        '1. Express explanation: ...this matter (e.g., 「行くということ」)\n' +
        '2. Express clarification: ...this fact (e.g., 「難しいということ」)\n' +
        '3. Conjugation:\n' +
        '   - Nouns: noun + ということ\n' +
        '   - Verbs: plain form + ということ\n' +
        '   - い-adjectives: plain form + ということ\n' +
        '   - な-adjectives: な-adjective + ということ'
    },
    examples: [
      {
        japanese: '<ruby>行<rt>い</rt></ruby>くということは<ruby>決<rt>き</rt></ruby><ruby>定<rt>てい</rt></ruby>しました。',
        zhTW: '去這件事已經決定了。',
        en: 'The matter of going has been decided.',
        explanation: {
          'zh-TW': '「ということ」表示說明，「去這件事已經決定了」。',
          'en': '"ということ" expresses explanation, "the matter of going has been decided".'
        }
      },
      {
        japanese: '<ruby>難<rt>むずか</rt></ruby>しいということです。',
        zhTW: '是困難這個事實。',
        en: 'It is the fact that it is difficult.',
        explanation: {
          'zh-TW': '「ということ」表示解釋，「是困難這個事實」。',
          'en': '"ということ" expresses clarification, "it is the fact that it is difficult".'
        }
      },
      {
        japanese: '<ruby>時<rt>じ</rt></ruby><ruby>間<rt>かん</rt></ruby>がないということです。',
        zhTW: '是沒有時間這個事實。',
        en: 'It is the fact that there is no time.',
        explanation: {
          'zh-TW': '「ということ」表示解釋，「是沒有時間這個事實」。',
          'en': '"ということ" expresses clarification, "it is the fact that there is no time".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜ということ」用於說明、解釋，語氣較正式，多用於書面語。\n' +
        '2. 「〜ということ」和「〜こと」的區別：「ということ」語氣更正式，多用於書面語。\n' +
        '3. 「〜ということ」常用於表達抽象概念或一般性說明。',
      'en':
        'Learning tips:\n' +
        '1. "〜ということ" is used for explanation, with a formal tone, mostly used in written language.\n' +
        '2. Difference between "〜ということ" and "〜こと": "ということ" has a more formal tone, mostly used in written language.\n' +
        '3. "〜ということ" is commonly used to express abstract concepts or general explanations.'
    },
    relatedContent: [
      {
        id: 'grammar-pattern-to-iu-mono',
        title: {
          'zh-TW': '句型「〜というもの」',
          'en': 'Pattern "〜というもの"'
        }
      },
      {
        id: 'grammar-pattern-to-wa',
        title: {
          'zh-TW': '句型「〜とは」',
          'en': 'Pattern "〜とは"'
        }
      }
    ]
  }
};


