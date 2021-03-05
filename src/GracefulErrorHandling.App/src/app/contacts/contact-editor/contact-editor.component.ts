import { Component, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact-editor',
  templateUrl: './contact-editor.component.html',
  styleUrls: ['./contact-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContactEditorComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ContactEditorComponent),
      multi: true
    }       
  ]
})
export class ContactEditorComponent implements ControlValueAccessor,  Validator  {
  validate(control: AbstractControl): ValidationErrors {
    const error = { validate: true };
      
    if (!control.value && !control.pristine) {
      return error;
    }
    
    return null as any;
  }
  
  public form = new FormGroup({
    contactId: new FormControl(),
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required])
  });
  
  writeValue(contact: Contact): void {   
    this.form.patchValue(contact || {}, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.form.valueChanges.subscribe(fn);
  }
  
  onTouched = () => {
  
  };

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }
}
