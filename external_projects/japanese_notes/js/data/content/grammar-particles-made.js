// 助詞「まで」 - 詳細內容

export const grammarParticlesMade = {
  id: 'grammar-particles-made',
  title: {
    'zh-TW': '助詞「まで」',
    'en': 'Particle "まで"'
  },
  category: {
    type: 'grammar',
    level: 'N5'
  },
  tags: ['basic', 'grammar', 'particle'],
  description: {
    'zh-TW': '助詞「まで」用於標示終點、範圍的極限等',
    'en': 'The particle "まで" is used to mark destination, limit of range, etc.'
  },
  content: {
    overview: {
      'zh-TW':
        '助詞「まで」用於標示終點（時間、地點）、範圍的極限等。經常與「から」一起使用，表示「從...到...」的範圍。',
      'en':
        'The particle "まで" is used to mark destinations (time, location), limits of range, etc. Often used together with "から" to mean "from...to...".'
    },
    usage: {
      'zh-TW':
        '「まで」的用法：\n' +
        '1. 標示終點（地點）：到某處（如「学校まで」）\n' +
        '2. 標示終點（時間）：到某時（如「5時まで」）\n' +
        '3. 標示範圍的極限：甚至、連...都（如「子供まで知っている」）\n' +
        '4. 與「から」搭配：從...到...（如「9時から5時まで」）',
      'en':
        'Usage of "まで":\n' +
        '1. Mark destination (location): to somewhere (e.g., 「学校まで」)\n' +
        '2. Mark destination (time): until a certain time (e.g., 「5時まで」)\n' +
        '3. Mark limit of range: even, including (e.g., 「子供まで知っている」)\n' +
        '4. Used with "から": from...to... (e.g., 「9時から5時まで」)'
    },
    examples: [
      {
        japanese: '<ruby>駅<rt>えき</rt></ruby>まで<ruby>歩<rt>ある</rt></ruby>きます。',
        zhTW: '走到車站。',
        en: 'I walk to the station.',
        explanation: {
          'zh-TW': '「まで」標示移動的終點（車站）。',
          'en': '"まで" marks the destination of movement (station).'
        }
      },
      {
        japanese: '<ruby>5<rt>ご</rt></ruby><ruby>時<rt>じ</rt></ruby>まで<ruby>待<rt>ま</rt></ruby>ちます。',
        zhTW: '等到5點。',
        en: 'I will wait until 5 o\'clock.',
        explanation: {
          'zh-TW': '「まで」標示時間的終點（5點）。',
          'en': '"まで" marks the ending time (5 o\'clock).'
        }
      },
      {
        japanese: '<ruby>子<rt>こ</rt></ruby><ruby>供<rt>ども</rt></ruby>まで<ruby>知<rt>し</rt></ruby>っています。',
        zhTW: '連小孩都知道。',
        en: 'Even children know it.',
        explanation: {
          'zh-TW': '「まで」表示範圍的極限，強調「甚至連小孩都」。',
          'en': '"まで" indicates the limit of range, emphasizing "even children".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「まで」和「から」經常一起使用，表示時間或地點的範圍。\n' +
        '2. 表示「甚至、連...都」時，「まで」有強調的語氣。\n' +
        '3. 注意「まで」和「までに」的區別：「まで」表示持續到某時，「までに」表示在某時之前完成。',
      'en':
        'Learning tips:\n' +
        '1. "まで" and "から" are often used together to indicate a range of time or location.\n' +
        '2. When meaning "even, including", "まで" has an emphatic tone.\n' +
        '3. Note the difference between "まで" and "までに": "まで" means "until", "までに" means "by (before)".'
    },
    relatedContent: [
      {
        id: 'grammar-particles-kara',
        title: {
          'zh-TW': '助詞「から」',
          'en': 'Particle "から"'
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

