// 動詞可能形 - 詳細內容

export const grammarVerbPotential = {
  id: 'grammar-verb-potential',
  title: {
    'zh-TW': '動詞可能形',
    'en': 'Verb Potential Form'
  },
  category: {
    type: 'grammar',
    level: 'N4'
  },
  tags: ['grammar', 'verb'],
  description: {
    'zh-TW': '動詞可能形用於表示「能夠...」「可以...」的能力或可能性',
    'en': 'Verb potential form is used to express ability or possibility "can..." or "be able to..."'
  },
  content: {
    overview: {
      'zh-TW':
        '動詞可能形用於表示「能夠...」「可以...」的能力或可能性。可能形的變化規則因動詞類型而異，一段動詞和不規則動詞的變化較簡單，五段動詞需要將詞尾改為「え段」音加「る」。',
      'en':
        'Verb potential form is used to express ability or possibility "can..." or "be able to...". The conjugation rules vary by verb type: 一段 verbs and irregular verbs are simpler, while 五段 verbs need to change the ending to "え段" sound plus "る".'
    },
    usage: {
      'zh-TW':
        '可能形的用法：\n' +
        '1. 表示能力：能夠...（如「日本語が話せる」）\n' +
        '2. 表示可能性：可以...（如「ここで食べられる」）\n' +
        '3. 注意：可能形動詞的對象通常用「が」標示，而不是「を」',
      'en':
        'Usage of potential form:\n' +
        '1. Express ability: can... (e.g., 「日本語が話せる」)\n' +
        '2. Express possibility: can... (e.g., 「ここで食べられる」)\n' +
        '3. Note: The object of potential form verbs is usually marked with "が" instead of "を"'
    },
    verbForms: {
      'zh-TW':
        '可能形的變化規則：\n' +
        '1. 五段動詞：將詞尾改為「え段」音加「る」（如「話す→話せる」「読む→読める」「書く→書ける」）\n' +
        '2. 一段動詞：去掉「る」加「られる」（如「食べる→食べられる」「見る→見られる」）\n' +
        '3. 不規則動詞：\n' +
        '   - する → できる\n' +
        '   - くる → こられる',
      'en':
        'Potential form conjugation rules:\n' +
        '1. 五段 verbs: change ending to "え段" sound plus "る" (e.g., 「話す→話せる」「読む→読める」「書く→書ける」)\n' +
        '2. 一段 verbs: remove "る" and add "られる" (e.g., 「食べる→食べられる」「見る→見られる」)\n' +
        '3. Irregular verbs:\n' +
        '   - する → できる\n' +
        '   - くる → こられる'
    },
    examples: [
      {
        japanese: '<ruby>私<rt>わたし</rt></ruby>は<ruby>日<rt>に</rt></ruby><ruby>本<rt>ほん</rt></ruby><ruby>語<rt>ご</rt></ruby>が<ruby>話<rt>はな</rt></ruby>せます。',
        zhTW: '我會說日語。',
        en: 'I can speak Japanese.',
        explanation: {
          'zh-TW': '「話せる」是「話す」的可能形，表示「能夠說」。',
          'en': '"話せる" is the potential form of "話す", meaning "can speak".'
        }
      },
      {
        japanese: '<ruby>この<rt>この</rt></ruby><ruby>本<rt>ほん</rt></ruby>が<ruby>読<rt>よ</rt></ruby>めます。',
        zhTW: '能讀這本書。',
        en: 'I can read this book.',
        explanation: {
          'zh-TW': '「読める」是「読む」的可能形，對象用「が」標示。',
          'en': '"読める" is the potential form of "読む", and the object is marked with "が".'
        }
      },
      {
        japanese: '<ruby>日<rt>に</rt></ruby><ruby>本<rt>ほん</rt></ruby><ruby>料<rt>りょう</rt></ruby><ruby>理<rt>り</rt></ruby>が<ruby>作<rt>つく</rt></ruby>れます。',
        zhTW: '會做日本料理。',
        en: 'I can make Japanese food.',
        explanation: {
          'zh-TW': '「作れる」是「作る」的可能形，表示「能夠做」。',
          'en': '"作れる" is the potential form of "作る", meaning "can make".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 五段動詞的可能形變化需要將詞尾改為「え段」音，這是關鍵。\n' +
        '2. 可能形動詞的對象通常用「が」標示，而不是「を」，這是與普通動詞的重要區別。\n' +
        '3. 一段動詞的可能形也可以簡化為「〜られる」→「〜れる」（如「食べられる」→「食べれる」），但這是口語用法。',
      'en':
        'Learning tips:\n' +
        '1. For 五段 verbs, the potential form changes the ending to "え段" sound, which is key.\n' +
        '2. The object of potential form verbs is usually marked with "が" instead of "を", which is an important distinction from regular verbs.\n' +
        '3. The potential form of 一段 verbs can also be simplified as "〜られる" → "〜れる" (e.g., "食べられる" → "食べれる"), but this is colloquial usage.'
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


