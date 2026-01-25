// 句型「〜そうだ」（傳聞） - 詳細內容

export const grammarPatternSouDaHearsay = {
  id: 'grammar-pattern-sou-da-hearsay',
  title: {
    'zh-TW': '句型「〜そうだ」（傳聞）',
    'en': 'Pattern "〜そうだ" (Hearsay)'
  },
  category: {
    type: 'grammar',
    level: 'N4'
  },
  tags: ['grammar'],
  description: {
    'zh-TW': '「〜そうだ」表示「聽說...」「據說...」',
    'en': '"〜そうだ" expresses "I hear that...", "it is said that..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜そうだ」接在動詞、形容詞的普通形後面，表示「聽說...」「據說...」。用於表達根據傳聞或間接信息做出的陳述。注意：傳聞的「そうだ」與樣態的「そうだ」形式相同但用法不同。',
      'en':
        '"〜そうだ" is attached to the plain form of verbs and adjectives to express "I hear that...", "it is said that...". Used to express statements based on hearsay or indirect information. Note: The hearsay "そうだ" has the same form as the appearance "そうだ" but different usage.'
    },
    usage: {
      'zh-TW':
        '「〜そうだ」（傳聞）的用法：\n' +
        '1. 接動詞普通形：〜そうだ（如「降るそうだ」）\n' +
        '2. 接い形容詞普通形：〜そうだ（如「美味しいそうだ」）\n' +
        '3. 接な形容詞普通形：〜そうだ（如「元気だそうだ」）\n' +
        '4. 接名詞：〜だそうだ（如「学生だそうだ」）\n' +
        '5. 變化：そうだ可以像な形容詞一樣變化（そうではない、そうだった等）',
      'en':
        'Usage of "〜そうだ" (hearsay):\n' +
        '1. Attach to verb plain form: 〜そうだ (e.g., "降るそうだ")\n' +
        '2. Attach to い-adjective plain form: 〜そうだ (e.g., "美味しいそうだ")\n' +
        '3. Attach to な-adjective plain form: 〜そうだ (e.g., "元気だそうだ")\n' +
        '4. Attach to noun: 〜だそうだ (e.g., "学生だそうだ")\n' +
        '5. Conjugation: そうだ can be conjugated like a な-adjective (そうではない, そうだった, etc.)'
    },
    examples: [
      {
        japanese: '<ruby>明日<rt>あした</rt></ruby>は<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>るそうです。',
        zhTW: '聽說明天會下雨。',
        en: 'I hear it will rain tomorrow.',
        explanation: {
          'zh-TW': '「降るそうだ」表示「聽說會下雨」，根據傳聞或間接信息。',
          'en': '"降るそうだ" means "I hear it will rain", based on hearsay or indirect information.'
        }
      },
      {
        japanese: '<ruby>その<rt>その</rt></ruby><ruby>店<rt>みせ</rt></ruby>の<ruby>料<rt>りょう</rt></ruby><ruby>理<rt>り</rt></ruby>は<ruby>美味<rt>おい</rt></ruby>しいそうです。',
        zhTW: '聽說那家店的料理很好吃。',
        en: 'I hear that restaurant\'s food is delicious.',
        explanation: {
          'zh-TW': '「美味しいそうだ」表示「聽說很好吃」，根據傳聞。',
          'en': '"美味しいそうだ" means "I hear it\'s delicious", based on hearsay.'
        }
      },
      {
        japanese: '<ruby>彼<rt>かれ</rt></ruby>は<ruby>学生<rt>がくせい</rt></ruby>だそうです。',
        zhTW: '聽說他是學生。',
        en: 'I hear he is a student.',
        explanation: {
          'zh-TW': '「学生だそうだ」表示「聽說是學生」，根據傳聞。',
          'en': '"学生だそうだ" means "I hear he is a student", based on hearsay.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 傳聞的「そうだ」接動詞、形容詞普通形，表示根據傳聞的陳述。\n' +
        '2. 與樣態「そうだ」的區別：\n' +
        '   - 傳聞：接普通形（降るそうだ、美味しいそうだ）\n' +
        '   - 樣態：接ます形詞幹或形容詞詞幹（降りそうだ、美味しそうだ）\n' +
        '3. 傳聞「そうだ」通常用於轉述他人的話或間接信息。',
      'en':
        'Learning tips:\n' +
        '1. Hearsay "そうだ" is attached to the plain form of verbs and adjectives to express statements based on hearsay.\n' +
        '2. Difference from appearance "そうだ":\n' +
        '   - Hearsay: attached to plain form (降るそうだ, 美味しいそうだ)\n' +
        '   - Appearance: attached to ます stem or adjective stem (降りそうだ, 美味しそうだ)\n' +
        '3. Hearsay "そうだ" is usually used to report what others said or indirect information.'
    }
  }
};

