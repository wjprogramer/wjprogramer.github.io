// 句型「〜とは」 - 詳細內容

export const grammarPatternToWa = {
  id: 'grammar-pattern-to-wa',
  title: {
    'zh-TW': '句型「〜とは」',
    'en': 'Pattern "〜とは"'
  },
  category: {
    type: 'grammar',
    level: 'N2'
  },
  tags: ['grammar'],
  description: {
    'zh-TW': '「〜とは」表示「所謂...」「...是...」',
    'en': '"〜とは" expresses "what is called...", "...is..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜とは」接在名詞後面，表示「所謂...」「...是...」的意思。用於定義、說明，表示「所謂的...是...」或「...指的是...」。',
      'en':
        '"〜とは" is attached to nouns to express "what is called..." or "...is...". Used for definition and explanation, meaning "what is called...is..." or "...refers to...".'
    },
    usage: {
      'zh-TW':
        '「〜とは」的用法：\n' +
        '1. 表示定義：所謂...是...（如「愛とは」）\n' +
        '2. 表示說明：...指的是...（如「日本語とは」）\n' +
        '3. 接續方式：名詞＋とは',
      'en':
        'Usage of "〜とは":\n' +
        '1. Express definition: what is called...is... (e.g., 「愛とは」)\n' +
        '2. Express explanation: ...refers to... (e.g., 「日本語とは」)\n' +
        '3. Conjugation: noun + とは'
    },
    examples: [
      {
        japanese: '<ruby>愛<rt>あい</rt></ruby>とは<ruby>何<rt>なに</rt></ruby>か。',
        zhTW: '所謂愛是什麼？',
        en: 'What is love?',
        explanation: {
          'zh-TW': '「とは」表示定義，「所謂愛是什麼」。',
          'en': '"とは" expresses definition, "what is love".'
        }
      },
      {
        japanese: '<ruby>日<rt>に</rt></ruby><ruby>本<rt>ほん</rt></ruby><ruby>語<rt>ご</rt></ruby>とは<ruby>日<rt>に</rt></ruby><ruby>本<rt>ほん</rt></ruby>で<ruby>使<rt>つか</rt></ruby>われる<ruby>言<rt>げん</rt></ruby><ruby>語<rt>ご</rt></ruby>です。',
        zhTW: '所謂日語是在日本使用的語言。',
        en: 'Japanese is the language used in Japan.',
        explanation: {
          'zh-TW': '「とは」表示說明，「所謂日語是在日本使用的語言」。',
          'en': '"とは" expresses explanation, "Japanese is the language used in Japan".'
        }
      },
      {
        japanese: '<ruby>成<rt>せい</rt></ruby><ruby>功<rt>こう</rt></ruby>とは<ruby>努<rt>ど</rt></ruby><ruby>力<rt>りょく</rt></ruby>の<ruby>結<rt>けっ</rt></ruby><ruby>果<rt>か</rt></ruby>です。',
        zhTW: '所謂成功是努力的結果。',
        en: 'Success is the result of effort.',
        explanation: {
          'zh-TW': '「とは」表示定義，「所謂成功是努力的結果」。',
          'en': '"とは" expresses definition, "success is the result of effort".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜とは」用於定義、說明，表示「所謂的...是...」或「...指的是...」。\n' +
        '2. 「〜とは」常用於字典、教科書等正式場合。\n' +
        '3. 「〜とは」語氣較正式，多用於書面語。',
      'en':
        'Learning tips:\n' +
        '1. "〜とは" is used for definition and explanation, meaning "what is called...is..." or "...refers to...".\n' +
        '2. "〜とは" is commonly used in dictionaries, textbooks, and other formal contexts.\n' +
        '3. "〜とは" has a formal tone, mostly used in written language.'
    },
    relatedContent: [
      {
        id: 'grammar-pattern-to-ie',
        title: {
          'zh-TW': '句型「〜とはいえ」',
          'en': 'Pattern "〜とはいえ"'
        }
      },
      {
        id: 'grammar-pattern-wake-da',
        title: {
          'zh-TW': '句型「〜わけだ」',
          'en': 'Pattern "〜わけだ"'
        }
      }
    ]
  }
};


