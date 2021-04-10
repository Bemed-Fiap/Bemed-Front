import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  
  private readonly URL = `http://localhost:9978/login`;
  private _auth$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  public auth$ = this._auth$.asObservable();

  constructor(private http: HttpClient) {}

  public doLogin(loginValues: {
    login: string;
    password: string;
  }): Observable<any> {

    const { login: documento, password: senha } = loginValues;

    return this.http.post(this.URL, {}, {
      headers: {
        'Content-Type': 'application/json',
        documento,
        senha,
      },
    });
  }

  set currentAuth(authReponse: any) {
    this._auth$.next(authReponse);
  }

  get currentAuth() {
    return this._auth$.value;
  }
}
