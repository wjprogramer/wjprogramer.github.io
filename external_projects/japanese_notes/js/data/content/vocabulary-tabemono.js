// 食べ物 - 詳細內容（更新）

export const vocabularyTabemono = {
  id: 'vocabulary-tabemono',
  title: {
    'zh-TW': '食べ物',
    'en': '食べ物'
  },
  japanese: '<ruby>食<rt>た</rt></ruby>べ<ruby>物<rt>もの</rt></ruby>',
  category: {
    type: 'vocabulary',
    level: 'N5'
  },
  tags: ['basic', 'vocabulary', 'noun'],
  meaning: {
    'zh-TW': '食物',
    'en': 'food'
  },
  content: {
    overview: {
      'zh-TW': '「食べ物」是指食物、食品。由動詞「食べる」（吃）和名詞「物」（東西）組成。',
      'en': '"食べ物" means food. It is composed of the verb "食べる" (to eat) and the noun "物" (thing).'
    },
    examples: [
      {
        japanese: '<ruby>美<rt>おい</rt></ruby>味しい<ruby>食<rt>た</rt></ruby>べ<ruby>物<rt>もの</rt></ruby>です。',
        reading: 'おいしいたべものです。',
        zhTW: '是美味的食物。',
        en: 'It is delicious food.'
      },
      {
        japanese: '<ruby>食<rt>た</rt></ruby>べ<ruby>物<rt>もの</rt></ruby>を<ruby>買<rt>か</rt></ruby>います。',
        reading: 'たべものをかいます。',
        zhTW: '買食物。',
        en: 'I buy food.'
      },
      {
        japanese: '<ruby>好<rt>す</rt></ruby>きな<ruby>食<rt>た</rt></ruby>べ<ruby>物<rt>もの</rt></ruby>は<ruby>何<rt>なん</rt></ruby>ですか？',
        reading: 'すきなたべものはなんですか？',
        zhTW: '你喜歡什麼食物？',
        en: 'What is your favorite food?'
      }
    ],
    relatedWords: [
      {
        id: 'vocabulary-taberu',
        title: {
          'zh-TW': '食べる',
          'en': '食べる'
        }
      },
      {
        id: 'vocabulary-oishii',
        title: {
          'zh-TW': '美味しい',
          'en': '美味しい'
        }
      }
    ]
  }
};
