import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStockDetailsComponent } from './user-stock-details.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {PrimengModule} from '@shared/primeng.module';
import {StockService} from '@shared/services/stock/stock.service';
import {UserService} from '@shared/services/user/user.service';
import {AccountService} from '@shared/services/account/account.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';

describe('UserStockDetailsComponent', () => {
  let component: UserStockDetailsComponent;
  let fixture: ComponentFixture<UserStockDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        PrimengModule
      ],
      declarations: [ UserStockDetailsComponent],
      providers: [
        UserService,
        StockService,
        AccountService,
        TokenStorageService,
        FormBuilder
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStockDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
