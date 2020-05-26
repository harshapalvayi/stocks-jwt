import { TestBed } from '@angular/core/testing';

import { TokenStorageService } from './token-storage.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TokenStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: []
  }));

  it('should be created', () => {
    const service: TokenStorageService = TestBed.get(TokenStorageService);
    expect(service).toBeTruthy();
  });
});
