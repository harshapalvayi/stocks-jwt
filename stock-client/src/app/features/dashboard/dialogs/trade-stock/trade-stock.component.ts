import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {UserService} from '@shared/services/user/user.service';
import {SharesService} from '@shared/services/shares/shares.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {User, UserToken} from '@models/User';
import {AcctType, Share, StockInfo} from '@models/stock';
import {SelectItem} from 'primeng';
import {AccountService} from '@shared/services/account/account.service';

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
              private shareService: SharesService,
              private accountService: AccountService,
              private tokenService: TokenStorageService) { }

  ngOnInit() {
    if (this.userService.isUserLoggedIn()) {
      this.userInfo = this.tokenService.getUserDetails();
      this.createForm();
    }
  }

  createForm() {
    this.tradeStock = this.shareService.createTradeStock();
    this.addAccountType = this.accountService.createAccountType();
  }

  showTradeDialog(trade: string, stock: StockInfo) {
    this.tradeType = trade;
    this.stock = stock;
    if (this.tradeType === 'buy') {
      this.tradeStock.get('buy').patchValue(stock.price);
    } else {
      this.tradeStock.get('sell').patchValue(stock.price);
    }
    this.showFlag = true;
  }

  showAccountTypeDialog(stock: StockInfo) {
    this.stock = stock;
    this.accounts = [];
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

  onSubmitAcctType() {
    const acctDetails = this.addAccountType.getRawValue();
    let acctData: AcctType;
    if (acctDetails && this.userInfo && this.userInfo.id) {
      acctData = {
        shareid: this.stock.shareid,
        userid: this.userInfo.id,
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
