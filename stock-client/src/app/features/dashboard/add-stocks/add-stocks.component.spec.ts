import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStocksComponent } from './add-stocks.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {UserService} from '@shared/services/user/user.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {StocksService} from '@shared/services/stocks/stocks.service';
import {PrimengModule} from '@shared/primeng.module';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AddStocksComponent', () => {
  let component: AddStocksComponent;
  let fixture: ComponentFixture<AddStocksComponent>;
  let userService: UserService;
  let tokenService: TokenStorageService;
  let stockService: StocksService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule, PrimengModule],
      declarations: [ AddStocksComponent ],
      providers: [UserService, TokenStorageService, StocksService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStocksComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    stockService = TestBed.get(StocksService);
    tokenService = TestBed.get(TokenStorageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
