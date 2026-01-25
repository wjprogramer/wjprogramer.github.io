// 清音 - 詳細內容

export const kanaSeion = {
  id: 'kana-seion',
  title: {
    'zh-TW': '清音',
    'en': '清音 (Voiceless Sounds)'
  },
  category: {
    type: 'kana',
    level: 'N5'
  },
  tags: ['basic', 'kana', 'seion'],
  description: {
    'zh-TW': '清音是五十音圖中的基本音，不帶濁點或半濁點',
    'en': '清音 are the basic sounds in the 「五十音」 chart, without dakuten or handakuten.'
  },
  content: {
    overview: {
      'zh-TW':
        '清音是五十音圖中的基本音，包括あ行到わ行的所有基本假名，不帶濁點（゛）或半濁點（゜）。清音是學習日文發音的基礎，需要先熟練掌握。',
      'en':
        '清音 are the basic sounds in the 「五十音」 chart, including all basic kana from あ row to わ row, without dakuten (゛) or handakuten (゜). 清音 are the foundation of learning Japanese pronunciation and must be mastered first.'
    },
    usage: {
      'zh-TW':
        '清音的特點：\n' +
        '1. 不帶任何附加符號（濁點或半濁點）。\n' +
        '2. 包括あ行、か行、さ行、た行、な行、は行、ま行、や行、ら行、わ行。\n' +
        '3. 是五十音圖中最基本的音，其他音（濁音、半濁音）都是從清音變化而來。',
      'en':
        'Characteristics of 清音:\n' +
        '1. No additional marks (dakuten or handakuten).\n' +
        '2. Includes あ, か, さ, た, な, は, ま, や, ら, わ rows.\n' +
        '3. These are the most basic sounds in the 「五十音」 chart; other sounds (濁音, 半濁音) are derived from 清音.'
    },
    examples: [
      {
        japanese: '<ruby>私<rt>わたし</rt></ruby>は<ruby>学<rt>がく</rt></ruby><ruby>生<rt>せい</rt></ruby>です。',
        zhTW: '我是學生。',
        en: 'I am a student.',
        explanation: {
          'zh-TW': '「わ」「た」「し」「せ」「い」都是清音。',
          'en': '"わ""た""し""せ""い" are all 清音.'
        }
      },
      {
        japanese: '<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>みます。',
        zhTW: '讀書。',
        en: 'I read a book.',
        explanation: {
          'zh-TW': '「ほ」「ん」「を」「よ」「み」「ま」「す」都是清音。',
          'en': '"ほ""ん""を""よ""み""ま""す" are all 清音.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 清音是學習日文的基礎，必須先熟練掌握。\n' +
        '2. 建議按照行（あ行、か行等）逐行學習。\n' +
        '3. 同時練習書寫和發音，不要只會念不會寫。',
      'en':
        'Learning tips:\n' +
        '1. 清音 are the foundation of learning Japanese and must be mastered first.\n' +
        '2. It is recommended to learn row by row (あ row, か row, etc.).\n' +
        '3. Practice both writing and pronunciation, not just reading.'
    },
    relatedContent: [
      {
        id: 'kana-hiragana',
        title: {
          'zh-TW': '五十音 平假名',
          'en': '「五十音」 Hiragana'
        }
      },
      {
        id: 'kana-dakuon-handakuon',
        title: {
          'zh-TW': '濁音・半濁音',
          'en': '濁音・半濁音'
        }
      }
    ]
  }
};

