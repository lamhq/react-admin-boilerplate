import React from 'react';
import Layout from '../../layout/admin';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
  const { t } = useTranslation();
  const breadcrumbs = [
    {
      text: t('dashboard:title'),
    },
  ];

  return (
    <Layout title={t('dashboard:title')} breadcrumbs={breadcrumbs}>
      TBC
    </Layout>
  );
}
