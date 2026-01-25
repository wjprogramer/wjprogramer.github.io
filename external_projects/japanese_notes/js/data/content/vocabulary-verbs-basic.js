// 基本動詞 - 詳細內容

export const vocabularyVerbsBasic = {
  id: 'category-verbs-basic',
  title: {
    'zh-TW': '基本動詞',
    'en': 'Basic Verbs'
  },
  category: {
    type: 'vocabulary',
    level: 'N5'
  },
  tags: ['basic', 'vocabulary', 'verbs', 'topic-category'],
  description: {
    'zh-TW': '日語中常見的基本動詞',
    'en': 'Common basic verbs in Japanese'
  },
  content: {
    overview: {
      'zh-TW':
        '動詞是日語中最重要的詞類之一。日語中的基本動詞包括來、去、做、有、是、在等，了解這些動詞對於表達動作、描述狀態等場合很重要。',
      'en':
        'Verbs are one of the most important word classes in Japanese. Basic verbs in Japanese include come, go, do, have, be, exist, etc. Understanding these verbs is important for expressing actions, describing states, etc.'
    },
    usage: {
      'zh-TW':
        '基本動詞的用法：\n' +
        '1. 表達動作：〜ます（做...）\n' +
        '2. 描述狀態：〜です（是...）\n' +
        '3. 談論存在：〜があります（有...）',
      'en':
        'Usage of basic verbs:\n' +
        '1. Express actions: 〜ます (do...)\n' +
        '2. Describe states: 〜です (is...)\n' +
        '3. Talk about existence: 〜があります (there is...)'
    },
    examples: [
      {
        japanese: '<ruby>来<rt>き</rt></ruby>ます。',
        zhTW: '來。',
        en: 'I come.',
        explanation: {
          'zh-TW': '「来る」是來的意思，「来ます」是「来る」的ます形。',
          'en': '"来る" means to come, "来ます" is the ます form of "来る".'
        }
      },
      {
        japanese: '<ruby>行<rt>い</rt></ruby>きます。',
        zhTW: '去。',
        en: 'I go.',
        explanation: {
          'zh-TW': '「行く」是去的意思，「行きます」是「行く」的ます形。',
          'en': '"行く" means to go, "行きます" is the ます form of "行く".'
        }
      },
      {
        japanese: '<ruby>本<rt>ほん</rt></ruby>があります。',
        zhTW: '有書。',
        en: 'There is a book.',
        explanation: {
          'zh-TW': '「ある」是有的意思，「あります」是「ある」的ます形。',
          'en': '"ある" means to exist, "あります" is the ます form of "ある".'
        }
      }
    ],
    vocabulary: [
      {
        japanese: '<ruby>来<rt>く</rt></ruby>る',
        zhTW: '來',
        en: 'come',
        notes: {
          'zh-TW': '不規則動詞',
          'en': 'irregular verb'
        }
      },
      {
        japanese: '<ruby>行<rt>い</rt></ruby>く',
        zhTW: '去',
        en: 'go',
        notes: {
          'zh-TW': '五段動詞',
          'en': '五段 verb'
        }
      },
      {
        japanese: '<ruby>する',
        zhTW: '做',
        en: 'do',
        notes: {
          'zh-TW': '不規則動詞',
          'en': 'irregular verb'
        }
      },
      {
        japanese: '<ruby>ある',
        zhTW: '有（無生命）',
        en: 'exist (inanimate)',
        notes: {
          'zh-TW': '五段動詞',
          'en': '五段 verb'
        }
      },
      {
        japanese: '<ruby>いる',
        zhTW: '有（有生命）',
        en: 'exist (animate)',
        notes: {
          'zh-TW': '一段動詞',
          'en': '一段 verb'
        }
      },
      {
        japanese: '<ruby>です',
        zhTW: '是',
        en: 'be (polite)',
        notes: {
          'zh-TW': '助動詞',
          'en': 'auxiliary verb'
        }
      },
      {
        japanese: '<ruby>だ',
        zhTW: '是',
        en: 'be (plain)',
        notes: {
          'zh-TW': '助動詞',
          'en': 'auxiliary verb'
        }
      },
      {
        japanese: '<ruby>なる',
        zhTW: '變成',
        en: 'become',
        notes: {
          'zh-TW': '五段動詞',
          'en': '五段 verb'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 基本動詞多為和語，用平假名或漢字書寫。\n' +
        '2. 「来る」是來的意思，「来ます」是「来る」的ます形。\n' +
        '3. 許多基本動詞是不規則動詞或五段動詞，需要記住其變化形式。',
      'en':
        'Learning tips:\n' +
        '1. Basic verbs are mostly 和語, written in hiragana or kanji.\n' +
        '2. "来る" means to come, "来ます" is the ます form of "来る".\n' +
        '3. Many basic verbs are irregular verbs or 五段 verbs, need to remember their conjugation forms.'
    }
  }
};


