import React from 'react';
import { useTranslation } from 'react-i18next';
import ErrorPage from './ErrorPage';

export default function RuntimeErrorPage() {
  const { t } = useTranslation();
  return <ErrorPage title={t('common:runtime-error')} message={t('common:runtime-error-page-content')} />;
}
