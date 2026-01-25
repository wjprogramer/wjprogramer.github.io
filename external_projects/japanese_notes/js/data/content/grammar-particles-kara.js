// 助詞「から」 - 詳細內容

export const grammarParticlesKara = {
  id: 'grammar-particles-kara',
  title: {
    'zh-TW': '助詞「から」',
    'en': 'Particle "から"'
  },
  category: {
    type: 'grammar',
    level: 'N5'
  },
  tags: ['basic', 'grammar', 'particle'],
  description: {
    'zh-TW': '助詞「から」用於標示起點、原因、材料等',
    'en': 'The particle "から" is used to mark starting point, reason, material, etc.'
  },
  content: {
    overview: {
      'zh-TW':
        '助詞「から」有多種用法，主要用於標示起點（時間、地點）、原因、材料來源等。是日語中非常常用的助詞之一。',
      'en':
        'The particle "から" has multiple uses, mainly to mark starting points (time, location), reasons, material sources, etc. It is one of the most commonly used particles in Japanese.'
    },
    usage: {
      'zh-TW':
        '「から」的用法：\n' +
        '1. 標示起點（地點）：從某處開始（如「家から学校まで」）\n' +
        '2. 標示起點（時間）：從某時開始（如「9時から」）\n' +
        '3. 標示原因：因為（如「寒いから」）\n' +
        '4. 標示材料來源：由...製成（如「木から作る」）',
      'en':
        'Usage of "から":\n' +
        '1. Mark starting point (location): from somewhere (e.g., 「家から学校まで」)\n' +
        '2. Mark starting point (time): from a certain time (e.g., 「9時から」)\n' +
        '3. Mark reason: because (e.g., 「寒いから」)\n' +
        '4. Mark material source: made from (e.g., 「木から作る」)'
    },
    examples: [
      {
        japanese: '<ruby>家<rt>いえ</rt></ruby>から<ruby>学<rt>がっ</rt></ruby><ruby>校<rt>こう</rt></ruby>まで<ruby>歩<rt>ある</rt></ruby>きます。',
        zhTW: '從家走到學校。',
        en: 'I walk from home to school.',
        explanation: {
          'zh-TW': '「から」標示起點（家），「まで」標示終點（學校）。',
          'en': '"から" marks the starting point (home), "まで" marks the destination (school).'
        }
      },
      {
        japanese: '<ruby>9<rt>きゅう</rt></ruby><ruby>時<rt>じ</rt></ruby>から<ruby>5<rt>ご</rt></ruby><ruby>時<rt>じ</rt></ruby>まで<ruby>働<rt>はたら</rt></ruby>きます。',
        zhTW: '從9點工作到5點。',
        en: 'I work from 9 o\'clock to 5 o\'clock.',
        explanation: {
          'zh-TW': '「から」標示時間的起點，「まで」標示時間的終點。',
          'en': '"から" marks the starting time, "まで" marks the ending time.'
        }
      },
      {
        japanese: '<ruby>寒<rt>さむ</rt></ruby>いから<ruby>コート<rt>コート</rt></ruby>を<ruby>着<rt>き</rt></ruby>ます。',
        zhTW: '因為冷，所以穿外套。',
        en: 'Because it\'s cold, I wear a coat.',
        explanation: {
          'zh-TW': '「から」標示原因，表示「因為冷」。',
          'en': '"から" marks the reason, meaning "because it\'s cold".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「から」和「まで」經常一起使用，表示「從...到...」。\n' +
        '2. 表示原因時，「から」通常放在句尾，前面是原因。\n' +
        '3. 注意區分「から」的不同用法，根據上下文判斷。',
      'en':
        'Learning tips:\n' +
        '1. "から" and "まで" are often used together to mean "from...to...".\n' +
        '2. When indicating reason, "から" usually comes at the end of the sentence, with the reason before it.\n' +
        '3. Pay attention to distinguish the different uses of "から" based on context.'
    },
    relatedContent: [
      {
        id: 'grammar-particles-made',
        title: {
          'zh-TW': '助詞「まで」',
          'en': 'Particle "まで"'
        }
      },
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

