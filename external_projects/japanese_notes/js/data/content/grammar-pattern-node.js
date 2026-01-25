// 句型「〜ので」 - 詳細內容

export const grammarPatternNode = {
  id: 'grammar-pattern-node',
  title: {
    'zh-TW': '句型「〜ので」',
    'en': 'Pattern "〜ので"'
  },
  category: {
    type: 'grammar',
    level: 'N4'
  },
  tags: ['grammar', 'conjunction'],
  description: {
    'zh-TW': '「〜ので」表示「因為...所以...」',
    'en': '"〜ので" expresses "because...", "since..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜ので」接在動詞、形容詞的普通形或「名詞＋な」後面，表示「因為...所以...」。用於表達客觀的原因、理由。語氣比「から」更為禮貌、客觀。',
      'en':
        '"〜ので" is attached to the plain form of verbs and adjectives or "noun + な" to express "because...", "since...". Used to express objective reasons or causes. The tone is more polite and objective than "から".'
    },
    usage: {
      'zh-TW':
        '「〜ので」的用法：\n' +
        '1. 表示客觀原因：〜ので（如「雨なので出かけない」）\n' +
        '2. 表示理由：〜ので（如「疲れたので休む」）\n' +
        '3. 接續規則：\n' +
        '   - 動詞普通形＋ので\n' +
        '   - い形容詞普通形＋ので\n' +
        '   - な形容詞＋な＋ので\n' +
        '   - 名詞＋な＋ので',
      'en':
        'Usage of "〜ので":\n' +
        '1. Express objective reason: 〜ので (e.g., "雨なので出かけない")\n' +
        '2. Express cause: 〜ので (e.g., "疲れたので休む")\n' +
        '3. Attachment rules:\n' +
        '   - Verb plain form + ので\n' +
        '   - い-adjective plain form + ので\n' +
        '   - な-adjective + な + ので\n' +
        '   - Noun + な + ので'
    },
    examples: [
      {
        japanese: '<ruby>雨<rt>あめ</rt></ruby>なので<ruby>出<rt>で</rt></ruby>かけません。',
        zhTW: '因為下雨所以不出門。',
        en: 'Because it\'s raining, I won\'t go out.',
        explanation: {
          'zh-TW': '「雨なので」表示「因為下雨」，「なので」是「な＋ので」的連用形，語氣較為客觀、禮貌。',
          'en': '"雨なので" means "because it\'s raining", "なので" is the combined form of "な + ので", tone is more objective and polite.'
        }
      },
      {
        japanese: '<ruby>疲<rt>つか</rt></ruby>れたので<ruby>休<rt>やす</rt></ruby>みます。',
        zhTW: '因為累了所以休息。',
        en: 'Because I\'m tired, I will rest.',
        explanation: {
          'zh-TW': '「疲れたので」表示「因為累了」，語氣較為客觀。',
          'en': '"疲れたので" means "because I\'m tired", tone is more objective.'
        }
      },
      {
        japanese: '<ruby>時<rt>じ</rt></ruby><ruby>間<rt>かん</rt></ruby>がないので<ruby>失<rt>しつ</rt></ruby><ruby>礼<rt>れい</rt></ruby>します。',
        zhTW: '因為沒有時間所以先告辭了。',
        en: 'Because I don\'t have time, I will take my leave.',
        explanation: {
          'zh-TW': '「時間がないので」表示「因為沒有時間」，用於禮貌地說明理由。',
          'en': '"時間がないので" means "because I don\'t have time", used to politely explain a reason.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜ので」用於表達客觀的原因、理由，語氣比「から」更為禮貌。\n' +
        '2. 與「〜から」的區別：\n' +
        '   - ので：客觀原因，語氣較弱，較為禮貌，不常用於命令\n' +
        '   - から：主觀原因，語氣較強，可以用於命令、請求\n' +
        '3. 接續規則：\n' +
        '   - 動詞、い形容詞：直接接「ので」\n' +
        '   - な形容詞、名詞：加「な」再接「ので」',
      'en':
        'Learning tips:\n' +
        '1. "〜ので" is used to express objective reasons or causes, tone is more polite than "から".\n' +
        '2. Difference from "〜から":\n' +
        '   - ので: Objective reason, weaker tone, more polite, not commonly used for commands\n' +
        '   - から: Subjective reason, stronger tone, can be used for commands or requests\n' +
        '3. Attachment rules:\n' +
        '   - Verbs, い-adjectives: directly attach "ので"\n' +
        '   - な-adjectives, nouns: add "な" then "ので"'
    }
  }
};

