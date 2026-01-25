// 句型「〜みたいだ」 - 詳細內容

export const grammarPatternMitaiDa = {
  id: 'grammar-pattern-mitai-da',
  title: {
    'zh-TW': '句型「〜みたいだ」',
    'en': 'Pattern "〜みたいだ"'
  },
  category: {
    type: 'grammar',
    level: 'N3'
  },
  tags: ['grammar'],
  description: {
    'zh-TW': '「〜みたいだ」表示「好像...」「似乎...」「看起來...」',
    'en': '"〜みたいだ" expresses "seems like...", "appears to be...", "looks like..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜みたいだ」接在名詞、動詞、形容詞的普通形後面，表示「好像...」「似乎...」「看起來...」。這是口語表達，用於根據視覺判斷做出推測。',
      'en':
        '"〜みたいだ" is attached to nouns or the plain form of verbs and adjectives to express "seems like...", "appears to be...", "looks like...". This is a casual expression used to make speculations based on visual judgment.'
    },
    usage: {
      'zh-TW':
        '「〜みたいだ」的用法：\n' +
        '1. 表示推測：〜みたいだ（如「雨が降るみたいだ」）\n' +
        '2. 表示比喻：〜みたいな（如「雪みたいな白さ」）\n' +
        '3. 表示例示：〜みたいな（如「このみたいな問題」）\n' +
        '4. 變化：みたいだ可以像な形容詞一樣變化（みたいではない、みたいだった等）',
      'en':
        'Usage of "〜みたいだ":\n' +
        '1. Express speculation: 〜みたいだ (e.g., "雨が降るみたいだ")\n' +
        '2. Express simile: 〜みたいな (e.g., "雪みたいな白さ")\n' +
        '3. Express example: 〜みたいな (e.g., "このみたいな問題")\n' +
        '4. Conjugation: みたいだ can be conjugated like a な-adjective (みたいではない, みたいだった, etc.)'
    },
    examples: [
      {
        japanese: '<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>るみたいです。',
        zhTW: '好像要下雨了。',
        en: 'It looks like it will rain.',
        explanation: {
          'zh-TW': '「みたいだ」表示根據視覺判斷的推測，口語表達。',
          'en': '"みたいだ" expresses speculation based on visual judgment, casual expression.'
        }
      },
      {
        japanese: '<ruby>雪<rt>ゆき</rt></ruby>みたいな<ruby>白<rt>しろ</rt></ruby>さです。',
        zhTW: '像雪一樣白。',
        en: 'It\'s as white as snow.',
        explanation: {
          'zh-TW': '「みたいな」表示比喻，「雪みたいな」意思是「像雪一樣的」。',
          'en': '"みたいな" expresses simile, "雪みたいな" means "like snow".'
        }
      },
      {
        japanese: '<ruby>彼<rt>かれ</rt></ruby>は<ruby>学生<rt>がくせい</rt></ruby>みたいです。',
        zhTW: '他看起來像學生。',
        en: 'He looks like a student.',
        explanation: {
          'zh-TW': '「みたいだ」可以直接接名詞，表示「看起來像...」。',
          'en': '"みたいだ" can be directly attached to nouns to express "looks like...".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「みたいだ」可以直接接名詞，也可以接動詞、形容詞普通形，是口語表達。\n' +
        '2. 與「らしい」「ようだ」的區別：\n' +
        '   - みたいだ：口語，根據視覺判斷\n' +
        '   - らしい：根據傳聞或客觀推測\n' +
        '   - ようだ：根據直接觀察或感覺\n' +
        '3. 「みたいだ」可以像な形容詞一樣變化。',
      'en':
        'Learning tips:\n' +
        '1. "みたいだ" can be directly attached to nouns or the plain form of verbs and adjectives, it\'s a casual expression.\n' +
        '2. Difference from "らしい" and "ようだ":\n' +
        '   - みたいだ: Casual, based on visual judgment\n' +
        '   - らしい: Based on hearsay or objective speculation\n' +
        '   - ようだ: Based on direct observation or feeling\n' +
        '3. "みたいだ" can be conjugated like a な-adjective.'
    }
  }
};

