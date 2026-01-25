// 助詞「は」- 詳細內容

export const grammarParticlesWa = {
  id: 'grammar-particles-wa',
  title: {
    'zh-TW': '助詞「は」',
    'en': 'Particle "は"'
  },
  category: {
    type: 'grammar',
    level: 'N5'
  },
  tags: ['basic', 'grammar', 'particle'],
  description: {
    'zh-TW': '助詞「は」用於標示主題，是日文中最基本的助詞之一',
    'en': 'The particle "は" is used to mark the topic, one of the most basic particles in Japanese'
  },
  content: {
    overview: {
      'zh-TW': '助詞「は」讀作「wa」，雖然寫作「は」，但發音是「wa」。它用於標示句子的主題，告訴聽者這句話要談論什麼。',
      'en': 'The particle "は" (pronounced "わ") marks the topic of the sentence, telling the listener what the sentence is about.'
    },
    usage: {
      'zh-TW': '「は」放在名詞後面，用來標示主題。主題通常是已知的資訊，而後面的部分提供新資訊。',
      'en': '"は" is placed after a noun to mark the topic. The topic is usually known information, while what follows provides new information.'
    },
    examples: [
      {
        japanese: '<ruby>私<rt>わたし</rt></ruby>は<ruby>学<rt>がく</rt></ruby><ruby>生<rt>せい</rt></ruby>です。',
        zhTW: '我是學生。',
        en: 'I am a student.',
        explanation: {
          'zh-TW': '「私」是主題，「学生です」是關於「私」的資訊。',
          'en': '"私" is the topic, and "学生です" is information about "私".'
        }
      },
      {
        japanese: 'これは<ruby>本<rt>ほん</rt></ruby>です。',
        zhTW: '這是書。',
        en: 'This is a book.',
        explanation: {
          'zh-TW': '「これ」是主題，指代「這個東西」。',
          'en': '"これ" is the topic, referring to "this thing".'
        }
      },
      {
        japanese: '<ruby>今<rt>きょう</rt></ruby>日は<ruby>月<rt>げつ</rt></ruby><ruby>曜<rt>よう</rt></ruby><ruby>日<rt>び</rt></ruby>です。',
        zhTW: '今天是星期一。',
        en: 'Today is Monday.',
        explanation: {
          'zh-TW': '「今日」是主題，說明今天是什麼日子。',
          'en': '"今日" is the topic, stating what day today is.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          'zh-TW': '私が学生です。',
          'en': '私が学生です。'
        },
        correct: {
          'zh-TW': '私は学生です。',
          'en': '私は学生です。'
        },
        explanation: {
          'zh-TW': '當要說明「我是學生」這個事實時，應該用「は」而不是「が」。',
          'en': 'When stating the fact "I am a student", use "は" instead of "が".'
        }
      }
    ],
    relatedContent: [
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

