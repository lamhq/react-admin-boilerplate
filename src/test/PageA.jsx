import React from 'react';
import Layout from '../admin/layout/admin';

const breadcrumbs = [
  {
    text: 'Management',
    href: '#',
  },
  {
    text: 'Truncation test is here for a really long item',
    href: '#',
  },
  {
    text: 'Users',
  },
  {
    text: 'Create',
  },
];

export default function PageA() {
  return (
    <Layout title="Test" breadcrumbs={breadcrumbs}>
      <p>test page</p>
    </Layout>
  );
}
