// 句型「〜と思う」 - 詳細內容

export const grammarPatternToOmou = {
  id: 'grammar-pattern-to-omou',
  title: {
    'zh-TW': '句型「〜と思う」',
    'en': 'Pattern "〜と思う"'
  },
  category: {
    type: 'grammar',
    level: 'N3'
  },
  tags: ['grammar', 'verb'],
  description: {
    'zh-TW': '「〜と思う」表示「認為...」「覺得...」「想...」',
    'en': '"〜と思う" expresses "I think...", "I believe...", "I feel..."'
  },
  content: {
    overview: {
      'zh-TW':
        '「〜と思う」接在動詞、形容詞的普通形或「名詞＋だ」後面，表示「認為...」「覺得...」「想...」。用於表達個人的想法、意見、判斷等。這是日語中非常常用的表達方式。',
      'en':
        '"〜と思う" is attached to the plain form of verbs and adjectives or "noun + だ" to express "I think...", "I believe...", "I feel...". Used to express personal thoughts, opinions, judgments, etc. This is a very common expression in Japanese.'
    },
    usage: {
      'zh-TW':
        '「〜と思う」的用法：\n' +
        '1. 表達想法：〜と思う（如「そう思う」）\n' +
        '2. 表達意見：〜と思う（如「良いと思う」）\n' +
        '3. 表達判斷：〜と思う（如「正しいと思う」）\n' +
        '4. 接續規則：\n' +
        '   - 動詞普通形＋と思う\n' +
        '   - い形容詞普通形＋と思う\n' +
        '   - な形容詞＋だ＋と思う\n' +
        '   - 名詞＋だ＋と思う',
      'en':
        'Usage of "〜と思う":\n' +
        '1. Express thought: 〜と思う (e.g., "そう思う")\n' +
        '2. Express opinion: 〜と思う (e.g., "良いと思う")\n' +
        '3. Express judgment: 〜と思う (e.g., "正しいと思う")\n' +
        '4. Attachment rules:\n' +
        '   - Verb plain form + と思う\n' +
        '   - い-adjective plain form + と思う\n' +
        '   - な-adjective + だ + と思う\n' +
        '   - Noun + だ + と思う'
    },
    examples: [
      {
        japanese: '<ruby>そう<rt>そう</rt></ruby>と<ruby>思<rt>おも</rt></ruby>います。',
        zhTW: '我這樣認為。',
        en: 'I think so.',
        explanation: {
          'zh-TW': '「そうと思う」表示「我這樣認為」，表達想法。',
          'en': '"そうと思う" means "I think so", expressing a thought.'
        }
      },
      {
        japanese: '<ruby>良<rt>よ</rt></ruby>いと<ruby>思<rt>おも</rt></ruby>います。',
        zhTW: '我認為很好。',
        en: 'I think it\'s good.',
        explanation: {
          'zh-TW': '「良いと思う」表示「我認為很好」，表達意見。',
          'en': '"良いと思う" means "I think it\'s good", expressing an opinion.'
        }
      },
      {
        japanese: '<ruby>正<rt>ただ</rt></ruby>しいと<ruby>思<rt>おも</rt></ruby>います。',
        zhTW: '我認為是正確的。',
        en: 'I think it\'s correct.',
        explanation: {
          'zh-TW': '「正しいと思う」表示「我認為是正確的」，表達判斷。',
          'en': '"正しいと思う" means "I think it\'s correct", expressing a judgment.'
        }
      },
      {
        japanese: '<ruby>学<rt>がく</rt></ruby><ruby>生<rt>せい</rt></ruby>だと<ruby>思<rt>おも</rt></ruby>います。',
        zhTW: '我認為是學生。',
        en: 'I think he is a student.',
        explanation: {
          'zh-TW': '「学生だと思う」表示「我認為是學生」，名詞需要加「だ」。',
          'en': '"学生だと思う" means "I think he is a student", nouns need "だ".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 「〜と思う」用於表達個人的想法、意見、判斷。\n' +
        '2. 接續規則：\n' +
        '   - 動詞、い形容詞：直接接「と思う」\n' +
        '   - な形容詞、名詞：加「だ」再接「と思う」\n' +
        '3. 與「〜と考える」的區別：\n' +
        '   - と思う：感覺、直覺（較主觀）\n' +
        '   - と考える：思考、分析（較客觀）\n' +
        '4. 注意：名詞和な形容詞必須加「だ」才能接「と思う」。',
      'en':
        'Learning tips:\n' +
        '1. "〜と思う" is used to express personal thoughts, opinions, judgments.\n' +
        '2. Attachment rules:\n' +
        '   - Verbs, い-adjectives: directly attach "と思う"\n' +
        '   - な-adjectives, nouns: add "だ" then "と思う"\n' +
        '3. Difference from "〜と考える":\n' +
        '   - と思う: Feeling, intuition (more subjective)\n' +
        '   - と考える: Thinking, analysis (more objective)\n' +
        '4. Note: Nouns and な-adjectives must add "だ" before "と思う".'
    }
  }
};

