import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './components/product-basket/product-basket.component'
      ).then((m) => m.ProductBasketComponent ),
  },
];

export default routes;
