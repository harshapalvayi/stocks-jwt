import { TestBed } from '@angular/core/testing';

import { HttpInterceptors } from './http-interceptor.service';
import {AuthenticationService} from '@shared/services/jwt/authentication.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('HttpInterceptors', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [AuthenticationService, TokenStorageService, HttpInterceptors]
  }));

  it('should be created', () => {
    const service: HttpInterceptors = TestBed.get(HttpInterceptors);
    expect(service).toBeTruthy();
  });
});
