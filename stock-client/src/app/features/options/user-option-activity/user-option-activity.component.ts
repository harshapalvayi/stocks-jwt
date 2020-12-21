import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuItem} from 'primeng';
import {UserToken} from '@models/User';
import {OptionActivityHeaders} from '@models/menus';
import {OptionActivityData} from '@models/optionsChainData';
import {UserService} from '@shared/services/user/user.service';
import {OptionsService} from '@shared/services/options/options.service';
import {AccountService} from '@shared/services/account/account.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';

@Component({
  selector: 'app-user-option-activity',
  templateUrl: './user-option-activity.component.html',
  styleUrls: ['./user-option-activity.component.sass']
})
export class UserOptionActivityComponent implements OnInit {

  @Output() action = new EventEmitter<string>();
  @Input() optionActivities: OptionActivityData[];
  public cols: any[];
  public items: MenuItem[];
  public userInfo: UserToken;

  constructor(private userService: UserService,
              private optionService: OptionsService,
              private accountService: AccountService,
              private tokenService: TokenStorageService) { }

  ngOnInit() {
    const { optionActivity } = OptionActivityHeaders;
    this.cols = optionActivity;
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
