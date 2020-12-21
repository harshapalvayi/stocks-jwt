import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormBuilder, FormsModule} from '@angular/forms';
import {PrimengModule} from '@shared/primeng.module';

describe('AccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      PrimengModule,
      FormsModule,
      HttpClientTestingModule
    ],
    providers: [AccountService, FormBuilder]
  }));

  it('should be created', () => {
    const service: AccountService = TestBed.get(AccountService);
    expect(service).toBeTruthy();
  });
});
