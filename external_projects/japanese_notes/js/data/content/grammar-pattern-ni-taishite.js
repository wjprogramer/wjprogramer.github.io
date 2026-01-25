// 句型「〜に対して」 - 詳細內容

export const grammarPatternNiTaishite = {
  id: 'grammar-pattern-ni-taishite',
  title: {
    'zh-TW': '句型「〜に対して」',
    'en': 'Pattern "〜に対して"'
  },
  category: {
    type: 'grammar',
    level: 'N3'
  },
  tags: ['grammar', 'particle'],
  description: {
    'zh-TW': '「〜に対して」表示「對...」「對於...」「與...相對」',
    'en': '"〜に対して" expresses "toward...", "against...", "in contrast to..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜に対して」接在名詞後面，表示「對...」「對於...」「與...相對」。用於表達對象、對比、態度等。',
      'en':
        '"〜に対して" is attached to nouns to express "toward...", "against...", "in contrast to...". Used to express objects, contrasts, attitudes, etc.'
    },
    usage: {
      'zh-TW':
        '「〜に対して」的用法：\n' +
        '1. 表示對象：〜に対して（如「学生に対して」）\n' +
        '2. 表示對比：〜に対して（如「昨日に対して」）\n' +
        '3. 表示態度：〜に対して（如「親に対して」）\n' +
        '4. 接續規則：名詞＋に対して',
      'en':
        'Usage of "〜に対して":\n' +
        '1. Express object: 〜に対して (e.g., "学生に対して")\n' +
        '2. Express contrast: 〜に対して (e.g., "昨日に対して")\n' +
        '3. Express attitude: 〜に対して (e.g., "親に対して")\n' +
        '4. Attachment rules: noun + に対して'
    },
    examples: [
      {
        japanese: '<ruby>学<rt>がく</rt></ruby><ruby>生<rt>せい</rt></ruby>に対して<ruby>説<rt>せつ</rt></ruby><ruby>明<rt>めい</rt></ruby>しました。',
        zhTW: '對學生說明了。',
        en: 'I explained to the students.',
        explanation: {
          'zh-TW': '「学生に対して」表示「對學生」，表達對象。',
          'en': '"学生に対して" means "toward students", expressing an object.'
        }
      },
      {
        japanese: '<ruby>今<rt>こん</rt></ruby><ruby>年<rt>ねん</rt></ruby>は<ruby>去<rt>きょ</rt></ruby><ruby>年<rt>ねん</rt></ruby>に対して<ruby>売<rt>う</rt></ruby><ruby>上<rt>あげ</rt></ruby>が<ruby>増<rt>ふ</rt></ruby>えました。',
        zhTW: '今年與去年相比，銷售額增加了。',
        en: 'Sales increased this year compared to last year.',
        explanation: {
          'zh-TW': '「去年に対して」表示「與去年相比」，表達對比。',
          'en': '"去年に対して" means "compared to last year", expressing a contrast.'
        }
      },
      {
        japanese: '<ruby>親<rt>おや</rt></ruby>に対して<ruby>感<rt>かん</rt></ruby><ruby>謝<rt>しゃ</rt></ruby>しています。',
        zhTW: '對父母表示感謝。',
        en: 'I am grateful to my parents.',
        explanation: {
          'zh-TW': '「親に対して」表示「對父母」，表達態度。',
          'en': '"親に対して" means "toward parents", expressing an attitude.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜に対して」用於表達對象、對比、態度等。\n' +
        '2. 與「〜について」的區別：\n' +
        '   - に対して：對...（動作的對象、對比）\n' +
        '   - について：關於...（話題、主題）\n' +
        '3. 接續規則：名詞＋に対して\n' +
        '4. 常用搭配：〜に対する（對...的）',
      'en':
        'Learning tips:\n' +
        '1. "〜に対して" is used to express objects, contrasts, attitudes, etc.\n' +
        '2. Difference from "〜について":\n' +
        '   - に対して: Toward... (object of action, contrast)\n' +
        '   - について: About... (topic, subject)\n' +
        '3. Attachment rules: noun + に対して\n' +
        '4. Common combination: 〜に対する (toward...)'
    }
  }
};

