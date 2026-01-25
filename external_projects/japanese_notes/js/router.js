// Hash-based 路由器，並模擬瀏覽器 history 每一筆 entry 的滾動位置

class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.beforeEach = null;
    this.notFoundHandler = null;

    // 每一筆 history entry 對應一個 id，滾動位置以 id 為 key 保存
    this.scrollPositions = new Map(); // historyId -> scrollY
    this.currentHistoryId = null;
    this.nextHistoryId = 1;
    this.scrollSaveTimer = null;
    this.isProgrammaticNavigation = false; // 是否為 router.navigate 觸發的導航

    window.addEventListener('hashchange', () => {
      this.handleRoute();
    });

    window.addEventListener('load', () => {
      this.handleRoute();
    });

    // 監聽滾動事件，定期保存當前 entry 的滾動位置
    window.addEventListener('scroll', () => {
      this.saveCurrentScrollPosition();
    }, { passive: true });
  }

  register(path, handler) {
    this.routes.set(path, handler);
    return this;
  }

  navigate(path) {
    // 標記為程式主動導航，下一次 hashchange 視為「新 history entry」
    this.isProgrammaticNavigation = true;
    window.location.hash = path;
  }

  getCurrentPath() {
    return window.location.hash.slice(1) || '/';
  }

  setBeforeEach(callback) {
    this.beforeEach = callback;
  }

  setNotFoundHandler(handler) {
    this.notFoundHandler = handler;
  }

  async handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const [path, queryString] = hash.split('?');
    const params = new URLSearchParams(queryString);

    // 切換 route 前，先把「上一個 history entry」的滾動位置記下來
    if (this.currentHistoryId !== null) {
      const prevScrollY = window.scrollY || window.pageYOffset;
      this.scrollPositions.set(this.currentHistoryId, prevScrollY);
    }

    // 取得 / 建立本次 history entry 的 id
    let state = history.state || {};
    let historyId = state.routerHistoryId;

    if (this.isProgrammaticNavigation) {
      // 程式呼叫 navigate() → 一定是「新的」 history entry
      this.isProgrammaticNavigation = false;
      historyId = this.nextHistoryId++;
      history.replaceState({ ...state, routerHistoryId: historyId }, '');
    } else {
      // 使用者 back/forward 或手動改 hash
      if (historyId == null) {
        // 沒有 id，視為新的 entry，給一個新的 id
        historyId = this.nextHistoryId++;
        history.replaceState({ ...state, routerHistoryId: historyId }, '');
      }
    }

    this.currentHistoryId = historyId;

    // 解析動態路由參數
    const routeParams = this.parseRouteParams(path);

    if (this.beforeEach) {
      const shouldContinue = this.beforeEach({ path, params, routeParams });
      if (shouldContinue === false) return;
    }

    // 尋找匹配的路由
    const matchedRoute = this.findRoute(path);

    if (matchedRoute) {
      this.currentRoute = matchedRoute.path;

      // 若沒有已保存的位置，先滾到頂部；有的話等 render 後再恢復
      if (!this.scrollPositions.has(this.currentHistoryId)) {
        this.scrollToTop();
      }

      // 執行路由處理器（可能是異步的）
      const handlerResult = matchedRoute.handler({ path: matchedRoute.path, params, routeParams });

      // 等待 handler 完成（如果是 Promise）
      if (handlerResult && typeof handlerResult.then === 'function') {
        await handlerResult;
      }

      // 若有記錄過這一筆 history entry 的滾動位置，恢復之
      if (this.scrollPositions.has(this.currentHistoryId)) {
        const savedPosition = this.scrollPositions.get(this.currentHistoryId);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            window.scrollTo({
              top: savedPosition,
              behavior: 'auto'
            });
          });
        });
      }
    } else {
      this.handleNotFound(path);
      this.scrollToTop();
    }
  }

  saveCurrentScrollPosition() {
    // 使用防抖，避免頻繁保存
    if (this.scrollSaveTimer) {
      clearTimeout(this.scrollSaveTimer);
    }

    this.scrollSaveTimer = setTimeout(() => {
      if (this.currentHistoryId !== null) {
        const scrollY = window.scrollY || window.pageYOffset;
        this.scrollPositions.set(this.currentHistoryId, scrollY);
      }
    }, 150);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
  }

  parseRouteParams(path) {
    const params = {};
    const pathSegments = path.split('/');

    // 檢查是否有動態參數（:id）
    for (const [routePath] of this.routes.entries()) {
      const routeSegments = routePath.split('/');
      if (pathSegments.length === routeSegments.length) {
        const matches = routeSegments.every((segment, index) => {
          if (segment.startsWith(':')) {
            params[segment.slice(1)] = pathSegments[index];
            return true;
          }
          return segment === pathSegments[index];
        });
        if (matches) {
          return params;
        }
      }
    }
    return params;
  }

  findRoute(path) {
    // 精確匹配
    if (this.routes.has(path)) {
      return { path, handler: this.routes.get(path) };
    }

    // 動態路由匹配
    for (const [routePath, handler] of this.routes.entries()) {
      if (this.matchRoute(routePath, path)) {
        return { path: routePath, handler };
      }
    }

    return null;
  }

  matchRoute(routePath, path) {
    const routeSegments = routePath.split('/');
    const pathSegments = path.split('/');

    if (routeSegments.length !== pathSegments.length) {
      return false;
    }

    return routeSegments.every((segment, index) => {
      return segment.startsWith(':') || segment === pathSegments[index];
    });
  }

  handleNotFound(path) {
    if (this.notFoundHandler) {
      this.notFoundHandler(path);
    } else {
      console.warn(`Route not found: ${path}`);
    }
  }
}

export const router = new Router();
