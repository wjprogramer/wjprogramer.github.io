// 今日 - 詳細內容

export const vocabularyKyou = {
  id: 'vocabulary-kyou',
  title: {
    'zh-TW': '今日',
    'en': '今日'
  },
  japanese: '<ruby>今<rt>きょう</rt></ruby>日',
  category: {
    type: 'vocabulary',
    level: 'N5'
  },
  tags: ['basic', 'vocabulary', 'noun', 'time'],
  meaning: {
    'zh-TW': '今天',
    'en': 'today'
  },
  content: {
    overview: {
      'zh-TW': '「今日」是指今天。雖然寫作「今日」，但讀作「きょう」，這是特殊的讀法。',
      'en': '"今日" means today. Although written as "今日", it is read as "きょう", which is a special reading.'
    },
    examples: [
      {
        japanese: '<ruby>今<rt>きょう</rt></ruby>日は<ruby>月<rt>げつ</rt></ruby><ruby>曜<rt>よう</rt></ruby>日です。',
        reading: 'きょうはげつようびです。',
        zhTW: '今天是星期一。',
        en: 'Today is Monday.'
      },
      {
        japanese: '<ruby>今<rt>きょう</rt></ruby>日は<ruby>忙<rt>いそが</rt></ruby>しいです。',
        reading: 'きょうはいそがしいです。',
        zhTW: '今天很忙。',
        en: 'Today is busy.'
      },
      {
        japanese: '<ruby>今<rt>きょう</rt></ruby>日、<ruby>学<rt>がっ</rt></ruby><ruby>校<rt>こう</rt></ruby>に<ruby>行<rt>い</rt></ruby>きます。',
        reading: 'きょう、がっこうにいきます。',
        zhTW: '今天去學校。',
        en: 'I go to school today.'
      }
    ],
    relatedWords: [
      {
        id: 'vocabulary-kinou',
        title: {
          'zh-TW': '昨日',
          'en': '昨日'
        }
      },
      {
        id: 'vocabulary-ashita',
        title: {
          'zh-TW': '明日',
          'en': '明日'
        }
      }
    ]
  }
};

