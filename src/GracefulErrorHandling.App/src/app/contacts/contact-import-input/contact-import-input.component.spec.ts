import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactImportInputComponent } from './contact-import-input.component';

describe('ContactImportInputComponent', () => {
  let component: ContactImportInputComponent;
  let fixture: ComponentFixture<ContactImportInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactImportInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactImportInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
