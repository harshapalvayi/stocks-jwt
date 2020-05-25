import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieCardsComponent } from './pie-cards.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('PieCardsComponent', () => {
  let component: PieCardsComponent;
  let fixture: ComponentFixture<PieCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieCardsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
