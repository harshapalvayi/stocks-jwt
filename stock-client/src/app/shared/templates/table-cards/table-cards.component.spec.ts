import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCardsComponent } from './table-cards.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {StocksService} from '@shared/services/stocks/stocks.service';
import {FormBuilder, FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';

describe('TableCardsComponent', () => {
  let component: TableCardsComponent;
  let fixture: ComponentFixture<TableCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule],
      declarations: [ TableCardsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [StocksService, FormBuilder, HttpClient]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
