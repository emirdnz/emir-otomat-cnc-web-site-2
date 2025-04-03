// Bu dosya hata ayıklama için kullanılacak
console.log("%c 🔍 DEBUG HELPER BAŞLATILDI 🔍", "background: #222; color: #bada55; font-size: 16px; padding: 10px;");
console.log("%c Mevcut URL:", "color: blue; font-weight: bold;", window.location.href);
console.log("%c Tarayıcı Bilgileri:", "color: blue; font-weight: bold;", navigator.userAgent);

// Tüm React bileşenlerinin render edilmesini izle
console.log("%c REACT BİLEŞEN RENDER İZLEME BAŞLATILDI", "background: #222; color: #bada55;");

// Routing hatalarını yakalamak için
window.addEventListener('error', (event) => {
  console.error('%c 🚨 GLOBAL HATA YAKALANDI:', 'background: red; color: white; font-size: 14px; padding: 5px;', {
    message: event.message,
    source: event.filename,
    lineNo: event.lineno,
    colNo: event.colno,
    error: event.error
  });
  
  // Hata bilgilerini ekranda göster
  showErrorOverlay({
    message: event.message,
    source: event.filename,
    lineNo: event.lineno,
    colNo: event.colno,
    stack: event.error ? event.error.stack : 'Stack bilgisi yok'
  });
});

// Promise hatalarını yakalamak için
window.addEventListener('unhandledrejection', (event) => {
  console.error('%c 🚨 İŞLENMEMİŞ PROMISE HATASI:', 'background: red; color: white; font-size: 14px; padding: 5px;', {
    reason: event.reason
  });
  
  // Hata bilgilerini ekranda göster
  showErrorOverlay({
    message: event.reason.message || 'Promise hatası',
    stack: event.reason.stack || 'Stack bilgisi yok'
  });
});

// Konsol metodlarını genişletelim
const originalConsoleError = console.error;
console.error = function(...args) {
  // Orijinal error fonksiyonunu çağır
  originalConsoleError.apply(console, args);
  
  // Hata bilgilerini ekranda göster
  const errorMessage = args.map(arg => 
    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
  ).join(' ');
  
  showErrorOverlay({
    message: errorMessage,
    source: 'console.error',
  });
};

// React bileşenlerindeki hataları yakalamak için
export const logComponentError = (error, errorInfo) => {
  console.error('%c 🚨 REACT BİLEŞEN HATASI:', 'background: red; color: white; font-size: 14px; padding: 5px;', {
    error,
    componentStack: errorInfo?.componentStack
  });
  
  // Hata bilgilerini ekranda göster
  showErrorOverlay({
    message: error.message,
    stack: error.stack,
    componentStack: errorInfo?.componentStack
  });
};

// Ağ isteklerini izlemek için
const originalFetch = window.fetch;
window.fetch = function(...args) {
  const url = args[0];
  const options = args[1] || {};
  
  console.log('%c 🌐 FETCH İSTEĞİ:', 'background: #2196F3; color: white; padding: 5px;', {
    url,
    method: options.method || 'GET',
    headers: options.headers,
    body: options.body
  });
  
  return originalFetch.apply(this, args)
    .then(response => {
      console.log('%c ✅ FETCH YANITI:', 'background: #4CAF50; color: white; padding: 5px;', {
        url,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      });
      return response;
    })
    .catch(error => {
      console.error('%c 🚨 FETCH HATASI:', 'background: red; color: white; padding: 5px;', {
        url,
        error
      });
      throw error;
    });
};

// Hataları ekranda göstermek için overlay
function showErrorOverlay(errorInfo) {
  // Eğer zaten bir hata overlay'i varsa, onu güncelle
  let errorOverlay = document.getElementById('debug-error-overlay');
  
  if (!errorOverlay) {
    // Yoksa yeni bir overlay oluştur
    errorOverlay = document.createElement('div');
    errorOverlay.id = 'debug-error-overlay';
    errorOverlay.style.position = 'fixed';
    errorOverlay.style.bottom = '0';
    errorOverlay.style.left = '0';
    errorOverlay.style.right = '0';
    errorOverlay.style.maxHeight = '50vh';
    errorOverlay.style.overflow = 'auto';
    errorOverlay.style.backgroundColor = 'rgba(255, 0, 0, 0.9)';
    errorOverlay.style.color = 'white';
    errorOverlay.style.padding = '15px';
    errorOverlay.style.fontFamily = 'monospace';
    errorOverlay.style.fontSize = '14px';
    errorOverlay.style.zIndex = '9999';
    
    // Kapatma butonu
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Kapat';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.padding = '5px 10px';
    closeButton.style.backgroundColor = 'white';
    closeButton.style.color = 'red';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '4px';
    closeButton.style.cursor = 'pointer';
    closeButton.onclick = () => {
      document.body.removeChild(errorOverlay);
    };
    
    errorOverlay.appendChild(closeButton);
    document.body.appendChild(errorOverlay);
  }
  
  // Hata bilgilerini ekle
  const errorContent = document.createElement('div');
  errorContent.style.marginBottom = '10px';
  errorContent.style.borderBottom = '1px solid rgba(255, 255, 255, 0.3)';
  errorContent.style.paddingBottom = '10px';
  
  // Zaman damgası
  const timestamp = new Date().toLocaleTimeString();
  const timeElement = document.createElement('div');
  timeElement.textContent = `⏱️ ${timestamp}`;
  timeElement.style.marginBottom = '5px';
  errorContent.appendChild(timeElement);
  
  // Hata mesajı
  if (errorInfo.message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = `🚨 Hata: ${errorInfo.message}`;
    messageElement.style.fontWeight = 'bold';
    messageElement.style.marginBottom = '5px';
    errorContent.appendChild(messageElement);
  }
  
  // Kaynak bilgisi
  if (errorInfo.source) {
    const sourceElement = document.createElement('div');
    sourceElement.textContent = `📄 Kaynak: ${errorInfo.source}`;
    if (errorInfo.lineNo) {
      sourceElement.textContent += ` (Satır: ${errorInfo.lineNo}, Sütun: ${errorInfo.colNo || 'N/A'})`;
    }
    sourceElement.style.marginBottom = '5px';
    errorContent.appendChild(sourceElement);
  }
  
  // Stack bilgisi
  if (errorInfo.stack) {
    const stackElement = document.createElement('pre');
    stackElement.textContent = `📚 Stack: ${errorInfo.stack}`;
    stackElement.style.whiteSpace = 'pre-wrap';
    stackElement.style.overflow = 'auto';
    stackElement.style.maxHeight = '200px';
    stackElement.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    stackElement.style.padding = '10px';
    stackElement.style.borderRadius = '4px';
    stackElement.style.marginBottom = '5px';
    errorContent.appendChild(stackElement);
  }
  
  // Component stack bilgisi (React hataları için)
  if (errorInfo.componentStack) {
    const componentStackElement = document.createElement('pre');
    componentStackElement.textContent = `🧩 Component Stack: ${errorInfo.componentStack}`;
    componentStackElement.style.whiteSpace = 'pre-wrap';
    componentStackElement.style.overflow = 'auto';
    componentStackElement.style.maxHeight = '200px';
    componentStackElement.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    componentStackElement.style.padding = '10px';
    componentStackElement.style.borderRadius = '4px';
    errorContent.appendChild(componentStackElement);
  }
  
  // Overlay'e ekle
  errorOverlay.insertBefore(errorContent, errorOverlay.firstChild);
}

// Sayfa yüklendiğinde çalışacak kontroller
window.addEventListener('load', () => {
  console.log("%c 📋 SAYFA YÜKLEME KONTROLLERI BAŞLATILDI", "background: #222; color: #bada55;");
  
  // React root kontrolü
  setTimeout(() => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
      const hasChildren = rootElement.hasChildNodes();
      console.log("%c React Root Durumu:", "color: blue; font-weight: bold;", {
        element: rootElement,
        hasChildren,
        childCount: rootElement.childNodes.length
      });
      
      if (!hasChildren) {
        console.error("%c 🚨 UYARI: React root boş görünüyor!", "background: red; color: white;");
      }
    } else {
      console.error("%c 🚨 HATA: React root elementi bulunamadı!", "background: red; color: white;");
    }
  }, 2000);
  
  // CSS kontrolleri
  const styles = document.styleSheets;
  console.log("%c Yüklenen CSS Dosyaları:", "color: blue; font-weight: bold;", Array.from(styles).map(sheet => ({
    href: sheet.href,
    ruleCount: sheet.cssRules ? sheet.cssRules.length : 'Erişilemiyor'
  })));
  
  // Script kontrolleri
  const scripts = document.scripts;
  console.log("%c Yüklenen Script Dosyaları:", "color: blue; font-weight: bold;", Array.from(scripts).map(script => ({
    src: script.src,
    type: script.type,
    async: script.async,
    defer: script.defer
  })));
});

// Yönlendirme değişikliklerini izle
let lastUrl = window.location.href;
new MutationObserver(() => {
  const currentUrl = window.location.href;
  if (currentUrl !== lastUrl) {
    console.log("%c 🔄 URL DEĞİŞİKLİĞİ:", "background: purple; color: white; padding: 5px;", {
      from: lastUrl,
      to: currentUrl
    });
    lastUrl = currentUrl;
  }
}).observe(document, { subtree: true, childList: true });

// React Error Boundary bileşeni için yardımcı fonksiyon
export class ErrorLogger {
  static logError(error, errorInfo) {
    logComponentError(error, errorInfo);
  }
}

export default {
  logComponentError,
  ErrorLogger
};
