import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private _router: Router,
    private _alertController: AlertController
  ) {}

  public async logout(): Promise<any> {
    const alert = await this._alertController.create({
      cssClass: 'my-custom-class',
      header: 'Sair da aplicação',
      message: 'Tem certeza que deseja encerrar o aplicativo?',
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
            this._router.navigate(['']);
          }
        }
      ]
    });

    await alert.present();
  }

}
