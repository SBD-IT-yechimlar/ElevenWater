// import {
//   HttpErrorResponse,
//   HttpEvent,
//   HttpInterceptorFn,
//   HttpResponse,
// } from '@angular/common/http';
// import { throwError } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';
// import { Payload } from '../models/network.model';
// import { inject } from '@angular/core';
// import { UserService } from '../auth/services/user.service';

// export const ErrorInterceptorService: HttpInterceptorFn = (req, next) => {
//   const userService = inject(UserService);
//   return next(req).pipe(
//     map((event: HttpEvent<any>) => {
//       if (event instanceof HttpResponse) {
//         const payload = event.body as Payload<any>; // Cast response body to Payload

//         if (payload && payload.success === false) {
//           console.log(payload);

//           // Show an alert when success is false
//           // userService.sendMessage({
//           //   severity: 'error',
//           //   summary: 'Error',
//           //   detail: payload.error?.message || 'An error occurred',
//           // });
//         } else if (payload && payload.success && payload.notify) {
//           // Show a success message when success is true
//           // userService.sendMessage({
//           //   severity: 'success',
//           //   summary: 'Success',
//           //   detail: payload.message || 'Success',
//           // });
//         }
//       }
//       return event;
//     }),
//     catchError((error: HttpErrorResponse) => {
//       // Handle HTTP error responses
//       // console.error('HTTP error occurred:', error)
//       // Optionally, you can handle different types of errors here
//       return throwError(() => error.error);
//     })
//   );
// };
