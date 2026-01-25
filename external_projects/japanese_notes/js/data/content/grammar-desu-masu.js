// です・ます形 - 詳細內容

export const grammarDesuMasu = {
  id: 'grammar-desu-masu',
  title: {
    'zh-TW': 'です・ます形',
      'en': '"です"/"ます" Form'
  },
  category: {
    type: 'grammar',
    level: 'N5'
  },
  tags: ['basic', 'grammar', 'keigo'],
  description: {
    'zh-TW': 'です・ます形是日文的禮貌語形式，用於正式場合',
      'en': '"です"/"ます" form is the polite form in Japanese, used in formal situations'
  },
  content: {
    overview: {
      'zh-TW': '「です」和「ます」是日文的禮貌語形式（敬體）。「です」用於名詞和形容詞，「ます」用於動詞。這是日文中最基本的禮貌表達方式。',
      'en': '"です" and "ます" are the polite forms (敬語) in Japanese. "です" is used with nouns and adjectives, "ます" is used with verbs. This is the most basic polite expression in Japanese.'
    },
    usage: {
      'zh-TW': '使用場合：\n1. 正式場合\n2. 與長輩、上司、不熟悉的人說話\n3. 書面語\n4. 公開演講',
      'en': 'Usage situations:\n1. Formal occasions\n2. Speaking with elders, superiors, or unfamiliar people\n3. Written language\n4. Public speeches'
    },
    examples: [
      {
        japanese: '<ruby>私<rt>わたし</rt></ruby>は<ruby>学<rt>がく</rt></ruby><ruby>生<rt>せい</rt></ruby>です。',
        zhTW: '我是學生。',
        en: 'I am a student.',
        explanation: {
          'zh-TW': '「です」接在名詞「学生」後面，表示禮貌。',
          'en': '"です" follows the noun "学生" to show politeness.'
        }
      },
      {
        japanese: '<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>みます。',
        zhTW: '讀書。',
        en: 'I read a book.',
        explanation: {
          'zh-TW': '動詞「読む」的ます形是「読みます」。',
          'en': 'The ます form of the verb "読む" is "読みます".'
        }
      },
      {
        japanese: '<ruby>今<rt>きょう</rt></ruby>日は<ruby>暑<rt>あつ</rt></ruby>いです。',
        zhTW: '今天很熱。',
        en: 'Today is hot.',
        explanation: {
          'zh-TW': 'い形容詞後面接「です」表示禮貌。',
          'en': 'い-adjectives are followed by "です" to show politeness.'
        }
      },
      {
        japanese: 'この<ruby>部<rt>へ</rt></ruby><ruby>屋<rt>や</rt></ruby>は<ruby>静<rt>しず</rt></ruby>かです。',
        zhTW: '這個房間很安靜。',
        en: 'This room is quiet.',
        explanation: {
          'zh-TW': 'な形容詞後面接「です」表示禮貌。',
          'en': 'な-adjectives are followed by "です" to show politeness.'
        }
      }
    ],
    verbConjugation: {
      'zh-TW': '動詞ます形變化規則：\n- 五段動詞：將詞尾改為「い段」+ ます\n  例：読む → 読みます、書く → 書きます\n- 一段動詞：去掉「る」+ ます\n  例：食べる → 食べます、見る → 見ます\n- サ変動詞：する → します\n- カ変動詞：来る → 来ます',
      'en': 'Verb ます form conjugation rules:\n- 五段 verbs: Change ending to "い段" + ます\n  Example: 読む → 読みます、書く → 書きます\n- 一段 verbs: Remove "る" + ます\n  Example: 食べる → 食べます、見る → 見ます\n- サ変 verbs: する → します\n- カ変 verbs: 来る → 来ます'
    },
    relatedContent: [
      {
        id: 'grammar-adjectives-i',
        title: {
          'zh-TW': 'い形容詞',
          'en': 'I-Adjectives'
        }
      },
      {
        id: 'grammar-adjectives-na',
        title: {
          'zh-TW': 'な形容詞',
          'en': 'Na-Adjectives'
        }
      }
    ]
  }
};

