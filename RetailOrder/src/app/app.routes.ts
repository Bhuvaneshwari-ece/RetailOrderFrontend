import { Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
  { path: '', component: ProductList },
  { path: 'cart', component: CartComponent }
];