// 丁寧語 - 詳細內容

export const grammarKeigoTeineigo = {
  id: 'grammar-keigo-teineigo',
  title: {
    'zh-TW': '丁寧語',
    'en': '丁寧語 (Polite Language)'
  },
  category: {
    type: 'grammar',
    level: 'N4'
  },
  tags: ['grammar', 'keigo'],
  description: {
    'zh-TW': '丁寧語是敬語的一種，用於表示禮貌和尊重',
    'en': '丁寧語 is a type of 敬語 used to express politeness and respect'
  },
  content: {
    overview: {
      'zh-TW':
        '丁寧語是敬語的一種，用於表示禮貌和尊重。丁寧語主要通過使用「です」「ます」等敬語形式來實現，是最基本的敬語形式，用於正式場合和對不熟悉的人說話。',
      'en':
        '丁寧語 is a type of 敬語 used to express politeness and respect. 丁寧語 is mainly achieved through the use of polite forms like "です" and "ます", and is the most basic form of 敬語, used in formal situations and when speaking to unfamiliar people.'
    },
    usage: {
      'zh-TW':
        '丁寧語的用法：\n' +
        '1. 動詞：使用「ます形」（如「行きます」「食べます」）\n' +
        '2. 名詞・形容詞：使用「です」（如「学生です」「高いです」）\n' +
        '3. 否定形：使用「ません」「ではありません」（如「行きません」「高くありません」）\n' +
        '4. 過去形：使用「ました」「でした」（如「行きました」「高かったです」）',
      'en':
        'Usage of 丁寧語:\n' +
        '1. Verbs: use ます form (e.g., "行きます", "食べます")\n' +
        '2. Nouns・adjectives: use "です" (e.g., "学生です", "高いです")\n' +
        '3. Negative form: use "ません", "ではありません" (e.g., "行きません", "高くありません")\n' +
        '4. Past form: use "ました", "でした" (e.g., "行きました", "高かったです")'
    },
    examples: [
      {
        japanese: '<ruby>私<rt>わたし</rt></ruby>は<ruby>学<rt>がく</rt></ruby><ruby>生<rt>せい</rt></ruby>です。',
        zhTW: '我是學生。',
        en: 'I am a student.',
        explanation: {
          'zh-TW': '「です」是丁寧語，用於名詞後面表示禮貌。',
          'en': '"です" is 丁寧語, used after nouns to express politeness.'
        }
      },
      {
        japanese: '<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>みます。',
        zhTW: '讀書。',
        en: 'I read a book.',
        explanation: {
          'zh-TW': '「ます」是丁寧語，用於動詞後面表示禮貌。',
          'en': '"ます" is 丁寧語, used after verbs to express politeness.'
        }
      },
      {
        japanese: '<ruby>高<rt>たか</rt></ruby>いです。',
        zhTW: '很高。',
        en: 'It is high.',
        explanation: {
          'zh-TW': '「です」用於い形容詞後面，表示禮貌。',
          'en': '"です" is used after い-adjectives to express politeness.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 丁寧語是最基本的敬語形式，用於正式場合和對不熟悉的人說話。\n' +
        '2. 「です」「ます」是丁寧語的核心，必須熟練掌握其變化。\n' +
        '3. 丁寧語與尊敬語、謙讓語不同，丁寧語是對聽話者表示尊重，而不是對話題中的人物表示尊重。',
      'en':
        'Learning tips:\n' +
        '1. 丁寧語 is the most basic form of 敬語, used in formal situations and when speaking to unfamiliar people.\n' +
        '2. "です" and "ます" are the core of 丁寧語, and their conjugations must be mastered.\n' +
        '3. 丁寧語 is different from 尊敬語 and 謙讓語: 丁寧語 shows respect to the listener, not to the person in the topic.'
    },
    relatedContent: [
      {
        id: 'grammar-keigo-overview',
        title: {
          'zh-TW': '敬語總論',
          'en': 'Overview of 敬語'
        }
      },
      {
        id: 'grammar-keigo-sonkeigo',
        title: {
          'zh-TW': '尊敬語',
          'en': '尊敬語'
        }
      },
      {
        id: 'grammar-keigo-kenjogo',
        title: {
          'zh-TW': '謙讓語',
          'en': '謙讓語'
        }
      }
    ]
  }
};


