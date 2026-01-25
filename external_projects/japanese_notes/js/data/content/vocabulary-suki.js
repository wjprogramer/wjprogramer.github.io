// 好き - 詳細內容

export const vocabularySuki = {
  id: 'vocabulary-suki',
  title: {
    'zh-TW': '好き',
    'en': '好き'
  },
  japanese: '<ruby>好<rt>す</rt></ruby>き',
  category: {
    type: 'vocabulary',
    level: 'N5'
  },
  tags: ['basic', 'vocabulary', 'na-adjective'],
  meaning: {
    'zh-TW': '喜歡的',
    'en': 'liked, favorite'
  },
  content: {
    overview: {
      'zh-TW': '「好き」是な形容詞，意思是「喜歡的」。用於表達喜好。注意：雖然是形容詞，但表達「喜歡某物」時用「～が好きです」的句型。',
      'en': '"好き" is a な-adjective meaning "liked, favorite". Used to express preferences. Note: Although it is an adjective, when expressing "like something", use the pattern "～が好きです".'
    },
    usage: {
      'zh-TW': '使用方式：\n- ～が好きです：喜歡～\n  例：本が好きです（喜歡書）\n- ～が好きではありません：不喜歡～\n  例：魚が好きではありません（不喜歡魚）',
      'en': 'Usage:\n- ～が好きです: like ~\n  Example: 本が好きです。 (I like books)\n- ～が好きではありません: don\'t like ~\n  Example: 魚が好きではありません。 (I don\'t like fish)'
    },
    examples: [
      {
        japanese: '<ruby>本<rt>ほん</rt></ruby>が<ruby>好<rt>す</rt></ruby>きです。',
        reading: 'ほんがすきです。',
        zhTW: '喜歡書。',
        en: 'I like books.',
        explanation: {
          'zh-TW': '注意：喜歡的對象用「が」標示，不是「を」。',
          'en': 'Note: The object of liking is marked with "が", not "を".'
        }
      },
      {
        japanese: '<ruby>好<rt>す</rt></ruby>きな<ruby>食<rt>た</rt></ruby>べ<ruby>物<rt>もの</rt></ruby>は<ruby>何<rt>なん</rt></ruby>ですか？',
        reading: 'すきなたべものはなんですか？',
        zhTW: '你喜歡什麼食物？',
        en: 'What is your favorite food?'
      },
      {
        japanese: '<ruby>音<rt>おん</rt></ruby><ruby>楽<rt>がく</rt></ruby>が<ruby>好<rt>す</rt></ruby>きです。',
        reading: 'おんがくがすきです。',
        zhTW: '喜歡音樂。',
        en: 'I like music.'
      }
    ],
    notes: {
      'zh-TW': '重要：雖然「好き」是形容詞，但表達「喜歡某物」時，喜歡的對象用「が」標示，不是「を」。這是日文的特殊用法。',
      'en': 'Important: Although "好き" is an adjective, when expressing "like something", the object is marked with "が", not "を". This is a special usage in Japanese.'
    },
    relatedWords: [
      {
        id: 'grammar-adjectives-na',
        title: {
          'zh-TW': 'な形容詞',
          'en': 'な形容詞'
        }
      },
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

