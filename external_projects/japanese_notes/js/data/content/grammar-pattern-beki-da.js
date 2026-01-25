// 句型「〜べきだ」 - 詳細內容

export const grammarPatternBekiDa = {
  id: 'grammar-pattern-beki-da',
  title: {
    'zh-TW': '句型「〜べきだ」',
    'en': 'Pattern "〜べきだ"'
  },
  category: {
    type: 'grammar',
    level: 'N3'
  },
  tags: ['grammar', 'obligation'],
  description: {
    'zh-TW': '「〜べきだ」表示「應該...」「理應...」',
    'en': '"〜べきだ" expresses "should...", "ought to..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜べきだ」接在動詞的辭書形後面，表示「應該...」「理應...」。用於表達基於義務、責任、道德等的判斷。這是表達「應該做...」的重要句型。',
      'en':
        '"〜べきだ" is attached to the dictionary form of verbs to express "should...", "ought to...". Used to express judgments based on obligation, duty, morality, etc. This is an important pattern for expressing "should do...".'
    },
    usage: {
      'zh-TW':
        '「〜べきだ」的用法：\n' +
        '1. 表示義務：〜べきだ（如「勉強すべきだ」）\n' +
        '2. 表示責任：〜べきだ（如「謝るべきだ」）\n' +
        '3. 接續規則：動詞辭書形＋べきだ\n' +
        '4. 注意：「する」要變成「すべきだ」',
      'en':
        'Usage of "〜べきだ":\n' +
        '1. Express obligation: 〜べきだ (e.g., "勉強すべきだ")\n' +
        '2. Express duty: 〜べきだ (e.g., "謝るべきだ")\n' +
        '3. Attachment rules: verb dictionary form + べきだ\n' +
        '4. Note: "する" becomes "すべきだ"'
    },
    examples: [
      {
        japanese: '<ruby>勉<rt>べん</rt></ruby><ruby>強<rt>きょう</rt></ruby>すべきです。',
        zhTW: '應該學習。',
        en: 'You should study.',
        explanation: {
          'zh-TW': '「勉強すべきだ」表示「應該學習」，表達義務。',
          'en': '"勉強すべきだ" means "should study", expressing obligation.'
        }
      },
      {
        japanese: '<ruby>謝<rt>あやま</rt></ruby>るべきです。',
        zhTW: '應該道歉。',
        en: 'You should apologize.',
        explanation: {
          'zh-TW': '「謝るべきだ」表示「應該道歉」，表達責任。',
          'en': '"謝るべきだ" means "should apologize", expressing duty.'
        }
      },
      {
        japanese: '<ruby>早<rt>はや</rt></ruby>く<ruby>行<rt>い</rt></ruby>くべきです。',
        zhTW: '應該早點去。',
        en: 'You should go early.',
        explanation: {
          'zh-TW': '「行くべきだ」表示「應該去」，表達建議。',
          'en': '"行くべきだ" means "should go", expressing advice.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜べきだ」用於表達基於義務、責任、道德的判斷。\n' +
        '2. 與「〜はずだ」的區別：\n' +
        '   - べきだ：應該...（基於義務、責任）\n' +
        '   - はずだ：應該...（基於推斷、預期）\n' +
        '3. 接續規則：動詞辭書形＋べきだ\n' +
        '4. 特殊變化：「する」→「すべきだ」',
      'en':
        'Learning tips:\n' +
        '1. "〜べきだ" is used to express judgments based on obligation, duty, or morality.\n' +
        '2. Difference from "〜はずだ":\n' +
        '   - べきだ: Should... (based on obligation, duty)\n' +
        '   - はずだ: Should... (based on inference, expectation)\n' +
        '3. Attachment rules: verb dictionary form + べきだ\n' +
        '4. Special conjugation: "する" → "すべきだ"'
    }
  }
};

