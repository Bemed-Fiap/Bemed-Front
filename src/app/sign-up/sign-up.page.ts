import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Pages } from '../pages.enum';
import {
  getControlErrorsList,
  isFieldInvalid,
} from '../shared/form-field-message/utils/form-field-message.utils';
import { SignUpService } from './services/sign-up.service';
import { ViacepService } from './services/viacep.service';

@Component({
  selector: 'app-auth',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  public signInForm: FormGroup;
  public addressFormGroup: FormGroup;
  public isDrugstore = false;

  private _drugeStoreExtraFields = ['nomeFantasia', 'razao', 'cnpj'];
  private _clientExtraFields = ['nome', 'sobrenome', 'cpf'];

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _viacepService: ViacepService,
    private readonly _signUpService: SignUpService,
    private readonly _alertController: AlertController,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this._buildForm();
    this._listenCepChange();
  }

  public isFieldInvalid(formControlName: string): boolean {
    const control =
      this.signInForm.get(formControlName) ||
      this.addressFormGroup.get(formControlName);
    return isFieldInvalid(control);
  }

  public getControlErrorsList(formControlName: string): string[] {
    const control =
      this.signInForm.get(formControlName) ||
      this.addressFormGroup.get(formControlName);
    return getControlErrorsList(control);
  }

  public onChangeIsDrugstore(isDrugstore: boolean): void {
    if (isDrugstore) {
      for (const field of this._clientExtraFields)
        this._setRequiredValidatorOrClearValidators(field, 'clear');

      for (const field of this._drugeStoreExtraFields)
        this._setRequiredValidatorOrClearValidators(field, 'set');
    } else {
      for (const field of this._clientExtraFields)
        this._setRequiredValidatorOrClearValidators(field, 'set');

      for (const field of this._drugeStoreExtraFields)
        this._setRequiredValidatorOrClearValidators(field, 'clear');
    }
  }

  private _buildForm(): void {
    this.addressFormGroup = this._fb.group({
      cep: this._fb.control(
        '',
        Validators.compose([Validators.required, Validators.minLength(9)])
      ),
      rua: this._fb.control('', Validators.required),
      numero: this._fb.control('', Validators.required),
      complemento: this._fb.control(''),
      info: this._fb.control(''),
      bairro: this._fb.control('', Validators.required),
      cidade: this._fb.control('', Validators.required),
      estado: this._fb.control('', Validators.required),
    });

    this.signInForm = this._fb.group({
      nome: this._fb.control('', Validators.required),
      nomeFantasia: this._fb.control(''),
      razao: this._fb.control(''),
      sobrenome: this._fb.control('', Validators.required),
      email: this._fb.control(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      phone: this._fb.control(
        '',
        Validators.compose([Validators.required, Validators.minLength(14)])
      ),
      cpf: this._fb.control(
        '',
        Validators.compose([Validators.required, Validators.minLength(14) ])
      ),
      cnpj: this._fb.control('', Validators.minLength(14)),
      Endereco: this.addressFormGroup,
      senha: this._fb.control('', Validators.required),
      senhaConfirma: this._fb.control('', Validators.required)
    });
  }

  private _listenCepChange(): void {
    const cepControl = this.addressFormGroup.get('cep');

    cepControl.valueChanges.subscribe((value) => {
      if (cepControl.valid) {
        this._viacepService.getAddress(value).then((addressData) => {
          const bindData = {
            rua: addressData.logradouro,
            bairro: addressData.bairro,
            cidade: addressData.localidade,
            estado: addressData.uf,
          };

          this.addressFormGroup.patchValue(bindData);
        });
      }
    });
  }

  private _setRequiredValidatorOrClearValidators(
    field: string,
    type: 'clear' | 'set'
  ): void {
    if (type === 'set') {
      switch (field) {
        case 'cnpj':
          this.signInForm.controls[field].setValidators([
            Validators.required,
            Validators.minLength(18),
          ]);
          break;
        case 'cpf':
          this.signInForm.controls[field].setValidators([
            Validators.required,
            Validators.minLength(14),
          ]);
          break;
        default:
          this.signInForm.controls[field].setValidators([Validators.required]);
          break;
      }

      this.signInForm.controls[field].updateValueAndValidity();
    } else {
      this.signInForm.controls[field].clearValidators();
      this.signInForm.controls[field].updateValueAndValidity();
    }
  }

  public async _showAlert(header?: string, message?: string) {
    const alert = await this._alertController.create({
      header: header ? header : 'Houve um erro',
      message: message
        ? message
        : `Um erro inesperado aconteceu, tente novamente mais tarde.`,
      buttons: ['Tudo bem'],
    });

    await alert.present();
  }

  public save(): void {
    const deleteDrugstoreFields = ['razao', 'nomeFantasia'];
    const deletePersonFiels = ['nome', 'sobrenome'];
    let fieldToDelete = this.isDrugstore
      ? deletePersonFiels
      : deleteDrugstoreFields;

      if (this.isDrugstore) {
        this.signInForm.value['cnpj'] = this.signInForm.value['cnpj'].replace(/[^\d]/g, '');
      } else {
        this.signInForm.value['documento'] = this.signInForm.value['cpf'].replace(/[^\d]/g, '');
        delete this.signInForm.value['cnpj'];
      }

      delete this.signInForm.value['cpf'];

    for (const key of fieldToDelete)
      Reflect.deleteProperty(this.signInForm.value, key);

    this._signUpService.cadaster(this.signInForm.value).subscribe(
      (res) => {
        this._showAlert('Sucesso', 'Cadastro realizado com sucesso.').then(_ => {
          this.router.navigate([Pages.auth]);
        });
      },
      (error: HttpErrorResponse) => {
        console.log('error', error);
        this._showAlert();
      }
    );
  }
  
}
