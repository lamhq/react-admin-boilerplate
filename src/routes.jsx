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
];

export default routes;
