/**
 * 內容載入器
 * 實現 lazy loading，只在需要時載入對應的內容文件
 */

import { contentFileMap } from './content-file-map.js';

// 快取已載入的內容模組
const loadedModules = new Map();

/**
 * 載入指定文章 ID 的內容
 * @param {string} id - 文章 ID
 * @returns {Promise<Object|null>} 文章內容或 null
 */
export async function loadContent(id) {
  if (!id) return null;
  
  const filePath = contentFileMap[id];
  if (!filePath) {
    console.warn(`[content-loader] Article "${id}" not found in contentFileMap`);
    return null;
  }
  
  // 如果已經載入過這個模組，直接從快取返回
  if (loadedModules.has(filePath)) {
    const module = loadedModules.get(filePath);
    return module.contentData?.[id] || null;
  }
  
  try {
    // 動態載入模組
    const module = await import(filePath);
    loadedModules.set(filePath, module);
    
    return module.contentData?.[id] || null;
  } catch (error) {
    console.error(`[content-loader] Failed to load content file: ${filePath}`, error);
    return null;
  }
}

/**
 * 預載入多個文章（可選）
 * @param {string[]} ids - 文章 ID 陣列
 */
export async function preloadContent(ids) {
  const filePaths = new Set();
  
  // 收集需要載入的文件路徑
  ids.forEach(id => {
    const filePath = contentFileMap[id];
    if (filePath && !loadedModules.has(filePath)) {
      filePaths.add(filePath);
    }
  });
  
  // 並行載入所有需要的文件
  const loadPromises = Array.from(filePaths).map(async (filePath) => {
    try {
      const module = await import(filePath);
      loadedModules.set(filePath, module);
    } catch (error) {
      console.error(`[content-loader] Failed to preload: ${filePath}`, error);
    }
  });
  
  await Promise.all(loadPromises);
}

/**
 * 清除快取（用於開發時的熱重載）
 */
export function clearCache() {
  loadedModules.clear();
}

