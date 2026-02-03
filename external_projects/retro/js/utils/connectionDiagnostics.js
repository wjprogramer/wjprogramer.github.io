// 連接診斷工具
// 在瀏覽器 Console 中運行：window.diagnoseConnection('JM82M2')

export function diagnoseConnection(hostPeerId) {
  console.group('🔍 連接診斷工具');
  
  // 1. 檢查 PeerJS 是否載入
  console.log('1️⃣ 檢查 PeerJS 是否載入...');
  if (typeof window === 'undefined' || !window.Peer) {
    console.error('❌ PeerJS 未載入！請重新整理頁面');
    console.groupEnd();
    return;
  }
  console.log('✅ PeerJS 已載入');
  
  // 2. 檢查網絡連接
  console.log('2️⃣ 檢查網絡連接...');
  fetch('https://0.peerjs.com/peerjs/id?ts=' + Date.now() + '&version=1.5.4')
    .then(response => {
      if (response.ok) {
        console.log('✅ PeerJS 服務器可訪問');
        return response.text();
      } else {
        console.error('❌ PeerJS 服務器響應異常:', response.status);
      }
    })
    .then(data => {
      if (data) {
        console.log('✅ PeerJS 服務器正常，測試 ID:', data);
      }
    })
    .catch(error => {
      console.error('❌ 無法連接到 PeerJS 服務器:', error);
    });
  
  // 3. 檢查當前連接狀態
  console.log('3️⃣ 檢查當前連接狀態...');
  const retroState = window.retroState || {};
  const participantMode = retroState.participantMode;
  const hostMode = retroState.hostMode;
  
  if (participantMode) {
    console.log('📱 參與者模式');
    console.log('  - 連接狀態:', participantMode.getConnectionStatus());
    console.log('  - 是否已連接:', participantMode.isConnected);
    console.log('  - Host Peer ID:', participantMode.hostPeerId);
    console.log('  - 重連次數:', participantMode.reconnectAttempts);
    
    const peerManager = participantMode.peerManager;
    if (peerManager) {
      console.log('  - Peer ID:', peerManager.peerId);
      console.log('  - Peer 狀態:', peerManager.peer?.open ? 'open' : 'closed');
      console.log('  - 連接數:', peerManager.getConnections().length);
    }
  } else if (hostMode) {
    console.log('🏠 Host 模式');
    console.log('  - Meeting ID:', hostMode.meetingId);
    const peerManager = hostMode.peerManager;
    if (peerManager) {
      console.log('  - Peer ID:', peerManager.peerId);
      console.log('  - Peer 狀態:', peerManager.peer?.open ? 'open' : 'closed');
      console.log('  - 連接數:', peerManager.getConnections().length);
    }
  } else {
    console.log('⚠️ 未檢測到活動的連接模式');
  }
  
  // 4. 測試連接到指定的 host
  if (hostPeerId) {
    console.log('4️⃣ 測試連接到 host:', hostPeerId);
    
    if (typeof window === 'undefined' || !window.Peer) {
      console.error('❌ PeerJS 未載入，無法測試連接');
      console.groupEnd();
      return;
    }
    
    const testPeer = new window.Peer({
      host: '0.peerjs.com',
      port: 443,
      path: '/',
      secure: true,
      debug: 2
    });
    
    testPeer.on('open', (id) => {
      console.log('✅ 測試 Peer 已打開，ID:', id);
      console.log('🔄 嘗試連接到 host:', hostPeerId);
      
      const conn = testPeer.connect(hostPeerId, { reliable: true });
      
      if (!conn) {
        console.error('❌ 無法創建連接對象');
        testPeer.destroy();
        console.groupEnd();
        return;
      }
      
      let timeout = setTimeout(() => {
        console.error('❌ 連接超時（15秒）');
        console.log('可能的原因：');
        console.log('  1. Host 未在線或 Peer ID 不正確');
        console.log('  2. 網絡問題（防火牆/NAT）');
        console.log('  3. PeerJS 服務器問題');
        testPeer.destroy();
        console.groupEnd();
      }, 15000);
      
      conn.on('open', () => {
        console.log('✅ 連接成功！');
        clearTimeout(timeout);
        conn.close();
        testPeer.destroy();
        console.groupEnd();
      });
      
      conn.on('error', (err) => {
        console.error('❌ 連接錯誤:', err);
        clearTimeout(timeout);
        console.log('錯誤類型:', err.type);
        console.log('錯誤訊息:', err.message || err);
        
        if (err.type === 'peer-unavailable') {
          console.log('💡 可能原因：Host 未在線或 Peer ID 不正確');
        } else if (err.message && err.message.includes('could not connect')) {
          console.log('💡 可能原因：網絡問題或防火牆阻擋');
        }
        
        testPeer.destroy();
        console.groupEnd();
      });
      
      conn.on('close', () => {
        console.log('⚠️ 連接已關閉');
        clearTimeout(timeout);
        testPeer.destroy();
        console.groupEnd();
      });
      
      // 監聽 ICE 狀態和詳細信息
      if (conn.peerConnection) {
        const pc = conn.peerConnection;
        
        // 檢查 ICE candidate 類型
        pc.addEventListener('icecandidate', (event) => {
          if (event.candidate) {
            const candidate = event.candidate.candidate;
            const type = event.candidate.type;
            console.log('🔌 ICE Candidate:', type, candidate.substring(0, 50) + '...');
            
            // 分析 candidate 類型
            if (type === 'host') {
              console.log('  ✅ Host candidate (本地網絡)');
            } else if (type === 'srflx') {
              console.log('  ✅ Server reflexive candidate (STUN 成功)');
            } else if (type === 'relay') {
              console.log('  ✅ Relay candidate (TURN 成功)');
            }
          } else {
            console.log('🔌 ICE Candidate gathering 完成');
            analyzeNetworkType(pc);
          }
        });
        
        pc.addEventListener('icegatheringstatechange', () => {
          console.log('🔌 ICE Gathering 狀態:', pc.iceGatheringState);
        });
        
        pc.addEventListener('iceconnectionstatechange', () => {
          const state = pc.iceConnectionState;
          console.log('🔌 ICE 連接狀態:', state);
          
          if (state === 'failed') {
            console.error('❌ ICE 連接失敗');
            console.log('💡 這通常表示網絡/NAT/防火牆問題');
            console.log('💡 可能的原因：');
            console.log('  1. 對稱型 NAT（Symmetric NAT）');
            console.log('  2. 防火牆阻擋 UDP 流量');
            console.log('  3. 需要 TURN 服務器但未配置');
            analyzeNetworkType(pc);
          } else if (state === 'disconnected') {
            console.warn('⚠️ ICE 連接中斷');
          } else if (state === 'connected') {
            console.log('✅ ICE 連接成功');
            analyzeNetworkType(pc);
          } else if (state === 'checking') {
            console.log('⏳ ICE 正在檢查連接...');
            // 如果 checking 狀態持續太久，可能是網絡問題
            setTimeout(() => {
              if (pc.iceConnectionState === 'checking') {
                console.warn('⚠️ ICE checking 狀態持續超過 10 秒，可能是網絡問題');
                analyzeNetworkType(pc);
              }
            }, 10000);
          }
        });
        
        pc.addEventListener('connectionstatechange', () => {
          const state = pc.connectionState;
          console.log('🔗 WebRTC 連接狀態:', state);
          
          if (state === 'failed') {
            console.error('❌ WebRTC 連接失敗');
            analyzeNetworkType(pc);
          } else if (state === 'connected') {
            console.log('✅ WebRTC 連接成功');
            analyzeNetworkType(pc);
          }
        });
        
        // 檢查 STUN/TURN 配置
        const config = pc.getConfiguration();
        console.log('📡 WebRTC 配置:');
        if (config.iceServers && config.iceServers.length > 0) {
          config.iceServers.forEach((server, index) => {
            console.log(`  Server ${index + 1}:`, {
              urls: server.urls,
              username: server.username || 'N/A',
              credential: server.credential ? '***' : 'N/A'
            });
          });
        } else {
          console.warn('  ⚠️ 未配置 ICE 服務器（STUN/TURN）');
        }
      }
    });
    
    testPeer.on('error', (err) => {
      console.error('❌ Peer 錯誤:', err);
      console.groupEnd();
    });
  } else {
    console.log('⚠️ 未提供 host Peer ID，跳過連接測試');
  }
  
  // 5. 檢查清單
  console.log('5️⃣ 診斷檢查清單：');
  console.log('  □ Host 是否在線？');
  console.log('  □ 會議 ID 是否正確？');
  console.log('  □ 網絡連接是否正常？');
  console.log('  □ 防火牆是否阻擋 WebRTC？');
  console.log('  □ 瀏覽器是否支持 WebRTC？');
  
  console.log('\n💡 使用方式：');
  console.log('  在 Console 中運行：window.diagnoseConnection("會議ID")');
  console.log('  例如：window.diagnoseConnection("JM82M2")');
  
  console.groupEnd();
}

// 分析網絡類型和連接問題
function analyzeNetworkType(pc) {
  console.group('🌐 網絡類型分析');
  
  if (!pc) {
    console.error('❌ 無法獲取 PeerConnection 對象');
    console.groupEnd();
    return;
  }
  
  // 檢查 ICE connection state
  const iceState = pc.iceConnectionState;
  console.log('ICE 連接狀態:', iceState);
  
  // 檢查當前的 ICE candidates
  pc.getStats().then(stats => {
    let hasHost = false;
    let hasSrflx = false;
    let hasRelay = false;
    let localCandidates = [];
    
    stats.forEach(report => {
      if (report.type === 'local-candidate') {
        localCandidates.push({
          type: report.candidateType,
          protocol: report.protocol,
          address: report.address,
          port: report.port
        });
        
        if (report.candidateType === 'host') hasHost = true;
        if (report.candidateType === 'srflx') hasSrflx = true;
        if (report.candidateType === 'relay') hasRelay = true;
      }
    });
    
    console.log('📊 Candidate 統計:');
    console.log('  - Host candidates (本地):', hasHost ? '✅' : '❌');
    console.log('  - Server reflexive (STUN):', hasSrflx ? '✅' : '❌');
    console.log('  - Relay candidates (TURN):', hasRelay ? '✅' : '❌');
    
    if (localCandidates.length > 0) {
      console.log('📋 本地 Candidates:', localCandidates.length);
      localCandidates.slice(0, 5).forEach((c, i) => {
        console.log(`  ${i + 1}. ${c.type} (${c.protocol}) - ${c.address}:${c.port}`);
      });
      if (localCandidates.length > 5) {
        console.log(`  ... 還有 ${localCandidates.length - 5} 個 candidates`);
      }
    }
    
    // 診斷網絡問題
    console.log('\n🔍 網絡診斷:');
    
    if (iceState === 'failed' || iceState === 'disconnected') {
      if (!hasSrflx && !hasRelay) {
        console.error('❌ 無法獲取 STUN/TURN candidates');
        console.log('💡 這表示：網絡/NAT/防火牆問題');
        console.log('  可能原因：');
        console.log('  1. STUN 服務器無法訪問');
        console.log('  2. 對稱型 NAT 或嚴格防火牆');
        console.log('  3. 需要 TURN 服務器但未配置');
      } else if (hasSrflx && !hasRelay) {
        console.warn('⚠️ 只有 STUN candidates，沒有 TURN candidates');
        console.log('💡 這可能導致連接失敗，特別是：');
        console.log('  - 對稱型 NAT');
        console.log('  - 防火牆阻擋 UDP');
        console.log('  - 兩個客戶端都在不同網絡');
        console.log('💡 解決方案：配置 TURN 服務器');
      } else if (hasRelay) {
        console.log('✅ 有 TURN candidates，應該可以連接');
        console.log('💡 如果仍然失敗，可能是：');
        console.log('  1. TURN 服務器配置錯誤');
        console.log('  2. 對端無法連接到 TURN 服務器');
      }
    } else if (iceState === 'checking') {
      console.warn('⏳ ICE checking 狀態持續中...');
      if (!hasSrflx && !hasRelay) {
        console.log('💡 可能原因：STUN/TURN 服務器響應慢或無法訪問');
        console.log('💡 這表示：網絡/NAT/防火牆問題');
      }
    } else if (iceState === 'connected') {
      console.log('✅ 連接成功');
      if (hasRelay) {
        console.log('ℹ️ 使用 TURN 服務器連接（可能影響性能）');
      } else if (hasSrflx) {
        console.log('ℹ️ 使用 STUN 服務器連接（正常）');
      } else {
        console.log('ℹ️ 直接連接（同一網絡）');
      }
    }
    
    console.groupEnd();
  }).catch(err => {
    console.error('❌ 無法獲取統計信息:', err);
    console.groupEnd();
  });
}

// 測試 STUN 服務器連接
export function testSTUNServer() {
  console.group('🧪 測試 STUN 服務器');
  
  const stunServers = [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:0.peerjs.com:3478' }
  ];
  
  stunServers.forEach((server, index) => {
    console.log(`測試 STUN 服務器 ${index + 1}: ${server.urls}`);
    
    const pc = new RTCPeerConnection({ iceServers: [server] });
    
    pc.createDataChannel('test');
    pc.createOffer().then(offer => {
      return pc.setLocalDescription(offer);
    }).then(() => {
      return new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn(`  ⚠️ ${server.urls} - 超時（5秒）`);
          console.log('  💡 這可能表示：網絡/NAT/防火牆問題');
          pc.close();
          resolve();
        }, 5000);
        
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            if (event.candidate.type === 'srflx') {
              console.log(`  ✅ ${server.urls} - STUN 成功`);
              console.log(`     Public IP: ${event.candidate.address}:${event.candidate.port}`);
              clearTimeout(timeout);
              pc.close();
              resolve();
            }
          } else {
            // ICE gathering 完成
            clearTimeout(timeout);
            pc.close();
            resolve();
          }
        };
      });
    }).catch(err => {
      console.error(`  ❌ ${server.urls} - 錯誤:`, err);
    });
  });
  
  console.log('\n💡 如果所有 STUN 服務器都失敗，表示：');
  console.log('  1. 網絡無法訪問 STUN 服務器');
  console.log('  2. 防火牆阻擋 UDP 流量');
  console.log('  3. NAT 配置問題');
  
  console.groupEnd();
}

// 檢查 PeerJS 是否支持自定義 ICE servers
export function checkPeerJSICEsupport() {
  console.group('🔍 檢查 PeerJS ICE servers 支持');
  
  if (typeof window === 'undefined' || !window.Peer) {
    console.error('❌ PeerJS 未載入');
    console.groupEnd();
    return false;
  }
  
  console.log('✅ PeerJS 已載入');
  console.log('版本:', window.Peer.VERSION || '未知');
  
  // 檢查 PeerJS 構造函數的參數
  const peerProto = window.Peer.prototype;
  console.log('PeerJS 構造函數參數:', peerProto.constructor.toString().substring(0, 200));
  
  // 嘗試創建一個測試 Peer，檢查是否支持 config.config.iceServers
  console.log('\n🧪 測試配置方式：');
  
  const testConfigs = [
    { name: 'config.config.iceServers', config: { config: { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] } } },
    { name: 'config.iceServers', config: { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] } },
    { name: 'config.rtcConfig.iceServers', config: { rtcConfig: { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] } } }
  ];
  
  testConfigs.forEach(({ name, config }) => {
    console.log(`\n測試 ${name}:`);
    try {
      const testPeer = new window.Peer({
        ...config,
        host: '0.peerjs.com',
        port: 443,
        path: '/',
        secure: true
      });
      
      // 檢查內部是否有設置 ICE servers
      setTimeout(() => {
        if (testPeer._options && testPeer._options.config) {
          console.log(`  ✅ ${name} - 配置被接受`);
          console.log('  配置內容:', testPeer._options.config);
        } else if (testPeer._config) {
          console.log(`  ✅ ${name} - 配置被接受（_config）`);
          console.log('  配置內容:', testPeer._config);
        } else {
          console.log(`  ⚠️ ${name} - 配置可能未被接受`);
        }
        testPeer.destroy();
      }, 1000);
    } catch (e) {
      console.error(`  ❌ ${name} - 錯誤:`, e.message);
    }
  });
  
  // 檢查實際連接中的 RTCPeerConnection 配置
  console.log('\n📡 檢查實際連接的 ICE servers:');
  console.log('💡 請創建一個實際連接，然後運行以下代碼檢查：');
  console.log(`
    const retroState = window.retroState || {};
    const participantMode = retroState.participantMode;
    const hostMode = retroState.hostMode;
    
    const peerManager = participantMode?.peerManager || hostMode?.peerManager;
    if (peerManager && peerManager.peer) {
      const connections = peerManager.getConnections();
      if (connections.length > 0) {
        const conn = connections[0];
        if (conn.peerConnection) {
          const config = conn.peerConnection.getConfiguration();
          console.log('實際使用的 ICE servers:', config.iceServers);
        }
      }
    }
  `);
  
  console.groupEnd();
  return true;
}

// 將函數掛載到 window 對象，方便在 Console 中使用
if (typeof window !== 'undefined') {
  window.diagnoseConnection = diagnoseConnection;
  window.testSTUNServer = testSTUNServer;
  window.checkPeerJSICEsupport = checkPeerJSICEsupport;
}
