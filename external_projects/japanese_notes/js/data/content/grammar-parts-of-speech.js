// 品詞 - 詳細內容

export const grammarPartsOfSpeech = {
  id: 'grammar-parts-of-speech',
  title: {
    'zh-TW': '品詞總覽',
    'en': 'Overview of 品詞'
  },
  category: {
    type: 'grammar',
    level: 'N5'
  },
  tags: ['basic', 'grammar', 'part-of-speech'],
  description: {
    'zh-TW': '整理日文中常見的品詞：名詞、動詞、形容詞、副詞、助詞、助動詞等',
    'en': 'Overview of major Japanese 品詞 such as nouns, verbs, adjectives, adverbs, particles, and auxiliary verbs.'
  },
  content: {
    overview: {
      'zh-TW':
        '「品詞」指的是單字在句子中扮演的角色，例如是「人或事物的名稱」（名詞）、「動作」（動詞）或「描述狀態」（形容詞）等等。理解品詞有助於看懂句子結構，也能幫助記憶文法規則。',
      'en':
        '「品詞」 are categories that describe how a word works in a sentence: nouns name people or things, verbs express actions, adjectives describe states, and so on. Understanding 品詞 helps you see sentence structure and remember grammar rules.'
    },
    usage: {
      'zh-TW':
        '常見的主要品詞：\n' +
        '1. 名詞：人、物、地方、概念的名稱。\n' +
        '   例：学生、本、学校、時間。\n' +
        '2. 動詞：表示動作或狀態。\n' +
        '   例：行く、食べる、ある、いる。\n' +
        '3. 形容詞：描述性質或狀態。\n' +
        '   - い形容詞：高い、新しい、早い など。\n' +
        '   - な形容詞：きれいな、静かな、元気な など。\n' +
        '4. 副詞：修飾動詞或整個句子，表示程度、頻率、方法等。\n' +
        '   例：とても、よく、いつも、ゆっくり。\n' +
        '5. 助詞：表示語與語之間的關係。\n' +
        '   例：「は」「が」「を」「に」「で」等等。\n' +
        '6. 助動詞：接在動詞或形容詞後，表達否定、過去、可能等語氣。\n' +
        '   例：〜ない、〜た、〜そうだ など。',
      'en':
        'Main 品詞 at the beginner level:\n' +
        '1. 名詞 (nouns): names of people, things, places, or ideas.\n' +
        '   Examples: 学生, 本, 学校, 時間.\n' +
        '2. 動詞 (verbs): actions or states.\n' +
        '   Examples: 行く, 食べる, ある, いる.\n' +
        '3. 形容詞 (adjectives): describe qualities or states.\n' +
        '   - い形容詞: 高い, 新しい, 早い, etc.\n' +
        '   - な形容詞: きれいな, 静かな, 元気な, etc.\n' +
        '4. 副詞 (adverbs): modify verbs or whole sentences to show degree, frequency, manner, etc.\n' +
        '   Examples: とても, よく, いつも, ゆっくり.\n' +
        '5. 助詞 (particles): show how words are related in the sentence.\n' +
        '   Examples: 「は」「が」「を」「に」「で」, etc.\n' +
        '6. 助動詞 (auxiliary verbs): attach to verbs or adjectives to express negation, past, possibility, etc.\n' +
        '   Examples: 〜ない, 〜た, 〜そうだ, etc.'
    },
    examples: [
      {
        japanese: '<ruby>私<rt>わたし</rt></ruby>は<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>みます。',
        zhTW: '我是看書。（標示品詞：名詞＋助詞＋名詞＋助詞＋動詞）',
        en: 'I read a book. (shows a pattern: noun + particle + noun + particle + verb)',
        explanation: {
          'zh-TW':
            '「私」「本」是名詞，「は」「を」是助詞，「読みます」是動詞（ます形）。把句子拆成品詞來看，可以更清楚理解結構。',
          'en':
            '「私」 and 「本」 are nouns, 「は」 and 「を」 are particles, and 「読みます」 is a verb (in ます form). Splitting the sentence by 品詞 makes the structure clearer.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 先能大致判斷一個單字是名詞、動詞還是形容詞即可，不需要一開始就記住所有細分類。\n' +
        '2. 每學一個新單字時，順便標記它的品詞，久而久之就會在腦中自然分類。\n' +
        '3. 之後學更進階文法時（例如助動詞、複雜句型），品詞概念會是很重要的基礎。',
      'en':
        'Study tips:\n' +
        '1. At first, just learn to roughly tell whether a word is a noun, verb, or adjective; do not worry about all subcategories.\n' +
        '2. When you learn a new word, also note its 品詞 so your brain slowly builds categories.\n' +
        '3. Later, when you study more advanced grammar (auxiliary verbs, complex sentences), this 品詞 foundation will be very helpful.'
    },
    relatedContent: [
      {
        id: 'grammar-particles-wa',
        title: {
          'zh-TW': '助詞「は」',
          'en': 'Particle "は"'
        }
      },
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


