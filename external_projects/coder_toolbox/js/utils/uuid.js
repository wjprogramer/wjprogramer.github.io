/**
 * UUID 生成器工具
 */

/**
 * 生成 UUID v4（隨機 UUID）
 * @returns {string}
 */
export function generateUuidV4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * 生成 UUID v1（基於時間戳）
 * @returns {string}
 */
export function generateUuidV1() {
  const now = Date.now();
  const timestamp = now.toString(16).padStart(12, '0');
  
  // 簡化版 v1，實際應包含 MAC 地址等資訊
  const random = Math.random().toString(16).substring(2, 14);
  
  return `${timestamp.substring(0, 8)}-${timestamp.substring(8, 12)}-1${random.substring(0, 3)}-${(Math.random() * 16 | 0x8).toString(16)}${random.substring(3, 7)}-${random.substring(7)}${timestamp.substring(12)}`;
}

/**
 * 生成短 UUID（無連字號）
 * @returns {string}
 */
export function generateShortUuid() {
  return generateUuidV4().replace(/-/g, '');
}

/**
 * 批量生成 UUID
 * @param {number} count - 數量
 * @param {string} version - 版本 ('v1' | 'v4' | 'short')
 * @returns {string[]}
 */
export function generateMultipleUuids(count, version = 'v4') {
  const uuids = [];
  for (let i = 0; i < count; i++) {
    switch (version) {
      case 'v1':
        uuids.push(generateUuidV1());
        break;
      case 'v4':
        uuids.push(generateUuidV4());
        break;
      case 'short':
        uuids.push(generateShortUuid());
        break;
      default:
        uuids.push(generateUuidV4());
    }
  }
  return uuids;
}

/**
 * 驗證 UUID 格式
 * @param {string} uuid
 * @returns {boolean}
 */
export function isValidUuid(uuid) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}


