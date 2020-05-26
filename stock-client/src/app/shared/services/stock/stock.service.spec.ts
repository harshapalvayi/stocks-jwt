import { TestBed } from '@angular/core/testing';

import { StockService } from './stock.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormBuilder, FormsModule} from '@angular/forms';
import {PrimengModule} from '@shared/primeng.module';

describe('StockService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, FormsModule, PrimengModule],
    providers: [StockService, FormBuilder]
  }));

  it('should be created', () => {
    const service: StockService = TestBed.get(StockService);
    expect(service).toBeTruthy();
  });
});
