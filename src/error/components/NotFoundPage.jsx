import React from 'react';
import { useTranslation } from 'react-i18next';
import ErrorPage from './ErrorPage';

export default function NotFoundPage() {
  const { t } = useTranslation();
  return <ErrorPage title={t('common/404-page-title')} message={t('common/404-page-content')} />;
}
