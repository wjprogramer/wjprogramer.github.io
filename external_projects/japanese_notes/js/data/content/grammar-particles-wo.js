// 助詞「を」- 詳細內容

export const grammarParticlesWo = {
  id: 'grammar-particles-wo',
  title: {
    'zh-TW': '助詞「を」',
    'en': 'Particle "を"'
  },
  category: {
    type: 'grammar',
    level: 'N5'
  },
  tags: ['basic', 'grammar', 'particle'],
  description: {
    'zh-TW': '助詞「を」用於標示動作的直接受詞',
    'en': 'The particle "を" is used to mark the direct object of an action'
  },
  content: {
    overview: {
      'zh-TW': '助詞「を」讀作「o」，雖然寫作「を」，但發音是「o」。它用於標示動詞的直接受詞，也就是動作的對象。',
      'en': 'The particle "を" (pronounced "お") marks the direct object of a verb, the target of an action.'
    },
    usage: {
      'zh-TW': '「を」放在名詞後面，標示該名詞是動詞的直接受詞。常用於他動詞（需要受詞的動詞）。',
      'en': '"を" is placed after a noun to mark it as the direct object of a verb. Commonly used with 他動詞 (verbs that require an object).'
    },
    examples: [
      {
        japanese: '<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>みます。',
        zhTW: '讀書。',
        en: 'I read a book.',
        explanation: {
          'zh-TW': '「本」是「読む」（讀）的受詞。',
          'en': '"本" is the object of "読む" (to read).'
        }
      },
      {
        japanese: 'コーヒーを<ruby>飲<rt>の</rt></ruby>みます。',
        zhTW: '喝咖啡。',
        en: 'I drink coffee.',
        explanation: {
          'zh-TW': '「コーヒー」是「飲む」（喝）的受詞。',
          'en': '"コーヒー" is the object of "飲む" (to drink).'
        }
      },
      {
        japanese: '<ruby>日<rt>に</rt></ruby><ruby>本<rt>ほん</rt></ruby><ruby>語<rt>ご</rt></ruby>を<ruby>勉<rt>べん</rt></ruby><ruby>強<rt>きょう</rt></ruby>します。',
        zhTW: '學習日文。',
        en: 'I study Japanese.',
        explanation: {
          'zh-TW': '「日本語」是「勉強する」（學習）的受詞。',
          'en': '"日本語" is the object of "勉強する" (to study).'
        }
      },
      {
        japanese: '<ruby>公<rt>こう</rt></ruby><ruby>園<rt>えん</rt></ruby>を<ruby>散<rt>さん</rt></ruby><ruby>歩<rt>ぽ</rt></ruby>します。',
        zhTW: '在公園散步。',
        en: 'I take a walk in the park.',
        explanation: {
          'zh-TW': '「を」也可以用於表示移動的場所。',
          'en': '"を" can also be used to indicate the place of movement.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          'zh-TW': '本は読みます。',
          'en': '本は読みます。'
        },
        correct: {
          'zh-TW': '本を読みます。',
          'en': '本を読みます。'
        },
        explanation: {
          'zh-TW': '動詞的受詞必須用「を」，不能用「は」。',
          'en': 'The object of a verb must use "を", not "は".'
        }
      }
    ],
    relatedContent: [
      {
        id: 'grammar-particles-wa',
        title: {
          'zh-TW': '助詞「は」',
          'en': 'Particle "は"'
        }
      },
      {
        id: 'grammar-particles-ga',
        title: {
          'zh-TW': '助詞「が」',
          'en': 'Particle "が"'
        }
      }
    ]
  }
};

