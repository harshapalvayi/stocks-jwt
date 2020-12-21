import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NotificationService} from '@shared/services/notification/notification.service';
import {MessagesService} from '@shared/services/message/messages.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {PrimengModule} from '@shared/primeng.module';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        PrimengModule
      ],
      declarations: [ NotificationComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [NotificationService, MessagesService]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
