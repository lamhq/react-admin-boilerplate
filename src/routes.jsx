import { lazy } from 'react';

const routes = [
  {
    path: '/dashboard',
    component: lazy(() => import('./admin/dashboard')),
  },
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
    path: '/profile',
    component: lazy(() => import('./admin/profile')),
  },
  {
    path: '/users/add',
    component: lazy(() => import('./user/add')),
  },
  // {
  //   path: '/users/edit/:id',
  //   component: lazy(() => import('./user/edit/components/EditUserPage')),
  // },
  // {
  //   path: '/users',
  //   component: lazy(() => import('./user/list/components/ListUserPage')),
  // },
];

export default routes;
