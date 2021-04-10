import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public currentAuth$: Observable<any> = new Observable();

  constructor(
    private readonly _authService: AuthService
  ) { }

  ngOnInit() {
    this.currentAuth$ = this._authService.auth$;
  }

}
