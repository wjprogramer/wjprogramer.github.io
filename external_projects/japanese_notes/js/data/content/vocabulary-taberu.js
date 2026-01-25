// 食べる - 詳細內容

export const vocabularyTaberu = {
  id: 'vocabulary-taberu',
  title: {
    'zh-TW': '食べる',
    'en': '食べる'
  },
  japanese: '<ruby>食<rt>た</rt></ruby>べる',
  category: {
    type: 'vocabulary',
    level: 'N5'
  },
  tags: ['basic', 'vocabulary', 'verb'],
  meaning: {
    'zh-TW': '吃',
    'en': 'to eat'
  },
  content: {
    overview: {
      'zh-TW': '「食べる」是一段動詞，意思是「吃」。這是日文中最常用的動詞之一。',
      'en': '"食べる" is an 一段 verb meaning "to eat". This is one of the most commonly used verbs in Japanese.'
    },
    verbForms: {
      'zh-TW': '動詞變化：\n- ます形：食べます\n- て形：食べて\n- た形：食べた\n- ない形：食べない',
      'en': 'Verb conjugations:\n- ます form: 食べます\n- て form: 食べて\n- た form: 食べた\n- ない form: 食べない'
    },
    examples: [
      {
        japanese: 'ご<ruby>飯<rt>はん</rt></ruby>を<ruby>食<rt>た</rt></ruby>べます。',
        zhTW: '吃飯。',
        en: 'I eat rice/meal.'
      },
      {
        japanese: '<ruby>今<rt>いま</rt></ruby>、<ruby>食<rt>しょく</rt></ruby><ruby>事<rt>じ</rt></ruby>を<ruby>食<rt>た</rt></ruby>べています。',
        zhTW: '現在正在吃飯。',
        en: 'I am eating a meal now.'
      },
      {
        japanese: '<ruby>美<rt>おい</rt></ruby>味しいものを<ruby>食<rt>た</rt></ruby>べたいです。',
        zhTW: '想吃美味的東西。',
        en: 'I want to eat something delicious.'
      }
    ],
    relatedWords: [
      {
        id: 'vocabulary-tabemono',
        title: {
          'zh-TW': '食べ物',
          'en': '食べ物'
        }
      }
    ]
  }
};

