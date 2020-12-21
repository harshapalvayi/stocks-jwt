import { Component, OnInit } from '@angular/core';
import {UserToken} from '@models/User';
import {StockDetails, StockActivityInfo} from '@models/stock';
import {StockService} from '@shared/services/stock/stock.service';
import {UserService} from '@shared/services/user/user.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {OptionActivityData} from '@models/optionsChainData';
import {forkJoin} from 'rxjs';
import {OptionsService} from '@shared/services/options/options.service';
import {OptionActivityHeaders, StockActivityHeaders} from '@models/menus';
import {DateService} from '@shared/services/date/date.service';

@Component({
  selector: 'app-search-stock',
  templateUrl: './search-stock.component.html',
  styleUrls: ['./search-stock.component.sass']
})
export class SearchStockComponent implements OnInit {

  text: string;
  isSubmitted: boolean;
  userInfo: UserToken;
  stockData: StockDetails;
  public stockCols: any[];
  public optionCols: any[];
  stockActivities: StockActivityInfo[];
  optionActivities: OptionActivityData[];
  constructor(private userService: UserService,
              private stockService: StockService,
              private optionService: OptionsService,
              private tokenService: TokenStorageService) { }

  ngOnInit() {
    const { stockActivity } = StockActivityHeaders;
    this.stockCols = stockActivity;
    const { optionActivity } = OptionActivityHeaders;
    this.optionCols = optionActivity;
    if (this.userService.isUserLoggedIn()) {
      this.userInfo = this.tokenService.getUserDetails();
    }
  }

  submit(ticker) {
    if (ticker) {
      this.isSubmitted = true;
      forkJoin([
        this.stockService.getStockDetails(this.userInfo.id, ticker),
        this.stockService.getStockActivityByTicker(this.userInfo.id, ticker),
        this.optionService.getOptionActivityDataByTicker(this.userInfo.id, ticker)
      ]).subscribe(([stock, stockHistory, optionHistory]) => {
        this.stockData = stock;
        this.stockActivities = stockHistory;
        this.optionActivities = optionHistory;
        console.log('stock details', stock);
      });
    }
  }

  goToLink(link: string) {
    window.open(`https://finance.yahoo.com/quote/${link}`, '_blank');
  }

  getPercentage(data) {
    return `${Number(data)}%`;
  }

  getStockName(name) {
    return this.stockService.chopStockName(name);
  }

  convertDate(date) {
    return DateService.getDate(date);
  }
}
