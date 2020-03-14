import {Component, OnInit} from '@angular/core';
import {NotificationService} from '@shared/services/notification/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less']
})
export class NotificationComponent implements OnInit {

  constructor(private notify: NotificationService) { }

  ngOnInit() {
    this.notify.emitNotification.subscribe();
  }

}
