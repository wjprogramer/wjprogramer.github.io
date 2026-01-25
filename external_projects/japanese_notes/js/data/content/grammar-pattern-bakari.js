// 句型「〜ばかり」 - 詳細內容

export const grammarPatternBakari = {
  id: 'grammar-pattern-bakari',
  title: {
    'zh-TW': '句型「〜ばかり」',
    'en': 'Pattern "〜ばかり"'
  },
  category: {
    type: 'grammar',
    level: 'N3'
  },
  tags: ['grammar', 'particle'],
  description: {
    'zh-TW': '「〜ばかり」表示「只...」「光是...」「總是...」',
    'en': '"〜ばかり" expresses "only...", "nothing but...", "always..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜ばかり」接在名詞、動詞、形容詞後面，表示「只...」「光是...」「總是...」。用於表達限定、反覆或持續的狀態。有多種用法，包括限定、反覆動作、剛完成等。',
      'en':
        '"〜ばかり" is attached to nouns, verbs, and adjectives to express "only...", "nothing but...", "always...". Used to express limitation, repetition, or continuous state. Has various usages including limitation, repeated actions, just completed, etc.'
    },
    usage: {
      'zh-TW':
        '「〜ばかり」的用法：\n' +
        '1. 表示限定：〜ばかり（如「本ばかり読む」）\n' +
        '2. 表示反覆：〜てばかりいる（如「遊んでばかりいる」）\n' +
        '3. 表示剛完成：〜たばかり（如「食べたばかり」）\n' +
        '4. 接名詞：名詞＋ばかり（如「学生ばかり」）',
      'en':
        'Usage of "〜ばかり":\n' +
        '1. Express limitation: 〜ばかり (e.g., "本ばかり読む")\n' +
        '2. Express repetition: 〜てばかりいる (e.g., "遊んでばかりいる")\n' +
        '3. Express just completed: 〜たばかり (e.g., "食べたばかり")\n' +
        '4. Attach to noun: noun + ばかり (e.g., "学生ばかり")'
    },
    examples: [
      {
        japanese: '<ruby>本<rt>ほん</rt></ruby>ばかり<ruby>読<rt>よ</rt></ruby>んでいます。',
        zhTW: '只顧著看書。',
        en: 'I\'m only reading books.',
        explanation: {
          'zh-TW': '「本ばかり」表示「只...書」，限定範圍。',
          'en': '"本ばかり" means "only books", limiting the scope.'
        }
      },
      {
        japanese: '<ruby>遊<rt>あそ</rt></ruby>んでばかりいます。',
        zhTW: '總是只顧著玩。',
        en: 'I\'m always just playing.',
        explanation: {
          'zh-TW': '「〜てばかりいる」表示「總是只做...」，強調反覆或持續。',
          'en': '"〜てばかりいる" means "always just doing...", emphasizing repetition or continuation.'
        }
      },
      {
        japanese: '<ruby>食<rt>た</rt></ruby>べたばかりです。',
        zhTW: '剛剛才吃過。',
        en: 'I just ate.',
        explanation: {
          'zh-TW': '「〜たばかり」表示「剛剛才...」，強調剛完成的動作。',
          'en': '"〜たばかり" means "just...", emphasizing a recently completed action.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「ばかり」有多種用法：限定、反覆、剛完成等。\n' +
        '2. 「〜てばかりいる」表示「總是只做...」，帶有負面含義。\n' +
        '3. 「〜たばかり」表示「剛剛才...」，強調時間很近。\n' +
        '4. 與「だけ」的區別：\n' +
        '   - ばかり：強調「只有這個，沒有別的」\n' +
        '   - だけ：單純表示限定',
      'en':
        'Learning tips:\n' +
        '1. "ばかり" has various usages: limitation, repetition, just completed, etc.\n' +
        '2. "〜てばかりいる" means "always just doing...", with negative connotation.\n' +
        '3. "〜たばかり" means "just...", emphasizing very recent time.\n' +
        '4. Difference from "だけ":\n' +
        '   - ばかり: Emphasizes "only this, nothing else"\n' +
        '   - だけ: Simply expresses limitation'
    }
  }
};

