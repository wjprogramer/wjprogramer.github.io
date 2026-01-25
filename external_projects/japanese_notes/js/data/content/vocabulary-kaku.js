// 書く - 詳細內容

export const vocabularyKaku = {
  id: 'vocabulary-kaku',
  title: {
    'zh-TW': '書く',
    'en': '書く'
  },
  japanese: '<ruby>書<rt>か</rt></ruby>く',
  category: {
    type: 'vocabulary',
    level: 'N5'
  },
  tags: ['basic', 'vocabulary', 'verb'],
  meaning: {
    'zh-TW': '寫、書寫',
    'en': 'to write'
  },
  content: {
    overview: {
      'zh-TW': '「書く」是五段動詞，意思是「寫、書寫」。用於寫字、寫文章、寫信等。',
      'en': '"書く" is a 五段 verb meaning "to write". Used for writing characters, articles, letters, etc.'
    },
    verbForms: {
      'zh-TW': '動詞變化：\n- ます形：書きます\n- て形：書いて\n- た形：書いた\n- ない形：書かない',
      'en': 'Verb conjugations:\n- ます form: 書きます\n- て form: 書いて\n- た form: 書いた\n- ない form: 書かない'
    },
    examples: [
      {
        japanese: '<ruby>手<rt>て</rt></ruby><ruby>紙<rt>がみ</rt></ruby>を<ruby>書<rt>か</rt></ruby>きます。',
        zhTW: '寫信。',
        en: 'I write a letter.'
      },
      {
        japanese: '<ruby>日<rt>に</rt></ruby><ruby>本<rt>ほん</rt></ruby><ruby>語<rt>ご</rt></ruby>で<ruby>書<rt>か</rt></ruby>いています。',
        zhTW: '正在用日文寫。',
        en: 'I am writing in Japanese.'
      },
      {
        japanese: '<ruby>名<rt>なま</rt></ruby>前を<ruby>書<rt>か</rt></ruby>いてください。',
        zhTW: '請寫名字。',
        en: 'Please write your name.'
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

