import React from 'react';
import Layout from '../admin/layout/admin';
import styles from './a.module.scss';

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
    <Layout title="Page A" breadcrumbs={breadcrumbs}>
      <p className={styles.text}>test page</p>
    </Layout>
  );
}
