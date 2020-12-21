import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Chart} from '@models/chart';
import {ChartService} from '@shared/services/chart/chart.service';

@Component({
  selector: 'app-semi-pie-cards',
  templateUrl: './semi-pie-cards.component.html',
  styleUrls: ['./semi-pie-cards.component.sass']
})
export class SemiPieCardsComponent implements OnInit, OnChanges {
  @ViewChild('chart', {static: false}) chart;
  @Input() public title: string;
  @Input() data: Chart;
  options: any;
  constructor(private chartService: ChartService) {}

  ngOnInit() {
    this.buildOptions();
  }

 ngOnChanges(changes: SimpleChanges): void {
   this.data = changes.data.currentValue;
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
        rotation: Math.PI,
        circumference: Math.PI,
        cutoutPercentage: 80,
      };
    }
  }

  public generateAnimations() {
      this.chartService.generateChartProperties(this.chart, this.data, 2, 1.4);
  }
}
