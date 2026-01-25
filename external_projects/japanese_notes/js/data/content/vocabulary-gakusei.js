
// 学生 - 詳細內容

export const vocabularyGakusei = {
  id: 'vocabulary-gakusei',
  title: {
    'zh-TW': '学生',
    'en': '学生'
  },
  japanese: '<ruby>学<rt>がく</rt></ruby><ruby>生<rt>せい</rt></ruby>',
  category: {
    type: 'vocabulary',
    level: 'N5'
  },
  tags: ['basic', 'vocabulary', 'noun'],
  meaning: {
    'zh-TW': '學生',
    'en': 'student'
  },
  content: {
    overview: {
      'zh-TW': '「学生」是指正在學校學習的人，通常指大學生。小學生是「小学生」，中學生是「中学生」。',
      'en': '"学生" refers to a person studying at school, usually university students. Elementary school students are "小学生", middle school students are "中学生".'
    },
    examples: [
      {
        japanese: '<ruby>私<rt>わたし</rt></ruby>は<ruby>学<rt>がく</rt></ruby><ruby>生<rt>せい</rt></ruby>です。',
        reading: 'わたしはがくせいです。',
        zhTW: '我是學生。',
        en: 'I am a student.'
      },
      {
        japanese: '<ruby>学<rt>がく</rt></ruby><ruby>生<rt>せい</rt></ruby>の<ruby>時<rt>とき</rt></ruby>、よく<ruby>図<rt>としょ</rt></ruby><ruby>書<rt>かん</rt></ruby><ruby>館<rt>かん</rt></ruby>に<ruby>行<rt>い</rt></ruby>きました。',
        reading: 'がくせいのとき、よくとしょかんにいきました。',
        zhTW: '當學生的時候，我經常去圖書館。',
        en: 'When I was a student, I often went to the library.'
      },
      {
        japanese: 'この<ruby>大<rt>だい</rt></ruby><ruby>学<rt>がく</rt></ruby>には<ruby>多<rt>おお</rt></ruby>くの<ruby>学<rt>がく</rt></ruby><ruby>生<rt>せい</rt></ruby>がいます。',
        reading: 'このだいがくにはおおくのがくせいがいます。',
        zhTW: '這所大學有很多學生。',
        en: 'There are many students at this university.'
      }
    ],
    relatedWords: [
      {
        id: 'vocabulary-sensei',
        title: {
          'zh-TW': '先生',
          'en': '先生'
        }
      },
      {
        id: 'kanji-gaku',
        title: {
          'zh-TW': '学',
          'en': '学'
        }
      },
      {
        id: 'kanji-sei',
        title: {
          'zh-TW': '生',
          'en': '生'
        }
      }
    ]
  }
};

