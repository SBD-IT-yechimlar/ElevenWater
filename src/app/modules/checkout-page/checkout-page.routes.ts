import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './components/checkout-page/checkout-page.component'
      ).then((m) => m.CheckoutPageComponent),
  },
];

export default routes;
