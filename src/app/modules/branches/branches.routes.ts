import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './components/branches/branches.component'
      ).then((m) => m.BranchesComponent),
  },
];

export default routes;
