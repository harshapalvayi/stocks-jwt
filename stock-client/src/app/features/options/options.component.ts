import {Component, OnInit, ViewChild} from '@angular/core';
import {AddOptionsComponent} from '@features/options/dialogs/add-options/add-options.component';
import {Portfolio} from '@models/stock';
import {UserToken} from '@models/User';
import {forkJoin, Observable} from 'rxjs';
import {UserService} from '@shared/services/user/user.service';
import {UtilService} from '@shared/services/util/util.service';
import {ChartService} from '@shared/services/chart/chart.service';
import {OptionsService} from '@shared/services/options/options.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {MenuItem} from 'primeng';
import {MenuTabs as menus} from '@models/menus';
import {SearchOptionsComponent} from '@features/options/dialogs/search-options/search-options.component';
import {OptionHistoryInfo, OptionInfo} from '@models/options';

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
  public portfolio: Portfolio;
  public options: OptionInfo[];
  public innerSpinner: boolean;
  public history: OptionHistoryInfo[];
  public loader$: Observable<boolean> = this.utilService.getLoader();
  constructor(private userService: UserService,
              private utilService: UtilService,
              private chartService: ChartService,
              private optionService: OptionsService,
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

  private calculateOptionData() {
    forkJoin([
      this.optionService.getOptions(this.userInfo.id),
      this.optionService.getOptionHistory(this.userInfo.id)
    ])
      .subscribe(([options, history]) => {
        this.options = options;
        this.history = history;
        this.innerSpinner = false;
        this.utilService.hideSpinner();
      });
  }

  onAddOptions() {
    this.calculateOptionData();
  }

  onActionPerformed() {
    this.innerSpinner = true;
    this.calculateOptionData();
  }

}
