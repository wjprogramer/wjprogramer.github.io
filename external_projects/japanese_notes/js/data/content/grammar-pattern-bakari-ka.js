// 句型「〜ばかりか」 - 詳細內容

export const grammarPatternBakariKa = {
  id: 'grammar-pattern-bakari-ka',
  title: {
    'zh-TW': '句型「〜ばかりか」',
    'en': 'Pattern "〜ばかりか"'
  },
  category: {
    type: 'grammar',
    level: 'N2'
  },
  tags: ['grammar'],
  description: {
    'zh-TW': '「〜ばかりか」表示「不僅...而且...」「不但...還...」',
    'en': '"〜ばかりか" expresses "not only...but also..." or "not only...but..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜ばかりか」接在名詞、動詞、形容詞的普通形後面，表示「不僅...而且...」「不但...還...」的意思。用於表達遞進關係，強調「不僅如此，還有更多」。',
      'en':
        '"〜ばかりか" is attached to the plain form of nouns, verbs, and adjectives to express "not only...but also..." or "not only...but...". Used to express progressive relationship, emphasizing "not only this, but also more".'
    },
    usage: {
      'zh-TW':
        '「〜ばかりか」的用法：\n' +
        '1. 表示遞進：不僅...而且...（如「日本語ばかりか英語も話せる」）\n' +
        '2. 表示強調：不但...還...（如「寒いばかりか雪も降っている」）\n' +
        '3. 接續方式：\n' +
        '   - 名詞：名詞＋ばかりか\n' +
        '   - 動詞：普通形＋ばかりか\n' +
        '   - い形容詞：普通形＋ばかりか\n' +
        '   - な形容詞：な形容詞＋なばかりか',
      'en':
        'Usage of "〜ばかりか":\n' +
        '1. Express progression: not only...but also... (e.g., 「日本語ばかりか英語も話せる」)\n' +
        '2. Express emphasis: not only...but... (e.g., 「寒いばかりか雪も降っている」)\n' +
        '3. Conjugation:\n' +
        '   - Nouns: noun + ばかりか\n' +
        '   - Verbs: plain form + ばかりか\n' +
        '   - い-adjectives: plain form + ばかりか\n' +
        '   - な-adjectives: な-adjective + なばかりか'
    },
    examples: [
      {
        japanese: '<ruby>日<rt>に</rt></ruby><ruby>本<rt>ほん</rt></ruby><ruby>語<rt>ご</rt></ruby>ばかりか<ruby>英<rt>えい</rt></ruby><ruby>語<rt>ご</rt></ruby>も<ruby>話<rt>はな</rt></ruby>せます。',
        zhTW: '不僅會說日語，還會說英語。',
        en: 'Not only can I speak Japanese, but also English.',
        explanation: {
          'zh-TW': '「ばかりか」表示遞進，「不僅日語，還英語」。',
          'en': '"ばかりか" expresses progression, "not only Japanese, but also English".'
        }
      },
      {
        japanese: '<ruby>寒<rt>さむ</rt></ruby>いばかりか<ruby>雪<rt>ゆき</rt></ruby>も<ruby>降<rt>ふ</rt></ruby>っています。',
        zhTW: '不但冷，還在下雪。',
        en: 'Not only is it cold, but it is also snowing.',
        explanation: {
          'zh-TW': '「ばかりか」表示強調，「不但冷，還下雪」。',
          'en': '"ばかりか" expresses emphasis, "not only cold, but also snowing".'
        }
      },
      {
        japanese: '<ruby>時<rt>じ</rt></ruby><ruby>間<rt>かん</rt></ruby>がないばかりか<ruby>お<rt>お</rt></ruby><ruby>金<rt>かね</rt></ruby>もありません。',
        zhTW: '不僅沒有時間，還沒有錢。',
        en: 'Not only do I not have time, but I also don\'t have money.',
        explanation: {
          'zh-TW': '「ばかりか」表示遞進，「不僅沒有時間，還沒有錢」。',
          'en': '"ばかりか" expresses progression, "not only no time, but also no money".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜ばかりか」用於表達遞進關係，強調「不僅如此，還有更多」。\n' +
        '2. 「〜ばかりか」和「〜だけでなく」的區別：「ばかりか」語氣更強，多用於書面語。\n' +
        '3. 「〜ばかりか」常與「も」一起使用，形成「〜ばかりか〜も」的句型。',
      'en':
        'Learning tips:\n' +
        '1. "〜ばかりか" is used to express progressive relationship, emphasizing "not only this, but also more".\n' +
        '2. Difference between "〜ばかりか" and "〜だけでなく": "ばかりか" has a stronger tone, mostly used in written language.\n' +
        '3. "〜ばかりか" is often used with "も", forming the pattern "〜ばかりか〜も".'
    },
    relatedContent: [
      {
        id: 'grammar-particles-bakari',
        title: {
          'zh-TW': '助詞「ばかり」',
          'en': 'Particle "ばかり"'
        }
      },
      {
        id: 'grammar-pattern-dokoro-ka',
        title: {
          'zh-TW': '句型「〜どころか」',
          'en': 'Pattern "〜どころか"'
        }
      }
    ]
  }
};


