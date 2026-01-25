// 職業 - 詳細內容

export const vocabularyOccupation = {
  id: 'category-occupation',
  title: {
    'zh-TW': '職業',
    'en': 'Occupation'
  },
  category: {
    type: 'vocabulary',
    level: 'N5'
  },
  tags: ['basic', 'vocabulary', 'occupation', 'topic-category'],
  description: {
    'zh-TW': '日語中常見的職業單字',
    'en': 'Common occupation words in Japanese'
  },
  content: {
    overview: {
      'zh-TW':
        '職業是日常會話中經常談論的話題。日語中的職業名稱有些是固有詞彙，有些是漢語，有些是外來語。了解這些單字對於自我介紹、詢問他人工作等場合很重要。',
      'en':
        'Occupation is a frequently discussed topic in daily conversation. Occupation names in Japanese include native words, Sino-Japanese words, and loanwords. Understanding these words is important for self-introduction, asking about others\' work, etc.'
    },
    usage: {
      'zh-TW':
        '職業的用法：\n' +
        '1. 自我介紹：私は〜です（我是...）\n' +
        '2. 詢問職業：お仕事は何ですか（您的工作是什麼？）\n' +
        '3. 描述工作：〜をしています（從事...工作）',
      'en':
        'Usage of occupation:\n' +
        '1. Self-introduction: 私は〜です (I am...)\n' +
        '2. Ask about occupation: お仕事は何ですか (What is your job?)\n' +
        '3. Describe work: 〜をしています (work as...)'
    },
    examples: [
      {
        japanese: '<ruby>私<rt>わたし</rt></ruby>は<ruby>医<rt>い</rt></ruby><ruby>者<rt>しゃ</rt></ruby>です。',
        zhTW: '我是醫生。',
        en: 'I am a doctor.',
        explanation: {
          'zh-TW': '「医者」是醫生，用「です」結尾表示職業。',
          'en': '"医者" is doctor, ending with "です" to indicate occupation.'
        }
      },
      {
        japanese: '<ruby>先<rt>せん</rt></ruby><ruby>生<rt>せい</rt></ruby>をしています。',
        zhTW: '從事教師工作。',
        en: 'I work as a teacher.',
        explanation: {
          'zh-TW': '「〜をしています」表示「從事...工作」。',
          'en': '"〜をしています" means "work as...".'
        }
      },
      {
        japanese: '<ruby>お<rt>お</rt></ruby><ruby>仕<rt>し</rt></ruby><ruby>事<rt>ごと</rt></ruby>は<ruby>何<rt>なん</rt></ruby>ですか。',
        zhTW: '您的工作是什麼？',
        en: 'What is your job?',
        explanation: {
          'zh-TW': '「お仕事」是「仕事」的禮貌說法，用於詢問他人的職業。',
          'en': '"お仕事" is the polite form of "仕事", used to ask about others\' occupation.'
        }
      }
    ],
    vocabulary: [
      {
        japanese: '<ruby>医<rt>い</rt></ruby><ruby>者<rt>しゃ</rt></ruby>',
        zhTW: '醫生',
        en: 'doctor'
      },
      {
        japanese: '<ruby>看<rt>かん</rt></ruby><ruby>護<rt>ご</rt></ruby><ruby>師<rt>し</rt></ruby>',
        zhTW: '護士',
        en: 'nurse'
      },
      {
        japanese: '<ruby>教<rt>きょう</rt></ruby><ruby>師<rt>し</rt></ruby>',
        zhTW: '教師',
        en: 'teacher'
      },
      {
        japanese: '<ruby>学<rt>がく</rt></ruby><ruby>生<rt>せい</rt></ruby>',
        zhTW: '學生',
        en: 'student'
      },
      {
        japanese: '<ruby>会<rt>かい</rt></ruby><ruby>社<rt>しゃ</rt></ruby><ruby>員<rt>いん</rt></ruby>',
        zhTW: '公司職員',
        en: 'company employee'
      },
      {
        japanese: '<ruby>エンジニア<rt>エンジニア</rt></ruby>',
        zhTW: '工程師',
        en: 'engineer',
        notes: {
          'zh-TW': '外來語',
          'en': 'Loanword'
        }
      },
      {
        japanese: '<ruby>料<rt>りょう</rt></ruby><ruby>理<rt>り</rt></ruby><ruby>人<rt>にん</rt></ruby>',
        zhTW: '廚師',
        en: 'chef, cook'
      },
      {
        japanese: '<ruby>運<rt>うん</rt></ruby><ruby>転<rt>てん</rt></ruby><ruby>手<rt>しゅ</rt></ruby>',
        zhTW: '司機',
        en: 'driver'
      },
      {
        japanese: '<ruby>警<rt>けい</rt></ruby><ruby>察<rt>さつ</rt></ruby>',
        zhTW: '警察',
        en: 'police officer'
      },
      {
        japanese: '<ruby>消<rt>しょう</rt></ruby><ruby>防<rt>ぼう</rt></ruby><ruby>士<rt>し</rt></ruby>',
        zhTW: '消防員',
        en: 'firefighter'
      },
      {
        japanese: '<ruby>弁<rt>べん</rt></ruby><ruby>護<rt>ご</rt></ruby><ruby>士<rt>し</rt></ruby>',
        zhTW: '律師',
        en: 'lawyer'
      },
      {
        japanese: '<ruby>会<rt>かい</rt></ruby><ruby>計<rt>けい</rt></ruby><ruby>士<rt>し</rt></ruby>',
        zhTW: '會計師',
        en: 'accountant'
      },
      {
        japanese: '<ruby>デザイナー<rt>デザイナー</rt></ruby>',
        zhTW: '設計師',
        en: 'designer',
        notes: {
          'zh-TW': '外來語',
          'en': 'Loanword'
        }
      },
      {
        japanese: '<ruby>芸<rt>げい</rt></ruby><ruby>術<rt>じゅつ</rt></ruby><ruby>家<rt>か</rt></ruby>',
        zhTW: '藝術家',
        en: 'artist'
      },
      {
        japanese: '<ruby>作<rt>さっ</rt></ruby><ruby>家<rt>か</rt></ruby>',
        zhTW: '作家',
        en: 'writer, author'
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 許多職業名稱是漢語，用漢字書寫。\n' +
        '2. 詢問他人職業時，使用「お仕事は何ですか」較為禮貌。\n' +
        '3. 描述自己從事某職業時，可以用「〜をしています」或「〜です」。',
      'en':
        'Learning tips:\n' +
        '1. Many occupation names are Sino-Japanese words, written in kanji.\n' +
        '2. When asking about others\' occupation, use "お仕事は何ですか" which is more polite.\n' +
        '3. When describing your own occupation, you can use "〜をしています" or "〜です".'
    }
  }
};


