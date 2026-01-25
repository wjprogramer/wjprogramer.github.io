// 句型「〜ことだ」 - 詳細內容

export const grammarPatternKotoDa = {
  id: 'grammar-pattern-koto-da',
  title: {
    'zh-TW': '句型「〜ことだ」',
    'en': 'Pattern "〜ことだ"'
  },
  category: {
    type: 'grammar',
    level: 'N3'
  },
  tags: ['grammar'],
  description: {
    'zh-TW': '「〜ことだ」表示「應該...」「重要的是...」',
    'en': '"〜ことだ" expresses "should..." or "the important thing is..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜ことだ」接在動詞普通形後面，表示「應該...」「重要的是...」的意思。用於表達建議、忠告，強調「重要的是做...」或「應該做...」。',
      'en':
        '"〜ことだ" is attached to the plain form of verbs to express "should..." or "the important thing is...". Used to express advice, emphasizing "the important thing is to do..." or "should do...".'
    },
    usage: {
      'zh-TW':
        '「〜ことだ」的用法：\n' +
        '1. 表示建議：應該...（如「早く寝ることだ」）\n' +
        '2. 表示忠告：重要的是...（如「毎日勉強することだ」）\n' +
        '3. 與「〜ものだ」的區別：「ことだ」是具體建議，「ものだ」是一般常識',
      'en':
        'Usage of "〜ことだ":\n' +
        '1. Express advice: should... (e.g., 「早く寝ることだ」)\n' +
        '2. Express counsel: the important thing is... (e.g., 「毎日勉強することだ」)\n' +
        '3. Difference from "〜ものだ": "ことだ" is specific advice, "ものだ" is common sense'
    },
    examples: [
      {
        japanese: '<ruby>健<rt>けん</rt></ruby><ruby>康<rt>こう</rt></ruby>のために、<ruby>早<rt>はや</rt></ruby>く<ruby>寝<rt>ね</rt></ruby>ることです。',
        zhTW: '為了健康，應該早點睡。',
        en: 'For health, you should go to bed early.',
        explanation: {
          'zh-TW': '「ことだ」表示建議，「應該早點睡」。',
          'en': '"ことだ" expresses advice, "should go to bed early".'
        }
      },
      {
        japanese: '<ruby>上<rt>じょう</rt></ruby><ruby>達<rt>たつ</rt></ruby>するには、<ruby>毎<rt>まい</rt></ruby><ruby>日<rt>にち</rt></ruby><ruby>勉<rt>べん</rt></ruby><ruby>強<rt>きょう</rt></ruby>することです。',
        zhTW: '要進步，重要的是每天學習。',
        en: 'To improve, the important thing is to study every day.',
        explanation: {
          'zh-TW': '「ことだ」表示忠告，「重要的是每天學習」。',
          'en': '"ことだ" expresses counsel, "the important thing is to study every day".'
        }
      },
      {
        japanese: '<ruby>失<rt>しつ</rt></ruby><ruby>敗<rt>ぱい</rt></ruby>を<ruby>恐<rt>おそ</rt></ruby>れずに<ruby>挑<rt>ちょう</rt></ruby><ruby>戦<rt>せん</rt></ruby>することです。',
        zhTW: '重要的是不要害怕失敗，要挑戰。',
        en: 'The important thing is to challenge without fearing failure.',
        explanation: {
          'zh-TW': '「ことだ」表示忠告，「重要的是要挑戰」。',
          'en': '"ことだ" expresses counsel, "the important thing is to challenge".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜ことだ」用於表達建議、忠告，強調「重要的是做...」或「應該做...」。\n' +
        '2. 「〜ことだ」和「〜ものだ」的區別：「ことだ」是具體建議，「ものだ」是一般常識或感嘆。\n' +
        '3. 「〜ことだ」常用於「〜には、〜ことだ」的句型，表示「要...，重要的是...」。',
      'en':
        'Learning tips:\n' +
        '1. "〜ことだ" is used to express advice and counsel, emphasizing "the important thing is to do..." or "should do...".\n' +
        '2. Difference between "〜ことだ" and "〜ものだ": "ことだ" is specific advice, "ものだ" is common sense or exclamation.\n' +
        '3. "〜ことだ" is commonly used in the pattern "〜には、〜ことだ", meaning "to..., the important thing is...".'
    },
    relatedContent: [
      {
        id: 'grammar-pattern-mono-da',
        title: {
          'zh-TW': '句型「〜ものだ」',
          'en': 'Pattern "〜ものだ"'
        }
      },
      {
        id: 'grammar-pattern-nakereba-naranai',
        title: {
          'zh-TW': '句型「〜なければならない」',
          'en': 'Pattern "〜なければならない"'
        }
      }
    ]
  }
};


