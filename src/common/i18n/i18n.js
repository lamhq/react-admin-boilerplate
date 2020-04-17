import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translation from './translation';
import { logWarn } from '../log';

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: translation,
    defaultNS: 'common',
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    saveMissing: true,
    missingKeyHandler: (lng, ns, key) => {
      logWarn(`Missing translation: ${ns}:${key} (${lng})`);
    },
  });

export default i18n;
