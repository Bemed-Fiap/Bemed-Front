import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  constructor(
    private _authService: AuthService
  ) { }

  public currentAuth$: Observable<any> = null;

  public becoins: string;

  ngOnInit() {
    this._authService.auth$.subscribe(res => {
      if (res && res['Carteira']) {
        this.becoins = res['Carteira'].pontos || 0.00;
      }
    });
  }

}
