/**
 * Estimation Card Component
 * Pokemon Card Style with Holographic Effects
 */

/**
 * Modified Fibonacci 牌組
 */
export const CARD_SET = [
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
  { value: '100', label: '100' },
  { value: '∞', label: '∞', special: 'infinity' },
  { value: '?', label: '?', special: 'question' },
  { value: '☕', label: '☕', special: 'coffee' }
];

/**
 * 建立單張卡片 HTML
 * @param {Object} card - 卡片資料
 * @param {boolean} isFlipped - 是否已翻開
 * @param {boolean} isSelected - 是否已選擇
 * @returns {string} HTML 字串
 */
export function createCardHTML(card, isFlipped = false, isSelected = false) {
  const specialAttr = card.special ? `data-special="${card.special}"` : '';
  const selectedClass = isSelected ? 'selected' : '';
  const flippedClass = isFlipped ? 'flipped' : '';
  
  return `
    <div class="card-wrapper stagger-item" data-value="${card.value}">
      <div class="card ${selectedClass} ${flippedClass}" ${specialAttr}>
        <div class="card-border-glow"></div>
        
        <!-- Front Face (Hidden state - shows ?) -->
        <div class="card-face card-front">
          <div class="card-holo"></div>
          <div class="card-shine"></div>
          <div class="card-inner-glow"></div>
          <div class="card-content">
            <span class="card-value">?</span>
          </div>
        </div>
        
        <!-- Back Face (Revealed state - shows value) -->
        <div class="card-face card-back">
          <div class="card-holo"></div>
          <div class="card-shine"></div>
          <div class="card-inner-glow"></div>
          <div class="card-content">
            <span class="card-value">${card.label}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * 建立選擇用卡片 HTML（正面顯示數字）
 * @param {Object} card - 卡片資料
 * @param {boolean} isSelected - 是否已選擇
 * @returns {string} HTML 字串
 */
export function createSelectableCardHTML(card, isSelected = false) {
  const specialAttr = card.special ? `data-special="${card.special}"` : '';
  const selectedClass = isSelected ? 'selected' : '';
  
  return `
    <div class="card-wrapper stagger-item" data-value="${card.value}">
      <div class="card ${selectedClass}" ${specialAttr}>
        <div class="card-border-glow"></div>
        <div class="card-face card-front" style="transform: rotateY(0deg);">
          <div class="card-holo"></div>
          <div class="card-shine"></div>
          <div class="card-inner-glow"></div>
          <div class="card-content">
            <span class="card-value">${card.label}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * 建立卡片網格
 * @param {Array} cards - 卡片陣列
 * @param {string} selectedValue - 已選擇的值
 * @returns {string} HTML 字串
 */
export function createCardsGrid(cards, selectedValue = null) {
  return `
    <div class="cards-grid">
      ${cards.map(card => createSelectableCardHTML(card, card.value === selectedValue)).join('')}
    </div>
  `;
}

/**
 * 初始化卡片 Tilt 效果
 * @param {HTMLElement} container - 卡片容器元素
 */
export function initCardTiltEffect(container) {
  const cardWrappers = container.querySelectorAll('.card-wrapper');
  
  cardWrappers.forEach(wrapper => {
    const card = wrapper.querySelector('.card');
    const holoElements = wrapper.querySelectorAll('.card-holo');
    const shineElements = wrapper.querySelectorAll('.card-shine');
    const glowElements = wrapper.querySelectorAll('.card-inner-glow');
    
    // 滑鼠/觸控移動處理
    const handleMove = (clientX, clientY) => {
      const rect = wrapper.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // 計算旋轉角度（最大 15 度）
      const rotateX = ((y - centerY) / centerY) * -15;
      const rotateY = ((x - centerX) / centerX) * 15;
      
      // 計算百分比位置（用於光澤效果）
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      
      // 套用 3D 傾斜
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      
      // 更新全息效果角度
      const holoAngle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
      holoElements.forEach(el => {
        el.style.setProperty('--holo-angle', `${holoAngle}deg`);
        el.style.setProperty('--shimmer-angle', `${holoAngle + 90}deg`);
      });
      
      // 更新光澤效果
      shineElements.forEach(el => {
        el.style.setProperty('--shine-angle', `${holoAngle + 45}deg`);
        el.style.setProperty('--shine-pos', `${percentX}% ${percentY}%`);
      });
      
      // 更新內部光暈
      glowElements.forEach(el => {
        el.style.setProperty('--glow-x', `${percentX}%`);
        el.style.setProperty('--glow-y', `${percentY}%`);
      });
      
      wrapper.classList.add('tilt-active');
    };
    
    // 滑鼠事件
    wrapper.addEventListener('mousemove', (e) => {
      handleMove(e.clientX, e.clientY);
    });
    
    wrapper.addEventListener('mouseleave', () => {
      wrapper.classList.remove('tilt-active');
      card.style.transform = '';
      
      holoElements.forEach(el => {
        el.style.removeProperty('--holo-angle');
        el.style.removeProperty('--shimmer-angle');
      });
      shineElements.forEach(el => {
        el.style.removeProperty('--shine-angle');
        el.style.removeProperty('--shine-pos');
      });
      glowElements.forEach(el => {
        el.style.removeProperty('--glow-x');
        el.style.removeProperty('--glow-y');
      });
    });
    
    // 觸控事件（Mobile）
    wrapper.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    }, { passive: false });
    
    wrapper.addEventListener('touchend', () => {
      wrapper.classList.remove('tilt-active');
      card.style.transform = '';
      
      holoElements.forEach(el => {
        el.style.removeProperty('--holo-angle');
        el.style.removeProperty('--shimmer-angle');
      });
      shineElements.forEach(el => {
        el.style.removeProperty('--shine-angle');
        el.style.removeProperty('--shine-pos');
      });
      glowElements.forEach(el => {
        el.style.removeProperty('--glow-x');
        el.style.removeProperty('--glow-y');
      });
    });
  });
}

/**
 * 設定卡片點擊處理
 * @param {HTMLElement} container - 卡片容器元素
 * @param {Function} onSelect - 選擇回調函數
 */
export function setupCardSelection(container, onSelect) {
  const cardWrappers = container.querySelectorAll('.card-wrapper');
  
  cardWrappers.forEach(wrapper => {
    wrapper.addEventListener('click', () => {
      const value = wrapper.dataset.value;
      
      // 移除其他卡片的選擇狀態
      cardWrappers.forEach(w => {
        w.querySelector('.card').classList.remove('selected');
      });
      
      // 設定當前卡片的選擇狀態
      wrapper.querySelector('.card').classList.add('selected');
      
      // 觸發回調
      if (onSelect) {
        onSelect(value);
      }
    });
  });
}

