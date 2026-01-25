// な形容詞 - 詳細內容

export const grammarAdjectivesNa = {
  id: 'grammar-adjectives-na',
  title: {
    'zh-TW': 'な形容詞',
    'en': 'Na-Adjectives'
  },
  category: {
    type: 'grammar',
    level: 'N5'
  },
  tags: ['basic', 'grammar', 'adjective'],
  description: {
    'zh-TW': 'な形容詞需要加上「な」來修飾名詞，如「きれいな」「静かな」',
    'en': 'な-adjectives require "な" to modify nouns, such as "きれいな" (beautiful) and "静かな" (quiet)'
  },
  content: {
    overview: {
      'zh-TW': 'な形容詞（な形容詞）修飾名詞時需要加上「な」，但單獨使用時接「です」。許多な形容詞原本是名詞，加上「な」後變成形容詞。',
      'en': 'な-adjectives (な形容詞) require "な" when modifying nouns, but use "です" when used alone. Many な-adjectives are originally nouns that become adjectives when "な" is added.'
    },
    usage: {
      'zh-TW': '使用方式：\n1. 修飾名詞：きれいな花（美麗的花）\n2. 單獨使用：きれいです（很美麗）\n3. 連接形容詞：きれいで静か（美麗且安靜）',
      'en': 'Usage:\n1. Modify nouns: きれいな花 (beautiful flower)\n2. Use alone: きれいです (is beautiful)\n3. Connect adjectives: きれいで静か (beautiful and quiet)'
    },
    examples: [
      {
        japanese: 'この<ruby>花<rt>はな</rt></ruby>はきれいです。',
        reading: 'このはなはきれいです。',
        zhTW: '這朵花很美麗。',
        en: 'This flower is beautiful.',
        explanation: {
          'zh-TW': '「きれい」是な形容詞，單獨使用時接「です」。',
          'en': '"きれい" is a な-adjective, followed by "です" when used alone.'
        }
      },
      {
        japanese: 'きれいな<ruby>花<rt>はな</rt></ruby>を<ruby>買<rt>か</rt></ruby>いました。',
        reading: 'きれいなはなをかいました。',
        zhTW: '買了美麗的花。',
        en: 'I bought a beautiful flower.',
        explanation: {
          'zh-TW': '修飾名詞時，必須加上「な」。',
          'en': 'When modifying a noun, "な" must be added.'
        }
      },
      {
        japanese: 'この<ruby>公<rt>こう</rt></ruby><ruby>園<rt>えん</rt></ruby>は<ruby>静<rt>しず</rt></ruby>かで<ruby>広<rt>ひろ</rt></ruby>いです。',
        reading: 'このこうえんはしずかでひろいです。',
        zhTW: '這個公園安靜且寬敞。',
        en: 'This park is quiet and spacious.',
        explanation: {
          'zh-TW': '「静か」變成「静かで」來連接形容詞。',
          'en': '"静か" becomes "静かで" to connect with an adjective.'
        }
      }
    ],
    commonAdjectives: [
      {
        japanese: 'きれい',
        meaning: {
          'zh-TW': '美麗的、乾淨的',
          'en': 'beautiful, clean'
        }
      },
      {
        japanese: '<ruby>静<rt>しず</rt></ruby>か',
        meaning: {
          'zh-TW': '安靜的',
          'en': 'quiet'
        }
      },
      {
        japanese: '<ruby>元<rt>げん</rt></ruby><ruby>気<rt>き</rt></ruby>',
        meaning: {
          'zh-TW': '健康的、有精神的',
          'en': 'healthy, energetic'
        }
      },
      {
        japanese: '<ruby>便<rt>べん</rt></ruby><ruby>利<rt>り</rt></ruby>',
        meaning: {
          'zh-TW': '方便的',
          'en': 'convenient'
        }
      },
      {
        japanese: '<ruby>有<rt>ゆう</rt></ruby><ruby>名<rt>めい</rt></ruby>',
        meaning: {
          'zh-TW': '有名的',
          'en': 'famous'
        }
      },
      {
        japanese: '<ruby>好<rt>す</rt></ruby>き',
        meaning: {
          'zh-TW': '喜歡的',
          'en': 'liked, favorite'
        }
      }
    ],
    relatedContent: [
      {
        id: 'grammar-adjectives-i',
        title: {
          'zh-TW': 'い形容詞',
          'en': 'I-Adjectives'
        }
      }
    ]
  }
};

