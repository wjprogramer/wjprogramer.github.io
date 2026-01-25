// 五十音 片假名 - 詳細內容

export const kanaKatakana = {
  id: 'kana-katakana',
  title: {
    'zh-TW': '片假名',
    'en': 'Katakana'
  },
  category: {
    type: 'kana',
    level: 'N5'
  },
  tags: ['basic', 'kana', 'katakana'],
  description: {
    'zh-TW': '片假名的完整五十音圖',
    'en': 'Complete katakana 「五十音」 chart.'
  },
  content: {
    overview: {
      'zh-TW':
        '片假名主要用於書寫外來語、擬聲詞、動植物名稱等。片假名的五十音圖與平假名對應，但字形較為方正、直線較多。',
      'en':
        'Katakana is primarily used for writing loanwords, onomatopoeia, and names of plants and animals. The katakana 「五十音」 chart corresponds to hiragana, but the characters are more angular with more straight lines.'
    },
    table: {
      'zh-TW': `
        <table class="kana-table" style="width: 100%; border-collapse: collapse; margin: var(--spacing-lg) 0;">
          <thead>
            <tr>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">母音</th>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">ア段</th>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">イ段</th>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">ウ段</th>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">エ段</th>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">オ段</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ア行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ア<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">a</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">イ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">i</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ウ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">u</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">エ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">e</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">オ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">o</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">カ行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">カ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ka</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">キ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ki</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ク<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ku</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ケ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ke</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">コ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ko</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">サ行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">サ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">sa</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">シ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">shi</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ス<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">su</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">セ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">se</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ソ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">so</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">タ行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">タ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ta</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">チ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">chi</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ツ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">tsu</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">テ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">te</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ト<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">to</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ナ行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ナ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">na</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ニ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ni</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ヌ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">nu</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ネ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ne</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ノ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">no</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ハ行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ハ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ha</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ヒ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">hi</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">フ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">fu</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ヘ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">he</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ホ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ho</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">マ行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">マ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ma</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ミ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">mi</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ム<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">mu</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">メ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">me</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">モ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">mo</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ヤ行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ヤ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ya</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ユ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">yu</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ヨ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">yo</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ラ行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ラ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ra</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">リ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ri</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ル<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ru</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">レ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">re</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ロ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ro</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ワ行</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ワ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">wa</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ヲ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">wo</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ン</td>
              <td colspan="5" style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ン<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">n</span></td>
            </tr>
          </tbody>
        </table>
      `,
      'en': `
        <table class="kana-table" style="width: 100%; border-collapse: collapse; margin: var(--spacing-lg) 0;">
          <thead>
            <tr>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">Vowel</th>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">ア段</th>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">イ段</th>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">ウ段</th>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">エ段</th>
              <th style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary);">オ段</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ア row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ア<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">a</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">イ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">i</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ウ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">u</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">エ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">e</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">オ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">o</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">カ row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">カ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ka</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">キ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ki</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ク<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ku</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ケ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ke</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">コ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ko</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">サ row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">サ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">sa</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">シ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">shi</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ス<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">su</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">セ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">se</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ソ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">so</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">タ row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">タ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ta</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">チ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">chi</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ツ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">tsu</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">テ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">te</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ト<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">to</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ナ row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ナ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">na</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ニ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ni</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ヌ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">nu</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ネ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ne</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ノ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">no</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ハ row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ハ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ha</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ヒ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">hi</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">フ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">fu</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ヘ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">he</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ホ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ho</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">マ row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">マ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ma</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ミ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">mi</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ム<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">mu</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">メ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">me</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">モ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">mo</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ヤ row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ヤ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ya</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ユ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">yu</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ヨ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">yo</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ラ row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ラ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ra</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">リ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ri</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ル<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ru</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">レ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">re</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ロ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">ro</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ワ row</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ワ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">wa</span></td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">-</td>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ヲ<br><span style="font-size: var(--text-sm); color: var(--text-secondary);">wo</span></td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); background: var(--bg-secondary); font-weight: bold;">ン</td>
              <td colspan="5" style="padding: var(--spacing-sm); border: 1px solid var(--border-subtle); text-align: center; font-size: var(--text-xl);">ン</td>
            </tr>
          </tbody>
        </table>
      `
    },
    usage: {
      'zh-TW':
        '片假名的使用場合：\n' +
        '1. 外來語（如「コーヒー」「テレビ」等）\n' +
        '2. 擬聲詞、擬態詞（如「ドキドキ」「ニコニコ」等）\n' +
        '3. 動植物名稱（如「ネコ」「サクラ」等）\n' +
        '4. 強調文字（類似中文的粗體）',
      'en':
        'When to use katakana:\n' +
        '1. Loanwords (such as 「コーヒー」「テレビ」)\n' +
        '2. Onomatopoeia and mimetic words (such as 「ドキドキ」「ニコニコ」)\n' +
        '3. Names of plants and animals (such as 「ネコ」「サクラ」)\n' +
        '4. Emphasis (similar to bold text in English)'
    },
    examples: [
      {
        japanese: 'コーヒーを<ruby>飲<rt>の</rt></ruby>みます。',
        zhTW: '喝咖啡。',
        en: 'I drink coffee.',
        explanation: {
          'zh-TW': '「コーヒー」是外來語，用片假名書寫。',
          'en': '"コーヒー" is a loanword, written in katakana.'
        }
      },
      {
        japanese: 'テレビを<ruby>見<rt>み</rt></ruby>ます。',
        zhTW: '看電視。',
        en: 'I watch TV.',
        explanation: {
          'zh-TW': '「テレビ」是外來語，用片假名書寫。',
          'en': '"テレビ" is a loanword, written in katakana.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 先熟悉平假名，再學習片假名會比較容易。\n' +
        '2. 片假名與平假名一一對應，可以對照學習。\n' +
        '3. 注意片假名的字形特點：較為方正、直線較多。',
      'en':
        'Learning tips:\n' +
        '1. Learn hiragana first, then katakana will be easier.\n' +
        '2. Katakana corresponds one-to-one with hiragana, so you can learn them together.\n' +
        '3. Note the characteristics of katakana: more angular with more straight lines.'
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

