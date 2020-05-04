import {Component, Input, OnInit} from '@angular/core';
import {StockInfo} from '@models/stock';

@Component({
  selector: 'app-dividends',
  templateUrl: './dividends.component.html',
  styleUrls: ['./dividends.component.sass']
})
export class DividendsComponent implements OnInit {

  @Input() shareInfo: StockInfo[];
  @Input() dividendType: string;
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
      if (this.dividendType && this.dividendType === 'monthly') {
        total = data.shares * (data.dividend / 4);
      } else {
        total = data.shares * (data.dividend);
      }
    }
    return total;
  }

  getGrandTotal(data) {
    let sum  = 0;
    if (data && data.length > 0) {
      if (this.dividendType && this.dividendType === 'monthly') {
        data.forEach(stock => {
          sum = sum + (stock.shares * (stock.dividend / 4));
        });
      } else {
        data.forEach(stock => {
          sum = sum + (stock.shares * (stock.dividend));
        });
      }

    }
    return sum;
  }
}
