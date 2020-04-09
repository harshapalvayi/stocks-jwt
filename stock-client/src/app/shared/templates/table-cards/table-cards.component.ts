import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table-cards',
  templateUrl: './table-cards.component.html',
  styleUrls: ['./table-cards.component.sass']
})
export class TableCardsComponent implements OnInit {

  @Input() columns: any;
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
