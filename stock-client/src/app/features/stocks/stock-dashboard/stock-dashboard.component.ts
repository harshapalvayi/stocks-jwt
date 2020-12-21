import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Observable} from 'rxjs';
import {UtilService} from '@shared/services/util/util.service';
import {StockInfo, StockPortfolio} from '@models/stock';
import {Chart} from '@models/chart';
import {PortfolioService} from '@shared/services/portfolio/portfolio.service';

@Component({
  selector: 'app-stock-dashboard',
  templateUrl: './stock-dashboard.component.html',
  styleUrls: ['./stock-dashboard.component.sass']
})
export class StockDashboardComponent implements OnInit, OnChanges {

  @Output() action = new EventEmitter<string>();
  @Input() public portfolio: StockPortfolio;
  public position: Chart;
  public investment: Chart;
  public optionValue: Chart;
  public stockCount: number;
  public annualDividend: number;
  public shares: StockInfo[];
  public percentChange: number;
  public loader$: Observable<boolean> = this.utilService.getLoader();

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
      let refColor;
      let titleColor;
      let statusColor;
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
        (this.portfolio.portfolio).toFixed(2),
        this.portfolio.portfolio * 0.25,
        colors,
        titleColor,
        '$');

      statusColor = this.portfolio.position > 0 ? '#0D8908' : '#DC1912';
      this.position = this.portfolioService.buildDataForChart(
       this.portfolio.position.toFixed(2),
        100,
        [statusColor, refColor],
        statusColor,
        '$');

      this.percentChange = this.portfolio.percentChange;
      this.stockCount = this.portfolio.stocks;
      this.annualDividend = this.portfolio.annualDividend;
    }
  }
}
