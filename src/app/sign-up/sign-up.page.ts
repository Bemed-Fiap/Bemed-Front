import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  getControlErrorsList,
  isFieldInvalid,
} from '../shared/form-field-message/utils/form-field-message.utils';
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

  private _drugeStoreExtraFields = ['fantasyName', 'companyName', 'cnpj'];
  private _clientExtraFields = ['name', 'lastname', 'cpf'];

  constructor(
    private _fb: FormBuilder,
    private _viacepService: ViacepService
  ) {}

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

  public save(): void {
    console.log('valores', this.signInForm.value);
    if (this.isDrugstore) {
      console.log('cadastro de farmácia...');
      return;
    }

    console.log('cadastro de usuário...');
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
      name: this._fb.control('', Validators.required),
      fantasyName: this._fb.control(''),
      companyName: this._fb.control(''),
      lastname: this._fb.control('', Validators.required),
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
        Validators.compose([Validators.required, Validators.minLength(14)])
      ),
      cnpj: this._fb.control(''),
      address: this.addressFormGroup,
      password: this._fb.control('', Validators.required),
      passwordConfirm: this._fb.control('', Validators.required),
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

  private _setRequiredValidatorOrClearValidators(field: string, type: 'clear' | 'set'): void {
    if (type === 'set') {
      switch (field) {
        case 'cnpj':
          this.signInForm.controls[field].setValidators([Validators.required, Validators.minLength(18)]);
          break;
        case 'cpf':
          this.signInForm.controls[field].setValidators([Validators.required, Validators.minLength(14)]);
          break;
        default:
          this.signInForm.controls[field].setValidators([Validators.required])
          break;
      }
      
      this.signInForm.controls[field].updateValueAndValidity();    
    } else {
      this.signInForm.controls[field].clearValidators()
      this.signInForm.controls[field].updateValueAndValidity();
    }
  }
}
