import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public currentAuth$: Observable<any> = new Observable();
  public introVideo = 'https://www.youtube.com/watch?v=di9VQEbff8A';
  public videoEl$: HTMLVideoElement;  

  constructor(
    private readonly _authService: AuthService,
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.currentAuth$ = this._authService.auth$;
    this.videoEl$ = document.querySelector('.wrapper__content__section__video');
  }

  public sanitizeVideo(path) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(path);
  }  

}
