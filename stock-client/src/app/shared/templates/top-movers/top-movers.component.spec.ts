import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMoversComponent } from './top-movers.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('TopMoversComponent', () => {
  let component: TopMoversComponent;
  let fixture: ComponentFixture<TopMoversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopMoversComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopMoversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
