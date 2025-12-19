/**
 * JWT 工具函式
 */

/**
 * Base64 URL 安全編碼
 */
function base64UrlEncode(str) {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * Base64 URL 安全解碼
 */
function base64UrlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) {
    str += '=';
  }
  try {
    return atob(str);
  } catch (e) {
    return null;
  }
}

/**
 * 解析 JWT Token
 * @param {string} token - JWT Token
 * @returns {{header: Object, payload: Object, signature: string, isValid: boolean, error: string|null}}
 */
export function parseJwt(token) {
  if (!token || !token.trim()) {
    return {
      header: null,
      payload: null,
      signature: '',
      isValid: false,
      error: 'Token 不能為空'
    };
  }

  const parts = token.trim().split('.');
  if (parts.length !== 3) {
    return {
      header: null,
      payload: null,
      signature: '',
      isValid: false,
      error: 'JWT Token 應包含 3 個部分（header.payload.signature）'
    };
  }

  try {
    // 解析 Header
    const headerStr = base64UrlDecode(parts[0]);
    if (!headerStr) {
      return {
        header: null,
        payload: null,
        signature: parts[2],
        isValid: false,
        error: 'Header 解碼失敗'
      };
    }

    let header;
    try {
      header = JSON.parse(headerStr);
    } catch (e) {
      return {
        header: null,
        payload: null,
        signature: parts[2],
        isValid: false,
        error: 'Header JSON 解析失敗'
      };
    }

    // 解析 Payload
    const payloadStr = base64UrlDecode(parts[1]);
    if (!payloadStr) {
      return {
        header,
        payload: null,
        signature: parts[2],
        isValid: false,
        error: 'Payload 解碼失敗'
      };
    }

    let payload;
    try {
      payload = JSON.parse(payloadStr);
    } catch (e) {
      return {
        header,
        payload: null,
        signature: parts[2],
        isValid: false,
        error: 'Payload JSON 解析失敗'
      };
    }

    return {
      header,
      payload,
      signature: parts[2],
      isValid: true,
      error: null
    };
  } catch (e) {
    return {
      header: null,
      payload: null,
      signature: parts[2] || '',
      isValid: false,
      error: `解析錯誤: ${e.message}`
    };
  }
}

/**
 * 生成 JWT Token
 * @param {Object} payload - Payload 物件
 * @param {Object} header - Header 物件（可選）
 * @param {string} secret - 簽名密鑰（可選，用於生成簽名）
 * @returns {string}
 */
export function generateJwt(payload, header = {}, secret = '') {
  const defaultHeader = {
    alg: secret ? 'HS256' : 'none',
    typ: 'JWT'
  };

  const finalHeader = { ...defaultHeader, ...header };
  const headerStr = JSON.stringify(finalHeader);
  const payloadStr = JSON.stringify(payload);

  const encodedHeader = base64UrlEncode(headerStr);
  const encodedPayload = base64UrlEncode(payloadStr);

  // 如果有密鑰，生成簽名（簡化版，實際應使用 HMAC）
  let signature = '';
  if (secret) {
    // 注意：這是簡化版本，實際應用中應使用正確的 HMAC-SHA256
    // 這裡僅用於演示，不應在生產環境使用
    signature = base64UrlEncode('signature-placeholder');
  }

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * 格式化 JSON（美化）
 */
export function formatJson(obj) {
  return JSON.stringify(obj, null, 2);
}

/**
 * 檢查 JWT 是否過期
 * @param {Object} payload - JWT Payload
 * @returns {{isExpired: boolean, expiresAt: Date|null, remainingTime: string|null}}
 */
export function checkJwtExpiry(payload) {
  if (!payload || !payload.exp) {
    return {
      isExpired: false,
      expiresAt: null,
      remainingTime: null
    };
  }

  const expiresAt = new Date(payload.exp * 1000);
  const now = new Date();
  const isExpired = now > expiresAt;
  const diff = expiresAt - now;

  let remainingTime = null;
  if (!isExpired) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (days > 0) {
      remainingTime = `${days} 天 ${hours} 小時`;
    } else if (hours > 0) {
      remainingTime = `${hours} 小時 ${minutes} 分鐘`;
    } else if (minutes > 0) {
      remainingTime = `${minutes} 分鐘 ${seconds} 秒`;
    } else {
      remainingTime = `${seconds} 秒`;
    }
  }

  return {
    isExpired,
    expiresAt,
    remainingTime
  };
}

/**
 * 格式化時間戳
 * @param {number} timestamp - Unix 時間戳（秒）
 * @returns {string}
 */
export function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
}

