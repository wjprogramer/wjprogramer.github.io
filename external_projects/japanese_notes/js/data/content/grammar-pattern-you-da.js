// 句型「〜ようだ」 - 詳細內容

export const grammarPatternYouDa = {
  id: 'grammar-pattern-you-da',
  title: {
    'zh-TW': '句型「〜ようだ」',
    'en': 'Pattern "〜ようだ"'
  },
  category: {
    type: 'grammar',
    level: 'N3'
  },
  tags: ['grammar'],
  description: {
    'zh-TW': '「〜ようだ」表示「好像...」「似乎...」「看起來...」',
    'en': '"〜ようだ" expresses "seems like...", "appears to be...", "looks like..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜ようだ」接在動詞、形容詞的普通形或「名詞＋の」後面，表示「好像...」「似乎...」「看起來...」。用於表達根據直接觀察或感覺做出的判斷。',
      'en':
        '"〜ようだ" is attached to the plain form of verbs and adjectives or "noun + の" to express "seems like...", "appears to be...", "looks like...". Used to express judgments based on direct observation or feeling.'
    },
    usage: {
      'zh-TW':
        '「〜ようだ」的用法：\n' +
        '1. 表示推測：〜ようだ（如「雨が降るようだ」）\n' +
        '2. 表示比喻：〜ような（如「雪のような白さ」）\n' +
        '3. 表示例示：〜ような（如「このような問題」）\n' +
        '4. 變化：ようだ可以像な形容詞一樣變化（ようではない、ようだった等）',
      'en':
        'Usage of "〜ようだ":\n' +
        '1. Express speculation: 〜ようだ (e.g., "雨が降るようだ")\n' +
        '2. Express simile: 〜ような (e.g., "雪のような白さ")\n' +
        '3. Express example: 〜ような (e.g., "このような問題")\n' +
        '4. Conjugation: ようだ can be conjugated like a な-adjective (ようではない, ようだった, etc.)'
    },
    examples: [
      {
        japanese: '<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>るようです。',
        zhTW: '好像要下雨了。',
        en: 'It seems it will rain.',
        explanation: {
          'zh-TW': '「ようだ」表示根據觀察或感覺的推測。',
          'en': '"ようだ" expresses speculation based on observation or feeling.'
        }
      },
      {
        japanese: '<ruby>雪<rt>ゆき</rt></ruby>のような<ruby>白<rt>しろ</rt></ruby>さです。',
        zhTW: '像雪一樣白。',
        en: 'It\'s as white as snow.',
        explanation: {
          'zh-TW': '「ような」表示比喻，「雪のような」意思是「像雪一樣的」。',
          'en': '"ような" expresses simile, "雪のような" means "like snow".'
        }
      },
      {
        japanese: '<ruby>彼<rt>かれ</rt></ruby>は<ruby>疲<rt>つか</rt></ruby>れているようです。',
        zhTW: '他好像很累。',
        en: 'He seems to be tired.',
        explanation: {
          'zh-TW': '「ようだ」表示根據觀察的推測。',
          'en': '"ようだ" expresses speculation based on observation.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「ようだ」接動詞、形容詞普通形或「名詞＋の」，表示推測、比喻或例示。\n' +
        '2. 與「らしい」「みたいだ」的區別：\n' +
        '   - ようだ：根據直接觀察或感覺\n' +
        '   - らしい：根據傳聞或客觀推測\n' +
        '   - みたいだ：口語，根據視覺判斷\n' +
        '3. 「ようだ」可以像な形容詞一樣變化。',
      'en':
        'Learning tips:\n' +
        '1. "ようだ" is attached to the plain form of verbs and adjectives or "noun + の" to express speculation, simile, or example.\n' +
        '2. Difference from "らしい" and "みたいだ":\n' +
        '   - ようだ: Based on direct observation or feeling\n' +
        '   - らしい: Based on hearsay or objective speculation\n' +
        '   - みたいだ: Casual, based on visual judgment\n' +
        '3. "ようだ" can be conjugated like a な-adjective.'
    }
  }
};

