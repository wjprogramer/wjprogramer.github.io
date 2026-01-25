// 買う - 詳細內容

export const vocabularyKau = {
  id: 'vocabulary-kau',
  title: {
    'zh-TW': '買う',
    'en': '買う'
  },
  japanese: '<ruby>買<rt>かう</rt></ruby>う',
  category: {
    type: 'vocabulary',
    level: 'N5'
  },
  tags: ['basic', 'vocabulary', 'verb'],
  meaning: {
    'zh-TW': '買、購買',
    'en': 'to buy'
  },
  content: {
    overview: {
      'zh-TW': '「買う」是五段動詞，意思是「買、購買」。表示用金錢換取物品。',
      'en': '"買う" is a 五段 verb meaning "to buy". It indicates exchanging money for goods.'
    },
    verbForms: {
      'zh-TW': '動詞變化：\n- ます形：買います\n- て形：買って\n- た形：買った\n- ない形：買わない',
      'en': 'Verb conjugations:\n- ます form: 買います\n- て form: 買って\n- た form: 買った\n- ない form: 買わない'
    },
    examples: [
      {
        japanese: '<ruby>本<rt>ほん</rt></ruby>を<ruby>買<rt>か</rt></ruby>います。',
        zhTW: '買書。',
        en: 'I buy a book.'
      },
      {
        japanese: '<ruby>昨<rt>きのう</rt></ruby>日、<ruby>服<rt>ふく</rt></ruby>を<ruby>買<rt>か</rt></ruby>いました。',
        zhTW: '昨天買了衣服。',
        en: 'I bought clothes yesterday.'
      },
      {
        japanese: '<ruby>何<rt>なに</rt></ruby>を<ruby>買<rt>か</rt></ruby>いますか？',
        zhTW: '你要買什麼？',
        en: 'What will you buy?'
      }
    ],
    relatedWords: [
      {
        id: 'vocabulary-suru',
        title: {
          'zh-TW': 'する',
          'en': 'する'
        }
      }
    ]
  }
};

