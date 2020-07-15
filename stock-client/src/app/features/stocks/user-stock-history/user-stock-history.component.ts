import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuItem} from 'primeng';
import {UserToken} from '@models/User';
import {StockHistoryInfo} from '@models/stock';
import {UserService} from '@shared/services/user/user.service';
import {SharesService} from '@shared/services/shares/shares.service';
import {AccountService} from '@shared/services/account/account.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {StockHistoryHeaders} from '@models/menus';
import {StockService} from '@shared/services/stock/stock.service';

@Component({
  selector: 'app-user-stock-history',
  templateUrl: './user-stock-history.component.html',
  styleUrls: ['./user-stock-history.component.sass']
})
export class UserStockHistoryComponent implements OnInit {

  @Output() action = new EventEmitter<string>();
  public cols: any[];
  public items: MenuItem[];
  public userInfo: UserToken;
  @Input() history: StockHistoryInfo[];

  constructor(private userService: UserService,
              private stockService: StockService,
              private shareService: SharesService,
              private accountService: AccountService,
              private tokenService: TokenStorageService) { }

  ngOnInit() {
    const { stockHistory } = StockHistoryHeaders;
    this.cols = stockHistory;
    if (this.userService.isUserLoggedIn()) {
      this.userInfo = this.tokenService.getUserDetails();
    }
  }

  goToLink(link: string) {
    window.open(`https://finance.yahoo.com/quote/${link}`, '_blank');
  }

  getPercentage(data) {
    return `${Number(data)}%`;
  }

  getStockName(name) {
    return this.stockService.chopStockName(name);
  }
}
