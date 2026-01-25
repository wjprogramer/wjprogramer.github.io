/**
 * 分類和標籤的多國化翻譯
 */

export const categoryTypeTranslations = {
  'basic_movement': {
    'zh-TW': '基礎動作',
    'en': 'Basic Movement',
    'ja': '基本動作'
  },
  'hitting_technique': {
    'zh-TW': '擊球技術',
    'en': 'Hitting Technique',
    'ja': '打撃技術'
  },
  'tactics': {
    'zh-TW': '戰術',
    'en': 'Tactics',
    'ja': '戦術'
  },
  'training': {
    'zh-TW': '訓練',
    'en': 'Training',
    'ja': 'トレーニング'
  },
  'equipment': {
    'zh-TW': '裝備',
    'en': 'Equipment',
    'ja': '装備'
  }
};

export const scenarioTranslations = {
  'general': {
    'zh-TW': '通用',
    'en': 'General',
    'ja': '一般'
  },
  'singles': {
    'zh-TW': '單打',
    'en': 'Singles',
    'ja': 'シングルス'
  },
  'doubles': {
    'zh-TW': '雙打',
    'en': 'Doubles',
    'ja': 'ダブルス'
  },
  'mixed_doubles': {
    'zh-TW': '混雙',
    'en': 'Mixed Doubles',
    'ja': 'ミックスダブルス'
  }
};

export const tagTranslations = {
  'basic': {
    'zh-TW': '基礎',
    'en': 'Basic',
    'ja': '基礎'
  },
  'intermediate': {
    'zh-TW': '中階',
    'en': 'Intermediate',
    'ja': '中級'
  },
  'advanced': {
    'zh-TW': '進階',
    'en': 'Advanced',
    'ja': '上級'
  },
  'hitting': {
    'zh-TW': '擊球',
    'en': 'Hitting',
    'ja': '打撃'
  },
  'backcourt': {
    'zh-TW': '後場',
    'en': 'Backcourt',
    'ja': '後方コート'
  },
  'attack': {
    'zh-TW': '攻擊',
    'en': 'Attack',
    'ja': '攻撃'
  },
  'grip': {
    'zh-TW': '握拍',
    'en': 'Grip',
    'ja': 'グリップ'
  },
  'serve': {
    'zh-TW': '發球',
    'en': 'Serve',
    'ja': 'サーブ'
  },
  'net': {
    'zh-TW': '網前',
    'en': 'Net',
    'ja': 'ネット'
  },
  'footwork': {
    'zh-TW': '步法',
    'en': 'Footwork',
    'ja': 'フットワーク'
  },
  'movement': {
    'zh-TW': '移動',
    'en': 'Movement',
    'ja': '移動'
  },
  'midcourt': {
    'zh-TW': '中場',
    'en': 'Midcourt',
    'ja': '中コート'
  },
  'backhand': {
    'zh-TW': '反手',
    'en': 'Backhand',
    'ja': 'バックハンド'
  },
  'defense': {
    'zh-TW': '防守',
    'en': 'Defense',
    'ja': '守備'
  },
  'tactics': {
    'zh-TW': '戰術',
    'en': 'Tactics',
    'ja': '戦術'
  },
  'singles': {
    'zh-TW': '單打',
    'en': 'Singles',
    'ja': 'シングルス'
  },
  'doubles': {
    'zh-TW': '雙打',
    'en': 'Doubles',
    'ja': 'ダブルス'
  },
  'mixed_doubles': {
    'zh-TW': '混雙',
    'en': 'Mixed Doubles',
    'ja': 'ミックスダブルス'
  },
  'training': {
    'zh-TW': '訓練',
    'en': 'Training',
    'ja': 'トレーニング'
  },
  'physical': {
    'zh-TW': '體能',
    'en': 'Physical',
    'ja': '体力'
  },
  'mental': {
    'zh-TW': '心理',
    'en': 'Mental',
    'ja': 'メンタル'
  },
  'equipment': {
    'zh-TW': '裝備',
    'en': 'Equipment',
    'ja': '装備'
  },
  'racket': {
    'zh-TW': '球拍',
    'en': 'Racket',
    'ja': 'ラケット'
  },
  'stringing': {
    'zh-TW': '穿線',
    'en': 'Stringing',
    'ja': 'ストリング張り'
  }
};

/**
 * 取得分類類型的翻譯
 */
export function getCategoryType(categoryType, lang) {
  const translation = categoryTypeTranslations[categoryType];
  if (!translation) return categoryType;
  return translation[lang] || translation['zh-TW'] || categoryType;
}

/**
 * 取得情境的翻譯
 */
export function getScenario(scenario, lang) {
  const translation = scenarioTranslations[scenario];
  if (!translation) return scenario;
  return translation[lang] || translation['zh-TW'] || scenario;
}

/**
 * 取得標籤的翻譯
 */
export function getTag(tag, lang) {
  const translation = tagTranslations[tag];
  if (!translation) return tag;
  return translation[lang] || translation['zh-TW'] || tag;
}
