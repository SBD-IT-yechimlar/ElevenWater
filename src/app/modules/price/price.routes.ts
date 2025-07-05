import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/price/price.component').then(
        (m) => m.PriceComponent
      ),
  },
];

export default routes;
