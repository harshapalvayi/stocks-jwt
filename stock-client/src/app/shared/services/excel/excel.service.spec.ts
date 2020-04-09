import { TestBed } from '@angular/core/testing';

import { ExcelService } from './excel.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ExcelService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: []
  }));

  it('should be created', () => {
    const service: ExcelService = TestBed.get(ExcelService);
    expect(service).toBeTruthy();
  });
});
