// 句型「〜そうだ」（樣態） - 詳細內容

export const grammarPatternSouDaAppearance = {
  id: 'grammar-pattern-sou-da-appearance',
  title: {
    'zh-TW': '句型「〜そうだ」（樣態）',
    'en': 'Pattern "〜そうだ" (Appearance)'
  },
  category: {
    type: 'grammar',
    level: 'N4'
  },
  tags: ['grammar', 'adjective'],
  description: {
    'zh-TW': '「〜そうだ」表示「看起來...」「好像要...」',
    'en': '"〜そうだ" expresses "looks like...", "seems about to..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜そうだ」接在動詞的「ます形」詞幹或い形容詞詞幹後面，表示「看起來...」「好像要...」。用於表達根據外觀或樣態做出的判斷。注意：樣態的「そうだ」與傳聞的「そうだ」形式相同但用法不同。',
      'en':
        '"〜そうだ" is attached to the stem of verbs in ます form or the stem of い-adjectives to express "looks like...", "seems about to...". Used to express judgments based on appearance or state. Note: The appearance "そうだ" has the same form as the hearsay "そうだ" but different usage.'
    },
    usage: {
      'zh-TW':
        '「〜そうだ」（樣態）的用法：\n' +
        '1. 接動詞ます形詞幹：〜そうだ（如「降りそうだ」）\n' +
        '2. 接い形容詞詞幹：〜そうだ（如「美味しそうだ」）\n' +
        '3. 接な形容詞詞幹：〜そうだ（如「元気そうだ」）\n' +
        '4. 變化：そうだ可以像な形容詞一樣變化（そうではない、そうだった等）\n' +
        '5. 注意：い形容詞「ない」和「よい」要變成「なさそうだ」和「よさそうだ」',
      'en':
        'Usage of "〜そうだ" (appearance):\n' +
        '1. Attach to verb ます stem: 〜そうだ (e.g., "降りそうだ")\n' +
        '2. Attach to い-adjective stem: 〜そうだ (e.g., "美味しそうだ")\n' +
        '3. Attach to な-adjective stem: 〜そうだ (e.g., "元気そうだ")\n' +
        '4. Conjugation: そうだ can be conjugated like a な-adjective (そうではない, そうだった, etc.)\n' +
        '5. Note: い-adjectives "ない" and "よい" become "なさそうだ" and "よさそうだ"'
    },
    examples: [
      {
        japanese: '<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>りそうです。',
        zhTW: '看起來要下雨了。',
        en: 'It looks like it will rain.',
        explanation: {
          'zh-TW': '「降りそうだ」表示「看起來要下雨」，根據雲層等外觀判斷。',
          'en': '"降りそうだ" means "looks like it will rain", judgment based on clouds and appearance.'
        }
      },
      {
        japanese: '<ruby>この<rt>この</rt></ruby><ruby>料<rt>りょう</rt></ruby><ruby>理<rt>り</rt></ruby>は<ruby>美味<rt>おい</rt></ruby>しそうです。',
        zhTW: '這道料理看起來很好吃。',
        en: 'This dish looks delicious.',
        explanation: {
          'zh-TW': '「美味しそうだ」表示「看起來很好吃」，根據外觀判斷。',
          'en': '"美味しそうだ" means "looks delicious", judgment based on appearance.'
        }
      },
      {
        japanese: '<ruby>彼<rt>かれ</rt></ruby>は<ruby>元<rt>げん</rt></ruby><ruby>気<rt>き</rt></ruby>そうです。',
        zhTW: '他看起來很有精神。',
        en: 'He looks energetic.',
        explanation: {
          'zh-TW': '「元気そうだ」表示「看起來很有精神」，根據外觀判斷。',
          'en': '"元気そうだ" means "looks energetic", judgment based on appearance.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 樣態的「そうだ」接動詞ます形詞幹或形容詞詞幹，表示根據外觀的判斷。\n' +
        '2. 與傳聞「そうだ」的區別：\n' +
        '   - 樣態：接ます形詞幹或形容詞詞幹（降りそうだ、美味しそうだ）\n' +
        '   - 傳聞：接普通形（降るそうだ、美味しいそうだ）\n' +
        '3. 特殊變化：「ない」→「なさそうだ」，「よい」→「よさそうだ」。',
      'en':
        'Learning tips:\n' +
        '1. Appearance "そうだ" is attached to verb ます stem or adjective stem to express judgment based on appearance.\n' +
        '2. Difference from hearsay "そうだ":\n' +
        '   - Appearance: attached to ます stem or adjective stem (降りそうだ, 美味しそうだ)\n' +
        '   - Hearsay: attached to plain form (降るそうだ, 美味しいそうだ)\n' +
        '3. Special conjugations: "ない" → "なさそうだ", "よい" → "よさそうだ".'
    }
  }
};

