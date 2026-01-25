// 動詞た形 - 詳細內容

export const grammarVerbTaForm = {
  id: 'grammar-verb-ta-form',
  title: {
    'zh-TW': '動詞た形',
    'en': 'Verb た Form'
  },
  category: {
    type: 'grammar',
    level: 'N5'
  },
  tags: ['basic', 'grammar', 'verb'],
  description: {
    'zh-TW': '動詞た形用於表示過去時態，變化規則與て形相同',
    'en': 'Verb た form is used to indicate past tense, with the same conjugation rules as て form'
  },
  content: {
    overview: {
      'zh-TW':
        '動詞た形用於表示過去時態，變化規則與て形完全相同，只是將「て」改為「た」，「で」改為「だ」。た形是日語中表示過去的基本形式。',
      'en':
        'Verb た form is used to indicate past tense. The conjugation rules are exactly the same as て form, just change "て" to "た" and "で" to "だ". The た form is the basic way to express past tense in Japanese.'
    },
    usage: {
      'zh-TW':
        'た形的用法：\n' +
        '1. 表示過去：做了...（如「食べた」「行った」）\n' +
        '2. 表示經驗：曾經...過（如「日本に行ったことがある」）\n' +
        '3. 表示狀態的變化：變成了...（如「大きくなった」）\n' +
        '4. 用於條件句：如果...（如「行ったら」）',
      'en':
        'Usage of た form:\n' +
        '1. Indicate past: did... (e.g., 「食べた」「行った」)\n' +
        '2. Indicate experience: have...ed (e.g., 「日本に行ったことがある」)\n' +
        '3. Indicate change of state: became... (e.g., 「大きくなった」)\n' +
        '4. Used in conditional sentences: if... (e.g., 「行ったら」)'
    },
    verbForms: {
      'zh-TW':
        'た形的變化規則（與て形相同）：\n' +
        '1. 五段動詞：\n' +
        '   - う・つ・る → った（如「買う→買った」「立つ→立った」「帰る→帰った」）\n' +
        '   - む・ぶ・ぬ → んだ（如「読む→読んだ」「遊ぶ→遊んだ」「死ぬ→死んだ」）\n' +
        '   - く・ぐ → いた・いだ（如「書く→書いた」「急ぐ→急いだ」）\n' +
        '   - す → した（如「話す→話した」）\n' +
        '2. 一段動詞：去掉「る」加「た」（如「食べる→食べた」「見る→見た」）\n' +
        '3. 不規則動詞：\n' +
        '   - する → した\n' +
        '   - くる → きた\n' +
        '   - 行く → 行った（特殊）',
      'en':
        'た form conjugation rules (same as て form):\n' +
        '1. 五段 verbs:\n' +
        '   - う・つ・る → った (e.g., 「買う→買った」「立つ→立った」「帰る→帰った」)\n' +
        '   - む・ぶ・ぬ → んだ (e.g., 「読む→読んだ」「遊ぶ→遊んだ」「死ぬ→死んだ」)\n' +
        '   - く・ぐ → いた・いだ (e.g., 「書く→書いた」「急ぐ→急いだ」)\n' +
        '   - す → した (e.g., 「話す→話した」)\n' +
        '2. 一段 verbs: remove "る" and add "た" (e.g., 「食べる→食べた」「見る→見た」)\n' +
        '3. Irregular verbs:\n' +
        '   - する → した\n' +
        '   - くる → きた\n' +
        '   - 行く → 行った (special)'
    },
    examples: [
      {
        japanese: '<ruby>昨<rt>きのう</rt></ruby>日<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>みました。',
        zhTW: '昨天讀書了。',
        en: 'I read a book yesterday.',
        explanation: {
          'zh-TW': '「た形」表示過去的動作。',
          'en': 'The た form indicates a past action.'
        }
      },
      {
        japanese: '<ruby>日<rt>に</rt></ruby><ruby>本<rt>ほん</rt></ruby>に<ruby>行<rt>い</rt></ruby>ったことがあります。',
        zhTW: '曾經去過日本。',
        en: 'I have been to Japan before.',
        explanation: {
          'zh-TW': '「た形」加上「ことがある」表示經驗。',
          'en': 'The た form plus "ことがある" indicates experience.'
        }
      },
      {
        japanese: '<ruby>大<rt>おお</rt></ruby>きくなりました。',
        zhTW: '變大了。',
        en: 'It became big.',
        explanation: {
          'zh-TW': '「た形」表示狀態的變化。',
          'en': 'The た form indicates a change of state.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. た形的變化規則與て形完全相同，只要記住て形就能掌握た形。\n' +
        '2. た形是表示過去的基本形式，必須熟練掌握。\n' +
        '3. 注意「行く→行った」這個特殊變化。',
      'en':
        'Learning tips:\n' +
        '1. The た form conjugation rules are exactly the same as て form, so if you know て form, you know た form.\n' +
        '2. The た form is the basic way to express past tense, so master it well.\n' +
        '3. Note the special change 「行く→行った」.'
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
        id: 'grammar-verb-nai-form',
        title: {
          'zh-TW': '動詞ない形',
          'en': 'Verb ない Form'
        }
      }
    ]
  }
};

