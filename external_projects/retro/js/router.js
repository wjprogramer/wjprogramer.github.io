// Hash-based 路由管理
export class Router {
  constructor() {
    this.routes = new Map();
    this.currentPage = null;
  }

  // 註冊路由
  register(path, pageComponent) {
    this.routes.set(path, pageComponent);
  }

  // 初始化路由
  async init() {
    // 註冊所有路由
    await this.registerRoutes();
  }

  // 註冊所有路由
  async registerRoutes() {
    // 動態載入頁面元件
    const { HomePage } = await import('./pages/home.js');
    const { RetrospectivePage } = await import('./pages/retrospective.js');
    const { HistoryPage } = await import('./pages/history.js');
    const { SettingsPage } = await import('./pages/settings.js');
    const { HostPage } = await import('./pages/host.js');
    const { JoinPage } = await import('./pages/join.js');

    // 註冊路由（參數路由要在一般路由之前）
    this.register('/retrospective/:meetingId', RetrospectivePage);
    this.register('/join/:meetingId', JoinPage);
    this.register('/', HomePage);
    this.register('/retro', RetrospectivePage);
    this.register('/history', HistoryPage);
    this.register('/settings', SettingsPage);
    this.register('/host', HostPage);
    this.register('/join', JoinPage);
  }

  // 處理路由
  async handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const [path, query] = hash.split('?');
    
    // 解析參數路由
    let matchedRoute = null;
    let params = {};
    
    for (const [route, component] of this.routes.entries()) {
      if (this.matchRoute(route, path)) {
        matchedRoute = route;
        params = this.extractParams(route, path);
        break;
      }
    }
    
    if (!matchedRoute) {
      matchedRoute = '/';
    }
    
    const PageComponent = this.routes.get(matchedRoute);
    
    if (PageComponent) {
      // 清理當前頁面
      if (this.currentPage && this.currentPage.destroy) {
        this.currentPage.destroy();
      }
      
      // 創建新頁面
      const app = document.getElementById('app');
      app.innerHTML = '';
      
      this.currentPage = new PageComponent(params, query);
      await this.currentPage.render(app);
    }
  }

  // 匹配路由（支援參數）
  matchRoute(route, path) {
    if (route === path) return true;
    
    // 參數路由匹配
    const routeParts = route.split('/');
    const pathParts = path.split('/');
    
    if (routeParts.length !== pathParts.length) return false;
    
    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) continue;
      if (routeParts[i] !== pathParts[i]) return false;
    }
    
    return true;
  }

  // 提取路由參數
  extractParams(route, path) {
    const params = {};
    const routeParts = route.split('/');
    const pathParts = path.split('/');
    
    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) {
        const paramName = routeParts[i].slice(1);
        params[paramName] = pathParts[i];
      }
    }
    
    return params;
  }

  // 導航到指定路由
  navigate(path) {
    window.location.hash = path;
  }
}

