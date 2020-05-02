import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {AddStocksComponent} from '@features/dashboard/add-stocks/add-stocks.component';
import {UserToken} from '@models/User';
import {UserService} from '@shared/services/user/user.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {SharesService} from '@shared/services/shares/shares.service';
import {Portfolio, StockInfo} from '@models/stock';
import {Observable} from 'rxjs';
import {UtilService} from '@shared/services/util/util.service';
import {ChartService} from "@shared/services/chart/chart.service";
import {UserStockDetailsComponent} from "@features/dashboard/user-stock-details/user-stock-details.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit, OnChanges {

  @ViewChild(AddStocksComponent, {static: false}) addStock: AddStocksComponent;
  @ViewChild(UserStockDetailsComponent, {static: false}) deleteStock: UserStockDetailsComponent;

  public count: number;
  public shares: StockInfo[];
  public portfolio: Portfolio;
  public userInfo: UserToken;
  public text: string;
  public loader$: Observable<boolean> = this.utilService.getLoader();

  constructor(private userService: UserService,
              private utilService: UtilService,
              private chartService: ChartService,
              private tokenService: TokenStorageService,
              private shareService: SharesService) { }

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
    this.shareService.getShares(this.userInfo.id).subscribe(shares => {
      this.shares =  shares;
      if (shares && shares.length > 0) {
        this.count = shares.length;
        this.shareService.getPortfolio(this.userInfo.id)
          .subscribe(portfolio =>  this.portfolio = portfolio);
      }
      this.utilService.hideSpinner();
    });
  }

  onDeleteStock() {
    this.buildTableData();
  }

  onAddStocks() {
    this.buildTableData();
  }

  addStockPopup() {
    this.addStock.showDialog();
  }

  onActionPerformed() {
    this.buildTableData();
  }
}
