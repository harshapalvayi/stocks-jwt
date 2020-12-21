import { TestBed } from '@angular/core/testing';

import { RoleGuardService } from './role-guard.service';
import {UserService} from '@shared/services/user/user.service';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('RoleGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [
      HttpClient,
      FormBuilder,
      UserService
    ]
  }));

  it('should be created', () => {
    const service: RoleGuardService = TestBed.get(RoleGuardService);
    expect(service).toBeTruthy();
  });
});
