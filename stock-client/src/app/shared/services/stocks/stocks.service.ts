import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Stock, StockDetails} from '@models/stock';
import {Dates} from '@models/dates';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  private baseUrl = 'api/stocks';

  private addStock: FormGroup;
  constructor(  private fb: FormBuilder,
                private http: HttpClient) { }

  create(): FormGroup {
     this.addStock  = this.fb.group({
        symbol: ['', Validators.required],
        avg_price: [null, Validators.required],
        shares: [null]
     });
     return this.addStock;
  }


  save(stockData: Stock): Observable<Stock> {
    console.log('stock data', stockData);
    return this.http.post<Stock>(`${this.baseUrl}/save`, stockData).pipe(
      map(data => data));
  }

  edit(stockData: Stock): Observable<Stock> {
    return this.http.post<Stock>(`${this.baseUrl}/edit`, stockData);
  }

  getStockDetails(ticker: string): Observable<Stock> {
      return this.http.get<Stock>(`${this.baseUrl}/ticker/${ticker}`);
  }

  deleteStock(id: number) {
    return this.http.get<any>(`${this.baseUrl}/delete/${id}`);
  }

  getAllStocks(userId: number): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.baseUrl}/all/${userId}`).pipe(
      map(data => data));
  }

  getAllStockDetails(): Observable<StockDetails[]> {
    return this.http.get<StockDetails[]>(`${this.baseUrl}/all`).pipe(
      map(data => data));
  }

  getDividendStocks(date: Dates): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.baseUrl}/dividend/${date.startDate}/${date.endDate}`);
  }

  getTotal(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/total`);
  }

  uploadStockFile(file): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/upload`, file).pipe(
      map(response => response));
  }
}
