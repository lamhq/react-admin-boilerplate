import { lazy } from 'react';

const routes = [
  {
    path: '/login',
    component: lazy(() => import('./admin/login')),
  },
  {
    path: '/forgot-password',
    component: lazy(() => import('./admin/forgot-pasword')),
  },
  {
    path: '/reset-password',
    component: lazy(() => import('./admin/reset-password')),
  },
  {
    path: '/register',
    component: lazy(() => import('./admin/register')),
  },
  {
    path: '/dashboard',
    component: lazy(() => import('./admin/dashboard')),
    permissions: ['ADMIN'],
  },
  {
    path: '/profile',
    component: lazy(() => import('./admin/profile')),
    permissions: ['ADMIN'],
  },
  {
    path: '/users/add',
    component: lazy(() => import('./user/add')),
    permissions: ['ADMIN'],
  },
  {
    path: '/users/edit/:id',
    component: lazy(() => import('./user/edit')),
    permissions: ['ADMIN'],
  },
  {
    path: '/users',
    component: lazy(() => import('./user/list')),
    permissions: ['ADMIN'],
  },
];

export default routes;
