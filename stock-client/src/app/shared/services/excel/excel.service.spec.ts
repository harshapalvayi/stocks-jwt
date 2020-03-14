import { TestBed } from '@angular/core/testing';

import { ExcelService } from './excel.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MessagesService} from '@shared/services/message/messages.service';
import {NotificationService} from '@shared/services/notification/notification.service';
import {StocksService} from '@shared/services/stocks/stocks.service';
import {PrimengModule} from '@shared/primeng.module';
import {FormBuilder, FormsModule} from '@angular/forms';

describe('ExcelService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, FormsModule, PrimengModule],
    providers: [MessagesService, NotificationService, StocksService, FormBuilder]
  }));

  it('should be created', () => {
    const service: ExcelService = TestBed.get(ExcelService);
    expect(service).toBeTruthy();
  });
});
