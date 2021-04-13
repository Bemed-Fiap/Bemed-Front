import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Pages } from '../pages.enum';
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-drugstore',
  templateUrl: './drugstore.page.html',
  styleUrls: ['./drugstore.page.scss'],
})
export class DrugstorePage implements OnInit {

  constructor(
    private _router: Router,
    private _alertController: AlertController,
    private _authService: AuthService
  ) { }

  ngOnInit() {
  }

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
