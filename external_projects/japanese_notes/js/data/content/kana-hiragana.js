// 五十音 平假名 - 詳細內容

export const kanaHiragana = {
  id: 'kana-hiragana',
  title: {
    'zh-TW': '平假名',
    'en': 'Hiragana'
  },
  category: {
    type: 'kana',
    level: 'N5'
  },
  tags: ['basic', 'kana', 'hiragana'],
  description: {
    'zh-TW': '平假名的完整五十音圖',
    'en': 'Complete hiragana 「五十音」 chart.'
  },
  content: {
    overview: {
      'zh-TW':
        '平假名是日文中最常用的文字系統，用於書寫日文單字、文法助詞等。平假名的五十音圖包含あ行到わ行，共46個基本假名，加上撥音「ん」，是學習日文的基礎。',
      'en':
        'Hiragana is the most commonly used writing system in Japanese, used for writing Japanese words, grammatical particles, etc. The hiragana 「五十音」 chart contains rows from あ to わ, totaling 46 basic kana, plus the nasal sound 「ん」, forming the foundation of learning Japanese.'
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
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">あ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">a</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">い<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">i</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">う<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">u</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">え<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">e</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">お<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">o</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">か行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">か<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ka</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">き<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ki</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">く<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ku</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">け<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ke</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">こ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ko</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">さ行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">さ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">sa</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">し<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">shi</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">す<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">su</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">せ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">se</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">そ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">so</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">た行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">た<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ta</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ち<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">chi</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">つ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">tsu</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">て<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">te</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">と<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">to</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">な行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">な<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">na</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">に<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ni</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ぬ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">nu</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ね<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ne</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">の<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">no</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">は行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">は<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ha</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ひ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">hi</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ふ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">fu</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">へ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">he</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ほ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ho</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ま行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ま<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ma</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">み<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">mi</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">む<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">mu</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">め<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">me</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">も<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">mo</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">や行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">や<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ya</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ゆ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">yu</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">よ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">yo</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ら行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ら<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ra</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">り<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ri</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">る<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ru</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">れ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">re</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ろ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ro</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">わ行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">わ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">wa</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">を<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">wo</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ん</td>
              <td colspan="5" style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ん<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">n</span></td>
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
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">あ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">a</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">い<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">i</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">う<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">u</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">え<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">e</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">お<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">o</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">か row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">か<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ka</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">き<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ki</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">く<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ku</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">け<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ke</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">こ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ko</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">さ row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">さ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">sa</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">し<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">shi</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">す<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">su</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">せ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">se</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">そ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">so</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">た row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">た<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ta</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ち<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">chi</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">つ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">tsu</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">て<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">te</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">と<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">to</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">な row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">な<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">na</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">に<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ni</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ぬ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">nu</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ね<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ne</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">の<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">no</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">は row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">は<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ha</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ひ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">hi</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ふ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">fu</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">へ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">he</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ほ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ho</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ま row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ま<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ma</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">み<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">mi</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">む<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">mu</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">め<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">me</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">も<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">mo</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">や row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">や<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ya</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ゆ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">yu</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">よ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">yo</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ら row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ら<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ra</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">り<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ri</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">る<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ru</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">れ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">re</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ろ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ro</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">わ row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">わ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">wa</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">を<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">wo</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ん</td>
              <td colspan="5" style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ん<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">n</span></td>
            </tr>
          </tbody>
        </table>
      `
    },
    usage: {
      'zh-TW':
        '平假名的使用場合：\n' +
        '1. 書寫日文單字（特別是動詞、形容詞的活用形）\n' +
        '2. 文法助詞（如「は」「が」「を」等）\n' +
        '3. 無法用漢字表示的語助詞、感嘆詞\n' +
        '4. 為漢字標註讀音（振假名）',
      'en':
        'When to use hiragana:\n' +
        '1. Writing Japanese words (especially verb and adjective conjugations)\n' +
        '2. Grammatical particles (such as 「は」「が」「を」)\n' +
        '3. Interjections and particles that cannot be written in kanji\n' +
        '4. Providing pronunciation guides for kanji (furigana)'
    },
    examples: [
      {
        japanese: '<ruby>私<rt>わたし</rt></ruby>は<ruby>学<rt>がく</rt></ruby><ruby>生<rt>せい</rt></ruby>です。',
        zhTW: '我是學生。',
        en: 'I am a student.',
        explanation: {
          'zh-TW': '「わたし」是平假名，「は」是助詞，也用平假名書寫。',
          'en': '"わたし" is written in hiragana, and 「は」 is a particle also written in hiragana.'
        }
      },
      {
        japanese: '<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>みます。',
        zhTW: '讀書。',
        en: 'I read a book.',
        explanation: {
          'zh-TW': '「を」「みます」都是平假名，動詞的活用形通常用平假名書寫。',
          'en': '"を" and "みます" are both hiragana. Verb conjugations are typically written in hiragana.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 先熟悉平假名的五十音圖，這是學習日文的基礎。\n' +
        '2. 練習書寫順序，每個假名都有固定的筆順。\n' +
        '3. 每天練習一行，例如今天練「あ行」，明天練「か行」。',
      'en':
        'Learning tips:\n' +
        '1. Master the hiragana 「五十音」 chart first, as it is the foundation of learning Japanese.\n' +
        '2. Practice stroke order; each kana has a fixed writing order.\n' +
        '3. Practice one row per day, for example 「あ row」 today, 「か row」 tomorrow.'
    },
    relatedContent: [
      {
        id: 'kana-katakana',
        title: {
          'zh-TW': '五十音 片假名',
          'en': '「五十音」 Katakana'
        }
      }
    ]
  }
};

