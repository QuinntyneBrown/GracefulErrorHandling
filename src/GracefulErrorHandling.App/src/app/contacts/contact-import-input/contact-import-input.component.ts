import { Component, ElementRef, AfterViewInit, Input, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ContactService } from "../contact.service";

@Component({
  selector: 'app-contact-import-input',
  templateUrl: './contact-import-input.component.html',
  styleUrls: ['./contact-import-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContactImportInputComponent),
      multi: true
    }
  ]
})
export class ContactImportInputComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {

  private readonly _destroyed$: Subject<void> = new Subject();

  constructor(
    private readonly _elementRef: ElementRef,
    private readonly _contactService: ContactService) 
    {
      this.onDragOver = this.onDragOver.bind(this);
      this.onDrop = this.onDrop.bind(this);    
    }

  writeValue(obj: any): void {

  }

  registerOnChange(fn: any): void {

  }
  
  registerOnTouched(fn: any): void {

  }

  setDisabledState?(isDisabled: boolean): void {
    
  }

  
  public onDragOver(e: DragEvent): void {
    e.stopPropagation();
    e.preventDefault();
  }

  public async onDrop(e: DragEvent): Promise<any> {
    e.stopPropagation();
    e.preventDefault();

    if (e.dataTransfer && e.dataTransfer.files) {
      const packageFiles = function (fileList: FileList): FormData {
        const formData = new FormData();
        for (var i = 0; i < fileList.length; i++) {
          formData.append(fileList[i].name, fileList[i]);
        }
        return formData;
      }

      const data = packageFiles(e.dataTransfer.files);

      this._contactService.import({ data })
        .pipe(
          takeUntil(this._destroyed$)
        )
        .subscribe();
    }
  }

  ngAfterViewInit() {
    this._elementRef.nativeElement.addEventListener("dragover", this.onDragOver);
    this._elementRef.nativeElement.addEventListener("drop", this.onDrop, false);
  }

  ngOnDestroy() {
    this._elementRef.nativeElement.removeEventListener("dragover", this.onDragOver);
    this._elementRef.nativeElement.removeEventListener("drop", this.onDrop, false);    
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}
