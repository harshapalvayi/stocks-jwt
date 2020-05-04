import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {StockInfo} from '@models/stock';
import {UserService} from '@shared/services/user/user.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {SharesService} from '@shared/services/shares/shares.service';
import {UserToken} from '@models/User';
import {StockHeaders} from '@models/menus';
import {TradeStockComponent} from '@features/dashboard/dialogs/trade-stock/trade-stock.component';

@Component({
  selector: 'app-user-stock-details',
  templateUrl: './user-stock-details.component.html',
  styleUrls: ['./user-stock-details.component.sass']
})
export class UserStockDetailsComponent implements OnInit {

  @ViewChild(TradeStockComponent, {static: false}) trade: TradeStockComponent;
  @Output() action = new EventEmitter<string>();
  @Input() shares: StockInfo[];
  public userInfo: UserToken;
  public cols: any[];

  constructor(private userService: UserService,
              private shareService: SharesService,
              private tokenService: TokenStorageService) { }

  ngOnInit() {
    const { headers } = StockHeaders;
    this.cols = headers;
    if (this.userService.isUserLoggedIn()) {
      this.userInfo = this.tokenService.getUserDetails();
    }
  }

  onTradeStocks() {
    this.action.emit('saved');
  }

  buyStock(stock: StockInfo) {
    this.trade.showTradeDialog('buy', stock);
  }

  sellStock(stock: StockInfo) {
    this.trade.showTradeDialog('sell', stock);
  }

  getPercentage(data) {
    return `${Number(data)}%`;
  }
}
