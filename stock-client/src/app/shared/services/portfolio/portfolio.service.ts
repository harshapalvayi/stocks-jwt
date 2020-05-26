import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Portfolio} from '@models/stock';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private baseUrl = 'api/portfolio';
  constructor(private http: HttpClient) { }

  getPortfolio(id: number): Observable<Portfolio> {
    return this.http.get<Portfolio>(`${this.baseUrl}/portfolio/${id}`);
  }

  deletePortfolio(id: number): Observable<Portfolio> {
    return this.http.delete<Portfolio>(`${this.baseUrl}/portfolio/${id}`);
  }
}
