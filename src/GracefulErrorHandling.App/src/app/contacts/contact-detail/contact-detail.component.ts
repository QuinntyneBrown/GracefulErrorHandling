import { OverlayRef } from '@angular/cdk/overlay';
import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnDestroy {

  private readonly _destroyed: Subject<void> = new Subject();

  public contact$: BehaviorSubject<Contact> = new BehaviorSubject(null as any);

  @Output() public saved = new EventEmitter();

  public vm$ = combineLatest([
    this.contact$
  ]).pipe(
    map(([contact]) => {
      return {
        form: new FormGroup({
          contact: new FormControl(contact, [])
        })
      }
    })
  )

  constructor(
    private readonly _overlayRef: OverlayRef,
    private readonly _contactService: ContactService) {     
  }

  public save(vm: { form: FormGroup}) {
    const contact = vm.form.value.contact;
    let obs$: Observable<{ contact: Contact }>;
    if(contact.contactId) {
      obs$ = this._contactService.update({ contact })
    }   
    else {
      obs$ = this._contactService.create({ contact })
    } 

    obs$.pipe(
      takeUntil(this._destroyed),      
      tap(x => {
        this.saved.next(x.contact);
        this._overlayRef.dispose();
      })
    ).subscribe();
  }

  public cancel() {
    this._overlayRef.dispose();
  }

  ngOnDestroy() {
    this._destroyed.complete();
    this._destroyed.next();
  }
}
