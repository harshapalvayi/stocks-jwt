import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import {MessagesService} from '@shared/services/message/messages.service';
import {PrimengModule} from '@shared/primeng.module';

describe('NotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [PrimengModule],
    providers: [MessagesService]
  }));

  it('should be created', () => {
    const service: NotificationService = TestBed.get(NotificationService);
    expect(service).toBeTruthy();
  });
});
