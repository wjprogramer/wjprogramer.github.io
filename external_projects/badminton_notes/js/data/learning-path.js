/**
 * 學習路徑數據
 * 定義階段、技能依賴關係和學習順序
 */

export const learningPathData = {
  stages: [
    {
      id: 'stage-1',
      order: 1,
      title: {
        'zh-TW': '基礎建立',
        'en': 'Fundamentals',
        'ja': '基礎'
      },
      description: {
        'zh-TW': '建立羽毛球的基本知識和基礎動作，為後續學習打下堅實基礎。',
        'en': 'Establish basic badminton knowledge and fundamental movements, laying a solid foundation for subsequent learning.',
        'ja': 'バドミントンの基本知識と基礎動作を確立し、その後の学習のための堅実な基盤を築きます。'
      },
      skills: [
        { id: 'court-and-rules', order: 1, required: true },
        { id: 'grip', order: 2, required: true },
        { id: 'stance', order: 3, required: true },
        { id: 'footwork', order: 4, required: true }
      ],
      dependencies: {
        'footwork': ['stance'],
        'stance': ['grip']
      }
    },
    {
      id: 'stage-2',
      order: 2,
      title: {
        'zh-TW': '核心技術',
        'en': 'Core Techniques',
        'ja': 'コア技術'
      },
      description: {
        'zh-TW': '學習基本的擊球技術，包括發球、高遠球、網前球等核心技術。',
        'en': 'Learn basic shot techniques, including serve, clear, net shot and other core techniques.',
        'ja': 'サーブ、クリア、ネットショットなどのコア技術を含む基本的なショット技術を学びます。'
      },
      skills: [
        { id: 'serve', order: 1, required: true },
        { id: 'clear', order: 2, required: true },
        { id: 'high-clear', order: 3, required: true },
        { id: 'net-shot', order: 4, required: true },
        { id: 'lob', order: 5, required: false }
      ],
      dependencies: {
        'serve': ['grip', 'stance'],
        'clear': ['grip', 'footwork'],
        'high-clear': ['grip', 'footwork'],
        'net-shot': ['grip', 'footwork'],
        'lob': ['net-shot']
      }
    },
    {
      id: 'stage-3',
      order: 3,
      title: {
        'zh-TW': '進階擊球',
        'en': 'Advanced Shots',
        'ja': '上級ショット'
      },
      description: {
        'zh-TW': '學習進階擊球技術，包括吊球、殺球、平抽球和反手技術。',
        'en': 'Learn advanced shot techniques, including drop shot, smash, drive and backhand techniques.',
        'ja': 'ドロップショット、スマッシュ、ドライブ、バックハンド技術を含む上級ショット技術を学びます。'
      },
      skills: [
        { id: 'drop-shot', order: 1, required: true },
        { id: 'smash', order: 2, required: true },
        { id: 'drive', order: 3, required: true },
        { id: 'backhand', order: 4, required: true },
        { id: 'backhand-drop', order: 5, required: false },
        { id: 'round-head-clear', order: 6, required: false },
        { id: 'backhand-net-spin', order: 7, required: false },
        { id: 'forehand-net-spin', order: 8, required: false },
        { id: 'backhand-net-kill', order: 9, required: false },
        { id: 'forehand-net-kill', order: 10, required: false },
        { id: 'defence-net', order: 11, required: false },
        { id: 'defence-lift', order: 12, required: false },
        { id: 'backhand-flick-serve', order: 13, required: false }
      ],
      dependencies: {
        'drop-shot': ['high-clear', 'clear'],
        'smash': ['high-clear', 'clear'],
        'drive': ['clear', 'net-shot'],
        'backhand': ['grip', 'footwork'],
        'backhand-drop': ['backhand', 'drop-shot'],
        'round-head-clear': ['high-clear', 'backhand'],
        'backhand-net-spin': ['net-shot', 'backhand'],
        'forehand-net-spin': ['net-shot'],
        'backhand-net-kill': ['net-shot', 'backhand'],
        'forehand-net-kill': ['net-shot'],
        'defence-net': ['net-shot', 'defense'],
        'defence-lift': ['lob', 'defense'],
        'backhand-flick-serve': ['serve', 'backhand']
      }
    },
    {
      id: 'stage-4',
      order: 4,
      title: {
        'zh-TW': '進階技能',
        'en': 'Advanced Skills',
        'ja': '上級技能'
      },
      description: {
        'zh-TW': '學習進階技能，包括假動作、力量技術、控制技術、落點控制和防守技術。',
        'en': 'Learn advanced skills, including deception, power technique, control technique, placement and defense.',
        'ja': 'フェイント、パワーテクニック、コントロールテクニック、プレースメント、守備技術を含む上級技能を学びます。'
      },
      skills: [
        { id: 'deception', order: 1, required: false },
        { id: 'power-technique', order: 2, required: false },
        { id: 'control-technique', order: 3, required: false },
        { id: 'placement', order: 4, required: false },
        { id: 'defense', order: 5, required: true },
        { id: 'jump-smash', order: 6, required: false },
        { id: 'jump-out-smash', order: 7, required: false },
        { id: 'backhand-smash', order: 8, required: false },
        { id: 'scissor-kick-smash', order: 9, required: false },
        { id: 'backhand-clear', order: 10, required: false },
        { id: 'backhand-net-brush', order: 11, required: false },
        { id: 'forehand-net-brush', order: 12, required: false }
      ],
      dependencies: {
        'deception': ['net-shot', 'drop-shot', 'smash'],
        'power-technique': ['smash', 'drive'],
        'control-technique': ['net-shot', 'drop-shot'],
        'placement': ['control-technique'],
        'defense': ['smash', 'drive'],
        'jump-smash': ['smash'],
        'jump-out-smash': ['jump-smash'],
        'backhand-smash': ['smash', 'backhand'],
        'scissor-kick-smash': ['round-head-clear', 'jump-smash'],
        'backhand-clear': ['backhand', 'high-clear'],
        'backhand-net-brush': ['backhand-net-kill'],
        'forehand-net-brush': ['forehand-net-kill']
      }
    },
    {
      id: 'stage-5',
      order: 5,
      title: {
        'zh-TW': '戰術應用',
        'en': 'Tactics',
        'ja': '戦術'
      },
      description: {
        'zh-TW': '學習不同情境下的戰術應用，包括單打、雙打和混雙戰術。',
        'en': 'Learn tactical applications in different scenarios, including singles, doubles and mixed doubles tactics.',
        'ja': 'シングルス、ダブルス、ミックスダブルス戦術を含む、異なる状況での戦術応用を学びます。'
      },
      skills: [
        { id: 'singles-tactics', order: 1, required: false },
        { id: 'doubles-tactics', order: 2, required: false },
        { id: 'mixed-doubles-tactics', order: 3, required: false }
      ],
      dependencies: {
        'singles-tactics': ['placement', 'control-technique'],
        'doubles-tactics': ['placement', 'control-technique'],
        'mixed-doubles-tactics': ['placement', 'control-technique']
      }
    },
    {
      id: 'stage-6',
      order: 6,
      title: {
        'zh-TW': '訓練與裝備',
        'en': 'Training & Equipment',
        'ja': 'トレーニングと装備'
      },
      description: {
        'zh-TW': '學習體能訓練、心理訓練和裝備選擇，全面提升羽毛球水平。',
        'en': 'Learn physical training, mental training and equipment selection to comprehensively improve badminton level.',
        'ja': '体力トレーニング、メンタルトレーニング、装備選択を学び、バドミントンのレベルを総合的に向上させます。'
      },
      skills: [
        { id: 'physical-training', order: 1, required: false },
        { id: 'mental-training', order: 2, required: false },
        { id: 'racket-selection', order: 3, required: false },
        { id: 'stringing', order: 4, required: false }
      ],
      dependencies: {}
    }
  ],
  
  /**
   * 獲取技能的依賴技能
   */
  getSkillDependencies(skillId) {
    for (const stage of this.stages) {
      if (stage.dependencies[skillId]) {
        return stage.dependencies[skillId];
      }
    }
    return [];
  },
  
  /**
   * 檢查技能是否已滿足依賴條件
   */
  checkSkillDependencies(skillId, completedSkills = []) {
    const dependencies = this.getSkillDependencies(skillId);
    if (dependencies.length === 0) return true;
    
    return dependencies.every(dep => completedSkills.includes(dep));
  },
  
  /**
   * 獲取階段的所有技能
   */
  getStageSkills(stageId) {
    const stage = this.stages.find(s => s.id === stageId);
    return stage ? stage.skills : [];
  },
  
  /**
   * 獲取所有技能列表
   */
  getAllSkills() {
    const allSkills = [];
    this.stages.forEach(stage => {
      stage.skills.forEach(skill => {
        if (!allSkills.find(s => s.id === skill.id)) {
          allSkills.push({
            ...skill,
            stageId: stage.id,
            stageOrder: stage.order
          });
        }
      });
    });
    return allSkills;
  }
};

