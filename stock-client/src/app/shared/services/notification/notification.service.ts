import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public emitNotification  = new Subject<any>();

  constructor(private messageService: MessageService) { }

  showSuccess(toastMessage) {
    const message = this.messageService.add({severity: 'success', summary: `${toastMessage.message}`, detail: `${toastMessage.details}`});
    this.emitNotification.next(message);
  }

  showInfo(toastMessage) {
    const message = this.messageService.add({severity: 'info', summary: `${toastMessage.message}`, detail: `${toastMessage.details}`});
    this.emitNotification.next(message);
  }

  showWarn(toastMessage) {
    const message = this.messageService.add({severity: 'warn', summary: `${toastMessage.message}`, detail: `${toastMessage.details}`});
    this.emitNotification.next(message);
  }

  showError(toastMessage) {
    const message = this.messageService.add({severity: 'error', summary: `${toastMessage.message}`, detail: `${toastMessage.details}`});
    this.emitNotification.next(message);
  }
}
