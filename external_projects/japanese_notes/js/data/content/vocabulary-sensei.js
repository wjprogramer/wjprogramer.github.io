// 先生 - 詳細內容

export const vocabularySensei = {
  id: 'vocabulary-sensei',
  title: {
    'zh-TW': '先生',
    'en': '先生'
  },
  japanese: '<ruby>先<rt>せん</rt></ruby><ruby>生<rt>せい</rt></ruby>',
  category: {
    type: 'vocabulary',
    level: 'N5'
  },
  tags: ['basic', 'vocabulary', 'noun'],
  meaning: {
    'zh-TW': '老師、先生',
    'en': 'teacher, 先生'
  },
  content: {
    overview: {
      'zh-TW': '「先生」是指教師、醫生、律師等專業人士的敬稱。在日文中，這是一個非常尊敬的稱呼。',
      'en': '"先生" is a respectful title for teachers, doctors, lawyers, and other professionals. In Japanese, this is a very respectful form of address.'
    },
    usage: {
      'zh-TW': '使用方式：\n1. 直接稱呼：田中先生（Tanaka sensei）\n2. 第三人稱：先生は優しいです（老師很親切）\n3. 可以用於各種專業人士',
      'en': 'Usage:\n1. Direct address: 田中先生\n2. Third person: 先生は優しいです (The teacher is kind)\n3. Can be used for various professionals'
    },
    examples: [
      {
        japanese: '<ruby>田<rt>たな</rt></ruby><ruby>中<rt>か</rt></ruby><ruby>先<rt>せん</rt></ruby><ruby>生<rt>せい</rt></ruby>は<ruby>優<rt>やさ</rt></ruby>しいです。',
        reading: 'たなかせんせいはやさしいです。',
        zhTW: '田中老師很親切。',
        en: '田中先生 is kind.'
      },
      {
        japanese: '<ruby>先<rt>せん</rt></ruby><ruby>生<rt>せい</rt></ruby>、おはようございます。',
        reading: 'せんせい、おはようございます。',
        zhTW: '老師，早安。',
        en: 'Good morning, teacher.'
      },
      {
        japanese: '<ruby>医<rt>い</rt></ruby><ruby>者<rt>しゃ</rt></ruby>を<ruby>先<rt>せん</rt></ruby><ruby>生<rt>せい</rt></ruby>と<ruby>呼<rt>よ</rt></ruby>びます。',
        reading: 'いしゃをせんせいとよびます。',
        zhTW: '醫生也被稱為先生。',
        en: 'Doctors are also called "先生".'
      }
    ],
    relatedWords: [
      {
        id: 'vocabulary-gakusei',
        title: {
          'zh-TW': '学生',
          'en': '学生'
        }
      }
    ]
  }
};

