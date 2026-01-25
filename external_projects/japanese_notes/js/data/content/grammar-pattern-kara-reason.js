// 句型「〜から」（原因） - 詳細內容

export const grammarPatternKaraReason = {
  id: 'grammar-pattern-kara-reason',
  title: {
    'zh-TW': '句型「〜から」（原因）',
    'en': 'Pattern "〜から" (Reason)'
  },
  category: {
    type: 'grammar',
    level: 'N4'
  },
  tags: ['grammar', 'conjunction'],
  description: {
    'zh-TW': '「〜から」表示「因為...所以...」',
    'en': '"〜から" expresses "because...", "since..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜から」接在動詞、形容詞的普通形或「名詞＋だ」後面，表示「因為...所以...」。用於表達原因、理由。這是日語中表示原因的重要句型之一。',
      'en':
        '"〜から" is attached to the plain form of verbs and adjectives or "noun + だ" to express "because...", "since...". Used to express reasons or causes. This is one of the important patterns for expressing reasons in Japanese.'
    },
    usage: {
      'zh-TW':
        '「〜から」的用法：\n' +
        '1. 表示原因：〜から（如「雨だから出かけない」）\n' +
        '2. 表示理由：〜から（如「疲れたから休む」）\n' +
        '3. 接續規則：\n' +
        '   - 動詞普通形＋から\n' +
        '   - い形容詞普通形＋から\n' +
        '   - な形容詞＋だ＋から\n' +
        '   - 名詞＋だ＋から',
      'en':
        'Usage of "〜から":\n' +
        '1. Express reason: 〜から (e.g., "雨だから出かけない")\n' +
        '2. Express cause: 〜から (e.g., "疲れたから休む")\n' +
        '3. Attachment rules:\n' +
        '   - Verb plain form + から\n' +
        '   - い-adjective plain form + から\n' +
        '   - な-adjective + だ + から\n' +
        '   - Noun + だ + から'
    },
    examples: [
      {
        japanese: '<ruby>雨<rt>あめ</rt></ruby>だから<ruby>出<rt>で</rt></ruby>かけません。',
        zhTW: '因為下雨所以不出門。',
        en: 'Because it\'s raining, I won\'t go out.',
        explanation: {
          'zh-TW': '「雨だから」表示「因為下雨」，「だから」是「だ＋から」的連用形。',
          'en': '"雨だから" means "because it\'s raining", "だから" is the combined form of "だ + から".'
        }
      },
      {
        japanese: '<ruby>疲<rt>つか</rt></ruby>れたから<ruby>休<rt>やす</rt></ruby>みます。',
        zhTW: '因為累了所以休息。',
        en: 'Because I\'m tired, I will rest.',
        explanation: {
          'zh-TW': '「疲れたから」表示「因為累了」，動詞た形接から。',
          'en': '"疲れたから" means "because I\'m tired", verb た form + から.'
        }
      },
      {
        japanese: '<ruby>時<rt>じ</rt></ruby><ruby>間<rt>かん</rt></ruby>がないから<ruby>急<rt>いそ</rt></ruby>ぎます。',
        zhTW: '因為沒有時間所以趕快。',
        en: 'Because I don\'t have time, I will hurry.',
        explanation: {
          'zh-TW': '「時間がないから」表示「因為沒有時間」。',
          'en': '"時間がないから" means "because I don\'t have time".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜から」用於表達原因、理由，可以放在句首或句中。\n' +
        '2. 與「〜ので」的區別：\n' +
        '   - から：主觀原因，語氣較強，可以用於命令、請求\n' +
        '   - ので：客觀原因，語氣較弱，較為禮貌\n' +
        '3. 接續規則：\n' +
        '   - 動詞、い形容詞：直接接「から」\n' +
        '   - な形容詞、名詞：加「だ」再接「から」',
      'en':
        'Learning tips:\n' +
        '1. "〜から" is used to express reasons or causes, can be placed at the beginning or middle of a sentence.\n' +
        '2. Difference from "〜ので":\n' +
        '   - から: Subjective reason, stronger tone, can be used for commands or requests\n' +
        '   - ので: Objective reason, weaker tone, more polite\n' +
        '3. Attachment rules:\n' +
        '   - Verbs, い-adjectives: directly attach "から"\n' +
        '   - な-adjectives, nouns: add "だ" then "から"'
    }
  }
};

