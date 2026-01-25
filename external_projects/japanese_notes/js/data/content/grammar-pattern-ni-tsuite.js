// 句型「〜について」 - 詳細內容

export const grammarPatternNiTsuite = {
  id: 'grammar-pattern-ni-tsuite',
  title: {
    'zh-TW': '句型「〜について」',
    'en': 'Pattern "〜について"'
  },
  category: {
    type: 'grammar',
    level: 'N3'
  },
  tags: ['grammar', 'particle'],
  description: {
    'zh-TW': '「〜について」表示「關於...」「有關...」',
    'en': '"〜について" expresses "about...", "regarding..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜について」接在名詞後面，表示「關於...」「有關...」。用於表達話題、主題、對象等。',
      'en':
        '"〜について" is attached to nouns to express "about...", "regarding...". Used to express topics, subjects, objects, etc.'
    },
    usage: {
      'zh-TW':
        '「〜について」的用法：\n' +
        '1. 表示話題：〜について（如「日本について」）\n' +
        '2. 表示主題：〜について（如「この問題について」）\n' +
        '3. 表示對象：〜について（如「彼について」）\n' +
        '4. 接續規則：名詞＋について\n' +
        '5. 禮貌形式：〜について（更正式）',
      'en':
        'Usage of "〜について":\n' +
        '1. Express topic: 〜について (e.g., "日本について")\n' +
        '2. Express subject: 〜について (e.g., "この問題について")\n' +
        '3. Express object: 〜について (e.g., "彼について")\n' +
        '4. Attachment rules: noun + について\n' +
        '5. Polite form: 〜について (more formal)'
    },
    examples: [
      {
        japanese: '<ruby>日<rt>に</rt></ruby><ruby>本<rt>ほん</rt></ruby>について<ruby>話<rt>はな</rt></ruby>しましょう。',
        zhTW: '讓我們談談日本吧。',
        en: 'Let\'s talk about Japan.',
        explanation: {
          'zh-TW': '「日本について」表示「關於日本」，表達話題。',
          'en': '"日本について" means "about Japan", expressing a topic.'
        }
      },
      {
        japanese: '<ruby>この<rt>この</rt></ruby><ruby>問<rt>もん</rt></ruby><ruby>題<rt>だい</rt></ruby>について<ruby>考<rt>かんが</rt></ruby>えましょう。',
        zhTW: '讓我們思考這個問題吧。',
        en: 'Let\'s think about this problem.',
        explanation: {
          'zh-TW': '「この問題について」表示「關於這個問題」，表達主題。',
          'en': '"この問題について" means "about this problem", expressing a subject.'
        }
      },
      {
        japanese: '<ruby>彼<rt>かれ</rt></ruby>について<ruby>何<rt>なに</rt></ruby>も<ruby>知<rt>し</rt></ruby>りません。',
        zhTW: '關於他，我什麼都不知道。',
        en: 'I don\'t know anything about him.',
        explanation: {
          'zh-TW': '「彼について」表示「關於他」，表達對象。',
          'en': '"彼について" means "about him", expressing an object.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜について」用於表達話題、主題、對象等。\n' +
        '2. 與「〜に関して」的區別：\n' +
        '   - について：關於...（一般話題）\n' +
        '   - に関して：關於...（更正式、書面語）\n' +
        '3. 接續規則：名詞＋について\n' +
        '4. 常用搭配：〜についての（關於...的）',
      'en':
        'Learning tips:\n' +
        '1. "〜について" is used to express topics, subjects, objects, etc.\n' +
        '2. Difference from "〜に関して":\n' +
        '   - について: About... (general topics)\n' +
        '   - に関して: About... (more formal, written language)\n' +
        '3. Attachment rules: noun + について\n' +
        '4. Common combination: 〜についての (about...)'
    }
  }
};

