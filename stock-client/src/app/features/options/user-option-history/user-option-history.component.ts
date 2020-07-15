import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuItem} from 'primeng';
import {UserToken} from '@models/User';
import {StockHistoryInfo} from '@models/stock';
import {UserService} from '@shared/services/user/user.service';
import {AccountService} from '@shared/services/account/account.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {OptionsService} from '@shared/services/options/options.service';
import {OptionHistoryHeaders} from '@models/menus';

@Component({
  selector: 'app-user-option-history',
  templateUrl: './user-option-history.component.html',
  styleUrls: ['./user-option-history.component.sass']
})
export class UserOptionHistoryComponent implements OnInit {

  @Output() action = new EventEmitter<string>();
  public cols: any[];
  public items: MenuItem[];
  public userInfo: UserToken;
  @Input() history: StockHistoryInfo[];
  constructor(private userService: UserService,
              private optionService: OptionsService,
              private accountService: AccountService,
              private tokenService: TokenStorageService) { }

  ngOnInit() {
    const { optionHistory } = OptionHistoryHeaders;
    this.cols = optionHistory;
    if (this.userService.isUserLoggedIn()) {
      this.userInfo = this.tokenService.getUserDetails();
    }
  }

  goToLink(link: string) {
    window.open(`https://finance.yahoo.com/quote/${link}`, '_blank');
  }

  getPercentage(data) {
    return `${Number(data)}%`;
  }

  getStockName(name) {
    let stName: string;
    if (name) {
      if (name.length > 25) {
        stName = name.slice(0, 24);
      } else {
        stName = name;
      }
      return stName;
    }
  }
}
