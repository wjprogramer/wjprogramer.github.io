// 天氣狀況 - 詳細內容

export const vocabularyWeatherConditions = {
  id: 'category-weather-conditions',
  title: {
    'zh-TW': '天氣狀況',
    'en': 'Weather Conditions'
  },
  category: {
    type: 'vocabulary',
    level: 'N5'
  },
  tags: ['basic', 'vocabulary', 'weather', 'topic-category'],
  description: {
    'zh-TW': '日語中描述天氣狀況的常用詞彙',
    'en': 'Common words for describing weather conditions in Japanese'
  },
  content: {
    overview: {
      'zh-TW':
        '天氣狀況是日常對話中經常談論的話題。了解如何描述各種天氣狀況對於日常交流很重要。',
      'en':
        'Weather conditions are a frequently discussed topic in daily conversation. Understanding how to describe various weather conditions is important for daily communication.'
    },
    usage: {
      'zh-TW':
        '天氣狀況的用法：\n' +
        '1. 描述天氣：〜です（如「晴れです」）\n' +
        '2. 詢問天氣：〜はどうですか（天氣怎麼樣？）\n' +
        '3. 表達感受：〜ですね（如「暑いですね」）',
      'en':
        'Usage of weather conditions:\n' +
        '1. Describe weather: 〜です (e.g., "晴れです")\n' +
        '2. Ask about weather: 〜はどうですか (how is the weather?)\n' +
        '3. Express feeling: 〜ですね (e.g., "暑いですね")'
    },
    examples: [
      {
        japanese: '<ruby>今日<rt>きょう</rt></ruby>は<ruby>晴<rt>は</rt></ruby>れです。',
        zhTW: '今天是晴天。',
        en: 'Today is sunny.',
        explanation: {
          'zh-TW': '「晴れ」是晴天。',
          'en': '"晴れ" is sunny.'
        }
      },
      {
        japanese: '<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>っています。',
        zhTW: '正在下雨。',
        en: 'It is raining.',
        explanation: {
          'zh-TW': '「雨が降る」是下雨。',
          'en': '"雨が降る" is to rain.'
        }
      },
      {
        japanese: '<ruby>天<rt>てん</rt></ruby><ruby>気<rt>き</rt></ruby>が<ruby>良<rt>よ</rt></ruby>いですね。',
        zhTW: '天氣很好呢。',
        en: 'The weather is nice, isn\'t it?',
        explanation: {
          'zh-TW': '「天気が良い」是天氣好。',
          'en': '"天気が良い" is good weather.'
        }
      }
    ],
    vocabulary: [
      {
        japanese: '<ruby>晴<rt>は</rt></ruby>れ',
        zhTW: '晴天',
        en: 'sunny, clear',
        notes: {
          'zh-TW': '好天氣',
          'en': 'Good weather'
        }
      },
      {
        japanese: '<ruby>雨<rt>あめ</rt></ruby>',
        zhTW: '雨',
        en: 'rain',
        notes: {
          'zh-TW': '下雨',
          'en': 'Rain'
        }
      },
      {
        japanese: '<ruby>雪<rt>ゆき</rt></ruby>',
        zhTW: '雪',
        en: 'snow',
        notes: {
          'zh-TW': '下雪',
          'en': 'Snow'
        }
      },
      {
        japanese: '<ruby>曇<rt>くも</rt></ruby>り',
        zhTW: '陰天',
        en: 'cloudy',
        notes: {
          'zh-TW': '多雲',
          'en': 'Cloudy'
        }
      },
      {
        japanese: '<ruby>風<rt>かぜ</rt></ruby>',
        zhTW: '風',
        en: 'wind',
        notes: {
          'zh-TW': '颳風',
          'en': 'Wind'
        }
      },
      {
        japanese: '<ruby>暑<rt>あつ</rt></ruby>い',
        zhTW: '熱的',
        en: 'hot',
        notes: {
          'zh-TW': '天氣熱',
          'en': 'Hot weather'
        }
      },
      {
        japanese: '<ruby>寒<rt>さむ</rt></ruby>い',
        zhTW: '冷的',
        en: 'cold',
        notes: {
          'zh-TW': '天氣冷',
          'en': 'Cold weather'
        }
      },
      {
        japanese: '<ruby>暖<rt>あたた</rt></ruby>かい',
        zhTW: '溫暖的',
        en: 'warm',
        notes: {
          'zh-TW': '天氣溫暖',
          'en': 'Warm weather'
        }
      },
      {
        japanese: '<ruby>涼<rt>すず</rt></ruby>しい',
        zhTW: '涼爽的',
        en: 'cool',
        notes: {
          'zh-TW': '天氣涼爽',
          'en': 'Cool weather'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 記住基本天氣詞彙：晴れ、雨、雪、曇り等。\n' +
        '2. 了解天氣形容詞：暑い、寒い、暖かい、涼しい等。\n' +
        '3. 學習描述天氣的常用表達方式。\n' +
        '4. 注意「暑い」和「熱い」的區別：暑い（天氣熱）vs 熱い（物體熱）。',
      'en':
        'Learning tips:\n' +
        '1. Remember basic weather vocabulary: 晴れ, 雨, 雪, 曇り, etc.\n' +
        '2. Understand weather adjectives: 暑い, 寒い, 暖かい, 涼しい, etc.\n' +
        '3. Learn common expressions for describing weather.\n' +
        '4. Note the difference between "暑い" and "熱い": 暑い (hot weather) vs 熱い (hot object).'
    }
  }
};

