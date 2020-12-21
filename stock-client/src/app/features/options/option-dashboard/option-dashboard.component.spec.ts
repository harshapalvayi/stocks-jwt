import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionDashboardComponent } from './option-dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {PrimengModule} from '@shared/primeng.module';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {UtilService} from '@shared/services/util/util.service';
import {PortfolioService} from '@shared/services/portfolio/portfolio.service';

describe('OptionDashboardComponent', () => {
  let component: OptionDashboardComponent;
  let fixture: ComponentFixture<OptionDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        PrimengModule
      ],
      declarations: [ OptionDashboardComponent ],
      providers: [
        UtilService,
        PortfolioService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
