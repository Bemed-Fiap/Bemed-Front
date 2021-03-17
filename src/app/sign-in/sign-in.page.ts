import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { getControlErrorsList, isFieldInvalid } from '../shared/form-field-message/utils/form-field-message.utils';

@Component({
  selector: 'app-auth',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  public signInForm: FormGroup;

  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this._buildForm();
  }

  private _buildForm(): void {
    this.signInForm = this._fb.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      lastname: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      phone: new FormControl('', Validators.compose([Validators.required, Validators.minLength(14)])),
      cpf: new FormControl('', Validators.compose([Validators.required, Validators.minLength(14)])),
      password: new FormControl('', Validators.required),
      passwordConfirm: new FormControl('', Validators.required)
    });
  }

  public isFieldInvalid(formControlName: string): boolean {
    const control = this.signInForm.get(formControlName);
    return isFieldInvalid(control);
  };

  public getControlErrorsList(formControlName: string): string[] {
    const control = this.signInForm.get(formControlName);
    return getControlErrorsList(control);
  }

}
