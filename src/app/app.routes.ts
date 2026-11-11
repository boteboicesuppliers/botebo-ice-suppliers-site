import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { AboutUs } from './pages/about-us/about-us';
import { ContactUs } from './pages/contact-us/contact-us';
import { Faqs } from './pages/faqs/faqs';
// Import your Products component here when ready:
// import { Products } from './pages/products/products';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about-us', component: AboutUs },
  { path: 'contact-us', component: ContactUs },
  { path: 'faqs', component: Faqs },
  // { path: 'products', component: Products },
  { path: '**', redirectTo: '' }
];