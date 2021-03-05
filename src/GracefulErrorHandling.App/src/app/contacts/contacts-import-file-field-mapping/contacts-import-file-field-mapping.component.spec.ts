import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsImportFileFieldMappingComponent } from './contacts-import-file-field-mapping.component';

describe('ContactsImportFileFieldMappingComponent', () => {
  let component: ContactsImportFileFieldMappingComponent;
  let fixture: ComponentFixture<ContactsImportFileFieldMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsImportFileFieldMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsImportFileFieldMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
