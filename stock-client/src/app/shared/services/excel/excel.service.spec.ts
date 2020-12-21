import { TestBed } from '@angular/core/testing';

import { ExcelService } from './excel.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MessagesService} from '@shared/services/message/messages.service';
import {NotificationService} from '@shared/services/notification/notification.service';
import {PrimengModule} from '@shared/primeng.module';
import {FormBuilder, FormsModule} from '@angular/forms';
import {StockService} from '@shared/services/stock/stock.service';

describe('ExcelService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      FormsModule,
      PrimengModule,
      HttpClientTestingModule
    ],
    providers: [
      FormBuilder,
      StockService,
      MessagesService,
      NotificationService
    ]
  }));

  it('should be created', () => {
    const service: ExcelService = TestBed.get(ExcelService);
    expect(service).toBeTruthy();
  });
});
