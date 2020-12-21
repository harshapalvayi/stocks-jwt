import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Chart} from '@models/chart';
import {PortfolioService} from '@shared/services/portfolio/portfolio.service';
import {PortfolioData, PortfolioHistory} from '@models/portfolio';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.sass']
})
export class PortfolioComponent implements OnInit, OnChanges {

  @Input() public portfolio: PortfolioData;
  @Input() public allPortfolio: PortfolioData[];
  @Input() public weeklyPortfolio: PortfolioData[];
  @Input() public monthlyPortfolio: PortfolioData[];
  @Input() public yearlyPortfolio: PortfolioData[];
  public status: string;
  public stockCount: number;
  public optionCount: number;
  public percentChange: number;
  public position: Chart;
  public investment: Chart;
  public monthlyData: Chart;
  public weeklyData: Chart;
  public yearlyData: Chart;
  public allData: Chart;
  public portfolioValue: Chart;
  public annualDividend: Chart;

  constructor(private portfolioService: PortfolioService) { }

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
    if (this.portfolio) {
      if (this.portfolio.investment) {
        statusColor = titleColor = '#0D8908';
        colors = [statusColor, refColor];
        this.investment = this.portfolioService
          .buildDataForChart(this.portfolio.investment,
          this.portfolio.investment * 0.25, colors, titleColor, '$');
      }
      if (this.portfolio.portfolio) {
        statusColor = titleColor =
          this.portfolio.portfolio > this.portfolio.investment ? '#0D8908' : '#DC1912';
        colors = [statusColor, refColor];
        this.portfolioValue = this.portfolioService
          .buildDataForChart(this.portfolio.portfolio,
            (this.portfolio.investment * 0.25) - this.portfolio.portfolio,
            colors, titleColor, '$');
      }

      if (this.portfolio.annualDividend) {
        statusColor = titleColor = '#0D8908';
        colors = [statusColor, refColor];
        this.annualDividend = this.portfolioService
          .buildDataForChart(this.portfolio.annualDividend,
            this.portfolio.annualDividend * 0.25, colors, titleColor, '$');
      }
      statusColor = titleColor =
        this.portfolio.portfolio > this.portfolio.investment ? '#0D8908' : '#DC1912';
      colors = [statusColor, refColor];

      if (this.portfolio.percentChange) {
        this.percentChange = this.portfolio.percentChange;
      }

      if (this.portfolio.position) {
        const status = this.portfolio.position;
        this.position = this.portfolioService
          .buildDataForChart(status, 100, colors, titleColor, '$');
      }

      if (this.portfolio.stocks) {
        this.stockCount = this.portfolio.stocks > 0 ? this.portfolio.stocks : 0;
      }

      if (this.portfolio.options) {
        this.optionCount = this.portfolio.options > 0 ? this.portfolio.options : 0;
      }
    }

    this.weeklyData = this.portfolioService.buildPortFolioChart(this.weeklyPortfolio, 0);
    this.monthlyData = this.portfolioService.buildPortFolioChart(this.monthlyPortfolio, 1);
    this.yearlyData = this.portfolioService.buildPortFolioChart(this.yearlyPortfolio, 0);
    this.allData = this.portfolioService.buildPortFolioChart(this.allPortfolio, 0);
  }
}
