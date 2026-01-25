// 句型「〜に従って」 - 詳細內容

export const grammarPatternNiShitagatte = {
  id: 'grammar-pattern-ni-shitagatte',
  title: {
    'zh-TW': '句型「〜に従って」',
    'en': 'Pattern "〜に従って"'
  },
  category: {
    type: 'grammar',
    level: 'N3'
  },
  tags: ['grammar', 'particle'],
  description: {
    'zh-TW': '「〜に従って」表示「按照...」「隨著...」「根據...」',
    'en': '"〜に従って" expresses "according to...", "as...", "following..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜に従って」接在名詞或動詞普通形後面，表示「按照...」「隨著...」「根據...」。用於表達遵循、順應、隨著變化等。',
      'en':
        '"〜に従って" is attached to nouns or the plain form of verbs to express "according to...", "as...", "following...". Used to express following, conforming, changing along with, etc.'
    },
    usage: {
      'zh-TW':
        '「〜に従って」的用法：\n' +
        '1. 表示按照：〜に従って（如「指示に従って」）\n' +
        '2. 表示隨著：〜に従って（如「時間が経つに従って」）\n' +
        '3. 表示根據：〜に従って（如「規則に従って」）\n' +
        '4. 接續規則：\n' +
        '   - 名詞＋に従って\n' +
        '   - 動詞普通形＋に従って',
      'en':
        'Usage of "〜に従って":\n' +
        '1. Express according to: 〜に従って (e.g., "指示に従って")\n' +
        '2. Express as: 〜に従って (e.g., "時間が経つに従って")\n' +
        '3. Express following: 〜に従って (e.g., "規則に従って")\n' +
        '4. Attachment rules:\n' +
        '   - Noun + に従って\n' +
        '   - Verb plain form + に従って'
    },
    examples: [
      {
        japanese: '<ruby>指<rt>し</rt></ruby><ruby>示<rt>じ</rt></ruby>に<ruby>従<rt>したが</rt></ruby>って<ruby>行<rt>おこな</rt></ruby>いました。',
        zhTW: '按照指示執行了。',
        en: 'I carried it out according to the instructions.',
        explanation: {
          'zh-TW': '「指示に従って」表示「按照指示」，表達遵循。',
          'en': '"指示に従って" means "according to instructions", expressing following.'
        }
      },
      {
        japanese: '<ruby>時<rt>じ</rt></ruby><ruby>間<rt>かん</rt></ruby>が<ruby>経<rt>た</rt></ruby>つに<ruby>従<rt>したが</rt></ruby>って<ruby>良<rt>よ</rt></ruby>くなりました。',
        zhTW: '隨著時間的推移，變好了。',
        en: 'It got better as time passed.',
        explanation: {
          'zh-TW': '「時間が経つに従って」表示「隨著時間的推移」，表達變化。',
          'en': '"時間が経つに従って" means "as time passes", expressing change.'
        }
      },
      {
        japanese: '<ruby>規<rt>き</rt></ruby><ruby>則<rt>そく</rt></ruby>に<ruby>従<rt>したが</rt></ruby>って<ruby>行<rt>おこな</rt></ruby>います。',
        zhTW: '按照規則執行。',
        en: 'I will carry it out according to the rules.',
        explanation: {
          'zh-TW': '「規則に従って」表示「按照規則」，表達遵循。',
          'en': '"規則に従って" means "according to rules", expressing following.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜に従って」用於表達遵循、順應、隨著變化等。\n' +
        '2. 與「〜に伴って」的區別：\n' +
        '   - に従って：按照...、隨著...（遵循、順應）\n' +
        '   - に伴って：伴隨著...（同時發生）\n' +
        '3. 接續規則：\n' +
        '   - 名詞：直接接「に従って」\n' +
        '   - 動詞：普通形＋「に従って」',
      'en':
        'Learning tips:\n' +
        '1. "〜に従って" is used to express following, conforming, changing along with, etc.\n' +
        '2. Difference from "〜に伴って":\n' +
        '   - に従って: According to..., as... (following, conforming)\n' +
        '   - に伴って: Accompanying... (simultaneous occurrence)\n' +
        '3. Attachment rules:\n' +
        '   - Nouns: directly attach "に従って"\n' +
        '   - Verbs: plain form + "に従って"'
    }
  }
};

