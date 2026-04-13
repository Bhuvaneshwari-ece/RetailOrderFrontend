import { Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { CartComponent } from './components/cart/cart.component';


import { Login } from './core/components/auth/login/login';
import { Register } from './core/components/auth/register/register';
import { ProductList } from './components/product-list/product-list';
import { CartComponent } from './components/cart/cart.component';
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
  },
   { path: '', component: ProductList },
  { path: 'cart', component: CartComponent }
];


