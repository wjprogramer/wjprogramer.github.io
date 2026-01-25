// 星期幾 - 詳細內容

export const vocabularyWeekdays = {
  id: 'category-weekdays',
  title: {
    'zh-TW': '星期',
    'en': 'Days of Week'
  },
  category: {
    type: 'vocabulary',
    level: 'N5'
  },
  tags: ['basic', 'vocabulary', 'time', 'weekdays', 'topic-category'],
  description: {
    'zh-TW': '日語中的星期名稱',
    'en': 'Day names of the week in Japanese'
  },
  content: {
    overview: {
      'zh-TW':
        '日語中的星期名稱使用「曜日（ようび）」這個詞，每個星期都有對應的名稱。星期一到星期日分別是：月曜日、火曜日、水曜日、木曜日、金曜日、土曜日、日曜日。',
      'en':
        'Day names in Japanese use the word "曜日 (ようび)", and each day has a corresponding name. Monday through Sunday are: 月曜日, 火曜日, 水曜日, 木曜日, 金曜日, 土曜日, 日曜日.'
    },
    usage: {
      'zh-TW':
        '星期的用法：\n' +
        '1. 表示星期：〜曜日（如「月曜日」）\n' +
        '2. 表達日期：〜曜日に〜をします（在...做...）\n' +
        '3. 省略形式：〜曜（如「月曜」）',
      'en':
        'Usage of weekdays:\n' +
        '1. Express day: 〜曜日 (e.g., "月曜日")\n' +
        '2. Express schedule: 〜曜日に〜をします (do... on...)\n' +
        '3. Abbreviated form: 〜曜 (e.g., "月曜")'
    },
    examples: [
      {
        japanese: '<ruby>月<rt>げつ</rt></ruby><ruby>曜<rt>よう</rt></ruby><ruby>日<rt>び</rt></ruby>に<ruby>学<rt>がっ</rt></ruby><ruby>校<rt>こう</rt></ruby>へ<ruby>行<rt>い</rt></ruby>きます。',
        zhTW: '星期一去學校。',
        en: 'I go to school on Monday.',
        explanation: {
          'zh-TW': '「月曜日」是星期一，「学校へ行く」是去學校。',
          'en': '"月曜日" is Monday, "学校へ行く" is to go to school.'
        }
      },
      {
        japanese: '<ruby>日<rt>にち</rt></ruby><ruby>曜<rt>よう</rt></ruby><ruby>日<rt>び</rt></ruby>は<ruby>休<rt>やす</rt></ruby>みです。',
        zhTW: '星期日是休息日。',
        en: 'Sunday is a day off.',
        explanation: {
          'zh-TW': '「日曜日」是星期日，「休み」是休息。',
          'en': '"日曜日" is Sunday, "休み" is rest/day off.'
        }
      },
      {
        japanese: '<ruby>金<rt>きん</rt></ruby><ruby>曜<rt>よう</rt></ruby><ruby>日<rt>び</rt></ruby>に<ruby>会<rt>かい</rt></ruby><ruby>議<rt>ぎ</rt></ruby>があります。',
        zhTW: '星期五有會議。',
        en: 'There is a meeting on Friday.',
        explanation: {
          'zh-TW': '「金曜日」是星期五，「会議」是會議。',
          'en': '"金曜日" is Friday, "会議" is meeting.'
        }
      }
    ],
    vocabulary: [
      {
        japanese: '<ruby>月<rt>げつ</rt></ruby><ruby>曜<rt>よう</rt></ruby><ruby>日<rt>び</rt></ruby>',
        zhTW: '星期一',
        en: 'Monday',
        notes: {
          'zh-TW': '省略：月曜',
          'en': 'Abbreviation: 月曜'
        }
      },
      {
        japanese: '<ruby>火<rt>か</rt></ruby><ruby>曜<rt>よう</rt></ruby><ruby>日<rt>び</rt></ruby>',
        zhTW: '星期二',
        en: 'Tuesday',
        notes: {
          'zh-TW': '省略：火曜',
          'en': 'Abbreviation: 火曜'
        }
      },
      {
        japanese: '<ruby>水<rt>すい</rt></ruby><ruby>曜<rt>よう</rt></ruby><ruby>日<rt>び</rt></ruby>',
        zhTW: '星期三',
        en: 'Wednesday',
        notes: {
          'zh-TW': '省略：水曜',
          'en': 'Abbreviation: 水曜'
        }
      },
      {
        japanese: '<ruby>木<rt>もく</rt></ruby><ruby>曜<rt>よう</rt></ruby><ruby>日<rt>び</rt></ruby>',
        zhTW: '星期四',
        en: 'Thursday',
        notes: {
          'zh-TW': '省略：木曜',
          'en': 'Abbreviation: 木曜'
        }
      },
      {
        japanese: '<ruby>金<rt>きん</rt></ruby><ruby>曜<rt>よう</rt></ruby><ruby>日<rt>び</rt></ruby>',
        zhTW: '星期五',
        en: 'Friday',
        notes: {
          'zh-TW': '省略：金曜',
          'en': 'Abbreviation: 金曜'
        }
      },
      {
        japanese: '<ruby>土<rt>ど</rt></ruby><ruby>曜<rt>よう</rt></ruby><ruby>日<rt>び</rt></ruby>',
        zhTW: '星期六',
        en: 'Saturday',
        notes: {
          'zh-TW': '省略：土曜',
          'en': 'Abbreviation: 土曜'
        }
      },
      {
        japanese: '<ruby>日<rt>にち</rt></ruby><ruby>曜<rt>よう</rt></ruby><ruby>日<rt>び</rt></ruby>',
        zhTW: '星期日',
        en: 'Sunday',
        notes: {
          'zh-TW': '省略：日曜',
          'en': 'Abbreviation: 日曜'
        }
      },
      {
        japanese: '<ruby>曜<rt>よう</rt></ruby><ruby>日<rt>び</rt></ruby>',
        zhTW: '星期、曜日',
        en: 'day of the week',
        notes: {
          'zh-TW': '泛指星期',
          'en': 'General term for day of week'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 記住七個星期的名稱和發音。\n' +
        '2. 注意「曜日」的讀音是「ようび」，不是「ようひ」。\n' +
        '3. 日常對話中可以使用省略形式（月曜、火曜等）。\n' +
        '4. 星期一到星期五是工作日，星期六和星期日是週末。',
      'en':
        'Learning tips:\n' +
        '1. Remember the names and pronunciations of the seven days.\n' +
        '2. Note that "曜日" is read as "ようび", not "ようひ".\n' +
        '3. Abbreviated forms (月曜, 火曜, etc.) can be used in daily conversation.\n' +
        '4. Monday through Friday are weekdays, Saturday and Sunday are weekends.'
    }
  }
};

