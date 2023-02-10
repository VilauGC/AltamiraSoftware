import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RegisterPayload } from './register-payload';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { LoginPayload } from './login-payload';
import { UtilizatorTokens } from './utilizatorTokens.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  utilizator = new BehaviorSubject<UtilizatorTokens>(null as any);

  private url = 'http://localhost:8090/api/auth';

  constructor(private httpClient: HttpClient, private router: Router) {}

  //this will return an observable as a response
  register(registerPayload: RegisterPayload): Observable<any> {
    return this.httpClient
      .post<AuthResponseData>(`${this.url}/signup`, registerPayload)
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuth(resData.access_token, resData.refresh_token);
        })
      );
  }

  login(loginPayload: LoginPayload): Observable<any> {
    return this.httpClient
      .post<AuthResponseData>(`${this.url}/login`, loginPayload)
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuth(resData.access_token, resData.refresh_token);
        })
      );
  }

  loginAdmin(loginPayload: LoginPayload): Observable<any> {
    // TODO Adina
    return this.httpClient.post(this.url + 'loginAdmin', loginPayload);
  }

  logout() {
    this.utilizator.next(null as unknown as UtilizatorTokens);
    this.router.navigate(['/auth']);
    localStorage.removeItem('utilizatorData');
  }

  private handleError(errorResponse: HttpErrorResponse) {
    console.log(errorResponse);
    let errorMessage = 'Ceva nu a functionat corect!';

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(() => new Error(errorMessage));
    }

    switch (errorResponse.error.error) {
      case 'Unauthorized':
        errorMessage = 'Nu sunteti autorizat pentru aceasta actiune.';
    }
    return throwError(() => new Error(errorMessage));
  }

  private handleAuth(access_token: string, refresh_token: string) {
    const utilizatorTokens = new UtilizatorTokens(access_token, refresh_token);

    this.utilizator.next(utilizatorTokens);

    localStorage.setItem('utilizatorData', JSON.stringify(utilizatorTokens));
  }
}
