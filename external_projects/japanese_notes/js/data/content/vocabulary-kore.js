// これ - 詳細內容

export const vocabularyKore = {
  id: 'vocabulary-kore',
  title: {
    'zh-TW': 'これ',
    'en': 'これ'
  },
  japanese: 'これ',
  category: {
    type: 'vocabulary',
    level: 'N5'
  },
  tags: ['basic', 'vocabulary', 'demonstrative-pronoun'],
  meaning: {
    'zh-TW': '這個（離說話者近）',
    'en': 'this (near speaker)'
  },
  content: {
    overview: {
      'zh-TW': '「これ」是指示代名詞，意思是「這個」，用於指離說話者較近的事物。日文的指示詞分為三類：これ（這個）、それ（那個）、あれ（那個遠的）。',
      'en': '"これ" is a demonstrative pronoun meaning "this", used to refer to things near the speaker. Japanese demonstratives are divided into three categories: これ (this), それ (that), あれ (that over there).'
    },
    examples: [
      {
        japanese: 'これは<ruby>本<rt>ほん</rt></ruby>です。',
        reading: 'これはほんです。',
        zhTW: '這是書。',
        en: 'This is a book.'
      },
      {
        japanese: 'これは<ruby>何<rt>なん</rt></ruby>ですか？',
        reading: 'これはなんですか？',
        zhTW: '這是什麼？',
        en: 'What is this?'
      },
      {
        japanese: 'これをください。',
        reading: 'これをください。',
        zhTW: '請給我這個。',
        en: 'Please give me this.'
      }
    ],
    comparison: {
      'zh-TW': '指示詞的區別：\n- 「これ」：離說話者近的事物\n  例：これは私の本です（這是我的書）\n- 「それ」：離聽話者近的事物\n  例：それはあなたの本です（那是你的書）\n- 「あれ」：離雙方都遠的事物\n  例：あれは山です（那是山）',
      'en': 'Difference between demonstratives:\n- "これ": Things near the speaker\n  Example: これは私の本です。 (This is my book)\n- "それ": Things near the listener\n  Example: それはあなたの本です。 (That is your book)\n- "あれ": Things far from both\n  Example: あれは山です。 (That is a mountain)'
    },
    relatedWords: [
      {
        id: 'vocabulary-sore',
        title: {
          'zh-TW': 'それ',
          'en': 'それ'
        }
      },
      {
        id: 'vocabulary-are',
        title: {
          'zh-TW': 'あれ',
          'en': 'あれ'
        }
      }
    ]
  }
};

