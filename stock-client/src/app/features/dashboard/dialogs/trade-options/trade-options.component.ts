import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User, UserToken} from '@models/User';
import {AcctType, Option, OptionInfo, StockInfo} from '@models/stock';
import {FormGroup} from '@angular/forms';
import {UserService} from '@shared/services/user/user.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {OptionsService} from '@shared/services/options/options.service';
import {SelectItem} from 'primeng';
import {AccountService} from '@shared/services/account/account.service';

@Component({
  selector: 'app-trade-options',
  templateUrl: './trade-options.component.html',
  styleUrls: ['./trade-options.component.sass']
})
export class TradeOptionsComponent implements OnInit {

  @Output() saved = new EventEmitter<string>();
  public showFlag: boolean;
  public showAccountFlag: boolean;
  public tradeType: string;
  public userInfo: UserToken;
  public option: OptionInfo;
  public tradeOptions: FormGroup;
  public addAccountType: FormGroup;
  public accounts: SelectItem[] = [];

  constructor(private userService: UserService,
              private optionsService: OptionsService,
              private accountService: AccountService,
              private tokenService: TokenStorageService) { }

  ngOnInit() {
    if (this.userService.isUserLoggedIn()) {
      this.userInfo = this.tokenService.getUserDetails();
      this.createForm();
    }
  }

  createForm() {
    this.tradeOptions = this.optionsService.createTradeOptions();
    this.addAccountType = this.accountService.createAccountType();
  }

  showTradeDialog(trade: string, stock: StockInfo) {
    this.tradeType = trade;
    this.option = stock;
    this.showFlag = true;
  }

  resetStock() {
    this.tradeOptions.reset();
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

  showAccountTypeDialog(option: OptionInfo) {
    this.option = option;
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

  onTradeOption() {
    const option = this.tradeOptions.getRawValue();
    let optionData: Option;
    if (option && this.userInfo && this.userInfo.id) {
      const user = new User();
      user.userid = this.userInfo.id;
      if (this.tradeType === 'buy') {
        optionData = {
          optionid: this.option.optionid,
          ticker: this.option.ticker,
          buy: option.buy,
          contracts: option.contracts,
          userInfo: user
        };
      } else {
        optionData = {
          optionid: this.option.optionid,
          ticker: this.option.ticker,
          sell: option.sell,
          contracts: option.contracts,
          userInfo: user
        };
      }
      this.optionsService.trade(optionData).subscribe(() => {
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
        optionid: this.option.optionid,
        userid: this.userInfo.id,
        account: acctDetails.brokerage
      };
    }
    this.accountService.optionAcctType(acctData).subscribe(() => {
      this.saved.emit('saved');
      this.resetAcctType();
      this.showAccountFlag = false;
    });
  }
}
