import { Injectable } from '@angular/core';
import {Share, ShareList, StockHistoryInfo, StockInfo} from '@models/stock';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Dates} from '@models/dates';

@Injectable({
  providedIn: 'root'
})

export class SharesService {

  private baseUrl = 'api/shares';
  private addStock: FormGroup;
  private tradeStock: FormGroup;

  constructor(private fb: FormBuilder,
              private http: HttpClient) { }

  createAddStock(): FormGroup {
    this.addStock  = this.fb.group({
      ticker: ['', Validators.required],
      buy: [null, Validators.required],
      shares: [null, [Validators.required, Validators.min(1)]],
      tradeDate: [null],
      brokerage: [null, Validators.required]
    });
    return this.addStock;
  }

  createTradeStock(): FormGroup {
    this.tradeStock  = this.fb.group({
      buy: [null],
      sell: [null],
      shares: [null, Validators.required]
    });
    return this.tradeStock;
  }

  getShares(userId: number): Observable<StockInfo[]> {
    return this.http.get<StockInfo[]>(`${this.baseUrl}/${userId}`).pipe(
      map(data => data));
  }

  getShareHistory(userId: number): Observable<StockHistoryInfo[]> {
    return this.http.get<StockHistoryInfo[]>(`${this.baseUrl}/history/${userId}`).pipe(
        map(data => data));
  }

  uploadStockFile(shareLists: ShareList[], userId): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/upload/${userId}`, shareLists).pipe(
      map(response => response));
  }

  save(shareData: Share): Observable<Share> {
    return this.http.post<Share>(`${this.baseUrl}/${shareData.userInfo.userid}`, shareData).pipe(
      map(data => data));
  }

  delete(shareId, userId): Observable<any> {
    return this.http.delete<Share>(`${this.baseUrl}/${shareId}/${userId}`).pipe(
        map(data => data));
  }

  trade(shareData: Share): Observable<Share> {
     return this.http.put<Share>(`${this.baseUrl}/trade/${shareData.userInfo.userid}`, shareData).pipe(
        map(data => data));
  }

  getMonthlyDividendShares(data: {user_id: number, date: Dates}): Observable<StockInfo[]> {
    return this.http.get<StockInfo[]>(`${this.baseUrl}/dividend/${data.user_id}/${data.date.startDate}/${data.date.endDate}`);
  }

  getAllDividendShares(userId): Observable<StockInfo[]> {
    return this.http.get<StockInfo[]>(`${this.baseUrl}/dividend/${userId}`);
  }

  getTopMovers(userId): Observable<StockInfo[]> {
    return this.http.get<StockInfo[]>(`${this.baseUrl}/topMovers/${userId}`);
  }
}
