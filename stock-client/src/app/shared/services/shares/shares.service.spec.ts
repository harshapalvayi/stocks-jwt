import { TestBed } from '@angular/core/testing';

import { SharesService } from './shares.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormBuilder, FormsModule} from '@angular/forms';
import {PrimengModule} from '@shared/primeng.module';

describe('SharesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, FormsModule, PrimengModule],
    providers: [SharesService, FormBuilder]
  }));

  it('should be created', () => {
    const service: SharesService = TestBed.get(SharesService);
    expect(service).toBeTruthy();
  });
});
