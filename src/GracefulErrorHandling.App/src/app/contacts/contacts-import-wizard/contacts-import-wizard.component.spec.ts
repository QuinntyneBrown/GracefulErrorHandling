import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsImportWizardComponent } from './contacts-import-wizard.component';

describe('ContactsImportWizardComponent', () => {
  let component: ContactsImportWizardComponent;
  let fixture: ComponentFixture<ContactsImportWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsImportWizardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsImportWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
