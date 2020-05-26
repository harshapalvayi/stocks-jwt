import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemiPieCardsComponent } from './semi-pie-cards.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('SemiPieCardsComponent', () => {
  let component: SemiPieCardsComponent;
  let fixture: ComponentFixture<SemiPieCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemiPieCardsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemiPieCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
