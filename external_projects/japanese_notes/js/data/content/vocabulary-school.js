// 學校 - 詳細內容

export const vocabularySchool = {
  id: 'category-school',
  title: {
    'zh-TW': '學校',
    'en': 'School'
  },
  category: {
    type: 'vocabulary',
    level: 'N5'
  },
  tags: ['basic', 'vocabulary', 'school', 'topic-category'],
  description: {
    'zh-TW': '日語中常見的學校相關單字',
    'en': 'Common school-related words in Japanese'
  },
  content: {
    overview: {
      'zh-TW':
        '學校是學生生活中最重要的場所之一。日語中的學校相關單字包括學校類型、教室、科目、學習用品等，了解這些單字對於描述學校生活、學習等場合很重要。',
      'en':
        'School is one of the most important places in student life. School-related words in Japanese include school types, classrooms, subjects, school supplies, etc. Understanding these words is important for describing school life, studying, etc.'
    },
    usage: {
      'zh-TW':
        '學校的用法：\n' +
        '1. 描述學校：〜に通っています（就讀於...）\n' +
        '2. 談論科目：〜を勉強しています（學習...）\n' +
        '3. 描述教室：〜にいます（在...）',
      'en':
        'Usage of school:\n' +
        '1. Describe school: 〜に通っています (attend...)\n' +
        '2. Talk about subjects: 〜を勉強しています (study...)\n' +
        '3. Describe classroom: 〜にいます (be in...)'
    },
    examples: [
      {
        japanese: '<ruby>学<rt>がっ</rt></ruby><ruby>校<rt>こう</rt></ruby>に<ruby>通<rt>かよ</rt></ruby>っています。',
        zhTW: '就讀學校。',
        en: 'I attend school.',
        explanation: {
          'zh-TW': '「通う」表示「就讀、通勤」。',
          'en': '"通う" means "to attend, to commute".'
        }
      },
      {
        japanese: '<ruby>数<rt>すう</rt></ruby><ruby>学<rt>がく</rt></ruby>を<ruby>勉<rt>べん</rt></ruby><ruby>強<rt>きょう</rt></ruby>しています。',
        zhTW: '正在學習數學。',
        en: 'I am studying mathematics.',
        explanation: {
          'zh-TW': '「勉強する」表示「學習」。',
          'en': '"勉強する" means "to study".'
        }
      },
      {
        japanese: '<ruby>教<rt>きょう</rt></ruby><ruby>室<rt>しつ</rt></ruby>にいます。',
        zhTW: '在教室裡。',
        en: 'I am in the classroom.',
        explanation: {
          'zh-TW': '「教室」是教室，用「に」標示位置。',
          'en': '"教室" is classroom, marked with "に" to indicate location.'
        }
      }
    ],
    vocabulary: [
      {
        japanese: '<ruby>小<rt>しょう</rt></ruby><ruby>学<rt>がっ</rt></ruby><ruby>校<rt>こう</rt></ruby>',
        zhTW: '小學',
        en: 'elementary school'
      },
      {
        japanese: '<ruby>中<rt>ちゅう</rt></ruby><ruby>学<rt>がっ</rt></ruby><ruby>校<rt>こう</rt></ruby>',
        zhTW: '中學',
        en: 'junior high school'
      },
      {
        japanese: '<ruby>高<rt>こう</rt></ruby><ruby>等<rt>とう</rt></ruby><ruby>学<rt>がっ</rt></ruby><ruby>校<rt>こう</rt></ruby>',
        zhTW: '高中',
        en: 'high school'
      },
      {
        japanese: '<ruby>大<rt>だい</rt></ruby><ruby>学<rt>がく</rt></ruby>',
        zhTW: '大學',
        en: 'university, college'
      },
      {
        japanese: '<ruby>教<rt>きょう</rt></ruby><ruby>室<rt>しつ</rt></ruby>',
        zhTW: '教室',
        en: 'classroom'
      },
      {
        japanese: '<ruby>図<rt>と</rt></ruby><ruby>書<rt>しょ</rt></ruby><ruby>館<rt>かん</rt></ruby>',
        zhTW: '圖書館',
        en: 'library'
      },
      {
        japanese: '<ruby>運<rt>うん</rt></ruby><ruby>動<rt>どう</rt></ruby><ruby>場<rt>じょう</rt></ruby>',
        zhTW: '運動場',
        en: 'playground, sports field'
      },
      {
        japanese: '<ruby>国<rt>こく</rt></ruby><ruby>語<rt>ご</rt></ruby>',
        zhTW: '國語',
        en: 'Japanese language (as a subject)'
      },
      {
        japanese: '<ruby>数<rt>すう</rt></ruby><ruby>学<rt>がく</rt></ruby>',
        zhTW: '數學',
        en: 'mathematics'
      },
      {
        japanese: '<ruby>英<rt>えい</rt></ruby><ruby>語<rt>ご</rt></ruby>',
        zhTW: '英語',
        en: 'English (as a subject)'
      },
      {
        japanese: '<ruby>理<rt>り</rt></ruby><ruby>科<rt>か</rt></ruby>',
        zhTW: '理科',
        en: 'science'
      },
      {
        japanese: '<ruby>社<rt>しゃ</rt></ruby><ruby>会<rt>かい</rt></ruby>',
        zhTW: '社會',
        en: 'social studies'
      },
      {
        japanese: '<ruby>本<rt>ほん</rt></ruby>',
        zhTW: '書',
        en: 'book'
      },
      {
        japanese: '<ruby>鉛<rt>えん</rt></ruby><ruby>筆<rt>ぴつ</rt></ruby>',
        zhTW: '鉛筆',
        en: 'pencil'
      },
      {
        japanese: '<ruby>消<rt>け</rt></ruby><ruby>し<rt>し</rt></ruby><ruby>ゴム<rt>ゴム</rt></ruby>',
        zhTW: '橡皮擦',
        en: 'eraser'
      },
      {
        japanese: '<ruby>ノート<rt>ノート</rt></ruby>',
        zhTW: '筆記本',
        en: 'notebook',
        notes: {
          'zh-TW': '外來語',
          'en': 'Loanword'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 學校類型從小學到大學都有固定的名稱。\n' +
        '2. 科目名稱大多是漢語，用漢字書寫。\n' +
        '3. 學習用品有些是固有詞彙，有些是外來語（如「ノート」「消しゴム」）。',
      'en':
        'Learning tips:\n' +
        '1. School types from elementary to university have fixed names.\n' +
        '2. Subject names are mostly Sino-Japanese words, written in kanji.\n' +
        '3. School supplies include both native words and loanwords (e.g., "ノート", "消しゴム").'
    }
  }
};


