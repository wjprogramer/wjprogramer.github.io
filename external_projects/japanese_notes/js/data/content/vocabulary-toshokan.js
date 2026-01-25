// 図書館 - 詳細內容

export const vocabularyToshokan = {
  id: 'vocabulary-toshokan',
  title: {
    'zh-TW': '図書館',
    'en': '図書館'
  },
  japanese: '<ruby>図<rt>としょ</rt></ruby><ruby>書<rt>かん</rt></ruby>館',
  category: {
    type: 'vocabulary',
    level: 'N5'
  },
  tags: ['basic', 'vocabulary', 'noun'],
  meaning: {
    'zh-TW': '圖書館',
    'en': 'library'
  },
  content: {
    overview: {
      'zh-TW': '「図書館」是指圖書館。由「図書」（圖書）和「館」（建築物）組成。',
      'en': '"図書館" means library. It is composed of "図書" (books) and "館" (building).'
    },
    examples: [
      {
        japanese: '<ruby>図<rt>としょ</rt></ruby><ruby>書<rt>かん</rt></ruby>で<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>みます。',
        reading: 'としょかんでほんをよみます。',
        zhTW: '在圖書館讀書。',
        en: 'I read books at the library.'
      },
      {
        japanese: '<ruby>図<rt>としょ</rt></ruby><ruby>書<rt>かん</rt></ruby>で<ruby>勉<rt>べん</rt></ruby><ruby>強<rt>きょう</rt></ruby>します。',
        reading: 'としょかんでべんきょうします。',
        zhTW: '在圖書館學習。',
        en: 'I study at the library.'
      },
      {
        japanese: '<ruby>図<rt>としょ</rt></ruby><ruby>書<rt>かん</rt></ruby>から<ruby>本<rt>ほん</rt></ruby>を<ruby>借<rt>か</rt></ruby>りました。',
        reading: 'としょかんからほんをかりました。',
        zhTW: '從圖書館借了書。',
        en: 'I borrowed a book from the library.'
      }
    ],
    relatedWords: [
      {
        id: 'vocabulary-hon',
        title: {
          'zh-TW': '本',
          'en': '本'
        }
      },
      {
        id: 'vocabulary-yomu',
        title: {
          'zh-TW': '読む',
          'en': '読む'
        }
      }
    ]
  }
};

