import React from 'react';
import Layout from '../../layout/admin';

const breadcrumbs = [
  {
    text: 'Dashboard',
  },
];

export default function DashboardPage() {
  return (
    <Layout title="Dashboard" breadcrumbs={breadcrumbs}>
      Dashboard page
    </Layout>
  );
}
