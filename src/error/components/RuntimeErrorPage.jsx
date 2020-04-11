import React from 'react';
import ErrorPage from './ErrorPage';
import { useTranslation } from '../../common/hooks';

export default function RuntimeErrorPage() {
  const { t } = useTranslation();
  return <ErrorPage title={t('common/runtime-error')} message={t('common/runtime-error-page-content')} />;
}
