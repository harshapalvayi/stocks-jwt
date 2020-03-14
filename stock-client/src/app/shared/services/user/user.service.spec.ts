import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [UserService, TokenStorageService]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
