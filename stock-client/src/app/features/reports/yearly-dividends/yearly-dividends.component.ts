import {Component, Input, OnInit} from '@angular/core';
import {StockInfo} from '@models/stock';

@Component({
  selector: 'app-yearly-dividends',
  templateUrl: './yearly-dividends.component.html',
  styleUrls: ['./yearly-dividends.component.sass']
})
export class YearlyDividendsComponent implements OnInit {

  @Input() shareInfo: StockInfo[];
  total: number;
  cols: any[];

  constructor() {
    this.cols = [
      {field: 'ticker', header: 'Ticker', width: '10%'},
      {field: 'stockName', header: 'Stock', width: '35%'},
      {field: 'shares', header: 'Shares', width: '10%'},
      {field: 'dividend', header: 'Dividends', width: '15%'},
      {field: 'total', header: 'Total', width: '10%'}
    ];
  }

  ngOnInit() {
  }

  getTotals(data) {
    let total = 0;
    if (data && data.dividend) {
      total = data.shares * data.dividend;
    }
    return total;
  }

  getGrandTotal(data) {
    let sum  = 0;
    if (data && data.length > 0) {
      data.forEach(stock => {
        sum = sum + stock.shares * stock.dividend;
      });
    }
    return sum;
  }

}
