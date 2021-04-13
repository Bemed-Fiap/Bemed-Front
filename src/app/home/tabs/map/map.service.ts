import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MapService {
  private readonly URL = `http://192.168.0.176:9978/farmacias`;

  constructor(
    private http: HttpClient
  ) { }

  public getDrugstores(): any {
    return this.http.get(this.URL, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

}
