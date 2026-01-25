// 行く - 詳細內容（更新）

export const vocabularyIku = {
  id: 'vocabulary-iku',
  title: {
    'zh-TW': '行く',
    'en': '行く'
  },
  japanese: '<ruby>行<rt>いく</rt></ruby>く',
  category: {
    type: 'vocabulary',
    level: 'N5'
  },
  tags: ['basic', 'vocabulary', 'verb'],
  meaning: {
    'zh-TW': '去、前往',
    'en': 'to go'
  },
  content: {
    overview: {
      'zh-TW': '「行く」是五段動詞，意思是「去、前往」。注意：讀音是「いく」，不是「ゆく」（雖然「ゆく」也是正確的，但「いく」更常用）。',
      'en': '"行く" is a 五段 verb meaning "to go". Note: The reading is "いく", not "ゆく" (although "ゆく" is also correct, "いく" is more commonly used).'
    },
    verbForms: {
      'zh-TW': '動詞變化：\n- ます形：行きます\n- て形：行って\n- た形：行った\n- ない形：行かない',
      'en': 'Verb conjugations:\n- ます form: 行きます\n- て form: 行って\n- た form: 行った\n- ない form: 行かない'
    },
    examples: [
      {
        japanese: '<ruby>学<rt>がっ</rt></ruby><ruby>校<rt>こう</rt></ruby>に<ruby>行<rt>い</rt></ruby>きます。',
        zhTW: '去學校。',
        en: 'I go to school.'
      },
      {
        japanese: '<ruby>昨<rt>きのう</rt></ruby>日、<ruby>公<rt>こう</rt></ruby><ruby>園<rt>えん</rt></ruby>に<ruby>行<rt>い</rt></ruby>きました。',
        zhTW: '昨天去了公園。',
        en: 'I went to the park yesterday.'
      },
      {
        japanese: 'どこに<ruby>行<rt>い</rt></ruby>きますか？',
        zhTW: '要去哪裡？',
        en: 'Where are you going?'
      }
    ],
    relatedWords: [
      {
        id: 'vocabulary-kuru',
        title: {
          'zh-TW': '来る',
          'en': '来る'
        }
      },
      {
        id: 'vocabulary-kaeru',
        title: {
          'zh-TW': '帰る',
          'en': '帰る'
        }
      }
    ]
  }
};
