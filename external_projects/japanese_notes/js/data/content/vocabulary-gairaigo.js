// 外来語 - 詳細內容

export const vocabularyGairaigo = {
  id: 'vocabulary-gairaigo',
  title: {
    'zh-TW': '外来語',
    'en': '外来語 (Loanwords)'
  },
  japanese: '<ruby>外<rt>がい</rt></ruby><ruby>来<rt>らい</rt></ruby><ruby>語<rt>ご</rt></ruby>',
  category: {
    type: 'goshu',
    level: 'N5'
  },
  tags: ['basic', 'gairaigo'],
  meaning: {
    'zh-TW': '外來語、借詞',
    'en': 'loanword, borrowed word'
  },
  content: {
    overview: {
      'zh-TW':
        '「外来語」是指從外國語言（主要是英語、法語、德語、葡萄牙語等）借入日語的詞彙。這些詞彙通常用片假名書寫，是現代日語中非常重要的一部分。',
      'en':
        '「外来語」 refers to words borrowed from foreign languages (mainly English, French, German, Portuguese, etc.) into Japanese. These words are typically written in katakana and form an important part of modern Japanese.'
    },
    usage: {
      'zh-TW':
        '外来語的特點：\n' +
        '1. 通常用片假名書寫（如「コーヒー」「テレビ」「パン」等）\n' +
        '2. 發音會根據日語的音韻系統進行調整\n' +
        '3. 主要來自英語，但也有來自其他語言的詞彙\n' +
        '4. 在現代日語中使用頻率很高，特別是在科技、商業、時尚等領域',
      'en':
        'Characteristics of 外来語:\n' +
        '1. Usually written in katakana (such as 「コーヒー」「テレビ」「パン」)\n' +
        '2. Pronunciation is adjusted according to Japanese phonology\n' +
        '3. Mainly from English, but also from other languages\n' +
        '4. Very frequently used in modern Japanese, especially in technology, business, fashion, etc.'
    },
    examples: [
      {
        japanese: 'コーヒーを<ruby>飲<rt>の</rt></ruby>みます。',
        zhTW: '喝咖啡。',
        en: 'I drink coffee.',
        explanation: {
          'zh-TW': '「コーヒー」是從英語 "coffee" 借入的外來語。',
          'en': '"コーヒー" is a loanword borrowed from English "coffee".'
        }
      },
      {
        japanese: 'テレビを<ruby>見<rt>み</rt></ruby>ます。',
        zhTW: '看電視。',
        en: 'I watch TV.',
        explanation: {
          'zh-TW': '「テレビ」是從英語 "television" 借入的外來語。',
          'en': '"テレビ" is a loanword borrowed from English "television".'
        }
      },
      {
        japanese: 'パンを<ruby>買<rt>か</rt></ruby>います。',
        zhTW: '買麵包。',
        en: 'I buy bread.',
        explanation: {
          'zh-TW': '「パン」是從葡萄牙語 "pão" 借入的外來語。',
          'en': '"パン" is a loanword borrowed from Portuguese "pão".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 外來語的發音與原語言可能有所不同，需要適應日語的音韻系統。\n' +
        '2. 許多外來語在日語中有特定的含義，與原語言的意思可能不完全相同。\n' +
        '3. 學習外來語時，可以嘗試找出其原語言來源，有助於記憶。',
      'en':
        'Learning tips:\n' +
        '1. The pronunciation of 外来語 may differ from the original language, as it adapts to Japanese phonology.\n' +
        '2. Many 外来語 have specific meanings in Japanese that may differ from the original language.\n' +
        '3. When learning 外来語, try to identify their original language source to aid memory.'
    },
    relatedContent: [
      {
        id: 'vocabulary-wago',
        title: {
          'zh-TW': '和語',
          'en': '和語'
        }
      },
      {
        id: 'vocabulary-kango',
        title: {
          'zh-TW': '漢語',
          'en': '漢語'
        }
      }
    ]
  }
};

