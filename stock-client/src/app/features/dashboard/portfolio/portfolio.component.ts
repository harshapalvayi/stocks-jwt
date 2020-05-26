import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Portfolio} from '@models/stock';
import {Chart} from '@models/chart';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.sass']
})
export class PortfolioComponent implements OnInit, OnChanges {

  @Input() public portfolio: Portfolio;
  @Input() public stocks: number;
  public position: Chart;
  public investment: Chart;
  public portfolioValue: Chart;
  public annualDividend: Chart;
  public status: string;
  constructor() { }

  ngOnInit() {
    this.buildData();
  }

  ngOnChanges(): void {
    this.buildData();
  }

  buildData() {
    let colors = [];
    let statusColor;
    let titleColor;
    const refColor = '#E0E0E0';
    if (this.portfolio &&
      this.portfolio.portfolio && this.portfolio.percentChange) {
      if (this.portfolio.investment) {
        statusColor = titleColor = '#0D8908';
        colors = [statusColor, refColor];
        this.investment = this.buildDataForChart(this.portfolio.investment,
          this.portfolio.investment * 0.25,
          colors, titleColor, '$');
      }
      if (this.portfolio.portfolio) {
        statusColor = titleColor = this.portfolio.portfolio > this.portfolio.investment ? '#0D8908' : '#DC1912';
        colors = [statusColor, refColor];
        this.portfolioValue = this.buildDataForChart(this.portfolio.portfolio,
          (this.portfolio.investment * 0.25) - this.portfolio.portfolio,
          colors, titleColor, '$');
      }
      if (this.portfolio.annualDividend) {
        statusColor = titleColor = '#0D8908';
        colors = [statusColor, refColor];
        this.annualDividend = this.buildDataForChart(this.portfolio.annualDividend,
          this.portfolio.annualDividend * 0.25,
          colors, titleColor, '$');
      }
      const percentChange = this.portfolio.percentChange;
      statusColor = titleColor = this.portfolio.portfolio > this.portfolio.investment ? '#0D8908' : '#DC1912';
      colors = [statusColor, refColor];
      this.position = this.buildDataForChart(percentChange, 100, colors, titleColor, '%');
    }
  }

  private buildDataForChart(actualValue, maxValue,  colors, titleColor, notation) {
    const datasets = [];
    const dataValues = [];
    const portfolioArray = [actualValue, Math.abs(maxValue)];

    portfolioArray.forEach(set =>  dataValues.push(set));

    if (dataValues && notation && colors) {
      datasets.push({
        backgroundColor: colors, hoverBackgroundColor: colors,
        data: dataValues,
        notation
      });
    }
    return { titleColor, datasets };
  }
}
