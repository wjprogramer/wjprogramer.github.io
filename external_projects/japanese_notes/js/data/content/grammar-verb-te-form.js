// 動詞て形 - 詳細內容

export const grammarVerbTeForm = {
  id: 'grammar-verb-te-form',
  title: {
    'zh-TW': '動詞て形',
    'en': 'Verb て Form'
  },
  category: {
    type: 'grammar',
    level: 'N5'
  },
  tags: ['basic', 'grammar', 'verb'],
  description: {
    'zh-TW': '動詞て形是動詞變化的重要形式，用於連接動作、表示請求等',
    'en': 'Verb て form is an important verb conjugation used to connect actions, make requests, etc.'
  },
  content: {
    overview: {
      'zh-TW':
        '動詞て形是日語動詞變化的重要形式之一。て形可以用於連接多個動作、表示請求、表示狀態等多種用法，是學習日語必須掌握的基本文法。',
      'en':
        'Verb て form is one of the important verb conjugations in Japanese. The て form can be used to connect multiple actions, make requests, indicate states, and more. It is essential basic grammar for learning Japanese.'
    },
    usage: {
      'zh-TW':
        'て形的用法：\n' +
        '1. 連接動作：表示動作的順序（如「食べて寝る」）\n' +
        '2. 表示請求：請...（如「待ってください」）\n' +
        '3. 表示狀態：正在...（如「立っている」）\n' +
        '4. 表示原因：因為...（如「遅れてすみません」）\n' +
        '5. 表示方法：用...方式（如「歩いて行く」）',
      'en':
        'Usage of て form:\n' +
        '1. Connect actions: indicate sequence of actions (e.g., 「食べて寝る」)\n' +
        '2. Make requests: please... (e.g., 「待ってください」)\n' +
        '3. Indicate state: be...ing (e.g., 「立っている」)\n' +
        '4. Indicate reason: because... (e.g., 「遅れてすみません」)\n' +
        '5. Indicate method: by... (e.g., 「歩いて行く」)'
    },
    verbForms: {
      'zh-TW':
        'て形的變化規則：\n' +
        '1. 五段動詞：\n' +
        '   - う・つ・る → って（如「買う→買って」「立つ→立って」「帰る→帰って」）\n' +
        '   - む・ぶ・ぬ → んで（如「読む→読んで」「遊ぶ→遊んで」「死ぬ→死んで」）\n' +
        '   - く・ぐ → いて・いで（如「書く→書いて」「急ぐ→急いで」）\n' +
        '   - す → して（如「話す→話して」）\n' +
        '2. 一段動詞：去掉「る」加「て」（如「食べる→食べて」「見る→見て」）\n' +
        '3. 不規則動詞：\n' +
        '   - する → して\n' +
        '   - くる → きて\n' +
        '   - 行く → 行って（特殊）',
      'en':
        'て form conjugation rules:\n' +
        '1. 五段 verbs:\n' +
        '   - う・つ・る → って (e.g., 「買う→買って」「立つ→立って」「帰る→帰って」)\n' +
        '   - む・ぶ・ぬ → んで (e.g., 「読む→読んで」「遊ぶ→遊んで」「死ぬ→死んで」)\n' +
        '   - く・ぐ → いて・いで (e.g., 「書く→書いて」「急ぐ→急いで」)\n' +
        '   - す → して (e.g., 「話す→話して」)\n' +
        '2. 一段 verbs: remove "る" and add "て" (e.g., 「食べる→食べて」「見る→見て」)\n' +
        '3. Irregular verbs:\n' +
        '   - する → して\n' +
        '   - くる → きて\n' +
        '   - 行く → 行って (special)'
    },
    examples: [
      {
        japanese: '<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>んで<ruby>寝<rt>ね</rt></ruby>ます。',
        zhTW: '讀書然後睡覺。',
        en: 'I read a book and then sleep.',
        explanation: {
          'zh-TW': '「て形」連接兩個動作，表示動作的順序。',
          'en': 'The て form connects two actions, indicating the sequence of actions.'
        }
      },
      {
        japanese: '<ruby>待<rt>ま</rt></ruby>ってください。',
        zhTW: '請等一下。',
        en: 'Please wait.',
        explanation: {
          'zh-TW': '「て形」加上「ください」表示請求。',
          'en': 'The て form plus "ください" makes a request.'
        }
      },
      {
        japanese: '<ruby>歩<rt>ある</rt></ruby>いて<ruby>学<rt>がっ</rt></ruby><ruby>校<rt>こう</rt></ruby>へ<ruby>行<rt>い</rt></ruby>きます。',
        zhTW: '走路去學校。',
        en: 'I walk to school.',
        explanation: {
          'zh-TW': '「て形」表示方法，「用走路的方式去學校」。',
          'en': 'The て form indicates method, "go to school by walking".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. て形的變化規則較多，需要多練習記憶。\n' +
        '2. 五段動詞的て形變化需要特別注意「行く→行って」這個特殊變化。\n' +
        '3. て形是許多重要文型的基礎，如「〜ている」「〜てください」「〜てもいい」等。',
      'en':
        'Learning tips:\n' +
        '1. The て form has many conjugation rules, so practice and memorize them.\n' +
        '2. Pay special attention to the irregular change 「行く→行って」 for 五段 verbs.\n' +
        '3. The て form is the foundation for many important grammar patterns like "〜ている", "〜てください", "〜てもいい".'
    },
    relatedContent: [
      {
        id: 'grammar-verb-ta-form',
        title: {
          'zh-TW': '動詞た形',
          'en': 'Verb た Form'
        }
      },
      {
        id: 'grammar-verb-nai-form',
        title: {
          'zh-TW': '動詞ない形',
          'en': 'Verb ない Form'
        }
      }
    ]
  }
};

