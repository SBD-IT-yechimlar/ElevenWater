import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/service-detail/service-detail.component').then(
        (m) => m.ServiceDetailComponent
      ),
  },
];

export default routes;
