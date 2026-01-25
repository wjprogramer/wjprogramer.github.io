/**
 * Navigation 元件
 */
import { t } from '../utils/i18n.js';
import { router } from '../router.js';

/**
 * 渲染 Sidebar
 */
export function renderSidebar() {
  const sidebarDesktop = document.getElementById('sidebar-desktop');
  const sidebarMobile = document.getElementById('sidebar-mobile');
  
  // Desktop sidebar 不需要關閉按鈕
  const sidebarDesktopHTML = `
    <nav class="sidebar__nav">
      <a href="#/" class="nav-item" data-route="/">
        <span class="material-icons-round nav-item__icon">home</span>
        <span data-i18n="nav.home">首頁</span>
      </a>
      
      <a href="#/content" class="nav-item" data-route="/content">
        <span class="material-icons-round nav-item__icon">article</span>
        <span data-i18n="nav.content">內容</span>
      </a>
      
      <a href="#/learning-path" class="nav-item" data-route="/learning-path">
        <span class="material-icons-round nav-item__icon">route</span>
        <span data-i18n="nav.learning-path">學習路徑</span>
      </a>
      
      <a href="#/favorites" class="nav-item" data-route="/favorites">
        <span class="material-icons-round nav-item__icon">favorite</span>
        <span data-i18n="nav.favorites">收藏</span>
      </a>
      
      <a href="#/scoreboard" class="nav-item" data-route="/scoreboard">
        <span class="material-icons-round nav-item__icon">score</span>
        <span data-i18n="nav.scoreboard">記分板</span>
      </a>
      
      <a href="#/model-viewer" class="nav-item" data-route="/model-viewer">
        <span class="material-icons-round nav-item__icon">3d_rotation</span>
        <span data-i18n="nav.model-viewer">3D 模型</span>
      </a>
    </nav>
  `;

  // Mobile sidebar 需要關閉按鈕
  const sidebarMobileHTML = `
    <div class="sidebar__header">
      <span class="material-icons-round sidebar__icon">sports_tennis</span>
    </div>
    <button class="sidebar__close-btn" id="sidebar-close-btn" aria-label="關閉選單">
      <span class="material-icons-round">close</span>
    </button>
    <nav class="sidebar__nav">
      <a href="#/" class="nav-item" data-route="/">
        <span class="material-icons-round nav-item__icon">home</span>
        <span data-i18n="nav.home">首頁</span>
      </a>
      
      <a href="#/content" class="nav-item" data-route="/content">
        <span class="material-icons-round nav-item__icon">article</span>
        <span data-i18n="nav.content">內容</span>
      </a>
      
      <a href="#/learning-path" class="nav-item" data-route="/learning-path">
        <span class="material-icons-round nav-item__icon">route</span>
        <span data-i18n="nav.learning-path">學習路徑</span>
      </a>
      
      <a href="#/favorites" class="nav-item" data-route="/favorites">
        <span class="material-icons-round nav-item__icon">favorite</span>
        <span data-i18n="nav.favorites">收藏</span>
      </a>
      
      <a href="#/scoreboard" class="nav-item" data-route="/scoreboard">
        <span class="material-icons-round nav-item__icon">score</span>
        <span data-i18n="nav.scoreboard">記分板</span>
      </a>
      
      <a href="#/model-viewer" class="nav-item" data-route="/model-viewer">
        <span class="material-icons-round nav-item__icon">3d_rotation</span>
        <span data-i18n="nav.model-viewer">3D 模型</span>
      </a>
    </nav>
  `;

  // 渲染到兩個 sidebar
  if (sidebarDesktop) {
    sidebarDesktop.innerHTML = sidebarDesktopHTML;
  }
  if (sidebarMobile) {
    sidebarMobile.innerHTML = sidebarMobileHTML;
    // 確保 mobile sidebar 初始狀態在螢幕下方，避免閃爍
    sidebarMobile.style.transform = 'translateY(100%)';
    sidebarMobile.classList.remove('app-sidebar--mobile--open', 'app-sidebar--mobile--closing');
    // 使用 requestAnimationFrame 確保在下一幀啟用 transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        sidebarMobile.classList.add('app-sidebar--mobile--ready');
      });
    });
  }

  // 綁定事件
  bindSidebarEvents();
  bindOverlayEvents();
  bindCloseButton();
  bindKeyboardEvents();
  bindResizeEvents();
  updateActiveNav();
  updateI18n();
}

/**
 * 綁定視窗大小改變事件
 */
function bindResizeEvents() {
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      handleResize();
    }, 100);
  });
}

/**
 * 綁定 Sidebar 事件
 */
function bindSidebarEvents() {
  // 為兩個 sidebar 都綁定事件
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const route = item.getAttribute('data-route');
      if (route) {
        router.navigate(route);
        updateActiveNav();
        // 只關閉 mobile sidebar（如果當前是窄螢幕）
        if (window.innerWidth <= 959) {
          closeSidebar();
        }
      }
    });
  });
}

/**
 * 綁定 Overlay 事件
 */
function bindOverlayEvents() {
  const overlay = document.getElementById('sidebar-overlay');
  if (overlay) {
    overlay.addEventListener('click', () => {
      closeSidebar();
    });
  }
}

/**
 * 綁定關閉按鈕事件
 */
function bindCloseButton() {
  // 現在只有 mobile sidebar 有關閉按鈕
  const closeBtn = document.getElementById('sidebar-close-btn');
  if (closeBtn) {
    // 移除舊的事件監聽器（如果有的話），避免重複綁定
    const newCloseBtn = closeBtn.cloneNode(true);
    closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
    
    newCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeSidebar();
    });
  }
}

/**
 * 綁定鍵盤事件（ESC 和後退鍵）
 */
let sidebarStatePushed = false;

function bindKeyboardEvents() {
  // ESC 鍵關閉
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const sidebarMobile = document.getElementById('sidebar-mobile');
      if (sidebarMobile && sidebarMobile.classList.contains('app-sidebar--mobile--open')) {
        if (window.innerWidth <= 959) {
          closeSidebar();
        }
      }
    }
  });
  
  // 行動裝置後退鍵關閉（使用 popstate 事件）
  window.addEventListener('popstate', (e) => {
    const sidebarMobile = document.getElementById('sidebar-mobile');
    if (sidebarMobile && sidebarMobile.classList.contains('app-sidebar--mobile--open')) {
      if (window.innerWidth <= 959) {
        // 如果這是因為 sidebar 打開而 pushState 的狀態，就關閉 sidebar
        if (sidebarStatePushed && e.state && e.state.sidebarOpen) {
          closeSidebar();
          sidebarStatePushed = false;
        }
      }
    }
  });
  
  // 監聽 mobile sidebar 打開事件，pushState
  const sidebarMobile = document.getElementById('sidebar-mobile');
  if (sidebarMobile) {
    const observer = new MutationObserver(() => {
      if (sidebarMobile.classList.contains('app-sidebar--mobile--open') && !sidebarStatePushed) {
        if (window.innerWidth <= 959) {
          history.pushState({ sidebarOpen: true }, '', window.location.href);
          sidebarStatePushed = true;
        }
      } else if (!sidebarMobile.classList.contains('app-sidebar--mobile--open') && sidebarStatePushed) {
        sidebarStatePushed = false;
      }
    });
    
    observer.observe(sidebarMobile, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
}

/**
 * 更新活動導航項目
 */
export function updateActiveNav() {
  const currentPath = router.getCurrentPath();
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    const route = item.getAttribute('data-route');
    // 對於記分板，如果當前路徑是 /scoreboard 或 /scoreboard/match，都應該高亮
    if (route === currentPath || 
        (route === '/' && currentPath === '/') ||
        (route === '/scoreboard' && (currentPath === '/scoreboard' || currentPath === '/scoreboard/match'))) {
      item.classList.add('nav-item--active');
    } else {
      item.classList.remove('nav-item--active');
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

/**
 * 切換側邊欄（手機版）
 */
export function toggleSidebar() {
  if (window.innerWidth <= 959) {
    const sidebarMobile = document.getElementById('sidebar-mobile');
    
    if (sidebarMobile) {
      const isOpen = sidebarMobile.classList.contains('app-sidebar--mobile--open');
      
      if (isOpen) {
        closeSidebar();
      } else {
        openSidebar();
      }
    }
  }
}

/**
 * 打開側邊欄（窄螢幕）
 */
function openSidebar() {
  if (window.innerWidth <= 959) {
    const sidebarMobile = document.getElementById('sidebar-mobile');
    
    if (sidebarMobile) {
      // 確保 transition 已啟用
      if (!sidebarMobile.classList.contains('app-sidebar--mobile--ready')) {
        sidebarMobile.classList.add('app-sidebar--mobile--ready');
      }
      
      // 先確保 sidebar 在初始位置（下方），移除所有狀態類
      sidebarMobile.classList.remove('app-sidebar--mobile--open', 'app-sidebar--mobile--closing');
      // 強制設置初始位置
      sidebarMobile.style.transform = 'translateY(100%)';
      
      // 使用 requestAnimationFrame 確保瀏覽器先渲染初始狀態
      requestAnimationFrame(() => {
        // 然後添加打開狀態，觸發從下到上的動畫
        sidebarMobile.classList.add('app-sidebar--mobile--open');
        sidebarMobile.style.transform = ''; // 清除 inline style，讓 CSS 類控制
      });
      
      // 防止背景滾動
      document.body.style.overflow = 'hidden';
      
      // 為後退鍵做準備（pushState 以便後退鍵可以關閉）
      if (!history.state || !history.state.sidebarOpen) {
        history.pushState({ sidebarOpen: true }, '', window.location.href);
      }
    }
  }
}

/**
 * 關閉側邊欄（窄螢幕）
 */
export function closeSidebar() {
  if (window.innerWidth <= 959) {
    const sidebarMobile = document.getElementById('sidebar-mobile');
    
    if (sidebarMobile) {
      // 添加關閉狀態，觸發從上到下的動畫
      sidebarMobile.classList.add('app-sidebar--mobile--closing');
      sidebarMobile.classList.remove('app-sidebar--mobile--open');
      sidebarMobile.style.transform = ''; // 清除 inline style，讓 CSS 類控制
      
      // 恢復背景滾動
      document.body.style.overflow = '';
      
      // 動畫完成後移除關閉狀態
      setTimeout(() => {
        sidebarMobile.classList.remove('app-sidebar--mobile--closing');
        sidebarMobile.style.transform = 'translateY(100%)'; // 確保回到初始位置
      }, 300); // 與 transition 時間一致
    }
  }
}

/**
 * 處理視窗大小改變
 */
function handleResize() {
  // 當視窗大小改變時，確保兩個 sidebar 的狀態正確
  // 不需要做任何 transition，因為兩個 sidebar 是獨立的
  if (window.innerWidth > 959) {
    // 寬螢幕：確保 mobile sidebar 關閉並隱藏
    const sidebarMobile = document.getElementById('sidebar-mobile');
    if (sidebarMobile) {
      sidebarMobile.classList.remove('app-sidebar--mobile--open', 'app-sidebar--mobile--closing');
      sidebarMobile.style.transform = 'translateY(100%)';
      document.body.style.overflow = '';
      sidebarStatePushed = false;
    }
  } else {
    // 窄螢幕：確保 desktop sidebar 隱藏（通過 CSS）
    // mobile sidebar 保持當前狀態（如果關閉就關閉，如果打開就打開）
  }
}

