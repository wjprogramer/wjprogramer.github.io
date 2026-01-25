// 助動詞 - 詳細內容

export const grammarAuxVerbs = {
  id: 'grammar-aux-verbs',
  title: {
    'zh-TW': '助動詞入門',
    'en': 'Introduction to 助動詞'
  },
  category: {
    type: 'grammar',
    level: 'N5'
  },
  tags: ['basic', 'grammar', 'aux-verb'],
  description: {
    'zh-TW': '介紹日文中幾個常見、初級必學的助動詞（可能、否定、過去等）',
    'en': 'Introduces several essential beginner 助動詞 such as potential, negative, and past.'
  },
  content: {
    overview: {
      'zh-TW':
        '「助動詞」接在動詞或形容詞後面，幫助表達可能、否定、過去、推量等語氣。例如「〜ない」「〜た」「〜そうだ」等，都是常見的助動詞形態。',
      'en':
        '「助動詞」 attach to verbs or adjectives to express meanings like possibility, negation, past, or conjecture. Forms such as 「〜ない」「〜た」「〜そうだ」 are common 助動詞 patterns.'
    },
    usage: {
      'zh-TW':
        '常見的初級助動詞：\n' +
        '1. 否定形「〜ない」：\n' +
        '   - 食べる → 食べない（不吃）\n' +
        '   - 行く → 行かない（不去）\n' +
        '2. 過去形「〜た」：\n' +
        '   - 食べる → 食べた（吃了）\n' +
        '   - 行く → 行った（去了）\n' +
        '3. 樣態「〜そうだ」：\n' +
        '   - おいしい → おいしそうだ（看起來好吃）\n' +
        '   - <ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>りそうだ（看起來要下雨了）',
      'en':
        'Common beginner 助動詞:\n' +
        '1. Negative 「〜ない」:\n' +
        '   - 食べる → 食べない (not eat)\n' +
        '   - 行く → 行かない (not go)\n' +
        '2. Past 「〜た」:\n' +
        '   - 食べる → 食べた (ate)\n' +
        '   - 行く → 行った (went)\n' +
        '3. Seeming 「〜そうだ」:\n' +
        '   - おいしい → おいしそうだ (looks delicious)\n' +
        '   - 雨が降りそうだ (looks like it will rain)'
    },
    examples: [
      {
        japanese: '<ruby>昨<rt>きの</rt></ruby><ruby>日<rt>う</rt></ruby>は<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>りました。',
        zhTW: '昨天下雨了。（過去形「〜た」）',
        en: 'It rained yesterday. (past 「〜た」 form)',
        explanation: {
          'zh-TW': '「降りました」是「降る」的ます形過去式，語幹接上「ました」。',
          'en': '「降りました」 is the polite past form of 「降る」, using the ます past pattern.'
        }
      },
      {
        japanese: '<ruby>今<rt>いま</rt></ruby>は<ruby>時<rt>じ</rt></ruby><ruby>間<rt>かん</rt></ruby>がありません。',
        zhTW: '現在沒時間。（否定形「〜ない」）',
        en: 'I do not have time now. (negative 「〜ない」 pattern)',
        explanation: {
          'zh-TW': '「ありません」是「ある」的否定禮貌形，屬於助動詞用法之一。',
          'en': '「ありません」 is the polite negative form of 「ある」, functioning like an auxiliary pattern.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '初學者不需要一次記住所有助動詞，只要先掌握：\n' +
        '1. 否定「〜ない」。\n' +
        '2. 過去「〜た」。\n' +
        '3. 可能形（〜れる・〜られる）與樣態「〜そうだ」可以之後再慢慢補強。\n' +
        '遇到新形態時，先判斷「是原本動詞」還是「動詞＋助動詞」，有助於理解整個句子的結構。',
      'en':
        'You do not need to learn all 助動詞 at once. As a beginner, focus on:\n' +
        '1. Negative 「〜ない」.\n' +
        '2. Past 「〜た」.\n' +
        '3. Later, add potential forms (〜れる・〜られる) and 「〜そうだ」.\n' +
        'When you see a new form, try to separate it into “base verb + 助動詞” to understand the structure.'
    },
    relatedContent: [
      {
        id: 'vocabulary-dekiru',
        title: {
          'zh-TW': 'できる',
          'en': 'できる'
        }
      }
    ]
  }
};


