import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactEditorComponent } from './contact-editor/contact-editor.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactSelectComponent } from './contact-select/contact-select.component';
import { ContactImportInputComponent } from './contact-import-input/contact-import-input.component';
import { ContactsImportWizardComponent } from './contacts-import-wizard/contacts-import-wizard.component';
import { ContactsImportFileFieldMappingComponent } from './contacts-import-file-field-mapping/contacts-import-file-field-mapping.component';
import { ContactsImportFileReviewImportComponent } from './contacts-import-file-review-import/contacts-import-file-review-import.component';

@NgModule({
  declarations: [ContactListComponent, ContactDetailComponent, ContactEditorComponent, ContactSelectComponent, ContactImportInputComponent, ContactsImportWizardComponent, ContactsImportFileFieldMappingComponent, ContactsImportFileReviewImportComponent],
  exports:[ContactListComponent, ContactImportInputComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class ContactsModule { }
