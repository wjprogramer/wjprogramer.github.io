// 句型「〜ものの」 - 詳細內容

export const grammarPatternMonoNo = {
  id: 'grammar-pattern-mono-no',
  title: {
    'zh-TW': '句型「〜ものの」',
    'en': 'Pattern "〜ものの"'
  },
  category: {
    type: 'grammar',
    level: 'N2'
  },
  tags: ['grammar'],
  description: {
    'zh-TW': '「〜ものの」表示「雖然...但是...」「儘管...可是...」',
    'en': '"〜ものの" expresses "although...", "even though..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜ものの」接在動詞、形容詞、名詞的普通形後面，表示「雖然...但是...」「儘管...可是...」的意思。用於表達轉折關係，表示「雖然承認前項，但後項與預期相反」。',
      'en':
        '"〜ものの" is attached to the plain form of verbs, adjectives, and nouns to express "although..." or "even though...". Used to express contrast, meaning "although admitting the former, the latter is contrary to expectations".'
    },
    usage: {
      'zh-TW':
        '「〜ものの」的用法：\n' +
        '1. 表示轉折：雖然...但是...（如「行ったものの」）\n' +
        '2. 表示讓步：儘管...可是...（如「難しいものの」）\n' +
        '3. 接續方式：\n' +
        '   - 動詞：普通形＋ものの\n' +
        '   - い形容詞：普通形＋ものの\n' +
        '   - な形容詞：な形容詞＋なものの\n' +
        '   - 名詞：名詞＋であるものの',
      'en':
        'Usage of "〜ものの":\n' +
        '1. Express contrast: although... (e.g., 「行ったものの」)\n' +
        '2. Express concession: even though... (e.g., 「難しいものの」)\n' +
        '3. Conjugation:\n' +
        '   - Verbs: plain form + ものの\n' +
        '   - い-adjectives: plain form + ものの\n' +
        '   - な-adjectives: な-adjective + なものの\n' +
        '   - Nouns: noun + であるものの'
    },
    examples: [
      {
        japanese: '<ruby>行<rt>い</rt></ruby>ったものの、<ruby>時<rt>じ</rt></ruby><ruby>間<rt>かん</rt></ruby>がありませんでした。',
        zhTW: '雖然去了，但是沒有時間。',
        en: 'Although I went, I didn\'t have time.',
        explanation: {
          'zh-TW': '「ものの」表示轉折，「雖然去了，但是沒有時間」。',
          'en': '"ものの" expresses contrast, "although I went, I didn\'t have time".'
        }
      },
      {
        japanese: '<ruby>難<rt>むずか</rt></ruby>しいものの、<ruby>楽<rt>たの</rt></ruby>しいです。',
        zhTW: '雖然困難，但是很有趣。',
        en: 'Although difficult, it is fun.',
        explanation: {
          'zh-TW': '「ものの」表示讓步，「雖然困難，但是有趣」。',
          'en': '"ものの" expresses concession, "although difficult, it is fun".'
        }
      },
      {
        japanese: '<ruby>約<rt>やく</rt></ruby><ruby>束<rt>そく</rt></ruby>したものの、<ruby>忘<rt>わす</rt></ruby>れてしまいました。',
        zhTW: '雖然約好了，但是忘記了。',
        en: 'Although I promised, I forgot.',
        explanation: {
          'zh-TW': '「ものの」表示轉折，「雖然約好了，但是忘記了」。',
          'en': '"ものの" expresses contrast, "although I promised, I forgot".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜ものの」用於表達轉折關係，表示「雖然承認前項，但後項與預期相反」。\n' +
        '2. 「〜ものの」和「〜けれども」的區別：「ものの」語氣更正式，多用於書面語。\n' +
        '3. 「〜ものの」常用於表達與預期相反的情況。',
      'en':
        'Learning tips:\n' +
        '1. "〜ものの" is used to express contrast, meaning "although admitting the former, the latter is contrary to expectations".\n' +
        '2. Difference between "〜ものの" and "〜けれども": "ものの" has a more formal tone, mostly used in written language.\n' +
        '3. "〜ものの" is commonly used to express situations contrary to expectations.'
    },
    relatedContent: [
      {
        id: 'grammar-pattern-noni',
        title: {
          'zh-TW': '句型「〜のに」',
          'en': 'Pattern "〜のに"'
        }
      },
      {
        id: 'grammar-pattern-to-ie',
        title: {
          'zh-TW': '句型「〜とはいえ」',
          'en': 'Pattern "〜とはいえ"'
        }
      }
    ]
  }
};


