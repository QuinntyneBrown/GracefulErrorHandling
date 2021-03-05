import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsImportFileReviewImportComponent } from './contacts-import-file-review-import.component';

describe('ContactsImportFileReviewImportComponent', () => {
  let component: ContactsImportFileReviewImportComponent;
  let fixture: ComponentFixture<ContactsImportFileReviewImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsImportFileReviewImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsImportFileReviewImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
