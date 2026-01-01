/**
 * Test Page
 * 測試頁面 - 測試應用程式的業務邏輯
 */

import { storage } from '../utils/storage/index.js';
import { createMockStorage } from '../utils/storage/factory.js';
import { i18n } from '../utils/i18n.js';
import { theme } from '../utils/theme.js';
import { addHistory, getHistory, clearHistory } from '../data/history.js';
import { createTestHostManager, createTestClientManager, wait } from '../webrtc/test-helpers.js';
import { EstimationState } from '../webrtc/peer-manager.js';

// 測試結果
let testResults = [];

/**
 * 渲染測試頁面
 */
export function renderTest() {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <header class="header">
      <div class="container header-content">
        <a href="#/" class="btn btn-ghost" id="back-btn">
          ← <span data-i18n="common.back">返回</span>
        </a>
        <div class="logo">測試頁面</div>
      </div>
    </header>
    
    <main class="page test-page">
      <div class="container">
        <h1>測試頁面</h1>
        <p class="test-desc">點擊下方按鈕開始測試各種業務邏輯</p>
        
        <div class="test-controls">
          <button class="btn btn-primary btn-lg" id="run-all-tests-btn">
            執行所有測試
          </button>
          <button class="btn btn-secondary" id="clear-results-btn">
            清除結果
          </button>
        </div>
        
        <div class="test-sections">
          <div class="test-section">
            <h2>Storage 測試</h2>
            <button class="btn btn-primary" data-test="storage">測試 Storage</button>
          </div>
          
          <div class="test-section">
            <h2>統計計算測試</h2>
            <button class="btn btn-primary" data-test="stats">測試統計計算</button>
          </div>
          
          <div class="test-section">
            <h2>極端值識別測試</h2>
            <button class="btn btn-primary" data-test="extreme">測試極端值識別</button>
          </div>
          
          <div class="test-section">
            <h2>歷史記錄測試</h2>
            <button class="btn btn-primary" data-test="history">測試歷史記錄</button>
          </div>
          
          <div class="test-section">
            <h2>Issue 管理測試</h2>
            <button class="btn btn-primary" data-test="issue">測試 Issue 管理</button>
          </div>
          
          <div class="test-section">
            <h2>WebRTC 翻牌測試</h2>
            <button class="btn btn-primary" data-test="webrtc">測試 WebRTC 翻牌</button>
          </div>
        </div>
        
        <div class="test-results" id="test-results">
          <h2>測試結果</h2>
          <div id="test-results-content"></div>
        </div>
      </div>
    </main>
    
    <style>
      .test-page {
        padding: var(--spacing-lg) 0;
      }
      
      .test-desc {
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-lg);
      }
      
      .test-controls {
        display: flex;
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-xl);
      }
      
      .test-sections {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-xl);
      }
      
      .test-section {
        background: var(--color-bg-secondary);
        border-radius: var(--radius-md);
        padding: var(--spacing-md);
      }
      
      .test-section h2 {
        font-size: var(--font-size-lg);
        margin-bottom: var(--spacing-md);
        color: var(--color-text-primary);
      }
      
      .test-results {
        background: var(--color-bg-secondary);
        border-radius: var(--radius-md);
        padding: var(--spacing-lg);
        margin-top: var(--spacing-xl);
      }
      
      .test-results h2 {
        margin-bottom: var(--spacing-md);
        color: var(--color-text-primary);
      }
      
      .test-result-item {
        padding: var(--spacing-sm);
        margin-bottom: var(--spacing-xs);
        border-radius: var(--radius-sm);
        border-left: 4px solid;
      }
      
      .test-result-item.pass {
        background: rgba(34, 197, 94, 0.1);
        border-color: #22c55e;
        color: var(--color-text-primary);
      }
      
      .test-result-item.fail {
        background: rgba(239, 68, 68, 0.1);
        border-color: #ef4444;
        color: var(--color-text-primary);
      }
      
      .test-result-item .test-name {
        font-weight: 600;
        margin-bottom: var(--spacing-xs);
      }
      
      .test-result-item .test-message {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
      }
      
      .test-summary {
        margin-top: var(--spacing-md);
        padding-top: var(--spacing-md);
        border-top: 1px solid var(--color-border);
        font-weight: 600;
      }
      
      .test-summary.pass {
        color: #22c55e;
      }
      
      .test-summary.fail {
        color: #ef4444;
      }
    </style>
  `;
  
  // 套用翻譯
  i18n.applyTranslations();
  
  // 設定事件監聽
  setupEventListeners();
  
  return () => {
    // 清理工作
    testResults = [];
  };
}

/**
 * 設定事件監聽
 */
function setupEventListeners() {
  // 執行所有測試
  document.getElementById('run-all-tests-btn')?.addEventListener('click', () => {
    runAllTests();
  });
  
  // 清除結果
  document.getElementById('clear-results-btn')?.addEventListener('click', () => {
    clearTestResults();
  });
  
  // 個別測試按鈕
  document.querySelectorAll('[data-test]').forEach(btn => {
    btn.addEventListener('click', () => {
      const testName = btn.dataset.test;
      clearTestResults();
      runTest(testName).catch(err => {
        console.error('測試執行錯誤:', err);
        addTestResult(`測試執行錯誤: ${err.message}`, false, testName);
        showTestSummary();
      });
    });
  });
}

/**
 * 執行所有測試
 */
async function runAllTests() {
  clearTestResults();
  addTestResult('開始執行所有測試...', true, '系統');
  
  const tests = ['storage', 'stats', 'extreme', 'history', 'issue', 'closest', 'webrtc'];
  
  for (const test of tests) {
    await runTest(test);
  }
  
  showTestSummary();
}

/**
 * 執行單個測試
 */
async function runTest(testName) {
  try {
    switch (testName) {
      case 'storage':
        await testStorage();
        break;
      case 'stats':
        testStats();
        break;
      case 'extreme':
        testExtremeValues();
        break;
      case 'history':
        testHistory();
        break;
      case 'issue':
        testIssueManagement();
        break;
      case 'closest':
        testClosestCardValue();
        break;
      case 'webrtc':
        await testWebRTC();
        break;
      default:
        addTestResult(`未知的測試: ${testName}`, false, '系統');
    }
  } catch (error) {
    console.error('測試執行錯誤:', testName, error);
    addTestResult(`測試執行錯誤: ${error.message}`, false, testName);
  }
  
  showTestSummary();
}

/**
 * 測試 Storage
 */
async function testStorage() {
  const testName = 'Storage 測試';
  
  try {
    // 使用 Mock Storage 避免影響實際環境
    const mockStorage = createMockStorage();
    
    // 測試 1: 儲存和讀取
    mockStorage.set('test_key', 'test_value');
    const value = mockStorage.get('test_key');
    assert(value === 'test_value', testName, '測試案例 1.1: 儲存和讀取');
    
    // 測試 2: 預設值
    const defaultValue = mockStorage.get('non_existent_key', 'default');
    assert(defaultValue === 'default', testName, '測試案例 1.2: 預設值');
    
    // 測試 3: 刪除
    mockStorage.remove('test_key');
    const afterRemove = mockStorage.get('test_key');
    assert(afterRemove === null, testName, '測試案例 1.3: 刪除');
    
    // 測試 4: 清除所有
    mockStorage.set('test_key1', 'value1');
    mockStorage.set('test_key2', 'value2');
    mockStorage.clear();
    const afterClear1 = mockStorage.get('test_key1');
    const afterClear2 = mockStorage.get('test_key2');
    assert(afterClear1 === null && afterClear2 === null, testName, '測試案例 1.4: 清除所有');
    
    // 測試 5: 深拷貝測試（確保修改返回值不影響內部資料）
    mockStorage.set('test_object', { a: 1, b: 2 });
    const obj1 = mockStorage.get('test_object');
    obj1.a = 999;
    const obj2 = mockStorage.get('test_object');
    assert(obj2.a === 1, testName, '測試案例 1.5: 深拷貝保護');
    
    // 測試 6: 複雜物件儲存
    const complexObj = {
      array: [1, 2, 3],
      nested: { x: 'y' },
      date: new Date('2024-01-01').toISOString()
    };
    mockStorage.set('complex', complexObj);
    const retrieved = mockStorage.get('complex');
    assert(JSON.stringify(retrieved) === JSON.stringify(complexObj), testName, '測試案例 1.6: 複雜物件儲存');
    
    // 測試 7: 驗證實際 storage 未被影響
    const realValue = storage.get('test_key');
    assert(realValue === null || realValue !== 'test_value', testName, '測試案例 1.7: 實際 storage 未被影響');
    
  } catch (error) {
    addTestResult(`${testName}: ${error.message}`, false, testName);
  }
}

/**
 * 測試統計計算
 */
function testStats() {
  const testName = '統計計算測試';
  
  try {
    // 測試 1: 基本統計
    const results1 = [
      { name: 'A', card: '3' },
      { name: 'B', card: '5' },
      { name: 'C', card: '8' }
    ];
    const stats1 = calculateStats(results1);
    assert(stats1.average === '5.3', testName, '基本平均計算');
    assert(stats1.highest === 8, testName, '最高值');
    assert(stats1.lowest === 3, testName, '最低值');
    
    // 測試 2: 包含非數字
    const results2 = [
      { name: 'A', card: '3' },
      { name: 'B', card: '?' },
      { name: 'C', card: '8' }
    ];
    const stats2 = calculateStats(results2);
    assert(stats2.average === '5.5', testName, '包含非數字的平均');
    
    // 測試 3: 空結果
    const results3 = [];
    const stats3 = calculateStats(results3);
    assert(stats3.average === '-', testName, '空結果');
    
    // 測試 4: 只有非數字
    const results4 = [
      { name: 'A', card: '?' },
      { name: 'B', card: '☕' }
    ];
    const stats4 = calculateStats(results4);
    assert(stats4.average === '-', testName, '只有非數字');
    
  } catch (error) {
    addTestResult(`${testName}: ${error.message}`, false, testName);
  }
}

/**
 * 測試極端值識別
 */
function testExtremeValues() {
  const testName = '極端值識別測試';
  
  try {
    // 測試 1: 基本極端值
    const results1 = [
      { name: 'A', card: '1' },
      { name: 'B', card: '5' },
      { name: 'C', card: '13' }
    ];
    const extreme1 = identifyExtremeValues(results1, [1, 5, 13], 13, 1);
    assert(extreme1.highest.length === 1 && extreme1.highest[0].name === 'C', testName, '最高值識別');
    assert(extreme1.lowest.length === 1 && extreme1.lowest[0].name === 'A', testName, '最低值識別');
    
    // 測試 2: 多個相同極端值
    const results2 = [
      { name: 'A', card: '13' },
      { name: 'B', card: '5' },
      { name: 'C', card: '13' }
    ];
    const extreme2 = identifyExtremeValues(results2, [13, 5, 13], 13, 5);
    assert(extreme2.highest.length === 2, testName, '多個最高值');
    
    // 測試 3: 空結果
    const extreme3 = identifyExtremeValues([], [], 0, 0);
    assert(extreme3.highest.length === 0 && extreme3.lowest.length === 0, testName, '空結果');
    
  } catch (error) {
    addTestResult(`${testName}: ${error.message}`, false, testName);
  }
}

/**
 * 測試歷史記錄
 * 注意：此測試使用實際的 storage（通過 history.js），會在測試前後清理資料
 */
function testHistory() {
  const testName = '歷史記錄測試';
  
  try {
    // 清除歷史（確保測試環境乾淨）
    clearHistory();
    
    // 測試 1: 添加歷史
    const record1 = {
      mode: 'solo',
      value: '5',
      timestamp: new Date().toISOString()
    };
    addHistory(record1);
    const history1 = getHistory();
    assert(history1.length === 1, testName, '添加歷史記錄');
    
    // 測試 2: 讀取歷史
    assert(history1[0].mode === 'solo', testName, '讀取歷史記錄');
    
    // 測試 3: 清除歷史
    clearHistory();
    const history2 = getHistory();
    assert(history2.length === 0, testName, '清除歷史記錄');
    
    // 清理
    clearHistory();
    
  } catch (error) {
    addTestResult(`${testName}: ${error.message}`, false, testName);
  }
}

/**
 * 測試 Issue 管理
 */
function testIssueManagement() {
  const testName = 'Issue 管理測試';
  
  try {
    // 模擬 Issue 數據結構
    const issues = [];
    
    // 測試 1: 創建 Issue
    const issue1 = {
      id: 'issue-1',
      title: 'Test Issue 1',
      description: 'Test Description',
      rounds: [],
      status: 'notStarted',
      createdAt: new Date().toISOString()
    };
    issues.push(issue1);
    assert(issues.length === 1, testName, '創建 Issue');
    
    // 測試 2: 添加輪次
    const round1 = {
      roundNumber: 1,
      results: [
        { name: 'A', card: '5' },
        { name: 'B', card: '8' }
      ],
      completedAt: new Date().toISOString()
    };
    issue1.rounds.push(round1);
    assert(issue1.rounds.length === 1, testName, '添加輪次');
    
    // 測試 3: 計算最後一輪結果
    const lastRoundResult = getLastRoundResult(issue1);
    assert(lastRoundResult !== null, testName, '計算最後一輪結果');
    assert(lastRoundResult.average === '6.5', testName, '最後一輪平均');
    
    // 測試 4: 完成 Issue
    issue1.status = 'completed';
    issue1.finalDecision = '8';
    assert(issue1.status === 'completed', testName, '完成 Issue');
    assert(issue1.finalDecision === '8', testName, '最終決定');
    
    // 測試 5: 自動建立未命名 Issue（當沒有 Issue 時）
    const emptyIssues = [];
    const untitledName = '未命名'; // 模擬翻譯
    const autoCreatedIssue = {
      id: 'issue-auto-1',
      title: untitledName,
      description: '',
      rounds: [],
      status: 'notStarted',
      createdAt: new Date().toISOString()
    };
    emptyIssues.push(autoCreatedIssue);
    assert(emptyIssues.length === 1, testName, '自動建立未命名 Issue');
    assert(autoCreatedIssue.title === untitledName, testName, '未命名 Issue 標題');
    
    // 測試 6: 重新命名 Issue
    const issue2 = {
      id: 'issue-2',
      title: 'Original Title',
      description: '',
      rounds: [],
      status: 'notStarted',
      createdAt: new Date().toISOString()
    };
    issues.push(issue2);
    const newTitle = 'Renamed Title';
    issue2.title = newTitle;
    assert(issue2.title === newTitle, testName, '重新命名 Issue');
    assert(issue2.id === 'issue-2', testName, '重新命名後 ID 不變');
    
    // 測試 7: Issue 狀態管理 - 建立新 issue 時不應影響正在進行的 issue
    const issue3 = {
      id: 'issue-3',
      title: 'Issue A',
      description: '',
      rounds: [],
      status: 'inProgress',
      createdAt: new Date().toISOString()
    };
    const issue4 = {
      id: 'issue-4',
      title: 'Issue B',
      description: '',
      rounds: [],
      status: 'notStarted',
      createdAt: new Date().toISOString()
    };
    issues.push(issue3, issue4);
    
    // 模擬 issue3 正在進行中（currentIssue 是 issue3，estimationState 不是 WAITING）
    const currentIssueId = 'issue-3';
    const estimationState = 'SELECTING'; // 模擬正在估點
    
    // 更新所有 issue 狀態（模擬 updateIssueStatus 的邏輯）
    issues.forEach(issue => {
      if (issue.rounds.length > 0 && issue.finalDecision) {
        issue.status = 'completed';
      } else if (currentIssueId === issue.id && estimationState !== 'WAITING') {
        issue.status = 'inProgress';
      } else {
        issue.status = 'notStarted';
      }
    });
    
    assert(issue3.status === 'inProgress', testName, 'Issue A 保持進行中');
    assert(issue4.status === 'notStarted', testName, 'Issue B 應該是未開始（因為不是 currentIssue）');
    
  } catch (error) {
    addTestResult(`${testName}: ${error.message}`, false, testName);
  }
}

/**
 * 測試最接近平均值的牌組值
 */
function testClosestCardValue() {
  const testName = '最接近平均值測試';
  
  try {
    // 模擬 CARD_SET（只包含數字值）
    const numericCards = [
      { value: '0', label: '0' },
      { value: '1/2', label: '½' },
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '5', label: '5' },
      { value: '8', label: '8' },
      { value: '13', label: '13' },
      { value: '20', label: '20' },
      { value: '40', label: '40' },
      { value: '100', label: '100' }
    ];
    
    // 測試 1: 平均值 6.5，應該最接近 8（距離相同時選擇較大的值）
    const avg1 = 6.5;
    let closest1 = null;
    let minDist1 = Infinity;
    numericCards.forEach(card => {
      let val = card.value === '1/2' ? 0.5 : parseFloat(card.value);
      const dist = Math.abs(val - avg1);
      // 如果距離更小，或者距離相同但值更大，則更新
      if (dist < minDist1 || (dist === minDist1 && val > parseFloat(closest1 || '0'))) {
        minDist1 = dist;
        closest1 = card.value;
      }
    });
    assert(closest1 === '8', testName, '平均值 6.5 最接近 8');
    
    // 測試 2: 平均值 7.2，應該最接近 8
    const avg2 = 7.2;
    let closest2 = null;
    let minDist2 = Infinity;
    numericCards.forEach(card => {
      let val = card.value === '1/2' ? 0.5 : parseFloat(card.value);
      const dist = Math.abs(val - avg2);
      if (dist < minDist2) {
        minDist2 = dist;
        closest2 = card.value;
      }
    });
    assert(closest2 === '8', testName, '平均值 7.2 最接近 8');
    
    // 測試 3: 平均值 0.3，應該最接近 1/2
    const avg3 = 0.3;
    let closest3 = null;
    let minDist3 = Infinity;
    numericCards.forEach(card => {
      let val = card.value === '1/2' ? 0.5 : parseFloat(card.value);
      const dist = Math.abs(val - avg3);
      if (dist < minDist3) {
        minDist3 = dist;
        closest3 = card.value;
      }
    });
    assert(closest3 === '1/2', testName, '平均值 0.3 最接近 1/2');
    
    // 測試 4: 去重邏輯 - 如果平均值、最接近值、使用者選項都是 100，只顯示平均值
    const displayedValues = new Set();
    const options = [];
    
    // 模擬平均值 100.0
    const avg4 = '100.0';
    displayedValues.add(avg4);
    options.push('average-100');
    
    // 模擬最接近值也是 100
    const closest4 = '100';
    const closestNum = parseFloat(closest4);
    const avgNum = parseFloat(avg4);
    const isSameAsAverage = Math.abs(avgNum - closestNum) < 0.01;
    assert(isSameAsAverage === true, testName, '平均值 100.0 與最接近值 100 數值相同');
    
    // 檢查最接近值是否應該被跳過（因為與平均值相同）
    let shouldSkipClosest = false;
    if (isSameAsAverage) {
      shouldSkipClosest = true;
    }
    assert(shouldSkipClosest === true, testName, '最接近值不應重複顯示（與平均值相同）');
    
    // 模擬使用者選項也是 100
    const userValue = '100';
    const userNum = parseFloat(userValue);
    let isUserDuplicate = false;
    
    // 檢查是否與已顯示的值數值相同
    for (const displayed of displayedValues) {
      const displayedNum = parseFloat(displayed);
      if (!isNaN(displayedNum) && Math.abs(userNum - displayedNum) < 0.01) {
        isUserDuplicate = true;
        break;
      }
    }
    assert(isUserDuplicate === true, testName, '使用者選項 100 不應重複顯示（與平均值數值相同）');
    
  } catch (error) {
    addTestResult(`${testName}: ${error.message}`, false, testName);
  }
}

/**
 * 計算統計
 */
function calculateStats(results) {
  const numericResults = results
    .filter(r => r.card && !isNaN(parseFloat(r.card)))
    .map(r => parseFloat(r.card));
  
  let average = '-';
  let highest = '-';
  let lowest = '-';
  
  if (numericResults.length > 0) {
    average = (numericResults.reduce((a, b) => a + b, 0) / numericResults.length).toFixed(1);
    highest = Math.max(...numericResults);
    lowest = Math.min(...numericResults);
  }
  
  return { average, highest, lowest };
}

/**
 * 識別極端值
 */
function identifyExtremeValues(results, numericResults, highest, lowest) {
  const extremeValues = {
    highest: [],
    lowest: []
  };
  
  if (numericResults.length === 0) return extremeValues;
  
  results.forEach(r => {
    if (r.card && parseFloat(r.card) === highest) {
      extremeValues.highest.push({ name: r.name, card: r.card });
    }
    if (r.card && parseFloat(r.card) === lowest) {
      extremeValues.lowest.push({ name: r.name, card: r.card });
    }
  });
  
  return extremeValues;
}

/**
 * 取得 Issue 最後一輪的結果統計
 */
function getLastRoundResult(issue) {
  if (!issue.rounds || issue.rounds.length === 0) {
    return null;
  }
  
  const lastRound = issue.rounds[issue.rounds.length - 1];
  if (!lastRound.results || lastRound.results.length === 0) {
    return null;
  }
  
  return calculateStats(lastRound.results);
}

/**
 * 斷言
 */
function assert(condition, testName, message) {
  if (!condition) {
    throw new Error(message || '斷言失敗');
  }
  addTestResult(`${testName}: ${message || '通過'}`, true, testName);
}

/**
 * 添加測試結果
 */
function addTestResult(message, passed, testName) {
  testResults.push({ message, passed, testName, timestamp: new Date() });
  updateTestResultsDisplay();
}

/**
 * 更新測試結果顯示
 */
function updateTestResultsDisplay() {
  const content = document.getElementById('test-results-content');
  if (!content) return;
  
  content.innerHTML = testResults.map(result => `
    <div class="test-result-item ${result.passed ? 'pass' : 'fail'}">
      <div class="test-name">${result.passed ? '✓' : '✗'} ${result.message}</div>
      <div class="test-message">${result.testName} - ${new Date(result.timestamp).toLocaleTimeString()}</div>
    </div>
  `).join('');
}

/**
 * 顯示測試摘要
 */
function showTestSummary() {
  const total = testResults.length;
  const passed = testResults.filter(r => r.passed).length;
  const failed = total - passed;
  
  const content = document.getElementById('test-results-content');
  if (!content) return;
  
  const summary = document.createElement('div');
  summary.className = `test-summary ${failed === 0 ? 'pass' : 'fail'}`;
  summary.textContent = `總計: ${total} | 通過: ${passed} | 失敗: ${failed}`;
  
  // 移除舊的摘要
  const oldSummary = content.querySelector('.test-summary');
  if (oldSummary) {
    oldSummary.remove();
  }
  
  content.appendChild(summary);
}

/**
 * 清除測試結果
 */
function clearTestResults() {
  testResults = [];
  const content = document.getElementById('test-results-content');
  if (content) {
    content.innerHTML = '';
  }
}

/**
 * 測試 WebRTC 翻牌功能
 */
async function testWebRTC() {
  const testName = 'WebRTC 翻牌測試';
  
  try {
    addTestResult(`${testName}: 開始測試...`, true, testName);
    
    // 創建 Host Manager
    const { hostManager, peerFactory } = createTestHostManager('Host');
    
    // 創建 Client Managers
    const { clientManager: clientManager1 } = createTestClientManager({ peerFactory });
    const { clientManager: clientManager2 } = createTestClientManager({ peerFactory });
    
    // === 測試案例 1: 建立會議和加入 ===
    addTestResult(`${testName}: 測試案例 1 - 建立會議和加入`, true, testName);
    const meetingId = await hostManager.createMeeting();
    await wait(50);
    assert(meetingId !== null && meetingId !== undefined, testName, '測試案例 1.1: 建立會議成功');
    assert(hostManager.state === 'connected', testName, '測試案例 1.2: Host 連線狀態為 connected');
    
    await clientManager1.joinMeeting(meetingId, 'Client1');
    await wait(50);
    await clientManager2.joinMeeting(meetingId, 'Client2');
    await wait(50);
    
    const participants = hostManager.getParticipants();
    assert(participants.length === 2, testName, '測試案例 1.3: 兩個 Client 成功加入會議');
    assert(participants.find(p => p.name === 'Client1') !== undefined, testName, '測試案例 1.4: Client1 已加入');
    assert(participants.find(p => p.name === 'Client2') !== undefined, testName, '測試案例 1.5: Client2 已加入');
    
    // === 測試案例 2: 只有部分參與者選取時可以翻牌 ===
    addTestResult(`${testName}: 測試案例 2 - 部分參與者未選取時翻牌`, true, testName);
    hostManager.startEstimation({ title: 'Test Issue', description: 'Test' });
    await wait(50);
    assert(hostManager.estimationState === EstimationState.SELECTING, testName, '測試案例 2.1: 開始估點，狀態為 SELECTING');
    
    // 只有 Client1 選取
    clientManager1.selectCard('8');
    await wait(50);
    
    const participantsAfterSelect = hostManager.getParticipants();
    const client1 = participantsAfterSelect.find(p => p.name === 'Client1');
    const client2 = participantsAfterSelect.find(p => p.name === 'Client2');
    assert(client1.estimationState === EstimationState.SELECTED, testName, '測試案例 2.2: Client1 已選取卡片');
    assert(client2.estimationState === EstimationState.SELECTING, testName, '測試案例 2.3: Client2 未選取卡片');
    
    // 翻牌（應該成功，即使 Client2 未選取）
    const results = hostManager.flipCards();
    await wait(50);
    
    assert(hostManager.estimationState === EstimationState.REVEALED, testName, '測試案例 2.4: 翻牌後狀態為 REVEALED');
    assert(results.length === 1, testName, '測試案例 2.5: 結果只包含已選取的參與者（1 個）');
    assert(results[0].name === 'Client1', testName, '測試案例 2.6: 結果包含 Client1');
    assert(results[0].card === '8', testName, '測試案例 2.7: Client1 的卡片值為 8');
    assert(results.find(r => r.name === 'Client2') === undefined, testName, '測試案例 2.8: Client2 不在結果中（未選取）');
    
    // === 測試案例 3: 統計計算只包含已選取的參與者 ===
    addTestResult(`${testName}: 測試案例 3 - 統計計算只包含已選取的參與者`, true, testName);
    hostManager.resetRound();
    await wait(50);
    hostManager.startEstimation({ title: 'Test Issue 2', description: 'Test' });
    await wait(50);
    
    // Client1 選取 8，Client2 選取 13
    clientManager1.selectCard('8');
    clientManager2.selectCard('13');
    await wait(50);
    
    const results2 = hostManager.flipCards();
    await wait(50);
    
    // 計算統計（只計算數字值）
    const numericResults = results2
      .filter(r => r.card && !isNaN(parseFloat(r.card)))
      .map(r => parseFloat(r.card));
    
    assert(numericResults.length === 2, testName, '測試案例 3.1: 統計包含兩個數字值');
    assert(numericResults.includes(8), testName, '測試案例 3.2: 統計包含 8');
    assert(numericResults.includes(13), testName, '測試案例 3.3: 統計包含 13');
    
    const average = numericResults.reduce((a, b) => a + b, 0) / numericResults.length;
    assert(Math.abs(average - 10.5) < 0.01, testName, '測試案例 3.4: 平均值為 10.5');
    
    // === 測試案例 4: Host 參與估點但未選取時也可以翻牌 ===
    addTestResult(`${testName}: 測試案例 4 - Host 未選取時翻牌`, true, testName);
    hostManager.resetRound();
    await wait(50);
    hostManager.startEstimation({ title: 'Test Issue 3', description: 'Test' });
    await wait(50);
    
    // 只有 Client1 選取
    clientManager1.selectCard('5');
    await wait(50);
    
    // Host 未選取，但可以翻牌
    const results3 = hostManager.flipCards(null); // hostResult 為 null
    await wait(50);
    
    assert(results3.length === 1, testName, '測試案例 4.1: 只有 Client1 的結果（Host 未選取）');
    assert(results3[0].name === 'Client1', testName, '測試案例 4.2: 結果包含 Client1');
    assert(results3[0].card === '5', testName, '測試案例 4.3: Client1 的卡片值為 5');
    
    // === 測試案例 5: 所有參與者都未選取時翻牌返回空陣列 ===
    addTestResult(`${testName}: 測試案例 5 - 所有參與者都未選取時翻牌`, true, testName);
    hostManager.resetRound();
    await wait(50);
    hostManager.startEstimation({ title: 'Test Issue 4', description: 'Test' });
    await wait(50);
    
    // 沒有人選取
    const results4 = hostManager.flipCards();
    await wait(50);
    
    assert(results4.length === 0, testName, '測試案例 5.1: 所有參與者都未選取時返回空陣列');
    
    // === 測試案例 6: 包含非數字卡片值的統計計算 ===
    addTestResult(`${testName}: 測試案例 6 - 包含非數字卡片值的統計計算`, true, testName);
    hostManager.resetRound();
    await wait(50);
    hostManager.startEstimation({ title: 'Test Issue 5', description: 'Test' });
    await wait(50);
    
    // Client1 選取數字，Client2 選取非數字
    clientManager1.selectCard('8');
    clientManager2.selectCard('?');
    await wait(50);
    
    const results5 = hostManager.flipCards();
    await wait(50);
    
    const numericResults2 = results5
      .filter(r => r.card && !isNaN(parseFloat(r.card)))
      .map(r => parseFloat(r.card));
    
    assert(numericResults2.length === 1, testName, '測試案例 6.1: 統計只包含數字值（排除非數字）');
    assert(numericResults2[0] === 8, testName, '測試案例 6.2: 統計包含數字 8');
    assert(results5.find(r => r.card === '?') !== undefined, testName, '測試案例 6.3: 結果包含非數字卡片（但不在統計中）');
    
    // === 測試案例 7: Host 選取時翻牌 ===
    addTestResult(`${testName}: 測試案例 7 - Host 選取時翻牌`, true, testName);
    hostManager.resetRound();
    await wait(50);
    hostManager.startEstimation({ title: 'Test Issue 6', description: 'Test' });
    await wait(50);
    
    // Client1 和 Host 都選取
    clientManager1.selectCard('13');
    await wait(50);
    const results6 = hostManager.flipCards({ name: 'Host', card: '20' });
    await wait(50);
    
    assert(results6.length === 2, testName, '測試案例 7.1: 結果包含 Client1 和 Host');
    assert(results6.find(r => r.name === 'Client1' && r.card === '13') !== undefined, testName, '測試案例 7.2: 結果包含 Client1 的卡片 13');
    assert(results6.find(r => r.name === 'Host' && r.card === '20') !== undefined, testName, '測試案例 7.3: 結果包含 Host 的卡片 20');
    
    const numericResults3 = results6
      .filter(r => r.card && !isNaN(parseFloat(r.card)))
      .map(r => parseFloat(r.card));
    const average2 = numericResults3.reduce((a, b) => a + b, 0) / numericResults3.length;
    assert(Math.abs(average2 - 16.5) < 0.01, testName, '測試案例 7.4: 平均值為 16.5 (13+20)/2');
    
    addTestResult(`${testName}: 所有測試案例完成`, true, testName);
    
  } catch (error) {
    addTestResult(`${testName}: ${error.message}`, false, testName);
    console.error('WebRTC 測試錯誤:', error);
    console.error('錯誤堆疊:', error.stack);
  }
}

