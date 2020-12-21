import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {OptionPortfolio} from '@models/optionsChainData';
import {Chart} from '@models/chart';
import {UtilService} from '@shared/services/util/util.service';
import {PortfolioService} from '@shared/services/portfolio/portfolio.service';

@Component({
  selector: 'app-option-dashboard',
  templateUrl: './option-dashboard.component.html',
  styleUrls: ['./option-dashboard.component.sass']
})
export class OptionDashboardComponent implements OnInit, OnChanges {

  @Input() public portfolio: OptionPortfolio;
  public investment: Chart;
  public position: Chart;
  public optionValue: Chart;
  public optionCount: number;
  public percentChange: number;
  constructor(private utilService: UtilService,
              private portfolioService: PortfolioService) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.portfolio = changes.portfolio.currentValue;
    this.buildData();
  }


  buildData() {
    if (this.portfolio) {
      let colors = [];
      let statusColor;
      let refColor;
      let titleColor;
      refColor = '#D3D3D3';
      statusColor = titleColor = '#0D8908';
      colors = [statusColor, refColor];
      this.investment = this.portfolioService.buildDataForChart(
                        this.portfolio.investment,
               this.portfolio.investment * 0.25,
                        colors,
                        titleColor,
                '$');

      this.optionValue = this.portfolioService.buildDataForChart(
                         this.portfolio.portfolio,
                this.portfolio.portfolio * 0.25,
                         colors,
                         titleColor,
                  '$');

      statusColor = this.portfolio.position > 0 ? '#0D8908' : '#DC1912';
      this.position = this.portfolioService.buildDataForChart(
                          Math.abs(this.portfolio.position),
                  100,
                          [statusColor, refColor],
                          statusColor,
                   '$');

      this.percentChange = this.portfolio.percentChange;

      this.optionCount = this.portfolio.options;
    }
  }
}
