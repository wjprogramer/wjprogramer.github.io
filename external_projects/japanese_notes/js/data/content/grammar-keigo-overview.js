// 敬語總論 - 詳細內容

export const grammarKeigoOverview = {
  id: 'grammar-keigo-overview',
  title: {
    'zh-TW': '敬語總論',
    'en': 'Overview of 敬語'
  },
  category: {
    type: 'grammar',
    level: 'N5'
  },
  tags: ['basic', 'grammar', 'keigo'],
  description: {
    'zh-TW': '整理敬語的基本概念，包含丁寧語、美化語與尊敬語的大方向',
    'en': 'Basic overview of 敬語, including 丁寧語, 美化語, and 尊敬語.'
  },
  content: {
    overview: {
      'zh-TW':
        '「敬語」是用來表現對對方或話題中人物的尊重方式。在日文裡，常見的敬語大致可以分成：丁寧語、美化語、尊敬語（以及謙讓語）。本篇先從大方向整理，幫助你掌握整體結構。',
      'en':
        '「敬語」 is the system used to show respect in Japanese. Common types include 丁寧語, 美化語, 尊敬語 (and 謙讓語). This note focuses on the big picture so you can see how they are related.'
    },
    usage: {
      'zh-TW':
        '敬語的大致分類：\n' +
        '1. 丁寧語：\n' +
        '   - 以「です・ます」為中心的禮貌表現。\n' +
        '   - 例如：「行きます」「きれいです」。\n' +
        '2. 尊敬語：\n' +
        '   - 對「對方」或「話題中的人物」表示尊敬的說法。\n' +
        '   - 例如：「いらっしゃる」「おっしゃる」。\n' +
        '3. 美化語：\n' +
        '   - 在名詞前加上「お・ご」，讓表達變得更柔和或更有禮貌。\n' +
        '   - 例如：「お<ruby>茶<rt>ちゃ</rt></ruby>」「ご<ruby>飯<rt>はん</rt></ruby>」。\n\n' +
        '實際使用時，最先需要熟悉的是「丁寧語」，也就是「です・ます」體，之後再慢慢加入尊敬語、美化語等表現。',
      'en':
        'Main types of 敬語:\n' +
        '1. 丁寧語:\n' +
        '   - Polite style centered on 「です・ます」.\n' +
        '   - Examples: 「行きます」「きれいです」.\n' +
        '2. 尊敬語:\n' +
        '   - Forms that show respect toward the listener or the person in the topic.\n' +
        '   - Examples: 「いらっしゃる」「おっしゃる」.\n' +
        '3. 美化語:\n' +
        '   - Add 「お・ご」 before certain nouns to make the expression softer and more polite.\n' +
        '   - Examples: 「お茶」「ご飯」.\n\n' +
        'For beginners, start with 丁寧語 (the 「です・ます」 style), then gradually learn 尊敬語 and 美化語.'
    },
    examples: [
      {
        japanese: '<ruby>私<rt>わたし</rt></ruby>は<ruby>学<rt>がく</rt></ruby><ruby>校<rt>こう</rt></ruby>へ行きます。',
        zhTW: '我要去學校。（丁寧語）',
        en: 'I am going to school. (丁寧語 with 「行きます」)',
        explanation: {
          'zh-TW': '使用「行きます」而不是「行く」，表現出基本禮貌的丁寧語。',
          'en': 'Using 「行きます」 instead of 「行く」 shows basic politeness (丁寧語).'
        }
      },
      {
        japanese: '<ruby>お<rt>　</rt></ruby><ruby>茶<rt>ちゃ</rt></ruby>を<ruby>飲<rt>の</rt></ruby>みます。',
        zhTW: '喝茶。（美化語）',
        en: 'I drink tea. (美化語 with 「お茶」)',
        explanation: {
          'zh-TW': '在「茶」前加上「お」，變成「お茶」，讓表達更有禮貌。',
          'en': 'Adding 「お」 to 「茶」 to make 「お茶」 is a typical 美化語 pattern.'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 先把「です・ます」形用熟，確保基本的丁寧語沒有問題。\n' +
        '2. 之後再逐步接觸尊敬語、美化語，並搭配實際情境（對老師、對客戶等）來理解。\n' +
        '3. 不需要一次記住所有敬語，只要能在「要有禮貌的場合」時，自然切換到丁寧語，就是很大的進步。',
      'en':
        'Study tips:\n' +
        '1. First, make sure you are comfortable using 「です・ます」 in everyday sentences.\n' +
        '2. Then slowly add 尊敬語 and 美化語, using real situations (talking to teachers, customers, etc.) as examples.\n' +
        '3. You do not need to memorize all 敬語 at once. Being able to switch to 丁寧語 in polite situations is already a big step.'
    },
    relatedContent: [
      {
        id: 'grammar-desu-masu',
        title: {
          'zh-TW': 'です・ます形',
          'en': '"です"/"ます" Form'
        }
      }
    ]
  }
};


