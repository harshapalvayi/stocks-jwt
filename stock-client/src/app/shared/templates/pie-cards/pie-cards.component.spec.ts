import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieCardsComponent } from './pie-cards.component';

describe('PieCardsComponent', () => {
  let component: PieCardsComponent;
  let fixture: ComponentFixture<PieCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieCardsComponent ]
    })
    .compileComponents();
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
