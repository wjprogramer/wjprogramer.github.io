# 3D 人物模型功能規劃

## 功能概述

在內容詳情頁面中，為特定技術動作（如殺球、高遠球等）添加 3D 人物模型動畫演示，讓使用者可以從不同角度觀察動作要領。

## 使用情境

- **動作演示**：展示完整的擊球動作流程
- **多角度觀察**：使用者可以旋轉、縮放模型，從不同角度學習
- **動作分解**：可以暫停、慢動作播放，觀察關鍵動作要領
- **對比學習**：可以同時顯示正確動作和常見錯誤動作

## 技術方案分析

### 方案一：Three.js + GLTF/GLB 模型

**優點：**

- 成熟的 3D 渲染庫，生態系統完善
- 支援多種 3D 模型格式（GLTF、GLB、OBJ 等）
- 可以進行複雜的動畫控制
- 有良好的效能優化選項

**缺點：**

- 需要載入 3D 模型檔案（可能較大）
- 需要處理動畫資料
- 對低階設備可能有效能負擔

**效能考量：**

- 模型檔案大小：GLTF/GLB 格式通常可以壓縮到 1-5MB（取決於細節）
- 動畫資料：骨骼動畫資料可能額外增加 500KB-2MB
- 記憶體使用：載入後約佔用 50-200MB 記憶體
- GPU 使用：需要 WebGL 支援，對 GPU 有一定要求

### 方案二：簡化版 3D（使用 CSS 3D Transform）

**優點：**

- 輕量級，不需要額外庫
- 效能負擔小
- 實現簡單

**缺點：**

- 無法顯示複雜的 3D 模型
- 動畫效果有限
- 不適合展示真實的人物動作

### 方案三：預錄影片（360 度影片或 GIF）

**優點：**

- 實現簡單
- 不需要 3D 渲染
- 可以展示真實動作

**缺點：**

- 檔案可能很大
- 無法互動（無法旋轉、縮放）
- 不是真正的 3D 體驗

### 方案四：使用現成的 3D 庫（如 Babylon.js、A-Frame）

**優點：**

- 可能有現成的優化方案
- 社群支援

**缺點：**

- 學習曲線
- 可能過於複雜

## 效能優化策略

### 1. 模型優化

- **低多邊形模型**：使用簡化的 3D 模型（減少面數）
- **紋理壓縮**：使用壓縮的紋理格式（如 KTX2、Basis）
- **LOD（細節層級）**：根據距離顯示不同細節的模型
- **模型分割**：將複雜模型分割成多個部分，按需載入

### 2. 載入策略

- **懶加載**：只在使用者點擊「查看 3D 演示」時才載入
- **漸進式載入**：先載入低品質模型，再載入高品質版本
- **快取機制**：使用 Service Worker 或 localStorage 快取模型
- **CDN 加速**：將模型檔案放在 CDN 上

### 3. 渲染優化

- **按需渲染**：只在模型可見時才渲染
- **降低幀率**：在非互動狀態下降低渲染幀率
- **視窗剔除**：只渲染可見的部分
- **陰影優化**：使用簡化的陰影算法或關閉陰影

### 4. 互動優化

- **降低互動靈敏度**：避免過度頻繁的更新
- **防抖處理**：對旋轉、縮放等操作進行防抖
- **暫停渲染**：當使用者不互動時暫停渲染

## 預期效能影響

### 輕量級設備（手機、低階筆電）

- **載入時間**：3-8 秒（取決於網路速度）
- **記憶體使用**：50-100MB
- **CPU/GPU 負擔**：中等（可能影響其他操作）
- **建議**：提供「簡化模式」或「關閉 3D」選項

### 中階設備（一般筆電、平板）

- **載入時間**：2-5 秒
- **記憶體使用**：100-200MB
- **CPU/GPU 負擔**：可接受
- **建議**：預設啟用，但提供關閉選項

### 高階設備（遊戲筆電、桌機）

- **載入時間**：1-3 秒
- **記憶體使用**：200-500MB
- **CPU/GPU 負擔**：幾乎無影響
- **建議**：可以啟用高品質模式

## 實作建議

### 階段一：可行性驗證（MVP）

1. 使用 Three.js + @pixiv/three-vrm 載入一個 VRM 模型
2. 實現基本的旋轉、縮放功能（使用 OrbitControls）
3. 測試在不同設備上的效能表現
4. 評估檔案大小和載入時間

### 階段二：基礎功能（第一階段目標）

#### 目標

讓模型做出各種動作（殺球、步伐等）

1. **載入 VRM 模型**
   - 從 Open Source Avatars 下載適合的 VRM 模型
   - 使用 @pixiv/three-vrm 載入模型

2. **動作動畫製作方式**：
   - **方案 A：使用動作捕捉數據**
     - 使用動作捕捉軟體（如 XR Animator）錄製真實動作
     - 導出為 BVH 或 FBX 格式
     - 轉換並映射到 VRM 骨骼系統

   - **方案 B：手動製作關鍵幀動畫**
     - 使用 Blender 等 3D 軟體手動調整骨骼
     - 製作殺球、高遠球、步伐等動作序列
     - 導出為 glTF 動畫或直接控制 VRM 骨骼

   - **方案 C：使用預製動作庫**
     - 尋找或購買現成的動作庫
     - 適配到 VRM 骨骼系統

3. **實現動畫播放控制**
   - 播放、暫停、慢動作
   - 循環播放
   - 動作切換（從一個動作平滑過渡到另一個）

4. **實現多角度觀察**
   - 旋轉、縮放、平移（OrbitControls）
   - 預設視角（正面、側面、背面、俯視）

5. **添加載入指示器和錯誤處理**

### 階段三：球拍整合（第二階段目標）

#### 球拍整合目標

讓模型可以演示握拍行為

1. **球拍模型準備**
   - 尋找或製作羽毛球拍 3D 模型（GLTF/GLB 格式）
   - 優化模型（低多邊形，適合網頁載入）

2. **球拍附加到模型**
   - 使用 VRM 的 **Attachment** 功能
   - 將球拍附加到手掌骨骼（通常是 `hand_L` 或 `hand_R`）
   - 調整球拍位置和旋轉，使其符合握拍姿勢

3. **握拍動作調整**
   - 調整手指骨骼，讓模型正確握住球拍
   - 為不同握拍方式（正手握拍、反手握拍）創建不同的動作

4. **動作與球拍同步**
   - 確保動作動畫中，球拍與手部動作同步
   - 處理球拍在動作過程中的旋轉和位置變化

### 階段四：優化與增強

1. 實現模型優化（LOD、紋理壓縮）
2. 添加動作標註（標示關鍵動作點）
3. 實現動作對比功能（正確 vs 錯誤動作）
4. 添加效能監控和降級策略
5. 支援多個動作同時播放（如步伐 + 擊球）

## 技術棧建議

### VRM 格式分析

**VRM（Virtual Reality Model）** 是基於 glTF 2.0 的開放格式，專為虛擬角色設計，**完全適合羽毛球動作演示需求**：

### 優點

- **完整骨架系統**：包含全身骨骼，支援複雜動作
- **手指細節**：有完整的手指骨骼，可以演示握拍動作
- **表情系統**：支援表情變化（可選功能）
- **附加點（Attachment）**：可以附加物體（如球拍）到特定骨骼
- **免費開源**：Open Source Avatars 提供 300+ 免費 VRM 模型（CCO 授權）
- **網頁支援**：有成熟的 JavaScript 庫可以在瀏覽器中載入和操作

### 注意事項

- VRM 格式主要用於角色展示，需要自行製作或購買動作動畫
- 動作動畫需要以其他格式（如 BVH、FBX）製作，然後轉換或映射到 VRM 模型

### 推薦技術棧

- **3D 渲染**：Three.js（最成熟的選擇）
- **VRM 載入器**：[@pixiv/three-vrm](https://github.com/pixiv/three-vrm) - 專門用於在 Three.js 中載入和操作 VRM 模型
- **模型格式**：VRM（適合角色動畫）或 GLTF/GLB（通用格式）
- **動畫控制**：Three.js Animation Mixer + VRM 骨骼控制
- **模型來源**：
  - [Open Source Avatars](https://www.opensourceavatars.com/) - 300+ 免費 VRM 模型（CCO 授權，無需署名）
  - [GitHub: open-source-avatars](https://github.com/ToxSam/open-source-avatars) - 原始專案
  - 自行建模（需要 3D 建模技能）
  - 購買現成模型

### Open Source Avatars 網站技術分析

根據 [opensourceavatars.com](https://www.opensourceavatars.com/en/gallery) 的展示效果，該網站很可能使用了：

1. **Three.js** - 3D 渲染引擎
2. **@pixiv/three-vrm** - VRM 模型載入器
3. **OrbitControls** - 相機控制（旋轉、縮放、平移）
4. **WebGL** - 硬體加速渲染

**你可以使用相同的技術棧**，這些都是開源且免費的庫。

## 替代方案

如果 3D 模型效能負擔過大，可以考慮：

1. **2D 動畫**：使用 SVG 或 Canvas 製作 2D 動畫
2. **圖解說明**：使用多張圖片展示不同角度的動作
3. **影片嵌入**：嵌入 YouTube 或其他影片平台的教學影片
4. **互動式圖解**：使用 CSS/JS 製作簡單的互動式圖解

## 決策建議

### 建議採用 3D 模型，但

1. **作為可選功能**：預設關閉，讓使用者選擇是否啟用
2. **提供降級方案**：低階設備自動降級或提供關閉選項
3. **分階段實作**：先驗證可行性，再逐步完善
4. **效能監控**：實作效能監控，根據設備能力調整品質

### 不建議的情況

- 如果目標使用者主要是低階設備
- 如果網站需要快速載入（如行動網路環境）
- 如果沒有資源進行模型製作或購買

## 實作範例代碼結構

### 基本 VRM 載入範例

```javascript
import * as THREE from 'three';
import { VRMLoaderPlugin } from '@pixiv/three-vrm';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 初始化場景
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 載入 VRM 模型
const loader = new GLTFLoader();
loader.register((parser) => new VRMLoaderPlugin(parser));

loader.load('models/avatars/AbissalDude.vrm', (gltf) => {
  const vrm = gltf.userData.vrm;
  scene.add(vrm.scene);
  
  // 控制相機
  const controls = new OrbitControls(camera, renderer.domElement);
  camera.position.set(0, 1.6, 3);
  
  // 動畫循環
  function animate() {
    requestAnimationFrame(animate);
    vrm.update(0.016); // 更新 VRM（約 60fps）
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
});
```

### 動作播放範例

```javascript
// 載入動作動畫（BVH 或 glTF 動畫）
// 然後映射到 VRM 骨骼
function playAnimation(vrm, animationClip) {
  const mixer = new THREE.AnimationMixer(vrm.scene);
  const action = mixer.clipAction(animationClip);
  action.play();
  
  // 在動畫循環中更新
  mixer.update(deltaTime);
}
```

### 球拍附加範例

```javascript
// 載入球拍模型
const racketLoader = new GLTFLoader();
racketLoader.load('models/racket.glb', (gltf) => {
  const racket = gltf.scene;
  
  // 附加到右手骨骼
  const rightHandBone = vrm.humanoid.getNormalizedBoneNode('rightHand');
  rightHandBone.add(racket);
  
  // 調整位置和旋轉
  racket.position.set(0.05, 0, 0);
  racket.rotation.set(0, Math.PI / 4, 0);
});
```

## 技術資源

### 學習資源

- [@pixiv/three-vrm 官方文檔](https://github.com/pixiv/three-vrm)
- [Three.js 官方文檔](https://threejs.org/docs/)
- [VRM 格式規範](https://vrm.dev/)

### 工具推薦

- **Blender** - 免費 3D 建模和動畫軟體（可製作動作）
- **XR Animator** - AI 動作捕捉軟體（可錄製真實動作）
- **VRoid Studio** - VRM 模型創建工具（可選）

## 下一步行動

1. **技術驗證**：
   - 建立一個簡單的 Three.js + @pixiv/three-vrm 測試頁面
   - 載入一個 Open Source Avatars 的 VRM 模型
   - 實現基本的旋轉、縮放功能

2. **模型準備**：
   - 從 [opensourceavatars.com](https://www.opensourceavatars.com/en/gallery) 下載適合的 VRM 模型
   - 測試多個模型，選擇最適合羽毛球演示的

3. **動作製作**：
   - 研究動作捕捉或手動製作第一個動作（如殺球）
   - 測試動作在 VRM 模型上的播放效果

4. **效能測試**：
   - 在不同設備上測試載入時間和運行效能
   - 優化模型和動畫檔案大小

5. **球拍整合**：
   - 尋找或製作羽毛球拍 3D 模型
   - 測試球拍附加到模型手部的效果

6. **使用者測試**：收集使用者反饋，評估需求強度
