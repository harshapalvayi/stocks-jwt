import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User, UserToken} from '@models/User';
import {FormGroup} from '@angular/forms';
import {UserService} from '@shared/services/user/user.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {Option} from '@models/stock';
import {OptionsService} from '@shared/services/options/options.service';
import {SelectItem} from 'primeng';
import {AccountService} from '@shared/services/account/account.service';

@Component({
  selector: 'app-add-options',
  templateUrl: './add-options.component.html',
  styleUrls: ['./add-options.component.sass']
})
export class AddOptionsComponent implements OnInit {

  @Output() saved = new EventEmitter<string>();

  public userInfo: UserToken;
  public addOptions: FormGroup;
  public showFlag: boolean;
  public text: string;
  public accounts: SelectItem[] = [];

  constructor(private userService: UserService,
              private optionService: OptionsService,
              private accountService: AccountService,
              private tokenService: TokenStorageService) { }

  ngOnInit() {
    if (this.userService.isUserLoggedIn()) {
      this.userInfo = this.tokenService.getUserDetails();
      this.createForm();
      this.accounts.push({label: 'select account', value: '', disabled: true});
      this.accountService.getAccounts().subscribe(accounts => {
        if (accounts) {
          accounts.forEach(account => {
            this.accounts.push({label: account.text, value: account.value});
          });
        }
      });
    }
  }

  createForm() {
     this.addOptions = this.optionService.createAddOptions();
  }

  resetOption() {
    this.addOptions.reset();
  }

  showDialog() {
    this.addOptions.get('brokerage').patchValue(this.accounts[0].value);
    this.showFlag = true;
  }

  onCancel() {
    this.resetOption();
    this.showFlag = false;
  }

  onSubmitOption() {
    const option = this.addOptions.getRawValue();
    if (option && this.userInfo && this.userInfo.id) {
      const user = new User();
      user.userid = this.userInfo.id;
      const optionData: Option = {
        ticker: option.ticker,
        buy: option.buy,
        contracts: option.contracts,
        userInfo: user,
        account: option.brokerage
      };
      this.optionService.save(optionData).subscribe(() => {
        this.saved.emit('saved');
        this.resetOption();
        this.showFlag = false;
      });
    }
  }

}
