import { Component, OnInit } from '@angular/core';
import {UserToken} from '@models/User';
import {CustomStockInfo, StockHistory, StockInfo} from '@models/stock';
import {UserService} from '@shared/services/user/user.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {SharesService} from '@shared/services/shares/shares.service';
import {DateService} from '@shared/services/date/date.service';
import {ChartService} from '@shared/services/chart/chart.service';
import {Observable} from 'rxjs';
import {UtilService} from '@shared/services/util/util.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {

  public userInfo: UserToken;
  public shares: StockInfo[];
  public stockHistory: StockHistory[] = [];
  public loader$: Observable<boolean> = this.utilService.getLoader();

  constructor(private dateService: DateService,
              private chartService: ChartService,
              private utilService: UtilService,
              private userService: UserService,
              private shareService: SharesService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.getUserInfo();
  }

  private getUserInfo() {
    if (this.userService.isUserLoggedIn()) {
      this.utilService.showSpinner();
      this.userInfo = this.tokenStorageService.getUserDetails();
      this.shareService.getShares(this.userInfo.id).subscribe(shares => {
        this.shares =  shares;
        this.calculateShareHistoryData();
      });
    }
  }

  private calculateShareHistoryData() {
    this.shareService.getStockHistory(this.userInfo.id).subscribe(shareHistory => {
      let shareid: number;
      shareHistory.forEach(share => {
        shareid = share.shareid;
        if (share && share.history)  {
          const history  = share.history;
          const shareInfo: StockInfo = this.shares.find(stock => stock.stockName === share.stockName);
          const chartData = this.chartService.buildStockHistory(history, shareInfo);
          const data: CustomStockInfo = {
            userid: share.userid,
            shareid,
            stockName: share.stockName,
            price: this.getPrice(shareid),
            buy: this.getBuy(shareid),
            cost: this.getCost(shareid),
            equity: this.getEquity(shareid),
            history: chartData
          };
          this.stockHistory.push(data);
        }
      });
      this.utilService.hideSpinner();
    });
  }

  private getBuy(id): number {
    let buy = 0;
    if (this.shares && this.shares.length > 0) {
      buy = this.shares.find(share => share.shareid === id).buy;
    }
    return buy;
  }

  private getPrice(id): number {
    let price = 0;
    if (this.shares && this.shares.length > 0) {
      price = this.shares.find(share => share.shareid === id).price;
    }
    return price;
  }

  private getCost(id): number {
    let cost = 0;
    if (this.shares && this.shares.length > 0) {
      cost = this.shares.find(share => share.shareid === id).cost;
    }
    return cost;
  }

  private getEquity(id): number {
    let equity = 0;
    if (this.shares && this.shares.length > 0) {
      equity = this.shares.find(share => share.shareid === id).equity;
    }
    return equity;
  }
}
