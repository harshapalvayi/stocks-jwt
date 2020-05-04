import { Component, OnInit } from '@angular/core';
import {Chart} from '@models/chart';
import {UserToken} from '@models/User';
import {StockInfo} from '@models/stock';
import {UserService} from '@shared/services/user/user.service';
import {DateService} from '@shared/services/date/date.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {MenuTabs as menus, Tabs} from '@models/menus';
import {ChartService} from '@shared/services/chart/chart.service';
import {Dates} from '@models/dates';
import {forkJoin, Observable} from 'rxjs';
import {SharesService} from '@shared/services/shares/shares.service';
import {UtilService} from '@shared/services/util/util.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.sass']
})
export class ReportsComponent implements OnInit {

  public tabs: Tabs;
  public selected = Tabs;
  public costVsEquity: Chart;
  public priceVsBuy: Chart;
  public dividends: Chart;
  public pieData: Chart;
  public userInfo: UserToken;
  public monthlyDividends: StockInfo[];
  public allDividends: StockInfo[];
  public topMovers: StockInfo[];
  public items: ({ label: string; value: Tabs, id: number })[];
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

  public tabChange(id) {
    if (id) {
      switch (id.index) {
        case 0:
          this.tabs = this.selected.TOTAL_PORTFOLIO;
          break;
        case 1:
          this.tabs = this.selected.PRICE_BUY;
          break;
        case 2:
          this.tabs = this.selected.COST_EQUITY;
          break;
        case 3:
          this.tabs = this.selected.DIVIDEND;
          break;
        case 4:
          this.tabs = this.selected.MONTHLY_DIVIDEND;
          break;
        case 5:
          this.tabs = this.selected.YEARLY_DIVIDEND;
          break;
        case 6:
          this.tabs = this.selected.TOP_MOVERS;
          break;
      }
    }
  }

  buildReportData() {
    const { reportTabs } = menus;
    this.items = reportTabs;
    this.tabs = this.selected.TOTAL_PORTFOLIO;
    const date  = this.dateService.getMonthDates();
    const data: {userid: number, date: Dates} = {
      userid: this.userInfo.id, date
    };
    this.utilService.showSpinner();

    forkJoin([
      this.shareService.getShares(data.userid),
      this.shareService.getMonthlyDividendShares(data),
      this.shareService.getAllDividendShares(data.userid),
      this.shareService.getTopMovers(data.userid)
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
