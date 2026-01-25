// 句型「〜とはいえ」 - 詳細內容

export const grammarPatternToIe = {
  id: 'grammar-pattern-to-ie',
  title: {
    'zh-TW': '句型「〜とはいえ」',
    'en': 'Pattern "〜とはいえ"'
  },
  category: {
    type: 'grammar',
    level: 'N2'
  },
  tags: ['grammar'],
  description: {
    'zh-TW': '「〜とはいえ」表示「雖然說是...但是...」「儘管...可是...」',
    'en': '"〜とはいえ" expresses "although it is said that...", "even though..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜とはいえ」接在名詞、動詞、形容詞的普通形後面，表示「雖然說是...但是...」「儘管...可是...」的意思。用於表達轉折關係，語氣較正式，多用於書面語。',
      'en':
        '"〜とはいえ" is attached to the plain form of nouns, verbs, and adjectives to express "although it is said that..." or "even though...". Used to express contrast, with a formal tone, mostly used in written language.'
    },
    usage: {
      'zh-TW':
        '「〜とはいえ」的用法：\n' +
        '1. 表示轉折：雖然說是...但是...（如「簡単とはいえ」）\n' +
        '2. 表示讓步：儘管...可是...（如「若いとはいえ」）\n' +
        '3. 接續方式：\n' +
        '   - 名詞：名詞＋とはいえ\n' +
        '   - 動詞：普通形＋とはいえ\n' +
        '   - い形容詞：普通形＋とはいえ\n' +
        '   - な形容詞：な形容詞＋とはいえ',
      'en':
        'Usage of "〜とはいえ":\n' +
        '1. Express contrast: although it is said that... (e.g., 「簡単とはいえ」)\n' +
        '2. Express concession: even though... (e.g., 「若いとはいえ」)\n' +
        '3. Conjugation:\n' +
        '   - Nouns: noun + とはいえ\n' +
        '   - Verbs: plain form + とはいえ\n' +
        '   - い-adjectives: plain form + とはいえ\n' +
        '   - な-adjectives: な-adjective + とはいえ'
    },
    examples: [
      {
        japanese: '<ruby>簡<rt>かん</rt></ruby><ruby>単<rt>たん</rt></ruby>とはいえ、<ruby>時<rt>じ</rt></ruby><ruby>間<rt>かん</rt></ruby>がかかります。',
        zhTW: '雖然說是簡單，但是需要時間。',
        en: 'Although it is said to be simple, it takes time.',
        explanation: {
          'zh-TW': '「とはいえ」表示轉折，「雖然說是簡單，但是需要時間」。',
          'en': '"とはいえ" expresses contrast, "although it is said to be simple, it takes time".'
        }
      },
      {
        japanese: '<ruby>若<rt>わか</rt></ruby>いとはいえ、<ruby>経<rt>けい</rt></ruby><ruby>験<rt>けん</rt></ruby>があります。',
        zhTW: '儘管年輕，但是有經驗。',
        en: 'Even though young, there is experience.',
        explanation: {
          'zh-TW': '「とはいえ」表示讓步，「儘管年輕，但是有經驗」。',
          'en': '"とはいえ" expresses concession, "even though young, there is experience".'
        }
      },
      {
        japanese: '<ruby>小<rt>ちい</rt></ruby>さな<ruby>企<rt>き</rt></ruby><ruby>業<rt>ぎょう</rt></ruby>とはいえ、<ruby>実<rt>じつ</rt></ruby><ruby>力<rt>りょく</rt></ruby>があります。',
        zhTW: '雖然說是小企業，但是有實力。',
        en: 'Although it is said to be a small company, there is capability.',
        explanation: {
          'zh-TW': '「とはいえ」表示轉折，「雖然說是小企業，但是有實力」。',
          'en': '"とはいえ" expresses contrast, "although it is said to be a small company, there is capability".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜とはいえ」用於表達轉折關係，語氣較正式，多用於書面語。\n' +
        '2. 「〜とはいえ」和「〜ものの」的區別：「とはいえ」語氣更正式，多用於書面語。\n' +
        '3. 「〜とはいえ」常用於表達與預期相反的情況。',
      'en':
        'Learning tips:\n' +
        '1. "〜とはいえ" is used to express contrast, with a formal tone, mostly used in written language.\n' +
        '2. Difference between "〜とはいえ" and "〜ものの": "とはいえ" has a more formal tone, mostly used in written language.\n' +
        '3. "〜とはいえ" is commonly used to express situations contrary to expectations.'
    },
    relatedContent: [
      {
        id: 'grammar-pattern-mono-no',
        title: {
          'zh-TW': '句型「〜ものの」',
          'en': 'Pattern "〜ものの"'
        }
      },
      {
        id: 'grammar-pattern-noni',
        title: {
          'zh-TW': '句型「〜のに」',
          'en': 'Pattern "〜のに"'
        }
      }
    ]
  }
};


