import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {StockDetails} from '@models/stock';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private baseUrl = 'api/stocks';
  constructor(private http: HttpClient) { }

  getStock(userId: number, ticker: string): Observable<StockDetails> {
    return this.http.get<StockDetails>(`${this.baseUrl}/${userId}/${ticker}`).pipe(
      map(data => data));
  }
}
