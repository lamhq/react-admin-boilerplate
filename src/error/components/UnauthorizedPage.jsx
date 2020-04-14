import React from 'react';
import ErrorPage from './ErrorPage';
import { useTranslation } from 'react-i18next';

export default function UnauthorizedPage() {
  const { t } = useTranslation();
  return <ErrorPage title={t('common:403-page-title')} message={t('common:403-page-content')} />;
}
