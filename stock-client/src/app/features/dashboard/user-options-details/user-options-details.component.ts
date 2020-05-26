import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {UserToken} from '@models/User';
import {OptionInfo, StockInfo} from '@models/stock';
import {UserService} from '@shared/services/user/user.service';
import {SharesService} from '@shared/services/shares/shares.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {OptionsHeaders} from '@models/menus';
import {TradeOptionsComponent} from '@features/dashboard/dialogs/trade-options/trade-options.component';
import {AccountService} from '@shared/services/account/account.service';

@Component({
  selector: 'app-user-options-details',
  templateUrl: './user-options-details.component.html',
  styleUrls: ['./user-options-details.component.sass']
})
export class UserOptionsDetailsComponent implements OnInit {

  @ViewChild(TradeOptionsComponent, {static: false}) trade: TradeOptionsComponent;
  @Output() action = new EventEmitter<string>();
  @Input() options: OptionInfo[];
  public userInfo: UserToken;
  public cols: any[];

  constructor(private userService: UserService,
              private accountService: AccountService,
              private shareService: SharesService,
              private tokenService: TokenStorageService) { }

  ngOnInit() {
    const { headers } = OptionsHeaders;
    this.cols = headers;
    if (this.userService.isUserLoggedIn()) {
      this.userInfo = this.tokenService.getUserDetails();
    }
  }

  onTradeOptions() {
    this.action.emit('saved');
  }

  buyOption(stock: StockInfo) {
    this.trade.showTradeDialog('buy', stock);
  }

  sellOption(stock: StockInfo) {
    this.trade.showTradeDialog('sell', stock);
  }

  tradeOption(option: OptionInfo) {
    if (option && option.account) {
      this.navigateToWebSite(option.account);
    } else {
      this.trade.showAccountTypeDialog(option);
    }
  }

  goToLink(link: string) {
    window.open(`https://finance.yahoo.com/quote/${link}`,  '_blank');
  }

  navigateToWebSite(accountNo: number) {
    let accountsInfo: any;
    let reqUrl: {value: number, text: string, url: string};
    this.accountService.getAccounts().subscribe(accounts => {
      if (accounts) {
        accountsInfo = accounts;
        reqUrl = accountsInfo.find(({ value }) => value === accountNo);
        if (reqUrl && reqUrl.url) {
          window.open(reqUrl.url, '_blank');
        }
      }
    });
  }

}
