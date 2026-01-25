// 句型「〜たら」 - 詳細內容

export const grammarPatternTara = {
  id: 'grammar-pattern-tara',
  title: {
    'zh-TW': '句型「〜たら」',
    'en': 'Pattern "〜たら"'
  },
  category: {
    type: 'grammar',
    level: 'N4'
  },
  tags: ['grammar'],
  description: {
    'zh-TW': '「〜たら」表示條件，意思是「如果...就...」「...之後」',
    'en': '"〜たら" expresses condition, meaning "if...then..." or "after..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜たら」接在動詞、形容詞的「た形」後面，表示條件，意思是「如果...就...」或「...之後」。這是日語中表示條件的重要句型之一，用於表達假設、時間順序等。',
      'en':
        '"〜たら" is attached to the た form of verbs and adjectives to express condition, meaning "if...then..." or "after...". This is one of the important patterns for expressing conditions in Japanese, used for hypotheses, time sequence, etc.'
    },
    usage: {
      'zh-TW':
        '「〜たら」的用法：\n' +
        '1. 表示條件：如果...就...（如「行ったら分かる」）\n' +
        '2. 表示時間順序：...之後（如「食べたら寝る」）\n' +
        '3. 變化規則：\n' +
        '   - 動詞：た形＋ら\n' +
        '   - い形容詞：去掉「い」加「かったら」\n' +
        '   - な形容詞：加「だったら」\n' +
        '   - 名詞：加「だったら」',
      'en':
        'Usage of "〜たら":\n' +
        '1. Express condition: if...then... (e.g., 「行ったら分かる」)\n' +
        '2. Express time sequence: after... (e.g., 「食べたら寝る」)\n' +
        '3. Conjugation rules:\n' +
        '   - Verbs: た form + ら\n' +
        '   - い-adjectives: remove "い" and add "かったら"\n' +
        '   - な-adjectives: add "だったら"\n' +
        '   - Nouns: add "だったら"'
    },
    examples: [
      {
        japanese: '<ruby>日<rt>に</rt></ruby><ruby>本<rt>ほん</rt></ruby>に<ruby>行<rt>い</rt></ruby>ったら<ruby>楽<rt>たの</rt></ruby>しいです。',
        zhTW: '如果去日本會很開心。',
        en: 'If I go to Japan, it will be fun.',
        explanation: {
          'zh-TW': '「行ったら」是「行く」的た形加「ら」，表示「如果去」。',
          'en': '"行ったら" is the た form of "行く" plus "ら", meaning "if I go".'
        }
      },
      {
        japanese: '<ruby>食<rt>た</rt></ruby>べたら<ruby>寝<rt>ね</rt></ruby>ます。',
        zhTW: '吃完就睡覺。',
        en: 'After eating, I will sleep.',
        explanation: {
          'zh-TW': '「たら」表示時間順序，「吃完之後睡覺」。',
          'en': '"たら" indicates time sequence, "sleep after eating".'
        }
      },
      {
        japanese: '<ruby>安<rt>やす</rt></ruby>かったら<ruby>買<rt>か</rt></ruby>います。',
        zhTW: '如果便宜就買。',
        en: 'If it\'s cheap, I will buy it.',
        explanation: {
          'zh-TW': '「安かったら」是「安い」的假定形，表示「如果便宜」。',
          'en': '"安かったら" is the conditional form of "安い", meaning "if it\'s cheap".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜たら」的變化規則：動詞用た形加「ら」，い形容詞去掉「い」加「かったら」。\n' +
        '2. 「〜たら」可以表示條件（如果...）或時間順序（...之後），需要根據上下文判斷。\n' +
        '3. 「〜たら」語氣較口語，比「〜ば」更常用於日常會話。',
      'en':
        'Learning tips:\n' +
        '1. Conjugation rules for "〜たら": verbs use た form plus "ら", い-adjectives remove "い" and add "かったら".\n' +
        '2. "〜たら" can express condition (if...) or time sequence (after...), which needs to be judged by context.\n' +
        '3. "〜たら" has a more colloquial tone and is more commonly used in daily conversation than "〜ば".'
    },
    relatedContent: [
      {
        id: 'grammar-pattern-ba',
        title: {
          'zh-TW': '句型「〜ば」',
          'en': 'Pattern "〜ば"'
        }
      },
      {
        id: 'grammar-verb-ta-form',
        title: {
          'zh-TW': '動詞た形',
          'en': 'Verb た Form'
        }
      }
    ]
  }
};


