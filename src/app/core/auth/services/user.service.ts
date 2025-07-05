// import { Injectable } from '@angular/core';

// import { Observable, BehaviorSubject } from 'rxjs';

// import { JwtService } from './jwt.service';
// import { map, distinctUntilChanged, tap, shareReplay } from 'rxjs/operators';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { User } from '../models/auth.model';
// import { ResponsePayload, Token } from '../../models/network.model';
// import { environment } from './../../../../environments/environment';

// const API_URL = environment.apiUrl;
// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {
//   private currentUserSubject = new BehaviorSubject<Token | null>(null);
//   public currentUser = this.currentUserSubject
//     .asObservable()
//     .pipe(distinctUntilChanged());

//   public isAuthenticated = this.currentUser.pipe(map((user) => !!user));

//   constructor(
//     private readonly http: HttpClient,
//     private readonly jwtService: JwtService,
//     private readonly router: Router
//   ) {}

//   login(credentials: {
//     email: string;
//     password: string;
//   }): Observable<ResponsePayload<{ token: Token; user: User }>> {
//     return this.http
//       .post<ResponsePayload<{ token: Token; user: User }>>(
//         `${API_URL}/auth/login-with-password`,
//         { email: credentials.email, password: credentials.password }
//       )
//       .pipe(tap((response) => this.setAuth(response.document.token)));
//   }

//   register(credentials: {
//     firstname: string;
//     lastname: string;
//     email: string;
//     password: string;
//   }): Observable<ResponsePayload<{ token: Token; user: User }>> {
//     return this.http
//       .post<ResponsePayload<{ token: Token; user: User }>>(
//         `${API_URL}/auth/register`,
//         credentials
//       )
//       .pipe(
//         tap((res) => {
//           console.log('Register response:', res);
//           if (res.success && res.document.token) {
//             this.setAuth(res.document.token);
//           } else {
//             console.warn('Token yoq');
//           }
//         })
//       );
//   }


//   logout(): void {
//     this.purgeAuth();
//     void this.router.navigate(['/']);
//   }

//   getCurrentUser(): Observable<ResponsePayload<{ token: Token }>> {
//     return this.http
//       .post<ResponsePayload<{ token: Token }>>(
//         `${API_URL}/auth/refresh`,
//         { refreshToken: this.jwtService.getRefreshToken() },
//         {
//           headers: {
//             push_token: this.jwtService.getRefreshToken(),
//             lang: 'uz',
//             'mobile-uuid': '123' + Math.random().toString(36).substring(10),
//           },
//         }
//       )
//       .pipe(
//         tap({
//           next: (response: ResponsePayload<{ token: Token }>) => {
//             if (response.success) {
//               this.setAuth(response.document.token);
//             } else {
//               this.logout();
//             }
//           },
//           error: () => this.purgeAuth(),
//         }),
//         shareReplay(1)
//       );
//   }
// // user-profile
//   getUserProfile(): Observable<ResponsePayload<User>> {
//     return this.http.get<ResponsePayload<User>>(`${API_URL}/users/current`);
//   }

//   update(user: Partial<User>): Observable<{ user: User }> {
//     return this.http.put<{ user: User }>('/user', { user }).pipe(
//       tap(({ user }) => {
//         // this.currentUserSubject.next(user);
//       })
//     );
//   }

//   setAuth(token: Token): void {
//     this.jwtService.saveToken(token.access);
//     this.jwtService.saveRefreshToken(token.refresh);
//     this.router.navigate(['/dashboard']);
//     this.currentUserSubject.next(token);
//   }

//   purgeAuth(): void {
//     this.jwtService.destroyToken();
//     this.currentUserSubject.next(null);
//   }
// }
