// 句型「〜てもいい」 - 詳細內容

export const grammarPatternTemoIi = {
  id: 'grammar-pattern-temo-ii',
  title: {
    'zh-TW': '句型「〜てもいい」',
    'en': 'Pattern "〜てもいい"'
  },
  category: {
    type: 'grammar',
    level: 'N5'
  },
  tags: ['basic', 'grammar'],
  description: {
    'zh-TW': '「〜てもいい」表示「可以...」「...也可以」的許可',
    'en': '"〜てもいい" expresses permission "may..." or "it\'s okay to..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜てもいい」是表示許可的句型，意思是「可以...」「...也可以」。由動詞的「て形」加上「もいい」構成。用於詢問或給予許可。',
      'en':
        '"〜てもいい" is a pattern that expresses permission, meaning "may..." or "it\'s okay to...". It is formed by adding "もいい" to the て form of a verb. Used to ask for or give permission.'
    },
    usage: {
      'zh-TW':
        '「〜てもいい」的用法：\n' +
        '1. 表示許可：可以...（如「食べてもいい」）\n' +
        '2. 詢問許可：可以...嗎？（如「食べてもいいですか」）\n' +
        '3. 否定：〜てはいけない（不可以...）\n' +
        '4. 禮貌形式：〜てもよろしいです',
      'en':
        'Usage of "〜てもいい":\n' +
        '1. Express permission: may..., it\'s okay to... (e.g., 「食べてもいい」)\n' +
        '2. Ask for permission: may I...? (e.g., 「食べてもいいですか」)\n' +
        '3. Negative: 〜てはいけない (must not...)\n' +
        '4. Polite form: 〜てもよろしいです'
    },
    examples: [
      {
        japanese: '<ruby>この<rt>この</rt></ruby><ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>んでもいいですか。',
        zhTW: '可以讀這本書嗎？',
        en: 'May I read this book?',
        explanation: {
          'zh-TW': '「てもいいですか」用於詢問許可。',
          'en': '"てもいいですか" is used to ask for permission.'
        }
      },
      {
        japanese: '<ruby>食<rt>た</rt></ruby>べてもいいです。',
        zhTW: '可以吃。',
        en: 'You may eat.',
        explanation: {
          'zh-TW': '「てもいい」表示給予許可。',
          'en': '"てもいい" expresses giving permission.'
        }
      },
      {
        japanese: '<ruby>ここで<rt>ここで</rt></ruby><ruby>タバコ<rt>タバコ</rt></ruby>を<ruby>吸<rt>す</rt></ruby>ってはいけません。',
        zhTW: '不可以在這裡吸菸。',
        en: 'You must not smoke here.',
        explanation: {
          'zh-TW': '「てはいけない」表示禁止，「不可以...」。',
          'en': '"てはいけない" indicates prohibition, "must not...".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜てもいい」由動詞「て形」加上「もいい」構成。\n' +
        '2. 詢問許可時，加上「ですか」變成「〜てもいいですか」。\n' +
        '3. 禁止的句型「〜てはいけない」與「〜てもいい」意思相反。',
      'en':
        'Learning tips:\n' +
        '1. "〜てもいい" is formed by adding "もいい" to the て form of a verb.\n' +
        '2. When asking for permission, add "ですか" to make "〜てもいいですか".\n' +
        '3. The prohibition pattern "〜てはいけない" is opposite to "〜てもいい".'
    },
    relatedContent: [
      {
        id: 'grammar-verb-te-form',
        title: {
          'zh-TW': '動詞て形',
          'en': 'Verb て Form'
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

