// 句型「〜のに」 - 詳細內容

export const grammarPatternNoni = {
  id: 'grammar-pattern-noni',
  title: {
    'zh-TW': '句型「〜のに」',
    'en': 'Pattern "〜のに"'
  },
  category: {
    type: 'grammar',
    level: 'N4'
  },
  tags: ['grammar'],
  description: {
    'zh-TW': '「〜のに」表示「雖然...但是...」「明明...卻...」，帶有遺憾或意外',
    'en': '"〜のに" expresses "although...but..." or "even though...", with a tone of regret or surprise'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜のに」接在動詞、形容詞、名詞後面，表示逆接關係，意思是「雖然...但是...」「明明...卻...」。與「〜が」「〜けど」不同，「〜のに」帶有遺憾、意外或不滿的感情色彩。',
      'en':
        '"〜のに" is attached to verbs, adjectives, or nouns to express contrast, meaning "although...but..." or "even though...". Different from "〜が" or "〜けど", "〜のに" carries a tone of regret, surprise, or dissatisfaction.'
    },
    usage: {
      'zh-TW':
        '「〜のに」的用法：\n' +
        '1. 表示逆接：雖然...但是...（如「雨なのに出かける」）\n' +
        '2. 表示遺憾：明明...卻...（如「勉強したのに失敗した」）\n' +
        '3. 接續方式：\n' +
        '   - 動詞：普通形＋のに\n' +
        '   - い形容詞：普通形＋のに\n' +
        '   - な形容詞：な形容詞＋なのに\n' +
        '   - 名詞：名詞＋なのに',
      'en':
        'Usage of "〜のに":\n' +
        '1. Express contrast: although...but... (e.g., 「雨なのに出かける」)\n' +
        '2. Express regret: even though...but... (e.g., 「勉強したのに失敗した」)\n' +
        '3. Conjugation:\n' +
        '   - Verbs: plain form + のに\n' +
        '   - い-adjectives: plain form + のに\n' +
        '   - な-adjectives: な-adjective + なのに\n' +
        '   - Nouns: noun + なのに'
    },
    examples: [
      {
        japanese: '<ruby>雨<rt>あめ</rt></ruby>なのに<ruby>出<rt>で</rt></ruby>かけます。',
        zhTW: '雖然下雨但還是出門。',
        en: 'Even though it\'s raining, I go out.',
        explanation: {
          'zh-TW': '「のに」表示逆接，「雖然下雨但是出門」。',
          'en': '"のに" expresses contrast, "although raining, go out".'
        }
      },
      {
        japanese: '<ruby>勉<rt>べん</rt></ruby><ruby>強<rt>きょう</rt></ruby>したのに<ruby>失<rt>しつ</rt></ruby><ruby>敗<rt>はい</rt></ruby>しました。',
        zhTW: '明明學習了卻失敗了。',
        en: 'Even though I studied, I failed.',
        explanation: {
          'zh-TW': '「のに」表示遺憾，「明明學習了卻失敗了」。',
          'en': '"のに" expresses regret, "even though studied, failed".'
        }
      },
      {
        japanese: '<ruby>若<rt>わか</rt></ruby>いのに<ruby>経<rt>けい</rt></ruby><ruby>験<rt>けん</rt></ruby>があります。',
        zhTW: '雖然年輕但有經驗。',
        en: 'Although young, I have experience.',
        explanation: {
          'zh-TW': '「のに」接在い形容詞後面，表示逆接。',
          'en': '"のに" is attached to an い-adjective, expressing contrast.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜のに」帶有遺憾、意外或不滿的感情色彩，與「〜が」「〜けど」不同。\n' +
        '2. 注意接續方式：動詞和い形容詞用普通形，な形容詞和名詞需要加「な」。\n' +
        '3. 「〜のに」常用於表達與預期不符的情況，帶有「明明...卻...」的語氣。',
      'en':
        'Learning tips:\n' +
        '1. "〜のに" carries a tone of regret, surprise, or dissatisfaction, different from "〜が" or "〜けど".\n' +
        '2. Note the conjugation: verbs and い-adjectives use plain form, な-adjectives and nouns need "な".\n' +
        '3. "〜のに" is often used to express situations that don\'t match expectations, with a tone of "even though...but...".'
    },
    relatedContent: [
      {
        id: 'grammar-pattern-nagara',
        title: {
          'zh-TW': '句型「〜ながら」',
          'en': 'Pattern "〜ながら"'
        }
      },
      {
        id: 'grammar-particles-ga',
        title: {
          'zh-TW': '助詞「が」',
          'en': 'Particle "が"'
        }
      }
    ]
  }
};


