import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {UserToken} from '@models/User';
import {BrokerageAccounts, OptionsHeaders} from '@models/menus';
import {TradeOptionsComponent} from '@features/options/dialogs/trade-options/trade-options.component';
import {DeleteOptionComponent} from '@features/options/dialogs/delete-option/delete-option.component';
import {MenuItem} from 'primeng';
import {OptionData} from '@models/optionsChainData';
import {UserService} from '@shared/services/user/user.service';
import {AccountService} from '@shared/services/account/account.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';

@Component({
  selector: 'app-user-options-details',
  templateUrl: './user-options-details.component.html',
  styleUrls: ['./user-options-details.component.sass']
})
export class UserOptionsDetailsComponent implements OnInit {

  @ViewChild(TradeOptionsComponent, {static: false}) trade: TradeOptionsComponent;
  @ViewChild(DeleteOptionComponent, {static: false}) delete: DeleteOptionComponent;
  @Input() options: OptionData[];
  @Output() action = new EventEmitter<string>();
  public cols: any[];
  public userInfo: UserToken;

  constructor(private userService: UserService,
              private accountService: AccountService,
              private tokenService: TokenStorageService) { }

  ngOnInit() {
    const { headers } = OptionsHeaders;
    this.cols = headers;
    if (this.userService.isUserLoggedIn()) {
      this.userInfo = this.tokenService.getUserDetails();
    }
  }

  getMenuItems(option: OptionData): MenuItem[] {
    const context = option;
    return [
      {label: 'Add', icon: 'pi pi-plus', command: () => { this.buyOption(context); }  },
      {label: 'Close', icon: 'pi pi-minus', command: () => { this.sellOption(context); } },
      {label: 'Link', icon: 'pi pi-external-link', command: () => { this.tradeOption(context); } },
      {label: 'Delete', icon: 'pi pi-times', command: () => { this.deleteOption(context); } }
    ];
  }

  onTradeOptions() {
    this.action.emit('saved');
  }

  onDeleteOptions() {
    this.action.emit('deleted');
  }

  buyOption(option: OptionData) {
    this.trade.showTradeDialog('buy', option);
  }

  sellOption(option: OptionData) {
    this.trade.showTradeDialog('sell', option);
  }

  tradeOption(option: OptionData) {
    if (option && option.account) {
      this.navigateToWebSite(option);
    } else {
      this.trade.showAccountTypeDialog(option);
    }
  }

  deleteOption(option) {
    this.delete.showDialog(option);
  }

  goToLink(link: string) {
    window.open(`https://finance.yahoo.com/quote/${link}`,  '_blank');
  }

  navigateToWebSite(option) {
    let reqUrl: {value: number, text: string, url: string};
    this.accountService.getAccounts().subscribe(accounts => {
      if (accounts) {
        reqUrl = this.findUrl(accounts, option);
        if (reqUrl && reqUrl.url) {
          window.open(reqUrl.url, '_blank');
        }
      }
    });
  }

  findUrl(accounts, option) {
    const exchange = option.stockExchange.toLowerCase();
    const ticker = option.ticker.toLowerCase();
    const reqUrl = accounts.find(({ value }) => value === option.account);
    if (reqUrl.text === BrokerageAccounts.ROBINHOOD ||
        reqUrl.text === BrokerageAccounts.YAHOOFINANCE) {
      reqUrl.url = `${reqUrl.url}${ticker}`;
    } else if (reqUrl.text === BrokerageAccounts.WEBULL) {
      reqUrl.url = `${reqUrl.url}${exchange}-${ticker}`;
    }
    return reqUrl;
  }

}
