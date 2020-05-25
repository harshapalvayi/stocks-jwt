import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStockComponent } from './search-stock.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormBuilder, FormsModule} from '@angular/forms';
import {UserService} from '@shared/services/user/user.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {StockService} from '@shared/services/stock/stock.service';

describe('SearchStockComponent', () => {
  let component: SearchStockComponent;
  let fixture: ComponentFixture<SearchStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
      declarations: [ SearchStockComponent ],
      providers: [UserService, StockService, TokenStorageService, FormBuilder],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
