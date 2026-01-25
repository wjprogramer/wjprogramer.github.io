// 問候語 - 詳細內容

export const vocabularyGreetings = {
  id: 'category-greetings',
  title: {
    'zh-TW': '問候語',
    'en': 'Greetings'
  },
  category: {
    type: 'vocabulary',
    level: 'N5'
  },
  tags: ['basic', 'vocabulary', 'greetings', 'conversation', 'topic-category'],
  description: {
    'zh-TW': '日語中常用的問候語',
    'en': 'Common greetings in Japanese'
  },
  content: {
    overview: {
      'zh-TW':
        '問候語是日常對話中非常重要的部分。日語中的問候語根據時間、場合、關係等有所不同。了解正確的問候語對於建立良好的人際關係很重要。',
      'en':
        'Greetings are a very important part of daily conversation. Greetings in Japanese vary depending on time, occasion, relationship, etc. Understanding correct greetings is important for building good relationships.'
    },
    usage: {
      'zh-TW':
        '問候語的用法：\n' +
        '1. 見面時：使用「こんにちは」「おはようございます」等\n' +
        '2. 分別時：使用「さようなら」「またね」等\n' +
        '3. 感謝時：使用「ありがとうございます」等\n' +
        '4. 道歉時：使用「すみません」「ごめんなさい」等',
      'en':
        'Usage of greetings:\n' +
        '1. When meeting: Use "こんにちは", "おはようございます", etc.\n' +
        '2. When parting: Use "さようなら", "またね", etc.\n' +
        '3. When thanking: Use "ありがとうございます", etc.\n' +
        '4. When apologizing: Use "すみません", "ごめんなさい", etc.'
    },
    examples: [
      {
        japanese: '<ruby>お<rt>お</rt></ruby>はようございます。',
        zhTW: '早安。',
        en: 'Good morning.',
        explanation: {
          'zh-TW': '「おはようございます」是早上的問候語，用於正式場合。',
          'en': '"おはようございます" is a morning greeting, used in formal situations.'
        }
      },
      {
        japanese: '<ruby>こんにちは<rt>こんにちは</rt></ruby>。',
        zhTW: '你好。',
        en: 'Hello.',
        explanation: {
          'zh-TW': '「こんにちは」是白天的問候語，用於一般場合。',
          'en': '"こんにちは" is a daytime greeting, used in general situations.'
        }
      },
      {
        japanese: '<ruby>ありがとうございます<rt>ありがとうございます</rt></ruby>。',
        zhTW: '謝謝。',
        en: 'Thank you.',
        explanation: {
          'zh-TW': '「ありがとうございます」是感謝的問候語，用於正式場合。',
          'en': '"ありがとうございます" is a greeting of thanks, used in formal situations.'
        }
      }
    ],
    vocabulary: [
      {
        japanese: '<ruby>お<rt>お</rt></ruby>はよう',
        zhTW: '早安（口語）',
        en: 'Good morning (casual)',
        notes: {
          'zh-TW': '用於朋友、家人等親近的人',
          'en': 'Used for friends, family, and close people'
        }
      },
      {
        japanese: '<ruby>お<rt>お</rt></ruby>はようございます',
        zhTW: '早安（正式）',
        en: 'Good morning (formal)',
        notes: {
          'zh-TW': '用於正式場合、長輩、上司等',
          'en': 'Used in formal situations, for seniors, superiors, etc.'
        }
      },
      {
        japanese: '<ruby>こんにちは<rt>こんにちは</rt></ruby>',
        zhTW: '你好（白天）',
        en: 'Hello (daytime)',
        notes: {
          'zh-TW': '用於白天（約10點到傍晚）',
          'en': 'Used during daytime (around 10 AM to evening)'
        }
      },
      {
        japanese: '<ruby>こんばんは<rt>こんばんは</rt></ruby>',
        zhTW: '晚上好',
        en: 'Good evening',
        notes: {
          'zh-TW': '用於晚上（傍晚以後）',
          'en': 'Used in the evening (after dusk)'
        }
      },
      {
        japanese: '<ruby>さようなら<rt>さようなら</rt></ruby>',
        zhTW: '再見',
        en: 'Goodbye',
        notes: {
          'zh-TW': '用於正式場合或較長時間的分別',
          'en': 'Used in formal situations or for long separations'
        }
      },
      {
        japanese: '<ruby>また<rt>また</rt></ruby>ね',
        zhTW: '再見（口語）',
        en: 'See you (casual)',
        notes: {
          'zh-TW': '用於朋友、家人等親近的人',
          'en': 'Used for friends, family, and close people'
        }
      },
      {
        japanese: '<ruby>ありがとう<rt>ありがとう</rt></ruby>',
        zhTW: '謝謝（口語）',
        en: 'Thank you (casual)',
        notes: {
          'zh-TW': '用於朋友、家人等親近的人',
          'en': 'Used for friends, family, and close people'
        }
      },
      {
        japanese: '<ruby>ありがとうございます<rt>ありがとうございます</rt></ruby>',
        zhTW: '謝謝（正式）',
        en: 'Thank you (formal)',
        notes: {
          'zh-TW': '用於正式場合、長輩、上司等',
          'en': 'Used in formal situations, for seniors, superiors, etc.'
        }
      },
      {
        japanese: '<ruby>すみません<rt>すみません</rt></ruby>',
        zhTW: '對不起、不好意思',
        en: 'Sorry, Excuse me',
        notes: {
          'zh-TW': '用於道歉或引起注意',
          'en': 'Used for apologizing or getting attention'
        }
      },
      {
        japanese: '<ruby>ごめんなさい<rt>ごめんなさい</rt></ruby>',
        zhTW: '對不起',
        en: 'I\'m sorry',
        notes: {
          'zh-TW': '用於道歉，比「すみません」更直接',
          'en': 'Used for apologizing, more direct than "すみません"'
        }
      },
      {
        japanese: '<ruby>いってきます<rt>いってきます</rt></ruby>',
        zhTW: '我出門了',
        en: 'I\'m leaving',
        notes: {
          'zh-TW': '出門時對家人說的話',
          'en': 'Said to family when leaving home'
        }
      },
      {
        japanese: '<ruby>いってらっしゃい<rt>いってらっしゃい</rt></ruby>',
        zhTW: '路上小心',
        en: 'Have a good day / Take care',
        notes: {
          'zh-TW': '回應「いってきます」的話',
          'en': 'Response to "いってきます"'
        }
      },
      {
        japanese: '<ruby>ただいま<rt>ただいま</rt></ruby>',
        zhTW: '我回來了',
        en: 'I\'m home',
        notes: {
          'zh-TW': '回家時對家人說的話',
          'en': 'Said to family when returning home'
        }
      },
      {
        japanese: '<ruby>おかえりなさい<rt>おかえりなさい</rt></ruby>',
        zhTW: '歡迎回來',
        en: 'Welcome back',
        notes: {
          'zh-TW': '回應「ただいま」的話',
          'en': 'Response to "ただいま"'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 記住不同時間的問候語：早上（おはよう）、白天（こんにちは）、晚上（こんばんは）。\n' +
        '2. 注意正式和口語的區別：正式場合用「ございます」，口語用簡短形式。\n' +
        '3. 了解不同場合的問候語：見面、分別、感謝、道歉等。\n' +
        '4. 注意「こんにちは」和「こんばんは」中的「は」讀作「wa」，不是「ha」。',
      'en':
        'Learning tips:\n' +
        '1. Remember greetings for different times: morning (おはよう), daytime (こんにちは), evening (こんばんは).\n' +
        '2. Note the difference between formal and casual: use "ございます" in formal situations, short forms in casual speech.\n' +
        '3. Understand greetings for different occasions: meeting, parting, thanking, apologizing, etc.\n' +
        '4. Note that "は" in "こんにちは" and "こんばんは" is read as "wa", not "ha".'
    }
  }
};

