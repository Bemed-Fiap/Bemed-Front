import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { Pages } from '../pages.enum';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private _router: Router,
    private _alertController: AlertController,
    private _authService: AuthService
  ) {}

  public async logout(): Promise<any> {
    const alert = await this._alertController.create({
      cssClass: 'my-custom-class',
      header: 'Encerrar sessão',
      message: 'Tem certeza que deseja encerrar sua sessão?',
      buttons: [
        {
          text: 'NÃO',
          role: 'no',
          cssClass: 'secondary',
          handler: _ => { }
        }, {
          text: 'SIM',
          role: 'yes',
          handler: () => {
            this._authService.currentAuth = null;
            this._router.navigate([Pages.auth]);
          }
        }
      ]
    });

    await alert.present();
  }

}
