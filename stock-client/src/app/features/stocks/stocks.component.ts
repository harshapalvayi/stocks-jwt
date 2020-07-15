import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '@shared/services/user/user.service';
import {UtilService} from '@shared/services/util/util.service';
import {ChartService} from '@shared/services/chart/chart.service';
import {SharesService} from '@shared/services/shares/shares.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {UserStockDetailsComponent} from '@features/stocks/user-stock-details/user-stock-details.component';
import {UserToken} from '@models/User';
import {forkJoin, Observable} from 'rxjs';
import {StockHistoryInfo, StockInfo} from '@models/stock';
import {MenuTabs as menus} from '@models/menus';
import {MenuItem} from 'primeng';
import {AddStocksComponent} from '@features/stocks/dialogs/add-stocks/add-stocks.component';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.sass']
})
export class StocksComponent implements OnInit {

  @ViewChild(AddStocksComponent, {static: false}) addStocks: AddStocksComponent;
  @ViewChild(UserStockDetailsComponent, {static: false}) userStock: UserStockDetailsComponent;

  public text: string;
  public activeItem: MenuItem;
  public userInfo: UserToken;
  public shares: StockInfo[];
  public history: StockHistoryInfo[];
  public items: MenuItem[];
  public innerSpinner: boolean;
  public loader$: Observable<boolean> = this.utilService.getLoader();

  constructor(private userService: UserService,
              private utilService: UtilService,
              private chartService: ChartService,
              private shareService: SharesService,
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

  onAddStocks() {
    this.calculateShareData();
  }

  addOptionsPopup() {
    this.addStocks.showDialog();
  }

  onActionPerformed() {
    this.innerSpinner = true;
    this.calculateShareData();
  }

  public tabChange(tab) {
    if (tab && tab.activeItem) {
      this.activeItem = tab.activeItem;
    }
  }

  calculateShareData() {
    forkJoin([
      this.shareService.getShares(this.userInfo.id),
      this.shareService.getShareHistory(this.userInfo.id)
    ])
      .subscribe(([shares, history]) => {
        this.shares = shares;
        this.history = history;
        console.log('shares', shares);
        console.log('history', history);
        this.innerSpinner = false;
        this.utilService.hideSpinner();
      });
  }

}
