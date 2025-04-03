import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './i18n';
import './utils/debugHelper.js'; 
import { BrowserRouter } from 'react-router-dom'
import logger from './utils/logger.js'

// Uygulama başlangıcında log kaydı
logger.info('MAIN', 'Uygulama başlatılıyor');

// Global hata yakalayıcı
window.onerror = (message, source, lineno, colno, error) => {
  logger.critical('GLOBAL', 'Yakalanmamış hata', {
    message,
    source,
    lineno,
    colno,
    stack: error?.stack || 'Stack bilgisi yok'
  });
  return false; // Varsayılan hata işleyicisinin de çalışmasına izin ver
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

// Uygulama yüklendikten sonra log kaydı
logger.info('MAIN', 'Uygulama başarıyla render edildi');
