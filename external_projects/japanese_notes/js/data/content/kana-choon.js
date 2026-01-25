// 長音 - 詳細內容

export const kanaChoon = {
  id: 'kana-choon',
  title: {
    'zh-TW': '長音',
    'en': '長音 (Long Vowel)'
  },
  category: {
    type: 'kana',
    level: 'N5'
  },
  tags: ['basic', 'kana', 'choon'],
  description: {
    'zh-TW': '長音是將母音延長一拍的發音方式',
    'en': '長音 is a way of pronouncing vowels by extending them for one beat.'
  },
  content: {
    overview: {
      'zh-TW':
        '長音是日文中將母音延長一拍的發音方式。平假名用「あ・い・う・え・お」來表示長音，片假名則用長音符號「ー」來表示。',
      'en':
        '長音 is a way of pronouncing vowels by extending them for one beat in Japanese. Hiragana uses 「あ・い・う・え・お」 to represent long vowels, while katakana uses the long vowel mark 「ー」.'
    },
    usage: {
      'zh-TW':
        '長音的表示方式：\n' +
        '1. 平假名：\n' +
        '   - あ段音後面加「あ」（如「おかあさん」）\n' +
        '   - い段音後面加「い」（如「おにいさん」）\n' +
        '   - う段音後面加「う」（如「くうき」）\n' +
        '   - え段音後面加「え」或「い」（如「せんせい」「えいが」）\n' +
        '   - お段音後面加「お」或「う」（如「おおきい」「とうきょう」）\n' +
        '2. 片假名：一律用「ー」表示（如「コーヒー」「テレビ」）',
      'en':
        'How to represent 長音:\n' +
        '1. Hiragana:\n' +
        '   - あ段 sounds: add 「あ」 (e.g., 「おかあさん」)\n' +
        '   - い段 sounds: add 「い」 (e.g., 「おにいさん」)\n' +
        '   - う段 sounds: add 「う」 (e.g., 「くうき」)\n' +
        '   - え段 sounds: add 「え」 or 「い」 (e.g., 「せんせい」「えいが」)\n' +
        '   - お段 sounds: add 「お」 or 「う」 (e.g., 「おおきい」「とうきょう」)\n' +
        '2. Katakana: always use 「ー」 (e.g., 「コーヒー」「テレビ」)'
    },
    examples: [
      {
        japanese: '<ruby>お<rt>お</rt></ruby><ruby>母<rt>かあ</rt></ruby><ruby>さん<rt>さん</rt></ruby>',
        zhTW: '母親',
        en: 'mother',
        explanation: {
          'zh-TW': '「かあ」中的「あ」表示「か」的長音。',
          'en': 'The 「あ」 in 「かあ」 represents the long vowel of 「か」.'
        }
      },
      {
        japanese: 'コーヒー',
        zhTW: '咖啡',
        en: 'coffee',
        explanation: {
          'zh-TW': '「ー」是片假名的長音符號。',
          'en': '「ー」 is the long vowel mark in katakana.'
        }
      },
      {
        japanese: '<ruby>東<rt>とう</rt></ruby><ruby>京<rt>きょう</rt></ruby>',
        zhTW: '東京',
        en: 'Tokyo',
        explanation: {
          'zh-TW': '「とう」中的「う」表示「と」的長音。',
          'en': 'The 「う」 in 「とう」 represents the long vowel of 「と」.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 注意平假名中「え段」和「お段」的長音有兩種寫法。\n' +
        '2. 片假名的長音一律用「ー」，比較簡單。\n' +
        '3. 長音的發音要延長一拍，不要念成兩個音。',
      'en':
        'Learning tips:\n' +
        '1. Note that え段 and お段 long vowels in hiragana have two ways of writing.\n' +
        '2. Katakana long vowels always use 「ー」, which is simpler.\n' +
        '3. Long vowels should be extended for one beat, not pronounced as two separate sounds.'
    },
    relatedContent: [
      {
        id: 'kana-hiragana',
        title: {
          'zh-TW': '五十音 平假名',
          'en': '「五十音」 Hiragana'
        }
      },
      {
        id: 'kana-katakana',
        title: {
          'zh-TW': '五十音 片假名',
          'en': '「五十音」 Katakana'
        }
      }
    ]
  }
};

