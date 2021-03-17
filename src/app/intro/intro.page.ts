import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(
    private _router: Router
  ) { }

  ngOnInit() { }

  public setIntroductionOnLocalstorage(): void {
    this._router.navigate(['auth']).then(_ => localStorage.setItem('didIntro', JSON.stringify(true)));
  }

}
