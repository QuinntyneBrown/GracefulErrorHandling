import { Observable } from "rxjs";
import { EntityPage } from "./entity-page";

export interface IPagable<T> {
    get(options: { pageIndex: number, pageSize: number }): Observable<EntityPage<T>>;
    uniqueIdentifierName: string;
}