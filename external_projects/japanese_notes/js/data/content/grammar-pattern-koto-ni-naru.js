// 句型「〜ことになる」 - 詳細內容

export const grammarPatternKotoNiNaru = {
  id: 'grammar-pattern-koto-ni-naru',
  title: {
    'zh-TW': '句型「〜ことになる」',
    'en': 'Pattern "〜ことになる"'
  },
  category: {
    type: 'grammar',
    level: 'N3'
  },
  tags: ['grammar'],
  description: {
    'zh-TW': '「〜ことになる」表示「決定...」「結果是...」，表示客觀決定或自然結果',
    'en': '"〜ことになる" expresses "it is decided that..." or "it turns out that...", indicating an objective decision or natural result'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜ことになる」接在動詞普通形後面，表示「決定...」「結果是...」的意思。與「〜ことにする」不同，「〜ことになる」表示客觀決定或自然結果，不是主觀決定。',
      'en':
        '"〜ことになる" is attached to the plain form of verbs to express "it is decided that..." or "it turns out that...". Different from "〜ことにする", "〜ことになる" expresses an objective decision or natural result, not a subjective decision.'
    },
    usage: {
      'zh-TW':
        '「〜ことになる」的用法：\n' +
        '1. 表示客觀決定：決定...（如「来月日本に行くことになる」）\n' +
        '2. 表示自然結果：結果是...（如「雨が降ることになる」）\n' +
        '3. 與「〜ことにする」的區別：「ことになる」是客觀決定，「ことにする」是主觀決定',
      'en':
        'Usage of "〜ことになる":\n' +
        '1. Express objective decision: it is decided that... (e.g., 「来月日本に行くことになる」)\n' +
        '2. Express natural result: it turns out that... (e.g., 「雨が降ることになる」)\n' +
        '3. Difference from "〜ことにする": "ことになる" is objective decision, "ことにする" is subjective decision'
    },
    examples: [
      {
        japanese: '<ruby>来<rt>らい</rt></ruby><ruby>月<rt>げつ</rt></ruby><ruby>日<rt>に</rt></ruby><ruby>本<rt>ほん</rt></ruby>に<ruby>行<rt>い</rt></ruby>くことになります。',
        zhTW: '決定下個月去日本。',
        en: 'It is decided that I will go to Japan next month.',
        explanation: {
          'zh-TW': '「ことになる」表示客觀決定，「決定去日本」。',
          'en': '"ことになる" expresses an objective decision, "it is decided to go to Japan".'
        }
      },
      {
        japanese: '<ruby>会<rt>かい</rt></ruby><ruby>議<rt>ぎ</rt></ruby>は<ruby>来<rt>らい</rt></ruby><ruby>週<rt>しゅう</rt></ruby>に<ruby>開<rt>ひら</rt></ruby>かれることになりました。',
        zhTW: '會議決定在下週舉行。',
        en: 'It was decided that the meeting will be held next week.',
        explanation: {
          'zh-TW': '「ことになる」表示客觀決定，「會議決定在下週舉行」。',
          'en': '"ことになる" expresses an objective decision, "it was decided that the meeting will be held next week".'
        }
      },
      {
        japanese: '<ruby>結<rt>けっ</rt></ruby><ruby>果<rt>か</rt></ruby>、<ruby>行<rt>い</rt></ruby>かないことになりました。',
        zhTW: '結果決定不去了。',
        en: 'As a result, it was decided not to go.',
        explanation: {
          'zh-TW': '「ことになる」表示自然結果，「結果決定不去了」。',
          'en': '"ことになる" expresses a natural result, "as a result, it was decided not to go".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜ことになる」表示客觀決定或自然結果，不是說話者自己的決定。\n' +
        '2. 「〜ことになる」和「〜ことにする」的區別：「ことになる」是客觀決定，「ことにする」是主觀決定。\n' +
        '3. 「〜ことになる」常用於描述公司、團體等做出的決定。',
      'en':
        'Learning tips:\n' +
        '1. "〜ことになる" expresses an objective decision or natural result, not the speaker\'s own decision.\n' +
        '2. Difference between "〜ことになる" and "〜ことにする": "ことになる" is objective decision, "ことにする" is subjective decision.\n' +
        '3. "〜ことになる" is commonly used to describe decisions made by companies, groups, etc.'
    },
    relatedContent: [
      {
        id: 'grammar-pattern-koto-ni-suru',
        title: {
          'zh-TW': '句型「〜ことにする」',
          'en': 'Pattern "〜ことにする"'
        }
      },
      {
        id: 'grammar-pattern-te-oku',
        title: {
          'zh-TW': '句型「〜ておく」',
          'en': 'Pattern "〜ておく"'
        }
      }
    ]
  }
};


