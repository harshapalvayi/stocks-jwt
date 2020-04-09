import { TestBed } from '@angular/core/testing';

import { Authguard } from './authguard';
import {UserService} from '@shared/services/user/user.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('Authguard', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    providers: [UserService]
  }));

  it('should be created', () => {
    const service: Authguard = TestBed.get(Authguard);
    expect(service).toBeTruthy();
  });
});
