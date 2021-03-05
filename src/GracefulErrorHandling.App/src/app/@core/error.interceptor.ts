import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { empty, Observable, of, onErrorResumeNext, throwError } from 'rxjs';
import { catchError, retry, switchMap } from 'rxjs/operators';
import { Logger, LogLevel } from './logger.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private readonly _logger: Logger
  ) {}

  _count = 0;

  responseHasValidationErrors(response: HttpResponse<any>): boolean {
    return response.type && response.type == 4 && response.body.validationErrors && response.body.validationErrors.length > 0;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(
      catchError((error: HttpErrorResponse, obs$: any) => {
        this._count++;

        if(this._count ==1) {
          return obs$
        }

        console.log(error);
        
        this._logger.log(LogLevel.Error, error.message);

        return of(error.message);

      }),
      switchMap((x:HttpResponse<unknown>) => {

        
        if(this.responseHasValidationErrors(x)) {
          alert("validation errors")

          return empty();
        }
        
        return of(x);
      })
    ) as Observable<HttpEvent<any>>
  }
}
