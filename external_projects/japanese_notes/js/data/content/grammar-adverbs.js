// 副詞與副詞形 - 詳細內容

export const grammarAdverbs = {
  id: 'grammar-adverbs',
  title: {
    'zh-TW': '副詞與副詞形',
    'en': '副詞 and 副詞形'
  },
  category: {
    type: 'grammar',
    level: 'N5'
  },
  tags: ['basic', 'grammar', 'adverb'],
  description: {
    'zh-TW': '說明副詞的基本概念，並介紹由形容詞變化而來的「副詞形」',
    'en': 'Explains basic Japanese 副詞 and the adverbial form 副詞形 derived from adjectives.'
  },
  content: {
    overview: {
      'zh-TW':
        '「副詞」用來修飾動詞、形容詞或整個句子，表示程度、頻率、方式等。「副詞形」則是由形容詞變化而來，用來像副詞一樣修飾動作或狀態。',
      'en':
        '「副詞」 modify verbs, adjectives, or whole sentences to show degree, frequency, manner, etc. 「副詞形」 is the adverb-like form made from adjectives, used to modify actions or states.'
    },
    usage: {
      'zh-TW':
        '常見的副詞種類：\n' +
        '1. 程度副詞：とても、すこし、あまり など。\n' +
        '2. 頻率副詞：いつも、よく、たまに、ぜんぜん など。\n' +
        '3. 方法・樣態副詞：ゆっくり、はっきり、しっかり など。\n\n' +
        '副詞形的基本概念：\n' +
        '- い形容詞：把「い」改成「く」，例如：\n' +
        '  早い → 早く（早く起きる）\n' +
        '  楽しい → 楽しく（楽しく遊ぶ）\n' +
        '- な形容詞：加上「に」，例如：\n' +
        '  便利な → 便利に（便利に使う）\n' +
        '  静かな → 静かに（静かに話す）',
      'en':
        'Common types of 副詞:\n' +
        '1. Degree: とても, すこし, あまり, etc.\n' +
        '2. Frequency: いつも, よく, たまに, ぜんぜん, etc.\n' +
        '3. Manner: ゆっくり, はっきり, しっかり, etc.\n\n' +
        'Basic idea of 副詞形:\n' +
        '- い-adjectives: change 「い」 to 「く」, e.g.\n' +
        '  早い → 早く（早く起きる）\n' +
        '  楽しい → 楽しく（楽しく遊ぶ）\n' +
        '- な-adjectives: add 「に」, e.g.\n' +
        '  便利な → 便利に（便利に使う）\n' +
        '  静かな → 静かに（静かに話す）'
    },
    examples: [
      {
        japanese: 'いつも<ruby>図<rt>と</rt></ruby><ruby>書<rt>しょ</rt></ruby><ruby>館<rt>かん</rt></ruby>で<ruby>勉<rt>べん</rt></ruby><ruby>強<rt>きょう</rt></ruby>します。',
        zhTW: '我總是在圖書館讀書。（頻率副詞「いつも」）',
        en: 'I always study at the library. (frequency adverb 「いつも」)',
        explanation: {
          'zh-TW': '「いつも」修飾整個動作「勉強します」，表示頻率。',
          'en': '「いつも」 modifies the action 「勉強します」 to show frequency.'
        }
      },
      {
        japanese: '<ruby>早<rt>はや</rt></ruby>く<ruby>起<rt>お</rt></ruby>きます。',
        zhTW: '我會早起。（副詞形「早く」）',
        en: 'I get up early. (副詞形 「早く」 from 「早い」)',
        explanation: {
          'zh-TW': '形容詞「早い」變成副詞形「早く」，修飾動詞「起きます」。',
          'en': 'The adjective 「早い」 changes to the adverbial form 「早く」 to modify 「起きます」.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習重點：\n' +
        '1. 先認得常用的獨立副詞（例如：よく、いつも、たまに）。\n' +
        '2. 接著熟悉形容詞變成副詞形的規則，配合同一個動詞多換幾種副詞來練習。\n' +
        '3. 副詞通常不需要變形，位置也較自由，但放在動詞前後的語氣略有不同，可以多聽、多模仿母語者的說法。',
      'en':
        'Key points:\n' +
        '1. Start with common standalone adverbs such as よく, いつも, たまに.\n' +
        '2. Then learn how adjectives turn into 副詞形 by practicing with one verb and many adverbs.\n' +
        '3. Adverbs usually do not conjugate and have flexible placement, but nuance can change slightly, so listen and imitate native usage.'
    },
    relatedContent: [
      {
        id: 'grammar-adjectives-i',
        title: {
          'zh-TW': 'い形容詞',
          'en': 'I-Adjectives'
        }
      },
      {
        id: 'grammar-adjectives-na',
        title: {
          'zh-TW': 'な形容詞',
          'en': 'Na-Adjectives'
        }
      }
    ]
  }
};


