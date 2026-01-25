// 內容詳情頁

import { loadContent } from '../utils/content-loader.js';
import { getLanguage, t, translateTag } from '../utils/i18n.js';
import { favorites } from '../utils/storage.js';
import { router } from '../router.js';
import { contentIndex, vocabularyIndex, kanjiIndex, filteredContentIndex } from '../data/index.js';

/**
 * 將包含 `-` 或數字開頭的條列式文字轉換為 HTML 列表
 */
function formatListText(text) {
  if (!text) return '';
  
  // 按雙換行分割段落
  const paragraphs = text.split('\n\n');
  
  return paragraphs.map(para => {
    if (!para.trim()) return '';
    
    const lines = para.split('\n');
    const result = [];
    let i = 0;
    
    while (i < lines.length) {
      const line = lines[i];
      const trimmed = line.trim();
      
      // 檢查是否是數字列表項（1. 2. 3. 等）
      const numberListMatch = trimmed.match(/^(\d+)\.\s*(.+)$/);
      if (numberListMatch) {
        // 收集所有連續的數字列表項
        const listItems = [];
        
        // 先處理第一個列表項
        let currentItemContent = [numberListMatch[2]];
        let currentItemSubLists = []; // 存儲嵌套的子列表
        i++;
        
        // 繼續收集直到下一個數字列表項或段落結束
        while (i < lines.length) {
          const nextLine = lines[i];
          const nextTrimmed = nextLine.trim();
          const nextIndent = nextLine.match(/^(\s*)/)?.[1].length || 0;
          
          // 檢查是否是同一層級的數字列表項（無縮排或縮排相同）
          const nextNumberMatch = nextTrimmed.match(/^(\d+)\.\s*(.*)$/);
          if (nextNumberMatch && nextIndent === 0) {
            // 遇到下一個數字列表項，先保存當前項目
            let itemHTML = currentItemContent[0];
            // 如果有子列表，添加到項目中
            if (currentItemSubLists.length > 0) {
              itemHTML += currentItemSubLists.join('');
            }
            listItems.push(`<li>${itemHTML}</li>`);
            
            // 開始新的項目
            currentItemContent = nextNumberMatch[2] ? [nextNumberMatch[2]] : [''];
            currentItemSubLists = [];
            i++;
          } else {
            // 檢查是否是嵌套的 `-` 列表（有縮排）
            if (nextTrimmed.startsWith('-') && nextIndent > 0) {
              // 收集所有連續的嵌套列表項
              const subListItems = [];
              const subListStartIndent = nextIndent;
              
              while (i < lines.length) {
                const subLine = lines[i];
                const subTrimmed = subLine.trim();
                const subIndent = subLine.match(/^(\s*)/)?.[1].length || 0;
                
                // 如果縮排回到上層或更淺，停止收集子列表
                if (subIndent < subListStartIndent) {
                  break;
                }
                
                // 如果是同一層級的 `-` 列表項
                if (subTrimmed.startsWith('-') && subIndent === subListStartIndent) {
                  const content = subTrimmed.replace(/^-\s*/, '').trim();
                  subListItems.push(`<li>${content}</li>`);
                  i++;
                } else {
                  // 不是列表項，可能是其他內容，跳過
                  i++;
                  break;
                }
              }
              
              if (subListItems.length > 0) {
                currentItemSubLists.push(`<ul style="margin: var(--spacing-xs) 0; padding-left: var(--spacing-lg); list-style-type: disc;">${subListItems.join('')}</ul>`);
              }
            } else {
              // 如果下一行看起來像是新的段落標題（包含冒號且不是列表項），則停止收集
              if (nextTrimmed && (nextTrimmed.includes('：') || nextTrimmed.includes(':')) && !nextTrimmed.match(/^\d+[\.\)]/) && nextIndent === 0) {
                if (currentItemContent.length === 1 && currentItemSubLists.length === 0) {
                  break;
                }
              }
              
              // 這是當前項目的普通子內容（非列表）
              if (nextIndent > 0) {
                // 有縮排，可能是子內容
                currentItemContent.push(nextTrimmed);
              } else {
                // 無縮排，可能是新段落，停止收集
                break;
              }
              i++;
            }
          }
        }
        
        // 保存最後一個項目
        if (currentItemContent.length > 0) {
          let itemHTML = currentItemContent.join('<br>');
          if (currentItemSubLists.length > 0) {
            itemHTML += currentItemSubLists.join('');
          }
          listItems.push(`<li>${itemHTML}</li>`);
        }
        
        if (listItems.length > 0) {
          result.push(`<ol style="margin: var(--spacing-sm) 0; padding-left: var(--spacing-lg); list-style-type: decimal;">${listItems.join('')}</ol>`);
        }
      }
      // 檢查是否是 `-` 列表項（頂層，無縮排）
      else if (trimmed.startsWith('-') && line.match(/^(\s*)/)?.[1].length === 0) {
        // 收集連續的列表項
        const listItems = [];
        while (i < lines.length) {
          const nextLine = lines[i];
          const nextTrimmed = nextLine.trim();
          const nextIndent = nextLine.match(/^(\s*)/)?.[1].length || 0;
          
          // 如果縮排更深，可能是嵌套列表，跳過（由數字列表處理）
          if (nextIndent > 0) {
            i++;
            continue;
          }
          
          if (nextTrimmed.startsWith('-')) {
            const content = nextTrimmed.replace(/^-\s*/, '').trim();
            listItems.push(`<li>${content}</li>`);
            i++;
          } else {
            break;
          }
        }
        
        if (listItems.length > 0) {
          result.push(`<ul style="margin: var(--spacing-sm) 0; padding-left: var(--spacing-lg); list-style-type: disc;">${listItems.join('')}</ul>`);
        }
      } else {
        // 普通文字行（可能是標題或說明文字）
        result.push(`<p style="margin-bottom: var(--spacing-sm);">${trimmed}</p>`);
        i++;
      }
    }
    
    return result.join('');
  }).join('');
}

// 取得上一個 / 下一個內容（根據路由過濾）
async function getPrevNextItems(currentId, path) {
  // 根據路由決定使用哪個索引
  let targetIndex;
  if (path.startsWith('/vocabulary/')) {
    targetIndex = vocabularyIndex;
  } else if (path.startsWith('/kanji/')) {
    targetIndex = kanjiIndex;
  } else if (path.startsWith('/categories/')) {
    // 對於分類頁面，只顯示主題單字（id 以 category- 開頭或包含 topic-category tag）
    targetIndex = vocabularyIndex.filter(item => {
      const tags = item.tags || [];
      return item.id.startsWith('category-') || tags.includes('topic-category');
    });
  } else if (path.startsWith('/content/')) {
    targetIndex = filteredContentIndex;
  } else {
    // 默認使用完整索引
    targetIndex = contentIndex;
  }

  const index = targetIndex.findIndex(item => item.id === currentId);
  if (index === -1) {
    return { prevItem: null, nextItem: null };
  }

  const prevItem = index > 0 ? targetIndex[index - 1] : null;
  const nextItem = index < targetIndex.length - 1 ? targetIndex[index + 1] : null;

  return { prevItem, nextItem };
}

// 渲染上一個 / 下一個內容導覽區塊
function renderPrevNextSection(prevItem, nextItem, lang, linkPrefix = '/content') {
  if (!prevItem && !nextItem) return '';

  const prevLabel = prevItem
    ? (prevItem.title?.[lang] || prevItem.title?.['zh-TW'] || prevItem.id)
    : '';
  const nextLabel = nextItem
    ? (nextItem.title?.[lang] || nextItem.title?.['zh-TW'] || nextItem.id)
    : '';

  return `
    <div class="content-detail__section content-detail__nav">
      ${prevItem ? `
        <a href="#${linkPrefix}/${prevItem.id}" class="content-detail__nav-item content-detail__nav-item--prev" title="${prevLabel}">
          <span class="content-detail__nav-icon content-detail__nav-icon--prev"></span>
          <span class="content-detail__nav-text">${prevLabel}</span>
        </a>
      ` : ''}
      ${nextItem ? `
        <a href="#${linkPrefix}/${nextItem.id}" class="content-detail__nav-item content-detail__nav-item--next" title="${nextLabel}">
          <span class="content-detail__nav-text">${nextLabel}</span>
          <span class="content-detail__nav-icon content-detail__nav-icon--next"></span>
        </a>
      ` : ''}
    </div>
  `;
}

export async function renderContentDetail({ routeParams, path }) {
  const mainContent = document.getElementById('main-content');
  if (!mainContent) return;

  const contentId = routeParams.id;
  if (!contentId) {
    router.navigate('/');
    return;
  }

  // 載入內容
  const content = await loadContent(contentId);
  
  if (!content) {
    const lang = getLanguage();
    mainContent.innerHTML = `
      <div class="page-enter">
        <div class="content-detail">
          <h1 class="content-detail__title">${t('content.notFound.title')}</h1>
          <p>${t('content.notFound.message').replace('{id}', contentId)}</p>
          <a href="#/" class="btn btn--primary" style="margin-top: var(--spacing-lg);">${t('content.notFound.back')}</a>
        </div>
      </div>
    `;
    return;
  }

  const lang = getLanguage();
  const isFavorite = favorites.has(contentId);

  // 根據當前路由決定上一個/下一個內容
  const currentPath = router.getCurrentPath();
  const { prevItem, nextItem } = await getPrevNextItems(contentId, currentPath);
  
  // 根據路由決定返回連結的前綴
  let linkPrefix = '/content';
  if (currentPath.startsWith('/vocabulary/')) {
    linkPrefix = '/vocabulary';
  } else if (currentPath.startsWith('/kanji/')) {
    linkPrefix = '/kanji';
  } else if (currentPath.startsWith('/categories/')) {
    linkPrefix = '/categories';
  }

  // 根據內容類型渲染不同的詳情頁
  let detailHTML = '';

  if (content.category.type === 'grammar') {
    detailHTML = renderGrammarDetail(content, lang, isFavorite, prevItem, nextItem, linkPrefix);
  } else if (content.category.type === 'goshu' || content.category.type === 'vocabulary') {
    detailHTML = renderVocabularyDetail(content, lang, isFavorite, prevItem, nextItem, linkPrefix);
  } else if (content.category.type === 'kanji') {
    detailHTML = renderKanjiDetail(content, lang, isFavorite, prevItem, nextItem, linkPrefix);
  } else if (content.category.type === 'kana') {
    detailHTML = renderKanaDetail(content, lang, isFavorite, prevItem, nextItem, linkPrefix);
  } else {
    detailHTML = renderGenericDetail(content, lang, isFavorite, prevItem, nextItem, linkPrefix);
  }

  mainContent.innerHTML = `<div class="page-enter">${detailHTML}</div>`;

  // 綁定收藏按鈕事件
  const favoriteBtn = document.getElementById('favorite-btn');
  if (favoriteBtn) {
    favoriteBtn.addEventListener('click', () => {
      const wasFavorite = favorites.has(contentId);
      if (wasFavorite) {
        favorites.remove(contentId);
      } else {
        favorites.add(contentId);
      }
      
      // 只更新按鈕圖標，不重新渲染整個頁面
      const icon = favoriteBtn.querySelector('span');
      if (icon) {
        icon.textContent = wasFavorite ? '☆' : '⭐';
      }
    });
  }
}

function renderGrammarDetail(content, lang, isFavorite, prevItem, nextItem, linkPrefix = '/content') {
  const title = content.title[lang] || content.title['zh-TW'];
  const overview = content.content?.overview?.[lang] || content.content?.overview?.['zh-TW'] || '';
  const usage = content.content?.usage?.[lang] || content.content?.usage?.['zh-TW'] || '';
  const examples = content.content?.examples || [];
  const commonMistakes = content.content?.commonMistakes || [];
  const relatedContent = content.content?.relatedContent || [];

  return `
    <div class="content-detail">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: var(--spacing-md);">
        <h1 class="content-detail__title">${title}</h1>
        <button id="favorite-btn" class="header__action-btn" style="width: 40px; height: 40px;">
          <span>${isFavorite ? '⭐' : '☆'}</span>
        </button>
      </div>
      
      <div class="content-detail__meta">
        <span class="tag tag--category">${t('content.category.grammar')}</span>
        <span>${t('content.difficulty')}${content.category.level}</span>
        ${content.tags.map(tag => `<span class="tag">${translateTag(tag)}</span>`).join('')}
      </div>

      ${overview ? `
        <div class="content-detail__section">
          <h2 class="content-detail__section-title">${t('content.overview')}</h2>
          <p class="japanese-paragraph">${overview}</p>
        </div>
      ` : ''}

      ${content.content?.table ? `
        <div class="content-detail__section">
          <div style="overflow-x: auto;">
            ${content.content.table[lang] || content.content.table['zh-TW']}
          </div>
        </div>
      ` : ''}

      ${usage ? `
        <div class="content-detail__section">
          <h2 class="content-detail__section-title">${t('content.usage')}</h2>
          <div>
            ${formatListText(usage)}
          </div>
        </div>
      ` : ''}

      ${examples.length > 0 ? `
        <div class="content-detail__section">
          <h2 class="content-detail__section-title">${t('content.examples')}</h2>
          ${examples.map(example => `
            <div class="japanese-example">
              <div class="japanese-text" style="font-size: var(--text-lg); margin-bottom: var(--spacing-sm);">
                ${example.japanese}
              </div>
              <div style="margin-bottom: var(--spacing-sm);">
                <strong>${t(lang === 'en' ? 'content.translation.en' : 'content.translation.zh')}：</strong>${example[lang === 'en' ? 'en' : 'zhTW']}
              </div>
              ${example.explanation ? `
                <div style="color: var(--text-secondary); font-size: var(--text-sm);">
                  ${example.explanation[lang] || example.explanation['zh-TW']}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${content.content?.comparison ? `
        <div class="content-detail__section">
          <h2 class="content-detail__section-title">${t('content.comparison')}</h2>
          <div>
            ${formatListText(content.content.comparison[lang] || content.content.comparison['zh-TW'])}
          </div>
        </div>
      ` : ''}

      ${content.content?.verbConjugation ? `
        <div class="content-detail__section">
          <h2 class="content-detail__section-title">${t('content.verbConjugation')}</h2>
          <div>
            ${formatListText(content.content.verbConjugation[lang] || content.content.verbConjugation['zh-TW'])}
          </div>
        </div>
      ` : ''}

      ${content.content?.commonAdjectives ? `
        <div class="content-detail__section">
          <h2 class="content-detail__section-title">${t('content.commonAdjectives')}</h2>
          ${content.content.commonAdjectives.map(adj => `
            <div style="margin-bottom: var(--spacing-md); padding: var(--spacing-md); background: var(--bg-secondary); border-radius: var(--radius-sm);">
              <div class="japanese-text" style="font-size: var(--text-lg); margin-bottom: var(--spacing-xs);">
                ${adj.japanese}
              </div>
              <div>
                ${adj.meaning[lang] || adj.meaning['zh-TW']}
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${commonMistakes.length > 0 ? `
        <div class="content-detail__section">
          <h2 class="content-detail__section-title">${t('content.commonMistakes')}</h2>
          ${commonMistakes.map(mistake => `
            <div style="margin-bottom: var(--spacing-lg); padding: var(--spacing-md); background: var(--bg-secondary); border-radius: var(--radius-sm);">
              <div style="color: var(--error); margin-bottom: var(--spacing-sm);">
                ❌ ${mistake.mistake[lang] || mistake.mistake['zh-TW']}
              </div>
              <div style="color: var(--success); margin-bottom: var(--spacing-sm);">
                ✅ ${mistake.correct[lang] || mistake.correct['zh-TW']}
              </div>
              <div style="color: var(--text-secondary); font-size: var(--text-sm);">
                ${mistake.explanation[lang] || mistake.explanation['zh-TW']}
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${relatedContent.length > 0 ? `
        <div class="content-detail__section">
          <h2 class="content-detail__section-title">${t('content.relatedContent')}</h2>
          <div style="display: flex; gap: var(--spacing-md); flex-wrap: wrap;">
            ${relatedContent.map(item => `
              <a href="#/content/${item.id}" class="tag tag--category">
                ${item.title[lang] || item.title['zh-TW']}
              </a>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${renderPrevNextSection(prevItem, nextItem, lang, linkPrefix)}
    </div>
  `;
}

function renderVocabularyDetail(content, lang, isFavorite, prevItem, nextItem, linkPrefix = '/content') {
  const title = content.title[lang] || content.title['zh-TW'];
  const japanese = content.japanese || '';
  const meaning = content.meaning?.[lang] || content.meaning?.['zh-TW'] || '';
  const overview = content.content?.overview?.[lang] || content.content?.overview?.['zh-TW'] || '';
  const examples = content.content?.examples || [];
  const relatedWords = content.content?.relatedWords || [];

  return `
    <div class="content-detail">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: var(--spacing-md);">
        <h1 class="content-detail__title">${title}</h1>
        <button id="favorite-btn" class="header__action-btn" style="width: 40px; height: 40px;">
          <span>${isFavorite ? '⭐' : '☆'}</span>
        </button>
      </div>

      ${japanese ? `
        <div class="content-detail__japanese">
          <div class="japanese-text" style="font-size: var(--text-2xl); margin-bottom: var(--spacing-sm);">
            ${japanese}
          </div>
          ${meaning ? `<div style="margin-top: var(--spacing-sm); font-size: var(--text-lg);">${meaning}</div>` : ''}
        </div>
      ` : ''}

      <div class="content-detail__meta">
        <span class="tag tag--category">${t(`content.category.${content.category.type}`) || t('content.category.vocabulary')}</span>
        <span>${t('content.difficulty')}${content.category.level}</span>
        ${content.tags.map(tag => `<span class="tag">${translateTag(tag)}</span>`).join('')}
      </div>

      ${overview ? `
        <div class="content-detail__section">
          <h2 class="content-detail__section-title">${t('content.description')}</h2>
          <p class="japanese-paragraph">${overview}</p>
        </div>
      ` : ''}

      ${content.content?.usage ? `
        <div class="content-detail__section">
          <h2 class="content-detail__section-title">${t('content.usageMethod')}</h2>
          <div style="padding: var(--spacing-md); background: var(--bg-secondary); border-radius: var(--radius-sm);">
            ${formatListText(content.content.usage[lang] || content.content.usage['zh-TW'])}
          </div>
        </div>
      ` : ''}

      ${examples.length > 0 ? `
        <div class="content-detail__section">
          <h2 class="content-detail__section-title">${t('content.examples')}</h2>
          ${examples.map(example => `
            <div class="japanese-example">
              <div class="japanese-text" style="font-size: var(--text-lg); margin-bottom: var(--spacing-sm);">
                ${example.japanese}
              </div>
              <div style="margin-bottom: var(--spacing-sm);">
                <strong>${t(lang === 'en' ? 'content.translation.en' : 'content.translation.zh')}：</strong>${example[lang === 'en' ? 'en' : 'zhTW']}
              </div>
              ${example.explanation ? `
                <div style="color: var(--text-secondary); font-size: var(--text-sm);">
                  ${example.explanation[lang] || example.explanation['zh-TW']}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${content.content?.verbForms ? `
        <div class="content-detail__section">
          <h2 class="content-detail__section-title">${t('content.verbForms')}</h2>
          <div style="padding: var(--spacing-md); background: var(--bg-secondary); border-radius: var(--radius-sm);">
            ${formatListText(content.content.verbForms[lang] || content.content.verbForms['zh-TW'])}
          </div>
        </div>
      ` : ''}

      ${content.content?.compoundVerbs ? `
        <div class="content-detail__section">
          <h2 class="content-detail__section-title">${t('content.compoundVerbs')}</h2>
          <div style="padding: var(--spacing-md); background: var(--bg-secondary); border-radius: var(--radius-sm); white-space: pre-line;">${content.content.compoundVerbs[lang] || content.content.compoundVerbs['zh-TW']}
          </div>
        </div>
      ` : ''}

      ${content.content?.notes ? `
        <div class="content-detail__section">
          <h2 class="content-detail__section-title">${t('content.notes')}</h2>
          <div style="padding: var(--spacing-md); background: var(--bg-secondary); border-radius: var(--radius-sm);">
            ${formatListText(content.content.notes[lang] || content.content.notes['zh-TW'])}
          </div>
        </div>
      ` : ''}

      ${content.content?.vocabulary && Array.isArray(content.content.vocabulary) && content.content.vocabulary.length > 0 ? `
        <div class="content-detail__section">
          <h2 class="content-detail__section-title">${t('content.vocabularyList')}</h2>
          <div class="vocabulary-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: var(--spacing-md);">
            ${content.content.vocabulary.map(word => `
              <div class="vocabulary-item" style="padding: var(--spacing-md); background: var(--bg-secondary); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
                <div class="japanese-text" style="font-size: var(--text-lg); margin-bottom: var(--spacing-xs);">
                  ${word.japanese}
                </div>
                <div style="font-size: var(--text-sm); color: var(--text-primary); margin-bottom: var(--spacing-xs);">
                  ${word[lang === 'en' ? 'en' : 'zhTW']}
                </div>
                ${word.notes ? `
                  <div style="font-size: var(--text-xs); color: var(--text-secondary);">
                    ${word.notes[lang] || word.notes['zh-TW']}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${relatedWords.length > 0 ? `
        <div class="content-detail__section">
          <h2 class="content-detail__section-title">${t('content.relatedWords')}</h2>
          <div style="display: flex; gap: var(--spacing-md); flex-wrap: wrap;">
            ${relatedWords.map(item => `
              <a href="#/content/${item.id}" class="tag tag--category">
                ${item.title[lang] || item.title['zh-TW']}
              </a>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${renderPrevNextSection(prevItem, nextItem, lang, linkPrefix)}
    </div>
  `;
}

function renderKanjiDetail(content, lang, isFavorite, prevItem, nextItem, linkPrefix = '/content') {
  const title = content.title[lang] || content.title['zh-TW'];
  const kanji = content.kanji || '';
  const readings = content.readings || {};
  const meaning = content.meaning?.[lang] || content.meaning?.['zh-TW'] || '';
  const commonWords = content.content?.commonWords || [];
  const relatedKanji = content.content?.relatedKanji || [];

  return `
    <div class="content-detail">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: var(--spacing-md);">
        <h1 class="content-detail__title">${title}</h1>
        <button id="favorite-btn" class="header__action-btn" style="width: 40px; height: 40px;">
          <span>${isFavorite ? '⭐' : '☆'}</span>
        </button>
      </div>

      ${kanji ? `
        <div class="content-detail__japanese">
          <div class="japanese-text" style="font-size: 64px; margin-bottom: var(--spacing-md); text-align: center;">
            ${kanji}
          </div>
          ${meaning ? `<div style="text-align: center; font-size: var(--text-lg);">${meaning}</div>` : ''}
        </div>
      ` : ''}

      <div class="content-detail__meta">
        <span class="tag tag--category">${t('content.category.kanji')}</span>
        <span>${t('content.difficulty')}${content.category.level}</span>
        ${content.tags.map(tag => `<span class="tag">${translateTag(tag)}</span>`).join('')}
      </div>

      ${readings.on && readings.on.length > 0 ? `
        <div class="content-detail__section">
          <h2 class="content-detail__section-title">${t('content.onReading')}</h2>
          <div style="display: flex; gap: var(--spacing-md); flex-wrap: wrap;">
            ${readings.on.map(reading => `<span class="tag">${reading}</span>`).join('')}
          </div>
        </div>
      ` : ''}

      ${readings.kun && readings.kun.length > 0 ? `
        <div class="content-detail__section">
          <h2 class="content-detail__section-title">${t('content.kunReading')}</h2>
          <div style="display: flex; gap: var(--spacing-md); flex-wrap: wrap;">
            ${readings.kun.map(reading => `<span class="tag">${reading}</span>`).join('')}
          </div>
        </div>
      ` : ''}

      ${commonWords.length > 0 ? `
        <div class="content-detail__section">
          <h2 class="content-detail__section-title">${t('content.commonWords')}</h2>
          ${commonWords.map(word => `
            <div style="margin-bottom: var(--spacing-md); padding: var(--spacing-md); background: var(--bg-secondary); border-radius: var(--radius-sm);">
              <div class="japanese-text" style="font-size: var(--text-lg); margin-bottom: var(--spacing-xs);">
                ${word.word}
              </div>
              <div>
                ${word.meaning[lang] || word.meaning['zh-TW']}
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${relatedKanji.length > 0 ? `
        <div class="content-detail__section">
          <h2 class="content-detail__section-title">${t('content.relatedKanji')}</h2>
          <div style="display: flex; gap: var(--spacing-md); flex-wrap: wrap;">
            ${relatedKanji.map(item => `
              <a href="#/content/${item.id}" class="tag tag--category">
                ${item.title[lang] || item.title['zh-TW']}
              </a>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${renderPrevNextSection(prevItem, nextItem, lang, linkPrefix)}
    </div>
  `;
}

function renderKanaDetail(content, lang, isFavorite, prevItem, nextItem, linkPrefix = '/content') {
  const title = content.title[lang] || content.title['zh-TW'];
  const overview = content.content?.overview?.[lang] || content.content?.overview?.['zh-TW'] || '';
  const usage = content.content?.usage?.[lang] || content.content?.usage?.['zh-TW'] || '';
  const examples = content.content?.examples || [];
  const relatedContent = content.content?.relatedContent || [];

  return `
    <div class="content-detail">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: var(--spacing-md);">
        <h1 class="content-detail__title">${title}</h1>
        <button id="favorite-btn" class="header__action-btn" style="width: 40px; height: 40px;">
          <span>${isFavorite ? '⭐' : '☆'}</span>
        </button>
      </div>
      
      <div class="content-detail__meta">
        <span class="tag tag--category">${t('content.category.kana')}</span>
        <span>${t('content.difficulty')}${content.category.level}</span>
        ${content.tags.map(tag => `<span class="tag">${translateTag(tag)}</span>`).join('')}
      </div>

      ${overview ? `
        <div class="content-detail__section">
          <h2 class="content-detail__section-title">${t('content.overview')}</h2>
          <p class="japanese-paragraph">${overview}</p>
        </div>
      ` : ''}

      ${content.content?.table ? `
        <div class="content-detail__section">
          <div style="overflow-x: auto;">
            ${content.content.table[lang] || content.content.table['zh-TW']}
          </div>
        </div>
      ` : ''}

      ${usage ? `
        <div class="content-detail__section">
          <h2 class="content-detail__section-title">${t('content.usage')}</h2>
          <div style="padding: var(--spacing-md); background: var(--bg-secondary); border-radius: var(--radius-sm);">
            ${formatListText(usage)}
          </div>
        </div>
      ` : ''}

      ${examples.length > 0 ? `
        <div class="content-detail__section">
          <h2 class="content-detail__section-title">${t('content.examples')}</h2>
          ${examples.map(example => `
            <div class="japanese-example">
              <div class="japanese-text" style="font-size: var(--text-lg); margin-bottom: var(--spacing-sm);">
                ${example.japanese}
              </div>
              <div style="margin-bottom: var(--spacing-sm);">
                <strong>${t(lang === 'en' ? 'content.translation.en' : 'content.translation.zh')}：</strong>${example[lang === 'en' ? 'en' : 'zhTW']}
              </div>
              ${example.explanation ? `
                <div style="color: var(--text-secondary); font-size: var(--text-sm);">
                  ${example.explanation[lang] || example.explanation['zh-TW']}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${content.content?.notes ? `
        <div class="content-detail__section">
          <h2 class="content-detail__section-title">${t('content.notes')}</h2>
          <div style="padding: var(--spacing-md); background: var(--bg-secondary); border-radius: var(--radius-sm);">
            ${formatListText(content.content.notes[lang] || content.content.notes['zh-TW'])}
          </div>
        </div>
      ` : ''}

      ${relatedContent.length > 0 ? `
        <div class="content-detail__section">
          <h2 class="content-detail__section-title">${t('content.relatedContent')}</h2>
          <div style="display: flex; gap: var(--spacing-md); flex-wrap: wrap;">
            ${relatedContent.map(item => `
              <a href="#/content/${item.id}" class="tag tag--category">
                ${item.title[lang] || item.title['zh-TW']}
              </a>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${renderPrevNextSection(prevItem, nextItem, lang, linkPrefix)}
    </div>
  `;
}

function renderGenericDetail(content, lang, isFavorite, prevItem, nextItem, linkPrefix = '/content') {
  const title = content.title[lang] || content.title['zh-TW'];
  const description = content.description?.[lang] || content.description?.['zh-TW'] || '';

  return `
    <div class="content-detail">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: var(--spacing-md);">
        <h1 class="content-detail__title">${title}</h1>
        <button id="favorite-btn" class="header__action-btn" style="width: 40px; height: 40px;">
          <span>${isFavorite ? '⭐' : '☆'}</span>
        </button>
      </div>

      <div class="content-detail__meta">
        <span class="tag tag--category">${t(`content.category.${content.category.type}`) || content.category.type}</span>
        <span>${t('content.difficulty')}${content.category.level}</span>
        ${content.tags.map(tag => `<span class="tag">${translateTag(tag)}</span>`).join('')}
      </div>

      ${description ? `
        <div class="content-detail__section">
          <p class="japanese-paragraph">${description}</p>
        </div>
      ` : ''}

      ${renderPrevNextSection(prevItem, nextItem, lang, linkPrefix)}
    </div>
  `;
}

