import {Component, Input, OnInit} from '@angular/core';
import {MessagesService} from '@shared/services/message/messages.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.less']
})
export class MessageComponent implements OnInit {

  @Input() severity: string;
  @Input() text: string;
  constructor(private messageService: MessagesService) { }

  ngOnInit() {
    this.messageService.emitMessage.subscribe();
  }

}
