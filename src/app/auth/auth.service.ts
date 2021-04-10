import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly URL = `http://localhost:9978/login`;
  private readonly URL_USER = `http://localhost:9978/usuario`;

  private _auth$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  public auth$ = this._auth$.asObservable();

  constructor(private http: HttpClient) {}

  public doLogin(loginValues: {
    login: string;
    password: string;
  }): Observable<any> {
    const { login: documento, password: senha } = loginValues;

    return this.http.post(this.URL, loginValues, {
      headers: {
        'Content-Type': 'application/json',
        documento,
        senha,
      },
    });
  }

  set currentAuth(authReponse: any) {
    if (authReponse && authReponse.token) {
      this.getUserInfo().subscribe((res) => {
        console.log('res => ', res);
        this._auth$.next(authReponse);
      });
    }
  }

  private getUserInfo(): Observable<any> {
    return this.http.post(this.URL_USER, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
