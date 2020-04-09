import {Component, Input, OnInit} from '@angular/core';
import {StockInfo} from '@models/stock';

@Component({
  selector: 'app-monthly-dividends',
  templateUrl: './monthly-dividends.component.html',
  styleUrls: ['./monthly-dividends.component.sass']
})
export class MonthlyDividendsComponent implements OnInit {

  @Input() shareInfo: StockInfo[];
  total: number;
  cols: any[];

  constructor() {
    this.cols = [
      {field: 'ticker', header: 'Ticker', width: '10%'},
      {field: 'stockName', header: 'Stock', width: '35%'},
      {field: 'payDate', header: 'Pay Date', width: '15%'},
      {field: 'shares', header: 'Shares', width: '10%'},
      {field: 'dividend', header: 'Dividends', width: '15%'},
      {field: 'total', header: 'Total', width: '10%'}
    ];
  }

  ngOnInit() { }


  getTotals(data) {
    let total = 0;
    if (data && data.dividend) {
      total = data.shares * (data.dividend / 4);
    }
    return total;
  }

  getGrandTotal(data) {
    let sum  = 0;
    if (data && data.length > 0) {
      data.forEach(stock => {
        sum = sum + stock.shares * (stock.dividend / 4);
      });
    }
    return sum;
  }
}
