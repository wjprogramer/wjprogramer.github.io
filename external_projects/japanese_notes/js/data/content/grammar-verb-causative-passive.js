// 動詞使役被動形 - 詳細內容

export const grammarVerbCausativePassive = {
  id: 'grammar-verb-causative-passive',
  title: {
    'zh-TW': '動詞使役被動形',
    'en': 'Verb Causative-Passive Form'
  },
  category: {
    type: 'grammar',
    level: 'N3'
  },
  tags: ['grammar', 'verb'],
  description: {
    'zh-TW': '動詞使役被動形用於表示「被迫...」「被讓...做...」',
    'en': 'Verb causative-passive form is used to express "be made to..." or "be forced to..."'
  },
  content: {
    overview: {
      'zh-TW':
        '動詞使役被動形是使役形和被動形的組合，用於表示「被迫...」「被讓...做...」的意思。這個形式常用於表達不情願或被迫的動作，語氣較強。',
      'en':
        'Verb causative-passive form is a combination of causative and passive forms, used to express "be made to..." or "be forced to...". This form is commonly used to express unwilling or forced actions, with a strong tone.'
    },
    usage: {
      'zh-TW':
        '使役被動形的用法：\n' +
        '1. 表示被迫：被迫...（如「勉強させられる」）\n' +
        '2. 表示不情願：被讓...做...（如「働かされる」）\n' +
        '3. 變化規則：使役形＋られる（如「勉強させる→勉強させられる」）',
      'en':
        'Usage of causative-passive form:\n' +
        '1. Express being forced: be forced to... (e.g., 「勉強させられる」)\n' +
        '2. Express unwillingness: be made to... (e.g., 「働かされる」)\n' +
        '3. Conjugation rules: causative form + られる (e.g., 「勉強させる→勉強させられる」)'
    },
    verbForms: {
      'zh-TW':
        '使役被動形的變化規則：\n' +
        '1. 五段動詞：使役形（あ段＋せる）＋られる（如「働く→働かせる→働かされる」）\n' +
        '2. 一段動詞：使役形（〜させる）＋られる（如「勉強する→勉強させる→勉強させられる」）\n' +
        '3. 不規則動詞：\n' +
        '   - する → させられる\n' +
        '   - くる → こさせられる\n' +
        '4. 口語簡化：五段動詞的使役被動形可以簡化為「〜される」（如「働かされる」）',
      'en':
        'Causative-passive form conjugation rules:\n' +
        '1. 五段 verbs: causative form (あ段 + せる) + られる (e.g., 「働く→働かせる→働かされる」)\n' +
        '2. 一段 verbs: causative form (〜させる) + られる (e.g., 「勉強する→勉強させる→勉強させられる」)\n' +
        '3. Irregular verbs:\n' +
        '   - する → させられる\n' +
        '   - くる → こさせられる\n' +
        '4. Colloquial simplification: causative-passive form of 五段 verbs can be simplified to "〜される" (e.g., "働かされる")'
    },
    examples: [
      {
        japanese: '<ruby>子<rt>こ</rt></ruby><ruby>供<rt>ども</rt></ruby>は<ruby>勉<rt>べん</rt></ruby><ruby>強<rt>きょう</rt></ruby>させられました。',
        zhTW: '孩子被迫學習了。',
        en: 'The child was made to study.',
        explanation: {
          'zh-TW': '「勉強させられる」是「勉強する」的使役被動形，表示「被迫學習」。',
          'en': '"勉強させられる" is the causative-passive form of "勉強する", meaning "be made to study".'
        }
      },
      {
        japanese: '<ruby>私<rt>わたし</rt></ruby>は<ruby>働<rt>はたら</rt></ruby>かされました。',
        zhTW: '我被逼工作了。',
        en: 'I was made to work.',
        explanation: {
          'zh-TW': '「働かされる」是「働く」的使役被動形（口語簡化），表示「被迫工作」。',
          'en': '"働かされる" is the causative-passive form of "働く" (colloquial simplification), meaning "be made to work".'
        }
      },
      {
        japanese: '<ruby>早<rt>はや</rt></ruby>く<ruby>起<rt>お</rt></ruby>きさせられました。',
        zhTW: '被迫早起了。',
        en: 'I was made to wake up early.',
        explanation: {
          'zh-TW': '「起きさせられる」是「起きる」的使役被動形，表示「被迫早起」。',
          'en': '"起きさせられる" is the causative-passive form of "起きる", meaning "be made to wake up early".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 使役被動形是使役形和被動形的組合，表示「被迫...」的意思。\n' +
        '2. 五段動詞的使役被動形在口語中可以簡化為「〜される」，但正式場合仍用「〜させられる」。\n' +
        '3. 使役被動形常用於表達不情願或被迫的動作，語氣較強。',
      'en':
        'Learning tips:\n' +
        '1. Causative-passive form is a combination of causative and passive forms, meaning "be forced to...".\n' +
        '2. Causative-passive form of 五段 verbs can be simplified to "〜される" in colloquial speech, but "〜させられる" is still used in formal situations.\n' +
        '3. Causative-passive form is commonly used to express unwilling or forced actions, with a strong tone.'
    },
    relatedContent: [
      {
        id: 'grammar-verb-causative',
        title: {
          'zh-TW': '動詞使役形',
          'en': 'Verb Causative Form'
        }
      },
      {
        id: 'grammar-verb-passive',
        title: {
          'zh-TW': '動詞被動形',
          'en': 'Verb Passive Form'
        }
      }
    ]
  }
};


