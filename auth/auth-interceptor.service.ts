import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
  HttpHeaders,
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Intercepted request!');
    return this.authService.utilizator.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        // daca exista token in localStorage

        const newHeaders = req.headers.append(
          'Authorization',
          'Bearer ' + user.access_token
        );

        const modifiedReq = req.clone({ headers: newHeaders });
        console.log(req.headers);
        console.log(modifiedReq.headers);
        return next.handle(modifiedReq);
      })
    );
  }
}
