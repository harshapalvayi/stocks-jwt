import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDashboardComponent } from './stock-dashboard.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {UtilService} from '@shared/services/util/util.service';
import {PortfolioService} from '@shared/services/portfolio/portfolio.service';
import {PrimengModule} from '@shared/primeng.module';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('StockDashboardComponent', () => {
  let component: StockDashboardComponent;
  let fixture: ComponentFixture<StockDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PrimengModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ StockDashboardComponent ],
      providers: [
        UtilService,
        PortfolioService
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
