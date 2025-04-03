import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Spinner } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "@material-tailwind/react";
import "./App.css";
import logger from './utils/logger.js';
import cookieHelper from './utils/cookieHelper.js';

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import CookieConsent from "./components/CookieConsent";

// Pages
import Homepage from "./pages/homepage/Homepage";
import About from "./pages/about/About";
import OurWorks from "./pages/ourworks/OurWorks";
import Career from "./pages/Career";
import Certificates from "./pages/Certificates";
import ContactUs from "./pages/ContactUs";
import Machines from "./pages/Machines";
import UploadModel from "./pages/UploadModel";
import TestDebug from "./pages/TestDebug";
// import Quality from "./pages/Quality";

function App() {
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    logger.info('App', 'Sayfa değişikliği', { path: location.pathname });
  }, [location]);

  useEffect(() => {
    // Sayfa yüklendiğinde konsola bilgi yazdır
    console.log("%c App bileşeni yüklendi", "background: #222; color: #bada55;");
    
    // Cookie erişimini test et
    const cookieAccessible = cookieHelper.testCookieAccess();
    if (!cookieAccessible) {
      logger.warning('App', 'Cookie erişimi mevcut değil, bazı özellikler çalışmayabilir');
    }
    
    // Loading durumunu 2 saniye sonra kapat
    setTimeout(() => {
      setLoading(false);
      console.log("%c Loading durumu kapatıldı", "background: #222; color: #bada55;");
    }, 2000);
  }, []);

  useEffect(() => {
    // Sayfa yükleme performansını ölç
    const measurePageLoad = () => {
      if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        logger.info('App', 'Sayfa yükleme performansı', { 
          pageLoadTime: `${pageLoadTime}ms`,
          domContentLoaded: `${perfData.domContentLoadedEventEnd - perfData.navigationStart}ms`,
          firstPaint: `${perfData.responseEnd - perfData.navigationStart}ms`
        });
      }
    };

    // Sayfa tamamen yüklendiğinde ölçüm yap
    window.addEventListener('load', measurePageLoad);
    
    return () => {
      window.removeEventListener('load', measurePageLoad);
    };
  }, []);

  useEffect(() => {
    const handleOnlineStatus = () => {
      const isOnline = navigator.onLine;
      logger.info('App', `Ağ durumu: ${isOnline ? 'Çevrimiçi' : 'Çevrimdışı'}`);
      
      if (!isOnline) {
        // Kullanıcıya çevrimdışı olduğunu bildir
        // Bu kısım gerçek uygulamada bir bildirim gösterebilir
      }
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  // Cookie hatası yakalama
  useEffect(() => {
    // SecurityError: Failed to read the 'cookie' property from 'Document' hatasını yakala
    const originalDocumentDescriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie');
    
    if (originalDocumentDescriptor && originalDocumentDescriptor.get) {
      // Cookie getter'ını güvenli bir şekilde override et
      Object.defineProperty(Document.prototype, 'cookie', {
        get: function() {
          try {
            return originalDocumentDescriptor.get.call(this);
          } catch (error) {
            logger.error('App', 'Cookie erişim hatası yakalandı', { 
              error: error.toString() 
            });
            return ''; // Boş string döndür
          }
        },
        set: function(val) {
          try {
            return originalDocumentDescriptor.set.call(this, val);
          } catch (error) {
            logger.error('App', 'Cookie yazma hatası yakalandı', { 
              error: error.toString() 
            });
            return false;
          }
        },
        configurable: true
      });
      
      logger.info('App', 'Cookie erişimi güvenli hale getirildi');
    }
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div>
          {loading ? (
            <div className="loading-spinner">
              <Spinner className="spinner" />
            </div>
          ) : (
            <>
              <ScrollToTop />
              <Header />
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/hakkimizda" element={<About />} />
                <Route path="/calismalarimiz/urunler" element={<OurWorks />} />
                <Route path="/calismalarimiz/makine-parkuru" element={<Machines />} />
                <Route path="/sertifikalar" element={<Certificates />} />
                <Route path="/kariyer" element={<Career />} />
                <Route path="/staj" element={<Career />} />
                <Route path="/iletisim" element={<ContactUs />} />
                <Route path="/upload-model" element={
                  <ErrorBoundary>
                    <UploadModel />
                  </ErrorBoundary>
                } />
                <Route path="/debug-test" element={
                  <ErrorBoundary>
                    <TestDebug />
                  </ErrorBoundary>
                } />
                {/* 404 sayfası için catch-all route */}
                <Route path="*" element={
                  <div className="py-20 text-center">
                    <h1 className="text-4xl font-bold text-red-500 mb-4">404 - Sayfa Bulunamadı</h1>
                    <p className="text-lg text-gray-600">Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
                  </div>
                } />
              </Routes>
              <Footer />
              <CookieConsent />
            </>
          )}
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
