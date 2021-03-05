import { Injectable } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ErrorService {
    constructor() {
        this.catchErrorResponse = this.catchErrorResponse.bind(this);
    }

    public catchErrorResponse(error: any): Observable<any> {
        if (error instanceof HttpErrorResponse) {
            
        }        
        return Observable.throw(error.message);
    }
}