import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStockDetailsComponent } from './user-stock-details.component';

describe('UserStockDetailsComponent', () => {
  let component: UserStockDetailsComponent;
  let fixture: ComponentFixture<UserStockDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserStockDetailsComponent ]
    })
    .compileComponents();
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
