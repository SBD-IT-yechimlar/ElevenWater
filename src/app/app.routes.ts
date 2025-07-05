import { inject } from '@angular/core';
import { Routes } from '@angular/router';
// import { UserService } from './core/auth/services/user.service';
import { map } from 'rxjs';

export const routes: Routes = [
 {
    path: '',
    loadChildren: () =>
      import('./layouts/layout-routes').then((m) => m.default),
    // canActivate: [
    //   () =>
    //     inject(UserService).isAuthenticated.pipe(
    //       map((isAuth) => {
    //         if (!isAuth) {
    //           if (typeof window !== 'undefined') {
    //             window.location.href = 'auth/login';
    //           }
    //           return false;
    //         } else {
    //           return true;
    //         }
    //       })
    //     ),
    // ],
  },
  {
    path: '404',
    loadComponent: async () =>
      (await import('./shared/components/not-found-404/not-found/not-found.component'))
        .NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
