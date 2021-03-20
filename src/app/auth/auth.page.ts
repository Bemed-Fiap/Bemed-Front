import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
      login: new FormControl('michel.goianinha@hotmail.com', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('123', Validators.compose([Validators.required]))
    });
  }

  public doLogin(): void {
    this._router.navigate(['app']);
  };

  public createAccount(): void {
    this._router.navigate(['sign-in']);
  }

}
