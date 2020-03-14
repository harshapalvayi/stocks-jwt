import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from '@shared/services/jwt/authentication.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {RouterTestingModule} from '@angular/router/testing';
import {PrimengModule} from '@shared/primeng.module';
import {HttpClient} from '@angular/common/http';
import {MessagesService} from '@shared/services/message/messages.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule, PrimengModule],
      declarations: [ LoginPageComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [FormBuilder, AuthenticationService, MessagesService, TokenStorageService, HttpClient]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
