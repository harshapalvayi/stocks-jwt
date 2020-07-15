import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Portfolio, PortfolioHistory, StockInfo} from '@models/stock';
import {Chart} from '@models/chart';
import {PortfolioService} from '@shared/services/portfolio/portfolio.service';
import {OptionInfo} from '@models/options';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.sass']
})
export class PortfolioComponent implements OnInit, OnChanges {

  public status: string;
  @Input() public stocks: StockInfo[];
  @Input() public options: OptionInfo[];
  @Input() public portfolio: Portfolio;
  @Input() public portfolioHistory: PortfolioHistory;
  public position: Chart;
  public investment: Chart;
  public stockCount: number;
  public optionCount: number;
  public percentChange: number;
  public portfolioValue: Chart;
  public annualDividend: Chart;
  public portfolioData: Chart;

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

      if (this.stocks) {
        this.stockCount = this.stocks.length > 0 ? this.stocks.length : 0;
      }

      if (this.options) {
        this.optionCount = this.options.length > 0 ? this.options.length : 0;
      }
    }

    if (this.portfolioHistory) {
      this.portfolioData = this.portfolioService.buildPortFolioChart(this.portfolioHistory);
    }
  }
}
