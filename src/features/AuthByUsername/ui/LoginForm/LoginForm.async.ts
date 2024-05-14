import { FC, lazy } from 'react';
import { LoginFormProps } from './LoginForm';

// export const AboutPageAsync = lazy(() => import('./AboutPage'));

export const LoginFormAsync = lazy<FC<LoginFormProps>>(
  () => import('./LoginForm'),
);
