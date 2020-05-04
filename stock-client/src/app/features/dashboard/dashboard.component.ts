import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {AddStocksComponent} from '@features/dashboard/dialogs/add-stocks/add-stocks.component';
import {UserToken} from '@models/User';
import {UserService} from '@shared/services/user/user.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {SharesService} from '@shared/services/shares/shares.service';
import {Portfolio, StockInfo} from '@models/stock';
import {forkJoin, Observable} from 'rxjs';
import {UtilService} from '@shared/services/util/util.service';
import {ChartService} from '@shared/services/chart/chart.service';
import {UserStockDetailsComponent} from '@features/dashboard/user-stock-details/user-stock-details.component';
import {PortfolioService} from '@shared/services/portfolio/portfolio.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit, OnChanges {

  @ViewChild(AddStocksComponent, {static: false}) addStock: AddStocksComponent;
  @ViewChild(UserStockDetailsComponent, {static: false}) userStock: UserStockDetailsComponent;

  public count: number;
  public shares: StockInfo[];
  public portfolio: Portfolio;
  public userInfo: UserToken;
  public text: string;
  public loader$: Observable<boolean> = this.utilService.getLoader();

  constructor(private userService: UserService,
              private utilService: UtilService,
              private chartService: ChartService,
              private shareService: SharesService,
              private portfolioService: PortfolioService,
              private tokenService: TokenStorageService,
              ) { }

  ngOnInit() {
    this.getUserData();
  }

  ngOnChanges(): void {
    this.getUserData();
  }

  private getUserData() {
    if (this.userService.isUserLoggedIn()) {
      this.userInfo = this.tokenService.getUserDetails();
      this.buildTableData();
    }
  }

  private buildTableData() {
    this.utilService.showSpinner();
    forkJoin([
      this.shareService.getShares(this.userInfo.id),
      this.portfolioService.getPortfolio(this.userInfo.id)
    ]).subscribe(([shares, portfolio]) => {
      this.shares = shares;
      this.count = shares.length;
      this.portfolio = portfolio;
      this.utilService.hideSpinner();
    });
  }

  onAddStocks() {
    this.buildTableData();
  }

  addStockPopup() {
    this.addStock.showDialog();
  }

  deletePortfolioPopup() {
    this.portfolioService.deletePortfolio(this.userInfo.id)
      .subscribe(() => {
        this.buildTableData();
      });
  }

  onActionPerformed() {
    this.buildTableData();
  }
}
