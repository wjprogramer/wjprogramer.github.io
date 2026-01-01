/**
 * Peer Factory
 * 用於創建 Peer 實例，支持依賴注入
 */

/**
 * 真實 Peer Factory（使用 PeerJS）
 */
export class RealPeerFactory {
  /**
   * 創建 Peer 實例
   * @param {string} id - Peer ID
   * @param {Object} options - Peer 選項
   * @returns {Peer} PeerJS Peer 實例
   */
  createPeer(id, options = {}) {
    // 動態導入 PeerJS（避免在測試環境中載入）
    if (typeof window !== 'undefined' && window.Peer) {
      return new window.Peer(id, options);
    }
    
    // 如果沒有全局 Peer，嘗試從模組導入
    // 注意：這需要在 HTML 中先載入 PeerJS
    throw new Error('PeerJS is not available. Please load PeerJS library first.');
  }
}

/**
 * 創建默認的 Peer Factory
 * @returns {RealPeerFactory} 真實 Peer Factory
 */
export function createDefaultPeerFactory() {
  return new RealPeerFactory();
}

