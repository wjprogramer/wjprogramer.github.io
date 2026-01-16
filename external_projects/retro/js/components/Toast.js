// Toast 通知元件
export class Toast {
  static show(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // 樣式
    Object.assign(toast.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 24px',
      background: 'var(--bg-card)',
      color: 'var(--text-primary)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)',
      zIndex: '1000',
      animation: 'toastSlideIn 0.3s ease',
      border: '1px solid var(--border-color)'
    });
    
    // 類型顏色
    if (type === 'success') {
      toast.style.borderLeft = '4px solid var(--color-success)';
    } else if (type === 'error') {
      toast.style.borderLeft = '4px solid var(--color-danger)';
    } else if (type === 'warning') {
      toast.style.borderLeft = '4px solid var(--color-warning)';
    } else {
      toast.style.borderLeft = '4px solid var(--color-primary)';
    }
    
    document.body.appendChild(toast);
    
    // 自動移除
    setTimeout(() => {
      toast.style.animation = 'toastSlideOut 0.3s ease';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, duration);
    
    // 點擊關閉
    toast.addEventListener('click', () => {
      toast.style.animation = 'toastSlideOut 0.3s ease';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    });
  }
  
  static success(message, duration) {
    this.show(message, 'success', duration);
  }
  
  static error(message, duration) {
    this.show(message, 'error', duration);
  }
  
  static warning(message, duration) {
    this.show(message, 'warning', duration);
  }
  
  static info(message, duration) {
    this.show(message, 'info', duration);
  }
}

// 添加 Toast 動畫樣式
const style = document.createElement('style');
style.textContent = `
  @keyframes toastSlideIn {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes toastSlideOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  }
`;
document.head.appendChild(style);

