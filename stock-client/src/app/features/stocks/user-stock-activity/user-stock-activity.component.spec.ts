import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStockActivityComponent } from './user-stock-activity.component';
import {FormBuilder} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UserService} from '@shared/services/user/user.service';
import {StockService} from '@shared/services/stock/stock.service';
import {AccountService} from '@shared/services/account/account.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';

describe('UserStockHistoryComponent', () => {
  let component: UserStockActivityComponent;
  let fixture: ComponentFixture<UserStockActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ UserStockActivityComponent ],
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
    fixture = TestBed.createComponent(UserStockActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
