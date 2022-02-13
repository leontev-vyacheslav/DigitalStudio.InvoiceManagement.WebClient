import { HttpClient, HttpParams } from '@angular/common/http'
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { InvoiceModel } from '../models/invoice.model';
import { environment } from '../../environments/environment';
import { DictionaryModel } from '../models/dictionary.model';

@Injectable({ providedIn: 'root' })
export class DataService {

  private currentInvoiceSource = new BehaviorSubject<InvoiceModel | null>(null);

  public currentInvoice$ = this.currentInvoiceSource.asObservable();

  setCurrentInvoice(invoice: InvoiceModel | null) {
    this.currentInvoiceSource.next(invoice);
  }

  constructor(private httpClient: HttpClient) {
  }

  public getInvoice(id: string): Observable<InvoiceModel | null> {
    return this.httpClient
      .get<InvoiceModel>(`${environment.apiEndpoint}/invoices/${id}`)
      .pipe(
        catchError(_ => of(null))
      );
  }

  public getInvoiceList(): Observable<InvoiceModel[] | null> {
    return this.httpClient.get<InvoiceModel[]>(`${environment.apiEndpoint}/invoices/list`, {
      params: new HttpParams({
        fromObject: {
          no: 1,
          size: 100,
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

  public deleteInvoice(id: string): Observable<InvoiceModel> {
    return this.httpClient
      .delete<InvoiceModel>(`${environment.apiEndpoint}/invoices/${id}`);
  }

  public getDictionary(name: string): Observable<DictionaryModel[] | null> {
    return this.httpClient
      .get<DictionaryModel[]>(`${environment.apiEndpoint}/dictionaries`, { params: { name: name } })
      .pipe(
        catchError(_ => of(null))
      );
  }
}
