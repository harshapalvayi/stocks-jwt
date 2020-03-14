import { TestBed } from '@angular/core/testing';

import { RoleGuardService } from './role-guard.service';
import {UserService} from '@shared/services/user/user.service';

describe('RoleGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [UserService]
  }));

  it('should be created', () => {
    const service: RoleGuardService = TestBed.get(RoleGuardService);
    expect(service).toBeTruthy();
  });
});
