import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Chart} from '@models/chart';
import {ChartService} from '@shared/services/chart/chart.service';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.sass']
})
export class DoughnutChartComponent implements OnInit {

  @ViewChild('chart', {static: false}) chart;
  @Input() public title: string;
  @Input() data: Chart;
  options: any;
  constructor(private chartService: ChartService) {}

  ngOnInit() {
    this.buildOptions();
  }

  buildOptions() {
    if (this.data) {
      this.options = {
        legend: {
          display: false
        },
        title: {
          display: true,
          fontSize: 20,
          fontStyle: 'bold',
          fontColor: this.data.titleColor,
          fontFamily: 'Helvetica',
          position: 'top',
          text: `${this.title}`
        },
        animation: {
          onComplete: () => {  this.generateAnimations();  }
        },
        events: [],
        tooltips: { enabled: false },
        cutoutPercentage: 75,
      };
    }
  }

  public generateAnimations() {
    setTimeout(() => {
      this.chartService.generateChartProperties(this.chart, this.data, 2, 1.6);
    });
  }
}
