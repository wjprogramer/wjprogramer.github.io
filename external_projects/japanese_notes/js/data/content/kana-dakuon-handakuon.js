// 濁音・半濁音 - 詳細內容

export const kanaDakuonHandakuon = {
  id: 'kana-dakuon-handakuon',
  title: {
    'zh-TW': '濁音・半濁音',
    'en': '濁音・半濁音 (Voiced Sounds)'
  },
  category: {
    type: 'kana',
    level: 'N5'
  },
  tags: ['basic', 'kana', 'dakuon', 'handakuon'],
  description: {
    'zh-TW': '濁音和半濁音是在清音上加上濁點或半濁點形成的音',
    'en': '濁音 and 半濁音 are sounds formed by adding dakuten or handakuten to 清音.'
  },
  content: {
    overview: {
      'zh-TW':
        '濁音是在清音上加上濁點（゛）形成的音，如「か→が」「さ→ざ」。半濁音是在「は行」上加上半濁點（゜）形成的音，如「は→ぱ」。濁音和半濁音在日文中非常常見。',
      'en':
        '濁音 are sounds formed by adding dakuten (゛) to 清音, such as 「か→が」「さ→ざ」. 半濁音 are sounds formed by adding handakuten (゜) to the 「は」 row, such as 「は→ぱ」. 濁音 and 半濁音 are very common in Japanese.'
    },
    table: {
      'zh-TW': `
        <table class="dakuon-table" style="width: 100%; border-collapse: collapse; margin: var(--spacing-lg) 0;">
          <thead>
            <tr>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">清音</th>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">濁音（゛）</th>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">半濁音（゜）</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">か行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">が・ぎ・ぐ・げ・ご</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">さ行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ざ・じ・ず・ぜ・ぞ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">た行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">だ・ぢ・づ・で・ど</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">は行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ば・び・ぶ・べ・ぼ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ぱ・ぴ・ぷ・ぺ・ぽ</td>
            </tr>
          </tbody>
        </table>
      `,
      'en': `
        <table class="dakuon-table" style="width: 100%; border-collapse: collapse; margin: var(--spacing-lg) 0;">
          <thead>
            <tr>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">清音</th>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">濁音（゛）</th>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">半濁音（゜）</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">か row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">が・ぎ・ぐ・げ・ご</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">さ row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ざ・じ・ず・ぜ・ぞ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">た row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">だ・ぢ・づ・で・ど</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">は row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ば・び・ぶ・べ・ぼ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ぱ・ぴ・ぷ・ぺ・ぽ</td>
            </tr>
          </tbody>
        </table>
      `
    },
    usage: {
      'zh-TW':
        '濁音和半濁音的形成：\n' +
        '1. 濁音：在「か・さ・た・は」行清音上加上濁點（゛）。\n' +
        '   - か行：か→が、き→ぎ、く→ぐ、け→げ、こ→ご\n' +
        '   - さ行：さ→ざ、し→じ、す→ず、せ→ぜ、そ→ぞ\n' +
        '   - た行：た→だ、ち→ぢ、つ→づ、て→で、と→ど\n' +
        '   - は行：は→ば、ひ→び、ふ→ぶ、へ→べ、ほ→ぼ\n' +
        '2. 半濁音：只在「は行」上加上半濁點（゜）。\n' +
        '   - は行：は→ぱ、ひ→ぴ、ふ→ぷ、へ→ぺ、ほ→ぽ',
      'en':
        'Formation of 濁音 and 半濁音:\n' +
        '1. 濁音: Add dakuten (゛) to 「か・さ・た・は」 row 清音.\n' +
        '   - か row: か→が、き→ぎ、く→ぐ、け→げ、こ→ご\n' +
        '   - さ row: さ→ざ、し→じ、す→ず、せ→ぜ、そ→ぞ\n' +
        '   - た row: た→だ、ち→ぢ、つ→づ、て→で、と→ど\n' +
        '   - は row: は→ば、ひ→び、ふ→ぶ、へ→べ、ほ→ぼ\n' +
        '2. 半濁音: Only add handakuten (゜) to the 「は」 row.\n' +
        '   - は row: は→ぱ、ひ→ぴ、ふ→ぷ、へ→ぺ、ほ→ぽ'
    },
    examples: [
      {
        japanese: '<ruby>学<rt>がく</rt></ruby><ruby>校<rt>こう</rt></ruby>',
        zhTW: '學校',
        en: 'school',
        explanation: {
          'zh-TW': '「が」是「か」的濁音。',
          'en': '"が" is the 濁音 of 「か」.'
        }
      },
      {
        japanese: '<ruby>雑<rt>ざっ</rt></ruby><ruby>誌<rt>し</rt></ruby>',
        zhTW: '雜誌',
        en: 'magazine',
        explanation: {
          'zh-TW': '「ざ」是「さ」的濁音。',
          'en': '"ざ" is the 濁音 of 「さ」.'
        }
      },
      {
        japanese: '<ruby>病<rt>びょう</rt></ruby><ruby>院<rt>いん</rt></ruby>',
        zhTW: '醫院',
        en: 'hospital',
        explanation: {
          'zh-TW': '「び」是「ひ」的濁音。',
          'en': '"び" is the 濁音 of 「ひ」.'
        }
      },
      {
        japanese: '<ruby>一<rt>いっ</rt></ruby><ruby>杯<rt>ぱい</rt></ruby>',
        zhTW: '一杯',
        en: 'one cup',
        explanation: {
          'zh-TW': '「ぱ」是「は」的半濁音。',
          'en': '"ぱ" is the 半濁音 of 「は」.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 濁音和半濁音是從清音變化而來，先熟練清音再學這些會比較容易。\n' +
        '2. 注意「は行」既有濁音（ば・び・ぶ・べ・ぼ）也有半濁音（ぱ・ぴ・ぷ・ぺ・ぽ）。\n' +
        '3. 濁音和半濁音的發音要清晰，不要與清音混淆。',
      'en':
        'Learning tips:\n' +
        '1. 濁音 and 半濁音 are derived from 清音, so mastering 清音 first will make these easier.\n' +
        '2. Note that the 「は」 row has both 濁音 (ば・び・ぶ・べ・ぼ) and 半濁音 (ぱ・ぴ・ぷ・ぺ・ぽ).\n' +
        '3. Pronounce 濁音 and 半濁音 clearly, don\'t confuse them with 清音.'
    },
    relatedContent: [
      {
        id: 'kana-seion',
        title: {
          'zh-TW': '清音',
          'en': '清音'
        }
      },
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

