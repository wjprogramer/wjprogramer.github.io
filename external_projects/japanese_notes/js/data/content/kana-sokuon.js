// 促音 - 詳細內容

export const kanaSokuon = {
  id: 'kana-sokuon',
  title: {
    'zh-TW': '促音',
    'en': '促音 (Geminate Consonant)'
  },
  category: {
    type: 'kana',
    level: 'N5'
  },
  tags: ['basic', 'kana', 'sokuon'],
  description: {
    'zh-TW': '促音是用小寫「っ」或「ッ」表示的停頓音',
    'en': '促音 is a pause sound represented by small 「っ」 or 「ッ」.'
  },
  content: {
    overview: {
      'zh-TW':
        '促音是日文中表示停頓或子音重複的發音方式，用小寫的「っ」（平假名）或「ッ」（片假名）表示。促音會讓下一個子音重複發音，形成短暫的停頓。',
      'en':
        '促音 is a way of representing a pause or geminate consonant in Japanese, indicated by small 「っ」 (hiragana) or 「ッ」 (katakana). 促音 causes the following consonant to be doubled, creating a brief pause.'
    },
    usage: {
      'zh-TW':
        '促音的使用規則：\n' +
        '1. 促音出現在「か・さ・た・ぱ」行假名之前。\n' +
        '2. 發音時要在促音處停頓一拍，然後再發下一個音。\n' +
        '3. 平假名用「っ」，片假名用「ッ」。\n\n' +
        '常見的促音單字：\n' +
        '- 「<ruby>切<rt>きっ</rt></ruby><ruby>手<rt>て</rt></ruby>」（車票）\n' +
        '- 「<ruby>一<rt>いっ</rt></ruby><ruby>杯<rt>ぱい</rt></ruby>」（一杯）\n' +
        '- 「<ruby>雑<rt>ざっ</rt></ruby><ruby>誌<rt>し</rt></ruby>」（雜誌）',
      'en':
        'Rules for using 促音:\n' +
        '1. 促音 appears before 「か・さ・た・ぱ」 row kana.\n' +
        '2. When pronouncing, pause for one beat at the 促音, then pronounce the next sound.\n' +
        '3. Hiragana uses 「っ」, katakana uses 「ッ」.\n\n' +
        'Common words with 促音:\n' +
        '- 「<ruby>切<rt>きっ</rt></ruby><ruby>手<rt>て</rt></ruby>」 (ticket)\n' +
        '- 「<ruby>一<rt>いっ</rt></ruby><ruby>杯<rt>ぱい</rt></ruby>」 (one cup)\n' +
        '- 「<ruby>雑<rt>ざっ</rt></ruby><ruby>誌<rt>し</rt></ruby>」 (magazine)'
    },
    examples: [
      {
        japanese: '<ruby>切<rt>きっ</rt></ruby><ruby>手<rt>て</rt></ruby>',
        zhTW: '車票',
        en: 'ticket',
        explanation: {
          'zh-TW': '「きっ」中的「っ」是促音，發音時要在「き」和「て」之間停頓。',
          'en': 'The 「っ」 in 「きっ」 is 促音, creating a pause between 「き」 and 「て」 when pronouncing.'
        }
      },
      {
        japanese: '<ruby>一<rt>いっ</rt></ruby><ruby>杯<rt>ぱい</rt></ruby>',
        zhTW: '一杯',
        en: 'one cup',
        explanation: {
          'zh-TW': '「いっ」中的「っ」是促音，讓「ぱ」重複發音。',
          'en': 'The 「っ」 in 「いっ」 is 促音, causing 「ぱ」 to be doubled.'
        }
      },
      {
        japanese: '<ruby>雑<rt>ざっ</rt></ruby><ruby>誌<rt>し</rt></ruby>',
        zhTW: '雜誌',
        en: 'magazine',
        explanation: {
          'zh-TW': '「ざっ」中的「っ」是促音，讓「し」重複發音。',
          'en': 'The 「っ」 in 「ざっ」 is 促音, causing 「し」 to be doubled.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 促音的發音要停頓一拍，不要跳過。\n' +
        '2. 注意促音只出現在「か・さ・た・ぱ」行之前。\n' +
        '3. 平假名和片假名的促音寫法不同，要注意區分。',
      'en':
        'Learning tips:\n' +
        '1. 促音 should be paused for one beat when pronouncing, don\'t skip it.\n' +
        '2. Note that 促音 only appears before 「か・さ・た・ぱ」 rows.\n' +
        '3. Hiragana and katakana use different characters for 促音, pay attention to the difference.'
    },
    relatedContent: [
      {
        id: 'kana-hiragana',
        title: {
          'zh-TW': '五十音 平假名',
          'en': '「五十音」 Hiragana'
        }
      }
    ]
  }
};

