// 句型「〜てあげる」 - 詳細內容

export const grammarPatternTeAgeru = {
  id: 'grammar-pattern-te-ageru',
  title: {
    'zh-TW': '句型「〜てあげる」',
    'en': 'Pattern "〜てあげる"'
  },
  category: {
    type: 'grammar',
    level: 'N4'
  },
  tags: ['grammar', 'verb'],
  description: {
    'zh-TW': '「〜てあげる」表示「為別人做...」「給別人...」',
    'en': '"〜てあげる" expresses "do... for someone" or "give... to someone"'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜てあげる」接在動詞的「て形」後面，表示說話者為別人做某事或給別人某物。這是日語中表示「給予」動作的重要句型，用於表達對他人的善意行為。',
      'en':
        '"〜てあげる" is attached to the て form of verbs to express that the speaker does something for someone or gives something to someone. This is an important pattern for expressing "giving" actions in Japanese, used to express kind acts toward others.'
    },
    usage: {
      'zh-TW':
        '「〜てあげる」的用法：\n' +
        '1. 表示為別人做：〜てあげる（如「教えてあげる」）\n' +
        '2. 接受者用「に」標示：〜に〜てあげる（如「友達に教えてあげる」）\n' +
        '3. 禮貌形式：〜てさしあげる（更禮貌）\n' +
        '4. 口語形式：〜てやる（對晚輩或親近的人）',
      'en':
        'Usage of "〜てあげる":\n' +
        '1. Express doing for someone: 〜てあげる (e.g., 「教えてあげる」)\n' +
        '2. Recipient marked with "に": 〜に〜てあげる (e.g., 「友達に教えてあげる」)\n' +
        '3. Polite form: 〜てさしあげる (more polite)\n' +
        '4. Casual form: 〜てやる (for juniors or close people)'
    },
    examples: [
      {
        japanese: '<ruby>私<rt>わたし</rt></ruby>は<ruby>友<rt>とも</rt></ruby>だちに<ruby>本<rt>ほん</rt></ruby>を<ruby>貸<rt>か</rt></ruby>してあげました。',
        zhTW: '我借書給朋友了。',
        en: 'I lent a book to my friend.',
        explanation: {
          'zh-TW': '「貸してあげる」表示「借給別人」，「友達に」表示接受者。',
          'en': '"貸してあげる" means "lend to someone", "友達に" indicates the recipient.'
        }
      },
      {
        japanese: '<ruby>母<rt>はは</rt></ruby>に<ruby>手紙<rt>てがみ</rt></ruby>を<ruby>書<rt>か</rt></ruby>いてあげます。',
        zhTW: '我寫信給媽媽。',
        en: 'I will write a letter to my mother.',
        explanation: {
          'zh-TW': '「書いてあげる」表示「為別人寫」。',
          'en': '"書いてあげる" means "write for someone".'
        }
      },
      {
        japanese: '<ruby>先生<rt>せんせい</rt></ruby>に<ruby>説明<rt>せつめい</rt></ruby>してさしあげました。',
        zhTW: '我向老師說明了。',
        en: 'I explained to the teacher.',
        explanation: {
          'zh-TW': '「さしあげる」是「あげる」的敬語形式，用於對長輩或地位高的人。',
          'en': '"さしあげる" is the honorific form of "あげる", used for seniors or people of higher status.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「てあげる」表示說話者為別人做，接受者用「に」標示。\n' +
        '2. 注意禮貌程度：あげる（一般）< さしあげる（敬語）> やる（口語）。\n' +
        '3. 與「てもらう」「てくれる」的區別：\n' +
        '   - てあげる：我為別人做\n' +
        '   - てもらう：我請別人做\n' +
        '   - てくれる：別人為我做',
      'en':
        'Learning tips:\n' +
        '1. "てあげる" expresses the speaker doing for someone, recipient marked with "に".\n' +
        '2. Note politeness levels: あげる (normal) < さしあげる (honorific) > やる (casual).\n' +
        '3. Difference from "てもらう" and "てくれる":\n' +
        '   - てあげる: I do for someone\n' +
        '   - てもらう: I receive someone\'s action\n' +
        '   - てくれる: Someone does for me'
    }
  }
};

