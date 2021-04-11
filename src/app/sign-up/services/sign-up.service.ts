import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SignUpService {

  public finalURL: string;
  private readonly URL_SIGN_UP = `http://localhost:9978/signup`;
  private readonly URL_FARMACIA = `http://localhost:9978/farmacia`;

  constructor(private http: HttpClient) {}

  public cadaster(signUpFormValue: any): Observable<any> {

    if (signUpFormValue && signUpFormValue['cnpj']) {
        this.finalURL = this.URL_FARMACIA;
        if (signUpFormValue['Endereco']) {
            signUpFormValue['Endereco']['coords'] = { lng: 0, lat: 0 };
        }
    } else {
        this.finalURL = this.URL_SIGN_UP;
    }

    return this.http.post(this.finalURL, signUpFormValue, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
