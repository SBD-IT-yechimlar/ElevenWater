import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './components/product-detail/product-detail.component'
      ).then((m) => m.ProductDetailComponent),
  },
];

export default routes;
