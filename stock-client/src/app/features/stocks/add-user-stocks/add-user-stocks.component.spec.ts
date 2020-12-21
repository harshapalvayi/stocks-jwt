import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserStocksComponent } from './add-user-stocks.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {PrimengModule} from '@shared/primeng.module';
import {UserService} from '@shared/services/user/user.service';
import {StockService} from '@shared/services/stock/stock.service';
import {ExcelService} from '@shared/services/excel/excel.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {AccountService} from '@shared/services/account/account.service';
import {NotificationService} from '@shared/services/notification/notification.service';

describe('AddUserStocksComponent', () => {
  let component: AddUserStocksComponent;
  let fixture: ComponentFixture<AddUserStocksComponent>;
  let userService: UserService;
  let stockService: StockService;
  let excelService: ExcelService;
  let accountService: AccountService;
  let tokenService: TokenStorageService;
  let notificationService: NotificationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        PrimengModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ AddUserStocksComponent ],
      providers: [
        FormBuilder,
        UserService,
        StockService,
        ExcelService,
        AccountService,
        NotificationService,
        TokenStorageService,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserStocksComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    stockService = TestBed.get(StockService);
    stockService = TestBed.get(StockService);
    excelService = TestBed.get(ExcelService);
    accountService = TestBed.get(AccountService);
    tokenService = TestBed.get(TokenStorageService);
    notificationService = TestBed.get(NotificationService);

    component.addStock = new FormGroup({
      ticker: new FormControl(),
      buyPrice: new FormControl(),
      shares: new FormControl(),
      tradeDate: new FormControl(),
      brokerage: new FormControl()
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
