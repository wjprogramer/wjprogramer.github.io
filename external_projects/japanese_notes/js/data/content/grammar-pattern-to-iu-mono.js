// 句型「〜というもの」 - 詳細內容

export const grammarPatternToIuMono = {
  id: 'grammar-pattern-to-iu-mono',
  title: {
    'zh-TW': '句型「〜というもの」',
    'en': 'Pattern "〜というもの"'
  },
  category: {
    type: 'grammar',
    level: 'N2'
  },
  tags: ['grammar'],
  description: {
    'zh-TW': '「〜というもの」表示「所謂...」「...這種東西」',
    'en': '"〜というもの" expresses "what is called...", "...this kind of thing"'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜というもの」接在名詞後面，表示「所謂...」「...這種東西」的意思。用於定義、說明，語氣較正式，多用於書面語。',
      'en':
        '"〜というもの" is attached to nouns to express "what is called..." or "...this kind of thing". Used for definition and explanation, with a formal tone, mostly used in written language.'
    },
    usage: {
      'zh-TW':
        '「〜というもの」的用法：\n' +
        '1. 表示定義：所謂...是...（如「愛というもの」）\n' +
        '2. 表示說明：...這種東西（如「友情というもの」）\n' +
        '3. 接續方式：名詞＋というもの',
      'en':
        'Usage of "〜というもの":\n' +
        '1. Express definition: what is called...is... (e.g., 「愛というもの」)\n' +
        '2. Express explanation: ...this kind of thing (e.g., 「友情というもの」)\n' +
        '3. Conjugation: noun + というもの'
    },
    examples: [
      {
        japanese: '<ruby>愛<rt>あい</rt></ruby>というものは<ruby>理<rt>り</rt></ruby><ruby>解<rt>かい</rt></ruby>しがたいものです。',
        zhTW: '所謂愛是難以理解的東西。',
        en: 'What is called love is difficult to understand.',
        explanation: {
          'zh-TW': '「というもの」表示定義，「所謂愛是難以理解的東西」。',
          'en': '"というもの" expresses definition, "what is called love is difficult to understand".'
        }
      },
      {
        japanese: '<ruby>友<rt>ゆう</rt></ruby><ruby>情<rt>じょう</rt></ruby>というものは<ruby>大<rt>たい</rt></ruby><ruby>切<rt>せつ</rt></ruby>です。',
        zhTW: '所謂友情是珍貴的。',
        en: 'What is called friendship is precious.',
        explanation: {
          'zh-TW': '「というもの」表示說明，「所謂友情是珍貴的」。',
          'en': '"というもの" expresses explanation, "what is called friendship is precious".'
        }
      },
      {
        japanese: '<ruby>時<rt>とき</rt></ruby>間<rt>かん</rt></ruby>というものは<ruby>早<rt>はや</rt></ruby>く<ruby>過<rt>す</rt></ruby>ぎるものです。',
        zhTW: '所謂時間是過得很快的東西。',
        en: 'What is called time passes quickly.',
        explanation: {
          'zh-TW': '「というもの」表示定義，「所謂時間是過得很快的東西」。',
          'en': '"というもの" expresses definition, "what is called time passes quickly".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜というもの」用於定義、說明，語氣較正式，多用於書面語。\n' +
        '2. 「〜というもの」和「〜とは」的區別：「というもの」語氣更正式，多用於書面語。\n' +
        '3. 「〜というもの」常用於表達抽象概念或一般性說明。',
      'en':
        'Learning tips:\n' +
        '1. "〜というもの" is used for definition and explanation, with a formal tone, mostly used in written language.\n' +
        '2. Difference between "〜というもの" and "〜とは": "というもの" has a more formal tone, mostly used in written language.\n' +
        '3. "〜というもの" is commonly used to express abstract concepts or general explanations.'
    },
    relatedContent: [
      {
        id: 'grammar-pattern-to-wa',
        title: {
          'zh-TW': '句型「〜とは」',
          'en': 'Pattern "〜とは"'
        }
      },
      {
        id: 'grammar-pattern-mono-da',
        title: {
          'zh-TW': '句型「〜ものだ」',
          'en': 'Pattern "〜ものだ"'
        }
      }
    ]
  }
};


