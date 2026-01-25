// 尊敬語 - 詳細內容

export const grammarKeigoSonkeigo = {
  id: 'grammar-keigo-sonkeigo',
  title: {
    'zh-TW': '尊敬語',
    'en': '尊敬語 (Respectful Language)'
  },
  category: {
    type: 'grammar',
    level: 'N3'
  },
  tags: ['grammar', 'keigo'],
  description: {
    'zh-TW': '尊敬語是敬語的一種，用於抬高對方的動作或狀態',
    'en': '尊敬語 is a type of 敬語 used to elevate the actions or states of others'
  },
  content: {
    overview: {
      'zh-TW':
        '尊敬語是敬語的一種，用於抬高對方的動作或狀態，表示對對方的尊重。尊敬語主要通過使用特殊的動詞形式、助動詞等來實現，用於對長輩、上司、客戶等表示尊重。',
      'en':
        '尊敬語 is a type of 敬語 used to elevate the actions or states of others, expressing respect for them. 尊敬語 is mainly achieved through the use of special verb forms, auxiliary verbs, etc., used to show respect to elders, superiors, customers, etc.'
    },
    usage: {
      'zh-TW':
        '尊敬語的用法：\n' +
        '1. 動詞尊敬語：使用特殊形式（如「行く→いらっしゃる」「食べる→召し上がる」）\n' +
        '2. 助動詞「れる」「られる」：接在動詞後面（如「読まれる」「見られる」）\n' +
        '3. お＋動詞ます形＋になる：表示尊敬（如「お読みになる」）\n' +
        '4. 名詞：加上「お」或「ご」（如「お名前」「ご住所」）',
      'en':
        'Usage of 尊敬語:\n' +
        '1. Verb 尊敬語: use special forms (e.g., "行く→いらっしゃる", "食べる→召し上がる")\n' +
        '2. Auxiliary verbs "れる", "られる": attached to verbs (e.g., "読まれる", "見られる")\n' +
        '3. お + verb ます form + になる: express respect (e.g., "お読みになる")\n' +
        '4. Nouns: add "お" or "ご" (e.g., "お名前", "ご住所")'
    },
    examples: [
      {
        japanese: '<ruby>先<rt>せん</rt></ruby><ruby>生<rt>せい</rt></ruby>は<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>まれます。',
        zhTW: '老師讀書。',
        en: 'The teacher reads a book.',
        explanation: {
          'zh-TW': '「読まれる」是「読む」的尊敬語，表示對老師的尊重。',
          'en': '"読まれる" is the 尊敬語 form of "読む", expressing respect for the teacher.'
        }
      },
      {
        japanese: '<ruby>お<rt>お</rt></ruby><ruby>名<rt>な</rt></ruby><ruby>前<rt>まえ</rt></ruby>は<ruby>何<rt>なん</rt></ruby>ですか。',
        zhTW: '您的名字是什麼？',
        en: 'What is your name?',
        explanation: {
          'zh-TW': '「お名前」是「名前」的尊敬語，加上「お」表示尊重。',
          'en': '"お名前" is the 尊敬語 form of "名前", adding "お" to express respect.'
        }
      },
      {
        japanese: '<ruby>先<rt>せん</rt></ruby><ruby>生<rt>せい</rt></ruby>は<ruby>お<rt>お</rt></ruby><ruby>帰<rt>かえ</rt></ruby>りになります。',
        zhTW: '老師要回去了。',
        en: 'The teacher is going home.',
        explanation: {
          'zh-TW': '「お帰りになる」是「帰る」的尊敬語，表示對老師的尊重。',
          'en': '"お帰りになる" is the 尊敬語 form of "帰る", expressing respect for the teacher.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 尊敬語用於抬高對方的動作或狀態，表示對對方的尊重。\n' +
        '2. 尊敬語有多種表達方式：特殊動詞、助動詞「れる」「られる」、お＋動詞ます形＋になる等。\n' +
        '3. 名詞的尊敬語通常加上「お」（和語）或「ご」（漢語）。',
      'en':
        'Learning tips:\n' +
        '1. 尊敬語 is used to elevate the actions or states of others, expressing respect for them.\n' +
        '2. 尊敬語 has multiple expressions: special verbs, auxiliary verbs "れる" "られる", お + verb ます form + になる, etc.\n' +
        '3. Noun 尊敬語 usually adds "お" (和語) or "ご" (漢語).'
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
        id: 'grammar-keigo-kenjogo',
        title: {
          'zh-TW': '謙讓語',
          'en': '謙讓語'
        }
      }
    ]
  }
};


