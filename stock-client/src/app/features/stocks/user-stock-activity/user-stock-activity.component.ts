import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuItem} from 'primeng';
import {UserToken} from '@models/User';
import {StockActivityInfo} from '@models/stock';
import {StockActivityHeaders} from '@models/menus';
import {UserService} from '@shared/services/user/user.service';
import {StockService} from '@shared/services/stock/stock.service';
import {AccountService} from '@shared/services/account/account.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';

@Component({
  selector: 'app-user-stock-activity',
  templateUrl: './user-stock-activity.component.html',
  styleUrls: ['./user-stock-activity.component.sass']
})
export class UserStockActivityComponent implements OnInit {

  @Input() stockActivities: StockActivityInfo[];
  @Output() action = new EventEmitter<string>();

  public cols: any[];
  public items: MenuItem[];
  public userInfo: UserToken;

  constructor(private userService: UserService,
              private stockService: StockService,
              private accountService: AccountService,
              private tokenService: TokenStorageService) { }

  ngOnInit() {
    const { stockActivity } = StockActivityHeaders;
    this.cols = stockActivity;
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
