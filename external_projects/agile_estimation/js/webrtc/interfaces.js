/**
 * WebRTC Interfaces
 * 定義 WebRTC 相關的 interface，用於依賴注入和測試
 */

/**
 * @typedef {Object} PeerInterface
 * @property {Function} on - 監聽事件 (event: string, callback: Function) => void
 * @property {Function} connect - 連接到其他 peer (peerId: string, options?: Object) => DataConnection
 * @property {string} id - Peer ID
 * @property {Function} destroy - 銷毀 peer () => void
 */

/**
 * @typedef {Object} DataConnectionInterface
 * @property {Function} on - 監聽事件 (event: string, callback: Function) => void
 * @property {Function} send - 發送資料 (data: any) => void
 * @property {Function} close - 關閉連線 () => void
 * @property {string} peer - 對端 Peer ID
 */

/**
 * @typedef {Object} PeerFactoryInterface
 * @property {Function} createPeer - 創建 Peer 實例 (id: string, options?: Object) => PeerInterface
 */

/**
 * Host Manager Interface
 * @typedef {Object} IHostManager
 * @property {string} state - 連線狀態
 * @property {string} estimationState - 估點狀態
 * @property {string} meetingId - 會議 ID
 * @property {string} hostName - Host 名稱
 * @property {Object|null} currentIssue - 當前 Issue 資訊
 * @property {Function} createMeeting - 建立會議室 (meetingName?: string) => Promise<string>
 * @property {Function} closeMeeting - 關閉會議 () => void
 * @property {Function} startEstimation - 開始估點 (issueInfo: Object) => void
 * @property {Function} flipCards - 翻牌 (hostResult: Object|null) => Array
 * @property {Function} resetRound - 重置輪次 () => void
 * @property {Function} getParticipants - 取得參與者列表 () => Array
 * @property {Function} kickParticipant - 踢除參與者 (peerId: string) => void
 * @property {Function} onStateChange - 狀態變更回調
 * @property {Function} onParticipantJoin - 參與者加入回調
 * @property {Function} onParticipantLeave - 參與者離開回調
 * @property {Function} onParticipantUpdate - 參與者更新回調
 * @property {Function} onCardSelect - 卡片選擇回調
 * @property {Function} onError - 錯誤回調
 */

/**
 * Client Manager Interface
 * @typedef {Object} IClientManager
 * @property {string} state - 連線狀態
 * @property {string} estimationState - 估點狀態
 * @property {string} meetingId - 會議 ID
 * @property {string} clientName - Client 名稱
 * @property {Object|null} currentIssue - 當前 Issue 資訊
 * @property {Function} joinMeeting - 加入會議 (meetingId: string, name: string) => Promise<void>
 * @property {Function} leaveMeeting - 離開會議 () => void
 * @property {Function} selectCard - 選擇卡片 (card: string) => void
 * @property {Function} onStateChange - 狀態變更回調
 * @property {Function} onEstimationStart - 估點開始回調
 * @property {Function} onFlipCards - 翻牌回調
 * @property {Function} onResetRound - 重置輪次回調
 * @property {Function} onParticipantUpdate - 參與者更新回調
 * @property {Function} onKicked - 被踢除回調
 * @property {Function} onMeetingClosed - 會議關閉回調
 * @property {Function} onError - 錯誤回調
 */

export {};

