import { Component, OnInit } from '@angular/core';
import {StockService} from '@shared/services/stock/stock.service';
import {UserService} from '@shared/services/user/user.service';
import {UserToken} from '@models/User';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {StockDetails} from '@models/stock';

@Component({
  selector: 'app-search-stock',
  templateUrl: './search-stock.component.html',
  styleUrls: ['./search-stock.component.sass']
})
export class SearchStockComponent implements OnInit {

  text: string;
  userInfo: UserToken;
  stockData: StockDetails;
  constructor(private stockService: StockService,
              private userService: UserService,
              private tokenService: TokenStorageService) { }

  ngOnInit() {
    if (this.userService.isUserLoggedIn()) {
      this.userInfo = this.tokenService.getUserDetails();
    }
  }

  submit(ticker) {
    if (ticker) {
      this.stockService.getStock(this.userInfo.id, ticker).subscribe(stock => this.stockData = stock);
    }
  }

  goToLink(link: string) {
    window.open(`https://finance.yahoo.com/quote/${link}`, '_blank');
  }

}
