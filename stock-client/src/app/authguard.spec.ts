import { TestBed } from '@angular/core/testing';

import { Authguard } from './authguard';
import {RouterTestingModule} from '@angular/router/testing';
import {UserService} from '@shared/services/user/user.service';

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
