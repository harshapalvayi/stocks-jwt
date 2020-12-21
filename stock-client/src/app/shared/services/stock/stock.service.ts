import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Stock, StockList, StockDetails, StockActivityInfo, StockInfo} from '@models/stock';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Dates} from '@models/dates';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private baseUrl = 'api/stocks';
  private addStock: FormGroup;
  private tradeStock: FormGroup;

  constructor(private http: HttpClient,
              private fb: FormBuilder) { }

  getStockDetails(userId: number, ticker: string): Observable<StockDetails> {
    return this.http.get<StockDetails>(`${this.baseUrl}/${userId}/${ticker}`).pipe(
      map(data => data));
  }

  getUserStocks(userId: number): Observable<StockInfo[]> {
    return this.http.get<StockInfo[]>(`${this.baseUrl}/${userId}`).pipe(
      map(data => data));
  }

  getStockActivityData(userId: number): Observable<StockActivityInfo[]> {
    return this.http.get<StockActivityInfo[]>(`${this.baseUrl}/activity/${userId}`).pipe(
      map(data => data));
  }

  getStockActivityByTicker(userId: number, ticker: string): Observable<StockActivityInfo[]> {
    return this.http.get<StockActivityInfo[]>(`${this.baseUrl}/activity/${userId}/${ticker}`).pipe(
      map(data => data));
  }

  uploadStockExcelFile(shareLists: StockList[], userId): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/upload/Excel/${userId}`, shareLists).pipe(
      map(response => response));
  }

  uploadStockPdfFile(file: File, userId): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.baseUrl}/upload/PDF/${userId}`, formData).pipe(
      map(response => response));
  }

  save(stockData: Stock): Observable<Stock> {
    return this.http.post<Stock>(`${this.baseUrl}/${stockData.user.userid}`, stockData).pipe(
      map(data => data));
  }

  delete(stockId, userId): Observable<any> {
    return this.http.delete<Stock>(`${this.baseUrl}/${stockId}/${userId}`).pipe(
      map(data => data));
  }

  trade(stockData: Stock): Observable<Stock> {
    return this.http.put<Stock>(`${this.baseUrl}/trade/${stockData.user.userid}`, stockData).pipe(
      map(data => data));
  }

  getMonthlyDividendShares(data: {userId: number, date: Dates}): Observable<StockInfo[]> {
    return this.http.get<StockInfo[]>(`${this.baseUrl}/dividend/${data.userId}/${data.date.startDate}/${data.date.endDate}`);
  }

  getAllDividendShares(userId): Observable<StockInfo[]> {
    return this.http.get<StockInfo[]>(`${this.baseUrl}/dividend/${userId}`);
  }

  getTopMovers(userId): Observable<StockInfo[]> {
    return this.http.get<StockInfo[]>(`${this.baseUrl}/topMovers/${userId}`);
  }

  createAddStock(): FormGroup {
    this.addStock  = this.fb.group({
      ticker: ['', Validators.required],
      buyPrice: [null, Validators.required],
      shares: [null, [Validators.required, Validators.min(1)]],
      tradeDate: [null],
      brokerage: [null, Validators.required]
    });
    return this.addStock;
  }

  createTradeStock(): FormGroup {
    this.tradeStock  = this.fb.group({
      buyPrice: [null],
      sellPrice: [null],
      shares: [null, Validators.required],
      tradeDate: [null, Validators.required]
    });
    return this.tradeStock;
  }

  chopStockName(name) {
    let stName: string;
    if (name) {
      if (name.length > 25) {
        stName = name.slice(0, 24) + '...';
      } else {
        stName = name;
      }
      return stName;
    }
  }

}
