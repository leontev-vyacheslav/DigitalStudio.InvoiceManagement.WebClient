import { HttpClient, HttpParams } from '@angular/common/http'
import { catchError, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { InvoiceModel } from '../models/invoice.model';
import { environment } from '../../environments/environment';
import { DictionaryModel } from '../models/dictionary.model';

@Injectable({ providedIn: 'root' })
export class DataService {

  constructor(private httpClient: HttpClient) {
  }

  public getInvoice(id: string): Observable<InvoiceModel | null> {
    return this.httpClient
      .get<InvoiceModel>(`${environment.apiEndpoint}/invoices`, { params: { id: id } })
      .pipe(
        catchError(_ => of(null))
      );
  }

  public getInvoiceList(): Observable<InvoiceModel[] | null> {
    return this.httpClient.get<InvoiceModel[]>(`${environment.apiEndpoint}/invoices/list`, {
      params: new HttpParams({
        fromObject: {
          no: 1,
          size: 3,
        }
      }),
    }).pipe(
      catchError(_ => of(null))
    );
  }

  public postInvoice(model: InvoiceModel): Observable<InvoiceModel> {
    return this.httpClient
      .post<InvoiceModel>(`${environment.apiEndpoint}/invoices`, model);
  }

  public getDictionary(name: string): Observable<DictionaryModel[] | null> {
    return this.httpClient
      .get<DictionaryModel[]>(`${environment.apiEndpoint}/dictionaries`, { params: { name: name } })
      .pipe(
        catchError(_ => of(null))
      );
  }
}
