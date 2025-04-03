/**
 * Cookie işlemleri için yardımcı fonksiyonlar
 * Bu modül, tarayıcı çerezlerini güvenli bir şekilde yönetmek için kullanılır
 */

import logger from './logger.js';

/**
 * Cookie oluşturur veya günceller
 * @param {string} name - Cookie adı
 * @param {string} value - Cookie değeri
 * @param {number} days - Cookie'nin geçerlilik süresi (gün)
 */
export const setCookie = (name, value, days = 30) => {
  try {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
    logger.debug('Cookie', `Cookie oluşturuldu: ${name}`);
  } catch (error) {
    logger.error('Cookie', 'Cookie oluşturma hatası', { 
      name, 
      error: error.toString() 
    });
  }
};

/**
 * Cookie değerini okur
 * @param {string} name - Cookie adı
 * @returns {string|null} - Cookie değeri veya null
 */
export const getCookie = (name) => {
  try {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  } catch (error) {
    logger.error('Cookie', 'Cookie okuma hatası', { 
      name, 
      error: error.toString() 
    });
    return null;
  }
};

/**
 * Cookie'yi siler
 * @param {string} name - Cookie adı
 */
export const deleteCookie = (name) => {
  try {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`;
    logger.debug('Cookie', `Cookie silindi: ${name}`);
  } catch (error) {
    logger.error('Cookie', 'Cookie silme hatası', { 
      name, 
      error: error.toString() 
    });
  }
};

/**
 * Tüm cookie'leri kontrol eder ve erişilebilir olup olmadığını test eder
 * @returns {boolean} - Cookie'lere erişilebilirse true, değilse false
 */
export const testCookieAccess = () => {
  try {
    // Test cookie'si oluştur
    const testCookieName = 'testCookieAccess';
    const testValue = 'test-' + Date.now();
    
    // Cookie'yi ayarlamayı dene
    setCookie(testCookieName, testValue, 1);
    
    // Cookie'yi okumayı dene
    const readValue = getCookie(testCookieName);
    
    // Test cookie'sini sil
    deleteCookie(testCookieName);
    
    // Sonucu kontrol et
    const success = readValue === testValue;
    
    if (success) {
      logger.info('Cookie', 'Cookie erişim testi başarılı');
    } else {
      logger.warning('Cookie', 'Cookie erişim testi başarısız', {
        expected: testValue,
        actual: readValue
      });
    }
    
    return success;
  } catch (error) {
    logger.error('Cookie', 'Cookie erişim testi hatası', { 
      error: error.toString(),
      stack: error.stack
    });
    return false;
  }
};

/**
 * Cookie'lere erişim izni kontrolü
 * @returns {boolean} - Cookie'lere erişim izni varsa true, yoksa false
 */
export const hasCookieConsent = () => {
  return getCookie('cookieConsent') === 'true';
};

/**
 * Cookie izin durumunu ayarlar
 * @param {boolean} consent - İzin durumu
 */
export const setCookieConsent = (consent) => {
  setCookie('cookieConsent', consent ? 'true' : 'false', 365);
};

/**
 * Tüm cookie'leri listeler
 * @returns {Array} - Cookie listesi
 */
export const getAllCookies = () => {
  try {
    const cookies = [];
    const cookieList = document.cookie.split(';');
    
    for (let i = 0; i < cookieList.length; i++) {
      let cookie = cookieList[i].trim();
      if (cookie) {
        const [name, value] = cookie.split('=');
        cookies.push({ name, value });
      }
    }
    
    return cookies;
  } catch (error) {
    logger.error('Cookie', 'Cookie listesi alma hatası', { 
      error: error.toString() 
    });
    return [];
  }
};

// Cookie yardımcısını global olarak erişilebilir yap
window.CookieHelper = {
  setCookie,
  getCookie,
  deleteCookie,
  testCookieAccess,
  hasCookieConsent,
  setCookieConsent,
  getAllCookies
};

export default {
  setCookie,
  getCookie,
  deleteCookie,
  testCookieAccess,
  hasCookieConsent,
  setCookieConsent,
  getAllCookies
};
