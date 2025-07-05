// import {
//   HttpErrorResponse,
//   HttpInterceptorFn,
//   HttpRequest,
// } from '@angular/common/http';
// import { inject } from '@angular/core';
// import {
//   BehaviorSubject,
//   catchError,
//   filter,
//   switchMap,
//   take,
//   throwError,
// } from 'rxjs';
// import { JwtService } from '../services/jwt.service';
// import { ResponsePayload, Token } from '../../models/network.model';

// export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
//   let isRefreshing = false;
//   let refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
//     null
//   );
//   const token = inject(JwtService).getToken();
//   const jwtService = inject(JwtService);

//   const uid = Math.random().toString(36).substring(10);
//   // when refreshing token, we should not add token to request
//   if (req.url.includes('/v1/auth/refresh-token')) {
//     return next(req);
//   }
//   const request = req.clone({
//     setHeaders: {
//       lang: 'ru',
//       'x-client-token': 'YWRtaW46c2VjcmV0',
//       'mobile-uuid': 'oiuwqoiuw' + uid,
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     },
//   });
//   return next(request).pipe(
//     catchError((error: HttpErrorResponse) => {
//       if (error?.status === 401) {
//         if (!isRefreshing) {
//           isRefreshing = true;
//           refreshTokenSubject.next(null);

//           return jwtService.refreshToken().pipe(
//             switchMap((response: ResponsePayload<Token>) => {
//               isRefreshing = false;
//               refreshTokenSubject.next(response.document.access);
//               return next(addToken(request, response.document.access, uid));
//             }),
//             catchError((err) => {
//               isRefreshing = false;
//               jwtService.logOut();
//               return throwError(err);
//             })
//           );
//         } else {
//           return refreshTokenSubject.pipe(
//             filter((token) => token != null),
//             take(1),
//             switchMap((jwt) => {
//               return next(addToken(request, jwt, uid));
//             })
//           );
//         }
//       }
//       throw error;
//     })
//   );
// };

// function addToken(request: HttpRequest<any>, token: string, uid: string) {
//   return request.clone({
//     setHeaders: {
//       lang: 'ru',
//       'mobile-uuid': 'oiuwqoiuw' + uid,
//       Authorization: `Bearer ${token}`,
//     },
//   });
// }
