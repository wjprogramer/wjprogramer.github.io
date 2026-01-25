// 何 - 詳細內容

export const vocabularyNani = {
  id: 'vocabulary-nani',
  title: {
    'zh-TW': '何',
    'en': '何'
  },
  japanese: '<ruby>何<rt>なに</rt></ruby>',
  category: {
    type: 'vocabulary',
    level: 'N5'
  },
  tags: ['basic', 'vocabulary', 'interrogative'],
  meaning: {
    'zh-TW': '什麼',
    'en': 'what'
  },
  content: {
    overview: {
      'zh-TW': '「何」是疑問詞，意思是「什麼」。可以讀作「なに」或「なん」，根據後面的詞決定讀法。',
      'en': '"何" is an interrogative word meaning "what". It can be read as "なに" or "なん" depending on what follows.'
    },
    usage: {
      'zh-TW': '讀法規則：\n- 「なに」：後面接名詞時\n  例：何をしますか？（做什麼？）\n- 「なん」：後面接助數詞、助詞「の」等\n  例：何時ですか？（幾點？）\n  例：何の本ですか？（什麼書？）',
      'en': 'Reading rules:\n- "なに": When followed by a noun\n  Example: 何をしますか？ (What do you do?)\n- "なん": When followed by counters, particle "の", etc.\n  Example: 何時ですか？ (What time?)\n  Example: 何の本ですか？ (What book?)'
    },
    examples: [
      {
        japanese: '<ruby>何<rt>なに</rt></ruby>をしますか？',
        reading: 'なにをしますか？',
        zhTW: '你要做什麼？',
        en: 'What will you do?'
      },
      {
        japanese: 'これは<ruby>何<rt>なん</rt></ruby>ですか？',
        reading: 'これはなんですか？',
        zhTW: '這是什麼？',
        en: 'What is this?'
      },
      {
        japanese: '<ruby>何<rt>なん</rt></ruby>の<ruby>本<rt>ほん</rt></ruby>ですか？',
        reading: 'なんのほんですか？',
        zhTW: '什麼書？',
        en: 'What book?'
      }
    ]
  }
};

