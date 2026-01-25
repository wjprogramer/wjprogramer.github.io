// 電話用語 - 詳細內容

export const vocabularyPhone = {
  id: 'category-phone',
  title: {
    'zh-TW': '電話用語',
    'en': 'Phone Phrases'
  },
  category: {
    type: 'vocabulary',
    level: 'N5'
  },
  tags: ['basic', 'vocabulary', 'phone', 'conversation', 'topic-category'],
  description: {
    'zh-TW': '日語中打電話時使用的常用詞彙和表達',
    'en': 'Common words and expressions used when making phone calls in Japanese'
  },
  content: {
    overview: {
      'zh-TW':
        '電話用語是日常生活中非常重要的部分。了解如何接電話、打電話、留言等對於順利溝通很重要。',
      'en':
        'Phone phrases are a very important part of daily life. Understanding how to answer, make calls, leave messages, etc. is important for smooth communication.'
    },
    usage: {
      'zh-TW':
        '電話用語的用法：\n' +
        '1. 接電話：使用「もしもし」等\n' +
        '2. 打電話：使用「〜をお願いします」等\n' +
        '3. 留言：使用「伝言をお願いします」等',
      'en':
        'Usage of phone phrases:\n' +
        '1. Answering phone: Use "もしもし", etc.\n' +
        '2. Making calls: Use "〜をお願いします", etc.\n' +
        '3. Leaving messages: Use "伝言をお願いします", etc.'
    },
    examples: [
      {
        japanese: '<ruby>もしもし<rt>もしもし</rt></ruby>。',
        zhTW: '喂。',
        en: 'Hello.',
        explanation: {
          'zh-TW': '「もしもし」是接電話或打電話時的問候語。',
          'en': '"もしもし" is a greeting when answering or making phone calls.'
        }
      },
      {
        japanese: '<ruby>山<rt>やま</rt></ruby>田<rt>だ</rt></ruby>さんをお<ruby>願<rt>ねが</rt></ruby>いします。',
        zhTW: '請找山田先生。',
        en: 'May I speak to Mr. Yamada, please?',
        explanation: {
          'zh-TW': '「〜をお願いします」是請求轉接的表達。',
          'en': '"〜をお願いします" is an expression for requesting to speak to someone.'
        }
      },
      {
        japanese: '<ruby>伝<rt>でん</rt></ruby><ruby>言<rt>ごん</rt></ruby>をお<ruby>願<rt>ねが</rt></ruby>いします。',
        zhTW: '請幫我留言。',
        en: 'Could you take a message, please?',
        explanation: {
          'zh-TW': '「伝言をお願いします」是請求留言的表達。',
          'en': '"伝言をお願いします" is an expression for requesting to leave a message.'
        }
      }
    ],
    vocabulary: [
      {
        japanese: '<ruby>もしもし<rt>もしもし</rt></ruby>',
        zhTW: '喂',
        en: 'Hello',
        notes: {
          'zh-TW': '電話問候語',
          'en': 'Phone greeting'
        }
      },
      {
        japanese: '<ruby>電<rt>でん</rt></ruby><ruby>話<rt>わ</rt></ruby>',
        zhTW: '電話',
        en: 'phone, telephone',
        notes: {
          'zh-TW': '電話',
          'en': 'Phone'
        }
      },
      {
        japanese: '<ruby>かける<rt>かける</rt></ruby>',
        zhTW: '打（電話）',
        en: 'to call',
        notes: {
          'zh-TW': '打電話',
          'en': 'To make a call'
        }
      },
      {
        japanese: '<ruby>出<rt>で</rt></ruby>る',
        zhTW: '接（電話）',
        en: 'to answer',
        notes: {
          'zh-TW': '接電話',
          'en': 'To answer the phone'
        }
      },
      {
        japanese: '<ruby>切<rt>き</rt></ruby>る',
        zhTW: '掛（電話）',
        en: 'to hang up',
        notes: {
          'zh-TW': '掛電話',
          'en': 'To hang up'
        }
      },
      {
        japanese: '<ruby>伝<rt>でん</rt></ruby><ruby>言<rt>ごん</rt></ruby>',
        zhTW: '留言',
        en: 'message',
        notes: {
          'zh-TW': '留言',
          'en': 'Message'
        }
      },
      {
        japanese: '<ruby>番<rt>ばん</rt></ruby><ruby>号<rt>ごう</rt></ruby>',
        zhTW: '號碼',
        en: 'number',
        notes: {
          'zh-TW': '電話號碼',
          'en': 'Phone number'
        }
      },
      {
        japanese: '<ruby>留守<rt>るす</rt></ruby>',
        zhTW: '不在',
        en: 'not at home, absent',
        notes: {
          'zh-TW': '不在家',
          'en': 'Not at home'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 記住基本的電話用語：もしもし、電話、かける等。\n' +
        '2. 學習接電話和打電話的表達方式。\n' +
        '3. 了解留言和轉接的表達。\n' +
        '4. 注意禮貌用語的使用，電話是正式場合。',
      'en':
        'Learning tips:\n' +
        '1. Remember basic phone phrases: もしもし, 電話, かける, etc.\n' +
        '2. Learn expressions for answering and making calls.\n' +
        '3. Understand expressions for leaving messages and transferring calls.\n' +
        '4. Pay attention to the use of polite language, phone calls are formal situations.'
    }
  }
};

