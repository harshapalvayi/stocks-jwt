import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlyDividendsComponent } from './yearly-dividends.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';

describe('YearlyDividendsComponent', () => {
  let component: YearlyDividendsComponent;
  let fixture: ComponentFixture<YearlyDividendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearlyDividendsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearlyDividendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
