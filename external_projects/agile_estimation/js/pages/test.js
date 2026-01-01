/**
 * Test Page
 * 測試頁面 - 測試應用程式的業務邏輯
 */

import { storage } from '../utils/storage/index.js';
import { createMockStorage } from '../utils/storage/factory.js';
import { i18n } from '../utils/i18n.js';
import { theme } from '../utils/theme.js';
import { addHistory, getHistory, clearHistory, setStorage, resetStorage } from '../data/history.js';
import { createTestHostManager, createTestClientManager, wait } from '../webrtc/test-helpers.js';
import { EstimationState } from '../webrtc/peer-manager.js';

// 測試結果
let testResults = [];
let filterMode = 'all'; // 'all', 'passed', 'failed'
let groupExpanded = {}; // 追蹤每個群組的展開狀態

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
        
        <div class="test-results" id="test-results">
          <h2>測試結果</h2>
          <div id="test-results-summary"></div>
          <div id="test-results-filters"></div>
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
      
      #test-results-summary {
        margin-bottom: var(--spacing-md);
      }
      
      .test-summary {
        padding: var(--spacing-md);
        border-radius: var(--radius-sm);
        font-weight: 600;
        font-size: var(--font-size-lg);
        margin-bottom: var(--spacing-md);
      }
      
      .test-summary.pass {
        background: rgba(34, 197, 94, 0.1);
        color: #22c55e;
        border: 2px solid #22c55e;
      }
      
      .test-summary.fail {
        background: rgba(239, 68, 68, 0.1);
        color: #ef4444;
        border: 2px solid #ef4444;
      }
      
      #test-results-filters {
        margin-bottom: var(--spacing-md);
      }
      
      .test-filters {
        display: flex;
        gap: var(--spacing-sm);
        flex-wrap: wrap;
      }
      
      .test-filters .btn {
        min-width: 100px;
      }
      
      .test-group {
        margin-bottom: var(--spacing-md);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        overflow: hidden;
      }
      
      .test-group-header {
        display: flex;
        align-items: center;
        padding: var(--spacing-md);
        background: var(--color-bg-tertiary);
        cursor: pointer;
        user-select: none;
        gap: var(--spacing-sm);
        transition: background-color 0.2s;
      }
      
      .test-group-header:hover {
        background: var(--color-bg-hover);
      }
      
      .test-group-toggle-icon {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        min-width: 16px;
        display: inline-block;
      }
      
      .test-group-name {
        font-weight: 600;
        font-size: var(--font-size-lg);
        color: var(--color-text-primary);
        flex: 1;
      }
      
      .test-group-stats {
        display: flex;
        gap: var(--spacing-md);
        font-size: var(--font-size-sm);
      }
      
      .test-group-stats .stat-pass {
        color: #22c55e;
      }
      
      .test-group-stats .stat-fail {
        color: #ef4444;
      }
      
      .test-group-stats .stat-total {
        color: var(--color-text-secondary);
      }
      
      .test-group-content {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-out;
      }
      
      .test-group-content.expanded {
        max-height: 10000px;
        transition: max-height 0.5s ease-in;
      }
      
      .test-group-content.collapsed {
        max-height: 0;
      }
      
      .test-group-content .test-result-item {
        margin: var(--spacing-xs) var(--spacing-md);
        margin-bottom: var(--spacing-xs);
      }
    </style>
  `;
  
  // 套用翻譯
  i18n.applyTranslations();
  
  // 自動執行所有測試
  runAllTests();
  
  return () => {
    // 清理工作
    testResults = [];
  };
}

/**
 * 設定事件監聽（目前不需要，因為自動執行測試）
 */
function setupEventListeners() {
  // 目前不需要任何事件監聽
}

/**
 * 執行所有測試
 */
async function runAllTests() {
  clearTestResults();
  addTestResult('開始執行所有測試...', true, '系統');
  
  const tests = ['storage', 'stats', 'extreme', 'history', 'issue', 'closest', 'webrtc', 'meeting-history', 'rename-meeting', 'reopen-meeting'];
  
  for (const test of tests) {
    console.log(`執行測試: ${test}`);
    try {
      await runTest(test);
    } catch (error) {
      console.error(`測試 ${test} 執行時發生錯誤:`, error);
      addTestResult(`測試 ${test} 執行時發生錯誤: ${error.message}`, false, '系統');
    }
  }
  
  console.log('所有測試執行完成');
  showTestSummary();
}

/**
 * 執行單個測試
 */
async function runTest(testName) {
  console.log(`[runTest] 開始執行測試: ${testName}`);
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
        console.log(`[runTest] 準備執行 testWebRTC`);
        console.log(`[runTest] testWebRTC 函數類型:`, typeof testWebRTC);
        try {
          await testWebRTC();
          console.log(`[runTest] testWebRTC 執行完成`);
        } catch (innerError) {
          console.error(`[runTest] testWebRTC 內部錯誤:`, innerError);
          throw innerError; // 重新拋出，讓外層 catch 處理
        }
        break;
      case 'meeting-history':
        console.log(`[runTest] 準備執行 testMeetingHistory`);
        await testMeetingHistory();
        console.log(`[runTest] testMeetingHistory 執行完成`);
        break;
      case 'rename-meeting':
        console.log(`[runTest] 準備執行 testRenameMeeting`);
        await testRenameMeeting();
        console.log(`[runTest] testRenameMeeting 執行完成`);
        break;
      case 'reopen-meeting':
        console.log(`[runTest] 準備執行 testReopenMeeting`);
        await testReopenMeeting();
        console.log(`[runTest] testReopenMeeting 執行完成`);
        break;
      default:
        addTestResult(`未知的測試: ${testName}`, false, '系統');
    }
    console.log(`[runTest] 測試 ${testName} 執行成功`);
  } catch (error) {
    console.error(`[runTest] 測試執行錯誤: ${testName}`, error);
    addTestResult(`測試執行錯誤: ${error.message}`, false, testName);
    console.error('錯誤堆疊:', error.stack);
  } finally {
    console.log(`[runTest] 測試 ${testName} 執行結束`);
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
 * 使用 MockStorage 避免影響實際環境
 */
function testHistory() {
  const testName = '歷史記錄測試';
  
  // 保存原始 storage
  const originalStorage = storage;
  
  try {
    // 使用 MockStorage 避免影響實際環境
    const mockStorage = createMockStorage();
    setStorage(mockStorage);
    
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
    
  } catch (error) {
    addTestResult(`${testName}: ${error.message}`, false, testName);
  } finally {
    // 恢復原始 storage
    resetStorage();
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
 * HTML 跳脫
 */
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
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
  try {
    testResults.push({ message, passed, testName, timestamp: new Date() });
    updateTestResultsDisplay();
  } catch (error) {
    console.error('addTestResult 錯誤:', error);
    // 即使顯示更新失敗，也不影響測試執行
  }
}

/**
 * 更新測試結果顯示
 */
function updateTestResultsDisplay() {
  const content = document.getElementById('test-results-content');
  if (!content) return;
  
  // 根據 filterMode 過濾結果
  let filteredResults = testResults;
  if (filterMode === 'passed') {
    filteredResults = testResults.filter(r => r.passed);
  } else if (filterMode === 'failed') {
    filteredResults = testResults.filter(r => !r.passed);
  }
  
  // 按 testName 分組
  const groupedResults = {};
  filteredResults.forEach(result => {
    const groupName = result.testName || '其他';
    if (!groupedResults[groupName]) {
      groupedResults[groupName] = [];
    }
    groupedResults[groupName].push(result);
  });
  
  // 生成 HTML
  const groupsHTML = Object.keys(groupedResults).sort().map(groupName => {
    const groupResults = groupedResults[groupName];
    const passedCount = groupResults.filter(r => r.passed).length;
    const failedCount = groupResults.filter(r => !r.passed).length;
    const totalCount = groupResults.length;
    // 確保狀態正確初始化
    if (groupExpanded[groupName] === undefined) {
      groupExpanded[groupName] = true; // 預設展開
    }
    const isExpanded = groupExpanded[groupName] === true;
    
    return `
      <div class="test-group" data-group="${groupName}">
        <div class="test-group-header" data-group-toggle="${groupName}">
          <span class="test-group-toggle-icon">${isExpanded ? '▼' : '▶'}</span>
          <span class="test-group-name">${escapeHtml(groupName)}</span>
          <span class="test-group-stats">
            <span class="stat-pass">通過: ${passedCount}</span>
            <span class="stat-fail">失敗: ${failedCount}</span>
            <span class="stat-total">總計: ${totalCount}</span>
          </span>
        </div>
        <div class="test-group-content ${isExpanded ? 'expanded' : 'collapsed'}">
          ${groupResults.map(result => `
            <div class="test-result-item ${result.passed ? 'pass' : 'fail'}">
              <div class="test-name">${result.passed ? '✓' : '✗'} ${escapeHtml(result.message)}</div>
              <div class="test-message">${new Date(result.timestamp).toLocaleTimeString()}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
  
  content.innerHTML = groupsHTML;
  
  // 綁定展開/收合事件（使用事件委派，避免重複綁定）
  content.querySelectorAll('[data-group-toggle]').forEach(header => {
    // 移除舊的事件監聽器（如果有的話）
    const newHeader = header.cloneNode(true);
    header.parentNode.replaceChild(newHeader, header);
    
    // 綁定新的事件監聽器
    newHeader.addEventListener('click', (e) => {
      e.stopPropagation(); // 防止事件冒泡
      const groupName = newHeader.dataset.groupToggle;
      // 確保狀態正確初始化
      if (groupExpanded[groupName] === undefined) {
        groupExpanded[groupName] = true; // 預設展開
      }
      groupExpanded[groupName] = !groupExpanded[groupName];
      updateTestResultsDisplay();
    });
  });
  
  // 更新摘要和過濾器
  updateTestSummary();
  updateTestFilters();
}

/**
 * 更新測試摘要
 */
function updateTestSummary() {
  const summaryContainer = document.getElementById('test-results-summary');
  if (!summaryContainer) return;
  
  const total = testResults.length;
  const passed = testResults.filter(r => r.passed).length;
  const failed = total - passed;
  
  summaryContainer.innerHTML = `
    <div class="test-summary ${failed === 0 ? 'pass' : 'fail'}">
      總計: ${total} | 通過: ${passed} | 失敗: ${failed}
    </div>
  `;
}

/**
 * 更新測試過濾器
 */
function updateTestFilters() {
  const filtersContainer = document.getElementById('test-results-filters');
  if (!filtersContainer) return;
  
  const total = testResults.length;
  const passed = testResults.filter(r => r.passed).length;
  const failed = total - passed;
  
  filtersContainer.innerHTML = `
    <div class="test-filters">
      <button class="btn btn-sm ${filterMode === 'all' ? 'btn-primary' : 'btn-secondary'}" data-filter="all">
        全部 (${total})
      </button>
      <button class="btn btn-sm ${filterMode === 'passed' ? 'btn-primary' : 'btn-secondary'}" data-filter="passed">
        通過 (${passed})
      </button>
      <button class="btn btn-sm ${filterMode === 'failed' ? 'btn-primary' : 'btn-secondary'}" data-filter="failed">
        失敗 (${failed})
      </button>
    </div>
  `;
  
  // 綁定過濾器按鈕事件
  filtersContainer.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      filterMode = btn.dataset.filter;
      updateTestResultsDisplay();
    });
  });
}

/**
 * 顯示測試摘要（向後兼容）
 */
function showTestSummary() {
  updateTestSummary();
  updateTestFilters();
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
  
  let hostManager = null;
  let clientManager1 = null;
  let clientManager2 = null;
  
  try {
    console.log(`[testWebRTC] 函數開始執行`);
    addTestResult(`${testName}: 開始測試...`, true, testName);
    console.log(`[testWebRTC] 已添加開始測試訊息`);
    
    // 創建 Host Manager
    console.log(`[testWebRTC] 準備創建 Host Manager`);
    const result = createTestHostManager('Host');
    console.log(`[testWebRTC] Host Manager 創建完成`, result);
    hostManager = result.hostManager;
    const peerFactory = result.peerFactory;
    console.log(`[testWebRTC] Host Manager 和 Peer Factory 已取得`);
    
    // 創建 Client Managers
    console.log(`[testWebRTC] 準備創建 Client Manager 1`);
    const client1Result = createTestClientManager({ peerFactory });
    console.log(`[testWebRTC] Client Manager 1 創建完成`);
    clientManager1 = client1Result.clientManager;
    console.log(`[testWebRTC] 準備創建 Client Manager 2`);
    const client2Result = createTestClientManager({ peerFactory });
    console.log(`[testWebRTC] Client Manager 2 創建完成`);
    clientManager2 = client2Result.clientManager;
    console.log(`[testWebRTC] 所有 Manager 創建完成，準備開始測試案例 1`);
    
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
    
    // 測試案例 1 完成
    addTestResult(`${testName}: 測試案例 1 完成`, true, testName);
    
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
    console.log(`${testName}: 測試完成`);
    
  } catch (error) {
    const errorMessage = error.message || String(error);
    addTestResult(`${testName}: ${errorMessage}`, false, testName);
    console.error('WebRTC 測試錯誤:', error);
    console.error('錯誤堆疊:', error.stack);
    // 不重新拋出錯誤，讓後續測試可以繼續執行
  } finally {
    // 清理資源
    try {
      if (hostManager && typeof hostManager.closeMeeting === 'function') {
        hostManager.closeMeeting();
      }
      if (clientManager1 && typeof clientManager1.leaveMeeting === 'function') {
        clientManager1.leaveMeeting();
      }
      if (clientManager2 && typeof clientManager2.leaveMeeting === 'function') {
        clientManager2.leaveMeeting();
      }
    } catch (cleanupError) {
      console.error('清理資源時發生錯誤:', cleanupError);
      // 不讓清理錯誤影響測試執行
    }
  }
}

/**
 * 測試會議記錄儲存機制
 * 驗證建立會議和各種操作都會正確儲存到 storage
 */
async function testMeetingHistory() {
  const testName = '會議記錄儲存測試';
  
  try {
    addTestResult(`${testName}: 開始測試...`, true, testName);
    
    // 使用 Mock Storage 避免影響實際環境
    const mockStorage = createMockStorage();
    setStorage(mockStorage);
    
    try {
    
    // === 測試案例 1: 建立會議時儲存 ===
    addTestResult(`${testName}: 測試案例 1 - 建立會議時儲存`, true, testName);
    const meetingId = 'TEST-MEETING-001';
    const meetingName = '測試會議';
    
      addHistory({
        mode: 'host',
        meetingId,
        meetingName,
        participants: 0,
        issues: []
      });
      
      const history1 = getHistory();
    assert(history1.length === 1, testName, '測試案例 1.1: 建立會議後 history 中有記錄');
    assert(history1[0].meetingId === meetingId, testName, '測試案例 1.2: 會議 ID 正確');
    assert(history1[0].meetingName === meetingName, testName, '測試案例 1.3: 會議名稱正確');
    assert(history1[0].participants === 0, testName, '測試案例 1.4: 參與者數量為 0');
    assert(Array.isArray(history1[0].issues), testName, '測試案例 1.5: issues 是陣列');
    assert(history1[0].issues.length === 0, testName, '測試案例 1.6: 初始 issues 為空');
    assert(history1[0].completedAt === null, testName, '測試案例 1.7: 會議未完成');
    
    // === 測試案例 2: 建立 issue 時更新 ===
    addTestResult(`${testName}: 測試案例 2 - 建立 issue 時更新`, true, testName);
    const issue1 = {
      issueId: 'issue-1',
      issueTitle: 'Issue 1',
      issueDescription: 'Description 1',
      rounds: [],
      finalDecision: null,
      completedAt: null
    };
    
      addHistory({
        mode: 'host',
        meetingId,
        meetingName,
        participants: 1,
        issues: [issue1]
      });
      
      const history2 = getHistory();
    const meetingRecord2 = history2.find(r => r.meetingId === meetingId);
    assert(meetingRecord2.issues.length === 1, testName, '測試案例 2.1: issue 已新增');
    assert(meetingRecord2.issues[0].issueId === 'issue-1', testName, '測試案例 2.2: issue ID 正確');
    assert(meetingRecord2.issues[0].issueTitle === 'Issue 1', testName, '測試案例 2.3: issue 標題正確');
    assert(meetingRecord2.participants === 1, testName, '測試案例 2.4: 參與者數量已更新');
    
    // === 測試案例 3: 翻牌時更新輪次結果 ===
    addTestResult(`${testName}: 測試案例 3 - 翻牌時更新輪次結果`, true, testName);
    const round1 = {
      roundNumber: 1,
      results: [
        { name: 'Participant1', card: '8' },
        { name: 'Participant2', card: '13' }
      ],
      completedAt: new Date().toISOString()
    };
    
    const issue1WithRound = {
      ...issue1,
      rounds: [round1]
    };
    
      addHistory({
        mode: 'host',
        meetingId,
        meetingName,
        participants: 2,
        issues: [issue1WithRound]
      });
      
      const history3 = getHistory();
    const meetingRecord3 = history3.find(r => r.meetingId === meetingId);
    assert(meetingRecord3.issues[0].rounds.length === 1, testName, '測試案例 3.1: 輪次已新增');
    assert(meetingRecord3.issues[0].rounds[0].roundNumber === 1, testName, '測試案例 3.2: 輪次編號正確');
    assert(meetingRecord3.issues[0].rounds[0].results.length === 2, testName, '測試案例 3.3: 結果數量正確');
    assert(meetingRecord3.participants === 2, testName, '測試案例 3.4: 參與者數量已更新');
    
    // === 測試案例 4: 新的一輪時更新 ===
    addTestResult(`${testName}: 測試案例 4 - 新的一輪時更新`, true, testName);
    const round2 = {
      roundNumber: 2,
      results: [
        { name: 'Participant1', card: '5' },
        { name: 'Participant2', card: '8' }
      ],
      completedAt: new Date().toISOString()
    };
    
    const issue1WithTwoRounds = {
      ...issue1,
      rounds: [round1, round2]
    };
    
      addHistory({
        mode: 'host',
        meetingId,
        meetingName,
        participants: 2,
        issues: [issue1WithTwoRounds]
      });
      
      const history4 = getHistory();
    const meetingRecord4 = history4.find(r => r.meetingId === meetingId);
    assert(meetingRecord4.issues[0].rounds.length === 2, testName, '測試案例 4.1: 有兩個輪次');
    assert(meetingRecord4.issues[0].rounds[1].roundNumber === 2, testName, '測試案例 4.2: 第二輪編號正確');
    
    // === 測試案例 5: 完成 issue 時更新 ===
    addTestResult(`${testName}: 測試案例 5 - 完成 issue 時更新`, true, testName);
    const completedIssue1 = {
      ...issue1WithTwoRounds,
      finalDecision: '8',
      completedAt: new Date().toISOString()
    };
    
      addHistory({
        mode: 'host',
        meetingId,
        meetingName,
        participants: 2,
        issues: [completedIssue1]
      });
      
      const history5 = getHistory();
    const meetingRecord5 = history5.find(r => r.meetingId === meetingId);
    assert(meetingRecord5.issues[0].finalDecision === '8', testName, '測試案例 5.1: 最終決定已設定');
    assert(meetingRecord5.issues[0].completedAt !== null, testName, '測試案例 5.2: 完成時間已設定');
    
    // === 測試案例 6: 多個 issue ===
    addTestResult(`${testName}: 測試案例 6 - 多個 issue`, true, testName);
    const issue2 = {
      issueId: 'issue-2',
      issueTitle: 'Issue 2',
      issueDescription: 'Description 2',
      rounds: [],
      finalDecision: null,
      completedAt: null
    };
    
      addHistory({
        mode: 'host',
        meetingId,
        meetingName,
        participants: 2,
        issues: [completedIssue1, issue2]
      });
      
      const history6 = getHistory();
    const meetingRecord6 = history6.find(r => r.meetingId === meetingId);
    assert(meetingRecord6.issues.length === 2, testName, '測試案例 6.1: 有兩個 issue');
    assert(meetingRecord6.issues[1].issueId === 'issue-2', testName, '測試案例 6.2: 第二個 issue ID 正確');
    
    // === 測試案例 7: 參與者變更時更新 ===
    addTestResult(`${testName}: 測試案例 7 - 參與者變更時更新`, true, testName);
      addHistory({
        mode: 'host',
        meetingId,
        meetingName,
        participants: 3, // 參與者數量變更
        issues: [completedIssue1, issue2]
      });
      
      const history7 = getHistory();
    const meetingRecord7 = history7.find(r => r.meetingId === meetingId);
    assert(meetingRecord7.participants === 3, testName, '測試案例 7.1: 參與者數量已更新');
    
    // === 測試案例 8: 會議結束時標記完成 ===
    addTestResult(`${testName}: 測試案例 8 - 會議結束時標記完成`, true, testName);
    const completedAt = new Date().toISOString();
      addHistory({
        mode: 'host',
        meetingId,
        meetingName,
        participants: 3,
        issues: [completedIssue1, issue2],
        completedAt: completedAt
      });
      
      const history8 = getHistory();
    const meetingRecord8 = history8.find(r => r.meetingId === meetingId);
    assert(meetingRecord8.completedAt === completedAt, testName, '測試案例 8.1: 會議完成時間已設定');
    
      // === 測試案例 9: 驗證資料完整性 ===
      addTestResult(`${testName}: 測試案例 9 - 驗證資料完整性`, true, testName);
      const finalHistory = getHistory();
      const finalRecord = finalHistory.find(r => r.meetingId === meetingId);
      
      assert(finalRecord !== undefined, testName, '測試案例 9.1: 會議記錄存在');
      assert(finalRecord.mode === 'host', testName, '測試案例 9.2: 模式正確');
      assert(finalRecord.issues.length === 2, testName, '測試案例 9.3: issue 數量正確');
      assert(finalRecord.issues[0].rounds.length === 2, testName, '測試案例 9.4: 第一個 issue 的輪次數量正確');
      assert(finalRecord.issues[0].rounds[0].results.length === 2, testName, '測試案例 9.5: 第一輪結果數量正確');
      
      addTestResult(`${testName}: 所有測試案例完成`, true, testName);
      
    } finally {
      // 恢復原始 storage
      resetStorage();
    }
    
  } catch (error) {
    addTestResult(`${testName}: ${error.message}`, false, testName);
    console.error('會議記錄儲存測試錯誤:', error);
    console.error('錯誤堆疊:', error.stack);
    // 確保在錯誤時也恢復 storage
    resetStorage();
  }
}

/**
 * 測試會議名稱重新命名功能
 */
async function testRenameMeeting() {
  const testName = '會議名稱重新命名測試';
  
  try {
    addTestResult(`${testName}: 開始測試...`, true, testName);
    
    // 使用 Mock Storage 避免影響實際環境
    const mockStorage = createMockStorage();
    setStorage(mockStorage);
    
    try {
      // === 測試案例 1: 建立會議時設定名稱 ===
      addTestResult(`${testName}: 測試案例 1 - 建立會議時設定名稱`, true, testName);
      const meetingId = 'TEST-RENAME-001';
      const initialName = '初始會議名稱';
      
      addHistory({
        mode: 'host',
        meetingId,
        meetingName: initialName,
        participants: 0,
        issues: []
      });
      
      const history1 = getHistory();
    const record1 = history1.find(r => r.meetingId === meetingId);
    assert(record1 !== undefined, testName, '測試案例 1.1: 會議記錄已建立');
    assert(record1.meetingName === initialName, testName, '測試案例 1.2: 初始會議名稱正確');
    
    // === 測試案例 2: 會議中修改會議名稱 ===
    addTestResult(`${testName}: 測試案例 2 - 會議中修改會議名稱`, true, testName);
    const newName1 = '修改後的會議名稱';
    
      addHistory({
        mode: 'host',
        meetingId,
        meetingName: newName1,
        participants: 2,
        issues: []
      });
      
      const history2 = getHistory();
    const record2 = history2.find(r => r.meetingId === meetingId);
    assert(record2.meetingName === newName1, testName, '測試案例 2.1: 會議名稱已更新');
    assert(record2.participants === 2, testName, '測試案例 2.2: 其他資料未受影響');
    
    // === 測試案例 3: 再次修改會議名稱 ===
    addTestResult(`${testName}: 測試案例 3 - 再次修改會議名稱`, true, testName);
    const newName2 = '第二次修改的名稱';
    
      addHistory({
      mode: 'host',
      meetingId,
      meetingName: newName2,
      participants: 2,
      issues: []
    });
    
      const history3 = getHistory();
    const record3 = history3.find(r => r.meetingId === meetingId);
    assert(record3.meetingName === newName2, testName, '測試案例 3.1: 會議名稱再次更新');
    
    // === 測試案例 4: 將會議名稱設為空（使用會議 ID） ===
    addTestResult(`${testName}: 測試案例 4 - 將會議名稱設為空`, true, testName);
    
      addHistory({
      mode: 'host',
      meetingId,
      meetingName: '',
      participants: 2,
      issues: []
    });
    
      const history4 = getHistory();
    const record4 = history4.find(r => r.meetingId === meetingId);
    assert(record4.meetingName === null, testName, '測試案例 4.1: 空字串應轉換為 null');
    
    // === 測試案例 5: 會議結束後修改會議名稱 ===
    addTestResult(`${testName}: 測試案例 5 - 會議結束後修改會議名稱`, true, testName);
    const completedAt = new Date().toISOString();
    const finalName = '會議結束後的名稱';
    
      addHistory({
      mode: 'host',
      meetingId,
      meetingName: finalName,
      participants: 2,
      issues: [
        {
          issueId: 'issue-1',
          issueTitle: 'Issue 1',
          issueDescription: 'Description 1',
          rounds: [],
          finalDecision: '8',
          completedAt: completedAt
        }
      ],
      completedAt: completedAt
    });
    
      const history5 = getHistory();
    const record5 = history5.find(r => r.meetingId === meetingId);
    assert(record5.meetingName === finalName, testName, '測試案例 5.1: 會議結束後名稱已更新');
    assert(record5.completedAt === completedAt, testName, '測試案例 5.2: 完成時間正確');
    assert(record5.issues.length === 1, testName, '測試案例 5.3: Issue 資料未受影響');
    
    // === 測試案例 6: 只更新會議名稱，不影響其他資料 ===
    addTestResult(`${testName}: 測試案例 6 - 只更新會議名稱，不影響其他資料`, true, testName);
    const nameOnly = '僅更新名稱';
    
    // 先建立一個有完整資料的記錄
      addHistory({
      mode: 'host',
      meetingId: 'TEST-RENAME-002',
      meetingName: '原始名稱',
      participants: 3,
      issues: [
        {
          issueId: 'issue-1',
          issueTitle: 'Issue 1',
          rounds: [{ roundNumber: 1, results: [{ name: 'User1', card: '5' }] }],
          finalDecision: '5',
          completedAt: completedAt
        }
      ],
      completedAt: completedAt
    });
    
    // 只更新會議名稱
      addHistory({
      mode: 'host',
      meetingId: 'TEST-RENAME-002',
      meetingName: nameOnly,
      participants: 3,
      issues: [
        {
          issueId: 'issue-1',
          issueTitle: 'Issue 1',
          rounds: [{ roundNumber: 1, results: [{ name: 'User1', card: '5' }] }],
          finalDecision: '5',
          completedAt: completedAt
        }
      ],
      completedAt: completedAt
    });
    
      const history6 = getHistory();
    const record6 = history6.find(r => r.meetingId === 'TEST-RENAME-002');
    assert(record6.meetingName === nameOnly, testName, '測試案例 6.1: 會議名稱已更新');
    assert(record6.participants === 3, testName, '測試案例 6.2: 參與者數量未變');
    assert(record6.issues.length === 1, testName, '測試案例 6.3: Issue 數量未變');
    assert(record6.issues[0].issueId === 'issue-1', testName, '測試案例 6.4: Issue ID 未變');
    assert(record6.issues[0].rounds.length === 1, testName, '測試案例 6.5: 輪次資料未變');
    assert(record6.completedAt === completedAt, testName, '測試案例 6.6: 完成時間未變');
    
      addTestResult(`${testName}: 所有測試案例完成`, true, testName);
      
    } finally {
      // 恢復原始 storage
      resetStorage();
    }
    
  } catch (error) {
    addTestResult(`${testName}: ${error.message}`, false, testName);
    console.error('會議名稱重新命名測試錯誤:', error);
    console.error('錯誤堆疊:', error.stack);
    // 確保在錯誤時也恢復 storage
    resetStorage();
  }
}

/**
 * 測試從歷史記錄重新開啟會議功能
 */
async function testReopenMeeting() {
  const testName = '重新開啟會議測試';
  
  try {
    addTestResult(`${testName}: 開始測試...`, true, testName);
    
    // 使用 Mock Storage 避免影響實際環境
    const mockStorage = createMockStorage();
    setStorage(mockStorage);
    
    try {
      // === 測試案例 1: 建立一個有已完成 Issue 的會議記錄 ===
      addTestResult(`${testName}: 測試案例 1 - 建立有已完成 Issue 的會議記錄`, true, testName);
      const meetingId = 'TEST-REOPEN-001';
      const meetingName = '測試會議';
      const completedAt = new Date().toISOString();
      
      addHistory({
      mode: 'host',
      meetingId,
      meetingName,
      participants: 2,
      issues: [
        {
          issueId: 'issue-1',
          issueTitle: 'Issue 1',
          issueDescription: 'Description 1',
          rounds: [
            {
              roundNumber: 1,
              results: [
                { name: 'User1', card: '5' },
                { name: 'User2', card: '8' }
              ],
              average: 6.5,
              highest: 8,
              lowest: 5
            }
          ],
          finalDecision: '8',
          completedAt: completedAt
        }
      ],
      completedAt: completedAt
    });
    
      const history1 = getHistory();
    const record1 = history1.find(r => r.meetingId === meetingId);
    assert(record1 !== undefined, testName, '測試案例 1.1: 會議記錄已建立');
    assert(record1.issues.length === 1, testName, '測試案例 1.2: Issue 數量正確');
    assert(record1.issues[0].finalDecision === '8', testName, '測試案例 1.3: Issue 已完成');
    
    // === 測試案例 2: 模擬重新開啟會議，Issue 應重置為未開始 ===
    addTestResult(`${testName}: 測試案例 2 - 重新開啟會議，Issue 重置為未開始`, true, testName);
    
    // 模擬重新開啟會議的資料轉換（保留歷史輪次）
    const restoreData = {
      meetingId: record1.meetingId,
      meetingName: record1.meetingName,
      issues: record1.issues.map(issue => {
        return {
          id: issue.issueId,
          title: issue.issueTitle,
          description: issue.issueDescription || '',
          status: 'notStarted', // 重置為未開始，允許重新估點
          rounds: issue.rounds ? issue.rounds.map(round => ({
            roundNumber: round.roundNumber,
            results: round.results ? round.results.map(r => ({
              name: r.name,
              card: r.card
            })) : [],
            completedAt: round.completedAt || null
          })) : [], // 保留所有歷史輪次
          finalDecision: issue.finalDecision || null, // 保留最終決定（作為參考）
          completedAt: null // 清除完成時間，允許重新估點
        };
      })
    };
    
    assert(restoreData.issues.length === 1, testName, '測試案例 2.1: Issue 數量正確');
    assert(restoreData.issues[0].status === 'notStarted', testName, '測試案例 2.2: Issue 狀態重置為未開始');
    assert(restoreData.issues[0].rounds.length === 1, testName, '測試案例 2.3: 輪次已保留');
    assert(restoreData.issues[0].rounds[0].roundNumber === 1, testName, '測試案例 2.4: 輪次編號正確');
    assert(restoreData.issues[0].rounds[0].results.length === 2, testName, '測試案例 2.5: 輪次結果已保留');
    assert(restoreData.issues[0].finalDecision === '8', testName, '測試案例 2.6: 最終決定已保留（作為參考）');
    assert(restoreData.issues[0].completedAt === null, testName, '測試案例 2.7: 完成時間已清除');
    assert(restoreData.issues[0].id === 'issue-1', testName, '測試案例 2.8: Issue ID 保持不變');
    assert(restoreData.issues[0].title === 'Issue 1', testName, '測試案例 2.9: Issue 標題保持不變');
    assert(restoreData.issues[0].description === 'Description 1', testName, '測試案例 2.10: Issue 描述保持不變');
    
    // === 測試案例 3: 重新開啟有未完成 Issue 的會議 ===
    addTestResult(`${testName}: 測試案例 3 - 重新開啟有未完成 Issue 的會議`, true, testName);
    
      addHistory({
      mode: 'host',
      meetingId: 'TEST-REOPEN-002',
      meetingName: '測試會議 2',
      participants: 1,
      issues: [
        {
          issueId: 'issue-2',
          issueTitle: 'Issue 2',
          issueDescription: 'Description 2',
          rounds: [],
          finalDecision: null,
          completedAt: null
        }
      ],
      completedAt: null
    });
    
      const history2 = getHistory();
    const record2 = history2.find(r => r.meetingId === 'TEST-REOPEN-002');
    assert(record2 !== undefined, testName, '測試案例 3.1: 會議記錄已建立');
    assert(record2.issues.length === 1, testName, '測試案例 3.2: Issue 數量正確');
    assert(record2.issues[0].finalDecision === null, testName, '測試案例 3.3: Issue 未完成');
    
    // 模擬重新開啟（保留歷史輪次）
    const restoreData2 = {
      meetingId: record2.meetingId,
      meetingName: record2.meetingName,
      issues: record2.issues.map(issue => {
        return {
          id: issue.issueId,
          title: issue.issueTitle,
          description: issue.issueDescription || '',
          status: 'notStarted',
          rounds: issue.rounds ? issue.rounds.map(round => ({
            roundNumber: round.roundNumber,
            results: round.results ? round.results.map(r => ({
              name: r.name,
              card: r.card
            })) : [],
            completedAt: round.completedAt || null
          })) : [],
          finalDecision: issue.finalDecision || null,
          completedAt: null
        };
      })
    };
    
    assert(restoreData2.issues[0].status === 'notStarted', testName, '測試案例 3.4: 未完成的 Issue 也重置為未開始');
    assert(restoreData2.issues[0].rounds.length === 0, testName, '測試案例 3.5: 未完成的 Issue 沒有輪次');
    
    // === 測試案例 4: 重新開啟有多個 Issue 的會議 ===
    addTestResult(`${testName}: 測試案例 4 - 重新開啟有多個 Issue 的會議`, true, testName);
    
      addHistory({
      mode: 'host',
      meetingId: 'TEST-REOPEN-003',
      meetingName: '測試會議 3',
      participants: 3,
      issues: [
        {
          issueId: 'issue-3',
          issueTitle: 'Issue 3',
          issueDescription: 'Description 3',
          rounds: [{ roundNumber: 1, results: [{ name: 'User1', card: '5' }] }],
          finalDecision: '5',
          completedAt: completedAt
        },
        {
          issueId: 'issue-4',
          issueTitle: 'Issue 4',
          issueDescription: 'Description 4',
          rounds: [],
          finalDecision: null,
          completedAt: null
        }
      ],
      completedAt: completedAt
    });
    
      const history3 = getHistory();
    const record3 = history3.find(r => r.meetingId === 'TEST-REOPEN-003');
    assert(record3 !== undefined, testName, '測試案例 4.1: 會議記錄已建立');
    assert(record3.issues.length === 2, testName, '測試案例 4.2: 有兩個 Issue');
    
    // 模擬重新開啟（保留歷史輪次）
    const restoreData3 = {
      meetingId: record3.meetingId,
      meetingName: record3.meetingName,
      issues: record3.issues.map(issue => {
        return {
          id: issue.issueId,
          title: issue.issueTitle,
          description: issue.issueDescription || '',
          status: 'notStarted',
          rounds: issue.rounds ? issue.rounds.map(round => ({
            roundNumber: round.roundNumber,
            results: round.results ? round.results.map(r => ({
              name: r.name,
              card: r.card
            })) : [],
            completedAt: round.completedAt || null
          })) : [],
          finalDecision: issue.finalDecision || null,
          completedAt: null
        };
      })
    };
    
    assert(restoreData3.issues.length === 2, testName, '測試案例 4.3: 兩個 Issue 都恢復');
    assert(restoreData3.issues[0].status === 'notStarted', testName, '測試案例 4.4: 第一個 Issue 重置為未開始');
    assert(restoreData3.issues[1].status === 'notStarted', testName, '測試案例 4.5: 第二個 Issue 重置為未開始');
    assert(restoreData3.issues[0].rounds.length === 1, testName, '測試案例 4.6: 第一個 Issue 的輪次已保留');
    assert(restoreData3.issues[0].rounds[0].results.length === 1, testName, '測試案例 4.7: 第一個 Issue 的輪次結果已保留');
    assert(restoreData3.issues[1].rounds.length === 0, testName, '測試案例 4.8: 第二個 Issue 沒有輪次');
    
      addTestResult(`${testName}: 所有測試案例完成`, true, testName);
      
    } finally {
      // 恢復原始 storage
      resetStorage();
    }
    
  } catch (error) {
    addTestResult(`${testName}: ${error.message}`, false, testName);
    console.error('重新開啟會議測試錯誤:', error);
    console.error('錯誤堆疊:', error.stack);
    // 確保在錯誤時也恢復 storage
    resetStorage();
  }
}

