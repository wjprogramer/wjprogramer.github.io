// 句型「〜てしまう」 - 詳細內容

export const grammarPatternTeShimau = {
  id: 'grammar-pattern-te-shimau',
  title: {
    'zh-TW': '句型「〜てしまう」',
    'en': 'Pattern "〜てしまう"'
  },
  category: {
    type: 'grammar',
    level: 'N4'
  },
  tags: ['grammar'],
  description: {
    'zh-TW': '「〜てしまう」表示動作的完成或遺憾、後悔等感情',
    'en': '"〜てしまう" expresses completion of an action or feelings of regret, disappointment, etc.'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜てしまう」接在動詞て形後面，有兩種主要用法：一是表示動作的完成（中性），二是表示遺憾、後悔等感情（負面）。口語中常縮略為「〜ちゃう」「〜じゃう」。',
      'en':
        '"〜てしまう" is attached to the て form of verbs and has two main uses: one is to express completion of an action (neutral), and the other is to express feelings of regret or disappointment (negative). In colloquial speech, it is often shortened to "〜ちゃう" or "〜じゃう".'
    },
    usage: {
      'zh-TW':
        '「〜てしまう」的用法：\n' +
        '1. 表示完成：完成了...（如「食べてしまった」）\n' +
        '2. 表示遺憾：不小心...了、竟然...了（如「忘れてしまった」）\n' +
        '3. 口語縮略：〜ちゃう、〜じゃう（如「食べちゃう」「読んじゃう」）',
      'en':
        'Usage of "〜てしまう":\n' +
        '1. Express completion: have finished... (e.g., 「食べてしまった」)\n' +
        '2. Express regret: accidentally...ed, unfortunately...ed (e.g., 「忘れてしまった」)\n' +
        '3. Colloquial abbreviation: 〜ちゃう, 〜じゃう (e.g., 「食べちゃう」「読んじゃう」)'
    },
    examples: [
      {
        japanese: '<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>んでしまいました。',
        zhTW: '把書讀完了。',
        en: 'I finished reading the book.',
        explanation: {
          'zh-TW': '「てしまう」表示動作的完成，「讀完了」。',
          'en': '"てしまう" expresses completion of the action, "finished reading".'
        }
      },
      {
        japanese: '<ruby>鍵<rt>かぎ</rt></ruby>を<ruby>忘<rt>わす</rt></ruby>れてしまいました。',
        zhTW: '不小心忘了鑰匙。',
        en: 'I accidentally forgot my keys.',
        explanation: {
          'zh-TW': '「てしまう」表示遺憾，「不小心忘了」。',
          'en': '"てしまう" expresses regret, "accidentally forgot".'
        }
      },
      {
        japanese: '<ruby>全<rt>ぜん</rt></ruby><ruby>部<rt>ぶ</rt></ruby><ruby>食<rt>た</rt></ruby>べちゃいました。',
        zhTW: '全部吃完了。',
        en: 'I ate everything.',
        explanation: {
          'zh-TW': '「ちゃう」是「てしまう」的口語縮略形式。',
          'en': '"ちゃう" is the colloquial abbreviation of "てしまう".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜てしまう」的兩種用法需要根據上下文判斷：完成（中性）或遺憾（負面）。\n' +
        '2. 口語中常用「〜ちゃう」「〜じゃう」的縮略形式。\n' +
        '3. 「〜てしまう」的過去形「〜てしまった」常用於表示後悔或遺憾。',
      'en':
        'Learning tips:\n' +
        '1. The two uses of "〜てしまう" need to be judged by context: completion (neutral) or regret (negative).\n' +
        '2. In colloquial speech, the abbreviated forms "〜ちゃう" and "〜じゃう" are commonly used.\n' +
        '3. The past form "〜てしまった" is often used to express regret or disappointment.'
    },
    relatedContent: [
      {
        id: 'grammar-verb-te-form',
        title: {
          'zh-TW': '動詞て形',
          'en': 'Verb て Form'
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


