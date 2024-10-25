import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CustomerFormComponent } from './customer/customer-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'customer', component: CustomerFormComponent },
  // Add other routes here as needed
];
