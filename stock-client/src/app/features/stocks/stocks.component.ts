import {Component, OnInit, ViewChild} from '@angular/core';
import {UserStockDetailsComponent} from '@features/stocks/user-stock-details/user-stock-details.component';
import {UserToken} from '@models/User';
import {forkJoin, Observable} from 'rxjs';
import {StockActivityInfo, StockInfo, StockPortfolio} from '@models/stock';
import {MenuTabs as menus} from '@models/menus';
import {MenuItem} from 'primeng';
import {AddUserStocksComponent} from '@features/stocks/add-user-stocks/add-user-stocks.component';
import {UserService} from '@shared/services/user/user.service';
import {UtilService} from '@shared/services/util/util.service';
import {ChartService} from '@shared/services/chart/chart.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {PortfolioService} from '@shared/services/portfolio/portfolio.service';
import {StockService} from '@shared/services/stock/stock.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.sass']
})
export class StocksComponent implements OnInit {

  @ViewChild(AddUserStocksComponent, {static: false}) addStocks: AddUserStocksComponent;
  @ViewChild(UserStockDetailsComponent, {static: false}) userStock: UserStockDetailsComponent;

  public text: string;
  public userInfo: UserToken;
  public activeItem: MenuItem;
  public items: MenuItem[];
  public stocks: StockInfo[];
  public innerSpinner: boolean;
  public portfolio: StockPortfolio;
  public stockActivities: StockActivityInfo[];
  public loader$: Observable<boolean> = this.utilService.getLoader();

  constructor(private userService: UserService,
              private utilService: UtilService,
              private chartService: ChartService,
              private stockService: StockService,
              private portfolioService: PortfolioService,
              private tokenService: TokenStorageService) { }

  ngOnInit() {
    this.getUserData();
  }

  private getUserData() {
    if (this.userService.isUserLoggedIn()) {
      this.userInfo = this.tokenService.getUserDetails();
      const { stockTabs } = menus;
      this.items = stockTabs;
      this.activeItem = this.items[0];
      this.utilService.showSpinner();
      this.calculateShareData();
    }
  }

  public tabChange(tab) {
    if (tab && tab.activeItem) {
      this.activeItem = tab.activeItem;
    }
  }

  onAddStocks() {
    this.calculateShareData();
  }

  onActionPerformed() {
    this.innerSpinner = true;
    this.calculateShareData();
  }

  calculateShareData() {
    forkJoin([
      this.stockService.getUserStocks(this.userInfo.id),
      this.stockService.getStockActivityData(this.userInfo.id),
      this.portfolioService.getStockPortfolio(this.userInfo.id)
    ])
      .subscribe(([shares, stockActivities, portfolio]) => {
        this.stocks = shares;
        this.stockActivities = stockActivities;
        this.portfolio = portfolio;
        this.innerSpinner = false;
        this.utilService.hideSpinner();
      });
  }
}
