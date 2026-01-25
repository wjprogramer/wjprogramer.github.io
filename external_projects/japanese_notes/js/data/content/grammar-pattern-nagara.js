// 句型「〜ながら」 - 詳細內容

export const grammarPatternNagara = {
  id: 'grammar-pattern-nagara',
  title: {
    'zh-TW': '句型「〜ながら」',
    'en': 'Pattern "〜ながら"'
  },
  category: {
    type: 'grammar',
    level: 'N4'
  },
  tags: ['grammar'],
  description: {
    'zh-TW': '「〜ながら」表示「一邊...一邊...」「雖然...但是...」',
    'en': '"〜ながら" expresses "while doing..." or "although..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜ながら」接在動詞「ます形」詞幹後面，有兩種主要用法：一是表示同時進行兩個動作（一邊...一邊...），二是表示逆接（雖然...但是...）。',
      'en':
        '"〜ながら" is attached to the stem of a verb in ます form and has two main uses: one is to express two simultaneous actions (while doing...), and the other is to express contrast (although...).'
    },
    usage: {
      'zh-TW':
        '「〜ながら」的用法：\n' +
        '1. 表示同時進行：一邊...一邊...（如「音楽を聞きながら勉強する」）\n' +
        '2. 表示逆接：雖然...但是...（如「若いながら経験がある」）\n' +
        '3. 注意：接在動詞「ます形」詞幹後面（去掉「ます」）',
      'en':
        'Usage of "〜ながら":\n' +
        '1. Express simultaneous actions: while doing... (e.g., 「音楽を聞きながら勉強する」)\n' +
        '2. Express contrast: although... (e.g., 「若いながら経験がある」)\n' +
        '3. Note: Attached to the stem of a verb in ます form (remove "ます")'
    },
    examples: [
      {
        japanese: '<ruby>音<rt>おん</rt></ruby><ruby>楽<rt>がく</rt></ruby>を<ruby>聞<rt>き</rt></ruby>きながら<ruby>勉<rt>べん</rt></ruby><ruby>強<rt>きょう</rt></ruby>します。',
        zhTW: '一邊聽音樂一邊學習。',
        en: 'I study while listening to music.',
        explanation: {
          'zh-TW': '「ながら」表示同時進行兩個動作，「一邊聽音樂一邊學習」。',
          'en': '"ながら" expresses two simultaneous actions, "study while listening to music".'
        }
      },
      {
        japanese: '<ruby>食<rt>た</rt></ruby>べながら<ruby>話<rt>はな</rt></ruby>します。',
        zhTW: '一邊吃一邊說話。',
        en: 'I talk while eating.',
        explanation: {
          'zh-TW': '「ながら」連接兩個動作，表示同時進行。',
          'en': '"ながら" connects two actions, expressing simultaneous performance.'
        }
      },
      {
        japanese: '<ruby>若<rt>わか</rt></ruby>いながら<ruby>経<rt>けい</rt></ruby><ruby>験<rt>けん</rt></ruby>があります。',
        zhTW: '雖然年輕但有經驗。',
        en: 'Although young, I have experience.',
        explanation: {
          'zh-TW': '「ながら」表示逆接，「雖然年輕但是有經驗」。',
          'en': '"ながら" expresses contrast, "although young, have experience".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜ながら」最常用的用法是表示同時進行兩個動作。\n' +
        '2. 表示逆接時，「ながら」通常接在形容詞或名詞後面，表示「雖然...但是...」。\n' +
        '3. 注意「ながら」和「〜て」的區別：「ながら」強調同時進行，「〜て」強調順序。',
      'en':
        'Learning tips:\n' +
        '1. The most common use of "〜ながら" is to express two simultaneous actions.\n' +
        '2. When expressing contrast, "ながら" is usually attached to adjectives or nouns, meaning "although...but...".\n' +
        '3. Note the difference between "ながら" and "〜て": "ながら" emphasizes simultaneity, "〜て" emphasizes sequence.'
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
        id: 'grammar-pattern-noni',
        title: {
          'zh-TW': '句型「〜のに」',
          'en': 'Pattern "〜のに"'
        }
      }
    ]
  }
};


