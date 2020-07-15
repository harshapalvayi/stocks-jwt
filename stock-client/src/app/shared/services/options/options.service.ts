import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {OptionInfo, OptionHistoryInfo, Options, OptionTimestamp} from '@models/options';
import {Share} from '@models/stock';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  private baseUrl = 'api/options';
  private addOptions: FormGroup;
  private tradeOptions: FormGroup;
  private searchOptions: FormGroup;

  constructor(private fb: FormBuilder,
              private http: HttpClient) { }

  createAddOptions(): FormGroup {
    this.addOptions  = this.fb.group({
      ticker: ['', Validators.required],
      tradeDate: [null],
      contracts: [null, Validators.required],
      type: [null, Validators.required],
      strike: [null, Validators.required],
      buyPrice: [null, Validators.required],
      optionPrice: [null, Validators.required],
      expire: [null, Validators.required],
      brokerage: [null, Validators.required]
    });
    return this.addOptions;
  }

  createTradeOptions(): FormGroup {
    this.tradeOptions  = this.fb.group({
      buyPrice: [null],
      sellPrice: [null],
      contracts: [null, Validators.required],
      tradeDate: [null, Validators.required]
    });
    return this.tradeOptions;
  }

  createSearchOptions(): FormGroup {
    this.searchOptions  = this.fb.group({
      expire: [null],
      optionPrice: [null],
      strike: [null, Validators.required],
      optionType: [null, Validators.required]
    });
    return this.searchOptions;
  }

  getOptions(userId: number): Observable<OptionInfo[]> {
    return this.http.get<OptionInfo[]>(`${this.baseUrl}/${userId}`).pipe(
      map(data => data));
  }

  getOptionDetails(ticker: string): Observable<Options>  {
    return this.http.get<Options>(`${this.baseUrl}/data/${ticker}`).pipe(
      map(data => data));
  }

  getOptionDetailsByTimestamp(option: OptionTimestamp): Observable<Options>  {
    return this.http.get<Options>(`${this.baseUrl}/data/${option.ticker}/${option.expiry}`).pipe(
      map(data => data));
  }

  getOptionHistory(userId: number): Observable<OptionHistoryInfo[]> {
    return this.http.get<OptionHistoryInfo[]>(`${this.baseUrl}/history/${userId}`).pipe(
      map(data => data));
  }

  save(optionData: OptionInfo): Observable<OptionInfo> {
    return this.http.post<OptionInfo>(`${this.baseUrl}/${optionData.userId}`, optionData).pipe(
      map(data => data));
  }

  delete(optionId, userId): Observable<any> {
    return this.http.delete<Share>(`${this.baseUrl}/${optionId}/${userId}`).pipe(
      map(data => data));
  }

  trade(optionData: OptionInfo): Observable<OptionInfo> {
    return this.http.put<OptionInfo>(`${this.baseUrl}/trade/${optionData.userId}`, optionData).pipe(
      map(data => data));
  }
}
