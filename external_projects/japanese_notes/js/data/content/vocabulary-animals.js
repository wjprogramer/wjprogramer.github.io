// 動物 - 詳細內容

export const vocabularyAnimals = {
  id: 'category-animals',
  title: {
    'zh-TW': '動物',
    'en': 'Animals'
  },
  category: {
    type: 'vocabulary',
    level: 'N5'
  },
  tags: ['basic', 'vocabulary', 'animals', 'topic-category'],
  description: {
    'zh-TW': '日語中常見的動物單字',
    'en': 'Common animal words in Japanese'
  },
  content: {
    overview: {
      'zh-TW':
        '動物名稱在日語中有多種來源：有些是固有詞彙（和語），有些是漢語，有些是外來語。了解這些單字對於描述動物、談論寵物等場合很有用。',
      'en':
        'Animal names in Japanese come from various sources: some are native words (和語), some are Sino-Japanese (漢語), and some are loanwords. Understanding these words is useful for describing animals, talking about pets, etc.'
    },
    usage: {
      'zh-TW':
        '動物的用法：\n' +
        '1. 描述動物：〜がいます（有...）\n' +
        '2. 表達喜好：〜が好きです（喜歡...）\n' +
        '3. 談論寵物：〜を飼っています（養...）',
      'en':
        'Usage of animals:\n' +
        '1. Describe animals: 〜がいます (there is...)\n' +
        '2. Express preference: 〜が好きです (like...)\n' +
        '3. Talk about pets: 〜を飼っています (keep/raise...)'
    },
    examples: [
      {
        japanese: '<ruby>猫<rt>ねこ</rt></ruby>がいます。',
        zhTW: '有貓。',
        en: 'There is a cat.',
        explanation: {
          'zh-TW': '「猫」是貓，用「が」標示存在的主語。',
          'en': '"猫" is cat, marked with "が" as the subject of existence.'
        }
      },
      {
        japanese: '<ruby>犬<rt>いぬ</rt></ruby>を<ruby>飼<rt>か</rt></ruby>っています。',
        zhTW: '養狗。',
        en: 'I keep a dog.',
        explanation: {
          'zh-TW': '「飼う」是「養、飼養」的意思。',
          'en': '"飼う" means "to keep, to raise".'
        }
      },
      {
        japanese: '<ruby>鳥<rt>とり</rt></ruby>が<ruby>飛<rt>と</rt></ruby>んでいます。',
        zhTW: '鳥在飛。',
        en: 'A bird is flying.',
        explanation: {
          'zh-TW': '「鳥」是鳥，用「が」標示動作的主語。',
          'en': '"鳥" is bird, marked with "が" as the subject of the action.'
        }
      }
    ],
    vocabulary: [
      {
        japanese: '<ruby>猫<rt>ねこ</rt></ruby>',
        zhTW: '貓',
        en: 'cat'
      },
      {
        japanese: '<ruby>犬<rt>いぬ</rt></ruby>',
        zhTW: '狗',
        en: 'dog'
      },
      {
        japanese: '<ruby>鳥<rt>とり</rt></ruby>',
        zhTW: '鳥',
        en: 'bird'
      },
      {
        japanese: '<ruby>魚<rt>さかな</rt></ruby>',
        zhTW: '魚',
        en: 'fish'
      },
      {
        japanese: '<ruby>馬<rt>うま</rt></ruby>',
        zhTW: '馬',
        en: 'horse'
      },
      {
        japanese: '<ruby>牛<rt>うし</rt></ruby>',
        zhTW: '牛',
        en: 'cow, cattle'
      },
      {
        japanese: '<ruby>豚<rt>ぶた</rt></ruby>',
        zhTW: '豬',
        en: 'pig'
      },
      {
        japanese: '<ruby>羊<rt>ひつじ</rt></ruby>',
        zhTW: '羊',
        en: 'sheep'
      },
      {
        japanese: '<ruby>兎<rt>うさぎ</rt></ruby>',
        zhTW: '兔子',
        en: 'rabbit'
      },
      {
        japanese: '<ruby>鼠<rt>ねずみ</rt></ruby>',
        zhTW: '老鼠',
        en: 'mouse, rat'
      },
      {
        japanese: '<ruby>熊<rt>くま</rt></ruby>',
        zhTW: '熊',
        en: 'bear'
      },
      {
        japanese: '<ruby>虎<rt>とら</rt></ruby>',
        zhTW: '老虎',
        en: 'tiger'
      },
      {
        japanese: '<ruby>ライオン<rt>ライオン</rt></ruby>',
        zhTW: '獅子',
        en: 'lion',
        notes: {
          'zh-TW': '外來語',
          'en': 'Loanword'
        }
      },
      {
        japanese: '<ruby>象<rt>ぞう</rt></ruby>',
        zhTW: '大象',
        en: 'elephant'
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 許多動物名稱是固有詞彙，需要記住讀音。\n' +
        '2. 外來語的動物名稱（如「ライオン」）用片假名書寫。\n' +
        '3. 談論寵物時，常用「〜を飼っています」表示「養...」。',
      'en':
        'Learning tips:\n' +
        '1. Many animal names are native words, so remember their readings.\n' +
        '2. Loanword animal names (like "ライオン") are written in katakana.\n' +
        '3. When talking about pets, commonly use "〜を飼っています" to mean "keep/raise...".'
    }
  }
};


