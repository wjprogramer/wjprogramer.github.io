/**
 * 首頁
 */
import { toolsData } from '../data/tools.js';

/**
 * 渲染首頁
 */
export function renderHome() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="page-hero fade-in-up">
      <h1>✨ Coder Toolbox</h1>
      <p>一個實用的程式開發者工具箱</p>
    </div>
    
    <div class="tools-grid">
      ${toolsData.map((category, idx) => `
        <div class="tool-card glass shimmer fade-in-up stagger-${idx + 1}" data-category="${category.id}">
          <div class="card-icon">${getCategoryEmoji(category.id)}</div>
          <h3 class="card-title">${category.name}</h3>
          <p class="card-desc">
            ${category.tools.map(t => t.name).join('、')}
          </p>
        </div>
      `).join('')}
    </div>
    
    <div class="tools-grid" style="margin-top: var(--spacing-lg);">
      ${toolsData.flatMap(category => 
        category.tools.slice(0, 2).map((tool, idx) => `
          <a href="#${tool.path}" class="tool-card glass fade-in-up stagger-${(idx % 4) + 1}">
            <div class="card-icon">
              <span class="material-icons-round">${tool.icon}</span>
            </div>
            <h3 class="card-title">${tool.name}</h3>
            <p class="card-desc">${tool.description}</p>
          </a>
        `)
      ).join('')}
    </div>
  `;

  // 綁定分類卡片點擊
  initHomeEvents();
}

/**
 * 取得分類表情符號
 * @param {string} categoryId
 * @returns {string}
 */
function getCategoryEmoji(categoryId) {
  const emojis = {
    encoding: '🔐',
    code: '📝',
    image: '🖼️',
    text: '📄'
  };
  return emojis[categoryId] || '🛠️';
}

/**
 * 初始化首頁事件
 */
function initHomeEvents() {
  // 分類卡片點擊 - 導向第一個工具
  document.querySelectorAll('.tool-card[data-category]').forEach(card => {
    card.addEventListener('click', () => {
      const categoryId = card.getAttribute('data-category');
      const category = toolsData.find(c => c.id === categoryId);
      if (category && category.tools.length > 0) {
        window.location.hash = category.tools[0].path;
      }
    });
  });
}

