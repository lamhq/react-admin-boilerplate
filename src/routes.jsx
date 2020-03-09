import { lazy } from 'react';

const routes = [
  {
    path: '/admin/page-a',
    component: lazy(() => import('./test/PageA')),
  },
  {
    path: '/admin/page-b',
    component: lazy(() => import('./test/PageB')),
  },
];

export default routes;
