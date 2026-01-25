// 月份 - 詳細內容

export const vocabularyMonths = {
  id: 'category-months',
  title: {
    'zh-TW': '月份',
    'en': 'Months'
  },
  category: {
    type: 'vocabulary',
    level: 'N5'
  },
  tags: ['basic', 'vocabulary', 'time', 'months', 'topic-category'],
  description: {
    'zh-TW': '日語中的月份名稱',
    'en': 'Month names in Japanese'
  },
  content: {
    overview: {
      'zh-TW':
        '日語中的月份名稱有兩種表達方式：一種是使用數字（1月、2月等），另一種是使用傳統名稱（睦月、如月等）。日常對話中主要使用數字形式，傳統名稱多用於文學或正式場合。',
      'en':
        'Month names in Japanese have two forms: one uses numbers (1月, 2月, etc.), and the other uses traditional names (睦月, 如月, etc.). Numbers are mainly used in daily conversation, while traditional names are often used in literature or formal contexts.'
    },
    usage: {
      'zh-TW':
        '月份的用法：\n' +
        '1. 表示時間：〜月（如「1月」「12月」）\n' +
        '2. 表達日期：〜月〜日（如「3月15日」）\n' +
        '3. 談論月份：〜月に〜をします（在...月做...）',
      'en':
        'Usage of months:\n' +
        '1. Express time: 〜月 (e.g., "1月", "12月")\n' +
        '2. Express date: 〜月〜日 (e.g., "3月15日")\n' +
        '3. Talk about months: 〜月に〜をします (do... in... month)'
    },
    examples: [
      {
        japanese: '<ruby>1<rt>いち</rt></ruby><ruby>月<rt>がつ</rt></ruby>は<ruby>新<rt>あたら</rt></ruby>しい<ruby>年<rt>とし</rt></ruby>の<ruby>始<rt>はじ</rt></ruby>まりです。',
        zhTW: '一月是新年的開始。',
        en: 'January is the beginning of the new year.',
        explanation: {
          'zh-TW': '「1月」是一月，「始まり」是開始。',
          'en': '"1月" is January, "始まり" is beginning.'
        }
      },
      {
        japanese: '<ruby>4<rt>し</rt></ruby><ruby>月<rt>がつ</rt></ruby>に<ruby>桜<rt>さくら</rt></ruby>が<ruby>咲<rt>さ</rt></ruby>きます。',
        zhTW: '四月櫻花會開。',
        en: 'Cherry blossoms bloom in April.',
        explanation: {
          'zh-TW': '「4月」是四月，「桜」是櫻花，「咲く」是開花。',
          'en': '"4月" is April, "桜" is cherry blossom, "咲く" is to bloom.'
        }
      },
      {
        japanese: '<ruby>12<rt>じゅうに</rt></ruby><ruby>月<rt>がつ</rt></ruby>は<ruby>忙<rt>いそが</rt></ruby>しいです。',
        zhTW: '十二月很忙。',
        en: 'December is busy.',
        explanation: {
          'zh-TW': '「12月」是十二月，「忙しい」是忙碌的。',
          'en': '"12月" is December, "忙しい" is busy.'
        }
      }
    ],
    vocabulary: [
      {
        japanese: '<ruby>1<rt>いち</rt></ruby><ruby>月<rt>がつ</rt></ruby>',
        zhTW: '一月',
        en: 'January',
        notes: {
          'zh-TW': '傳統名稱：睦月（むつき）',
          'en': 'Traditional name: 睦月 (むつき)'
        }
      },
      {
        japanese: '<ruby>2<rt>に</rt></ruby><ruby>月<rt>がつ</rt></ruby>',
        zhTW: '二月',
        en: 'February',
        notes: {
          'zh-TW': '傳統名稱：如月（きさらぎ）',
          'en': 'Traditional name: 如月 (きさらぎ)'
        }
      },
      {
        japanese: '<ruby>3<rt>さん</rt></ruby><ruby>月<rt>がつ</rt></ruby>',
        zhTW: '三月',
        en: 'March',
        notes: {
          'zh-TW': '傳統名稱：弥生（やよい）',
          'en': 'Traditional name: 弥生 (やよい)'
        }
      },
      {
        japanese: '<ruby>4<rt>し</rt></ruby><ruby>月<rt>がつ</rt></ruby>',
        zhTW: '四月',
        en: 'April',
        notes: {
          'zh-TW': '傳統名稱：卯月（うづき）',
          'en': 'Traditional name: 卯月 (うづき)'
        }
      },
      {
        japanese: '<ruby>5<rt>ご</rt></ruby><ruby>月<rt>がつ</rt></ruby>',
        zhTW: '五月',
        en: 'May',
        notes: {
          'zh-TW': '傳統名稱：皐月（さつき）',
          'en': 'Traditional name: 皐月 (さつき)'
        }
      },
      {
        japanese: '<ruby>6<rt>ろく</rt></ruby><ruby>月<rt>がつ</rt></ruby>',
        zhTW: '六月',
        en: 'June',
        notes: {
          'zh-TW': '傳統名稱：水無月（みなづき）',
          'en': 'Traditional name: 水無月 (みなづき)'
        }
      },
      {
        japanese: '<ruby>7<rt>しち</rt></ruby><ruby>月<rt>がつ</rt></ruby>',
        zhTW: '七月',
        en: 'July',
        notes: {
          'zh-TW': '傳統名稱：文月（ふみづき）',
          'en': 'Traditional name: 文月 (ふみづき)'
        }
      },
      {
        japanese: '<ruby>8<rt>はち</rt></ruby><ruby>月<rt>がつ</rt></ruby>',
        zhTW: '八月',
        en: 'August',
        notes: {
          'zh-TW': '傳統名稱：葉月（はづき）',
          'en': 'Traditional name: 葉月 (はづき)'
        }
      },
      {
        japanese: '<ruby>9<rt>く</rt></ruby><ruby>月<rt>がつ</rt></ruby>',
        zhTW: '九月',
        en: 'September',
        notes: {
          'zh-TW': '傳統名稱：長月（ながつき）',
          'en': 'Traditional name: 長月 (ながつき)'
        }
      },
      {
        japanese: '<ruby>10<rt>じゅう</rt></ruby><ruby>月<rt>がつ</rt></ruby>',
        zhTW: '十月',
        en: 'October',
        notes: {
          'zh-TW': '傳統名稱：神無月（かんなづき）',
          'en': 'Traditional name: 神無月 (かんなづき)'
        }
      },
      {
        japanese: '<ruby>11<rt>じゅういち</rt></ruby><ruby>月<rt>がつ</rt></ruby>',
        zhTW: '十一月',
        en: 'November',
        notes: {
          'zh-TW': '傳統名稱：霜月（しもつき）',
          'en': 'Traditional name: 霜月 (しもつき)'
        }
      },
      {
        japanese: '<ruby>12<rt>じゅうに</rt></ruby><ruby>月<rt>がつ</rt></ruby>',
        zhTW: '十二月',
        en: 'December',
        notes: {
          'zh-TW': '傳統名稱：師走（しわす）',
          'en': 'Traditional name: 師走 (しわす)'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 記住1到12月的數字讀法。\n' +
        '2. 注意「4月」讀作「しがつ」而不是「よんがつ」，「7月」讀作「しちがつ」而不是「なながつ」，「9月」讀作「くがつ」而不是「きゅうがつ」。\n' +
        '3. 傳統月份名稱多用於文學作品，日常對話中較少使用。',
      'en':
        'Learning tips:\n' +
        '1. Remember the readings for months 1 to 12.\n' +
        '2. Note that "4月" is read as "しがつ" not "よんがつ", "7月" is "しちがつ" not "なながつ", and "9月" is "くがつ" not "きゅうがつ".\n' +
        '3. Traditional month names are mostly used in literature, less common in daily conversation.'
    }
  }
};

