import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuItem} from 'primeng';
import {UserToken} from '@models/User';
import {forkJoin, Observable} from 'rxjs';
import {MenuTabs as menus} from '@models/menus';
import {OptionActivityData, OptionData, OptionPortfolio} from '@models/optionsChainData';
import {
  AddOptionsComponent
} from '@features/options/dialogs/add-options/add-options.component';
import {
  SearchOptionsComponent
} from '@features/options/dialogs/search-options/search-options.component';
import {UserService} from '@shared/services/user/user.service';
import {UtilService} from '@shared/services/util/util.service';
import {ChartService} from '@shared/services/chart/chart.service';
import {OptionsService} from '@shared/services/options/options.service';
import {PortfolioService} from '@shared/services/portfolio/portfolio.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.sass']
})
export class OptionsComponent implements OnInit {

  @ViewChild(AddOptionsComponent, {static: false}) addOptions: AddOptionsComponent;
  @ViewChild(SearchOptionsComponent, {static: false}) searchOptions: SearchOptionsComponent;

  public text: string;
  public items: MenuItem[];
  public userInfo: UserToken;
  public activeItem: MenuItem;
  public options: OptionData[];
  public innerSpinner: boolean;

  public portfolio: OptionPortfolio;
  public optionActivities: OptionActivityData[];
  public loader$: Observable<boolean> = this.utilService.getLoader();
  constructor(private userService: UserService,
              private utilService: UtilService,
              private chartService: ChartService,
              private optionService: OptionsService,
              private portfolioService: PortfolioService,
              private tokenService: TokenStorageService) { }

  ngOnInit() {
    this.getUserData();
  }

  private getUserData() {
    if (this.userService.isUserLoggedIn()) {
      this.userInfo = this.tokenService.getUserDetails();
      const { optionTabs } = menus;
      this.items = optionTabs;
      this.activeItem = this.items[0];
      this.utilService.showSpinner();
      this.calculateOptionData();
    }
  }

  public tabChange(tab) {
    if (tab && tab.activeItem) {
      this.activeItem = tab.activeItem;
    }
  }

  onAddOptions() {
    this.calculateOptionData();
  }

  onActionPerformed() {
    this.innerSpinner = true;
    this.calculateOptionData();
  }

  private calculateOptionData() {
    forkJoin([
      this.optionService.getOptionsData(this.userInfo.id),
      this.optionService.getOptionActivityData(this.userInfo.id),
      this.portfolioService.getOptionPortfolio(this.userInfo.id)
    ])
      .subscribe(([options, optionActivities, portfolio]) => {
        const count = options.length;
        this.options = options;
        this.optionActivities = optionActivities;
        this.portfolio = portfolio;
        this.innerSpinner = false;
        this.utilService.hideSpinner();
      });
  }
}
