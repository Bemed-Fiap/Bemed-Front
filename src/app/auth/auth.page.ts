import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getControlErrorsList, isFieldInvalid } from '../shared/form-field-message/utils/form-field-message.utils';
import { Pages } from '../pages.enum';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this._fb.group({
      login: this._fb.control('michel.goianinha@hotmail.com', Validators.compose([Validators.required, Validators.email])),
      password: this._fb.control('123', Validators.compose([Validators.required]))
    });
  }

  public doLogin(): void {
    this._router.navigate([Pages.home]);
  };

  public isFieldInvalid(formControlName: string): boolean {
    const control = this.loginForm.get(formControlName);
    return isFieldInvalid(control);
  };

  public getControlErrorsList(formControlName: string): string[] {
    const control = this.loginForm.get(formControlName);
    return getControlErrorsList(control);
  }

  public createAccount(): void {
    this._router.navigate([Pages.signUp]);
  }

}
