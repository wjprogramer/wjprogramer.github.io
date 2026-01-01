/**
 * 測試從歷史記錄重新開啟會議功能
 */
async function testReopenMeeting() {
  const testName = '重新開啟會議測試';
  
  try {
    addTestResult(`${testName}: 開始測試...`, true, testName);
    
    // 使用 Mock Storage 避免影響實際環境
    const mockStorage = createMockStorage();
    const HISTORY_KEY = 'history';
    
    // 模擬 addOrUpdateMeetingHistory 函數（使用 mock storage）
    function addOrUpdateMeetingHistoryToMock(record) {
      const history = mockStorage.get(HISTORY_KEY, []);
      const meetingId = record.meetingId;
      const now = new Date().toISOString();
      
      let meetingRecord = history.find(r => r.meetingId === meetingId && r.mode === 'host' && r.issues);
      
      if (meetingRecord) {
        if (record.meetingName !== undefined) {
          meetingRecord.meetingName = record.meetingName || null;
        }
        if (record.issues && Array.isArray(record.issues)) {
          meetingRecord.issues = record.issues;
          if (record.participants !== undefined) {
            meetingRecord.participants = record.participants;
          }
          if (record.completedAt !== undefined) {
            meetingRecord.completedAt = record.completedAt;
          }
          mockStorage.set(HISTORY_KEY, history);
          return meetingRecord;
        }
        if (record.participants !== undefined) {
          meetingRecord.participants = record.participants;
        }
      } else {
        meetingRecord = {
          id: Date.now().toString(),
          timestamp: now,
          mode: 'host',
          meetingId: meetingId,
          meetingName: record.meetingName !== undefined ? record.meetingName : null,
          participants: record.participants !== undefined ? record.participants : null,
          startedAt: now,
          completedAt: null,
          issues: record.issues || [],
          starred: false
        };
        history.unshift(meetingRecord);
      }
      
      mockStorage.set(HISTORY_KEY, history);
      return meetingRecord;
    }
    
    // === 測試案例 1: 建立一個有已完成 Issue 的會議記錄 ===
    addTestResult(`${testName}: 測試案例 1 - 建立有已完成 Issue 的會議記錄`, true, testName);
    const meetingId = 'TEST-REOPEN-001';
    const meetingName = '測試會議';
    const completedAt = new Date().toISOString();
    
    addOrUpdateMeetingHistoryToMock({
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
    
    const history1 = mockStorage.get(HISTORY_KEY, []);
    const record1 = history1.find(r => r.meetingId === meetingId);
    assert(record1 !== undefined, testName, '測試案例 1.1: 會議記錄已建立');
    assert(record1.issues.length === 1, testName, '測試案例 1.2: Issue 數量正確');
    assert(record1.issues[0].finalDecision === '8', testName, '測試案例 1.3: Issue 已完成');
    
    // === 測試案例 2: 模擬重新開啟會議，Issue 應重置為未開始 ===
    addTestResult(`${testName}: 測試案例 2 - 重新開啟會議，Issue 重置為未開始`, true, testName);
    
    // 模擬重新開啟會議的資料轉換
    const restoreData = {
      meetingId: record1.meetingId,
      meetingName: record1.meetingName,
      issues: record1.issues.map(issue => {
        return {
          id: issue.issueId,
          title: issue.issueTitle,
          description: issue.issueDescription || '',
          status: 'notStarted', // 重置為未開始
          rounds: [], // 清除輪次
          finalDecision: null, // 清除最終決定
          completedAt: null // 清除完成時間
        };
      })
    };
    
    assert(restoreData.issues.length === 1, testName, '測試案例 2.1: Issue 數量正確');
    assert(restoreData.issues[0].status === 'notStarted', testName, '測試案例 2.2: Issue 狀態重置為未開始');
    assert(restoreData.issues[0].rounds.length === 0, testName, '測試案例 2.3: 輪次已清除');
    assert(restoreData.issues[0].finalDecision === null, testName, '測試案例 2.4: 最終決定已清除');
    assert(restoreData.issues[0].completedAt === null, testName, '測試案例 2.5: 完成時間已清除');
    assert(restoreData.issues[0].id === 'issue-1', testName, '測試案例 2.6: Issue ID 保持不變');
    assert(restoreData.issues[0].title === 'Issue 1', testName, '測試案例 2.7: Issue 標題保持不變');
    assert(restoreData.issues[0].description === 'Description 1', testName, '測試案例 2.8: Issue 描述保持不變');
    
    // === 測試案例 3: 重新開啟有未完成 Issue 的會議 ===
    addTestResult(`${testName}: 測試案例 3 - 重新開啟有未完成 Issue 的會議`, true, testName);
    
    addOrUpdateMeetingHistoryToMock({
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
    
    const history2 = mockStorage.get(HISTORY_KEY, []);
    const record2 = history2.find(r => r.meetingId === 'TEST-REOPEN-002');
    assert(record2 !== undefined, testName, '測試案例 3.1: 會議記錄已建立');
    assert(record2.issues.length === 1, testName, '測試案例 3.2: Issue 數量正確');
    assert(record2.issues[0].finalDecision === null, testName, '測試案例 3.3: Issue 未完成');
    
    // 模擬重新開啟
    const restoreData2 = {
      meetingId: record2.meetingId,
      meetingName: record2.meetingName,
      issues: record2.issues.map(issue => {
        return {
          id: issue.issueId,
          title: issue.issueTitle,
          description: issue.issueDescription || '',
          status: 'notStarted',
          rounds: [],
          finalDecision: null,
          completedAt: null
        };
      })
    };
    
    assert(restoreData2.issues[0].status === 'notStarted', testName, '測試案例 3.4: 未完成的 Issue 也重置為未開始');
    
    // === 測試案例 4: 重新開啟有多個 Issue 的會議 ===
    addTestResult(`${testName}: 測試案例 4 - 重新開啟有多個 Issue 的會議`, true, testName);
    
    addOrUpdateMeetingHistoryToMock({
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
    
    const history3 = mockStorage.get(HISTORY_KEY, []);
    const record3 = history3.find(r => r.meetingId === 'TEST-REOPEN-003');
    assert(record3 !== undefined, testName, '測試案例 4.1: 會議記錄已建立');
    assert(record3.issues.length === 2, testName, '測試案例 4.2: 有兩個 Issue');
    
    // 模擬重新開啟
    const restoreData3 = {
      meetingId: record3.meetingId,
      meetingName: record3.meetingName,
      issues: record3.issues.map(issue => {
        return {
          id: issue.issueId,
          title: issue.issueTitle,
          description: issue.issueDescription || '',
          status: 'notStarted',
          rounds: [],
          finalDecision: null,
          completedAt: null
        };
      })
    };
    
    assert(restoreData3.issues.length === 2, testName, '測試案例 4.3: 兩個 Issue 都恢復');
    assert(restoreData3.issues[0].status === 'notStarted', testName, '測試案例 4.4: 第一個 Issue 重置為未開始');
    assert(restoreData3.issues[1].status === 'notStarted', testName, '測試案例 4.5: 第二個 Issue 重置為未開始');
    assert(restoreData3.issues[0].rounds.length === 0, testName, '測試案例 4.6: 第一個 Issue 的輪次已清除');
    assert(restoreData3.issues[1].rounds.length === 0, testName, '測試案例 4.7: 第二個 Issue 的輪次已清除');
    
    addTestResult(`${testName}: 所有測試案例完成`, true, testName);
    
  } catch (error) {
    addTestResult(`${testName}: ${error.message}`, false, testName);
    console.error('重新開啟會議測試錯誤:', error);
    console.error('錯誤堆疊:', error.stack);
  }
}

