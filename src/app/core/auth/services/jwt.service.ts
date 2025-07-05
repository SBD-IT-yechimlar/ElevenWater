// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
// import { ResponsePayload, Token } from '../../models/network.model';
// @Injectable({ providedIn: 'root' })
// export class JwtService {
//   // private tokenSubject: BehaviorSubject<string>;
//   constructor(private http: HttpClient, private router: Router) {}

//   getToken(): string {
//     return window.localStorage['jwtToken'];
//   }
//   getRefreshToken(): string {
//     return window.localStorage['refreshToken'];
//   }
//   saveToken(token: string): void {
//     window.localStorage['jwtToken'] = token;
//   }
//   saveRefreshToken(refreshToken: string): void {
//     window.localStorage['refreshToken'] = refreshToken;
//   }
//   destroyToken(): void {
//     window.localStorage.removeItem('jwtToken');
//     window.localStorage.removeItem('refreshToken');
//   }
//   refreshToken(): Observable<ResponsePayload<Token>> {
//     return this.http
//       .post<ResponsePayload<Token>>(
//         '/v1/auth/refresh-token',
//         { refresh_token: this.getRefreshToken() },
//         {
//           headers: {
//             push_token: this.getRefreshToken(),
//             lang: 'uz',
//             'mobile-uuid': '123' + Math.random().toString(36).substring(10),
//           },
//         }
//       )
//       .pipe(
//         tap({
//           next: (response: ResponsePayload<Token>) => {
//             if (response.success) {
//               this.saveToken(response.document.access);
//               this.saveRefreshToken(response.document.refresh);
//               // this.tokenSubject.next(response.data.token);
//             } else {
//               this.logOut();
//             }
//           },
//           error: () => this.logOut(),
//         }),
//         shareReplay(1)
//       );
//   }
//   logOut(): void {
//     this.destroyToken();
//     this.router.navigate(['/auth/login']);
//   }
// }
