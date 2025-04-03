/**
 * Logger - Uygulama genelinde hata ve log yönetimi için kullanılan yardımcı sınıf
 * Bu modül, hem konsola hem de dosyaya log kaydı tutmayı sağlar.
 */

// Log seviyeleri
export const LOG_LEVELS = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  CRITICAL: 'CRITICAL'
};

// Konsol renkleri - daha göz dostu renkler
const CONSOLE_COLORS = {
  [LOG_LEVELS.DEBUG]: 'color: #6B7280', // Gri tonu
  [LOG_LEVELS.INFO]: 'color: #3B82F6',  // Mavi tonu
  [LOG_LEVELS.WARNING]: 'background: #FCD34D; color: #78350F; padding: 2px 5px; border-radius: 2px', // Sarı arka plan, koyu metin
  [LOG_LEVELS.ERROR]: 'background: #FECACA; color: #991B1B; padding: 2px 5px; border-radius: 2px', // Açık kırmızı arka plan, koyu kırmızı metin
  [LOG_LEVELS.CRITICAL]: 'background: #E5E7EB; color: #1F2937; padding: 2px 5px; border-radius: 2px; font-weight: bold; border-left: 4px solid #991B1B' // Gri arka plan, koyu metin, kırmızı kenar
};

// Log kayıtlarını tutacak dizi
const logHistory = [];
const MAX_LOG_HISTORY = 1000; // Maksimum log kaydı sayısı

/**
 * Log kaydı oluşturur
 * @param {string} level - Log seviyesi
 * @param {string} module - Log kaydının oluşturulduğu modül
 * @param {string} message - Log mesajı
 * @param {object} data - İlave veri
 */
export const log = (level, module, message, data = null) => {
  // Zaman damgası oluştur
  const timestamp = new Date().toISOString();
  
  // Log kaydı oluştur
  const logEntry = {
    timestamp,
    level,
    module,
    message,
    data
  };
  
  // Konsola yazdır
  const consoleStyle = CONSOLE_COLORS[level] || '';
  const prefix = `[${timestamp}] %c${level}%c [${module}]:`;
  
  if (data) {
    console.log(prefix, consoleStyle, '', message, data);
  } else {
    console.log(prefix, consoleStyle, '', message);
  }
  
  // Log geçmişine ekle
  logHistory.push(logEntry);
  
  // Maksimum log sayısını aşmamak için eski logları temizle
  if (logHistory.length > MAX_LOG_HISTORY) {
    logHistory.shift();
  }
  
  // Eğer hata seviyesinde bir log ise, DOM'a da ekle
  if (level === LOG_LEVELS.ERROR || level === LOG_LEVELS.CRITICAL) {
    addLogToDOM(logEntry);
  }
  
  return logEntry;
};

/**
 * Hata loglarını DOM'a ekler
 * @param {object} logEntry - Log kaydı
 */
const addLogToDOM = (logEntry) => {
  // Eğer sayfa henüz yüklenmediyse, DOMContentLoaded olayını bekle
  if (document.readyState !== 'complete') {
    window.addEventListener('DOMContentLoaded', () => {
      createLogElement(logEntry);
    });
    return;
  }
  
  createLogElement(logEntry);
};

/**
 * Log kaydı için DOM elementi oluşturur
 * @param {object} logEntry - Log kaydı
 */
const createLogElement = (logEntry) => {
  // Log container elementi var mı kontrol et, yoksa oluştur
  let logContainer = document.getElementById('app-log-container');
  
  if (!logContainer) {
    logContainer = document.createElement('div');
    logContainer.id = 'app-log-container';
    logContainer.style.position = 'fixed';
    logContainer.style.bottom = '0';
    logContainer.style.right = '0';
    logContainer.style.width = '400px';
    logContainer.style.maxHeight = '300px';
    logContainer.style.overflowY = 'auto';
    logContainer.style.backgroundColor = '#F9FAFB'; // Açık gri arka plan
    logContainer.style.color = '#1F2937';  // Koyu gri metin
    logContainer.style.fontFamily = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
    logContainer.style.fontSize = '12px';
    logContainer.style.padding = '10px';
    logContainer.style.zIndex = '9999';
    logContainer.style.borderTopLeftRadius = '8px';
    logContainer.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    logContainer.style.border = '1px solid #E5E7EB';
    logContainer.style.display = 'none'; // Başlangıçta gizli
    
    // Başlık ve kontrol butonları
    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.style.marginBottom = '10px';
    header.style.borderBottom = '1px solid #E5E7EB';
    header.style.paddingBottom = '8px';
    
    const title = document.createElement('div');
    title.textContent = 'Hata Konsolu';
    title.style.fontWeight = 'bold';
    title.style.fontSize = '14px';
    title.style.color = '#111827';
    
    const buttonContainer = document.createElement('div');
    
    // Temizle butonu
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Temizle';
    clearButton.style.backgroundColor = '#EFF6FF';
    clearButton.style.color = '#1E40AF';
    clearButton.style.border = '1px solid #DBEAFE';
    clearButton.style.borderRadius = '4px';
    clearButton.style.padding = '3px 8px';
    clearButton.style.marginRight = '5px';
    clearButton.style.cursor = 'pointer';
    clearButton.style.fontSize = '12px';
    clearButton.style.transition = 'all 0.2s';
    clearButton.onmouseover = () => {
      clearButton.style.backgroundColor = '#DBEAFE';
    };
    clearButton.onmouseout = () => {
      clearButton.style.backgroundColor = '#EFF6FF';
    };
    clearButton.onclick = () => {
      const logEntries = logContainer.querySelectorAll('.log-entry');
      logEntries.forEach(entry => entry.remove());
    };
    
    // Kapat butonu
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Kapat';
    closeButton.style.backgroundColor = '#F3F4F6';
    closeButton.style.color = '#374151';
    closeButton.style.border = '1px solid #E5E7EB';
    closeButton.style.borderRadius = '4px';
    closeButton.style.padding = '3px 8px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontSize = '12px';
    closeButton.style.transition = 'all 0.2s';
    closeButton.onmouseover = () => {
      closeButton.style.backgroundColor = '#E5E7EB';
    };
    closeButton.onmouseout = () => {
      closeButton.style.backgroundColor = '#F3F4F6';
    };
    closeButton.onclick = () => {
      logContainer.style.display = 'none';
      document.getElementById('app-log-toggle-button').style.display = 'flex';
    };
    
    // İndir butonu
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'İndir';
    downloadButton.style.backgroundColor = '#ECFDF5';
    downloadButton.style.color = '#065F46';
    downloadButton.style.border = '1px solid #D1FAE5';
    downloadButton.style.borderRadius = '4px';
    downloadButton.style.padding = '3px 8px';
    downloadButton.style.marginRight = '5px';
    downloadButton.style.cursor = 'pointer';
    downloadButton.style.fontSize = '12px';
    downloadButton.style.transition = 'all 0.2s';
    downloadButton.onmouseover = () => {
      downloadButton.style.backgroundColor = '#D1FAE5';
    };
    downloadButton.onmouseout = () => {
      downloadButton.style.backgroundColor = '#ECFDF5';
    };
    downloadButton.onclick = () => {
      saveLogsToFile();
    };
    
    buttonContainer.appendChild(downloadButton);
    buttonContainer.appendChild(clearButton);
    buttonContainer.appendChild(closeButton);
    
    header.appendChild(title);
    header.appendChild(buttonContainer);
    
    logContainer.appendChild(header);
    document.body.appendChild(logContainer);
    
    // Toggle butonu
    const toggleButton = document.createElement('button');
    toggleButton.id = 'app-log-toggle-button';
    toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> <span>Hata Konsolu</span>';
    toggleButton.style.position = 'fixed';
    toggleButton.style.bottom = '10px';
    toggleButton.style.right = '10px';
    toggleButton.style.backgroundColor = '#F3F4F6';
    toggleButton.style.color = '#374151';
    toggleButton.style.border = '1px solid #E5E7EB';
    toggleButton.style.borderRadius = '6px';
    toggleButton.style.padding = '8px 12px';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.zIndex = '9999';
    toggleButton.style.display = 'flex';
    toggleButton.style.alignItems = 'center';
    toggleButton.style.gap = '6px';
    toggleButton.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
    toggleButton.style.transition = 'all 0.2s';
    toggleButton.onmouseover = () => {
      toggleButton.style.backgroundColor = '#E5E7EB';
    };
    toggleButton.onmouseout = () => {
      toggleButton.style.backgroundColor = '#F3F4F6';
    };
    toggleButton.onclick = () => {
      logContainer.style.display = 'block';
      toggleButton.style.display = 'none';
    };
    
    document.body.appendChild(toggleButton);
    
    // Klavye kısayolu: L tuşu ile logları göster/gizle
    document.addEventListener('keydown', (e) => {
      if (e.key === 'l' && e.ctrlKey) {
        if (logContainer.style.display === 'none') {
          logContainer.style.display = 'block';
          toggleButton.style.display = 'none';
        } else {
          logContainer.style.display = 'none';
          toggleButton.style.display = 'flex';
        }
      }
    });
  }
  
  // Log kaydı için element oluştur
  const logElement = document.createElement('div');
  logElement.className = 'log-entry';
  logElement.style.marginBottom = '8px';
  logElement.style.borderBottom = '1px solid #F3F4F6';
  logElement.style.paddingBottom = '8px';
  
  // Log seviyesine göre renk ve stil belirle
  let backgroundColor = '#F9FAFB';
  let borderLeftColor = '#E5E7EB';
  let borderLeftWidth = '3px';
  
  if (logEntry.level === LOG_LEVELS.ERROR) {
    backgroundColor = '#FEF2F2';
    borderLeftColor = '#EF4444';
  } else if (logEntry.level === LOG_LEVELS.CRITICAL) {
    backgroundColor = '#EFF6FF';
    borderLeftColor = '#1D4ED8';
  } else if (logEntry.level === LOG_LEVELS.WARNING) {
    backgroundColor = '#FFFBEB';
    borderLeftColor = '#F59E0B';
  }
  
  logElement.style.backgroundColor = backgroundColor;
  logElement.style.padding = '8px';
  logElement.style.borderRadius = '4px';
  logElement.style.borderLeft = `${borderLeftWidth} solid ${borderLeftColor}`;
  
  // Zaman damgası
  const timestampElement = document.createElement('div');
  timestampElement.textContent = new Date(logEntry.timestamp).toLocaleTimeString();
  timestampElement.style.fontSize = '10px';
  timestampElement.style.color = '#6B7280';
  timestampElement.style.marginBottom = '4px';
  
  // Seviye ve modül
  const headerElement = document.createElement('div');
  headerElement.style.display = 'flex';
  headerElement.style.alignItems = 'center';
  headerElement.style.gap = '6px';
  headerElement.style.marginBottom = '4px';
  
  const levelBadge = document.createElement('span');
  levelBadge.textContent = logEntry.level;
  levelBadge.style.fontSize = '10px';
  levelBadge.style.padding = '2px 6px';
  levelBadge.style.borderRadius = '4px';
  levelBadge.style.fontWeight = 'bold';
  
  // Log seviyesine göre badge stili
  if (logEntry.level === LOG_LEVELS.ERROR) {
    levelBadge.style.backgroundColor = '#FEE2E2';
    levelBadge.style.color = '#B91C1C';
  } else if (logEntry.level === LOG_LEVELS.CRITICAL) {
    levelBadge.style.backgroundColor = '#DBEAFE';
    levelBadge.style.color = '#1E40AF';
  } else if (logEntry.level === LOG_LEVELS.WARNING) {
    levelBadge.style.backgroundColor = '#FEF3C7';
    levelBadge.style.color = '#92400E';
  } else if (logEntry.level === LOG_LEVELS.INFO) {
    levelBadge.style.backgroundColor = '#E0F2FE';
    levelBadge.style.color = '#0369A1';
  } else {
    levelBadge.style.backgroundColor = '#F3F4F6';
    levelBadge.style.color = '#4B5563';
  }
  
  const moduleText = document.createElement('span');
  moduleText.textContent = logEntry.module;
  moduleText.style.fontSize = '12px';
  moduleText.style.fontWeight = 'medium';
  moduleText.style.color = '#4B5563';
  
  headerElement.appendChild(levelBadge);
  headerElement.appendChild(moduleText);
  
  // Mesaj
  const messageElement = document.createElement('div');
  messageElement.textContent = logEntry.message;
  messageElement.style.fontSize = '12px';
  messageElement.style.color = '#111827';
  messageElement.style.marginBottom = logEntry.data ? '4px' : '0';
  messageElement.style.lineHeight = '1.5';
  
  // Veri (eğer varsa)
  let dataElement = null;
  if (logEntry.data) {
    dataElement = document.createElement('pre');
    dataElement.textContent = JSON.stringify(logEntry.data, null, 2);
    dataElement.style.fontSize = '11px';
    dataElement.style.backgroundColor = '#F3F4F6';
    dataElement.style.padding = '6px';
    dataElement.style.borderRadius = '4px';
    dataElement.style.overflow = 'auto';
    dataElement.style.maxHeight = '100px';
    dataElement.style.marginTop = '4px';
    dataElement.style.color = '#374151';
    dataElement.style.border = '1px solid #E5E7EB';
  }
  
  // Elementleri bir araya getir
  logElement.appendChild(timestampElement);
  logElement.appendChild(headerElement);
  logElement.appendChild(messageElement);
  if (dataElement) {
    logElement.appendChild(dataElement);
  }
  
  // Log container'a ekle
  logContainer.appendChild(logElement);
  
  // Otomatik kaydırma
  logContainer.scrollTop = logContainer.scrollHeight;
  
  // Log container'ı görünür yap
  logContainer.style.display = 'block';
  document.getElementById('app-log-toggle-button')?.style.display = 'none';
};

/**
 * Tüm log geçmişini döndürür
 * @returns {Array} - Log geçmişi
 */
export const getLogHistory = () => {
  return [...logHistory];
};

/**
 * Belirli bir seviyedeki logları filtreler
 * @param {string} level - Log seviyesi
 * @returns {Array} - Filtrelenmiş log geçmişi
 */
export const filterLogsByLevel = (level) => {
  return logHistory.filter(log => log.level === level);
};

/**
 * Belirli bir modüldeki logları filtreler
 * @param {string} module - Modül adı
 * @returns {Array} - Filtrelenmiş log geçmişi
 */
export const filterLogsByModule = (module) => {
  return logHistory.filter(log => log.module === module);
};

/**
 * Log geçmişini temizler
 */
export const clearLogHistory = () => {
  logHistory.length = 0;
};

/**
 * Log geçmişini dosyaya kaydeder
 */
export const saveLogsToFile = () => {
  const logText = logHistory.map(log => 
    `[${log.timestamp}] [${log.level}] [${log.module}] ${log.message} ${log.data ? JSON.stringify(log.data) : ''}`
  ).join('\n');
  
  const blob = new Blob([logText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `hata-loglari-${new Date().toISOString().replace(/:/g, '-')}.txt`;
  a.click();
  
  URL.revokeObjectURL(url);
};

// Kısayol fonksiyonlar
export const debug = (module, message, data) => log(LOG_LEVELS.DEBUG, module, message, data);
export const info = (module, message, data) => log(LOG_LEVELS.INFO, module, message, data);
export const warning = (module, message, data) => log(LOG_LEVELS.WARNING, module, message, data);
export const error = (module, message, data) => log(LOG_LEVELS.ERROR, module, message, data);
export const critical = (module, message, data) => log(LOG_LEVELS.CRITICAL, module, message, data);

// Global hata yakalama
window.addEventListener('error', (event) => {
  critical('WINDOW', 'Yakalanmamış hata', {
    message: event.message,
    source: event.filename,
    lineNo: event.lineno,
    colNo: event.colno,
    error: event.error?.stack || 'Stack bilgisi yok'
  });
});

// Promise hatalarını yakalama
window.addEventListener('unhandledrejection', (event) => {
  critical('PROMISE', 'İşlenmemiş Promise hatası', {
    reason: event.reason?.message || 'Bilinmeyen hata',
    stack: event.reason?.stack || 'Stack bilgisi yok'
  });
});

// Sayfa yüklendiğinde çalışacak kod
window.addEventListener('load', () => {
  info('SYSTEM', 'Sayfa tamamen yüklendi');
});

// Konsol metodlarını genişlet
const originalConsoleError = console.error;
console.error = function(...args) {
  // Orijinal error fonksiyonunu çağır
  originalConsoleError.apply(console, args);
  
  // Logger'a da kaydet
  const errorMessage = args.map(arg => 
    typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
  ).join(' ');
  
  error('CONSOLE', errorMessage);
};

// Logger'ı global olarak erişilebilir yap
window.AppLogger = {
  debug,
  info,
  warning,
  error,
  critical,
  getLogHistory,
  filterLogsByLevel,
  filterLogsByModule,
  clearLogHistory,
  saveLogsToFile
};

export default {
  debug,
  info,
  warning,
  error,
  critical,
  getLogHistory,
  filterLogsByLevel,
  filterLogsByModule,
  clearLogHistory,
  saveLogsToFile
};
