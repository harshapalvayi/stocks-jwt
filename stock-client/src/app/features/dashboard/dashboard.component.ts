import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {UserToken} from '@models/User';
import {forkJoin, Observable, Subscription, timer} from 'rxjs';
import {UserService} from '@shared/services/user/user.service';
import {UtilService} from '@shared/services/util/util.service';
import {ChartService} from '@shared/services/chart/chart.service';
import {PortfolioService} from '@shared/services/portfolio/portfolio.service';
import {NotificationService} from '@shared/services/notification/notification.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {PortfolioHistory, PortfolioData} from '@models/portfolio';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit, OnChanges, OnDestroy {

  public text: string;
  public userInfo: UserToken;
  public portfolio: PortfolioData;
  public allPortfolio: PortfolioData[];
  public weeklyPortfolio: PortfolioData[];
  public monthlyPortfolio: PortfolioData[];
  public yearlyPortfolio: PortfolioData[];
  public portfolioHistory: PortfolioHistory[];
  public observeStream$: Observable<any>;
  public subscription: Subscription;
  public loader$: Observable<boolean> = this.utilService.getLoader();

  constructor(private userService: UserService,
              private utilService: UtilService,
              private chartService: ChartService,
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
    this.observeStream$ = timer(5000, 25000)
      .pipe(
        switchMap(() => forkJoin([
          this.portfolioService.getTotalPortfolio(this.userInfo.id),
          this.portfolioService.getPortfolioHistory(this.userInfo.id)
        ])));
    this.subscription = this.observeStream$.subscribe(([portfolio, portfolioHistory]) => {
      this.portfolio = portfolio;
      this.portfolioHistory = portfolioHistory;
      this.utilService.hideSpinner();
    });

    forkJoin([
      this.portfolioService.getWeeklyData(this.userInfo.id),
      this.portfolioService.getMonthlyData(this.userInfo.id),
      this.portfolioService.getYearlyData(this.userInfo.id),
      this.portfolioService.getAllData(this.userInfo.id),
    ]).subscribe(([weekly, monthly, yearly, all]) => {
      this.weeklyPortfolio = weekly;
      this.monthlyPortfolio = monthly;
      this.yearlyPortfolio = yearly;
      this.allPortfolio = all;
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
