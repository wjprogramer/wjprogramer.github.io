// 句型「〜ように」 - 詳細內容

export const grammarPatternYouNi = {
  id: 'grammar-pattern-you-ni',
  title: {
    'zh-TW': '句型「〜ように」',
    'en': 'Pattern "〜ように"'
  },
  category: {
    type: 'grammar',
    level: 'N3'
  },
  tags: ['grammar', 'conjunction'],
  description: {
    'zh-TW': '「〜ように」表示「為了...」「以便...」「像...一樣」',
    'en': '"〜ように" expresses "in order to...", "so that...", "like..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜ように」接在動詞的普通形或「名詞＋の」後面，有多種用法：1) 表示目的（為了讓...），2) 表示比喻（像...一樣），3) 表示變化（變得...）。',
      'en':
        '"〜ように" is attached to the plain form of verbs or "noun + の" and has various usages: 1) Express purpose (in order for... to...), 2) Express simile (like...), 3) Express change (become...).'
    },
    usage: {
      'zh-TW':
        '「〜ように」的用法：\n' +
        '1. 表示目的：〜ように（如「分かるように説明する」）\n' +
        '2. 表示比喻：〜ように（如「雪のように白い」）\n' +
        '3. 表示變化：〜ようになる（如「話せるようになる」）\n' +
        '4. 接續規則：\n' +
        '   - 動詞普通形＋ように\n' +
        '   - 名詞＋の＋ように',
      'en':
        'Usage of "〜ように":\n' +
        '1. Express purpose: 〜ように (e.g., "分かるように説明する")\n' +
        '2. Express simile: 〜ように (e.g., "雪のように白い")\n' +
        '3. Express change: 〜ようになる (e.g., "話せるようになる")\n' +
        '4. Attachment rules:\n' +
        '   - Verb plain form + ように\n' +
        '   - Noun + の + ように'
    },
    examples: [
      {
        japanese: '<ruby>分<rt>わ</rt></ruby>かるように<ruby>説<rt>せつ</rt></ruby><ruby>明<rt>めい</rt></ruby>します。',
        zhTW: '為了讓（對方）理解而說明。',
        en: 'I will explain so that (they) can understand.',
        explanation: {
          'zh-TW': '「分かるように」表示「為了讓（對方）理解」，主語不一致時用「ように」表示目的。',
          'en': '"分かるように" means "so that (they) can understand", "ように" is used for purpose when subjects are different.'
        }
      },
      {
        japanese: '<ruby>雪<rt>ゆき</rt></ruby>のように<ruby>白<rt>しろ</rt></ruby>いです。',
        zhTW: '像雪一樣白。',
        en: 'It\'s as white as snow.',
        explanation: {
          'zh-TW': '「雪のように」表示「像雪一樣」，表示比喻。',
          'en': '"雪のように" means "like snow", expressing simile.'
        }
      },
      {
        japanese: '<ruby>日<rt>に</rt></ruby><ruby>本<rt>ほん</rt></ruby><ruby>語<rt>ご</rt></ruby>が<ruby>話<rt>はな</rt></ruby>せるようになりました。',
        zhTW: '變得會說日語了。',
        en: 'I became able to speak Japanese.',
        explanation: {
          'zh-TW': '「話せるようになる」表示「變得會說」，表示能力或狀態的變化。',
          'en': '"話せるようになる" means "became able to speak", expressing change in ability or state.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜ように」有多種用法：目的、比喻、變化等。\n' +
        '2. 表示目的時：主語不一致時用「ように」（為了讓...而...）\n' +
        '3. 與「〜ために」的區別：\n' +
        '   - ように：主語不一致時用於目的（為了讓...而...）\n' +
        '   - ために：主語一致時用於目的（為了...而...）\n' +
        '4. 「〜ようになる」表示能力或狀態的變化。',
      'en':
        'Learning tips:\n' +
        '1. "〜ように" has various usages: purpose, simile, change, etc.\n' +
        '2. When expressing purpose: Use "ように" when subjects are different (in order for... to...)\n' +
        '3. Difference from "〜ために":\n' +
        '   - ように: Used for purpose when subjects are different (in order for... to...)\n' +
        '   - ために: Used for purpose when subjects are the same (in order to...)\n' +
        '4. "〜ようになる" expresses change in ability or state.'
    }
  }
};

