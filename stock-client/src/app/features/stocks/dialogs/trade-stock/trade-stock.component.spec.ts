import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeStockComponent } from './trade-stock.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {PrimengModule} from '@shared/primeng.module';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {AccountService} from '@shared/services/account/account.service';
import {UserService} from '@shared/services/user/user.service';
import {StockService} from '@shared/services/stock/stock.service';

describe('BuyStockComponent', () => {
  let component: TradeStockComponent;
  let fixture: ComponentFixture<TradeStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        PrimengModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [ TradeStockComponent ],
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
    fixture = TestBed.createComponent(TradeStockComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
