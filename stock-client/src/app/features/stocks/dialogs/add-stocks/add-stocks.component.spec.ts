import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStocksComponent } from './add-stocks.component';
import {UserService} from '@shared/services/user/user.service';
import {SharesService} from '@shared/services/shares/shares.service';
import {AccountService} from '@shared/services/account/account.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {ExcelService} from '@shared/services/excel/excel.service';
import {NotificationService} from '@shared/services/notification/notification.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {PrimengModule} from '@shared/primeng.module';
import {CoreModule} from '@core/core.module';

describe('AddStocksComponent', () => {
  let component: AddStocksComponent;
  let fixture: ComponentFixture<AddStocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        FormsModule,
        PrimengModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ AddStocksComponent ],
      providers: [
        UserService,
        SharesService,
        ExcelService,
        AccountService,
        TokenStorageService,
        NotificationService,
        FormBuilder
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStocksComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
