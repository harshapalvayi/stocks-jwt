import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { DeleteStocksComponent } from './delete-stocks.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UserService} from '@shared/services/user/user.service';
import {AccountService} from '@shared/services/account/account.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {PrimengModule} from '@shared/primeng.module';
import {StockService} from '@shared/services/stock/stock.service';

describe('DeleteStocksComponent', () => {
  let component: DeleteStocksComponent;
  let fixture: ComponentFixture<DeleteStocksComponent>;
  let userService: UserService;
  let stockService: StockService;
  let accountService: AccountService;
  let tokenService: TokenStorageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        PrimengModule
      ],
      declarations: [ DeleteStocksComponent ],
      providers: [
        UserService,
        StockService,
        AccountService,
        TokenStorageService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteStocksComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    stockService = TestBed.get(StockService);
    accountService = TestBed.get(AccountService);
    tokenService = TestBed.get(TokenStorageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
