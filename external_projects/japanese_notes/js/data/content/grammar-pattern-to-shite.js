// 句型「〜として」 - 詳細內容

export const grammarPatternToShite = {
  id: 'grammar-pattern-to-shite',
  title: {
    'zh-TW': '句型「〜として」',
    'en': 'Pattern "〜として"'
  },
  category: {
    type: 'grammar',
    level: 'N3'
  },
  tags: ['grammar', 'particle'],
  description: {
    'zh-TW': '「〜として」表示「作為...」「以...的身份」',
    'en': '"〜として" expresses "as...", "in the role of..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜として」接在名詞後面，表示「作為...」「以...的身份」「以...的立場」。用於表達身份、立場、資格等。',
      'en':
        '"〜として" is attached to nouns to express "as...", "in the role of...", "from the standpoint of...". Used to express identity, position, qualification, etc.'
    },
    usage: {
      'zh-TW':
        '「〜として」的用法：\n' +
        '1. 表示身份：〜として（如「学生として」）\n' +
        '2. 表示立場：〜として（如「代表として」）\n' +
        '3. 表示資格：〜として（如「専門家として」）\n' +
        '4. 接續規則：名詞＋として',
      'en':
        'Usage of "〜として":\n' +
        '1. Express identity: 〜として (e.g., "学生として")\n' +
        '2. Express position: 〜として (e.g., "代表として")\n' +
        '3. Express qualification: 〜として (e.g., "専門家として")\n' +
        '4. Attachment rules: noun + として'
    },
    examples: [
      {
        japanese: '<ruby>学<rt>がく</rt></ruby><ruby>生<rt>せい</rt></ruby>として<ruby>日<rt>に</rt></ruby><ruby>本<rt>ほん</rt></ruby>に<ruby>来<rt>き</rt></ruby>ました。',
        zhTW: '作為學生來到日本。',
        en: 'I came to Japan as a student.',
        explanation: {
          'zh-TW': '「学生として」表示「作為學生」，表達身份。',
          'en': '"学生として" means "as a student", expressing identity.'
        }
      },
      {
        japanese: '<ruby>代<rt>だい</rt></ruby><ruby>表<rt>ひょう</rt></ruby>として<ruby>発<rt>はつ</rt></ruby><ruby>言<rt>げん</rt></ruby>しました。',
        zhTW: '作為代表發言了。',
        en: 'I spoke as a representative.',
        explanation: {
          'zh-TW': '「代表として」表示「作為代表」，表達立場。',
          'en': '"代表として" means "as a representative", expressing position.'
        }
      },
      {
        japanese: '<ruby>専<rt>せん</rt></ruby><ruby>門<rt>もん</rt></ruby><ruby>家<rt>か</rt></ruby>として<ruby>意<rt>い</rt></ruby><ruby>見<rt>けん</rt></ruby>を<ruby>述<rt>の</rt></ruby>べました。',
        zhTW: '作為專家發表了意見。',
        en: 'I expressed my opinion as an expert.',
        explanation: {
          'zh-TW': '「専門家として」表示「作為專家」，表達資格。',
          'en': '"専門家として" means "as an expert", expressing qualification.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜として」用於表達身份、立場、資格等。\n' +
        '2. 與「〜にとって」的區別：\n' +
        '   - として：作為...（身份、立場）\n' +
        '   - にとって：對...來說（評價、影響）\n' +
        '3. 接續規則：名詞＋として\n' +
        '4. 常用搭配：〜としての（作為...的）',
      'en':
        'Learning tips:\n' +
        '1. "〜として" is used to express identity, position, qualification, etc.\n' +
        '2. Difference from "〜にとって":\n' +
        '   - として: As... (identity, position)\n' +
        '   - にとって: For... (evaluation, impact)\n' +
        '3. Attachment rules: noun + として\n' +
        '4. Common combination: 〜としての (as a...)'
    }
  }
};

