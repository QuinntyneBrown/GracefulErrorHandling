import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactEditorComponent } from './contact-editor/contact-editor.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactSelectComponent } from './contact-select/contact-select.component';

@NgModule({
  declarations: [ContactListComponent, ContactDetailComponent, ContactEditorComponent, ContactSelectComponent],
  exports:[ContactListComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class ContactsModule { }
