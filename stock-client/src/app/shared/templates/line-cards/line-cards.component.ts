import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Chart} from '@models/chart';

@Component({
  selector: 'app-line-cards',
  templateUrl: './line-cards.component.html',
  styleUrls: ['./line-cards.component.less']
})
export class LineCardsComponent implements OnInit, OnChanges {

  @Input() data: Chart;
  private options: any;
  constructor() { }

  ngOnInit() {
    this.defaultChartOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.defaultChartOptions();
  }

  defaultChartOptions() {
    this.options = {
      responsive: true,
      scales: {
        xAxes: [
          {
            ticks: {
              maxRotation: 90,
              minRotation: 45
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              type: 'linear',
              beginAtZero: false
            }
          }
        ],
        legend: {
          position: 'bottom'
        }
      }
    };
  }
}
