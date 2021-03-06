import {Component, Input, OnInit} from '@angular/core';
import {Chart} from '@models/chart';

@Component({
  selector: 'app-bar-cards',
  templateUrl: './bar-cards.component.html',
  styleUrls: ['./bar-cards.component.less']
})
export class BarCardsComponent implements OnInit {

  @Input() data: Chart;
  options: any;
  constructor() {
    this.options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };
  }

  ngOnInit() {
  }

}
