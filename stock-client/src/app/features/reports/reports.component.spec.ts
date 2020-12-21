import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsComponent } from './reports.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {PrimengModule} from '@shared/primeng.module';
import {DateService} from '@shared/services/date/date.service';
import {UtilService} from '@shared/services/util/util.service';
import {UserService} from '@shared/services/user/user.service';
import {ChartService} from '@shared/services/chart/chart.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        PrimengModule
      ],
      declarations: [ ReportsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        DateService,
        UtilService,
        UserService,
        ChartService,
        TokenStorageService
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
