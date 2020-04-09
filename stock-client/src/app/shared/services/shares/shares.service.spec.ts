import { TestBed } from '@angular/core/testing';

import { SharesService } from './shares.service';
import {FormBuilder, FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ShareService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [FormsModule, HttpClientTestingModule],
    providers: [FormBuilder]
  }));

  it('should be created', () => {
    const service: SharesService = TestBed.get(SharesService);
    expect(service).toBeTruthy();
  });
});
