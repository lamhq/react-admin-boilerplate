import { lazy } from 'react';

const routes = [
  {
    path: '/admin/login',
    component: lazy(() => import('./admin/login')),
  },
  {
    path: '/admin/dashboard',
    component: lazy(() => import('./admin/dashboard')),
  },
  {
    path: '/admin/forgot-password',
    component: lazy(() => import('./admin/forgot-password')),
  },
  {
    path: '/admin/reset-password',
    component: lazy(() => import('./admin/reset-password')),
  },
  {
    path: '/admin/profile',
    component: lazy(() => import('./admin/profile')),
  },
];

export default routes;
