// 句型「〜てくる」 - 詳細內容

export const grammarPatternTeKuru = {
  id: 'grammar-pattern-te-kuru',
  title: {
    'zh-TW': '句型「〜てくる」',
    'en': 'Pattern "〜てくる"'
  },
  category: {
    type: 'grammar',
    level: 'N3'
  },
  tags: ['grammar'],
  description: {
    'zh-TW': '「〜てくる」表示「...來」「開始...起來」「一直...到現在」',
    'en': '"〜てくる" expresses "...come", "start to...", or "have been...until now"'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜てくる」接在動詞て形後面，有多種用法：一是表示空間的移動（...來），二是表示時間的開始（開始...起來），三是表示時間的延續（一直...到現在）。這是日語中表示動作方向的重要句型。',
      'en':
        '"〜てくる" is attached to the て form of verbs and has multiple uses: one is to express spatial movement (...come), another is to express temporal beginning (start to...), and another is to express temporal continuation (have been...until now). This is an important pattern for expressing action direction in Japanese.'
    },
    usage: {
      'zh-TW':
        '「〜てくる」的用法：\n' +
        '1. 表示空間移動：...來（如「持ってくる」）\n' +
        '2. 表示時間開始：開始...起來（如「雨が降ってくる」）\n' +
        '3. 表示時間延續：一直...到現在（如「勉強してきた」）\n' +
        '4. 與「〜ていく」相對：「くる」表示靠近，「いく」表示遠離',
      'en':
        'Usage of "〜てくる":\n' +
        '1. Express spatial movement: ...come (e.g., 「持ってくる」)\n' +
        '2. Express temporal beginning: start to... (e.g., 「雨が降ってくる」)\n' +
        '3. Express temporal continuation: have been...until now (e.g., 「勉強してきた」)\n' +
        '4. Opposite to "〜ていく": "くる" means toward, "いく" means away'
    },
    examples: [
      {
        japanese: '<ruby>本<rt>ほん</rt></ruby>を<ruby>持<rt>も</rt></ruby>ってきます。',
        zhTW: '帶著書來。',
        en: 'I will bring the book.',
        explanation: {
          'zh-TW': '「てくる」表示空間移動，「帶著來」。',
          'en': '"てくる" expresses spatial movement, "bring with me".'
        }
      },
      {
        japanese: '<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>ってきました。',
        zhTW: '開始下雨了。',
        en: 'It started to rain.',
        explanation: {
          'zh-TW': '「てくる」表示時間開始，「開始下雨起來」。',
          'en': '"てくる" expresses temporal beginning, "start to rain".'
        }
      },
      {
        japanese: '<ruby>長<rt>なが</rt></ruby>い<ruby>間<rt>あいだ</rt></ruby><ruby>勉<rt>べん</rt></ruby><ruby>強<rt>きょう</rt></ruby>してきました。',
        zhTW: '一直學習到現在。',
        en: 'I have been studying for a long time.',
        explanation: {
          'zh-TW': '「てきた」表示時間延續，「一直學習到現在」。',
          'en': '"てきた" expresses temporal continuation, "have been studying until now".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜てくる」的多種用法需要根據上下文判斷：空間移動、時間開始或時間延續。\n' +
        '2. 「〜てくる」和「〜ていく」是相對的：「くる」表示靠近說話者，「いく」表示遠離說話者。\n' +
        '3. 表示時間延續時，「〜てきた」強調「從過去一直持續到現在」。',
      'en':
        'Learning tips:\n' +
        '1. The multiple uses of "〜てくる" need to be judged by context: spatial movement, temporal beginning, or temporal continuation.\n' +
        '2. "〜てくる" and "〜ていく" are opposite: "くる" means toward the speaker, "いく" means away from the speaker.\n' +
        '3. When expressing temporal continuation, "〜てきた" emphasizes "have been continuing from the past until now".'
    },
    relatedContent: [
      {
        id: 'grammar-pattern-te-iku',
        title: {
          'zh-TW': '句型「〜ていく」',
          'en': 'Pattern "〜ていく"'
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


