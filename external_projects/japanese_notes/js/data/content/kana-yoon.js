// 拗音 - 詳細內容

export const kanaYoon = {
  id: 'kana-yoon',
  title: {
    'zh-TW': '拗音',
    'en': '拗音'
  },
  category: {
    type: 'kana',
    level: 'N5'
  },
  tags: ['basic', 'kana', 'yoon'],
  description: {
    'zh-TW': '拗音是由小寫「ゃ・ゅ・ょ」組成的合成音',
    'en': '拗音 are combined sounds using small 「ゃ・ゅ・ょ」.'
  },
  content: {
    overview: {
      'zh-TW':
        '拗音是由「い段」假名（き・し・ち・に・ひ・み・り・ぎ・じ・び・ぴ）加上小寫的「ゃ・ゅ・ょ」組成的合成音。拗音在日文中非常常見，需要特別練習才能正確發音。',
      'en':
        '拗音 are combined sounds formed by 「い段」 kana (き・し・ち・に・ひ・み・り・ぎ・じ・び・ぴ) plus small 「ゃ・ゅ・ょ」. 拗音 are very common in Japanese and require special practice to pronounce correctly.'
    },
    table: {
      'zh-TW': `
        <table class="yoon-table" style="width: 100%; border-collapse: collapse; margin: var(--spacing-lg) 0;">
          <thead>
            <tr>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">基本音</th>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">ゃ</th>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">ゅ</th>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">ょ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">き</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">きゃ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">きゅ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">きょ</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">し</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">しゃ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">しゅ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">しょ</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ち</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ちゃ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ちゅ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ちょ</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">に</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">にゃ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">にゅ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">にょ</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ひ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ひゃ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ひゅ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ひょ</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">み</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">みゃ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">みゅ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">みょ</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">り</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">りゃ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">りゅ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">りょ</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ぎ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ぎゃ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ぎゅ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ぎょ</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">じ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">じゃ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">じゅ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">じょ</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">び</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">びゃ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">びゅ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">びょ</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ぴ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ぴゃ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ぴゅ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ぴょ</td>
            </tr>
          </tbody>
        </table>
      `,
      'en': `
        <table class="yoon-table" style="width: 100%; border-collapse: collapse; margin: var(--spacing-lg) 0;">
          <thead>
            <tr>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">Base</th>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">ゃ</th>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">ゅ</th>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">ょ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">き</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">きゃ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">きゅ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">きょ</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">し</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">しゃ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">しゅ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">しょ</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ち</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ちゃ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ちゅ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ちょ</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">に</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">にゃ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">にゅ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">にょ</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ひ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ひゃ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ひゅ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ひょ</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">み</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">みゃ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">みゅ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">みょ</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">り</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">りゃ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">りゅ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">りょ</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ぎ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ぎゃ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ぎゅ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ぎょ</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">じ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">じゃ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">じゅ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">じょ</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">び</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">びゃ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">びゅ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">びょ</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ぴ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ぴゃ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ぴゅ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ぴょ</td>
            </tr>
          </tbody>
        </table>
      `
    },
    usage: {
      'zh-TW':
        '拗音的組成方式：\n' +
        '1. 基本音必須是「い段」假名（き・し・ち・に・ひ・み・り・ぎ・じ・び・ぴ）。\n' +
        '2. 加上小寫的「ゃ・ゅ・ょ」形成合成音。\n' +
        '3. 發音時要將前面的子音和後面的「ゃ・ゅ・ょ」一起念，不能分開。\n\n' +
        '常見的拗音單字：\n' +
        '- 「<ruby>百<rt>ひゃく</rt></ruby>」（一百）\n' +
        '- 「<ruby>病<rt>びょう</rt></ruby><ruby>院<rt>いん</rt></ruby>」（醫院）\n' +
        '- 「<ruby>教<rt>きょう</rt></ruby><ruby>室<rt>しつ</rt></ruby>」（教室）',
      'en':
        'How 拗音 are formed:\n' +
        '1. The base must be an 「い段」 kana (き・し・ち・に・ひ・み・り・ぎ・じ・び・ぴ).\n' +
        '2. Add small 「ゃ・ゅ・ょ」 to form combined sounds.\n' +
        '3. When pronouncing, combine the consonant with 「ゃ・ゅ・ょ」 as one sound, not separately.\n\n' +
        'Common words with 拗音:\n' +
        '- 「<ruby>百<rt>ひゃく</rt></ruby>」 (one hundred)\n' +
        '- 「<ruby>病<rt>びょう</rt></ruby><ruby>院<rt>いん</rt></ruby>」 (hospital)\n' +
        '- 「<ruby>教<rt>きょう</rt></ruby><ruby>室<rt>しつ</rt></ruby>」 (classroom)'
    },
    examples: [
      {
        japanese: '<ruby>百<rt>ひゃく</rt></ruby>',
        zhTW: '一百',
        en: 'one hundred',
        explanation: {
          'zh-TW': '「ひゃく」是拗音「ひゃ」加上「く」。',
          'en': '"ひゃく" combines 拗音 「ひゃ」 with 「く」.'
        }
      },
      {
        japanese: '<ruby>病<rt>びょう</rt></ruby><ruby>院<rt>いん</rt></ruby>',
        zhTW: '醫院',
        en: 'hospital',
        explanation: {
          'zh-TW': '「びょう」是拗音「びょ」加上「う」。',
          'en': '"びょう" combines 拗音 「びょ」 with 「う」.'
        }
      },
      {
        japanese: '<ruby>教<rt>きょう</rt></ruby><ruby>室<rt>しつ</rt></ruby>',
        zhTW: '教室',
        en: 'classroom',
        explanation: {
          'zh-TW': '「きょう」是拗音「きょ」加上「う」。',
          'en': '"きょう" combines 拗音 「きょ」 with 「う」.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 先熟悉五十音的基本音，再學習拗音。\n' +
        '2. 拗音的發音要特別注意，不能把「きゃ」念成「き」+「や」，而是一個音節。\n' +
        '3. 每天練習一行拗音，例如今天練「きゃ・きゅ・きょ」，明天練「しゃ・しゅ・しょ」。',
      'en':
        'Learning tips:\n' +
        '1. Master the basic 「五十音」 sounds first, then learn 拗音.\n' +
        '2. Pay special attention to pronunciation: 「きゃ」 is one syllable, not 「き」 + 「や」.\n' +
        '3. Practice one row of 拗音 per day, for example 「きゃ・きゅ・きょ」 today, 「しゃ・しゅ・しょ」 tomorrow.'
    },
    relatedContent: [
      {
        id: 'kana-hiragana',
        title: {
          'zh-TW': '五十音 平假名',
          'en': '「五十音」 Hiragana'
        }
      }
    ]
  }
};

