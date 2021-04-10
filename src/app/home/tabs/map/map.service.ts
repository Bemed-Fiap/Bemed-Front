import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class MapService {
  private readonly URL = `http://localhost:9978/farmacia`;

  constructor(
    private http: HttpClient,
    private readonly _authService: AuthService
  ) {}

  public getDrugstores(): any {
    return this.http.get(this.URL, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
