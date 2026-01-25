/**
 * 內容索引
 * 用於快速搜尋和列表顯示
 */

// 暫時使用模擬資料，之後會從 JSON 檔案載入
export const contentIndex = [
  {
    id: 'high-clear',
    title: {
      'zh-TW': '高遠球',
      'en': 'High Clear',
      'ja': 'ハイクリア'
    },
    category: {
      type: 'hitting_technique',
      scenario: ['singles', 'doubles', 'general']
    },
    tags: ['basic', 'hitting', 'backcourt'],
    description: {
      'zh-TW': '高遠球是羽毛球的基本擊球技術之一，用於將球擊到對方後場...',
      'en': 'High clear is one of the basic badminton techniques...',
      'ja': 'ハイクリアはバドミントンの基本的な技術の一つです...'
    }
  },
  {
    id: 'smash',
    title: {
      'zh-TW': '殺球',
      'en': 'Smash',
      'ja': 'スマッシュ'
    },
    category: {
      type: 'hitting_technique',
      scenario: ['singles', 'doubles', 'general']
    },
    tags: ['advanced', 'hitting', 'attack'],
    description: {
      'zh-TW': '殺球是羽毛球中最具攻擊性的擊球技術...',
      'en': 'Smash is the most aggressive shot in badminton...',
      'ja': 'スマッシュはバドミントンで最も攻撃的なショットです...'
    }
  },
  {
    id: 'grip',
    title: {
      'zh-TW': '握拍方式',
      'en': 'Grip',
      'ja': 'グリップ'
    },
    category: {
      type: 'basic_movement',
      scenario: ['general']
    },
    tags: ['basic', 'grip'],
    description: {
      'zh-TW': '正確的握拍方式是打好羽毛球的基礎...',
      'en': 'Correct grip is the foundation of good badminton...',
      'ja': '正しいグリップは良いバドミントンの基礎です...'
    }
  },
  {
    id: 'drop-shot',
    title: {
      'zh-TW': '吊球',
      'en': 'Drop Shot',
      'ja': 'ドロップショット'
    },
    category: {
      type: 'hitting_technique',
      scenario: ['singles', 'doubles', 'general']
    },
    tags: ['advanced', 'hitting', 'backcourt'],
    description: {
      'zh-TW': '吊球是後場技術中的重要變化球，通過輕巧的擊球將球送到對方網前，創造進攻機會。',
      'en': 'Drop shot is an important variation in backcourt techniques, sending the shuttlecock to the opponent\'s net area with a delicate hit to create attacking opportunities.',
      'ja': 'ドロップショットは後方コート技術の重要な変化球で、繊細な打撃で相手のネットエリアにシャトルを送り、攻撃の機会を作ります。'
    }
  },
  {
    id: 'serve',
    title: {
      'zh-TW': '發球',
      'en': 'Serve',
      'ja': 'サーブ'
    },
    category: {
      type: 'hitting_technique',
      scenario: ['singles', 'doubles', 'general']
    },
    tags: ['basic', 'hitting', 'serve'],
    description: {
      'zh-TW': '發球是每一分的開始，正確的發球技術可以為自己創造優勢，避免被對手直接得分。',
      'en': 'Serve is the start of every point. Correct serving technique can create advantages and avoid giving points directly to opponents.',
      'ja': 'サーブは各ポイントの開始です。正しいサーブ技術は自分に有利な状況を作り、相手に直接ポイントを与えることを避けます。'
    }
  },
  {
    id: 'net-shot',
    title: {
      'zh-TW': '網前球',
      'en': 'Net Shot',
      'ja': 'ネットショット'
    },
    category: {
      type: 'hitting_technique',
      scenario: ['singles', 'doubles', 'general']
    },
    tags: ['basic', 'hitting', 'net'],
    description: {
      'zh-TW': '網前球是近網區域的擊球技術，包括放網、挑球、推球等，是控制比賽節奏的重要手段。',
      'en': 'Net shot refers to hitting techniques in the net area, including net drops, lifts, and pushes, which are important means of controlling match rhythm.',
      'ja': 'ネットショットはネットエリアでの打撃技術で、ネットドロップ、リフト、プッシュなどが含まれ、試合のリズムをコントロールする重要な手段です。'
    }
  },
  {
    id: 'footwork',
    title: {
      'zh-TW': '步法',
      'en': 'Footwork',
      'ja': 'フットワーク'
    },
    category: {
      type: 'basic_movement',
      scenario: ['general']
    },
    tags: ['basic', 'footwork', 'movement'],
    description: {
      'zh-TW': '步法是羽毛球的基礎，良好的步法可以讓你快速到位，為擊球創造最佳條件。',
      'en': 'Footwork is the foundation of badminton. Good footwork allows you to quickly reach position and create optimal conditions for hitting.',
      'ja': 'フットワークはバドミントンの基礎です。良好なフットワークにより、素早くポジションに到達し、打撃に最適な条件を作ることができます。'
    }
  },
  {
    id: 'drive',
    title: {
      'zh-TW': '平抽球',
      'en': 'Drive',
      'ja': 'ドライブ'
    },
    category: {
      type: 'hitting_technique',
      scenario: ['singles', 'doubles', 'general']
    },
    tags: ['advanced', 'hitting', 'midcourt'],
    description: {
      'zh-TW': '平抽球是中場快速對攻的技術，球路平直快速，是雙打中常用的進攻和防守手段。',
      'en': 'Drive is a technique for fast midcourt exchanges, with flat and fast trajectories, commonly used in doubles for both offense and defense.',
      'ja': 'ドライブは中コートでの高速交換の技術で、平らで速い軌道を持ち、ダブルスで攻撃と守備の両方によく使われます。'
    }
  },
  {
    id: 'clear',
    title: {
      'zh-TW': '平高球',
      'en': 'Clear',
      'ja': 'クリア'
    },
    category: {
      type: 'hitting_technique',
      scenario: ['singles', 'doubles', 'general']
    },
    tags: ['basic', 'hitting', 'backcourt'],
    description: {
      'zh-TW': '平高球是後場技術的一種，球路較高遠球平直，飛行時間較短，常用於快速調動對手。',
      'en': 'Clear is a backcourt technique with a flatter trajectory than high clear, shorter flight time, commonly used to quickly move opponents.',
      'ja': 'クリアは後方コート技術の一種で、ハイクリアよりも平らな軌道を持ち、飛行時間が短く、相手を素早く動かすためによく使われます。'
    }
  },
  {
    id: 'lob',
    title: {
      'zh-TW': '挑球',
      'en': 'Lob',
      'ja': 'ロブ'
    },
    category: {
      type: 'hitting_technique',
      scenario: ['singles', 'doubles', 'general']
    },
    tags: ['basic', 'hitting', 'net'],
    description: {
      'zh-TW': '挑球是從網前將球挑到對方後場的技術，常用於被動防守時爭取回位時間。',
      'en': 'Lob is a technique to lift the shuttlecock from the net area to the opponent\'s backcourt, commonly used when passively defending to buy time to return to position.',
      'ja': 'ロブはネットエリアから相手の後方コートにシャトルを上げる技術で、受動的な守備時にポジションに戻る時間を確保するためによく使われます。'
    }
  },
  {
    id: 'backhand',
    title: {
      'zh-TW': '反手技術',
      'en': 'Backhand',
      'ja': 'バックハンド'
    },
    category: {
      type: 'hitting_technique',
      scenario: ['singles', 'doubles', 'general']
    },
    tags: ['advanced', 'hitting', 'backhand'],
    description: {
      'zh-TW': '反手技術是處理身體左側來球的重要技術，包括反手高遠球、反手殺球、反手吊球等。',
      'en': 'Backhand technique is important for handling shots to the left side of the body, including backhand clears, backhand smashes, and backhand drops.',
      'ja': 'バックハンド技術は体の左側に来るボールを処理する重要な技術で、バックハンドクリア、バックハンドスマッシュ、バックハンドドロップなどが含まれます。'
    }
  },
  {
    id: 'defense',
    title: {
      'zh-TW': '防守技術',
      'en': 'Defense',
      'ja': '守備技術'
    },
    category: {
      type: 'hitting_technique',
      scenario: ['singles', 'doubles', 'general']
    },
    tags: ['advanced', 'hitting', 'defense'],
    description: {
      'zh-TW': '防守技術包括接殺球、擋網、抽球等，是在被動情況下化解對手進攻的重要手段。',
      'en': 'Defensive techniques include receiving smashes, blocking at the net, and driving, which are important means to neutralize opponent attacks when in a passive position.',
      'ja': '守備技術にはスマッシュのレシーブ、ネットでのブロック、ドライブなどが含まれ、受動的な状況で相手の攻撃を無効化する重要な手段です。'
    }
  },
  {
    id: 'singles-tactics',
    title: {
      'zh-TW': '單打戰術',
      'en': 'Singles Tactics',
      'ja': 'シングルス戦術'
    },
    category: {
      type: 'tactics',
      scenario: ['singles']
    },
    tags: ['advanced', 'tactics', 'singles'],
    description: {
      'zh-TW': '單打戰術包括節奏控制、空間調動、體能分配等，是單打比賽中取得優勢的關鍵。',
      'en': 'Singles tactics include rhythm control, space manipulation, and energy management, which are key to gaining advantages in singles matches.',
      'ja': 'シングルス戦術にはリズムコントロール、スペース操作、エネルギー管理などが含まれ、シングルス試合で優位を得る鍵です。'
    }
  },
  {
    id: 'doubles-tactics',
    title: {
      'zh-TW': '雙打戰術',
      'en': 'Doubles Tactics',
      'ja': 'ダブルス戦術'
    },
    category: {
      type: 'tactics',
      scenario: ['doubles']
    },
    tags: ['advanced', 'tactics', 'doubles'],
    description: {
      'zh-TW': '雙打戰術包括站位配合、輪轉、進攻組織等，需要與搭檔密切配合才能發揮最大效果。',
      'en': 'Doubles tactics include positioning coordination, rotation, and offensive organization, requiring close cooperation with partners to maximize effectiveness.',
      'ja': 'ダブルス戦術にはポジショニングの連携、ローテーション、攻撃組織などが含まれ、パートナーとの緊密な協力が必要です。'
    }
  },
  {
    id: 'mixed-doubles-tactics',
    title: {
      'zh-TW': '混雙戰術',
      'en': 'Mixed Doubles Tactics',
      'ja': 'ミックスダブルス戦術'
    },
    category: {
      type: 'tactics',
      scenario: ['mixed_doubles']
    },
    tags: ['advanced', 'tactics', 'mixed_doubles'],
    description: {
      'zh-TW': '混雙戰術需要考慮男女選手的技術特點，通過合理的站位和配合發揮各自的優勢。',
      'en': 'Mixed doubles tactics need to consider the technical characteristics of male and female players, leveraging their respective strengths through proper positioning and coordination.',
      'ja': 'ミックスダブルス戦術は男女選手の技術的特徴を考慮し、適切なポジショニングと連携によりそれぞれの強みを発揮する必要があります。'
    }
  },
  {
    id: 'physical-training',
    title: {
      'zh-TW': '體能訓練',
      'en': 'Physical Training',
      'ja': '体力トレーニング'
    },
    category: {
      type: 'training',
      scenario: ['general']
    },
    tags: ['basic', 'training', 'physical'],
    description: {
      'zh-TW': '體能訓練包括速度、力量、耐力、柔韌性等訓練，是提升羽毛球表現的基礎。',
      'en': 'Physical training includes speed, strength, endurance, and flexibility training, which form the foundation for improving badminton performance.',
      'ja': '体力トレーニングには速度、筋力、持久力、柔軟性などのトレーニングが含まれ、バドミントンのパフォーマンス向上の基礎となります。'
    }
  },
  {
    id: 'mental-training',
    title: {
      'zh-TW': '心理訓練',
      'en': 'Mental Training',
      'ja': 'メンタルトレーニング'
    },
    category: {
      type: 'training',
      scenario: ['general']
    },
    tags: ['advanced', 'training', 'mental'],
    description: {
      'zh-TW': '心理訓練包括專注力、壓力管理、比賽策略思考等，是高水平比賽中不可或缺的能力。',
      'en': 'Mental training includes focus, stress management, and match strategy thinking, which are essential abilities in high-level competition.',
      'ja': 'メンタルトレーニングには集中力、ストレス管理、試合戦略思考などが含まれ、高レベルの競技において不可欠な能力です。'
    }
  },
  {
    id: 'racket-selection',
    title: {
      'zh-TW': '球拍選擇',
      'en': 'Racket Selection',
      'ja': 'ラケット選び'
    },
    category: {
      type: 'equipment',
      scenario: ['general']
    },
    tags: ['basic', 'equipment', 'racket'],
    description: {
      'zh-TW': '球拍選擇包括重量、平衡點、拍線張力等考量，選擇適合自己的球拍可以提升技術發揮。',
      'en': 'Racket selection includes considerations of weight, balance point, and string tension. Choosing the right racket can enhance technical performance.',
      'ja': 'ラケット選びには重量、バランスポイント、ストリングテンションなどの考慮が含まれ、自分に合ったラケットを選ぶことで技術的パフォーマンスを向上させることができます。'
    }
  },
  {
    id: 'stringing',
    title: {
      'zh-TW': '穿線技術',
      'en': 'Stringing',
      'ja': 'ストリング張り'
    },
    category: {
      type: 'equipment',
      scenario: ['general']
    },
    tags: ['advanced', 'equipment', 'stringing'],
    description: {
      'zh-TW': '穿線技術包括張力選擇、穿線方式、線材選擇等，影響球拍的擊球感覺和性能。',
      'en': 'Stringing techniques include tension selection, stringing methods, and string material choice, which affect the racket\'s hitting feel and performance.',
      'ja': 'ストリング張り技術にはテンション選択、張り方、ストリング素材の選択などが含まれ、ラケットの打感と性能に影響します。'
    }
  },
  {
    id: 'court-and-rules',
    title: {
      'zh-TW': '場地與規則',
      'en': 'Court and Rules',
      'ja': 'コートとルール'
    },
    category: {
      type: 'basic_movement',
      scenario: ['general']
    },
    tags: ['basic'],
    description: {
      'zh-TW': '了解羽毛球場地規格、比賽規則、得分失分等基本知識，是打好羽毛球的基礎。',
      'en': 'Understanding badminton court specifications, match rules, scoring, and point loss is fundamental to playing badminton well.',
      'ja': 'バドミントンコートの規格、試合ルール、得点、失点などの基本知識を理解することは、バドミントンを上手にプレイするための基礎です。'
    }
  },
  {
    id: 'stance',
    title: {
      'zh-TW': '站姿',
      'en': 'Stance',
      'ja': 'スタンス'
    },
    category: {
      type: 'basic_movement',
      scenario: ['general']
    },
    tags: ['basic', 'movement'],
    description: {
      'zh-TW': '正確的站姿是羽毛球所有技術的基礎，影響移動速度、擊球穩定性和身體平衡。',
      'en': 'Correct stance is the foundation of all badminton techniques, affecting movement speed, shot stability, and body balance.',
      'ja': '正しいスタンスはすべてのバドミントン技術の基礎で、移動速度、ショットの安定性、体のバランスに影響します。'
    }
  },
  {
    id: 'deception',
    title: {
      'zh-TW': '假動作',
      'en': 'Deception',
      'ja': 'フェイント'
    },
    category: {
      type: 'hitting_technique',
      scenario: ['singles', 'doubles', 'general']
    },
    tags: ['advanced', 'hitting', 'tactics'],
    description: {
      'zh-TW': '假動作是通過隱藏真實意圖來迷惑對手的進階技術，能夠創造進攻機會和打亂對手節奏。',
      'en': 'Deception is an advanced technique that confuses opponents by hiding true intentions, creating attacking opportunities and disrupting opponent rhythm.',
      'ja': 'フェイントは真の意図を隠すことで相手を混乱させる上級技術で、攻撃の機会を作り、相手のリズムを乱すことができます。'
    }
  },
  {
    id: 'power-technique',
    title: {
      'zh-TW': '力量技術',
      'en': 'Power Technique',
      'ja': 'パワーテクニック'
    },
    category: {
      type: 'hitting_technique',
      scenario: ['singles', 'doubles', 'general']
    },
    tags: ['advanced', 'hitting', 'attack'],
    description: {
      'zh-TW': '力量技術包括如何有效發力、增加擊球速度和力量，是提升攻擊威力的關鍵技術。',
      'en': 'Power technique includes how to effectively generate power, increase shot speed and strength, which is key to enhancing attacking power.',
      'ja': 'パワーテクニックには効果的な力の発生方法、ショットの速度と力の向上が含まれ、攻撃力を向上させる鍵となる技術です。'
    }
  },
  {
    id: 'control-technique',
    title: {
      'zh-TW': '控制技術',
      'en': 'Control Technique',
      'ja': 'コントロールテクニック'
    },
    category: {
      type: 'hitting_technique',
      scenario: ['singles', 'doubles', 'general']
    },
    tags: ['advanced', 'hitting'],
    description: {
      'zh-TW': '控制技術是精準控制球路、速度和旋轉的技術，能夠提高擊球的準確性和穩定性。',
      'en': 'Control technique is the skill to precisely control trajectory, speed, and spin, improving shot accuracy and stability.',
      'ja': 'コントロールテクニックは軌道、速度、回転を正確にコントロールする技術で、ショットの精度と安定性を向上させます。'
    }
  },
  {
    id: 'placement',
    title: {
      'zh-TW': '落點控制',
      'en': 'Placement',
      'ja': 'プレースメント'
    },
    category: {
      type: 'hitting_technique',
      scenario: ['singles', 'doubles', 'general']
    },
    tags: ['advanced', 'hitting', 'tactics'],
    description: {
      'zh-TW': '落點控制是將球精準擊到目標位置的能力，是戰術執行和創造得分機會的關鍵技術。',
      'en': 'Placement is the ability to accurately hit the shuttlecock to target positions, a key technique for tactical execution and creating scoring opportunities.',
      'ja': 'プレースメントはシャトルを正確に目標位置に打つ能力で、戦術の実行と得点機会の創出における重要な技術です。'
    }
  },
  {
    id: 'skill-level-classification',
    title: {
      'zh-TW': '台灣羽球推廣協會分級制度',
      'en': 'Taiwan Badminton Promotion Association Skill Level Classification',
      'ja': '台湾バドミントン普及協会スキルレベル分類'
    },
    category: {
      type: 'basic_movement',
      scenario: ['general']
    },
    tags: ['basic'],
    description: {
      'zh-TW': '台灣羽球推廣協會制定的18級分級制度，從新手階到職業級，幫助了解自己的技術水平。',
      'en': 'The 18-level classification system established by the Taiwan Badminton Promotion Association, from beginner to professional level, helps understand your technical level.',
      'ja': '台湾バドミントン普及協会が制定した18段階の分類制度で、初心者からプロレベルまで、自分の技術レベルを理解するのに役立ちます。'
    }
  },
  {
    id: 'jump-smash',
    title: {
      'zh-TW': '跳殺',
      'en': 'Jump Smash',
      'ja': 'ジャンプスマッシュ'
    },
    category: {
      type: 'hitting_technique',
      scenario: ['singles', 'doubles', 'general']
    },
    tags: ['advanced', 'hitting', 'attack'],
    description: {
      'zh-TW': '跳殺是殺球的高階技術，通過跳躍在空中完成擊球，能夠獲得更高的擊球點和更強的力量。',
      'en': 'Jump smash is an advanced technique of smash, completing the hit in the air through jumping, allowing for a higher contact point and stronger power.',
      'ja': 'ジャンプスマッシュはスマッシュの上級技術で、ジャンプして空中で打撃を完了し、より高い打撃点とより強い力を得ることができます。'
    }
  },
  {
    id: 'jump-out-smash',
    title: {
      'zh-TW': '跳出殺球（中國跳）',
      'en': 'Jump Out Smash',
      'ja': 'ジャンプアウトスマッシュ'
    },
    category: {
      type: 'hitting_technique',
      scenario: ['singles', 'doubles', 'general']
    },
    tags: ['advanced', 'hitting', 'attack'],
    description: {
      'zh-TW': '跳出殺球（又稱中國跳）是跳殺的進階變化，通過向前跳躍來增加擊球角度和力量，球路更斜，更難防守。',
      'en': 'Jump out smash (also known as Chinese jump) is an advanced variation of jump smash, increasing hitting angle and power through forward jumping, with more diagonal trajectory that is harder to defend.',
      'ja': 'ジャンプアウトスマッシュ（中国跳びとも呼ばれる）はジャンプスマッシュの上級バリエーションで、前進ジャンプにより打撃角度と力を増加させ、より斜めの軌道で守備が困難です。'
    }
  },
  {
    id: 'backhand-smash',
    title: {
      'zh-TW': '反手殺球',
      'en': 'Backhand Smash',
      'ja': 'バックハンドスマッシュ'
    },
    category: {
      type: 'hitting_technique',
      scenario: ['singles', 'doubles', 'general']
    },
    tags: ['advanced', 'hitting', 'attack', 'backhand'],
    description: {
      'zh-TW': '反手殺球是處理身體左側來球的重要技術，是反手技術中的高階應用，需要良好的反手技術基礎。',
      'en': 'Backhand smash is an important technique for handling shots to the left side of the body, a high-level application of backhand technique requiring a good backhand technical foundation.',
      'ja': 'バックハンドスマッシュは体の左側に来るボールを処理する重要な技術で、バックハンド技術の高レベルな応用で、良好なバックハンド技術の基礎が必要です。'
    }
  },
  {
    id: 'scissor-kick-smash',
    title: {
      'zh-TW': '剪刀跳殺球',
      'en': 'Scissor Kick Smash',
      'ja': 'シザーキックスマッシュ'
    },
    category: {
      type: 'hitting_technique',
      scenario: ['singles', 'doubles', 'general']
    },
    tags: ['advanced', 'hitting', 'attack'],
    description: {
      'zh-TW': '剪刀跳殺球是繞頭高遠球的進階應用，通過特殊的跳躍動作（剪刀腳）完成殺球，需要良好的身體柔韌性。',
      'en': 'Scissor kick smash is an advanced application of round the head clear, completing smash through special jumping action (scissor kick), requiring good body flexibility.',
      'ja': 'シザーキックスマッシュはラウンドザヘッドクリアの上級応用で、特殊なジャンプ動作（シザーキック）でスマッシュを完了し、良好な体の柔軟性が必要です。'
    }
  },
  {
    id: 'backhand-net-spin',
    title: {
      'zh-TW': '反手網前旋轉',
      'en': 'Backhand Net Spin',
      'ja': 'バックハンドネットスピン'
    },
    category: {
      type: 'hitting_technique',
      scenario: ['singles', 'doubles', 'general']
    },
    tags: ['intermediate', 'hitting', 'net'],
    description: {
      'zh-TW': '反手網前旋轉是反手網前技術的進階應用，通過旋轉動作增加球的變化，使對手難以判斷球路。',
      'en': 'Backhand net spin is an advanced application of backhand net technique, increasing ball variation through spinning action, making it difficult for opponents to judge the trajectory.',
      'ja': 'バックハンドネットスピンはバックハンドネット技術の上級応用で、スピン動作によりボールの変化を増加させ、相手が軌道を判断するのを困難にします。'
    }
  },
  {
    id: 'forehand-net-spin',
    title: {
      'zh-TW': '正手網前旋轉',
      'en': 'Forehand Net Spin',
      'ja': 'フォアハンドネットスピン'
    },
    category: {
      type: 'hitting_technique',
      scenario: ['singles', 'doubles', 'general']
    },
    tags: ['intermediate', 'hitting', 'net'],
    description: {
      'zh-TW': '正手網前旋轉是正手網前技術的進階應用，通過旋轉動作增加球的變化，使對手難以判斷球路。',
      'en': 'Forehand net spin is an advanced application of forehand net technique, increasing ball variation through spinning action, making it difficult for opponents to judge the trajectory.',
      'ja': 'フォアハンドネットスピンはフォアハンドネット技術の上級応用で、スピン動作によりボールの変化を増加させ、相手が軌道を判断するのを困難にします。'
    }
  },
  {
    id: 'defence-net',
    title: {
      'zh-TW': '防守網前',
      'en': 'Defence Net',
      'ja': 'ディフェンスネット'
    },
    category: {
      type: 'hitting_technique',
      scenario: ['singles', 'doubles', 'general']
    },
    tags: ['intermediate', 'hitting', 'defense', 'net'],
    description: {
      'zh-TW': '防守網前是在被動情況下從網前進行防守的技術，通過快速反應和準確控制化解對手的進攻。',
      'en': 'Defence net is a technique for defending from the net area in passive situations, neutralizing opponent attacks through quick reactions and accurate control.',
      'ja': 'ディフェンスネットは受動的な状況でネットエリアから守備を行う技術で、素早い反応と正確なコントロールにより相手の攻撃を無効化します。'
    }
  },
  {
    id: 'defence-lift',
    title: {
      'zh-TW': '防守挑球',
      'en': 'Defence Lift',
      'ja': 'ディフェンスリフト'
    },
    category: {
      type: 'hitting_technique',
      scenario: ['singles', 'doubles', 'general']
    },
    tags: ['intermediate', 'hitting', 'defense'],
    description: {
      'zh-TW': '防守挑球是在被動防守時將球挑到對方後場的技術，用於爭取回位時間和化解對手的進攻。',
      'en': 'Defence lift is a technique to lift the ball to the opponent\'s backcourt when passively defending, used to buy time to return to position and neutralize opponent attacks.',
      'ja': 'ディフェンスリフトは受動的に守備する際にボールを相手の後方コートに上げる技術で、ポジションに戻る時間を確保し、相手の攻撃を無効化するために使用されます。'
    }
  },
  {
    id: 'backhand-drop',
    title: {
      'zh-TW': '反手吊球',
      'en': 'Backhand Drop',
      'ja': 'バックハンドドロップ'
    },
    category: {
      type: 'hitting_technique',
      scenario: ['singles', 'doubles', 'general']
    },
    tags: ['intermediate', 'hitting', 'backhand'],
    description: {
      'zh-TW': '反手吊球是反手技術的重要應用，通過輕巧的擊球將球送到對方網前，創造進攻機會。',
      'en': 'Backhand drop is an important application of backhand technique, sending the shuttlecock to the opponent\'s net area with a delicate hit to create attacking opportunities.',
      'ja': 'バックハンドドロップはバックハンド技術の重要な応用で、繊細な打撃で相手のネットエリアにシャトルを送り、攻撃の機会を作ります。'
    }
  },
  {
    id: 'round-head-clear',
    title: {
      'zh-TW': '繞頭高遠球',
      'en': 'Round The Head Clear',
      'ja': 'ラウンドザヘッドクリア'
    },
    category: {
      type: 'hitting_technique',
      scenario: ['singles', 'doubles', 'general']
    },
    tags: ['intermediate', 'hitting', 'backcourt'],
    description: {
      'zh-TW': '繞頭高遠球是處理身體右側後方來球的重要技術，通過繞頭動作完成擊球，是高水平選手必備的技術。',
      'en': 'Round the head clear is an important technique for handling shots behind the right side of the body, completing the hit through round the head action, an essential technique for high-level players.',
      'ja': 'ラウンドザヘッドクリアは体の右側後方に来るボールを処理する重要な技術で、ラウンドザヘッド動作で打撃を完了し、高レベル選手に不可欠な技術です。'
    }
  },
  {
    id: 'backhand-net-kill',
    title: {
      'zh-TW': '反手網前封殺',
      'en': 'Backhand Net Kill',
      'ja': 'バックハンドネットキル'
    },
    category: {
      type: 'hitting_technique',
      scenario: ['singles', 'doubles', 'general']
    },
    tags: ['intermediate', 'hitting', 'attack', 'net'],
    description: {
      'zh-TW': '反手網前封殺是在網前進行快速進攻的技術，通過快速下壓擊球直接得分或創造進攻機會。',
      'en': 'Backhand net kill is a technique for rapid offense at the net, directly scoring or creating attacking opportunities through rapid downward hitting.',
      'ja': 'バックハンドネットキルはネットで素早い攻撃を行う技術で、素早く下に打つことで直接得点または攻撃の機会を作ります。'
    }
  },
  {
    id: 'forehand-net-kill',
    title: {
      'zh-TW': '正手網前封殺',
      'en': 'Forehand Net Kill',
      'ja': 'フォアハンドネットキル'
    },
    category: {
      type: 'hitting_technique',
      scenario: ['singles', 'doubles', 'general']
    },
    tags: ['intermediate', 'hitting', 'attack', 'net'],
    description: {
      'zh-TW': '正手網前封殺是在網前進行快速進攻的技術，通過快速下壓擊球直接得分或創造進攻機會。',
      'en': 'Forehand net kill is a technique for rapid offense at the net, directly scoring or creating attacking opportunities through rapid downward hitting.',
      'ja': 'フォアハンドネットキルはネットで素早い攻撃を行う技術で、素早く下に打つことで直接得点または攻撃の機会を作ります。'
    }
  },
  {
    id: 'backhand-flick-serve',
    title: {
      'zh-TW': '反手彈發球',
      'en': 'Backhand Flick Serve',
      'ja': 'バックハンドフリックサーブ'
    },
    category: {
      type: 'hitting_technique',
      scenario: ['singles', 'doubles', 'general']
    },
    tags: ['intermediate', 'hitting', 'serve'],
    description: {
      'zh-TW': '反手彈發球是發球技術的進階變化，通過快速彈擊增加發球速度，用於打亂對手節奏或直接得分。',
      'en': 'Backhand flick serve is an advanced variation of serving technique, increasing serve speed through rapid flicking, used to disrupt opponent rhythm or score directly.',
      'ja': 'バックハンドフリックサーブはサーブ技術の上級バリエーションで、素早いフリックによりサーブ速度を増加させ、相手のリズムを乱すか直接得点するために使用されます。'
    }
  },
  {
    id: 'backhand-clear',
    title: {
      'zh-TW': '反手高遠球',
      'en': 'Backhand Clear',
      'ja': 'バックハンドクリア'
    },
    category: {
      type: 'hitting_technique',
      scenario: ['singles', 'doubles', 'general']
    },
    tags: ['advanced', 'hitting', 'backhand'],
    description: {
      'zh-TW': '反手高遠球是反手技術的高階應用，能夠在身體左側完成高遠球，是高水平選手必備的技術。',
      'en': 'Backhand clear is a high-level application of backhand technique, capable of completing high clear on the left side of the body, an essential technique for high-level players.',
      'ja': 'バックハンドクリアはバックハンド技術の高レベルな応用で、体の左側でハイクリアを完了でき、高レベル選手に不可欠な技術です。'
    }
  },
  {
    id: 'backhand-net-brush',
    title: {
      'zh-TW': '反手網前刷球',
      'en': 'Backhand Net Brush',
      'ja': 'バックハンドネットブラシ'
    },
    category: {
      type: 'hitting_technique',
      scenario: ['singles', 'doubles', 'general']
    },
    tags: ['advanced', 'hitting', 'net'],
    description: {
      'zh-TW': '反手網前刷球是網前技術的進階應用，通過刷球動作增加球的旋轉和變化，使對手難以判斷球路。',
      'en': 'Backhand net brush is an advanced application of net technique, increasing ball spin and variation through brushing action, making it difficult for opponents to judge the trajectory.',
      'ja': 'バックハンドネットブラシはネット技術の上級応用で、ブラシ動作によりボールのスピンと変化を増加させ、相手が軌道を判断するのを困難にします。'
    }
  },
  {
    id: 'forehand-net-brush',
    title: {
      'zh-TW': '正手網前刷球',
      'en': 'Forehand Net Brush',
      'ja': 'フォアハンドネットブラシ'
    },
    category: {
      type: 'hitting_technique',
      scenario: ['singles', 'doubles', 'general']
    },
    tags: ['advanced', 'hitting', 'net'],
    description: {
      'zh-TW': '正手網前刷球是網前技術的進階應用，通過刷球動作增加球的旋轉和變化，使對手難以判斷球路。',
      'en': 'Forehand net brush is an advanced application of net technique, increasing ball spin and variation through brushing action, making it difficult for opponents to judge the trajectory.',
      'ja': 'フォアハンドネットブラシはネット技術の上級応用で、ブラシ動作によりボールのスピンと変化を増加させ、相手が軌道を判断するのを困難にします。'
    }
  }
];

