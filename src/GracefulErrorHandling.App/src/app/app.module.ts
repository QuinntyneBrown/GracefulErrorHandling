import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactsModule } from './contacts/contacts.module';
import { baseUrl, minimumLogLevel } from '@core/constants';
import { ErrorInterceptor } from '@core/error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ContactsModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: baseUrl,
      useValue: 'https://localhost:5001/'
    },
    {
      provide: minimumLogLevel,
      useValue: 0
    },    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
