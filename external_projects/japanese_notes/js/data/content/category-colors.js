// 顏色 - 詳細內容（已從 vocabulary-colors.js 移動至此）

export const vocabularyColors = {
  id: 'category-colors',
  title: {
    'zh-TW': '顏色',
    'en': 'Colors'
  },
  category: {
    type: 'vocabulary',
    level: 'N5'
  },
  tags: ['basic', 'vocabulary', 'colors', 'topic-category'],
  description: {
    'zh-TW': '日語中常見的顏色單字',
    'en': 'Common color words in Japanese'
  },
  content: {
    overview: {
      'zh-TW':
        '日語中的顏色單字有兩種表達方式：一種是使用「い形容詞」（如「赤い」「青い」），另一種是使用名詞形式（如「赤」「青」）。有些顏色只有名詞形式（如「茶色」「灰色」）。',
      'en':
        'Color words in Japanese have two forms: one uses \"い-adjectives\" (e.g., \"赤い\", \"青い\"), and the other uses noun forms (e.g., \"赤\", \"青\"). Some colors only have noun forms (e.g., \"茶色\", \"灰色\").'
    },
    usage: {
      'zh-TW':
        '顏色的用法：\n' +
        '1. い形容詞形式：用於修飾名詞（如「赤い花」）\n' +
        '2. 名詞形式：用於描述（如「この花は赤です」）\n' +
        '3. 名詞形式也可以加上「の」修飾名詞（如「赤の花」）',
      'en':
        'Usage of colors:\n' +
        '1. い-adjective form: used to modify nouns (e.g., \"赤い花\")\n' +
        '2. Noun form: used for description (e.g., \"この花は赤です\")\n' +
        '3. Noun form can also modify nouns with \"の\" (e.g., \"赤の花\")'
    },
    examples: [
      {
        japanese: '<ruby>赤<rt>あか</rt></ruby>い<ruby>花<rt>はな</rt></ruby>が<ruby>好<rt>す</rt></ruby>きです。',
        zhTW: '喜歡紅色的花。',
        en: 'I like red flowers.',
        explanation: {
          'zh-TW': '「赤い」是い形容詞，直接修飾名詞「花」。',
          'en': '\"赤い\" is an い-adjective that directly modifies the noun \"花\".'
        }
      },
      {
        japanese: '<ruby>青<rt>あお</rt></ruby>い<ruby>空<rt>そら</rt></ruby>が<ruby>美<rt>うつく</rt></ruby>しいです。',
        zhTW: '藍色的天空很美。',
        en: 'The blue sky is beautiful.',
        explanation: {
          'zh-TW': '「青い」修飾「空」，表示「藍色的天空」。',
          'en': '\"青い\" modifies \"空\", meaning \"blue sky\".'
        }
      },
      {
        japanese: '<ruby>茶<rt>ちゃ</rt></ruby><ruby>色<rt>いろ</rt></ruby>の<ruby>服<rt>ふく</rt></ruby>を<ruby>着<rt>き</rt></ruby>ています。',
        zhTW: '穿著棕色的衣服。',
        en: 'I am wearing brown clothes.',
        explanation: {
          'zh-TW': '「茶色」只有名詞形式，需要用「の」來修飾名詞。',
          'en': '\"茶色\" only has a noun form, so \"の\" is needed to modify the noun.'
        }
      }
    ],
    vocabulary: [
      {
        japanese: '<ruby>赤<rt>あか</rt></ruby>',
        zhTW: '紅色',
        en: 'red',
        notes: {
          'zh-TW': 'い形容詞形式：<a href=\"#/vocabulary/vocabulary-akai\">赤い</a>',
          'en': 'い-adjective form: <a href=\"#/vocabulary/vocabulary-akai\">赤い</a>'
        }
      },
      {
        japanese: '<ruby>青<rt>あお</rt></ruby>',
        zhTW: '藍色',
        en: 'blue',
        notes: {
          'zh-TW': 'い形容詞形式：<a href=\"#/vocabulary/vocabulary-aoi\">青い</a>',
          'en': 'い-adjective form: <a href=\"#/vocabulary/vocabulary-aoi\">青い</a>'
        }
      },
      {
        japanese: '<ruby>白<rt>しろ</rt></ruby>',
        zhTW: '白色',
        en: 'white',
        notes: {
          'zh-TW': 'い形容詞形式：<a href=\"#/vocabulary/vocabulary-shiroi\">白い</a>',
          'en': 'い-adjective form: <a href=\"#/vocabulary/vocabulary-shiroi\">白い</a>'
        }
      },
      {
        japanese: '<ruby>黒<rt>くろ</rt></ruby>',
        zhTW: '黑色',
        en: 'black',
        notes: {
          'zh-TW': 'い形容詞形式：<a href=\"#/vocabulary/vocabulary-kuroi\">黒い</a>',
          'en': 'い-adjective form: <a href=\"#/vocabulary/vocabulary-kuroi\">黒い</a>'
        }
      },
      {
        japanese: '<ruby>黄<rt>き</rt></ruby>',
        zhTW: '黃色',
        en: 'yellow',
        notes: {
          'zh-TW': 'い形容詞形式：<a href=\"#/vocabulary/vocabulary-kiiroi\">黄色い</a>',
          'en': 'い-adjective form: <a href=\"#/vocabulary/vocabulary-kiiroi\">黄色い</a>'
        }
      },
      {
        japanese: '<ruby>緑<rt>みどり</rt></ruby>',
        zhTW: '綠色',
        en: 'green',
        notes: {
          'zh-TW': '只有名詞形式',
          'en': 'Only noun form'
        }
      },
      {
        japanese: '<ruby>茶<rt>ちゃ</rt></ruby><ruby>色<rt>いろ</rt></ruby>',
        zhTW: '棕色',
        en: 'brown',
        notes: {
          'zh-TW': '只有名詞形式',
          'en': 'Only noun form'
        }
      },
      {
        japanese: '<ruby>灰<rt>はい</rt></ruby><ruby>色<rt>いろ</rt></ruby>',
        zhTW: '灰色',
        en: 'gray',
        notes: {
          'zh-TW': '只有名詞形式',
          'en': 'Only noun form'
        }
      },
      {
        japanese: '<ruby>紫<rt>むらさき</rt></ruby>',
        zhTW: '紫色',
        en: 'purple',
        notes: {
          'zh-TW': '只有名詞形式',
          'en': 'Only noun form'
        }
      },
      {
        japanese: '<ruby>ピンク<rt>ピンク</rt></ruby>',
        zhTW: '粉色',
        en: 'pink',
        notes: {
          'zh-TW': '外来語，只有名詞形式',
          'en': 'Loanword, only noun form'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 記住哪些顏色有い形容詞形式，哪些只有名詞形式。\n' +
        '2. 「黄色い」是特殊的，雖然是「色」結尾，但仍是い形容詞。\n' +
        '3. 只有名詞形式的顏色需要用「の」來修飾名詞。',
      'en':
        'Learning tips:\n' +
        '1. Remember which colors have い-adjective forms and which only have noun forms.\n' +
        '2. \"黄色い\" is special - although it ends with \"色\", it is still an い-adjective.\n' +
        '3. Colors with only noun forms need \"の\" to modify nouns.'
    }
  }
};

