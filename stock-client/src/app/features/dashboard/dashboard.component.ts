import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {AddStocksComponent} from '@features/dashboard/add-stocks/add-stocks.component';
import {TableCardsComponent} from '@shared/templates/table-cards/table-cards.component';
import {Stock} from '@models/stock';
import {User} from '@models/User';
import {UserService} from '@shared/services/user/user.service';
import {StocksService} from '@shared/services/stocks/stocks.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit, OnChanges {

  @ViewChild(AddStocksComponent, {static: false}) addStock: AddStocksComponent;
  @ViewChild(TableCardsComponent, {static: false}) deleteStock: TableCardsComponent;
  public stocks: Stock[];
  public total: number;
  public userInfo: User;
  public stockCount: number;
  constructor(private userService: UserService,
              private tokenService: TokenStorageService,
              private stockService: StocksService) { }

  ngOnInit() {
    this.getUserData();
  }

  ngOnChanges(): void {
    this.getUserData();
  }

  private getUserData() {
    if (this.userService.isUserLoggedIn()) {
      this.userInfo = this.tokenService.getUser();
      this.buildTableData();
    }
  }

  private buildTableData() {
    this.stockService.getAllStocks(this.userInfo.id).subscribe(stocks => {
      this.stocks = stocks;
      if (stocks && stocks.length > 0) {
        this.stockCount = stocks.length;
        this.stockService.getTotal().subscribe(total => this.total = total);
      }
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
}
