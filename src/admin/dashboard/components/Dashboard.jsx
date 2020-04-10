import React from 'react';
import Layout from '../../layout/admin';


export default function Dashboard() {
  const breadcrumbs = [
    {
      text: 'Dashboard',
    },
  ];

  return (
    <Layout title="Dashboard" breadcrumbs={breadcrumbs}>
      Dashboard page
    </Layout>
  );
}
