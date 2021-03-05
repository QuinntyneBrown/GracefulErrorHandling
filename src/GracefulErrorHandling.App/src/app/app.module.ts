import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactsModule } from './contacts/contacts.module';
import { baseUrl } from '@core/constants';

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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
