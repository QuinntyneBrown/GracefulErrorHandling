import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DialogService } from '@shared/dialog.service';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { MatPaginator } from '@angular/material/paginator';
import { EntityDataSource } from '@shared/entity-data-source';
import { ContactDetailComponent } from '../contact-detail/contact-detail.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactListComponent implements OnDestroy {

  private readonly _destroyed$: Subject<void> = new Subject();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private readonly pageIndex$: BehaviorSubject<number> = new BehaviorSubject(0);
  private readonly pageSize$: BehaviorSubject<number> = new BehaviorSubject(5);
  private readonly _dataSource: EntityDataSource<Contact> = new EntityDataSource(this._contactService);

  public readonly vm$: Observable<{
    dataSource: EntityDataSource<Contact>,
    columnsToDisplay: string[],
    length$: Observable<number>,
    pageNumber: number,
    pageSize: number
  }> = combineLatest([this.pageIndex$, this.pageSize$ ])
  .pipe(
    switchMap(([pageIndex,pageSize]) => combineLatest([
      of([
        'firstname',
        'lastname',
        'edit'
      ]),
      of(pageIndex),
      of(pageSize)  
    ])
    .pipe(
      map(([columnsToDisplay, pageNumber, pageSize]) => { 
        this._dataSource.getPage({ pageIndex, pageSize });
        return {
          dataSource: this._dataSource,
          columnsToDisplay,
          length$: this._dataSource.length$,
          pageSize,
          pageNumber
        }
      })
    ))
  );
  
  constructor(
    private readonly _contactService: ContactService,
    private readonly _dialogService: DialogService,
  ) { }

  public edit(contact: Contact) {
    const component = this._dialogService.open<ContactDetailComponent>(ContactDetailComponent);
    component.contact$.next(contact);    
    component.saved
    .pipe(
      takeUntil(this._destroyed$),
      tap(x => this._dataSource.update(x))
    ).subscribe();
  }

  public create() {
    this._dialogService.open<ContactDetailComponent>(ContactDetailComponent)
    .saved
    .pipe(
      takeUntil(this._destroyed$),
      tap(x => this.pageIndex$.next(this.pageIndex$.value))
    ).subscribe();
  }

  public delete(contact: Contact) {    
    this._contactService.remove({ contact }).pipe(
      takeUntil(this._destroyed$),
      tap(x => this.pageIndex$.next(this.pageIndex$.value))
    ).subscribe();
  }
  
  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}
