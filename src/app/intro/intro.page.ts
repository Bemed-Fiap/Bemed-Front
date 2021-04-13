import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Pages } from '../pages.enum';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  public introVideo = 'https://www.youtube.com/watch?v=di9VQEbff8A';
  videoEl$: HTMLVideoElement;
 
  constructor(
    private _router: Router,
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit() { 
    this.videoEl$ = document.querySelector('.wrapper__content__section__video');
  }

  public setIntroductionOnLocalstorage(): void {
    this.stopIntroVideo();
    this._router.navigate([Pages.auth]).then(_ => localStorage.setItem('didIntro', JSON.stringify(true)));
  }

  public sanitizeVideo(path) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(path);
  }

  public playVideo() {
    this.videoEl$.play()
  }

  private stopIntroVideo(): void {
    this.videoEl$.pause();
  }

}
