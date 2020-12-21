import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {UserService} from '@shared/services/user/user.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {NotificationService} from '@shared/services/notification/notification.service';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MessageService} from 'primeng';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let userService: UserService;
  let tokenService: TokenStorageService;
  let notificationService: NotificationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [ UserProfileComponent ],
      providers: [
        FormBuilder,
        HttpClient,
        UserService,
        MessageService,
        TokenStorageService,
        NotificationService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA,  NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    tokenService = TestBed.get(TokenStorageService);
    notificationService = TestBed.get(NotificationService);

    component.editUserDetails = new FormGroup({
      email: new FormControl(),
      passcode: new FormControl()
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
