/**
 * 搜尋功能
 */
import { contentIndex } from '../data/index.js';
import { getTag } from './translations.js';

/**
 * 搜尋內容
 * @param {string} query - 搜尋關鍵字
 * @param {Object} options - 搜尋選項
 * @returns {Array}
 */
export function searchContent(query, options = {}) {
  const { category, tags, scenario } = options;
  const lowerQuery = query.toLowerCase();
  const lang = document.documentElement.getAttribute('lang') || 'zh-TW';
  
  return contentIndex.filter(item => {
    // 標題搜尋
    const titleMatch = Object.values(item.title)
      .some(title => title.toLowerCase().includes(lowerQuery));
    
    // 內容搜尋（簡化版）
    const contentMatch = item.description 
      ? Object.values(item.description)
          .some(desc => desc.toLowerCase().includes(lowerQuery))
      : false;
    
    // 標籤搜尋（使用翻譯後的標籤）
    const tagMatch = item.tags.some(tag => {
      const translatedTag = getTag(tag, lang);
      return translatedTag.toLowerCase().includes(lowerQuery) || 
             tag.toLowerCase().includes(lowerQuery);
    });
    
    const matchesQuery = titleMatch || contentMatch || tagMatch;
    
    // 分類篩選
    const matchesCategory = !category || item.category.type === category;
    
    // 標籤篩選
    const matchesTags = !tags || tags.length === 0 || 
      tags.some(tag => item.tags.includes(tag));
    
    // 情境篩選
    const matchesScenario = !scenario || 
      item.category.scenario.includes(scenario);
    
    return matchesQuery && matchesCategory && matchesTags && matchesScenario;
  });
}

