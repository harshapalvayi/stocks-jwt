import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyDividendsComponent } from './monthly-dividends.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {PrimengModule} from '@shared/primeng.module';

describe('MonthlyDividendsComponent', () => {
  let component: MonthlyDividendsComponent;
  let fixture: ComponentFixture<MonthlyDividendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PrimengModule],
      declarations: [ MonthlyDividendsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyDividendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
