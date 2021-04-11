import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DrugstoreService {
  
  private readonly URL = `http://localhost:9978/devolucao`;

  private readonly URL_PRODUCTS = `http://localhost:9978/produtos`;

  constructor(private http: HttpClient) {}

  public getProductList(): Observable<any> {
    return this.http.get(this.URL_PRODUCTS, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  }

  public postGiveBack(disposalRefisterForm: any): Observable<any> {
    return this.http.post(this.URL, disposalRefisterForm, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
