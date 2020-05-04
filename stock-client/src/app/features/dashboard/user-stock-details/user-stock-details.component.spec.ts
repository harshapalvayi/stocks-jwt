import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStockDetailsComponent } from './user-stock-details.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {UserService} from '@shared/services/user/user.service';
import {SharesService} from '@shared/services/shares/shares.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {FormBuilder, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

describe('UserStockDetailsComponent', () => {
  let component: UserStockDetailsComponent;
  let fixture: ComponentFixture<UserStockDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
      declarations: [ UserStockDetailsComponent],
      providers: [UserService, SharesService, TokenStorageService, FormBuilder],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStockDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
