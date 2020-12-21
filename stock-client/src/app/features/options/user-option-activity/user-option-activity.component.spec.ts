import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOptionActivityComponent } from './user-option-activity.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {PrimengModule} from '@shared/primeng.module';
import {UserService} from '@shared/services/user/user.service';
import {OptionsService} from '@shared/services/options/options.service';
import {AccountService} from '@shared/services/account/account.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';

describe('UserOptionHistoryComponent', () => {
  let component: UserOptionActivityComponent;
  let fixture: ComponentFixture<UserOptionActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        PrimengModule
      ],
      declarations: [ UserOptionActivityComponent ],
      providers: [
        UserService,
        OptionsService,
        AccountService,
        TokenStorageService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOptionActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
