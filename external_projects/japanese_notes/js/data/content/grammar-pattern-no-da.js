// 句型「〜のだ」「〜んだ」 - 詳細內容

export const grammarPatternNoDa = {
  id: 'grammar-pattern-no-da',
  title: {
    'zh-TW': '句型「〜のだ」「〜んだ」',
    'en': 'Pattern "〜のだ" / "〜んだ"'
  },
  category: {
    type: 'grammar',
    level: 'N3'
  },
  tags: ['grammar'],
  description: {
    'zh-TW': '「〜のだ」「〜んだ」表示說明、強調、解釋',
    'en': '"〜のだ" / "〜んだ" expresses explanation, emphasis, or clarification'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜のだ」（正式）或「〜んだ」（口語）接在動詞、形容詞的普通形或「名詞＋な」後面，表示說明、強調、解釋。用於解釋原因、說明情況、強調事實等。這是日語中非常常用的表達方式。',
      'en':
        '"〜のだ" (formal) or "〜んだ" (casual) is attached to the plain form of verbs and adjectives or "noun + な" to express explanation, emphasis, or clarification. Used to explain reasons, describe situations, emphasize facts, etc. This is a very common expression in Japanese.'
    },
    usage: {
      'zh-TW':
        '「〜のだ」「〜んだ」的用法：\n' +
        '1. 說明原因：〜のだ（如「疲れたのだ」）\n' +
        '2. 強調事實：〜のだ（如「そうなのだ」）\n' +
        '3. 解釋情況：〜のだ（如「学生なのだ」）\n' +
        '4. 變化：\n' +
        '   - 正式：〜のだ、〜のです、〜のでした\n' +
        '   - 口語：〜んだ、〜んです、〜んでした\n' +
        '5. 接續規則：\n' +
        '   - 動詞普通形＋のだ\n' +
        '   - い形容詞普通形＋のだ\n' +
        '   - な形容詞＋な＋のだ\n' +
        '   - 名詞＋な＋のだ',
      'en':
        'Usage of "〜のだ" / "〜んだ":\n' +
        '1. Explain reason: 〜のだ (e.g., "疲れたのだ")\n' +
        '2. Emphasize fact: 〜のだ (e.g., "そうなのだ")\n' +
        '3. Explain situation: 〜のだ (e.g., "学生なのだ")\n' +
        '4. Conjugation:\n' +
        '   - Formal: 〜のだ, 〜のです, 〜のでした\n' +
        '   - Casual: 〜んだ, 〜んです, 〜んでした\n' +
        '5. Attachment rules:\n' +
        '   - Verb plain form + のだ\n' +
        '   - い-adjective plain form + のだ\n' +
        '   - な-adjective + な + のだ\n' +
        '   - Noun + な + のだ'
    },
    examples: [
      {
        japanese: '<ruby>疲<rt>つか</rt></ruby>れたんです。',
        zhTW: '因為累了。',
        en: 'Because I\'m tired.',
        explanation: {
          'zh-TW': '「疲れたんです」表示說明原因，「んです」是「のです」的口語形式。',
          'en': '"疲れたんです" explains the reason, "んです" is the casual form of "のです".'
        }
      },
      {
        japanese: '<ruby>実<rt>じつ</rt></ruby>は<ruby>学<rt>がく</rt></ruby><ruby>生<rt>せい</rt></ruby>なんです。',
        zhTW: '其實是學生。',
        en: 'Actually, I\'m a student.',
        explanation: {
          'zh-TW': '「学生なんです」表示說明情況，「なんです」是「なのです」的口語形式。',
          'en': '"学生なんです" explains the situation, "なんです" is the casual form of "なのです".'
        }
      },
      {
        japanese: '<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>っているのです。',
        zhTW: '正在下雨。',
        en: 'It is raining.',
        explanation: {
          'zh-TW': '「降っているのです」表示強調事實或說明情況。',
          'en': '"降っているのです" emphasizes the fact or explains the situation.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜のだ」「〜んだ」用於說明、強調、解釋，是日語中非常常用的表達。\n' +
        '2. 正式場合用「〜のだ」，口語用「〜んだ」。\n' +
        '3. 接續規則：\n' +
        '   - 動詞、い形容詞：直接接「のだ」\n' +
        '   - な形容詞、名詞：加「な」再接「のだ」\n' +
        '4. 常見用法：\n' +
        '   - 說明原因（為什麼）\n' +
        '   - 強調事實（就是這樣）\n' +
        '   - 解釋情況（其實是...）',
      'en':
        'Learning tips:\n' +
        '1. "〜のだ" / "〜んだ" is used for explanation, emphasis, or clarification, very common in Japanese.\n' +
        '2. Use "〜のだ" in formal situations, "〜んだ" in casual speech.\n' +
        '3. Attachment rules:\n' +
        '   - Verbs, い-adjectives: directly attach "のだ"\n' +
        '   - な-adjectives, nouns: add "な" then "のだ"\n' +
        '4. Common usages:\n' +
        '   - Explain reason (why)\n' +
        '   - Emphasize fact (that\'s how it is)\n' +
        '   - Explain situation (actually...)'
    }
  }
};

