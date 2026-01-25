// 句型「〜てくれる」 - 詳細內容

export const grammarPatternTeKureru = {
  id: 'grammar-pattern-te-kureru',
  title: {
    'zh-TW': '句型「〜てくれる」',
    'en': 'Pattern "〜てくれる"'
  },
  category: {
    type: 'grammar',
    level: 'N4'
  },
  tags: ['grammar', 'verb'],
  description: {
    'zh-TW': '「〜てくれる」表示「別人為我做...」「別人給我...」',
    'en': '"〜てくれる" expresses "someone does... for me" or "someone gives... to me"'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜てくれる」接在動詞的「て形」後面，表示別人為說話者做某事或給說話者某物。這是日語中表示「別人給予」動作的重要句型，用於表達對他人善意的感謝。',
      'en':
        '"〜てくれる" is attached to the て form of verbs to express that someone does something for the speaker or gives something to the speaker. This is an important pattern for expressing "someone giving" actions in Japanese, used to express gratitude for others\' kindness.'
    },
    usage: {
      'zh-TW':
        '「〜てくれる」的用法：\n' +
        '1. 表示別人為我做：〜てくれる（如「教えてくれる」）\n' +
        '2. 動作執行者用「が」或「は」標示：〜が（は）〜てくれる（如「友達が教えてくれる」）\n' +
        '3. 禮貌形式：〜てくださる（更禮貌）\n' +
        '4. 請求形式：〜てくれますか（可以請你...嗎？）',
      'en':
        'Usage of "〜てくれる":\n' +
        '1. Express someone doing for me: 〜てくれる (e.g., 「教えてくれる」)\n' +
        '2. Actor marked with "が" or "は": 〜が（は）〜てくれる (e.g., 「友達が教えてくれる」)\n' +
        '3. Polite form: 〜てくださる (more polite)\n' +
        '4. Request form: 〜てくれますか (could you...?)'
    },
    examples: [
      {
        japanese: '<ruby>友<rt>とも</rt></ruby>だちが<ruby>本<rt>ほん</rt></ruby>を<ruby>貸<rt>か</rt></ruby>してくれました。',
        zhTW: '朋友借書給我了。',
        en: 'My friend lent me a book.',
        explanation: {
          'zh-TW': '「貸してくれる」表示「別人借給自己」，「友達が」表示動作執行者。',
          'en': '"貸してくれる" means "someone lends to me", "友達が" indicates the actor.'
        }
      },
      {
        japanese: '<ruby>先生<rt>せんせい</rt></ruby>が<ruby>説明<rt>せつめい</rt></ruby>してくださいました。',
        zhTW: '老師為我說明了。',
        en: 'The teacher explained to me.',
        explanation: {
          'zh-TW': '「くださる」是「くれる」的敬語形式，用於對長輩或地位高的人。',
          'en': '"くださる" is the honorific form of "くれる", used for seniors or people of higher status.'
        }
      },
      {
        japanese: '<ruby>手伝<rt>てつだ</rt></ruby>ってくれますか。',
        zhTW: '可以請你幫忙嗎？',
        en: 'Could you help me?',
        explanation: {
          'zh-TW': '「てくれますか」是禮貌的請求形式。',
          'en': '"てくれますか" is a polite request form.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「てくれる」表示別人為說話者做，動作執行者用「が」或「は」標示。\n' +
        '2. 注意禮貌程度：くれる（一般）< くださる（敬語）。\n' +
        '3. 與「てあげる」「てもらう」的區別：\n' +
        '   - てくれる：別人為我做（別人給予）\n' +
        '   - てあげる：我為別人做（我給予）\n' +
        '   - てもらう：我請別人做（我接受）',
      'en':
        'Learning tips:\n' +
        '1. "てくれる" expresses someone doing for the speaker, actor marked with "が" or "は".\n' +
        '2. Note politeness levels: くれる (normal) < くださる (honorific).\n' +
        '3. Difference from "てあげる" and "てもらう":\n' +
        '   - てくれる: Someone does for me\n' +
        '   - てあげる: I do for someone\n' +
        '   - てもらう: I receive someone\'s action'
    }
  }
};

