import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Option, OptionInfo} from '@models/stock';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  private baseUrl = 'api/options';
  private addOptions: FormGroup;
  private tradeOptions: FormGroup;

  constructor(private fb: FormBuilder,
              private http: HttpClient) { }

  createAddOptions(): FormGroup {
    this.addOptions  = this.fb.group({
      ticker: ['', Validators.required],
      contracts: [null, Validators.required],
      buy: [null, Validators.required],
      brokerage: [null, Validators.required]
    });
    return this.addOptions;
  }

  createTradeOptions(): FormGroup {
    this.tradeOptions  = this.fb.group({
      buy: [null],
      sell: [null],
      contracts: [null, Validators.required]
    });
    return this.tradeOptions;
  }

  getOptions(userId: number): Observable<OptionInfo[]> {
    return this.http.get<OptionInfo[]>(`${this.baseUrl}/${userId}`).pipe(
      map(data => data));
  }

  save(optionData: Option): Observable<Option> {
    return this.http.post<Option>(`${this.baseUrl}/${optionData.userInfo.userid}`, optionData).pipe(
      map(data => data));
  }

  trade(optionData: Option): Observable<Option> {
    return this.http.put<Option>(`${this.baseUrl}/trade/${optionData.userInfo.userid}`, optionData).pipe(
      map(data => data));
  }
}
