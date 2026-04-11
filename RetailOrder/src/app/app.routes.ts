import { Routes } from '@angular/router';
import { Login } from './core/components/auth/login/login';
import { Register } from './core/components/auth/register/register';

export const routes: Routes = [
 {

  path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'auth/register',
    component: Register
  },
    {
    path: '**',
    redirectTo: 'login'
  }
];
