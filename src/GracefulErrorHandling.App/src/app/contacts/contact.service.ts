import { Injectable, Inject } from '@angular/core';
import { baseUrl } from '@core/constants';
import { HttpClient } from '@angular/common/http';
import { Contact } from './contact';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPagable } from '@core/ipagable';
import { EntityPage } from '@core/entity-page';

@Injectable({
  providedIn: 'root'
})
export class ContactService implements IPagable<Contact> {

  uniqueIdentifierName: string = 'contactId';

  constructor(
    @Inject(baseUrl) private _baseUrl: string,
    private _client: HttpClient
  ) { }

  get(options: { pageIndex: number; pageSize: number; }): Observable<EntityPage<Contact>> {
    return this._client.get<{ entities: Contact[], length: number }>(`${this._baseUrl}api/contacts/get/${options.pageSize}/${options.pageIndex}`);
  }

  public getById(options: { contactId: string }): Observable<Contact> {
    return this._client.get<{ contact: Contact }>(`${this._baseUrl}api/contacts/${options.contactId}`)
      .pipe(
        map(x => x.contact)
      );
  }

  public import(options: { data: FormData }): Observable<{ contactIds: number[] }> {
    return this._client.post<{ contactIds: number[] }>(`${this._baseUrl}api/contacts/import`,
      options.data);
  }

  public remove(options: { contact: Contact }): Observable<void> {
    return this._client.delete<void>(`${this._baseUrl}api/contacts/${options.contact.contactId}`);
  }

  public create(options: { contact: Contact }): Observable<{ contact: Contact }> {
    return this._client.post<{ contact: Contact }>(`${this._baseUrl}api/contacts`, { contact: options.contact });
  }
  
  public update(options: { contact: Contact }): Observable<{ contact: Contact }> {
    return this._client.put<{ contact: Contact }>(`${this._baseUrl}api/contacts`, { contact: options.contact });
  }
}
