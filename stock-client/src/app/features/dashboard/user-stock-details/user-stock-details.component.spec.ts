import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStockDetailsComponent } from './user-stock-details.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormBuilder, FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';

describe('TableCardsComponent', () => {
  let component: UserStockDetailsComponent;
  let fixture: ComponentFixture<UserStockDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule],
      declarations: [ UserStockDetailsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [FormBuilder, HttpClient]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStockDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
