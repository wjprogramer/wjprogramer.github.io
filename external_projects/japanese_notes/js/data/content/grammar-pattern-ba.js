// 句型「〜ば」 - 詳細內容

export const grammarPatternBa = {
  id: 'grammar-pattern-ba',
  title: {
    'zh-TW': '句型「〜ば」',
    'en': 'Pattern "〜ば"'
  },
  category: {
    type: 'grammar',
    level: 'N4'
  },
  tags: ['grammar'],
  description: {
    'zh-TW': '「〜ば」表示條件，意思是「如果...就...」',
    'en': '"〜ば" expresses condition, meaning "if...then..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜ば」接在動詞、形容詞的假定形後面，表示條件，意思是「如果...就...」。這是日語中表示條件的重要句型之一，用於表達假設、一般性條件等。',
      'en':
        '"〜ば" is attached to the conditional form of verbs and adjectives to express condition, meaning "if...then...". This is one of the important patterns for expressing conditions in Japanese, used for hypotheses, general conditions, etc.'
    },
    usage: {
      'zh-TW':
        '「〜ば」的用法：\n' +
        '1. 表示條件：如果...就...（如「行けば分かる」）\n' +
        '2. 表示一般性條件：只要...就...（如「練習すれば上手になる」）\n' +
        '3. 變化規則：\n' +
        '   - 動詞：將「ない形」的「ない」改為「なければ」\n' +
        '   - い形容詞：去掉「い」加「ければ」\n' +
        '   - な形容詞：加「であれば」或「ならば」',
      'en':
        'Usage of "〜ば":\n' +
        '1. Express condition: if...then... (e.g., 「行けば分かる」)\n' +
        '2. Express general condition: as long as...then... (e.g., 「練習すれば上手になる」)\n' +
        '3. Conjugation rules:\n' +
        '   - Verbs: change "ない" in ない form to "なければ"\n' +
        '   - い-adjectives: remove "い" and add "ければ"\n' +
        '   - な-adjectives: add "であれば" or "ならば"'
    },
    examples: [
      {
        japanese: '<ruby>行<rt>い</rt></ruby>けば<ruby>分<rt>わ</rt></ruby>かります。',
        zhTW: '如果去就會知道。',
        en: 'If I go, I will understand.',
        explanation: {
          'zh-TW': '「行けば」是「行く」的假定形，表示「如果去」。',
          'en': '"行けば" is the conditional form of "行く", meaning "if I go".'
        }
      },
      {
        japanese: '<ruby>練<rt>れん</rt></ruby><ruby>習<rt>しゅう</rt></ruby>すれば<ruby>上<rt>じょう</rt></ruby><ruby>手<rt>ず</rt></ruby>になります。',
        zhTW: '只要練習就會變好。',
        en: 'As long as I practice, I will improve.',
        explanation: {
          'zh-TW': '「すれば」是「する」的假定形，表示一般性條件。',
          'en': '"すれば" is the conditional form of "する", expressing a general condition.'
        }
      },
      {
        japanese: '<ruby>安<rt>やす</rt></ruby>ければ<ruby>買<rt>か</rt></ruby>います。',
        zhTW: '如果便宜就買。',
        en: 'If it\'s cheap, I will buy it.',
        explanation: {
          'zh-TW': '「安ければ」是「安い」的假定形，表示「如果便宜」。',
          'en': '"安ければ" is the conditional form of "安い", meaning "if it\'s cheap".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜ば」的變化規則：動詞將「ない形」的「ない」改為「なければ」，い形容詞去掉「い」加「ければ」。\n' +
        '2. 「〜ば」常用於表達一般性條件或假設，語氣較正式。\n' +
        '3. 注意「〜ば」「〜たら」「〜と」的區別：三者都表示條件，但用法和語氣略有不同。',
      'en':
        'Learning tips:\n' +
        '1. Conjugation rules for "〜ば": verbs change "ない" in ない form to "なければ", い-adjectives remove "い" and add "ければ".\n' +
        '2. "〜ば" is commonly used to express general conditions or hypotheses, with a more formal tone.\n' +
        '3. Note the differences between "〜ば", "〜たら", and "〜と": all express conditions, but usage and tone are slightly different.'
    },
    relatedContent: [
      {
        id: 'grammar-pattern-tara',
        title: {
          'zh-TW': '句型「〜たら」',
          'en': 'Pattern "〜たら"'
        }
      },
      {
        id: 'grammar-particles-to',
        title: {
          'zh-TW': '助詞「と」',
          'en': 'Particle "と"'
        }
      }
    ]
  }
};


