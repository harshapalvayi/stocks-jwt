import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOptionsComponent } from './search-options.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PrimengModule} from '@shared/primeng.module';
import {UserService} from '@shared/services/user/user.service';
import {DateService} from '@shared/services/date/date.service';
import {UtilService} from '@shared/services/util/util.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';

describe('SearchOptionsComponent', () => {
  let component: SearchOptionsComponent;
  let fixture: ComponentFixture<SearchOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        PrimengModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ SearchOptionsComponent ],
      providers: [
        UserService,
        DateService,
        UtilService,
        TokenStorageService,
        BrowserAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchOptionsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
