import {Component, Input, OnInit} from '@angular/core';
import {StockActivityInfo, StockInfo} from '@models/stock';

@Component({
  selector: 'app-stock-portfolio',
  templateUrl: './stock-portfolio.component.html',
  styleUrls: ['./stock-portfolio.component.sass']
})
export class StockPortfolioComponent implements OnInit {

  @Input() public stocks: StockInfo[];
  @Input() public stockHistory: StockActivityInfo[];
  constructor() { }

  ngOnInit() {
  }

}
