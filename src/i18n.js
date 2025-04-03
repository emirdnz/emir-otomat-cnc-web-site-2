import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/translation.json';
import trTranslation from './locales/tr/translation.json';

const savedLanguage = localStorage.getItem('language') || 'tr'; // Eğer yoksa varsayılan dil olarak 'tr' kullan


i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      tr: {
        translation: trTranslation
      }
    },
    lng: savedLanguage,  // Varsayılan dili belirle
    fallbackLng: 'tr',  // Eğer çeviri bulunmazsa yedek dil
    interpolation: {
      escapeValue: false  // React zaten XSS koruması sağlar
    }
  });

export default i18n;
