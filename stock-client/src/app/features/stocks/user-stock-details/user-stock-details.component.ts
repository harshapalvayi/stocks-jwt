import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {StockInfo} from '@models/stock';
import {UserToken} from '@models/User';
import {BrokerageAccounts, StockHeaders} from '@models/menus';
import {TradeStockComponent} from '@features/stocks/dialogs/trade-stock/trade-stock.component';
import {DeleteStocksComponent} from '@features/stocks/dialogs/delete-stocks/delete-stocks.component';
import {MenuItem} from 'primeng';
import {StockService} from '@shared/services/stock/stock.service';
import {UserService} from '@shared/services/user/user.service';
import {AccountService} from '@shared/services/account/account.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';

@Component({
  selector: 'app-user-stock-details',
  templateUrl: './user-stock-details.component.html',
  styleUrls: ['./user-stock-details.component.sass']
})
export class UserStockDetailsComponent implements OnInit {

  @ViewChild(TradeStockComponent, {static: false}) trade: TradeStockComponent;
  @ViewChild(DeleteStocksComponent, {static: false}) delete: DeleteStocksComponent;

  @Input() stocks: StockInfo[];
  @Output() action = new EventEmitter<string>();

  public cols: any[];
  public items: MenuItem[];
  public userInfo: UserToken;

  constructor(private userService: UserService,
              private stockService: StockService,
              private accountService: AccountService,
              private tokenService: TokenStorageService) { }

  ngOnInit() {
    const { stocks } = StockHeaders;
    this.cols = stocks;
    if (this.userService.isUserLoggedIn()) {
      this.userInfo = this.tokenService.getUserDetails();
    }
  }

  getMenuItems(stock: StockInfo): MenuItem[] {
    const context = stock;
    return [
      {label: 'Add', icon: 'pi pi-plus', command: () => { this.buyStock(context); } },
      {label: 'Close', icon: 'pi pi-minus', command: () => { this.sellStock(context); } },
      {label: 'Link', icon: 'pi pi-external-link', command: () => { this.tradeStock(context); } },
      {label: 'Delete', icon: 'pi pi-times', command: () => { this.deleteStock(context); } }
    ];
  }

  onTradeStocks() {
    this.action.emit('saved');
  }

  onDeleteStocks() {
    this.action.emit('deleted');
  }

  buyStock(stock: StockInfo) {
    this.trade.showTradeDialog('buy', stock);
  }

  sellStock(stock: StockInfo) {
    this.trade.showTradeDialog('sell', stock);
  }

  deleteStock(stock: StockInfo) {
    this.delete.showDialog(stock);
  }

  tradeStock(stock: StockInfo) {
    if (stock && stock.account) {
      this.navigateToWebSite(stock);
    } else {
      this.trade.showAccountTypeDialog(stock);
    }
  }

  goToLink(link: string) {
    window.open(`https://finance.yahoo.com/quote/${link}`, '_blank');
  }

  navigateToWebSite(stock) {
    let reqUrl: {value: number, text: string, url: string};
    this.accountService.getAccounts().subscribe(accounts => {
      if (accounts) {
        reqUrl = this.findUrl(accounts, stock);
        if (reqUrl && reqUrl.url) {
          window.open(reqUrl.url, '_blank');
        }
      }
    });
  }

  findUrl(accounts, stock) {
    const exchange = stock.stockExchange.toLowerCase();
    const ticker = stock.ticker.toLowerCase();
    const reqUrl = accounts.find(({ value }) => value === stock.account);
    if (reqUrl.text === BrokerageAccounts.ROBINHOOD ||
        reqUrl.text === BrokerageAccounts.YAHOOFINANCE) {
      reqUrl.url = `${reqUrl.url}${ticker}`;
    } else if (reqUrl.text === BrokerageAccounts.WEBULL) {
      reqUrl.url = `${reqUrl.url}${exchange}-${ticker}`;
    }
    return reqUrl;
  }

  getPercentage(data) {
    return `${Number(data)}%`;
  }

  getStockName(name) {
    return this.stockService.chopStockName(name);
  }
}
