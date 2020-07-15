import {Component, OnChanges, OnInit} from '@angular/core';
import {UserToken} from '@models/User';
import {UserService} from '@shared/services/user/user.service';
import {UtilService} from '@shared/services/util/util.service';
import {ChartService} from '@shared/services/chart/chart.service';
import {SharesService} from '@shared/services/shares/shares.service';
import {OptionsService} from '@shared/services/options/options.service';
import {PortfolioService} from '@shared/services/portfolio/portfolio.service';
import {NotificationService} from '@shared/services/notification/notification.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {Portfolio, PortfolioHistory, StockInfo} from '@models/stock';
import {forkJoin, Observable} from 'rxjs';
import {OptionInfo} from '@models/options';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit, OnChanges {

  public text: string;
  public shares: StockInfo[];
  public options: OptionInfo[];
  public userInfo: UserToken;
  public portfolio: Portfolio;
  public portfolioHistory: PortfolioHistory;
  public loader$: Observable<boolean> = this.utilService.getLoader();

  constructor(private userService: UserService,
              private utilService: UtilService,
              private chartService: ChartService,
              private shareService: SharesService,
              private optionService: OptionsService,
              private tokenService: TokenStorageService,
              private portfolioService: PortfolioService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.getUserData();
  }

  ngOnChanges(): void {
    this.getUserData();
  }

  private getUserData() {
    if (this.userService.isUserLoggedIn()) {
      this.userInfo = this.tokenService.getUserDetails();
      this.buildTableData();
    }
  }

  private buildTableData() {
    this.utilService.showSpinner();
    forkJoin([
      this.shareService.getShares(this.userInfo.id),
      this.optionService.getOptions(this.userInfo.id),
      this.portfolioService.getPortfolio(this.userInfo.id),
      this.portfolioService.getPortfolioHistory(this.userInfo.id)
    ]).subscribe(([shares, options,  portfolio, portfolioHistory]) => {
      this.shares = shares;
      this.options = options;
      this.portfolio = portfolio;
      this.portfolioHistory = portfolioHistory;
      this.utilService.hideSpinner();
    });
  }

  deletePortfolioPopup() {
    this.portfolioService.deletePortfolio(this.userInfo.id)
      .subscribe(() => {
       this.portfolio = null;
       const toastDetails = {
          message: 'Success',
          details: 'Portfolio cleared Successfully'
       };
       this.notificationService.showSuccess(toastDetails);
      }, () => {
        const toastDetails = {
          message: 'Error',
          details: 'SomeThing went wrong'
        };
        this.notificationService.showError(toastDetails);
      });
  }

}
