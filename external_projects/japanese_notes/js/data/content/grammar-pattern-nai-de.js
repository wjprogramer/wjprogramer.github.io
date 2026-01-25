// 句型「〜ないで」 - 詳細內容

export const grammarPatternNaiDe = {
  id: 'grammar-pattern-nai-de',
  title: {
    'zh-TW': '句型「〜ないで」',
    'en': 'Pattern "〜ないで"'
  },
  category: {
    type: 'grammar',
    level: 'N4'
  },
  tags: ['grammar', 'conjunction'],
  description: {
    'zh-TW': '「〜ないで」表示「不要...」「在不...的情況下」',
    'en': '"〜ないで" expresses "without doing...", "don\'t..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜ないで」接在動詞的「ない形」後面，表示「不要...」「在不...的情況下」。用於表達「不要做...就...」或「在不做...的情況下做...」。',
      'en':
        '"〜ないで" is attached to the ない form of verbs to express "without doing...", "don\'t...". Used to express "do... without doing..." or "do... in a state of not doing...".'
    },
    usage: {
      'zh-TW':
        '「〜ないで」的用法：\n' +
        '1. 表示不要：〜ないで（如「行かないで」）\n' +
        '2. 表示在不...的情況下：〜ないで（如「食べないで寝る」）\n' +
        '3. 接續規則：動詞ない形＋ないで\n' +
        '4. 禮貌形式：〜ないでください（請不要...）',
      'en':
        'Usage of "〜ないで":\n' +
        '1. Express don\'t: 〜ないで (e.g., "行かないで")\n' +
        '2. Express without doing: 〜ないで (e.g., "食べないで寝る")\n' +
        '3. Attachment rules: verb ない form + ないで\n' +
        '4. Polite form: 〜ないでください (please don\'t...)'
    },
    examples: [
      {
        japanese: '<ruby>行<rt>い</rt></ruby>かないでください。',
        zhTW: '請不要去。',
        en: 'Please don\'t go.',
        explanation: {
          'zh-TW': '「行かないでください」表示「請不要去」，禮貌的禁止表達。',
          'en': '"行かないでください" means "please don\'t go", polite prohibition expression.'
        }
      },
      {
        japanese: '<ruby>食<rt>た</rt></ruby>べないで<ruby>寝<rt>ね</rt></ruby>ました。',
        zhTW: '沒吃就睡了。',
        en: 'I went to bed without eating.',
        explanation: {
          'zh-TW': '「食べないで寝る」表示「沒吃就睡」，在不...的情況下。',
          'en': '"食べないで寝る" means "go to bed without eating", without doing...'
        }
      },
      {
        japanese: '<ruby>言<rt>い</rt></ruby>わないで。',
        zhTW: '不要說。',
        en: 'Don\'t say it.',
        explanation: {
          'zh-TW': '「言わないで」表示「不要說」，口語表達。',
          'en': '"言わないで" means "don\'t say it", casual expression.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜ないで」用於表達「不要...」或「在不...的情況下」。\n' +
        '2. 與「〜なくて」的區別：\n' +
        '   - ないで：不要...（命令、請求）\n' +
        '   - なくて：不...（原因、狀態）\n' +
        '3. 接續規則：動詞ない形＋ないで\n' +
        '4. 禮貌形式：〜ないでください',
      'en':
        'Learning tips:\n' +
        '1. "〜ないで" is used to express "don\'t..." or "without doing...".\n' +
        '2. Difference from "〜なくて":\n' +
        '   - ないで: Don\'t... (command, request)\n' +
        '   - なくて: Not... (reason, state)\n' +
        '3. Attachment rules: verb ない form + ないで\n' +
        '4. Polite form: 〜ないでください'
    }
  }
};

