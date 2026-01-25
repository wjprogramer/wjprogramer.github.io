// 家庭成員 - 詳細內容

export const vocabularyFamily = {
  id: 'category-family',
  title: {
    'zh-TW': '家庭成員',
    'en': 'Family Members'
  },
  category: {
    type: 'vocabulary',
    level: 'N5'
  },
  tags: ['basic', 'vocabulary', 'family', 'topic-category'],
  description: {
    'zh-TW': '日語中常見的家庭成員稱呼',
    'en': 'Common family member terms in Japanese'
  },
  content: {
    overview: {
      'zh-TW':
        '日語中的家庭成員稱呼分為「內」和「外」兩種。對自己家人使用「內」稱呼（如「父」「母」），對別人的家人使用「外」稱呼（如「お父さん」「お母さん」）。這是日語敬語的重要體現。',
      'en':
        'Family member terms in Japanese are divided into "内" (uchi, inside) and "外" (soto, outside) forms. Use "内" terms for your own family (e.g., "父", "母"), and "外" terms for other people\'s family (e.g., "お父さん", "お母さん"). This is an important aspect of Japanese honorifics.'
    },
    usage: {
      'zh-TW':
        '家庭成員的用法：\n' +
        '1. 對自己家人：使用「內」稱呼（如「父」「母」「兄」「姉」）\n' +
        '2. 對別人的家人：使用「外」稱呼（如「お父さん」「お母さん」「お兄さん」「お姉さん」）\n' +
        '3. 直接稱呼家人時：可以使用「お父さん」「お母さん」等',
      'en':
        'Usage of family members:\n' +
        '1. For your own family: use "内" terms (e.g., "父", "母", "兄", "姉")\n' +
        '2. For other people\'s family: use "外" terms (e.g., "お父さん", "お母さん", "お兄さん", "お姉さん")\n' +
        '3. When directly addressing family: can use "お父さん", "お母さん", etc.'
    },
    examples: [
      {
        japanese: '<ruby>私<rt>わたし</rt></ruby>の<ruby>父<rt>ちち</rt></ruby>は<ruby>医<rt>い</rt></ruby><ruby>者<rt>しゃ</rt></ruby>です。',
        zhTW: '我的父親是醫生。',
        en: 'My father is a doctor.',
        explanation: {
          'zh-TW': '「父」是對自己家人的稱呼。',
          'en': '"父" is the term for your own father.'
        }
      },
      {
        japanese: '<ruby>田中<rt>たなか</rt></ruby>さんのお<ruby>父<rt>とう</rt></ruby>さんは<ruby>先<rt>せん</rt></ruby><ruby>生<rt>せい</rt></ruby>です。',
        zhTW: '田中先生的父親是老師。',
        en: 'Tanaka-san\'s father is a teacher.',
        explanation: {
          'zh-TW': '「お父さん」是對別人父親的稱呼。',
          'en': '"お父さん" is the term for someone else\'s father.'
        }
      },
      {
        japanese: '<ruby>兄<rt>あに</rt></ruby>と<ruby>姉<rt>あね</rt></ruby>がいます。',
        zhTW: '有哥哥和姐姐。',
        en: 'I have an older brother and an older sister.',
        explanation: {
          'zh-TW': '「兄」「姉」是對自己家人的稱呼。',
          'en': '"兄" and "姉" are terms for your own siblings.'
        }
      }
    ],
    vocabulary: [
      {
        japanese: '<ruby>父<rt>ちち</rt></ruby>',
        zhTW: '父親（對自己家人）',
        en: 'father (own family)',
        notes: {
          'zh-TW': '對別人：お父さん',
          'en': 'For others: お父さん'
        }
      },
      {
        japanese: '<ruby>母<rt>はは</rt></ruby>',
        zhTW: '母親（對自己家人）',
        en: 'mother (own family)',
        notes: {
          'zh-TW': '對別人：お母さん',
          'en': 'For others: お母さん'
        }
      },
      {
        japanese: '<ruby>兄<rt>あに</rt></ruby>',
        zhTW: '哥哥（對自己家人）',
        en: 'older brother (own family)',
        notes: {
          'zh-TW': '對別人：お兄さん',
          'en': 'For others: お兄さん'
        }
      },
      {
        japanese: '<ruby>姉<rt>あね</rt></ruby>',
        zhTW: '姐姐（對自己家人）',
        en: 'older sister (own family)',
        notes: {
          'zh-TW': '對別人：お姉さん',
          'en': 'For others: お姉さん'
        }
      },
      {
        japanese: '<ruby>弟<rt>おとうと</rt></ruby>',
        zhTW: '弟弟',
        en: 'younger brother',
        notes: {
          'zh-TW': '對別人：弟さん',
          'en': 'For others: 弟さん'
        }
      },
      {
        japanese: '<ruby>妹<rt>いもうと</rt></ruby>',
        zhTW: '妹妹',
        en: 'younger sister',
        notes: {
          'zh-TW': '對別人：妹さん',
          'en': 'For others: 妹さん'
        }
      },
      {
        japanese: '<ruby>祖父<rt>そふ</rt></ruby>',
        zhTW: '祖父（對自己家人）',
        en: 'grandfather (own family)',
        notes: {
          'zh-TW': '對別人：お祖父さん',
          'en': 'For others: お祖父さん'
        }
      },
      {
        japanese: '<ruby>祖母<rt>そぼ</rt></ruby>',
        zhTW: '祖母（對自己家人）',
        en: 'grandmother (own family)',
        notes: {
          'zh-TW': '對別人：お祖母さん',
          'en': 'For others: お祖母さん'
        }
      },
      {
        japanese: '<ruby>息子<rt>むすこ</rt></ruby>',
        zhTW: '兒子',
        en: 'son',
        notes: {
          'zh-TW': '對別人：息子さん',
          'en': 'For others: 息子さん'
        }
      },
      {
        japanese: '<ruby>娘<rt>むすめ</rt></ruby>',
        zhTW: '女兒',
        en: 'daughter',
        notes: {
          'zh-TW': '對別人：娘さん',
          'en': 'For others: 娘さん'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 記住「內」和「外」的區別，這是日語敬語的重要部分。\n' +
        '2. 「兄」「姉」指的是比自己年長的兄弟姐妹，「弟」「妹」指的是比自己年幼的。\n' +
        '3. 直接稱呼家人時，可以使用「お父さん」「お母さん」等，這樣更親切。',
      'en':
        'Learning tips:\n' +
        '1. Remember the distinction between "内" and "外" terms - this is an important part of Japanese honorifics.\n' +
        '2. "兄" and "姉" refer to older siblings, "弟" and "妹" refer to younger siblings.\n' +
        '3. When directly addressing family, you can use "お父さん", "お母さん", etc., which is more affectionate.'
    }
  }
};

