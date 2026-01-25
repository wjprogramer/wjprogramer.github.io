// 誰 - 詳細內容

export const vocabularyDare = {
  id: 'vocabulary-dare',
  title: {
    'zh-TW': '誰',
    'en': '誰'
  },
  japanese: '<ruby>誰<rt>だれ</rt></ruby>',
  category: {
    type: 'vocabulary',
    level: 'N5'
  },
  tags: ['basic', 'vocabulary', 'interrogative'],
  meaning: {
    'zh-TW': '誰',
    'en': 'who'
  },
  content: {
    overview: {
      'zh-TW': '「誰」是疑問詞，意思是「誰」。用於詢問人物。也可以讀作「だれ」，但「だれ」更常用。',
      'en': '"誰" is an interrogative word meaning "who". Used to ask about people. It can also be read as "だれ", but "だれ" is more common.'
    },
    examples: [
      {
        japanese: '<ruby>誰<rt>だれ</rt></ruby>が<ruby>来<rt>き</rt></ruby>ましたか？',
        reading: 'だれがきましたか？',
        zhTW: '誰來了？',
        en: 'Who came?',
        explanation: {
          'zh-TW': '疑問詞作主語時，必須用「が」。',
          'en': 'When an interrogative word is the subject, "が" must be used.'
        }
      },
      {
        japanese: 'これは<ruby>誰<rt>だれ</rt></ruby>の<ruby>本<rt>ほん</rt></ruby>ですか？',
        reading: 'これはだれのほんですか？',
        zhTW: '這是誰的書？',
        en: 'Whose book is this?'
      },
      {
        japanese: '<ruby>誰<rt>だれ</rt></ruby>と<ruby>行<rt>い</rt></ruby>きますか？',
        reading: 'だれといきますか？',
        zhTW: '和誰一起去？',
        en: 'Who are you going with?'
      }
    ],
    relatedWords: [
      {
        id: 'grammar-particles-ga',
        title: {
          'zh-TW': '助詞「が」',
          'en': '助詞「が」'
        }
      }
    ]
  }
};

