import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Share, StockInfo} from '@models/stock';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CashService {
  private baseUrl = 'api/cash';
  private addCash: FormGroup;

  constructor(private fb: FormBuilder,
              private http: HttpClient) { }

  create(): FormGroup {
    this.addCash  = this.fb.group({
      cash: [null, Validators.required]
    });
    return this.addCash;
  }

  getCash(userId: number): Observable<StockInfo[]> {
    return this.http.get<StockInfo[]>(`${this.baseUrl}/${userId}`).pipe(
      map(data => data));
  }

  save(shareData: Share): Observable<Share> {
    return this.http.post<Share>(`${this.baseUrl}/${shareData.getUserInfo().userid}`, shareData).pipe(
      map(data => data));
  }

}
