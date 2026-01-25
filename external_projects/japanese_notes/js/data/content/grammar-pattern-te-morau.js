// 句型「〜てもらう」 - 詳細內容

export const grammarPatternTeMorau = {
  id: 'grammar-pattern-te-morau',
  title: {
    'zh-TW': '句型「〜てもらう」',
    'en': 'Pattern "〜てもらう"'
  },
  category: {
    type: 'grammar',
    level: 'N4'
  },
  tags: ['grammar', 'verb'],
  description: {
    'zh-TW': '「〜てもらう」表示「請別人做...」「得到別人的幫助」',
    'en': '"〜てもらう" expresses "receive someone\'s action" or "get someone to do..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜てもらう」接在動詞的「て形」後面，表示說話者請別人做某事或得到別人的幫助。這是日語中表示「接受」動作的重要句型，用於表達從他人那裡得到好處。',
      'en':
        '"〜てもらう" is attached to the て form of verbs to express that the speaker receives someone\'s action or gets someone to do something. This is an important pattern for expressing "receiving" actions in Japanese, used to express receiving benefits from others.'
    },
    usage: {
      'zh-TW':
        '「〜てもらう」的用法：\n' +
        '1. 表示請別人做：〜てもらう（如「教えてもらう」）\n' +
        '2. 動作執行者用「に」或「から」標示：〜に（から）〜てもらう（如「友達に教えてもらう」）\n' +
        '3. 禮貌形式：〜ていただく（更禮貌）\n' +
        '4. 請求形式：〜てもらえますか（可以請你...嗎？）',
      'en':
        'Usage of "〜てもらう":\n' +
        '1. Express receiving action: 〜てもらう (e.g., 「教えてもらう」)\n' +
        '2. Actor marked with "に" or "から": 〜に（から）〜てもらう (e.g., 「友達に教えてもらう」)\n' +
        '3. Polite form: 〜ていただく (more polite)\n' +
        '4. Request form: 〜てもらえますか (could you...?)'
    },
    examples: [
      {
        japanese: '<ruby>友<rt>とも</rt></ruby>だちに<ruby>本<rt>ほん</rt></ruby>を<ruby>貸<rt>か</rt></ruby>してもらいました。',
        zhTW: '我請朋友借書給我。',
        en: 'I had my friend lend me a book.',
        explanation: {
          'zh-TW': '「貸してもらう」表示「請別人借給自己」，「友達に」表示動作執行者。',
          'en': '"貸してもらう" means "receive someone lending", "友達に" indicates the actor.'
        }
      },
      {
        japanese: '<ruby>先生<rt>せんせい</rt></ruby>に<ruby>説明<rt>せつめい</rt></ruby>していただきました。',
        zhTW: '我請老師說明了。',
        en: 'I received an explanation from the teacher.',
        explanation: {
          'zh-TW': '「いただく」是「もらう」的敬語形式，用於對長輩或地位高的人。',
          'en': '"いただく" is the honorific form of "もらう", used for seniors or people of higher status.'
        }
      },
      {
        japanese: '<ruby>手伝<rt>てつだ</rt></ruby>ってもらえますか。',
        zhTW: '可以請你幫忙嗎？',
        en: 'Could you help me?',
        explanation: {
          'zh-TW': '「てもらえますか」是禮貌的請求形式。',
          'en': '"てもらえますか" is a polite request form.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「てもらう」表示說話者接受別人的動作，動作執行者用「に」或「から」標示。\n' +
        '2. 注意禮貌程度：もらう（一般）< いただく（敬語）。\n' +
        '3. 與「てあげる」「てくれる」的區別：\n' +
        '   - てもらう：我請別人做（我接受）\n' +
        '   - てあげる：我為別人做（我給予）\n' +
        '   - てくれる：別人為我做（別人給予）',
      'en':
        'Learning tips:\n' +
        '1. "てもらう" expresses the speaker receiving someone\'s action, actor marked with "に" or "から".\n' +
        '2. Note politeness levels: もらう (normal) < いただく (honorific).\n' +
        '3. Difference from "てあげる" and "てくれる":\n' +
        '   - てもらう: I receive someone\'s action\n' +
        '   - てあげる: I do for someone\n' +
        '   - てくれる: Someone does for me'
    }
  }
};

