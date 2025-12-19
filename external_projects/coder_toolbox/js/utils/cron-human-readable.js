/**
 * Cron 表達式人類可讀解釋生成器
 */
import { parseCronExpression } from './cron-parser.js';

/**
 * 生成人類可讀的解釋
 * @param {string} expression - Cron 表達式
 * @returns {string}
 */
export function generateHumanReadable(expression) {
  const parsed = parseCronExpression(expression);
  
  if (!parsed.isValid) {
    return '無效的 Cron 表達式';
  }

  const { fields } = parsed;
  const parts = [];

  // 處理分鐘
  const minuteDesc = describeField(fields.minute, 0, 59, '分鐘');
  
  // 處理小時
  const hourDesc = describeField(fields.hour, 0, 23, '小時');
  
  // 處理日期
  const dayDesc = describeField(fields.day, 1, 31, '號');
  
  // 處理月份
  const monthDesc = describeMonth(fields.month);
  
  // 處理星期
  const weekdayDesc = describeWeekday(fields.weekday);

  // 組合描述
  // 優先顯示時間
  if (minuteDesc !== '每分鐘' || hourDesc !== '每小時') {
    const time = formatTime(fields.minute, fields.hour);
    if (time) {
      parts.push(time);
    }
  }

  // 顯示頻率
  const frequency = getFrequency(fields, minuteDesc, hourDesc, dayDesc, monthDesc, weekdayDesc);
  if (frequency) {
    parts.push(frequency);
  }

  // 顯示日期/星期限制
  if (weekdayDesc && weekdayDesc !== '每天') {
    parts.push(weekdayDesc);
  }
  if (dayDesc && dayDesc !== '每天' && !weekdayDesc) {
    parts.push(dayDesc);
  }
  if (monthDesc && monthDesc !== '每月') {
    parts.push(monthDesc);
  }

  return parts.length > 0 ? parts.join(' ') : '每分鐘';
}

/**
 * 描述欄位
 */
function describeField(field, min, max, unit) {
  if (field === '*') {
    return unit === '分鐘' ? '每分鐘' : unit === '小時' ? '每小時' : `每${unit}`;
  }

  if (field.includes(',')) {
    // 列表
    const values = field.split(',').map(v => v.split('/')[0].split('-')[0]);
    return `${values.join('、')}${unit}`;
  }

  if (field.includes('-')) {
    // 範圍
    const [start, end] = field.split('-').map(v => v.split('/')[0]);
    return `${start}${unit}至${end}${unit}`;
  }

  if (field.includes('/')) {
    // 步進值
    const [range, step] = field.split('/');
    if (range === '*') {
      return `每 ${step} ${unit}`;
    }
    return `${range}${unit}起每${step}${unit}`;
  }

  // 單一值
  return `${field}${unit}`;
}

/**
 * 描述月份
 */
function describeMonth(month) {
  if (month === '*') return '每月';
  
  const monthNames = {
    'JAN': '一月', 'FEB': '二月', 'MAR': '三月', 'APR': '四月',
    'MAY': '五月', 'JUN': '六月', 'JUL': '七月', 'AUG': '八月',
    'SEP': '九月', 'OCT': '十月', 'NOV': '十一月', 'DEC': '十二月'
  };

  if (/^[A-Z]{3}$/i.test(month)) {
    return monthNames[month.toUpperCase()] || month;
  }

  return describeField(month, 1, 12, '月');
}

/**
 * 描述星期
 */
function describeWeekday(weekday) {
  if (weekday === '*') return null;
  if (weekday === '?') return null;

  const weekdayNames = {
    '0': '週日', '7': '週日',
    '1': '週一', '2': '週二', '3': '週三', '4': '週四',
    '5': '週五', '6': '週六',
    'SUN': '週日', 'MON': '週一', 'TUE': '週二', 'WED': '週三',
    'THU': '週四', 'FRI': '週五', 'SAT': '週六'
  };

  if (weekday.includes(',')) {
    const days = weekday.split(',').map(d => {
      const day = d.split('/')[0].split('-')[0];
      return weekdayNames[day] || day;
    });
    return `每${days.join('、')}`;
  }

  if (weekday.includes('-')) {
    const [start, end] = weekday.split('-').map(d => d.split('/')[0]);
    const startName = weekdayNames[start] || start;
    const endName = weekdayNames[end] || end;
    return `每${startName}至${endName}`;
  }

  if (weekday.includes('/')) {
    const [range, step] = weekday.split('/');
    if (range === '*') {
      return `每${step}天`;
    }
    return `${range}起每${step}天`;
  }

  const dayName = weekdayNames[weekday] || weekday;
  return `每${dayName}`;
}

/**
 * 格式化時間
 */
function formatTime(minute, hour) {
  if (minute === '*' && hour === '*') return null;
  
  const m = minute === '*' ? '00' : minute.padStart(2, '0');
  const h = hour === '*' ? '00' : hour.padStart(2, '0');
  
  if (minute === '*' && hour !== '*') {
    return `每小時的 ${hour}:00`;
  }
  
  if (minute !== '*' && hour === '*') {
    return `每小時的 ${m} 分`;
  }
  
  return `${h}:${m}`;
}

/**
 * 取得頻率描述
 */
function getFrequency(fields, minuteDesc, hourDesc, dayDesc, monthDesc, weekdayDesc) {
  const isEveryMinute = fields.minute === '*';
  const isEveryHour = fields.hour === '*';
  const isEveryDay = fields.day === '*';
  const isEveryMonth = fields.month === '*';
  const isEveryWeekday = fields.weekday === '*';

  // 每分鐘
  if (isEveryMinute && isEveryHour && isEveryDay && isEveryMonth && isEveryWeekday) {
    return '每分鐘';
  }

  // 每小時
  if (!isEveryMinute && isEveryHour && isEveryDay && isEveryMonth && isEveryWeekday) {
    if (fields.minute.includes('/')) {
      const step = fields.minute.split('/')[1];
      return `每 ${step} 分鐘`;
    }
    return '每小時';
  }

  // 每天
  if (!isEveryMinute && !isEveryHour && isEveryDay && isEveryMonth && isEveryWeekday) {
    return '每天';
  }

  // 每週
  if (!isEveryMinute && !isEveryHour && isEveryDay && isEveryMonth && !isEveryWeekday) {
    return null; // 由 weekdayDesc 處理
  }

  // 每月
  if (!isEveryMinute && !isEveryHour && !isEveryDay && isEveryMonth && isEveryWeekday) {
    return null; // 由 dayDesc 處理
  }

  // 每年
  if (!isEveryMinute && !isEveryHour && !isEveryDay && !isEveryMonth && isEveryWeekday) {
    return null; // 由 monthDesc 和 dayDesc 處理
  }

  return null;
}

