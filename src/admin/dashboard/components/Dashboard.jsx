import React from 'react';
import Layout from '../../layout/admin';

const breadcrumbs = [
  {
    text: 'Dashboard',
  },
];

export default function Dashboard() {
  return (
    <Layout title="Dashboard" breadcrumbs={breadcrumbs}>
      Dashboard page
    </Layout>
  );
}
