import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DividendsComponent } from './dividends.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {PrimengModule} from '@shared/primeng.module';

describe('MonthlyDividendsComponent', () => {
  let component: DividendsComponent;
  let fixture: ComponentFixture<DividendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PrimengModule],
      declarations: [ DividendsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DividendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
