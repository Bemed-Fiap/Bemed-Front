import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  getControlErrorsList,
  isFieldInvalid,
} from '../shared/form-field-message/utils/form-field-message.utils';
import { Pages } from '../pages.enum';
import { AuthService } from './auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  
  public loginForm: FormGroup;
  public type = 'password';
  public iconEye = 'eye';

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _alertController: AlertController
  ) { }

  // 10101010999999 -> cnpj farmácia
  // 10101010133 -> cpf usuário

  ngOnInit() {
    this.loginForm = this._fb.group({
      login: this._fb.control(
        '10101010999999',
        Validators.compose([Validators.required, Validators.minLength(11)])
      ),
      password: this._fb.control(
        'abc123',
        Validators.compose([Validators.required])
      ),
    });
  }

  public doLogin(): void {
    this._authService.doLogin(this.loginForm.value)
    .subscribe(
      (res) => {
        let role: string = res.role;
        this._authService.currentAuth = res;

        if (role) {
          if (role.toUpperCase() === 'USUARIO') {
            this._router.navigate([Pages.home]);
          } else {
            this._router.navigate([Pages.drugstore]);
          }
        }
      }, (error: HttpErrorResponse) => {
        let message = null;

        if (error.status === 401 || error.status === 403)
          message = `Usuário ou senha inválido(s).`;

        this._showErrorAlert(message);
      }
    );
  }

  public isFieldInvalid(formControlName: string): boolean {
    const control = this.loginForm.get(formControlName);
    return isFieldInvalid(control);
  }

  public getControlErrorsList(formControlName: string): string[] {
    const control = this.loginForm.get(formControlName);
    return getControlErrorsList(control);
  }

  public createAccount(): void {
    this._router.navigate([Pages.signUp]);
  }

  public showOrHidePass(): void {
    this.type = this.type === 'password' ? 'text' : 'password';
    this.iconEye = this.iconEye === 'eye' ? 'eye-off' : 'eye';
  }

  public async _showErrorAlert(message?: string) {
    const alert = await this._alertController.create({
      header: 'Houve um erro',
      message: message
        ? message
        : `Um erro inesperado aconteceu, tente novamente mais tarde.`,
      buttons: ['Tudo bem'],
    });

    await alert.present();
  }
}
