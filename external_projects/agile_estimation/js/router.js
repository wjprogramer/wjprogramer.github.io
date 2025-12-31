/**
 * Simple Hash-based Router for SPA
 */

class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.currentCleanup = null;
    this.initialized = false;
    
    // 綁定 hashchange 事件
    window.addEventListener('hashchange', () => this.handleRoute());
  }
  
  /**
   * 初始化路由（在所有路由註冊完成後調用）
   */
  init() {
    if (this.initialized) return;
    this.initialized = true;
    this.handleRoute();
  }

  /**
   * 註冊路由
   * @param {string} path - 路由路徑
   * @param {Function} handler - 路由處理函數，返回 cleanup 函數（可選）
   * @returns {Router} 返回 Router 實例以支援鏈式調用
   */
  register(path, handler) {
    this.routes.set(path, handler);
    return this;
  }

  /**
   * 導航到指定路由
   * @param {string} path - 目標路由
   */
  navigate(path) {
    window.location.hash = path;
  }

  /**
   * 匹配路由（支援動態參數）
   * @param {string} path - 當前路徑
   * @returns {Object|null} 匹配結果
   */
  matchRoute(path) {
    for (const [routePath, handler] of this.routes.entries()) {
      // 特殊處理根路徑
      if (routePath === '/' && path === '/') {
        return {
          route: routePath,
          handler,
          params: {}
        };
      }
      
      // 將路由路徑轉換為正則表達式
      // 例如: /join/:id -> /join/(?<id>[^/]+)
      // 需要跳脫斜線
      const escapedPath = routePath.replace(/\//g, '\\/');
      const regex = new RegExp(
        `^${escapedPath.replace(/:(\w+)/g, '(?<$1>[^/]+)')}$`
      );
      const match = path.match(regex);
      
      if (match) {
        return {
          route: routePath,
          handler,
          params: match.groups || {}
        };
      }
    }
    return null;
  }

  /**
   * 處理路由變化
   */
  handleRoute() {
    // 取得 hash 路徑（去掉 #）
    const hash = window.location.hash.slice(1) || '/';
    
    // 分離路徑和查詢參數
    const [path, queryString] = hash.split('?');
    const queryParams = new URLSearchParams(queryString || '');

    // 執行上一個路由的清理函數
    if (this.currentCleanup && typeof this.currentCleanup === 'function') {
      this.currentCleanup();
      this.currentCleanup = null;
    }

    // 匹配路由
    const matchedRoute = this.matchRoute(path);

    if (matchedRoute) {
      const { handler, params } = matchedRoute;
      this.currentRoute = path;
      
      // 執行路由處理函數
      const cleanup = handler({
        path,
        params: { ...params, ...Object.fromEntries(queryParams) }
      });
      
      // 儲存清理函數
      if (typeof cleanup === 'function') {
        this.currentCleanup = cleanup;
      }
    } else {
      // 404 處理
      this.handleNotFound(path);
    }
  }

  /**
   * 處理 404
   * @param {string} path - 找不到的路徑
   */
  handleNotFound(path) {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page">
        <div class="container text-center">
          <h1>404</h1>
          <p class="text-muted mt-md">找不到頁面：${path}</p>
          <a href="#/" class="btn btn-primary mt-lg">返回首頁</a>
        </div>
      </div>
    `;
  }

  /**
   * 取得當前路由
   * @returns {string}
   */
  getCurrentRoute() {
    return this.currentRoute;
  }
}

export const router = new Router();

