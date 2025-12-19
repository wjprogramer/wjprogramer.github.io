/**
 * Sidebar 元件
 */
import { router } from '../router.js';
import { toolsData } from '../data/tools.js';

let isSidebarOpen = false;

/**
 * 渲染 Sidebar
 */
export function renderSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const currentPath = router.getCurrentPath();

  let html = '';

  // 依照分類渲染工具列表
  toolsData.forEach(category => {
    html += `
      <div class="sidebar-category">
        <div class="category-title">
          <span class="material-icons-round">${category.icon}</span>
          ${category.name}
        </div>
        ${category.tools.map(tool => `
          <a href="#${tool.path}" 
             class="sidebar-item ${currentPath === tool.path ? 'active' : ''}"
             data-path="${tool.path}">
            <span class="material-icons-round">${tool.icon}</span>
            ${tool.name}
          </a>
        `).join('')}
      </div>
    `;
  });

  sidebar.innerHTML = html;

  // 綁定事件
  initSidebarEvents();
}

/**
 * 初始化 Sidebar 事件
 */
function initSidebarEvents() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  // 點擊項目後關閉 sidebar (mobile)
  sidebar?.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 959) {
        closeSidebar();
      }
    });
  });

  // 點擊遮罩關閉
  overlay?.addEventListener('click', closeSidebar);
}

/**
 * 更新 Sidebar 選中狀態
 */
export function updateSidebarActive() {
  const currentPath = router.getCurrentPath();
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  sidebar.querySelectorAll('.sidebar-item').forEach(item => {
    const path = item.getAttribute('data-path');
    if (path === currentPath) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

/**
 * 切換 Sidebar
 */
export function toggleSidebar() {
  if (isSidebarOpen) {
    closeSidebar();
  } else {
    openSidebar();
  }
}

/**
 * 開啟 Sidebar
 */
export function openSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  
  sidebar?.classList.add('active');
  overlay?.classList.add('active');
  isSidebarOpen = true;
  
  // 防止背景滾動
  document.body.style.overflow = 'hidden';
}

/**
 * 關閉 Sidebar
 */
export function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  
  sidebar?.classList.remove('active');
  overlay?.classList.remove('active');
  isSidebarOpen = false;
  
  // 恢復背景滾動
  document.body.style.overflow = '';
}

