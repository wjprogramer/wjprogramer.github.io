// 句型「〜ために」 - 詳細內容

export const grammarPatternTameNi = {
  id: 'grammar-pattern-tame-ni',
  title: {
    'zh-TW': '句型「〜ために」',
    'en': 'Pattern "〜ために"'
  },
  category: {
    type: 'grammar',
    level: 'N3'
  },
  tags: ['grammar', 'conjunction'],
  description: {
    'zh-TW': '「〜ために」表示「為了...」「因為...」',
    'en': '"〜ために" expresses "in order to...", "for the sake of...", "because..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜ために」接在動詞的普通形或「名詞＋の」後面，表示「為了...」「因為...」。有兩種用法：1) 表示目的（為了...），2) 表示原因（因為...）。',
      'en':
        '"〜ために" is attached to the plain form of verbs or "noun + の" to express "in order to...", "for the sake of...", "because...". Has two usages: 1) Express purpose (in order to...), 2) Express reason (because...).'
    },
    usage: {
      'zh-TW':
        '「〜ために」的用法：\n' +
        '1. 表示目的：〜ために（如「勉強するために本を買う」）\n' +
        '2. 表示原因：〜ために（如「雨のために出かけない」）\n' +
        '3. 接續規則：\n' +
        '   - 動詞普通形＋ために\n' +
        '   - 名詞＋の＋ために',
      'en':
        'Usage of "〜ために":\n' +
        '1. Express purpose: 〜ために (e.g., "勉強するために本を買う")\n' +
        '2. Express reason: 〜ために (e.g., "雨のために出かけない")\n' +
        '3. Attachment rules:\n' +
        '   - Verb plain form + ために\n' +
        '   - Noun + の + ために'
    },
    examples: [
      {
        japanese: '<ruby>勉<rt>べん</rt></ruby><ruby>強<rt>きょう</rt></ruby>するために<ruby>本<rt>ほん</rt></ruby>を<ruby>買<rt>か</rt></ruby>いました。',
        zhTW: '為了學習而買了書。',
        en: 'I bought a book in order to study.',
        explanation: {
          'zh-TW': '「勉強するために」表示「為了學習」，表示目的。',
          'en': '"勉強するために" means "in order to study", expressing purpose.'
        }
      },
      {
        japanese: '<ruby>家<rt>いえ</rt></ruby>を<ruby>買<rt>か</rt></ruby>うために<ruby>貯<rt>ちょ</rt></ruby><ruby>金<rt>きん</rt></ruby>しています。',
        zhTW: '為了買房子而存錢。',
        en: 'I\'m saving money in order to buy a house.',
        explanation: {
          'zh-TW': '「家を買うために」表示「為了買房子」，表示目的。',
          'en': '"家を買うために" means "in order to buy a house", expressing purpose.'
        }
      },
      {
        japanese: '<ruby>雨<rt>あめ</rt></ruby>のために<ruby>試<rt>し</rt></ruby><ruby>合<rt>あい</rt></ruby>が<ruby>中<rt>ちゅう</rt></ruby><ruby>止<rt>し</rt></ruby>されました。',
        zhTW: '因為下雨比賽被中止了。',
        en: 'The game was canceled because of the rain.',
        explanation: {
          'zh-TW': '「雨のために」表示「因為下雨」，表示原因。',
          'en': '"雨のために" means "because of the rain", expressing reason.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜ために」有兩種用法：目的和原因。\n' +
        '2. 表示目的時：動詞普通形＋ために（如「勉強するために」）\n' +
        '3. 表示原因時：名詞＋の＋ために（如「雨のために」）\n' +
        '4. 與「〜ように」的區別：\n' +
        '   - ために：主語一致時用於目的（我為了...而...）\n' +
        '   - ように：主語不一致時用於目的（為了讓...而...）',
      'en':
        'Learning tips:\n' +
        '1. "〜ために" has two usages: purpose and reason.\n' +
        '2. When expressing purpose: verb plain form + ために (e.g., "勉強するために")\n' +
        '3. When expressing reason: noun + の + ために (e.g., "雨のために")\n' +
        '4. Difference from "〜ように":\n' +
        '   - ために: Used for purpose when subjects are the same (I... in order to...)\n' +
        '   - ように: Used for purpose when subjects are different (in order for... to...)'
    }
  }
};

