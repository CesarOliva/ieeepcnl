// Toast utility for non-React JavaScript files
export function showSimpleToast(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') {
  const container = document.getElementById('simple-toast-container') || createToastContainer();
  
  const toastEl = document.createElement('div');
  toastEl.className = `simple-toast simple-toast-${type}`;
  toastEl.innerHTML = message;
  
  container.appendChild(toastEl);
  
  // Auto-remove after 3 seconds
  setTimeout(() => {
    toastEl.classList.add('fade-out');
    setTimeout(() => toastEl.remove(), 300);
  }, 3000);
}

function createToastContainer() {
  const container = document.createElement('div');
  container.id = 'simple-toast-container';
  container.style.cssText = 'position: fixed; top: 16px; right: 16px; z-index: 9999; display: flex; flex-direction: column; gap: 8px;';
  document.body.appendChild(container);
  
  // Inject styles
  if (!document.getElementById('simple-toast-styles')) {
    const style = document.createElement('style');
    style.id = 'simple-toast-styles';
    style.innerHTML = `
      .simple-toast {
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        animation: slideInRight 0.3s ease-in-out;
        border: 1px solid;
      }
      
      .simple-toast-success {
        background-color: #dcfce7;
        color: #166534;
        border-color: #bbf7d0;
      }
      
      .simple-toast-error {
        background-color: #fee2e2;
        color: #991b1b;
        border-color: #fca5a5;
      }
      
      .simple-toast-info {
        background-color: #dbeafe;
        color: #1e40af;
        border-color: #bfdbfe;
      }
      
      .simple-toast-warning {
        background-color: #fef3c7;
        color: #92400e;
        border-color: #fde68a;
      }
      
      .simple-toast.fade-out {
        animation: fadeOut 0.3s ease-in-out forwards;
      }
      
      @keyframes slideInRight {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes fadeOut {
        to {
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  return container;
}
