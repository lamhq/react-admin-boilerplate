import { useTranslation as useI18nextTranslation } from 'react-i18next';

/**
 * Wrapper for i18next useTranslation hook
 * Allow passing key parameter as array to translate function
 */
export default function useTranslation() {
  const { t, ...rest } = useI18nextTranslation();
  const newT = key => (Array.isArray(key) ? t(...key) : t(key));
  return { t: newT, ...rest };
}
