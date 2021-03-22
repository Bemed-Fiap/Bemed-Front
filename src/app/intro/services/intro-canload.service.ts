import { Route } from "@angular/compiler/src/core";
import { Injectable } from "@angular/core";
import { CanLoad, Router, UrlSegment } from "@angular/router";
import { Observable } from "rxjs";
import { Pages } from "src/app/pages.enum";

@Injectable()
export class CanLoadIntro implements CanLoad {
  
  constructor(
    public router: Router
  ) { }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean>|Promise<boolean>|boolean {
    const didIntro = JSON.parse(localStorage.getItem('didIntro'));

    if (didIntro) {
      this.router.navigate([Pages.auth]).then(_ => false);
    }

    return true;
  }
}