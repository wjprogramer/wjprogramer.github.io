// 動詞ない形 - 詳細內容

export const grammarVerbNaiForm = {
  id: 'grammar-verb-nai-form',
  title: {
    'zh-TW': '動詞ない形',
    'en': 'Verb ない Form'
  },
  category: {
    type: 'grammar',
    level: 'N5'
  },
  tags: ['basic', 'grammar', 'verb'],
  description: {
    'zh-TW': '動詞ない形用於表示否定，是動詞變化的重要形式',
    'en': 'Verb ない form is used to indicate negation, an important verb conjugation'
  },
  content: {
    overview: {
      'zh-TW':
        '動詞ない形用於表示否定，意思是「不...」「沒...」。ない形是許多否定相關文型的基礎，如「〜ないでください」「〜なければならない」等。',
      'en':
        'Verb ない form is used to indicate negation, meaning "not..." or "don\'t...". The ない form is the foundation for many negation-related grammar patterns like "〜ないでください" and "〜なければならない".'
    },
    usage: {
      'zh-TW':
        'ない形的用法：\n' +
        '1. 表示否定：不...、沒...（如「食べない」「行かない」）\n' +
        '2. 表示禁止：不要...（如「食べないでください」）\n' +
        '3. 表示義務：必須...（如「行かなければならない」）\n' +
        '4. 表示條件：如果不...（如「行かなければ」）',
      'en':
        'Usage of ない form:\n' +
        '1. Indicate negation: not..., don\'t... (e.g., 「食べない」「行かない」)\n' +
        '2. Indicate prohibition: don\'t... (e.g., 「食べないでください」)\n' +
        '3. Indicate obligation: must... (e.g., 「行かなければならない」)\n' +
        '4. Indicate condition: if not... (e.g., 「行かなければ」)'
    },
    verbForms: {
      'zh-TW':
        'ない形的變化規則：\n' +
        '1. 五段動詞：將詞尾改為「あ段」音加「ない」（如「買う→買わない」「書く→書かない」「読む→読まない」）\n' +
        '   特殊：以「う」結尾的動詞改為「わない」（如「買う→買わない」）\n' +
        '2. 一段動詞：去掉「る」加「ない」（如「食べる→食べない」「見る→見ない」）\n' +
        '3. 不規則動詞：\n' +
        '   - する → しない\n' +
        '   - くる → こない\n' +
        '   - ある → ない（特殊）',
      'en':
        'ない form conjugation rules:\n' +
        '1. 五段 verbs: change the ending to "あ段" sound plus "ない" (e.g., 「買う→買わない」「書く→書かない」「読む→読まない」)\n' +
        '   Special: verbs ending in "う" change to "わない" (e.g., 「買う→買わない」)\n' +
        '2. 一段 verbs: remove "る" and add "ない" (e.g., 「食べる→食べない」「見る→見ない」)\n' +
        '3. Irregular verbs:\n' +
        '   - する → しない\n' +
        '   - くる → こない\n' +
        '   - ある → ない (special)'
    },
    examples: [
      {
        japanese: '<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>みません。',
        zhTW: '不讀書。',
        en: 'I don\'t read books.',
        explanation: {
          'zh-TW': '「ない形」表示否定，「不讀書」。',
          'en': 'The ない form indicates negation, "don\'t read books".'
        }
      },
      {
        japanese: '<ruby>食<rt>た</rt></ruby>べないでください。',
        zhTW: '請不要吃。',
        en: 'Please don\'t eat.',
        explanation: {
          'zh-TW': '「ない形」加上「でください」表示禁止。',
          'en': 'The ない form plus "でください" indicates prohibition.'
        }
      },
      {
        japanese: '<ruby>行<rt>い</rt></ruby>かなければなりません。',
        zhTW: '必須去。',
        en: 'I must go.',
        explanation: {
          'zh-TW': '「ない形」加上「ければならない」表示義務。',
          'en': 'The ない form plus "ければならない" indicates obligation.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 五段動詞的ない形變化需要將詞尾改為「あ段」音，這是關鍵。\n' +
        '2. 注意「ある」的否定是「ない」，不是「あらない」。\n' +
        '3. ない形是許多重要文型的基礎，必須熟練掌握。',
      'en':
        'Learning tips:\n' +
        '1. For 五段 verbs, the ない form changes the ending to "あ段" sound, which is key.\n' +
        '2. Note that the negative of "ある" is "ない", not "あらない".\n' +
        '3. The ない form is the foundation for many important grammar patterns, so master it well.'
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
        id: 'grammar-verb-ta-form',
        title: {
          'zh-TW': '動詞た形',
          'en': 'Verb た Form'
        }
      }
    ]
  }
};

