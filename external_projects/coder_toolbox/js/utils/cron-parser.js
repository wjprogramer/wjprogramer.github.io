/**
 * Cron 表達式解析器
 */

/**
 * 解析 Cron 表達式
 * @param {string} expression - Cron 表達式（例如："0 9 * * 1-5"）
 * @returns {{isValid: boolean, fields: Object, errors: string[]}}
 */
export function parseCronExpression(expression) {
  const errors = [];
  const fields = {
    minute: '',
    hour: '',
    day: '',
    month: '',
    weekday: ''
  };

  if (!expression || !expression.trim()) {
    return {
      isValid: false,
      fields,
      errors: ['請輸入 Cron 表達式']
    };
  }

  // 分割欄位
  const parts = expression.trim().split(/\s+/);
  
  if (parts.length !== 5) {
    return {
      isValid: false,
      fields,
      errors: ['Cron 表達式應包含 5 個欄位（分鐘 小時 日期 月份 星期）']
    };
  }

  fields.minute = parts[0];
  fields.hour = parts[1];
  fields.day = parts[2];
  fields.month = parts[3];
  fields.weekday = parts[4];

  // 驗證各欄位
  validateField('minute', fields.minute, 0, 59, errors);
  validateField('hour', fields.hour, 0, 23, errors);
  validateField('day', fields.day, 1, 31, errors);
  validateField('month', fields.month, 1, 12, errors);
  validateWeekday(fields.weekday, errors);

  return {
    isValid: errors.length === 0,
    fields,
    errors
  };
}

/**
 * 驗證欄位
 */
function validateField(name, value, min, max, errors) {
  if (!value) {
    errors.push(`${getFieldName(name)}欄位不能為空`);
    return;
  }

  // 支援月份和星期的名稱
  if (name === 'month' && /^[A-Z]{3}$/i.test(value)) {
    const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    if (!monthNames.includes(value.toUpperCase())) {
      errors.push(`${getFieldName(name)}欄位無效的月份名稱`);
    }
    return;
  }

  // weekday 由 validateWeekday 專門處理
  if (name === 'weekday') {
    return;
  }

  // 處理特殊符號
  if (value === '*') return;
  if (value.includes('?')) return; // ? 用於日期或星期

  // 處理範圍和列表
  const parts = value.split(',');
  
  for (const part of parts) {
    if (part.includes('/')) {
      // 步進值：*/5, 1-10/2
      const [range, step] = part.split('/');
      const stepNum = parseInt(step);
      if (isNaN(stepNum) || stepNum <= 0) {
        errors.push(`${getFieldName(name)}欄位的步進值必須大於 0`);
        continue;
      }
      
      if (range !== '*') {
        // 範圍步進：1-10/2
        if (range.includes('-')) {
          const [start, end] = range.split('-').map(Number);
          if (isNaN(start) || isNaN(end) || start < min || end > max || start > end) {
            errors.push(`${getFieldName(name)}欄位的範圍無效`);
          }
        } else {
          // 單值步進：5/2
          const num = parseInt(range);
          if (isNaN(num) || num < min || num > max) {
            errors.push(`${getFieldName(name)}欄位應為 ${min}-${max} 之間的數字`);
          }
        }
      }
    } else if (part.includes('-')) {
      // 範圍：1-5
      const [start, end] = part.split('-').map(Number);
      if (isNaN(start) || isNaN(end) || start < min || end > max || start > end) {
        errors.push(`${getFieldName(name)}欄位的範圍應為 ${min}-${max}，且起始值不能大於結束值`);
      }
    } else {
      // 單一值
      const num = parseInt(part);
      if (isNaN(num) || num < min || num > max) {
        errors.push(`${getFieldName(name)}欄位應為 ${min}-${max} 之間的數字`);
      }
    }
  }
}

/**
 * 驗證星期欄位（特殊處理 0-7）
 */
function validateWeekday(weekday, errors) {
  if (!weekday) {
    errors.push('星期欄位不能為空');
    return;
  }

  // 支援星期名稱
  if (/^[A-Z]{3}$/i.test(weekday)) {
    const weekdayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    if (!weekdayNames.includes(weekday.toUpperCase())) {
      errors.push('星期欄位無效的星期名稱');
    }
    return;
  }

  // 處理特殊符號
  if (weekday === '*') return;
  if (weekday === '?') return;

  // 處理範圍和列表
  const parts = weekday.split(',');
  
  for (const part of parts) {
    if (part.includes('/')) {
      // 步進值
      const [range, step] = part.split('/');
      const stepNum = parseInt(step);
      if (isNaN(stepNum) || stepNum <= 0) {
        errors.push('星期欄位的步進值必須大於 0');
        continue;
      }
      
      if (range !== '*') {
        if (range.includes('-')) {
          const [start, end] = range.split('-').map(Number);
          if (isNaN(start) || isNaN(end) || start < 0 || end > 7 || start > end) {
            errors.push('星期欄位的範圍應為 0-7，且起始值不能大於結束值');
          }
        } else {
          const num = parseInt(range);
          if (isNaN(num) || num < 0 || num > 7) {
            errors.push('星期欄位應為 0-7 之間的數字');
          }
        }
      }
    } else if (part.includes('-')) {
      // 範圍：0-7
      const [start, end] = part.split('-').map(Number);
      if (isNaN(start) || isNaN(end) || start < 0 || end > 7 || start > end) {
        errors.push('星期欄位的範圍應為 0-7，且起始值不能大於結束值');
      }
    } else {
      // 單一值：0-7
      const num = parseInt(part);
      if (isNaN(num) || num < 0 || num > 7) {
        errors.push('星期欄位應為 0-7 之間的數字（0 和 7 都代表週日）');
      }
    }
  }
}

/**
 * 取得欄位中文名稱
 */
function getFieldName(name) {
  const names = {
    minute: '分鐘',
    hour: '小時',
    day: '日期',
    month: '月份',
    weekday: '星期'
  };
  return names[name] || name;
}

/**
 * 檢查值是否匹配 cron 表達式
 * @param {string} field - Cron 欄位表達式
 * @param {number} value - 要檢查的值
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {boolean}
 */
export function matchesCronField(field, value, min, max) {
  if (field === '*') return true;
  if (field === '?') return true;

  // 處理星期名稱
  if (/^[A-Z]{3}$/i.test(field)) {
    const weekdayMap = {
      'SUN': 0, 'MON': 1, 'TUE': 2, 'WED': 3,
      'THU': 4, 'FRI': 5, 'SAT': 6
    };
    const mappedValue = weekdayMap[field.toUpperCase()];
    if (mappedValue !== undefined) {
      // 對於星期，0 和 7 都代表週日
      if (mappedValue === 0) {
        return value === 0 || value === 7;
      }
      return mappedValue === value;
    }
  }

  // 處理列表
  const parts = field.split(',');
  for (const part of parts) {
    if (matchesCronPart(part, value, min, max)) {
      return true;
    }
  }
  return false;
}

/**
 * 檢查單一部分是否匹配
 */
function matchesCronPart(part, value, min, max) {
  // 處理步進值
  if (part.includes('/')) {
    const [range, step] = part.split('/');
    const stepNum = parseInt(step);
    
    if (range === '*') {
      // */5 - 每 5 個值
      return value % stepNum === 0;
    } else if (range.includes('-')) {
      // 1-10/2 - 範圍內的步進
      const [start, end] = range.split('-').map(Number);
      if (value >= start && value <= end) {
        return (value - start) % stepNum === 0;
      }
      // 特殊處理：星期欄位的 0-7 範圍
      if (min === 0 && max === 7 && value === 7 && end === 7) {
        return (0 - start) % stepNum === 0; // 7 等同於 0
      }
      return false;
    } else {
      // 5/2 - 從 5 開始每 2 個
      const start = parseInt(range);
      if (value >= start) {
        return (value - start) % stepNum === 0;
      }
      return false;
    }
  }
  
  // 處理範圍
  if (part.includes('-')) {
    const [start, end] = part.split('-').map(Number);
    if (value >= start && value <= end) {
      return true;
    }
    // 特殊處理：星期欄位的 0-7 範圍，7 等同於 0
    if (min === 0 && max === 7) {
      if (value === 7 && start === 0) return true;
      if (value === 0 && end === 7) return true;
    }
    return false;
  }
  
  // 處理單一值
  const partNum = parseInt(part);
  if (partNum === value) {
    return true;
  }
  // 特殊處理：星期欄位，0 和 7 都代表週日
  if (min === 0 && max === 7) {
    if (value === 0 && partNum === 7) return true;
    if (value === 7 && partNum === 0) return true;
  }
  return false;
}

