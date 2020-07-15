import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsComponent } from './options.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {UserService} from '@shared/services/user/user.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {UtilService} from '@shared/services/util/util.service';
import {OptionsService} from '@shared/services/options/options.service';
import {ChartService} from '@shared/services/chart/chart.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {PrimengModule} from '@shared/primeng.module';
import {AddOptionsComponent} from '@features/options/dialogs/add-options/add-options.component';
import {SearchOptionsComponent} from '@features/options/dialogs/search-options/search-options.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('OptionsComponent', () => {
  let component: OptionsComponent;
  let fixture: ComponentFixture<OptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        PrimengModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        OptionsComponent,
        AddOptionsComponent,
        SearchOptionsComponent
      ],
      providers: [
        UserService,
        TokenStorageService,
        UtilService,
        ChartService,
        OptionsService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
