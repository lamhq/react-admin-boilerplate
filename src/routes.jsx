import { lazy } from 'react';

const routes = [
  {
    path: '/admin/dashboard',
    component: lazy(() => import('./admin/dashboard')),
  },
  {
    path: '/admin/login',
    component: lazy(() => import('./admin/login')),
  },
  {
    path: '/admin/forgot-password',
    component: lazy(() => import('./admin/forgot-pasword')),
  },
  {
    path: '/admin/reset-password',
    component: lazy(() => import('./admin/reset-password')),
  },
  {
    path: '/admin/register',
    component: lazy(() => import('./admin/register')),
  },
  {
    path: '/admin/profile',
    component: lazy(() => import('./admin/profile/components/ProfilePage')),
  },
  {
    path: '/admin/users/add',
    component: lazy(() => import('./admin/user/add/components/AddUserPage')),
  },
  {
    path: '/admin/users/edit/:id',
    component: lazy(() => import('./admin/user/edit/components/EditUserPage')),
  },
  {
    path: '/admin/users',
    component: lazy(() => import('./admin/user/list/components/ListUserPage')),
  },
];

export default routes;
