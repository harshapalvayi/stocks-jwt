import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {FormBuilder, FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {PrimengModule} from '@shared/primeng.module';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      FormsModule
    ],
    providers: [
      UserService,
      FormBuilder,
      TokenStorageService
    ]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
