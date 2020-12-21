import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOptionsDetailsComponent } from './user-options-details.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {PrimengModule} from '@shared/primeng.module';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {AccountService} from '@shared/services/account/account.service';
import {UserService} from '@shared/services/user/user.service';

describe('TradeOptionsComponent', () => {
  let component: UserOptionsDetailsComponent;
  let fixture: ComponentFixture<UserOptionsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        PrimengModule
      ],
      declarations: [ UserOptionsDetailsComponent ],
      providers: [
        FormBuilder,
        UserService,
        AccountService,
        TokenStorageService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOptionsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
