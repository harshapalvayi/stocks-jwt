import { TestBed } from '@angular/core/testing';

import { ExcelService } from './excel.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MessagesService} from '@shared/services/message/messages.service';
import {NotificationService} from '@shared/services/notification/notification.service';
import {PrimengModule} from '@shared/primeng.module';
import {FormBuilder, FormsModule} from '@angular/forms';
import {SharesService} from '@shared/services/shares/shares.service';

describe('ExcelService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, FormsModule, PrimengModule],
    providers: [MessagesService, NotificationService, SharesService, FormBuilder]
  }));

  it('should be created', () => {
    const service: ExcelService = TestBed.get(ExcelService);
    expect(service).toBeTruthy();
  });
});
