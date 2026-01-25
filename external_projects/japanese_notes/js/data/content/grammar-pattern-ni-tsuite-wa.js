// 句型「〜について（は）」 - 詳細內容

export const grammarPatternNiTsuiteWa = {
  id: 'grammar-pattern-ni-tsuite-wa',
  title: {
    'zh-TW': '句型「〜について（は）」',
    'en': 'Pattern "〜について（は）"'
  },
  category: {
    type: 'grammar',
    level: 'N3'
  },
  tags: ['grammar', 'particle'],
  description: {
    'zh-TW': '「〜について（は）」表示「關於...（的話）」「有關...（的話）」',
    'en': '"〜について（は）" expresses "as for...", "regarding..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜について（は）」是「〜について」加上「は」的強調形式，表示「關於...（的話）」「有關...（的話）」。用於強調話題、主題，或與其他話題形成對比。',
      'en':
        '"〜について（は）" is the emphatic form of "〜について" with "は" added, expressing "as for...", "regarding...". Used to emphasize topics or subjects, or to contrast with other topics.'
    },
    usage: {
      'zh-TW':
        '「〜について（は）」的用法：\n' +
        '1. 表示話題：〜について（は）（如「この問題について（は）」）\n' +
        '2. 表示對比：〜について（は）（如「他のことについて（は）」）\n' +
        '3. 表示強調：〜について（は）（如「この件について（は）」）\n' +
        '4. 接續規則：名詞＋について（は）',
      'en':
        'Usage of "〜について（は）":\n' +
        '1. Express topic: 〜について（は） (e.g., "この問題について（は）")\n' +
        '2. Express contrast: 〜について（は） (e.g., "他のことについて（は）")\n' +
        '3. Express emphasis: 〜について（は） (e.g., "この件について（は）")\n' +
        '4. Attachment rules: noun + について（は）'
    },
    examples: [
      {
        japanese: '<ruby>この<rt>この</rt></ruby><ruby>問<rt>もん</rt></ruby><ruby>題<rt>だい</rt></ruby>について（は）<ruby>後<rt>あと</rt></ruby>で<ruby>話<rt>はな</rt></ruby>しましょう。',
        zhTW: '關於這個問題，我們之後再談吧。',
        en: 'As for this problem, let\'s talk about it later.',
        explanation: {
          'zh-TW': '「この問題について（は）」表示「關於這個問題」，強調話題。',
          'en': '"この問題について（は）" means "as for this problem", emphasizing the topic.'
        }
      },
      {
        japanese: '<ruby>他<rt>ほか</rt></ruby>の<ruby>こと<rt>こと</rt></ruby>について（は）<ruby>何<rt>なに</rt></ruby>も<ruby>言<rt>い</rt></ruby>いません。',
        zhTW: '關於其他事情，我什麼都不說。',
        en: 'As for other things, I won\'t say anything.',
        explanation: {
          'zh-TW': '「他のことについて（は）」表示「關於其他事情」，形成對比。',
          'en': '"他のことについて（は）" means "as for other things", forming a contrast.'
        }
      },
      {
        japanese: '<ruby>この<rt>この</rt></ruby><ruby>件<rt>けん</rt></ruby>について（は）<ruby>詳<rt>くわ</rt></ruby>しく<ruby>調<rt>しら</rt></ruby>べます。',
        zhTW: '關於這件事，我會詳細調查。',
        en: 'As for this matter, I will investigate it in detail.',
        explanation: {
          'zh-TW': '「この件について（は）」表示「關於這件事」，強調主題。',
          'en': '"この件について（は）" means "as for this matter", emphasizing the subject.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜について（は）」是「〜について」的強調形式，用於強調話題或形成對比。\n' +
        '2. 「は」可以省略，但加上「は」會更強調。\n' +
        '3. 與「〜については」的區別：\n' +
        '   - について（は）：關於...（的話）（強調、對比）\n' +
        '   - について：關於...（一般話題）\n' +
        '4. 接續規則：名詞＋について（は）',
      'en':
        'Learning tips:\n' +
        '1. "〜について（は）" is the emphatic form of "〜について", used to emphasize topics or form contrasts.\n' +
        '2. "は" can be omitted, but adding "は" adds more emphasis.\n' +
        '3. Difference from "〜について":\n' +
        '   - について（は）: As for... (emphasis, contrast)\n' +
        '   - について: About... (general topic)\n' +
        '4. Attachment rules: noun + について（は）'
    }
  }
};

