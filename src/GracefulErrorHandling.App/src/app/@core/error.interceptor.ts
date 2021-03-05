import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, onErrorResumeNext, throwError } from 'rxjs';
import { catchError, retry, switchMap } from 'rxjs/operators';
import { Logger, LogLevel } from './logger.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private readonly _logger: Logger
  ) {}

  _count = 0;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(
      catchError((error: HttpErrorResponse, obs$: any) => {
        this._count++;

        if(this._count ==1) {
          return obs$
        }

        return of(error.message);

      }),
      switchMap(x => {

        if(typeof x == "string") {          
          alert(x);

          this._logger.log(LogLevel.Error, x);

          return of(null);
        }
        
        return of(x);
      })
    ) as Observable<HttpEvent<any>>
  }
}
