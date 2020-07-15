import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { DeleteStocksComponent } from './delete-stocks.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {PrimengModule} from '@shared/primeng.module';
import {UserService} from '@shared/services/user/user.service';
import {SharesService} from '@shared/services/shares/shares.service';
import {AccountService} from '@shared/services/account/account.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';

describe('DeleteStocksComponent', () => {
  let component: DeleteStocksComponent;
  let fixture: ComponentFixture<DeleteStocksComponent>;
  let userService: UserService;
  let shareService: SharesService;
  let accountService: AccountService;
  let tokenService: TokenStorageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule, PrimengModule],
      declarations: [ DeleteStocksComponent ],
      providers: [UserService, AccountService, TokenStorageService, SharesService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteStocksComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    shareService = TestBed.get(SharesService);
    accountService = TestBed.get(AccountService);
    tokenService = TestBed.get(TokenStorageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
