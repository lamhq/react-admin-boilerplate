import React from 'react';
import { useTranslation } from 'react-i18next';
import ErrorPage from './ErrorPage';

export default function UnauthorizedPage() {
  const { t } = useTranslation();
  return <ErrorPage title={t('common:403-page-title')} message={t('common:403-page-content')} />;
}
