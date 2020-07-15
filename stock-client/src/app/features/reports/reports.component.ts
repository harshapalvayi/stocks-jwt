import { Component, OnInit } from '@angular/core';
import {Chart} from '@models/chart';
import {UserToken} from '@models/User';
import {StockInfo} from '@models/stock';
import {UserService} from '@shared/services/user/user.service';
import {DateService} from '@shared/services/date/date.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {MenuTabs as menus, ReportTabs} from '@models/menus';
import {ChartService} from '@shared/services/chart/chart.service';
import {Dates} from '@models/dates';
import {forkJoin, Observable} from 'rxjs';
import {SharesService} from '@shared/services/shares/shares.service';
import {UtilService} from '@shared/services/util/util.service';
import {MenuItem} from 'primeng';

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
              private chartService: ChartService,
              private shareService: SharesService,
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
    const data: {user_id: number, date: Dates} = {
      user_id: this.userInfo.id, date
    };

    this.utilService.showSpinner();

    forkJoin([
      this.shareService.getShares(data.user_id),
      this.shareService.getMonthlyDividendShares(data),
      this.shareService.getAllDividendShares(data.user_id),
      this.shareService.getTopMovers(data.user_id)
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
