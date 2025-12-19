/**
 * Hash-based SPA Router
 */
class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.beforeEach = null;
    
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
  }

  /**
   * 註冊路由
   * @param {string} path - 路由路徑
   * @param {Function} handler - 路由處理函式
   * @returns {Router}
   */
  register(path, handler) {
    this.routes.set(path, handler);
    return this;
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
    
    // 解析查詢參數
    const params = new URLSearchParams(queryString);
    
    // 執行 beforeEach 守衛
    if (this.beforeEach) {
      const shouldContinue = this.beforeEach({ path, params });
      if (shouldContinue === false) return;
    }
    
    // 查找匹配的路由
    const handler = this.routes.get(path);
    
    if (handler) {
      this.currentRoute = path;
      handler({ path, params });
    } else {
      // 404 處理
      this.handleNotFound(path);
    }
  }

  /**
   * 404 處理
   * @param {string} path
   */
  handleNotFound(path) {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="error-page fade-in-up">
        <h1>404</h1>
        <p>找不到頁面：${this.escapeHtml(path)}</p>
        <a href="#/" class="glass-btn primary">
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

