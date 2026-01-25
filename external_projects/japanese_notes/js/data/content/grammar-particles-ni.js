// 助詞「に」- 詳細內容

export const grammarParticlesNi = {
  id: 'grammar-particles-ni',
  title: {
    'zh-TW': '助詞「に」',
    'en': 'Particle "に"'
  },
  category: {
    type: 'grammar',
    level: 'N5'
  },
  tags: ['basic', 'grammar', 'particle'],
  description: {
    'zh-TW': '助詞「に」用於標示時間、地點、方向、目的等',
    'en': 'The particle "に" is used to mark time, location, direction, purpose, etc.'
  },
  content: {
    overview: {
      'zh-TW': '助詞「に」是日文中最常用的助詞之一，有多種用法：標示時間、地點、方向、目的、對象等。',
      'en': 'The particle "に" is one of the most commonly used particles in Japanese, with various uses: marking time, location, direction, purpose, target, etc.'
    },
    usage: {
      'zh-TW': '主要用法：\n1. 標示時間：8時に（在8點）\n2. 標示地點：学校に（在學校）\n3. 標示方向：日本に行く（去日本）\n4. 標示目的：勉強に行く（去學習）\n5. 標示對象：友達に会う（見朋友）',
      'en': 'Main uses:\n1. Mark time: 8時に (at 8 o\'clock)\n2. Mark location: 学校に (at school)\n3. Mark direction: 日本に行く (go to Japan)\n4. Mark purpose: 勉強に行く (go to study)\n5. Mark target: 友達に会う (meet friend)'
    },
    examples: [
      {
        japanese: '8<ruby>時<rt>じ</rt></ruby>に<ruby>起<rt>お</rt></ruby>きます。',
        reading: 'はちじにおきます。',
        zhTW: '8點起床。',
        en: 'I wake up at 8 o\'clock.',
        explanation: {
          'zh-TW': '「に」標示時間。',
          'en': '"に" marks the time.'
        }
      },
      {
        japanese: '<ruby>学<rt>がっ</rt></ruby><ruby>校<rt>こう</rt></ruby>にいます。',
        reading: 'がっこうにいます。',
        zhTW: '在學校。',
        en: 'I am at school.',
        explanation: {
          'zh-TW': '「に」標示地點（存在的地點）。',
          'en': '"に" marks the location (where something exists).'
        }
      },
      {
        japanese: '<ruby>日<rt>に</rt></ruby><ruby>本<rt>ほん</rt></ruby>に<ruby>行<rt>い</rt></ruby>きます。',
        reading: 'にほんにいきます。',
        zhTW: '去日本。',
        en: 'I go to Japan.',
        explanation: {
          'zh-TW': '「に」標示移動的目的地。',
          'en': '"に" marks the destination of movement.'
        }
      },
      {
        japanese: '<ruby>買<rt>かい</rt></ruby>い<ruby>物<rt>もの</rt></ruby>に<ruby>行<rt>い</rt></ruby>きます。',
        reading: 'かいものにいきます。',
        zhTW: '去購物。',
        en: 'I go shopping.',
        explanation: {
          'zh-TW': '「に」標示目的。',
          'en': '"に" marks the purpose.'
        }
      }
    ],
    relatedContent: [
      {
        id: 'grammar-particles-wa',
        title: {
          'zh-TW': '助詞「は」',
          'en': 'Particle "は"'
        }
      },
      {
        id: 'grammar-particles-ga',
        title: {
          'zh-TW': '助詞「が」',
          'en': 'Particle "が"'
        }
      },
      {
        id: 'grammar-particles-wo',
        title: {
          'zh-TW': '助詞「を」',
          'en': 'Particle "を"'
        }
      }
    ]
  }
};

