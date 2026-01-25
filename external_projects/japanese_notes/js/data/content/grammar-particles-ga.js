// 助詞「が」- 詳細內容

export const grammarParticlesGa = {
  id: 'grammar-particles-ga',
  title: {
    'zh-TW': '助詞「が」',
    'en': 'Particle "が"'
  },
  category: {
    type: 'grammar',
    level: 'N5'
  },
  tags: ['basic', 'grammar', 'particle'],
  description: {
    'zh-TW': '助詞「が」用於標示主語，與「は」的用法不同',
    'en': 'The particle "が" is used to mark the subject, different from "は"'
  },
  content: {
    overview: {
      'zh-TW': '助詞「が」用於標示句子的主語，特別是在強調主語或描述新資訊時使用。與「は」不同，「が」強調的是主語本身，而不是主題。',
      'en': 'The particle "が" marks the subject of a sentence, especially when emphasizing the subject or describing new information. Unlike "は", "が" emphasizes the subject itself, not the topic.'
    },
    usage: {
      'zh-TW': '「が」用於：\n1. 強調主語\n2. 描述新資訊\n3. 疑問句中的主語\n4. 存在句中的主語',
      'en': '"が" is used for:\n1. Emphasizing the subject\n2. Describing new information\n3. Subject in questions\n4. Subject in existence sentences'
    },
    examples: [
      {
        japanese: '<ruby>誰<rt>だれ</rt></ruby>が<ruby>来<rt>き</rt></ruby>ましたか？',
        reading: 'だれがきましたか？',
        zhTW: '誰來了？',
        en: 'Who came?',
        explanation: {
          'zh-TW': '疑問句中，主語用「が」標示。',
          'en': 'In questions, the subject is marked with "が".'
        }
      },
      {
        japanese: '<ruby>私<rt>わたし</rt></ruby>が<ruby>行<rt>い</rt></ruby>きます。',
        reading: 'わたしがいきます。',
        zhTW: '我去。',
        en: 'I will go.',
        explanation: {
          'zh-TW': '強調「我」是去的人，而不是別人。',
          'en': 'Emphasizing that "I" am the one who will go, not someone else.'
        }
      },
      {
        japanese: '<ruby>猫<rt>ねこ</rt></ruby>がいます。',
        reading: 'ねこがいます。',
        zhTW: '有貓。',
        en: 'There is a cat.',
        explanation: {
          'zh-TW': '存在句中，存在的主體用「が」標示。',
          'en': 'In existence sentences, the existing subject is marked with "が".'
        }
      }
    ],
    comparison: {
      'zh-TW': '「は」vs「が」的區別：\n- 「は」：標示主題，提供已知資訊\n- 「が」：標示主語，強調主語本身\n\n例：\n- 私は学生です。（我是學生）→ 說明「我」的身份\n- 私が学生です。（我是學生）→ 強調「我」是學生，不是別人',
      'en': 'Difference between "は" and "が":\n- "は": Marks the topic, provides known information\n- "が": Marks the subject, emphasizes the subject itself\n\nExample:\n- 私は学生です。 (I am a student) → States "私" identity\n- 私が学生です。 (I am a student) → Emphasizes that "私" is the student, not someone else'
    },
    commonMistakes: [
      {
        mistake: {
          'zh-TW': '誰は来ましたか？',
          'en': '誰は来ましたか？'
        },
        correct: {
          'zh-TW': '誰が来ましたか？',
          'en': '誰が来ましたか？'
        },
        explanation: {
          'zh-TW': '疑問詞（誰、何、どこ等）作主語時，必須用「が」，不能用「は」。',
          'en': 'When interrogative words (誰、何、どこ, etc.) are the subject, "が" must be used, not "は".'
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
        id: 'grammar-particles-wo',
        title: {
          'zh-TW': '助詞「を」',
          'en': 'Particle "を"'
        }
      }
    ]
  }
};

