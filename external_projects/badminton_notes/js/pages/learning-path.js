/**
 * 學習路徑頁
 */
import { t } from '../utils/i18n.js';
import { updateActiveNav } from '../components/navigation.js';
import { router } from '../router.js';
import { learningPathData } from '../data/learning-path.js';
import { contentIndex } from '../data/index.js';

/**
 * 渲染學習路徑頁
 */
export function renderLearningPath({ path, params }) {
  const app = document.getElementById('app');
  updateActiveNav();
  
  const lang = document.documentElement.getAttribute('lang') || 'zh-TW';
  
  app.innerHTML = `
    <div class="learning-path-page page-enter">
      <div class="container">
        <h1 class="page-title" data-i18n="nav.learning-path">學習路徑</h1>
        
        <div class="learning-path">
          ${learningPathData.stages.map((stage, stageIndex) => `
            <div class="learning-path__stage" data-stage-id="${stage.id}">
              <div class="stage-header">
                <div class="stage-header__number">${stage.order}</div>
                <div class="stage-header__content">
                  <h2 class="stage-header__title">${getStageTitle(stage, lang)}</h2>
                  <p class="stage-header__description">${getStageDescription(stage, lang)}</p>
                </div>
              </div>
              
              <div class="stage-skills">
                ${stage.skills.map((skill, skillIndex) => {
                  const skillInfo = getSkillInfo(skill.id);
                  const dependencies = learningPathData.getSkillDependencies(skill.id);
                  return `
                    <div class="skill-card" data-skill-id="${skill.id}">
                      <div class="skill-card__header">
                        <span class="skill-card__order">${skill.order}</span>
                        <h3 class="skill-card__title">${getSkillTitle(skillInfo, lang)}</h3>
                        ${skill.required ? '<span class="skill-card__badge skill-card__badge--required">必學</span>' : '<span class="skill-card__badge">選學</span>'}
                      </div>
                      ${skillInfo && skillInfo.description ? `
                        <p class="skill-card__description">${getSkillDescription(skillInfo, lang)}</p>
                      ` : ''}
                      ${dependencies.length > 0 ? `
                        <div class="skill-card__dependencies">
                          <span class="skill-card__dependencies-label">依賴：</span>
                          ${dependencies.map(depId => {
                            const depInfo = getSkillInfo(depId);
                            return depInfo ? `<span class="skill-card__dependency">${getSkillTitle(depInfo, lang)}</span>` : '';
                          }).join('、')}
                        </div>
                      ` : ''}
                      <button class="btn-neu btn-neu--small skill-card__button" data-skill-id="${skill.id}">
                        ${t('common.start') || '開始學習'}
                      </button>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  
  // 綁定事件
  bindLearningPathEvents();
  updateI18n();
  
  // 監聽語言切換
  // 將 handleLanguageChange 存儲在 window 上，以便清理函數可以移除它
  if (!window._learningPathLanguageHandler) {
    window._learningPathLanguageHandler = () => {
      renderLearningPath({ path, params });
    };
  }
  window.removeEventListener('languageChanged', window._learningPathLanguageHandler);
  window.addEventListener('languageChanged', window._learningPathLanguageHandler);
}

/**
 * 清理學習路徑頁面
 */
export function cleanupLearningPath() {
  // 移除語言切換事件監聽器
  if (window._learningPathLanguageHandler) {
    window.removeEventListener('languageChanged', window._learningPathLanguageHandler);
    window._learningPathLanguageHandler = null;
  }
}

/**
 * 獲取技能信息
 */
function getSkillInfo(skillId) {
  return contentIndex.find(item => item.id === skillId);
}

/**
 * 獲取階段標題
 */
function getStageTitle(stage, lang) {
  return stage.title[lang] || stage.title['zh-TW'] || stage.title['en'] || 'Untitled';
}

/**
 * 獲取階段描述
 */
function getStageDescription(stage, lang) {
  return stage.description[lang] || stage.description['zh-TW'] || stage.description['en'] || '';
}

/**
 * 獲取技能標題
 */
function getSkillTitle(skillInfo, lang) {
  if (!skillInfo) return 'Unknown';
  return skillInfo.title[lang] || skillInfo.title['zh-TW'] || skillInfo.title['en'] || 'Untitled';
}

/**
 * 獲取技能描述
 */
function getSkillDescription(skillInfo, lang) {
  if (!skillInfo || !skillInfo.description) return '';
  return skillInfo.description[lang] || skillInfo.description['zh-TW'] || skillInfo.description['en'] || '';
}

/**
 * 綁定學習路徑事件
 */
function bindLearningPathEvents() {
  const skillButtons = document.querySelectorAll('.skill-card__button');
  skillButtons.forEach(btn => {
    const skillId = btn.getAttribute('data-skill-id');
    if (skillId) {
      btn.addEventListener('click', () => {
        router.navigate(`/content/${skillId}`);
      });
    }
  });
}

/**
 * 更新 i18n 文字
 */
function updateI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
}

