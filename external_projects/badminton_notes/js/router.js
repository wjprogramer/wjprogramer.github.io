/**
 * Hash-based SPA Router
 */
class Router {
  constructor() {
    this.routes = new Map();
    this.cleanupHandlers = new Map(); // 儲存每個路由的清理函數
    this.currentRoute = null;
    this.beforeEach = null;
    this.scrollPositions = new Map(); // 儲存每個路由的滾動位置
    
    // 綁定 hashchange 事件
    window.addEventListener('hashchange', () => this.handleRoute());
    
    // 監聯滾動事件，保存當前頁面的滾動位置
    this.bindScrollListener();
  }
  
  /**
   * 綁定滾動監聽器
   */
  bindScrollListener() {
    let scrollTimeout;
    
    const saveScrollPosition = () => {
      if (this.currentRoute) {
        // 優先使用 window 的滾動位置（因為大多數情況下是 window 在滾動）
        const scrollY = window.scrollY || window.pageYOffset || 0;
        this.scrollPositions.set(this.currentRoute, scrollY);
      }
    };
    
    // 使用節流來減少事件觸發頻率
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(saveScrollPosition, 100);
    };
    
    // 監聽 window 的滾動
    window.addEventListener('scroll', handleScroll, { passive: true });
  }
  
  /**
   * 獲取當前滾動位置
   * @returns {number}
   */
  getScrollPosition() {
    return window.scrollY || window.pageYOffset || 0;
  }

  /**
   * 註冊路由
   * @param {string} path - 路由路徑
   * @param {Function} handler - 路由處理函式
   * @param {Function} [cleanup] - 可選的清理函式
   * @returns {Router}
   */
  register(path, handler, cleanup = null) {
    this.routes.set(path, handler);
    if (cleanup) {
      this.cleanupHandlers.set(path, cleanup);
    }
    return this;
  }
  
  /**
   * 調用當前路由的清理函數（如果有）
   */
  runCleanup() {
    if (this.currentRoute) {
      const cleanup = this.cleanupHandlers.get(this.currentRoute);
      if (cleanup && typeof cleanup === 'function') {
        try {
          cleanup();
        } catch (e) {
          console.error('Cleanup error:', e);
        }
      }
    }
  }

  /**
   * 導航到指定路由
   * @param {string} path - 目標路徑
   */
  navigate(path) {
    window.location.hash = path;
  }

  /**
   * 取得當前路由
   * @returns {string}
   */
  getCurrentPath() {
    return window.location.hash.slice(1) || '/';
  }

  /**
   * 處理路由變化
   */
  handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const [path, queryString] = hash.split('?');
    const params = queryString ? new URLSearchParams(queryString) : new URLSearchParams();
    
    // 保存當前路由的滾動位置（如果有的話）
    if (this.currentRoute) {
      const scrollY = this.getScrollPosition();
      this.scrollPositions.set(this.currentRoute, scrollY);
      
      // 調用當前路由的清理函數
      this.runCleanup();
    }
    
    // 確定要使用的路由（用於匹配和恢復滾動位置）
    let matchedRoute = path;
    
    // 先嘗試直接匹配
    const directHandler = this.routes.get(path);
    if (directHandler) {
      matchedRoute = path;
      const previousRoute = this.currentRoute;
      const hasSavedPosition = this.scrollPositions.has(path);
      
      // 更新當前路由
      this.currentRoute = path;
      
      // 重置滾動位置到 0（新頁面或返回的頁面都先重置）
      this.resetScroll();
      
      // 渲染頁面
      try {
        directHandler({ 
          path, 
          route: path,
          params: Object.fromEntries(params)
        });
      } catch (error) {
        console.error('Error rendering route:', path, error);
        this.handleNotFound(path);
        return;
      }
      
      // 等待 DOM 更新後，如果有保存的位置就恢復（表示是返回的頁面）
      if (hasSavedPosition) {
        this.restoreScroll(matchedRoute);
      }
      return;
    }
    
    // 解析動態路由參數
    const routeMatch = this.matchRoute(path);
    
    if (routeMatch) {
      const { route, params: routeParams } = routeMatch;
      const handler = this.routes.get(route);
      
      if (handler) {
        matchedRoute = route;
        const previousRoute = this.currentRoute;
        const hasSavedPosition = this.scrollPositions.has(route);
        
        // 更新當前路由
        this.currentRoute = route;
        
        // 重置滾動位置到 0（新頁面或返回的頁面都先重置）
        this.resetScroll();
        
        // 渲染頁面
        try {
          handler({ 
            path, 
            route,
            params: { ...routeParams, ...Object.fromEntries(params) }
          });
        } catch (error) {
          console.error('Error rendering route:', route, error);
          this.handleNotFound(path);
          return;
        }
        
        // 等待 DOM 更新後，如果有保存的位置就恢復（表示是返回的頁面）
        if (hasSavedPosition) {
          this.restoreScroll(matchedRoute);
        }
        return;
      }
    }
    
    // 404 處理
    this.handleNotFound(path);
  }
  
  /**
   * 重置滾動位置到 0
   */
  resetScroll() {
    window.scrollTo(0, 0);
  }
  
  /**
   * 恢復滾動位置
   * @param {string} route - 路由路徑
   */
  restoreScroll(route) {
    // 使用 requestAnimationFrame 確保 DOM 已更新
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const savedPosition = this.scrollPositions.get(route);
        if (savedPosition !== undefined && savedPosition > 0) {
          window.scrollTo({
            top: savedPosition,
            behavior: 'instant' // 使用 instant 避免動畫，立即跳轉
          });
        }
      });
    });
  }

  /**
   * 匹配動態路由
   * @param {string} path - 當前路徑
   * @returns {Object|null}
   */
  matchRoute(path) {
    for (const route of this.routes.keys()) {
      const routePattern = route.replace(/:[^/]+/g, '([^/]+)');
      const regex = new RegExp(`^${routePattern}$`);
      const match = path.match(regex);
      
      if (match) {
        const paramNames = route.match(/:[^/]+/g) || [];
        const params = {};
        
        paramNames.forEach((paramName, index) => {
          const key = paramName.slice(1);
          params[key] = match[index + 1];
        });
        
        return { route, params };
      }
    }
    
    return null;
  }

  /**
   * 404 處理
   * @param {string} path
   */
  handleNotFound(path) {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="error-page page-enter">
        <h1>404</h1>
        <p>找不到頁面：${this.escapeHtml(path)}</p>
        <a href="#/" class="btn-neu btn-neu--primary">
          <span class="material-icons-round">home</span>
          返回首頁
        </a>
      </div>
    `;
  }

  /**
   * HTML 轉義
   * @param {string} str
   * @returns {string}
   */
  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}

// 匯出單例
export const router = new Router();

