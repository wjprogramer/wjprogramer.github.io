// 句型「〜ところ」 - 詳細內容

export const grammarPatternTokoro = {
  id: 'grammar-pattern-tokoro',
  title: {
    'zh-TW': '句型「〜ところ」',
    'en': 'Pattern "〜ところ"'
  },
  category: {
    type: 'grammar',
    level: 'N3'
  },
  tags: ['grammar', 'noun'],
  description: {
    'zh-TW': '「〜ところ」表示「正要...」「正在...」「剛...」',
    'en': '"〜ところ" expresses "about to...", "in the middle of...", "just..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜ところ」接在動詞的不同形式後面，表示動作的時間點或狀態。根據動詞形式的不同，可以表示「正要...」「正在...」「剛...」等不同的時間關係。',
      'en':
        '"〜ところ" is attached to different forms of verbs to express the time point or state of an action. Depending on the verb form, it can express "about to...", "in the middle of...", "just..." and other temporal relationships.'
    },
    usage: {
      'zh-TW':
        '「〜ところ」的用法：\n' +
        '1. 正要：動詞辭書形＋ところだ（如「出かけるところだ」）\n' +
        '2. 正在：動詞ている形＋ところだ（如「食べているところだ」）\n' +
        '3. 剛：動詞た形＋ところだ（如「食べたところだ」）\n' +
        '4. 名詞用法：〜ところ（如「今のところ」）',
      'en':
        'Usage of "〜ところ":\n' +
        '1. About to: verb dictionary form + ところだ (e.g., "出かけるところだ")\n' +
        '2. In the middle of: verb ている form + ところだ (e.g., "食べているところだ")\n' +
        '3. Just: verb た form + ところだ (e.g., "食べたところだ")\n' +
        '4. Noun usage: 〜ところ (e.g., "今のところ")'
    },
    examples: [
      {
        japanese: '<ruby>今<rt>いま</rt></ruby><ruby>出<rt>で</rt></ruby>かけるところです。',
        zhTW: '現在正要出門。',
        en: 'I\'m about to go out now.',
        explanation: {
          'zh-TW': '「出かけるところだ」表示「正要出門」，動作即將開始。',
          'en': '"出かけるところだ" means "about to go out", action is about to start.'
        }
      },
      {
        japanese: '<ruby>食<rt>た</rt></ruby>べているところです。',
        zhTW: '正在吃飯。',
        en: 'I\'m eating right now.',
        explanation: {
          'zh-TW': '「食べているところだ」表示「正在吃飯」，動作正在進行。',
          'en': '"食べているところだ" means "in the middle of eating", action is in progress.'
        }
      },
      {
        japanese: '<ruby>食<rt>た</rt></ruby>べたところです。',
        zhTW: '剛剛才吃過。',
        en: 'I just ate.',
        explanation: {
          'zh-TW': '「食べたところだ」表示「剛剛才吃過」，動作剛完成。',
          'en': '"食べたところだ" means "just ate", action was just completed.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「ところ」根據動詞形式表示不同的時間關係。\n' +
        '2. 辭書形＋ところだ：正要...（動作即將開始）\n' +
        '3. ている形＋ところだ：正在...（動作進行中）\n' +
        '4. た形＋ところだ：剛...（動作剛完成）\n' +
        '5. 與「ばかり」的區別：\n' +
        '   - ところ：強調時間點\n' +
        '   - ばかり：強調「只有這個」',
      'en':
        'Learning tips:\n' +
        '1. "ところ" expresses different temporal relationships depending on verb form.\n' +
        '2. Dictionary form + ところだ: about to... (action is about to start)\n' +
        '3. ている form + ところだ: in the middle of... (action is in progress)\n' +
        '4. た form + ところだ: just... (action was just completed)\n' +
        '5. Difference from "ばかり":\n' +
        '   - ところ: Emphasizes time point\n' +
        '   - ばかり: Emphasizes "only this"'
    }
  }
};

