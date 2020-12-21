import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {OptionData, OptionActivityData, OptionsChainData, OptionTimestamp} from '@models/optionsChainData';

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

  getOptionsData(userId: number): Observable<OptionData[]> {
    return this.http.get<OptionData[]>(`${this.baseUrl}/${userId}`).pipe(
      map(data => data));
  }

  getOptionDetails(ticker: string): Observable<OptionsChainData>  {
    return this.http.get<OptionsChainData>(`${this.baseUrl}/data/${ticker}`).pipe(
      map(data => data));
  }

  getOptionDetailsByTimestamp(option: OptionTimestamp): Observable<OptionsChainData>  {
    return this.http.get<OptionsChainData>(`${this.baseUrl}/data/${option.ticker}/${option.expiry}`).pipe(
      map(data => data));
  }

  getOptionActivityData(userId: number): Observable<OptionActivityData[]> {
    return this.http.get<OptionActivityData[]>(`${this.baseUrl}/history/${userId}`).pipe(
      map(data => data));
  }

  getOptionActivityDataByTicker(userId: number, ticker: string): Observable<OptionActivityData[]> {
    return this.http.get<OptionActivityData[]>(`${this.baseUrl}/history/${userId}/${ticker}`).pipe(
      map(data => data));
  }

  save(optionData: OptionData): Observable<OptionData> {
    return this.http.post<OptionData>(`${this.baseUrl}/${optionData.userId}`, optionData).pipe(
      map(data => data));
  }

  delete(optionId, userId): Observable<OptionData> {
    return this.http.delete<OptionData>(`${this.baseUrl}/${optionId}/${userId}`).pipe(
      map(data => data));
  }

  trade(optionData: OptionData): Observable<OptionData> {
    return this.http.put<OptionData>(`${this.baseUrl}/trade/${optionData.userId}`, optionData).pipe(
      map(data => data));
  }

  createAddOptions(): FormGroup {
    this.addOptions  = this.fb.group({
      ticker: ['', Validators.required],
      optionSymbol: [null],
      tradeDate: [null],
      contracts: [null, Validators.required],
      type: [{value: null, disabled: true}, Validators.required],
      strike: [null, Validators.required],
      buyPrice: [null, Validators.required],
      optionPrice: [{value: null, disabled: true}, Validators.required],
      expire: [{value: null, disabled: true}, Validators.required],
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
      optionSymbol: [null],
      strike: [null, Validators.required],
      optionType: [null, Validators.required]
    });
    return this.searchOptions;
  }
}
