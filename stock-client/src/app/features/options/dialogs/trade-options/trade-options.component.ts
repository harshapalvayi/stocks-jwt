import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserToken} from '@models/User';
import {AcctType} from '@models/stock';
import {FormGroup} from '@angular/forms';
import {SelectItem} from 'primeng';
import {OptionData} from '@models/optionsChainData';
import {UserService} from '@shared/services/user/user.service';
import {OptionsService} from '@shared/services/options/options.service';
import {AccountService} from '@shared/services/account/account.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';

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
  public option: OptionData;
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

  showTradeDialog(trade: string, option: OptionData) {
    this.tradeType = trade;
    this.option = option;
    this.showFlag = true;
  }

  resetOption() {
    this.tradeOptions.reset();
  }

  resetAcctType() {
    this.addAccountType.reset();
  }

  onCancel() {
    this.resetOption();
    this.resetAcctType();
    this.showFlag = false;
    this.showAccountFlag = false;
  }

  showAccountTypeDialog(option: OptionData) {
    this.option = option;
    this.accounts = [];
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
    let optionData: OptionData;
    if (option && this.userInfo && this.userInfo.id) {
      if (this.tradeType === 'buy') {
        optionData = {
          userId: this.userInfo.id,
          optionId: this.option.optionId,
          ticker: this.option.ticker,
          expire: this.option.expire,
          optionPrice: this.option.optionPrice,
          optionType: this.option.optionType,
          buyPrice: option.buyPrice,
          contracts: option.contracts,
          tradeDate: option.tradeDate
        };
      } else {
        optionData = {
          userId: this.userInfo.id,
          optionId: this.option.optionId,
          ticker: this.option.ticker,
          expire: this.option.expire,
          optionPrice: this.option.optionPrice,
          optionType: this.option.optionType,
          sellPrice: option.sellPrice,
          contracts: option.contracts,
          tradeDate: option.tradeDate
        };
      }
      this.optionsService.trade(optionData).subscribe(() => {
        this.saved.emit('saved');
        this.resetOption();
        this.showFlag = false;
      });
    }
  }

  onSubmitAcctType() {
    const acctDetails = this.addAccountType.getRawValue();
    let acctData: AcctType;
    if (acctDetails && this.userInfo && this.userInfo.id) {
      acctData = {
        optionId: this.option.optionId,
        userId: this.userInfo.id,
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
