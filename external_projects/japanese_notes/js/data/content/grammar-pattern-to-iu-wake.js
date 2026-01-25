// 句型「〜というわけだ」 - 詳細內容

export const grammarPatternToIuWake = {
  id: 'grammar-pattern-to-iu-wake',
  title: {
    'zh-TW': '句型「〜というわけだ」',
    'en': 'Pattern "〜というわけだ"'
  },
  category: {
    type: 'grammar',
    level: 'N2'
  },
  tags: ['grammar'],
  description: {
    'zh-TW': '「〜というわけだ」表示「也就是說...」「意思是...」',
    'en': '"〜というわけだ" expresses "that is to say...", "meaning..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜というわけだ」接在名詞、動詞、形容詞的普通形後面，表示「也就是說...」「意思是...」的意思。用於解釋、說明情況，表示「換句話說就是...」。',
      'en':
        '"〜というわけだ" is attached to the plain form of nouns, verbs, and adjectives to express "that is to say..." or "meaning...". Used to explain or clarify situations, meaning "in other words...".'
    },
    usage: {
      'zh-TW':
        '「〜というわけだ」的用法：\n' +
        '1. 表示解釋：也就是說...（如「つまり、そういうわけだ」）\n' +
        '2. 表示說明：意思是...（如「つまり、こういうわけだ」）\n' +
        '3. 接續方式：\n' +
        '   - 名詞：名詞＋というわけだ\n' +
        '   - 動詞：普通形＋というわけだ\n' +
        '   - い形容詞：普通形＋というわけだ\n' +
        '   - な形容詞：な形容詞＋というわけだ',
      'en':
        'Usage of "〜というわけだ":\n' +
        '1. Express explanation: that is to say... (e.g., 「つまり、そういうわけだ」)\n' +
        '2. Express clarification: meaning... (e.g., 「つまり、こういうわけだ」)\n' +
        '3. Conjugation:\n' +
        '   - Nouns: noun + というわけだ\n' +
        '   - Verbs: plain form + というわけだ\n' +
        '   - い-adjectives: plain form + というわけだ\n' +
        '   - な-adjectives: な-adjective + というわけだ'
    },
    examples: [
      {
        japanese: '<ruby>一<rt>いち</rt></ruby><ruby>日<rt>にち</rt></ruby><ruby>中<rt>じゅう</rt></ruby><ruby>働<rt>はたら</rt></ruby>いたから、<ruby>疲<rt>つか</rt></ruby>れているというわけです。',
        zhTW: '因為工作了一整天，也就是說累了。',
        en: 'Since I worked all day, that is to say, I am tired.',
        explanation: {
          'zh-TW': '「というわけだ」表示解釋，「也就是說累了」。',
          'en': '"というわけだ" expresses explanation, "that is to say, I am tired".'
        }
      },
      {
        japanese: '<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>っているから、<ruby>出<rt>で</rt></ruby>かけるのを<ruby>止<rt>や</rt></ruby>めるというわけです。',
        zhTW: '因為在下雨，也就是說要取消出門。',
        en: 'Since it is raining, that is to say, we will cancel going out.',
        explanation: {
          'zh-TW': '「というわけだ」表示說明，「也就是說要取消出門」。',
          'en': '"というわけだ" expresses clarification, "that is to say, we will cancel going out".'
        }
      },
      {
        japanese: '<ruby>時<rt>じ</rt></ruby><ruby>間<rt>かん</rt></ruby>がないから、<ruby>行<rt>い</rt></ruby>けないというわけです。',
        zhTW: '因為沒有時間，也就是說不能去。',
        en: 'Since there is no time, that is to say, I cannot go.',
        explanation: {
          'zh-TW': '「というわけだ」表示解釋，「也就是說不能去」。',
          'en': '"というわけだ" expresses explanation, "that is to say, I cannot go".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜というわけだ」用於解釋、說明情況，表示「換句話說就是...」。\n' +
        '2. 「〜というわけだ」和「〜わけだ」的區別：「というわけだ」語氣更正式，多用於書面語。\n' +
        '3. 「〜というわけだ」常與「つまり」一起使用，表示「也就是說」。',
      'en':
        'Learning tips:\n' +
        '1. "〜というわけだ" is used to explain or clarify situations, meaning "in other words...".\n' +
        '2. Difference between "〜というわけだ" and "〜わけだ": "というわけだ" has a more formal tone, mostly used in written language.\n' +
        '3. "〜というわけだ" is often used with "つまり", meaning "that is to say".'
    },
    relatedContent: [
      {
        id: 'grammar-pattern-wake-da',
        title: {
          'zh-TW': '句型「〜わけだ」',
          'en': 'Pattern "〜わけだ"'
        }
      },
      {
        id: 'grammar-pattern-hazu-da',
        title: {
          'zh-TW': '句型「〜はずだ」',
          'en': 'Pattern "〜はずだ"'
        }
      }
    ]
  }
};


