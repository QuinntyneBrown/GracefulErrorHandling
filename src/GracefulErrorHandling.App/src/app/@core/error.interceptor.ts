import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { ErrorService } from './error.service';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private readonly _errorService: ErrorService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(
      catchError((error: HttpErrorResponse) => {

        return of(error.message);
      }),
      switchMap(x => {

        if(typeof x == "string") {          
          alert(x);
          
          return of(null);
        }

        //swallow from console

        return of(x);
      })
    ) as Observable<HttpEvent<any>>
  }
}
