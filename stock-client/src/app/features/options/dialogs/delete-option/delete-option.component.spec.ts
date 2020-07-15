import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOptionComponent } from './delete-option.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {PrimengModule} from '@shared/primeng.module';
import {UserService} from '@shared/services/user/user.service';
import {AccountService} from '@shared/services/account/account.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {OptionsService} from '@shared/services/options/options.service';

describe('DeleteOptionComponent', () => {
  let component: DeleteOptionComponent;
  let fixture: ComponentFixture<DeleteOptionComponent>;
  let userService: UserService;
  let optionService: OptionsService;
  let accountService: AccountService;
  let tokenService: TokenStorageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        PrimengModule
      ],
      declarations: [ DeleteOptionComponent ],
      providers: [
        UserService,
        AccountService,
        TokenStorageService,
        OptionsService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteOptionComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    optionService = TestBed.get(OptionsService);
    accountService = TestBed.get(AccountService);
    tokenService = TestBed.get(TokenStorageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
