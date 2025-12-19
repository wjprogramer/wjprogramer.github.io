/**
 * 工具列表資料
 */
export const toolsData = [
  {
    id: 'encoding',
    name: '編碼工具',
    icon: 'lock',
    tools: [
      {
        id: 'base64',
        name: 'Base64',
        icon: 'key',
        path: '/encoding/base64',
        description: '文字與 Base64 的相互轉換，支援 UTF-8'
      },
      {
        id: 'url',
        name: 'URL 編碼',
        icon: 'link',
        path: '/encoding/url',
        description: 'URL 編碼與解碼，支援完整 URI'
      },
      {
        id: 'hash',
        name: 'Hash 計算',
        icon: 'tag',
        path: '/encoding/hash',
        description: 'MD5、SHA-1、SHA-256 雜湊計算'
      },
      {
        id: 'unicode',
        name: 'Unicode',
        icon: 'translate',
        path: '/encoding/unicode',
        description: 'Unicode 與 HTML 實體編碼轉換'
      }
    ]
  },
  {
    id: 'code',
    name: '程式碼工具',
    icon: 'code',
    tools: [
      {
        id: 'json',
        name: 'JSON 格式化',
        icon: 'data_object',
        path: '/code/json',
        description: 'JSON 美化、壓縮、驗證'
      },
      {
        id: 'html',
        name: 'HTML 格式化',
        icon: 'html',
        path: '/code/html',
        description: 'HTML 美化與壓縮'
      },
      {
        id: 'css',
        name: 'CSS 格式化',
        icon: 'css',
        path: '/code/css',
        description: 'CSS 美化與壓縮'
      },
      {
        id: 'js',
        name: 'JS 格式化',
        icon: 'javascript',
        path: '/code/js',
        description: 'JavaScript 美化與壓縮'
      }
    ]
  },
  {
    id: 'image',
    name: '圖片工具',
    icon: 'image',
    tools: [
      {
        id: 'qrcode',
        name: 'QR Code',
        icon: 'qr_code',
        path: '/image/qrcode',
        description: '二維碼生成器'
      },
      {
        id: 'datauri',
        name: 'Data URI',
        icon: 'photo_library',
        path: '/image/datauri',
        description: '圖片與 Data URI 轉換'
      },
      {
        id: 'barcode',
        name: '條碼生成器',
        icon: 'qr_code_scanner',
        path: '/barcode/generator',
        description: '條碼與 QR Code 生成器（整合版）'
      }
    ]
  },
  {
    id: 'text',
    name: '文字工具',
    icon: 'text_fields',
    tools: [
      {
        id: 'diff',
        name: '文字比較',
        icon: 'compare',
        path: '/text/diff',
        description: '比較兩段文字的差異'
      },
      {
        id: 'case',
        name: '大小寫轉換',
        icon: 'text_rotation_none',
        path: '/text/case',
        description: '文字大小寫轉換'
      }
    ]
  },
  {
    id: 'time',
    name: '時間工具',
    icon: 'schedule',
    tools: [
      {
        id: 'crontab',
        name: 'Crontab Guru',
        icon: 'schedule',
        path: '/cron/guru',
        description: 'Cron 表達式解析與執行時間預覽'
      }
    ]
  },
  {
    id: 'color',
    name: '顏色工具',
    icon: 'palette',
    tools: [
      {
        id: 'color-converter',
        name: '色彩格式轉換',
        icon: 'colorize',
        path: '/color/converter',
        description: 'HEX、RGB、HSL 格式相互轉換'
      },
      {
        id: 'color-palette',
        name: '調色盤生成',
        icon: 'palette',
        path: '/color/palette',
        description: '生成各種調色盤和漸層'
      }
    ]
  },
  {
    id: 'dev',
    name: '開發者工具',
    icon: 'code',
    tools: [
      {
        id: 'jwt',
        name: 'JWT 解析/生成',
        icon: 'lock',
        path: '/dev/jwt',
        description: 'JWT Token 解析與生成'
      },
      {
        id: 'uuid',
        name: 'UUID 生成器',
        icon: 'fingerprint',
        path: '/dev/uuid',
        description: '生成 UUID v1/v4 和短 UUID'
      },
      {
        id: 'lorem',
        name: 'Lorem Ipsum',
        icon: 'text_fields',
        path: '/dev/lorem',
        description: '生成假文（Latin 和中文）'
      }
    ]
  }
];

/**
 * 取得所有工具（扁平化）
 * @returns {Array}
 */
export function getAllTools() {
  return toolsData.flatMap(category => category.tools);
}

/**
 * 依路徑取得工具
 * @param {string} path
 * @returns {Object|undefined}
 */
export function getToolByPath(path) {
  return getAllTools().find(tool => tool.path === path);
}

