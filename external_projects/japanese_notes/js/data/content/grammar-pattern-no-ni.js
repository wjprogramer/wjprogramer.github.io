// 句型「〜のに」 - 詳細內容

export const grammarPatternNoNi = {
  id: 'grammar-pattern-no-ni',
  title: {
    'zh-TW': '句型「〜のに」',
    'en': 'Pattern "〜のに"'
  },
  category: {
    type: 'grammar',
    level: 'N3'
  },
  tags: ['grammar', 'conjunction'],
  description: {
    'zh-TW': '「〜のに」表示「雖然...但是...」「儘管...卻...」',
    'en': '"〜のに" expresses "although...", "even though...", "despite..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜のに」接在動詞、形容詞的普通形或「名詞＋な」後面，表示「雖然...但是...」「儘管...卻...」。用於表達與預期相反的情況，帶有不滿、遺憾、驚訝等語氣。',
      'en':
        '"〜のに" is attached to the plain form of verbs and adjectives or "noun + な" to express "although...", "even though...", "despite...". Used to express situations contrary to expectations, with tones of dissatisfaction, regret, or surprise.'
    },
    usage: {
      'zh-TW':
        '「〜のに」的用法：\n' +
        '1. 表示轉折：〜のに（如「雨なのに出かける」）\n' +
        '2. 表示不滿：〜のに（如「来たのに会えない」）\n' +
        '3. 表示遺憾：〜のに（如「勉強したのに不合格」）\n' +
        '4. 接續規則：\n' +
        '   - 動詞普通形＋のに\n' +
        '   - い形容詞普通形＋のに\n' +
        '   - な形容詞＋な＋のに\n' +
        '   - 名詞＋な＋のに',
      'en':
        'Usage of "〜のに":\n' +
        '1. Express contrast: 〜のに (e.g., "雨なのに出かける")\n' +
        '2. Express dissatisfaction: 〜のに (e.g., "来たのに会えない")\n' +
        '3. Express regret: 〜のに (e.g., "勉強したのに不合格")\n' +
        '4. Attachment rules:\n' +
        '   - Verb plain form + のに\n' +
        '   - い-adjective plain form + のに\n' +
        '   - な-adjective + な + のに\n' +
        '   - Noun + な + のに'
    },
    examples: [
      {
        japanese: '<ruby>雨<rt>あめ</rt></ruby>なのに<ruby>出<rt>で</rt></ruby>かけます。',
        zhTW: '雖然下雨卻要出門。',
        en: 'Even though it\'s raining, I\'m going out.',
        explanation: {
          'zh-TW': '「雨なのに」表示「雖然下雨」，與預期相反。',
          'en': '"雨なのに" means "even though it\'s raining", contrary to expectations.'
        }
      },
      {
        japanese: '<ruby>来<rt>き</rt></ruby>たのに<ruby>会<rt>あ</rt></ruby>えませんでした。',
        zhTW: '雖然來了卻見不到。',
        en: 'Even though I came, I couldn\'t meet them.',
        explanation: {
          'zh-TW': '「来たのに」表示「雖然來了」，帶有不滿或遺憾的語氣。',
          'en': '"来たのに" means "even though I came", with a tone of dissatisfaction or regret.'
        }
      },
      {
        japanese: '<ruby>勉<rt>べん</rt></ruby><ruby>強<rt>きょう</rt></ruby>したのに<ruby>不<rt>ふ</rt></ruby><ruby>合<rt>ごう</rt></ruby><ruby>格<rt>かく</rt></ruby>でした。',
        zhTW: '雖然努力學習了卻不合格。',
        en: 'Even though I studied hard, I failed.',
        explanation: {
          'zh-TW': '「勉強したのに」表示「雖然努力學習了」，帶有遺憾的語氣。',
          'en': '"勉強したのに" means "even though I studied hard", with a tone of regret.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜のに」表示與預期相反的情況，帶有不滿、遺憾、驚訝等語氣。\n' +
        '2. 與「〜が」「〜けれども」的區別：\n' +
        '   - のに：帶有強烈的不滿、遺憾、驚訝語氣\n' +
        '   - が：單純的轉折\n' +
        '   - けれども：較為客觀的轉折\n' +
        '3. 接續規則：\n' +
        '   - 動詞、い形容詞：直接接「のに」\n' +
        '   - な形容詞、名詞：加「な」再接「のに」',
      'en':
        'Learning tips:\n' +
        '1. "〜のに" expresses situations contrary to expectations, with tones of dissatisfaction, regret, or surprise.\n' +
        '2. Difference from "〜が" and "〜けれども":\n' +
        '   - のに: Strong tone of dissatisfaction, regret, or surprise\n' +
        '   - が: Simple contrast\n' +
        '   - けれども: More objective contrast\n' +
        '3. Attachment rules:\n' +
        '   - Verbs, い-adjectives: directly attach "のに"\n' +
        '   - な-adjectives, nouns: add "な" then "のに"'
    }
  }
};

