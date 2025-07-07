import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HttpClient,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
// import { JwtService } from './core/auth/services/jwt.service';
// import { UserService } from './core/auth/services/user.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideClientHydration } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { tokenInterceptor } from './core/auth/interceptors/token.interceptor';
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { MessageService } from 'primeng/api';

// export function initAuth(jwtService: JwtService, userService: UserService) {
//   return () => (jwtService.getToken() ? userService.getCurrentUser() : EMPTY);
// }

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    // provideAnimationsAsync(),
    // provideAnimations(),
    provideHttpClient(
      withInterceptors([
        // apiInterceptor,
        // tokenInterceptor,
        // ErrorInterceptorService,
      ])
    ),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initAuth,
    //   deps: [JwtService, UserService],
    //   multi: true,
    // },
  ],
};
