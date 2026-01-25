// 句型「〜てみる」 - 詳細內容

export const grammarPatternTeMiru = {
  id: 'grammar-pattern-te-miru',
  title: {
    'zh-TW': '句型「〜てみる」',
    'en': 'Pattern "〜てみる"'
  },
  category: {
    type: 'grammar',
    level: 'N4'
  },
  tags: ['grammar'],
  description: {
    'zh-TW': '「〜てみる」表示「試著...」「嘗試...」',
    'en': '"〜てみる" expresses "try to..." or "try doing..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜てみる」接在動詞て形後面，表示「試著...」「嘗試...」的意思。用於表達嘗試做某事的動作，帶有「試試看」的語氣。',
      'en':
        '"〜てみる" is attached to the て form of verbs to express "try to..." or "try doing...". Used to express the action of trying something, with a tone of "let\'s try it".'
    },
    usage: {
      'zh-TW':
        '「〜てみる」的用法：\n' +
        '1. 表示嘗試：試著...（如「食べてみる」）\n' +
        '2. 表示體驗：試試看...（如「着てみる」）\n' +
        '3. 可以變化：〜てみたい（想要試試）、〜てみた（試過了）',
      'en':
        'Usage of "〜てみる":\n' +
        '1. Express attempt: try to... (e.g., 「食べてみる」)\n' +
        '2. Express experience: try... (e.g., 「着てみる」)\n' +
        '3. Can be conjugated: 〜てみたい (want to try), 〜てみた (tried)'
    },
    examples: [
      {
        japanese: '<ruby>日<rt>に</rt></ruby><ruby>本<rt>ほん</rt></ruby>の<ruby>料<rt>りょう</rt></ruby><ruby>理<rt>り</rt></ruby>を<ruby>食<rt>た</rt></ruby>べてみたいです。',
        zhTW: '想試試看日本料理。',
        en: 'I want to try Japanese food.',
        explanation: {
          'zh-TW': '「てみたい」表示「想要試試看」。',
          'en': '"てみたい" means "want to try".'
        }
      },
      {
        japanese: '<ruby>この<rt>この</rt></ruby><ruby>服<rt>ふく</rt></ruby>を<ruby>着<rt>き</rt></ruby>てみてもいいですか。',
        zhTW: '可以試穿這件衣服嗎？',
        en: 'May I try on this clothes?',
        explanation: {
          'zh-TW': '「てみる」表示「試試看」，這裡是「試穿」。',
          'en': '"てみる" means "try", here it means "try on".'
        }
      },
      {
        japanese: '<ruby>読<rt>よ</rt></ruby>んでみましたが、<ruby>難<rt>むずか</rt></ruby>しかったです。',
        zhTW: '試著讀了，但很難。',
        en: 'I tried reading it, but it was difficult.',
        explanation: {
          'zh-TW': '「てみた」表示「試過了」。',
          'en': '"てみた" means "tried".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜てみる」表示「試著做某事」，帶有嘗試的語氣。\n' +
        '2. 「〜てみたい」表示「想要試試看」，是「〜てみる」的願望形。\n' +
        '3. 「〜てみる」和「〜てみた」常用於表達嘗試後的結果或感想。',
      'en':
        'Learning tips:\n' +
        '1. "〜てみる" means "try doing something", with a tone of attempting.\n' +
        '2. "〜てみたい" means "want to try", which is the desire form of "〜てみる".\n' +
        '3. "〜てみる" and "〜てみた" are often used to express results or impressions after trying.'
    },
    relatedContent: [
      {
        id: 'grammar-verb-te-form',
        title: {
          'zh-TW': '動詞て形',
          'en': 'Verb て Form'
        }
      },
      {
        id: 'grammar-pattern-tai',
        title: {
          'zh-TW': '句型「〜たい」',
          'en': 'Pattern "〜たい"'
        }
      }
    ]
  }
};


