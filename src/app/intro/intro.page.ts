import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor() { }

  ngOnInit() { }

  public setIntroductionOnLocalstorage(): void {
    localStorage.setItem('didIntro', JSON.stringify(true));
  }

}
