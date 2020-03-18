import { lazy } from 'react';

const routes = [
  {
    path: '/admin/login',
    component: lazy(() => import('./admin/auth/login/components/LoginPage')),
  },
  {
    path: '/admin/forgot-password',
    component: lazy(() => import('./admin/auth/forgot-pasword/components/ForgotPwdPage')),
  },
  {
    path: '/admin/reset-password',
    component: lazy(() => import('./admin/auth/reset-password/components/ResetPwdPage')),
  },
];

export default routes;
