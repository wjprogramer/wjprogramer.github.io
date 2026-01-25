// 內容索引
// 用於快速搜尋和列表顯示

export const contentIndex = [
  // ===== 五十音 =====
  {
    id: 'kana-hiragana',
    title: {
      'zh-TW': '平假名',
      'en': 'Hiragana'
    },
    category: {
      type: 'kana',
      level: 'N5'
    },
    tags: ['basic', 'kana', 'hiragana'],
    description: {
      'zh-TW': '平假名的完整五十音圖',
      'en': 'Complete hiragana 「五十音」 chart.'
    }
  },
  {
    id: 'kana-katakana',
    title: {
      'zh-TW': '片假名',
      'en': 'Katakana'
    },
    category: {
      type: 'kana',
      level: 'N5'
    },
    tags: ['basic', 'kana', 'katakana'],
    description: {
      'zh-TW': '片假名的完整五十音圖',
      'en': 'Complete katakana 「五十音」 chart.'
    }
  },
  {
    id: 'kana-yoon',
    title: {
      'zh-TW': '拗音',
      'en': '拗音'
    },
    category: {
      type: 'kana',
      level: 'N5'
    },
    tags: ['basic', 'kana', 'yoon'],
    description: {
      'zh-TW': '拗音是由小寫「ゃ・ゅ・ょ」組成的合成音',
      'en': '拗音 are combined sounds using small 「ゃ・ゅ・ょ」.'
    }
  },
  {
    id: 'kana-choon',
    title: {
      'zh-TW': '長音',
      'en': '長音 (Long Vowel)'
    },
    category: {
      type: 'kana',
      level: 'N5'
    },
    tags: ['basic', 'kana', 'choon'],
    description: {
      'zh-TW': '長音是將母音延長一拍的發音方式',
      'en': '長音 is a way of pronouncing vowels by extending them for one beat.'
    }
  },
  {
    id: 'kana-sokuon',
    title: {
      'zh-TW': '促音',
      'en': '促音 (Geminate Consonant)'
    },
    category: {
      type: 'kana',
      level: 'N5'
    },
    tags: ['basic', 'kana', 'sokuon'],
    description: {
      'zh-TW': '促音是用小寫「っ」或「ッ」表示的停頓音',
      'en': '促音 is a pause sound represented by small 「っ」 or 「ッ」.'
    }
  },
  {
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
    }
  },
  {
    id: 'kana-hatsuon',
    title: {
      'zh-TW': '鼻音（撥音）',
      'en': '鼻音 (撥音) (Nasal Sound)'
    },
    category: {
      type: 'kana',
      level: 'N5'
    },
    tags: ['basic', 'kana', 'hatsuon'],
    description: {
      'zh-TW': '鼻音「ん」是日文中唯一的單獨假名',
      'en': '鼻音 「ん」 is the only standalone kana in Japanese.'
    }
  },
  {
    id: 'kana-dakuon-handakuon',
    title: {
      'zh-TW': '濁音・半濁音',
      'en': '濁音・半濁音 (Voiced Sounds)'
    },
    category: {
      type: 'kana',
      level: 'N5'
    },
    tags: ['basic', 'kana', 'dakuon', 'handakuon'],
    description: {
      'zh-TW': '濁音和半濁音是在清音上加上濁點或半濁點形成的音',
      'en': '濁音 and 半濁音 are sounds formed by adding dakuten or handakuten to 清音.'
    }
  },
  
  // ===== 文法 =====
  {
    id: 'grammar-parts-of-speech',
    title: {
      'zh-TW': '品詞總覽',
      'en': 'Overview of 品詞'
    },
    category: {
      type: 'grammar',
      level: 'N5'
    },
    tags: ['basic', 'grammar', 'part-of-speech'],
    description: {
      'zh-TW': '整理名詞、動詞、形容詞、副詞、助詞、助動詞等品詞的基本概念',
      'en': 'Overview of major Japanese parts of speech such as nouns, verbs, adjectives, adverbs, particles, and auxiliary verbs.'
    }
  },
  {
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
      'zh-TW': '從大方向整理敬語，包括丁寧語、美化語、尊敬語等類型',
      'en': 'Big-picture overview of 敬語, including 丁寧語, 美化語, and 尊敬語.'
    }
  },
  {
    id: 'grammar-adverbs',
    title: {
      'zh-TW': '副詞與副詞形',
      'en': '副詞 and 副詞形'
    },
    category: {
      type: 'grammar',
      level: 'N5'
    },
    tags: ['basic', 'grammar', 'adverb'],
    description: {
      'zh-TW': '介紹常見的副詞，並說明由形容詞變化而來的副詞形用法',
      'en': 'Explains common Japanese adverbs and how to form the adverbial 副詞形 from adjectives.'
    }
  },
  {
    id: 'grammar-aux-verbs',
    title: {
      'zh-TW': '助動詞入門',
      'en': 'Introduction to 助動詞'
    },
    category: {
      type: 'grammar',
      level: 'N5'
    },
    tags: ['basic', 'grammar', 'aux-verb'],
    description: {
      'zh-TW': '介紹初級常用的助動詞，例如否定、過去與樣態等表現',
      'en': 'Introduces essential beginner 助動詞 such as negative, past, and seeming forms.'
    }
  },
  {
    id: 'grammar-particles-wa',
    title: {
      'zh-TW': '助詞「は」',
      'en': 'Particle "は"'
    },
    category: {
      type: 'grammar',
      level: 'N5'
    },
    tags: ['basic', 'grammar', 'particle'],
    description: {
      'zh-TW': '助詞「は」用於標示主題，是日文中最基本的助詞之一',
      'en': 'The particle "は" is used to mark the topic, one of the most basic particles in Japanese'
    }
  },
  {
    id: 'grammar-particles-ga',
    title: {
      'zh-TW': '助詞「が」',
      'en': 'Particle "が"'
    },
    category: {
      type: 'grammar',
      level: 'N5'
    },
    tags: ['basic', 'grammar', 'particle'],
    description: {
      'zh-TW': '助詞「が」用於標示主語，與「は」的用法不同',
      'en': 'The particle "が" is used to mark the subject, different from "は"'
    }
  },
  {
    id: 'grammar-particles-wo',
    title: {
      'zh-TW': '助詞「を」',
      'en': 'Particle "を"'
    },
    category: {
      type: 'grammar',
      level: 'N5'
    },
    tags: ['basic', 'grammar', 'particle'],
    description: {
      'zh-TW': '助詞「を」用於標示動作的直接受詞',
      'en': 'The particle "を" is used to mark the direct object of an action'
    }
  },
  {
    id: 'grammar-desu-masu',
    title: {
      'zh-TW': 'です・ます形',
      'en': '"です"/"ます" Form'
    },
    category: {
      type: 'grammar',
      level: 'N5'
    },
    tags: ['basic', 'grammar', 'keigo'],
    description: {
      'zh-TW': 'です・ます形是日文的禮貌語形式，用於正式場合',
      'en': '"です"/"ます" form is the polite form in Japanese, used in formal situations'
    }
  },
  {
    id: 'grammar-adjectives-i',
    title: {
      'zh-TW': 'い形容詞',
      'en': 'I-Adjectives'
    },
    category: {
      type: 'grammar',
      level: 'N5'
    },
    tags: ['basic', 'grammar', 'adjective'],
    description: {
      'zh-TW': 'い形容詞是以「い」結尾的形容詞，如「高い」「新しい」',
      'en': 'I-adjectives end with "い", such as "高い" (high) and "新しい" (new)'
    }
  },
  {
    id: 'grammar-adjectives-na',
    title: {
      'zh-TW': 'な形容詞',
      'en': 'Na-Adjectives'
    },
    category: {
      type: 'grammar',
      level: 'N5'
    },
    tags: ['basic', 'grammar', 'adjective'],
    description: {
      'zh-TW': 'な形容詞需要加上「な」來修飾名詞，如「きれいな」「静かな」',
      'en': 'Na-adjectives require "な" to modify nouns, such as "きれいな" (beautiful) and "静かな" (quiet)'
    }
  },
  {
    id: 'grammar-particles-ni',
    title: {
      'zh-TW': '助詞「に」',
      'en': 'Particle "に"'
    },
    category: {
      type: 'grammar',
      level: 'N5'
    },
    tags: ['basic', 'grammar', 'particle'],
    description: {
      'zh-TW': '助詞「に」用於標示時間、地點、方向、目的等',
      'en': 'The particle "に" is used to mark time, location, direction, purpose, etc.'
    }
  },
  {
    id: 'grammar-particles-de',
    title: {
      'zh-TW': '助詞「で」',
      'en': 'Particle "で"'
    },
    category: {
      type: 'grammar',
      level: 'N5'
    },
    tags: ['basic', 'grammar', 'particle'],
    description: {
      'zh-TW': '助詞「で」用於標示動作發生的場所、方法、工具等',
      'en': 'The particle "で" is used to mark the place where an action occurs, method, tool, etc.'
    }
  },
  {
    id: 'grammar-particles-he',
    title: {
      'zh-TW': '助詞「へ」',
      'en': 'Particle "へ"'
    },
    category: {
      type: 'grammar',
      level: 'N5'
    },
    tags: ['basic', 'grammar', 'particle'],
    description: {
      'zh-TW': '助詞「へ」用於標示移動的方向',
      'en': 'The particle "へ" is used to mark the direction of movement'
    }
  },
  {
    id: 'grammar-particles-kara',
    title: {
      'zh-TW': '助詞「から」',
      'en': 'Particle "から"'
    },
    category: {
      type: 'grammar',
      level: 'N5'
    },
    tags: ['basic', 'grammar', 'particle'],
    description: {
      'zh-TW': '助詞「から」用於標示起點、原因、材料等',
      'en': 'The particle "から" is used to mark starting point, reason, material, etc.'
    }
  },
  {
    id: 'grammar-particles-made',
    title: {
      'zh-TW': '助詞「まで」',
      'en': 'Particle "まで"'
    },
    category: {
      type: 'grammar',
      level: 'N5'
    },
    tags: ['basic', 'grammar', 'particle'],
    description: {
      'zh-TW': '助詞「まで」用於標示終點、範圍的極限等',
      'en': 'The particle "まで" is used to mark destination, limit of range, etc.'
    }
  },
  {
    id: 'grammar-particles-to',
    title: {
      'zh-TW': '助詞「と」',
      'en': 'Particle "と"'
    },
    category: {
      type: 'grammar',
      level: 'N5'
    },
    tags: ['basic', 'grammar', 'particle'],
    description: {
      'zh-TW': '助詞「と」用於表示「和、與」，以及引用、條件等',
      'en': 'The particle "と" is used to mean "and, with", as well as quotation, condition, etc.'
    }
  },
  {
    id: 'grammar-particles-ya',
    title: {
      'zh-TW': '助詞「や」',
      'en': 'Particle "や"'
    },
    category: {
      type: 'grammar',
      level: 'N5'
    },
    tags: ['basic', 'grammar', 'particle'],
    description: {
      'zh-TW': '助詞「や」用於列舉，表示「...和...等等」',
      'en': 'The particle "や" is used for enumeration, meaning "...and...etc."'
    }
  },
  {
    id: 'grammar-particles-mo',
    title: {
      'zh-TW': '助詞「も」',
      'en': 'Particle "も"'
    },
    category: {
      type: 'grammar',
      level: 'N5'
    },
    tags: ['basic', 'grammar', 'particle'],
    description: {
      'zh-TW': '助詞「も」用於表示「也、都、甚至」等意思',
      'en': 'The particle "も" is used to mean "also, too, even"'
    }
  },
  {
    id: 'grammar-verb-te-form',
    title: {
      'zh-TW': '動詞て形',
      'en': 'Verb て Form'
    },
    category: {
      type: 'grammar',
      level: 'N5'
    },
    tags: ['basic', 'grammar', 'verb'],
    description: {
      'zh-TW': '動詞て形是動詞變化的重要形式，用於連接動作、表示請求等',
      'en': 'Verb て form is an important verb conjugation used to connect actions, make requests, etc.'
    }
  },
  {
    id: 'grammar-verb-ta-form',
    title: {
      'zh-TW': '動詞た形',
      'en': 'Verb た Form'
    },
    category: {
      type: 'grammar',
      level: 'N5'
    },
    tags: ['basic', 'grammar', 'verb'],
    description: {
      'zh-TW': '動詞た形用於表示過去時態，變化規則與て形相同',
      'en': 'Verb た form is used to indicate past tense, with the same conjugation rules as て form'
    }
  },
  {
    id: 'grammar-verb-nai-form',
    title: {
      'zh-TW': '動詞ない形',
      'en': 'Verb ない Form'
    },
    category: {
      type: 'grammar',
      level: 'N5'
    },
    tags: ['basic', 'grammar', 'verb'],
    description: {
      'zh-TW': '動詞ない形用於表示否定，是動詞變化的重要形式',
      'en': 'Verb ない form is used to indicate negation, an important verb conjugation'
    }
  },
  {
    id: 'grammar-pattern-tai',
    title: {
      'zh-TW': '句型「〜たい」',
      'en': 'Pattern "〜たい"'
    },
    category: {
      type: 'grammar',
      level: 'N5'
    },
    tags: ['basic', 'grammar'],
    description: {
      'zh-TW': '「〜たい」表示「想要...」的願望',
      'en': '"〜たい" expresses the desire "want to..."'
    }
  },
  {
    id: 'grammar-pattern-nakereba-naranai',
    title: {
      'zh-TW': '句型「〜なければならない」',
      'en': 'Pattern "〜なければならない"'
    },
    category: {
      type: 'grammar',
      level: 'N5'
    },
    tags: ['basic', 'grammar'],
    description: {
      'zh-TW': '「〜なければならない」表示「必須...」「不得不...」的義務',
      'en': '"〜なければならない" expresses obligation "must..." or "have to..."'
    }
  },
  {
    id: 'grammar-pattern-temo-ii',
    title: {
      'zh-TW': '句型「〜てもいい」',
      'en': 'Pattern "〜てもいい"'
    },
    category: {
      type: 'grammar',
      level: 'N5'
    },
    tags: ['basic', 'grammar'],
    description: {
      'zh-TW': '「〜てもいい」表示「可以...」「...也可以」的許可',
      'en': '"〜てもいい" expresses permission "may..." or "it\'s okay to..."'
    }
  },
  {
    id: 'grammar-particles-yori',
    title: {
      'zh-TW': '助詞「より」',
      'en': 'Particle "より"'
    },
    category: {
      type: 'grammar',
      level: 'N4'
    },
    tags: ['grammar', 'particle'],
    description: {
      'zh-TW': '助詞「より」用於表示比較基準，意思是「比...」',
      'en': 'The particle "より" is used to indicate a standard of comparison, meaning "than..."'
    }
  },
  {
    id: 'grammar-particles-hodo',
    title: {
      'zh-TW': '助詞「ほど」',
      'en': 'Particle "ほど"'
    },
    category: {
      type: 'grammar',
      level: 'N4'
    },
    tags: ['grammar', 'particle'],
    description: {
      'zh-TW': '助詞「ほど」用於表示程度、比較等',
      'en': 'The particle "ほど" is used to indicate degree, comparison, etc.'
    }
  },
  {
    id: 'grammar-particles-nado',
    title: {
      'zh-TW': '助詞「など」',
      'en': 'Particle "など"'
    },
    category: {
      type: 'grammar',
      level: 'N4'
    },
    tags: ['grammar', 'particle'],
    description: {
      'zh-TW': '助詞「など」用於列舉，表示「...等等」',
      'en': 'The particle "など" is used for enumeration, meaning "...etc."'
    }
  },
  {
    id: 'grammar-verb-potential',
    title: {
      'zh-TW': '動詞可能形',
      'en': 'Verb Potential Form'
    },
    category: {
      type: 'grammar',
      level: 'N4'
    },
    tags: ['grammar', 'verb'],
    description: {
      'zh-TW': '動詞可能形用於表示「能夠...」「可以...」的能力或可能性',
      'en': 'Verb potential form is used to express ability or possibility "can..." or "be able to..."'
    }
  },
  {
    id: 'grammar-pattern-te-shimau',
    title: {
      'zh-TW': '句型「〜てしまう」',
      'en': 'Pattern "〜てしまう"'
    },
    category: {
      type: 'grammar',
      level: 'N4'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜てしまう」表示動作的完成或遺憾、後悔等感情',
      'en': '"〜てしまう" expresses completion of an action or feelings of regret, disappointment, etc.'
    }
  },
  {
    id: 'grammar-pattern-te-miru',
    title: {
      'zh-TW': '句型「〜てみる」',
      'en': 'Pattern "〜てみる"'
    },
    category: {
      type: 'grammar',
      level: 'N4'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜てみる」表示「試著...」「嘗試...」',
      'en': '"〜てみる" expresses "try to..." or "try doing..."'
    }
  },
  {
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
    }
  },
  {
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
    }
  },
  {
    id: 'grammar-pattern-nagara',
    title: {
      'zh-TW': '句型「〜ながら」',
      'en': 'Pattern "〜ながら"'
    },
    category: {
      type: 'grammar',
      level: 'N4'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ながら」表示「一邊...一邊...」「雖然...但是...」',
      'en': '"〜ながら" expresses "while doing..." or "although..."'
    }
  },
  {
    id: 'grammar-pattern-noni',
    title: {
      'zh-TW': '句型「〜のに」',
      'en': 'Pattern "〜のに"'
    },
    category: {
      type: 'grammar',
      level: 'N4'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜のに」表示「雖然...但是...」「明明...卻...」，帶有遺憾或意外',
      'en': '"〜のに" expresses "although...but..." or "even though...", with a tone of regret or surprise'
    }
  },
  {
    id: 'grammar-particles-dake',
    title: {
      'zh-TW': '助詞「だけ」',
      'en': 'Particle "だけ"'
    },
    category: {
      type: 'grammar',
      level: 'N4'
    },
    tags: ['grammar', 'particle'],
    description: {
      'zh-TW': '助詞「だけ」用於表示「只有...」「僅僅...」',
      'en': 'The particle "だけ" is used to mean "only..." or "just..."'
    }
  },
  {
    id: 'grammar-particles-shika',
    title: {
      'zh-TW': '助詞「しか」',
      'en': 'Particle "しか"'
    },
    category: {
      type: 'grammar',
      level: 'N4'
    },
    tags: ['grammar', 'particle'],
    description: {
      'zh-TW': '助詞「しか」用於表示「只有...」，必須與否定形連用',
      'en': 'The particle "しか" is used to mean "only...", and must be used with negative form'
    }
  },
  {
    id: 'grammar-pattern-ba',
    title: {
      'zh-TW': '句型「〜ば」',
      'en': 'Pattern "〜ば"'
    },
    category: {
      type: 'grammar',
      level: 'N4'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ば」表示條件，意思是「如果...就...」',
      'en': '"〜ば" expresses condition, meaning "if...then..."'
    }
  },
  {
    id: 'grammar-pattern-tara',
    title: {
      'zh-TW': '句型「〜たら」',
      'en': 'Pattern "〜たら"'
    },
    category: {
      type: 'grammar',
      level: 'N4'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜たら」表示條件，意思是「如果...就...」「...之後」',
      'en': '"〜たら" expresses condition, meaning "if...then..." or "after..."'
    }
  },
  {
    id: 'grammar-verb-causative-passive',
    title: {
      'zh-TW': '動詞使役被動形',
      'en': 'Verb Causative-Passive Form'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar', 'verb'],
    description: {
      'zh-TW': '動詞使役被動形用於表示「被迫...」「被讓...做...」',
      'en': 'Verb causative-passive form is used to express "be made to..." or "be forced to..."'
    }
  },
  {
    id: 'grammar-pattern-te-oku',
    title: {
      'zh-TW': '句型「〜ておく」',
      'en': 'Pattern "〜ておく"'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ておく」表示「事先...」「預先...」或「保持...狀態」',
      'en': '"〜ておく" expresses "do...in advance" or "keep...in a state"'
    }
  },
  {
    id: 'grammar-pattern-te-iku',
    title: {
      'zh-TW': '句型「〜ていく」',
      'en': 'Pattern "〜ていく"'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ていく」表示「...去」「繼續...下去」',
      'en': '"〜ていく" expresses "...go" or "continue...onward"'
    }
  },
  {
    id: 'grammar-pattern-te-kuru',
    title: {
      'zh-TW': '句型「〜てくる」',
      'en': 'Pattern "〜てくる"'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜てくる」表示「...來」「開始...起來」「一直...到現在」',
      'en': '"〜てくる" expresses "...come", "start to...", or "have been...until now"'
    }
  },
  {
    id: 'grammar-particles-bakari',
    title: {
      'zh-TW': '助詞「ばかり」',
      'en': 'Particle "ばかり"'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar', 'particle'],
    description: {
      'zh-TW': '助詞「ばかり」用於表示「只...」「總是...」「剛...」',
      'en': 'The particle "ばかり" is used to mean "only...", "always...", or "just..."'
    }
  },
  {
    id: 'grammar-pattern-koto-ni-naru',
    title: {
      'zh-TW': '句型「〜ことになる」',
      'en': 'Pattern "〜ことになる"'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ことになる」表示「決定...」「結果是...」，表示客觀決定或自然結果',
      'en': '"〜ことになる" expresses "it is decided that..." or "it turns out that...", indicating an objective decision or natural result'
    }
  },
  {
    id: 'grammar-pattern-koto-ni-suru',
    title: {
      'zh-TW': '句型「〜ことにする」',
      'en': 'Pattern "〜ことにする"'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ことにする」表示「決定...」，表示主觀決定',
      'en': '"〜ことにする" expresses "decide to...", indicating a subjective decision'
    }
  },
  {
    id: 'grammar-keigo-teineigo',
    title: {
      'zh-TW': '丁寧語',
      'en': '丁寧語 (Polite Language)'
    },
    category: {
      type: 'grammar',
      level: 'N4'
    },
    tags: ['grammar', 'keigo'],
    description: {
      'zh-TW': '丁寧語是敬語的一種，用於表示禮貌和尊重',
      'en': '丁寧語 is a type of 敬語 used to express politeness and respect'
    }
  },
  {
    id: 'grammar-keigo-sonkeigo',
    title: {
      'zh-TW': '尊敬語',
      'en': '尊敬語 (Respectful Language)'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar', 'keigo'],
    description: {
      'zh-TW': '尊敬語是敬語的一種，用於抬高對方的動作或狀態',
      'en': '尊敬語 is a type of 敬語 used to elevate the actions or states of others'
    }
  },
  {
    id: 'grammar-keigo-kenjogo',
    title: {
      'zh-TW': '謙讓語',
      'en': '謙讓語 (Humble Language)'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar', 'keigo'],
    description: {
      'zh-TW': '謙讓語是敬語的一種，用於降低自己的動作或狀態，抬高對方',
      'en': '謙讓語 is a type of 敬語 used to lower one\'s own actions or states, elevating others'
    }
  },
  {
    id: 'grammar-pattern-wake-da',
    title: {
      'zh-TW': '句型「〜わけだ」',
      'en': 'Pattern "〜わけだ"'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜わけだ」表示「當然...」「難怪...」「也就是說...」',
      'en': '"〜わけだ" expresses "of course...", "no wonder...", or "that is to say..."'
    }
  },
  {
    id: 'grammar-pattern-hazu-da',
    title: {
      'zh-TW': '句型「〜はずだ」',
      'en': 'Pattern "〜はずだ"'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜はずだ」表示「應該...」「預期...」「按理說...」',
      'en': '"〜はずだ" expresses "should...", "expected to...", or "supposed to..."'
    }
  },
  {
    id: 'grammar-particles-sae',
    title: {
      'zh-TW': '助詞「さえ」',
      'en': 'Particle "さえ"'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar', 'particle'],
    description: {
      'zh-TW': '助詞「さえ」用於表示「甚至...」「連...都...」',
      'en': 'The particle "さえ" is used to mean "even..." or "even...at all"'
    }
  },
  {
    id: 'grammar-particles-demo',
    title: {
      'zh-TW': '助詞「でも」',
      'en': 'Particle "でも"'
    },
    category: {
      type: 'grammar',
      level: 'N4'
    },
    tags: ['grammar', 'particle'],
    description: {
      'zh-TW': '助詞「でも」用於表示「即使...也...」「...之類的」',
      'en': 'The particle "でも" is used to mean "even if..." or "...or something like that"'
    }
  },
  {
    id: 'grammar-pattern-mono-da',
    title: {
      'zh-TW': '句型「〜ものだ」',
      'en': 'Pattern "〜ものだ"'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ものだ」表示「應該...」「本來就...」「真是...」',
      'en': '"〜ものだ" expresses "should...", "naturally...", or "how...it is"'
    }
  },
  {
    id: 'grammar-pattern-koto-da',
    title: {
      'zh-TW': '句型「〜ことだ」',
      'en': 'Pattern "〜ことだ"'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ことだ」表示「應該...」「重要的是...」',
      'en': '"〜ことだ" expresses "should..." or "the important thing is..."'
    }
  },
  {
    id: 'grammar-particles-koso',
    title: {
      'zh-TW': '助詞「こそ」',
      'en': 'Particle "こそ"'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar', 'particle'],
    description: {
      'zh-TW': '助詞「こそ」用於表示「正是...」「才是...」',
      'en': 'The particle "こそ" is used to mean "exactly...", "it is...that"'
    }
  },
  {
    id: 'grammar-particles-sura',
    title: {
      'zh-TW': '助詞「すら」',
      'en': 'Particle "すら"'
    },
    category: {
      type: 'grammar',
      level: 'N2'
    },
    tags: ['grammar', 'particle'],
    description: {
      'zh-TW': '助詞「すら」用於表示「甚至...」「連...都...」',
      'en': 'The particle "すら" is used to mean "even..." or "even...at all"'
    }
  },
  {
    id: 'grammar-pattern-bakari-ka',
    title: {
      'zh-TW': '句型「〜ばかりか」',
      'en': 'Pattern "〜ばかりか"'
    },
    category: {
      type: 'grammar',
      level: 'N2'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ばかりか」表示「不僅...而且...」「不但...還...」',
      'en': '"〜ばかりか" expresses "not only...but also..." or "not only...but..."'
    }
  },
  {
    id: 'grammar-pattern-dokoro-ka',
    title: {
      'zh-TW': '句型「〜どころか」',
      'en': 'Pattern "〜どころか"'
    },
    category: {
      type: 'grammar',
      level: 'N2'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜どころか」表示「別說...就連...」「不但不...反而...」',
      'en': '"〜どころか" expresses "far from...", "not only...but..." or "instead of..."'
    }
  },
  {
    id: 'grammar-pattern-ni-kagirazu',
    title: {
      'zh-TW': '句型「〜に限らず」',
      'en': 'Pattern "〜に限らず"'
    },
    category: {
      type: 'grammar',
      level: 'N2'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜に限らず」表示「不限於...」「不僅...」',
      'en': '"〜に限らず" expresses "not limited to...", "not only..."'
    }
  },
  {
    id: 'grammar-pattern-ni-shite-mo',
    title: {
      'zh-TW': '句型「〜にしても」',
      'en': 'Pattern "〜にしても"'
    },
    category: {
      type: 'grammar',
      level: 'N2'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜にしても」表示「即使...也...」「就算...也...」',
      'en': '"〜にしても" expresses "even if...", "even though..."'
    }
  },
  {
    id: 'grammar-pattern-ni-seyo',
    title: {
      'zh-TW': '句型「〜にせよ」',
      'en': 'Pattern "〜にせよ"'
    },
    category: {
      type: 'grammar',
      level: 'N2'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜にせよ」表示「即使...也...」「無論...都...」',
      'en': '"〜にせよ" expresses "even if...", "whether...or..."'
    }
  },
  {
    id: 'grammar-pattern-to-iu-wake',
    title: {
      'zh-TW': '句型「〜というわけだ」',
      'en': 'Pattern "〜というわけだ"'
    },
    category: {
      type: 'grammar',
      level: 'N2'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜というわけだ」表示「也就是說...」「意思是...」',
      'en': '"〜というわけだ" expresses "that is to say...", "meaning..."'
    }
  },
  {
    id: 'grammar-pattern-mono-no',
    title: {
      'zh-TW': '句型「〜ものの」',
      'en': 'Pattern "〜ものの"'
    },
    category: {
      type: 'grammar',
      level: 'N2'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ものの」表示「雖然...但是...」「儘管...可是...」',
      'en': '"〜ものの" expresses "although...", "even though..."'
    }
  },
  {
    id: 'grammar-pattern-to-ie',
    title: {
      'zh-TW': '句型「〜とはいえ」',
      'en': 'Pattern "〜とはいえ"'
    },
    category: {
      type: 'grammar',
      level: 'N2'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜とはいえ」表示「雖然說是...但是...」「儘管...可是...」',
      'en': '"〜とはいえ" expresses "although it is said that...", "even though..."'
    }
  },
  {
    id: 'grammar-pattern-ni-shiro',
    title: {
      'zh-TW': '句型「〜にしろ」',
      'en': 'Pattern "〜にしろ"'
    },
    category: {
      type: 'grammar',
      level: 'N2'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜にしろ」表示「即使...也...」「無論...都...」',
      'en': '"〜にしろ" expresses "even if...", "whether...or..."'
    }
  },
  {
    id: 'grammar-pattern-to-wa',
    title: {
      'zh-TW': '句型「〜とは」',
      'en': 'Pattern "〜とは"'
    },
    category: {
      type: 'grammar',
      level: 'N2'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜とは」表示「所謂...」「...是...」',
      'en': '"〜とは" expresses "what is called...", "...is..."'
    }
  },
  {
    id: 'grammar-pattern-to-iu-mono',
    title: {
      'zh-TW': '句型「〜というもの」',
      'en': 'Pattern "〜というもの"'
    },
    category: {
      type: 'grammar',
      level: 'N2'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜というもの」表示「所謂...」「...這種東西」',
      'en': '"〜というもの" expresses "what is called...", "...this kind of thing"'
    }
  },
  {
    id: 'grammar-pattern-to-iu-koto',
    title: {
      'zh-TW': '句型「〜ということ」',
      'en': 'Pattern "〜ということ"'
    },
    category: {
      type: 'grammar',
      level: 'N2'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ということ」表示「...這件事」「...這個事實」',
      'en': '"〜ということ" expresses "...this matter", "...this fact"'
    }
  },
  {
    id: 'grammar-pattern-to-iu-koto-ni',
    title: {
      'zh-TW': '句型「〜ということに」',
      'en': 'Pattern "〜ということに"'
    },
    category: {
      type: 'grammar',
      level: 'N2'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ということに」表示「決定...」「當作...」',
      'en': '"〜ということに" expresses "decide that...", "treat as..."'
    }
  },
  {
    id: 'grammar-pattern-to-iu-koto-wa',
    title: {
      'zh-TW': '句型「〜ということは」',
      'en': 'Pattern "〜ということは"'
    },
    category: {
      type: 'grammar',
      level: 'N2'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ということは」表示「也就是說...」「意思是...」',
      'en': '"〜ということは" expresses "that is to say...", "meaning..."'
    }
  },
  {
    id: 'grammar-pattern-to-iu-koto-mo-nai',
    title: {
      'zh-TW': '句型「〜ということもしない」',
      'en': 'Pattern "〜ということもしない"'
    },
    category: {
      type: 'grammar',
      level: 'N1'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ということもしない」表示「連...都不做」「根本不...」',
      'en': '"〜ということもしない" expresses "not even do...", "not at all..."'
    }
  },
  {
    id: 'grammar-pattern-to-iu-koto-de-mo-nai',
    title: {
      'zh-TW': '句型「〜ということでもない」',
      'en': 'Pattern "〜ということでもない"'
    },
    category: {
      type: 'grammar',
      level: 'N2'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ということでもない」表示「也不是說...」「並不是...」',
      'en': '"〜ということでもない" expresses "it\'s not that...", "not necessarily..."'
    }
  },
  {
    id: 'grammar-pattern-to-iu-koto-wa-nai',
    title: {
      'zh-TW': '句型「〜ということはない」',
      'en': 'Pattern "〜ということはない"'
    },
    category: {
      type: 'grammar',
      level: 'N2'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ということはない」表示「沒有...這回事」「不會...」',
      'en': '"〜ということはない" expresses "there is no such thing as...", "will not..."'
    }
  },
  {
    id: 'grammar-pattern-to-iu-koto-de-wa-nai',
    title: {
      'zh-TW': '句型「〜ということではない」',
      'en': 'Pattern "〜ということではない"'
    },
    category: {
      type: 'grammar',
      level: 'N2'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ということではない」表示「並不是說...」「不是...的意思」',
      'en': '"〜ということではない" expresses "it\'s not that...", "doesn\'t mean..."'
    }
  },
  {
    id: 'grammar-pattern-to-iu-koto-ni-wa-nai',
    title: {
      'zh-TW': '句型「〜ということにはない」',
      'en': 'Pattern "〜ということにはない"'
    },
    category: {
      type: 'grammar',
      level: 'N1'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ということにはない」表示「沒有...的必要」「不需要...」',
      'en': '"〜ということにはない" expresses "there is no need to...", "no need to..."'
    }
  },
  {
    id: 'grammar-pattern-to-iu-koto-de-wa-naku',
    title: {
      'zh-TW': '句型「〜ということではなく」',
      'en': 'Pattern "〜ということではなく"'
    },
    category: {
      type: 'grammar',
      level: 'N2'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ということではなく」表示「不是說...而是...」「不是...而是...」',
      'en': '"〜ということではなく" expresses "it\'s not that...but rather...", "not...but..."'
    }
  },
  {
    id: 'grammar-pattern-to-iu-koto-ni-wa-aru',
    title: {
      'zh-TW': '句型「〜ということにはある」',
      'en': 'Pattern "〜ということにはある"'
    },
    category: {
      type: 'grammar',
      level: 'N1'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ということにはある」表示「有...的必要」「需要...」',
      'en': '"〜ということにはある" expresses "there is a need to...", "need to..."'
    }
  },
  {
    id: 'grammar-pattern-to-iu-koto-de-wa-naku-te',
    title: {
      'zh-TW': '句型「〜ということではなくて」',
      'en': 'Pattern "〜ということではなくて"'
    },
    category: {
      type: 'grammar',
      level: 'N2'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ということではなくて」表示「不是說...而是...」「不是...而是...」',
      'en': '"〜ということではなくて" expresses "it\'s not that...but rather...", "not...but..."'
    }
  },
  {
    id: 'grammar-pattern-to-iu-koto-ni-wa-naranai',
    title: {
      'zh-TW': '句型「〜ということにはならない」',
      'en': 'Pattern "〜ということにはならない"'
    },
    category: {
      type: 'grammar',
      level: 'N1'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ということにはならない」表示「不能說...」「不等於...」',
      'en': '"〜ということにはならない" expresses "cannot say that...", "does not equal..."'
    }
  },
  {
    id: 'grammar-pattern-to-iu-koto-ni-wa-naranai-kara',
    title: {
      'zh-TW': '句型「〜ということにはならないから」',
      'en': 'Pattern "〜ということにはならないから"'
    },
    category: {
      type: 'grammar',
      level: 'N1'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ということにはならないから」表示「不能說...所以...」「不等於...所以...」',
      'en': '"〜ということにはならないから" expresses "cannot say that...so...", "does not equal...so..."'
    }
  },
  {
    id: 'grammar-pattern-to-iu-koto-ni-wa-naranai-node',
    title: {
      'zh-TW': '句型「〜ということにはならないので」',
      'en': 'Pattern "〜ということにはならないので"'
    },
    category: {
      type: 'grammar',
      level: 'N1'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ということにはならないので」表示「不能說...所以...」「不等於...所以...」',
      'en': '"〜ということにはならないので" expresses "cannot say that...so...", "does not equal...so..."'
    }
  },
  {
    id: 'grammar-pattern-to-iu-koto-ni-wa-naranai-kedo',
    title: {
      'zh-TW': '句型「〜ということにはならないけど」',
      'en': 'Pattern "〜ということにはならないけど"'
    },
    category: {
      type: 'grammar',
      level: 'N1'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ということにはならないけど」表示「不能說...但是...」「不等於...但是...」',
      'en': '"〜ということにはならないけど" expresses "cannot say that...but...", "does not equal...but..."'
    }
  },
  {
    id: 'grammar-pattern-to-iu-koto-ni-wa-naranai-ga',
    title: {
      'zh-TW': '句型「〜ということにはならないが」',
      'en': 'Pattern "〜ということにはならないが"'
    },
    category: {
      type: 'grammar',
      level: 'N1'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ということにはならないが」表示「不能說...但是...」「不等於...但是...」',
      'en': '"〜ということにはならないが" expresses "cannot say that...but...", "does not equal...but..."'
    }
  },
  {
    id: 'grammar-pattern-to-iu-koto-ni-wa-naranai-shikashi',
    title: {
      'zh-TW': '句型「〜ということにはならないしかし」',
      'en': 'Pattern "〜ということにはならないしかし"'
    },
    category: {
      type: 'grammar',
      level: 'N1'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ということにはならないしかし」表示「不能說...但是...」「不等於...但是...」',
      'en': '"〜ということにはならないしかし" expresses "cannot say that...but...", "does not equal...but..."'
    }
  },
  {
    id: 'grammar-pattern-to-iu-koto-ni-wa-naranai-tadashi',
    title: {
      'zh-TW': '句型「〜ということにはならないただし」',
      'en': 'Pattern "〜ということにはならないただし"'
    },
    category: {
      type: 'grammar',
      level: 'N1'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ということにはならないただし」表示「不能說...但是...」「不等於...但是...」',
      'en': '"〜ということにはならないただし" expresses "cannot say that...but...", "does not equal...but..."'
    }
  },
  {
    id: 'grammar-pattern-to-iu-koto-ni-wa-naranai-tomo',
    title: {
      'zh-TW': '句型「〜ということにはならないとも」',
      'en': 'Pattern "〜ということにはならないとも"'
    },
    category: {
      type: 'grammar',
      level: 'N1'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ということにはならないとも」表示「不能說...但是...」「不等於...但是...」',
      'en': '"〜ということにはならないとも" expresses "cannot say that...but...", "does not equal...but..."'
    }
  },
  {
    id: 'grammar-pattern-to-iu-koto-ni-wa-naranai-tadashi-ga',
    title: {
      'zh-TW': '句型「〜ということにはならないただしが」',
      'en': 'Pattern "〜ということにはならないただしが"'
    },
    category: {
      type: 'grammar',
      level: 'N1'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ということにはならないただしが」表示「不能說...但是...」「不等於...但是...」',
      'en': '"〜ということにはならないただしが" expresses "cannot say that...but...", "does not equal...but..."'
    }
  },
  {
    id: 'grammar-pattern-te-ageru',
    title: {
      'zh-TW': '句型「〜てあげる」',
      'en': 'Pattern "〜てあげる"'
    },
    category: {
      type: 'grammar',
      level: 'N4'
    },
    tags: ['grammar', 'verb'],
    description: {
      'zh-TW': '「〜てあげる」表示「為別人做...」「給別人...」',
      'en': '"〜てあげる" expresses "do... for someone" or "give... to someone"'
    }
  },
  {
    id: 'grammar-pattern-te-morau',
    title: {
      'zh-TW': '句型「〜てもらう」',
      'en': 'Pattern "〜てもらう"'
    },
    category: {
      type: 'grammar',
      level: 'N4'
    },
    tags: ['grammar', 'verb'],
    description: {
      'zh-TW': '「〜てもらう」表示「請別人做...」「得到別人的幫助」',
      'en': '"〜てもらう" expresses "receive someone\'s action" or "get someone to do..."'
    }
  },
  {
    id: 'grammar-pattern-te-kureru',
    title: {
      'zh-TW': '句型「〜てくれる」',
      'en': 'Pattern "〜てくれる"'
    },
    category: {
      type: 'grammar',
      level: 'N4'
    },
    tags: ['grammar', 'verb'],
    description: {
      'zh-TW': '「〜てくれる」表示「別人為我做...」「別人給我...」',
      'en': '"〜てくれる" expresses "someone does... for me" or "someone gives... to me"'
    }
  },
  {
    id: 'grammar-pattern-rashii',
    title: {
      'zh-TW': '句型「〜らしい」',
      'en': 'Pattern "〜らしい"'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar', 'adjective'],
    description: {
      'zh-TW': '「〜らしい」表示「好像...」「似乎...」「典型的...」',
      'en': '"〜らしい" expresses "seems like...", "appears to be...", "typical..."'
    }
  },
  {
    id: 'grammar-pattern-you-da',
    title: {
      'zh-TW': '句型「〜ようだ」',
      'en': 'Pattern "〜ようだ"'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜ようだ」表示「好像...」「似乎...」「看起來...」',
      'en': '"〜ようだ" expresses "seems like...", "appears to be...", "looks like..."'
    }
  },
  {
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
    }
  },
  {
    id: 'grammar-pattern-sou-da-appearance',
    title: {
      'zh-TW': '句型「〜そうだ」（樣態）',
      'en': 'Pattern "〜そうだ" (Appearance)'
    },
    category: {
      type: 'grammar',
      level: 'N4'
    },
    tags: ['grammar', 'adjective'],
    description: {
      'zh-TW': '「〜そうだ」表示「看起來...」「好像要...」',
      'en': '"〜そうだ" expresses "looks like...", "seems about to..."'
    }
  },
  {
    id: 'grammar-pattern-sou-da-hearsay',
    title: {
      'zh-TW': '句型「〜そうだ」（傳聞）',
      'en': 'Pattern "〜そうだ" (Hearsay)'
    },
    category: {
      type: 'grammar',
      level: 'N4'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜そうだ」表示「聽說...」「據說...」',
      'en': '"〜そうだ" expresses "I hear that...", "it is said that..."'
    }
  },
  {
    id: 'grammar-pattern-bakari',
    title: {
      'zh-TW': '句型「〜ばかり」',
      'en': 'Pattern "〜ばかり"'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar', 'particle'],
    description: {
      'zh-TW': '「〜ばかり」表示「只...」「光是...」「總是...」',
      'en': '"〜ばかり" expresses "only...", "nothing but...", "always..."'
    }
  },
  {
    id: 'grammar-pattern-tokoro',
    title: {
      'zh-TW': '句型「〜ところ」',
      'en': 'Pattern "〜ところ"'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar', 'noun'],
    description: {
      'zh-TW': '「〜ところ」表示「正要...」「正在...」「剛...」',
      'en': '"〜ところ" expresses "about to...", "in the middle of...", "just..."'
    }
  },
  {
    id: 'grammar-pattern-no-da',
    title: {
      'zh-TW': '句型「〜のだ」「〜んだ」',
      'en': 'Pattern "〜のだ" / "〜んだ"'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar'],
    description: {
      'zh-TW': '「〜のだ」「〜んだ」表示說明、強調、解釋',
      'en': '"〜のだ" / "〜んだ" expresses explanation, emphasis, or clarification'
    }
  },
  {
    id: 'grammar-pattern-no-ni',
    title: {
      'zh-TW': '句型「〜のに」',
      'en': 'Pattern "〜のに"'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar', 'conjunction'],
    description: {
      'zh-TW': '「〜のに」表示「雖然...但是...」「儘管...卻...」',
      'en': '"〜のに" expresses "although...", "even though...", "despite..."'
    }
  },
  {
    id: 'grammar-pattern-te-hoshii',
    title: {
      'zh-TW': '句型「〜てほしい」',
      'en': 'Pattern "〜てほしい"'
    },
    category: {
      type: 'grammar',
      level: 'N4'
    },
    tags: ['grammar', 'adjective'],
    description: {
      'zh-TW': '「〜てほしい」表示「希望...」「想要...」',
      'en': '"〜てほしい" expresses "I want...", "I hope..."'
    }
  },
  {
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
    }
  },
  {
    id: 'grammar-pattern-kara-reason',
    title: {
      'zh-TW': '句型「〜から」（原因）',
      'en': 'Pattern "〜から" (Reason)'
    },
    category: {
      type: 'grammar',
      level: 'N4'
    },
    tags: ['grammar', 'conjunction'],
    description: {
      'zh-TW': '「〜から」表示「因為...所以...」',
      'en': '"〜から" expresses "because...", "since..."'
    }
  },
  {
    id: 'grammar-pattern-node',
    title: {
      'zh-TW': '句型「〜ので」',
      'en': 'Pattern "〜ので"'
    },
    category: {
      type: 'grammar',
      level: 'N4'
    },
    tags: ['grammar', 'conjunction'],
    description: {
      'zh-TW': '「〜ので」表示「因為...所以...」',
      'en': '"〜ので" expresses "because...", "since..."'
    }
  },
  {
    id: 'grammar-pattern-tame-ni',
    title: {
      'zh-TW': '句型「〜ために」',
      'en': 'Pattern "〜ために"'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar', 'conjunction'],
    description: {
      'zh-TW': '「〜ために」表示「為了...」「因為...」',
      'en': '"〜ために" expresses "in order to...", "for the sake of...", "because..."'
    }
  },
  {
    id: 'grammar-pattern-you-ni',
    title: {
      'zh-TW': '句型「〜ように」',
      'en': 'Pattern "〜ように"'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar', 'conjunction'],
    description: {
      'zh-TW': '「〜ように」表示「為了...」「以便...」「像...一樣」',
      'en': '"〜ように" expresses "in order to...", "so that...", "like..."'
    }
  },
  {
    id: 'grammar-pattern-koto-ga-dekiru',
    title: {
      'zh-TW': '句型「〜ことができる」',
      'en': 'Pattern "〜ことができる"'
    },
    category: {
      type: 'grammar',
      level: 'N4'
    },
    tags: ['grammar', 'verb'],
    description: {
      'zh-TW': '「〜ことができる」表示「能夠...」「會...」',
      'en': '"〜ことができる" expresses "can do...", "be able to..."'
    }
  },
  {
    id: 'grammar-pattern-koto-ga-aru',
    title: {
      'zh-TW': '句型「〜ことがある」',
      'en': 'Pattern "〜ことがある"'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar', 'verb'],
    description: {
      'zh-TW': '「〜ことがある」表示「有時...」「曾經...」',
      'en': '"〜ことがある" expresses "sometimes...", "have done... before"'
    }
  },
  {
    id: 'grammar-pattern-te-wa-ikenai',
    title: {
      'zh-TW': '句型「〜てはいけない」',
      'en': 'Pattern "〜てはいけない"'
    },
    category: {
      type: 'grammar',
      level: 'N4'
    },
    tags: ['grammar', 'prohibition'],
    description: {
      'zh-TW': '「〜てはいけない」表示「不可以...」「禁止...」',
      'en': '"〜てはいけない" expresses "must not...", "don\'t..."'
    }
  },
  {
    id: 'grammar-pattern-nakute-wa-ikenai',
    title: {
      'zh-TW': '句型「〜なくてはいけない」',
      'en': 'Pattern "〜なくてはいけない"'
    },
    category: {
      type: 'grammar',
      level: 'N4'
    },
    tags: ['grammar', 'obligation'],
    description: {
      'zh-TW': '「〜なくてはいけない」表示「必須...」「一定要...」',
      'en': '"〜なくてはいけない" expresses "must...", "have to..."'
    }
  },
  {
    id: 'grammar-pattern-beki-da',
    title: {
      'zh-TW': '句型「〜べきだ」',
      'en': 'Pattern "〜べきだ"'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar', 'obligation'],
    description: {
      'zh-TW': '「〜べきだ」表示「應該...」「理應...」',
      'en': '"〜べきだ" expresses "should...", "ought to..."'
    }
  },
  {
    id: 'grammar-pattern-nai-de',
    title: {
      'zh-TW': '句型「〜ないで」',
      'en': 'Pattern "〜ないで"'
    },
    category: {
      type: 'grammar',
      level: 'N4'
    },
    tags: ['grammar', 'conjunction'],
    description: {
      'zh-TW': '「〜ないで」表示「不要...」「在不...的情況下」',
      'en': '"〜ないで" expresses "without doing...", "don\'t..."'
    }
  },
  {
    id: 'grammar-pattern-to-shite',
    title: {
      'zh-TW': '句型「〜として」',
      'en': 'Pattern "〜として"'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar', 'particle'],
    description: {
      'zh-TW': '「〜として」表示「作為...」「以...的身份」',
      'en': '"〜として" expresses "as...", "in the role of..."'
    }
  },
  {
    id: 'grammar-pattern-ni-tsuite',
    title: {
      'zh-TW': '句型「〜について」',
      'en': 'Pattern "〜について"'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar', 'particle'],
    description: {
      'zh-TW': '「〜について」表示「關於...」「有關...」',
      'en': '"〜について" expresses "about...", "regarding..."'
    }
  },
  {
    id: 'grammar-pattern-ni-totte',
    title: {
      'zh-TW': '句型「〜にとって」',
      'en': 'Pattern "〜にとって"'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar', 'particle'],
    description: {
      'zh-TW': '「〜にとって」表示「對...來說」「對...而言」',
      'en': '"〜にとって" expresses "for...", "to..."'
    }
  },
  {
    id: 'grammar-pattern-ni-taishite',
    title: {
      'zh-TW': '句型「〜に対して」',
      'en': 'Pattern "〜に対して"'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar', 'particle'],
    description: {
      'zh-TW': '「〜に対して」表示「對...」「對於...」「與...相對」',
      'en': '"〜に対して" expresses "toward...", "against...", "in contrast to..."'
    }
  },
  {
    id: 'grammar-pattern-ni-shitagatte',
    title: {
      'zh-TW': '句型「〜に従って」',
      'en': 'Pattern "〜に従って"'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar', 'particle'],
    description: {
      'zh-TW': '「〜に従って」表示「按照...」「隨著...」「根據...」',
      'en': '"〜に従って" expresses "according to...", "as...", "following..."'
    }
  },
  {
    id: 'grammar-pattern-ni-tsuite-wa',
    title: {
      'zh-TW': '句型「〜について（は）」',
      'en': 'Pattern "〜について（は）"'
    },
    category: {
      type: 'grammar',
      level: 'N3'
    },
    tags: ['grammar', 'particle'],
    description: {
      'zh-TW': '「〜について（は）」表示「關於...（的話）」「有關...（的話）」',
      'en': '"〜について（は）" expresses "as for...", "regarding..."'
    }
  },
  
  // ===== 單字 =====
  {
    id: 'category-colors',
    title: {
      'zh-TW': '顏色',
      'en': 'Colors'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'colors', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的顏色單字',
      'en': 'Common color words in Japanese'
    }
  },
  {
    id: 'category-body-parts',
    title: {
      'zh-TW': '身體部位',
      'en': 'Body Parts'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'body', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的身體部位單字',
      'en': 'Common body part words in Japanese'
    }
  },
  {
    id: 'category-family',
    title: {
      'zh-TW': '家庭成員',
      'en': 'Family Members'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'family', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的家庭成員稱呼',
      'en': 'Common family member terms in Japanese'
    }
  },
  {
    id: 'category-food',
    title: {
      'zh-TW': '食物',
      'en': 'Food'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'food', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的食物單字',
      'en': 'Common food words in Japanese'
    }
  },
  {
    id: 'category-animals',
    title: {
      'zh-TW': '動物',
      'en': 'Animals'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'animals', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的動物單字',
      'en': 'Common animal words in Japanese'
    }
  },
  {
    id: 'category-weather',
    title: {
      'zh-TW': '天氣',
      'en': 'Weather'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'weather', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的天氣相關單字',
      'en': 'Common weather-related words in Japanese'
    }
  },
  {
    id: 'category-time',
    title: {
      'zh-TW': '時間',
      'en': 'Time'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'time', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的時間相關單字（星期、月份等）',
      'en': 'Common time-related words in Japanese (days of week, months, etc.)'
    }
  },
  {
    id: 'category-seasons',
    title: {
      'zh-TW': '季節',
      'en': 'Seasons'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'seasons', 'time', 'topic-category'],
    description: {
      'zh-TW': '日語中的季節名稱',
      'en': 'Season names in Japanese'
    }
  },
  {
    id: 'category-months',
    title: {
      'zh-TW': '月份',
      'en': 'Months'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'time', 'months', 'topic-category'],
    description: {
      'zh-TW': '日語中的月份名稱',
      'en': 'Month names in Japanese'
    }
  },
  {
    id: 'category-weekdays',
    title: {
      'zh-TW': '星期',
      'en': 'Days of Week'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'time', 'weekdays', 'topic-category'],
    description: {
      'zh-TW': '日語中的星期名稱',
      'en': 'Day names of the week in Japanese'
    }
  },
  {
    id: 'category-counting',
    title: {
      'zh-TW': '計數詞',
      'en': 'Counters'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'counting', 'numbers', 'topic-category'],
    description: {
      'zh-TW': '日語中的計數詞（助數詞）',
      'en': 'Counters (助數詞) in Japanese'
    }
  },
  {
    id: 'category-greetings',
    title: {
      'zh-TW': '問候語',
      'en': 'Greetings'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'greetings', 'conversation', 'topic-category'],
    description: {
      'zh-TW': '日語中常用的問候語',
      'en': 'Common greetings in Japanese'
    }
  },
  {
    id: 'category-polite-expressions',
    title: {
      'zh-TW': '禮貌表達',
      'en': 'Polite Expressions'
    },
    category: {
      type: 'vocabulary',
      level: 'N4'
    },
    tags: ['vocabulary', 'polite', 'conversation', 'topic-category'],
    description: {
      'zh-TW': '日語中常用的禮貌表達方式',
      'en': 'Common polite expressions in Japanese'
    }
  },
  {
    id: 'category-directions',
    title: {
      'zh-TW': '方向指示',
      'en': 'Direction Instructions'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'direction', 'conversation', 'topic-category'],
    description: {
      'zh-TW': '日語中常用的方向指示用語',
      'en': 'Common direction instruction words in Japanese'
    }
  },
  {
    id: 'category-weather-conditions',
    title: {
      'zh-TW': '天氣狀況',
      'en': 'Weather Conditions'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'weather', 'topic-category'],
    description: {
      'zh-TW': '日語中描述天氣狀況的常用詞彙',
      'en': 'Common words for describing weather conditions in Japanese'
    }
  },
  {
    id: 'category-daily-conversation',
    title: {
      'zh-TW': '日常對話用語',
      'en': 'Daily Conversation Phrases'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'conversation', 'topic-category'],
    description: {
      'zh-TW': '日語中常用的日常對話用語',
      'en': 'Common daily conversation phrases in Japanese'
    }
  },
  {
    id: 'category-restaurant',
    title: {
      'zh-TW': '餐廳用語',
      'en': 'Restaurant Phrases'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'restaurant', 'conversation', 'topic-category'],
    description: {
      'zh-TW': '日語中在餐廳使用的常用詞彙和表達',
      'en': 'Common words and expressions used in restaurants in Japanese'
    }
  },
  {
    id: 'category-shopping-phrases',
    title: {
      'zh-TW': '購物用語',
      'en': 'Shopping Phrases'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'shopping', 'conversation', 'topic-category'],
    description: {
      'zh-TW': '日語中購物時使用的常用詞彙和表達',
      'en': 'Common words and expressions used when shopping in Japanese'
    }
  },
  {
    id: 'category-transportation-phrases',
    title: {
      'zh-TW': '交通工具用語',
      'en': 'Transportation Phrases'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'transportation', 'conversation', 'topic-category'],
    description: {
      'zh-TW': '日語中關於交通工具的常用詞彙和表達',
      'en': 'Common words and expressions about transportation in Japanese'
    }
  },
  {
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
    }
  },
  {
    id: 'category-phone',
    title: {
      'zh-TW': '電話用語',
      'en': 'Phone Phrases'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'phone', 'conversation', 'topic-category'],
    description: {
      'zh-TW': '日語中打電話時使用的常用詞彙和表達',
      'en': 'Common words and expressions used when making phone calls in Japanese'
    }
  },
  {
    id: 'category-email',
    title: {
      'zh-TW': '郵件/信件用語',
      'en': 'Email/Letter Phrases'
    },
    category: {
      type: 'vocabulary',
      level: 'N4'
    },
    tags: ['vocabulary', 'email', 'letter', 'communication', 'topic-category'],
    description: {
      'zh-TW': '日語中寫郵件或信件時使用的常用詞彙和表達',
      'en': 'Common words and expressions used when writing emails or letters in Japanese'
    }
  },
  {
    id: 'category-travel',
    title: {
      'zh-TW': '旅行用語',
      'en': 'Travel Phrases'
    },
    category: {
      type: 'vocabulary',
      level: 'N4'
    },
    tags: ['vocabulary', 'travel', 'conversation', 'topic-category'],
    description: {
      'zh-TW': '日語中旅行時使用的常用詞彙和表達',
      'en': 'Common words and expressions used when traveling in Japanese'
    }
  },
  {
    id: 'category-hotel',
    title: {
      'zh-TW': '飯店用語',
      'en': 'Hotel Phrases'
    },
    category: {
      type: 'vocabulary',
      level: 'N4'
    },
    tags: ['vocabulary', 'hotel', 'conversation', 'topic-category'],
    description: {
      'zh-TW': '日語中在飯店使用的常用詞彙和表達',
      'en': 'Common words and expressions used in hotels in Japanese'
    }
  },
  {
    id: 'category-bank',
    title: {
      'zh-TW': '銀行用語',
      'en': 'Bank Phrases'
    },
    category: {
      type: 'vocabulary',
      level: 'N4'
    },
    tags: ['vocabulary', 'bank', 'finance', 'conversation', 'topic-category'],
    description: {
      'zh-TW': '日語中在銀行使用的常用詞彙和表達',
      'en': 'Common words and expressions used in banks in Japanese'
    }
  },
  {
    id: 'category-post-office',
    title: {
      'zh-TW': '郵局用語',
      'en': 'Post Office Phrases'
    },
    category: {
      type: 'vocabulary',
      level: 'N4'
    },
    tags: ['vocabulary', 'post-office', 'communication', 'conversation', 'topic-category'],
    description: {
      'zh-TW': '日語中在郵局使用的常用詞彙和表達',
      'en': 'Common words and expressions used in post offices in Japanese'
    }
  },
  {
    id: 'category-office',
    title: {
      'zh-TW': '辦公室用語',
      'en': 'Office Phrases'
    },
    category: {
      type: 'vocabulary',
      level: 'N4'
    },
    tags: ['vocabulary', 'office', 'work', 'conversation', 'topic-category'],
    description: {
      'zh-TW': '日語中在辦公室使用的常用詞彙和表達',
      'en': 'Common words and expressions used in offices in Japanese'
    }
  },
  {
    id: 'category-school-phrases',
    title: {
      'zh-TW': '學校用語',
      'en': 'School Phrases'
    },
    category: {
      type: 'vocabulary',
      level: 'N4'
    },
    tags: ['vocabulary', 'school', 'education', 'conversation', 'topic-category'],
    description: {
      'zh-TW': '日語中在學校使用的常用詞彙和表達',
      'en': 'Common words and expressions used in schools in Japanese'
    }
  },
  {
    id: 'category-direction',
    title: {
      'zh-TW': '方向位置',
      'en': 'Direction and Position'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'direction', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的方向和位置相關單字',
      'en': 'Common direction and position words in Japanese'
    }
  },
  {
    id: 'category-transportation',
    title: {
      'zh-TW': '交通工具',
      'en': 'Transportation'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'transportation', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的交通工具單字',
      'en': 'Common transportation words in Japanese'
    }
  },
  {
    id: 'category-occupation',
    title: {
      'zh-TW': '職業',
      'en': 'Occupation'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'occupation', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的職業單字',
      'en': 'Common occupation words in Japanese'
    }
  },
  {
    id: 'category-school',
    title: {
      'zh-TW': '學校',
      'en': 'School'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'school', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的學校相關單字',
      'en': 'Common school-related words in Japanese'
    }
  },
  {
    id: 'category-shopping',
    title: {
      'zh-TW': '購物',
      'en': 'Shopping'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'shopping', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的購物相關單字',
      'en': 'Common shopping-related words in Japanese'
    }
  },
  {
    id: 'category-sports',
    title: {
      'zh-TW': '運動',
      'en': 'Sports'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'sports', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的運動相關單字',
      'en': 'Common sports-related words in Japanese'
    }
  },
  {
    id: 'category-emotions',
    title: {
      'zh-TW': '情感',
      'en': 'Emotions'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'emotions', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的情感相關單字',
      'en': 'Common emotion-related words in Japanese'
    }
  },
  {
    id: 'category-health',
    title: {
      'zh-TW': '健康',
      'en': 'Health'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'health', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的健康相關單字',
      'en': 'Common health-related words in Japanese'
    }
  },
  {
    id: 'category-entertainment',
    title: {
      'zh-TW': '娛樂',
      'en': 'Entertainment'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'entertainment', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的娛樂相關單字',
      'en': 'Common entertainment-related words in Japanese'
    }
  },
  {
    id: 'category-music',
    title: {
      'zh-TW': '音樂',
      'en': 'Music'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'music', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的音樂相關單字',
      'en': 'Common music-related words in Japanese'
    }
  },
  {
    id: 'category-nature',
    title: {
      'zh-TW': '自然',
      'en': 'Nature'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'nature', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的自然相關單字',
      'en': 'Common nature-related words in Japanese'
    }
  },
  {
    id: 'category-clothing',
    title: {
      'zh-TW': '服裝',
      'en': 'Clothing'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'clothing', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的服裝相關單字',
      'en': 'Common clothing-related words in Japanese'
    }
  },
  {
    id: 'category-building',
    title: {
      'zh-TW': '建築',
      'en': 'Building'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'building', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的建築相關單字',
      'en': 'Common building-related words in Japanese'
    }
  },
  {
    id: 'category-numbers',
    title: {
      'zh-TW': '數字',
      'en': 'Numbers'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'numbers', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的數字相關單字',
      'en': 'Common number-related words in Japanese'
    }
  },
  {
    id: 'category-technology',
    title: {
      'zh-TW': '科技',
      'en': 'Technology'
    },
    category: {
      type: 'vocabulary',
      level: 'N4'
    },
    tags: ['vocabulary', 'technology', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的科技相關單字',
      'en': 'Common technology-related words in Japanese'
    }
  },
  {
    id: 'category-hobbies',
    title: {
      'zh-TW': '興趣愛好',
      'en': 'Hobbies'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'hobbies', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的興趣愛好相關單字',
      'en': 'Common hobby-related words in Japanese'
    }
  },
  {
    id: 'category-weather-extended',
    title: {
      'zh-TW': '天氣（擴充）',
      'en': 'Weather (Extended)'
    },
    category: {
      type: 'vocabulary',
      level: 'N4'
    },
    tags: ['vocabulary', 'weather', 'topic-category'],
    description: {
      'zh-TW': '日語中更多天氣相關單字',
      'en': 'More weather-related words in Japanese'
    }
  },
  {
    id: 'category-appearance',
    title: {
      'zh-TW': '外貌',
      'en': 'Appearance'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'appearance', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的外貌相關單字',
      'en': 'Common appearance-related words in Japanese'
    }
  },
  {
    id: 'category-personality',
    title: {
      'zh-TW': '性格',
      'en': 'Personality'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'personality', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的性格相關單字',
      'en': 'Common personality-related words in Japanese'
    }
  },
  {
    id: 'category-feelings-extended',
    title: {
      'zh-TW': '情感（擴充）',
      'en': 'Feelings (Extended)'
    },
    category: {
      type: 'vocabulary',
      level: 'N4'
    },
    tags: ['vocabulary', 'emotion', 'topic-category'],
    description: {
      'zh-TW': '日語中更多情感相關單字',
      'en': 'More feeling-related words in Japanese'
    }
  },
  {
    id: 'category-actions',
    title: {
      'zh-TW': '動作',
      'en': 'Actions'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'actions', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的動作相關單字',
      'en': 'Common action-related words in Japanese'
    }
  },
  {
    id: 'category-daily-activities',
    title: {
      'zh-TW': '日常活動',
      'en': 'Daily Activities'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'daily', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的日常活動相關單字',
      'en': 'Common daily activity-related words in Japanese'
    }
  },
  {
    id: 'category-places',
    title: {
      'zh-TW': '場所',
      'en': 'Places'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'places', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的場所相關單字',
      'en': 'Common place-related words in Japanese'
    }
  },
  {
    id: 'category-verbs-basic',
    title: {
      'zh-TW': '基本動詞',
      'en': 'Basic Verbs'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'verbs', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的基本動詞',
      'en': 'Common basic verbs in Japanese'
    }
  },
  {
    id: 'category-adjectives-basic',
    title: {
      'zh-TW': '基本形容詞',
      'en': 'Basic Adjectives'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'adjectives', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的基本形容詞',
      'en': 'Common basic adjectives in Japanese'
    }
  },
  {
    id: 'category-questions',
    title: {
      'zh-TW': '疑問詞',
      'en': 'Question Words'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'questions', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的疑問詞',
      'en': 'Common question words in Japanese'
    }
  },
  {
    id: 'category-conjunctions',
    title: {
      'zh-TW': '連接詞',
      'en': 'Conjunctions'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'conjunctions', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的連接詞',
      'en': 'Common conjunctions in Japanese'
    }
  },
  {
    id: 'category-prepositions',
    title: {
      'zh-TW': '介詞',
      'en': 'Prepositions'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'prepositions', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的介詞',
      'en': 'Common prepositions in Japanese'
    }
  },
  {
    id: 'category-adverbs-time',
    title: {
      'zh-TW': '時間副詞',
      'en': 'Time Adverbs'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'adverbs', 'time', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的時間副詞',
      'en': 'Common time adverbs in Japanese'
    }
  },
  {
    id: 'category-adverbs-degree',
    title: {
      'zh-TW': '程度副詞',
      'en': 'Degree Adverbs'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'adverbs', 'degree', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的程度副詞',
      'en': 'Common degree adverbs in Japanese'
    }
  },
  {
    id: 'category-adverbs-manner',
    title: {
      'zh-TW': '方式副詞',
      'en': 'Manner Adverbs'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'adverbs', 'manner', 'topic-category'],
    description: {
      'zh-TW': '日語中常見的方式副詞',
      'en': 'Common manner adverbs in Japanese'
    }
  },
  // ===== 語種 =====
  {
    id: 'vocabulary-gairaigo',
    title: {
      'zh-TW': '外来語',
      'en': '外来語 (Loanwords)'
    },
    category: {
      type: 'goshu',
      level: 'N5'
    },
    tags: ['basic', 'gairaigo'],
    description: {
      'zh-TW': '外來語、借詞',
      'en': 'loanword, borrowed word'
    }
  },
  {
    id: 'vocabulary-wago',
    title: {
      'zh-TW': '和語（大和言葉）',
      'en': '和語 (Native Japanese Words)'
    },
    category: {
      type: 'goshu',
      level: 'N5'
    },
    tags: ['basic', 'wago'],
    description: {
      'zh-TW': '和語、大和詞、日語固有詞彙',
      'en': 'native Japanese words, Yamato words'
    }
  },
  {
    id: 'vocabulary-kango',
    title: {
      'zh-TW': '漢語',
      'en': '漢語 (Sino-Japanese Words)'
    },
    category: {
      type: 'goshu',
      level: 'N5'
    },
    tags: ['basic', 'kango'],
    description: {
      'zh-TW': '漢語、中文借詞',
      'en': 'Sino-Japanese words, Chinese-derived words'
    }
  },
  
  // ===== 單字 =====
  {
    id: 'vocabulary-gakusei',
    title: {
      'zh-TW': '学生',
      'en': '学生'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'noun'],
    description: {
      'zh-TW': '學生',
      'en': 'student'
    }
  },
  {
    id: 'vocabulary-sensei',
    title: {
      'zh-TW': '先生',
      'en': '先生'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'noun'],
    description: {
      'zh-TW': '老師、先生',
      'en': 'teacher, sensei'
    }
  },
  {
    id: 'vocabulary-tomodachi',
    title: {
      'zh-TW': '友達',
      'en': '友達'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'noun'],
    description: {
      'zh-TW': '朋友',
      'en': 'friend'
    }
  },
  {
    id: 'vocabulary-hon',
    title: {
      'zh-TW': '本',
      'en': '本'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'noun'],
    description: {
      'zh-TW': '書本',
      'en': 'book'
    }
  },
  {
    id: 'vocabulary-kuruma',
    title: {
      'zh-TW': '車',
      'en': '車'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'noun'],
    description: {
      'zh-TW': '汽車',
      'en': 'car'
    }
  },
  {
    id: 'vocabulary-tabemono',
    title: {
      'zh-TW': '食べ物',
      'en': '食べ物'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'noun'],
    description: {
      'zh-TW': '食物',
      'en': 'food'
    }
  },
  {
    id: 'vocabulary-yomu',
    title: {
      'zh-TW': '読む',
      'en': '読む'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'verb'],
    description: {
      'zh-TW': '讀、閱讀',
      'en': 'to read'
    }
  },
  {
    id: 'vocabulary-taberu',
    title: {
      'zh-TW': '食べる',
      'en': '食べる'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'verb'],
    description: {
      'zh-TW': '吃',
      'en': 'to eat'
    }
  },
  {
    id: 'vocabulary-iku',
    title: {
      'zh-TW': '行く',
      'en': '行く'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'verb'],
    description: {
      'zh-TW': '去、前往',
      'en': 'to go'
    }
  },
  {
    id: 'vocabulary-kuru',
    title: {
      'zh-TW': '来る',
      'en': '来る'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'verb'],
    description: {
      'zh-TW': '來、來到',
      'en': 'to come'
    }
  },
  {
    id: 'vocabulary-suru',
    title: {
      'zh-TW': 'する',
      'en': 'する'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'verb'],
    description: {
      'zh-TW': '做、進行',
      'en': 'to do'
    }
  },
  {
    id: 'vocabulary-aruku',
    title: {
      'zh-TW': '歩く',
      'en': '歩く'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'verb'],
    description: {
      'zh-TW': '走路、步行',
      'en': 'to walk'
    }
  },
  {
    id: 'vocabulary-miru',
    title: {
      'zh-TW': '見る',
      'en': '見る'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'verb'],
    description: {
      'zh-TW': '看、看見、觀看',
      'en': 'to see, to watch, to look at'
    }
  },
  {
    id: 'vocabulary-kiku',
    title: {
      'zh-TW': '聞く',
      'en': '聞く'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'verb'],
    description: {
      'zh-TW': '聽、聽見、詢問',
      'en': 'to listen, to hear, to ask'
    }
  },
  {
    id: 'vocabulary-hanasu',
    title: {
      'zh-TW': '話す',
      'en': '話す'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'verb'],
    description: {
      'zh-TW': '說、說話、談話',
      'en': 'to speak, to talk'
    }
  },
  {
    id: 'vocabulary-kau',
    title: {
      'zh-TW': '買う',
      'en': '買う'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'verb'],
    description: {
      'zh-TW': '買、購買',
      'en': 'to buy'
    }
  },
  {
    id: 'vocabulary-uru',
    title: {
      'zh-TW': '売る',
      'en': '売る'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'verb'],
    description: {
      'zh-TW': '賣、出售',
      'en': 'to sell'
    }
  },
  {
    id: 'vocabulary-takai',
    title: {
      'zh-TW': '高い',
      'en': '高い'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'i-adjective'],
    description: {
      'zh-TW': '高的、貴的',
      'en': 'high, expensive'
    }
  },
  {
    id: 'vocabulary-atarashii',
    title: {
      'zh-TW': '新しい',
      'en': '新しい'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'i-adjective'],
    description: {
      'zh-TW': '新的',
      'en': 'new'
    }
  },
  {
    id: 'vocabulary-kirei',
    title: {
      'zh-TW': 'きれい',
      'en': 'きれい'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'na-adjective'],
    description: {
      'zh-TW': '美麗的、乾淨的',
      'en': 'beautiful, clean'
    }
  },
  {
    id: 'vocabulary-shizuka',
    title: {
      'zh-TW': '静か',
      'en': '静か'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'na-adjective'],
    description: {
      'zh-TW': '安靜的',
      'en': 'quiet'
    }
  },
  {
    id: 'vocabulary-genki',
    title: {
      'zh-TW': '元気',
      'en': '元気'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'na-adjective'],
    description: {
      'zh-TW': '健康的、有精神的',
      'en': 'healthy, energetic'
    }
  },
  {
    id: 'vocabulary-ie',
    title: {
      'zh-TW': '家',
      'en': '家'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'noun'],
    description: {
      'zh-TW': '家、房子',
      'en': 'house, home'
    }
  },
  {
    id: 'vocabulary-gakkou',
    title: {
      'zh-TW': '学校',
      'en': '学校'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'noun'],
    description: {
      'zh-TW': '學校',
      'en': 'school'
    }
  },
  {
    id: 'vocabulary-toshokan',
    title: {
      'zh-TW': '図書館',
      'en': '図書館'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'noun'],
    description: {
      'zh-TW': '圖書館',
      'en': 'library'
    }
  },
  {
    id: 'vocabulary-kouen',
    title: {
      'zh-TW': '公園',
      'en': '公園'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'noun'],
    description: {
      'zh-TW': '公園',
      'en': 'park'
    }
  },
  {
    id: 'vocabulary-eki',
    title: {
      'zh-TW': '駅',
      'en': '駅'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'noun'],
    description: {
      'zh-TW': '車站',
      'en': 'station'
    }
  },
  {
    id: 'vocabulary-ichi',
    title: {
      'zh-TW': '一',
      'en': '一'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'number'],
    description: {
      'zh-TW': '一、一個',
      'en': 'one'
    }
  },
  {
    id: 'vocabulary-ni',
    title: {
      'zh-TW': '二',
      'en': '二'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'number'],
    description: {
      'zh-TW': '二、兩個',
      'en': 'two'
    }
  },
  {
    id: 'vocabulary-san',
    title: {
      'zh-TW': '三',
      'en': '三'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'number'],
    description: {
      'zh-TW': '三、三個',
      'en': 'three'
    }
  },
  {
    id: 'vocabulary-yon',
    title: {
      'zh-TW': '四',
      'en': '四'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'number'],
    description: {
      'zh-TW': '四、四個',
      'en': 'four'
    }
  },
  {
    id: 'vocabulary-go',
    title: {
      'zh-TW': '五',
      'en': '五'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'number'],
    description: {
      'zh-TW': '五、五個',
      'en': 'five'
    }
  },
  {
    id: 'vocabulary-kyou',
    title: {
      'zh-TW': '今日',
      'en': '今日'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'noun', 'time'],
    description: {
      'zh-TW': '今天',
      'en': 'today'
    }
  },
  {
    id: 'vocabulary-kinou',
    title: {
      'zh-TW': '昨日',
      'en': '昨日'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'noun', 'time'],
    description: {
      'zh-TW': '昨天',
      'en': 'yesterday'
    }
  },
  {
    id: 'vocabulary-ashita',
    title: {
      'zh-TW': '明日',
      'en': '明日'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'noun', 'time'],
    description: {
      'zh-TW': '明天',
      'en': 'tomorrow'
    }
  },
  {
    id: 'vocabulary-ima',
    title: {
      'zh-TW': '今',
      'en': '今'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'noun', 'time'],
    description: {
      'zh-TW': '現在、現在',
      'en': 'now'
    }
  },
  {
    id: 'vocabulary-nanji',
    title: {
      'zh-TW': '何時',
      'en': '何時'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'interrogative', 'time'],
    description: {
      'zh-TW': '幾點、什麼時候',
      'en': 'what time'
    }
  },
  {
    id: 'vocabulary-nani',
    title: {
      'zh-TW': '何',
      'en': '何'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'interrogative'],
    description: {
      'zh-TW': '什麼',
      'en': 'what'
    }
  },
  {
    id: 'vocabulary-doko',
    title: {
      'zh-TW': 'どこ',
      'en': 'どこ'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'interrogative'],
    description: {
      'zh-TW': '哪裡、何處',
      'en': 'where'
    }
  },
  {
    id: 'vocabulary-dare',
    title: {
      'zh-TW': '誰',
      'en': '誰'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'interrogative'],
    description: {
      'zh-TW': '誰',
      'en': 'who'
    }
  },
  {
    id: 'vocabulary-kaku',
    title: {
      'zh-TW': '書く',
      'en': '書く'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'verb'],
    description: {
      'zh-TW': '寫、書寫',
      'en': 'to write'
    }
  },
  {
    id: 'vocabulary-nomu',
    title: {
      'zh-TW': '飲む',
      'en': '飲む'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'verb'],
    description: {
      'zh-TW': '喝、飲用',
      'en': 'to drink'
    }
  },
  {
    id: 'vocabulary-kaeru',
    title: {
      'zh-TW': '帰る',
      'en': '帰る'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'verb'],
    description: {
      'zh-TW': '回去、回家',
      'en': 'to return, to go home'
    }
  },
  {
    id: 'vocabulary-okiru',
    title: {
      'zh-TW': '起きる',
      'en': '起きる'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'verb'],
    description: {
      'zh-TW': '起床、醒來',
      'en': 'to wake up, to get up'
    }
  },
  {
    id: 'vocabulary-neru',
    title: {
      'zh-TW': '寝る',
      'en': '寝る'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'verb'],
    description: {
      'zh-TW': '睡覺、就寢',
      'en': 'to sleep, to go to bed'
    }
  },
  {
    id: 'vocabulary-iru',
    title: {
      'zh-TW': 'いる',
      'en': 'いる'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'verb'],
    description: {
      'zh-TW': '在、存在（有生命的）',
      'en': 'to be, to exist (animate)'
    }
  },
  {
    id: 'vocabulary-aru',
    title: {
      'zh-TW': 'ある',
      'en': 'ある'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'verb'],
    description: {
      'zh-TW': '在、存在（無生命的）、有',
      'en': 'to be, to exist (inanimate), to have'
    }
  },
  {
    id: 'vocabulary-animal',
    title: {
      'zh-TW': '動物',
      'en': 'Animal'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'animals'],
    description: {
      'zh-TW': '表示「動物」的名詞，可以指各種動物的總稱',
      'en': 'noun meaning \"animal\"; a general term for animals'
    }
  },
  {
    id: 'vocabulary-akai',
    title: {
      'zh-TW': '赤い',
      'en': '赤い'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'i-adjective', 'colors'],
    description: {
      'zh-TW': '紅色的（い形容詞）',
      'en': 'red (i-adjective)'
    }
  },
  {
    id: 'vocabulary-aoi',
    title: {
      'zh-TW': '青い',
      'en': '青い'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'i-adjective', 'colors'],
    description: {
      'zh-TW': '藍色的、青色的（い形容詞）',
      'en': 'blue/green (i-adjective)'
    }
  },
  {
    id: 'vocabulary-shiroi',
    title: {
      'zh-TW': '白い',
      'en': '白い'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'i-adjective', 'colors'],
    description: {
      'zh-TW': '白色的（い形容詞）',
      'en': 'white (i-adjective)'
    }
  },
  {
    id: 'vocabulary-kuroi',
    title: {
      'zh-TW': '黒い',
      'en': '黒い'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'i-adjective', 'colors'],
    description: {
      'zh-TW': '黑色的（い形容詞）',
      'en': 'black (i-adjective)'
    }
  },
  {
    id: 'vocabulary-kiiroi',
    title: {
      'zh-TW': '黄色い',
      'en': '黄色い'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'i-adjective', 'colors'],
    description: {
      'zh-TW': '黃色的（い形容詞）',
      'en': 'yellow (i-adjective)'
    }
  },
  {
    id: 'vocabulary-oishii',
    title: {
      'zh-TW': '美味しい',
      'en': '美味しい'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'i-adjective'],
    description: {
      'zh-TW': '美味的、好吃的',
      'en': 'delicious'
    }
  },
  {
    id: 'vocabulary-benri',
    title: {
      'zh-TW': '便利',
      'en': '便利'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'na-adjective'],
    description: {
      'zh-TW': '方便的',
      'en': 'convenient'
    }
  },
  {
    id: 'vocabulary-suki',
    title: {
      'zh-TW': '好き',
      'en': '好き'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'na-adjective'],
    description: {
      'zh-TW': '喜歡的',
      'en': 'liked, favorite'
    }
  },
  {
    id: 'vocabulary-heya',
    title: {
      'zh-TW': '部屋',
      'en': '部屋'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'noun'],
    description: {
      'zh-TW': '房間',
      'en': 'room'
    }
  },
  {
    id: 'vocabulary-mise',
    title: {
      'zh-TW': '店',
      'en': '店'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'noun'],
    description: {
      'zh-TW': '店、商店',
      'en': 'store, shop'
    }
  },
  {
    id: 'vocabulary-watashi',
    title: {
      'zh-TW': '私',
      'en': '私'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'pronoun'],
    description: {
      'zh-TW': '我',
      'en': 'I, me'
    }
  },
  {
    id: 'vocabulary-anata',
    title: {
      'zh-TW': 'あなた',
      'en': 'あなた'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'pronoun'],
    description: {
      'zh-TW': '你',
      'en': 'you'
    }
  },
  {
    id: 'vocabulary-kore',
    title: {
      'zh-TW': 'これ',
      'en': 'これ'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'demonstrative-pronoun'],
    description: {
      'zh-TW': '這個（離說話者近）',
      'en': 'this (near speaker)'
    }
  },
  {
    id: 'vocabulary-sore',
    title: {
      'zh-TW': 'それ',
      'en': 'それ'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'demonstrative-pronoun'],
    description: {
      'zh-TW': '那個（離聽話者近）',
      'en': 'that (near listener)'
    }
  },
  {
    id: 'vocabulary-are',
    title: {
      'zh-TW': 'あれ',
      'en': 'あれ'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'demonstrative-pronoun'],
    description: {
      'zh-TW': '那個（離雙方都遠）',
      'en': 'that (far from both)'
    }
  },
  {
    id: 'vocabulary-tsukuru',
    title: {
      'zh-TW': '作る',
      'en': '作る'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'verb'],
    description: {
      'zh-TW': '做、製作、創造',
      'en': 'to make, to create'
    }
  },
  {
    id: 'vocabulary-dekiru',
    title: {
      'zh-TW': 'できる',
      'en': 'できる'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'verb'],
    description: {
      'zh-TW': '能夠、會、可以',
      'en': 'can do, to be able'
    }
  },
  {
    id: 'vocabulary-omoshiroi',
    title: {
      'zh-TW': '面白い',
      'en': '面白い'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'i-adjective'],
    description: {
      'zh-TW': '有趣的、好笑的',
      'en': 'interesting, funny'
    }
  },
  {
    id: 'vocabulary-isogashii',
    title: {
      'zh-TW': '忙しい',
      'en': '忙しい'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'i-adjective'],
    description: {
      'zh-TW': '忙碌的',
      'en': 'busy'
    }
  },
  {
    id: 'vocabulary-yasui',
    title: {
      'zh-TW': '安い',
      'en': '安い'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'i-adjective'],
    description: {
      'zh-TW': '便宜的',
      'en': 'cheap'
    }
  },
  {
    id: 'vocabulary-kawaru',
    title: {
      'zh-TW': '変わる',
      'en': '変わる'
    },
    category: {
      type: 'vocabulary',
      level: 'N4'
    },
    tags: ['vocabulary', 'verb'],
    description: {
      'zh-TW': '改變、變化',
      'en': 'to change, to vary'
    }
  },
  {
    id: 'vocabulary-kaeru-change',
    title: {
      'zh-TW': '変える',
      'en': '変える'
    },
    category: {
      type: 'vocabulary',
      level: 'N4'
    },
    tags: ['vocabulary', 'verb'],
    description: {
      'zh-TW': '改變、變更',
      'en': 'to change, to alter'
    }
  },
  {
    id: 'vocabulary-omou',
    title: {
      'zh-TW': '思う',
      'en': '思う'
    },
    category: {
      type: 'vocabulary',
      level: 'N4'
    },
    tags: ['vocabulary', 'verb'],
    description: {
      'zh-TW': '想、認為、覺得',
      'en': 'to think, to believe, to feel'
    }
  },
  {
    id: 'vocabulary-kangaeru',
    title: {
      'zh-TW': '考える',
      'en': '考える'
    },
    category: {
      type: 'vocabulary',
      level: 'N4'
    },
    tags: ['vocabulary', 'verb'],
    description: {
      'zh-TW': '思考、考慮、想',
      'en': 'to think, to consider, to ponder'
    }
  },
  {
    id: 'vocabulary-shiru',
    title: {
      'zh-TW': '知る',
      'en': '知る'
    },
    category: {
      type: 'vocabulary',
      level: 'N4'
    },
    tags: ['vocabulary', 'verb'],
    description: {
      'zh-TW': '知道、了解、認識',
      'en': 'to know, to understand, to be aware of'
    }
  },
  {
    id: 'vocabulary-wakaru',
    title: {
      'zh-TW': '分かる',
      'en': '分かる'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'verb'],
    description: {
      'zh-TW': '理解、明白、懂',
      'en': 'to understand, to comprehend, to know'
    }
  },
  {
    id: 'vocabulary-tsumori',
    title: {
      'zh-TW': 'つもり',
      'en': 'つもり'
    },
    category: {
      type: 'vocabulary',
      level: 'N4'
    },
    tags: ['vocabulary', 'noun'],
    description: {
      'zh-TW': '打算、計劃、意圖',
      'en': 'intention, plan, purpose'
    }
  },
  {
    id: 'vocabulary-hajimeru',
    title: {
      'zh-TW': '始める',
      'en': '始める'
    },
    category: {
      type: 'vocabulary',
      level: 'N4'
    },
    tags: ['vocabulary', 'verb'],
    description: {
      'zh-TW': '開始、著手',
      'en': 'to start, to begin'
    }
  },
  {
    id: 'vocabulary-owaru',
    title: {
      'zh-TW': '終わる',
      'en': '終わる'
    },
    category: {
      type: 'vocabulary',
      level: 'N4'
    },
    tags: ['vocabulary', 'verb'],
    description: {
      'zh-TW': '結束、完成',
      'en': 'to end, to finish'
    }
  },
  {
    id: 'vocabulary-tsuzukeru',
    title: {
      'zh-TW': '続ける',
      'en': '続ける'
    },
    category: {
      type: 'vocabulary',
      level: 'N4'
    },
    tags: ['vocabulary', 'verb'],
    description: {
      'zh-TW': '繼續、持續',
      'en': 'to continue, to keep doing'
    }
  },
  {
    id: 'vocabulary-yameru',
    title: {
      'zh-TW': '止める',
      'en': '止める'
    },
    category: {
      type: 'vocabulary',
      level: 'N4'
    },
    tags: ['vocabulary', 'verb'],
    description: {
      'zh-TW': '停止、中止、放棄',
      'en': 'to stop, to quit, to give up'
    }
  },
  {
    id: 'vocabulary-sagasu',
    title: {
      'zh-TW': '探す',
      'en': '探す'
    },
    category: {
      type: 'vocabulary',
      level: 'N4'
    },
    tags: ['vocabulary', 'verb'],
    description: {
      'zh-TW': '尋找、搜索',
      'en': 'to search, to look for'
    }
  },
  {
    id: 'vocabulary-kakeru',
    title: {
      'zh-TW': 'かける',
      'en': 'かける'
    },
    category: {
      type: 'vocabulary',
      level: 'N4'
    },
    tags: ['vocabulary', 'verb'],
    description: {
      'zh-TW': '掛、打（電話）、花費',
      'en': 'to hang, to call (phone), to spend'
    }
  },
  {
    id: 'vocabulary-okuru',
    title: {
      'zh-TW': '送る',
      'en': '送る'
    },
    category: {
      type: 'vocabulary',
      level: 'N4'
    },
    tags: ['vocabulary', 'verb'],
    description: {
      'zh-TW': '送、寄、度過',
      'en': 'to send, to mail, to spend (time)'
    }
  },
  {
    id: 'vocabulary-ukeru',
    title: {
      'zh-TW': '受ける',
      'en': '受ける'
    },
    category: {
      type: 'vocabulary',
      level: 'N4'
    },
    tags: ['vocabulary', 'verb'],
    description: {
      'zh-TW': '接受、收到、參加、遭受',
      'en': 'to receive, to accept, to take (exam), to suffer'
    }
  },
  {
    id: 'vocabulary-tsutomeru',
    title: {
      'zh-TW': '勤める',
      'en': '勤める'
    },
    category: {
      type: 'vocabulary',
      level: 'N4'
    },
    tags: ['vocabulary', 'verb'],
    description: {
      'zh-TW': '工作、任職',
      'en': 'to work for, to be employed by'
    }
  },
  {
    id: 'vocabulary-hayai',
    title: {
      'zh-TW': '早い',
      'en': '早い'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'i-adjective'],
    description: {
      'zh-TW': '早的、快的',
      'en': 'early, fast'
    }
  },
  {
    id: 'vocabulary-osoi',
    title: {
      'zh-TW': '遅い',
      'en': '遅い'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'i-adjective'],
    description: {
      'zh-TW': '晚的、慢的',
      'en': 'late, slow'
    }
  },
  {
    id: 'vocabulary-ageru',
    title: {
      'zh-TW': '上げる',
      'en': '上げる'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'verb'],
    description: {
      'zh-TW': '給、給予、舉起',
      'en': 'to give, to raise'
    }
  },
  {
    id: 'vocabulary-morau',
    title: {
      'zh-TW': 'もらう',
      'en': 'もらう'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'verb'],
    description: {
      'zh-TW': '收到、得到',
      'en': 'to receive'
    }
  },
  {
    id: 'vocabulary-kureru',
    title: {
      'zh-TW': 'くれる',
      'en': 'くれる'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'verb'],
    description: {
      'zh-TW': '給我、給予（從我的角度）',
      'en': 'to give (to me, from my perspective)'
    }
  },
  {
    id: 'vocabulary-ii',
    title: {
      'zh-TW': 'いい',
      'en': 'いい'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'i-adjective'],
    description: {
      'zh-TW': '好的',
      'en': 'good'
    }
  },
  {
    id: 'vocabulary-warui',
    title: {
      'zh-TW': '悪い',
      'en': '悪い'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'i-adjective'],
    description: {
      'zh-TW': '壞的、不好的',
      'en': 'bad'
    }
  },
  {
    id: 'vocabulary-samui',
    title: {
      'zh-TW': '寒い',
      'en': '寒い'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'i-adjective'],
    description: {
      'zh-TW': '冷的（天氣）',
      'en': 'cold (weather)'
    }
  },
  {
    id: 'vocabulary-atsui',
    title: {
      'zh-TW': '暑い',
      'en': '暑い'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'i-adjective'],
    description: {
      'zh-TW': '熱的（天氣）',
      'en': 'hot (weather)'
    }
  },
  {
    id: 'vocabulary-tsumetai',
    title: {
      'zh-TW': '冷たい',
      'en': '冷たい'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'i-adjective'],
    description: {
      'zh-TW': '冷的（觸感）',
      'en': 'cold (to touch)'
    }
  },
  {
    id: 'vocabulary-nemui',
    title: {
      'zh-TW': '眠い',
      'en': '眠い'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'i-adjective'],
    description: {
      'zh-TW': '想睡的、睏的',
      'en': 'sleepy'
    }
  },
  {
    id: 'vocabulary-tanoshii',
    title: {
      'zh-TW': '楽しい',
      'en': '楽しい'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'i-adjective'],
    description: {
      'zh-TW': '開心的、有趣的',
      'en': 'fun, enjoyable'
    }
  },
  {
    id: 'vocabulary-ureshii',
    title: {
      'zh-TW': '嬉しい',
      'en': '嬉しい'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'i-adjective'],
    description: {
      'zh-TW': '開心的、高興的',
      'en': 'happy, glad'
    }
  },
  {
    id: 'vocabulary-kanashii',
    title: {
      'zh-TW': '悲しい',
      'en': '悲しい'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'i-adjective'],
    description: {
      'zh-TW': '悲傷的、難過的',
      'en': 'sad'
    }
  },
  {
    id: 'vocabulary-omoi',
    title: {
      'zh-TW': '重い',
      'en': '重い'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'i-adjective'],
    description: {
      'zh-TW': '重的',
      'en': 'heavy'
    }
  },
  {
    id: 'vocabulary-karui',
    title: {
      'zh-TW': '軽い',
      'en': '軽い'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'i-adjective'],
    description: {
      'zh-TW': '輕的',
      'en': 'light'
    }
  },
  {
    id: 'vocabulary-nagai',
    title: {
      'zh-TW': '長い',
      'en': '長い'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'i-adjective'],
    description: {
      'zh-TW': '長的',
      'en': 'long'
    }
  },
  {
    id: 'vocabulary-mijikai',
    title: {
      'zh-TW': '短い',
      'en': '短い'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'i-adjective'],
    description: {
      'zh-TW': '短的',
      'en': 'short'
    }
  },
  {
    id: 'vocabulary-hiroi',
    title: {
      'zh-TW': '広い',
      'en': '広い'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'i-adjective'],
    description: {
      'zh-TW': '寬的、寬敞的',
      'en': 'wide, spacious'
    }
  },
  {
    id: 'vocabulary-semai',
    title: {
      'zh-TW': '狭い',
      'en': '狭い'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'i-adjective'],
    description: {
      'zh-TW': '窄的、狹窄的',
      'en': 'narrow'
    }
  },
  {
    id: 'vocabulary-hikui',
    title: {
      'zh-TW': '低い',
      'en': '低い'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'i-adjective'],
    description: {
      'zh-TW': '低的',
      'en': 'low'
    }
  },
  {
    id: 'vocabulary-mizu',
    title: {
      'zh-TW': '水',
      'en': '水'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'noun'],
    description: {
      'zh-TW': '水',
      'en': 'water'
    }
  },
  {
    id: 'vocabulary-pan',
    title: {
      'zh-TW': 'パン',
      'en': 'パン'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'noun'],
    description: {
      'zh-TW': '麵包',
      'en': 'bread'
    }
  },
  {
    id: 'vocabulary-ringo',
    title: {
      'zh-TW': 'りんご',
      'en': 'りんご'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'noun'],
    description: {
      'zh-TW': '蘋果',
      'en': 'apple'
    }
  },
  {
    id: 'vocabulary-neko',
    title: {
      'zh-TW': '猫',
      'en': '猫'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'noun'],
    description: {
      'zh-TW': '貓',
      'en': 'cat'
    }
  },
  {
    id: 'vocabulary-inu',
    title: {
      'zh-TW': '犬',
      'en': '犬'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'noun'],
    description: {
      'zh-TW': '狗',
      'en': 'dog'
    }
  },
  {
    id: 'vocabulary-kawaii',
    title: {
      'zh-TW': '可愛い',
      'en': '可愛い'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'i-adjective'],
    description: {
      'zh-TW': '可愛的',
      'en': 'cute'
    }
  },
  {
    id: 'vocabulary-tsukue',
    title: {
      'zh-TW': '机',
      'en': '机'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'noun'],
    description: {
      'zh-TW': '桌子、書桌',
      'en': 'desk'
    }
  },
  {
    id: 'vocabulary-isu',
    title: {
      'zh-TW': '椅子',
      'en': '椅子'
    },
    category: {
      type: 'vocabulary',
      level: 'N5'
    },
    tags: ['basic', 'vocabulary', 'noun'],
    description: {
      'zh-TW': '椅子',
      'en': 'chair'
    }
  },
  
  // ===== 漢字 =====
  {
    id: 'kanji-gaku',
    title: {
      'zh-TW': '学',
      'en': 'Kanji "学"'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '學習、學問',
      'en': 'study, learning'
    }
  },
  {
    id: 'kanji-sei',
    title: {
      'zh-TW': '生',
      'en': 'Kanji "生"'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '生命、生活',
      'en': 'life, living'
    }
  },
  {
    id: 'kanji-hon',
    title: {
      'zh-TW': '本',
      'en': 'Kanji "本"'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '書本、根本',
      'en': 'book, origin'
    }
  },
  {
    id: 'kanji-ichi',
    title: {
      'zh-TW': '一',
      'en': 'Kanji "一"'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '一、一個',
      'en': 'one'
    }
  },
  {
    id: 'kanji-ni',
    title: {
      'zh-TW': '二',
      'en': 'Kanji "二"'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '二、兩個',
      'en': 'two'
    }
  },
  {
    id: 'kanji-san',
    title: {
      'zh-TW': '三',
      'en': 'Kanji "三"'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '三、三個',
      'en': 'three'
    }
  },
  {
    id: 'kanji-yon',
    title: {
      'zh-TW': '四',
      'en': '四 (Four)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji', 'number'],
    description: {
      'zh-TW': '漢字「四」表示數字4',
      'en': 'Kanji "四" represents the number 4'
    }
  },
  {
    id: 'kanji-go',
    title: {
      'zh-TW': '五',
      'en': '五 (Five)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji', 'number'],
    description: {
      'zh-TW': '漢字「五」表示數字5',
      'en': 'Kanji "五" represents the number 5'
    }
  },
  {
    id: 'kanji-roku',
    title: {
      'zh-TW': '六',
      'en': '六 (Six)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji', 'number'],
    description: {
      'zh-TW': '漢字「六」表示數字6',
      'en': 'Kanji "六" represents the number 6'
    }
  },
  {
    id: 'kanji-nana',
    title: {
      'zh-TW': '七',
      'en': '七 (Seven)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji', 'number'],
    description: {
      'zh-TW': '漢字「七」表示數字7',
      'en': 'Kanji "七" represents the number 7'
    }
  },
  {
    id: 'kanji-hachi',
    title: {
      'zh-TW': '八',
      'en': '八 (Eight)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji', 'number'],
    description: {
      'zh-TW': '漢字「八」表示數字8',
      'en': 'Kanji "八" represents the number 8'
    }
  },
  {
    id: 'kanji-kyuu',
    title: {
      'zh-TW': '九',
      'en': '九 (Nine)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji', 'number'],
    description: {
      'zh-TW': '漢字「九」表示數字9',
      'en': 'Kanji "九" represents the number 9'
    }
  },
  {
    id: 'kanji-juu',
    title: {
      'zh-TW': '十',
      'en': '十 (Ten)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji', 'number'],
    description: {
      'zh-TW': '漢字「十」表示數字10',
      'en': 'Kanji "十" represents the number 10'
    }
  },
  {
    id: 'kanji-hi',
    title: {
      'zh-TW': '日',
      'en': '日 (Day, Sun)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「日」表示太陽、日子',
      'en': 'Kanji "日" represents sun, day'
    }
  },
  {
    id: 'kanji-hito',
    title: {
      'zh-TW': '人',
      'en': '人 (Person)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「人」表示人、人類',
      'en': 'Kanji "人" represents person, human'
    }
  },
  {
    id: 'kanji-kuchi',
    title: {
      'zh-TW': '口',
      'en': '口 (Mouth)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「口」表示嘴巴、入口',
      'en': 'Kanji "口" represents mouth, entrance'
    }
  },
  {
    id: 'kanji-me',
    title: {
      'zh-TW': '目',
      'en': '目 (Eye)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「目」表示眼睛、目標',
      'en': 'Kanji "目" represents eye, goal'
    }
  },
  {
    id: 'kanji-tsuki',
    title: {
      'zh-TW': '月',
      'en': '月 (Month, Moon)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「月」表示月亮、月份',
      'en': 'Kanji "月" represents moon, month'
    }
  },
  {
    id: 'kanji-nen',
    title: {
      'zh-TW': '年',
      'en': '年 (Year)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「年」表示年份、年齡',
      'en': 'Kanji "年" represents year, age'
    }
  },
  {
    id: 'kanji-toki',
    title: {
      'zh-TW': '時',
      'en': '時 (Time)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「時」表示時間、時刻',
      'en': 'Kanji "時" represents time, hour'
    }
  },
  {
    id: 'kanji-ka-fire',
    title: {
      'zh-TW': '火',
      'en': '火 (Fire)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「火」表示火、火焰',
      'en': 'Kanji "火" represents fire, flame'
    }
  },
  {
    id: 'kanji-mizu',
    title: {
      'zh-TW': '水',
      'en': '水 (Water)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「水」表示水',
      'en': 'Kanji "水" represents water'
    }
  },
  {
    id: 'kanji-ki',
    title: {
      'zh-TW': '木',
      'en': '木 (Tree, Wood)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「木」表示樹、木材',
      'en': 'Kanji "木" represents tree, wood'
    }
  },
  {
    id: 'kanji-kin',
    title: {
      'zh-TW': '金',
      'en': '金 (Gold, Money)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「金」表示金、金錢',
      'en': 'Kanji "金" represents gold, money'
    }
  },
  {
    id: 'kanji-do',
    title: {
      'zh-TW': '土',
      'en': '土 (Earth, Soil)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「土」表示土、土壤',
      'en': 'Kanji "土" represents earth, soil'
    }
  },
  {
    id: 'kanji-ookii',
    title: {
      'zh-TW': '大',
      'en': '大 (Big, Large)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「大」表示大、大的',
      'en': 'Kanji "大" represents big, large'
    }
  },
  {
    id: 'kanji-chiisai',
    title: {
      'zh-TW': '小',
      'en': '小 (Small, Little)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「小」表示小、小的',
      'en': 'Kanji "小" represents small, little'
    }
  },
  {
    id: 'kanji-ue',
    title: {
      'zh-TW': '上',
      'en': '上 (Up, Above)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「上」表示上、上面',
      'en': 'Kanji "上" represents up, above'
    }
  },
  {
    id: 'kanji-shita',
    title: {
      'zh-TW': '下',
      'en': '下 (Down, Below)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「下」表示下、下面',
      'en': 'Kanji "下" represents down, below'
    }
  },
  {
    id: 'kanji-naka',
    title: {
      'zh-TW': '中',
      'en': '中 (Middle, Inside)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「中」表示中間、裡面',
      'en': 'Kanji "中" represents middle, inside'
    }
  },
  {
    id: 'kanji-mae',
    title: {
      'zh-TW': '前',
      'en': '前 (Before, Front)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「前」表示前面、之前',
      'en': 'Kanji "前" represents front, before'
    }
  },
  {
    id: 'kanji-ato',
    title: {
      'zh-TW': '後',
      'en': '後 (After, Behind)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「後」表示後面、之後',
      'en': 'Kanji "後" represents behind, after'
    }
  },
  {
    id: 'kanji-hidari',
    title: {
      'zh-TW': '左',
      'en': '左 (Left)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「左」表示左、左邊',
      'en': 'Kanji "左" represents left'
    }
  },
  {
    id: 'kanji-migi',
    title: {
      'zh-TW': '右',
      'en': '右 (Right)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「右」表示右、右邊',
      'en': 'Kanji "右" represents right'
    }
  },
  {
    id: 'kanji-higashi',
    title: {
      'zh-TW': '東',
      'en': '東 (East)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「東」表示東、東方',
      'en': 'Kanji "東" represents east'
    }
  },
  {
    id: 'kanji-nishi',
    title: {
      'zh-TW': '西',
      'en': '西 (West)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「西」表示西、西方',
      'en': 'Kanji "西" represents west'
    }
  },
  {
    id: 'kanji-minami',
    title: {
      'zh-TW': '南',
      'en': '南 (South)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「南」表示南、南方',
      'en': 'Kanji "南" represents south'
    }
  },
  {
    id: 'kanji-kita',
    title: {
      'zh-TW': '北',
      'en': '北 (North)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「北」表示北、北方',
      'en': 'Kanji "北" represents north'
    }
  },
  {
    id: 'kanji-atarashii',
    title: {
      'zh-TW': '新',
      'en': '新 (New)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「新」表示新、新的',
      'en': 'Kanji "新" represents new'
    }
  },
  {
    id: 'kanji-furui',
    title: {
      'zh-TW': '古',
      'en': '古 (Old, Ancient)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「古」表示古、古老的',
      'en': 'Kanji "古" represents old, ancient'
    }
  },
  {
    id: 'kanji-nagai',
    title: {
      'zh-TW': '長',
      'en': '長 (Long, Leader)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「長」表示長、長的',
      'en': 'Kanji "長" represents long, leader'
    }
  },
  {
    id: 'kanji-mijikai',
    title: {
      'zh-TW': '短',
      'en': '短 (Short)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「短」表示短、短的',
      'en': 'Kanji "短" represents short'
    }
  },
  {
    id: 'kanji-takai',
    title: {
      'zh-TW': '高',
      'en': '高 (High, Tall)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「高」表示高、高的',
      'en': 'Kanji "高" represents high, tall'
    }
  },
  {
    id: 'kanji-hikui',
    title: {
      'zh-TW': '低',
      'en': '低 (Low)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「低」表示低、低的',
      'en': 'Kanji "低" represents low'
    }
  },
  {
    id: 'kanji-ooi',
    title: {
      'zh-TW': '多',
      'en': '多 (Many, Much)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「多」表示多、多的',
      'en': 'Kanji "多" represents many, much'
    }
  },
  {
    id: 'kanji-sukunai',
    title: {
      'zh-TW': '少',
      'en': '少 (Few, Little)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「少」表示少、少的',
      'en': 'Kanji "少" represents few, little'
    }
  },
  {
    id: 'kanji-hayai',
    title: {
      'zh-TW': '早',
      'en': '早 (Early, Fast)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「早」表示早、快的',
      'en': 'Kanji "早" represents early, fast'
    }
  },
  {
    id: 'kanji-osoi',
    title: {
      'zh-TW': '晚',
      'en': '晚 (Late, Slow)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「晚」表示晚、慢的',
      'en': 'Kanji "晚" represents late, slow'
    }
  },
  {
    id: 'kanji-ii',
    title: {
      'zh-TW': '好',
      'en': '好 (Good, Like)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「好」表示好、喜歡',
      'en': 'Kanji "好" represents good, like'
    }
  },
  {
    id: 'kanji-warui',
    title: {
      'zh-TW': '悪',
      'en': '悪 (Bad, Evil)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「悪」表示壞、惡的',
      'en': 'Kanji "悪" represents bad, evil'
    }
  },
  {
    id: 'kanji-tsuyoi',
    title: {
      'zh-TW': '強',
      'en': '強 (Strong, Powerful)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「強」表示強、強的',
      'en': 'Kanji "強" represents strong, powerful'
    }
  },
  {
    id: 'kanji-yowai',
    title: {
      'zh-TW': '弱',
      'en': '弱 (Weak)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「弱」表示弱、弱的',
      'en': 'Kanji "弱" represents weak'
    }
  },
  {
    id: 'kanji-shiroi',
    title: {
      'zh-TW': '白',
      'en': '白 (White)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「白」表示白、白色的',
      'en': 'Kanji "白" represents white'
    }
  },
  {
    id: 'kanji-kuroi',
    title: {
      'zh-TW': '黑',
      'en': '黑 (Black)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「黑」表示黑、黑色的',
      'en': 'Kanji "黑" represents black'
    }
  },
  {
    id: 'kanji-akai',
    title: {
      'zh-TW': '紅',
      'en': '紅 (Red)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「紅」表示紅、紅色的',
      'en': 'Kanji "紅" represents red'
    }
  },
  {
    id: 'kanji-aoi',
    title: {
      'zh-TW': '青',
      'en': '青 (Blue, Green)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「青」表示青、藍色的（在日語中也指綠色）',
      'en': 'Kanji "青" represents blue (also green in Japanese)'
    }
  },
  {
    id: 'kanji-kiiroi',
    title: {
      'zh-TW': '黃',
      'en': '黃 (Yellow)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「黃」表示黃、黃色的',
      'en': 'Kanji "黃" represents yellow'
    }
  },
  {
    id: 'kanji-midori',
    title: {
      'zh-TW': '綠',
      'en': '綠 (Green)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「綠」表示綠、綠色的',
      'en': 'Kanji "綠" represents green'
    }
  },
  {
    id: 'kanji-chairoi',
    title: {
      'zh-TW': '茶',
      'en': '茶 (Brown, Tea)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「茶」表示茶、茶色的',
      'en': 'Kanji "茶" represents tea, brown'
    }
  },
  {
    id: 'kanji-te',
    title: {
      'zh-TW': '手',
      'en': '手 (Hand)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「手」表示手',
      'en': 'Kanji "手" represents hand'
    }
  },
  {
    id: 'kanji-ashi',
    title: {
      'zh-TW': '足',
      'en': '足 (Foot, Leg)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「足」表示足、腳',
      'en': 'Kanji "足" represents foot, leg'
    }
  },
  {
    id: 'kanji-mimi',
    title: {
      'zh-TW': '耳',
      'en': '耳 (Ear)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「耳」表示耳、耳朵',
      'en': 'Kanji "耳" represents ear'
    }
  },
  {
    id: 'kanji-hana',
    title: {
      'zh-TW': '鼻',
      'en': '鼻 (Nose)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「鼻」表示鼻、鼻子',
      'en': 'Kanji "鼻" represents nose'
    }
  },
  {
    id: 'kanji-atama',
    title: {
      'zh-TW': '頭',
      'en': '頭 (Head)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「頭」表示頭、頭部',
      'en': 'Kanji "頭" represents head'
    }
  },
  {
    id: 'kanji-kubi',
    title: {
      'zh-TW': '首',
      'en': '首 (Neck)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「首」表示首、脖子',
      'en': 'Kanji "首" represents neck'
    }
  },
  {
    id: 'kanji-kokoro',
    title: {
      'zh-TW': '心',
      'en': '心 (Heart, Mind)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「心」表示心、心臟、心情',
      'en': 'Kanji "心" represents heart, mind'
    }
  },
  {
    id: 'kanji-karada',
    title: {
      'zh-TW': '身',
      'en': '身 (Body)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「身」表示身、身體',
      'en': 'Kanji "身" represents body'
    }
  },
  {
    id: 'kanji-hana-flower',
    title: {
      'zh-TW': '花',
      'en': '花 (Flower)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「花」表示花、花朵',
      'en': 'Kanji "花" represents flower'
    }
  },
  {
    id: 'kanji-yama',
    title: {
      'zh-TW': '山',
      'en': '山 (Mountain)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「山」表示山、山脈',
      'en': 'Kanji "山" represents mountain'
    }
  },
  {
    id: 'kanji-kawa',
    title: {
      'zh-TW': '川',
      'en': '川 (River)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「川」表示川、河流',
      'en': 'Kanji "川" represents river'
    }
  },
  {
    id: 'kanji-sora',
    title: {
      'zh-TW': '空',
      'en': '空 (Sky, Empty)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「空」表示空、天空',
      'en': 'Kanji "空" represents sky, empty'
    }
  },
  {
    id: 'kanji-umi',
    title: {
      'zh-TW': '海',
      'en': '海 (Sea, Ocean)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「海」表示海、海洋',
      'en': 'Kanji "海" represents sea, ocean'
    }
  },
  {
    id: 'kanji-hoshi',
    title: {
      'zh-TW': '星',
      'en': '星 (Star)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「星」表示星、星星',
      'en': 'Kanji "星" represents star'
    }
  },
  {
    id: 'kanji-kumo',
    title: {
      'zh-TW': '雲',
      'en': '雲 (Cloud)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「雲」表示雲、雲朵',
      'en': 'Kanji "雲" represents cloud'
    }
  },
  {
    id: 'kanji-kuruma',
    title: {
      'zh-TW': '車',
      'en': '車 (Car, Vehicle)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「車」表示車、汽車',
      'en': 'Kanji "車" represents car, vehicle'
    }
  },
  {
    id: 'kanji-den',
    title: {
      'zh-TW': '電',
      'en': '電 (Electricity)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「電」表示電、電力',
      'en': 'Kanji "電" represents electricity'
    }
  },
  {
    id: 'kanji-hanashi',
    title: {
      'zh-TW': '話',
      'en': '話 (Talk, Story)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「話」表示話、說話',
      'en': 'Kanji "話" represents talk, story'
    }
  },
  {
    id: 'kanji-mon',
    title: {
      'zh-TW': '門',
      'en': '門 (Gate, Door)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「門」表示門、大門',
      'en': 'Kanji "門" represents gate, door'
    }
  },
  {
    id: 'kanji-ie',
    title: {
      'zh-TW': '家',
      'en': '家 (House, Home)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「家」表示家、房屋',
      'en': 'Kanji "家" represents house, home'
    }
  },
  {
    id: 'kanji-mise',
    title: {
      'zh-TW': '店',
      'en': '店 (Store, Shop)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「店」表示店、商店',
      'en': 'Kanji "店" represents store, shop'
    }
  },
  {
    id: 'kanji-michi',
    title: {
      'zh-TW': '道',
      'en': '道 (Road, Way)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「道」表示道、道路',
      'en': 'Kanji "道" represents road, way'
    }
  },
  {
    id: 'kanji-sakana',
    title: {
      'zh-TW': '魚',
      'en': '魚 (Fish)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「魚」表示魚、魚類',
      'en': 'Kanji "魚" represents fish'
    }
  },
  {
    id: 'kanji-tori',
    title: {
      'zh-TW': '鳥',
      'en': '鳥 (Bird)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「鳥」表示鳥、鳥類',
      'en': 'Kanji "鳥" represents bird'
    }
  },
  {
    id: 'kanji-inu',
    title: {
      'zh-TW': '犬',
      'en': '犬 (Dog)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「犬」表示犬、狗',
      'en': 'Kanji "犬" represents dog'
    }
  },
  {
    id: 'kanji-neko',
    title: {
      'zh-TW': '猫',
      'en': '猫 (Cat)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「猫」表示猫、貓',
      'en': 'Kanji "猫" represents cat'
    }
  },
  {
    id: 'kanji-kusa',
    title: {
      'zh-TW': '草',
      'en': '草 (Grass)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「草」表示草、草地',
      'en': 'Kanji "草" represents grass'
    }
  },
  {
    id: 'kanji-mori',
    title: {
      'zh-TW': '森',
      'en': '森 (Forest)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「森」表示森、森林',
      'en': 'Kanji "森" represents forest'
    }
  },
  {
    id: 'kanji-hayashi',
    title: {
      'zh-TW': '林',
      'en': '林 (Grove, Woods)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「林」表示林、樹林',
      'en': 'Kanji "林" represents grove, woods'
    }
  },
  {
    id: 'kanji-kaze',
    title: {
      'zh-TW': '風',
      'en': '風 (Wind)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「風」表示風、風向',
      'en': 'Kanji "風" represents wind'
    }
  },
  {
    id: 'kanji-ame',
    title: {
      'zh-TW': '雨',
      'en': '雨 (Rain)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「雨」表示雨、雨水',
      'en': 'Kanji "雨" represents rain'
    }
  },
  {
    id: 'kanji-yuki',
    title: {
      'zh-TW': '雪',
      'en': '雪 (Snow)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「雪」表示雪、雪花',
      'en': 'Kanji "雪" represents snow'
    }
  },
  {
    id: 'kanji-koori',
    title: {
      'zh-TW': '氷',
      'en': '氷 (Ice)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「氷」表示氷、冰塊',
      'en': 'Kanji "氷" represents ice'
    }
  },
  {
    id: 'kanji-ishi',
    title: {
      'zh-TW': '石',
      'en': '石 (Stone)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「石」表示石、石頭',
      'en': 'Kanji "石" represents stone'
    }
  },
  {
    id: 'kanji-tsuchi',
    title: {
      'zh-TW': '土',
      'en': '土 (Earth, Soil)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「土」表示土、土壤',
      'en': 'Kanji "土" represents earth, soil'
    }
  },
  {
    id: 'kanji-chi',
    title: {
      'zh-TW': '地',
      'en': '地 (Ground, Earth)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「地」表示地、地面',
      'en': 'Kanji "地" represents ground, earth'
    }
  },
  {
    id: 'kanji-ta',
    title: {
      'zh-TW': '田',
      'en': '田 (Rice Field)'
    },
    category: {
      type: 'kanji',
      level: 'N5'
    },
    tags: ['basic', 'kanji'],
    description: {
      'zh-TW': '漢字「田」表示田、田地',
      'en': 'Kanji "田" represents rice field'
    }
  }
];

// 單字索引（只包含 vocabulary 類型）
export const vocabularyIndex = contentIndex.filter(item => item.category.type === 'vocabulary');

// 漢字索引（只包含 kanji 類型）
export const kanjiIndex = contentIndex.filter(item => item.category.type === 'kanji');

// 過濾後的內容索引（排除單字和漢字，用於 /content 頁面）
export const filteredContentIndex = contentIndex.filter(
  item => item.category.type !== 'vocabulary' && item.category.type !== 'kanji'
);

