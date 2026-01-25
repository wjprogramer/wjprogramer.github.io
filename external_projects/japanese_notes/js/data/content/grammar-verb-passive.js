// 動詞被動形 - 詳細內容

export const grammarVerbPassive = {
  id: 'grammar-verb-passive',
  title: {
    'zh-TW': '動詞被動形',
    'en': 'Verb Passive Form'
  },
  category: {
    type: 'grammar',
    level: 'N4'
  },
  tags: ['grammar', 'verb'],
  description: {
    'zh-TW': '動詞被動形用於表示「被...」「受到...」',
    'en': 'Verb passive form is used to express "be...ed" or "be done by..."'
  },
  content: {
    overview: {
      'zh-TW':
        '動詞被動形用於表示「被...」「受到...」的意思。被動形的變化規則因動詞類型而異，一段動詞和不規則動詞的變化較簡單，五段動詞需要將詞尾改為「あ段」音加「れる」。',
      'en':
        'Verb passive form is used to express "be...ed" or "be done by...". The conjugation rules vary by verb type: 一段 verbs and irregular verbs are simpler, while 五段 verbs need to change the ending to "あ段" sound plus "れる".'
    },
    usage: {
      'zh-TW':
        '被動形的用法：\n' +
        '1. 表示被動：被...（如「先生に褒められる」）\n' +
        '2. 表示受害：受到...（如「雨に降られる」）\n' +
        '3. 表示尊敬：用於敬語（如「先生が言われる」）',
      'en':
        'Usage of passive form:\n' +
        '1. Express passive: be...ed (e.g., 「先生に褒められる」)\n' +
        '2. Express suffering: be affected by... (e.g., 「雨に降られる」)\n' +
        '3. Express respect: used in honorifics (e.g., 「先生が言われる」)'
    },
    verbForms: {
      'zh-TW':
        '被動形的變化規則：\n' +
        '1. 五段動詞：將詞尾改為「あ段」音加「れる」（如「話す→話される」「読む→読まれる」「書く→書かれる」）\n' +
        '2. 一段動詞：去掉「る」加「られる」（如「食べる→食べられる」「見る→見られる」）\n' +
        '3. 不規則動詞：\n' +
        '   - する → される\n' +
        '   - くる → こられる',
      'en':
        'Passive form conjugation rules:\n' +
        '1. 五段 verbs: change ending to "あ段" sound plus "れる" (e.g., 「話す→話される」「読む→読まれる」「書く→書かれる」)\n' +
        '2. 一段 verbs: remove "る" and add "られる" (e.g., 「食べる→食べられる」「見る→見られる」)\n' +
        '3. Irregular verbs:\n' +
        '   - する → される\n' +
        '   - くる → こられる'
    },
    examples: [
      {
        japanese: '<ruby>私<rt>わたし</rt></ruby>は<ruby>先<rt>せん</rt></ruby><ruby>生<rt>せい</rt></ruby>に<ruby>褒<rt>ほ</rt></ruby>められました。',
        zhTW: '我被老師表揚了。',
        en: 'I was praised by the teacher.',
        explanation: {
          'zh-TW': '「褒められる」是「褒める」的被動形，表示「被表揚」。',
          'en': '"褒められる" is the passive form of "褒める", meaning "be praised".'
        }
      },
      {
        japanese: '<ruby>雨<rt>あめ</rt></ruby>に<ruby>降<rt>ふ</rt></ruby>られました。',
        zhTW: '被雨淋了。',
        en: 'I was caught in the rain.',
        explanation: {
          'zh-TW': '「降られる」是「降る」的被動形，表示「受到雨的影響」。',
          'en': '"降られる" is the passive form of "降る", meaning "be affected by rain".'
        }
      },
      {
        japanese: '<ruby>本<rt>ほん</rt></ruby>が<ruby>読<rt>よ</rt></ruby>まれています。',
        zhTW: '書被讀著。',
        en: 'The book is being read.',
        explanation: {
          'zh-TW': '「読まれる」是「読む」的被動形，表示「被讀」。',
          'en': '"読まれる" is the passive form of "読む", meaning "be read".'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 五段動詞的被動形變化需要將詞尾改為「あ段」音，這是關鍵。\n' +
        '2. 被動形的主語用「は」或「が」標示，動作的執行者用「に」標示。\n' +
        '3. 被動形可以表示真正的被動，也可以表示受害或尊敬，需要根據上下文判斷。',
      'en':
        'Learning tips:\n' +
        '1. For 五段 verbs, the passive form changes the ending to "あ段" sound, which is key.\n' +
        '2. The subject of the passive form is marked with "は" or "が", and the agent is marked with "に".\n' +
        '3. The passive form can express true passive, suffering, or respect, which needs to be judged by context.'
    },
    relatedContent: [
      {
        id: 'grammar-verb-causative',
        title: {
          'zh-TW': '動詞使役形',
          'en': 'Verb Causative Form'
        }
      },
      {
        id: 'grammar-verb-potential',
        title: {
          'zh-TW': '動詞可能形',
          'en': 'Verb Potential Form'
        }
      }
    ]
  }
};


