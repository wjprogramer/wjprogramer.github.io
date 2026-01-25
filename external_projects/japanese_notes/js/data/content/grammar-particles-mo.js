// 助詞「も」 - 詳細內容

export const grammarParticlesMo = {
  id: 'grammar-particles-mo',
  title: {
    'zh-TW': '助詞「も」',
    'en': 'Particle "も"'
  },
  category: {
    type: 'grammar',
    level: 'N5'
  },
  tags: ['basic', 'grammar', 'particle'],
  description: {
    'zh-TW': '助詞「も」用於表示「也、都、甚至」等意思',
    'en': 'The particle "も" is used to mean "also, too, even"'
  },
  content: {
    overview: {
      'zh-TW':
        '助詞「も」用於表示「也、都、甚至」等意思，可以替代「は」「が」「を」等助詞，表示「也...」「都...」的意思。',
      'en':
        'The particle "も" is used to mean "also, too, even". It can replace particles like "は", "が", "を" to mean "also..." or "too...".'
    },
    usage: {
      'zh-TW':
        '「も」的用法：\n' +
        '1. 表示「也」：也...（如「私も行きます」）\n' +
        '2. 表示「都」：都...（如「何もない」）\n' +
        '3. 表示「甚至」：甚至...（如「子供も分かる」）\n' +
        '4. 表示數量之多：多達...（如「3時間も待った」）',
      'en':
        'Usage of "も":\n' +
        '1. Mean "also": also... (e.g., 「私も行きます」)\n' +
        '2. Mean "all, both": all... (e.g., 「何もない」)\n' +
        '3. Mean "even": even... (e.g., 「子供も分かる」)\n' +
        '4. Emphasize large quantity: as much as... (e.g., 「3時間も待った」)'
    },
    examples: [
      {
        japanese: '<ruby>私<rt>わたし</rt></ruby>も<ruby>行<rt>い</rt></ruby>きます。',
        zhTW: '我也去。',
        en: 'I will also go.',
        explanation: {
          'zh-TW': '「も」表示「也」，替代了「は」。',
          'en': '"も" means "also", replacing "は".'
        }
      },
      {
        japanese: '<ruby>本<rt>ほん</rt></ruby>も<ruby>ペン<rt>ペン</rt></ruby>も<ruby>買<rt>か</rt></ruby>いました。',
        zhTW: '書和筆都買了。',
        en: 'I bought both books and pens.',
        explanation: {
          'zh-TW': '「も...も」表示「都...都...」。',
          'en': '"も...も" means "both...and...".'
        }
      },
      {
        japanese: '<ruby>何<rt>なに</rt></ruby>も<ruby>食<rt>た</rt></ruby>べませんでした。',
        zhTW: '什麼都沒吃。',
        en: 'I didn\'t eat anything.',
        explanation: {
          'zh-TW': '「何も」與否定形連用，表示「什麼都（不）...」。',
          'en': '"何も" used with negative form means "nothing (at all)...".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「も」可以替代「は」「が」「を」等助詞，表示「也...」的意思。\n' +
        '2. 「も...も」表示「都...都...」，強調兩者都。\n' +
        '3. 「何も」「誰も」「どこも」等與否定形連用，表示「什麼都（不）...」「誰都（不）...」「哪裡都（不）...」。',
      'en':
        'Learning tips:\n' +
        '1. "も" can replace particles like "は", "が", "を" to mean "also...".\n' +
        '2. "も...も" means "both...and...", emphasizing both.\n' +
        '3. "何も", "誰も", "どこも" etc. used with negative form mean "nothing (at all)...", "nobody (at all)...", "nowhere (at all)...".'
    },
    relatedContent: [
      {
        id: 'grammar-particles-wa',
        title: {
          'zh-TW': '助詞「は」',
          'en': 'Particle "は"'
        }
      },
      {
        id: 'grammar-particles-ga',
        title: {
          'zh-TW': '助詞「が」',
          'en': 'Particle "が"'
        }
      }
    ]
  }
};

