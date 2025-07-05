import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './components/products/products.component'
      ).then((m) => m.ProductsComponent),
  },
];

export default routes;
