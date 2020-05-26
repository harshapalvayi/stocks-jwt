import { TestBed } from '@angular/core/testing';

import { PortfolioService } from './portfolio.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('PortfolioService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: []
  }));

  it('should be created', () => {
    const service: PortfolioService = TestBed.get(PortfolioService);
    expect(service).toBeTruthy();
  });
});
