import { Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard';
import { ProductsComponent } from './admin/products/products';
import { CategoriesComponent } from './admin/categories/categories';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'categories', component: CategoriesComponent },
];
