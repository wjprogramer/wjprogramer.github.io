// 飯店用語 - 詳細內容

export const vocabularyHotel = {
  id: 'category-hotel',
  title: {
    'zh-TW': '飯店用語',
    'en': 'Hotel Phrases'
  },
  category: {
    type: 'vocabulary',
    level: 'N4'
  },
  tags: ['vocabulary', 'hotel', 'conversation', 'topic-category'],
  description: {
    'zh-TW': '日語中在飯店使用的常用詞彙和表達',
    'en': 'Common words and expressions used in hotels in Japanese'
  },
  content: {
    overview: {
      'zh-TW':
        '飯店用語是旅行中重要的部分。了解如何辦理入住、退房、詢問服務等對於順利住宿很重要。',
      'en':
        'Hotel phrases are an important part of travel. Understanding how to check in, check out, ask for services, etc. is important for smooth accommodation.'
    },
    usage: {
      'zh-TW':
        '飯店用語的用法：\n' +
        '1. 辦理入住：使用「チェックインをお願いします」等\n' +
        '2. 辦理退房：使用「チェックアウトをお願いします」等\n' +
        '3. 詢問：使用「〜はありますか」等',
      'en':
        'Usage of hotel phrases:\n' +
        '1. Check-in: Use "チェックインをお願いします", etc.\n' +
        '2. Check-out: Use "チェックアウトをお願いします", etc.\n' +
        '3. Asking: Use "〜はありますか", etc.'
    },
    examples: [
      {
        japanese: '<ruby>チェックイン<rt>チェックイン</rt></ruby>をお<ruby>願<rt>ねが</rt></ruby>いします。',
        zhTW: '請幫我辦理入住。',
        en: 'I would like to check in, please.',
        explanation: {
          'zh-TW': '「チェックインをお願いします」是辦理入住的表達。',
          'en': '"チェックインをお願いします" is an expression for check-in.'
        }
      },
      {
        japanese: '<ruby>チェックアウト<rt>チェックアウト</rt></ruby>をお<ruby>願<rt>ねが</rt></ruby>いします。',
        zhTW: '請幫我辦理退房。',
        en: 'I would like to check out, please.',
        explanation: {
          'zh-TW': '「チェックアウトをお願いします」是辦理退房的表達。',
          'en': '"チェックアウトをお願いします" is an expression for check-out.'
        }
      },
      {
        japanese: '<ruby>朝<rt>あさ</rt></ruby><ruby>食<rt>しょく</rt></ruby>は<ruby>何<rt>なん</rt></ruby><ruby>時<rt>じ</rt></ruby>ですか。',
        zhTW: '早餐是幾點？',
        en: 'What time is breakfast?',
        explanation: {
          'zh-TW': '「何時ですか」是詢問時間的表達。',
          'en': '"何時ですか" is an expression for asking about time.'
        }
      }
    ],
    vocabulary: [
      {
        japanese: '<ruby>ホテル<rt>ホテル</rt></ruby>',
        zhTW: '飯店',
        en: 'hotel',
        notes: {
          'zh-TW': '飯店',
          'en': 'Hotel'
        }
      },
      {
        japanese: '<ruby>チェックイン<rt>チェックイン</rt></ruby>',
        zhTW: '入住',
        en: 'check-in',
        notes: {
          'zh-TW': '辦理入住',
          'en': 'Check-in'
        }
      },
      {
        japanese: '<ruby>チェックアウト<rt>チェックアウト</rt></ruby>',
        zhTW: '退房',
        en: 'check-out',
        notes: {
          'zh-TW': '辦理退房',
          'en': 'Check-out'
        }
      },
      {
        japanese: '<ruby>客<rt>きゃく</rt></ruby><ruby>室<rt>しつ</rt></ruby>',
        zhTW: '客房',
        en: 'room',
        notes: {
          'zh-TW': '房間',
          'en': 'Room'
        }
      },
      {
        japanese: '<ruby>鍵<rt>かぎ</rt></ruby>',
        zhTW: '鑰匙',
        en: 'key',
        notes: {
          'zh-TW': '鑰匙',
          'en': 'Key'
        }
      },
      {
        japanese: '<ruby>朝<rt>あさ</rt></ruby><ruby>食<rt>しょく</rt></ruby>',
        zhTW: '早餐',
        en: 'breakfast',
        notes: {
          'zh-TW': '早餐',
          'en': 'Breakfast'
        }
      },
      {
        japanese: '<ruby>清<rt>せい</rt></ruby><ruby>掃<rt>そう</rt></ruby>',
        zhTW: '清掃',
        en: 'cleaning',
        notes: {
          'zh-TW': '清潔',
          'en': 'Cleaning'
        }
      },
      {
        japanese: '<ruby>料<rt>りょう</rt></ruby><ruby>金<rt>きん</rt></ruby>',
        zhTW: '費用',
        en: 'fee, charge',
        notes: {
          'zh-TW': '費用',
          'en': 'Fee'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 記住基本的飯店用語：ホテル、チェックイン、チェックアウト等。\n' +
        '2. 學習辦理入住和退房的表達方式。\n' +
        '3. 了解詢問服務和時間的表達。\n' +
        '4. 注意禮貌用語的使用，飯店是正式場合。',
      'en':
        'Learning tips:\n' +
        '1. Remember basic hotel phrases: ホテル, チェックイン, チェックアウト, etc.\n' +
        '2. Learn expressions for check-in and check-out.\n' +
        '3. Understand expressions for asking about services and time.\n' +
        '4. Pay attention to the use of polite language, hotels are formal places.'
    }
  }
};

