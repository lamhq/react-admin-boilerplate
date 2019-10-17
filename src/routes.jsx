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
  {
    path: '/admin/posts/add',
    component: lazy(() => import('./admin/post/add')),
  },
  {
    path: '/admin/posts/edit/:id',
    component: lazy(() => import('./admin/post/edit')),
  },
  {
    path: '/admin/posts',
    component: lazy(() => import('./admin/post/list')),
  },
];

export default routes;
