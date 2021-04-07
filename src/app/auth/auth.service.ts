import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly URL = `http://localhost:9978/login`;

  constructor(private http: HttpClient) {}

  public doLogin(loginValues: {
    login: string;
    password: string;
  }): Observable<any> {

    const { login, password } = loginValues;

    return this.http.post(this.URL, loginValues, {
      headers: {
        'Content-Type': 'application/json',
        'documento': login,
        'senha': password,
      },
    });
  }
}
