/**
 * 3D 模型展示頁面
 */
import { t } from '../utils/i18n.js';
import { updateActiveNav } from '../components/navigation.js';

// Three.js 相關模塊延遲載入
let THREE = null;
let GLTFLoader = null;
let FBXLoader = null;
let OrbitControls = null;
let VRMLoaderPlugin = null;
let threeLoaded = false;

async function loadThreeJS() {
  if (threeLoaded) return;
  console.log('[loadThreeJS] Loading Three.js modules...');
  
  THREE = await import('three');
  const loaderModule = await import('three/addons/loaders/GLTFLoader.js');
  GLTFLoader = loaderModule.GLTFLoader;
  const fbxModule = await import('three/addons/loaders/FBXLoader.js');
  FBXLoader = fbxModule.FBXLoader;
  const controlsModule = await import('three/addons/controls/OrbitControls.js');
  OrbitControls = controlsModule.OrbitControls;
  const vrmModule = await import('../libs/three-vrm.module.js');
  VRMLoaderPlugin = vrmModule.VRMLoaderPlugin;
  
  threeLoaded = true;
  console.log('[loadThreeJS] Three.js modules loaded');
}

let scene, camera, renderer, controls;
let vrm = null;
let currentModelIndex = 0;
let wireframeMode = false;
let showBones = false;
let animationMixer = null;
let currentAnimation = null;
let animationFrameId = null; // 用於取消 requestAnimationFrame
let isDisposed = false; // 標記是否已清理
let gridHelper = null; // 網格地板
const animations = [
  {
    name: 'Warrior Idle',
    path: 'models/avatars/animations/Warrior_Idle.fbx',
    source: 'https://assets.opensourceavatars.com/animations/Warrior%20Idle.fbx'
  }
];
const models = [
  { name: 'AbissalDude', path: 'models/avatars/AbissalDude.vrm' },
  { name: 'PossumEnjoyer', path: 'models/avatars/PossumEnjoyer.vrm' }
];

/**
 * 渲染 3D 模型展示頁面
 */
export function renderModelViewer({ path, params } = {}) {
  console.log('[TEST] renderModelViewer start', { path, params });
  
  try {
    // 重置狀態（清理由 router 在離開頁面時調用）
    isDisposed = false;
    
    console.log('[TEST] Getting app element');
    const app = document.getElementById('app');
    if (!app) {
      console.error('[TEST] App element not found!');
      return;
    }
    
    console.log('[TEST] Calling updateActiveNav');
    updateActiveNav();
  
  console.log('[TEST] Setting innerHTML');
  // 在 HTML 中創建 canvas 元素（參考 opensourceavatars.com 的做法）
  app.innerHTML = `
    <div class="model-viewer-page page-enter">
      <div class="container">
        <h1 class="page-title" data-i18n="model-viewer.title">3D 模型展示</h1>
        
        <div class="model-viewer-controls">
          <button class="btn-neu" id="btn-prev-model" data-i18n="model-viewer.prev">上一個</button>
          <span class="model-viewer-current" id="current-model-name">${models[currentModelIndex].name}</span>
          <button class="btn-neu" id="btn-next-model" data-i18n="model-viewer.next">下一個</button>
        </div>
        
        <div class="model-viewer-toggles">
          <button class="btn-neu ${wireframeMode ? 'btn-neu--selected' : ''}" id="btn-wireframe" data-i18n="model-viewer.wireframe">Wireframe</button>
          <button class="btn-neu ${showBones ? 'btn-neu--selected' : ''}" id="btn-bones" data-i18n="model-viewer.bones">Show Bones</button>
          <button class="btn-neu" id="btn-load-animation" data-i18n="model-viewer.load-animation">載入動畫</button>
        </div>
        
        <div class="model-viewer-container" id="model-viewer-container">
          <canvas id="model-canvas"></canvas>
          <div class="model-viewer-loading" id="model-viewer-loading">
            <span class="material-icons-round">hourglass_empty</span>
            <span data-i18n="model-viewer.loading">載入中...</span>
          </div>
        </div>
        
        <div class="model-viewer-info">
          <p data-i18n="model-viewer.instructions">使用滑鼠拖曳旋轉視角，滾輪縮放</p>
        </div>
      </div>
    </div>
  `;
  
  console.log('[TEST] innerHTML set');
  
  // 綁定事件
  bindEvents();
  
  // 更新 i18n
  updateI18n();
  
  // 延遲載入 Three.js 模塊後再初始化
  console.log('[TEST] Starting async init...');
  (async () => {
    try {
      console.log('[TEST] Loading Three.js modules...');
      await loadThreeJS();
      console.log('[TEST] Three.js modules loaded, init scene...');
      
      initThreeJS();
      console.log('[TEST] initThreeJS done');
      
      console.log('[TEST] loading model');
      await loadModel(models[currentModelIndex].path);
      console.log('[TEST] complete');
    } catch (e) {
      console.error('[TEST] Error:', e);
    }
  })();
  } catch (error) {
    console.error('[TEST] renderModelViewer error:', error);
    throw error;
  }
}

/**
 * 初始化 Three.js 場景
 */
function initThreeJS() {
  console.log('[initThreeJS] 1 - start');
  const canvas = document.getElementById('model-canvas');
  const container = document.getElementById('model-viewer-container');
  
  console.log('[initThreeJS] 2 - canvas:', !!canvas, 'container:', !!container);
  if (!canvas || !container) {
    console.error('Canvas or container not found!');
    return;
  }
  
  console.log('[initThreeJS] 3 - creating scene');
  scene = new THREE.Scene();
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  scene.background = new THREE.Color(isDark ? 0x1a1a1a : 0xf0f0f0);
  
  console.log('[initThreeJS] 4 - creating camera');
  // 使用固定尺寸，避免讀取 DOM 導致 Firefox 凍結
  const containerWidth = 800;
  const containerHeight = 600;
  console.log('[initThreeJS] 4.1 - using fixed dimensions:', containerWidth, containerHeight);
  camera = new THREE.PerspectiveCamera(45, containerWidth / containerHeight, 0.1, 100);
  console.log('[initThreeJS] 4.2 - camera created');
  camera.position.set(0, 1.5, 3);
  console.log('[initThreeJS] 4.3 - position set');
  camera.lookAt(0, 1, 0);
  console.log('[initThreeJS] 4.4 - lookAt done');
  
  console.log('[initThreeJS] 5 - creating renderer');
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });
  console.log('[initThreeJS] 5.1 - renderer created');
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(containerWidth, containerHeight, false);
  
  // 延遲調整正確尺寸
  setTimeout(() => {
    const w = container.clientWidth || 800;
    const h = container.clientHeight || 600;
    if (camera && renderer) {
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }
  }, 100);
  
  console.log('[initThreeJS] 6 - adding lights');
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);
  
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  // 添加網格地板
  console.log('[initThreeJS] 7 - adding grid floor');
  if (!gridHelper) {
    gridHelper = new THREE.GridHelper(20, 20, 0x888888, 0xcccccc);
    gridHelper.position.y = 0;
    scene.add(gridHelper);
  }
  
  // 添加控制器
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 1;
  controls.maxDistance = 10;
  controls.target.set(0, 1, 0);
  
  console.log('[initThreeJS] 8 - adding event listeners');
  window.addEventListener('resize', onWindowResize);
  window.addEventListener('beforeunload', cleanupModelViewer);
  
  console.log('[initThreeJS] 9 - starting animate');
  animate();
  console.log('[initThreeJS] 10 - done');
}

/**
 * 載入 VRM 模型
 */
async function loadModel(modelPath) {
  const loadingEl = document.getElementById('model-viewer-loading');
  if (loadingEl) {
    loadingEl.style.display = 'flex';
  }
  
  try {
    // 移除舊模型
    if (vrm) {
      scene.remove(vrm.scene);
      vrm = null;
    }
    
    // 載入 VRM 模型
    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));
    
    const gltf = await new Promise((resolve, reject) => {
      loader.load(
        modelPath,
        resolve,
        undefined, // 暫時不顯示進度
        reject
      );
    });
    
    vrm = gltf.userData.vrm;
    if (!vrm) {
      throw new Error('VRM data not found in GLTF');
    }
    
    scene.add(vrm.scene);
    
    // 確保模型可見
    vrm.scene.visible = true;
    vrm.scene.traverse((child) => {
      if (child.isMesh || child.isSkinnedMesh) {
        child.visible = true;
      }
    });
    
    // 應用當前的顯示模式
    updateWireframeMode();
    updateBonesDisplay();
    
    // 調整相機位置
    const box = new THREE.Box3().setFromObject(vrm.scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
    cameraZ *= 1.5;
    
    camera.position.set(center.x, center.y, center.z + cameraZ);
    controls.target.copy(center);
    controls.update();
    
    console.log('loadModel: Model added to scene, visible:', vrm.scene.visible, 'scene children:', scene.children.length);
    console.log('loadModel: Model bounds - center:', center, 'size:', size);
    console.log('loadModel: Camera position:', camera.position, 'target:', controls.target);
    
    // 診斷：檢查模型中的 mesh 和材質
    let meshCount = 0;
    let materialCount = 0;
    vrm.scene.traverse((child) => {
      if (child.isMesh || child.isSkinnedMesh) {
        meshCount++;
        if (child.material) {
          materialCount++;
          if (Array.isArray(child.material)) {
            console.log('loadModel: Mesh', child.name, 'has', child.material.length, 'materials');
          } else {
            console.log('loadModel: Mesh', child.name, 'material:', child.material.type, 'visible:', child.material.visible);
          }
        }
      }
    });
    console.log('loadModel: Total meshes:', meshCount, 'with materials:', materialCount);
    
    // 診斷：檢查渲染器
    console.log('loadModel: Renderer size:', renderer.getSize(new THREE.Vector2()));
    console.log('loadModel: Renderer pixel ratio:', renderer.getPixelRatio());
    
    // 強制渲染一次
    renderer.render(scene, camera);
    console.log('loadModel: Force rendered');
    
    if (loadingEl) {
      loadingEl.style.display = 'none';
    }
    
    // TODO: 重新啟用自動載入動畫
    // if (animations.length > 0 && vrm && vrm.humanoid) {
    //   console.log('Auto-loading animation:', animations[0].name);
    //   setTimeout(() => {
    //     loadAnimation(animations[0].path, animations[0].source).catch(error => {
    //       console.error('Error auto-loading animation:', error);
    //       if (loadingEl) {
    //         loadingEl.style.display = 'none';
    //       }
    //     });
    //   }, 200);
    // } else {
    //   loadingEl.style.display = 'none';
    // }
  } catch (error) {
    console.error('Error loading model:', error);
    loadingEl.innerHTML = `
      <span class="material-icons-round">error</span>
      <span data-i18n="model-viewer.error">載入失敗</span>
    `;
  }
}

/**
 * 動畫循環
 */
function animate() {
  // 如果已被清理，停止循環
  if (isDisposed) {
    return;
  }
  
  animationFrameId = requestAnimationFrame(animate);
  
  if (vrm) {
    vrm.update(0.016); // 約 60fps
  }
  
  // 更新動畫
  if (animationMixer) {
    animationMixer.update(0.016);
  }
  
  // 更新骨骼線條位置（手動更新）
  if (bonesHelper && bonesHelper.children.length > 0 && vrm) {
    // 找到 SkinnedMesh
    let skinnedMesh = null;
    vrm.scene.traverse((child) => {
      if (child.isSkinnedMesh && !skinnedMesh) {
        skinnedMesh = child;
      }
    });
    
    if (skinnedMesh && skinnedMesh.skeleton) {
      // 更新所有骨骼的世界矩陣
      skinnedMesh.skeleton.bones.forEach(bone => {
        bone.updateMatrixWorld(true);
      });
      
      // 更新線條位置
      let lineIndex = 0;
      skinnedMesh.skeleton.bones.forEach((bone) => {
        if (bone.parent && bone.parent.isBone && lineIndex < bonesHelper.children.length) {
          const line = bonesHelper.children[lineIndex];
          if (line && line.isLine) {
            const parentWorldPos = new THREE.Vector3();
            const boneWorldPos = new THREE.Vector3();
            
            bone.parent.getWorldPosition(parentWorldPos);
            bone.getWorldPosition(boneWorldPos);
            
            // 更新幾何體
            line.geometry.setFromPoints([parentWorldPos, boneWorldPos]);
            line.geometry.attributes.position.needsUpdate = true;
          }
          lineIndex++;
        }
      });
    }
  }
  
  if (controls) {
    controls.update();
  }
  
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

/**
 * 處理視窗大小變化
 */
function onWindowResize() {
  const container = document.getElementById('model-viewer-container');
  if (!container || !camera || !renderer) return;
  
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

/**
 * 綁定事件
 */
function bindEvents() {
  // 上一個模型
  const btnPrev = document.getElementById('btn-prev-model');
  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      currentModelIndex = (currentModelIndex - 1 + models.length) % models.length;
      updateModelName();
      loadModel(models[currentModelIndex].path);
    });
  }
  
  // 下一個模型
  const btnNext = document.getElementById('btn-next-model');
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      currentModelIndex = (currentModelIndex + 1) % models.length;
      updateModelName();
      loadModel(models[currentModelIndex].path);
    });
  }
  
  // Wireframe 切換
  const btnWireframe = document.getElementById('btn-wireframe');
  if (btnWireframe) {
    btnWireframe.addEventListener('click', () => {
      wireframeMode = !wireframeMode;
      btnWireframe.classList.toggle('btn-neu--selected', wireframeMode);
      updateWireframeMode();
    });
  }
  
  // Bones 切換
  const btnBones = document.getElementById('btn-bones');
  if (btnBones) {
    btnBones.addEventListener('click', () => {
      showBones = !showBones;
      btnBones.classList.toggle('btn-neu--selected', showBones);
      updateBonesDisplay();
    });
  }
  
  // 載入動畫
  const btnLoadAnimation = document.getElementById('btn-load-animation');
  if (btnLoadAnimation) {
    btnLoadAnimation.addEventListener('click', () => {
      if (animations.length > 0) {
        loadAnimation(animations[0].path, animations[0].source);
      }
    });
  }
}

/**
 * 更新 Wireframe 模式
 */
function updateWireframeMode() {
  if (!vrm) return;
  
  vrm.scene.traverse((child) => {
    if (child.isMesh) {
      child.material.wireframe = wireframeMode;
    }
  });
}

/**
 * 更新 Bones 顯示
 */
let bonesHelper = null;
function updateBonesDisplay() {
  if (!vrm) return;
  
  try {
    // 移除舊的 helper
    if (bonesHelper) {
      scene.remove(bonesHelper);
      // 清理所有子元素的資源
      bonesHelper.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
      bonesHelper = null;
    }
    
    if (showBones) {
    // 尋找 SkinnedMesh
    let skinnedMesh = null;
    vrm.scene.traverse((child) => {
      if (child.isSkinnedMesh && !skinnedMesh) {
        skinnedMesh = child;
      }
    });
    
    console.log('SkinnedMesh found:', skinnedMesh);
    console.log('VRM scene children:', vrm.scene.children);
    
    if (skinnedMesh && skinnedMesh.skeleton) {
      console.log('Creating bone visualization with skeleton:', skinnedMesh.skeleton);
      console.log('Skeleton bones count:', skinnedMesh.skeleton.bones.length);
      
      // 手動創建骨骼線條（更可靠的方法）
      const boneGroup = new THREE.Group();
      boneGroup.name = 'BonesHelper';
      
      const bones = skinnedMesh.skeleton.bones;
      const boneLines = [];
      
      // 更新所有骨骼的世界矩陣
      bones.forEach(bone => {
        bone.updateMatrixWorld(true);
      });
      
      // 為每個骨骼創建線條連接到父骨骼
      bones.forEach((bone, index) => {
        if (bone.parent && bone.parent.isBone) {
          // 獲取世界座標
          const parentWorldPos = new THREE.Vector3();
          const boneWorldPos = new THREE.Vector3();
          
          bone.parent.getWorldPosition(parentWorldPos);
          bone.getWorldPosition(boneWorldPos);
          
          // 創建線條幾何體
          const geometry = new THREE.BufferGeometry().setFromPoints([
            parentWorldPos,
            boneWorldPos
          ]);
          
          // 創建材質（使用更亮的顏色，關閉深度測試確保線條始終可見）
          const material = new THREE.LineBasicMaterial({ 
            color: 0x00ff00,
            linewidth: 3,
            depthTest: false, // 關閉深度測試，確保線條始終可見
            depthWrite: false,
            transparent: true,
            opacity: 0.8
          });
          
          // 創建線條
          const line = new THREE.Line(geometry, material);
          line.name = `BoneLine_${index}`;
          boneLines.push(line);
          boneGroup.add(line);
        }
      });
      
      console.log('Created bone lines:', boneLines.length);
      
      if (boneGroup.children.length > 0) {
        bonesHelper = boneGroup;
        bonesHelper.visible = true;
        scene.add(bonesHelper);
        console.log('Bone lines added to scene:', boneGroup.children.length);
      } else {
        console.warn('No bone lines created');
      }
    } else {
      // 備用方案：手動繪製骨骼線條
      console.log('Using fallback method to draw bones');
      const boneGroup = new THREE.Group();
      const bones = [];
      
      // 收集所有骨骼
      vrm.scene.traverse((node) => {
        if (node.isBone) {
          bones.push(node);
        }
      });
      
      console.log('Found bones:', bones.length);
      
      // 為每個骨骼創建線條連接到父骨骼
      bones.forEach((bone) => {
        if (bone.parent && bone.parent.isBone) {
          // 獲取世界座標
          const parentWorldPos = new THREE.Vector3();
          const boneWorldPos = new THREE.Vector3();
          bone.parent.getWorldPosition(parentWorldPos);
          bone.getWorldPosition(boneWorldPos);
          
          const geometry = new THREE.BufferGeometry().setFromPoints([
            parentWorldPos,
            boneWorldPos
          ]);
          const material = new THREE.LineBasicMaterial({ 
            color: 0x00ff00,
            linewidth: 3,
            depthTest: false, // 關閉深度測試，確保線條始終可見
            depthWrite: false,
            transparent: true,
            opacity: 0.8
          });
          const line = new THREE.Line(geometry, material);
          boneGroup.add(line);
        }
      });
      
      if (boneGroup.children.length > 0) {
        bonesHelper = boneGroup;
        scene.add(bonesHelper);
        console.log('Bone lines added to scene:', boneGroup.children.length);
      } else {
        console.warn('No bones found to display');
      }
    }
    // 閉合 if (showBones)
    }
  } catch (error) {
    console.error('Error in updateBonesDisplay:', error);
  }
}

/**
 * Mixamo 骨骼名稱到 VRM 骨骼名稱的映射表
 */
function getMixamoToVRMBoneMapping() {
  return {
    // 軀幹
    'mixamorigHips': 'hips',
    'mixamorigSpine': 'spine',
    'mixamorigSpine1': 'chest',
    'mixamorigSpine2': 'upperChest',
    'mixamorigNeck': 'neck',
    'mixamorigHead': 'head',
    
    // 左手臂
    'mixamorigLeftShoulder': 'leftShoulder',
    'mixamorigLeftArm': 'leftUpperArm',
    'mixamorigLeftForeArm': 'leftLowerArm',
    'mixamorigLeftHand': 'leftHand',
    
    // 左手手指
    'mixamorigLeftHandThumb1': 'leftThumbMetacarpal',
    'mixamorigLeftHandThumb2': 'leftThumbProximal',
    'mixamorigLeftHandThumb3': 'leftThumbDistal',
    'mixamorigLeftHandIndex1': 'leftIndexProximal',
    'mixamorigLeftHandIndex2': 'leftIndexIntermediate',
    'mixamorigLeftHandIndex3': 'leftIndexDistal',
    'mixamorigLeftHandMiddle1': 'leftMiddleProximal',
    'mixamorigLeftHandMiddle2': 'leftMiddleIntermediate',
    'mixamorigLeftHandMiddle3': 'leftMiddleDistal',
    'mixamorigLeftHandRing1': 'leftRingProximal',
    'mixamorigLeftHandRing2': 'leftRingIntermediate',
    'mixamorigLeftHandRing3': 'leftRingDistal',
    'mixamorigLeftHandPinky1': 'leftLittleProximal',
    'mixamorigLeftHandPinky2': 'leftLittleIntermediate',
    'mixamorigLeftHandPinky3': 'leftLittleDistal',
    
    // 右手臂
    'mixamorigRightShoulder': 'rightShoulder',
    'mixamorigRightArm': 'rightUpperArm',
    'mixamorigRightForeArm': 'rightLowerArm',
    'mixamorigRightHand': 'rightHand',
    
    // 右手手指
    'mixamorigRightHandThumb1': 'rightThumbMetacarpal',
    'mixamorigRightHandThumb2': 'rightThumbProximal',
    'mixamorigRightHandThumb3': 'rightThumbDistal',
    'mixamorigRightHandIndex1': 'rightIndexProximal',
    'mixamorigRightHandIndex2': 'rightIndexIntermediate',
    'mixamorigRightHandIndex3': 'rightIndexDistal',
    'mixamorigRightHandMiddle1': 'rightMiddleProximal',
    'mixamorigRightHandMiddle2': 'rightMiddleIntermediate',
    'mixamorigRightHandMiddle3': 'rightMiddleDistal',
    'mixamorigRightHandRing1': 'rightRingProximal',
    'mixamorigRightHandRing2': 'rightRingIntermediate',
    'mixamorigRightHandRing3': 'rightRingDistal',
    'mixamorigRightHandPinky1': 'rightLittleProximal',
    'mixamorigRightHandPinky2': 'rightLittleIntermediate',
    'mixamorigRightHandPinky3': 'rightLittleDistal',
    
    // 左腿
    'mixamorigLeftUpLeg': 'leftUpperLeg',
    'mixamorigLeftLeg': 'leftLowerLeg',
    'mixamorigLeftFoot': 'leftFoot',
    'mixamorigLeftToeBase': 'leftToes',
    
    // 右腿
    'mixamorigRightUpLeg': 'rightUpperLeg',
    'mixamorigRightLeg': 'rightLowerLeg',
    'mixamorigRightFoot': 'rightFoot',
    'mixamorigRightToeBase': 'rightToes'
  };
}

/**
 * 處理動畫並映射到 VRM（參考 opensourceavatars.com 實作）
 * @param {string} animationUrl - 動畫 URL
 * @param {Object} targetVRM - VRM 模型
 * @returns {Promise<THREE.AnimationClip>} - 處理後的動畫
 */
async function loadMixamoAnimation(animationUrl, targetVRM) {
  const boneMapping = getMixamoToVRMBoneMapping();
  
  // 使用 fetch 獲取 FBX 文件
  console.log('Fetching animation file...');
  const response = await fetch(animationUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch animation: ${response.status} ${response.statusText}`);
  }
  
  const blob = await response.blob();
  console.log('Animation blob received:', { size: blob.size, type: blob.type });
  
  const blobUrl = URL.createObjectURL(blob);
  const fbxLoader = new FBXLoader();
  
  try {
    // 載入 FBX
    console.log('Loading FBX animation...');
    const fbx = await new Promise((resolve, reject) => {
      fbxLoader.load(blobUrl, resolve, undefined, reject);
    });
    
    console.log('FBX loaded, processing animation');
    
    // 找到 mixamo.com 動畫
    const originalAnimation = THREE.AnimationClip.findByName(fbx.animations, 'mixamo.com');
    if (!originalAnimation) {
      throw new Error('No Mixamo animation found in FBX file');
    }
    
    const tracks = [];
    console.log('Processing animation tracks');
    
    // 用於旋轉轉換的臨時變量
    const restRotationInverse = new THREE.Quaternion();
    const parentRestWorldRotation = new THREE.Quaternion();
    const _quatA = new THREE.Quaternion();
    const _vec3 = new THREE.Vector3();
    
    // 找到 FBX 中的 hips 骨骼
    const fbxHips = fbx.getObjectByName('mixamorigHips');
    if (!fbxHips) {
      throw new Error('No hips bone found in animation');
    }
    
    // 計算縮放比例（VRM hips 高度 / FBX hips 高度）
    const fbxHipsY = fbxHips.position.y;
    const vrmHipsNode = targetVRM.humanoid?.getNormalizedBoneNode('hips');
    const vrmHipsY = vrmHipsNode?.getWorldPosition(_vec3).y;
    const vrmSceneY = targetVRM.scene.getWorldPosition(_vec3.clone()).y;
    
    if (typeof vrmHipsY !== 'number' || typeof vrmSceneY !== 'number') {
      throw new Error('Could not determine VRM hips position');
    }
    
    const motionHipsHeight = Math.abs(vrmHipsY - vrmSceneY) / fbxHipsY;
    console.log('Motion scale factor:', motionHipsHeight);
    
    // 檢查 VRM 版本
    const isVRM0 = targetVRM.meta?.metaVersion === '0';
    
    // 處理每個軌道
    console.log('Processing individual tracks');
    originalAnimation.tracks.forEach(track => {
      const trackSplitted = track.name.split('.');
      const mixamoBoneName = trackSplitted[0];
      const vrmBoneName = boneMapping[mixamoBoneName];
      const vrmBoneNode = targetVRM.humanoid?.getNormalizedBoneNode(vrmBoneName);
      const vrmBoneNodeName = vrmBoneNode?.name;
      
      // 獲取對應的 FBX 骨骼
      const fbxBone = fbx.getObjectByName(mixamoBoneName);
      
      if (vrmBoneNodeName != null && fbxBone != null) {
        const propertyName = trackSplitted[1];
        
        // 獲取 FBX 骨骼的 rest rotation
        fbxBone.getWorldQuaternion(restRotationInverse).invert();
        fbxBone.parent.getWorldQuaternion(parentRestWorldRotation);
        
        if (track instanceof THREE.QuaternionKeyframeTrack) {
          // 處理 quaternion 軌道
          for (let i = 0; i < track.values.length; i += 4) {
            const flatQuaternion = track.values.slice(i, i + 4);
            
            _quatA.fromArray(flatQuaternion);
            
            // 轉換旋轉：parentRestWorldRotation * quaternion * restRotationInverse
            _quatA.premultiply(parentRestWorldRotation).multiply(restRotationInverse);
            
            _quatA.toArray(flatQuaternion);
            
            flatQuaternion.forEach((v, index) => {
              track.values[index + i] = v;
            });
          }
          
          // VRM0 需要對某些軸取反
          const newValues = track.values.map((v, index) => {
            return isVRM0 && index % 2 === 0 ? -v : v;
          });
          
          tracks.push(
            new THREE.QuaternionKeyframeTrack(
              `${vrmBoneNodeName}.${propertyName}`,
              track.times,
              newValues
            )
          );
        } else if (track instanceof THREE.VectorKeyframeTrack) {
          // 處理 position 軌道（只有 hips 有位置動畫）
          const newValues = track.values.map((v, index) => {
            // VRM0 對 x 和 z 軸取反
            const value = isVRM0 && index % 3 !== 1 ? -v : v;
            return value * motionHipsHeight;
          });
          
          tracks.push(
            new THREE.VectorKeyframeTrack(
              `${vrmBoneNodeName}.${propertyName}`,
              track.times,
              newValues
            )
          );
        }
      }
    });
    
    console.log(`Animation processed: ${tracks.length} tracks created`);
    return new THREE.AnimationClip('vrmAnimation', originalAnimation.duration, tracks);
    
  } finally {
    URL.revokeObjectURL(blobUrl);
  }
}

/**
 * 載入 FBX 動畫（使用 opensourceavatars.com 的方式）
 */
async function loadAnimation(animationPath, source) {
  console.log('loadAnimation: Starting, path:', animationPath);
  
  if (!vrm) {
    console.error('Cannot load animation: VRM model not loaded');
    alert('請先載入 3D 模型');
    return;
  }
  
  const loadingEl = document.getElementById('model-viewer-loading');
  if (loadingEl) {
    loadingEl.style.display = 'flex';
    loadingEl.innerHTML = `
      <span class="material-icons-round">hourglass_empty</span>
      <span data-i18n="model-viewer.loading-animation">載入動畫中...</span>
    `;
  }
  
  try {
    // 停止當前動畫
    if (animationMixer) {
      animationMixer.stopAllAction();
      animationMixer = null;
    }
    
    // 使用新的動畫載入函數
    const animationClip = await loadMixamoAnimation(animationPath, vrm);
    
    // 創建 AnimationMixer
    animationMixer = new THREE.AnimationMixer(vrm.scene);
    
    // 創建並播放動畫
    const action = animationMixer.clipAction(animationClip);
    action.play();
    
    currentAnimation = {
      name: animationClip.name || 'Animation',
      source: source
    };
    
    console.log(`Animation loaded: ${currentAnimation.name} (${animationClip.tracks.length} tracks)`);
    
    // 隱藏載入指示器
    if (loadingEl) {
      loadingEl.style.display = 'none';
    }
    
  } catch (error) {
    console.error('Error loading animation:', error);
    if (loadingEl) {
      loadingEl.innerHTML = `
        <span class="material-icons-round">error</span>
        <span>動畫載入失敗: ${error.message || '未知錯誤'}</span>
      `;
      setTimeout(() => {
        loadingEl.style.display = 'none';
      }, 3000);
    }
    alert(`動畫載入失敗: ${error.message || '未知錯誤'}`);
  }
}

/**
 * 更新模型名稱顯示
 */
function updateModelName() {
  const nameEl = document.getElementById('current-model-name');
  if (nameEl) {
    nameEl.textContent = models[currentModelIndex].name;
  }
}

/**
 * 更新 i18n
 */
function updateI18n() {
  // i18n 會自動處理 data-i18n 屬性
  const event = new CustomEvent('languageChanged');
  window.dispatchEvent(event);
}

/**
 * 清理資源（完整清理，防止 WebGL 資源洩漏）
 */
export function cleanupModelViewer() {
  console.log('cleanupModelViewer: Starting cleanup...');
  
  // 標記已清理，停止動畫循環
  isDisposed = true;
  
  // 取消 animation frame
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  
  // 停止動畫 mixer
  if (animationMixer) {
    animationMixer.stopAllAction();
    animationMixer = null;
  }
  currentAnimation = null;
  
  // 清理骨骼 helper
  if (bonesHelper) {
    if (scene) {
      scene.remove(bonesHelper);
    }
    bonesHelper.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(m => m.dispose());
        } else {
          child.material.dispose();
        }
      }
    });
    bonesHelper = null;
  }
  
  // 清理 VRM 模型
  if (vrm) {
    if (scene) {
      scene.remove(vrm.scene);
    }
    // 釋放 VRM 相關資源
    vrm.scene.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(m => {
            if (m.map) m.map.dispose();
            if (m.normalMap) m.normalMap.dispose();
            if (m.emissiveMap) m.emissiveMap.dispose();
            m.dispose();
          });
        } else {
          if (child.material.map) child.material.map.dispose();
          if (child.material.normalMap) child.material.normalMap.dispose();
          if (child.material.emissiveMap) child.material.emissiveMap.dispose();
          child.material.dispose();
        }
      }
    });
    vrm = null;
  }
  
  // 清理網格
  if (gridHelper) {
    if (scene) {
      scene.remove(gridHelper);
    }
    if (gridHelper.geometry) gridHelper.geometry.dispose();
    if (gridHelper.material) gridHelper.material.dispose();
    gridHelper = null;
  }
  
  // 清理場景中的所有對象
  if (scene) {
    scene.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(m => m.dispose());
        } else {
          child.material.dispose();
        }
      }
    });
    scene.clear();
    scene = null;
  }
  
  // 清理控制器
  if (controls) {
    controls.dispose();
    controls = null;
  }
  
  // 清理渲染器（最重要！）
  if (renderer) {
    renderer.dispose();
    // 注意：forceContextLoss() 在 Firefox 上可能導致問題，暫時不使用
    // renderer.forceContextLoss();
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
    renderer.domElement = null;
    renderer = null;
  }
  
  camera = null;
  
  // 移除事件監聯器
  window.removeEventListener('resize', onWindowResize);
  window.removeEventListener('beforeunload', cleanupModelViewer);
  
  console.log('cleanupModelViewer: Cleanup completed');
}

