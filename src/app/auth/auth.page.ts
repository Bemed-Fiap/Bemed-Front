import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  getControlErrorsList,
  isFieldInvalid,
} from '../shared/form-field-message/utils/form-field-message.utils';
import { Pages } from '../pages.enum';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this._fb.group({
      login: this._fb.control(
        '10101010133',
        Validators.compose([Validators.required, Validators.minLength(11)])
      ),
      password: this._fb.control(
        'abc123',
        Validators.compose([Validators.required])
      ),
    });
  }

  public doLogin(): void {
    this.authService.doLogin(this.loginForm.value).subscribe(
      (res) => {
        console.log('Login: ', res);
        this._router.navigate([Pages.home]);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
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
}
