// 助詞「さえ」 - 詳細內容

export const grammarParticlesSae = {
  id: 'grammar-particles-sae',
  title: {
    'zh-TW': '助詞「さえ」',
    'en': 'Particle "さえ"'
  },
  category: {
    type: 'grammar',
    level: 'N3'
  },
  tags: ['grammar', 'particle'],
  description: {
    'zh-TW': '助詞「さえ」用於表示「甚至...」「連...都...」',
    'en': 'The particle "さえ" is used to mean "even..." or "even...at all"'
  },
  content: {
    overview: {
      'zh-TW':
        '助詞「さえ」用於表示「甚至...」「連...都...」的意思，強調極端的情況。與「も」類似，但「さえ」的語氣更強，用於強調「連最基本、最簡單的...都...」。',
      'en':
        'The particle "さえ" is used to mean "even..." or "even...at all", emphasizing extreme situations. Similar to "も", but "さえ" has a stronger tone, used to emphasize "even the most basic, simplest...at all".'
    },
    usage: {
      'zh-TW':
        '「さえ」的用法：\n' +
        '1. 表示極端：甚至...、連...都...（如「子供さえ分かる」）\n' +
        '2. 表示最低限度：只要...就...（如「時間さえあれば」）\n' +
        '3. 與「も」的區別：「さえ」語氣更強，強調極端情況',
      'en':
        'Usage of "さえ":\n' +
        '1. Indicate extreme: even..., even...at all (e.g., 「子供さえ分かる」)\n' +
        '2. Indicate minimum: as long as...then... (e.g., 「時間さえあれば」)\n' +
        '3. Difference from "も": "さえ" has a stronger tone, emphasizing extreme situations'
    },
    examples: [
      {
        japanese: '<ruby>子<rt>こ</rt></ruby><ruby>供<rt>ども</rt></ruby>さえ<ruby>分<rt>わ</rt></ruby>かります。',
        zhTW: '連小孩都懂。',
        en: 'Even children understand.',
        explanation: {
          'zh-TW': '「さえ」表示極端，「連小孩都懂」，強調「連最基本的人都懂」。',
          'en': '"さえ" indicates extreme, "even children understand", emphasizing "even the most basic people understand".'
        }
      },
      {
        japanese: '<ruby>時<rt>じ</rt></ruby><ruby>間<rt>かん</rt></ruby>さえあれば<ruby>行<rt>い</rt></ruby>きます。',
        zhTW: '只要有時間就去。',
        en: 'As long as I have time, I will go.',
        explanation: {
          'zh-TW': '「さえ」表示最低限度，「只要有時間就去」。',
          'en': '"さえ" indicates minimum, "as long as I have time, I will go".'
        }
      },
      {
        japanese: '<ruby>水<rt>みず</rt></ruby>さえ<ruby>飲<rt>の</rt></ruby>めませんでした。',
        zhTW: '連水都喝不了。',
        en: 'I couldn\'t even drink water.',
        explanation: {
          'zh-TW': '「さえ」表示極端，「連最基本的水都喝不了」。',
          'en': '"さえ" indicates extreme, "couldn\'t even drink the most basic water".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「さえ」用於強調極端情況，語氣比「も」更強。\n' +
        '2. 「さえ」可以表示「甚至...」或「只要...就...」，需要根據上下文判斷。\n' +
        '3. 「さえ」常用於「〜さえ〜ば」的句型，表示「只要...就...」。',
      'en':
        'Learning tips:\n' +
        '1. "さえ" is used to emphasize extreme situations, with a stronger tone than "も".\n' +
        '2. "さえ" can mean "even..." or "as long as...then...", which needs to be judged by context.\n' +
        '3. "さえ" is commonly used in the pattern "〜さえ〜ば", meaning "as long as...then...".'
    },
    relatedContent: [
      {
        id: 'grammar-particles-mo',
        title: {
          'zh-TW': '助詞「も」',
          'en': 'Particle "も"'
        }
      },
      {
        id: 'grammar-pattern-ba',
        title: {
          'zh-TW': '句型「〜ば」',
          'en': 'Pattern "〜ば"'
        }
      }
    ]
  }
};


