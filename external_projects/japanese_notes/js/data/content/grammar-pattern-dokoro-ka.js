// 句型「〜どころか」 - 詳細內容

export const grammarPatternDokoroKa = {
  id: 'grammar-pattern-dokoro-ka',
  title: {
    'zh-TW': '句型「〜どころか」',
    'en': 'Pattern "〜どころか"'
  },
  category: {
    type: 'grammar',
    level: 'N2'
  },
  tags: ['grammar'],
  description: {
    'zh-TW': '「〜どころか」表示「別說...就連...」「不但不...反而...」',
    'en': '"〜どころか" expresses "far from...", "not only...but..." or "instead of..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜どころか」接在名詞、動詞、形容詞的普通形後面，表示「別說...就連...」「不但不...反而...」的意思。用於表達與預期相反的情況，強調「不但沒有...，反而...」。',
      'en':
        '"〜どころか" is attached to the plain form of nouns, verbs, and adjectives to express "far from...", "not only...but..." or "instead of...". Used to express situations contrary to expectations, emphasizing "not only not..., but instead...".'
    },
    usage: {
      'zh-TW':
        '「〜どころか」的用法：\n' +
        '1. 表示相反：別說...就連...（如「休むどころか忙しい」）\n' +
        '2. 表示否定：不但不...反而...（如「楽しいどころか大変だ」）\n' +
        '3. 接續方式：\n' +
        '   - 名詞：名詞＋どころか\n' +
        '   - 動詞：普通形＋どころか\n' +
        '   - い形容詞：普通形＋どころか\n' +
        '   - な形容詞：な形容詞＋などころか',
      'en':
        'Usage of "〜どころか":\n' +
        '1. Express opposite: far from..., not only... (e.g., 「休むどころか忙しい」)\n' +
        '2. Express negation: not only not..., but instead... (e.g., 「楽しいどころか大変だ」)\n' +
        '3. Conjugation:\n' +
        '   - Nouns: noun + どころか\n' +
        '   - Verbs: plain form + どころか\n' +
        '   - い-adjectives: plain form + どころか\n' +
        '   - な-adjectives: な-adjective + などころか'
    },
    examples: [
      {
        japanese: '<ruby>休<rt>やす</rt></ruby>むどころか<ruby>忙<rt>いそが</rt></ruby>しいです。',
        zhTW: '別說休息，反而很忙。',
        en: 'Far from resting, I am busy.',
        explanation: {
          'zh-TW': '「どころか」表示相反，「別說休息，反而很忙」。',
          'en': '"どころか" expresses opposite, "far from resting, I am busy".'
        }
      },
      {
        japanese: '<ruby>楽<rt>たの</rt></ruby>しいどころか<ruby>大<rt>たい</rt></ruby><ruby>変<rt>へん</rt></ruby>です。',
        zhTW: '不但不快樂，反而很辛苦。',
        en: 'Far from being fun, it is difficult.',
        explanation: {
          'zh-TW': '「どころか」表示否定，「不但不快樂，反而很辛苦」。',
          'en': '"どころか" expresses negation, "far from being fun, it is difficult".'
        }
      },
      {
        japanese: '<ruby>雨<rt>あめ</rt></ruby>が<ruby>止<rt>や</rt></ruby>むどころか<ruby>強<rt>つよ</rt></ruby>くなりました。',
        zhTW: '雨不但沒停，反而更大了。',
        en: 'Far from stopping, the rain became stronger.',
        explanation: {
          'zh-TW': '「どころか」表示相反，「雨不但沒停，反而更大」。',
          'en': '"どころか" expresses opposite, "far from stopping, the rain became stronger".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜どころか」用於表達與預期相反的情況，強調「不但沒有...，反而...」。\n' +
        '2. 「〜どころか」和「〜ばかりか」的區別：「どころか」表示相反，「ばかりか」表示遞進。\n' +
        '3. 「〜どころか」常用於表達與預期完全相反的情況。',
      'en':
        'Learning tips:\n' +
        '1. "〜どころか" is used to express situations contrary to expectations, emphasizing "not only not..., but instead...".\n' +
        '2. Difference between "〜どころか" and "〜ばかりか": "どころか" expresses opposite, "ばかりか" expresses progression.\n' +
        '3. "〜どころか" is commonly used to express situations completely contrary to expectations.'
    },
    relatedContent: [
      {
        id: 'grammar-pattern-bakari-ka',
        title: {
          'zh-TW': '句型「〜ばかりか」',
          'en': 'Pattern "〜ばかりか"'
        }
      },
      {
        id: 'grammar-particles-bakari',
        title: {
          'zh-TW': '助詞「ばかり」',
          'en': 'Particle "ばかり"'
        }
      }
    ]
  }
};


