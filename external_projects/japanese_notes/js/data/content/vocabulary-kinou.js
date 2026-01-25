// 昨日 - 詳細內容

export const vocabularyKinou = {
  id: 'vocabulary-kinou',
  title: {
    'zh-TW': '昨日',
    'en': '昨日'
  },
  japanese: '<ruby>昨<rt>きのう</rt></ruby>日',
  category: {
    type: 'vocabulary',
    level: 'N5'
  },
  tags: ['basic', 'vocabulary', 'noun', 'time'],
  meaning: {
    'zh-TW': '昨天',
    'en': 'yesterday'
  },
  content: {
    overview: {
      'zh-TW': '「昨日」是指昨天。雖然寫作「昨日」，但讀作「きのう」，這是特殊的讀法。',
      'en': '"昨日" means yesterday. Although written as "昨日", it is read as "きのう", which is a special reading.'
    },
    examples: [
      {
        japanese: '<ruby>昨<rt>きのう</rt></ruby>日、<ruby>本<rt>ほん</rt></ruby>を<ruby>買<rt>か</rt></ruby>いました。',
        reading: 'きのう、ほんをかいました。',
        zhTW: '昨天買了書。',
        en: 'I bought a book yesterday.'
      },
      {
        japanese: '<ruby>昨<rt>きのう</rt></ruby>日は<ruby>日<rt>にち</rt></ruby><ruby>曜<rt>よう</rt></ruby>日でした。',
        reading: 'きのうはにちようびでした。',
        zhTW: '昨天是星期日。',
        en: 'Yesterday was Sunday.'
      },
      {
        japanese: '<ruby>昨<rt>きのう</rt></ruby>日、<ruby>友<rt>とも</rt></ruby>達に<ruby>会<rt>あ</rt></ruby>いました。',
        reading: 'きのう、ともだちにあいました。',
        zhTW: '昨天見了朋友。',
        en: 'I met my friend yesterday.'
      }
    ],
    relatedWords: [
      {
        id: 'vocabulary-kyou',
        title: {
          'zh-TW': '今日',
          'en': '今日'
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

