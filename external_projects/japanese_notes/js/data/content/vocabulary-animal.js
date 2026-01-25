// 單字「動物」- 詳細內容

export const vocabularyAnimal = {
  id: 'vocabulary-animal',
  title: {
    'zh-TW': '動物',
    'en': 'Animal'
  },
  japanese: '<ruby>動<rt>どう</rt></ruby><ruby>物<rt>ぶつ</rt></ruby>',
  category: {
    type: 'vocabulary',
    level: 'N5'
  },
  tags: ['basic', 'vocabulary', 'animals'],
  meaning: {
    'zh-TW': '動物，泛指所有的動物',
    'en': 'animal; a general term for animals'
  },
  content: {
    overview: {
      'zh-TW':
        '「動物」是泛指所有動物的名詞，常用來談論動物這個主題或分類，例如「動物が好きです」（喜歡動物）。',
      'en':
        '「動物」 is a noun meaning \"animal\" in general. It is often used when talking about animals as a topic, e.g. 「動物が好きです」 (I like animals).'
    },
    usage: {
      'zh-TW':
        '基本用法：\n' +
        '・動物が好きです。（喜歡動物。）\n' +
        '・動物の<ruby>園<rt>えん</rt></ruby>に行きます。（去動物園。）',
      'en':
        'Basic usage:\n' +
        '・動物が好きです。 (I like animals.)\n' +
        '・動物の園に行きます。 (I am going to the zoo.)'
    },
    examples: [
      {
        japanese: '<ruby>動<rt>どう</rt></ruby><ruby>物<rt>ぶつ</rt></ruby>が<ruby>好<rt>す</rt></ruby>きです。',
        zhTW: '喜歡動物。',
        en: 'I like animals.'
      },
      {
        japanese: '<ruby>子<rt>こ</rt></ruby><ruby>供<rt>ども</rt></ruby>は<ruby>動<rt>どう</rt></ruby><ruby>物<rt>ぶつ</rt></ruby>が<ruby>大<rt>だい</rt></ruby><ruby>好<rt>す</rt></ruby>きです。',
        zhTW: '小孩子很喜歡動物。',
        en: 'Children really like animals.'
      }
    ]
  }
};