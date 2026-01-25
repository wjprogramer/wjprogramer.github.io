// 句型「〜なければならない」 - 詳細內容

export const grammarPatternNakerebaNaranai = {
  id: 'grammar-pattern-nakereba-naranai',
  title: {
    'zh-TW': '句型「〜なければならない」',
    'en': 'Pattern "〜なければならない"'
  },
  category: {
    type: 'grammar',
    level: 'N5'
  },
  tags: ['basic', 'grammar'],
  description: {
    'zh-TW': '「〜なければならない」表示「必須...」「不得不...」的義務',
    'en': '"〜なければならない" expresses obligation "must..." or "have to..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜なければならない」是表示義務的句型，意思是「必須...」「不得不...」。由動詞的「ない形」加上「ければならない」構成。',
      'en':
        '"〜なければならない" is a pattern that expresses obligation, meaning "must..." or "have to...". It is formed by adding "ければならない" to the ない form of a verb.'
    },
    usage: {
      'zh-TW':
        '「〜なければならない」的用法：\n' +
        '1. 表示義務：必須...、不得不...（如「行かなければならない」）\n' +
        '2. 變化形式：\n' +
        '   - なければならない（正式）\n' +
        '   - なければいけない（口語）\n' +
        '   - なくてはならない（正式）\n' +
        '   - なくてはいけない（口語）\n' +
        '3. 否定：〜なくてもいい（不必...）',
      'en':
        'Usage of "〜なければならない":\n' +
        '1. Express obligation: must..., have to... (e.g., 「行かなければならない」)\n' +
        '2. Variations:\n' +
        '   - なければならない (formal)\n' +
        '   - なければいけない (colloquial)\n' +
        '   - なくてはならない (formal)\n' +
        '   - なくてはいけない (colloquial)\n' +
        '3. Negative: 〜なくてもいい (don\'t have to...)'
    },
    examples: [
      {
        japanese: '<ruby>学<rt>がっ</rt></ruby><ruby>校<rt>こう</rt></ruby>へ<ruby>行<rt>い</rt></ruby>かなければなりません。',
        zhTW: '必須去學校。',
        en: 'I must go to school.',
        explanation: {
          'zh-TW': '「なければならない」表示義務，「必須去」。',
          'en': '"なければならない" expresses obligation, "must go".'
        }
      },
      {
        japanese: '<ruby>宿<rt>しゅく</rt></ruby><ruby>題<rt>だい</rt></ruby>を<ruby>し<rt>し</rt></ruby>なければいけません。',
        zhTW: '必須做作業。',
        en: 'I have to do my homework.',
        explanation: {
          'zh-TW': '「なければいけない」是口語形式，表示「必須做」。',
          'en': '"なければいけない" is the colloquial form, meaning "have to do".'
        }
      },
      {
        japanese: '<ruby>今<rt>いま</rt></ruby>日<ruby>行<rt>い</rt></ruby>かなくてもいいです。',
        zhTW: '今天不必去。',
        en: 'I don\'t have to go today.',
        explanation: {
          'zh-TW': '「なくてもいい」表示「不必...」。',
          'en': '"なくてもいい" means "don\'t have to...".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜なければならない」由動詞「ない形」加上「ければならない」構成。\n' +
        '2. 口語中常用「なければいけない」或「なくてはいけない」。\n' +
        '3. 否定形式「〜なくてもいい」表示「不必...」，與「〜なければならない」意思相反。',
      'en':
        'Learning tips:\n' +
        '1. "〜なければならない" is formed by adding "ければならない" to the ない form of a verb.\n' +
        '2. In colloquial speech, "なければいけない" or "なくてはいけない" are commonly used.\n' +
        '3. The negative form "〜なくてもいい" means "don\'t have to...", opposite to "〜なければならない".'
    },
    relatedContent: [
      {
        id: 'grammar-verb-nai-form',
        title: {
          'zh-TW': '動詞ない形',
          'en': 'Verb ない Form'
        }
      },
      {
        id: 'grammar-pattern-temo-ii',
        title: {
          'zh-TW': '句型「〜てもいい」',
          'en': 'Pattern "〜てもいい"'
        }
      }
    ]
  }
};

