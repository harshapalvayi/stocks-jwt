import { Injectable } from '@angular/core';
import {Portfolio, Share, ShareList, StockHistory, StockInfo} from '@models/stock';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Dates} from '@models/dates';

@Injectable({
  providedIn: 'root'
})
export class SharesService {
  private baseUrl = 'api/shares';
  private addStock: FormGroup;

  constructor(private fb: FormBuilder,
              private http: HttpClient) { }

  create(): FormGroup {
    this.addStock  = this.fb.group({
      ticker: ['', Validators.required],
      buy: [null, Validators.required],
      shares: [null, Validators.required]
    });
    return this.addStock;
  }

  getShares(userId: number): Observable<StockInfo[]> {
    return this.http.get<StockInfo[]>(`${this.baseUrl}/${userId}`).pipe(
      map(data => data));
  }

  uploadStockFile(shareLists: ShareList[], userId): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/upload/${userId}`, shareLists).pipe(
      map(response => response));
  }

  save(shareData: Share): Observable<Share> {
    return this.http.post<Share>(`${this.baseUrl}/${shareData.getUserInfo().userid}`, shareData).pipe(
      map(data => data));
  }

  edit(shareData: Share): Observable<Share> {
    return this.http.put<Share>(`${this.baseUrl}/${shareData.getUserInfo().userid}`, shareData).pipe(
      map(data => data));
  }

  deleteStock(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  getMonthlyDividendShares(data: {userid: number, date: Dates}): Observable<StockInfo[]> {
    return this.http.get<StockInfo[]>(`${this.baseUrl}/dividend/${data.userid}/${data.date.startDate}/${data.date.endDate}`);
  }

  getAllDividendShares(userId): Observable<StockInfo[]> {
    return this.http.get<StockInfo[]>(`${this.baseUrl}/dividend/${userId}`);
  }

  getTopMovers(userId): Observable<StockInfo[]> {
    return this.http.get<StockInfo[]>(`${this.baseUrl}/topMovers/${userId}`);
  }

  getStockHistory(id: number): Observable<StockHistory[]> {
    return this.http.get<StockHistory[]>(`${this.baseUrl}/history/${id}`);
  }

  getPortfolio(id: number): Observable<Portfolio> {
    return this.http.get<Portfolio>(`${this.baseUrl}/portfolio/${id}`);
  }

}
