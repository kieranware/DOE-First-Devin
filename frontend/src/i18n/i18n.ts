import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';
import gaTranslation from './locales/ga.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      ga: {
        translation: gaTranslation
      }
    },
    lng: localStorage.getItem('language') || import.meta.env.VITE_DEFAULT_LANGUAGE || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;
