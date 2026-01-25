// 五十音 - 詳細內容

export const grammarKanaBasics = {
  id: 'grammar-kana-basics',
  title: {
    'zh-TW': '五十音',
    'en': '「五十音」 Chart'
  },
  category: {
    type: 'grammar',
    level: 'N5'
  },
  tags: ['basic', 'grammar', 'kana'],
  description: {
    'zh-TW': '日文的發音基礎：五十音圖',
    'en': 'Basic Japanese sounds: the 「五十音」 chart.'
  },
  content: {
    overview: {
      'zh-TW':
        '「五十音」是日文發音的基礎，由平假名和片假名組成。五十音圖將假名按照母音（あ・い・う・え・お）和子音有規則地排列，是學習日文的第一步。',
      'en':
        'The 「五十音」 chart is the foundation of Japanese pronunciation, consisting of hiragana and katakana. The chart arranges kana systematically by vowels (あ・い・う・え・お) and consonants, and is the first step in learning Japanese.'
    },
    table: {
      'zh-TW': `
        <table class="kana-table" style="width: 100%; border-collapse: collapse; margin: var(--spacing-lg) 0;">
          <thead>
            <tr>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">母音</th>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">あ段</th>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">い段</th>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">う段</th>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">え段</th>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">お段</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">あ行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">あ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">い</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">う</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">え</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">お</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">か行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">か</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">き</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">く</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">け</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">こ</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">さ行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">さ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">し</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">す</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">せ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">そ</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">た行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">た</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ち</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">つ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">て</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">と</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">な行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">な</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">に</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ぬ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ね</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">の</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">は行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">は</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ひ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ふ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">へ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ほ</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ま行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ま</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">み</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">む</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">め</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">も</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">や行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">や</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ゆ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">よ</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ら行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ら</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">り</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">る</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">れ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ろ</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">わ行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">わ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">を</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ん</td>
              <td colspan="5" style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ん</td>
            </tr>
          </tbody>
        </table>
      `,
      'en': `
        <table class="kana-table" style="width: 100%; border-collapse: collapse; margin: var(--spacing-lg) 0;">
          <thead>
            <tr>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">Vowel</th>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">あ段</th>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">い段</th>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">う段</th>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">え段</th>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">お段</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">あ row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">あ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">い</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">う</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">え</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">お</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">か row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">か</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">き</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">く</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">け</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">こ</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">さ row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">さ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">し</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">す</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">せ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">そ</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">た row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">た</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ち</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">つ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">て</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">と</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">な row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">な</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">に</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ぬ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ね</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">の</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">は row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">は</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ひ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ふ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">へ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ほ</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ま row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ま</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">み</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">む</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">め</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">も</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">や row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">や</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ゆ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">よ</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ら row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ら</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">り</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">る</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">れ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ろ</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">わ row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">わ</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">を</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ん</td>
              <td colspan="5" style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ん</td>
            </tr>
          </tbody>
        </table>
      `
    },
    usage: {
      'zh-TW':
        '五十音的基本分組：\n' +
        '1. 清音：あ行～わ行的基本音，如「あ」「か」「さ」等。\n' +
        '2. 濁音：在清音上加上濁點（゛），如「か → が」「さ → ざ」。\n' +
        '3. 半濁音：以「は行」為主，加上半濁點（゜），如「は → ぱ」。\n\n' +
        '在實際閱讀時，只要能快速辨認每個假名的發音，就能順利念出大部分單字。',
      'en':
        'Basic groups of 「五十音」:\n' +
        '1. 清音：base sounds from あ to わ rows, such as 「あ」「か」「さ」.\n' +
        '2. 濁音：add a dakuten (゛) to make voiced sounds, e.g. 「か → が」「さ → ざ」.\n' +
        '3. 半濁音：mainly the は row with a handakuten (゜), e.g. 「は → ぱ」.\n\n' +
        'Once you can quickly recognize each kana and its sound, you can read most basic Japanese words.'
    },
    examples: [
      {
        japanese: '<ruby>私<rt>わたし</rt></ruby>は<ruby>学<rt>がく</rt></ruby><ruby>生<rt>せい</rt></ruby>です。',
        zhTW: '我是學生。',
        en: 'I am a student.',
        explanation: {
          'zh-TW': '這個句子使用了五十音中的「わ」「た」「し」「が」「く」「せ」「い」等假名。',
          'en': 'This sentence uses kana from the 「五十音」 chart such as 「わ」「た」「し」「が」「く」「せ」「い」.'
        }
      },
      {
        japanese: '<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>みます。',
        zhTW: '讀書。',
        en: 'I read a book.',
        explanation: {
          'zh-TW': '「ほ」「ん」「を」「よ」「み」「ま」「す」都是五十音中的基本假名。',
          'en': '「ほ」「ん」「を」「よ」「み」「ま」「す」 are all basic kana from the 「五十音」 chart.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '建議的學習順序：\n' +
        '1. 先熟悉平假名的五十音圖，再學片假名。\n' +
        '2. 同時練習「書寫順序」與「發音」，避免只會念不會寫。\n' +
        '3. 每天練習一行，例如今天練「あ行」，明天練「か行」。',
      'en':
        'Suggested learning order:\n' +
        '1. Learn the hiragana 「五十音」 first, then katakana.\n' +
        '2. Practice both stroke order and pronunciation, not only reading.\n' +
        '3. Practice one row per day, for example 「あ row」 today, 「か row」 tomorrow.'
    },
    relatedContent: [
      {
        id: 'grammar-yoon',
        title: {
          'zh-TW': '拗音',
          'en': '拗音'
        }
      }
    ]
  }
};
