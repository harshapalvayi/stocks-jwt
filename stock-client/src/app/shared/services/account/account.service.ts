import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AcctType} from '@models/stock';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = 'api/account';
  private accountType: FormGroup;

  constructor(private fb: FormBuilder,
              private http: HttpClient) { }

  createAccountType(): FormGroup {
    this.accountType  = this.fb.group({
      brokerage: [null, Validators.required]
    });
    return this.accountType;
  }

  getAccounts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`).pipe(
      map(data => data));
  }

  shareAcctType(acctData: AcctType): Observable<AcctType> {
    return this.http.put<AcctType>(`${this.baseUrl}/shareAcctType/${acctData.userid}`, acctData).pipe(
      map(data => data));
  }

  optionAcctType(acctData: AcctType): Observable<AcctType> {
    return this.http.put<AcctType>(`${this.baseUrl}/optionAcctType/${acctData.userid}`, acctData).pipe(
      map(data => data));
  }
}
