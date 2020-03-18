import { lazy } from 'react';

const routes = [
  {
    path: '/admin/login',
    component: lazy(() => import('./admin/account/login/components/LoginPage')),
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
];

export default routes;
