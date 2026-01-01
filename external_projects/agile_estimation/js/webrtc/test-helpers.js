/**
 * WebRTC Test Helpers
 * 測試輔助函數
 */

import { MockPeerFactory, MockHostManager, MockClientManager } from './mocks.js';
import { HostManager, ClientManager } from './peer-manager.js';

/**
 * 創建測試用的 HostManager（使用 Mock）
 * @param {string} hostName - Host 名稱
 * @param {Object} options - 選項
 * @returns {Object} { hostManager, peerFactory }
 */
export function createTestHostManager(hostName = 'Host', options = {}) {
  const peerFactory = new MockPeerFactory();
  const hostManager = new HostManager(hostName, {
    ...options,
    peerFactory
  });
  
  return { hostManager, peerFactory };
}

/**
 * 創建測試用的 ClientManager（使用 Mock）
 * @param {Object} options - 選項
 * @param {Object} options.peerFactory - Peer Factory（如果提供，會使用這個 factory；否則創建新的）
 * @returns {Object} { clientManager, peerFactory }
 */
export function createTestClientManager(options = {}) {
  // 如果沒有提供 peerFactory，創建新的；否則使用提供的
  const peerFactory = options.peerFactory || new MockPeerFactory();
  const clientManager = new ClientManager({
    ...options,
    peerFactory
  });
  
  return { clientManager, peerFactory };
}

/**
 * 等待一段時間（用於模擬非同步操作）
 * @param {number} ms - 毫秒數
 * @returns {Promise}
 */
export function wait(ms = 50) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 等待條件滿足
 * @param {Function} condition - 條件函數
 * @param {number} timeout - 超時時間（毫秒）
 * @param {number} interval - 檢查間隔（毫秒）
 * @returns {Promise}
 */
export function waitFor(condition, timeout = 5000, interval = 50) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const check = () => {
      if (condition()) {
        resolve();
      } else if (Date.now() - startTime > timeout) {
        reject(new Error('Timeout waiting for condition'));
      } else {
        setTimeout(check, interval);
      }
    };
    
    check();
  });
}

