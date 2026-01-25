// 醫院用語 - 詳細內容

export const vocabularyHospital = {
  id: 'category-hospital',
  title: {
    'zh-TW': '醫院用語',
    'en': 'Hospital Phrases'
  },
  category: {
    type: 'vocabulary',
    level: 'N4'
  },
  tags: ['vocabulary', 'hospital', 'health', 'conversation', 'topic-category'],
  description: {
    'zh-TW': '日語中在醫院使用的常用詞彙和表達',
    'en': 'Common words and expressions used in hospitals in Japanese'
  },
  content: {
    overview: {
      'zh-TW':
        '醫院用語是日常生活中重要的部分。了解如何在醫院掛號、描述症狀、詢問病情等對於順利就醫很重要。',
      'en':
        'Hospital phrases are an important part of daily life. Understanding how to register, describe symptoms, ask about conditions, etc. in hospitals is important for smooth medical visits.'
    },
    usage: {
      'zh-TW':
        '醫院用語的用法：\n' +
        '1. 掛號：使用「診察をお願いします」等\n' +
        '2. 描述症狀：使用「〜が痛いです」等\n' +
        '3. 詢問：使用「〜はどうですか」等',
      'en':
        'Usage of hospital phrases:\n' +
        '1. Registration: Use "診察をお願いします", etc.\n' +
        '2. Describe symptoms: Use "〜が痛いです", etc.\n' +
        '3. Asking: Use "〜はどうですか", etc.'
    },
    examples: [
      {
        japanese: '<ruby>診<rt>しん</rt></ruby><ruby>察<rt>さつ</rt></ruby>をお<ruby>願<rt>ねが</rt></ruby>いします。',
        zhTW: '請幫我看診。',
        en: 'I would like to see a doctor, please.',
        explanation: {
          'zh-TW': '「診察をお願いします」是掛號的表達。',
          'en': '"診察をお願いします" is an expression for registration.'
        }
      },
      {
        japanese: '<ruby>頭<rt>あたま</rt></ruby>が<ruby>痛<rt>いた</rt></ruby>いです。',
        zhTW: '頭痛。',
        en: 'I have a headache.',
        explanation: {
          'zh-TW': '「〜が痛い」是描述疼痛的表達。',
          'en': '"〜が痛い" is an expression for describing pain.'
        }
      },
      {
        japanese: '<ruby>熱<rt>ねつ</rt></ruby>があります。',
        zhTW: '發燒。',
        en: 'I have a fever.',
        explanation: {
          'zh-TW': '「熱がある」是描述發燒的表達。',
          'en': '"熱がある" is an expression for describing fever.'
        }
      }
    ],
    vocabulary: [
      {
        japanese: '<ruby>病<rt>びょう</rt></ruby><ruby>院<rt>いん</rt></ruby>',
        zhTW: '醫院',
        en: 'hospital',
        notes: {
          'zh-TW': '醫院',
          'en': 'Hospital'
        }
      },
      {
        japanese: '<ruby>医<rt>い</rt></ruby><ruby>者<rt>しゃ</rt></ruby>',
        zhTW: '醫生',
        en: 'doctor',
        notes: {
          'zh-TW': '醫生',
          'en': 'Doctor'
        }
      },
      {
        japanese: '<ruby>診<rt>しん</rt></ruby><ruby>察<rt>さつ</rt></ruby>',
        zhTW: '看診',
        en: 'medical examination',
        notes: {
          'zh-TW': '診療',
          'en': 'Medical examination'
        }
      },
      {
        japanese: '<ruby>痛<rt>いた</rt></ruby>い',
        zhTW: '痛的',
        en: 'painful, hurts',
        notes: {
          'zh-TW': '疼痛',
          'en': 'Painful'
        }
      },
      {
        japanese: '<ruby>熱<rt>ねつ</rt></ruby>',
        zhTW: '發燒',
        en: 'fever',
        notes: {
          'zh-TW': '發燒',
          'en': 'Fever'
        }
      },
      {
        japanese: '<ruby>薬<rt>くすり</rt></ruby>',
        zhTW: '藥',
        en: 'medicine',
        notes: {
          'zh-TW': '藥物',
          'en': 'Medicine'
        }
      },
      {
        japanese: '<ruby>処<rt>しょ</rt></ruby><ruby>方<rt>ほう</rt></ruby><ruby>箋<rt>せん</rt></ruby>',
        zhTW: '處方箋',
        en: 'prescription',
        notes: {
          'zh-TW': '處方',
          'en': 'Prescription'
        }
      },
      {
        japanese: '<ruby>予<rt>よ</rt></ruby><ruby>約<rt>やく</rt></ruby>',
        zhTW: '預約',
        en: 'appointment',
        notes: {
          'zh-TW': '預約',
          'en': 'Appointment'
        }
      }
    ],
    notes: {
      'zh-TW':
        '學習建議：\n' +
        '1. 記住基本的醫院用語：病院、医者、診察等。\n' +
        '2. 學習描述症狀的表達：〜が痛い、熱がある等。\n' +
        '3. 了解掛號和預約的表達。\n' +
        '4. 注意禮貌用語的使用，醫院是正式場合。',
      'en':
        'Learning tips:\n' +
        '1. Remember basic hospital phrases: 病院, 医者, 診察, etc.\n' +
        '2. Learn expressions for describing symptoms: 〜が痛い, 熱がある, etc.\n' +
        '3. Understand expressions for registration and appointments.\n' +
        '4. Pay attention to the use of polite language, hospitals are formal places.'
    }
  }
};

