import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {User, UserToken} from '@models/User';
import {AcctType, Stock, StockInfo} from '@models/stock';
import {SelectItem} from 'primeng';
import {ToastDetails} from '@models/Notification';
import {UserService} from '@shared/services/user/user.service';
import {AccountService} from '@shared/services/account/account.service';
import {NotificationService} from '@shared/services/notification/notification.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {StockService} from '@shared/services/stock/stock.service';

@Component({
  selector: 'app-trade-stock',
  templateUrl: './trade-stock.component.html',
  styleUrls: ['./trade-stock.component.sass']
})
export class TradeStockComponent implements OnInit {

  @Output() saved = new EventEmitter<string>();
  public showFlag: boolean;
  public showAccountFlag: boolean;
  public tradeType: string;
  public userInfo: UserToken;
  public stock: StockInfo;
  public tradeStock: FormGroup;
  public addAccountType: FormGroup;
  public accounts: SelectItem[] = [];

  constructor(private userService: UserService,
              private stockService: StockService,
              private accountService: AccountService,
              private notification: NotificationService,
              private tokenService: TokenStorageService) { }

  ngOnInit() {
    if (this.userService.isUserLoggedIn()) {
      this.userInfo = this.tokenService.getUserDetails();
      this.createForm();
    }
  }

  createForm() {
    this.tradeStock = this.stockService.createTradeStock();
    this.addAccountType = this.accountService.createAccountType();
  }

  showTradeDialog(trade: string, stock: StockInfo) {
    this.tradeType = trade;
    this.stock = stock;
    if (this.tradeType === 'buy') {
      this.tradeStock.get('buyPrice').patchValue(stock.marketPrice);
    } else {
      this.tradeStock.get('sellPrice').patchValue(stock.marketPrice);
    }
    this.showFlag = true;
  }

  showAccountTypeDialog(stock: StockInfo) {
    this.accounts = [];
    this.stock = stock;
    this.accounts.push({label: 'select account', value: '', disabled: true});
    this.accountService.getAccounts().subscribe(accounts => {
      if (accounts) {
        accounts.forEach(account => {
          this.accounts.push({label: account.text, value: account.value});
        });
      }
    });
    this.addAccountType.get('brokerage').patchValue(this.accounts[0].value);
    this.showAccountFlag = true;
  }

  resetStock() {
    this.tradeStock.reset();
  }

  resetAcctType() {
    this.addAccountType.reset();
  }

  onCancel() {
    this.resetStock();
    this.resetAcctType();
    this.showFlag = false;
    this.showAccountFlag = false;
  }

  onTradeStock() {
    const stock = this.tradeStock.getRawValue();
    let shareData: Stock;
    if (stock && this.userInfo && this.userInfo.id) {
      const user = new User();
      user.userid = this.userInfo.id;
      if (this.tradeType === 'buy') {
         shareData = {
           stockId: this.stock.stockId,
           ticker: this.stock.ticker,
           buyPrice: stock.buyPrice,
           shares: stock.shares,
           tradeDate: stock.tradeDate,
           user
        };
      } else {
        shareData = {
          stockId: this.stock.stockId,
          ticker: this.stock.ticker,
          sellPrice: stock.sellPrice,
          shares: stock.shares,
          tradeDate: stock.tradeDate,
          user
        };
      }
      this.stockService.trade(shareData).subscribe(() => {
        let toastDetails: ToastDetails;
        this.saved.emit('saved');
        if (shareData.buyPrice) {
           toastDetails = {
            message: 'Success',
            details: `Your order to Buy ${shareData.shares} of ${shareData.ticker}
                    has been saved at an average price of ${shareData.buyPrice}`
          };
        } else {
          toastDetails = {
            message: 'Success',
            details: `Your order to Sell ${shareData.shares} of ${shareData.ticker}
                    has been saved at an average price of ${shareData.buyPrice}`
          };
        }
        this.notification.showSuccess(toastDetails);
        this.resetStock();
        this.showFlag = false;
      });
    }
  }

  onSubmitAcctType() {
    const acctDetails = this.addAccountType.getRawValue();
    let acctData: AcctType;
    if (acctDetails && this.userInfo && this.userInfo.id) {
      acctData = {
        stockId: this.stock.stockId,
        userId: this.userInfo.id,
        account: acctDetails.brokerage
      };
    }
    this.accountService.shareAcctType(acctData).subscribe(() => {
      this.saved.emit('saved');
      this.resetAcctType();
      this.showAccountFlag = false;
    });
  }

}
