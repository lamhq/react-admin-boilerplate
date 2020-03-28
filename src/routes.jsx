import { lazy } from 'react';

const routes = [
  {
    path: '/admin/dashboard',
    component: lazy(() => import('./admin/dashboard')),
  },
  {
    path: '/admin/login',
    component: lazy(() => import('./admin/account/login')),
  },
  {
    path: '/admin/forgot-password',
    component: lazy(() => import('./admin/account/forgot-pasword/components/ForgotPwdPage')),
  },
  {
    path: '/admin/reset-password',
    component: lazy(() => import('./admin/account/reset-password/components/ResetPwdPage')),
  },
  {
    path: '/admin/register',
    component: lazy(() => import('./admin/account/register/components/RegisterPage')),
  },
  {
    path: '/admin/profile',
    component: lazy(() => import('./admin/account/profile/components/ProfilePage')),
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
