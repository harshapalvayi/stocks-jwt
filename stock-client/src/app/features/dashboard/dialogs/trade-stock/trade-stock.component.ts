import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {UserService} from '@shared/services/user/user.service';
import {SharesService} from '@shared/services/shares/shares.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {User, UserToken} from '@models/User';
import {Share, StockInfo} from '@models/stock';

@Component({
  selector: 'app-trade-stock',
  templateUrl: './trade-stock.component.html',
  styleUrls: ['./trade-stock.component.sass']
})
export class TradeStockComponent implements OnInit {

  @Output() saved = new EventEmitter<string>();
  public showFlag: boolean;
  public tradeType: string;
  public userInfo: UserToken;
  public stock: StockInfo;
  public tradeStock: FormGroup;
  constructor(private userService: UserService,
              private shareService: SharesService,
              private tokenService: TokenStorageService) { }

  ngOnInit() {
    if (this.userService.isUserLoggedIn()) {
      this.userInfo = this.tokenService.getUserDetails();
      this.createForm();
    }
  }

  createForm() {
    this.tradeStock = this.shareService.createTradeStock();
  }

  showTradeDialog(trade: string, stock: StockInfo) {
    this.tradeType = trade;
    this.stock = stock;
    this.showFlag = true;
  }

  resetStock() {
    this.tradeStock.reset();
  }

  onCancel() {
    this.resetStock();
    this.showFlag = false;
  }

  onTradeStock() {
    const stock = this.tradeStock.getRawValue();
    let shareData: Share;
    if (stock && this.userInfo && this.userInfo.id) {
      const user = new User();
      user.userid = this.userInfo.id;
      if (this.tradeType === 'buy') {
         shareData = {
           shareid: this.stock.shareid,
           ticker: this.stock.ticker,
           buy: stock.buy,
           shares: stock.shares,
           userInfo: user
        };
      } else {
        shareData = {
          shareid: this.stock.shareid,
          ticker: this.stock.ticker,
          sell: stock.sell,
          shares: stock.shares,
          userInfo: user
        };
      }
      this.shareService.trade(shareData).subscribe(() => {
        this.saved.emit('saved');
        this.resetStock();
        this.showFlag = false;
      });
    }
  }

}
