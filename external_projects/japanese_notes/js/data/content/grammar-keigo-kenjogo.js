// 謙讓語 - 詳細內容

export const grammarKeigoKenjogo = {
  id: 'grammar-keigo-kenjogo',
  title: {
    'zh-TW': '謙讓語',
    'en': '謙讓語 (Humble Language)'
  },
  category: {
    type: 'grammar',
    level: 'N3'
  },
  tags: ['grammar', 'keigo'],
  description: {
    'zh-TW': '謙讓語是敬語的一種，用於降低自己的動作或狀態，抬高對方',
    'en': '謙讓語 is a type of 敬語 used to lower one\'s own actions or states, elevating others'
  },
  content: {
    overview: {
      'zh-TW':
        '謙讓語是敬語的一種，用於降低自己的動作或狀態，從而抬高對方，表示對對方的尊重。謙讓語主要通過使用特殊的動詞形式等來實現，用於對長輩、上司、客戶等表示尊重。',
      'en':
        '謙讓語 is a type of 敬語 used to lower one\'s own actions or states, thereby elevating others, expressing respect for them. 謙讓語 is mainly achieved through the use of special verb forms, etc., used to show respect to elders, superiors, customers, etc.'
    },
    usage: {
      'zh-TW':
        '謙讓語的用法：\n' +
        '1. 動詞謙讓語：使用特殊形式（如「行く→参る」「食べる→いただく」）\n' +
        '2. お＋動詞ます形＋する：表示謙讓（如「お読みする」）\n' +
        '3. ご＋漢語名詞＋する：表示謙讓（如「ご案内する」）\n' +
        '4. 注意：謙讓語只用於自己的動作，不用於對方的動作',
      'en':
        'Usage of 謙讓語:\n' +
        '1. Verb 謙讓語: use special forms (e.g., "行く→参る", "食べる→いただく")\n' +
        '2. お + verb ます form + する: express humility (e.g., "お読みする")\n' +
        '3. ご + Sino-Japanese noun + する: express humility (e.g., "ご案内する")\n' +
        '4. Note: 謙讓語 is only used for one\'s own actions, not for others\' actions'
    },
    examples: [
      {
        japanese: '<ruby>私<rt>わたし</rt></ruby>は<ruby>先<rt>せん</rt></ruby><ruby>生<rt>せい</rt></ruby>の<ruby>家<rt>いえ</rt></ruby>に<ruby>参<rt>まい</rt></ruby>ります。',
        zhTW: '我去老師家。',
        en: 'I go to the teacher\'s house.',
        explanation: {
          'zh-TW': '「参る」是「行く」的謙讓語，表示對老師的尊重。',
          'en': '"参る" is the 謙讓語 form of "行く", expressing respect for the teacher.'
        }
      },
      {
        japanese: '<ruby>お<rt>お</rt></ruby><ruby>手<rt>て</rt></ruby><ruby>紙<rt>がみ</rt></ruby>を<ruby>拝<rt>はい</rt></ruby><ruby>見<rt>けん</rt></ruby>しました。',
        zhTW: '我拜讀了您的信。',
        en: 'I read your letter.',
        explanation: {
          'zh-TW': '「拝見する」是「見る」的謙讓語，表示對對方的尊重。',
          'en': '"拝見する" is the 謙讓語 form of "見る", expressing respect for the other person.'
        }
      },
      {
        japanese: '<ruby>ご<rt>ご</rt></ruby><ruby>案<rt>あん</rt></ruby><ruby>内<rt>ない</rt></ruby>します。',
        zhTW: '我來為您帶路。',
        en: 'I will guide you.',
        explanation: {
          'zh-TW': '「ご案内する」是「案内する」的謙讓語，表示對對方的尊重。',
          'en': '"ご案内する" is the 謙讓語 form of "案内する", expressing respect for the other person.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 謙讓語用於降低自己的動作或狀態，從而抬高對方，表示對對方的尊重。\n' +
        '2. 謙讓語只用於自己的動作，不用於對方的動作（對方的動作用尊敬語）。\n' +
        '3. 謙讓語有多種表達方式：特殊動詞、お＋動詞ます形＋する、ご＋漢語名詞＋する等。',
      'en':
        'Learning tips:\n' +
        '1. 謙讓語 is used to lower one\'s own actions or states, thereby elevating others, expressing respect for them.\n' +
        '2. 謙讓語 is only used for one\'s own actions, not for others\' actions (others\' actions use 尊敬語).\n' +
        '3. 謙讓語 has multiple expressions: special verbs, お + verb ます form + する, ご + Sino-Japanese noun + する, etc.'
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
        id: 'grammar-keigo-teineigo',
        title: {
          'zh-TW': '丁寧語',
          'en': '丁寧語'
        }
      },
      {
        id: 'grammar-keigo-sonkeigo',
        title: {
          'zh-TW': '尊敬語',
          'en': '尊敬語'
        }
      }
    ]
  }
};


