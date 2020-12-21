import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserOptionsComponent } from './add-user-options.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from '@shared/services/user/user.service';
import {DateService} from '@shared/services/date/date.service';
import {OptionsService} from '@shared/services/options/options.service';
import {AccountService} from '@shared/services/account/account.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {PrimengModule} from '@shared/primeng.module';

describe('AddUserOptionsComponent', () => {
  let component: AddUserOptionsComponent;
  let fixture: ComponentFixture<AddUserOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        PrimengModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ AddUserOptionsComponent ],
      providers: [
        UserService,
        DateService,
        OptionsService,
        AccountService,
        TokenStorageService,
        FormBuilder
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserOptionsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
