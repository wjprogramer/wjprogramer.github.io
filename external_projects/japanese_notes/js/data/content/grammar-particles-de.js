// 助詞「で」- 詳細內容

export const grammarParticlesDe = {
  id: 'grammar-particles-de',
  title: {
    'zh-TW': '助詞「で」',
    'en': 'Particle "で"'
  },
  category: {
    type: 'grammar',
    level: 'N5'
  },
  tags: ['basic', 'grammar', 'particle'],
  description: {
    'zh-TW': '助詞「で」用於標示動作發生的場所、方法、工具等',
    'en': 'The particle "で" is used to mark the place where an action occurs, method, tool, etc.'
  },
  content: {
    overview: {
      'zh-TW': '助詞「で」用於標示動作發生的場所、使用的方法或工具、範圍等。與「に」不同，「で」強調的是動作進行的場所。',
      'en': 'The particle "で" marks the place where an action occurs, the method or tool used, scope, etc. Unlike "に", "で" emphasizes the place where an action takes place.'
    },
    usage: {
      'zh-TW': '主要用法：\n1. 動作場所：図書館で勉強する（在圖書館學習）\n2. 方法、工具：電車で行く（搭電車去）\n3. 範圍：3人で（三個人）\n4. 材料：紙で作る（用紙做）',
      'en': 'Main uses:\n1. Place of action: 図書館で勉強する (study at the library)\n2. Method, tool: 電車で行く (go by train)\n3. Scope: 3人で (with three people)\n4. Material: 紙で作る (make with paper)'
    },
    examples: [
      {
        japanese: '<ruby>図<rt>としょ</rt></ruby><ruby>書<rt>かん</rt></ruby>で<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>みます。',
        reading: 'としょかんでほんをよみます。',
        zhTW: '在圖書館讀書。',
        en: 'I read books at the library.',
        explanation: {
          'zh-TW': '「で」標示動作發生的場所。',
          'en': '"で" marks the place where the action occurs.'
        }
      },
      {
        japanese: '<ruby>電<rt>でん</rt></ruby><ruby>車<rt>しゃ</rt></ruby>で<ruby>行<rt>い</rt></ruby>きます。',
        reading: 'でんしゃでいきます。',
        zhTW: '搭電車去。',
        en: 'I go by train.',
        explanation: {
          'zh-TW': '「で」標示方法或工具。',
          'en': '"で" marks the method or tool.'
        }
      },
      {
        japanese: '<ruby>友<rt>とも</rt></ruby>達と<ruby>一<rt>いっ</rt></ruby><ruby>緒<rt>しょ</rt></ruby>にレストランで<ruby>食<rt>た</rt></ruby>べます。',
        reading: 'ともだちといっしょにれすとらんでたべます。',
        zhTW: '和朋友一起在餐廳吃飯。',
        en: 'I eat at a restaurant with my friend.',
        explanation: {
          'zh-TW': '「で」標示用餐的場所。',
          'en': '"で" marks the place where eating occurs.'
        }
      }
    ],
    comparison: {
      'zh-TW': '「に」vs「で」的區別：\n- 「に」：標示存在的地點、目的地\n  例：学校にいます（在學校）\n- 「で」：標示動作發生的場所\n  例：学校で勉強する（在學校學習）',
      'en': 'Difference between "に" and "で":\n- "に": Marks location of existence, destination\n  Example: 学校にいます (at school)\n- "で": Marks place where action occurs\n  Example: 学校で勉強する (study at school)'
    },
    relatedContent: [
      {
        id: 'grammar-particles-ni',
        title: {
          'zh-TW': '助詞「に」',
          'en': 'Particle "に"'
        }
      }
    ]
  }
};

