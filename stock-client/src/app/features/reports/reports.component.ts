import { Component, OnInit } from '@angular/core';
import {Chart} from '@models/chart';
import {UserToken} from '@models/User';
import {StockInfo} from '@models/stock';
import {MenuTabs as menus, ReportTabs} from '@models/menus';
import {Dates} from '@models/dates';
import {forkJoin, Observable} from 'rxjs';

import {MenuItem} from 'primeng';
import {DateService} from '@shared/services/date/date.service';
import {UserService} from '@shared/services/user/user.service';
import {UtilService} from '@shared/services/util/util.service';
import {ChartService} from '@shared/services/chart/chart.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {StockService} from '@shared/services/stock/stock.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.sass']
})
export class ReportsComponent implements OnInit {

  public pieData: Chart;
  public items: MenuItem[];
  public dividends: Chart;
  public priceVsBuy: Chart;
  public costVsEquity: Chart;
  public userInfo: UserToken;
  public selected = ReportTabs;
  public activeItem: MenuItem;
  public topMovers: StockInfo[];
  public allDividends: StockInfo[];
  public monthlyDividends: StockInfo[];
  public loader$: Observable<boolean> = this.utilService.getLoader();

  constructor(private dateService: DateService,
              private userService: UserService,
              private utilService: UtilService,
              private stockService: StockService,
              private chartService: ChartService,
              private tokenService: TokenStorageService) {}

  ngOnInit() {
    this.getUserData();
  }

  private getUserData() {
    if (this.userService.isUserLoggedIn()) {
      this.userInfo = this.tokenService.getUserDetails();
      this.buildReportData();
    }
  }

  public tabChange(tab) {
    if (tab && tab.activeItem) {
      this.activeItem = tab.activeItem;
    }
  }

  buildReportData() {
    const { reportTabs } = menus;
    this.items = reportTabs;
    this.activeItem = this.items[0];
    const date  = this.dateService.getMonthDates();
    const data: {userId: number, date: Dates} = {
      userId: this.userInfo.id, date
    };

    this.utilService.showSpinner();

    forkJoin([
      this.stockService.getUserStocks(data.userId),
      this.stockService.getMonthlyDividendShares(data),
      this.stockService.getAllDividendShares(data.userId),
      this.stockService.getTopMovers(data.userId)
    ]).subscribe(([shares, monthly, yearly, topMovers]) => {
      this.priceVsBuy = this.chartService.buildPriceVsBuyChart(shares);
      this.costVsEquity = this.chartService.buildCostVsEquityChart(shares);
      this.dividends = this.chartService.buildDividendChart(shares);
      this.pieData = this.chartService.buildEquityPortfolio(shares);
      this.monthlyDividends = monthly;
      this.allDividends = yearly;
      this.topMovers = topMovers;
      this.utilService.hideSpinner();
    });
  }

}
