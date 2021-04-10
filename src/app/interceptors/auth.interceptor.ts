import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Pages } from "../pages.enum";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const currentAuth = this.authService.currentAuth;

    if (Object.entries(currentAuth).length) {
      const token = currentAuth['token'];
      const reqWithHeader = req.clone({
        setHeaders: {
          'onetoken': token,
        },
      });
      return next.handle(reqWithHeader).pipe(
        // tslint:disable-next-line
        tap(null, (event: HttpEvent<any>) => {
          if (event instanceof HttpErrorResponse) {
            if (event.status === 401) {
              // this.eventService.emit(events.LOGOUT);
              this.router.navigate([Pages.auth]);
            }
          }
        }),
        catchError((error, caught) => {
          console.error(error);
          // this.messageService.httpErrorMessage(error);
          return throwError(error);
        }) as any
      );
    }
    return next.handle(req);
  }
}
