// 鼻音（撥音） - 詳細內容

export const kanaHatsuon = {
  id: 'kana-hatsuon',
  title: {
    'zh-TW': '鼻音（撥音）',
    'en': '鼻音 (撥音) (Nasal Sound)'
  },
  category: {
    type: 'kana',
    level: 'N5'
  },
  tags: ['basic', 'kana', 'hatsuon'],
  description: {
    'zh-TW': '鼻音「ん」是日文中唯一的單獨假名',
    'en': '鼻音 「ん」 is the only standalone kana in Japanese.'
  },
  content: {
    overview: {
      'zh-TW':
        '鼻音（撥音）「ん」是日文中唯一的單獨假名，不能單獨使用，必須與其他假名組合。它的發音會根據後面的音而變化，可以是「n」「m」「ng」等。',
      'en':
        '鼻音 (撥音) 「ん」 is the only standalone kana in Japanese and cannot be used alone; it must be combined with other kana. Its pronunciation changes depending on the following sound, and can be "n", "m", "ng", etc.'
    },
    usage: {
      'zh-TW':
        '鼻音「ん」的發音規則：\n' +
        '1. 在「た・だ・な・ら」行之前：發「n」音（如「<ruby>本<rt>ほん</rt></ruby>」）\n' +
        '2. 在「ば・ぱ・ま」行之前：發「m」音（如「<ruby>散<rt>さん</rt></ruby><ruby>歩<rt>ぽ</rt></ruby>」）\n' +
        '3. 在「か・が」行之前：發「ng」音（如「<ruby>先<rt>せん</rt></ruby><ruby>生<rt>き</rt></ruby>」）\n' +
        '4. 在詞尾：通常發「n」音（如「<ruby>本<rt>ほん</rt></ruby>」）',
      'en':
        'Pronunciation rules for 鼻音 「ん」:\n' +
        '1. Before 「た・だ・な・ら」 rows: pronounced as "n" (e.g., 「<ruby>本<rt>ほん</rt></ruby>」)\n' +
        '2. Before 「ば・ぱ・ま」 rows: pronounced as "m" (e.g., 「<ruby>散<rt>さん</rt></ruby><ruby>歩<rt>ぽ</rt></ruby>」)\n' +
        '3. Before 「か・が」 rows: pronounced as "ng" (e.g., 「<ruby>先<rt>せん</rt></ruby><ruby>生<rt>き</rt></ruby>」)\n' +
        '4. At the end of words: usually pronounced as "n" (e.g., 「<ruby>本<rt>ほん</rt></ruby>」)'
    },
    examples: [
      {
        japanese: '<ruby>本<rt>ほん</rt></ruby>',
        zhTW: '書',
        en: 'book',
        explanation: {
          'zh-TW': '「ん」在詞尾，發「n」音。',
          'en': '「ん」 at the end of the word is pronounced as "n".'
        }
      },
      {
        japanese: '<ruby>散<rt>さん</rt></ruby><ruby>歩<rt>ぽ</rt></ruby>',
        zhTW: '散步',
        en: 'walk',
        explanation: {
          'zh-TW': '「ん」在「ぽ」之前，發「m」音。',
          'en': '「ん」 before 「ぽ」 is pronounced as "m".'
        }
      },
      {
        japanese: '<ruby>先<rt>せん</rt></ruby><ruby>生<rt>き</rt></ruby>',
        zhTW: '老師',
        en: 'teacher',
        explanation: {
          'zh-TW': '「ん」在「き」之前，發「ng」音。',
          'en': '「ん」 before 「き」 is pronounced as "ng".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「ん」的發音會根據後面的音而變化，要注意區分。\n' +
        '2. 「ん」不能單獨使用，必須與其他假名組合。\n' +
        '3. 在實際發音中，有時會自然變化，不需要過於拘泥。',
      'en':
        'Learning tips:\n' +
        '1. The pronunciation of 「ん」 changes depending on the following sound, pay attention to the distinction.\n' +
        '2. 「ん」 cannot be used alone and must be combined with other kana.\n' +
        '3. In actual pronunciation, it sometimes changes naturally, don\'t be too rigid about it.'
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

