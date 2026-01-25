// 和語 - 詳細內容

export const vocabularyWago = {
  id: 'vocabulary-wago',
  title: {
    'zh-TW': '和語（大和言葉）',
    'en': '和語 (Native Japanese Words)'
  },
  japanese: '<ruby>和<rt>わ</rt></ruby><ruby>語<rt>ご</rt></ruby>（<ruby>大<rt>やまと</rt></ruby><ruby>言<rt>こと</rt></ruby><ruby>葉<rt>ば</rt></ruby>）',
  category: {
    type: 'goshu',
    level: 'N5'
  },
  tags: ['basic', 'wago'],
  meaning: {
    'zh-TW': '和語、大和詞、日語固有詞彙',
    'en': 'native Japanese words, Yamato words'
  },
  content: {
    overview: {
      'zh-TW':
        '「和語」是日語中固有的詞彙，也稱為「大和言葉」。這些詞彙在漢字傳入日本之前就已經存在，是日語最原始的詞彙系統。和語通常用平假名書寫，或用漢字標記，但讀音是日語固有的。',
      'en':
        '「和語」 are native Japanese words, also called 「大和言葉」. These words existed before kanji was introduced to Japan and form the most original vocabulary system in Japanese. 和語 are typically written in hiragana or marked with kanji, but their readings are native to Japanese.'
    },
    usage: {
      'zh-TW':
        '和語的特點：\n' +
        '1. 是日語最原始的詞彙，在漢字傳入前就已存在\n' +
        '2. 通常用平假名書寫，或用漢字標記（訓讀）\n' +
        '3. 多為日常生活中的基本詞彙（如「水」「山」「花」等）\n' +
        '4. 動詞、形容詞、助詞等多為和語\n' +
        '5. 讀音通常較短，多為1-3個音節',
      'en':
        'Characteristics of 和語:\n' +
        '1. The most original Japanese vocabulary, existing before kanji was introduced\n' +
        '2. Usually written in hiragana or marked with kanji (kun-reading)\n' +
        '3. Mostly basic words in daily life (such as 「水」「山」「花」)\n' +
        '4. Verbs, adjectives, particles, etc. are mostly 和語\n' +
        '5. Readings are usually short, mostly 1-3 syllables'
    },
    examples: [
      {
        japanese: '<ruby>水<rt>みず</rt></ruby>を<ruby>飲<rt>の</rt></ruby>みます。',
        zhTW: '喝水。',
        en: 'I drink water.',
        explanation: {
          'zh-TW': '「水」是和語，讀作「みず」，是日語固有的詞彙。',
          'en': '"水" is 和語, read as "みず", which is a native Japanese word.'
        }
      },
      {
        japanese: '<ruby>山<rt>やま</rt></ruby>に<ruby>登<rt>のぼ</rt></ruby>ります。',
        zhTW: '爬山。',
        en: 'I climb a mountain.',
        explanation: {
          'zh-TW': '「山」是和語，讀作「やま」，是日語固有的詞彙。',
          'en': '"山" is 和語, read as "やま", which is a native Japanese word.'
        }
      },
      {
        japanese: '<ruby>花<rt>はな</rt></ruby>が<ruby>咲<rt>さ</rt></ruby>いています。',
        zhTW: '花開了。',
        en: 'The flowers are blooming.',
        explanation: {
          'zh-TW': '「花」是和語，讀作「はな」，是日語固有的詞彙。',
          'en': '"花" is 和語, read as "はな", which is a native Japanese word.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 和語是日語的基礎，許多基本詞彙都是和語。\n' +
        '2. 和語的讀音（訓讀）需要特別記憶，因為它們是日語固有的發音。\n' +
        '3. 動詞、形容詞、助詞等文法詞彙多為和語，是學習日語的重要基礎。',
      'en':
        'Learning tips:\n' +
        '1. 和語 are the foundation of Japanese, and many basic words are 和語.\n' +
        '2. The readings (kun-reading) of 和語 need special memorization as they are native Japanese pronunciations.\n' +
        '3. Grammatical words such as verbs, adjectives, and particles are mostly 和語, forming an important foundation for learning Japanese.'
    },
    relatedContent: [
      {
        id: 'vocabulary-gairaigo',
        title: {
          'zh-TW': '外来語',
          'en': '外来語'
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

