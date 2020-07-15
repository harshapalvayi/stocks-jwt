import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {UserToken} from '@models/User';
import {FormGroup} from '@angular/forms';
import {SelectItem} from 'primeng';
import {UserService} from '@shared/services/user/user.service';
import {OptionsService} from '@shared/services/options/options.service';
import {AccountService} from '@shared/services/account/account.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {SearchOptionsComponent} from '@features/options/dialogs/search-options/search-options.component';
import {OptionInfo, OptionFeed} from '@models/options';
import {OptionTypes as menus} from '@models/menus';
import {DateService} from '@shared/services/date/date.service';

@Component({
  selector: 'app-add-user-options',
  templateUrl: './add-user-options.component.html',
  styleUrls: ['./add-user-options.component.sass']
})
export class AddUserOptionsComponent implements OnInit {

  @ViewChild(SearchOptionsComponent, {static: false}) searchOptions: SearchOptionsComponent;
  @Output() saved = new EventEmitter<string>();

  public text: string;
  public types: SelectItem[];
  public userInfo: UserToken;
  public addOptions: FormGroup;
  public accounts: SelectItem[] = [];

  constructor(private userService: UserService,
              private dateService: DateService,
              private optionService: OptionsService,
              private accountService: AccountService,
              private tokenService: TokenStorageService) { }

  ngOnInit() {
    if (this.userService.isUserLoggedIn()) {
      this.userInfo = this.tokenService.getUserDetails();
      this.createForm();
      const { types } = menus;
      this.types = types;
      this.accountService.getAccounts().subscribe(accounts => {
        if (accounts) {
          accounts.forEach(account => {
            this.accounts.push({label: account.text, value: account.value});
          });
        }
      });
    }
  }

  searchOptionsPopup() {
    const ticker = this.addOptions.get('ticker').value;
    this.searchOptions.showDialog(ticker);
  }

  createForm() {
    this.addOptions = this.optionService.createAddOptions();
  }

  resetOption() {
    this.addOptions.reset();
  }

  onSearchOptions(option: OptionFeed) {
    this.processOptionData(option);
  }

  processOptionData(option) {
    if (option) {
      if (option.expire) {
        const date = this.convertTimestampToDate(option.expire);
        this.addOptions.get('expire').patchValue(new Date(date));
      }
      this.addOptions.get('strike').patchValue(option.strike);
      this.addOptions.get('type').patchValue(option.optionType);
      this.addOptions.get('optionPrice').patchValue(option.optionPrice);
    }
  }

  convertTimestampToDate(expiry) {
    if (expiry) {
      const date = new Date(expiry * 1000);
      let month = (date.getMonth() + 1).toString();
      month = month.length > 1 ? month : '0' + month;
      let day = (1 + date.getDate()).toString();
      day = day.length > 1 ? day : '0' + day;
      const year = date.getFullYear();
      return `${year}/${month}/${day}`;
    }
  }

  onSubmitOption() {
    const option = this.addOptions.getRawValue();
    if (option && this.userInfo && this.userInfo.id) {
      const optionData: OptionInfo = {
        userId: this.userInfo.id,
        optionType: option.type,
        ticker: option.ticker,
        expire: option.expire,
        tradeDate: option.tradeDate,
        account: option.brokerage,
        contracts: option.contracts,
        buyPrice: option.buyPrice,
        strikePrice: option.strike,
        optionPrice: option.optionPrice
      };
      this.optionService.save(optionData).subscribe(() => {
        this.saved.emit('saved');
        this.resetOption();
      });
    }
  }

}
