// 読む - 詳細內容

export const vocabularyYomu = {
  id: 'vocabulary-yomu',
  title: {
    'zh-TW': '読む',
    'en': '読む'
  },
  japanese: '<ruby>読<rt>よむ</rt></ruby>む',
  category: {
    type: 'vocabulary',
    level: 'N5'
  },
  tags: ['basic', 'vocabulary', 'verb'],
  meaning: {
    'zh-TW': '讀、閱讀',
    'en': 'to read'
  },
  content: {
    overview: {
      'zh-TW': '「読む」是五段動詞，意思是「讀、閱讀」。常用於讀書、讀報紙、讀文章等。',
      'en': '"読む" is a 五段 verb meaning "to read". Commonly used for reading books, newspapers, articles, etc.'
    },
    verbForms: {
      'zh-TW': '動詞變化：\n- ます形：読みます\n- て形：読んで\n- た形：読んだ\n- ない形：読まない',
      'en': 'Verb conjugations:\n- ます form: 読みます\n- て form: 読んで\n- た form: 読んだ\n- ない form: 読まない'
    },
    examples: [
      {
        japanese: '<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>みます。',
        zhTW: '讀書。',
        en: 'I read a book.'
      },
      {
        japanese: '<ruby>新<rt>しん</rt></ruby><ruby>聞<rt>ぶん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>んでいます。',
        zhTW: '正在讀報紙。',
        en: 'I am reading a newspaper.'
      },
      {
        japanese: '<ruby>日<rt>に</rt></ruby><ruby>本<rt>ほん</rt></ruby><ruby>語<rt>ご</rt></ruby>の<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>むことができます。',
        zhTW: '能夠讀日文書。',
        en: 'I can read Japanese books.'
      }
    ],
    relatedWords: [
      {
        id: 'vocabulary-hon',
        title: {
          'zh-TW': '本',
          'en': '本'
        }
      }
    ]
  }
};

