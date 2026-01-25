// 句型「〜にせよ」 - 詳細內容

export const grammarPatternNiSeyo = {
  id: 'grammar-pattern-ni-seyo',
  title: {
    'zh-TW': '句型「〜にせよ」',
    'en': 'Pattern "〜にせよ"'
  },
  category: {
    type: 'grammar',
    level: 'N2'
  },
  tags: ['grammar'],
  description: {
    'zh-TW': '「〜にせよ」表示「即使...也...」「無論...都...」',
    'en': '"〜にせよ" expresses "even if...", "whether...or..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜にせよ」接在名詞、動詞、形容詞的普通形後面，表示「即使...也...」「無論...都...」的意思。用於表達讓步關係，語氣比「〜にしても」更正式，多用於書面語。',
      'en':
        '"〜にせよ" is attached to the plain form of nouns, verbs, and adjectives to express "even if..." or "whether...or...". Used to express concession, with a more formal tone than "〜にしても", mostly used in written language.'
    },
    usage: {
      'zh-TW':
        '「〜にせよ」的用法：\n' +
        '1. 表示讓步：即使...也...（如「忙しいにせよ」）\n' +
        '2. 表示無論：無論...都...（如「学生にせよ」）\n' +
        '3. 接續方式：\n' +
        '   - 名詞：名詞＋にせよ\n' +
        '   - 動詞：普通形＋にせよ\n' +
        '   - い形容詞：普通形＋にせよ\n' +
        '   - な形容詞：な形容詞＋にせよ',
      'en':
        'Usage of "〜にせよ":\n' +
        '1. Express concession: even if... (e.g., 「忙しいにせよ」)\n' +
        '2. Express "whether": whether...or... (e.g., 「学生にせよ」)\n' +
        '3. Conjugation:\n' +
        '   - Nouns: noun + にせよ\n' +
        '   - Verbs: plain form + にせよ\n' +
        '   - い-adjectives: plain form + にせよ\n' +
        '   - な-adjectives: な-adjective + にせよ'
    },
    examples: [
      {
        japanese: '<ruby>忙<rt>いそが</rt></ruby>しいにせよ、<ruby>責<rt>せき</rt></ruby><ruby>任<rt>にん</rt></ruby>は<ruby>果<rt>はた</rt></ruby>たすべきです。',
        zhTW: '即使很忙，也應該履行責任。',
        en: 'Even if busy, you should fulfill your responsibility.',
        explanation: {
          'zh-TW': '「にせよ」表示讓步，「即使很忙」，語氣較正式。',
          'en': '"にせよ" expresses concession, "even if busy", with a formal tone.'
        }
      },
      {
        japanese: '<ruby>学<rt>がく</rt></ruby><ruby>生<rt>せい</rt></ruby>にせよ<ruby>社<rt>しゃ</rt></ruby><ruby>会<rt>かい</rt></ruby><ruby>人<rt>じん</rt></ruby>にせよ、<ruby>規<rt>き</rt></ruby><ruby>則<rt>そく</rt></ruby>は<ruby>守<rt>まも</rt></ruby>るべきです。',
        zhTW: '無論是學生還是社會人士，都應該遵守規則。',
        en: 'Whether student or working adult, rules should be followed.',
        explanation: {
          'zh-TW': '「にせよ」表示無論，「無論是學生還是社會人士」。',
          'en': '"にせよ" expresses "whether", "whether student or working adult".'
        }
      },
      {
        japanese: '<ruby>成<rt>せい</rt></ruby><ruby>功<rt>こう</rt></ruby>するにせよ<ruby>失<rt>しっ</rt></ruby><ruby>敗<rt>ぱい</rt></ruby>するにせよ、<ruby>経<rt>けい</rt></ruby><ruby>験<rt>けん</rt></ruby>になります。',
        zhTW: '無論成功還是失敗，都會成為經驗。',
        en: 'Whether succeed or fail, it will become experience.',
        explanation: {
          'zh-TW': '「にせよ」表示無論，「無論成功還是失敗」。',
          'en': '"にせよ" expresses "whether", "whether succeed or fail".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜にせよ」用於表達讓步關係，語氣比「〜にしても」更正式，多用於書面語。\n' +
        '2. 「〜にせよ」可以重複使用，形成「〜にせよ〜にせよ」的句型，表示「無論...還是...」。\n' +
        '3. 「〜にせよ」常用於正式場合或書面語中。',
      'en':
        'Learning tips:\n' +
        '1. "〜にせよ" is used to express concession, with a more formal tone than "〜にしても", mostly used in written language.\n' +
        '2. "〜にせよ" can be repeated, forming the pattern "〜にせよ〜にせよ", meaning "whether...or...".\n' +
        '3. "〜にせよ" is commonly used in formal situations or written language.'
    },
    relatedContent: [
      {
        id: 'grammar-pattern-ni-shite-mo',
        title: {
          'zh-TW': '句型「〜にしても」',
          'en': 'Pattern "〜にしても"'
        }
      },
      {
        id: 'grammar-pattern-temo-ii',
        title: {
          'zh-TW': '句型「〜てもいい」',
          'en': 'Pattern "〜てもいい"'
        }
      }
    ]
  }
};


