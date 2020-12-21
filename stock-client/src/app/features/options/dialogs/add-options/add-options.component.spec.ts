import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOptionsComponent } from './add-options.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {UserService} from '@shared/services/user/user.service';
import {AccountService} from '@shared/services/account/account.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {OptionsService} from '@shared/services/options/options.service';
import {PrimengModule} from '@shared/primeng.module';

describe('AddOptionsComponent', () => {
  let component: AddOptionsComponent;
  let fixture: ComponentFixture<AddOptionsComponent>;
  let userService: UserService;
  let accountService: AccountService;
  let tokenService: TokenStorageService;
  let optionsService: OptionsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        PrimengModule,
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [ AddOptionsComponent ],
      providers: [
        UserService,
        AccountService,
        OptionsService,
        TokenStorageService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOptionsComponent);
    component = fixture.componentInstance;
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    accountService = TestBed.get(AccountService);
    optionsService = TestBed.get(OptionsService);
    tokenService = TestBed.get(TokenStorageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
