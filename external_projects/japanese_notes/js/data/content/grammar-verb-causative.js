// 動詞使役形 - 詳細內容

export const grammarVerbCausative = {
  id: 'grammar-verb-causative',
  title: {
    'zh-TW': '動詞使役形',
    'en': 'Verb Causative Form'
  },
  category: {
    type: 'grammar',
    level: 'N4'
  },
  tags: ['grammar', 'verb'],
  description: {
    'zh-TW': '動詞使役形用於表示「讓...做...」「使...做...」',
    'en': 'Verb causative form is used to express "make...do..." or "let...do..."'
  },
  content: {
    overview: {
      'zh-TW':
        '動詞使役形用於表示「讓...做...」「使...做...」的意思。使役形的變化規則因動詞類型而異，一段動詞和不規則動詞的變化較簡單，五段動詞需要將詞尾改為「あ段」音加「せる」。',
      'en':
        'Verb causative form is used to express "make...do..." or "let...do...". The conjugation rules vary by verb type: 一段 verbs and irregular verbs are simpler, while 五段 verbs need to change the ending to "あ段" sound plus "せる".'
    },
    usage: {
      'zh-TW':
        '使役形的用法：\n' +
        '1. 表示使役：讓...做...（如「子供に勉強させる」）\n' +
        '2. 表示許可：讓...做...（如「子供に遊ばせる」）\n' +
        '3. 注意：使役對象用「に」或「を」標示，根據動詞類型而定',
      'en':
        'Usage of causative form:\n' +
        '1. Express causation: make...do... (e.g., 「子供に勉強させる」)\n' +
        '2. Express permission: let...do... (e.g., 「子供に遊ばせる」)\n' +
        '3. Note: The object of causation is marked with "に" or "を" depending on verb type'
    },
    verbForms: {
      'zh-TW':
        '使役形的變化規則：\n' +
        '1. 五段動詞：將詞尾改為「あ段」音加「せる」（如「話す→話させる」「読む→読ませる」「書く→書かせる」）\n' +
        '2. 一段動詞：去掉「る」加「させる」（如「食べる→食べさせる」「見る→見させる」）\n' +
        '3. 不規則動詞：\n' +
        '   - する → させる\n' +
        '   - くる → こさせる',
      'en':
        'Causative form conjugation rules:\n' +
        '1. 五段 verbs: change ending to "あ段" sound plus "せる" (e.g., 「話す→話させる」「読む→読ませる」「書く→書かせる」)\n' +
        '2. 一段 verbs: remove "る" and add "させる" (e.g., 「食べる→食べさせる」「見る→見させる」)\n' +
        '3. Irregular verbs:\n' +
        '   - する → させる\n' +
        '   - くる → こさせる'
    },
    examples: [
      {
        japanese: '<ruby>子<rt>こ</rt></ruby><ruby>供<rt>ども</rt></ruby>に<ruby>勉<rt>べん</rt></ruby><ruby>強<rt>きょう</rt></ruby>させます。',
        zhTW: '讓孩子學習。',
        en: 'I make the child study.',
        explanation: {
          'zh-TW': '「勉強させる」是「勉強する」的使役形，使役對象用「に」標示。',
          'en': '"勉強させる" is the causative form of "勉強する", and the object is marked with "に".'
        }
      },
      {
        japanese: '<ruby>学<rt>がく</rt></ruby><ruby>生<rt>せい</rt></ruby>に<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>ませます。',
        zhTW: '讓學生讀書。',
        en: 'I make the student read a book.',
        explanation: {
          'zh-TW': '「読ませる」是「読む」的使役形，使役對象用「に」標示。',
          'en': '"読ませる" is the causative form of "読む", and the object is marked with "に".'
        }
      },
      {
        japanese: '<ruby>子<rt>こ</rt></ruby><ruby>供<rt>ども</rt></ruby>を<ruby>遊<rt>あそ</rt></ruby>ばせます。',
        zhTW: '讓孩子玩。',
        en: 'I let the child play.',
        explanation: {
          'zh-TW': '「遊ばせる」是「遊ぶ」的使役形，這裡表示許可，使役對象用「を」標示。',
          'en': '"遊ばせる" is the causative form of "遊ぶ", here expressing permission, and the object is marked with "を".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 五段動詞的使役形變化需要將詞尾改為「あ段」音，這是關鍵。\n' +
        '2. 使役對象通常用「に」標示，但自動詞的使役對象有時用「を」標示。\n' +
        '3. 使役形可以表示強制（讓...做）或許可（讓...做），需要根據上下文判斷。',
      'en':
        'Learning tips:\n' +
        '1. For 五段 verbs, the causative form changes the ending to "あ段" sound, which is key.\n' +
        '2. The object of causation is usually marked with "に", but for intransitive verbs, it is sometimes marked with "を".\n' +
        '3. The causative form can express compulsion (make...do) or permission (let...do), which needs to be judged by context.'
    },
    relatedContent: [
      {
        id: 'grammar-verb-potential',
        title: {
          'zh-TW': '動詞可能形',
          'en': 'Verb Potential Form'
        }
      },
      {
        id: 'grammar-verb-passive',
        title: {
          'zh-TW': '動詞被動形',
          'en': 'Verb Passive Form'
        }
      }
    ]
  }
};


