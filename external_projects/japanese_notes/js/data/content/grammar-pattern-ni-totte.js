// 句型「〜にとって」 - 詳細內容

export const grammarPatternNiTotte = {
  id: 'grammar-pattern-ni-totte',
  title: {
    'zh-TW': '句型「〜にとって」',
    'en': 'Pattern "〜にとって"'
  },
  category: {
    type: 'grammar',
    level: 'N3'
  },
  tags: ['grammar', 'particle'],
  description: {
    'zh-TW': '「〜にとって」表示「對...來說」「對...而言」',
    'en': '"〜にとって" expresses "for...", "to..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜にとって」接在名詞後面，表示「對...來說」「對...而言」。用於表達從某個立場、角度、觀點來看的情況。',
      'en':
        '"〜にとって" is attached to nouns to express "for...", "to...". Used to express situations from a certain standpoint, angle, or perspective.'
    },
    usage: {
      'zh-TW':
        '「〜にとって」的用法：\n' +
        '1. 表示立場：〜にとって（如「私にとって」）\n' +
        '2. 表示角度：〜にとって（如「学生にとって」）\n' +
        '3. 表示觀點：〜にとって（如「会社にとって」）\n' +
        '4. 接續規則：名詞＋にとって',
      'en':
        'Usage of "〜にとって":\n' +
        '1. Express standpoint: 〜にとって (e.g., "私にとって")\n' +
        '2. Express angle: 〜にとって (e.g., "学生にとって")\n' +
        '3. Express perspective: 〜にとって (e.g., "会社にとって")\n' +
        '4. Attachment rules: noun + にとって'
    },
    examples: [
      {
        japanese: '<ruby>私<rt>わたし</rt></ruby>にとって<ruby>家<rt>いえ</rt></ruby><ruby>族<rt>ぞく</rt></ruby>は<ruby>最<rt>さい</rt></ruby><ruby>重<rt>じゅう</rt></ruby><ruby>要<rt>よう</rt></ruby>です。',
        zhTW: '對我來說，家庭是最重要的。',
        en: 'For me, family is the most important.',
        explanation: {
          'zh-TW': '「私にとって」表示「對我來說」，表達個人立場。',
          'en': '"私にとって" means "for me", expressing personal standpoint.'
        }
      },
      {
        japanese: '<ruby>学<rt>がく</rt></ruby><ruby>生<rt>せい</rt></ruby>にとって<ruby>勉<rt>べん</rt></ruby><ruby>強<rt>きょう</rt></ruby>は<ruby>大<rt>たい</rt></ruby><ruby>切<rt>せつ</rt></ruby>です。',
        zhTW: '對學生來說，學習很重要。',
        en: 'For students, studying is important.',
        explanation: {
          'zh-TW': '「学生にとって」表示「對學生來說」，表達角度。',
          'en': '"学生にとって" means "for students", expressing an angle.'
        }
      },
      {
        japanese: '<ruby>会<rt>かい</rt></ruby><ruby>社<rt>しゃ</rt></ruby>にとって<ruby>人<rt>じん</rt></ruby><ruby>材<rt>ざい</rt></ruby>は<ruby>重<rt>じゅう</rt></ruby><ruby>要<rt>よう</rt></ruby>です。',
        zhTW: '對公司來說，人才很重要。',
        en: 'For the company, human resources are important.',
        explanation: {
          'zh-TW': '「会社にとって」表示「對公司來說」，表達觀點。',
          'en': '"会社にとって" means "for the company", expressing a perspective.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜にとって」用於表達從某個立場、角度、觀點來看的情況。\n' +
        '2. 與「〜として」的區別：\n' +
        '   - にとって：對...來說（評價、影響）\n' +
        '   - として：作為...（身份、立場）\n' +
        '3. 接續規則：名詞＋にとって\n' +
        '4. 常用搭配：〜にとっての（對...來說的）',
      'en':
        'Learning tips:\n' +
        '1. "〜にとって" is used to express situations from a certain standpoint, angle, or perspective.\n' +
        '2. Difference from "〜として":\n' +
        '   - にとって: For... (evaluation, impact)\n' +
        '   - として: As... (identity, position)\n' +
        '3. Attachment rules: noun + にとって\n' +
        '4. Common combination: 〜にとっての (for...)'
    }
  }
};

