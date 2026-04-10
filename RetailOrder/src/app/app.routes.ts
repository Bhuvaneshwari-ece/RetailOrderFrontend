import { Routes } from '@angular/router';
import { Checkout } from '../components/customer/checkout/checkout';
import { OrderHistory } from '../components/customer/order-history/order-history';

export const routes: Routes = [
    { path: 'checkout', component: Checkout },
  { path: 'orders', component: OrderHistory },
  { path: '', redirectTo: 'checkout', pathMatch: 'full' }
];
