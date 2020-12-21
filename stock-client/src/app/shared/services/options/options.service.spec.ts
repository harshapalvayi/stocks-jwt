import { TestBed } from '@angular/core/testing';

import { OptionsService } from './options.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormBuilder, FormsModule} from '@angular/forms';
import {PrimengModule} from '@shared/primeng.module';

describe('OptionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      FormsModule,
      PrimengModule
    ],
    providers: [OptionsService, FormBuilder]
  }));

  it('should be created', () => {
    const service: OptionsService = TestBed.get(OptionsService);
    expect(service).toBeTruthy();
  });
});
