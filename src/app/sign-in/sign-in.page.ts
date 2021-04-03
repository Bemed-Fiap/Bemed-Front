import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import {
  getControlErrorsList,
  isFieldInvalid,
} from '../shared/form-field-message/utils/form-field-message.utils';
import { ViacepService } from './services/viacep.service';

@Component({
  selector: 'app-auth',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  public signInForm: FormGroup;
  public addressFormGroup: FormGroup;
  public isDrugstore = false;

  constructor(
    private _fb: FormBuilder,
    private _viacepService: ViacepService
  ) {}

  ngOnInit() {
    this._buildForm();
    this._listenCepChange();
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
    if (this.isDrugstore) {
      console.log('cadastro de farmácia...');
      return;
    }

    console.log('cadastro de usuário...');
  }

  public onChangeIsDrugstore(isDrugstore: boolean): void {
    if (isDrugstore) {
      // desabilito required
        // nome
        this.signInForm.get('name').clearValidators()
        this.signInForm.controls["name"].updateValueAndValidity();
        // sobrenome
        this.signInForm.get('lastname').clearValidators()
        this.signInForm.controls["lastname"].updateValueAndValidity();
        // cpf
        this.signInForm.get('cpf').clearValidators()
        this.signInForm.controls["cpf"].updateValueAndValidity();

      // habilito required
        // nome fantasia
        // razão social
        // cnpj
    } else {

    }
  }  
}
