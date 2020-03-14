import { Component, OnInit } from '@angular/core';
import {Chart} from '@models/chart';
import {User} from '@models/User';
import {Stock} from '@models/stock';
import {UserService} from '@shared/services/user/user.service';
import {StocksService} from '@shared/services/stocks/stocks.service';
import {DateService} from '@shared/services/date/date.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {MenuTabs as menus, Tabs} from '@models/menus';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.sass']
})
export class ReportsComponent implements OnInit {

  public tabs: Tabs;
  public cost: Chart;
  public price: Chart;
  public equity: Chart;
  public dividends: Chart;
  public selected = Tabs;
  public userInfo: User;
  public stocks: Stock[];
  public items: ({ label: string; value: Tabs, id: number })[];

  constructor(private dateService: DateService,
              private userService: UserService,
              private tokenService: TokenStorageService,
              private stocksService: StocksService) {}

  ngOnInit() {
    this.getUserData();
  }

  private getUserData() {
    if (this.userService.isUserLoggedIn()) {
      this.userInfo = this.tokenService.getUser();
      this.buildReportData();
    }
  }

  public tabChange(id) {
    if (id) {
      switch (id.index) {
        case 0:
          this.tabs = this.selected.PRICE;
          break;
        case 1:
          this.tabs = this.selected.COST;
          break;
        case 2:
          this.tabs = this.selected.EQUITY;
          break;
        case 3:
          this.tabs = this.selected.DIVIDEND;
          break;
        case 4:
          this.tabs = this.selected.MONTHLY_DIVIDEND;
          break;
      }
    }
  }

  buildReportData() {
    const { reportTabs } = menus;
    this.tabs = this.selected.PRICE;
    this.items = reportTabs;
    const date  = this.dateService.getDates();
    this.stocksService.getAllStocks(this.userInfo.id).subscribe(stocks => {
      this.buildPriceChart(stocks);
      this.buildCostChart(stocks);
      this.buildEquityChart(stocks);
      this.buildDividendChart(stocks);
    });
    this.stocksService.getDividendStocks(date).subscribe(stocks => {
      this.stocks = stocks;
    });
  }

  buildPriceChart(data) {
    const labels = [];
    const price = [];
    const datasets = [];
    if (data) {
      data.sort((a, b) => a.price - b.price);
      data.forEach(s => {
        labels.push(s.symbol);
        price.push(s.price);
      });
      datasets.push({
        label: 'Stock Price',
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        data: price
      });
    }
    this.price = { labels, datasets };
  }

  buildCostChart(data) {
    const labels = [];
    const cost = [];
    const datasets = [];
    if (data) {
      data.sort((a, b) => a.cost - b.cost);
      data.forEach(s => {
        labels.push(s.symbol);
        cost.push(s.cost);
      });
      datasets.push({
        label: 'Stock Cost',
        backgroundColor: '#FF7F50',
        borderColor: '#FF7F50',
        data: cost
      });
    }
    this.cost = { labels, datasets };
  }

  buildEquityChart(data) {
    const labels = [];
    const equity = [];
    const datasets = [];
    if (data) {
      data.sort((a, b) => a.equity - b.equity);
      data.forEach(s => {
        labels.push(s.symbol);
        equity.push(s.equity);
      });
      datasets.push({
        label: 'Stock Equity',
        backgroundColor: '#DAA520',
        borderColor: '#DAA520',
        data: equity
      });
    }
    this.equity = { labels, datasets };
  }

  buildDividendChart(data) {
    const labels = [];
    const dividend = [];
    const datasets = [];
    if (data) {
      data.sort((a, b) => a.dividend - b.dividend);
      data.forEach(s => {
        labels.push(s.symbol);
        if (s.dividend != null) {
          dividend.push(s.dividend);
        } else {
          dividend.push(0);
        }
      });
      datasets.push({
        label: 'Stock Dividend',
        backgroundColor: '#32CD32',
        borderColor: '#32CD32',
        data: dividend
      });
    }
    this.dividends = { labels, datasets };
  }

}
