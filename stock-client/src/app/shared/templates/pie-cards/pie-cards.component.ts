import {Component, Input, OnInit} from '@angular/core';
import {Chart} from '@models/chart';

@Component({
  selector: 'app-pie-cards',
  templateUrl: './pie-cards.component.html',
  styleUrls: ['./pie-cards.component.sass']
})
export class PieCardsComponent implements OnInit {

  @Input() data: Chart;
  public options: any;
  constructor() {
    this.options = {
      responsive: true,
      innerRadius: 60,
      indexLabelFontSize: 17,
      legend: {
        display: false
      }
    };
  }

  ngOnInit() {
  }

}
