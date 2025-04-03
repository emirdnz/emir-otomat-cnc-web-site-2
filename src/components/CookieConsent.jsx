import React, { useState, useEffect } from 'react';
import cookieHelper from '../utils/cookieHelper';
import logger from '../utils/logger';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Sayfa yüklendiğinde cookie izin durumunu kontrol et
    const hasConsent = cookieHelper.hasCookieConsent();
    
    if (!hasConsent) {
      // İzin yoksa banner'ı göster
      setVisible(true);
      logger.info('CookieConsent', 'Cookie izin banner\'ı gösteriliyor');
    }
  }, []);

  const handleAccept = () => {
    cookieHelper.setCookieConsent(true);
    setVisible(false);
    logger.info('CookieConsent', 'Kullanıcı cookie kullanımını kabul etti');
    
    // Cookie erişimini test et
    cookieHelper.testCookieAccess();
  };

  const handleReject = () => {
    cookieHelper.setCookieConsent(false);
    setVisible(false);
    logger.info('CookieConsent', 'Kullanıcı cookie kullanımını reddetti');
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 mb-1">Çerez Kullanımı</h3>
          <p className="text-sm text-gray-600">
            Bu web sitesi, deneyiminizi geliştirmek için çerezleri kullanmaktadır. 
            Devam etmek için çerez kullanımını kabul etmeniz gerekmektedir.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleReject}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors text-sm"
          >
            Reddet
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm"
          >
            Kabul Et
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
