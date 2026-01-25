// 句型「〜ものだ」 - 詳細內容

export const grammarPatternMonoDa = {
  id: 'grammar-pattern-mono-da',
  title: {
    'zh-TW': '句型「〜ものだ」',
    'en': 'Pattern "〜ものだ"'
  },
  category: {
    type: 'grammar',
    level: 'N3'
  },
  tags: ['grammar'],
  description: {
    'zh-TW': '「〜ものだ」表示「應該...」「本來就...」「真是...」',
    'en': '"〜ものだ" expresses "should...", "naturally...", or "how...it is"'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜ものだ」接在動詞、形容詞、名詞的普通形後面，表示「應該...」「本來就...」「真是...」的意思。用於表達一般常識、感嘆、回憶等不同的含義。',
      'en':
        '"〜ものだ" is attached to the plain form of verbs, adjectives, and nouns to express "should...", "naturally...", or "how...it is". Used to express common sense, exclamation, recollection, etc.'
    },
    usage: {
      'zh-TW':
        '「〜ものだ」的用法：\n' +
        '1. 表示應該：應該...（如「勉強するものだ」）\n' +
        '2. 表示感嘆：真是...（如「美しいものだ」）\n' +
        '3. 表示回憶：以前總是...（如「よく遊んだものだ」）\n' +
        '4. 接續方式：\n' +
        '   - 動詞：普通形＋ものだ\n' +
        '   - い形容詞：普通形＋ものだ\n' +
        '   - な形容詞：な形容詞＋なものだ\n' +
        '   - 名詞：名詞＋なものだ',
      'en':
        'Usage of "〜ものだ":\n' +
        '1. Express "should": should... (e.g., 「勉強するものだ」)\n' +
        '2. Express exclamation: how...it is (e.g., 「美しいものだ」)\n' +
        '3. Express recollection: used to... (e.g., 「よく遊んだものだ」)\n' +
        '4. Conjugation:\n' +
        '   - Verbs: plain form + ものだ\n' +
        '   - い-adjectives: plain form + ものだ\n' +
        '   - な-adjectives: な-adjective + なものだ\n' +
        '   - Nouns: noun + なものだ'
    },
    examples: [
      {
        japanese: '<ruby>学<rt>がく</rt></ruby><ruby>生<rt>せい</rt></ruby>は<ruby>勉<rt>べん</rt></ruby><ruby>強<rt>きょう</rt></ruby>するものです。',
        zhTW: '學生應該學習。',
        en: 'Students should study.',
        explanation: {
          'zh-TW': '「ものだ」表示應該，「學生應該學習」。',
          'en': '"ものだ" expresses "should", "students should study".'
        }
      },
      {
        japanese: '<ruby>時<rt>とき</rt></ruby>の<ruby>経<rt>た</rt></ruby>つのは<ruby>早<rt>はや</rt></ruby>いものです。',
        zhTW: '時間過得真快。',
        en: 'How fast time passes.',
        explanation: {
          'zh-TW': '「ものだ」表示感嘆，「時間過得真快」。',
          'en': '"ものだ" expresses exclamation, "how fast time passes".'
        }
      },
      {
        japanese: '<ruby>小<rt>しょう</rt></ruby><ruby>時<rt>じ</rt></ruby>は<ruby>よく<rt>よく</rt></ruby><ruby>遊<rt>あそ</rt></ruby>んだものです。',
        zhTW: '小時候經常玩。',
        en: 'I used to play often when I was a child.',
        explanation: {
          'zh-TW': '「ものだ」表示回憶，「以前經常玩」。',
          'en': '"ものだ" expresses recollection, "used to play often".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜ものだ」有多種用法：表示應該、感嘆、回憶等，需要根據上下文判斷。\n' +
        '2. 「〜ものだ」和「〜はずだ」的區別：「ものだ」表示一般常識或感嘆，「はずだ」表示邏輯推測。\n' +
        '3. 「〜ものだ」用於回憶時，常與「よく」「いつも」等副詞一起使用。',
      'en':
        'Learning tips:\n' +
        '1. "〜ものだ" has multiple uses: expressing "should", exclamation, recollection, etc., which need to be judged by context.\n' +
        '2. Difference between "〜ものだ" and "〜はずだ": "ものだ" expresses common sense or exclamation, "はずだ" expresses logical inference.\n' +
        '3. When "〜ものだ" is used for recollection, it is often used with adverbs like "よく", "いつも".'
    },
    relatedContent: [
      {
        id: 'grammar-pattern-hazu-da',
        title: {
          'zh-TW': '句型「〜はずだ」',
          'en': 'Pattern "〜はずだ"'
        }
      },
      {
        id: 'grammar-pattern-koto-da',
        title: {
          'zh-TW': '句型「〜ことだ」',
          'en': 'Pattern "〜ことだ"'
        }
      }
    ]
  }
};


