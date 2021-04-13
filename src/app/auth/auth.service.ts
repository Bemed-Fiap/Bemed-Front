import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly URL = `http://localhost:9978/login`;
  private readonly URL_USER = `http://localhost:9978/usuario`;
  private readonly URL_FARMACIA = `http://localhost:9978/farmacia`;

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

  set currentAuth(authResponse: any) {
    this._auth$.next({...authResponse });
    if (authResponse && authResponse.token) {
      const role = authResponse.role.toUpperCase() as string;
      this._getUserInfo(authResponse.token, role).subscribe((res) => {
        this._auth$.next({...res, ...authResponse });
      });
    }
  }

  get currentAuth() {
    return this._auth$.value;
  }

  private _getUserInfo(onetoken: string, role = 'USUARIO'): Observable<any> {

    let finalURL = (role === 'USUARIO') ? this.URL_USER : this.URL_FARMACIA;

    return this.http.get(finalURL, {
      headers: {
        'Content-Type': 'application/json',
        onetoken
      },
    });
  }  
}
