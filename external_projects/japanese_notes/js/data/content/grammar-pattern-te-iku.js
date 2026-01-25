// 句型「〜ていく」 - 詳細內容

export const grammarPatternTeIku = {
  id: 'grammar-pattern-te-iku',
  title: {
    'zh-TW': '句型「〜ていく」',
    'en': 'Pattern "〜ていく"'
  },
  category: {
    type: 'grammar',
    level: 'N3'
  },
  tags: ['grammar'],
  description: {
    'zh-TW': '「〜ていく」表示「...去」「繼續...下去」',
    'en': '"〜ていく" expresses "...go" or "continue...onward"'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜ていく」接在動詞て形後面，有兩種主要用法：一是表示空間的移動（...去），二是表示時間的延續（繼續...下去）。這是日語中表示動作方向的重要句型。',
      'en':
        '"〜ていく" is attached to the て form of verbs and has two main uses: one is to express spatial movement (...go), and the other is to express temporal continuation (continue...onward). This is an important pattern for expressing action direction in Japanese.'
    },
    usage: {
      'zh-TW':
        '「〜ていく」的用法：\n' +
        '1. 表示空間移動：...去（如「持っていく」）\n' +
        '2. 表示時間延續：繼續...下去（如「勉強していく」）\n' +
        '3. 與「〜てくる」相對：「いく」表示遠離，「くる」表示靠近',
      'en':
        'Usage of "〜ていく":\n' +
        '1. Express spatial movement: ...go (e.g., 「持っていく」)\n' +
        '2. Express temporal continuation: continue...onward (e.g., 「勉強していく」)\n' +
        '3. Opposite to "〜てくる": "いく" means away, "くる" means toward'
    },
    examples: [
      {
        japanese: '<ruby>本<rt>ほん</rt></ruby>を<ruby>持<rt>も</rt></ruby>っていきます。',
        zhTW: '帶著書去。',
        en: 'I will take the book with me.',
        explanation: {
          'zh-TW': '「ていく」表示空間移動，「帶著去」。',
          'en': '"ていく" expresses spatial movement, "take with me".'
        }
      },
      {
        japanese: '<ruby>勉<rt>べん</rt></ruby><ruby>強<rt>きょう</rt></ruby>していきます。',
        zhTW: '繼續學習下去。',
        en: 'I will continue studying.',
        explanation: {
          'zh-TW': '「ていく」表示時間延續，「繼續學習下去」。',
          'en': '"ていく" expresses temporal continuation, "continue studying onward".'
        }
      },
      {
        japanese: '<ruby>歩<rt>ある</rt></ruby>いていきます。',
        zhTW: '走過去。',
        en: 'I will walk there.',
        explanation: {
          'zh-TW': '「ていく」表示空間移動，「走過去」。',
          'en': '"ていく" expresses spatial movement, "walk there".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜ていく」的兩種用法需要根據上下文判斷：空間移動或時間延續。\n' +
        '2. 「〜ていく」和「〜てくる」是相對的：「いく」表示遠離說話者，「くる」表示靠近說話者。\n' +
        '3. 表示時間延續時，「〜ていく」強調「從現在開始繼續下去」。',
      'en':
        'Learning tips:\n' +
        '1. The two uses of "〜ていく" need to be judged by context: spatial movement or temporal continuation.\n' +
        '2. "〜ていく" and "〜てくる" are opposite: "いく" means away from the speaker, "くる" means toward the speaker.\n' +
        '3. When expressing temporal continuation, "〜ていく" emphasizes "continue onward from now".'
    },
    relatedContent: [
      {
        id: 'grammar-pattern-te-kuru',
        title: {
          'zh-TW': '句型「〜てくる」',
          'en': 'Pattern "〜てくる"'
        }
      },
      {
        id: 'grammar-verb-te-form',
        title: {
          'zh-TW': '動詞て形',
          'en': 'Verb て Form'
        }
      }
    ]
  }
};


