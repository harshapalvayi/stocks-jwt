import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksComponent } from './stocks.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {CoreModule} from '@core/core.module';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PrimengModule} from '@shared/primeng.module';
import {UserService} from '@shared/services/user/user.service';
import {UtilService} from '@shared/services/util/util.service';
import {ChartService} from '@shared/services/chart/chart.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {StockService} from '@shared/services/stock/stock.service';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        PrimengModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ StocksComponent ],
      providers: [
        UserService,
        UtilService,
        ChartService,
        StockService,
        TokenStorageService,
        BrowserAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
