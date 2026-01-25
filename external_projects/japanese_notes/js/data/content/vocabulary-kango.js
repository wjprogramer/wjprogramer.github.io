// 漢語 - 詳細內容

export const vocabularyKango = {
  id: 'vocabulary-kango',
  title: {
    'zh-TW': '漢語',
    'en': '漢語 (Sino-Japanese Words)'
  },
  japanese: '<ruby>漢<rt>かん</rt></ruby><ruby>語<rt>ご</rt></ruby>',
  category: {
    type: 'goshu',
    level: 'N5'
  },
  tags: ['basic', 'kango'],
  meaning: {
    'zh-TW': '漢語、中文借詞',
    'en': 'Sino-Japanese words, Chinese-derived words'
  },
  content: {
    overview: {
      'zh-TW':
        '「漢語」是指從中文借入日語的詞彙，這些詞彙通常用漢字書寫，讀音採用音讀（音読み）。漢語在日語詞彙中佔有重要地位，特別是在學術、正式場合和書面語中。',
      'en':
        '「漢語」 refers to words borrowed from Chinese into Japanese. These words are typically written in kanji and use on-reading (音読み). 漢語 occupy an important position in Japanese vocabulary, especially in academic, formal contexts and written language.'
    },
    usage: {
      'zh-TW':
        '漢語的特點：\n' +
        '1. 通常用漢字書寫，讀音採用音讀（音読み）\n' +
        '2. 多為兩個或更多漢字組成的複合詞（如「学校」「図書館」「勉強」等）\n' +
        '3. 在學術、正式場合和書面語中使用較多\n' +
        '4. 讀音通常較長，多為2-4個音節\n' +
        '5. 許多漢語在現代中文中也有對應的詞彙',
      'en':
        'Characteristics of 漢語:\n' +
        '1. Usually written in kanji, using on-reading (音読み)\n' +
        '2. Mostly compound words consisting of two or more kanji (such as 「学校」「図書館」「勉強」)\n' +
        '3. More commonly used in academic, formal contexts and written language\n' +
        '4. Readings are usually longer, mostly 2-4 syllables\n' +
        '5. Many 漢語 have corresponding words in modern Chinese'
    },
    examples: [
      {
        japanese: '<ruby>学<rt>がっ</rt></ruby><ruby>校<rt>こう</rt></ruby>に<ruby>行<rt>い</rt></ruby>きます。',
        zhTW: '去學校。',
        en: 'I go to school.',
        explanation: {
          'zh-TW': '「学校」是漢語，讀作「がっこう」，採用音讀。',
          'en': '"学校" is 漢語, read as "がっこう", using on-reading.'
        }
      },
      {
        japanese: '<ruby>図<rt>と</rt></ruby><ruby>書<rt>しょ</rt></ruby><ruby>館<rt>かん</rt></ruby>で<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>みます。',
        zhTW: '在圖書館讀書。',
        en: 'I read books at the library.',
        explanation: {
          'zh-TW': '「図書館」是漢語，讀作「としょかん」，採用音讀。',
          'en': '"図書館" is 漢語, read as "としょかん", using on-reading.'
        }
      },
      {
        japanese: '<ruby>勉<rt>べん</rt></ruby><ruby>強<rt>きょう</rt></ruby>します。',
        zhTW: '學習。',
        en: 'I study.',
        explanation: {
          'zh-TW': '「勉強」是漢語，讀作「べんきょう」，採用音讀。',
          'en': '"勉強" is 漢語, read as "べんきょう", using on-reading.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 漢語的讀音（音讀）通常有一定的規律，學習時可以注意音讀的規律性。\n' +
        '2. 許多漢語在現代中文中也有對應的詞彙，中文母語者可以利用這個優勢。\n' +
        '3. 漢語在正式場合和書面語中使用較多，是提高日語水平的重要詞彙。',
      'en':
        'Learning tips:\n' +
        '1. The readings (on-reading) of 漢語 usually follow certain patterns, so pay attention to these patterns when learning.\n' +
        '2. Many 漢語 have corresponding words in modern Chinese, which native Chinese speakers can use to their advantage.\n' +
        '3. 漢語 are more commonly used in formal contexts and written language, forming important vocabulary for improving Japanese proficiency.'
    },
    relatedContent: [
      {
        id: 'vocabulary-gairaigo',
        title: {
          'zh-TW': '外来語',
          'en': '外来語'
        }
      },
      {
        id: 'vocabulary-wago',
        title: {
          'zh-TW': '和語',
          'en': '和語'
        }
      }
    ]
  }
};

