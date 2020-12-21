import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Chart} from '@models/chart';

@Component({
  selector: 'app-line-cards',
  templateUrl: './line-cards.component.html',
  styleUrls: ['./line-cards.component.less']
})
export class LineCardsComponent implements OnInit, OnChanges {

  @Input() data: Chart;
  @Input() weeklyData: Chart;
  @Input() monthlyData: Chart;
  @Input() yearlyData: Chart;
  @Input() allData: Chart;
  @Input() type: string;
  public options: any;
  activeIndex: number;

  constructor() { }

  ngOnInit() {
    if (this.type === 'custom') {
      this.activeIndex = 0;
      this.data = this.weeklyData;
    }
    this.defaultChartOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.defaultChartOptions();
  }

  defaultChartOptions() {
    this.options = {
      elements: {
        line: {
          borderJoinStyle: 'round',
          tension: 0.5
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 10
        }
      },
      responsive: true,
      scales: {
        xAxes: [
          {
            ticks: {
              maxRotation: 90
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

  calculateData(event) {
    switch (event) {
      case 'week':
        this.activeIndex = 0;
        this.data = this.weeklyData;
        break;
      case 'month':
        this.activeIndex = 1;
        this.data = this.monthlyData;
        break;
      case 'year':
        this.activeIndex = 2;
        this.data = this.yearlyData;
        break;
      case 'all':
        this.activeIndex = 3;
        this.data = this.allData;
        break;
      default:
        this.activeIndex = 0;
        this.data = this.weeklyData;
    }
  }
}
